var svgContainer = d3.select("body")
   .append("svg")
   .attr("id", function(d) {
      return "svgSmile"
   })
   .attr("width", "100%")
   .attr("height", "100%");

var infoSmile = svgContainer.selectAll("circle")
   .data(dataSetGenerator())
   .enter()
   .append("g")
   .attr("id", function(d) {
      return "group" + (d.i)
   })
   .on("click", function(d) {
      smileSad(d);
   });

var circleFace = infoSmile.append("circle")
   .attr("id", function(d) {
      return "circle" + (d.i)
   })
   .attr("cx", function(d) {
      console.log()
      return d.x
   })
   .attr("cy", function(d) {
      return d.y
   })
   .attr("r", function(d) {
      return d.r
   })
   .style("fill", "gold")
   .style("stroke", "black")

var eyeSx = infoSmile.append("circle")
   .attr("id", function(d) {
      return "eyeSx" + (d.i)
   })
   .attr("cx", function(d) {
      return (d.x - (d.r / 3))
   })
   .attr("cy", function(d) {
      return (d.y - (d.r / 3))
   })
   .attr("r", function(d) {
      return (d.r * 15 / 100)
   })
   .style("fill", "black");

var eyeDx = infoSmile.append("circle")
   .attr("id", function(d) {
      return "eyeDx" + (d.i)
   })
   .attr("cx", function(d) {
      return (d.x + (d.r / 3))
   })
   .attr("cy", function(d) {
      return (d.y - (d.r / 3))
   })
   .attr("r", function(d) {
      return (d.r * 15 / 100)
   })
   .style("fill", "black");

var smileHappy = infoSmile
   .append("path")
   .attr("id", function(d) {
      return "path" + (d.i)
   })
   .attr("d", function(d) {
      return "M" + (d.x - (d.r / 2)) + " " + (d.y + (d.r / 3)) + " Q " + (d.x) + " " + (d.y + (2 * (d.r / 3))) + " " + (d.x + (d.r / 2)) + " " + (d.y + (d.r / 3))
   })
   .style("stroke", "black")
   .style("fill", "transparent");

// var movimenSmile = d3.call(transition())

function transition() {
   d3.selectAll("g").transition()
      .duration(1000)
      .ease("linear")
      .attr('cx', 300 * (1 + Math.random() / 2))
      .attr('cy', 100 * (1 + Math.random() / 2))
      .each("end", transition);
};

function dataSetGenerator() {
   var dataSet = [];
   var smile = {}
   var i = 0
   console.log(window.innerWidth)
   console.log(window.innerHeight)
   while (i < 30) {
      var r = Math.floor((Math.random() * 30) + 30);
      var cx = Math.round(Math.random() * (window.innerWidth)) + 2 * r
      var cy = Math.round(Math.random() * (window.innerHeight)) + 2 * r

      if ((cx + r) > window.innerWidth)
         cx = cx - 2 * (window.innerWidth / 3)
      if ((cy + r) > window.innerHeight)
         cy = cy - 2 * (window.innerHeight / 3)
      smile["x"] = cx;
      smile["y"] = cy
      smile["r"] = r;
      smile["i"] = i;
      dataSet.push(smile);
      var smile = {}
      i++;
   }
   return dataSet;
}

function smileSad(d) {
   d3.select("#circle" + (d.i)).style("fill", "red")
   d3.select("#path" + (d.i)).remove()
   d3.select("#group" + (d.i)).append("path")
      .attr("id", function(d) {
         return "path" + (d.i)
      })
      .attr("d", function(d) {
         return "M" + (d.x - (d.r / 2)) + " " + (d.y + (d.r / 3)) + " Q " + (d.x) + " " + (d.y - (1 * (d.r / 3))) + " " + (d.x + (d.r / 2)) + " " + (d.y + (d.r / 3))
      })
      .style("stroke", "black")
      .style("fill", "transparent");
   drawSingleSmile(d);
}

function drawSingleSmile(d) {
   var translateX = (Math.round(Math.random() * (window.innerWidth)) + 2 * d.r)-d.x
   var translateY = (Math.round(Math.random() * (window.innerHeight)) + 2 * d.r)-d.y
   console.log(d)
   if ((translateX + d.r) > window.innerWidth)
      translateX = translateX - 2 * (window.innerWidth / 3)
   if ((translateY + d.r) > window.innerHeight)
      translateY = translateY - 2 * (window.innerHeight / 3)

   console.log(translateX)
   console.log(translateY)
   setTimeout(function(d) {

      d3.select("#group" + d.i).attr("transform", "translate(" + translateX + "," + translateY + ")")
      d3.select("#circle" + (d.i))
         .style("fill", "gold")
      d3.select("#path" + d.i).remove();

      d3.select("#group" + (d.i)).append("path")
         .attr("id", function(d) {
            return "path" + (d.i)
         })
         .attr("d", function(d) {
            return "M" + (d.x - (d.r / 2)) + " " + (d.y + (d.r / 3)) + " Q " + (d.x) + " " + (d.y + (2 * (d.r / 3))) + " " + (d.x + (d.r / 2)) + " " + (d.y + (d.r / 3))
         })
         .style("stroke", "black")
         .style("fill", "transparent");
      // d3.select("#group" + (d.i)).transition()
      //         .duration(1000)
      //         .ease("linear")
      //         .attr('cx',  300 * (1 + Math.random()/2))
      //         .attr('cy',  100 * (1 + Math.random()/2))
      // .each("end", transition);

   }, 1000, d, translateX, translateY);
}