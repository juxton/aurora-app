import React from 'react';
import { Chart as TanChart, AxisOptions } from 'react-charts';
import { SeriesData, SeriesFunction, functions } from '../data/store/SeriesStore';
import { observer } from 'mobx-react-lite';
import { useStore } from '../data/store';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';

type Point = {
  x: number
  y: number
}

type ChartData = {
  label: string
  data: Point[]
}

const Chart = (props: any) => {
  const clamp: number = 2;
  const { seriesStore } = useStore();

  const data: ChartData[] = functions.map((func: SeriesFunction) => {
    return {
      label: func.method.name,
      data: props.data.map((datum: SeriesData) => {
        const y: number = Number(func.method(datum.primary).toFixed(2));

        return {
          x: datum.primary,
          y: (y >= -clamp && y <= clamp) ? y : null,
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
        padding: 50,
        tooltip: {
          render: (props) => (
            <Card variant='outlined'>
              <CardContent>
                <strong>{props.focusedDatum?.seriesLabel}(X<sub>{props.focusedDatum?.index}</sub>)</strong><br />
                X<sub>{props.focusedDatum?.index}</sub>: {props.focusedDatum?.primaryValue}<br />
                Y<sub>{props.focusedDatum?.index}</sub>: {props.focusedDatum?.secondaryValue}
              </CardContent>
            </Card>
          )
        }
      }}
    />
  );
}

export default Chart;