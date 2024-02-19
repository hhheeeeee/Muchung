import { css } from "@emotion/react";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function MainGraph() {
  // return (
  // <LineChart
  //   data={[
  //     { x: 1, y: 10 },
  //     { x: 2, y: 15 },
  //     { x: 3, y: 20 },
  //     { x: 4, y: 25 },
  //     { x: 5, y: 30 },
  //     { x: 6, y: 35 },
  //     { x: 7, y: 40 },
  //   ]}
  //   axes={{
  //     x: { primary: true, type: "linear", position: "bottom" },
  //     y: { type: "linear", position: "left" },
  //   }}
  //   options={{
  //     xScale: { type: "linear" },
  //     yScale: { type: "linear" },
  //     colors: ["#000"],
  //   }}
  // />
  // <LineChart
  //   xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  //   series={[
  //     {
  //       data: [2, 5.5, 2, 8.5, 1.5, 5],
  //     },
  //   ]}
  //   width={250}
  //   height={150}
  // />
  // );
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          valueFormatter: (value) => (value == null ? "NaN" : value.toString()),
        },
        {
          data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
        },
        {
          data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
          valueFormatter: (value) => (value == null ? "?" : value.toString()),
        },
      ]}
      height={200}
      margin={{ top: 10, bottom: 20 }}
    />
  );
}
export default MainGraph;
