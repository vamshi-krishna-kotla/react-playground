import React, { useEffect } from "react";

import styles from './Home.module.scss';

import routes from '../routes';
import { Link } from "react-router-dom";

export default function Home() {
    /**
     * filter out the cards that are to be navigated to
     * 
     * avoiding Home page (via Home.name) and the other (sub)routes
     * which are not displayed in the nav bar
     */
    const validRouteCards = routes.filter(eachRoute => {
        return (eachRoute.showInNavBar && !eachRoute.titleHTML.includes(Home.name));
    });

    /**
     * set the animation delay to each card individually for UI effect
     */
    useEffect(() => {
        // dynamically set the animation delay for the router cards
        const cardsContainerQueryResult = document.getElementsByClassName(styles["route-cards-container"])[0];

        // check if route card children are present and add animation delay
        cardsContainerQueryResult && cardsContainerQueryResult.children.length && Array.from(cardsContainerQueryResult.children)?.forEach((child, index) => {
            child.style = child.style || {};
            child.style.animationDelay = 0.2 * index + 's';
        });
    }, []);

    return (
        <div className={styles["main-container"]}>
            <div className={styles["route-cards-container"]}>
                {
                    validRouteCards.map((eachCard, index) => {
                        return (
                            <Link
								key={eachCard.titleHTML + '_' + index}
								className={styles["route-card"] + " button"}
								to={eachCard.location}
							>
                                <h3 dangerouslySetInnerHTML={{__html: eachCard.titleHTML}}></h3>
                                <hr />
                                <p>{eachCard.description}</p>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}
