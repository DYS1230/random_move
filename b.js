var SIZE = 100;  //边界
var BORDERX = document.documentElement.clientWidth;   //网页可视区宽度
var BORDERY = document.documentElement.clientHeight;  //网页可视区高度
var SPEED_MAX = 20;   //最大速度
var SPEED_RATE = 4;   //速度变化率

function rnd(min, max) {
	return parseInt( Math.random() * (max - min + 1) + min);
}

function Img() {
	this.imgs = [];
	this.x = 0;
	this.y = 0;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.index = 0;
	//this.alive = [];
	//还有一种想法，把create的img放在此数组中，之后创建一函数循环监视该数组，把其中的img sizechange，直到size为0后删除
}

Img.prototype.init = function () {
	for (var i = 1; i < 6; i++) {
		var pic =  new Image();
		pic.src = 'qun_' + i + '.png';
		this.imgs.push(pic);
	}	
}

Img.prototype.create = function (x, y) {
	if (typeof (x) == 'undefined' && typeof (x) == 'undefined') {
		x = this.x;
		y = this.y;
	}console.log(this.index);
	var img = document.createElement('img')
	img.src = this.imgs[this.index].src
	img.style.left = x + 'px';	//建立图片坐标
	img.style.top = y + 'px';
	img.style.position = 'absolute';
	document.body.appendChild(img);

	this.index = ++this.index % 5;
	this.sizeChange(img)
}

Img.prototype.positionChange = function () {
	this.x += this.xSpeed;	//改变x
	this.y += this.ySpeed;	//改变y
			
	if (this.x <= 0) {	//限制x的移动范围 
		this.xSpeed = rnd(0, SPEED_MAX);
		this.x = 0;
	} else if (this.x >= BORDERX - SIZE) {
		this.xSpeed = rnd(-SPEED_MAX, 0);
		this.x = BORDERX - SIZE;
	}
	
	if( this.y <= 0) {	//限制y的移动范围
		this.ySpeed = rnd(0, SPEED_MAX);
		this.y = 0;
	} else if (this.y >= BORDERY - SIZE) {    
		this.ySpeed = rnd(-SPEED_MAX, 0);
		this.y = BORDERY - SIZE;
	}
	
	if(this.xSpeed < -SPEED_MAX) {	//x速度调整
		this.xSpeed += rnd(0, SPEED_RATE);
	} else if (this.xSpeed > SPEED_MAX) {
		this.xSpeed += rnd(-SPEED_RATE, 0);
	} else {
		this.xSpeed += rnd(-SPEED_RATE, SPEED_RATE);
	}
	
	if(this.ySpeed < -SPEED_MAX) {	//y速度调整
		this.ySpeed += rnd(0, SPEED_RATE);
	} else if(this.ySpeed > SPEED_MAX) {
		this.ySpeed += rnd(-SPEED_RATE, 0);
	} else {
		this.ySpeed += rnd(-SPEED_RATE, SPEED_RATE);
	}
}

Img.prototype.sizeChange = function (obj) {
	window.requestAnimationFrame(function change() {
		if(obj.offsetWidth==0 || obj.offsetHeight==0) {
			document.body.removeChild(obj);
			return;
		}
		obj.style.width=obj.offsetWidth - 5 + 'px';
		obj.style.height=obj.offsetHeight - 5 + 'px';
		window.requestAnimationFrame(change);
	})
}


window.onload = function () {
	var auto = document.getElementById('play');
	var pause = false;
	var img = new Img();
	img.init();
	document.onmousedown = manualMove;
	auto.onclick = function (event) {
		if (auto.value == '自动移动') {
			pause = false;
			auto.value = '手动移动';
			document.onmousedown = null;
			autoMove();
		} else {
			pause = true;
			auto.value = '自动移动';
			document.onmousedown = manualMove;
		}
	}

	function autoMove() {
		if (pause) return;
		img.create();
		img.positionChange();
		window.requestAnimationFrame(autoMove);		
	}

	function manualMove() {
		document.onmousemove = function (event) {
			var manualX = event.clientX - 50;    
			var manualY = event.clientY - 50;
			if(manualX <= 0) {	//限制范围
				manualX=0;
			} else if (manualX >= BORDERX - SIZE) {
				manualX = BORDERX - SIZE;
			}
		
			if(manualY <= 0) {
				manualY = 0;
			} else if (manualY >= BORDERY - SIZE) {
				manualY = BORDERY - SIZE;
			}
		
			img.create(manualX,manualY);
		}
			
		document.onmouseup = function() {
			document.onmousemove = null;
				document.onmouseup = null;
		}
		
		return false;
	}

}