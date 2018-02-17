$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })
    (document.createElement('div'));

    this.css({opacity: 1}).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
// $.fn.extend({
//     animateCss: function (animationName) {
//         var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//         this.css({opacity: 1}).addClass('animated ' + animationName).one(animationEnd, function() {
//             $(this).removeClass('animated ' + animationName);
//         });
//     }
// });

function redDot() {
	var rows = $(".platform .items > .row"),
		redCont = $(".red_dot"),
		cont = $(redCont).find('.cont');

	var n = $(rows).length, maxPos = $(rows).eq(n-1).position().top;
	
	$(redCont).height(maxPos + 40);
	$(cont).eq(n-1).css({top: maxPos + 10});

	for(var i = 1; i < n; i++) {
		var pos = $(rows).eq(i).position().top;
		$(cont).eq(i).css({top: pos + 10});
	}
}

function myAnim(anim) {
	var els = $('[data-js-animation="'+ anim + '"]');

	$(els).each(function () {
		if(!$(this).hasClass("STOP-EFFECT") && $(this).is(":in-viewport")) {
			$(this).addClass("STOP-EFFECT");
			$(this).animateCss(anim);
		}
		
	});

}
redDot();

$(document).scroll(function () {
	myAnim('bounceInUp');
	myAnim('bounceInLeft');
	myAnim('bounceInRight');
});