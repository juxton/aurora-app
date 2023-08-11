import React from 'react';
import { SeriesData, SeriesFunction } from '../data/dataTypes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';

const FunctionTable: React.FC = () => {
  const { seriesStore } = useStore();

  const functions: SeriesFunction[] = [
    { label: "sin()", method: Math.sin },
    { label: "cos()", method: Math.cos },
    { label: "exp()", method: Math.exp },
    { label: "tan()", method: Math.tan }
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                {seriesStore.series?.label || "Please Select Series"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Method
              </TableCell>
              {seriesStore.series?.data.map((datum: SeriesData, datumIndex: number) => (
                <TableCell key={datumIndex}>
                  {datum.primary}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
              {functions.map((func: SeriesFunction, funcIndex: number) => (
                <TableRow key={funcIndex}>
                  <TableCell>{func.label}</TableCell>
                  {seriesStore.series?.data.map((datum: SeriesData, datumIndex: number) => (
                    <TableCell key={datumIndex}>{func.method(datum.primary)}</TableCell>  
                  ))}
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default observer(FunctionTable);