import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import Title from "./Title";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const [dataPageFanOnlDayBefore, setDataPageFanOnlDayBefore] = useState([]);
  const [dataPageFanOnlDayAfter, setDataPageFanOnlDayAfter] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [count, setCount] = useState(null);
  const [countCheck, setCountCheck] = useState(null);
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("data_page_fan_online"));

    setDataPageFanOnlDayBefore(result[0]);
    setDataPageFanOnlDayAfter(result[1]);
    console.log("result hjhj", result[0]);
  }, []);

  useEffect(() => {
    if (dataPageFanOnlDayBefore) {
      var data = dataPageFanOnlDayBefore.value;
      console.log("index", data);
      const check24 = dataPoints.length;
      console.log("check24", check24);
      setCountCheck(check24);
      setCount(24);
    }
  }, [dataPageFanOnlDayBefore]);
  console.log("dataPageFanOnlDayBefore", dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayAfter", dataPageFanOnlDayAfter);

  console.log("datatest after", count);

  const options = {
    animationEnabled: true,
    title: {
      text: "User Daily Reach",
    },
    axisX: {
      valueFormatString: "Hour",
    },
    axisY: {
      title: "Number of reach",
      prefix: "",
      includeZero: false,
    },
    data: [
      {
        yValueFormatString: "#,### users",
        xValueFormatString: "##:OO",
        type: "spline",
        dataPoints: dataPoints,
      },
    ],
  };

  const addData = () => {
    const check24 = dataPoints.length;
    console.log("check24", check24);
    setCountCheck(check24);
    var dataset = JSON.stringify(dataPageFanOnlDayBefore.value);
    var data = dataPageFanOnlDayBefore.value;
    if (check24 <= 24) {
      for (
        var i = 0;
        i < count;
        i++ // {
      ) 
      {
        dataPoints.push({
          x: i,
          y: data[i],
        });
      }
    }
    console.log("data estimate", dataPoints);
  };
  return (
    <React.Fragment>
      <Title>Today</Title>
      <button onClick={addData}>Show chart</button>
      <CanvasJSChart options={options} />
    </React.Fragment>
  );
}
