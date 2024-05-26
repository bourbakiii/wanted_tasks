import {response} from "./mock-response.js";

export const normalizedCompanies = Object.entries(response.data.company).map(([key, val]) => val.map(val => ({
    ...val,
    key: key
}))).flat();

// TODO: fix algorithm
export function findAllRoutes(data, from, to) {
    const routes = [];

    function findRoutes(currentRoute, currentPrice, currentCity) {
        if (currentCity === to) {
            routes.push({ route: currentRoute, price: currentPrice });
            return;
        }

        const nextSteps = data.filter(({ src }) => src === currentCity);

        nextSteps.forEach(({ src, des, price, key }) => {
            if (!currentRoute.some(step => step.src === src && step.des === des)) {
                findRoutes([...currentRoute, { src, des, key, price }], currentPrice + price, des);
            }
        });
    }

    data.filter(({ src }) => src === from).forEach(({ src, des, price, key }) => {
        findRoutes([{ src, des, key, price }], price, des);
    });

    return routes;
}