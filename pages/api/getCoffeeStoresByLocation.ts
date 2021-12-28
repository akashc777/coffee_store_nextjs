// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStore } from "../../lib/coffee-stores";

type Data = {
    message?: string;
    id?: string;
    address?: string;
    name?: string;
    neighbourhood?: string;
    imgUrl?: string;
};

const getCoffeeStoresByLocation = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        const { latLong, limit } = req.query;
        const response = await fetchCoffeeStore(latLong, limit);
        console.log({ response });

        res.status(200).json(response);
    } catch (err) {
        console.log("there is an error", err);
        res.status(200).json({
            message: "Oh no! Something went wrong" + err.message,
        });
    }
};

export default getCoffeeStoresByLocation;
