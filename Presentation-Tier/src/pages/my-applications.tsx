import { Link, } from "react-router-dom";

import bg1 from "../assets/images/hero/bg.jpg"

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import swal from 'sweetalert';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RemoveApplication, fetchApplications } from "../api/user-api";

export default function Candidates(){
    const user = useSelector((state: any) => state.user);


    const [applicationData, setApplicationData] = useState([] as any[]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchApplications(user.token, user.userId);
            setApplicationData(response);
        }
        fetchData();
    
    },[changed])
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Submitted":
                return "bg-soft-warning text-warning";
            case "Application Rejected":
                return "bg-soft-danger text-danger";
            case "Accepted":
                return "bg-soft-success text-success";
            default:
                return "bg-soft-primary text-primary";
        }
    }

    const handleStatusChange = async (status: string, id: string) => {

        const shouldProceed = await swal({
            title: 'Withdraw Application?',
            text: 'Once withdraw, you will not be able to recover this application!',
            icon: 'warning',
            buttons: ["Cancel", 'Withdraw'],
            dangerMode: true,
        });
    
        if (shouldProceed) {
            await RemoveApplication(user.token, id);
            setChanged(!changed);
        } else {
            swal("Action Canceled", "Application is safe!", "info");
        }
    };

    const [filterStatus, setFilterStatus] = useState("All"); // Default to show all applications


    const handleFilterChange = (status: string) => {
        setFilterStatus(status);
    };

    const filteredApplications = filterStatus === "All"
        ? applicationData
        : applicationData.filter((item) => item.status === filterStatus);

    
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">My Applications</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">My Applications</li>
                        </ul>
                    </nav>
                </div>
            </div>

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
                <div className="mt-2 d-flex align-items-center justify-content-between">
                    <div className="text-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="filter-dropdown" className="dots-icon">
                                <i className="mdi mdi-filter fs-4"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleFilterChange("All")}>Show All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Submitted")}>Submitted</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Application Rejected")}>Application Rejected</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Accepted")}>Accepted</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                <div className="row g-4" style={{minHeight:'30rem'}}>
                    <p>Showing results for <u>{filterStatus}</u></p>
                    {filteredApplications.length === 0 && <p className="text-center">No applications found</p>}
                    {filteredApplications.map((item,index)=>{
                            const skills = item.job.skills;
                        
                        return(
                            
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <div className="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">

                                    <div className="content">
                                        <img src={`data:image/png;base64, ${item.job.companyPhoto}`} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>

                                        <div className="mt-3">
                                            <Link to={`/job-detail/${item.jobId}`} className="title h5 text-dark">{item.job.jobTitle}</Link>
                                            <p className="text-muted mt-1">{item.job.jobDescription.slice(0,20)}...</p>


                                            {skills && skills.split(',').map((skill: string, index: number) => (
                                                <span key={index} className="badge bg-soft-primary rounded-pill">{skill.trim()}</span>
                                            ))}

                                        </div>

                                        <div className="mt-2 d-flex align-items-center justify-content-between">
                                           
                                            <div className="text-center">
                                                <p className={`mb-0 fw-medium badge ${getStatusColor(item.status)}`}>Status: {item.status}</p>
                                                <p className="text-muted fw-medium mb-0">Date Submitted: {item.dateSubmitted}</p>
                                            </div>
                                        </div>
                                    
                                        
                                        <div className="mt-3">
                                            <Link to={`/job-detail/${item.jobId}`} className="btn btn-sm btn-primary me-1">See job</Link>
                                        </div>

                                        <div className="mt-2 d-flex align-items-center justify-content-between" style={{ position: 'absolute', top: '8px', right: '12px', color:'black' }}>
                                            <div className="text-center">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="link" id={`dropdown-${index}`} className="dots-icon">
                                                        <i className="mdi mdi-dots-vertical fs-4"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleStatusChange('WithdrawApplication', item.id)}>Withdraw Application</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* <div className="row">
                    <div className="col-12 mt-4 pt-2">
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item">
                                <Link className="page-link" to="#" aria-label="Previous">
                                    <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                            <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="#" aria-label="Next">
                                    <span aria-hidden="true"><i className="mdi mdi-chevron-right fs-6"></i></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}
