import type { NextPage } from "next";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";

const CoffeeStore: NextPage = () => {
    const router: NextRouter = useRouter();
    console.log("router", router);

    return (
        <div>
            Coffee Store Page {router.query.id}{" "}
            <Link href="/" scroll={false}>
                Back to home
            </Link>
        </div>
    );
};

export default CoffeeStore;
