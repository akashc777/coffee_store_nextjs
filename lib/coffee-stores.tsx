import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
    accessKey: process.env.US_ACCESS_KEY,
});

const getUrlForCoffeeStores = (
    latLong: string,
    limit: number,
    query: string
) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStore = async () => {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.FS_API_KEY,
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores(
            "13.091369615746105%2C77.54422757036656",
            6,
            "coffee%20store"
        ),
        options
    );

    const data = await response.json();

    return data.results;
};
