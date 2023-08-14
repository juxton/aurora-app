import React from 'react';
import { Chart as TanChart, AxisOptions } from 'react-charts';
import { SeriesData, SeriesFunction, functions } from '../data/store/SeriesStore';

const Chart = (props: any) => {
  const data: any[] = functions.map((func: SeriesFunction) => {
    return {
      label: func.method.name,
      data: props.data.map((datum: SeriesData) => {
        return {
          x: datum.primary,
          y: func.method(datum.primary)
        }
      })
    }
  })

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.x,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.y,
      },
    ],
    []
  );

  return (
    <TanChart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
}

export default Chart;