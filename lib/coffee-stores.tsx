import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
    accessKey: process.env.US_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 10,
    });
    const unsplashResults = photos.response?.results || [];
    console.log("unsplashResults", unsplashResults);

    return unsplashResults.map((result) => result.urls["small"]);
};

const getUrlForCoffeeStores = (
    latLong: string,
    limit: number,
    query: string
) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStore = async () => {
    const photos = await getListOfCoffeeStorePhotos();
    console.log("photos", photos);

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
            10,
            "coffee%20store"
        ),
        options
    );

    const data = await response.json();

    return data.results.map((venue: any, idx: number) => {
        return {
            id: venue.fsq_id,
            address: venue.location.address || "",
            name: venue.name,
            neighbourhood:
                venue.location.neighborhood || venue.location.crossStreet || "",
            imgUrl: photos[idx],
        };
    });
};
