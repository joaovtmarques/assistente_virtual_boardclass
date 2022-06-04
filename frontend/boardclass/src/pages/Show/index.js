import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import Select from "react-select";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import mic from "../../assets/mic-white.png";
import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import styles from "../Home/home.module.css";
import titleIcon from "./images/infoicon.png";
import bodyImg from "./images/infoImg.png";
import lineTitle from "./images/lineTitle.png";

export const Show = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [classId, setClassId] = useState(100);
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });
  const microphoneRef = useRef(null);

  useEffect(() => {
    async function getClasses() {
      try {
        const classes = await api.get("classes", {});

        setOptions(classes.data.classes);
      } catch (e) {
        onShowAlert("warning", 5);
      }
    }

    function classes() {
      if (
        text.includes("exibir") ||
        text.includes("mostrar") ||
        text.includes("buscar") ||
        text.includes("informações") ||
        text.includes("turma")
      ) {
        window.location.href = `/ShowInfo/${classId}`;
      }
    }

    getClasses();
    classes();

    console.log("Trasncript: ", text);
  }, [text]);

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
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    setIsListening(false);
    resetTranscript();
    if (text) {
      setText("");
      setText(transcript);
    } else {
      setText(transcript);
    }
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

  const colourStyles = {
    control: (styles) => ({
      flex: 1,
      width: 420,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 0,
    }),
  };

  return (
    <LayoutBody>
      <div className="titles">
        <div className="title">
          <img src={titleIcon} alt=""></img>
          <img src={lineTitle} alt=""></img>
          <span>Informações da Turma</span>
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
        <div className="subTitle">
          <span>Para ver as informações da turma, preencha:</span>
        </div>
      </div>

      <div className="containerInput">
        <div className="forms">
          <div className="rowInput">
            <div className="rowInputSelect">
              <Select
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                styles={colourStyles}
                options={options}
                onChange={(option) => setClassId(option.id)}
                placeholder="Selecione a turma"
              />
            </div>
          </div>
          <br></br>

          <button
            className="loading"
            ref={microphoneRef}
            onClick={isListening ? stopListening : handleListening}
          >
            {(isListening && <button className={styles.stopButton} />) || (
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
