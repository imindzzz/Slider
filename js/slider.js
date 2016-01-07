$(function(){
	var Slider = function (option){
		$(this).each(function(){
			new Slider.fn.init($.extend({},{
				elem:this,
			},option));
		});
		return this;
	}

	Slider.fn = Slider.prototype = {
		init:function(option){
			//合并默认参数
			var config = $.extend({},{
				controlItem:true, //是否生成小圆圈控制按钮
				controlBtn:true,//是否生成next prve左右控制按钮
				show:1, //一屏显示的item个数
				autoPlay:true,//是否自动滚动
				time:1000,//自动滚动周期
				lock:false, // 是否锁定不让滚动
			},option);
			var slider = this;

			//如果还没有初始化就初始化,否则返回之前初始化的对象
			if( !$(config.elem).data("slider") ){
				slider.config  = config;
				slider.$elem = $(slider.config.elem);
				slider.$items = slider.$elem.find(">.items")
				slider.$item = slider.$items.find(">.item");
				slider.count = Math.ceil(slider.$item.length/slider.config.show);//计算共有几屏内容
				slider.index = 0; //当前显示的是第几屏
				slider.$items.css("width",slider.count*100+"%");
				slider.$item.css("width",(100/slider.count/slider.config.show)+"%");

				slider.buildControl();

				//自动滚动
				if(slider.config.autoPlay){
					setInterval(function(){
						slider.next();
					},slider.config.time);
				}

				slider.$elem.data("slider",slider);
			}else{
				slider = $(config.elem).data("slider");
			}

			return slider;
		},

		//生成控制按钮
		buildControl:function(){
			var slider = this;

			//如果只有一屏,就没有必要生成控制按钮了
			if(slider.count == 1 ){
//				return false;
			}

			//是否生成小圆圈控制按钮
			if(slider.config.controlItem){
				slider.$controlItem = $("<div class='control'></div>");
				slider.$control_items = $("<div class='items'></div>");
				for (var i = 0;i<slider.count;i++) {
					var $item = $("<div class='item'></div>");
					if(i == slider.index ){
						$item.addClass("active");
					}
					$item.bind("click",{index:i},function(event){
						slider.go(event.data.index);
					});
					slider.$control_items.append($item);
				}
				slider.$controlItem.append(slider.$control_items);
				slider.$elem.append(slider.$controlItem);
			}

			//是否生成上一屏 下一屏按钮
			if(slider.config.controlBtn){
				slider.$prev = $("<div class='controlBtn prev'><</div>");
				slider.$prev.bind("click",function(){
					slider.prev();
				});
				slider.$elem.append(slider.$prev);

				slider.$next = $("<div class='controlBtn next'>></div>");
				slider.$next.bind("click",function(){
					slider.next();
				});
				slider.$elem.append(slider.$next);
			}
		},

		//滚动到某屏
		go:function(index){
			var slider = this;
			if(slider.config.lock == true){
				console.log("锁定状态,不能移动");
				return false;
			}else{
				slider.config.lock = true;
				slider.index = index;
			}
			//如果有小圆圈控制按钮
			if(slider.config.controlItem){
				slider.$control_items.find(".item").removeClass('active')
				slider.$control_items.find(".item").eq(index).addClass('active');
			}
			slider.$items.animate({
				left: -index*100 +"%",
			},500,function(){
				slider.config.lock = false;
			});
		},

		//上一屏
		prev:function(){
			var  index = this.index -1;
			if(index < 0){
				index = this.count-1;
			}
			this.go(index);
		},

		//下一屏
		next:function(){
			var  index = this.index +1;
			if(index >= this.count){
				index = 0;
			}
			this.go(index);
		},
	};

	Slider.fn.init.prototype = Slider.fn;
	$.fn.extend({Slider:Slider});
});
