import { Link, useParams } from "react-router-dom";

import bg1 from "../assets/images/hero/bg4.jpg"

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";


import {FiMapPin, FiClock, FiDollarSign} from "../assets/icons/vander"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchEmployer } from "../api/employer-api";

export default function EmployerProfile(){
    let params = useParams()
    let id = params.id

    const [employerData,setEmployerData] = useState<any>({});

    const user = useSelector((state:any) => state.user);

    useEffect(()=>{
        const fetchData = async () => {
            const getEmployer = await fetchEmployer(user.token, id || '');
            setEmployerData(getEmployer);
        };
        fetchData();
    },[])

    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mt-4">
                        <div className="features-absolute">
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                                <div className="d-flex align-items-center">
                                    <img src={`data:image/png;base64, ${employerData.photo}`} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>

                                    <div className="ms-3">
                                        <h5>{employerData.user?.userName}</h5>
                                        <span className="text-muted d-flex align-items-center"><FiMapPin className="fea icon-sm me-1"/>{employerData.user?.location}</span>
                                    </div>
                                </div>

                                {user.email == employerData.user?.email ? (
                                <div className="mt-4 mt-md-0">
                                    <Link to="/job-post" className="btn btn-sm btn-soft-primary">Post job</Link>
                                </div>
                                ): ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <h4 className="mb-4">Company Story:</h4>

                        <p className="text-muted">{employerData.description}</p>

                        <h4 className="my-4">Vacancies:</h4>

                        <div className="row g-4">
                            {employerData.jobsPosted?.length == 0 ?(
                                <p className="text-center">No jobs posted yet</p>
                            ):(
                            employerData.jobsPosted?.map((item:any)=>{
                                return(
                                    <div className="col-lg-6 col-12" key={item.id}>
                                        <div className="job-post rounded shadow bg-white">
                                            <div className="p-4">
                                                <Link to={`/job-detail/${item.id}`} className="text-dark title h5">{item.jobTitle}</Link>

                                                <p className="text-muted d-flex align-items-center small mt-3"><FiClock className="fea icon-sm text-primary me-1"/>Posted {item.dateTime} </p>

                                                <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                                                    <li className="list-inline-item"><span className="badge bg-soft-primary">{item.category}</span></li>
                                                    <li className="list-inline-item"><span className="text-muted d-flex align-items-center small"><FiDollarSign className="fea icon-sm text-primary me-1"/>{item.salary}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="card bg-white p-4 rounded shadow sticky-bar">
                            <div className="mt-3">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Founded:</span>
                                    <span>{employerData.founded}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Founder:</span>
                                    <span>{employerData.founder}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Headquarters:</span>
                                    <span>{employerData.user?.location}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Number of employees:</span>
                                    <span>{employerData.noEmployees}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Website:</span>
                                    <span>{employerData.website}</span>
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