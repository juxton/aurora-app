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
  transform?: Transform = undefined;

  constructor() {
    makeObservable(this, {
      series: observable,
      setSeries: action
    });
    autorun(
      () => {
        if (this.series === undefined) {
          this.transform = undefined;
        } else {
          this.transform = {
            label: "Transform",
            data: this.series?.data.map((datum: SeriesData) => {
              return {
                x: datum.primary,
                y: functions[0].method(datum.primary)
              }
            })
          };
        }
      })
  }

  setSeries(_series: Series | undefined) {
    this.series = _series;
  }
}

export default new SeriesStore();