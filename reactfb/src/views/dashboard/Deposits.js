
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import FacebookLoginBtn from 'react-facebook-login';	
import React, { useState, useEffect } from "react";

export default function Deposits() {
    const [fbData, setFbData] = useState([]);
    const [auth, setAuth] = useState(false);

    let dataItem;
    let name= '';
    let picture= '';
    let user_accesstoken='';
    let user_id='';
    let facebookData;
    const responseFacebook = response => {
      console.log(response);
      if (response.status !== 'unknown'){
        const userInfor = response;
            setFbData(userInfor)
            setAuth(true)
        
        // name=userInfor.data.name;
        // picture=userInfor.data.picture.data.url;
        // user_accesstoken=userInfor.data.accessToken;
        // user_id=userInfor.data.userID;
        //   this.setState({
        //       auth: true,
        //       name: response.name,
        //       picture: response.picture.data.url,
        //       user_accesstoken:response.accessToken,
        //       user_id:response.userID
        //   });
        }
  }

    const componentClicked = () => {
          console.log('Facebook btn clicked');
    }
    
    
    if (auth==true){
        facebookData = (
            <div>
                <Title>Profile</Title>
                    <div>
                        <img src={fbData.picture.data.url} alt={fbData.name}/>
                        <br />
                        <h2> {fbData.name}</h2>
                    </div>
            </div>)
        }else{
        facebookData = (<FacebookLoginBtn
            appId="298749031132657"
            autoLoad={false}
            fields="name,picture"
            onClick={componentClicked}
            callback={responseFacebook} />);
    }
   
  return (
    <div>
        {facebookData}
      
    </div>
  );
}