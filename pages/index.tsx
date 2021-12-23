import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStore } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
// import coffeeStoresData from "../data/coffee-stores.json";

interface coffeeStore {
    id: number;
    name: string;
    imgUrl: string;
    address: string;
    neighbourhood: string;
}

interface Props {
    coffeeStores: Array<coffeeStore>;
}
const Home: NextPage<Props> = ({ coffeeStores }) => {
    const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
        useTrackLocation();
    console.log({ latLong, locationErrorMsg });

    const handleOnBannerBtnClick = () => {
        console.log("Hi banner button");
        handleTrackLocation();
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Banner
                    buttonText={isFindingLocation?"Locating ...":"View store nearby"}
                    handleOnClick={handleOnBannerBtnClick}
                />
                {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
                <div className={styles.heroImage}>
                    <Image
                        src="/static/hero-image.png"
                        width={700}
                        height={400}
                    />
                </div>
                {coffeeStores.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Bangalore stores</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        name={coffeeStore.name}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        href={`/coffee-store/${coffeeStore.id}`}
                                        className={styles.cards}
                                        key={coffeeStore.id}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const coffeeStoresData = await fetchCoffeeStore();

    return {
        props: {
            coffeeStores: coffeeStoresData,
        },
    };
};

export default Home;
