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
import titleIcon from "./images/examicon.png";
import bodyImg from "./images/examImg.png";
import lineTitle from "./images/lineTitle.png";

export const Exam = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjectId, setSubjectId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  const microphoneRef = useRef(null);

  useEffect(() => {
    const getClassesSubjects = async () => {
      try {
        const subjects = await api.get("subjects", {});
        const classes = await api.get("classes", {});

        setSubjects(subjects.data.subjects);
        setClasses(classes.data.classes);
      } catch (e) {
        onShowAlert("warning", 9);
      }
    };

    const exam = () => {
      if (
        text.includes("criar") ||
        text.includes("cadastrar") ||
        text.includes("prova") ||
        text.includes("exame") ||
        text.includes("agendar")
      ) {
        handleCreateExam();
      }
    };

    getClassesSubjects();
    exam();
  }, [text]);

  const handleCreateExam = async () => {
    if (!date || date.length < 4 || subjectId === "" || classId === "") {
      onShowAlert("warning", 0);
    } else {
      try {
        await api.post("evaluations", {
          date,
          subject_id: subjectId,
          class_id: classId,
        });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 3000);
        }, 1000);
      } catch (e) {
        onShowAlert("warning", 10);
      }
    }
  };

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
          <span> Marcar Prova</span>
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
          <span>Para marcar prova, preencha os campos:</span>
        </div>
      </div>

      <div className="containerInput">
        <div className="forms">
          <div className="rowInput">
            <Select
              getOptionLabel={(option) => `Disciplina: ${option.name}`}
              getOptionValue={(option) => option.id}
              styles={colourStyles}
              options={subjects}
              onChange={(option) => setSubjectId(option.id)}
              placeholder="Selecione a disciplina"
            />
          </div>
          <br></br>
          <div className="rowInput">
            <Select
              getOptionLabel={(option) => `Turma: ${option.name}`}
              getOptionValue={(option) => option.id}
              styles={colourStyles}
              options={classes}
              onChange={(option) => setClassId(option.id)}
              placeholder="Selecione a turma"
            />
          </div>
          <br></br>
          <div className="rowInput">
            <input
              className="disciplineInput"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              placeholder={"Dia: "}
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
