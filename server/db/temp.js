let dummy = {
  user: {
    id: 1234,
    username: "Lenny Kim",
  },
  all: {
    ongoing: [{
      id: 4,
      title: "드로잉 1작품 그리기",
      description: "매일 드로잉 1작품 그리기",
      onDay: 4,
      doneToday: true,
    },{
      id: 6,
      title: "아이콘 만들기",
      description: "클래식 다이어리를 테마로 매일 아이콘 1개씩 그리기",
      onDay: 1,
      doneToday: false,
    },{
      id: 7,
      title: "스타트업 아이디어 생각하기",
      description: "매일 스타트업 아이디어 1개씩 생각하고 블로그로 공유하기",
      onDay: 2,
      doneToday: false,
    }],
    waiting: [{
      id: 8,
      title: "toy problem 풀기",
      description: "매일 toy problem 1문제씩 풀기",
    }],
    complete: [{
      id: 1,
      title: "아로마 종류별로 익히기",
      description: "매일 아로마 종류별로 시향하기",
    },{
      id: 3,
      title: "칭찬하기",
      description: "매일 주변 사람을 관찰하고 칭찬할 점 1가지 찾아서 말해주기",
    }],
  },
  recommended: [{
    id: 1,
    title: "드로잉 1작품 그리기",
    description: "매일 드로잉 1작품 그리기",
    wishCount: 1,
    doneWish: false,
    username: "Jone LLL",
    userPhoto: "http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png"
  },{
    id: 3,
    title: "칭찬하기",
    description: "매일 주변 사람을 관찰하고 칭찬할 점 1가지 찾아서 말해주기",
    wishCount: 5,
    doneWish: true,
    username: "Jane RRR",
    userPhoto: "http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg"
  }],
  wish: [{
    id: 1,
    title: "드로잉 1작품 그리기",
    description: "매일 드로잉 1작품 그리기",
    wishCount: 1,
    doneWish: true,
    username: "Jone LLL",
    userPhoto: "http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png"
  },{
    id: 3,
    title: "칭찬하기",
    description: "매일 주변 사람을 관찰하고 칭찬할 점 1가지 찾아서 말해주기",
    wishCount: 5,
    doneWish: true,
    username: "Jane RRR",
    userPhoto: "http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg"
  }],
  project: {
    username: "Sam",
    userPhoto: "http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg",
    id: 4,
    title: "드로잉 1작품 그리기",
    description: "매일 드로잉 1작품 그리기",
    wishCount: 4,
    doneWish: false,
    onDay: 2,
    doneToday: true,
    posts: [{
      username: "Kim",
      userPhoto: "http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg",
      id: 1,
      day: 1,
      likeCount: 4,
      doneLike: false,
      doneReport: true,
      text: "매일 지나가는 골목에 사는 고양이들. 아침마다 나란히 서서 배웅해 준다.",
      publicIds: ["http://www.gpension.co.kr/data/portal/terra/ext/1437028828_A3E2z9px_ECA3BCEAB2BD4.jpg", "http://www.koreatrails.or.kr/upload/photo/FILE_20130913012239760006.jpg"]
    },{
      username: "Cho",
      userPhoto: "http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg",
      id: 2,
      day: 2,
      likeCount: 4,
      doneLike: true,
      doneReport: false,
      text: "매일 지나가는 나란히 서서 배웅해 준다.2222",
      publicIds: ["http://www.gpension.co.kr/data/portal/terra/ext/1437028828_A3E2z9px_ECA3BCEAB2BD4.jpg", "http://www.koreatrails.or.kr/upload/photo/FILE_20130913012239760006.jpg"]
    }]
  }
};

export default dummy;
