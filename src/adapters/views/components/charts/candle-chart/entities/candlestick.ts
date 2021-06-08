import { UTCTimestamp } from "lightweight-charts";

export interface CandleStick {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}