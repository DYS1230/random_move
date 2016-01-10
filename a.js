function rnd(min, max)
{
	return parseInt((Math.random()*999999)%(max-min+1))+min;   //生成一  范围在min ~ max 间的随机数。
}
window.onload=function()
{
	var auto=document.getElementById("play");
	var SIZE=100;  //边界
	var borderX=document.body.clientWidth;   //网页宽度
	var borderY=document.body.clientHeight;  //网页高度
	var SPEED_MAX = 20;   //最大速度
	var SPEED_RATE = 4;   //速度变化率

	auto.onclick=function(event)
	{
		event.cancelBubble=true;           //阻止事件冒泡，似乎没啥作用，无聊加的
		if(auto.value=="自动移动")
		{
			var x=rnd(0, borderX-SIZE);		//彩虹圈坐标范围，初始化坐标           
			var y=rnd(0, borderY-SIZE);          
			var xSpeed=rnd(0,SPEED_MAX);	//彩虹圈速度范围，初始化速度
			var ySpeed=rnd(0,SPEED_MAX);
			auto.timer=setTimeout(function(){
			
				x+=xSpeed;                    //改变x
				y+=ySpeed;                    //改变y
				
				if(x<=SIZE)                    //限制x的移动范围
				{                              
					xSpeed=rnd(0,SPEED_MAX);
					x=SIZE;
				}
				else if(x>=borderX-SIZE)
				{
					xSpeed=rnd(-SPEED_MAX,0);
					x=borderX-SIZE;
				}
				
				if(y<=SIZE)                       //限制y的移动范围
				{
					ySpeed=rnd(0,SPEED_MAX);
					y=SIZE;
				}
				else if(y>=borderY-SIZE)         
				{    
					ySpeed=rnd(-SPEED_MAX,0);
					y=borderY-SIZE;
				}
				
				if(xSpeed<-SPEED_MAX)            //x速度调整
				{
					xSpeed+=rnd(0,SPEED_RATE);
				}
				else if(xSpeed>SPEED_MAX)
				{
					xSpeed+=rnd(-SPEED_RATE,0);
				}
				else
				{
					xSpeed+=rnd(-SPEED_RATE,SPEED_RATE);
				}
				
				if(ySpeed<-SPEED_MAX)            //y速度调整
				{
					ySpeed+=rnd(0,SPEED_RATE);
				}
				else if(ySpeed>SPEED_MAX)
				{
					ySpeed+=rnd(-SPEED_RATE,0);
				}
				else
				{
					ySpeed+=rnd(-SPEED_RATE,SPEED_RATE);
				}

				moveBegin(x,y);	//移动开始
				auto.timer=setTimeout(arguments.callee,30);	//循环执行定时器
			},30);
			
			auto.value="手动移动";
			document.onmousedown=null;	//禁止自动移动
		}
		else
		{
			clearTimeout(auto.timer);     //清理定时器
			otherMove();			
			auto.value="自动移动";
		}
	}
	 
	 //预加载图片
	 var aSrc=['qun_1.png', 'qun_3.png', 'qun_5.png', 'qun_4.png', 'qun_2.png'];
	 var i=0;
	 var newImg=[];
	 for(i=0;i<aSrc.length;i++)
	 {
		preLoadImg(i);
	 }
	 function preLoadImg(i)
	 {
		newImg[i]=new Image();
		newImg[i].src=aSrc[i];
		
	 }
	 
	 //图片建立
	 var changeNumber=-1;	
	 function moveBegin(x,y)
	 {
		changeNumber++;
		var index=changeNumber%5;
		changeNumber = index;                    //每五次循环一个图
 		createImg(x,y,index);
	 }
	 /*var changeNumber=0;		不知为何这样卡一些
	 function moveBegin(x,y)
	 {
		var index=changeNumber%5;	//每五次循环一个图	
		changeNumber = index;	
		changeNumber++;

 		createImg(x,y,index);
	 }*/
	 function createImg(x,y,index)
	 {	
		var oImg=document.createElement('img');
		oImg.src=aSrc[index];
		
		oImg.style.left=x+'px';                       //建立图片坐标
		oImg.style.top=y+'px';
		oImg.style.position='absolute';
	
		document.body.appendChild(oImg);		//放入body中
		
		roll(oImg);                             //图片缩小
	 }
	 
	 function otherMove()                    //手动操作
	 {
		document.onmousedown=function()
		{
			document.onmousemove=function(event)
			{
				var manualX=event.clientX-50;    
				var manualY=event.clientY-50;
				if(manualX<=0)                   //限制范围
				{
					manualX=0;
				}
				else if(manualX>=borderX-SIZE)
				{
					manualX=borderX-SIZE;
				}
				
				if(manualY<=0)
				{
					manualY=0;
				}
				else if(manualY>=borderY-SIZE)
				{
					manualY=borderY-SIZE;
				}
				
				moveBegin(manualX,manualY);          //开始移动
			}
			
			document.onmouseup=function()
			{
				document.onmousemove=null;
				document.onmouseup=null;
			}
			
			return false;
		}
	 }
	 otherMove();	//一开始是手动移动
	 // 翻滚吧
	 function roll(obj)                             //图片缩小清除
	 {	
		obj.timer=setInterval(function(){

			obj.style.width=obj.offsetWidth - 10 + 'px';
			obj.style.height=obj.offsetWidth - 10 + 'px';
			if(tempX==0 && tempY==0)
			{
				clearInterval(obj.timer);
				document.body.removeChild(obj);
			}
		},30)
	 }
	
}