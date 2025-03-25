import React from 'react';
import '../style/Header.css';
import logoImage from '../assets/logo.png'; // Adjust the path to your logo image
import { selectUserPhoto } from '../features/user/userSlice';
import { usePostAiTextMutation } from '../state/api.js';
import { selectUserId } from '../features/user/userSlice';
import { selectdata } from '../features/user/userSlice';
const Header = () => {
    const userPhoto = useSelector(selectUserPhoto);
    const userId = useSelector(selectUserId);
    const [trigger]= usePostAiTextMutation();
    console.log(selectdata())
    return (
        <header className="header sticky-header">
            <div className="logo-container">
                {/* <img src={logoImage} alt="Logo" className="logo" /> */}
                <div className="loginbtn">{userId ? "Logout" : "Login"}</div>
            </div>
        </header>
    );
};

export default Header;