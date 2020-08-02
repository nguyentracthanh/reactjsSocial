import React, { useState,  useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";
import RoundImage from "react-rounded-image";


export default function Deposits() {
  const [pageInfor, setPageInfor] = useState([]);
  const [userAccessToken, setUserAT] = useState("");
  const [userData, setUserData] = useState(null);
  const [pageID, setPageID] = useState([]);
  const [productPageID, setProductPageID] = useState(null);
  const [productCatalogID, setProductCatalogID] = useState([]);
 
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (check == false) {
      localStorage.setItem("clicked", check);
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
          console.log("pageID:", pageID);
          setPageID(pageID);

          // const result = res.data.data[0]; // collect data in array[0]
          console.log("pageInfo: ", res);
          // alert(userAccessToken)
          setPageInfor(result);
          console.log("pageInfoxxxx: ", result);
        
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
  function getProductCatalog() {
    axios
      .get(
        `https://graph.facebook.com/v7.0/${productPageID}/product_catalogs?access_token=${userAccessToken}`
        //
      )
      .then((res) => {
        const productCata = res.data.data;
        console.log("product catalog:", productCata);
        setProductCatalogID(productCata);
        localStorage.setItem("CatalogID", JSON.stringify(productCata));

      });
  }
  useEffect(() => {
    if (productPageID) {
      showButton();

      localStorage.setItem("pageID", productPageID);
    }
  }, [productPageID]);
  const renderPageInfo = (
    <div>
      {pageInfor.map((dataItem, index) => (
        <div>
          <button
            style={{
              background: "#FFFFFF",
              border: "0px ",
            }}
            key={index}
            onClick={() => setProductPageID(dataItem.id)}
          >

            <RoundImage
              image={`https://graph.facebook.com/v7.0/${dataItem.id}/picture`}
              roundedColor="#321124"
              imageWidth="50"
              imageHeight="50"
              roundedSize="1"
            />

            <Typography>{dataItem.name}</Typography>

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
    getProductCatalog();
    localStorage.setItem("clicked", true);
  }
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
        Show the product
      </button>
      <br />
      {/* {getPageAvatar} */}
      {renderPageInfo}
    </React.Fragment>
  );
}
