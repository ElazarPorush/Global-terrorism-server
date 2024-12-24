import { City, Year } from "../models/collections";
import { CityDTO } from "../types/dto/city";


export const getSortedOrganizationsInArea = async (area: string) => {
    try {
        //@ts-ignore
        const city: CityDTO = await City.findOne({ name: area }).populate('attacks');
        if (!city) {
            throw new Error('City not found');
        }

        const organizationCount: { [key: string]: number } = {};
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

export const getHighestCasualtyCitiesOfOrganizationFunc = async (organization: string) => {
    try {
        const cities: any = await City.find().populate('attacks');
        
        let bestCitiesOfOrganization = [];
        for (const city of cities) {

            let highestOrganizationCount = 0;
            const organizationCount: { [key: string]: number } = {};

            for (const attack of city.attacks) {
                organizationCount[attack.organization_name] = (organizationCount[attack.organization_name] || 0) + attack.casualties;
                if (organizationCount[attack.organization_name] > highestOrganizationCount) {
                    highestOrganizationCount = organizationCount[attack.organization_name];
                }
            }

            if (organizationCount[organization] === highestOrganizationCount) {
                bestCitiesOfOrganization.push({
                    organization,
                    casualties: highestOrganizationCount,
                    city: city.name,
                    location: {
                        lat: city.attacks[0].lat as number,
                        lng: city.attacks[0].lon as number
                    }
                });
            }
        }
        return bestCitiesOfOrganization;
    } catch (err) {
        throw err;
    }
};
