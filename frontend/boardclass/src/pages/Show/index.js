import { LayoutBody } from "../../layout";
import { Link } from "react-router-dom";
import bodyImg from "./images/infoImg.png";
import titleIcon from "./images/infoicon.png";
import lineTitle from "./images/lineTitle.png";
import React, { useRef, useState } from "react";
import buttonInput from "./images/buttonInput.png";
import buttonSend from "./images/buttonSend.png";
import { Spinner } from "react-activity";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "../Home/home.module.css";
import api from "../../services/api";
import Globals from "../../global/Globals";

export const Show = () => {
  const { transcript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(false);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });
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
  };

  function onCloseAlert(help) {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type, index) {
    setAlert({
      type: type,
      text: Globals.messages[index].message,
      show: true,
    });
  }

  const handleSearchClass = async () => {
    if (text === "") {
      onShowAlert("warning", 0);
    } else {
      setLoading(true);

      let name = text;

      try {
        await api.get("classes", { name });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setLoading(false);
          //   setTimeout(() => {
          //     window.location.href = "/Help";
          //   }, 1000);
        }, 2000);
      } catch (e) {
        onShowAlert("warning", 1);
      }
    }
  };

  return (
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
            <input
              className="className"
              value={transcript}
              placeholder={"Nome da turma:"}
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
          <button
            className="buttonSubmit"
            onClick={handleSearchClass}
            disabled={loading}
          >
            {(loading && (
              <span className="loading">
                <Spinner
                  style={{
                    height: 15,
                    width: 15,
                    color: "white",
                  }}
                />
              </span>
            )) || <img src={buttonSend} alt=""></img>}
          </button>
        </div>

        <div className="bodyImg">
          <img src={bodyImg} alt=""></img>
        </div>
      </div>
    </LayoutBody>
  );
};
