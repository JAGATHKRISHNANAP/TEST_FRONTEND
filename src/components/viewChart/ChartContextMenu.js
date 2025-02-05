import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const ChartContextMenu = ({ menuPosition, handleCloseMenu, toggleTableModal, handleRemove, borderColor, setBorderColor, borderSize, setBorderSize, showBorder, setShowBorder }) => {
  return (
    <Menu
      open={Boolean(menuPosition)}
      onClose={handleCloseMenu}
      anchorReference="anchorPosition"
      anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
    >
      <MenuItem onClick={toggleTableModal}>
        <VisibilityIcon sx={{ marginRight: "8px" }} /> View Data
      </MenuItem>
      <MenuItem onClick={handleRemove}>
        <DeleteIcon sx={{ marginRight: "8px" }} /> Delete Chart
      </MenuItem>
      <MenuItem>
        <label>Border Color:</label>
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
      </MenuItem>
      <MenuItem>
        <label>Border Size:</label>
        <select value={borderSize} onChange={(e) => setBorderSize(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="1px">1px</option>
          <option value="2px">2px</option>
          <option value="3px">3px</option>
          <option value="4px">4px</option>
          <option value="5px">5px</option>
        </select>
      </MenuItem>
      <MenuItem onClick={() => setShowBorder(!showBorder)}>
        {showBorder ? "Hide Border" : "Show Border"}
      </MenuItem>
    </Menu>
  );
};

export default ChartContextMenu;