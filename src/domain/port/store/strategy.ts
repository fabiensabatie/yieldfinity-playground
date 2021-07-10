import { Strategy } from "yieldfinity";

export interface StrategyStoreInterface {
  strategies: Strategy[];
  console: string;
  loading: boolean;
  showConsole: boolean;
  set: (strategies: Strategy[]) => Promise<void>;
  setConsole: (console: string) => Promise<void>;
  setShowConsole: (show: boolean) => Promise<void>;
}