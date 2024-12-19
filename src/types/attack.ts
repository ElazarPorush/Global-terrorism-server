import { Document } from "mongoose"

export interface IAttack extends Document {
    _id: string
    year: string
    month: number
    city: string
    lat: number
    lon: number
    attack_type: string
    organization_name: string
    casualties: number
}