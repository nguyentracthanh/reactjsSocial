import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";

export default function ReactfbPagedata() {
  const [fbData, setFbData] = useState([]);
  let dataItem;
  const getPagedata = () => {
    axios
      .get("https://graph.facebook.com/2556677127928535/accounts?",{
        access_token:window.accessToken
      })
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
  const getPagePostData = () => {
    axios
      .get("395716977428401/feed?fields=is_eligible_for_promotion,promotable_id,message,created_time,shares,reactions&access_token=EAAEPte3grfEBAEg4QPqTJs1UL2NNfEUuB5PrNoRB8ZBOBHwCMEbNZAIXdA5mQxeSB4ZCewt6oSApK7fRiNIYIwcwV4TYdEr2LxNlouTq5SNSRMs0UA8eZB5MmLvv1KyZAVtO5vv2J0Audm6iRqQ5Yid7n4Vm6DAzQIeZB9vnVnHtWiKufMA9LIKEAZCN9ZBX3gel3Dugt26lJGiM7O9GpasH"
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
      Time create: {fbData.map(dataItem => <div>{dataItem.created_time}
      <br />
      ID post: {dataItem.id}
      <br />
      Share count: {dataItem.shares.count}
      <br />
      Message: {dataItem.message}</div>)}
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

