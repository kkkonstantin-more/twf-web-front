import { PlayedGameUserTabProps } from "../played-game-user-tab/played-game-user-tab";
import { shuffleArray } from "../../../../utils";

let demoNames: string[] = [
  "Orson Ahmad",
  "Zoltan Rickie",
  "Jimmy Tariq",
  "Landen Carter",
  "Khalil Reuben",
  "Nikolas Graham",
  "Matt Arjun",
  "Baylor Uriah",
  "Maison Hunter",
  "Devyn Brooks",
  "Cressida Ingrid",
  "Annabella Tabatha",
  "Daria Ashton",
  "Tracey Becca",
  "Penny Louella",
  "Electra Lala",
  "Lilly Marcie",
  "Kristie Kelis",
  "Anika Maude",
  "Trista Arabella",
];

let demoPlayedGameUsersData: PlayedGameUserTabProps[] = [];

shuffleArray(demoNames).forEach((name: string) => {
  demoPlayedGameUsersData.push({
    fullName: name,
    levelsCompleted: Math.floor(Math.random() * Math.floor(9)) + 1,
  });
});

export { demoPlayedGameUsersData };
