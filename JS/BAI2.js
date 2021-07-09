const LEVEL_1 = 50;
const LEVEL_2 = 100;
const LEVEL_3 = 200;
const LEVEL_4 = 350;

const MONEY_LEVEL_1 = 500;
const MONEY_LEVEL_2 = 650;
const MONEY_LEVEL_3 = 850;
const MONEY_LEVEL_4 = 1100;
const MONEY_LEVEL_5 = 1300;

function checkValidElectricity() {
  var result =
    checkEntry("username", "notificationUsername", 1, 0) &&
    checkName("username", "notificationUsername", 1, 4);

  var result1 =
    checkEntry("kwUse", "notificationKWUse", 1, 1) &&
    checkIsNumber("kwUse", "notificationKWUse", 1, 2) &&
    checkValueNumber("kwUse", "notificationKWUse", 1, 3);

  return result && result1 ? true : false;
}

function getTotalLevel1(kw) {
  return kw * MONEY_LEVEL_1;
}

function getTotalLevel2(kw) {
  var totalLevel1 = getTotalLevel1(LEVEL_1);
  return (kw - LEVEL_1) * MONEY_LEVEL_2 + totalLevel1;
}

function getTotalLevel3(kw) {
  var totalVevel2 = getTotalLevel2(LEVEL_2);
  return (kw - LEVEL_2) * MONEY_LEVEL_3 + totalVevel2;
}

function getTotalLevel4(kw) {
  var totalLevel3 = getTotalLevel3(LEVEL_3);
  return (kw - LEVEL_3) * MONEY_LEVEL_4 + totalLevel3;
}

function getTotalLevel5(kw) {
  var totalLevel4 = getTotalLevel4(LEVEL_4);
  return (kw - LEVEL_4) * MONEY_LEVEL_5 + totalLevel4;
}

function getTotalMoney(kw) {
  if (kw <= LEVEL_1) {
    return getTotalLevel1(kw);
  }
  if (kw <= LEVEL_2) {
    return getTotalLevel2(kw);
  }
  if (kw <= LEVEL_3) {
    return getTotalLevel3(kw);
  }
  if (kw <= LEVEL_4) {
    return getTotalLevel4(kw);
  }
  return getTotalLevel5(kw);
}

getEle("btnTotalAmount").addEventListener("click", function () {
  var result = checkValidElectricity();
  getEle("resultAmount").innerHTML = "";
  if (result) {
    var kw = +getEle("kwUse").value;
    var totalMoney = getTotalMoney(kw);
    getEle("resultAmount").innerHTML =
      "Tổng tiền điện là: " + totalMoney.toFixed(2) + " VND";
  }
});
