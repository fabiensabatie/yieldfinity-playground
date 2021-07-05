import { Position } from "yieldfinity";

export interface PositionStoreInterface {
  positions: Position[];
  loading: boolean;
  set: (positions: Position[]) => Promise<void>;
}