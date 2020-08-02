import React, { useState, useEffect } from "react";
import axios from "axios";
import RoundImage from "react-rounded-image";
export default function ProductItemList() {
  const [productSetDetail, setProductSetDetai] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [imageProduct, setImageProduct] = useState([]);
  useEffect(() => {
    const productLocalSetDetail = JSON.parse(
      localStorage.getItem("productSetDetail")
    );
    setProductSetDetai(productLocalSetDetail);
    console.log("local productset detail", productLocalSetDetail);
  }, []);
  useEffect(() => {
    const userLongLiveToken = localStorage.getItem("userLongLiveToken");

    setUserAccessToken(userLongLiveToken);
  }, []);
  useEffect(() => {
    if (productSetDetail.length && productSetDetail) {
      console.log("product set detail: ", productSetDetail);
      getProductItem();
    }
  }, [productSetDetail]);
  const getProductItem = () => {
    //   console.log("productset detal is",productSetDetail)
    for (var i = 0; i < productSetDetail.length; i++) {
      axios
        .get(
          `https://graph.facebook.com/v7.0/${productSetDetail[i].id}/products?fields=price,name,image_cdn_urls&access_token=${userAccessToken}`
        )
        .then((res) => {
          const result = res.data.data;
          const resultImageURL = result.map(
            (resultItem) => resultItem.image_cdn_urls
          );
          console.log("resultImageURL",resultImageURL);
          setProductDetail(result);
          //   for (var j = 0; j < result.length; j++) {
          //     const imgURL = result[j].image_cdn_urls;
              
          //     // console.log("image product", imgURL[0].value);
          //   }
          // console.log("image product 22222", imageProduct);
          // console.log("product Detail:", productDetail);
          const subResult = resultImageURL.map((item) => item);
        //   .map((itemURLarray)=> itemURLarray.value));
        //   const urlResult= subResult.map((itemURL)=>itemURL)
          console.log("subResult",subResult[1]);
          setImageProduct(subResult[1]);
        //   console.log("urlResult",urlResult);
        });
    }
  };

  return (
    <div key={productDetail.id}>
      {productDetail.map((productItem) => (
        <li key={productItem.id}>
          Product Name: {productItem.name}
          <br />
          <RoundImage
            image={imageProduct.map((item)=>item.value)}
            roundedColor="#321124"
            imageWidth="50"
            imageHeight="50"
            roundedSize="1"
          />
          Product price: {productItem.price}
          <br />
        </li>
      ))}
    </div>
  );
}
