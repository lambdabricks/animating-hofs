var animateButton = document.getElementById('animate');

animateButton.onclick = function(event) {
  var timeline = new TimelineLite();

  timeline.to(
    "#input-collection",
    1.5,
    {
      y: 30,
      scale: 0.7
    }
  );
  timeline.to(
    "#input-collection",
    1.5,
    {
      y: 60,
      scale: 1
    }
  );
};
