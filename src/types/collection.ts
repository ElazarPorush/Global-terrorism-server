import { Schema, Document } from "mongoose"

export interface ICollection extends Document {
    name: string
    events: [Schema.Types.ObjectId]
    casualties: number
}