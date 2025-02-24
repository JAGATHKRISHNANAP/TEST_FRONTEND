// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import './TextChart.css';
// import { fetchHelloData } from '../../utils/api';
// import { useSelector } from 'react-redux';

// const Dendrogram = () => {
//   const [data, setData] = useState(null);
//   const svgRef = useRef();
//   const dimensions = { width: 960, height: 600 };
//   const margin = { top: 20, right: 90, bottom: 30, left: 90 };
//   const hierarchyLevel = useSelector((state) => state.chart.xAxis);

//   console.log("hierarchyLevels", hierarchyLevel);

//   // Fetch the data from the backend and transform it
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const result = await fetchHelloData();  // Fetching data from the backend
//         console.log("result['data frame']----------------", result);
//         const hierarchicalData = transformToHierarchy(result['data frame']); // Transform fetched data to hierarchy
//         setData(hierarchicalData);  // Set the hierarchical data to state
//         console.log("hierarchicalData...........", hierarchicalData); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     getData();
//   }, [hierarchyLevel]); // Add hierarchyLevel as a dependency

//   // Transform flat data into a hierarchical structure dynamically based on the array of levels
//   const transformToHierarchy = (flatData) => {
//     const hierarchyLevels = hierarchyLevel;
//     console.log("hierarchyLevels", hierarchyLevels);

//     // Recursively group data based on the levels defined in the hierarchy array
//     const groupByLevels = (data, levels) => {
//       if (levels.length === 0) return data; // Base case: no more levels to group

//       // Group the data by the current level, then recursively group by remaining levels
//       const [currentLevel, ...remainingLevels] = levels;
//       const groupedData = d3.group(data, d => d[currentLevel]);

//       return new Map(Array.from(groupedData, ([key, value]) => {
//         // Recursively group further if more levels exist
//         if (remainingLevels.length > 0) {
//           return [key, groupByLevels(value, remainingLevels)];
//         }
//         return [key, value]; // If no more levels, return the grouped value
//       }));
//     };

//     // Create the nested data structure
//     const nestedData = groupByLevels(flatData, hierarchyLevels);

//     // Convert the nested data into a d3 hierarchy format
//     const hierarchy = d3.hierarchy(nestedData, ([key, value]) => Array.isArray(value) ? null : Array.from(value));

//     // Initially, collapse all nodes except the root
//     hierarchy.each((d) => {
//       if (d.depth === 0) {
//         d.children = d.children;  // Keep the root expanded
//       } else {
//         d._children = d.children;  // Collapse all other nodes
//         d.children = null;
//       }
//     });

//     return hierarchy;
//   };

//   // Toggle the children of a node
//   const toggleChildren = (d) => {
//     if (d.children) {
//       d._children = d.children;  // Collapse the children
//       d.children = null;
//     } else {
//       d.children = d._children;  // Expand the children
//       d._children = null;
//     }
//   };

//   // Function to get color based on the depth
//   const getNodeColor = (d) => {
//     const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']; // Darker colors for each level
//     return colors[d.depth] || '#333';
//   };

  
//   const generateDendrogram = (hierarchicalData) => {
//     const svg = d3.select(svgRef.current);
//     const width = dimensions.width;
//     const height = dimensions.height;

//     svg.selectAll('*').remove();  // Clear previous renderings

//     const treeLayout = d3.tree().size([height, width - 160]);
//     const root = treeLayout(hierarchicalData);
//     root.x0 = height / 2;
//     root.y0 = 0;

//     const updateDendrogram = (source) => {
//       const nodes = root.descendants().reverse();
//       const links = root.links();

//       treeLayout(root);

//       const dynamicWidth = Math.max(
//         dimensions.width,
//         nodes.reduce((max, d) => Math.max(max, d.depth * 180), 0) + margin.right + margin.left
//       );
//       svg.attr('width', dynamicWidth);

//       nodes.forEach((d) => {
//         d.y = d.depth * 180;
//       });

//       // ****** Links Section ******
//       const link = svg.selectAll('.link')
//         .data(links, (d) => d.target.id);

