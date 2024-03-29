import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/style.scss"
import "./assets/css/materialdesignicons.min.css"


import Home from "./pages/home";
import JobList from "./pages/job-list";
import JobPost from "./pages/job-post";
import JobDetail from "./pages/job-detail";
import Employers from "./pages/employers";
import EmployerProfile from "./pages/employer-profile";
import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import MyJobs from "./pages/my-jobs";
import AboutUs from "./pages/aboutus";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupEmployer from "./pages/signup-employer";
import Privacy from "./pages/privacy";
import ContactUs from "./pages/contactus";
import Error from "./pages/error";
import MyApplications from './pages/my-applications';

function App() {
  const user = useSelector((state: any) => state.user);

  const commonRoutes = [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/job-list', element: <JobList /> },
    { path: '/job-list/:query', element: <JobList /> },
    { path: '/job-detail/:id', element: <JobDetail /> },
    { path: '/employers', element: <Employers /> },
    { path: '/error', element: <Error /> },
    { path: '/aboutus', element: <AboutUs /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/signup-employer', element: <SignupEmployer /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/contactus', element: <ContactUs /> },
    { path: '*', element: <Navigate to="/error" /> },
    { path: '/employer-profile/:id', element: <EmployerProfile /> }
  ];

  const userRoutes = [
    ...commonRoutes,    
    { path: '/candidate-profile/:id', element: <CandidateProfile /> },
    { path: '/my-applications', element: <MyApplications /> }
  ];

  const employerRoutes = [
    ...commonRoutes,
    { path: '/candidates/:id', element: <Candidates /> },
    { path: '/candidate-profile/:id', element: <CandidateProfile /> },
    { path: '/job-post', element: <JobPost /> },
    { path: '/my-jobs', element: <MyJobs /> },
  ];

  const getRoutesBasedOnRole = () => {
    if (user.token === null) {
      return commonRoutes;
    } else if (user.role === "Candidate") {
      return userRoutes;
    } else if (user.role === "Employer") {
      return employerRoutes;
    }
  };

  return (
    <Routes>
      {getRoutesBasedOnRole()!.map((route, index) => (
        <Route key={index} {...route} />
      ))}
      {/* 404 Error Handling */}
    </Routes>
  );
}

export default App;
