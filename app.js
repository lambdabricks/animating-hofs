let data = {
  input_collection: [1, 2, 3, 4, 5],
  map_function: function(element) {
    return element + 1;
  },
  reduce_function: function(accumulator, element) {
    return accumulator + element;
  },
  selected_function: 'map'
};

// html elements
const input_collection = document.getElementById('input-collection');
const collection_elements = input_collection.getElementsByClassName('input-collection-element');
const collection_element = collection_elements[0];
const input_function = document.getElementById('input-function');
const input_function_slot = input_function.getElementsByClassName('brick-slot')[0];

const main_brick = document.getElementById('mainbrick');
const slot_collection = document.getElementById('mb-slot-collection');
const slot_function = document.getElementById('mb-slot-function');
const output_slot = document.getElementById('mb-output-slot');


const animateButton = document.getElementById('animate');

animateButton.addEventListener('click', function(event) {
  let master = new TimelineLite();

  if(data.selected_function == 'map') {
    master
      .add(position_collection(collection_position_for_map()))
      .add(position_input_function())
      .add(map_collection())
      .add(output_collection_result());
  } else if(data.selected_function == 'reduce') {
    master
      .add(position_collection(position_for_reduce_hof()))
      .add(position_input_function())
      .add(map_collection())
      .add(output_collection_result());
  }
});

const position_collection = function(final_x_position) {
  const timeline = new TimelineLite();

  timeline
    .to(input_collection, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'collection_enters')
    .to(input_collection, 0.8, { y: 140, scale: 1 })
    .to(slot_collection, 0.4, { scale: 1.3 }, 'collection_enters+=0.25')
    .to(slot_collection, 0.4, { scale: 1 }, 'collection_enters+=1.5')
    .to(input_collection, 0.8, { x: final_x_position })
    .to(input_collection, 0.4, { y: 155 });

  return timeline;
};

const position_input_function = function() {
  const timeline = new TimelineLite();

  const left_offset = input_function.offsetLeft + input_function_slot.offsetLeft -
    ((collection_element.offsetWidth - input_function_slot.offsetWidth) / 2) -
    (main_brick_half_width(input_collection, main_brick) + main_brick.offsetLeft);

  timeline
    .to(input_function, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to(input_function, 1.2, { y: 190, scale: 1 })
    .to(slot_function, 0.4, { scale: 1.3 }, 'function_enters+=0.25')
    .to(slot_function, 0.4, { scale: 1 }, 'function_enters+=1.5')
    .to(input_function, 1.2, { x: '-=' + left_offset });

  return timeline;
};

const map_collection = function() {
  const timeline = new TimelineLite();
  const total_elements = collection_elements.length;

  for(i = 0; i < total_elements; i++) {
    const element = collection_elements[i];
    const new_value = data.map_function(data.input_collection[i]);

    timeline
      .to(
        element,
        0.6,
        { y: "+=55", onComplete: function() { element.innerText = new_value; }}
      )
      .to(element, 0.6, { y: "+=55" });

    // No need to move the input brick after the last element
    if(i != total_elements - 1) {
      timeline.to(input_function, 0.4, { x: '+=' + element.offsetWidth });
    }
  }

  return timeline;
}

const output_collection_result = function() {
  const timeline = new TimelineLite();

  timeline
    .to(input_collection, 1.2, { y: '+=100', scale: 0.6, ease: Sine.easeIn }, 'collection_exits')
    .to(input_collection, 0.6, { y: '+=10', scale: 1 })
    .to(output_slot, 0.4, { scale: 1.3 }, 'collection_exits+=0.5')
    .to(output_slot, 0.4, { scale: 1 }, 'collection_exits+=1.4')

  return timeline;
}

const collection_position_for_map = function() {
  const left_offset = input_collection.offsetLeft - main_brick.offsetLeft;
  const centered = main_brick_half_width(input_collection, main_brick) - left_offset;

  return centered;
};

const main_brick_half_width = function(input_collection, main_brick) {
  return ((main_brick.offsetWidth - input_collection.offsetWidth) / 2);
}