//       link.enter().append('path')
//         .attr('class', 'link')
//         .attr('d', (d) => {
//           const o = { x: source.x0, y: source.y0 };
//           return d3.linkHorizontal()
//             .x((o) => o.y)
//             .y((o) => o.x)({ source: o, target: o });
//         })
//         .merge(link)
//         .transition().duration(750)
//         .attr('d', d3.linkHorizontal()
//           .x((d) => d.y)
//           .y((d) => d.x));

//       link.exit().transition().duration(750)
//         .attr('d', (d) => {
//           const o = { x: source.x, y: source.y };
//           return d3.linkHorizontal()
//             .x((o) => o.y)
//             .y((o) => o.x)({ source: o, target: o });
//         })
//         .remove();

//       // ****** Nodes Section ******
//       const node = svg.selectAll('.node')
//         .data(nodes, (d) => d.id || (d.id = `${d.data[0]}-${d.depth}`));

//       const nodeEnter = node.enter().append('g')
//         .attr('class', (d) => `node ${d.children ? 'node--internal' : 'node--leaf'}`)
//         .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
//         .on('click', (event, d) => {
//           toggleChildren(d);  // Toggle node's children on click
//           updateDendrogram(d);  // Update the dendrogram after toggle
//         });

//       nodeEnter.append('circle')
//         .attr('r', 10)
//         .style('fill', (d) => getNodeColor(d)); // Set color based on depth

//       nodeEnter.append('text')
//         .attr('dy', '.35em')
//         .attr('x', (d) => (d.children || d._children ? -12 : 12))
//         .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
//         .text((d) => d.data[0]);

//       const nodeUpdate = nodeEnter.merge(node);
//       nodeUpdate.transition().duration(750)
//         .attr('transform', (d) => `translate(${d.y},${d.x})`);

//       nodeUpdate.select('circle')
//         .attr('r', 10)
//         .style('fill', (d) => getNodeColor(d)); // Update color on transition

//       const nodeExit = node.exit().transition().duration(750)
//         .attr('transform', (d) => `translate(${source.y},${source.x})`)
//         .remove();

//       nodeExit.select('circle').attr('r', 0);

//       nodes.forEach((d) => {
//         d.x0 = d.x;
//         d.y0 = d.y;
//       });
//     };

//     updateDendrogram(root);  // Initial rendering
//   };

//   // Effect to generate dendrogram when data or hierarchyLevel is updated
//   useEffect(() => {
//     if (data) {
//       generateDendrogram(data);  // Generate the dendrogram when data is available
//     }
//   }, [data]);

//   console.log("dimensions.height", dimensions.height); 

//   return (
//     <div>
//       <div style={{ margin: '10px', border: '1px solid black', display: 'flex', backgroundColor: 'white', marginLeft: '1px', width: '100%', height: '50%' }}>
//         <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
//       </div>
//     </div>
//   );
// };

// // export default Dendrogram;
// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import './TextChart.css';

// const Dendrogram = ({ categories = [], values = [], aggregation }) => {
//   const [data, setData] = useState(null);
//   const svgRef = useRef();
//   const dimensions = { width: 960, height: 600 };
//   const margin = { top: 20, right: 90, bottom: 30, left: 90 };

//   useEffect(() => {
//     if (categories.length > 0 && values.length > 0) {
//       const hierarchicalData = transformToHierarchy(categories, values, aggregation);
//       console.log("hierarchicalData:", hierarchicalData); // Check the structure!
//       setData(hierarchicalData);
//     } else {
//       setData(null);
//     }
//   }, [categories, values, aggregation]);

//   const transformToHierarchy = (categories, values, aggregation) => {
//     if (!categories || categories.length === 0 || !values || values.length === 0) {
//       return null;
//     }

//     const data = categories.map((category, index) => ({ ...category, value: values[index] || 0 }));
//     console.log("Combined Data:", data); // Check the combined data

//     const hierarchyLevels = Object.keys(categories[0]).reverse(); // Reverse the order

