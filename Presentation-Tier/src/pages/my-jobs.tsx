import { Link } from "react-router-dom";

import bg1 from '../assets/images/hero/bg.jpg'

import Navbar from "../components/navbar";
import AboutTwo from "../components/aboutTwo";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { jobData } from "../data/data";
import { CiTrash } from "react-icons/ci";


export default function MyJobs(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">My Jobs</h5>
                        </div>
                    </div>
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

            <div className="container mt-60">
                <div className="row g-4">
                    {jobData.map((item,index)=>{
                        return(
                        <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <div className="job-post job-type-three rounded shadow bg-white p-4">
                                
                                <div className="mt-2">
                                    <Link to={`/job-detail-three/${item.id}`} className="text-dark title h5">{item.title}</Link>
                                    <p className="text-muted mt-2">{item.desc}</p>
    
                                    <ul className="list-unstyled mb-0">
                                        <li className="d-inline-block me-1"><Link to="" className="badge bg-primary">{item.jobTime}</Link></li>
                                        <li className="d-inline-block me-1"><Link to="" className="badge bg-primary"><i className="mdi mdi-map-marker me-1"></i>{item.country}</Link></li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <ul className="list-unstyled align-items-center mb-0">
                                        <li className="list-inline-item"><Link to="" className="btn btn-icon btn-sm btn-soft-danger"><CiTrash className="icons"/></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>

                <div className="row">
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
                </div>
            </div>
            <AboutTwo/>
        </section>
        <Footer top={true} />
        <ScrollTop/>
        </>
    )
}