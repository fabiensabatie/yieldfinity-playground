import { Candle } from "../../entities/candle";
import { Indicator } from "../../entities/indicator";

export interface StrategyProps {
  indicators: Indicator[];
  candles: Candle[];
}