//     console.log("hierarchyLevels", hierarchyLevels);

//     const groupByLevels = (data, levels) => {
//       if (levels.length === 0) return data;

//       const [currentLevel, ...remainingLevels] = levels;
//       const groupedData = d3.group(data, (d) => d[currentLevel]);

//       return new Map(Array.from(groupedData, ([key, value]) => {
//         if (remainingLevels.length > 0) {
//           return [key, groupByLevels(value, remainingLevels)];
//         }
//         return [key, value];
//       }));
//     };

//     const nestedData = groupByLevels(data, hierarchyLevels);
//     const hierarchy = d3.hierarchy(nestedData, ([key, value]) => Array.isArray(value) ? null : Array.from(value));

//     hierarchy.each((d) => {
//       if (d.depth === 0) {
//         d.children = d.children;
//       } else {
//         d._children = d.children;
//         d.children = null;
//       }
//     });

//     return hierarchy;
//   };
//   const toggleChildren = (d) => {
//     if (d.children) {
//       // Collapse this node
//       d._children = d.children;
//       d.children = null;
//     } else {
//       // Expand only direct children, keeping deeper levels collapsed
//       d.children = d._children;
//       d._children = null;
  
//       // Ensure that grandchildren remain collapsed
//       if (d.children) {
//         d.children.forEach((child) => {
//           if (child.children) {
//             child._children = child.children;
//             child.children = null;
//           }
//         });
//       }
//     }
//   };
  
  


//   const getNodeColor = (d) => {
//     const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
//     return colors[d.depth] || '#333';
//   };

//   const generateDendrogram = (hierarchicalData) => {
//     if (!hierarchicalData) return;

//     const svg = d3.select(svgRef.current);
//     const width = dimensions.width;
//     const height = dimensions.height;

//     svg.selectAll('*').remove();

//     const treeLayout = d3.tree().size([height, width - 160]);
//     const root = treeLayout(hierarchicalData);
//     root.x0 = height / 2;
//     root.y0 = 0;

//     const updateDendrogram = (source) => {
//       const nodes = root.descendants().reverse();
//       const links = root.links();

//       treeLayout(root);

//       const dynamicWidth = Math.max(
//         dimensions.width,
//         nodes.reduce((max, d) => Math.max(max, d.depth * 180), 0) + margin.right + margin.left
//       );
//       svg.attr('width', dynamicWidth);

//       nodes.forEach((d) => {
//         d.y = d.depth * 180;
//       });

//       // Links
//       const link = svg.selectAll('.link')
//         .data(links, (d) => d.target.id);

//       link.enter().append('path')
//         .attr('class', 'link')
//         .attr('d', (d) => {
//           const o = { x: source.x0, y: source.y0 };
//           return d3.linkHorizontal()({ source: o, target: o });
//         })
//         .merge(link)
//         .transition().duration(750)
//         .attr('d', d3.linkHorizontal()
//           .x((d) => d.y)
//           .y((d) => d.x));

//       link.exit().transition().duration(750)
//         .attr('d', (d) => {
//           const o = { x: source.x, y: source.y };
//           return d3.linkHorizontal()({ source: o, target: o });
//         })
//         .remove();

//       // Nodes
//       const node = svg.selectAll('.node')
//         .data(nodes, (d) => d.id || (d.id = `${d.data[0]}-${d.depth}`));

//       const nodeEnter = node.enter().append('g')
//         .attr('class', (d) => `node ${d.children ? 'node--internal' : 'node--leaf'}`)
//         .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
//         .on('click', (event, d) => {
//           toggleChildren(d);
//           updateDendrogram(d);
//         });

//       nodeEnter.append('circle')
//         .attr('r', 10)
//         .style('fill', (d) => getNodeColor(d));

//       nodeEnter.append('text')
//         .attr('dy', '.35em')
//         .attr('x', (d) => (d.children || d._children ? -12 : 12))
//         .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
//         .text((d) => d.data[0]);

