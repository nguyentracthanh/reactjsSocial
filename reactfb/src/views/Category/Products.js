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
import ProductItemList from "./productItemList";
// Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

export default function Products() {
  const [catalogs, setCatalogs] = useState([]);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [pageID, setPageID] = useState(null);
  const [productSetDetail, setproductSetDetail] = useState([]);
  const [IDcatalog, setIDcatalog] = useState(null);
  const [nameProduct, setNameProduct] = useState([]);
  const [checker, setchecker] = useState(false);
  useEffect(() => {
    const pageID = localStorage.getItem("pageID");

    const userLongLiveToken = localStorage.getItem("userLongLiveToken");
    setUserAccessToken(userLongLiveToken);
    setPageID(pageID);
    // alert("user access token:",userAccessToken);
  }, []);

  useEffect(() => {
    const catalog = JSON.parse(localStorage.getItem("CatalogID"));
    setCatalogs(catalog);
    console.log(catalog);
  }, []);
  // useEffect(()=>{
  //   if (catalogs){
  //     setchecker(true);
  //   }
  // },[catalogs]);
  useEffect(() => {
    if (catalogs.length != 0) {
      setIDcatalog(catalogs[0].id);
    }
  }, [catalogs]);
  const getCatalogID = () => {
    // if (catalogs && catalogs.length) {
    // let catalogID = catalogs.map((catalog, index, catalogs) => {

    //   return catalog.id[0];

    // });
    // const catalogItem=catalogs[0];
    // for(var i=0;i<catalogs.length;i++){

    // }

    // console.log(catalogs[0].id);
    Axios.get(
      `https://graph.facebook.com/v7.0/${IDcatalog}/product_sets?access_token=${userAccessToken}`
    ).then((res) => {
      const productSet = res.data.data;
      setproductSetDetail(productSet);
      console.log("productset Id:", productSet);
      localStorage.setItem("productSetDetail", JSON.stringify(productSet));
    });
    // }
  };
  const getProduct = () => {
    for (var i = 0; productSetDetail.length; i++) {
      Axios.get(
        `https://graph.facebook.com/v7.0/${productSetDetail[i]}/products?access_token=${userAccessToken}`
      ).then((res) => {
        const result = res.data;
        console.log("product follow set:", res);
        setNameProduct(result);
        console.log("productset Id:", result);
      });
      // return (
      //   <div>

      //   </div>
      // );
    }
  };
  function removeButton() {
    document.getElementById("buttonProductlist").style.display = "none";
  }

  function Onclicked() {
    getCatalogID();
    getProduct();
    removeButton();
    console.log("clicked");
  }

  return (
    <React.Fragment>
      <button id="buttonProductlist" onClick={() => Onclicked()}>
        {" "}
        GET productset
      </button>
      {productSetDetail.map((productSetDetailItem) => (
        <ul key={productSetDetailItem.id}>
          {productSetDetailItem.name}
          <ProductItemList />
          
        </ul>
      ))}
    </React.Fragment>
  );
}
