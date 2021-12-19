import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";

const Home: NextPage = () => {
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
                <div className={styles.cardLayout}>
                    <Card
                        name="ululululu coffee"
                        imgUrl="/static/hero-image.png"
                        href="coffee-store/ululululu"
                        className={styles.cards}
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;
