import { Link, useParams } from "react-router-dom";

import bg1 from "../assets/images/hero/bg.jpg"

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { fetchCandidates, updateStatus } from "../api/employer-api";
import swal from 'sweetalert';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RemoveApplication } from "../api/user-api";

export default function Candidates(){
    const user = useSelector((state: any) => state.user);
    let params = useParams();
    let id = params.id

    const [candidateData, setCandidateData] = useState([] as any[]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCandidates(user.token, id??'');
            setCandidateData(response);
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
        const confirmTitle = status === "RemoveApplication" ? "Delete Application?" : "Modify Status?";
        const confirmText = status === "RemoveApplication"
            ? "Once deleted, you will not be able to recover this application!"
            : "Are you sure you want to modify the status?";
    
        const confirmIcon = status === "RemoveApplication" ? "warning" : "info";
    
        const confirmButtonText = status === "RemoveApplication" ? "Delete" : "Yes";
    
        const shouldProceed = await swal({
            title: confirmTitle,
            text: confirmText,
            icon: confirmIcon,
            buttons: ["Cancel", confirmButtonText],
            dangerMode: status === "RemoveApplication",
        });
    
        if (shouldProceed) {
            if (status === "RemoveApplication") {
                await RemoveApplication(user.token, id);
            } else {
                console.log(`Updating status to ${status} for id:`, id); // Add this line for debugging
                await updateStatus(user.token, id, status);
            }
            setChanged(!changed);
        } else {
            swal("Action Canceled", "Application is safe!", "info");
        }
    };
    
    
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Candidates</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Candidates</li>
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
                <div className="row g-4">
                    {candidateData.map((item,index)=>{
                            const userPhotoClaim = item.user.claims.find((claim: any) => claim.claimType === "Photo")?.claimValue;
                            const positionClaim = item.user.claims.find((claim: any) => claim.claimType === "Position")?.claimValue;
                            const skillsClaim = item.user.claims.find((claim: any) => claim.claimType === "Skills")?.claimValue;
                        
                        return(
                            
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <div className="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">

                                    <div className="content">
                                        <img src={`data:image/png;base64, ${userPhotoClaim}`} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>

                                        <div className="mt-3">
                                            <Link to={`/candidate-profile/${item.candidateId}`} className="title h5 text-dark">{item.user.firstName +' '+ item.user.lastName}</Link>
                                            <p className="text-muted mt-1">{positionClaim}</p>
                                            <p className="text-muted mt-1">{item.user.email}</p>


                                            {skillsClaim && skillsClaim.split(',').map((skill: string, index: number) => (
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
                                            <Link to={`/candidate-profile/${item.candidateId}`} className="btn btn-sm btn-primary me-1">View Profile</Link>
                                        </div>

                                        <div className="mt-2 d-flex align-items-center justify-content-between" style={{ position: 'absolute', top: '8px', right: '12px', color:'black' }}>
                                            <div className="text-center">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="link" id={`dropdown-${index}`} className="dots-icon">
                                                        <i className="mdi mdi-dots-vertical fs-4"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleStatusChange('RemoveApplication', item.id)}>Remove Application</Dropdown.Item>
                                                        <Dropdown.Item disabled={item.status=="Application Rejected"} onClick={() => handleStatusChange('Application Rejected', item.id)}>Reject Application</Dropdown.Item>
                                                        <Dropdown.Item disabled={item.status=="Accepted"} onClick={() => handleStatusChange('Accepted', item.id)}>Accept for Interview</Dropdown.Item>
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
