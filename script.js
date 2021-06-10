// 21 35 87 26 39 123 164 182
//Form element
let algorithms = document.getElementById("algorithms");
let direction = document.getElementById("direction");
let cylinderString = document.getElementById("cylinder-string");
let headerPosition = document.getElementById("header-position");
let runBtn = document.getElementById("runBtn");

//Result element
let result = document.getElementById("result");
let result1 = document.getElementById("result1");

//Config canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = "20px";
ctx.strokeStyle = "#46da46";

// Dependent Dropdown Box
algorithms.addEventListener("change", () => {
  let selectedValue = algorithms.value;
  if (selectedValue == "look" || selectedValue == "c-look") {
    direction.innerHTML = `
              <option value="up">Up</option>
              <option value="down">Down</option>
          `;
  } else {
    direction.innerHTML = `
              <option>None</option>
          `;
  }
});

//String arr to Number arr
function toNumberArray(arr = []) {
  return arr.map((s) => Number(s));
}
//compareNumbers
function compareNumbers(a, b) {
  return a - b;
}
// Get true coordinates in the chart
function getChartPosition(position) {
  // Convert disk loction to chart location
  return (position + 1) * 5;
}
//Create points on the chart
function createPoint(number = 0) {
  //Đánh số
  // +100 to let the chart in middle of the canvas
  let xPostition = getChartPosition(number) + 100;
  let yPostition = 30;
  // xPostition-5 to let the number in middle of the cross line
  ctx.fillText(`${number}`, xPostition - 5, yPostition);

  //đánh dấu gạch
  //Draw a cross line
  ctx.beginPath();
  ctx.moveTo(xPostition, yPostition - 10);
  ctx.lineTo(xPostition, yPostition - 24);
  ctx.stroke();
}
// //Drawing 1
// function drawing(startPosition, arr) {
//   let y = 30;

//   ctx.beginPath();
//   ctx.moveTo(getChartPosition(startPosition), y);
//   arr.map((postion) => {
//     y = y + 30;
//     ctx.lineTo(getChartPosition(postion), Number(y));
//   });

//   ctx.stroke();
// }
// //Drawing 2
function drawing2(startPosition, arr = [], algorithm) {
  let y = 45;
  drawLine();
  arr.unshift(startPosition);

  for (let i = 0; i < arr.length; i++) {
    //Cause we have arr[i-1] so we need to use this if clause to prevent the arr point to empty value(array length + 1)
    if (algorithm === "look" || algorithm == "c-look") {
      const min = Math.min.apply(null, arr);
      const max = Math.max.apply(null, arr);
      console.log(arr[i]);
      if (arr[i] === min) {
        let yTemp = y;
        let pos1 = getChartPosition(min) + 100;
        dashLine(pos1, 30, pos1, yTemp);
      }
      if (arr[i] === max) {
        let yTemp = y;
        let pos2 = getChartPosition(max) + 100;
        dashLine(pos2, 30, pos2, yTemp);
      }
    }

    //init a Line Object
    let line = new Line(
      getChartPosition(arr[i]) + 100,
      y,
      getChartPosition(arr[i + 1]) + 100,
      y + 30
    );
    if (i !== arr.length - 1) {
      line.drawWithArrowheads(ctx);
    }
    y += 30;
  }
}
//Draw horizontal axis on the chart
function drawLine() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(105, 13);
  ctx.lineTo(1100, 13);
  ctx.stroke();
}
// Draw dashed line
function dashLine(fromX, fromY, toX, toY) {
  ctx.strokeStyle = "#808080";
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

//Run event
runBtn.addEventListener("click", () => {
  // Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Transform value
  let error;
  let cylinderStringValue = cylinderString.value;
  let headerPositionValue = headerPosition.value;
  let algorithmsValue = algorithms.value;
  let directionValue = direction.value;

  //validate
  if (validateCylinder(cylinderStringValue) != undefined) {
    error = validateCylinder(cylinderStringValue);
    alert(error);
    return;
  }
  if (validateHeader(headerPositionValue) != undefined) {
    error = validateHeader(headerPositionValue);
    alert(error);
    return;
  }

  // Chuyển input từ mảng string thành mảng number
  let numberCylinderString = toNumberArray(
    cylinderStringValue.trim().split(" ")
  );
  //clone mảng vừa tạo thành 1 mảng mới để sort
  let numberCylinderClone = [...numberCylinderString];

  // Tạo lại khung canvasr mới
  ctx.canvas.height = (numberCylinderString.length + 3) * 30;
  canvas.style.border = "2px solid #808080";

  //Create points that are not in the array
  createPoint(Number(headerPositionValue));
  createPoint(0);
  createPoint(199);

  //Create points form user input
  numberCylinderClone.sort(compareNumbers).map((item) => {
    createPoint(item);
  });

  // Run algorithms
  let { seek_count, seek_sequence } = runAlgorithm(
    algorithmsValue,
    numberCylinderString,
    headerPositionValue,
    directionValue
  );

  //Draw chart vectors
  drawing2(Number(headerPositionValue), seek_sequence, algorithmsValue);
  
  // Show ouput value on HTML
  result.innerHTML = `<b>Số bước dịch chuyển</b>: ${seek_count} bước.`;
  // console.log(`seek_sequence`, seek_sequence)
  let htmlString = "<b>Thứ tự đọc :&ensp;</b>";
  seek_sequence.shift();
  seek_sequence.map((data) => {
    htmlString += `${data}&ensp;`;
    result1.innerHTML = htmlString;
  });
  result1.scrollIntoView();
});

document.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    runBtn.click();
  }
});
