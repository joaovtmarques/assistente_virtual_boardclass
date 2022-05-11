import { LayoutBody } from "../../layout"
import bodyImg from './images/examImg.png';
import titleIcon from './images/examicon.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';


export const Exam = () => {
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span> Marcar Prova</span>
                </div>

                <div className="subTitle">
                    <span>Para marcar prova, preencha os campos:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <form>
                        <div className="rowInput">
                            <span>Disciplina:</span>
                            <input className="disciplineName"></input>
                            <button className="buttonInput"><img src={buttonInput} alt=""></img></button>
                        </div>
                        <br></br>
                        <div className="rowInput">
                            <span>Turma:</span>
                            <input className="disciplineDescript"></input>
                            <button className="buttonInput"><img src={buttonInput} alt=""></img></button>
                        </div>
                        <br></br>
                        <div className="rowInput">
                            <span>Dia:</span>
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