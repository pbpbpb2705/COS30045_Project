function init() {
  var dataset;

  //Load data from csv
  d3.csv("UKData-Immigration.csv", function (row) {
    return {
      YearEnding: new Date(+row.YearEnding, (+row.Quarter[1] - 1) * 3),
      Quarter: parseInt(row.Quarter[1]),
      British: parseInt(row.British),
      EU: parseInt(row.EU),
      NonEU: parseInt(row.NonEU),
    };
  }).then((data) => {
    dataset = data;

    lineChart1(dataset);
  });

  d3.csv("UKData-Emigration.csv", function (row) {
    return {
      YearEnding: new Date(+row.YearEnding, (+row.Quarter[1] - 1) * 3),
      Quarter: parseInt(row.Quarter[1]),
      British: parseInt(row.British),
      EU: parseInt(row.EU),
      NonEU: parseInt(row.NonEU),
    };
  }).then((data) => {
    dataset = data;
    console.table(dataset, ["British", "EU", "NonEU"]);

    lineChart2(dataset);
  });
}

function lineChart2(dataset) {
  //Initialise 2D details
  var width = 1200;
  var height = 500;

  var paddingLeft = 60;
  var paddingTop = 20;

  //Scale time for time scaling
  //ScaleLinear for continous rowber dataset
  var xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, function (row) {
        return row.YearEnding;
      }),
      d3.max(dataset, function (row) {
        return row.YearEnding;
      }),
    ])
    .range([paddingLeft, width - paddingLeft]);

  var yScale = d3
    .scaleLinear()
    .domain([
      Math.floor(
        d3.min(dataset, function (row) {
          return Math.min(row.British, row.EU, row.NonEU);
        }) / 10
      ) * 10,
      Math.floor(
        d3.max(dataset, function (row) {
          return Math.max(row.British, row.EU, row.NonEU);
        }) / 10
      ) * 10,
    ])
    .range([height - paddingTop, paddingTop]);
  console.log(yScale.domain());

  //Set up lines
  //.x, .y will loop through data currently used
  var line1 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.British);
    });

  var line2 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.EU);
    });

  var line3 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.NonEU);
    });

  var svg = d3
    .select("#chart-2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var xAxis = d3.axisBottom().scale(xScale).ticks(20);

  var yAxis = d3.axisLeft().scale(yScale);

  //Draw axis
  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0, " + (height - paddingTop) + ")");

  svg
    .append("g")
    .data(dataset)
    .call(yAxis)
    .attr("transform", "translate(" + (paddingLeft - 10) + ", 0)");

  //Datum is to bind dataset to the path
  svg
    .append("path")
    .datum(dataset)
    .attr("d", line1)
    .attr("class", "line")
    .attr("stroke", "blue")
    .attr("fill", "none");

  svg
    .append("path")
    .datum(dataset)
    .attr("d", line2)
    .attr("class", "line")
    .attr("stroke", "red")
    .attr("fill", "none");

  svg
    .append("path")
    .datum(dataset)
    .attr("d", line3)
    .attr("class", "line")
    .attr("stroke", "green")
    .attr("fill", "none");

    var lastPos = dataset.slice(-1);
    console.log(lastPos);
    svg.append("text")
    .attr("x", xScale(lastPos.YearEnding))
    .attr("y", yScale(lastPos.British))
    .text("British");
}

function lineChart1(dataset) {
  //Initialise 2D details
  var width = 1200;
  var height = 500;

  var paddingLeft = 60;
  var paddingTop = 20;

  //Scale time for time scaling
  //ScaleLinear for continous rowber dataset
  var xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, function (row) {
        return row.YearEnding;
      }),
      d3.max(dataset, function (row) {
        return row.YearEnding;
      }),
    ])
    .range([paddingLeft, width - paddingLeft]);

  var yScale = d3
    .scaleLinear()
    .domain([
      Math.floor(
        d3.min(dataset, function (row) {
          return Math.min(row.British, row.EU, row.NonEU);
        }) / 10
      ) * 10,
      Math.floor(
        d3.max(dataset, function (row) {
          return Math.max(row.British, row.EU, row.NonEU);
        }) / 10
      ) * 10,
    ])
    .range([height - paddingTop, paddingTop]);
  console.log(yScale.domain());

  //Set up lines
  //.x, .y will loop through data currently used
  var line1 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.British);
    });

  var line2 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.EU);
    });

  var line3 = d3
    .line()
    .x(function (row) {
      return xScale(row.YearEnding);
    })
    .y(function (row) {
      return yScale(row.NonEU);
    });

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var xAxis = d3.axisBottom().scale(xScale).ticks(20);

  var yAxis = d3.axisLeft().scale(yScale);

  //Draw axis
  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0, " + (height - paddingTop) + ")");

  svg
    .append("g")
    .data(dataset)
    .call(yAxis)
    .attr("transform", "translate(" + paddingLeft + ", 0)");

  //Datum is to bind dataset to the path
  svg
    .append("path")
    .datum(dataset)
    .attr("d", line1)
    .attr("class", "line")
    .attr("stroke", "blue")
    .attr("fill", "none");

  svg
    .append("path")
    .datum(dataset)
    .attr("d", line2)
    .attr("class", "line")
    .attr("stroke", "red")
    .attr("fill", "none");

  svg
    .append("path")
    .datum(dataset)
    .attr("d", line3)
    .attr("class", "line")
    .attr("stroke", "green")
    .attr("fill", "none");
}

init();
