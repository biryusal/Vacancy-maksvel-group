import React from 'react';
import ReactDOM from 'react-dom';
import * as Recharts from "recharts";

const {LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend} = Recharts;
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const colorBreakPoint = 2100;
const TinyLineChart = function() {
  
  let UVs = [],
    PVs = [];

  for (let key of data) {
    UVs.push(key["uv"]);
    PVs.push(key["pv"]);
  }

  let avgUV = calculateAvg(UVs);
  let avgPV = calculateAvg(PVs);

  let maxUV = calculateMax(UVs);
  let maxPV = calculateMax(PVs);

  let minUV = calculateMin(UVs);
  let minPV = calculateMin(PVs);

  let stddevUV = calculateStddev(UVs, avgUV);
  let stddevPV = calculateStddev(PVs, avgPV);

  const lowerBreakpointPV = (((avgPV - stddevPV) - minPV) / (maxPV - minPV)) * 100 + "%";
  const upperBreakpointPV = (((avgPV + stddevPV) - minPV) / (maxPV - minPV)) * 100 + "%";

  const lowerBreakpointUV = (((avgUV - stddevUV) - minUV) / (maxUV - minUV)) * 100 + "%";
  const upperBreakpointUV = (((avgUV + stddevUV) - minUV) / (maxUV - minUV)) * 100 + "%";

  function calculateAvg(mass) {
    let result = 0;

    for (let key of mass) {
      result += key;
    }

    return result / mass.length;
  }

  function calculateMin(mass) {
    let result = 0;

    for (let key of mass) {
      result = result < key ? result : key;
    }

    return result;
  }

  function calculateMax(mass) {
    let result = 0;

    for (let key of mass) {
      result = result > key ? result : key;
    }

    return result;
  }

  function calculateStddev(mass, avg) {
    let result = 0;

    for (let key of mass) {
      result += (key - avg) ** 2;
    }

    return Math.sqrt(result / mass.length);
  }

  return (
  	<LineChart
    width={1000}
    height={600}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    	<defs>
        <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop offset={lowerBreakpointUV} stopColor="red" />
          <stop offset={lowerBreakpointUV} stopColor="#82ca9d" />
          <stop offset={upperBreakpointUV} stopColor="#82ca9d" />
          <stop offset={upperBreakpointUV} stopColor="red" />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
        <linearGradient id="colorPv" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop offset={lowerBreakpointPV} stopColor="red" />
          <stop offset={lowerBreakpointPV} stopColor="#8884d8" />
          <stop offset={upperBreakpointPV} stopColor="#8884d8" />
          <stop offset={upperBreakpointPV} stopColor="red" />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" strokeWidth={2}  stroke="url(#colorPv)" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" strokeWidth={2}  stroke="url(#colorUv)" />
      <Tooltip /> 
    </LineChart>
  );
}

ReactDOM.render(
  <TinyLineChart />,
  document.getElementById('container')
);
