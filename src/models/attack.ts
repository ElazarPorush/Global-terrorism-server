import mongoose, { Schema, Document, Types } from "mongoose";
import { IAttack } from "../types/attack";

const AttackSchema = new Schema<IAttack>({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true,
        min: 0
    },
    city: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    attack_type: {
        type: String,
        required: true
    },
    organization_name: {
        type: String,
        required: true
    },
    casualties: {
        type: Number,
        required: true,
        default: 0
    },
});

export default mongoose.model<IAttack>("Attack", AttackSchema);
