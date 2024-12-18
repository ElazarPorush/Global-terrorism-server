import { connect } from "mongoose";
import { orderDB } from "./sid/orderDB";
import Event from '../models/event'

export const connectToMongo = async () => {
    try {
        await connect('mongodb://localhost/Terrorism');
        console.log('[database] mongo connected successfully');
        const event = await Event.findOne()
        if (!event) {
            await orderDB()
            console.log('[database] data created')
        }
    } catch (err) {
        console.error(err);
    }
}