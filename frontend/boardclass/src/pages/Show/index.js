import { LayoutBody } from "../../layout"
import bodyImg from './images/infoImg.png';
import titleIcon from './images/infoicon.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';

export const Show = () => {
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span>Informações da Turma</span>
                </div>

                <div className="subTitle">
                    <span>Para ver as informações da turma, preencha:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <form>
                        <div className="rowInput">
                            <span>Nome da turma:</span>
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