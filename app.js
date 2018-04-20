let data = {
  accumulator: 0,
  input_collection: [1, 2, 3, 4, 5],
  hofs: {
    map: {
      label: 'add_one',
      code: function(element) {
        return element + 1;
      }
    },
    reduce: {
      label: '+',
      code: function(accumulator, element) {
        return accumulator + element;
      }
    }
  },
  selected_function: 'map'
};

// html elements
const container = document.getElementsByClassName('main-container')[0];

const input_collection = document.getElementById('input-collection');
const input_accumulator = document.getElementById('input-accumulator');
const input_function = document.getElementById('input-function');
const input_function_slot = input_function.getElementsByClassName('brick-slot')[0];
const input_function_slot2 = input_function.getElementsByClassName('brick-slot')[1];
let collection_elements;
let collection_element;

const main_brick = document.getElementById('mainbrick');
const slot_collection = document.getElementById('mb-slot-collection');
const slot_accumulator = document.getElementById('mb-slot-accumulator');
const slot_function = document.getElementById('mb-slot-function');
const output_slot = document.getElementById('mb-output-slot');


const animateButton = document.getElementById('animate');
const hofPicker = document.getElementById('hof-picker');

let master = new TimelineLite();


hofPicker.addEventListener('change', function(event) {
  const selected_hof = hofPicker.value;

  data.selected_function = selected_hof;
  container.classList = "container main-container " + selected_hof;
  input_function.getElementsByClassName('brick-body')[0].innerText = data.hofs[selected_hof].label;

  init();
});

animateButton.addEventListener('click', function(event) {
  init();
  sleep(500);

  master = new TimelineLite();

  if(data.selected_function == 'map') {
    master
      .add(position_collection(collection_position_for_map()))
      .add(position_input_function(function_position_for_map()))
      .add(map_collection())
      .add(output_result(input_collection));
  } else if(data.selected_function == 'reduce') {
    master
      .add(position_collection(collection_position_for_reduce()))
      .add(position_accumulator(acumulator_position()))
      .add(position_input_function(function_position_for_reduce()))
      .add(reduce_collection())
      .add(center_accumulator())
      .add(output_result(input_accumulator));
  }

  master.play();
});

const position_collection = function(final_x_position) {
  const timeline = new TimelineLite();

  timeline
    .to(input_collection, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'collection_enters')
    .to(input_collection, 0.8, { y: 140, scale: 1 })
    .to(slot_collection, 0.4, { scaleX: 1.3 }, 'collection_enters+=0.25')
    .to(slot_collection, 0.4, { scaleX: 1 }, 'collection_enters+=1.5')
    .to(input_collection, 0.8, { x: final_x_position })
    .to(input_collection, 0.4, { y: 155 });

  return timeline;
};

const position_accumulator = function(final_x_position) {
  const timeline = new TimelineLite();

  timeline
    .to(input_accumulator, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'accumulator_enters')
    .to(input_accumulator, 0.8, { y: 140, scale: 1 })
    .to(slot_accumulator, 0.4, { scaleX: 1.3 }, 'accumulator_enters+=0.25')
    .to(slot_accumulator, 0.4, { scaleX: 1 }, 'accumulator_enters+=1.5')
    .to(input_accumulator, 0.8, { x: final_x_position })
    .to(input_accumulator, 0.4, { y: 155 });

  return timeline;
};

