import React,{ useRef,useState } from "react";
import { LayoutBody } from "../../layout";
import bodyImg from './images/books.png';
import titleIcon from './images/icondisci.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styles from '../Home/home.module.css';
export const Discipline = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
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
    return(
        <LayoutBody>
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span> Cadastrar Disciplinas</span>
                </div>

                <div className="subTitle">
                    <span>Para cadastrar uma disciplina, preencha os campos:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <div className="rowInput">
                        <input className="disciplineDescript" placeholder={'Descrição da disciplina:'} value={transcript}/>
                        <button className="buttonInput" ref={microphoneRef} onClick={isListening ? stopListening : handleListening}>
                            { isListening &&
                                <button className={styles.stopButton} onClick={stopListening}></button>
                                ||
                                <img  src={buttonSend} alt="microphone"/>
                            }
                        </button>
                    </div>
                    <br></br>
                    <div className="rowInput">
                            
                        <input className="disciplineDescript" placeholder={'Descrição da disciplina:'} value={transcript}/>
                        <button className="buttonInput" ref={microphoneRef} onClick={isListening ? stopListening : handleListening}>
                            { isListening &&
                                <button className={styles.stopButton} onClick={stopListening}></button>
                                ||
                                <img  src={buttonInput} alt="microphone"/>
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