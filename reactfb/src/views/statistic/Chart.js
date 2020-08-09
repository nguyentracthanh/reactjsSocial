import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

import Title from "./Title";
import CanvasJSReact from "../../assets/canvasjs.react";
import Skeleton from "react-loading-skeleton";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart() {
  const [dataPageFanOnlDayBefore, setDataPageFanOnlDayBefore] = useState([]);
  const [dataPageFanOnlDayAfter, setDataPageFanOnlDayAfter] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [count, setCount] = useState(null);
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("data_page_fan_online"));

    setDataPageFanOnlDayBefore(result[0]);
    setDataPageFanOnlDayAfter(result[1]);
    console.log("result hjhj", result[0]);
  }, []);

  useEffect(() => {
    if (dataPageFanOnlDayBefore) {
      setCount(24);
    }
  }, [dataPageFanOnlDayBefore]);
  console.log("dataPageFanOnlDayBefore", dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayAfter", dataPageFanOnlDayAfter);

  console.log("datatest after", count);

  const options = {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "User Daily Reach",
    },
    axisX: {
      valueFormatString: "",

      suffix: " hour",
    },
    axisY: {
      title: "Number of reach",
      suffix: " user(s)",
      includeZero: false,
    },
    data: [
      {
        yValueFormatString: "#,### users",
        xValueFormatString: "##:OO",
        type: "line",
        dataPoints: dataPoints,
      },
    ],
  };

  // const addData = () => {
  //   const check24 = dataPoints.length;
  //   const tmpData = []
  //   console.log("check24", check24);
  //   var data = dataPageFanOnlDayBefore.value;
  //   if (data) {
  //     if (check24 < 24) {
  //       for (
  //         var i = 0;
  //         i < 24;
  //         i++ // {
  //       ) {
  //         tmpData.push({
  //           x: i,
  //           y: data[i],
  //         });

  //       }
  //       console.log("ran");
  //     }
  //   };
  //   setDataPoints(tmpData)
  //   console.log("data estimate", tmpData);
  // };
  useEffect(() => {
    const check24 = dataPoints.length;
    const tmpData = [];
    console.log("check24", check24);
    var data = dataPageFanOnlDayBefore.value;
    if (data) {
      if (check24 < 24) {
        for (
          var i = 0;
          i < 24;
          i++ // {
        ) {
          tmpData.push({
            x: i,
            y: data[i],
          });
        }
      }
    }
    setDataPoints(tmpData);
    console.log("data estimate", tmpData);
  }, [dataPageFanOnlDayBefore]);
  return (
    <React.Fragment>
      <Title>Today</Title>
      {/* <button onClick={addData}>Get</button> */}
      <CanvasJSChart options={options} />
    </React.Fragment>
  );
}
