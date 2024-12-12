import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import worldGeoJson from '../../assets/geoMap/countries.geo.json'; // GeoJSON file for world map
import { useDispatch, useSelector } from "react-redux";
import './ChoroplethMap.css';

const ChoroplethMap = ({ categories = [], values = [] }) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const dispatch = useDispatch();
    const color = useSelector((state) => state.chartColor.chartColor);  // Redux selector for color

    useEffect(() => {
        if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0 || values.length === 0) {
            return;
        }

        // Create a color scale from white to the selected color from the Redux store
        const colorScale = d3.scaleLinear()
            .domain([d3.min(values), d3.max(values)])  // The range of your data values
            .range(["#ffffff", color]);  // Interpolates between white and the selected color

        // Create a map of category (country/region) and corresponding value
        const dataMap = {};
        categories.forEach((category, i) => {
            dataMap[category] = values[i];
        });

        const width = 800;
        const height = 600;

        // Clear the SVG canvas
        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create a group element to hold the map paths
        const mapGroup = svg.append('g');

        const projection = d3.geoMercator()
            .scale(150)
            .translate([width / 2, height / 1.5]);

        const path = d3.geoPath().projection(projection);

        const tooltip = d3.select(tooltipRef.current);

        // Bind data and create the map
        mapGroup.selectAll('path')
            .data(worldGeoJson.features)
            .join('path')
            .attr('d', path)
            .attr('fill', d => {
                // Get country name
                const countryName = d.properties.name;
                // Get corresponding value from dataMap
                const value = dataMap[countryName] || 0; // Default to 0 if no value
                return colorScale(value);
            })
            .attr('stroke', '#ccc')
            .attr('stroke-width', 0.5)
            .on('mouseover', function (event, d) {
                const countryName = d.properties.name;
                const value = dataMap[countryName] || 'No Data';
                tooltip.style("display", "block")
                    .style("opacity", 1)
                    .html(`<strong>${countryName}</strong>: ${value}`);
                d3.select(this).attr('stroke', '#000');
            })
            .on('mousemove', function (event) {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on('mouseout', function () {
                tooltip.style("display", "none").style("opacity", 0);
                d3.select(this).attr('stroke', '#ccc');
            });

        // Create a color legend
        const legendWidth = 300;
        const legendHeight = 10;

        const legendSvg = svg.append('g')
            .attr('transform', `translate(${width - legendWidth - 20},${height - 40})`);

        const legendScale = d3.scaleLinear()
            .domain([d3.min(values), d3.max(values)])
            .range([0, legendWidth]);

        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5);

        // Create a gradient for the legend
        const gradient = legendSvg.append('defs')
            .append('linearGradient')
            .attr('id', 'legend-gradient');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', "#ffffff");  // Start with white

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', color);  // End with the selected color from Redux

        legendSvg.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#legend-gradient)');

        // Append the axis to the legend
        legendSvg.append('g')
            .attr('transform', `translate(0, ${legendHeight})`)
            .call(legendAxis);

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])  // Set the zoom scale range
            .on('zoom', (event) => {
                mapGroup.attr('transform', event.transform);  // Apply the zoom and pan transformations
            });

        // Apply the zoom behavior to the SVG
        svg.call(zoom);

    }, [categories, values, color]);  // Also depend on the `color` from Redux

    return (
        <div>
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef} className="maptooltip" style={{ display: 'none', position: 'absolute', opacity: 0 }}></div>
        </div>
    );
};

export default ChoroplethMap;
