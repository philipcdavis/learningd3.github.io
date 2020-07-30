var geoChart = function () {
  var width = 800;
  var height = 800;
  var container = null;
  var data = null;

  var builder = function () {
    if (!data) { return console.error('geo chart has no data') }
    if (!container) { return console.error('geo chart has no container') }

    var svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height);

    var projection = d3.geoMercator()
      .center([110, 40])
      .scale(700);

    var path = d3.geoPath()
      .projection(projection);

    var province = svg.selectAll(".geo-province")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#D6D9DF")
      .attr("class", "geo-province")
      .attr("stroke", "white");

    svg.selectAll(".geo-place-label")
      .data(data.features)
      .enter()
      .append("text")
      .attr("class", "geo-place-label")
      .attr("transform", function (d) {
        return "translate(" + projection([d.properties.longitude, d.properties.latitude]) + ")"
      })
      .text(function (d) { return d.properties.name })
      .attr("y", 3);

    svg.selectAll(".geo-place-dot")
      .data(data.features)
      .enter()
      .append("circle")
      .attr("class", "geo-place-dot")
      .attr("transform", function (d) {
        return "translate(" + projection([d.properties.longitude, d.properties.latitude]) + ")"
      })
      .attr("r", 1.5)
      .attr("cx", -4);
  }

  builder.data = function (value) {
    if (!arguments.length) { return data }
    data = value
    return builder;
  }

  builder.container = function (value) {
    if (!arguments.length) { return container }
    container = value
    return builder;
  }

  builder.width = function (value) {
    if (!arguments.length) { return width }
    width = value
    return builder;
  }

  builder.height = function (value) {
    if (!arguments.length) { return height }
    height = value
    return builder;
  }

  return builder;
}
