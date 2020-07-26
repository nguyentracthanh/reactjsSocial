import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import FacebookLoginBtn from "react-facebook-login";
import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { UserContext } from "./../../utils/userContext";
export default function Deposits() {
  const [fbData, setFbData] = useState([]);
  const [fbDataLocal, setFbDataLocal] = useState([]);
  const [auth, setAuth] = useState(null);
  const [userShortLiveToken, setUserShortLiveToken] = useState(null);
  const [fbLoginClicked, setFBLoginClicked] = useState(false);
  const [userLongLiveAccesstoken, setUserLongLiveAccesstoken] = useState('');
  
  // const {onSignIn}=useContext(UserContext);
  // if(!fbLoginClicked){
  //   localStorage.removeItem("userData");
  //   localStorage.removeItem("userLongLiveToken");
  //   setAuth(false);
  // }
  // let dataItem;
  // let name= '';
  // let picture= '';
  // let user_accesstoken='';
  // let user_id='';
  let facebookData;
  const responseFacebook = (response) => {
    console.log(response);
    
    if (response.status !== "unknown") {
      const userInfor = response;
      
      setFbData(userInfor);

      // onSignIn(userInfor)
      localStorage.setItem("userData", JSON.stringify(userInfor));
      
      



      // name=userInfor.data.name;
      // picture=userInfor.data.picture.data.url;

      // user_id=userInfor.data.userID;
      //   this.setState({
      //       auth: true,
      //       name: response.name,
      //       picture: response.picture.data.url,
      //       user_accesstoken:response.accessToken,
      //       user_id:response.userID
      //   });
    }
    console.log(userShortLiveToken);
  };
  // useEffect(() => {
  //   if (localStorage.getItem("userData") == null) {
  //     localStorage.setItem("userData", JSON.stringify(fbData));
  //   } else {
  //     localStorage.removeItem("userData");
  //     localStorage.setItem("userData", JSON.stringify(fbData));
  //   }
  // })
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
            localStorage.setItem("userLongLiveToken", (result));
          },
          (error) => {
            console.log(error);
          }
        );
    }
  },[userShortLiveToken]);

  


  const [fbPageData, setFbPageData] = useState([]);

  const [pageAccessToken, setpageAccessToken] = useState(
    fbPageData.accessToken
  );
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAuth(false)
  //   }, 5);
  //   return () => {
  //     clearTimeout(timer);
  //     localStorage.clear('userData');}
  // }, []);
  
  // const [userID, setUserID] = useState(fbData.userID);

  const componentClicked = () => {
    setFBLoginClicked(true)
  };
  useEffect(()=>{
    if(localStorage.getItem("userData")=="undefined"){
      setFBLoginClicked(false);
    }
  },[])
  useEffect(() => {
    // if(auth){

    const user = JSON.parse(localStorage.getItem("userData"));
    // if(fbData && fbData.length){
    //   console.log("hihi",user)
    setFbDataLocal(user);
    
    // }
    // }
  }, []);
  useEffect(() => {
    if (fbDataLocal) {
      setAuth(true);
      // setUserAT(fbData.accessToken);

    }
  }, [fbDataLocal]);
  useEffect(()=>{
    if(fbDataLocal){
      const result=fbDataLocal.accessToken;
      setUserShortLiveToken(result);
      console.log("fbDataLocal: ",fbDataLocal);
      console.log("user access token", result)
    }
    
  },[fbDataLocal])

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
    // localStorage.clear("userData")
  }

  return <div>{facebookData}</div>;
}
