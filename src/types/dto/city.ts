import { Types } from "mongoose";
import { IAttack } from "../attack";

export interface CityDTO extends Document {
    name: string,
    attacks: IAttack[],
    casualties: number
}