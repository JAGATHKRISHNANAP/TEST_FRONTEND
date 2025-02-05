import React, { useState } from 'react';

const ChartWrapper = ({ children, style }) => {
  const [borderSize, setBorderSize] = useState('1px');
  const [borderColor, setBorderColor] = useState('#000000');
  const [showBorder, setShowBorder] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const closeMenu = () => setMenuVisible(false);
  const currentBorder = showBorder ? `${borderSize} solid ${borderColor}` : 'none';

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        position: 'relative',
        padding: '20px',
        minHeight: '450px',
        border: currentBorder,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}

      {menuVisible && (
        <div
          style={{
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
          onMouseLeave={closeMenu}
        >
          <div style={{ marginBottom: '8px' }}>
            <label>Border Size:&nbsp;
              <select value={borderSize} onChange={(e) => setBorderSize(e.target.value)}>
                <option value="0px">0px</option>
                <option value="1px">1px</option>
                <option value="2px">2px</option>
                <option value="3px">3px</option>
                <option value="4px">4px</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label>Border Color:&nbsp;
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
            </label>
          </div>
          <div>
            <label>Show Border:&nbsp;
              <input type="checkbox" checked={showBorder} onChange={(e) => setShowBorder(e.target.checked)} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartWrapper;
