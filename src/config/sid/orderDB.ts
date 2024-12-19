import fs from 'fs'
import { AttackType, Organization, City, Year } from '../../models/collections'
import Event from '../../models/attack'
import { Types } from 'mongoose'
import { IAttack } from '../../types/attack'
import { getCityName } from '../../utils/location'

export const orderDB = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear ||
                !event.imonth || !event.city ||
                !event.latitude || !event.longitude ||
                !event.attacktype1_txt || !event.gname
            ) {
                console.log('wrong')
                continue
            }
        if (event.city === "Unknown") {
            event.city = await getCityName(event.latitude, event.longitude)
            if (!event.city) {
                console.log('wrong location')
            }
        }
            const newEvent = new Event({
                year: event.iyear.toString(),
                month: event.imonth,
                city: event.city || "Unknown",
                lat: event.latitude,
                lon: event.longitude,
                attack_type: event.attacktype1_txt,
                organization_name: event.gname,
                casualties: (event.nkill || 0 + event.nwound || 0).toFixed()
            })
            number++
            console.log(number)
            await newEvent.save()
            await addRefToCollection(Year, newEvent.year, newEvent._id, newEvent.casualties)
            if (event.city) {
                await addRefToCollection(City, newEvent.city, newEvent._id, newEvent.casualties)
            }
            await addRefToCollection(Organization, newEvent.organization_name, newEvent._id, newEvent.casualties)
            await addRefToCollection(AttackType, newEvent.attack_type, newEvent._id, newEvent.casualties)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

const addRefToCollection = async (
    model: typeof Year | typeof Organization | typeof City | typeof AttackType,
    name: string,
    ref: Types.ObjectId | any,
    casualties: number
) => {
    try {
        const obj = await model.findOne({ name })
        if (obj) {
            obj.attacks.push(ref)
            const tempCasualties = obj.casualties
            obj.casualties = casualties + tempCasualties
            await obj.save()
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