//       const nodeUpdate = nodeEnter.merge(node);
//       nodeUpdate.transition().duration(750)
//         .attr('transform', (d) => `translate(${d.y},${d.x})`);

//       nodeUpdate.select('circle')
//         .attr('r', 10)
//         .style('fill', (d) => getNodeColor(d));

//       const nodeExit = node.exit().transition().duration(750)
//         .attr('transform', (d) => `translate(${source.y},${source.x})`)
//         .remove();

//       nodeExit.select('circle').attr('r', 0);

//       nodes.forEach((d) => {
//         d.x0 = d.x;
//         d.y0 = d.y;
//       });
//     };

//     updateDendrogram(root); // Call updateDendrogram here!
//   };

//   useEffect(() => {
//     if (data) {
//       generateDendrogram(data);
//     }
//   }, [data]);

//   return (
//     <div>
//       <div style={{ margin: '10px', border: '1px solid black', display: 'flex', backgroundColor: 'white', marginLeft: '1px', width: '100%', height: '50%' }}>
//         <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
//       </div>
//     </div>
//   );
// };

// export default Dendrogram;

// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import './TextChart.css';

// const Dendrogram = ({ categories = [], values = [], aggregation }) => {
//   const [data, setData] = useState(null);
//   const svgRef = useRef();
//   const dimensions = { width: 960, height: 600 };
//   const margin = { top: 20, right: 90, bottom: 30, left: 90 };

//   useEffect(() => {
//     if (categories.length > 0 && values.length > 0) {
//       const hierarchicalData = transformToHierarchy(categories, values);
//       console.log('hierarchicalData:', hierarchicalData);
//       setData(hierarchicalData);
//     } else {
//       setData(null);
//     }
//   }, [categories, values]);

//   const transformToHierarchy = (categories, values) => {
//     if (!categories || categories.length === 0 || !values || values.length === 0) {
//       return null;
//     }

//     const root = { name: 'root', children: [] };

//     categories.forEach((category, index) => {
//       let currentLevel = root;
//       Object.values(category).slice().reverse().forEach((level, levelIndex, arr) => {
     
//       // Object.values(category).forEach((level, levelIndex, arr) => {
//         let node = currentLevel.children.find((child) => child.name === level);
//         if (!node) {
//           node = { name: level, children: [] };
//           currentLevel.children.push(node);
//         }
//         if (levelIndex === arr.length - 1) {
//           node.children.push({ name: values[index], value: values[index] });
//         }
//         currentLevel = node;
//       });
//     });

//     return d3.hierarchy(root);
//   };

//   const toggleChildren = (d) => {
//     if (d.children) {
//       d._children = d.children;
//       d.children = null;
//     } else {
//       d.children = d._children;
//       d._children = null;
//     }
//   };

//   const getNodeColor = (d) => {
//     const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
//     return colors[d.depth] || '#333';
//   };

//   const generateDendrogram = (hierarchicalData) => {
//     if (!hierarchicalData) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     const treeLayout = d3.tree().size([dimensions.height, dimensions.width - 160]);
//     const root = treeLayout(hierarchicalData);
//     root.x0 = dimensions.height / 2;
//     root.y0 = 0;

//     const updateDendrogram = (source) => {
//       const nodes = root.descendants();
//       const links = root.links();
//       treeLayout(root);

//       nodes.forEach((d) => {
//         d.y = d.depth * 180;
//       });

//       const link = svg.selectAll('.link').data(links, (d) => d.target.id);
//       link.enter()
//         .append('path')
//         .attr('class', 'link')
//         .merge(link)
//         .transition().duration(750)
//         .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));
//       link.exit().remove();

//       const node = svg.selectAll('.node').data(nodes, (d) => d.id || (d.id = d.data.name));
//       const nodeEnter = node.enter().append('g')
//         .attr('class', 'node')
//         .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
//         .on('click', (event, d) => {
//           toggleChildren(d);
//           updateDendrogram(d);
//         });

//       nodeEnter.append('circle')
//         .attr('r', 10)
//         .style('fill', (d) => getNodeColor(d));

