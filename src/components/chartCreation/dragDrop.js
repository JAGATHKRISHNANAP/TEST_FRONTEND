import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { setAggregate } from '../../features/Dashboard-Slice/chartSlice';

function AggregationInput({ aggregate }) {
    const dispatch = useDispatch();

    return (
         <div className="input-fields">
                         {/* <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}> */}
                           <FormControl style={{ width: '200px', marginLeft: '30px', marginTop: '5px' }}>
                             <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
                             <NativeSelect
                               style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
                               inputProps={{
                                 name: 'age',
                                 id: 'uncontrolled-native',
                               }}
                             >
                               <option value="sum">Sum</option>
                               <option value="average">Average</option>
                               <option value="count">Count</option>
                               <option value="minimum">Minimum</option>
                               <option value="maximum">Maximum</option>
                               <option value="variance">Variance</option>
                             </NativeSelect>
                           </FormControl>
       
                         </div>
                           
                         
    );
}

export default AggregationInput;

