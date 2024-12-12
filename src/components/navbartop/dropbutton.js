import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextAreaComponent from '../calculation-field/calculation';
import { submitCalculationData } from '../../utils/api'; // Import the API function
import { useSelector } from 'react-redux';

const options = ['calculation field', 'nill', 'nill'];

export default function SplitButton({ handleTableChange }) {
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [calculationData, setCalculationData] = React.useState({});
  const [reloadColumns, setReloadColumns] = React.useState(false); // State for reloading columns
  const databaseName = useSelector((state) => state.database.databaseName); 
  const dbTableName = useSelector((state) => state.dashboard.checkedPaths);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (options[index] === 'calculation field') {
      setModalOpen(true);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = { ...calculationData, databaseName, dbTableName };
      await submitCalculationData(dataToSubmit, setReloadColumns); // Pass setReloadColumns as an argument

      // Call the handleTableChange function after submission
      handleTableChange({ target: { value: dbTableName } });

      setModalOpen(false);
    } catch (error) {
      console.error('Error submitting calculation data:', error);
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >

         <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
      <ArrowDropDownIcon />
    </div>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, width: '200px' }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Calculation Field</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details for the calculation field.
          </DialogContentText>
          <TextAreaComponent onChange={setCalculationData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
