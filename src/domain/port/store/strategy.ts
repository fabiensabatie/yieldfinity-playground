import { Strategy, Position } from "yieldfinity";

export interface StrategyStoreInterface {
  strategies: Strategy[];
  console: string;
  loading: boolean;
  showConsole: boolean;
  results: {
    profit: number;
    pnl: number;
    capitalInvested: number;
  } | null;
  set: (strategies: Strategy[]) => Promise<void>;
  setConsole: (console: string, setPositions: (positions: Position[]) => Promise<void> ) => Promise<void>;
  setShowConsole: (show: boolean) => Promise<void>;
}