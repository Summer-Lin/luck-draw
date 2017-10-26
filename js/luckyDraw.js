+function ($) {
  $.fn.luckyDraw = function (options) {
    if (this.length == 0) return this;
    if (this.length > 1) {
      this.each(function () {
        $(this).luckyDraw(options);
      })
      return this;
    }
    initLotto(this, options);
  };

  function initLotto(item, options) {
    var defaults = {
      index: 0,//开始索引
      speed: 15,//旋转速度
      count: 11,//总共有12个奖品,从0开始数起
      timer: 0,//计数器
      loop:3,//循环旋转次数
      prize: Math.floor(Math.random() * (11 + 1)),//中奖位置
      times:0,
      callback:function () {}
    };
    var opts = $.extend({}, defaults, options);


    var _self = $(item);

    var lotto = {
      init: function () {
        var $awards = _self.find('.awards');
        var awardsLength = $awards.length;
        if (awardsLength > 0) {
          // 清除掉之前的背景
          _self.find('.awards').removeClass('active');
          _self.find('.award-' + opts.index).addClass('active');
        }
      },
      changeActive: function () {
        _self.find('.award-' + opts.index).removeClass('active');
        opts.index++;
        if (opts.index > opts.count) {
          opts.index = 0;
        }
        _self.find('.award-' + opts.index).addClass('active');
      },
      loop:function () {
        opts.times ++;
        var _length = opts.loop * opts.count;
        if(opts.times > _length && opts.prize == opts.index ) {
          clearTimeout(opts.timer);
          opts.callback && opts.callback();
          return;
        }
        lotto.changeActive();
        if((opts.times + 20) > _length) {
          opts.speed +=10;
        }
        if((opts.times + 10) > _length) {
          opts.speed +=20;
        }
        if(opts.times > _length && Math.abs(opts.index-opts.prize ) <5){
          opts.speed +=100;
        }
        opts.timer = setTimeout(lotto.loop, opts.speed);
        return;
      }
    }
      // 初始化
      lotto.init();
    // 循环
      lotto.loop();
  }
}(jQuery);

