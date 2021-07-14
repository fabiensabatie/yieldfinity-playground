import { Strategy } from "yieldfinity";
import create from "zustand";
import { StrategyStoreInterface } from "../../domain/port/store/strategy";
import axios, { AxiosRequestConfig } from "axios";
import { Store } from ".";
import { Order, Position } from "yieldfinity";

declare const window: any;

export const StrategyStore = () => {
  return create<StrategyStoreInterface>(set => ({
    strategies : [],
    loading : false,
    console: "",
    showConsole: false,
    results: null,
    set: async (strategy: Strategy[]) => {
      set(state => ({ ...state, strategy }))
    },
    setShowConsole: async (show: boolean) => {
      set(state => ({ ...state, showConsole: show }))
    },
    setConsole: async (code: string, setPositions: (positions: Position[]) => Promise<void> ) => {
      set(state => ({ ...state, console: code, loading: true }))
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const url = await window.RunKit["$runkit-embed-1"].getEndpointURL();
        setTimeout(() => {
          set(state => ({ ...state, showConsole: true,  loading: false }))
        }, 6000);
        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        let { positions, results } = JSON.parse(response.data.contents);
        positions = positions.map((position:any) => ({
          ...position,
          state : {
            ...position.state,
            openAt: new Date(position.state.openAt),
            closeAt: new Date(position.state.closeAt),
        }}))
        setPositions(positions);
        set(state => ({ ...state, results }))
      } catch (err) { console.log(err)}
    },
  }))
}
