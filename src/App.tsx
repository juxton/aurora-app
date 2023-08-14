import { Container, Grid } from '@mui/material';

import SeriesTable from './components/SeriesTable';
import FunctionTable from './components/FunctionTable';
import FunctionChart from './components/FunctionChart';

function App() {
  return (
    <Container>
      <Grid container>
        <Grid item lg={6}>
          <SeriesTable />
        </Grid>
        <Grid item lg={5}>
          <FunctionChart />
        </Grid>
        <Grid item lg={12}>
          <FunctionTable />
        </Grid>
      </Grid>
      
    </Container>
  )
}

export default App;