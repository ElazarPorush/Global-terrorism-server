import { City } from "../models/collections";
import { CityDTO } from "../types/dto/city";


export const getSortedOrganizationsInArea = async (area: string) => {
    try {
        //@ts-ignore
        const city: CityDTO = await City.findOne({ name: area }).populate('attacks'); 
        if (!city) {
            throw new Error('City not found');
        }
        
        const attackCounts : {[key: string]:number}= {};
        for (const attack of city.attacks) {
            attackCounts[attack.organization_name] = (attackCounts[attack.organization_name] || 0) + 1;
        }
        
        const organizations = Object.entries(attackCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        return organizations;
    } catch (err) {
        throw err;
    }
}
