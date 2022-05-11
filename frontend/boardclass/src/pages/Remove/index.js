import { LayoutBody } from "../../layout"
import bodyImg from './images/removeImg.png';
import titleIcon from './images/removeicon.png';
import lineTitle from './images/lineTitle.png';
import buttonInput from './images/buttonInput.png';
import buttonSend from './images/buttonSend.png';

export const Remove = () => {
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span>Remover Alunos</span>
                </div>

                <div className="subTitle">
                    <span>Para remover alunos, preencha os campos:</span>
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