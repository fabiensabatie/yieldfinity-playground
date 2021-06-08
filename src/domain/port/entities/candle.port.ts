import { ExchangeInterval } from "./exchange.port";

export interface CandleProps {
  openAt : Date;
  closeAt : Date;
  open : number;
  close : number;
  high : number;
  low : number;
  volume : number;
  exchange : string;
  interval: ExchangeInterval;
}
