// import create from "zustand";
// import { Exchange } from "../../domain/entities/exchange";
// import { ExchangePair } from "../../domain/port/entities/exchange.port";
// import { PositionStoreInterface } from "../../domain/port/store/candle";
// import { PositionRepository } from "../repositories/candle";

// export const PositionStore = () => {
//   return create<PositionStoreInterface>(set => ({
//     positions : [],
//     loading : false,
//     set: async (startDate: Date, endDate: Date, pair: ExchangePair) => {
//       set(state => ({ ...state, positions, loading : false }))
//     }
//   }))
// }
