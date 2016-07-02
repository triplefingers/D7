const ProjectData = [{
    userId: 1,
    title: "드로잉 1작품 그리기",
    description: "매일 드로잉 1작품 그리기",
    wishCount: 4
  },{
    userId: 1,
    title: "아이콘 만들기",
    description: "클래식 다이어리를 테마로 매일 아이콘 1개씩 그리기",
    wishCount: 0
  },{
    userId: 1,
    title: "스타트업 아이디어 생각하기",
    description: "매일 스타트업 아이디어 1개씩 생각하고 블로그로 공유하기",
    wishCount: 1
  },{
    userId: 1,
    title: "toy problem 풀기",
    description: "매일 toy problem 1문제씩 풀기",
    wishCount: 5
  },{
    userId: 1,
    title: "아로마 종류별로 익히기",
    description: "매일 아로마 종류별로 시향하기",
    wishCount: 0
  },{
    userId: 1,
    title: "칭찬하기",
    description: "매일 주변 사람을 관찰하고 칭찬할 점 1가지 찾아서 말해주기",
    wishCount: 0
  }];

const WishData = [{
    userId: 1,
    projectId: 1
  },{
    userId: 2,
    projectId: 1
  },{
    userId: 3,
    projectId: 1
  },{
    userId: 4,
    projectId: 1
  },{
    userId: 1,
    projectId: 3
  },{
    userId: 1,
    projectId: 4
  },{
    userId: 2,
    projectId: 4
  },{
    userId: 3,
    projectId: 4
  },{
    userId: 4,
    projectId: 4
  },{
    userId: 5,
    projectId: 4
  }
];
const UserProjectData = [{
    userId: 1,
    projectId: 1,
    startAt: "2016-06-06",
    endAt: "2016-06-12",
    success: true,
  },{
    userId: 1,
    projectId: 3,
    startAt: "2016-06-14",
    endAt: "2016-06-20",
    success: false,
  // },{
  //   userId: 1,
  //   projectId: 2,
  //   startAt: "2016-06-27",
  //   endAt: "2016-07-03",
  // },{
  },{
    userId: 1,
    projectId: 2,
    startAt: "2016-06-27",
    endAt: "2016-07-03",
    success: false,
  },{
    userId: 1,
    projectId: 4,
    startAt: "2016-07-07",
    endAt: "2016-07-13",
    success: false,
  }];

const TransactionData = [{
    userId: 1,
    userProjectId: 1,
    customer_uid: "idforcoding@gmail.com",
    merchant_uid: "Transaction1",
    paymentDue: "2016-06-12",
    amount: 14000
  },{
    userId: 1,
    userProjectId: 2,
    customer_uid: "idforcoding@gmail.com",
    merchant_uid: "Transaction2",
    paymentDue: "2016-06-20",
    amount: 7000
  },{
    userId: 1,
    userProjectId: 3,
    customer_uid: "idforcoding@gmail.com",
    merchant_uid: "Transaction3",
    paymentDue: "2016-06-30",
    amount: 7000
  },{
    userId: 1,
    userProjectId: 4,
    customer_uid: "idforcoding@gmail.com",
    merchant_uid: "Transaction4",
    paymentDue: "2016-07-14",
    amount: 7000
  }
];

