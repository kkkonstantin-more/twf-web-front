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

const WorkFieldsGraph: React.FC<{ intl: any }> = ({ intl }) => {
  // this reactive variable changes when language switches
  const { locale } = useIntl();

  const translateNodes = (nodes: Array<any>) => {
    const translationPrefix: string = "graph";
    nodes.forEach((node, i) => {
      nodes[i] = {
        ...node,
        // @ts-ignore (adding not existing before property)
        label: intl.formatMessage({
          id: translationPrefix + "." + node.id,
        }),
      };
    });
    return nodes;
  };

  const [reactiveNodes, setReactiveNodes] = useState(translateNodes(nodes));

  useEffect(() => {
    // rerender graph when language switches
    const nodesCopy = nodes.slice();
    setReactiveNodes(translateNodes(nodesCopy));
  }, [locale]);

  return (
    <>
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
        style={{ height: "50rem", width: "100%" }}
      />
    </>
  );
};

export default injectIntl(WorkFieldsGraph);
