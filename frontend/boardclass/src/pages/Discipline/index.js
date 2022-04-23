import React from "react";
import { LayoutBody } from "../../layout";
import bodyImg from './images/books.png';
import titleIcon from './images/icondisci.png';
import lineTitle from './images/lineTitle.png';

export const Discipline = () => {
    return(
        <LayoutBody>
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span> Cadastrar Disciplinas</span>
                </div>

                <div className="subTitle">
                    Para cadastrar uma disciplina, preencha os campos:
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <form>
                        
                    </form>
                </div>

                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
            </div>
        </LayoutBody>
    )
}