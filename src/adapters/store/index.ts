import { StoreInterface } from "../../domain/port/store/store";
import { CandleRepository } from "../repositories/candle";
import { CandleStore } from "./candle";

export const Store:StoreInterface = Object.freeze({
  candles: CandleStore(new CandleRepository())
})

