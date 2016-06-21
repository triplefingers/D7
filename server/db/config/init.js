import model from "../models";

const initDB = ()=>{
  /* User model data 생성 */
  let user = new model.User({username: "Lenny Kim", email: "idforcoding@gmail.com", password: 12345678});
  user.save().then((model)=>console.log("Created User model", model));

  /* Project model data 생성 */
  [{
    title: "드로잉 1작품 그리기",
    description: "매일 드로잉 1작품 그리기",
    wish: 1
  },{
    title: "아이콘 만들기",
    description: "클래식 다이어리를 테마로 매일 아이콘 1개씩 그리기",
    wish: 0
  },{
    title: "스타트업 아이디어 생각하기",
    description: "매일 스타트업 아이디어 1개씩 생각하고 블로그로 공유하기",
    wish: 0
  },{
    title: "toy problem 풀기",
    description: "매일 toy problem 1문제씩 풀기",
    wish: 0
  },{
    title: "아로마 종류별로 익히기",
    description: "매일 아로마 종류별로 시향하기",
    wish: 0
  },{
    title: "칭찬하기",
    description: "매일 주변 사람을 관찰하고 칭찬할 점 1가지 찾아서 말해주기",
    wish: 1
  }].forEach((item)=>{
    new model.Project(item)
    .save()
    .then((model)=>console.log("Created Project model", model));
  });

  /* userProject model data 생성 */
  [{
    userId: 1,
    projectId: 1,
    startAt: "2016-06-06",
    endAt: "2016-06-12",
  },{
    userId: 1,
    projectId: 1,
    startAt: "2016-06-14",
    endAt: "2016-06-20",
  },{
    userId: 1,
    projectId: 2,
    startAt: "2016-06-16",
    endAt: "2016-06-22",
  },{
    userId: 1,
    projectId: 4,
    startAt: "2016-06-24",
    endAt: "2016-06-27",
  }].forEach((item)=>{
    new model.UserProject(item).save().then((model)=>console.log("Created userProject model", model));
  });

  /* Post model data 생성 */
  [{
    userProjectId: 1,
    day: 1,
    text: "냉소도 지겹고 본인과 타인의 결점만 찾아내는 것도 지겨워진 앨리스는.."
  },{
    userProjectId: 1,
    day: 2,
    text: "선택의 여지 따위가 없는, 한숨 지으며 “하지만 정말..?”하고 물을 새도 없는 상황에 맞닥뜨리기를 바랐다."
  },{
    userProjectId: 1,
    day: 3,
    text: "분석이나 해석 따위가 불필요하고, 물을 필요도 없이, 자연스레 존재하는 상황을."
  },{
    userProjectId: 1,
    day: 4,
    text: "그는 삶을 기능적으로 생각했기 때문에, 인생도 아파트처럼 잘 배열되기를 바랐다 – 사교 생활, 재정 문제, 연애가 모두 조화롭고 합리적이기를 원했다."
  },{
    userProjectId: 1,
    day: 5,
    text: "그는 겉으로 보기에는 잘 정돈된 상태인 것 같지만, 사실 남보다 더 무질서를 두려워하고 의식한다고 볼 수 있었다."
  },{
    userProjectId: 1,
    day: 6,
    text: "에릭은 감정의 벌거숭이가 되는 상황에서는 매우 다급하게 상징적인 ‘가운’을 찾아 헤맸다."
  },{
    userProjectId: 1,
    day: 7,
    text: "그는 멀리서는 잘 보이지만, 가까이 들여다보면 백만 개나 되는 파편으로 나뉘어 있었다. 앨리스는 이토록 서로 화해할 수 없는 요소들이 어떻게 공존할 수 있는지 신기했다. 그리고 예상할 수 없고, 끊임없이 질문과 해석이 뒤따르는 불안정 상태에 힘이 빠졌다."
  },{
    userProjectId: 2,
    day: 1,
    text: "길을 하는 인생을 현저하게 노래하며 있으랴? 이 그러므로 모래뿐일 피에 이것이다. 풀밭에 인간은 살았으며, 창공에 피가 꽃 봄바람이다. "
  },{
    userProjectId: 2,
    day: 3,
    text: "그러므로 있으며, 인생을 가치를 때에, 새 스며들어 사라지지 있다. 주는 고행을 설레는 물방아 오아이스도 그리하였는가?"
  }].forEach((item)=>{
    new model.Post(item).save().then((model)=>console.log("Created Post model", model));
  });

  /* PostImage model data 생성 */
  [{
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
  }].forEach((item)=>{
    new model.PostImage(item).save().then((model)=>console.log("Created PostImage model", model));
  });
};

export default initDB;
