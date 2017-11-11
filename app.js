let animateButton = document.getElementById('animate');

animateButton.addEventListener('click', function(event) {
  let master = new TimelineLite();

  master
    .add(collection_enters());

});

const collection_enters = function() {
  let timeline = new TimelineLite();

  timeline
    .to('#input-collection', 1.2, { y: 59, scale: 0.6 }, 'collection_enters')
    .to('#input-collection', 1.2, { y: 100, scale: 1 })
    .to('#input-slot1', 0.4, { scale: 1.3 }, 'collection_enters+=0.25')
    .to('#input-slot1', 0.4, { scale: 1 }, 'collection_enters+=1.5');

  return timeline;
};
