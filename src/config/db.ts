import { connect } from "mongoose";
import { orderDB } from "./sid/orderDB";
import Attack from "../models/attack";

export const connectToMongo = async () => {
    try {
        await connect(process.env.MONGO_URL as string);
        console.log('[database] mongo connected successfully');
        const attack = await Attack.findOne()
        if (!attack) {
            await orderDB()
            console.log('[database] data created')
        }
    } catch (err) {
        console.error(err);
    }
}