const PostData = [{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 1,
    text: "냉소도 지겹고 본인과 타인의 결점만 찾아내는 것도 지겨워진 앨리스는..",
    likeCount: 4
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 2,
    text: "선택의 여지 따위가 없는, 한숨 지으며 “하지만 정말..?”하고 물을 새도 없는 상황에 맞닥뜨리기를 바랐다.",
    likeCount: 2
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 3,
    text: "분석이나 해석 따위가 불필요하고, 물을 필요도 없이, 자연스레 존재하는 상황을.",
    likeCount: 1
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 4,
    text: "그는 삶을 기능적으로 생각했기 때문에, 인생도 아파트처럼 잘 배열되기를 바랐다 – 사교 생활, 재정 문제, 연애가 모두 조화롭고 합리적이기를 원했다."
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 5,
    text: "그는 겉으로 보기에는 잘 정돈된 상태인 것 같지만, 사실 남보다 더 무질서를 두려워하고 의식한다고 볼 수 있었다.",
    likeCount: 1
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 6,
    text: "에릭은 감정의 벌거숭이가 되는 상황에서는 매우 다급하게 상징적인 ‘가운’을 찾아 헤맸다.",
    likeCount: 55
  },{
    userId: 1,
    userProjectId: 1,
    projectId: 1,
    day: 7,
    text: "그는 멀리서는 잘 보이지만, 가까이 들여다보면 백만 개나 되는 파편으로 나뉘어 있었다. 앨리스는 이토록 서로 화해할 수 없는 요소들이 어떻게 공존할 수 있는지 신기했다. 그리고 예상할 수 없고, 끊임없이 질문과 해석이 뒤따르는 불안정 상태에 힘이 빠졌다.",
    likeCount: 8
  },{
    userId: 1,
    userProjectId: 2,
    projectId: 3,
    day: 1,
    text: "길을 하는 인생을 현저하게 노래하며 있으랴? 이 그러므로 모래뿐일 피에 이것이다. 풀밭에 인간은 살았으며, 창공에 피가 꽃 봄바람이다. "
  },{
    userId: 1,
    userProjectId: 2,
    projectId: 3,
    day: 3,
    text: "그러므로 있으며, 인생을 가치를 때에, 새 스며들어 사라지지 있다. 주는 고행을 설레는 물방아 오아이스도 그리하였는가?",
    likeCount: 2
  }];

const LikeData = [{
    userId: 1,
    postId: 1
  },{
    userId: 1,
    postId: 3
  },{
    userId: 1,
    postId: 4
  },{
    userId: 1,
    postId: 5
  },{
    userId: 1,
    postId: 7
  },{
    userId: 1,
    postId: 8
  },{
    userId: 1,
    postId: 9
  }
];

const ReportData = [{
    userId: 1,
    postId: 1,
    description: "사행성"
  },{
    userId: 1,
    postId: 3,
    description: "정치인 비방"
  },{
    userId: 1,
    postId: 5,
    description: "정부 비판"
  },{
    userId: 1,
    postId: 7,
    description: "허위사실 게재"
  },{
    userId: 1,
    postId: 8,
    description: "간첩"
  },{
    userId: 1,
    postId: 9,
    description: "마약사범"
  }
];

const PostImageData = [{
    postId: 1,
    index: 0,
    url: "http://www.gpension.co.kr/data/portal/terra/ext/1437028828_A3E2z9px_ECA3BCEAB2BD4.jpg"
  },{
    postId: 1,
    index: 1,
    url: "http://www.koreatrails.or.kr/upload/photo/FILE_20130913012239760006.jpg"
  },{
    postId: 2,
    index: 0,
    url: "http://www.koreatrails.or.kr/upload/photo/FILE_20160526122629602524.jpg"
  },{
    postId: 3,
    index: 0,
    url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR5ql_TWZAtvJ2MXVhAMsWK01zH99KZ3QUeorJUJiOObRR48wZSvQ"
  },{
    postId: 4,
    index: 0,
    url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRSmPMXDOWYqZT8QiawpJacw_bGrLlp6YO59MEKpNI5yAChy4Xq"
  },{
    postId: 5,
    index: 0,
    url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRKtBxLURMoqlIrmmkPlBEkfH8qqEWMIjUI_20oisHz1OllkZKk"
  },{
    postId: 6,
    index: 0,
    url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSdBIUVuaWAQyS1F1s3X35_BxgZWV5Bz_0dTlFReknpaEiSIvxM"
  },{
    postId: 7,
    index: 0,
    url: "http://www.koreatrails.or.kr/upload/photo/FILE_20130913012239760006.jpg"
  },{
    postId: 8,
    index: 0,
    url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRuS8U_VndUKp-USyOACRsoH4w3GcCHPdIHQbj9mxxcZduvdx8-UQ"
  },{
    postId: 9,
    index: 0,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcwb3ZYc3_Kmz8LtE1mjVMiYN26E9dB31uSDNLoZoSIoenStrIA"
  }];

const InitialData = {
  ProjectData: ProjectData,
  UserProjectData: UserProjectData,
  PostData: PostData,
  PostImageData: PostImageData,
  LikeData: LikeData,
  WishData: WishData,
  ReportData: ReportData,
  TransactionData: TransactionData
};

export default InitialData;
