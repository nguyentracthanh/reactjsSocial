import React, { useState, useEffect } from "react";

import Axios from "axios";

import ProductItemList from "./productItemList";
export default function Products() {
  const [catalogs, setCatalogs] = useState([]);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [pageID, setPageID] = useState(null);
  const [productSetDetail, setproductSetDetail] = useState([]);
  const [IDcatalog, setIDcatalog] = useState(null);
  const [nameProduct, setNameProduct] = useState([]);
  useEffect(() => {
    const pageID = localStorage.getItem("pageID");

    const userLongLiveToken = localStorage.getItem("userLongLiveToken");
    setUserAccessToken(userLongLiveToken);
    setPageID(pageID);
  }, []);

  useEffect(() => {
    const catalog = JSON.parse(localStorage.getItem("CatalogID"));
    setCatalogs(catalog);
    if (catalog.length != null){
    setIDcatalog(catalog[0].id);
    }
    console.log(catalog);
  }, []);


  const getCatalogID = () => {
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
    }
  };
  const removeButton = () => {
    document.getElementById("buttonProductlist").style.display = "none";
  };

  const Onclicked = () => {
    getCatalogID();
    getProduct();
    console.log("clicked");
  };

  const section = {
    height: "auto",
    paddingTop: 5,
    backgroundColor: "#fff",
    border: "1px solid #676E6D",
  };
  return (
    <React.Fragment>
      <button id="buttonProductlist" onClick={() => Onclicked()}>
        {" "}
        GET productset
      </button>
      {productSetDetail.map((productSetDetailItem) => (
        <ul style={section} key={productSetDetailItem.id}>
          {productSetDetailItem.name}
          <ProductItemList />
        </ul>
      ))}
    </React.Fragment>
  );
}
