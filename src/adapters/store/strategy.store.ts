import { Strategy } from "yieldfinity";
import create from "zustand";
import { StrategyStoreInterface } from "../../domain/port/store/strategy";
import axios, { AxiosRequestConfig } from "axios";

declare const window: any;

export const StrategyStore = () => {
  return create<StrategyStoreInterface>(set => ({
    strategies : [],
    loading : false,
    console: "",
    showConsole: false,
    set: async (strategy: Strategy[]) => {
      set(state => ({ ...state, strategy }))
    },
    setShowConsole: async (show: boolean) => {
      set(state => ({ ...state, showConsole: show }))
    },
    setConsole: async (code: string) => {
      set(state => ({ ...state, console: code, loading: true }))
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const url = await window.RunKit["$runkit-embed-1"].getEndpointURL();
        setTimeout(() => {
          set(state => ({ ...state, showConsole: true,  loading: false }))
        }, 6000);
        console.log("Seazrching")
        const response = await axios.get(`http://www.whateverorigin.org/get?url=${encodeURIComponent(url)}`)
        console.log(JSON.parse(response.data.contents))
      } catch (err) { console.log(err)}
    },
  }))
}
