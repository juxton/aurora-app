import { observable, action, makeObservable } from "mobx";
import { Series } from "../dataTypes";

export class SeriesStore {
  series?: Series = undefined

  constructor() {
    makeObservable(this, {
      series: observable,
      setSeries: action
    })
  }

  setSeries(_series: Series | undefined) {
    this.series = _series;
  }
}

export default new SeriesStore();