import { LevelTabProps } from "../../copmonents/level-tab/level-tab";

const demoGameLevels: LevelTabProps[] = [
  {
    name: "Level 5",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
  {
    name: "Level 3",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
  {
    name: "Level 4",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
  {
    name: "Level 1",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
  {
    name: "Level 2",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
  {
    name: "Level 6",
    code: "12345",
    difficulty: 0,
    completesAmount: 0,
  },
];

demoGameLevels.forEach((level) => {
  level.difficulty = Math.floor(Math.random() * 10) + 1;
  level.completesAmount = Math.floor(Math.random() * 100);
});

export default demoGameLevels;
