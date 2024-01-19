import { Link } from "react-router-dom";
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';
import { useState } from "react";
import { Registration } from "../api/employer-api";
import { useNavigate } from "react-router-dom";

const SignupEmployer = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    CompanyName:'',
    Email: '',
    Password: '',
    PhoneNumber: '',
    Description: '',
    Founded: '',
    Founder: '',
    NoEmployees: '',
    Website: '',
    Photo: null,
    Location: '',
  });

  const [errors, setErrors] = useState({
    FirstName: false,
    LastName: false,
    CompanyName:false,
    Email: false,
    Password: false,
    PhoneNumber: false,
    Description: false,
    Founded: false,
    Founder: false,
    NoEmployees: false,
    Website: false,
    Photo: false,
    Location: false,
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event:any) => {
    setFormData({
      ...formData,
      Photo: event.target.files[0],
    });
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    // Validation logic
    const validations = {
        FirstName: !(formData.FirstName.length >= 3),
        LastName: !(formData.LastName.length >= 3),
        CompanyName: !(formData.CompanyName.length >= 3),
        Email: !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)),
        Password: !(formData.Password.length >= 7 && formData.Password.length <= 20),
        PhoneNumber: !(formData.PhoneNumber.length >= 7),
        Description: !(formData.Description.length > 0),
        Founded: !(formData.Founded.length > 0),
        Founder: !(formData.Founder.length > 0),
        NoEmployees: !(formData.NoEmployees.length > 0),
        Website: !(formData.Website.length > 0),
        Photo: !(formData.Photo !== null),
        Location: !(formData.Location.length > 0),
      };
      
    setErrors(validations);

    if (Object.values(validations).every((isValid) => isValid === false)) {

      const form = new FormData();

        form.append("firstname", formData.FirstName);
        form.append("lastname", formData.LastName);
        form.append("companyname", formData.CompanyName);
        form.append("email", formData.Email);
        form.append("password", formData.Password);
        form.append("phonenumber", formData.PhoneNumber);
        form.append("description", formData.Description);
        form.append("founded", formData.Founded);
        form.append("founder", formData.Founder);
        form.append("noemployees", formData.NoEmployees);
        form.append("website", formData.Website);
        form.append("location", formData.Location);
        if (formData.Photo) {
            form.append("photo", formData.Photo);
        }


      
      console.log("form data", formData)

      const response = await Registration(form);

      if (response) {
        navigate('/login');
      }
    }
  };
  const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Kosova","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  return (
    <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}>
      <div className="bg-overlay bg-linear-gradient-2"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="p-4 bg-white rounded shadow-md mx-auto">
              <form>
                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt="" /></Link>
                <h6 className="mb-3 text-uppercase fw-semibold">Register your company</h6>

                {/* Horizontal Form Layout */}
                <div className="row g-3">
                  <p className="mb-0">Who is registering this company?</p>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">First Name</label>
                    <input name="FirstName" type="text" className={`form-control ${errors.FirstName ? 'is-invalid' : ''}`} value={formData.FirstName} onChange={onChange} />
                    {errors.FirstName && <div className="invalid-feedback">Invalid first name</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input name="LastName" type="text" className={`form-control ${errors.LastName ? 'is-invalid' : ''}`} value={formData.LastName} onChange={onChange} />
                    {errors.LastName && <div className="invalid-feedback">Invalid last name</div>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input name="CompanyName" type="text" className={`form-control ${errors.CompanyName ? 'is-invalid' : ''}`} value={formData.CompanyName} onChange={onChange} />
                  {errors.Email && <div className="invalid-feedback">Invalid name</div>}
                </div>

                {/* Repeat similar structure for other form fields */}
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Email</label>
                        <input name="Email" type="email" className={`form-control ${errors.Email ? 'is-invalid' : ''}`} value={formData.Email} onChange={onChange} />
                        {errors.Email && <div className="invalid-feedback">Invalid email</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-semibold" htmlFor="Password">Password</label>
                        <input
                            name="Password"
                            id="Password"
                            type="password"
                            className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                            value={formData.Password}
                            onChange={onChange}
                        />
                        {errors.Password && <div className="invalid-feedback">Password must be between 7 and 20 characters</div>}
                    </div>
                </div>

                
                <p>Additional information about the company</p>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Founder</label>
                    <input name="Founder" type="text" className={`form-control ${errors.Founder ? 'is-invalid' : ''}`} value={formData.Founder} onChange={onChange} />
                    {errors.Founder && <div className="invalid-feedback">Invalid Founder</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Founded in</label>
                    <input name="Founded" type="number" className={`form-control ${errors.Founded ? 'is-invalid' : ''}`} value={formData.Founded} onChange={onChange} />
                    {errors.Founded && <div className="invalid-feedback">Invalid Founded</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Location</label>
                    <select name="Location" id="Location" className={`form-select ${errors.Location ? 'is-invalid' : ''}`} value={formData.Location} onChange={onChange}>
                        <option value="" disabled>Select your location</option>
                        {country_list.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">No. Employees</label>
                        <input name="NoEmployees" type="text" className={`form-control ${errors.NoEmployees ? 'is-invalid' : ''}`} value={formData.NoEmployees} onChange={onChange} />
                        {errors.NoEmployees && <div className="invalid-feedback">Invalid NoEmployees</div>}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">Phone No</label>
                        <input name="PhoneNumber" type="text" className={`form-control ${errors.PhoneNumber ? 'is-invalid' : ''}`} value={formData.PhoneNumber} onChange={onChange} />
                        {errors.PhoneNumber && <div className="invalid-feedback">Invalid PhoneNumber</div>}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">Website</label>
                        <input name="Website" type="text" className={`form-control ${errors.Website ? 'is-invalid' : ''}`} value={formData.Website} onChange={onChange} />
                        {errors.Website && <div className="invalid-feedback">Invalid Website</div>}
                    </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea name="Description" className={`form-control ${errors.Description ? 'is-invalid' : ''}`} value={formData.Description} onChange={onChange} />
                  {errors.Description && <div className="invalid-feedback">Description is required</div>}
                </div>

                {/* Add similar inputs for other properties */}

                <div className="mb-3">
                  <label
                    htmlFor="fileInput"
                    className="image-input"
                    style={errors.Photo ? { borderColor: "red" } : undefined}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                    {formData.Photo ? (
                      <p>{(formData.Photo as File).name}</p>
                    ) : (
                      <p>
                        Upload company photo here. <b>Required!</b>
                      </p>
                    )}
                  </label>
                  {errors.Photo && <div className="invalid-feedback">Please upload a photo</div>}
                </div>

                <button className="btn btn-primary w-100" type="submit" onClick={handleFormSubmit}>Register</button>

                <div className="col-12 text-center mt-3">
                  <span><span className="text-muted small me-2">Already have an account? </span> <Link to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupEmployer;