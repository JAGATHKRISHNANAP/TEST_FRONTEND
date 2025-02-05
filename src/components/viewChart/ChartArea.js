import React from 'react';

const ChartArea = ({ showBorder, borderSize, borderColor, children }) => {
  return (
    <div
      className="chart-area"
      style={{
        padding: "20px",
        border: showBorder ? `${borderSize} solid ${borderColor}` : "none",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export default ChartArea;