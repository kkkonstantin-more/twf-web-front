import { PlayerTabProps } from "../player-tab/player-tab";

const demoPlayerTabsData: PlayerTabProps[] = [
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-1.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Александр Павлов",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-2.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-3.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-4.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-5.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-6.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
  {
    name: "Иван Петров",
    avatarUrl: require("../../../../assets/home-page-about-us-section/photo-grid/standard-photos/standard-7.jpg"),
    levelsCompleted: 0,
    additionalInfo:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias blanditiis consectetur" +
      " consequatur, cum debitis eius fugit id ipsa, laboriosam maiores maxime neque nihil non, nostrum quia" +
      " repudiandae tenetur voluptas",
  },
];

demoPlayerTabsData.forEach((tab: PlayerTabProps) => {
  tab.levelsCompleted = Math.floor(Math.random() * 1000);
});

export default demoPlayerTabsData;
