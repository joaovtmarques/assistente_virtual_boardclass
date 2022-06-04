import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-popup-alert";

import api from "../../services/api";
import { LayoutBody } from "../../layout";
import styles from "../Home/home.module.css";
import titleIcon from "./images/noteicon.png";
import lineTitle from "./images/lineTitle.png";
import Globals from "../../global/Globals";

export const ShowNote = () => {
  const params = useParams();

  const [note, setNote] = useState({});
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  useEffect(() => {
    console.log(params.noteId);

    const getNote = async () => {
      try {
        const note = await api.get(`notes/${params.noteId}`, {});

        setNote(note.data.note);
      } catch (e) {
        onShowAlert("warning", 13);
      }
    };

    getNote();
  }, []);

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

  return (
    note && (
      <LayoutBody>
        <div className="titles">
          <div className="header">
            <div className="title">
              <img src={titleIcon} alt=""></img>
              <img src={lineTitle} alt=""></img>
              <span>Anotação</span>
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
          <div className="subTitleHelp">
            <span>Sua anotação do dia: {note.date}</span>
          </div>
        </div>
        <div className="containerNoteText">
          <div className="noteTextCard">
            <span>{note.note}</span>
          </div>
        </div>
      </LayoutBody>
    )
  );
};
