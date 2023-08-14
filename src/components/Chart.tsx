import React from 'react';
import { Chart as TanChart, AxisOptions } from 'react-charts';
import { SeriesData, SeriesFunction, functions } from '../data/store/SeriesStore';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';

type Point = {
  x: number
  y: number
}

type ChartData = {
  label: string
  data: Point[]
}

const Chart = (props: any) => {
  const { seriesStore } = useStore();

  const data: ChartData[] = functions.map((func: SeriesFunction) => {
    return {
      label: `${func.method.name}()`,
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
      getValue: (datum) => datum.x
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.y,
        elementType: seriesStore.chartMode
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
        interactionMode: "closest",
        onClickDatum: (datum) => {
          console.log("Datum Click", datum)
        },
        padding: 50
      }}
    />
  );
}

export default Chart;