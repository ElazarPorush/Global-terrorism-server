import fs from 'fs'
import Year from '../../models/year'
import City from '../../models/city'
import Organization from '../../models/organization'
import Attack from '../../models/attack'
import Event from '../../models/event'
import { Types } from 'mongoose'

export const orderDB = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear ||
                !event.imonth || !event.city ||
                !event.latitude || !event.longitude ||
                !event.attacktype1_txt || !event.gname ||
                !event.nkill || !event.nwound
            ) {
                console.log('wrong')
                continue
            }
            const newEvent = new Event({
                year: event.iyear.toString(),
                month: event.imonth,
                city: event.city,
                lat: event.latitude,
                lon: event.longitude,
                attack_type: event.attacktype1_txt,
                organization_name: event.gname,
                casualties: (event.nkill + event.nwound).toFixed()
            })
            number++
            console.log(number)
            await newEvent.save()
            await addRefToCollection(Year, newEvent.year, newEvent._id, newEvent.casualties)
            await addRefToCollection(City, newEvent.city, newEvent._id, newEvent.casualties)
            await addRefToCollection(Organization, newEvent.organization_name, newEvent._id, newEvent.casualties)
            await addRefToCollection(Attack, newEvent.attack_type, newEvent._id, newEvent.casualties)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

const addRefToCollection = async (
    model: typeof Year | typeof Organization | typeof City | typeof Attack,
    name: string,
    ref: Types.ObjectId | any,
    casualties: number
) => {
    try {
        const object = await model.findOne({ name })
        if (object) {
            object.events.push(ref)
            const tempCasualties = object.casualties
            object.casualties = casualties + tempCasualties
            await object.save()
        }
        else {
            const newObject = new model({
                name,
                events: [ref],
                casualties
            })
            await newObject.save()
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}