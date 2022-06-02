import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import Select from "react-select";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import styles from "../Home/home.module.css";
import buttonInput from "./images/buttonInput.png";
import titleIcon from "./images/classicon.png";
import bodyImg from "./images/classimg.png";
import lineTitle from "./images/lineTitle.png";
import mic from "./images/mic-white.png";

import "react-activity/dist/library.css";

export const Class = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const microphoneRef = useRef(null);
  const microphoneRef2 = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [subjectId, setSubjectId] = useState(0);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
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

        console.log(subjects);

        setOptions(subjects.data.subjects);
      } catch (e) {
        onShowAlert("warning", 3);
      }
    }

    console.log(options);

    function classes() {
      if (text2.includes("criar") || text2.includes("cadastrar")) {
        handleCreateClass();
      }
    }

    getSubjects();
    classes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text2]);

  const handleCreateClass = async () => {
    if (text === "" || subjectId === "") {
      onShowAlert("warning", 0);
    } else {
      let name = text;
      let subject_id = subjectId;

      try {
        await api.post("classes", { name, subject_id });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 3000);
        }, 1000);
      } catch (e) {
        onShowAlert("warning", 1);
      }
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
    resetTranscript();
    if (text) {
      setText("");
      setText(transcript);
    } else {
      setText(transcript);
    }
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
    microphoneRef2.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    setIsListening2(false);
    resetTranscript();
    if (text2) {
      setText2("");
      setText2(transcript);
    } else {
      setText2(transcript);
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
            className="loading"
            ref={microphoneRef2}
            onClick={isListening2 ? stopListening2 : handleListening2}
          >
            {(isListening2 && <button className={styles.stopButton} />) || (
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
