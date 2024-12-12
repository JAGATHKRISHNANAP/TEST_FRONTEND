import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const ContectMenu = React.forwardRef(({ position, onToolTipClick, onShowPopup, onCalculationFieldClick }, ref) => {
  console.log('position', position);
  console.log('onToolTipClick', onToolTipClick);
  console.log('onShowPopup', onShowPopup);
  console.log('onCalculationFieldClick', onCalculationFieldClick);
  const menuStyle = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div ref={ref} style={menuStyle}>
      <Paper sx={{ width: 200, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem onClick={onShowPopup}>
            <ListItemIcon>
              <QuestionAnswerIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Tool Tip</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
});

export default ContectMenu;
