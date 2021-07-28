import React from "react";

import globalStyles from "../../styles/global.module.scss";
import styles from "./banner.module.scss";

export const Banner = () => {
  return (
    <main className={styles.banner}>
      <div className={[globalStyles.wrapper, styles.wrapper].join(" ")}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h1 className={styles.info__title}>Лига Банк</h1>
            <p className={styles.info__text}>Кредиты на любой случай</p>
            <button
              className={[
                globalStyles.button,
                globalStyles.button_big,
                globalStyles.button_gray,
              ].join(" ")}
            >
              Рассчитать кредит
            </button>
          </div>
          <div className={styles.cards}>
            <img
              src="/img/white%20card.png"
              alt="Белая карта"
              className={styles.cards__background}
              width="335"
              height="228"
            />
            <img
              src="/img/black%20card.png"
              alt="Черная карта"
              className={styles.cards__foreground}
              width="335"
              height="228"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
