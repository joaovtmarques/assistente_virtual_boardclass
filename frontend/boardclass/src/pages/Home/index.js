import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import { Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import styles from "./home.module.css";
import mic_red from "./images/mic_red.png";
import mic from "./images/mic.png";

export const Home = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const microphoneRef = useRef(null);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: "Olá! Sou a assistente BoardClass. Você pode pressionar o botão azul ao lado e me dar um comando por voz! ;)",
      show: true,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      onShowAlert("warning");
    }, 1500);
  }, []);

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
  };

  if (
    transcript.includes("cadastrar disciplina") ||
    transcript.includes("criar disciplina") ||
    transcript.includes("disciplina")
  ) {
    window.location.href = "/discipline";
  } else if (
    transcript.includes("criar turma") ||
    transcript.includes("cadastrar turma")
  ) {
    window.location.href = "/class";
  } else if (
    transcript.includes("adicionar aluno") ||
    transcript.includes("acrescentar aluno") ||
    transcript.includes("cadastrar aluno") ||
    transcript.includes("criar aluno")
  ) {
    window.location.href = "/student";
  } else if (
    transcript.includes("remover aluno") ||
    transcript.includes("excluir aluno") ||
    transcript.includes("deletar aluno")
  ) {
    window.location.href = "/remove";
  } else if (
    transcript.includes("informações da turma") ||
    transcript.includes("informações turma") ||
    transcript.includes("ver turma")
  ) {
    window.location.href = "/Show";
  } else if (
    transcript.includes("prova") ||
    transcript.includes("avaliação") ||
    transcript.includes("exame")
  ) {
    window.location.href = "/Exam";
  } else if (
    transcript.includes("anotações") ||
    transcript.includes("notas") ||
    transcript.includes("anotar")
  ) {
    window.location.href = "/Notes";
  } else if (
    transcript.includes("laboratório") ||
    transcript.includes("sala")
  ) {
    window.location.href = "/Lab";
  } else if (
    transcript.includes("ajuda") ||
    transcript.includes("me ajude") ||
    transcript.includes("menu") | transcript.includes("opções")
  ) {
    window.location.href = "/Help";
  }

  return (
    <body>
      <div className={styles.alertContainer}>
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
      <div className={styles.containerHome}>
        <button
          className={styles.mic}
          ref={microphoneRef}
          onClick={isListening ? stopListening : handleListening}
        >
          {(isListening && (
            <img className={styles.micButton} src={mic_red} alt="microphone" />
          )) || <img className={styles.micButton} src={mic} alt="microphone" />}
        </button>

        <div className={styles.help}>
          <input
            className={styles.helpInput}
            type="text"
            placeholder={"Olá professor(a) como posso te ajudar?"}
            value={transcript}
          />
          {(isListening && (
            <button
              className={styles.stopButton}
              onClick={stopListening}
            ></button>
          )) ||
            null}
        </div>

        <div className={styles.centralHelp}>
          <Link to="/Help">
            <button className={styles.helpButton} type="submit">
              ?
            </button>
          </Link>
        </div>
      </div>
    </body>
  );
};
