$(function(){
	$(".slider:eq(0)").Slider({
		show:2,
		autoPlay:false,
	});

	$(".slider:eq(1)").Slider({
		show:1,
		controlItem:false,			//小圆圈控制按钮
		controlBtn:false,	//左右控制按钮
		autoPlay:true,		//自动播放
		time:1000,				//自动滚动周期
	});
});
