import {useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoWhite from "../assets/images/logo-white.png"
import logoLight from "../assets/images/logo-light.png"
import { FaRegBell } from "react-icons/fa";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { fetchUser } from "../api/user-api";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";

export default function Navbar({navClass, navLight}: {navClass: string, navLight: boolean}){
    const dispatch = useDispatch();

    let [isOpen, setMenu] = useState(true);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu , setManu] = useState('');
    let location = useLocation();
    useEffect(()=>{
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    },[location.pathname.substring(location.pathname.lastIndexOf('/') + 1)])

    useEffect(() => {

        let searchModal = () => {setSearch(false)}
        document.addEventListener('mousedown',searchModal);

        let cartModal = (event:any) => {
            if (event.target.closest('.dropdown-menu')) {
                return;
            }
    
            setCartitem(false);
        };
        document.addEventListener('mousedown',cartModal);
        window.scrollTo(0, 0);

        return () => {
            document.removeEventListener('mousedown',searchModal);
            document.removeEventListener('mousedown',cartModal);
        };

    }, []);
    const toggleMenu = () => {
        setMenu(!isOpen);
    }

    const handleDropdownItemClick = (event:any) => {
        const targetPath = event.target.getAttribute('data-path');
        if (targetPath) {
            window.location.href = targetPath;
        }
    
        setCartitem(false);
    };
    const LogOut = () => {
        dispatch(clearUser());
    }


    const user = useSelector((state:any) => state.user);
    const [userData,setUserData] = useState({
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
    useEffect(() => {
        if(user.token==null){
            return;
        }
        const fetchData = async () => {
            const getUser = await fetchUser(user.token,user.userId);
            setUserData(getUser);
        };
        fetchData();
        console.log("user fetched");
    }, [user]);

    return(
    <header id="topnav" className='nav-sticky'>
        <div className="container">
            {navLight === true ? 
                <Link className="logo" to="/">
                    <span className="logo-light-mode">
                        <img src={logoDark} className="l-dark" alt=""/>
                        <img src={logoLight} className="l-light" alt=""/>
                    </span>
                    <img src={logoLight} className="logo-dark-mode" alt=""/>
                </Link> : 
                <Link className="logo" to="/">
                    <span className="logo-light-mode">
                        <img src={logoDark} className="l-dark" alt=""/>
                        <img src={logoWhite} className="l-light" alt=""/>
                    </span>
                    <img src={logoWhite} className="logo-dark-mode" alt=""/>
                </Link>
            }

            <ul className="buy-button list-inline mb-0">
                {(user.token==null)?(
                    <li className="list-inline-item ps-1 mb-0">
                    <Link to="/login">Sign in</Link>
                    </li>)
                    :
                    
                <><li className="list-inline-item ps-1 mb-0">
                                <div className="dropdown">
                                    <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                        <FaRegBell className="icons" />
                                    </button>
                                    <div style={{ display: search === true ? 'block' : 'none' }}>
                                        <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{ width: '240px', position: 'absolute', right: '0' }}>
                                            <div className="search-bar">
                                                <div id="itemSearch" className="menu-search mb-0">
                                                    <p className="text-center">Notification here!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li><li className="list-inline-item ps-1 mb-0">

                                    <div className="dropdown dropdown-primary">
                                        <button type="button" onClick={() => setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                            <img src={`data:image/png;base64, ${userData.photo}`} className="img-fluid rounded-pill" alt="" />
                                        </button>
                                        <div style={{ display: cartitem === true ? 'block' : 'none' }}>
                                            <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                                                <Link to="/candidate-profile/1" className="dropdown-item fw-medium fs-6" onClick={handleDropdownItemClick}>
                                                    <FiUser className="fea icon-sm me-2 align-middle" />Profile
                                                </Link>
                                                <Link to="/candidate-profile-setting/1" className="dropdown-item fw-medium fs-6" onClick={handleDropdownItemClick}>
                                                    <FiSettings className="fea icon-sm me-2 align-middle" />Settings
                                                </Link>
                                                <div className="dropdown-divider border-top"></div>
                                                <Link to="/login" className="dropdown-item fw-medium fs-6" onClick={LogOut}>
                                                    <FiLogOut className="fea icon-sm me-2 align-middle" />Logout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li></>
                }
            </ul>
    
            <div id="navigation">  
                <ul className="navigation-menu nav-right nav-light">
                    <li className={`${["job-categories", "job-list","job-detail", "job-apply","job-post" ].includes(manu)? "active" : ""} parent-menu-item`}>
                        <Link to="/job-list"> Jobs </Link><span className="menu-arrow"></span> 
                    </li>
                    
                    <li className={`${["employers", "employer-profile"].includes(manu)? "active" : ""} parent-menu-item`}>
                        <Link to="/employers" className="sub-menu-item">Employers</Link>
                    </li>
                        
                    <li className={manu === "contactus"  ? "active" : ""}><Link to="/contactus" className="sub-menu-item">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </header>
    )
}