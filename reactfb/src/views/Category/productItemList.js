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
    const userLongLiveToken = localStorage.getItem("userLongLiveToken");

    for (var i = 0; i < productLocalSetDetail.length; i++) {
      axios
        .get(
          `https://graph.facebook.com/v7.0/${productLocalSetDetail[i].id}/products?fields=price,name,image_cdn_urls&access_token=${userLongLiveToken}`
        )
        .then((res) => {
          const result = res.data.data;
          console.log("result",result);
          // const resImg=res.data.data[i].image_cdn_urls[0].value;

          // console.log("resImg",resImg);
          setProductDetail(result);
         
          // console.log("subResult",subResult[1]);
          // setImageProduct(resImg);
        });
    }
  }, []);



  return (
    <div key={productDetail.id}>
      {productDetail.map((productItem) => (
        <li key={productItem.id}>
          Product Name: {productItem.name}
          <br />
          <RoundImage
            image={productItem.image_cdn_urls[1].value}
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
