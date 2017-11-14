let animateButton = document.getElementById('animate');

animateButton.addEventListener('click', function(event) {
  let master = new TimelineLite();

  master
    .add(collection_enters())
    .add(position_input_function());

});

const collection_enters = function() {
  let timeline = new TimelineLite();
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
  let timeline = new TimelineLite();
  const input_function = document.getElementById('input-function');
  const slot2 = document.getElementById('input-slot2');

  timeline
    .to(input_function, 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to(input_function, 1.2, { y: 190, scale: 1 })
    .to(slot2, 0.4, { scale: 1.3 }, 'function_enters+=0.25')
    .to(slot2, 0.4, { scale: 1 }, 'function_enters+=1.5')
    .to(input_function, 1.2, { x: -213 })

  return timeline;
};
