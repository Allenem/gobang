//定义二维数组作为棋盘
var maps = new Array(19);
var len = maps.length;
for(var i=0;i<len;i++){
	maps[i] = new Array();
	for(var j = 0;j<len;j++){
		maps[i][j] = 0;
	}
}
//初始化棋盘
var can = document.getElementById("can");
var ctx = can.getContext("2d");  //获取该canvas的2D绘图环境对象
ctx.strokeStyle = "#333";
for(var m=0;m<len-1;m++){
	for(var n=0;n<len-1;n++){
		ctx.strokeRect(m*30+15,n*30+15,30,30);  //绘制小正方形
	}
}
//初始化棋子
var black = new Image();
var white = new Image();
var clientWidth = document.documentElement.clientWidth;
black.src = "image/black.png";
white.src = "image/white.png";
//绘制文字
var can1 = document.getElementById('tip');
var ctx1 = can1.getContext("2d");
ctx1.beginPath();
ctx1.font=("100px Georgia");
ctx1.fillStyle="#f00";
ctx1.fillText("Hello",40,100);

//黑子先行
var isBlack = true;
//下子
can.onclick=function play(e){
	//获取棋盘偏移量
	var l = this.offsetLeft+15;
	var t = this.offsetTop+15;
	//获取点击相对棋盘坐标
	var x =e.clientX - l;
	var y = e.clientY -t;
	// alert(x);
	//获取行列数
	var row,col,index = 0;
	col = x%30<15 ? parseInt(x/30) : parseInt(x/30)+1;
	row = y%30<15 ? parseInt(y/30) : parseInt(y/30)+1;
	//alert(row+"行"+col+"列");  //第几行第几列
	//绘棋子图，置值，判断输赢
	if(maps[row][col]===0){
		if(isBlack){
			ctx.drawImage(black,col*30,row*30);   //下黑子
			isBlack = false;
			maps[row][col] = 2; //黑子为2
			iswin(2,row,col);
		}else{
			ctx.drawImage(white,col*30,row*30);
			isBlack = true;
			maps[row][col] = 1; //白子为1
			iswin(1,row,col);
		}
	}
 
	function iswin(t,row,col){
		var orgrow,orgcol,total,full;

		//判断每行是否有五个
			reset();
			// alert(total);
			while(col>0&&maps[row][col-1]==t){  //当前子左边还有
				total++;
				col--;
			};
			row = orgrow;
			col = orgcol;
			while(col+1<19&&maps[row][col+1]==t){  //当前子右边还有
				col++;
				total++;
			};
			// alert(total);
			celebrate();

		//判断每列是否有五个
			reset();
			while(row>0&&maps[row-1][col]==t){   //当前子上面还有
				total++;
				row--;
			}
			row = orgrow;
			col = orgcol;
			while(row+1<19&&maps[row+1][col]==t){  //下面
				total++;
				row++;
			}
			celebrate();
	 
		//左上 右下有没有五个
			reset();
			while(row>0&&col>0&&maps[row-1][col-1]==t){ //左上1
				row--;
				col--;
				total++;
			}
			row = orgrow;
			col = orgcol;
			while(row+1<19&&col+1<19&&maps[row+1][col+1]==t){  //右下1
				row++;
				col++;
				total++;
			}
			celebrate();
 
		//左下 右上有没有五个
			reset();
			while(row>0&&col+1<19&&maps[row-1][col+1]==t){  //右上
				row--;
				col++;
				total++;
			}
			row = orgrow;
			col = orgcol;
			while(row+1<19&&col>0&&maps[row+1][col-1]==t){   //左下
				row++;
				col--;
				total++;
			}
			celebrate();

		for(var i=0;i<len;i++){
			for(var j = 0;j<len;j++){
				full = maps[i][j] == 0 ? 0 : 1;
				return
			}
		}
		function celebrate(){//显示哪边赢
			if(total>=5){
				if(t==1){
					ctx1.clearRect(0,0,can1.width,can1.height);
					ctx1.fillText("白子赢",0,100);
					alert("白子赢");
				}else{
					ctx1.clearRect(0,0,can1.width,can1.height);
					ctx1.fillText("黑子赢",0,100);
					alert("黑子赢");
				}
			}
		}
		function reset(){
			orgrow = row;
			orgcol = col;
			total = 1;
		}
	}
 
}