$( document ).ready(function() {

  var timer;
  var delay = 500;

  $('.base-button').hover(function() {
  	$('.circle').css("opacity", "1");
  	$('.circle').css("-webkit-transform", "scale(2.9)");
      timer = setTimeout(function() {
         $('.sub-button').css('visibility', 'visible');
         $('.sub-button').css('opacity', '.8');
      }, delay);
  }, function() {
      clearTimeout(timer);
  });

  $('.sub-button').hover(function() {
  	$(this).css('opacity', '1');
  	$(this).find('i').css('opacity', '1');
  },function() {
  	$(this).css('opacity', '.8');
  });

  $('.menu-container').mouseleave(function() {
     $('.circle').css("-webkit-transform", "scale(1)");
     timer = setTimeout(function() {
     		$('.sub-button').css('opacity', '0');
     		$('.circle').css("opacity", "0");
      }, delay);
     timer = setTimeout(function() {
     		$('.sub-button').css('visibility', 'hidden');
      }, delay + 300);
  });

  $('.sub-button.search').hover(function() {
    $('.circle-sub').css("opacity", "1");
    $('.circle-sub').css("-webkit-transform", "scale(2.9)");
  	timer = setTimeout(function() {
  		document.location.href = 'https://www.google.com';
  	}, delay + 1500);
  }, function() {
  	clearTimeout(timer);
    $('.circle-sub').css("-webkit-transform", "scale(1)");
    $('.circle-sub').css("opacity", "0");
  });

  $('.sub-button.new').hover(function() {
    $('.circle-sub').css("opacity", "1");
     $('.circle-sub').css("-webkit-transform", "scale(2.9)");
  	timer = setTimeout(function() {
  		OpenInNewTab('www.google.com');
  	}, delay + 1500);
  }, function() {
  	clearTimeout(timer);
    $('.circle-sub').css("-webkit-transform", "scale(1)");
    $('.circle-sub').css("opacity", "0");
  });

  $('.sub-button.star').hover(function() {
    $('.circle-sub').css("opacity", "1");
     $('.circle-sub').css("-webkit-transform", "scale(2.9)");
    timer = setTimeout(function() {
      //do nothing for now
    }, delay + 1500);
  }, function() {
    clearTimeout(timer);
    $('.circle-sub').css("-webkit-transform", "scale(1)");
    $('.circle-sub').css("opacity", "0");
  });

}); // end document.ready

function OpenInNewTab(url)
{
  var win=window.open(url, '_blank');
  win.focus();
}