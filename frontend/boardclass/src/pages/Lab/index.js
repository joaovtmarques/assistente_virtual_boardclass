import { LayoutBody } from "../../layout"
import bodyImg from './images/labImg.png';
import titleIcon from './images/labicon.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';

export const Lab = () => {
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span> Reservar Laboratório</span>
                </div>

                <div className="subTitle">
                    <span>Para reservar o laboratório, preencha os campos:</span>
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