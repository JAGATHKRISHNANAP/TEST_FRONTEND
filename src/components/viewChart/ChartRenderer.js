import React from 'react';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import PolarAreaChart from '../charts/polarArea';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import LineChart from '../ChartViews/linechartview';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import TextChartView from '../ChartViews/textChartView';
import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
import AiMlChartData from '../ChartViews/AiMLChartsView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import ScatterChart from '../ChartViews/scatterChartView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import MapChart from '../ChartViews/mapChartView';
import WordCloud from '../ChartViews/wordCloudView';
import SingleValueChart from './SingleValueChart'; // Import the new component


const ChartRenderer = ({ data, chartDataFromStore, hierarchy, hierarchyData, aiChartData, aiMlChartData, result, fetchedData, width, handleResize }) => {
  const renderChart = () => {
    
    switch (data[5]) {
      case 'bar':
                if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                  return <BarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                }
                break;
              case 'pie':
                if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                  return <PieChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                }
                break;
                case 'polarArea':
                  if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                    return <PolarAreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                  }
                  break;
        
                case 'duealChart':
          if (
            chartDataFromStore?.categories?.length > 0 &&
            chartDataFromStore?.series1?.length > 0 &&
            chartDataFromStore?.series2?.length > 0
          ) {
            return (
              <DualAxisChart
                categories={chartDataFromStore.categories}
                series1={chartDataFromStore.series1.map(value => parseFloat(value))}
                series2={chartDataFromStore.series2.map(value => parseFloat(value))}
                aggregation={data[4]} x_axis={data[2]}
                y_axis1={data[3][0]} // Set y_axis1 to the first value in data[3]
          y_axis2={data[3][1]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} 
              />
            );
          }
          break;
        
              case 'line':
                if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                  return <LineChart categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
                }
                break;
                case 'area':
                  if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                    return <AreaChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
                  }
                  break;
              case 'animatedTreeChart':
                if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                //   return <AnimatedTreemap categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
                // }
                return <AnimatedTreemap categories={chartDataFromStore.categories} values={chartDataFromStore.values} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} chartColor={data[6]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                    }
                  break;
            case 'textChart':
                    if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                      return <TextChartView categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                    }
                        break;
              case 'sampleAitestChart':
                return <SampleAiTestChart data={aiChartData} />;
              case 'AiCharts':
                  return <AiMlChartData data={aiMlChartData} />;
                break;
              // case 'treeHierarchy':
              //   return <TreeHierarchyView x_axis={hierarchy} treeData={hierarchyData} />;
                // break;  
              case 'treeHierarchy':
                return <TreeHierarchyView x_axis={hierarchy} treeData={hierarchyData} />;
                // break;  
                case 'scatter':
                    if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                      return <ScatterChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]} />;
                    }
                    break;
                    case 'hierarchialBarChart':
                      if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                        return <HierarchialBarChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]}xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]} chartColor={data[6]}  />;
                      }
                      break;
                      // case 'wordCloud':
                      //   if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                      //     return <WordCloud categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))}  />;
                      //   }
                      //   break;
                    case 'mapchart':
                    if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                      return <MapChart categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} aggregation={data[4]} x_axis={data[2]} y_axis={data[3]} />;
                    }
                    break;
                    case 'wordCloud':
                        if (chartDataFromStore?.categories?.length > 0 && chartDataFromStore?.values?.length > 0) {
                          return <WordCloud categories={chartDataFromStore.categories} values={chartDataFromStore.values.map(value => parseFloat(value))} xFontSize={data[12]} fontStyle={data[13]} categoryColor={data[14]} yFontSize={data[15]} valueColor={data[16]}  />;
                        }
                        break;
        
      case 'singleValueChart':
        return <SingleValueChart width={width} heading={data[7]} result={result} fetchedData={fetchedData} handleResize={handleResize} minWidth={200} minHeight={50} />;
      default:
        return <div>No chart available</div>;
    }
  };

  return renderChart();
};

export default ChartRenderer;
