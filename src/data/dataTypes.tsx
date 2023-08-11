export type SeriesData = {
  primary: number
};

export type Series = {
  label: string  
  data: SeriesData[]
};

export type SeriesFunction = {
  label: string,
  method: Function
}