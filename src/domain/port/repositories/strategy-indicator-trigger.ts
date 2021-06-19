import { StrategyIndicatorTrigger } from "../../entities/strategy-indicator-trigger";

export interface StrategyIndicatorTriggerRepositoryInterface {
  get(): Promise<StrategyIndicatorTrigger[]>;
}