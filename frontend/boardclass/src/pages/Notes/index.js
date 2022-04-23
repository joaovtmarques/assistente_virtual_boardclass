import { LayoutBody } from "../../layout"
import bodyImg from './images/noteImg.png';
import titleIcon from './images/noteicon.png';
import lineTitle from './images/lineTitle.png';

export const Notes = () => {
    return(
        <LayoutBody>            
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span>Anotações</span>
                </div>

                <div className="subTitle">
                    Faça uma anotação:
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