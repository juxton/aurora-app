import { Container, Unstable_Grid2 as Grid } from '@mui/material';

import SeriesTable from './components/SeriesTable';
import FunctionTable from './components/FunctionTable';
import FunctionChart from './components/FunctionChart';

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid lg={6}>
          <SeriesTable />
        </Grid>
        <Grid lg={6}>
          <FunctionTable key="table" />
          {/* <FunctionChart {...{ data }} /> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;