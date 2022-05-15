import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { LayoutBody } from "../../layout";
import styles from "../Home/home.module.css";
import bodyImg from "./images/books.png";
import buttonInput from "./images/buttonInput.png";
import buttonSend from "./images/buttonSend.png";
import titleIcon from "./images/icondisci.png";
import lineTitle from "./images/lineTitle.png";

export const Discipline = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
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
    if (text1) {
      setText1("");
      setText1(transcript);
    } else {
      setText1(transcript);
    }
    setIsListening(false);
    resetTranscript();
    console.log(text1);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleListening2 = () => {
    setIsListening2(true);
    microphoneRef2.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening2 = () => {
    if (text2) {
      setText2("");
      setText2(transcript);
    } else {
      setText2(transcript);
    }
    setIsListening2(false);
    microphoneRef2.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
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
            <input
              className="disciplineInput"
              onChange={(e) => setText1(e.target.value)}
              value={text1}
              placeholder={"Nome da disciplina: "}
            />

            <button
              className="buttonInput"
              ref={microphoneRef}
              onClick={isListening ? stopListening : handleListening}
            >
              {(isListening && <button className={styles.stopButton} />) || (
                <img alt="button" src={buttonInput}></img>
              )}
            </button>
          </div>
          <br></br>
          <div className="rowInput">
            <input
              className="disciplineInput"
              onChange={(e) => setText2(e.target.value)}
              value={text2}
              placeholder={"Descrição da disciplina:"}
            />

            <button
              className="buttonInput"
              ref={microphoneRef2}
              onClick={isListening2 ? stopListening2 : handleListening2}
            >
              {(isListening2 && <img className={styles.stopButton}></img>) || (
                <img src={buttonInput}></img>
              )}
            </button>
          </div>
          <br></br>
          <Link to="/Help">
            <button className="buttonSubmit">
              <img src={buttonSend} alt=""></img>
            </button>
          </Link>
        </div>

        <div className="bodyImg">
          <img src={bodyImg} alt=""></img>
        </div>
      </div>
    </LayoutBody>
  );
};
