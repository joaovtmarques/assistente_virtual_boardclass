import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Link } from "react-router-dom";
import Select from "react-select";
import Alert from "react-popup-alert";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Globals from "../../global/Globals";

import styles from "../Home/home.module.css";

import { LayoutBody } from "../../layout";

import bodyImg from "./images/classimg.png";
import titleIcon from "./images/classicon.png";
import lineTitle from "./images/lineTitle.png";
import buttonInput from "./images/buttonInput.png";
import buttonSend from "./images/buttonSend.png";
import api from "../../services/api";

export const Class = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const microphoneRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [subjectId, setSubjectId] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getSubjects() {
      try {
        const subjects = await api.get("subjects", {});

        setOptions(subjects.data.subjects);

        console.log(subjects.data.subjects);
      } catch (e) {
        onShowAlert("warning", 3);
      }
    }

    getSubjects();
  }, []);

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

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="notSupportContainer">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleCreateClass = async () => {
    if (text === "" || subjectId === "") {
      onShowAlert("warning", 0);
    } else {
      setLoading(true);

      let name = text;
      let subject_id = subjectId;

      try {
        await api.post("classes", { name, subject_id });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 1000);
        }, 2000);
      } catch (e) {
        onShowAlert("warning", 1);
      }
    }
  };

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
          <span> Criar Turma</span>
        </div>

        <div className="subTitle">
          <span>Para criar uma turma, preencha os campos:</span>
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
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder={"Nome da turma: "}
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
          <div className="rowInputSelect">
            <Select
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              styles={colourStyles}
              options={options}
              onChange={(option) => setSubjectId(option.id)}
              placeholder="Selecione a disciplina"
            />
          </div>
          <br></br>
          <button
            className="buttonSubmit"
            onClick={handleCreateClass}
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
          {/* <Link to="/Help">
          </Link> */}
        </div>

        <div className="bodyImg">
          <img src={bodyImg} alt=""></img>
        </div>
      </div>
    </LayoutBody>
  );
};
