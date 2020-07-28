import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Axios from "axios";
import { render } from "@testing-library/react";
import MetisMenu from "react-metismenu";
import RoundImage from "react-rounded-image";
// Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

export default function Posts() {
  const [catalogs, setCatalogs] = useState([]);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [pageIDLocal, setPageIDLocal] = useState(null);
  const [pageID, setPageID] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const [sharecount, setSharecount] = useState(null);

  // const [IDcatalog, setIDcatalog] = useState(null);
  // const [nameProduct, setNameProduct] = useState([]);
  const [checker, setchecker] = useState(false);
  useEffect(() => {
    const userLongLiveToken = localStorage.getItem("userLongLiveToken");
    setUserAccessToken(userLongLiveToken);
    // alert("user access token:",userAccessToken);
  }, []);
  useEffect(() => {
    const check= localStorage.getItem("listPostClicked");
    if(check=='true'){
    const index = localStorage.getItem("pageID");
    console.log("pageID 1".pageID);
    setPageIDLocal(index);
    }
  }, );

  // useEffect(() => {
  //   const catalog = JSON.parse(localStorage.getItem("CatalogID"));
  //   setCatalogs(catalog);
  //   console.log(catalog);
  // }, []);
  // useEffect(()=>{
  //   if (catalogs){
  //     setchecker(true);
  //   }
  // },[catalogs]);
  // useEffect(() => {
  //   if (catalogs.length != 0) {
  //     setIDcatalog(catalogs[0].id);
  //   }
  // }, [catalogs]);
  const getFeedPage = () => {
    // if (catalogs && catalogs.length) {
    // let catalogID = catalogs.map((catalog, index, catalogs) => {

    //   return catalog.id[0];

    // });
    // const catalogItem=catalogs[0];
    // for(var i=0;i<catalogs.length;i++){

    // }
    
    // console.log(catalogs[0].id);
    Axios.get(
      `https://graph.facebook.com/v7.0/${pageID}/feed?fields=id,message,created_time,shares,picture&access_token=${userAccessToken}`
    ).then((res) => {
      const result = res.data.data;
      setFeedData(result);
      setSharecount(result.shares);
      console.log("setSharecount", result.shares);
      console.log ("pageID",pageID);
      console.log("feed: ", result);
      // localStorage.setItem("productSetDetail", JSON.stringify(productSet));
    });
    // }
  };
  // const getPost = () => {
  //   for (var i = 0; productSetDetail.length; i++) {
  //     Axios.get(
  //       `https://graph.facebook.com/v7.0/${productSetDetail[i]}/products?access_token=${userAccessToken}`
  //     ).then((res) => {
  //       const result = res.data;
  //       console.log("product follow set:", res);
  //       setNameProduct(result);
  //       console.log("productset Id:", result);
  //     });
  //     // return (
  //     //   <div>

  //     //   </div>
  //     // );
  //   }
  // };
  function removeButton() {
    document.getElementById("buttonProductlist").style.display = "none";
  }

  function Onclicked() {
    // getCatalogID();
    // getProduct();
    setPageID(pageIDLocal);
    calculateTime();
    getFeedPage();
    console.log("clicked");
    
  }
  const calculateTime = () => {
    const date = new Date(feedData.map((dataItem) => dataItem.created_time));
    console.log("time convert: ", date);
  };

  return (
    <React.Fragment>
      <button id="buttonProductlist" onClick={() => Onclicked()}>
        {" "}
        Show Post
      </button>
      <RoundImage
        image={`https://graph.facebook.com/v7.0/${pageID}/picture`}
        roundedColor="#321124"
        imageWidth="50"
        imageHeight="50"
        roundedSize="1"
        
      />
      {feedData.map((feedItem) => (
        <div>
          <text rows="5" style={{ fontSize: 16 }}>
            {feedItem.message}{" "}
          </text>
          <br />
          <img src={feedItem.picture} ></img>
          {/* Number of share: {sharecount.map(count=>count)} */}
          <br />
          Date: {Date(feedItem.created_time)}
        </div>
      ))}

      {/* {productSetDetail.map((productSetDetailItem) => (
        <menu key={productSetDetailItem.id}>
          {productSetDetailItem.name}
          <ProductItemList />
          
        </menu>
      ))} */}
    </React.Fragment>
  );
}
