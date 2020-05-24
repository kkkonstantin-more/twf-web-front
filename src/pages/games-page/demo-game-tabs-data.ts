import { AppTabProps } from "../../copmonents/app-tab/app-tab";

const translationPrefix: string = "gameTab.";

const demoGameTabsData: AppTabProps[] = [
  {
    link: {
      value: "name",
    },
    name: {
      value: "Game 1",
    },
    playersCount: {
      value: "",
      prefixTranslationId: "playersCount",
    },
    levelsCount: {
      value: "",
      prefixTranslationId: "levelsCount",
    },
  },
];

// const demoGameTabsData: AppTabProps[] = [
//   {
//     link: "",
//     items: [
//       {
//         text: "Game 3",
//       },
//       {
//         text: "3",
//         prefixTranslationId: "gameCode",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "playersCount",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "levelsCount",
//       },
//     ],
//   },
//   {
//     link: "",
//     items: [
//       {
//         text: "Game 1",
//       },
//       {
//         text: "1",
//         prefixTranslationId: "gameCode",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "playersCount",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "levelsCount",
//       },
//     ],
//   },
//   {
//     link: "",
//     items: [
//       {
//         text: "Game 2",
//       },
//       {
//         text: "2",
//         prefixTranslationId: "gameCode",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "playersCount",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "levelsCount",
//       },
//     ],
//   },
//   {
//     link: "",
//     items: [
//       {
//         text: "Game 4",
//       },
//       {
//         text: "4",
//         prefixTranslationId: "gameCode",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "playersCount",
//       },
//       {
//         text: 0,
//         prefixTranslationId: "levelsCount",
//       },
//     ],
//   },
// ];
//
// demoGameTabsData.forEach((tab) => {
//   tab.link = "/game-info/" + tab.items[0].text;
//   tab.items.forEach((item) => {
//     if (item.prefixTranslationId === "playersCount") {
//       item.text = Math.floor(Math.random() * 1000);
//     }
//     if (item.prefixTranslationId === "levelsCount") {
//       item.text = Math.floor(Math.random() * 15) + 1;
//     }
//     if (item.prefixTranslationId) {
//       item.prefixTranslationId = translationPrefix + item.prefixTranslationId;
//     }
//   });
// });

export default demoGameTabsData;

// import { GameTabProps } from "./components/game-tab/game-tab";
//
// const demoGameTabsData: GameTabProps[] = [
//   {
//     name: "Game 3",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
//   {
//     name: "Game 4",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
//   {
//     name: "Game 1",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
//   {
//     name: "Game 5",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
//   {
//     name: "Game 2",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
//   {
//     name: "Game 6",
//     code: "1234",
//     levelsCount: 5,
//     playersCount: 5,
//   },
// ];
//
// demoGameTabsData.forEach((tab) => {
//   tab.playersCount = Math.floor(Math.random() * 1000) + 1;
//   tab.levelsCount = Math.floor(Math.random() * 15) + 1;
// });
//
// export default demoGameTabsData;