const position_input_function = function(left_offset) {
  const timeline = new TimelineLite();

  timeline
    .to(input_function, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to(input_function, 1.2, { y: 190, scale: 1 })
    .to(slot_function, 0.4, { scaleX: 1.3 }, 'function_enters+=0.25')
    .to(slot_function, 0.4, { scaleX: 1 }, 'function_enters+=1.5')
    .to(input_function, 1.2, { x: '-=' + left_offset });

  return timeline;
};

const map_collection = function() {
  const timeline = new TimelineLite();
  const total_elements = collection_elements.length;

  for(i = 0; i < total_elements; i++) {
    const element = collection_elements[i];
    const new_value = data.hofs.map.code(data.input_collection[i]);

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

const reduce_collection = function() {
  const timeline = new TimelineLite();
  const total_elements = collection_elements.length;
  const loop_callback = function(i, element) {
    return function() {
      data.accumulator = data.hofs.reduce.code(data.accumulator, data.input_collection[i]);
      input_accumulator.getElementsByClassName('input-collection-element')[0].innerText = data.accumulator;
      element.classList += ' invisible';
    };
  };

  for(i = 0; i < total_elements; i++) {
    const element = collection_elements[i];

    timeline
      .to(input_accumulator, 0.4, { y: "+=55"}, "reduce_collection" + i)
      .to(input_accumulator, 0.4, { x: "+=" + space_between_brick_slots() })
      .to(
        element,
        0.4,
        { y: "+=55", onComplete: loop_callback(i, element) },
        "reduce_collection" + i)
      .to(input_accumulator, 0.8, { y: "+=55" });

    if(i != total_elements - 1) {
      timeline.to(input_function, 0.4, { x: '+=' + element.offsetWidth });

      timeline
        .to(input_accumulator, 0.3, { x: "-=60"})
        .to(input_accumulator, 0.6, { y: "-=110"})
        .to(input_accumulator, 0.3, { x: "+=59"})
    }
  }

  return timeline;
};

const output_result = function(element) {
  const timeline = new TimelineLite();

  timeline
    .to(element, 1.2, { y: '+=100', scale: 0.6, ease: Sine.easeIn }, 'collection_exits')
    .to(element, 0.6, { y: '+=10', scale: 1 })
    .to(output_slot, 0.4, { scaleX: 1.3 }, 'collection_exits+=0.5')
    .to(output_slot, 0.4, { scaleX: 1 }, 'collection_exits+=1.4')

  return timeline;
}

const collection_position_for_map = function() {
  const left_offset = input_collection.offsetLeft - main_brick.offsetLeft;
  const centered = main_brick_half_width(input_collection, main_brick) - left_offset;

  return centered;
};

const function_position_for_map = function() {
  const left_offset = input_function.offsetLeft + input_function_slot.offsetLeft -
    (main_brick_half_width(input_collection, main_brick) + main_brick.offsetLeft) -
    diff_between_collection_and_slot_sizes();

  return left_offset;
};

const collection_position_for_reduce = function() {
  const centered = collection_position_for_map();

  return centered + space_between_brick_slots();
};

const acumulator_position = function() {
  const left_offset = input_accumulator.offsetLeft - main_brick.offsetLeft;
  const centered = main_brick_half_width(input_collection, main_brick) -
    space_between_brick_slots();

  return centered - left_offset;
};

const function_position_for_reduce = function() {
  return function_position_for_map() + space_between_brick_slots();
};

const center_accumulator = function() {
  const timeline = new TimelineLite();

  timeline.to(input_accumulator, 0.6, { x: 0 });

  return timeline;
};

const main_brick_half_width = function(input_collection, main_brick) {
  return ((main_brick.offsetWidth - input_collection.offsetWidth) / 2);
}

const space_between_brick_slots = function() {
  return ((input_function_slot2.offsetLeft - input_function_slot.offsetLeft) / 2);
};

const diff_between_collection_and_slot_sizes = function() {
  return ((collection_element.offsetWidth - input_function_slot.offsetWidth) / 2);
};


const init = function() {
  const input_collection_elements = data.input_collection.map(function(element) {
    return '<div class="input-collection-element">' + element + '</div>';
  }).join('');

  input_collection.innerHTML = input_collection_elements;
  collection_elements = input_collection.getElementsByClassName('input-collection-element');
  collection_element = collection_elements[0];

  data.accumulator = 0;

  input_accumulator.innerHTML =
    '<div class="input-collection-element">' + data.accumulator + '</div>';

  master.progress(0);
  master.pause();
};

const sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', init);
