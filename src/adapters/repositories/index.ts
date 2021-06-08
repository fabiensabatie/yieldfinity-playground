import { RepositoriesInterface } from "../../domain/port/repositories/repositories";
import { CandleRepository } from "./candle";

class RepositoriesList implements RepositoriesInterface {
    public candles = new CandleRepository();
}

export const Repositories = new RepositoriesList(); 