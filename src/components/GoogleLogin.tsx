import React, { useState, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import USER from "../models/User";

import "./GoogleLogin.css";
import { UserCard } from "./UserCard";



export const GoogleLogin = () => {
  const [user, setUser] = useState<USER>({name: "", profileImg: ""});

  const updateUser = (currentUser: any) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser({
      name: name,
      profileImg: profileImg,
    });
  }

  const attachSignin = (element: any, auth2: any) => {
    auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        updateUser(googleUser);
      }, (error: any) => {
        console.log(JSON.stringify(error))
      })
  }

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser({name: "", profileImg: ""});
      console.log("User signed out.");
    })
  }

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLIENT_ID || "", "");
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get())
      } else {
        attachSignin(document.getElementById('customBtn'), auth2);
      }
    }
    setAuth2();
  }, [])

  useEffect(() => {
    if (user.name == "" && user.profileImg == "") {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLIENT_ID || "", "");
        attachSignin(document.getElementById('customBtn'), auth2);
      }
      setAuth2();
    }
  }, [user])

  if(user.name != "" && user.profileImg != "") {
    return (
      <div className="container">
        <UserCard user={user} />
        <div id="" className="btn logout" onClick={signOut}>
          Logout
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div id="customBtn" className="btn login">
        Login
      </div>
    </div>
  )
}