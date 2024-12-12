import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, Divider} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FunctionsIcon from '@mui/icons-material/Functions';
import {setDraggedColumn } from '../../features/Dashboard-Slice/dashboardtableSlice';


function Columns() {
  const dispatch = useDispatch();
  const { columnInfo } = useSelector(state => state.dashboard);
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  const databaseName = useSelector((state) => state.database.databaseName);
  console.log('excelCheckedPaths:', excelCheckedPaths);
  console.log('csvCheckedPaths:', csvCheckedPaths);
  console.log('databaseName:', databaseName);
  const checkedPathss = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
  console.log('checkedPaths:', checkedPathss);

  const handleColumnClick = (columnName) => {
    dispatch(setDraggedColumn(columnName));
  };

  const handleDragStart = (event, columnName) => {
    event.dataTransfer.setData("columnName", columnName);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
          <React.Fragment>
            <CssBaseline />    
            <Box sx={{ overflow: 'auto', height: 'calc(100% - 64px)' }}>
              <List>
                {columnInfo.numeric_columns && columnInfo.numeric_columns.length > 0 ? (
                  columnInfo.numeric_columns.map((column, index) => (
                    // <Tooltip title={column} key={index}>
                      <ListItem
                        disablePadding
                        onClick={() => handleColumnClick(column)}
                        onDragStart={(event) => handleDragStart(event, column)}
                        draggable
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        <ListItemButton sx={{maxHeight:'25px',marginBottom:'5px'}}>
                          <ListItemIcon > 
                            <FunctionsIcon />
                          
                          <ListItemText sx={{marginLeft:'5px'}}>
                            <Typography noWrap variant={{ xs: 'caption', sm: 'body2', md: 'body1' }}>{column}</Typography>
                          </ListItemText>
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    // </Tooltip>

                  ))
                ) : (
                  <li></li>
                )}
              </List>
              <Divider />
              <List>
                {columnInfo.text_columns && columnInfo.text_columns.length > 0 ? (
                  columnInfo.text_columns.map((column, index) => (
                    // <Tooltip title={column} key={index}>
                      <ListItem
                        disablePadding
                        onClick={() => handleColumnClick(column)}
                        onDragStart={(event) => handleDragStart(event, column)}
                        draggable
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        <ListItemButton sx={{maxHeight:'25px',marginBottom:'5px'}}>
                          <ListItemIcon>
                            <TextFieldsIcon />

                          <ListItemText sx={{marginLeft:'5px'}}>
                            <Typography noWrap variant={{ xs: 'caption', sm: 'body2', md: 'body1' }}>{column}</Typography>
                          </ListItemText>
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    // </Tooltip>
                  ))
                ) : (
                  <li></li>
                )}
              </List>
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Columns;
