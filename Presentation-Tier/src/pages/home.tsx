import { Link, useNavigate } from "react-router-dom";

import bg1 from '../assets/images/hero/bg3.jpg'
import heroImg from "../assets/images/hero.jpg"

import Navbar from "../components/navbar";
import Counter from '../components/counter';
import AboutUs from '../components/aboutUs';
import Companies from '../components/companies';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

import { FiSearch, FiClock, FiMapPin, FiDollarSign} from "../assets/icons/vander"


import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJobs} from "../api/user-api";
import AboutTwo from "../components/aboutTwo";
import { Button } from "react-bootstrap";


export default function Home(){
    const navigate = useNavigate();
    const user = useSelector((state:any) => state.user);
    const navigateToPostJob = () => {
        navigate("/job-post");
    }

    const[jobData,setJobData] = useState([] as any);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetchJobs();
            setJobData(response);
        }
        fetchData();
    },[])

    const navigateTo = () => {
        navigate(`/job-list/${query}`)
    }

    const[query,setQuery] = useState('');
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        {user.isAuthenticated && user.role==="Employer"?(
            <section className="bg-half-260 pb-lg-0 pb-md-4 bg-primary d-table w-100" style={{ backgroundImage: `url(${bg1})` }} id="home">
            <div className="bg-overlay bg-black" style={{ opacity: '0.8' }}></div>
            <div className="container">
                <div className="row g-4 position-relative z-1">
                    <div className="col-lg-7 col-md-6 col-12 mt-lg-5">
                        <div className="title-heading">
                            <h1 className="heading text-white title-dark mb-4">Hire the Best Talent<br /> for Your Company</h1>
                            <p className="para-desc text-white-50">Connect with top-notch professionals and build a strong team. Post your job opportunities and find the perfect candidates.</p>
                            
                            <button className="btn btn-primary" onClick={navigateToPostJob}>Post a Job</button>
                        </div>
                    </div>
        
                    <div className="col-lg-5 col-md-6 col-12">
                        <div className="bg-white rounded shadow p-2 position-relative">
                            <img src={heroImg} className="img-fluid rounded" alt="Employer Hero Image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        ):(
            <section className="bg-half-260 pb-lg-0 pb-md-4 bg-primary d-table w-100" style={{backgroundImage:`url(${bg1})`}} id="home">
            <div className="bg-overlay bg-black" style={{opacity:'0.8'}}></div>
            <div className="container">
                <div className="row g-4 position-relative z-1">
                    <div className="col-lg-7 col-md-6 col-12 mt-lg-5">
                        <div className="title-heading">
                            <h1 className="heading text-white title-dark mb-4">Find a new job and <br/> build career</h1>
                            <p className="para-desc text-white-50">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                            
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
                                <form className="card-body text-start">
                                    <div className="registration-form text-dark text-start">
                                        <div className="row g-lg-0">
                                            <div className="col-lg-9 col-md-8 col-12">
                                                <div className="mb-3 mb-sm-0">
                                                    <label className="form-label d-none fs-6">Search :</label>
                                                    <div className="filter-search-form position-relative filter-border">
                                                        <FiSearch className="fea icon-20 icons"/>
                                                        <input name="name" type="text" id="job-keyword" value={query} onChange={(e)=>setQuery(e.target.value)} className="form-control filter-input-box bg-light border-0" placeholder="Search your keywords"/>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div className="col-lg-3 col-md-4 col-12">
                                                <Button style={{height:'60px'}} className="btn btn-primary searchbtn w-100" onClick={navigateTo}>
                                                    Search
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-2">
                                <span className="text-white-50"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-6 col-12">
                        <div className="bg-white rounded shadow p-2 position-relative">
                            <img src={heroImg} className="img-fluid rounded" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )}
       
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M720 125L2160 0H2880V250H0V125H720Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <Counter/>

            {user.role != "Employer" && (
            <div className="container mt-100 mt-60">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Popular Job Listing</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-0">
                    {jobData.slice(0,6).map((item:any) => {
                        return(
                        <div className="col-md-6 col-12" key={item.id}>
                            <div className="job-post rounded shadow bg-white">
                                <div className="p-4">
                                    <Link to={`/job-detail/${item.id}`} className="text-dark title h5">{item.jobTitle}</Link>
    
                                    <p className="text-muted d-flex align-items-center small mt-3"><FiClock className="fea icon-sm text-primary me-1"/>Posted {item.dateTime}</p>
    
                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                                        <div className="skills-list">
                                            {item.skills.split(', ').slice(0, 2).map((skill:any) => {
                                                return <li key={skill} className="list-inline-item"><span className="badge bg-soft-primary">{skill}</span></li>;
                                            })}
                                        </div>
                                        <li className="list-inline-item"><span className="text-muted d-flex align-items-center small"><FiDollarSign className="fea icon-sm text-primary me-1"/>{item.salary}</span></li>
                                    </ul>
                                </div>
                                <div className="d-flex align-items-center p-4 border-top">
                                    <img src={`data:image/png;base64, ${item.companyPhoto}`} className="rounded-pill shadow border border-3 avatar avatar-small" alt=""/>
    
                                    <div className="ms-3">
                                        <Link to={`/employer-profile/${item.companyId}`} className="h5 company text-dark">{item.companyName}</Link>
                                        <span className="text-muted d-flex align-items-center mt-1"><FiMapPin className="fea icon-sm me-1"/>{item.companyLocation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            )}
            <AboutUs containerClass="container mt-100 mt-60" role={user.isAuthenticated?(user.role):'user'}/>

            {user.role != "Employer" && (
            <>
                <div className="container mt-100 mt-60">
                    <Companies/>
                </div>
            </>
            )}
           <AboutTwo/>
        </section>
        <Footer top={false}/>
        <ScrollTop/>
        </>
    )
}