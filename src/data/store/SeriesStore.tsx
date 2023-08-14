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
  label: string
  data: SeriesData[]
};

export type SeriesFunction = {
  method: Function
}

export const functions: SeriesFunction[] = [
  { method: Math.sin },
  { method: Math.cos },
  { method: Math.tan }
];

export class SeriesStore {
  series?: Series = undefined;
  chartMode: 'line' | 'area' | 'bar' | 'bubble' = 'bubble';

  constructor() {
    makeObservable(this, {
      series: observable,
      setSeries: action
    });
  }

  setSeries(_series: Series | undefined) {
    this.series = _series;
  }
}

export default new SeriesStore();