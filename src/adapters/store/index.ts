import { StoreInterface } from "../../domain/port/store/store";
import { CandleRepository } from "../repositories/candle";
import { CandleStore } from "./candle";
import { PositionStore } from "./positions";

export const Store:StoreInterface = Object.freeze({
  candles: CandleStore(new CandleRepository()),
  positions: PositionStore()
})

