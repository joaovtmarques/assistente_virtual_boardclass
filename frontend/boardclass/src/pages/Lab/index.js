import { LayoutBody } from "../../layout"
import bodyImg from './images/labImg.png';
import titleIcon from './images/labicon.png';
import lineTitle from './images/lineTitle.png';

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
                        
                    </form>
                </div>
                
                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
            </div>
        </LayoutBody>
    )
}