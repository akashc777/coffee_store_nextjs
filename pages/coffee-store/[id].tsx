import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// import coffeeStoresData from "../../data/coffee-stores.json";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";
import { fetchCoffeeStore } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import useSWR from "swr";

interface coffeeStoreData {
    id: string;
    address: string;
    name: string;
    neighbourhood: string;
    imgUrl: string;
}

interface coffeeStore {
    id?: string;
    coffeeStore: coffeeStoreData;
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

const CoffeeStore: NextPage<coffeeStore> = (prop) => {
    const router: NextRouter = useRouter();

    if (router.isFallback) {
        return <div>Loading .... </div>;
    }

    const id = router.query.id;
    // const { dispatch, state } = useContext(StoreContext);

    // console.log( { context: useContext(StoreContext)});
    const [coffeeStore, setCoffeeStore] = useState(prop.coffeeStore);
    const {
        state: { coffeeStores },
    } = useContext(StoreContext);
    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, voting, imgUrl, neighbourhood, address } =
                coffeeStore;
            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    neighbourhood: neighbourhood || "",
                    address: address || "",
                }),
            });

            const dbCoffeeStore = await response.json();
            console.log({dbCoffeeStore});
            
        } catch (err) {
            console.error("Error creating coffee store", err);
        }
    };

    useEffect(() => {
        if (Object.keys(prop.coffeeStore).length === 0) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find(
                    (coffeeStore) => {
                        return coffeeStore.id.toString() === id; //dynamic id
                    }
                );

                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext);
                    handleCreateCoffeeStore(coffeeStoreFromContext);
                }
            }
        } else {
            // SSG
            handleCreateCoffeeStore(prop.coffeeStore);
        }
    }, [prop.id, prop, prop.coffeeStore]);

    const { name, address, neighbourhood, imgUrl } = coffeeStore;
    const [votingCount, setVotingCount] = useState(0);

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${prop.id}`);
    if (error) {
        return <div>Something went wrong retrieving coffee store page</div>;
    }
    
    useEffect(() => {
        if (data && data.length > 0) {
            setCoffeeStore(data[0]);

            setVotingCount(data[0].voting);
        }
    }, [data]);

    const handleUpvoteButton = async () => {
        try {
            const response = await fetch("/api/favouriteCoffeeStoreById", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:prop.id,
                }),
            });

            const dbCoffeeStore = await response.json();

            if (dbCoffeeStore && dbCoffeeStore.length > 0) {
                let count = votingCount + 1;
                setVotingCount(count);
            }
        } catch (err) {
            console.error("Error upvoting the coffee store", err);
        }
    };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/" scroll={false}>
                            ← Back to home
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={
                            imgUrl ||
                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        }
                        width={600}
                        height={360}
                        className={styles.storeImg}
                        alt={name}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/places.svg"
                            width={24}
                            height={24}
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    {neighbourhood && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/nearMe.svg"
                                width={24}
                                height={24}
                            />
                            <p className={styles.text}>{neighbourhood}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/star.svg"
                            width={24}
                            height={24}
                        />
                        <p className={styles.text}>{votingCount}</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpvoteButton}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    console.log(context);
    const { id } = context.params as IParams;
    const coffeeStoresData = await fetchCoffeeStore();
    const findCoffeeStoreById = coffeeStoresData.find(
        (coffeeStore: { id: { toString: () => string } }) => {
            return coffeeStore.id.toString() === id; //dynamic id
        }
    );
    return {
        props: {
            id,
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const coffeeStoresData = await fetchCoffeeStore();
    const paths = coffeeStoresData.map(
        (coffeeStore: { id: { toString: () => any } }) => {
            return {
                params: {
                    id: coffeeStore.id.toString(),
                },
            };
        }
    );
    return {
        paths,
        fallback: true,
    };
};

export default CoffeeStore;