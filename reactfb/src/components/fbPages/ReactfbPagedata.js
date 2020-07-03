import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";

export default function ReactfbPagedata() {
  const [fbData, setFbData] = useState([]);
  let dataItem;
  const getPagedata = () => {
    axios
      .get("https://graph.facebook.com/2556677127928535/accounts?access_token=EAAEPte3grfEBAMET9CUl8qdT4wBXt1SganspcEbVZBdVYFgkH7IkpbE7AWHsWEokzZCWU46WNEe6Ans1Tfj7nb6SgAtZBO9ItdkZASfMWfTGaFlelezKzgynnK2X0OLDCkNPmMW1LK2dqZBllYK39yJd0i9sALrpCTHwCxBO8PyBu8ZBd673KI"
      )
      .then(
        res => {
          const result = res.data;
          console.log(result);
          alert("Success!");
          setFbData(result.data);
        },
        error => {
          console.log(error);
        }
      );
  };

  const renderPageInfo = (
    <div>
      This is Page: {fbData.map(dataItem => <div>{dataItem.name}
      <br />
      access token : {dataItem.access_token}</div>)}
    </div>

  )

  return (
    <div>
      React Facebook Get page Data
      <br />
      <button onClick={() => getPagedata()}>gEt</button>
      <br />
      {renderPageInfo}


    </div>
  );
};

