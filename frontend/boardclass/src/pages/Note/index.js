import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "react-popup-alert";

import api from "../../services/api";
import { LayoutBody } from "../../layout";
import styles from "../Home/home.module.css";
import titleIcon from "./images/noteicon.png";
import lineTitle from "./images/lineTitle.png";
import Globals from "../../global/Globals";

export const Note = () => {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({
    type: "warning",
    text: "alert message",
    show: false,
  });

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await api.get("notes", {});

        setNotes(notes.data.notes);
      } catch (e) {
        onShowAlert("warning", 12);
      }
    };

    getNotes();
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
    <LayoutBody>
      <div className="titles">
        <div className="header">
          <div className="title">
            <img src={titleIcon} alt=""></img>
            <img src={lineTitle} alt=""></img>
            <span>Anotações</span>
          </div>
          <Link to="/Notes" style={{ textDecoration: "none" }}>
            <div className="title">
              <img src={titleIcon} alt=""></img>
              <img src={lineTitle} alt=""></img>
              <span>Criar</span>
            </div>
          </Link>
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
          <span>Suas anotações</span>
        </div>
      </div>
      <div className="containerHelp">
        <div className="cardbox">
          {notes.map((item, index) => {
            while (index <= 3) {
              return (
                <>
                  <div className="card">
                    <span>{item[index]}</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="cardTitle">
                      <Link
                        to={`/ShowNote/${item.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <p>{item.date}</p>
                      </Link>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div className="cardbox">
          {notes.map((item, index) => {
            while (index > 4 && index <= 8) {
              return (
                <>
                  <div className="card">
                    <span>{item[index]}</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="cardTitle">
                      <Link
                        to={`/ShowNote/${item.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <p>{item.date}</p>
                      </Link>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </LayoutBody>
  );
};
