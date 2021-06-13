import create from "zustand";
import { Position } from "../../domain/port/entities/position.port";
import { PositionStoreInterface } from "../../domain/port/store/position";

export const PositionStore = () => {
  return create<PositionStoreInterface>(set => ({
    positions : [],
    loading : false,
    set: async (positions: Position[]) => {
      set(state => ({ ...state, positions }))
    },
  }))
}
