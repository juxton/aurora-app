import React from 'react';
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
import useDemoConfig from './data/useDemoConfig';
import LogTable from './components/LogTable';
import LogChart from './components/LogChart';
import './index.css';

function App() {
  const { data: config, randomizeData } = useDemoConfig({
    datums: 4,
    series: 10,
    dataType: "time",
  });

  const [data, setData] = React.useState(config)

  return (
    <Container sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid xs={7}><LogTable {...{ data }} /></Grid>
        <Grid xs={5}><LogChart {...{ data }} /></Grid>
      </Grid>
    </Container>
  )
}

export default App;