export default {
  convertNumDateToFullString: (y, m, d) => {
    // 연, 월, 일의 num을 8자리의 string으로 출력
    let convertedY = y.toString(),
        convertedD = d.toString(),
        convertedM = m.toString();
    // console.log('ml: ', convertedM.length, ' dl: ', convertedD.length);
    while (convertedY.length < 4 || convertedM.length < 2 || convertedD.length < 2) {
      // console.log('in loop', typeof convertedY);
      if (convertedY.length < 4) {
        convertedY = "0" + convertedY;
      }
      if (convertedM.length < 2) {
        convertedM = "0" + convertedM;
      }
      if (convertedD.length < 2) {
        convertedD = "0" + convertedD;
      }
    }
    return convertedY + "-" + convertedM + "-" + convertedD;
  }
}