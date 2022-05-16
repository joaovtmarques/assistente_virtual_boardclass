import { LayoutBody } from "../../layout";
import { Link } from "react-router-dom";
import bodyImg from "./images/addImg.png";
import titleIcon from "./images/addicon.png";
import lineTitle from "./images/lineTitle.png";
import React, { useEffect, useRef, useState } from "react";
import buttonInput from "./images/buttonInput.png";
import buttonSend from "./images/buttonSend.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Select from "react-select";
import Alert from "react-popup-alert";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Globals from "../../global/Globals";
import styles from "../Home/home.module.css";
import api from "../../services/api";

export const Student = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });
  const [options, setOptions] = useState([]);
  const microphoneRef = useRef(null);
  const microphoneRef2 = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="notSupportContainer">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getClasses() {
      try {
        const classes = await api.get("classes", {});

        setOptions(classes.data.classes);

        console.log(classes.data.classes);
      } catch (e) {
        onShowAlert("warning", 5);
      }
    }

    getClasses();
  }, []);

  const handleListening = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {
    if (text) {
      setText("");
      setText(transcript);
    } else {
      setText(transcript);
    }
    setIsListening(false);
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

  const handleCreateStudent = async () => {
    if (text === "" || text2 === "" || classId === "") {
      onShowAlert("warning", 0);
    } else {
      setLoading(true);

      let name = text;
      let ra = text2;
      let class_id = classId;

      try {
        await api.post("students", { name, ra, class_id });

        setTimeout(() => {
          onShowAlert("warning", 2);
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/Help";
          }, 1000);
        }, 2000);
      } catch (e) {
        onShowAlert("warning", 4);
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
          <span>Adicionar Alunos</span>
        </div>

        <div className="subTitle">
          <span>Para adicionar um aluno, preencha os campos:</span>
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
              className="studentName"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder={"Nome do aluno:"}
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
              className="studentRA"
              onChange={(e) => setText2(e.target.value)}
              value={text2}
              placeholder={"RA do aluno:"}
            />

            <button
              className="buttonInput"
              ref={microphoneRef2}
              onClick={isListening2 ? stopListening2 : handleListening2}
            >
              {(isListening2 && <button className={styles.stopButton} />) || (
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
              onChange={(option) => setClassId(option.id)}
              placeholder="Selecione a turma"
            />
          </div>
          <br></br>
          <button
            className="buttonSubmit"
            onClick={handleCreateStudent}
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
