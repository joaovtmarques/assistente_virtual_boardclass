import { LayoutBody } from "../../layout";
import { Link } from "react-router-dom";
import titleIcon from "./images/infoicon.png";
import lineTitle from "./images/lineTitle.png";
import infoExam from "./images/infoExam.png";
import infoLab from "./images/infoLab.png";
import React, { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../../services/api";
import Globals from "../../global/Globals";

export const ShowInfo = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(false);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="notSupportContainer">
        Browser is not Support Speech Recognition.
      </div>
    );
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

      </div>
      
      <div class="containerInfo">
        <div class="classBox">
          <div className="classTitle"><span>Turma A</span></div><br></br>
          <div className="classInfo"><span>Alunos na turma: </span></div><br></br>
          <div className="classInfo"><span>Disciplinas na Turma: </span></div><br></br>
          <div className="cardContainerClass">
            <div className="cardClass">
              <img src={infoExam} alt=""></img>
              <div className="examInfo">
                <hr></hr>
                <li>Provas</li><hr></hr>
                <li>26/05</li><hr></hr>
                <li>14/06</li><hr></hr>
              </div>
            </div>
            <div className="cardClass">
              <img src={infoLab} alt="" ></img>
              <div className="labInfo">
                <hr></hr>
                <li>Laboratório</li><hr></hr>
                <li>26/05</li><hr></hr>
                <li>14/06</li><hr></hr>
              </div>
            </div>
          </div>
        </div>
        <div class="classBox">
          <div className="classTitle"><span>Lista de alunos</span></div><br></br>
          <div className="cardContainerClass">
            <div className="studentList">
              <hr></hr>
              <li>Silas Prado</li><hr></hr>
              <li>Luciano Pamplona</li><hr></hr>
              <li>Joao Vitor Marques</li><hr></hr>
              <li>Gheovanna Pantaleao</li><hr></hr>
            </div>
          </div>
        </div>
      </div>
    </LayoutBody>
  );
};
