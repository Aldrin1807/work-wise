import { Link } from "react-router-dom";

import about1 from '../assets/images/about/ab01.jpg';
import about2 from '../assets/images/about/ab02.jpg';

interface AboutUsProps {
    containerClass: string;
    role: string; // Assuming role prop is passed as a string
}

export default function AboutUs({ containerClass, role }: AboutUsProps) {
    const isEmployerRole = role === 'Employer';

    return (
        <>
            <div className={containerClass}>
                <div className="row g-4 align-items-center">
                    <div className="col-lg-6 col-md-6 mb-5">
                        <div className="about-left">
                            <div className="position-relative shadow rounded img-one">
                                <img src={about1} className="img-fluid rounded" alt="" />
                            </div>

                            <div className="img-two shadow rounded p-2 bg-white">
                                <img src={about2} className="img-fluid rounded" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="section-title ms-lg-5">
                            <h4 className="title mb-3">{isEmployerRole ? 'Millions of jobseekers' : 'Millions of jobs.'} <br /> Find the one that's right for you.</h4>
                            <p className="text-muted para-desc mb-0">
                                {isEmployerRole
                                    ? 'Discover top talent for your business. Explore millions of job seekers and find the right fit for your company. Create your unique brand presence, and read reviews on over 30000+ companies worldwide to make informed decisions.'
                                    : 'Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.'}
                            </p>

                            <ul className="list-unstyled text-muted mb-0 mt-3">
                                {isEmployerRole ? (
                                    <>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Effective Digital Marketing Solutions</li>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Tap into our Talented & Experienced Job Seeker Network</li>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Create a compelling brand identity to attract the best candidates</li>
                                    </>
                                ) : (
                                    <>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Digital Marketing Solutions for Tomorrow</li>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Our Talented & Experienced Marketing Agency</li>
                                        <li className="mb-1"><span className="text-primary h5 me-2"><i className="mdi mdi-check-circle-outline align-middle"></i></span>Create your own skin to match your brand</li>
                                    </>
                                )}
                            </ul>

                            <div className="mt-4">
                                <Link to="/aboutus" className="btn btn-primary">{isEmployerRole ? 'Learn More' : 'About Us'} <i className="mdi mdi-arrow-right align-middle"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
