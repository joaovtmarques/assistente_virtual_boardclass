import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { LayoutBody } from "../../layout";

export const Note = () => {
  return (
    <LayoutBody>
      <div className="titles">
        <div className="header">
          <div className="title">Central de ajuda</div>
        </div>

        <div className="subTitleHelp">
          <span>Conheça nossas funcionalidades</span>
        </div>
      </div>
      <div className="containerHelp">
        <div className="cardbox">
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="cardbox">
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="cardTitle">
              <Link
                to="/Notes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>{format(new Date(), "dd/MM/yy")}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutBody>
  );
};
