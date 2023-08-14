import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';
import Chart from './Chart';

const FunctionChart: React.FC = () => {
  const { seriesStore } = useStore();

  return (
    <>
      {(seriesStore.series?.data !== undefined) && <Chart data={seriesStore.series.data} />}
    </>
  );
}

export default observer(FunctionChart);