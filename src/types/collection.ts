import { Schema, Document } from "mongoose"

export interface ICollection extends Document {
    name: string
    attacks: [Schema.Types.ObjectId]
    casualties: number
}