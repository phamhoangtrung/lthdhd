
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