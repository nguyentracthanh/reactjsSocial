import React, { useState, useContext, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { UserContext } from "../../utils/userContext";
import axios from "axios";
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
  // const [pageAccessToken,setpageAccessToken]=useState(fbPageData.accessToken)
  // const [userAccesstoken,setUserAT]=useState(fbData.accessToken)
  // const [userID,setUserID]=useState(fbData.userID)

  // setUserID(userData.userID);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);
  }, []);

  useEffect(() => {
    if (userData) {
      setUserAT(userData.accessToken);
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
          console.log("pageInfo: ", res);
          // alert(userAccessToken)
          setPageInfor(result);
          console.log("pageInfoxxxx: ", pageInfor);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const renderPageInfo = (
    <div>
      
      {pageInfor.map((dataItem, index) => (
        <div key={dataItem.id}>
          <div>Name: {dataItem.name}</div>
          <div style={{ display: 'none' }}>Access Token: {dataItem.access_token}</div>
          <div>ID page: {dataItem.id}</div>
          <br/>
        </div>
      ))}
    </div>
  );
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <br />
      <button onClick={() => getPagedata()}>gEt</button>
      <br />
      {renderPageInfo}
    </React.Fragment>
  );
}
