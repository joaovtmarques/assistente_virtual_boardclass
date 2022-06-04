import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";

import Globals from "../../global/Globals";
import { LayoutBody } from "../../layout";
import api from "../../services/api";
import infoExam from "./images/infoExam.png";
import titleIcon from "./images/infoicon.png";
import infoLab from "./images/infoLab.png";
import lineTitle from "./images/lineTitle.png";

export const ShowInfo = () => {
  const params = useParams();

  const [classInfo, setClassInfo] = useState(null);
  const [labs, setLabs] = useState(null);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  useEffect(() => {
    const getClassInfo = async () => {
      let data = await api.get(`classes/${params.classId}`);

      setClassInfo(data.data.class);

      let labs = await api.get(`classes/${params.classId}/laboratories`);

      setLabs(labs.data.laboratories);
    };

    getClassInfo();
  }, []);

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
    classInfo &&
    labs && (
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
            <div className="classTitle">
              <span>Nome da turma: {classInfo.name}</span>
            </div>
            <br></br>
            <div className="classInfo">
              <span>Alunos na turma: {classInfo.students.length}</span>
            </div>
            <br></br>
            <div className="classInfo">
              <span>Disciplina da Turma: {classInfo.subject[0].name}</span>
            </div>
            <br></br>
            <div className="cardContainerClass">
              <div className="cardClass">
                <div className="img">
                  <img src={infoExam} alt=""></img>
                </div>
                <div className="labInfo">
                  <li className="li-title">Provas</li>
                  <hr></hr>
                  {classInfo.evaluations.map(function (item) {
                    return <li className="li">{item.date.slice(0, 5)}</li>;
                  })}
                </div>
              </div>
              <div className="cardClass">
                <div className="img">
                  <img src={infoLab} alt=""></img>
                </div>
                <div className="labInfo">
                  <li className="li-title">Laboratório</li>
                  <hr></hr>
                  {labs.map(function (item) {
                    return (
                      <li className="li">
                        Lab {item.laboratory_id} - {item.date.slice(0, 5)}
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div class="classBox">
            <div className="classTitle">
              <span>Lista de alunos</span>
            </div>
            <br></br>
            <div className="cardContainerClass">
              <div className="studentList">
                {classInfo.students.map(function (item) {
                  return (
                    <>
                      <li className="li">{item.name}</li>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </LayoutBody>
    )
  );
};
