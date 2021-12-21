import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import coffeeStoresData from "../../data/coffee-stores.json";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";

interface coffeeStoreData {
    id: number;
    name: string;
    imgUrl: string;
    address: string;
    neighbourhood: string;
}

interface coffeeStore {
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
    const { name, address, neighbourhood, imgUrl } = prop.coffeeStore;

    const handleUpvoteButton = () =>{
        console.log('handle upvote');
        
    }
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/" scroll={false}>
                            Back to home
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl}
                        width={600}
                        height={360}
                        className={styles.storeImg}
                        alt={name}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width={24} height={24} />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width={24} height={24} />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width={24} height={24} />
                        <p className={styles.text}>1</p>
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
    return {
        props: {
            coffeeStore: coffeeStoresData.find((coffeeStore) => {
                return coffeeStore.id.toString() === id;
            }),
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
};

export default CoffeeStore;
