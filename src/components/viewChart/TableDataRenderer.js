import React from 'react';

const TableDataRenderer = ({ data, chartDataFromStore, hierarchy, hierarchyData,hierarchyValues, result, fetchedData, heading, text_y_xis }) => {
  const renderTableData = () => {
    const tableStyles = {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '20px 0',
      fontSize: '18px',
      textAlign: 'center',
    };
    const thStyles = {
      borderBottom: '2px solid #ddd',
      padding: '12px 15px',
      textAlign: 'left',
    };
  
    const tdStyles = {
      borderBottom: '1px solid #ddd',
      padding: '8px 15px',
      textAlign: 'left',
    };
    if (data[5] === 'duealChart') {
      return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.series1 && chartDataFromStore.series2 ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Category</th>
              <th style={thStyles}>Series 1</th>
              <th style={thStyles}>Series 2</th>
            </tr>
          </thead>
          <tbody>
            {chartDataFromStore.categories.map((category, index) => (
              <tr key={index}>
                <td style={tdStyles}>{category}</td>
                <td style={tdStyles}>{chartDataFromStore.series1[index]}</td>
                <td style={tdStyles}>{chartDataFromStore.series2[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null;
    // } else if (data[5] === 'treeHierarchy') {
    //   return hierarchy && hierarchyData ? (
    //     <table style={tableStyles}>
    //       <thead>
    //         <tr>
    //           <th style={thStyles}>Hierarchy</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {hierarchyData.map((Hierarchy, index) => (
    //           <tr key={index}>
    //             <td style={tdStyles}>{hierarchy[index]}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : null;
  // } else if (data[5] === 'treeHierarchy') {
  //     return hierarchyData && hierarchyData.length > 0 ? (
  //       <table style={tableStyles}>
  //         <thead>
  //           <tr>
  //             <th style={thStyles}>Hierarchy</th>
  //             <th style={thStyles}>Data</th>
  //             <th style={thStyles}>Value</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {hierarchyData.map((item, index) => (
  //             <tr key={index}>
  //               <td style={tdStyles}>{hierarchy[index]}</td>
  //               <td style={tdStyles}>{JSON.stringify(item)}</td>
  //               <td style={tdStyles}>{hierarchyValues}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     ) : <p>No hierarchy data available</p>;
} else if (data[5] === 'treeHierarchy') {
  return hierarchyData && hierarchyData.length > 0 ? (
    <table style={tableStyles}>
      <thead>
        <tr>
          <th style={thStyles}>Hierarchy</th>
          <th style={thStyles}>Data</th>
          <th style={thStyles}>Value</th>
        </tr>
      </thead>
      <tbody>
        {hierarchyData.map((item, index) => (
          <tr key={index}>
            <td style={tdStyles}>{hierarchy?.[index] || "N/A"}</td>
            <td style={tdStyles}>{Object.values(item).join(", ")}</td>  
            <td style={tdStyles}>{hierarchyValues?.[index] || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : <p>No hierarchy data available</p>;

    
    } else if (data[5] === 'singleValueChart') {
      return fetchedData ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>{heading}</th>
              <th style={thStyles}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyles}>{text_y_xis}</td>
              <td style={tdStyles}>{result}</td>
            </tr>
          </tbody>
        </table>
      ) : null;
    } else {
      return chartDataFromStore && chartDataFromStore.categories && chartDataFromStore.values ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Category</th>
              <th style={thStyles}>Value</th>
            </tr>
          </thead>
          <tbody>
            {chartDataFromStore.categories.map((category, index) => (
              <tr key={index}>
                <td style={tdStyles}>{category}</td>
                <td style={tdStyles}>{chartDataFromStore.values[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null;
    }
  };
  
  return renderTableData();
};

export default TableDataRenderer;