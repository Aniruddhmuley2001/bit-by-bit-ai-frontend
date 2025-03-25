import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/bitbybit-ai-logo-white.svg';
import { useSelector } from 'react-redux';
import { selectUser, setUserDetails, clearUserDetails } from '../../features/user/userSlice';
import db from '../../firebase';
import { auth, provider} from '../../firebase';
import { useDispatch } from 'react-redux';
const Header = () => {
  // useEffect(()=>{
  //   db.collection("users").onSnapshot((snapshot)=>{
  //     snapshot.docs.forEach((doc)=>{
  //       console.log(doc.data());
  //     })
  //   })
  // },[])

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const user = useSelector(selectUser);
  // console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginOut = () => {
    // dispatch(clearUserDetails());
    if (user?.email == null){
      auth.signInWithPopup(provider).then((result)=>{
        setUser(result);
        console.log("after setUser");
    })
  }
    else{
      console.log("user already logged in");
      dispatch(clearUserDetails());
      navigate("/");
    }
  }
  console.log("db",db);
  const setUser = (result) => {
    var user_list = []
    console.log("result",result);

    db.collection("users").doc(result.user.email).get().then((doc)=>{
      if(doc.exists){
        console.log("user already exists");
        dispatch(setUserDetails({
          email: result.user.email,
          photoUrl: result.user.photoURL,
          username: result.user.displayName
        }));
      }
      else{
        db.collection("users").doc(result.user.email).set({
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        }).then(()=>{
          dispatch(setUserDetails({
            email: result.user.email,
            photoUrl: result.user.photoURL,
            username: result.user.displayName
          }));
        })
      }
    })
  }
  return (
    <header className="header">
      <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo" />
          {!isHomePage && (
            <div className='logo-text'>AI Enabled Platform Assistant</div>
          )}
          <div className="loginbtn" onClick={handleLoginOut}>{user?.email!=null ? "Logout" : "Login"}</div>
      </div>
    </header>
  );
};

export default Header; 