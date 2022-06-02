import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import { Link } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import styles from "../Home/home.module.css";
import bodyImg from "./images/books.png";
import buttonInput from "./images/buttonInput.png";
import titleIcon from "./images/icondisci.png";
import lineTitle from "./images/lineTitle.png";
import mic from "./images/mic-white.png";

export const Discipline = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const microphoneRef = useRef(null);
  const microphoneRef2 = useRef(null);
  const microphoneRef3 = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [isListening3, setIsListening3] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  useEffect(() => {
    function disciplines() {
      if (text3.includes("criar") || text3.includes("cadastrar")) {
        handleCreateDiscipline();
      }
    }

    disciplines();
  }, [text3]);

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

  const handleListening3 = () => {
    setIsListening3(true);
    microphoneRef3.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening3 = () => {
    if (text3) {
      setText3("");
      setText3(transcript);
    } else {
      setText3(transcript);
    }
    setIsListening3(false);
    microphoneRef3.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    resetTranscript();
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

  const handleCreateDiscipline = async () => {
    if (text1 === "" || text2 === "") {
      onShowAlert("warning", 0);
    } else {
      const name = text1;
      const description = text2;

      try {
        await api.post("subjects", { name, description });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 3000);
        }, 1000);
      } catch (e) {
        onShowAlert("warning", 6);
      }
    }
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
      <div className={styles.alertContainer2}>
        <Alert
          header={""}
          btnText={"Entendi :)"}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{
            height: 160,
            width: 200,
            backgroundColor: "#1ABBBB",
            padding: 15,
            borderRadius: 15,
            border: 0,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          headerStyles={{
            display: "none",
          }}
          textStyles={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "300",
            fontFamily: "sans-serif",
            color: "#FFFFFF",
            padding: 0,
          }}
          buttonStyles={{
            textAlign: "center",
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 15,
            paddingLeft: 15,
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "sans-serif",
            color: "#FFFFFF",
            borderRadius: 10,
            textDecoration: "none",
          }}
        />
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
          <button
            className="loading"
            ref={microphoneRef3}
            onClick={isListening3 ? stopListening3 : handleListening3}
          >
            {(isListening3 && <button className={styles.stopButton} />) || (
              <img alt="button" className="micImg" src={mic}></img>
            )}
          </button>
        </div>

        <div className="bodyImg">
          <img src={bodyImg} alt=""></img>
        </div>
      </div>
    </LayoutBody>
  );
};
