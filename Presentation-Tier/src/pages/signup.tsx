import { Link } from "react-router-dom";
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';
import { useState } from "react";
import { Registration } from "../api/user-api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phonenumber: '',
    gender: '',
    photo: null,
    location: '',
    position: ''
  });

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    phonenumber: false,
    gender: false,
    location: false,
    photo: false,
    position: false
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleFileChange = (event:any) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    const FirstLastNameRegex = /^[a-zA-Z]{3,}$/;
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const firstNameValid = FirstLastNameRegex.test(formData.firstname);
    const lastNameValid = FirstLastNameRegex.test(formData.lastname);
    const emailValid = EmailRegex.test(formData.email);
    const passwordValid = formData.password.length >= 8 && formData.password.length <= 20;
    const locationValid = formData.location.length >= 3;
    const photoValid = formData.photo !== null;
    const phoneNumberValid = formData.phonenumber.length >= 7;
    const genderValid = formData.gender.length > 0;
    const positionValid = formData.position.length > 0;


    setErrors({
        firstname: !firstNameValid,
        lastname: !lastNameValid,
        email: !emailValid,
        password: !passwordValid,
        location: !locationValid,
        photo: !photoValid,
        phonenumber: !phoneNumberValid,
        gender: !genderValid,
        position: !positionValid
      });
    
      console.log(errors);
    
      if (
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        passwordValid &&
        locationValid &&
        photoValid &&
        phoneNumberValid &&
        genderValid
      ) {
        console.log("formValid");
        const form = new FormData();
        form.append("firstname", formData.firstname);
        form.append("lastname", formData.lastname);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("phonenumber", formData.phonenumber);
        form.append("location",formData.location);
        form.append("position",formData.position);
        if (formData.photo) {
            form.append("photo", formData.photo);
        }
        form.append("gender",formData.gender);
        

       const response = await Registration(form);
        if(response){
            navigate('/login');
        }
      }
    };
  const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Kosova","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  return (
    <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}>
      <div className="bg-overlay bg-linear-gradient-2"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{ maxWidth: '500px' }}>
              <form>
                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt="" /></Link>
                <h6 className="mb-3 text-uppercase fw-semibold">Register your account</h6>
                <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Your First Name</label>
                      <input name="firstname" id="firstname" type="text" className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} value={formData.firstname} onChange={onChange} />
                      {errors.firstname && <div className="invalid-feedback">Invalid first name</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Your Last Name</label>
                      <input name="lastname" id="lastname" type="text" className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} value={formData.lastname} onChange={onChange} />
                      {errors.lastname && <div className="invalid-feedback">Invalid last name</div>}
                    </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Email</label>
                  <input name="email" id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={onChange} />
                  {errors.email && <div className="invalid-feedback">Invalid email</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={onChange}
                  />
                  {errors.password && <div className="invalid-feedback">Password must be between 8 and 20 characters</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your current position</label>
                  <input name="position" id="position" type="text" className={`form-control ${errors.position ? 'is-invalid' : ''}`} value={formData.position} onChange={onChange} />
                  {errors.position && <div className="invalid-feedback">Invalid</div>}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Phone Number</label>
                    <input name="phonenumber" id="phonenumber" type="tel" className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`} value={formData.phonenumber} onChange={onChange} />
                    {errors.phonenumber && <div className="invalid-feedback">Invalid phone number</div>}
                  </div>
                      <div className="col-md-6">
                      <label className="form-label fw-semibold">Your gender</label>
                      <select name="gender" id="gender" className={`form-select ${errors.gender ? 'is-invalid' : ''}`} value={formData.gender} onChange={onChange}>
                        <option value="" disabled>Select your gender</option>
                        {["Male","Female"].map((gender, index) => (
                          <option key={index} value={gender}>{gender}</option>
                        ))}
                      </select>
                      {errors.gender && <div className="invalid-feedback">Please select your gender</div>}
                    </div>
                </div>
                
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Location</label>
                  <select name="location" id="location" className={`form-select ${errors.location ? 'is-invalid' : ''}`} value={formData.location} onChange={onChange}>
                    <option value="" disabled>Select your location</option>
                    {country_list.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                  {errors.location && <div className="invalid-feedback">Please select your location</div>}
                </div>
                
                <div className="mb-3">
                  <label
                    htmlFor="fileInput"
                    className="image-input"
                    style={errors.photo ? { borderColor: "red" } : undefined}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                    {formData.photo ? (
                      <p>{(formData.photo as File).name}</p>
                    ) : (
                      <p>
                        Upload image here. <b>Required!</b>
                      </p>
                    )}
                  </label>
                  {errors.photo && <div className="invalid-feedback">Please upload a photo</div>}
                </div>
                <div className="mb-3">
                  <span><span className="text-muted small me-2">Are you an Employer? </span> <Link to="/signup-employer" className="text-dark fw-semibold small">Sign up as an Employer</Link></span>
                </div>
                <button className="btn btn-primary w-100" type="submit" onClick={handleFormSubmit}>Register</button>

                <div className="col-12 text-center mt-3">
                  <span><span className="text-muted small me-2">Already have an account ? </span> <Link to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
