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
  const input_collection = document.getElementById('input-collection');
  const slot1 = document.getElementById('input-slot1');

  timeline
    .to(input_collection, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'collection_enters')
    .to(input_collection, 0.8, { y: 155, scale: 1 })
    .to(slot1, 0.4, { scale: 1.3 }, 'collection_enters+=0.25')
    .to(slot1, 0.4, { scale: 1 }, 'collection_enters+=1.5')
    .to(input_collection, 0.8, { x: 147 });

  return timeline;
};

const position_input_function = function() {
  const timeline = new TimelineLite();
  const input_function = document.getElementById('input-function');
  const slot2 = document.getElementById('input-slot2');

  timeline
    .to(input_function, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to(input_function, 1.2, { y: 190, scale: 1 })
    .to(slot2, 0.4, { scale: 1.3 }, 'function_enters+=0.25')
    .to(slot2, 0.4, { scale: 1 }, 'function_enters+=1.5')
    .to(input_function, 1.2, { x: -214 })

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
      timeline.to(input_brick, 0.4, { x: '+=21px'});
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
    .to(output_slot, 0.4, { scale: 1.3 }, 'collection_exits+=0.25')
    .to(output_slot, 0.4, { scale: 1 }, 'collection_exits+=1.5')

  return timeline;
}
