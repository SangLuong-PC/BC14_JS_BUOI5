function getEle(idEle) {
  return document.getElementById(idEle);
}

// Các thông báo
var notifications = [
  [
    "Vui lòng nhập điểm thứ nhất!",
    "Vui lòng nhập điểm thứ hai!",
    "Vui lòng nhập điểm thức ba!",
    "Vui lòng nhập khu vực ưu tiên!",
    "Vui lòng nhập đối tượng ưu tiên!",
    "Vui lòng nhập giá trị từ 0 - 10!",
    "Chỉ có khu vực A, B hoặc C!",
    "Chỉ có đối tượng 1, 2 hoặc 3!",
    "Vui lòng nhập vào số!",
    "Vui lòng nhập vào ký tự!",
    "Bạn đã rớt",
    "Bạn trúng tuyển",
    "Vui lòng nhập điểm chuẩn!",
    "Vui lòng nhập đúng điểm chuẩn!",
  ],
  [
    "Vui lòng nhập tên người dùng!",
    "Vui lòng nhập số kw sử dụng!",
    "Số kw người dùng phải là số!",
    "Số kw không âm!",
    "Vui lòng nhập tên hợp lệ!",
  ],
  [
    "Vui lòng nhập vào họ và tên!",
    "Vui lòng nhập vào tổng thu nhập trên một năm!",
    "Vui lòng nhập số người phụ thuộc!",
    "Vui lòng nhập vào số!",
    "Tổng thu nhập không phải số âm!",
    "Số người phụ thuộc không phải là số âm!",
    "Vui lòng nhập tên hợp lệ!",
    "Số người phụ thuộc là số nguyên!",
  ],
  [
    "Vui lòng nhập vào mã khách hàng!",
    "Vui lòng chọn loại khách hàng!",
    "Vui lòng nhập số kết nối!",
    "Vui lòng nhập số kênh cao cấp!",
    "Số kết nối phải là số và phải là số nguyên!",
    "Số kênh cao cấp phải là số và phải là số nguyên!",
    "Số kết nối không phải là số âm",
    "Số kênh cao cấp không phải là số âm!",
    "Số kết nối là số nguyên!",
    "Số kênh cao cấp là số nguyên!",
    "Mã khách hàng không chứa các ký tự đặc biệt!",
  ],
];

function checkEntry(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck === "") {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  } else {
    notification.innerHTML = "";
    return true;
  }
}

function checkIsNumber(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (isNaN(number)) {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
  notification.innerHTML = "";
  return true;
}

function checkValueNumber(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number < 0) {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
  notification.innerHTML = "";
  return true;
}

function checkName(
  idCheck,
  idNotification,
  indexNotifiParent,
  indexNotification
) {
  var validation =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck.match(validation)) {
    notification.innerHTML = "";
    return true;
  } else {
    notification.innerHTML =
      notifications[indexNotifiParent][indexNotification];
    return false;
  }
}
