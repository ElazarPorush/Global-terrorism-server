import { AttackType, City, Year } from "../models/collections"
import { getCoordinates } from "../utils/location"

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
        const cities = await City.find();
        const sortedCities = await Promise.all(cities.map(async (city) => {
            const location = await getCoordinates(city.name);
            return {
                city: city.name,
                average: city.casualties / (city.attacks.length || 1),
                location: location
            };
        }))
        return sortedCities.sort((a, b) => b.average - a.average);
    } catch (err) {
        throw err;
    }
};
