import axios from "axios";

export interface FetchedLevel {
  name: string;
  code: string;
  gameName: string;
  difficulty: number;
  players: string[];
}

const fetchLevels = async (postData?: any): Promise<FetchedLevel[]> => {
  const { data } = await axios({
    method: "post",
    url: postData
      ? "https://mathhelper.space:8443/api/activity_log/find_win_log"
      : "https://mathhelper.space:8443/api/activity_log/win_log_all",
    data: postData,
  });
  const fetchedLevels: FetchedLevel[] = [];
  data.forEach((log: any) => {
    const levelIndex = fetchedLevels.findIndex(
      (level) => level.code === log.level_code
    );
    if (levelIndex === -1) {
      var curDifficulty = log.difficulty;
      if (curDifficulty == null){
        curDifficulty = 0
      }
      fetchedLevels.push({
        name: log.level_name,
        code: log.level_code,
        gameName: log.game_name,
        difficulty: curDifficulty,
        players: [log.user_code],
      });
    } else {
      const level = fetchedLevels[levelIndex];
      if (!level.players.find((player) => player === log.user_code)) {
        level.players.push(log.user_code);
      }
    }
  });
  return new Promise<FetchedLevel[]>((resolve) => resolve(fetchedLevels));
};

export default fetchLevels;
