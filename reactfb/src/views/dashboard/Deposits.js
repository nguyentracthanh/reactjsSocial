import Title from "./Title";
import FacebookLoginBtn from "react-facebook-login";
import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Deposits() {
  const [fbDataLocal, setFbDataLocal] = useState([]);
  const [userShortLiveToken, setUserShortLiveToken] = useState(null);
  const [fbLoginClicked, setFBLoginClicked] = useState(false);
  const [userLongLiveAccesstoken, setUserLongLiveAccesstoken] = useState("");

  let facebookData;
  const responseFacebook = (response) => {
    console.log(response);

    if (response.status !== "unknown") {
      const userInfor = response;

      localStorage.setItem("userData", JSON.stringify(userInfor));
    }
    console.log(userShortLiveToken);
  };

  useEffect(() => {
    if (userShortLiveToken) {
      axios
        .get(
          `https://graph.facebook.com/v7.0/oauth/access_token?grant_type=fb_exchange_token&client_id=298749031132657&client_secret=a07b28c470c31524350c8fb404852362&fb_exchange_token=${userShortLiveToken}`
        )
        .then(
          (res) => {
            const result = res.data.access_token;
            // alert("long live at", result)
            console.log("long live accesstoken: ", result);
            // alert(userAccessToken)
            setUserLongLiveAccesstoken(result);
            localStorage.setItem("userLongLiveToken", result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [userShortLiveToken]);


  const componentClicked = () => {
    setFBLoginClicked(true);
  };
  useEffect(() => {
    if (localStorage.getItem("userData") == "undefined") {
      setFBLoginClicked(false);
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    setFbDataLocal(user);
  }, []);

  useEffect(() => {
    if (fbDataLocal) {
      const result = fbDataLocal.accessToken;
      setUserShortLiveToken(result);
      console.log("fbDataLocal: ", fbDataLocal);
      console.log("user access token", result);
    }
  }, [fbDataLocal]);

  if (fbLoginClicked) {
    facebookData = (
      <div>
        <Title>Profile</Title>
        <div>
          <img src={fbDataLocal.picture.data.url} alt={fbDataLocal.name} />
          <br />
          <h2> {fbDataLocal.name}</h2>
        </div>
      </div>
    );
  } else {
    facebookData = (
      <FacebookLoginBtn
        appId="298749031132657"
        autoLoad={false}
        fields="name,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }

  return <div>{facebookData}</div>;
}
