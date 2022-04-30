import { LayoutBody } from "../../layout"
import bodyImg from './images/examImg.png';
import titleIcon from './images/examicon.png';
import lineTitle from './images/lineTitle.png';


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
                        
                    </form>
                </div>
                
                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
            </div>
        </LayoutBody>
    )
}