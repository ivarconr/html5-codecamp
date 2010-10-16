$(function() {
  var logoCanvas = document.getElementById('logo');
  var ctx = logoCanvas.getContext('2d');
  

  // Build the B
  ctx.beginPath();
  ctx.moveTo(90, 60);
  ctx.lineTo(90, 140);
  ctx.lineTo(110, 140);
  ctx.lineTo(110, 60);
  ctx.moveTo(110, 115);
  ctx.arc(110, 115, 25, Math.PI*-0.5, Math.PI*0.5, false);
  ctx.closePath();
  
  // set up the stroke for F
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
    
  
  // setup the line style
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.fillStyle = "#ffffff";
  
  //cxt.arc(x,y,radius,Math.PI*startingAngle,Math.PI*endingAngle,anticlockwise);
  ctx.arc(110, 115, 25, Math.PI*-0.5, Math.PI*0.5, false);
  ctx.fill();
  
  // colour the path
  ctx.stroke();
  
  ctx.rotate(0.1);

  // Build the shadow for F
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(20, 140);
  ctx.lineTo(60, 140);
  ctx.lineTo(60, 100);
  ctx.lineTo(100, 100);
  ctx.lineTo(100, 70);
  ctx.lineTo(60, 70);
  ctx.lineTo(60, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 20);
  ctx.lineTo(20, 20);
  ctx.closePath();
  
  // set up the stroke for F
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  
  //Create a drop shadow
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 7;
  ctx.shadowColor = "#A2BAA8";

  ctx.fillStyle = "#ffffff";
  ctx.fill();
        
  //Turn off the shadow
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  
  // Build the F
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(20, 140);
  ctx.lineTo(60, 140);
  ctx.lineTo(60, 100);
  ctx.lineTo(100, 100);
  ctx.lineTo(100, 70);
  ctx.lineTo(60, 70);
  ctx.lineTo(60, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 20);
  ctx.lineTo(20, 20);
  ctx.closePath();
  
  // set up the stroke for F
  ctx.strokeStyle = "#DFD";
  ctx.stroke();
  
  // set up the gradient for F
  var grad = ctx.createLinearGradient(0, 0, 0, 140);
  grad.addColorStop(0, '#38F56B'); 
  grad.addColorStop(1, '#228F3F'); 

  // apply the gradient to the F
  ctx.fillStyle = grad;
  ctx.fill();

});