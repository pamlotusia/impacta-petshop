<<<<<<< HEAD
import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UilTimes } from "@iconscout/react-unicons";
import Chart from 'react-apexcharts'; // Importação correta do Chart

const CardGraphic = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup>
      {expanded ? <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> : <CompactCard param={props} setExpanded={() => setExpanded(true)} />}
    </LayoutGroup>
  );
};

// CompactCard
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
=======
import React, { useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UilTimes } from "@iconscout/react-unicons";
import ApexCharts from 'apexcharts'

const CardGraphic = props => {
  const [expanded, setExpanded] = useState(false)

  return (
    <LayoutGroup>
      {expanded ? <ExpandedCard param={props} setExpanded={()=>setExpanded(false)}/> : <CompactCard  param = {props} setExpanded={()=>setExpanded(true)}/>}
    </LayoutGroup>
  )
}

// CompactCard
function CompactCard({param, setExpanded}){
  const Png = param.png
>>>>>>> origin/main
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}
<<<<<<< HEAD

// ExpandedCard
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ['#fff'],
        type: "gradient",
      },
      dataLabels: {
=======
// ExpandedCard
function ExpandedCard({param, setExpanded}){
  const data = {
    options: {
      chart:{
        type: "area",
        height: "auto"
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        bluer: 3,
        color:"#000",
        opacity: 0.35,
      },
      fill:{
        colors: ['#fff'],
        type: "gradient",
      },
      detaLabels: {
>>>>>>> origin/main
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
<<<<<<< HEAD
          "2024-01-19T00:00:00.000Z",
          "2024-01-19T01:30:00.000Z",
          "2024-01-19T02:30:00.000Z",
          "2024-01-19T03:30:00.000Z",
          "2024-01-19T04:30:00.000Z",
          "2024-01-19T05:30:00.000Z",
          "2024-01-19T06:30:00.000Z",
        ],
      },
    },
    series: param.series,
  };

=======
          "2024-01-19T00:00.00.000Z",
          "2024-01-19T01:30.00.000Z",
          "2024-01-19T02:30.00.000Z",
          "2024-01-19T03:30.00.000Z",
          "2024-01-19T04:30.00.000Z",
          "2024-01-19T05:30.00.000Z",
          "2024-01-19T06:30.00.000Z",
        ],
      },
      
    }
  }
>>>>>>> origin/main
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
<<<<<<< HEAD
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type="area" />
=======
        <span>{param.title}</span>
      <div className="chartContainer">
        <ApexCharts options={data.options} series={param.series} type="area" />
>>>>>>> origin/main
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}
<<<<<<< HEAD

export default CardGraphic;
=======
export default CardGraphic
>>>>>>> origin/main
