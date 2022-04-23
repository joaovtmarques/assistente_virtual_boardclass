import { LayoutBody } from "../../layout"
import bodyImg from './images/infoImg.png';
import titleIcon from './images/infoicon.png';
import lineTitle from './images/lineTitle.png';

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
                    Para ver as informações da turma, preencha:
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