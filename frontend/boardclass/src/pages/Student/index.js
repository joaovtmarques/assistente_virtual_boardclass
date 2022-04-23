import { LayoutBody } from "../../layout";
import bodyImg from './images/addImg.png';
import titleIcon from './images/addicon.png';
import lineTitle from './images/lineTitle.png';


export const Student = () => {

    return (
        <LayoutBody>
            <div className="titles">
                <div className="title">
                    <img src={titleIcon} alt=""></img>
                    <img src={lineTitle} alt=""></img>
                    <span>Adicionar Alunos</span>
                </div>

                <div className="subTitle">
                    Para adicionar alunos, preencha os campos:
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