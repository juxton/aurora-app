import seriesStore, { SeriesStore } from './SeriesStore';

export type RootStore = {
  seriesStore: SeriesStore;
}

const rootStore: RootStore = {
  seriesStore
};

export default rootStore;