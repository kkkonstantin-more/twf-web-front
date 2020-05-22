import { GameTabProps } from "./components/game-tab/game-tab";

const demoGameTabsData: GameTabProps[] = [
  {
    name: "Game 3",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
  {
    name: "Game 4",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
  {
    name: "Game 1",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
  {
    name: "Game 5",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
  {
    name: "Game 2",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
  {
    name: "Game 6",
    code: "1234",
    levelsCount: 5,
    playersCount: 5,
  },
];

demoGameTabsData.forEach((tab) => {
  tab.playersCount = Math.floor(Math.random() * 1000) + 1;
  tab.levelsCount = Math.floor(Math.random() * 15) + 1;
});

export default demoGameTabsData;
