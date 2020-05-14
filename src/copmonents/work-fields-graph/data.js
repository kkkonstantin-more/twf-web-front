const data = {
  nodes: [
    {
      id: 1,
      label: "Действия с преобразованиями символьных выражений",
      x: -1100,
      y: -300,
    },
    {
      id: 2,
      label: "Последовательности применений правил преобразований",
      x: -700,
      y: -500,
    },
    { id: 3, label: "Автопроверки цепочек преобразований", x: -700, y: -300 },
    { id: 4, label: "Язык для записи преобразований", x: -700, y: -100 },
    { id: 5, label: "Игрофикация учебного процесса", x: -300, y: -600 },
    { id: 6, label: "Автопроверки решений", x: -350, y: -400 },
    { id: 7, label: "Автопроверки фрагментов научных работ", x: -350, y: -200 },
    {
      id: 8,
      label: "Компиляция выкладок в статьи и исполняемых код",
      x: -350,
      y: 2,
    },
    { id: 9, label: "Облегчение работы преподавателей", x: -50, y: -450 },
  ],
  edges: [
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
  ],
};

data.nodes.forEach((node, i) => {
  if (i % 2 === 0) {
    data.nodes[i] = {
      ...node,
      font: { color: "#cfd8dc" },
      color: {
        background: "#455a64",
        border: "#cfd8dc",
      },
    };
  } else {
    data.nodes[i] = {
      ...node,
      font: { color: "#455a64" },
      color: {
        background: "#cfd8dc",
        border: "#455a64",
      },
    };
  }
});

export default data;
