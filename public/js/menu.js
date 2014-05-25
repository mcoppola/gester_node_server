$( document ).ready(function() {

  var timer;
  var delay = 500;

  $('.base-button').hover(function() {
  	$('.circle').css("opacity", "1");
  	$('.circle').css("-webkit-transform", "scale(2.9)");
      timer = setTimeout(function() {
         $('.sub-button').css('visibility', 'visible');
      }, delay);
  }, function() {
      clearTimeout(timer);
  });


  $('.sub-button').hover(function() {
  	$(this).css('opacity', '1');
  	$(this).find('i').css('color', '#00FFCC').css('text-shadow', '1px 1px #333');
  },function() {
    $(this).find('i').css('color', '#333').css('text-shadow', 'none');
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
        $('.sub-button').css('opacity', '0.8');
      }, delay + 100);
  });
  $('.sub-button.cog').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1").css("-webkit-transform", "scale(2.3)");
    timer = setTimeout(function() { 
      //document.location.href = 'https://www.google.com';
    }, delay + 700);
  }, function() {
    clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)").css("opacity", "0");
  });

  $('.sub-button.search').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1").css("-webkit-transform", "scale(2.3)");
  	timer = setTimeout(function() {
  		//document.location.href = 'https://www.google.com';
  	}, delay + 700);
  }, function() {
  	clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)").css("opacity", "0");
  });

  $('.sub-button.new').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1").css("-webkit-transform", "scale(2.3)");
  	timer = setTimeout(function() {
  		//OpenInNewTab('www.google.com');
  	}, delay + 1500);
  }, function() {
  	clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)").css("opacity", "0");
  });

  $('.sub-button.star').hover(function() {
    $(this).find('.circle-sub').css("opacity", "1").css("-webkit-transform", "scale(2.3)");
    timer = setTimeout(function() {
      //do nothing for now
    }, delay + 1500);
  }, function() {
    clearTimeout(timer);
    $(this).find('.circle-sub').css("-webkit-transform", "scale(1)").css("opacity", "0");
  });




  // New Tab Listener
  $('#button-newTab').click(function() {
    $.ajax({
        url: "/api",
        dataType: "json",
        data: {
            newTab: true
        },
        success: function(res) {
          console.log(res);
        }
    });
  });

}); // end document.ready

function OpenInNewTab(url)
{
  var win=window.open(url, '_blank');
  win.focus();
}

