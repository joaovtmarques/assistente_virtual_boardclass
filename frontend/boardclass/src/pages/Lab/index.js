import React, { useEffect, useRef, useState } from "react";
import Alert from "react-popup-alert";
import Select from "react-select";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Spinner } from "react-activity";
import buttonSend from "../../assets/buttonSend.png";

import mic from "../../assets/mic-white.png";
import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import styles from "../Home/home.module.css";
import titleIcon from "./images/labicon.png";
import bodyImg from "./images/labImg.png";
import lineTitle from "./images/lineTitle.png";

export const Lab = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const microphoneRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [labId, setLabId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  useEffect(() => {
    const getClassesSubjects = async () => {
      try {
        const labs = await api.get("laboratories", {});
        const classes = await api.get("classes", {});

        setLabs(labs.data.laboratories);
        setClasses(classes.data.classes);
      } catch (e) {
        onShowAlert("warning", 9);
      }
    };

    getClassesSubjects();
  }, [text]);

  const handleScheduleLab = async () => {
    if (!date || date.length < 4 || labId === "" || classId === "") {
      onShowAlert("warning", 0);
    } else {
      setLoading(true);
      try {
        await api.post("laboratories/schedule", {
          class_id: classId,
          laboratory_id: labId,
          date,
        });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 3000);
        }, 1000);
      } catch (e) {
        onShowAlert("warning", 11);
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
          <span> Reservar Laboratório</span>
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
          <span>Para reservar o laboratório, preencha os campos:</span>
        </div>
      </div>

      <div className="containerInput">
        <div className="forms">
          <div className="rowInput">
            <Select
              getOptionLabel={(option) => `Laboratório: ${option.name}`}
              getOptionValue={(option) => option.id}
              styles={colourStyles}
              options={labs}
              onChange={(option) => setLabId(option.id)}
              placeholder="Selecione o laboratório"
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
            className="buttonSubmit"
            onClick={handleScheduleLab}
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