//       nodeEnter.append('text')
//         .attr('dy', '.35em')
//         .attr('x', (d) => (d.children || d._children ? -12 : 12))
//         .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
//         .text((d) => d.data.name);

//       nodeEnter.merge(node)
//         .transition().duration(750)
//         .attr('transform', (d) => `translate(${d.y},${d.x})`);

//       node.exit().remove();
//     };

//     updateDendrogram(root);
//   };

//   useEffect(() => {
//     if (data) {
//       generateDendrogram(data);
//     }
//   }, [data]);

//   return (
//     <div>
//       <div style={{ margin: '10px', border: '1px solid black', backgroundColor: 'white', width: '100%', height: '50%' }}>
//         <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
//       </div>
//     </div>
//   );
// };

// export default Dendrogram;

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './TextChart.css';

const Dendrogram = ({ categories = [], values = [],aggragation=[] }) => {
  const [data, setData] = useState(null);
  const svgRef = useRef();
  const dimensions = { width: 960, height: 600 };
  const margin = { top: 20, right: 90, bottom: 30, left: 90 };

  useEffect(() => {
    if (categories.length > 0 && values.length > 0) {
      const hierarchicalData = transformToHierarchy(categories, values);
      console.log('Hierarchical Data:', hierarchicalData);
      setData(hierarchicalData);
    } else {
      setData(null);
    }
  }, [categories, values]);

  const transformToHierarchy = (categories, values) => {
    if (!categories || categories.length === 0 || !values || values.length === 0) {
      return null;
    }

    const root = { name: 'root', children: [] };

    categories.forEach((category, index) => {
      let currentLevel = root;
      Object.values(category)
        .slice()
        .reverse()
        .forEach((level, levelIndex, arr) => {
          let node = currentLevel.children.find((child) => child.name === level);
          if (!node) {
            node = { name: level, children: [] };
            currentLevel.children.push(node);
          }
          if (levelIndex === arr.length - 1) {
            node.children.push({ name: values[index], value: values[index] });
          }
          currentLevel = node;
        });
    });

    const rootNode = d3.hierarchy(root);

    // Collapse all children initially
    rootNode.descendants().forEach((d) => {
      if (d.depth > 0) {
        d._children = d.children;
        d.children = null;
      }
    });

    return rootNode;
  };

  const toggleChildren = (d) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  };

  const getNodeColor = (d) => {
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
    return colors[d.depth] || '#333';
  };

  const generateDendrogram = (hierarchicalData) => {
    if (!hierarchicalData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const treeLayout = d3.tree().size([dimensions.height, dimensions.width - 160]);
    const root = treeLayout(hierarchicalData);
    root.x0 = dimensions.height / 2;
    root.y0 = 0;

    const updateDendrogram = (source) => {
      const nodes = root.descendants();
      const links = root.links();
      treeLayout(root);

      nodes.forEach((d) => {
        d.y = d.depth * 180;
      });

      const link = svg.selectAll('.link').data(links, (d) => d.target.id);
      link
        .enter()
        .append('path')
        .attr('class', 'link')
        .merge(link)
        .transition()
        .duration(750)
        .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));
      link.exit().remove();

      const node = svg.selectAll('.node').data(nodes, (d) => d.id || (d.id = d.data.name));
      const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          toggleChildren(d);
          updateDendrogram(d);
        });

      nodeEnter.append('circle')
        .attr('r', 10)
        .style('fill', (d) => getNodeColor(d));

      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => (d.children || d._children ? -12 : 12))
        .attr('text-anchor', (d) => (d.children || d._children ? 'end' : 'start'))
        .text((d) => d.data.name);

      nodeEnter.merge(node)
        .transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      node.exit().remove();
    };

    updateDendrogram(root);
  };

  useEffect(() => {
    if (data) {
      generateDendrogram(data);
    }
  }, [data]);

  return (
    <div>
      <div style={{ margin: '10px', border: '1px solid black', backgroundColor: 'white', width: '100%', height: '50%' }}>
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
      </div>
    </div>
  );
};

export default Dendrogram;
