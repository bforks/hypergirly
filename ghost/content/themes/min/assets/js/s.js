$(document)
.ready( function()
{

	//		General
	//		Windows
	//		Mobile
	//		Internet Explorer 8
	//		Internet Explorer 9
	//		Responsive menu
	//		Twitter
	//		Lightbox
	//		Remove "Read more"
	//		Ellipsis
	//		Masonry
	//		Keyboard navigation
	//		Prevent empty search
	//		Pin it buttons
	//		Tweet this interaction
	//		Facebook-share interaction
	//		Pin it interaction
	//		Footer Randomisation
	//		Activate Google Analytics again, after scrolling
	

	//		General

	var t_page_status = '';

	var t_device_status = '';

	var c_window_width = $(window).width();
	var c_window_height = $(window).height();
	var c_window_scrolltop = 0;


	//		Windows

	if ( navigator.userAgent.match('Windows NT') )
	{
		$('body')
		.addClass('windows');
	}


	//		Mobile

	///		Thanks to: http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/

	var isMobile =
	{
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};

	if ( isMobile.any() )
	{
		t_device_status = 'mobile';

		$('body')
		.addClass('mobile');
	}


	//		Internet Explorer 8

	if ( $.browser.msie && $.browser.version < 9 ) 
	{
		$('body')
		.addClass('ie_lt_9');
	}


	//		Internet Explorer 9

	if ( $.browser.msie && $.browser.version < 10 ) 
	{
		$('input, textarea')
		.each( function()
		{
			if ( ! $(this).hasClass('text') )
			{
				$(this)
				.addClass('placeholder')
				.val($(this).attr('placeholder'));
			}
		});

		$('input, textarea')
		.live(
		{
			'focusin': function()
			{
				if ( $(this).val() == $(this).attr('placeholder') )
				{
					$(this)
					.val('')
					.removeClass('placeholder');
				}
			},
			'focusout': function()
			{
				if ( $(this).val() == '' )
				{
					$(this)
					.val($(this).attr('placeholder'))
					.addClass('placeholder');
				}
			}
		});
	}


	//		Responsive Menu

	$('#menu1')
	.live(
		{
			'click': function()
			{
				if ( $(window).width() < 550 )
				{
					if ( ! $('#menu1').hasClass('expanded') )
					{
						$('#menu1')
						.addClass('expanded');
					}
					else if ( $('#menu1').hasClass('expanded') && ! $('#h_searchform input').is(":focus") )
					{
						$('#menu1')
						.removeClass('expanded');
					}
				}
			}
		}
	);
	

	//		Twitter
	
	$('.twitter')
	.each( function() {
		var d_this = this;

		$.getJSON('/twitter/', function(data)
		{
			var h_tweet = '';
			var i_tweet_links = 0;
			var h_tweets = '';
			var i_tweets = 0;
			
			if ( data.errors === undefined )
			{
				while ( i_tweets < data.length )
				{
					h_tweet = data[i_tweets].text;
			
					h_tweet = h_tweet.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) 
					{
	                    if ( data[i_tweets].entities.urls[i_tweet_links] !== undefined )
	                    {
	                        i_tweet_links = i_tweet_links + 1;

	                        return '<a href="'+data[i_tweets].entities.urls[(i_tweet_links-1)].expanded_url+'" title="'+data[i_tweets].entities.urls[(i_tweet_links-1)].expanded_url+'">'+data[i_tweets].entities.urls[(i_tweet_links-1)].display_url+'</a>';
	                    }
	                    else
	                    { 
	                        return '<a href="'+url+'" title="'+url+'">'+url+'...</a>';
	                    }
					})
					.replace(/@([_a-z0-9]+)/ig, function(reply)
					{
						return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
					})
					.replace(/#([_a-z0-9]+)/ig, function(reply)
					{
						return  reply.charAt(-1)+'<a href="http://twitter.com/#!/search/%23'+reply.substring(1)+'">'+reply.substring(0)+'</a>';
					});

					h_tweet_month = data[i_tweets].created_at.substr(4,3).replace(/[a-z]{3}/i, function(month)
					{
						if ( month == 'Jan' )
						{
							return '01';
						}
						else if ( month == 'Feb' )
						{
							return '02';
						}
						else if ( month == 'Mar' )
						{
							return '03';
						}
						else if ( month == 'Apr' )
						{
							return '04';
						}
						else if ( month == 'May' )
						{
							return '05';
						}
						else if ( month == 'Jun' )
						{
							return '06';
						}
						else if ( month == 'Jul' )
						{
							return '07';
						}
						else if ( month == 'Aug' )
						{
							return '08';
						}
						else if ( month == 'Sep' )
						{
							return '09';
						}
						else if ( month == 'Oct' )
						{
							return '10';
						}
						else if ( month == 'Nov' )
						{
							return '11';
						}
						else if ( month == 'Dec' )
						{
							return '12';
						}
					});
				
					h_tweets = h_tweets + '<li>' + h_tweet + '<span class="time">'+data[i_tweets].created_at.substr(26,4)+'.'+h_tweet_month+'.'+data[i_tweets].created_at.substr(8,2)+' '+data[i_tweets].created_at.substr(11,5)+'</span></li>';
				
					i_tweet_links = 0;
					i_tweets++;
				}
			
				$('#twitter').html(h_tweets);
			}
		}); 
	});


	//		Lightbox


	if ( $('body').hasClass('single') && $('.entry-image-link:first').hasClass('entry-image-link') )
	{
		var l_images = new Array();
		var l_img_width = 0;
		var l_img_height = 0;
		var l_images_i = 0;
		var l_current_image_i = 0;

		$('.entry-image-link')
		.each( function(i, value)
		{
			$(this)
			.attr('lnumber', i);

			l_images[i] = new Array();
			l_images[i]['url'] = $(this).attr('href');

			l_images_i = i;
		});

		$('body')
		.append('<div id="l_bg" class="l_bg">&nbsp;</div><div class="l" id="l"><span class="l_image"><img id="l_img"/></span> <span class="l-pn"><a id="l-pn-prev">&#060;</a> <a id="l-pn-next">&#062;</a></span></div><img id="l_img_preload" class="l_img_preload" src="'+l_images[0]['url']+'"/>');


		var c_l_right_left = 0;
		var c_l_top_bottom = 0;

		function l_img_alignment()
		{
			c_l_right_left = ( c_window_width - l_img_width ) / 2;
			c_l_top_bottom = ( c_window_height - l_img_height ) / 2;

			if ( c_l_right_left < 41 || c_l_top_bottom < 41 )
			{
				if ( c_l_right_left < c_l_top_bottom )			//	if there's more height than width
				{
					l_img_height_dynamic = ( ( c_window_width - 82 ) / l_img_width ) * l_img_height;
					l_img_width_dynamic = c_window_width - 82;

					c_l_right_left = ( c_window_width - l_img_width_dynamic ) / 2;
					c_l_top_bottom = ( c_window_height - l_img_height_dynamic ) / 2;
				}
				else if ( c_l_right_left > c_l_top_bottom )		//	if there's more width than height
				{
					l_img_width_dynamic = ( ( c_window_height - 82 ) / l_img_height ) * l_img_width;
					l_img_height_dynamic = c_window_height - 82;

					c_l_right_left = ( c_window_width - l_img_width_dynamic ) / 2;
					c_l_top_bottom = ( c_window_height - l_img_height_dynamic ) / 2;
				}
			}

			$('#l')
			.css({top:c_l_top_bottom, right:c_l_right_left, bottom:c_l_top_bottom, left:c_l_right_left});
		}

		function l(i, type)
		{

			if ( type == 'appear' )
			{
				l_current_image_i = i;

				t_page_status = 'l';

				if ( t_device_status == 'mobile' )
				{
					c_window_scrolltop = $('body').scrollTop();

					$('html, body')
					.animate({scrollTop:0}, 450);
				}

				$('#l_bg')
				.css({opacity:0})
				.addClass('active')
				.animate({opacity:0.9}, 250, function()
				{
					$('#l_bg')
					.addClass('load')
					.attr('style','');
				});

				$('#l')
				.css({opacity:0})
				.addClass('active');

				$('#l_img')
				.attr( 'src', l_images[l_current_image_i]['url'])
				.load( function()
				{
					l_img_width = $('#l_img').width();
					l_img_height = $('#l_img').height();

					l_img_alignment();

					setTimeout( function()
					{
						$('#l')
						.removeClass('load')
						.animate({opacity:1}, 250);
					
						$('#l_bg')
						.removeClass('load');
					}, 450);
				});
			}
			else if ( type == 'disappear' )
			{
				t_page_status = '';

				if ( t_device_status == 'mobile' )
				{
					$('html, body')
					.animate({scrollTop:c_window_scrolltop}, 650);
				}

				$('#l_bg, #l')
				.animate({opacity:0}, 155, function()
				{
					$('#l_bg, #l')
					.removeClass('active');

					$('#l_img')
					.attr('src','');
				});
			}
			else if ( type == 'prev' || type == 'next' )
			{
				$('#l_bg')
				.addClass('load');

				if ( type == 'prev' )
				{
					l_current_image_i = l_current_image_i - 1;

					if ( l_current_image_i < 0 )
					{
						l_current_image_i = l_images_i;
					}
				}
				else if ( type == 'next' )
				{
					l_current_image_i++;

					if ( l_current_image_i > l_images_i)
					{
						l_current_image_i = 0;
					}
				}

				$('#l')
				.animate({opacity:0}, 155, function()
				{
					$('#l')
					.addClass('load');

					$('#l_img')
					.attr( 'src', l_images[l_current_image_i]['url'])
					.load( function()
					{
						l_img_width = $('#l_img').width();
						l_img_height = $('#l_img').height();

						l_img_alignment();

						setTimeout( function()
						{
							$('#l')
							.animate({opacity:1}, 250);
						
							$('#l_bg, #l')
							.removeClass('load');
						}, 450);
					});
				});
			}
		}


		$('.entry-image-link')
		.click( function()
		{
			l( parseInt($(this).attr('lnumber')), 'appear' );

			if ( typeof _gaq != 'undefined' )
			{
				_gaq.push(['_trackEvent', 'Lightbox', 'Appear']);
			}

			return false;
		});


		$('#l-pn-prev')
		.click( function()
		{
			l( l_current_image_i, 'prev' );

			if ( typeof _gaq != 'undefined' )
			{
				_gaq.push(['_trackEvent', 'Lightbox', 'Previous image']);
			}
		});


		$('#l-pn-next, #l_img')
		.click( function()
		{
			l( l_current_image_i, 'next' );

			if ( typeof _gaq != 'undefined' )
			{
				_gaq.push(['_trackEvent', 'Lightbox', 'Next image']);
			}
		});


		$('#l_bg')
		.click( function()
		{
			l( 0, 'disappear' );

			if ( typeof _gaq != 'undefined' )
			{
				_gaq.push(['_trackEvent', 'Lightbox', 'Disappear']);
			}
		});
		
	}




	//		Keyboard navigation


	///		Check for focused form elements

	var b_focus = false;

	$('input, textarea')
	.focusin( function()
	{
		b_focus = true;
	});

	$('input, textarea')
	.focusout( function()
	{
		b_focus = false;
	});


	///		"Key up" detection

	$(window)
	.keyup( function(key)
	{

		if ( b_focus == false )
		{


			////	Lightbox
			
			if ( t_page_status == 'l' ) {
				if ( key.which == 27 ) {			//	ESC
					l( 0, 'disappear' );
				}
				else if ( key.which == 39 ) {		//	Left arrow
					l( l_current_image_i, 'prev' );
				}
				else if ( key.which == 37 ) {		//	Right arrow
					l( l_current_image_i, 'next' );
				}
			}
			

			////	Normal
			
			if ( t_page_status == '' )
			{
				if ( key.which == 27 && key.which == 72 && key.which == 77 ) {						//	ESC || h || m
					 document.location = '/';
				}
				else if ( key.which == 39 && $('#s-prev a').attr('href') !== undefined ) {			//	Left arrow
					document.location = $('#s-prev a').attr('href');
				}
				else if ( key.which == 37 && $('#s-next a').attr('href') !== undefined ) {			//	Right arrow
					document.location = $('#s-next a').attr('href');
				}
				else if ( key.which == 76 && $('body').hasClass('single') ) {						//	l
					console.log('l')
					l( 0, 'appear' );
				}
			}

		}
		
	});


	//		Remove "Read more"

	$('.b-entry-text p:last span')
	.each( function()
	{
		if ( $(this).attr('id').substr(0,4) == 'more' )
		{
			$(this).parent('p')
			.remove();
		}
	});


	//		Masonry

	c_entry_content_width = $('#content').width();

	if ( parseInt(c_entry_content_width/2) != (c_entry_content_width/2) )
	{
		c_entry_content_width++;
	}

	$('#b-masonry')
	.css({width:c_entry_content_width});

	var container = $('#b-masonry');
	
	container.imagesLoaded(
	function()
	{
		container.masonry({
		itemSelector : '.b-50, .b-33, .b-25',
		columnWidth : $('#entry-content').width() / 2
		});
	});

	$(window)
	.resize( function()
	{
		c_window_width = $(window).width();
		c_window_height = $(window).height();

		if ( t_page_status = 'l' )
		{
			l_img_alignment( );
		}

		c_entry_content_width = $('#content').width();
		if ( parseInt(c_entry_content_width/2) != (c_entry_content_width/2) ) { c_entry_content_width++;  }

		$('#b-masonry')
		.css({width:c_entry_content_width});

		var container = $('#b-masonry');
		container.imagesLoaded(
		function()
		{
			container.masonry({
			itemSelector : '.b-50, .b-33, .b-25',
			columnWidth : $('#entry-content').width() / 2
			});
		});
	});


	//		Ellipsis

	$('.b-ellipsis')
	.ellipsis({
		live: true
	});


	//		Prevent empty searches

	$('#s-s')
	.click( function()
	{
		if ( $('#s').val() == '' )
		{
			return false
		}
	});


	//		Pin it buttons

	if ( $('body').hasClass('single') )
	{
		setTimeout( function()
		{
			var encoded_url = encodeURIComponent($('.entry-title a').attr('href'));
			var encoded_description = encodeURIComponent($('.b-entry-text p').first().text());

			$('.entry-image, .entry-header-image')
			.each( function(){

				var encoded_media = encodeURIComponent($(this).children('p').children('a').attr('href'));

				$(this).children('p').first()
				.append('<a class="pin-it" href="http://pinterest.com/pin/create/button/?url='+encoded_url+'&media='+encoded_media+'&description='+encoded_description+'" title="Pin it" target="_blank">Pin it</a>');
			});

		}, 380);
	}


	//		Tweet this interaction
	
	$('.tweet-this').live(
	{
		'click': function()
		{
			window.open($(this).attr('href'),"_blank","toolbar=no, width=826, height=380");

			return false;
		}
	});


	//		Facebook share interaction
	
	$('.facebook-share').live(
	{
		'click': function()
		{
			window.open($(this).attr('href'),"_blank","toolbar=no, width=650, height=450");

			return false;
		}
	});


	//		Pin it interaction

	$('.pin-it').live(
	{
		'click': function()
		{
			window.open($(this).attr('href'),"_blank","toolbar=no, width=650, height=450");

			return false;
		}
	});


	//		Footer Randomisation

	function shuffle(o)
	{
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

	var a_footer = new Array;

	$('.f .b-50-b')
	.each( function(i)
	{
		a_footer[i] = $(this).html();
	});

	a_footer = a_footer.sort(function() { return 0.5 - Math.random();});

	var i = 0;

	while (i < 4)
	{
		$($('#b-50-b-'+i).html(a_footer[i]))

		i++;
	}


	//		Activate Goolge Analytics again

	setTimeout( function()
	{
		window.onscroll = function() 
		{
			window.onscroll = null;
			if ( typeof _gaq != 'undefined' )
			{
				_gaq.push(['_trackEvent', 'Activity', 'Reading (scrolling)']);
			}
		}
	}, 5000);

	$('.s-share a')
	.click( function()
	{
		if ( typeof _gaq != 'undefined' )
		{
			_gaq.push(['_trackEvent', 'Social media', 'Click', $(this).text()]);
		}
	});

	$('.f a')
	.click( function()
	{
		if ( typeof _gaq != 'undefined' )
		{
			_gaq.push(['_trackEvent', 'Sponsor', 'Click', $(this).attr('title')]);
		}
	});

});