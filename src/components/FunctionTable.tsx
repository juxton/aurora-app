import React from 'react';
import { SelectedDatum, SeriesData, SeriesFunction } from '../data/store/SeriesStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';
import { functions } from '../data/store/SeriesStore';

const FunctionTable: React.FC = () => {
  const { seriesStore } = useStore();

  const mungeRowActive = (datum: SelectedDatum | undefined, index: number) => {
    return (datum?.seriesIndex == index);
  }

  const mungeColumnClass = (datum: SelectedDatum | undefined, method: string) => {
    if (datum?.method == method) {
      return 'active';
    }
    return undefined;
  }

  return (
    <>
      {(seriesStore.series !== undefined) && (
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  X
                </TableCell>
                {functions.map((func: SeriesFunction, funcIndex: number) => (
                    <TableCell key={funcIndex}>{func.method.name}()</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {seriesStore.series?.data.map((datum: SeriesData, datumIndex: number) => (
                  <TableRow key={datumIndex} selected={mungeRowActive(seriesStore.datum, datumIndex)}>
                    <TableCell>X<sub>{datumIndex}</sub></TableCell>
                    <TableCell>{datum.primary}</TableCell>
                    {functions.map((func: SeriesFunction, funcIndex: number) => (
                      <TableCell 
                        key={funcIndex} 
                        className={mungeColumnClass(seriesStore.datum, func.method.name)}
                      >
                        {Number(func.method(datum.primary)).toFixed(2)}
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