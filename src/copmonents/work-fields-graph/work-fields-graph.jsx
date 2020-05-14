import React from "react";
import Graph from "react-graph-vis";

import data from "./data";

const WorkFieldsGraph = () => {
  const nodeConfig = {
    shape: "box",
    margin: 20,
    font: {
      size: 22,
      // color: "#455a64",
    },
    // color: {
    //   background: "#cfd8dc",
    //   border: "#455a64",
    // },
    widthConstraint: {
      maximum: 250,
    },
    chosen: false,
  };
  return (
    <div>
      <Graph
        graph={data}
        options={{
          nodes: nodeConfig,
          layout: {
            randomSeed: 6,
            improvedLayout: true,
          },
          physics: false,
          interaction: {
            // dragNodes: false,
            zoomView: false,
            dragView: false,
          },
        }}
        style={{ height: "50rem", width: "100%" }}
      />
    </div>
  );
};

export default WorkFieldsGraph;
