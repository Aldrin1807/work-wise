import { Link, useNavigate } from "react-router-dom";

import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'
import { useState } from "react";
import { LoginUser } from "../api/user-api";

export default function Login(){
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        email:'',
        password:'',
    })
    const[errors,setErrors] = useState({
        email:false,
        password:false,
    })

    const OnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleLogin = async (e:any) => {
        e.preventDefault()

        const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailValid = EmailRegex.test(formData.email);
        const passwordValid = formData.password.length >= 7 && formData.password.length <= 20;

        setErrors({
            email: !emailValid,
            password: !passwordValid,
        })

        if(emailValid && passwordValid){
            console.log(formData)
            const response = await LoginUser(formData);
            if(response){
                navigate("/");
            }
        }
    }

    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form>
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h6 className="mb-3 text-uppercase fw-semibold">Please sign in</h6>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Email</label>
                                    <input name="email" id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={OnChange}  placeholder="example@example.com"/>
                                    {errors.email && <div className="invalid-feedback">Invalid email</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="loginpass" placeholder="Password" value={formData.password} onChange={OnChange}/>
                                    {errors.password && <div className="invalid-feedback">Password must be between 8 and 20 characters</div>}
                                </div>
                
                                <button className="btn btn-primary w-100" type="submit" onClick={handleLogin}>Sign in</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2 small">Don't have an account ?</span> <Link to="/signup" className="text-dark fw-semibold small">Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}