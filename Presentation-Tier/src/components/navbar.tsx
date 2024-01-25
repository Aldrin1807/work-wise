import {useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoWhite from "../assets/images/logo-white.png"
import logoLight from "../assets/images/logo-light.png"
import { FaEllipsisH, FaEnvelope, FaEnvelopeOpen, FaRegBell } from "react-icons/fa";
import { FiUser,  FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { deleteNotification, fetchNotifications, fetchUser, updateNotificationStatus, updateStatuses } from "../api/user-api";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { FaCheck } from "react-icons/fa6";
import { Button, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import swal from "sweetalert";

export default function Navbar({navClass, navLight}: {navClass: string, navLight: boolean}){
    const dispatch = useDispatch();
    
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [notifications,setNotifications] = useState([] as any);
    const [changed,setChanged] = useState(false);

    let [manu , setManu] = useState('');
    let location = useLocation();
    useEffect(()=>{
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    },[location.pathname.substring(location.pathname.lastIndexOf('/') + 1)])

    const LogOut = () => {
        dispatch(clearUser());
    }


    const user = useSelector((state:any) => state.user);
    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        photo: null,
        location: '',
        position: ''
    });
    useEffect(() => {
        if(!user.isAuthenticated){
            return;
        }
        const fetchData = async () => {
            const getUser = await fetchUser(user.token,user.userId);
            setUserData(getUser);
        };
        fetchData();
        console.log("user fetched");
    }, [user]);

    useEffect(() => {
        if(!user.isAuthenticated){
            return;
        }
        const fetchData = async () => {
            const response = await fetchNotifications(user.token,user.userId);
            setNotifications(response);
        };
        fetchData();
        console.log("notifications fetched");
    },[user,changed])


    const toggleNotificationDropdown = () => {
        setNotificationDropdown(!notificationDropdown);
        setProfileDropdown(false);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
        setNotificationDropdown(false);
    };
    
    const updateStatus = async (id: string, status: string) => {
        await updateNotificationStatus(user.token, id, status);
        setChanged(!changed);
    }
    const deleteNotif = async (id: string) => {
        const confirmTitle = "Are you sure?";
        const confirmText = "Once deleted, you will not be able to recover this notification!";
        const confirmIcon = "warning";
        const confirmButtonText = "Delete";
        const status = "RemoveApplication";

        const shouldProceed = await swal({
            title: confirmTitle,
            text: confirmText,
            icon: confirmIcon,
            buttons: ["Cancel", confirmButtonText],
            dangerMode: status === "RemoveApplication",
        });

        if (shouldProceed) {
           await deleteNotification(user.token, id);
           setChanged(!changed);
        } else {
            swal("Action Canceled", "Notification is safe!", "info");
        }
    }
    const updateAllStatuses = async (status: string) => {
        await updateStatuses(user.token, user.userId, status);
        setChanged(!changed);
    }

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
            {!user.isAuthenticated ? (
                <li className="list-inline-item ps-1 mb-0">
                    <Link to="/login">Sign in</Link>
                </li>
            ) : (
                <>
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown">
                            <button
                                type="button"
                                className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
                                onClick={toggleNotificationDropdown}
                            >
                                <FaRegBell className="icons" />
                            </button>

                            <div
                                className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 ${
                                    notificationDropdown ? 'show' : ''
                                }`}
                                style={{ width: '325px', position: 'absolute', right: '0' }}
                            >
                                <div className="search-bar">
                                    <div id="itemSearch" style={{height:'20rem',overflowY:'auto', border: '1px solid #ccc', borderBottomLeftRadius: '7px', borderBottomRightRadius: '7px', borderTop: 'none' }} className="menu-search mb-0">
                                        <div className="d-flex justify-content-end me-4 align-items-center" >
                                        {notifications.some((notification: any) => notification.status === 'Unread') ? (notifications.length > 0 && 
                                                <Button variant="outline-primary" className="icons" style={{ fontSize: '1rem' }} size="sm" onClick={()=>updateAllStatuses("Read")}>
                                                    <FaEnvelopeOpen />
                                                </Button>
                                        ) : (notifications.length > 0 && 
                                                <Button variant="outline-primary" className="icons" style={{ fontSize: '1rem' }} size="sm" onClick={()=>updateAllStatuses("Unread")}>
                                                    <FaEnvelope />
                                                </Button>
                                        )}
                                        </div>
                                        <hr className="mt-1 mb-1"/>
                                        {notifications.length === 0 && <p className="text-center">No notifications.</p>}
                                        {notifications.map((notification:any) => (
                                            <>
                                            <div key={notification.id} className="notification-item d-flex flex-row justify-content-evenly align-items-center p-1" style={{ backgroundColor: notification.status === 'Unread' ? 'aliceblue' : ''}}>
                                                <p className={`text-center ${notification.type === 'Information' ? 'text-info' : ''} ${notification.type === 'Success' ? 'text-success' : ''} ${notification.type === 'Warning' ? 'text-warning' : ''} ${notification.type === 'Error' ? 'text-danger' : ''}`}>{notification.message}</p>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="link" id={`dropdown-${notification.id}`} className="dots-icon">
                                                        <i className="mdi mdi-dots-vertical fs-4"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>deleteNotif(notification.id)}>Delete</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>updateStatus(notification.id,"Read")} disabled={notification.status=="Read"}>Mark as read</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>updateStatus(notification.id,"Unread")} disabled={notification.status=="Unread"}>Mark as unread</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown dropdown-primary">
                            <button
                                type="button"
                                className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
                                onClick={toggleProfileDropdown}
                            >
                                <img
                                    src={`data:image/png;base64, ${userData.photo}`}
                                    className="img-fluid rounded-pill"
                                    alt=""
                                />
                            </button>
                            <div
                                className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 ${
                                    profileDropdown ? 'show' : ''
                                }`}
                            >
                                <Link
                                    to={`${
                                        user.role === 'Employer'
                                            ? `/employer-profile/${user.userId}`
                                            : `/candidate-profile/${user.userId}`
                                    }`}
                                    className="dropdown-item fw-medium fs-6"
                                >
                                    <FiUser className="fea icon-sm me-2 align-middle" />
                                    Profile
                                </Link>
                                {user.role === 'Employer' ? (
                                    ''
                                ) : (
                                    <Link
                                        to="/my-applications"
                                        className="dropdown-item fw-medium fs-6"
                                    >
                                        <FaCheck className="fea icon-sm me-2 align-middle" />
                                        Applied Jobs
                                    </Link>
                                )}
                                <div className="dropdown-divider border-top"></div>
                                <Link
                                    to="/login"
                                    className="dropdown-item fw-medium fs-6"
                                    onClick={LogOut}
                                >
                                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </li>
                </>
            )}
        </ul>
    
            <div id="navigation">  
                <ul className="navigation-menu nav-right nav-light">
                    {user.role==="Employer"?(
                        <>
                            <li className={`${["job-list"].includes(manu)? "active" : ""} parent-menu-item`}>
                                <Link to="/job-list"> Search </Link><span className="menu-arrow"></span> 
                            </li>
                            <li className={`${["job-categories", "job-detail", "job-apply", "job-post","my-jobs" ].includes(manu)? "active" : ""} parent-menu-item`}>
                                <Link to="/my-jobs"> My Jobs </Link><span className="menu-arrow"></span> 
                            </li>
                        </>
                    ):(
                        <>
                            <li className={`${["job-categories", "job-list","job-detail", "job-apply","job-post" ].includes(manu)? "active" : ""} parent-menu-item`}>
                                <Link to="/job-list"> Jobs </Link><span className="menu-arrow"></span> 
                            </li>

                            <li className={`${["employers", "employer-profile"].includes(manu)? "active" : ""} parent-menu-item`}>
                                <Link to="/employers" className="sub-menu-item">Employers</Link>
                            </li>
                        </>
                    )}
                    

                    
                        
                    <li className={manu === "contactus"  ? "active" : ""}><Link to="/contactus" className="sub-menu-item">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </header>
    )
}