import { Link, useNavigate } from "react-router-dom";

import bg1 from '../assets/images/hero/bg.jpg'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
import { postJob } from "../api/employer-api";

export default function JobPost(){
    const user = useSelector((state: any) => state.user);
    const navigate  = useNavigate();
    
    const loadOptions = async (inputValue: string) => {
        try {
          const apiKey = "jsFS3p4blUMW5VutIIuiMoR4FRqh1PGq";
          const response = await axios.get(`https://api.apilayer.com/skills?q=${inputValue}`, {
            headers: { 'apiKey': apiKey }
          });
      
          const skills = response.data.map((skill: any) => ({ value: skill, label: skill }));
          return skills;
        } catch (error) {
          console.error('Error fetching skills:', error);
          return [];
        }
      };

      const [selectedSkills, setSelectedSkills] = useState([]);


      const OnSelectedChange = (selectedOptions: any) => {
        setSelectedSkills(selectedOptions as any);
        const skillsString = (selectedOptions as any[]).map((skill: any) => skill.value).join(', ');
        setFormData({
          ...formData,
          skills: skillsString,
        });
    };

    const[formData,setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        experience: '',
        salary: '',
        skills: '',
        location: '',
        qualification: '',
        industry: '',
        spots: 0,
        category: '',
        companyId: user.userId,
    });
    const[salaryType,setSalaryType] = useState('Hourly');
    const [salary,setSalary] = useState(0);

    const onChange = (e:any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

    const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Kosova","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    const industries = ["Accounting", "Airlines/Aviation", "Alternative Dispute Resolution", "Alternative Medicine", "Animation", "Apparel & Fashion", "Architecture & Planning", "Arts & Crafts", "Automotive", "Aviation & Aerospace", "Banking", "Biotechnology", "Broadcast Media", "Building Materials", "Business Supplies & Equipment", "Capital Markets", "Chemicals", "Civic & Social Organization", "Civil Engineering", "Commercial Real Estate", "Computer & Network Security", "Computer Games", "Computer Hardware", "Computer Networking", "Computer Software", "Construction", "Consumer Electronics", "Consumer Goods", "Consumer Services", "Cosmetics", "Dairy", "Defense & Space", "Design", "Education Management", "E-learning", "Electrical & Electronic Manufacturing", "Entertainment", "Environmental Services", "Events Services", "Executive Office", "Facilities Services", "Farming", "Financial Services", "Fine Art", "Fishery", "Food & Beverages", "Food Production", "Fundraising", "Furniture", "Gambling & Casinos", "Glass, Ceramics & Concrete", "Government Administration", "Government Relations", "Graphic Design", "Health, Wellness & Fitness", "Higher Education", "Hospital & Health Care", "Hospitality", "Human Resources", "Import & Export", "Individual & Family Services", "Industrial Automation", "Information Services", "Information Technology & Services", "Insurance", "International Affairs", "International Trade & Development", "Internet", "Investment Banking/Venture", "Investment Management", "Judiciary", "Law Enforcement", "Law Practice", "Legal Services", "Legislative Office", "Leisure & Travel", "Libraries", "Logistics & Supply Chain", "Luxury Goods & Jewelry", "Machinery", "Management Consulting", "Maritime", "Market Research", "Marketing & Advertising", "Mechanical Or Industrial Engineering", "Media Production", "Medical Device", "Medical Practice", "Mental Health Care", "Military", "Mining & Metals", "Motion Pictures & Film", "Museums & Institutions", "Music", "Nanotechnology", "Newspapers", "Nonprofit Organization Management", "Oil & Energy", "Online Media", "Outsourcing/Offshoring", "Package/Freight Delivery", "Packaging & Containers", "Paper & Forest Products", "Performing Arts", "Pharmaceuticals", "Philanthropy", "Photography", "Plastics", "Political Organization", "Primary/Secondary Education", "Printing", "Professional Training", "Program Development", "Public Policy", "Public Relations", "Public Safety", "Publishing", "Railroad Manufacture", "Ranching", "Real Estate", "Recreational Facilities & Services", "Religious Institutions", "Renewables & Environment", "Research", "Restaurants", "Retail", "Security & Investigations", "Semiconductors", "Shipbuilding", "Sporting Goods", "Sports", "Staffing & Recruiting", "Supermarkets", "Telecommunications", "Textiles", "Think Tanks", "Tobacco", "Translation & Localization", "Transportation/Trucking/Railroad", "Utilities", "Venture Capital", "Veterinary", "Warehousing", "Wholesale", "Wine & Spirits", "Wireless", "Writing & Editing"];
    const jobCategories = [
        "Technology", "Healthcare", "Finance", "Marketing", "Education", "Sales", "Customer Service", "Design", "Human Resources", "Hospitality"
      ];

      useEffect(() => {
        setFormData({
          ...formData,
          salary: `${salary} $ - ${salaryType}`
        });
      }, [salary, salaryType]);
      
    const[validationError,setValidationError] = useState("");
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        console.log(formData);
        if(formData.jobTitle === '' || formData.jobDescription === '' || formData.experience === '' || salary === 0 || formData.skills === '' || formData.location === '' || formData.qualification === '' || formData.industry === '' || formData.spots === 0 || formData.category === ''){
            console.log("Form invalid");
            setValidationError("All of the fields are required!");
            return;
        }
    
        await postJob(formData, user.token);
        setValidationError('');
        navigate("/");
    }
    const onSalaryChange = (e:any)=>{
        setSalary(e.target.value);
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
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Create a Job Post</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Job Post</li>
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

        <section className="section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="card border-0">
                            <form className="rounded shadow p-4">
                                <div className="row">
                                    <h5 className="mb-3">Job Details:</h5>                                    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Title :</label>
                                            <input name="jobTitle" id="jobTitle" value={formData.jobTitle} onChange={onChange} className="form-control" placeholder="Title :"/>
                                        </div>                                                                               
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Description :</label>
                                            <textarea name="jobDescription" value={formData.jobDescription} onChange={onChange} id="jobDescription" rows={4} className="form-control" placeholder="Describe the job :"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Experience required *in years* :</label>
                                            <input name="experience" id="experience" value={formData.experience} onChange={onChange} className="form-control" type="number"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Categories:</label>
                                            <select className="form-control form-select" id="category" value={formData.category} onChange={onChange}>
                                                <option value="" disabled>Select your category</option>
                                                {jobCategories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Salary:</label>
                                            <select className="form-control form-select" id="Salary" value={salaryType} onChange={(e:any)=>{setSalaryType(e.target.value)}}>
                                                <option value="Hourly">Hourly</option>
                                                <option value="Monthly">Monthly</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3 mt-md-4 pt-md-1">
                                            <label className="form-label small fw-bold d-none"></label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text border" id="basic-addon1">$</span>
                                                <input type="number" className="form-control" value={salary} onChange={onSalaryChange} id="salary" name="salary" aria-describedby="inputGroupPrepend" required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <h5 className="mb-3">Skill & Experience:</h5>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Skills:</label>
                                            <AsyncSelect
                                                isMulti
                                                name="skills"
                                                placeholder="Search for skills..."
                                                value={selectedSkills}
                                                onChange={OnSelectedChange}
                                                loadOptions={loadOptions}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Qualifications:</label>
                                            <input name="qualification" id="qualification" value={formData.qualification} onChange={onChange} type="text" className="form-control" placeholder="Qualifications"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Industry:</label>
                                            <select className="form-control form-select" id="industry" value={formData.industry} onChange={onChange} name="industry">
                                                <option value="" disabled>Select the industry</option>
                                                {industries.map((industry, index) =>(
                                                    <option key={index} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Spots available:</label>
                                            <input name="spots" id="spots" value={formData.spots} onChange={onChange} type="number" className="form-control" placeholder="Spots"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Location :</label>
                                            <select className="form-control form-select" id="location" value={formData.location} onChange={onChange} name="location">
                                                <option value="" disabled>Select your location</option>
                                                {country_list.map((location, index) => (
                                                <option key={index} value={location}>{location}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {validationError && <p className="text-danger">{validationError}</p>}

                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                        <input type="submit" id="submit2" name="send" className="submitBnt btn btn-primary" value="Post Now" onClick={handleSubmit}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        </section>
        <Footer top={true} />
        <ScrollTop/>
        </>
    )
}