import { City, Year } from "../models/collections";
import { CityDTO } from "../types/dto/city";


export const getSortedOrganizationsInArea = async (area: string) => {
    try {
        //@ts-ignore
        const city: CityDTO = await City.findOne({ name: area }).populate('attacks'); 
        if (!city) {
            throw new Error('City not found');
        }
        
        const organizationCount : {[key: string]:number}= {};
        for (const attack of city.attacks) {
            organizationCount[attack.organization_name] = (organizationCount[attack.organization_name] || 0) + 1;
        }
        
        const organizations = Object.entries(organizationCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        return organizations;
    } catch (err) {
        throw err;
    }
}

export const getOrganizationsByYearFunc = async (year: string) => {
    try {
        const currentYear: any = await Year.findOne({ name: year }).populate('attacks');

        const organizationCount: { [key: string]: number } = {};
            for (const attack of currentYear.attacks) {
                organizationCount[attack.organization_name] = (organizationCount[attack.organization_name] || 0) + 1;
            }

        const organizations = Object.entries(organizationCount)
            .map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
        return organizations;
    } catch (err) {
        throw err;
    }
};
