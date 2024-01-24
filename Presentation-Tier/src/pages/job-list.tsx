import { Link, useParams } from "react-router-dom";

import bg1 from '../assets/images/hero/bg.jpg'

import Navbar from "../components/navbar";
import AboutTwo from "../components/aboutTwo";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {FiClock,FiMapPin, FiBriefcase, FiSearch} from "../assets/icons/vander"
import { useEffect, useState } from "react";
import { fetchFilteredJobs,  fetchJobs } from "../api/user-api";

export default function JobList(){
    let params = useParams();
    let query = params.query;

    const[filter,setFilter] = useState({
        keyword: query??'',
        location: '',
        type: ''
    });


    const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Kosova","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
   
    const jobTypes = [
        "Full Time", "Part Time", "Freelancer", "Remote Work", "Office Work"
    ];

    const onChange = (e:any) => {
        setFilter({...filter, [e.target.name]: e.target.value});
    }

    const[jobData,setJobData] = useState([] as any);

    useEffect(() => {
        console.log(filter);
        
        const fetchData = async () => {
            await fetchDataForJob();
        }
        fetchData();
      }, []);

    const fetchDataForJob = async () => {
        const fetchData = async () => {
            const response = await fetchJobs();
            setJobData(response);
        }
        const fetchFilteredData = async () => {
        const response = await fetchFilteredJobs(filter);
            setJobData(response);
        }

        if(filter.keyword === undefined || filter.keyword === '' && (filter.location === '' && filter.type === '')){
            fetchData();
        }else{
            fetchFilteredData();
        }
    }


    const[resultText,setResultText] = useState('Showing all jobs');

    const onSubmit = async (e:any) => {
        e.preventDefault();
        await fetchDataForJob();
        setResultText(`Showing jobs for ${filter.keyword || 'all'} in ${filter.location || 'all locations'} as ${filter.type || 'all types'}`);
    }


    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Job Vacancies</h5>
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mt-4">
                        <div className="features-absolute">
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                            <form className="card-body text-start">
                                <div className="registration-form text-dark text-start">
                                    <div className="row g-lg-0">
                                        <div className="col-lg-3 col-md-6 col-12">
                                            <div className="mb-3 mb-sm-0">
                                                <label className="form-label d-none fs-6">Search :</label>
                                                <div className="filter-search-form position-relative filter-border">
                                                    <FiSearch className="fea icon-20 icons"/>
                                                    <input name="keyword" type="text" id="keyword" className="form-control filter-input-box bg-light border-0" placeholder="Search your keywords" value={filter.keyword} onChange={onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-3 col-md-6 col-12">
                                            <div className="mb-3 mb-sm-0">
                                                <label className="form-label d-none fs-6">Location:</label>
                                                <div className="filter-search-form position-relative filter-border">
                                                    <FiMapPin className="fea icon-20 icons"/>
                                                    <select className="form-select filter-input-box bg-light border-0" name="location" id="location" value={filter.location} onChange={onChange}>
                                                        <option value="" >Select Location</option>
                                                        {country_list.map((location, index) => (
                                                            <option key={index} value={location}>{location}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-md-6 col-12">
                                            <div className="mb-3 mb-sm-0">
                                                <label className="form-label d-none fs-6">Type :</label>
                                                <div className="filter-search-form relative filter-border">
                                                    <FiBriefcase className="fea icon-20 icons"/>
                                                    <select className="form-select filter-input-box bg-light border-0" name="type" id="type" value={filter.type} onChange={onChange}>
                                                        <option value="" >Select Type</option>
                                                        {jobTypes.map((type, index) => (
                                                            <option key={index} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-md-6 col-12">
                                            <input type="submit" id="search" name="search" style={{height:'60px'}} className="btn btn-primary searchbtn w-100" value="Search" onClick={onSubmit}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-60">
                <div className="row g-4">
                    <p className="text-center">{resultText}</p>
                    {jobData.map((item:any,index:any)=>{
                        return(
                            <div className="col-12" key={index}>
                                <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                                    <div className="d-flex align-items-center w-310px">
                                        <img src={`data:image/png;base64, ${item.companyPhoto}`} className="rounded-pill shadow border border-3 avatar avatar-small" alt=""/>

                                        <div className="ms-3">
                                            <Link to={`/job-detail/${item.id}`} className="h5 title text-dark">{item.jobTitle}</Link>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                                        <span className="badge bg-soft-primary rounded-pill">{item.type}</span>
                                        <span className="text-muted d-flex align-items-center fw-medium mt-md-2"><FiClock className="fea icon-sm me-1 align-middle"/>{item.dateTime}</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                                        <span className="text-muted d-flex align-items-center"><FiMapPin className="fea icon-sm me-1 align-middle"/>{item.location}</span>
                                        <span className="d-flex fw-medium mt-md-2">{item.salary}</span>
                                    </div>

                                    <div className="mt-3 mt-md-0">
                                        <Link to={`/job-detail/${item.id}`} className="btn btn-sm btn-primary w-full ms-md-1">See more</Link>
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

            <AboutTwo/>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}