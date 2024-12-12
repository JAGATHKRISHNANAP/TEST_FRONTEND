import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Checkbox, Grid, Box, AppBar, Toolbar, Typography, Button, CircularProgress} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import Dashboard from '../dashbord-Elements/Dashboard';
import { fetchDirectoryStructure, toggleExpand, handleCheckboxChange,setShowDashboard, setCheckedPaths  } from '../../features/csvFile/LoadCsvFileSlice';
// import { useNavigate } from 'react-router-dom';
const LoadCsvFile = () => {
    const dispatch = useDispatch();
    const { directoryStructure, expandedDirectories, checkedItems,  showDashboard, checkedPaths,loading } = useSelector((state) => state.loadCsv);

    useEffect(() => {
        dispatch(fetchDirectoryStructure());
    }, [dispatch]);

    // const navigate = useNavigate();

    const logCheckedItems = () => {
        const checkedPaths = Object.keys(checkedItems)
            .filter(key => checkedItems[key] && key.endsWith('.csv'))
            .map(key => key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.')));
        dispatch(setShowDashboard(true));
        dispatch(setCheckedPaths(checkedPaths));
        console.log('Checked CSV file names:', checkedPaths);
        // navigate('/dashboard_csv'); // Navigate to the dashboard route
    };

    const renderDirectory = (path) => {
        const directory = directoryStructure[path || ''];
        if (!directory) return null;

        return (
            <List component="div" disablePadding>
                {directory.dirs.map((dir) => {
                    const fullPath = path ? `${path}/${dir}` : dir;
                    const isExpanded = expandedDirectories[fullPath];
                    return (
                        <div key={fullPath}>
                            <ListItemButton onClick={() => dispatch(toggleExpand(fullPath))}>
                                <ListItemIcon>
                                    <DescriptionIcon />
                                </ListItemIcon>
                                <ListItemText primary={dir} />
                                {isExpanded ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                {renderDirectory(fullPath)}
                            </Collapse>
                        </div>
                    );
                })}
                {directory.files.map((file) => {
                    const fullPath = path ? `${path}/${file}` : file;
                    return (
                        <ListItemButton key={fullPath} sx={{ pl: 6 }}>
                            <Checkbox
                                checked={!!checkedItems[fullPath]}
                                onChange={(event) => dispatch(handleCheckboxChange({ path: fullPath, checked: event.target.checked }))}
                            />
                            <ListItemText primary={file} />
                        </ListItemButton>
                    );
                })}
            </List>
        );
    };

    return (
        <React.Fragment>
      {!showDashboard ? (
        <Container sx={{ height: '85vh', border: '1px solid #4287f5', borderRadius: '10px', backgroundColor: '#ffffff', position: 'relative' }}>
          <AppBar position="static" sx={{ backgroundColor: '#4287f5' }}>
            <Toolbar>
              <Typography variant="h6">
                Load Csv File
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '30px' }}>
            <Grid item xs={12} sm={6} md={4}>
              {loading ? (
                <CircularProgress />
              ) : (
                renderDirectory('')
              )}
            </Grid>
          </Grid>
          <Box sx={{ position: 'absolute', bottom: 16, right: 16, margin: '30px' }}>
            <Button variant="contained" onClick={logCheckedItems}>Load</Button>
          </Box>
        </Container>
      ) : (
        <Dashboard checkedPaths={checkedPaths} />
        // <li></li>   
      )}
    </React.Fragment>
    );
};

export default LoadCsvFile;



