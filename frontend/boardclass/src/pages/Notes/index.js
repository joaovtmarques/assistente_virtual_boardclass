import { LayoutBody } from "../../layout";
import { Link } from "react-router-dom";
import bodyImg from './images/noteImg.png';
import buttonSend from './images/buttonSend.png';
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
                    <span>Faça uma anotação:</span>
                </div>
            </div>

            <div className="containerInput">
                <div className="forms">
                    <form>
                        
                    </form>
                    <Link to="/Help"><button className="buttonSubmit"><img src={buttonSend} alt=""></img></button></Link>
                </div>
                
                <div className="bodyImg">
                    <img src={bodyImg} alt=""></img>
                </div>
                
            </div>          
        </LayoutBody>
    )
}