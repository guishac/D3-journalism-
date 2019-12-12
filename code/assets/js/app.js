// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select('body')
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// loading data in and reading it 
../D3-Data-Journalism/data/data.csv"
d3.csv("../D3_-Journalism/data/healthdata.csv").then(function (healthData) {
  //console.log(healthData);
  healthData.forEach(function (data) {
    data.health_poverty = +data.health_poverty;
    data.lackof = +data.lacof;
  });
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(healthData, d => d.health_poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.lackof)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circle

  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.health_poverty))
    .attr("cy", d => yLinearScale(d.lackof))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

  var stateText = chartGroup.append('g').selectAll('text')
    .data(healthdata)
    .enter()
    .append('text')
    .classed('stateText', true)
    .attr('x', d => xScale(d[chosenXAxis]))
    .attr('y', d => yScale(d[chosenYAxis]))
    .attr('transform', 'translate(0,4.5)')
    .text(d => d.abbr);

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.Health}<br>Health factors: ${d.health_poverty}<br>Hits: ${d.lackof}`);
    });

  // create tool tip in chart 
  chartGroup.call(toolTip);

  // event listener to hide tooltip
  circlesGroup.on("click", function (data) {
    toolTip.show(data, this);
  })

    // onmouseout event 
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });


  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}).catch(function (error) {
  console.log(error);



});