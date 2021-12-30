import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_US_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 40,
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

export const fetchCoffeeStore = async (
    latLong: string = "13.091369615746105,77.54422757036656",
    limit = 6
) => {
    const photos = await getListOfCoffeeStorePhotos();
    console.log("photos", photos);

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FS_API_KEY,
        },
    };

    console.log({ fs_key: process.env.NEXT_PUBLIC_FS_API_KEY });

    const response = await fetch(
        getUrlForCoffeeStores(
            latLong.replace(",", "%2C"),
            limit,
            "coffee%20store"
        ),
        options
    );

    const data = await response.json();
    console.log({ data });

    return data.results.map((venue: any, idx: number) => {
        const neighbourhood =
            venue.location.neighborhood || venue.location.crossStreet || "";
        return {
            id: venue.fsq_id,
            address: venue.location.address || "",
            name: venue.name,
            neighbourhood: neighbourhood.toString(),

            imgUrl: photos[idx],
        };
    });
};
