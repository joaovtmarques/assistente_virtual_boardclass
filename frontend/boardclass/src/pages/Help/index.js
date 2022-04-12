import { LayoutBody } from "../../layout";
import { Link } from "react-router-dom";
import  disciplineIMG from './images/discipline.png'
import  classIMG from './images/class.png'
import  studentIMG from './images/student.png'
import  removeIMG from './images/remove.png'
import  showIMG from './images/show.png'
import  examIMG from './images/exam.png'
import  labIMG from './images/lab.png'
import  notesIMG from './images/notes.png'

export const Help = () => {
    return(
        
        <LayoutBody>
            <div className="titles">
                <div className="title">
                    Central de ajuda
                </div>
                
                <div className="subTitle">
                    Conheça nossas funcionalidades
                </div>
            </div>

            <div className="containerHelp">
                <div className="cardbox">
                    <div className="card">
                        <div className="cardImg">
                            <img src={disciplineIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Discipline" style={{textDecoration:"none", color:"white"}}><span>Cadastrar Disciplinas</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={classIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Class" style={{textDecoration:"none", color:"white"}}><span>Criar Turma</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={studentIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Student" style={{textDecoration:"none", color:"white"}}><span>Adicionar Alunos</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={removeIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Remove" style={{textDecoration:"none", color:"white"}}><span>Remover Alunos</span></Link>
                        </div>
                    </div>
                </div>
                <div className="cardbox">
                    <div className="card">
                        <div className="cardImg">
                            <img src={showIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Show" style={{textDecoration:"none", color:"white"}}><span>Informações da Turma</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={examIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Exam" style={{textDecoration:"none", color:"white"}}><span>Marcar Prova</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={labIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Lab" style={{textDecoration:"none", color:"white"}}><span>Reservar Laboratório</span></Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img src={notesIMG} alt=""></img>
                        </div>
                        <div className="cardTitle">
                            <Link to="/Notes" style={{textDecoration:"none", color:"white"}}><span>Anotações</span></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </LayoutBody>
    )
}