let animateButton = document.getElementById('animate');

animateButton.addEventListener('click', function(event) {
  let master = new TimelineLite();

  master
    .add(collection_enters())
    .add(position_input_function());

});

const collection_enters = function() {
  let timeline = new TimelineLite();

  timeline
    .to('#input-collection', 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'collection_enters')
    .to('#input-collection', 0.8, { y: 155, scale: 1 })
    .to('#input-slot1', 0.4, { scale: 1.3 }, 'collection_enters+=0.25')
    .to('#input-slot1', 0.4, { scale: 1 }, 'collection_enters+=1.5');

  return timeline;
};

const position_input_function = function() {
  let timeline = new TimelineLite();

  timeline
    .to('#input-function', 1.2, { y: 105, scale: 0.6, ease: Sine.easeIn }, 'function_enters')
    .to('#input-function', 1.2, { y: 190, scale: 1 })
    .to('#input-slot2', 0.4, { scale: 1.3 }, 'function_enters+=0.25')
    .to('#input-slot2', 0.4, { scale: 1 }, 'function_enters+=1.5')
    .to('#input-function', 1.2, { x: -363 })

  return timeline;
};
