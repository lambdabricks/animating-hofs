var animateButton = document.getElementById('animate');

animateButton.onclick = function(event) {
  var timeline = new TimelineLite();

  timeline.to(
    "#input-collection",
    1.2,
    {
      y: 59,
      scale: 0.7
    }
  );
  timeline.to(
    "#input-collection",
    1.2,
    {
      y: 100,
      scale: 1
    }
  );
};
