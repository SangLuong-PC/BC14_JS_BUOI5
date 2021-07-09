const AREA_A = 2;
const AREA_B = 1;
const AREA_C = 0.5;

const OBJECT_1 = 2.5;
const OBJECT_2 = 1.5;
const OBJECT_3 = 1;

function checkAreaScores(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var contentArea = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (
    contentArea.toUpperCase() === "X" ||
    contentArea.toUpperCase() === "A" ||
    contentArea.toUpperCase() === "B" ||
    contentArea.toUpperCase() === "C"
  ) {
    return true;
  } else {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
}

function checkValueScores(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification,
  min,
  max
) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number < min || number > max) {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
  notification.innerHTML = "";
  return true;
}

function checkValidStudent() {
  var check =
    checkEntry("benchmark", "notificationBenchmark", 0, 12) &&
    checkIsNumber("benchmark", "notificationBenchmark", 0, 8) &&
    checkValueScores("benchmark", "notificationBenchmark", 0, 13, 1, 30);

  var check1 =
    checkEntry("scores-1", "notificationScores-1", 0, 0) &&
    checkIsNumber("scores-1", "notificationScores-1", 0, 8) &&
    checkValueScores("scores-1", "notificationScores-1", 0, 5, 0, 10);

  var check2 =
    checkEntry("scores-2", "notificationScores-2", 0, 1) &&
    checkIsNumber("scores-2", "notificationScores-2", 0, 8) &&
    checkValueScores("scores-2", "notificationScores-2", 0, 5, 0, 10);

  var check3 =
    checkEntry("scores-3", "notificationScores-3", 0, 2) &&
    checkIsNumber("scores-3", "notificationScores-3", 0, 8) &&
    checkValueScores("scores-3", "notificationScores-3", 0, 5, 0, 10);

  var check4 =
    checkEntry("areaScores", "notificationArea", 0, 3) &&
    checkAreaScores("areaScores", "notificationArea", 0, 6);

  var check5 =
    checkEntry("objectScores", "notificationObject", 0, 4) &&
    checkIsNumber("objectScores", "notificationObject", 0, 7) &&
    checkValueScores("objectScores", "notificationObject", 0, 7, 0, 3);

  return check && check1 && check2 && check3 && check4 && check5 ? true : false;
}
function getScoresArea() {
  var contentArea = getEle("areaScores").value;
  if (contentArea.toUpperCase() === "X") {
    return 0;
  }
  if (contentArea.toUpperCase() === "A") {
    return AREA_A;
  }
  if (contentArea.toUpperCase() === "B") {
    return AREA_B;
  }
  if (contentArea.toUpperCase() === "C") {
    return AREA_C;
  }
}

function getScoresObject() {
  var contentArea = +getEle("objectScores").value;
  if (contentArea === 0) {
    return 0;
  }
  if (contentArea === 1) {
    return OBJECT_1;
  }
  if (contentArea === 2) {
    return OBJECT_2;
  }
  if (contentArea === 3) {
    return OBJECT_3;
  }
}

function score(scores1, scores2, scores3, scoresArea, scoresObject) {
  return scores1 + scores2 + scores3 + scoresArea + scoresObject;
}

getEle("btnResultStudent").addEventListener("click", function () {
  var resultCheck = checkValidStudent();

  getEle("showResult").innerHTML = "";
  if (resultCheck) {
    var scoresBenchmark = +getEle("benchmark").value;
    var scores1 = +getEle("scores-1").value;
    var scores2 = +getEle("scores-2").value;
    var scores3 = +getEle("scores-3").value;
    var scoresArea = getScoresArea();
    var scoresObject = getScoresObject();

    var sumScores = score(scores1, scores2, scores3, scoresArea, scoresObject);

    if (scores1 === 0 || scores2 === 0 || scores3 === 0) {
      getEle("showResult").innerHTML = notifications[0][10];
      getEle("showResult").innerHTML += " vì có một môn có số điểm bằng 0";
    } else {
      if (sumScores >= scoresBenchmark) {
        getEle("showResult").innerHTML = notifications[0][11];
        getEle("showResult").innerHTML += " với số điểm " + sumScores;
      } else {
        getEle("showResult").innerHTML = notifications[0][10];
        getEle("showResult").innerHTML += " với số điểm " + sumScores;
      }
    }
  }
});
