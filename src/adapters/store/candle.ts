import create from "zustand";
import { Exchange } from "../../domain/entities/exchange";
import { ExchangePair } from "../../domain/port/entities/exchange.port";
import { CandleStoreInterface } from "../../domain/port/store/candle";
import { CandleRepository } from "../repositories/candle";

export const CandleStore = (candleRepository: CandleRepository) => {
  return create<CandleStoreInterface>(set => ({
    candles : [],
    loading : false,
    set: async (startDate: Date, endDate: Date, pair: ExchangePair) => {
      set(state => ({ ...state, loading : true }))
      const candles = await candleRepository.get(new Exchange({ name: "Binance" }), startDate, endDate, pair)
      set(state => ({ ...state, candles, loading : false }))
    }
  }))
}
