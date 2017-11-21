let data = {
  input_function: function(element) {
    return element + 1;
  },
  input_collection: [1, 2, 3, 4, 5]
};

let animateButton = document.getElementById('animate');

animateButton.addEventListener('click', function(event) {
  let master = new TimelineLite();

  master
    .add(collection_enters())
    .add(position_input_function())
    .add(map_collection())
    .add(output_collection_result());

});

const collection_enters = function() {
  const timeline = new TimelineLite();
  const main_brick = document.getElementById('mainbrick');
  const input_collection = document.getElementById('input-collection');
  const slot1 = document.getElementById('input-slot1');

  const left_offset = input_collection.offsetLeft - main_brick.offsetLeft;
  const centered = main_brick_half_width(input_collection, main_brick) - left_offset;

  timeline
    .to(input_collection, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'collection_enters')
    .to(input_collection, 0.8, { y: 155, scale: 1 })
    .to(slot1, 0.4, { scale: 1.3 }, 'collection_enters+=0.25')
    .to(slot1, 0.4, { scale: 1 }, 'collection_enters+=1.5')
    .to(input_collection, 0.8, { x: centered });

  return timeline;
};

const position_input_function = function() {
  const timeline = new TimelineLite();
  const input_function = document.getElementById('input-function');
  const input_slot = input_function.getElementsByClassName('brick-slot')[0];
  const slot2 = document.getElementById('input-slot2');

  const main_brick = document.getElementById('mainbrick');
  const input_collection = document.getElementById('input-collection');
  const collection_element = input_collection.getElementsByClassName('input-collection-element')[0];
  const left_offset = input_function.offsetLeft + input_slot.offsetLeft -
    ((collection_element.offsetWidth - input_slot.offsetWidth) / 2) -
    (main_brick_half_width(input_collection, main_brick) + main_brick.offsetLeft);

  timeline
    .to(input_function, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to(input_function, 1.2, { y: 190, scale: 1 })
    .to(slot2, 0.4, { scale: 1.3 }, 'function_enters+=0.25')
    .to(slot2, 0.4, { scale: 1 }, 'function_enters+=1.5')
    .to(input_function, 1.2, { x: '-=' + left_offset });

  return timeline;
};

const map_collection = function() {
  const timeline = new TimelineLite();
  const collection_elements = document.getElementsByClassName('input-collection-element');
  const input_brick = document.getElementById('input-function');
  const total_elements = collection_elements.length;

  for(i = 0; i < total_elements; i++) {
    const element = collection_elements[i];
    const new_value = data.input_function(data.input_collection[i]);

    timeline
      .to(
        element,
        0.6,
        { y: "+=55", onComplete: function() { element.innerText = new_value; }}
      )
      .to(element, 0.6, { y: "+=55" });

    // No need to move the input brick after the last element
    if(i != total_elements - 1) {
      timeline.to(input_brick, 0.4, { x: '+=' + element.offsetWidth });
    }
  }

  return timeline;
}

const output_collection_result = function() {
  const timeline = new TimelineLite();
  const input_collection = document.getElementById('input-collection');
  const output_slot = document.getElementById('output-slot');

  timeline
    .to(input_collection, 1.2, { y: '+=100', scale: 0.6, ease: Sine.easeIn }, 'collection_exits')
    .to(input_collection, 0.6, { y: '+=10', scale: 1 })
    .to(output_slot, 0.4, { scale: 1.3 }, 'collection_exits+=0.5')
    .to(output_slot, 0.4, { scale: 1 }, 'collection_exits+=1.4')

  return timeline;
}

const main_brick_half_width = function(input_collection, main_brick) {
  return ((main_brick.offsetWidth - input_collection.offsetWidth) / 2);
}
