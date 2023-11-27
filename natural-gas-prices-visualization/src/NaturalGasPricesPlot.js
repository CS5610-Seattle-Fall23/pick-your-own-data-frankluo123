import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Exporting the loadData function
export const loadData = async (url) => {
  try {
    const response = await fetch(url);
    const rawData = await response.text();
    return d3.csvParse(rawData, d => ({
      date: new Date(d.Date),
      price: +d.Price
    }));
  } catch (error) {
    console.error("Could not load data:", error);
    return []; // Return an empty array in case of an error
  }
};

// Exporting the leastSquares function
export const leastSquares = (dataPoints) => {
  const n = dataPoints.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  dataPoints.forEach(point => {
    const x = point.date.getTime();
    sumX += x;
    sumY += point.price;
    sumXY += x * point.price;
    sumXX += x * x;
  });

  const meanX = sumX / n;
  const meanY = sumY / n;
  let numerator = 0, denominator = 0;

  dataPoints.forEach(point => {
    const x = point.date.getTime();
    numerator += (x - meanX) * (point.price - meanY);
    denominator += (x - meanX) * (x - meanX);
  });

  const m = numerator / denominator;
  const b = meanY - (m * meanX);

  return [m, b];
};

const NaturalGasPricesPlot = ({ url }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const loadedData = await loadData(url);
      setData(loadedData);
    };
    fetchData();
  }, [url]);

  // Update the visualization whenever the data changes
  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG content

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => d.price)]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

    svg.append("g")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("USD per MMBtu");

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.price));

    const [m, b] = leastSquares(data);
    const firstDate = data[0].date.getTime();
    const lastDate = data[data.length - 1].date.getTime();

    svg.append("line")
      .attr("x1", x(data[0].date))
      .attr("y1", y((firstDate * m) + b))
      .attr("x2", x(data[data.length - 1].date))
      .attr("y2", y((lastDate * m) + b))
      .style("stroke", "red");
  }, [data]);

  return (
    <svg ref={svgRef} width={960} height={500} />
  );
};

export default NaturalGasPricesPlot;
