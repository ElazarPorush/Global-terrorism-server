import mongoose, { Schema } from "mongoose";
import { ICollection } from "../types/collection";

const CitySchema  = new Schema<ICollection>({
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

export default mongoose.model<ICollection>("City", CitySchema);
