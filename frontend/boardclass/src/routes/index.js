import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Class } from "../pages/Class";
import { Discipline} from "../pages/Discipline";
import { Student } from "../pages/Student";
import { Exam } from "../pages/Exam";
import { Lab } from "../pages/Lab";
import { Show } from "../pages/Show";
import { Remove } from "../pages/Remove";
import { Notes } from "../pages/Notes";
import { Note } from "../pages/Note";
import { Help } from "../pages/Help";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/Class" exact element={<Class />}/>
                <Route path="/Discipline" exact element={<Discipline />}/>
                <Route path="/Student" exact element={<Student />}/>
                <Route path="/Exam" exact element={<Exam />}/>
                <Route path="/Lab" exact element={<Lab />}/>
                <Route path="/Show" exact element={<Show />}/>
                <Route path="/Remove" exact element={<Remove />}/>
                <Route path="/Notes" exact element={<Notes />}/>
                <Route path="/Note" exact element={<Note />}/>
                <Route path="/Help" exact element={<Help />}/>
            </Routes>
        </Router>
    )
}