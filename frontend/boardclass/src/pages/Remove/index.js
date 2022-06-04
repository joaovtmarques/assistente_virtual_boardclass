import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import Select from "react-select";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import styles from "../Home/home.module.css";
import lineTitle from "./images/lineTitle.png";
import mic from "../../assets/mic-white.png";
import titleIcon from "./images/removeicon.png";
import bodyImg from "./images/removeImg.png";

export const Remove = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });
  const [options, setOptions] = useState([]);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="notSupportContainer">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getStudents() {
      try {
        const students = await api.get("students", {});

        setOptions(students.data.students);
      } catch (e) {
        onShowAlert("warning", 3);
      }
    }

    function students() {
      if (text.includes("remover") || text.includes("aluno")) {
        handleRemoveStudent();
      }
    }

    getStudents();
    students();
  }, [text]);

  const handleRemoveStudent = async () => {
    if (studentId) {
      try {
        await api.delete(`students/${studentId}`);

        setTimeout(() => {
          onShowAlert("warning", 2);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 2000);
        }, 2000);
      } catch (e) {
        onShowAlert("warning", 1);
      }
    } else {
      onShowAlert("warning", 0);
    }
  };

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
    setText(transcript);
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
          <span>Remover Alunos</span>
        </div>

        <div className="subTitle">
          <span>Para remover alunos, preencha os campos:</span>
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
          <div className="rowInputSelect">
            <Select
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              styles={colourStyles}
              options={options}
              onChange={(option) => setStudentId(option.id)}
              placeholder="Selecione o aluno"
            />
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