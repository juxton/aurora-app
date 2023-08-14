import { Container, Divider, Grid } from '@mui/material';

import SeriesTable from './components/SeriesTable';
import FunctionTable from './components/FunctionTable';
import FunctionChart from './components/FunctionChart';

function App() {
  return (
    <Container >
      <Grid container>
        <Grid item xl={6} minHeight={400}>
          <SeriesTable />
        </Grid>
        <Grid item xl={6} minHeight={400} minWidth={400}>
          <FunctionChart />
        </Grid>
        <Grid item xl={12}>
          <FunctionTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;