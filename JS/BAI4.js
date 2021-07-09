const INVOICE_HANDLING_FEE_PERSONAL = 4.5;
const BASIC_SERVICE_FEE_PERSONAL = 20.5;
const PREMIUM_SERVICE_FEE_PERSONAL = 7.5;

const INVOICE_HANDLING_FEE_ENTERPRISE = 15;
const BASIC_SERVICE_FEE_ENTERPRISE_FIRST = 7.5;
const BASIC_SERVICE_FEE_ENTERPRISE_SECOND = 5;
const PREMIUM_SERVICE_FEE_ENTERPRISE = 50;

function checkInteger(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number % 1 === 0) {
    notification.innerHTML = "";
    return true;
  }
  notification.innerHTML = notifications[indexNotifiParent][indexNotification];
  return false;
}

getEle("personal").addEventListener("click", function () {
  var personal = getEle("personal");
  connectionNumber.setAttribute("disabled", "");
  getEle("connectionNumber").value = "";
  getEle("notificationConnection").style.display = "none";
});

getEle("enterprise").addEventListener("click", function () {
  var enterprise = getEle("enterprise");
  connectionNumber.removeAttribute("disabled");
  getEle("notificationConnection").style.display = "block";
  getEle("notificationConnection").innerHTML = "";
});

function checkCustomerType(
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var customerType = document.querySelectorAll("input[name=typeServices]");
  for (var i = 0; i < customerType.length; i++) {
    if (customerType[i].checked) {
      getEle(idNotification).innerHTML = "";
      return true;
    }
  }
  getEle(idNotification).innerHTML =
    notifications[indexNotifiParent][indexNotification];
  return false;
}

function getCustomerType() {
  var personal = getEle("personal").checked;
  return personal ? 0 : 1;
}

function checkCustomerCode(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var codes = /^([\w])+$/;
  var code = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (!code.match(codes)) {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
  notification.innerHTML = "";
  return true;
}

function checkValid() {
  var result1 =
    checkEntry("customerCode", "notificationCode", 3, 0) &&
    checkCustomerCode("customerCode", "notificationCode", 3, 10);
  var result2 = checkCustomerType("notificationType", 3, 1);

  var result4 =
    checkEntry("premiumChannel", "notificationPremium", 3, 3) &&
    checkIsNumber("premiumChannel", "notificationPremium", 3, 5) &&
    checkValueNumber("premiumChannel", "notificationPremium", 3, 7) &&
    checkInteger("premiumChannel", "notificationPremium", 3, 9);

  var customerType = getCustomerType();

  if (customerType === 0) {
  } else {
    var result3 =
      checkEntry("connectionNumber", "notificationConnection", 3, 2) &&
      checkIsNumber("connectionNumber", "notificationConnection", 3, 4) &&
      checkValueNumber("connectionNumber", "notificationConnection", 3, 6) &&
      checkInteger("connectionNumber", "notificationConnection", 3, 8);

    return result1 && result2 && result3 && result4 ? true : false;
  }

  return result1 && result2 && result4 ? true : false;
}

function getNumberChannelPremium() {
  return +getEle("premiumChannel").value;
}

function calculateCableFeePersonal() {
  var premiumChannel = getNumberChannelPremium();
  var total =
    INVOICE_HANDLING_FEE_PERSONAL +
    BASIC_SERVICE_FEE_PERSONAL +
    PREMIUM_SERVICE_FEE_PERSONAL * premiumChannel;
  return total;
}

function calculateCableFeeEnterprise() {
  var premiumChannel = getNumberChannelPremium();
  var connectionNumber = +getEle("connectionNumber").value;
  var total;
  var firstConnections = 10;

  if (connectionNumber <= firstConnections) {
    total =
      INVOICE_HANDLING_FEE_ENTERPRISE +
      BASIC_SERVICE_FEE_ENTERPRISE_FIRST * connectionNumber +
      premiumChannel * PREMIUM_SERVICE_FEE_ENTERPRISE;
    return total;
  }

  total =
    INVOICE_HANDLING_FEE_ENTERPRISE +
    BASIC_SERVICE_FEE_ENTERPRISE_FIRST * firstConnections +
    BASIC_SERVICE_FEE_ENTERPRISE_SECOND *
      (connectionNumber - firstConnections) +
    premiumChannel * PREMIUM_SERVICE_FEE_ENTERPRISE;
  return total;
}

getEle("btnTotalMoney").addEventListener("click", function () {
  var check = checkValid();
  var resultContent = getEle("resultContent");
  resultContent.innerHTML = "";
  if (check) {
    var total;
    var customerType = getCustomerType();

    if (customerType === 0) {
      total = calculateCableFeePersonal();
      resultContent.innerHTML = "Tổng số tiền cáp phải trả là: " + total + "$";
    } else {
      total = calculateCableFeeEnterprise();
      resultContent.innerHTML = "Tổng số tiền cáp phải trả là: " + total + "$";
    }
  }
});
