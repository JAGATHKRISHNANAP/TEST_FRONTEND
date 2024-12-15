import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, InputLabel, AppBar,Toolbar,MenuItem, Button,Menu, IconButton, NativeSelect ,TextField , Checkbox,Grid, FormControlLabel,Dialog, DialogTitle, DialogContent, DialogActions,Card, CardContent, CardHeader} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './custom.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Select from '@mui/material/Select';
import { fetchTableNamesAPI, fetchColumnsAPI,performJoinOperation } from '../../utils/api';
const ItemTypes = {
  TABLE: 'table',
};

const DraggableTable = ({ tableName }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TABLE,
    item: { name: tableName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        fontsize:"10",
        padding: '10px',
        margin: '10px',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        borderRadius: '5px',
        textAlign: 'justify-center',
      }}
    >
      {tableName}
    </Box>
  );
};

const DropZone = ({ droppedTables, setDroppedTables, setConnections, handleOpenReviewModal , joinTableName, handleJoinTableNameChange}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For controlling the dialog

  const tableSpacing = 350;
  const topPadding = 25;
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TABLE,
    drop: (item) => {
      const fixedPositionX = 50;
      const fixedPositionY = 50;

      setDroppedTables((prev) => {
        const updatedTables = [...prev];
        const newTable = {
          name: item.name,
          x: updatedTables.length === 0 ? fixedPositionX : updatedTables[updatedTables.length - 1].x + tableSpacing,
          y: updatedTables.length === 0 ? fixedPositionY : updatedTables[updatedTables.length - 1].y,
        };
        updatedTables.push(newTable);

        if (updatedTables.length === 2) {
          setConnections([[0, 1]]);
        }

        return updatedTables;
      });
    },
  }));

  const handleRemoveTable = (index) => {
    setDroppedTables((prev) => prev.filter((_, idx) => idx < index));
    setConnections((connections) => connections.filter(([start, end]) => start !== index && end !== index));
    handleClose();
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedTable(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTable(null);
  };
  const handleSaveClick = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Box
      className="dropzone"
      ref={drop}
      sx={{
        height: '330px',
        width: '99.5%',
        position: 'relative',
        backgroundColor: 'white',
        padding: `${topPadding}px 2px 2px 2px`,
      }}
    >
      {droppedTables.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            color: 'gray',
            fontSize: '18px',
            lineHeight: '400px',
          }}
        >
          Drag table here
        </Box>
      )}

      {droppedTables.length > 1 && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {droppedTables.map((_, index) => {
            if (index === droppedTables.length - 1) return null;
            const startTable = droppedTables[index];
            const endTable = droppedTables[index + 1];
            const startX = startTable.x + 125;
            const startY = startTable.y + 25;
            const endX = endTable.x + 125;
            const endY = endTable.y + 25;

            return (
              <line
                key={index}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="black"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>
      )}

      {droppedTables.map((table, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: table.x,
            top: table.y,
            padding: '12px',
            width: '250px',
            height: '50px',
            backgroundColor: 'lightblue',
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          <div>{table.name}</div>
          <IconButton
            onClick={(event) => handleClick(event, index)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
            size="small"
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={selectedTable === index} onClose={handleClose}>
            <MenuItem onClick={() => handleRemoveTable(index)}>Remove</MenuItem>
          </Menu>
        </Box>
      ))}
      {droppedTables.length > 1 && (
  <Box
    sx={{
      position: 'absolute',
      bottom: '20px',
      left: '90%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',   
      gap: '16px',       
    }}
  >
    <Button
      onClick={handleOpenReviewModal}
      sx={{
        color: 'white',
        backgroundColor: '#1976d2',
        '&:hover': { backgroundColor: '#115293' },
        padding: '8px 16px',
        fontSize: '14px',
        textTransform: 'uppercase',
      }}
    >
      Join
    </Button>
    
    <Button
      onClick={handleSaveClick}
      sx={{
        color: 'white',
        backgroundColor: '#1976d2',
        '&:hover': { backgroundColor: '#115293' },
        padding: '8px 16px',
        fontSize: '14px',
        textTransform: 'uppercase',
      }}
    >
      Save
    </Button>
    
    {/* Dialog for Save Button */}
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Save Joined Table</DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: '30px', width: '250px', margin: '0 auto' }}>
          <TextField
            label="Joined Table Name"
            variant="outlined"
            value={joinTableName}
            onChange={handleJoinTableNameChange}
            placeholder="Enter join table name"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDialogClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
)}

    </Box>
  );
};



