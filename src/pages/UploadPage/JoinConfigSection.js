import React from 'react';
import { Box, Typography, NativeSelect, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const JoinConfigSection = ({
  droppedTables,
  columns,
  handleJoinKeyChange,
  handleJoinTypeChange,
  handleRemoveJoin,
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
            marginTop: '40px'
          }}
        >
          {/* Table 1 */}
          <Box sx={{ textAlign: 'center', marginBottom: '35px' }}>
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
          <Box sx={{ textAlign: 'center' }}>
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
          <Box sx={{ textAlign: 'center', marginBottom: '35px' }}>
            <Typography
              variant="body1"
              sx={{ marginBottom: '30px' }}
            >
              {droppedTables[1]?.name || 'Table 2'}
            </Typography>
            <NativeSelect
              defaultValue=""
              inputProps={{
                name: 'joinKey',
                id: 'uncontrolled-native-1',
              }}
              sx={{
                width: '180px', // Set the desired width
                padding: '5px', // Optional for better spacing
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

export default JoinConfigSection;