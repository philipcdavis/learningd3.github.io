(function () {
  var width = window.innerWidth * 2,
    height = parseInt(d3.select('.bubble-container').style('height')) * 2;

  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([0, height]);

  var colors = ["rgba(69, 166, 255, 0.6)", "rgba(255, 49, 57, 0.6)", "rgba(236, 240, 241, 0.6)"];
  var colorScale = d3.scaleQuantize().domain([0, 1]).range(colors);

  var data = d3.range(35).map(function () {
    var dataObject = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      yvel: Math.random() * 0.4,
      size: (Math.random() * 25) + 5,
      color: colorScale(Math.random())
    };

    if (dataObject.x - dataObject.size <= 0) {
      dataObject.x += 2;
    } else if (dataObject.x + dataObject.size >= 0) {
      dataObject.x -= 2;
    }

    return dataObject;
  });

  var canvas = d3.select("#bubbles").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "bubble-canvas");

  // node returns first dom element in a selection
  var context = canvas.node().getContext("2d");

  d3.select(window).on('resize', function () {
    var htmlCanvas = document.getElementById('bubble-canvas');
    var context = htmlCanvas.getContext('2d');
    width = window.innerWidth * 2;
    htmlCanvas.width = width;
    height = parseInt(d3.select('.bubble-container').style('height')) * 2;
    htmlCanvas.height = height;
    x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    y = d3.scaleLinear()
      .domain([0, 100])
      .range([0, height]);
  });


  // the timer method calls a function repeatedly
  d3.timer(function () {
    context.clearRect(0, 0, width, height);

    data.forEach(function (d) {
      d.y -= d.yvel;

      // Recycle old circles
      if (d.y < (0 - d.size)) {
        d.y = 100 + d.size;
      }

      context.fillStyle = d.color;
      context.beginPath();
      context.arc(x(d.x), y(d.y), d.size, 0, 2 * Math.PI);

      context.fill();
    });
  });
})();
