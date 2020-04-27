interface UserData {
    name: string,
    avatarUrl: string,
    points: number,
    place: number
}

const demoRatingsTop5Users: Array<UserData> = [
    {
        name: "Виктор Кацман",
        avatarUrl: "https://randomuser.me/api/portraits/lego/5.jpg",
        points: 999,
        place: 1
    },
    {
        name: "Виктор Цой",
        avatarUrl: "https://randomuser.me/api/portraits/men/26.jpg",
        points: 500,
        place: 2
    },
    {
        name: "Евпатий Коловрат",
        avatarUrl: "https://randomuser.me/api/portraits/men/80.jpg",
        points: 432,
        place: 3
    },
    {
        name: "Джонни Вертухай",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        points: 350,
        place: 4
    },
    {
        name: "Анна Каренина",
        avatarUrl: "https://randomuser.me/api/portraits/women/67.jpg",
        points: 297,
        place: 5
    }

];

const demoUserRating: UserData = {
    name: "Константин Морозов",
    avatarUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
    points: 15,
    place: 227
};

export {demoRatingsTop5Users, demoUserRating}