import React from "react";
import { LayoutBody } from "../../layout";
import bodyImg from './images/classimg.png';
import titleIcon from './images/classicon.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';

export const Class = () => {
    return(
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

            <div className="containerInput">
                <div className="forms">
                    <form>
                        <div className="rowInput">
                            <span>Nome da turma:</span>
                            <input className="disciplineName"></input>
                            <button className="buttonInput"><img src={buttonInput} alt=""></img></button>
                        </div>
                        <br></br>
                        <div className="rowInput">
                            <span>Nome da disciplina:</span>
                            <input className="disciplineDescript"></input>
                            <button className="buttonInput"><img src={buttonInput} alt=""></img></button>
                        </div>
                        <br></br>
                        <button className="buttonSubmit"><img src={buttonSend} alt=""></img></button>
                        
                    </form>
                </div>
                
                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
            </div>
        </LayoutBody>
    )
}