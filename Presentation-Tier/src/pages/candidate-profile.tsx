import { useParams } from "react-router-dom";
import bg1 from "../assets/images/hero/bg5.jpg"

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import {FiMail, FiGift, FiHome, FiGlobe,FiPhone } from "../assets/icons/vander"
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
    const [changed,setChanged] = useState(false);
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


    },[changed])


    const[prfModal,setPrfModal] = useState(false);
    const handleToggleModal = () => {
        setPrfModal(!prfModal);
    };
    return(
        <>
        <UserProfileModal showModal={prfModal} setShowModal={setPrfModal} changed={changed} setChanged={setChanged}/>
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
                                        <h5 className="mb-0">{userData?.firstName +' '+ userData?.lastName}</h5>
                                        <p className="text-muted mb-0">{userData.position}</p>
                                    </div>
                                </div>

                                {user.userId == id && (
                                <CiEdit onClick={handleToggleModal} className="icons fs-3"/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row g-4">
                    {userData.introduction === ''?(
                        <div className="col-lg-8 col-md-7 col-12">
                            {user.userId == id?(
                                <p className="text-center">Add additional data by clicking the edit icon above</p>
                            ):(
                                <p className="text-center">No additional data</p>
                            )}
                        </div>
                    ):(
                    <div className="col-lg-8 col-md-7 col-12">
                        <h5 className="mb-4">Introduction:</h5>

                        <p className="text-muted">{userData.introduction}</p>

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
                                    <h5 className="mb-0">{experience.position} : <span className='h6'>{experience.companyName}</span></h5>
                                    </div>
                                    <h6 className="mb-0">{experience.dateFrom} to {experience.dateTo}</h6>
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

        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}