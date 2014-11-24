// JavaScript Document
var mycar = document.getElementById("my_car");
var parent = document.getElementById("carTrack");
var gameEnding = document.getElementById("gameOver");
var track = document.getElementById("track-move");
var trackpos = -2500;
var opponentList = [];
mycar.style.left = 50+'px';
var carPosition = 50;

//use of arrow keys
document.onkeydown = function(e) {
	switch (e.keyCode) {
        case 37:
			//mycar.style.left=100+"px";
			if(carPosition>50){
				carPosition = carPosition-150;
				mycar.style.left=carPosition+"px";
			}
            break;
       
        case 39:
			if(carPosition<350){
				carPosition = carPosition+150;
				mycar.style.left=carPosition+"px";
			}
            break;
        
    }
}

var a = setInterval(run_game,1000);
var b = setInterval(carCollision,20);
var c = setInterval(background,10);
	
	function run_game(){
			if(opponentList.length<=5){
			var c = new gameloop();
			c.createOpponent();
			console.log(opponentList.length);
			}
		}
		
	function getRandom(max){
		var rand = Math.floor(Math.random()*max);
		return rand;
	}
	
function gameloop(){
	this.x=0;
	this.y=0;
	this.intervalId;
	this.element;
	var that = this;

	this.createOpponent = function(){
		that.element = document.createElement('div');	
		that.element.className="opponent";
		document.getElementById("carTrack").appendChild(that.element);
		that.x = getRandom(3);
		if(that.x<1)
			that.x = 50;
		else if(that.x>=1 && that.x<2){
			that.x = 200;
			}
		else {
			that.x = 350;
		}
		
		that.element.style.left = that.x+"px";
		that.element.style.top = that.y+"px";
		that.intervalId = setInterval(that.moveopponent, 20);
		opponentList.push(that);
		};
		
		this.moveopponent = function () {
        that.y+=5;
        that.element.style.top = that.y + "px";
		if (that.y>=500) {
		    var index=opponentList.indexOf(that);
			opponentList.splice(index,1);
			clearInterval(that.intervalId);
			parent.removeChild(that.element);
        }
  
	}
}	




function background(){
		trackpos+=1;
		track.style.top = trackpos + 'px';
		if(trackpos >=0){
			gameEnding.style.background="#199db3";
			gameEnding.style.padding="100px";
			gameEnding.style.zIndex="50";
			gameEnding.innerHTML="<h1>you win<h1>";
			clearInterval(c);	
			clearInterval(a);
			clearInterval(b);
		}
		
}

function carCollision(){
	for(var i=0; i<opponentList.length;i++){
		if(opponentList[i].element.style.left==mycar.style.left && opponentList[i].element.style.top.split('px')[0]>= 323){
			gameEnding.style.background="#199db3";
			gameEnding.style.padding="100px";
			gameEnding.style.zIndex="50";
			gameEnding.innerHTML="<h1>game over<h1>";
			clearInterval(a);
			clearInterval(b);
			clearInterval(c);
		}
	}
	
}