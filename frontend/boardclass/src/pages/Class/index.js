import React from "react";
import { LayoutBody } from "../../layout";
import bodyImg from './images/classimg.png';
import titleIcon from './images/classicon.png';
import lineTitle from './images/lineTitle.png';

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
                    Para criar uma turma, preencha os campos:
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