const JoinConfigSection = ({
  droppedTables,
  columns,
  handleJoinKeyChange,
  handleJoinTypeChange,
  handleRemoveTable,
  handleRemoveJoin,
  // joinTableName,
  // handleJoinTableNameChange,
  handleColumnSelectionChange,
  // handleOpenReviewModal, 
}) => {
  return (
    <Box
      sx={{
        position: 'relative', 
        marginTop: '0px',
        padding: '40px',
        borderRadius: '8px',
        width: 500,
        backgroundColor: 'white',
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'left',
          marginBottom: '40px',
          fontSize: '24px',
          fontWeight: 'bold',
          textTransform: 'uppercase', 
        }}
      >
        Configure Joins
      </Typography>
      {droppedTables.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', 
            gap: '20px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '90%',
            height: 'auto',
            marginBottom: '20px',
            marginTop:'40px'
          }}
        >
          {/* Table 1 */}
          <Box sx={{ textAlign: 'center',marginBottom: '35px' }}>
            <Typography
              variant="body1"
              
              sx={{ marginBottom: '30px' }}
            >
              {droppedTables[0]?.name || 'Table 1'}
            </Typography>
            <NativeSelect
              defaultValue=""
              inputProps={{
                name: 'joinKey',
                id: 'uncontrolled-native-0',
              }}
              sx={{
                width: '180px', // Set the desired width
                padding: '5px', // Optional for better spacing
              }}
              onChange={(e) => handleJoinKeyChange(0, e.target.value)} // Added the onChange handler
            >
              <option value="" disabled>
                Select Join Key
              </option>
              {columns[droppedTables[0].name] &&
                [
                  ...(columns[droppedTables[0].name].text_columns || []),
                  ...(columns[droppedTables[0].name].numeric_columns || []),
                ].map((col, idx) => (
                  <option key={idx} value={col}>
                    {col}
                  </option>
                ))}
            </NativeSelect>
          </Box>

          {/* Join Type */}
          <Box sx={{ textAlign: 'center'   }}>
            <Select
              value={droppedTables[0].joinType || 'INNER JOIN'}
              onChange={(e) => handleJoinTypeChange(0, e.target.value)}
              displayEmpty
              sx={{ width: '180px' }}
            >
              <MenuItem value="INNER JOIN">INNER JOIN</MenuItem>
              <MenuItem value="LEFT JOIN">LEFT JOIN</MenuItem>
              <MenuItem value="RIGHT JOIN">RIGHT JOIN</MenuItem>
              <MenuItem value="FULL JOIN">FULL JOIN</MenuItem>
            </Select>
          </Box>

          {/* Table 2 */}
          <Box sx={{ textAlign: 'center' ,marginBottom: '35px'}}>
            <Typography
              variant="body1"
              sx={{  marginBottom: '30px'  }}
            >
              {droppedTables[1]?.name || 'Table 2'}
            </Typography>
            <NativeSelect
              defaultValue=""
              inputProps={{
                name: ' joinKey',
                id: 'uncontrolled-native-1',
              }}
              sx={{
                width: '180px', // Set the desired width
              }}
              onChange={(e) => handleJoinKeyChange(1, e.target.value)} // Handle join key selection for Table 2
            >
              <option value="" disabled>
                Select Join Key  
              </option>
              {columns[droppedTables[1].name] &&
                [
                  ...(columns[droppedTables[1].name].text_columns || []),
                  ...(columns[droppedTables[1].name].numeric_columns || []),
                ].map((col, idx) => (
                  <option key={idx} value={col}>
                    {col}
                  </option>
                ))}
            </NativeSelect>
          </Box>
          
          <IconButton
            onClick={() => handleRemoveJoin(1)} // Adjust index as needed for dynamic joins
            color="secondary"
            sx={{ marginLeft: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  

  );
};
const CustomJoinWithFetchTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [columns, setColumns] = useState({});
  const [droppedTables, setDroppedTables] = useState([]);
  const [connections, setConnections] = useState([]);
  const [joinedData, setJoinedData] = useState(null); 
  const theamColor = localStorage.getItem('theamColor');
  const [joinType, setJoinType] = useState('INNER JOIN');
  const [joinTableName, setJoinTableName] = useState(''); 
  const databaseName = localStorage.getItem('company_name');
  const [selectedColumns, setSelectedColumns] = useState({}); 
  const [reviewModalOpen, setReviewModalOpen] = useState(false);


  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const data = await fetchTableNamesAPI(databaseName);
        setTableNames(data);
      } catch (error) {
        console.error('Error in fetchTableNames:', error);
      }
    };
  
    fetchTableNames();
  }, [databaseName]);
  
  useEffect(() => {
    const fetchColumns = async () => {
      const fetchedColumns = {};
      await Promise.all(
        tableNames.map(async (table) => {
          try {
            const columns = await fetchColumnsAPI(table, databaseName);
            fetchedColumns[table] = columns;
          } catch (error) {
            console.error(`Error in fetchColumns for table ${table}:`, error);
          }
        })
      );
      setColumns(fetchedColumns);
    };
  
    fetchColumns();
  }, [tableNames, databaseName]);

  const handleOpenReviewModal = () => {
    setReviewModalOpen(true);
  };

  const handleCancelJoin = () => {
    setReviewModalOpen(false); // Close the modal without any action
  };

  

  const constructSQLQuery = () => {
    const tables = droppedTables.map((table) => table.name); 
  
    const formattedSelectedColumns = Object.entries(selectedColumns).flatMap(
      ([tableName, columns]) =>
        columns.map((column) => `${tableName}.${column}`) 
    );
    const formattedJoinColumns = droppedTables.reduce((acc, table) => {
      acc[table.name] = table.joinKey;
      return acc;
    }, {});
    const joinConditions = tables
      .slice(1)
      .map(
        (table, index) =>
          `${tables[index]}.${formattedJoinColumns[tables[index]]} = ${table}.${formattedJoinColumns[table]}`
      )
      .join(` ${joinType} `);

    return `
      CREATE OR REPLACE VIEW ${joinTableName} AS
        SELECT ${formattedSelectedColumns}
        FROM ${tables[0]}
        ${tables
          .slice(1)
          .map((table, index) => `${joinType} ${table} ON ${joinConditions}`)
          .join(' ')}
    `.trim();
  };

  const handleJoinKeyChange = (index, value) => {
    const updatedTables = [...droppedTables];
    updatedTables[index].joinKey = value;
    setDroppedTables(updatedTables);
  };

  const handleJoinTypeChange = (index, value) => {
    const updatedTables = [...droppedTables];
    updatedTables[index].joinType = value;
    setDroppedTables(updatedTables);
  };

  const handleColumnSelection = (tableName, columnName, isChecked) => {
    setSelectedColumns((prev) => {
      const updated = { ...prev };
      if (!updated[tableName]) {
        updated[tableName] = [];
      }
      if (isChecked) {
        if (!updated[tableName].includes(columnName)) {
          updated[tableName].push(columnName);
        }
      } else {
        updated[tableName] = updated[tableName].filter((col) => col !== columnName);
      }
      return updated;
    });
  };
  

  const handleRemoveJoin = (index) => {
    const updatedTables = droppedTables.filter((_, i) => i !== index);
    setDroppedTables(updatedTables);
  };
  
  const handleJoinTableNameChange = (e) => {
    setJoinTableName(e.target.value);
  };

  const handleConfirmJoin = async () => {
    const query = constructSQLQuery();
    console.log('Executing Query:', query);
    setReviewModalOpen(false); 
    const tables = droppedTables.map((table) => table.name);
    const formattedSelectedColumns = Object.entries(selectedColumns).flatMap(
      ([tableName, columns]) =>
        columns.map((column) => `${tableName}.${column}`)  );
  
    const formattedJoinColumns = droppedTables.reduce((acc, table) => {
      acc[table.name] = table.joinKey; 
      return acc;
    }, {});
  
    const payload = {
      tables, 
      selectedColumns: formattedSelectedColumns, 
      joinColumns: formattedJoinColumns,
      joinType, 
      databaseName: localStorage.getItem('company_name'), 
      joinedTableName: joinTableName, 
    };
  
    try {
      const result = await performJoinOperation(payload);
      console.log('Join result:', result);
      setJoinedData(result); 
      setJoinTableName(''); 
      setDroppedTables([]); 
      setConnections([]); 
    } catch (error) {
      console.error('Error in handleJoinSubmit:', error);
    }
  };
  
  

