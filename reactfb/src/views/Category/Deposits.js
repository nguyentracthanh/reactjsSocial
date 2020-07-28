import React, { useState, useContext, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { UserContext } from "../../utils/userContext";
import axios from "axios";
import RoundImage from "react-rounded-image";
// function preventDefault(event) {
//   event.preventDefault();
// }
const df = null;
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const [pageInfor, setPageInfor] = useState([]);
  const [userAccessToken, setUserAT] = useState("");
  const [userID, setUserID] = useState(null);
  // const { userData } = useContext(UserContext)
  const [userData, setUserData] = useState(null);
  const [pageID, setPageID] = useState([]);
  const [pageAvtURL, setPageAvtURL] = useState([]);
  const [productPageID, setProductPageID] = useState(null);
  const [productCatalogID, setProductCatalogID] = useState([]);
  // const [pageAccessToken,setpageAccessToken]=useState(fbPageData.accessToken)
  // const [userAccesstoken,setUserAT]=useState(fbData.accessToken)
  // const [userID,setUserID]=useState(fbData.userID)
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (check == false) {
      localStorage.setItem("clicked", check);
    }
  }, [check]);

  // setUserID(userData.userID);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    setUserData(user);
  }, []);

  useEffect(() => {
    if (userData) {
      const userLongLiveToken = localStorage.getItem("userLongLiveToken");
      setUserAT(userLongLiveToken);
      // alert("user access token:",userAccessToken);
    }
  }, [userData]);

  // const getPageAvatar = () => {

  //   // console.log("idpage:",idPage2)
  //   var pageAvtURL=[];
  //   for (var i = 0; i < pageID.length; i++) {
  //     axios
  //       .get(
  //         `https://graph.facebook.com/v7.0/${pageID[i]}/accounts?access_token=${userAccessToken}`
  //       )
  //       .then(
  //         (res) =>{
  //           const avtURL=res;
  //           console.log("img:",res);
  //           pageAvtURL[i]=avtURL;
  //         }
  //       )
  //   }
  // }
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
          var pageAvtURL = [];
          for (var i = 0; i < pageID.length; i++) {
            axios
              .get(
                `https://graph.facebook.com/v7.0/${pageID[i]}/picture`
                // ?access_token=${userAccessToken}
              )
              .then((res) => {
                const avtURL = res;
                console.log("img:", res);

                pageAvtURL[i] = avtURL;
                setPageAvtURL(pageAvtURL);
              });
          }
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
        // pageAvtURL[i] = avtURL;
        // setPageAvtURL(pageAvtURL);
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
        // <div key={dataItem.id}>
        <div>
          <button
            style={{
              background: "#FFFFFF",
              border: "0px ",
            }}
            key={index}
            onClick={() => setProductPageID(dataItem.id)}
          >
            {/* <div>Name: {dataItem.name}</div> */}

            <RoundImage
              image={`https://graph.facebook.com/v7.0/${dataItem.id}/picture`}
              roundedColor="#321124"
              imageWidth="50"
              imageHeight="50"
              roundedSize="1"
            />

            <Typography>{dataItem.name}</Typography>

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
