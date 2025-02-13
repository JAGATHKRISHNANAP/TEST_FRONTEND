import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Skeleton,
  InputBase,
} from '@mui/material';
import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import Dashboard from '../dashbord-Elements/Dashboard';
import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api';
import tinycolor from 'tinycolor2';
import { useNavigate } from 'react-router';

const LoadExcelFile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
  const [tableNames, setTableNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theamColor = localStorage.getItem('theamColor');
  const lighterColor = tinycolor(theamColor).lighten(10).toString();
  const databaseName = localStorage.getItem('company_name');

  useEffect(() => {
    const fetchTableNames = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTableNamesAPI(databaseName);
        setTableNames(data.sort());
      } catch (error) {
        console.error('Error fetching table names:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTableNames();
  }, [databaseName]);

  useEffect(() => {
    if (selectedTable) {
      const fetchTableDetails = async () => {
        setIsLoading(true);
        try {
          const data = await fetchTableDetailsAPI(databaseName, selectedTable);
          setTableDetails(data);
        } catch (error) {
          console.error('Error fetching table details:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTableDetails();
    }
  }, [selectedTable, databaseName]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleLoadTable = () => {
    if (selectedTable) {
      dispatch(setShowDashboard(true));
      dispatch(setCheckedPaths([selectedTable]));
      console.log('Selected Table:', selectedTable);
      navigate('/create_charts', { state: { checkedPaths: [selectedTable] } });
    }
  };

  const limitedTableDetails = tableDetails ? tableDetails.slice(0, 5) : [];

  return (
    <React.Fragment>
      {!showDashboard ? (
        <Container
          sx={{
            height: '85vh',
            border: '1px solid #4287f5',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            position: 'relative',
            marginTop: '80px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: theamColor }}>
            <Toolbar>
              <Typography variant="h6">Select Table</Typography>
            </Toolbar>
          </AppBar>

          <Grid container spacing={4} sx={{ marginTop: '20px' }} justifyContent="center">
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <Select
                  value={selectedTable}
                  onChange={handleTableSelect}
                  displayEmpty
                  renderValue={(selected) => selected || 'Search and Select a table'}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 200 },
                    },
                  }}
                  input={
                    <InputBase
                      placeholder="Search..."
                      onChange={handleSearchChange}
                      sx={{
                        padding: '5px 10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        marginBottom: '8px',
                      }}
                    />
                  }
                >
                  {tableNames
                    .filter((tableName) =>
                      tableName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((tableName) => (
                      <MenuItem key={tableName} value={tableName}>
                        {tableName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {selectedTable && tableDetails && (
              <Grid item xs={12} sx={{ marginTop: '5px' }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {/* Table Details for {selectedTable}: */}
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 450, overflow: 'auto' }}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={200} />
                  ) : (
                    <Table>
                      <TableHead sx={{ backgroundColor: theamColor }}>
                        <TableRow>
                          {Object.keys(limitedTableDetails[0] || {}).map((key) => (
                            <TableCell key={key} sx={{ color: '#fff' }}>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {limitedTableDetails.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, idx) => (
                              <TableCell key={idx}>{value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Grid>
            )}
          </Grid>
          <Box sx={{ position: 'absolute', bottom: 16, right: 550 }}>
            <Button
              variant="contained"
              onClick={handleLoadTable}
              sx={{ backgroundColor: theamColor }}
              disabled={!selectedTable}
            >
              Load
            </Button>
          </Box>
        </Container>
      ) : (
        // <Dashboard checkedPaths={checkedPaths} />
        <div></div>
      )}
    </React.Fragment>
  );
};

export default LoadExcelFile;