return (
  <DndProvider backend={HTML5Backend}>
    <Grid container spacing={2} sx={{ height: '93vh', padding: '10px', boxSizing: 'border-box',marginTop:'50px' }}>
      {/* Left Panel */}
      <Grid item xs={12} md={2.5} sx={{ maxHeight: '92.5vh', overflowY: 'auto' }}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          <CardHeader
            title={
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  backgroundColor: 'white',
                }}
              >
                Tables
              </Typography>
            }
          />
          <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
            {tableNames.map((table) => (
              <DraggableTable key={table} tableName={table} />
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Right Panel */}
      <Grid item xs={12} md={9.5}>
        <Grid container spacing={2} sx={{ height: '75vh' }}>
          {/* Drop Zone Section */}
          <Grid item xs={12}>
            <Box sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', maxHeight: '335px', overflowY: 'auto' }}>
              <DropZone
                droppedTables={droppedTables}
                setDroppedTables={setDroppedTables}
                setConnections={setConnections}
                handleOpenReviewModal={handleOpenReviewModal}
                joinTableName={joinTableName}
                handleJoinTableNameChange={handleJoinTableNameChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
              <Grid container spacing={2}>
                {/* Join Config Section */}
                <Grid item xs={12} md={6.2}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      height: '380px', // Fixed height for Join Config
                      overflowY: 'auto',
                    }}
                  >
                    <JoinConfigSection
                      droppedTables={droppedTables}
                      handleRemoveJoin={handleRemoveJoin}
                      columns={columns}
                      handleJoinKeyChange={handleJoinKeyChange}
                      handleJoinTypeChange={handleJoinTypeChange}
                    />
                  </Box>
                </Grid>

                {/* Columns Preview Section */}
                <Grid item xs={12} md={5.8}>
                  <Box
                    sx={{
                      backgroundColor: droppedTables.length === 0 ? '#f0f0f0' : 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      height: '380px', // Fixed height for Columns Preview
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {droppedTables.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '20px',
                          overflowX: 'auto',
                          width: '100%',
                        }}
                      >
                        {droppedTables.slice(0, 2).map((table, index) => (
                          <Box
                            key={index}
                            sx={{
                              minWidth: '280px',
                              width: '48%',
                              padding: '10px',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                              overflowY: 'auto',
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                              {table.name}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              {columns[table.name] ? (
                                [
                                  ...(columns[table.name].text_columns || []),
                                  ...(columns[table.name].numeric_columns || []),
                                ].map((col, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    control={
                                      <Checkbox
                                        checked={selectedColumns[table.name]?.includes(col)}
                                        onChange={(e) =>
                                          handleColumnSelection(table.name, col, e.target.checked)
                                        }
                                      />
                                    }
                                    label={col}
                                  />
                                ))
                              ) : (
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                  No columns available for this table
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography
                        variant="h6"
                        sx={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}
                      >
                        Data preview unavailable
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {/* Modal for Reviewing SQL Query */}
    <Dialog open={reviewModalOpen} onClose={handleCancelJoin}>
      <DialogTitle>Review SQL Query</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{constructSQLQuery()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelJoin}>Cancel</Button>
        <Button onClick={handleConfirmJoin} color="primary">
          Confirm Join
        </Button>
      </DialogActions>
    </Dialog>
  </DndProvider>
);
};

export default CustomJoinWithFetchTables;






