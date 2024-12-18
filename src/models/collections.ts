import mongoose, { Schema } from "mongoose";
import { ICollection } from "../types/collection";

const CollectionSchema  = new Schema<ICollection>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    events: {
        ref: "Event",
        type: [Schema.Types.ObjectId],
        default: []
    },
    casualties: {
        type: Number,
        default: 0
    }  
});

export const City = mongoose.model<ICollection>("City", CollectionSchema);
export const Year = mongoose.model<ICollection>("Year", CollectionSchema);
export const Organization = mongoose.model<ICollection>("Organization", CollectionSchema);
export const Attack = mongoose.model<ICollection>("Attack", CollectionSchema);
