import { Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/style.scss"
import "./assets/css/materialdesignicons.min.css"
import Home from "./pages/home";
import JobCategories from "./pages/job-categories";
import JobList from "./pages/job-list";
import JobApply from "./pages/job-apply";
import JobPost from "./pages/job-post";
import Career from "./pages/career";
import JobDetail from "./pages/job-detail";
import Employers from "./pages/employers";
import EmployerProfile from "./pages/employer-profile";
import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import CandidateProfileSetting from "./pages/candidate-profile-setting";
import AboutUs from "./pages/aboutus";
import Services from "./pages/services";
import HelpcenterOverview from "./pages/helpcenter-overview";
import HelpcenterFaq from "./pages/helpcenter-faqs";
import HelpcenterGuides from "./pages/helpcenter-guides";
import HelpcenterSupport from "./pages/helpcenter-support";

import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupEmployer from "./pages/signup-employer";
import ResetPassword from "./pages/reset-password";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactUs from "./pages/contactus";
import Error from "./pages/error";


function App() {
  return (
   <>
   <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/job-categories' element={<JobCategories/>}/>
      <Route path='/job-list' element={<JobList/>}/>
      <Route path='/job-apply' element={<JobApply/>}/>
      <Route path='/job-post' element={<JobPost/>}/>
      <Route path='/career' element={<Career/>}/>
      <Route path='/job-detail' element={<JobDetail/>}/>
      <Route path='/job-detail/:id' element={<JobDetail/>}/>
      <Route path='/employers' element={<Employers/>}/>
      <Route path='/employer-profile' element={<EmployerProfile/>}/>
      <Route path='/employer-profile/:id' element={<EmployerProfile/>}/>
      <Route path='/candidates' element={<Candidates/>}/>
      <Route path='/candidate-profile' element={<CandidateProfile/>}/>
      <Route path='/candidate-profile/:id' element={<CandidateProfile/>}/>
      <Route path='/candidate-profile-setting' element={<CandidateProfileSetting/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/helpcenter-overview' element={<HelpcenterOverview/>}/>
      <Route path='/helpcenter-faqs' element={<HelpcenterFaq/>}/>
      <Route path='/helpcenter-guides' element={<HelpcenterGuides/>}/>
      <Route path='/helpcenter-support' element={<HelpcenterSupport/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signup-employer' element={<SignupEmployer/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/terms' element={<Terms/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/contactus' element={<ContactUs/>}/>
      <Route path='*' element={<Error/>}/>
      <Route path='/error' element={<Error/>}/>
   </Routes>
   </>
  );
}

export default App;
