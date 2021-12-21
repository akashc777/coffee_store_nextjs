import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

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
    const handleOnBannerBtnClick = () => {
        console.log("Hi banner button");
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Banner
                    buttonText="View store nearby"
                    handleOnClick={handleOnBannerBtnClick}
                />
                <div className={styles.heroImage}>
                    <Image
                        src="/static/hero-image.png"
                        width={700}
                        height={400}
                    />
                </div>
                {coffeeStores.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl}
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
    return {
        props: {
            coffeeStores:coffeeStoresData,
        },
    };
};

export default Home;
