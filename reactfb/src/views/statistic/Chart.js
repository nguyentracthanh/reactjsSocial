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
  // const [dataPoints, setDataPoint] = useState([]);
  const [count, setCount] = useState(null);
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("data_page_fan_online"));
    setDataPageFanOnlDayBefore(result[0].value);
    setDataPageFanOnlDayAfter(result[1].value);
    console.log("result hjhj", result.value);
  }, []);

  useEffect(() => {
    if (dataPageFanOnlDayBefore) {
      const index = Object.keys(dataPageFanOnlDayBefore).length;
      setCount(Object.keys(index).length);
    }
  }, [dataPageFanOnlDayBefore]);
  // const datatest=createData(dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayBefore", dataPageFanOnlDayBefore);
  console.log("dataPageFanOnlDayAfter", dataPageFanOnlDayAfter);
  console.log("datatest", dataPageFanOnlDayBefore.length);

  console.log("datatest after", count);
  var dataPoints=[];
  const options = {
    animationEnabled: true,
    title: {
      text: "Daily",
    },
    axisX: {
      valueFormatString: "HH",
    },
    axisY: {
      title: "Number of reach",
      prefix: "",
      includeZero: false,
    },
    data: [
      {
        yValueFormatString: "#,### users",
        xValueFormatString: "YYYY-MM-DDTHH:MM:SSZ",
        type: "spline",
        dataPoints: dataPoints,
      },
    ],
  };
  const addData = () => {
    var dataset = dataPageFanOnlDayBefore;
    for (var i = 0; i < count; i++) // {
    //   setDataPoint(dataPoints => [...dataPoints,({
    //     x: new Date(i),
    //     y: dataPageFanOnlDayBefore[i]
    //   })]);
    //   console.log("data estimate", dataPoints);
    // };
    {
      dataPoints.push({
        x: new Date(i),
        y: Object.dataPageFanOnlDayBefore[i],
      });
    };
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
