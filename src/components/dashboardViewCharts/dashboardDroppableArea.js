import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import { ResizableBox } from 'react-resizable';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import MapViewChart from '../ChartViews/mapChartView';
import PolarAreaChart from '../charts/polarArea';
import Scatter from '../ChartViews/scatterChartView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import SampleAiTestChart  from '../ChartViews/sampleAiTestChartView'; 

const DroppableArea = () => {
  const droppableAreaRef = useRef(null);
  const chartdata = useSelector((state) => state.viewdashboard.dashboard_charts);
  const textChart = useSelector((state) => state.viewdashboard.textChart);

  // const [hierarchy,setHierarchy]=useState(null);
  // const [hierarchyData,setHierarchyData]=useState(null);

  useEffect(() => {
    console.log("chartdata", chartdata);
  }, [chartdata]);

  return (
    <div 
      ref={(node) => {
        droppableAreaRef.current = node;
      }}
      style={{ 
        position: 'relative', 
        backgroundColor: 'white', 
        padding: '10px', 
        border: '1px solid #ccc', 
        minHeight: '85vh',
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '10px',
        overflow: 'hidden',  // Prevent overflow of dragged items outside the area
      marginTop: '2px'

      }}
    >
        {
            textChart && textChart.length > 0 ? (
                textChart.map((text, index) => (
                    <div key={index}>
                        {text.chart_type === 'singleValueChart' && (
                        <div>
                            <div style={{ textAlign: 'center' }}>
                            <h3>{text.chart_heading.replace(/"/g, '')}</h3>
                            <p>{text.value.total_x_axis}</p>
                            </div>
                        </div>
                        )}
                    </div>
                ))
            ) : (
                <p></p>
            )
        }

      {chartdata && chartdata.length > 0 ? (
        chartdata.map((chart, index) => (
          // console.log("dataframe_dict-----------------------------------------------------", chart.dataframe_dict),
          console.log("dataframe_dict-----------------------------------------------------", chart.histogram_details),
          console.log("X_axis-----------------------------------------------------", chart.aggregate),
          // console.log("Y_axis-----------------------------------------------------", chart.chart_type), 
          <div key={index} >
            {chart.chart_type === 'bar' && (
              <BarChart
                categories={chart.categories}
                values={chart.values}
                x_axis={chart.x_axis}
                y_axis={chart.y_axis}
              />
            )}
            {/* You can add other chart types here */}
            {chart.chart_type === 'pie' && (
              <PieChart
                categories={chart.categories}
                values={chart.values}
              />
            )}
            {chart.chart_type === 'line' && (
              <LineChart
                categories={chart.categories}
                values={chart.values}
                aggregation={chart.aggregate}
                x_axis={chart.x_axis}
                y_axis={chart.y_axis}
              />
            )}
            {chart.chart_type === 'area' && (
              <AreaChart
                categories={chart.categories}
                values={chart.values}
              />
            )}


          {chart.chart_type === 'polarArea' && (
                        <PolarAreaChart
                          categories={chart.categories}
                          values={chart.values}
                        />
                      )}

          {chart.chart_type === 'scatter' && (
                        <Scatter
                          categories={chart.categories}
                          values={chart.values}
                        />
                      )}
            {chart.chart_type === 'hierarchialBarChart' && (
              <HierarchialBarChart
              categories={chart.categories}
              values={chart.values}
              x_axis={chart.x_axis}
              y_axis={chart.y_axis}
              />
            )}
          
          {chart.chart_type === 'treeHierarchy' && (
                        <TreeHierarchyView x_axis={chart.x_axis} treeData={chart.dataframe_dict} />
                      )}

          {chart.chart_type === 'sampleAitestChart' && (
                                  <SampleAiTestChart data={chart.histogram_details} />
                                )}

          {chart.chart_type === 'mapchart' && (
              <MapViewChart
                categories={chart.categories}
                values={chart.values}
              />
            )}
            {chart.chart_type === 'animatedTreeChart' && (
              <AnimatedTreemap
                categories={chart.categories}
                values={chart.values}
                chartColor={chart.chart_color}
              />
            )}
            {chart.chart_type === 'duealChart' && (
              <DualAxisChart
                categories={chart.categories}
                series1={chart.series1}
                series2={chart.series2}
                aggregation={chart.aggregate}
                x_axis={chart.x_axis}
                y_axis1={chart.y_axis1}
                y_axis2={chart.y_axis2}
              />
            )}



{chart.chart_type === 'polarArea' && (
                        <PolarAreaChart
                          categories={chart.categories}
                          values={chart.values}
                        />
                      )}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default DroppableArea;


