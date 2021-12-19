import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import cls from "classnames";

interface Props {
    href: string;
    name: string;
    imgUrl: string;
    className?: string;
}
const Card: NextPage<Props> = (props) => {
    return (
        <Link href={props.href}>
            <a className={styles.cardLink}>
                <div className={cls("glass", styles.container)}>
                    <div className={styles.cardHeaderWrapper}>
                        <h2 className={styles.cardHeader}>{props.name}</h2>
                    </div>
                    <div className={styles.cardImageWrapper}>
                        <Image
                            alt={props.name}
                            className={styles.cardImage}
                            src={props.imgUrl}
                            width={260}
                            height={160}
                        />
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;
