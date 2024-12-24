import { addAttackToDatabase } from "../config/sid/orderDB"
import { AttackType, City, Year } from "../models/collections"
import { AttackFromData } from "../types/dto/attackDataDto"
import { CityDTO } from "../types/dto/city"
import { YearDTO } from "../types/dto/yearDto"
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
        const cities: any[] = await City.find({}).populate('attacks');
        const sortedCities = cities.map((city) => {
            let location = {}
            if (city.attacks.length > 0 && city.attacks[0] && city.attacks[0].lat && city.attacks[0].lon) {
                location = {
                    lat: city.attacks[0].lat,
                    lng: city.attacks[0].lon
                }
            }
            return {
                city: city.name,
                average: city.casualties / (city.attacks.length || 1),
                location: location
            }
        });
        const sorted = sortedCities.sort((a, b) => b.average - a.average).slice(0, 100);
        return sorted
    } catch (err) {
        throw err;
    }
};

export const getAttacksTypeByYear = async (year: YearDTO) => {
    try {
        const attacks: any = await Year.find({
            name: { $gte: year.from, $lte: year.to }
        }).populate('attacks');

        const attackCounts: { [key: string]: number } = {};
        for (const attack of attacks) {
            for (const atk of attack.attacks) {
                attackCounts[atk.attack_type] = (attackCounts[atk.attack_type] || 0) + 1;
            }
        }

        const attackTypes = Object.entries(attackCounts)
            .map(([name, count]) => ({ name, count }));
        return attackTypes;
    } catch (err) {
        throw err;
    }
};

export const addNewAttackToDatabase = async (attack: AttackFromData) => {
    try {
        await addAttackToDatabase(attack)
        return
    } catch (err) {
        throw err;
    }
};
