import { LayoutBody } from "../../layout"
import bodyImg from './images/infoImg.png';
import titleIcon from './images/infoicon.png';
import lineTitle from './images/lineTitle.png';
import React,{ useRef,useState } from "react";
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styles from '../Home/home.module.css';

export const Show = () => {
    const { transcript, transcript2, resetTranscript } = useSpeechRecognition();
    const [isListening,  setIsListening] = useState(false);
    const [isListening2,  setIsListening2] = useState(false);
    const microphoneRef = useRef(null);
    const microphoneRef2 = useRef(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="notSupportContainer">
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

    const handleListening2 = () => {
        setIsListening2(true);
        microphoneRef2.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const stopListening2 = () => {
        setIsListening2(false);
        microphoneRef2.current.classList.remove("listening");
        SpeechRecognition.stopListening();
        
    }
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span>Informações da Turma</span>
                </div>

                <div className="subTitle">
                    <span>Para ver as informações da turma, preencha:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <div className="rowInput">
                        <span>Nome da turma:</span>
                        <input className="className" value={transcript}/>
                        
                        <button className="buttonInput" ref={microphoneRef} onClick={isListening ? stopListening : handleListening}>
                            { isListening &&
                                <img className={styles.stopButton}></img>
                                ||
                                <img src={buttonInput}></img>             
                            }
                        </button>
                    </div>
                    <br></br>
                    <button className="buttonSubmit"><img src={buttonSend} alt=""></img></button>     
                </div>

                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
            </div>   
        </LayoutBody>
    )
}