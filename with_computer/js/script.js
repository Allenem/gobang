var chessBoard = [];
var me = true;
var over = false;
//赢法数组
var wins = [];
//赢法总数
var count = 0;
//赢法统计数组
var myWin = [];
var computerWin = [];

//给棋盘各点赋值0
for(var i=0; i<19; i++){
	chessBoard[i] = [];
	for(var j=0; j<19; j++){
		chessBoard[i][j] = 0;
	}
}
//给赢法数列赋值空
for(var i=0; i<19; i++){
	wins[i] = [];
	for(var j=0; j<19; j++){
		wins[i][j] = [];
	}
}

//横线
for(var i = 0; i < 19; i++){
	for(var j= 0; j < 15; j++){
		for(var k = 0; k < 5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线
for(var i = 0; i < 19; i++){
	for(var j= 0; j < 15; j++){
		for(var k = 0; k < 5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线
for(var i = 0; i < 15; i++){
	for(var j= 0; j < 15; j++){
		for(var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线
for(var i = 0; i < 15; i++){
	for(var j= 18; j > 3; j--){
		for(var k = 0; k < 5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
//计数
console.log(count);
//赢法统计数组赋值0
for(var i = 0; i < count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

//绘制棋盘
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = "#000";
var logo = new Image();
logo.src = "image/logo1.png";
logo.onload = function(){
	context.drawImage(logo, 0, 0, 570, 570);	
	drawChessBoard();
}
//绘制网格函数
var drawChessBoard = function(){
	for(var i=0; i<19; i++){
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30, 555);
		context.stroke();
		context.moveTo(15,15 + i*30);
		context.lineTo(555,15 + i*30);
		context.stroke();
	}
}

//绘制棋子函数
var oneStep = function(i, j, me){
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);//渐变
	if(me){//黑棋
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}
	else{//白棋
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}	
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	//若游戏结束或者轮到电脑下棋则返回，即不检测点击事件
	if(over){
		return;
	}
	if(!me){
		computerAI();
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30); //Math.floor向下取整
	var j = Math.floor(y / 30);
	if(chessBoard[i][j] == 0){
		oneStep(i, j, me);		
		chessBoard[i][j] = 1;//黑棋给棋盘上点置1
		
		//检测是否有黑棋赢的情况
		for(var k = 0; k < count; k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5){
					window.alert("you win!")
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}else{
		alert("请在未落子处下棋！")
	}
	
}

//电脑算法
var computerAI = function(){
	var myScore = [];                 //我方落子价值
	var computerScore = [];           //电脑落子价值
	var max = 0;                      //最高价值
	var u = 0, v = 0;                 //落子坐标
	for(var i = 0; i < 19; i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0; j < 19; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i = 0; i < 19; i++){
		for(var j = 0; j < 19; j++){
			if(chessBoard[i][j] == 0){
				for(var k = 0; k < count; k++){
					if(wins[i][j][k]){//给点落子价值赋值
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}
						else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}
						else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}
						else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}

						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}
						else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}
						else if(computerWin[k] == 3){
							computerScore[i][j] += 2100;
						}
						else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}

				//预测黑棋和白棋落子价值确定将要落子坐标
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;					
				}
				else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;						
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;					
				}
				else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;						
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBoard[u][v] = 2;//白棋给棋盘上点置2

	//检测是否有白棋赢的情况
	for(var k = 0; k < count; k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				window.alert("computer win!");
				over = true;
			}
		}
	}

	//检测是否无处落子
	var empty = 0;
	for(var i = 0; i < 19; i++){
		for(var j = 0; j < 19; j++){
			if(chessBoard[i][j] == 0){
				empty++;
			}
		}
	}
	if(!empty){
		window.alert("The game ended in a draw!");
		over = true;
	}

	if(!over){
		me = !me;
	}
}