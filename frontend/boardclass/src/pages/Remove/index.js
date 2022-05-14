import { LayoutBody } from "../../layout"
import bodyImg from './images/removeImg.png';
import titleIcon from './images/removeicon.png';
import lineTitle from './images/lineTitle.png';
import React,{ useRef,useState } from "react";
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styles from '../Home/home.module.css';

export const Remove = () => {

    const { transcript } = useSpeechRecognition();
    const { transcript2 } = useSpeechRecognition();
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
                    <span>Remover Alunos</span>
                </div>

                <div className="subTitle">
                    <span>Para remover alunos, preencha os campos:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <div className="rowInput">
                        <span>Nome do aluno:</span>
                        <input className="disciplineName" value={transcript}/>
                        
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