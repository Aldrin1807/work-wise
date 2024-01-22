import { Link, useParams } from "react-router-dom";

import logo1 from '../assets/images/company/lenovo-logo.png'

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {FiLayout, FiMapPin,FiUserCheck, FiClock, FiMonitor, FiBriefcase, FiBook, FiDollarSign, FiArrowRight} from "../assets/icons/vander"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchJob } from "../api/user-api";
import { fetchEmployer } from "../api/employer-api";

export default function JobDetail() {
    const user = useSelector((state: any) => state.user);
    let params = useParams();
    let id = params.id

    const [jobData, setJobData] = useState([] as any);
    const [companyData, setCompanyData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        photo: null,
        location: '',
        founded: "",
        founder: "",
        noEmployees: "",
        website: "",
        description: "",
        jobs: [] as any
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchJob(user.token, id ?? "");
            setJobData(response);
        };

        fetchData();
    }, [id]);
    useEffect(() => {
        if(jobData.companyId){
            const fetchCompany = async () => {
                const response = await fetchEmployer(user.token, jobData.companyId);
                setCompanyData(response);
            };
           fetchCompany();
        }
    }, [jobData]);


    return(
        <>
        <Navbar navClass={""} navLight={false}/>
        <section className="bg-half d-table w-100 bg-light">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-6 col-12">

                        <div className="d-lg-flex align-items-center p-4 rounded shadow bg-white mb-4">
                        {companyData && (
                            <img src={`data:image/png;base64, ${companyData.photo}`} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>
                        )}

                            <div className="ms-lg-3 mt-3 mt-lg-0">
                                <h4>{jobData.jobTitle}</h4>

                                <ul className="list-unstyled mb-0">
                                    <li className="d-inline-flex align-items-center text-muted me-2"><FiLayout className="fea icon-sm text-primary me-1"/> {companyData && companyData.companyName} </li>
                                    <li className="d-inline-flex align-items-center text-muted"><FiMapPin className="fea icon-sm text-primary me-1" />{companyData && companyData.location}</li>
                                </ul>
                            </div>
                        </div>

                        <h5>Job Description: </h5>
                        <p className="text-muted">{jobData.jobDescription}</p>
                    
                        <div className="mt-4">
                            <Link to="/job-apply" className="btn btn-outline-primary">Apply Now <i className="mdi mdi-send"></i></Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="card bg-white rounded shadow sticky-bar">
                            <div className="p-4">
                                <h5 className="mb-0">Job Information</h5>
                            </div>

                            <div className="card-body p-4 border-top">
                                <div className="d-flex widget align-items-center">
                                    <FiLayout className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Company Name:</h6>
                                        <small className="text-primary mb-0">{companyData && companyData.companyName}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiUserCheck className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Industry :</h6>
                                        <small className="text-primary mb-0">{jobData.industry}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiMapPin className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Location:</h6>
                                        <small className="text-primary mb-0">{jobData.location}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiMonitor className="fea icon-ex-md me-3" />
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Job Category:</h6>
                                        <small className="text-primary mb-0">{jobData.category}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiBriefcase className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Experience:</h6>
                                        <small className="text-primary mb-0">{jobData.experience}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiBook className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Qualifications:</h6>
                                        <small className="text-primary mb-0">{jobData.qualification}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiDollarSign className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Salary:</h6>
                                        <small className="text-primary mb-0">{jobData.salary}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiClock className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Date posted:</h6>
                                        <small className="text-primary mb-0 mb-0">{jobData.dateTime}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {companyData.jobs.some((item: any) => item.id !== jobData.id) && (
                <div className="container mt-100 mt-60">
                    <div className="row justify-content-center mb-4 pb-2">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h4 className="title mb-3">Related Vacancies</h4>
                                <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {companyData.jobs.map((item: any, index: any) => {
                            return (
                                item.id !== jobData.id && (
                                    <div className="col-lg-4 col-md-6 col-12" key={index}>
                                        <div className="job-post rounded shadow bg-white">
                                            <div className="p-4">
                                                <Link to={`/job-detail/${item.id}`} className="text-dark title h5">{item.jobTitle}</Link>

                                                <p className="text-muted d-flex align-items-center small mt-3">
                                                    <FiClock className="fea icon-sm text-primary me-1"/>Posted {item.dateTime}
                                                </p>

                                                <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                                                    <li className="list-inline-item"><span className="badge bg-soft-primary">{item.category}</span></li>
                                                    <li className="list-inline-item"><span className="text-muted d-flex align-items-center small">
                                                        <FiDollarSign className="fea icon-sm text-primary me-1"/>{item.salary}
                                                    </span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            )}

        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}