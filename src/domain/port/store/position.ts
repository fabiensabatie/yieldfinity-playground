import { Position } from "../../port/entities/position.port";

export interface PositionStoreInterface {
  positions: Position[];
  loading: boolean;
  set: (positions: Position[]) => Promise<void>;
}