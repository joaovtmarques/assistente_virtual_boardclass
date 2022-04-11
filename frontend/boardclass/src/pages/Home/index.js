import { Link } from "react-router-dom";
import React from 'react';
import mic from './images/mic.png';
import styles from './home.module.css';


export const Home = () => {
    return(
       <body>
           <div className={styles.containerHome}>
                <div className={styles.mic}>
                    <input className={styles.micButton} type="image" src={mic} width={125} height={99}></input>
                </div>

                <div className={styles.help}>
                    <input className={styles.helpInput} type="text" placeholder='Olá professor(a) como posso te ajudar?'/>  
                </div>

                <div className={styles.centralHelp}>
                    <Link to="/Help"><button className={styles.helpButton} type="submit">?</button></Link>
                </div>
           </div>
       </body> 
    )
}