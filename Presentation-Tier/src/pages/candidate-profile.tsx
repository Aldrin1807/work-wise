import { Link, useParams } from "react-router-dom";


import bg1 from "../assets/images/hero/bg5.jpg"
import company1 from "../assets/images/company/linkedin.png"
import company2 from "../assets/images/company/lenovo-logo.png"
import pdf from "../assets/images/calvin-carlo-resume.pdf"

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { candidateSkill, candidatesData } from "../data/data";
import {FiSettings, FiMail, FiGift, FiHome, FiMapPin, FiGlobe,FiPhone, FiDribbble, FiLinkedin, FiFacebook, FiInstagram, FiTwitter,FiDownload, FiMessageCircle, FiFileText} from "../assets/icons/vander"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { fetchUser } from "../api/user-api";
import { useSelector } from "react-redux";
import UserProfileModal from "../components/modals/candidate-profile-modal";
import { CiEdit } from "react-icons/ci";

export default function CandidateProfile(){
    let params = useParams();
    const id = params.id
    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        photo: null,
        location: '',
        position: '',
        dateOfBirth: '',
        introduction: '',
        skills: '',
        experiences: [] as any
    });

    const user = useSelector((state:any) => state.user);

    useEffect(()=>{
        if(user.token==null){
            return;
        }
        const fetchData = async () => {
            const getUser = await fetchUser(user.token, id || '');
            setUserData(getUser);
        };
        fetchData();
    },[])


    const[prfModal,setPrfModal] = useState(false);
    const handleToggleModal = () => {
        setPrfModal(!prfModal);
    };
    return(
        <>
        <UserProfileModal showModal={prfModal} setShowModal={setPrfModal} />
        <Navbar navClass={""} navLight={false}/>
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="position-relative">
                            <div className="candidate-cover">
                                <img src={bg1} className="img-fluid rounded shadow" alt=""/>
                            </div>
                            <div className="candidate-profile d-flex align-items-end justify-content-between mx-2">
                                <div className="d-flex align-items-end">
                                    <img src={`data:image/png;base64, ${userData.photo}`} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>

                                    <div className="ms-2">
                                        <h5 className="mb-0">Mr. {userData?.firstName +' '+ userData?.lastName}</h5>
                                        <p className="text-muted mb-0">{userData.position}</p>
                                    </div>
                                </div>

                                <CiEdit onClick={handleToggleModal} className="icons fs-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row g-4">
                    {user.introduction==''?(
                        <div className="col-lg-8 col-md-7 col-12">
                            <p className="text-center">Add additional data by clicking the edit icon above</p>
                        </div>
                    ):(
                    <div className="col-lg-8 col-md-7 col-12">
                        <h5 className="mb-4">Introduction:</h5>

                        <p className="text-muted">{userData.introduction}.</p>

                        <h5 className="mt-4">Skills:</h5>

                        <div className="row">
                            
                            <div className="col-lg-6 col-12">
                                {userData.skills.split(',').map((skill, index) => (
                                        <div className="progress-box mt-4" key={index}>
                                            <h6 className="font-weight-normal">{skill.trim()}</h6>
                                            <div className="progress">
                                                <div className="progress-bar position-relative bg-primary" style={{ width: `${Math.floor(Math.random() * 100)}%` }}>
                                                </div>
                                            </div>
                                        </div>
                                 ))}
                            </div>
                        </div>
                        <h5 className="mt-4">Experience:</h5>

                        <div className="row">
                            {userData.experiences.map((experience: { companyName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; dateFrom: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; dateTo: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; position: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <div key={index} className="experience-item d-flex flex-column p-3 border">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">{experience.companyName} : <span className='h6'>{experience.dateFrom} to {experience.dateTo}</span></h5>
                                    </div>
                                    <h6 className="mb-0">{experience.position}</h6>
                                    <p className="mb-0">{experience.description}</p>
                                </div>
                                ))}
                        </div>

                     
                    </div>
                    )}
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="card bg-light p-4 rounded shadow sticky-bar">
                            <h5 className="mb-0">Personal Detail:</h5>
                            <div className="mt-3">
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiMail className="fea icon-sm me-2"/> Email:</span>
                                    <span className="fw-medium">{userData.email}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGift className="fea icon-sm me-2"/> D.O.B.:</span>
                                    <span className="fw-medium">{userData.dateOfBirth}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiHome className="fea icon-sm me-2"/> Gender:</span>
                                    <span className="fw-medium">{userData.gender}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGlobe className="fea icon-sm me-2"/> Country:</span>
                                    <span className="fw-medium">{userData.location}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiPhone className="fea icon-sm me-2"/> Mobile:</span>
                                    <span className="fw-medium">{userData.phoneNumber}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Related Candidates</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {candidatesData.slice(0,4).map((item,index)=>{
                        return(
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2" key={index}>
                            <div className="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                                <div className="content">
                                    <img src={item.image} className="avatar avatar-md-md rounded-pill shadow-md" alt=""/>

                                    <div className="mt-3">
                                        <Link to={`/candidate-profile/${item.id}`} className="title h5 text-dark">{item.name}</Link>
                                        <p className="text-muted mt-1">{item.post}</p>

                                        <span className="badge bg-soft-primary rounded-pill">Design</span>
                                        <span className="badge bg-soft-primary rounded-pill">UI</span>
                                        <span className="badge bg-soft-primary rounded-pill">UX</span>
                                        <span className="badge bg-soft-primary rounded-pill">Digital</span>
                                    </div>

                                    <div className="mt-2 d-flex align-items-center justify-content-between">
                                        <div className="text-center">
                                            <p className="text-muted fw-medium mb-0">Salary:</p>
                                            <p className="mb-0 fw-medium">{item.salary}</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-muted fw-medium mb-0">Experience:</p>
                                            <p className="mb-0 fw-medium">{item.experience}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3">
                                        <Link to="/candidate-profile" className="btn btn-sm btn-primary me-1">View Profile</Link>
                                        <Link to="/contactus" className="btn btn-sm btn-icon btn-soft-primary"><FiMessageCircle className="icons"/></Link>
                                    </div>

                                    <Link to="#" className="like"><i className="mdi mdi-heart align-middle fs-4"></i></Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}