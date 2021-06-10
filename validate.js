// 21 35 87 26 39 123 164 182
function isEmpty(value = "") {
  if (value === "") {
    return true;
  }
  return false;
}

// k nhỏ hơn 0 và k quá 199
function isOutOfBounds(value) {
  if (value < 0) {
    return -1;
  }
  if (value > 199) return 1;
}

//check input là number
function isNumber(value = "") {
  if (value == "") {
    return false;
  }
  if (Number(value) == 0) {
    return true;
  }

  if (!!Number(value)) {
    return true;
  }
  return false;
}

function validateCylinder(param) {
  let name = "Chuỗi cylinder";
  // Cắt khoảng trắng white space đầu cuối
  let value = param.trim();
  if (isEmpty(value)) {
    return `${name} không được rỗng`;
  }
  try {
    let data = value.trim().split(" ");
    console.log(data);
    for (let val in data) {
      let number = data[val];
      if (!isNumber(number)) {
        return `${name} chứa kí tự không hợp lệ`;
      }
      number = Number(number);
      if (isOutOfBounds(number) === -1) {
        return `${name} chứa số bé hơn 0`;
      }
      if (isOutOfBounds(number) === 1) {
        return `${name} chứa số lớn hơn 199`;
      }
    }
  } catch (error) {
    return `${name} kí tự ngăn cách không chính xác`;
  }
}

function validateHeader(param = "") {
  let name = "Vị trí đầu đọc";
  let value = param.trim();
  if (isEmpty(value)) {
    return `${name} không được rỗng`;
  }
  if (!isNumber(value)) {
    return `${name} chứa kí tự không  hợp lệ`;
  }
  value = Number(value);
  if (isOutOfBounds(value) == -1) {
    return `${name} bé hơn 0`;
  }
  if (isOutOfBounds(value) == 1) {
    return `${name} lớn hơn 199`;
  }
}
