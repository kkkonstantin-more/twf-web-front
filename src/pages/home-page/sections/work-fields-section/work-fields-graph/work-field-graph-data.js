const nodes = [
  { id: 1, x: -1100, y: -300 },
  { id: 2, x: -700, y: -500 },
  { id: 3, x: -700, y: -300 },
  { id: 4, x: -700, y: -100 },
  { id: 5, x: -300, y: -600 },
  { id: 6, x: -350, y: -400 },
  { id: 7, x: -350, y: -200 },
  { id: 8, x: -350, y: 2 },
  { id: 9, x: -50, y: -450 },
];
// this config is applied to all nodes
const nodesSharedConfig = {
  shape: "box",
  margin: 20,
  font: {
    size: 22,
  },
  widthConstraint: {
    maximum: 250,
  },
  chosen: false,
};

const edges = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 5, to: 9 },
  { from: 6, to: 9 },
  { from: 3, to: 6 },
  { from: 3, to: 6 },
  { from: 4, to: 8 },
  { from: 3, to: 7 },
  { from: 4, to: 7 },
  { from: 6, to: 5 },
];
// this config is applied to all edges
const edgesSharedConfig = {
  width: 5,
  color: "#607D8B",
  // dashes: true,
  arrows: {
    to: { enabled: false },
    // middle: { enabled: true },
  },
  shadow: true,
};
// adding colors to nodes
nodes.forEach((node, i) => {
  if (i % 2 === 0) {
    nodes[i] = {
      ...node,
      font: { color: "#cfd8dc" },
      color: {
        background: "#455a64",
        border: "#cfd8dc",
      },
    };
  } else {
    nodes[i] = {
      ...node,
      font: { color: "#455a64" },
      color: {
        background: "#cfd8dc",
        border: "#455a64",
      },
    };
  }
});

export { nodes, edges, edgesSharedConfig, nodesSharedConfig };
