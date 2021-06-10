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

// Arrow Object
function Line(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
}
Line.prototype.drawWithArrowheads = function (ctx) {
  // arbitrary styling
  ctx.strokeStyle = "#46da46";
  ctx.fillStyle = "#46da46";
  ctx.lineWidth = 1;
  // draw the line
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);
  ctx.stroke();
  //start arrow
  //   var startRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
  //   startRadians += ((this.x2 > this.x1 ? -90 : 90) * Math.PI) / 180;
  //   this.drawArrowhead(ctx, this.x1, this.y1, startRadians);

  //end arrow
  var endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
  endRadians += ((this.x2 > this.x1 ? 90 : -90) * Math.PI) / 180;
  this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
};
Line.prototype.drawArrowhead = function (ctx, x, y, radians) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0, 0);
  ctx.lineTo(3, 4);
  ctx.lineTo(-3, 4);
  ctx.closePath();
  ctx.restore();
  ctx.fill();
};
// Arrow Object

// find min from head
function findMinIndexFromHead(head = 0, arr = []) {
  let arrTemp = arr.map((a) => Math.abs(head - a));
  let min = Math.min.apply(null, arrTemp);
  let idx = arrTemp.indexOf(min);
  return idx;
}
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
  return (position + 1) * 6;
}
//Create points on the chart
function createPoint(number = 0) {
  // subtract 6 for the second param so that the number is in the middle of the axis
  ctx.fillText(`${number}`, getChartPosition(number) - 6, 15);
}
//Drawing 1
function drawing(startPosition, arr) {
  let y = 30;

  ctx.beginPath();
  ctx.moveTo(getChartPosition(startPosition), y);
  arr.map((postion) => {
    y = y + 30;
    ctx.lineTo(getChartPosition(postion), Number(y));
  });

  ctx.stroke();
}
//Drawing 2
function drawing2(startPosition, arr = []) {
  let y = 30;
  arr.unshift(startPosition);

  for (let i = 0; i < arr.length; i++) {
    if (i == arr.length - 1) {
      break;
    }
    let line = new Line(
      getChartPosition(arr[i]),
      y,
      getChartPosition(arr[i + 1]),
      y + 30
    );
    line.drawWithArrowheads(ctx);
    y += 30;
  }
}

//Run algorithms method
function runAlgorithm(algorithm = "", arr = [], head = 0, direction = "") {
  switch (algorithm) {
    case "fcfs":
      return FCFS(arr, head);
    case "sstf":
      return SSTF(arr, head);
    case "look":
      return LOOK(arr, head, direction);
    case "c-look":
      return CLOOK(arr, head, direction);
  }
}
// LOOK algorithm
function LOOK(arr = [], head, direction = "") {
  let seek_count = 0;
  let distance, cur_track;

  let down = [];
  let up = [];
  let seek_sequence = [];

  // Appending values which are
  // currently at down and up
  // direction from the head.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head) down.push(arr[i]);
    if (arr[i] > head) up.push(arr[i]);
  }
  down.sort(compareNumbers);
  up.sort(compareNumbers);

  let run = 2;
  while (run-- > 0) {
    if (direction == "down") {
      for (let i = down.length - 1; i >= 0; i--) {
        cur_track = down[i];

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now the new head
        head = cur_track;
      }

      // Reversing the direction
      direction = "up";
    } else if (direction == "up") {
      for (let i = 0; i < up.length; i++) {
        cur_track = up[i];

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now new head
        head = cur_track;
      }

      // Reversing the direction
      direction = "down";
    }
  }
  return {
    seek_sequence,
    seek_count,
  };
}
// FCFS algorithm
function FCFS(arr = [], head) {
  let seek_count = 0;
  let seek_sequence = [...arr];
  let distance, cur_track;

  for (let i = 0; i < arr.length; i++) {
    cur_track = arr[i];

    // calculate absolute distance
    distance = Math.abs(cur_track - head);

    // increase the total count
    seek_count += distance;

    // accessed track is now new head
    head = cur_track;
  }

  return {
    seek_sequence,
    seek_count,
  };
}
// SSTF algorithm
// Ideal: Use one array to loop and one to get value after calculated
function SSTF(arr = [], head) {
  // Init data
  let seek_count = 0;
  let seek_sequence = [];
  let arrTemp = [...arr];
  let currentHead = head;

  // Loop though n-1 item (can use other loop)
  for (let a in arr) {
    //find min index by head
    let idx = findMinIndexFromHead(currentHead, arrTemp);

    // new array after cut the previous 'idx'
    let val = arrTemp.splice(idx, 1)[0];

    // push to 'seek_sequence'
    seek_sequence.push(val);

    //increment the distance ('seek_count')
    seek_count += Math.abs(currentHead - val);

    //update new head
    currentHead = val;
  }
  // console.log(`seek_sequence`, seek_sequence)
  return {
    seek_sequence,
    seek_count,
  };
}
// CLOOK algorithm
function CLOOK(arr = [], head, direction = "") {
  let seek_count = 0;
  let distance, cur_track;

  let down = [];
  let up = [];
  let seek_sequence = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head) down.push(arr[i]);
    if (arr[i] > head) up.push(arr[i]);
  }
  down.sort(compareNumbers);
  up.sort(compareNumbers);
  if (direction == "up") {
    for (let i = 0; i < up.length; i++) {
      cur_track = up[i];
      seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }
    seek_count += Math.abs(head - down[0]);
    head = down[0];
    for (let i = 0; i < down.length; i++) {
      cur_track = down[i];
      seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }
  } else if (direction == "down") {
    for (let i = 0; i < down.length; i++) {
      cur_track = down[i];
      seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }
    seek_count += Math.abs(head - up[0]);
    head = up[0];
    for (let i = 0; i < up.length; i++) {
      cur_track = up[i];
      seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }
  }

  return {
    seek_count,
    seek_sequence,
  };
}

//Run event
runBtn.addEventListener("click", () => {
  // Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Compute & transform value
  let cylinderStringValue = cylinderString.value.trim().split(" "); //Change the split() params depending on requirements
  let headerPositionValue = Number(headerPosition.value);
  let algorithmsValue = algorithms.value;
  let directionValue = direction.value;
  let numberCylinderString = toNumberArray(cylinderStringValue);
  let numberCylinderClone = [...numberCylinderString];

  // Init new canvas
  ctx.canvas.height = (numberCylinderString.length + 3) * 30;
  canvas.style.borderTop = "2px solid #46da46";

  // Create all ponits on the Chart
  createPoint(headerPositionValue);
  numberCylinderClone.sort(compareNumbers).map((item) => {
    createPoint(item);
  });

  // Run algorithms
  let {
    seek_count,
    seek_sequence
  } = runAlgorithm(
    algorithmsValue,
    numberCylinderString,
    headerPositionValue,
    directionValue
  );

  // Drawing
  // console.log(`seek_count`, seek_count);
  // console.log(`seek_sequence`, seek_sequence);
  drawing2(headerPositionValue, seek_sequence);

  // Show ouput value on HTML
  result.innerHTML = `Số bước dịch chuyển: ${seek_count} bước.`;
  // console.log(`seek_sequence`, seek_sequence)
  let htmlString = "Thứ tự đọc :&ensp;";
  seek_sequence.map((data) => {
    htmlString += `${data}&ensp;`;
    result1.innerHTML = htmlString;
  });
});