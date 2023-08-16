import { Container, Divider, Grid } from '@mui/material';

import SeriesTable from './components/SeriesTable';
import FunctionTable from './components/FunctionTable';
import FunctionChart from './components/FunctionChart';

function App() {
  return (
    <Container >
      <Grid container>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} minHeight={400}>
          <SeriesTable />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} minHeight={400}>
          <FunctionChart />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <FunctionTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;