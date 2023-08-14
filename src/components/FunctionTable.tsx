import React from 'react';
import { SeriesData, SeriesFunction } from '../data/store/SeriesStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';
import { functions } from '../data/store/SeriesStore';

const FunctionTable: React.FC = () => {
  const { seriesStore } = useStore();

  return (
    <>
      {(seriesStore.series !== undefined) && (
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  {seriesStore.series.label}
                </TableCell>
                {seriesStore.series?.data.map((datum: SeriesData, datumIndex: number) => (
                  <TableCell key={datumIndex}>
                    X<sub>{datumIndex}</sub>: {datum.primary}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {functions.map((func: SeriesFunction, funcIndex: number) => (
                <TableRow key={funcIndex}>
                  <TableCell>{func.method.name}(X)</TableCell>
                  {seriesStore.series?.data.map((datum: SeriesData, datumIndex: number) => (
                    <TableCell key={datumIndex}>
                      Y<sub>{datumIndex}</sub>: {func.method(datum.primary)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default observer(FunctionTable);