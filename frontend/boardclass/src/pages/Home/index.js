import { Link } from "react-router-dom";
import React, { useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import styles from './home.module.css';

import mic from './images/mic.png';
import mic_red from './images/mic_red.png';

export const Home = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
          <div className={styles.notSupportContainer}>
            Browser is not Support Speech Recognition.
          </div>
        );
    }

    const handleListening = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const stopListening = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    }

    return(
       <body>
           <div className={styles.containerHome}>
                <div className={styles.mic} ref={microphoneRef} onClick={handleListening}>
                    { isListening &&
                        <img className={styles.micButton} src={mic_red} alt="microphone"/>
                        ||
                        <img className={styles.micButton} src={mic} alt="microphone" />
                    }
                </div>

                <div className={styles.help}>
                    <input className={styles.helpInput} type="text" placeholder={'Olá professor(a) como posso te ajudar?'} value={transcript} />
                    { isListening &&
                        <button className={styles.stopButton} onClick={stopListening}></button>
                        ||
                        null
                    }
                </div>

                <div className={styles.centralHelp}>
                    <Link to="/Help"><button className={styles.helpButton} type="submit">?</button></Link>
                </div>
           </div>
       </body> 
    )
}