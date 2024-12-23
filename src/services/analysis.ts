import { AttackType, City, Year } from "../models/collections"
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
        //@ts-ignore
        const cities: CityDTO[] = await City.find({}).populate('attacks');
        const sortedCities = await Promise.all(cities.map(async (city) => {
            let location: { lat: number, lng: number } = { lat: 0, lng: 0 }
            if (!city.attacks[0] || !city.attacks[0].lat || !city.attacks[0].lon) {
                const coordinates = await getCoordinates(city.name);
                if (coordinates) {
                    location = coordinates!
                }
                else if (city.attacks[1] && city.attacks[1].lat && city.attacks[1].lon) {
                    location = {
                        lat: city.attacks[1].lat as number,
                        lng: city.attacks[1].lon as number
                    }
                }
            }
            else {
                location = {
                    lat: city.attacks[0].lat as number,
                    lng: city.attacks[0].lon as number
                }
            }
            return {
                city: city.name,
                average: city.casualties / (city.attacks.length || 1),
                location: location
            };
        }))
        const sorted = sortedCities.sort((a, b) => b.average - a.average).slice(0, 20);
        console.log('Done')
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
