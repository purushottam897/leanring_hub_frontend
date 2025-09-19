import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Courses from './Components/Courses';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import Home from './Components/Home';
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import certificate from './Components/certificate';
import Forum from './Components/forum';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addquestions/:id" element={<AddQuestions/>}/>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/courses' element={<Courses />}></Route>
          <Route path='/course/:id' element={<Course />}></Route>
          <Route path='/discussion/:id' element={<Forum />}></Route>
          <Route path='/certificate/:id' element={<certificate />}></Route>
          <Route path='/assessment/:id' element={<Assessment />}></Route>
          <Route path='/addcourse' element={<AddCourse />}></Route>
          <Route path='/editCourse/:id' element={<EditCourse />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/Learnings' element={<Learnings />}></Route>
          <Route path='/Dcourses' element={<DCourses />}></Route>
          <Route path='/Dusers' element={<DUsers />}></Route>
          <Route path='/Dtutors' element={<DTutors />}></Route>
          <Route path='/Performance' element={<Performance />} />
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
