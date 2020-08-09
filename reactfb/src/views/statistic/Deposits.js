import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";
import RoundImage from "react-rounded-image";
import Skeleton from 'react-loading-skeleton';

export default function Deposits() {
  const [pageInfor, setPageInfor] = useState([]);
  const [userAccessToken, setUserAT] = useState("");
  const [userData, setUserData] = useState(null);
  const [pageID, setPageID] = useState([]);
  const [productPageID, setProductPageID] = useState(null);

  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (check === false) {
      localStorage.setItem("clicked", check);
      localStorage.setItem("listPostClicked", check);
    }
  }, [check]);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    setUserData(user);
  }, []);

  useEffect(() => {
    if (userData) {
      const userLongLiveToken = localStorage.getItem("userLongLiveToken");
      setUserAT(userLongLiveToken);
    }
  }, [userData]);

 
  const getPagedata = () => {
    axios
      .get(
        `https://graph.facebook.com/v7.0/2556677127928535/accounts?access_token=${userAccessToken}`
      )
      .then(
        (res) => {
          const result = res.data.data;
          var pageID = [];
          for (var i = 0; i < result.length; i++) {
            pageID[i] = result[i].id;
          }
          setPageID(pageID);
          setPageInfor(result);
  
        },
        (error) => {
          console.log(error);
        }
      );
  };
  function removeButton() {
    document.getElementById("buttonGetPage").style.display = "none";
  }
  function showButton() {
    document.getElementById("buttonGetProduct").style.display = "block";
  }
  
  useEffect(() => {
    if (productPageID) {
      showButton();

    }
  }, [productPageID]);
  const renderPageInfo = (
    <div>
      {pageInfor.map((dataItem, index) => (
        // <div key={dataItem.id}>
        <div>
          <button
            style={{
              background: "#FFFFFF",
              border: "0px ",
            }}
            key={index}
            onClick={() => {setProductPageID(dataItem.id);setpageAccessToken(dataItem.access_token)}}
          >
            {/* <div>Name: {dataItem.name}</div> */}
            <div>
            <RoundImage
              image={`https://graph.facebook.com/v7.0/${dataItem.id}/picture`||<Skeleton/>}
              roundedColor="#321124"
              imageWidth="50"
              imageHeight="50"
              roundedSize="1"
            />

            <Typography>{dataItem.name}</Typography>
            </div>
            {/* <div>ID page: {dataItem.id}</div> */}
            <br />
          </button>
          <br />
        </div>
      ))}
    </div>
  );

  function getFunction() {
    getPagedata();
    removeButton();
    
    console.log("data Page", pageInfor);
  }

  

  function onClick() {
    // getProductCatalog();
    localStorage.setItem("listPostClicked", true);
    localStorage.setItem("pageID",productPageID);
    getPageFanOnline();
    getPageNegativeFeedback();
    // getPageAccessToken();
  }
  const [pageAccessToken,setpageAccessToken]=useState(null);
 
  const getPageFanOnline=()=>{
    axios
    .get( `https://graph.facebook.com/v7.0/${productPageID}/insights/page_fans_online?access_token=${pageAccessToken}`)
    .then(
      (res)=>{
        const result=res.data.data;
        // setDataCollected(result)
        localStorage.setItem("data_page_fan_online", JSON.stringify(result[0].values));
        console.log("data_page_fan_online",JSON.stringify(result[0].values[0].value))
      }
    )
  }
  const getPageNegativeFeedback=()=>{
    axios
    .get( `https://graph.facebook.com/v7.0/${productPageID}/insights/page_fans_locale?access_token=${pageAccessToken}`)
    .then(
      (res)=>{
        const result=res.data.data[0].values[0];
        // setDataCollected(result)
        localStorage.setItem("page_negative_feedback", JSON.stringify(result));
        console.log("page_negative_feedback",result)
      }
    )
  }
  // const getHighestUser=()=>{

  // }
  return (
    <React.Fragment>
      <Title>Your Pages</Title>
      <br />
      <button
        style={{ display: "block" }}
        id="buttonGetPage"
        onClick={() => getFunction()}
      >
        Show page
      </button>
      <button
        style={{ display: "none" }}
        id="buttonGetProduct"
        onClick={() => onClick()}
      >
        Get statistic
      </button>
      <br />
      {/* {getPageAvatar} */}
      {renderPageInfo}
    </React.Fragment>
  );
}
