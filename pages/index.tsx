import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";

const Home: NextPage = () => {
    const handleOnBannerBtnClick = () => {
        console.log("Hi banner button");
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Banner
                    buttonText="View store nearby"
                    handleOnClick={handleOnBannerBtnClick}
                />
            </main>
        </div>
    );
};

export default Home;
