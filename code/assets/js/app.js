var svgWidth = 900;
var svgHeight = 600;

var chartmargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var chartwidth = svgWidth - chartmargin.left - chartmargin.right;
var chartheight = svgHeight - chartmargin.top - chartmargin.bottom;

// adding svg
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// chart group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartmargin.left}, ${chartmargin.top})`);


d3.csv("./assets/data/healthData.csv").then(function (healthData) {

  // converting the data into a frame for numbers 
  healthData.forEach(function (xdata) {
    xdata.poverty = +xdata.poverty;
    xdata.healthcare = +xdata.healthcare;
    //console.log(xdata.state,xdata.abbr,xdata.poverty,xdata.healthcare);
  });

  // settibg the x scale function
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty) * 0.9,
    d3.max(healthData, d => d.poverty) * 1.1])
    .range([0, chartwidth]);

  // setting the y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare) * 1.1])
    .range([chartheight, 0]);

  // creating the axis 
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // appending the x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartheight})`)
    .style("font-size", "18px")
    .call(bottomAxis);

  // appending the y axis
  chartGroup.append("g")
    .style("font-size", "18px")
    .call(leftAxis);

  // creating the circles and appending them
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 12)
    .attr("fill", "blue")
    .attr("opacity", ".3");

  // putting text in the circles
  chartGroup.selectAll("text.text-circles")
    .data(healthData)
    .enter()
    .append("text")
    .classed("text-circles", true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px");

  // formatting the y axis 
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacking Healthcare (%)");

  // var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function (d) {
  //      return (`${d.Health}<br>Health factors: ${d.health_poverty}<br>Hits: ${d.lackof}`);

  // formatting the x axis
  chartGroup.append("text")
    .attr("y", height + margin.bottom / 2 - 10)
    .attr("x", width / 2)
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Poverty Rate (%)");


    });
