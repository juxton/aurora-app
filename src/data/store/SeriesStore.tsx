import { observable, action, computed, makeObservable, autorun } from "mobx";

export type Transform = {
  label: string
  data: TransformData[]
}

export type TransformData = {
  x: number
  y: number
}

export type SeriesData = {
  primary: number
};

export type Series = {
  id: number
  data: SeriesData[]
};

export type SeriesFunction = {
  method: Function
}

export const functions: SeriesFunction[] = [
  { method: Math.sin },
  { method: Math.tan },
  { method: Math.cos }
];

export type SelectedDatum = {
  seriesIndex: number
  method: string
}

export class SeriesStore {
  datum?: SelectedDatum = undefined;
  series?: Series = undefined;
  chartMode: 'line' | 'area' | 'bar' | 'bubble' = 'line';

  constructor() {
    makeObservable(this, {
      datum: observable,
      series: observable,
      setSeries: action,
      setDatum: action
    });
  }

  setSeries(_series: Series | undefined) {
    this.series = _series;
    this.setDatum(undefined);
  }

  setDatum(_datum: SelectedDatum | undefined) {
    this.datum = _datum;
  }
}

export default new SeriesStore();