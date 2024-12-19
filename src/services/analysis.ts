import { AttackType, City, Year } from "../models/collections"
import { getCityName } from "../utils/location"

export const getSortedAttacksByType = async () => {
    try {
        const attacks = await AttackType.find().sort({ casualties: -1 }).select('-attacks')
        return attacks
    } catch (err) {
        throw err
    }
}

export const getHighestCasualtyCities = async () => {
    try {
        const cities = await City.find()
        const sortedCities = cities.map(city => ({
            ...city.toObject(),
            average: city.casualties / (city.attacks.length || 1)
        }))
        .sort((a, b) => b.average - a.average); 
        return sortedCities.map(({ attacks, casualties, ...rest }) => rest);
    } catch (err) {
        throw err
    }
} 