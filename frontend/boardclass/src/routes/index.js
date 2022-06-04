import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Class } from "../pages/Class";
import { Discipline } from "../pages/Discipline";
import { Exam } from "../pages/Exam";
import { Help } from "../pages/Help";
import { Home } from "../pages/Home";
import { Lab } from "../pages/Lab";
import { Note } from "../pages/Note";
import { Notes } from "../pages/Notes";
import { Remove } from "../pages/Remove";
import { Show } from "../pages/Show";
import { ShowInfo } from "../pages/ShowInfo";
import { Student } from "../pages/Student";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Class" exact element={<Class />} />
        <Route path="/Discipline" exact element={<Discipline />} />
        <Route path="/Student" exact element={<Student />} />
        <Route path="/Exam" exact element={<Exam />} />
        <Route path="/Lab" exact element={<Lab />} />
        <Route path="/Show" exact element={<Show />} />
        <Route path="/Remove" exact element={<Remove />} />
        <Route path="/Notes" exact element={<Notes />} />
        <Route path="/Note" exact element={<Note />} />
        <Route path="/Help" exact element={<Help />} />
        <Route path="/ShowInfo" exact element={<ShowInfo />} />
      </Routes>
    </Router>
  );
};