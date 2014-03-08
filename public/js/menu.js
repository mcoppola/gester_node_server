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
  	$(this).find('i').css('color', '#00FFCC');
    $(this).find('i').css('text-shadow', '1px 1px #333');
  },function() {
  	$(this).css('opacity', '.8');
    $(this).find('i').css('color', '#333');
    $(this).find('i').css('text-shadow', 'none');
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
    $(this).find('.circle-sub').css("opacity", "1");
    $(this).find('.circle-sub').css("-webkit-transform", "scale(2.9)");
  	timer = setTimeout(function() {
  		//document.location.href = 'https://www.google.com';
  	}, delay + 1500);
  }, function() {
  	clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)");
    $(this).find('.circle-sub').css("opacity", "0");
  });

  $('.sub-button.new').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1");
    $(this).find('.circle-sub').css("-webkit-transform", "scale(2.9)");
  	timer = setTimeout(function() {
  		//OpenInNewTab('www.google.com');
  	}, delay + 1500);
  }, function() {
  	clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)");
    $(this).find('.circle-sub').css("opacity", "0");
  });

  $('.sub-button.star').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1");
    $(this).find('.circle-sub').css("-webkit-transform", "scale(2.9)");
    timer = setTimeout(function() {
      //do nothing for now
    }, delay + 1500);
  }, function() {
    clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)");
    $(this).find('.circle-sub').css("opacity", "0");
  });

}); // end document.ready

function OpenInNewTab(url)
{
  var win=window.open(url, '_blank');
  win.focus();
}