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
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
// const data = [];
// const data = localStorage.getItem("data_page_fan_online");

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
    // localStorage.setItem("DataPageFanOnlDayBefore",JSON.stringify(result[0].value));
    setDataPageFanOnlDayAfter(result[1]);
    console.log("result hjhj", result[0]);
  }, []);

  useEffect(() => {
    if (dataPageFanOnlDayBefore) {
      var data = dataPageFanOnlDayBefore.value;
      // const index = Object.keys(data).length;
      console.log("index", data);
      const check24 = dataPoints.length;
      console.log("check24", check24);
      setCountCheck(check24);
      setCount(24);
    }
  }, [dataPageFanOnlDayBefore]);
  // const datatest=createData(dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayBefore", dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayAfter", dataPageFanOnlDayAfter);
  // console.log("datatest", dataPageFanOnlDayBefore.length);

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
  // useEffect(()=>{
  //   if(count==24){
  //     addData();
  //   }
  // },[count]);
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
      ) //   setDataPoint(dataPoints => [...dataPoints,({
      //     x: new Date(i),
      //     y: dataPageFanOnlDayBefore[i]
      //   })]);
      //   console.log("data estimate", dataPoints);
      // };
      {
        dataPoints.push({
          x: i,
          y: data[i],
        });
        // console.log("data dataset", );
      }
    }
    console.log("data estimate", dataPoints);
  };
  return (
    <React.Fragment>
      <Title>Today</Title>
      {/* <ResponsiveContainer>
        <LineChart
          data={datatest}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Number of reach
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer> */}
      <button onClick={addData}>Show chart</button>
      <CanvasJSChart options={options} />
    </React.Fragment>
  );
}
