import React, { useEffect, useState } from "react";
// @ts-ignore (react-graph-vis has no types)
import Graph from "react-graph-vis";
import { injectIntl, useIntl } from "react-intl";

import {
  nodes,
  edges,
  nodesSharedConfig,
  edgesSharedConfig,
} from "./work-field-graph-data";

import "./work-fields-graph.scss";

const WorkFieldsGraph: React.FC<{ intl: any }> = ({ intl }) => {
  // this reactive variable changes when language switches
  const { locale } = useIntl();

  const [reactiveNodes, setReactiveNodes] = useState(nodes);

  useEffect(() => {
    const translateNodes = (nodes: Array<any>) => {
      const translationPrefix: string = "graph";
      nodes.forEach((node, i) => {
        nodes[i] = {
          ...node,
          label: intl.formatMessage({
            id: translationPrefix + "." + node.id,
          }),
        };
      });
      return nodes;
    };
    // rerender graph when language switches
    const nodesCopy = nodes.slice();
    setReactiveNodes(translateNodes(nodesCopy));
  }, [locale, intl]);

  return (
    <div className="work-fields-graph">
      <Graph
        graph={{ nodes: reactiveNodes, edges }}
        options={{
          nodes: nodesSharedConfig,
          edges: edgesSharedConfig,
          physics: false,
          interaction: {
            dragNodes: false,
            zoomView: false,
            dragView: false,
          },
        }}
        className="work-fields-graph__canvas"
        style={{ height: "50rem", width: "100%" }}
      />
      {/*making div that overlay the canvas and making able to scroll the page on mobile devices*/}
      <div
        className="work-fields-graph__scroll-fix"
        style={{ height: "50rem", width: "100%" }}
      />
    </div>
  );
};

export default injectIntl(WorkFieldsGraph);
