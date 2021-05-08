	var isBookinPageLoaded	=	false;
	var filePath	=	"https://my.setmore.com/";
	var initalFrameLoad			=	function()
	{
		jQuery('.iframe_loader').hide();
	    jQuery('#iframeContent').show();
	    
	    var fancyBoxHeight = $("#setmore-fancy-box").height();
	    var iframewindowHeight		=	jQuery(window).height();
	    
	    if(iframewindowHeight > fancyBoxHeight)
	    {
	    	$('#setmore-fancy-box-content').css('height', '635px');
	    }
	    else
	    {
	    	$('#setmore-fancy-box-content').css('height', iframewindowHeight-50);
	    }
	    
	}
	var setmorePopup    =    function(k,isReschedule,isbookAppointmentResource,e, bookingPageLink)
	{
		if( e )
		{
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}

		var windowWidth		=	jQuery(window).width();
		if( windowWidth < 600 )
		{
			window.open( bookingPageLink , '_blank' );
			return;
		}
		
		var bookingPageInfo = bookingPageLink.split("/");
		var isServicePage = bookingPageInfo.indexOf("services")!= -1;
		var isClassPage = bookingPageInfo.indexOf("class")!= -1;
		var isClassBooking = bookingPageInfo.indexOf("bookclass")!= -1;
		var isServiceBooking = bookingPageInfo.indexOf("bookappointment")!= -1;
		var isStaffPage = bookingPageInfo.indexOf("resourcebookingpage")!= -1;

		

			var templ		=	{};
			templ.overlay	=	'<div id="setmore-overlay"></div>';
			templ.popup		=	'<div id="setmore-fancy-box" style= " background-color: #FFFFFF;height: auto;left: 50%;position: absolute;top: 0;width: 545px;z-index: 9999;">'+
											'<div id="setmore-fancy-box-close-icon"></div>'+
											'<div id="setmore-fancy-box-content">'+
											'<div class="iframe_loader" style="position: absolute; left: 50%;top: 22%; -ms-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%)"><img src="https://storage.googleapis.com/setmore-assets/2.0/Images/Logos/setmore-loader.gif"></div>'+
											'<div id="iframeContent" style="height:100%;width:100%" ">'+
											'</div>'+
										'</div>';
			var	init	=	function(ck)
							{
								if( !isBookinPageLoaded )
								{
									isBookinPageLoaded	=	true;
									renderTempl();
								}
								else
								{
									loadIframe();
									positionPopup();
									showPopup();
								}
							};
			var renderTempl	=	function()
							{
								jQuery("body").append( templ.overlay ).append( templ.popup );
								positionPopup();
								loadIframe();
								bindEvents();
							};
		var loadIframe		=	function()
							{
								if(isReschedule)
								{
									if(isbookAppointmentResource=="true")
									{
										jQuery(".iframe_loader").show();
										jQuery("#iframeContent").hide();
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'rescheduleAppointment.do?cancellationKey='+k+'&isStaffBookingPage=true"></iframe>');
									}
								else
									{
										jQuery(".iframe_loader").show();
										jQuery("#iframeContent").hide();
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'rescheduleAppointment.do?cancellationKey='+k+'"></iframe>');
									}
								}
								else
								{
									jQuery(".iframe_loader").show();
									jQuery("#iframeContent").hide();
									
									if(isStaffPage){
										var staffIndex = bookingPageInfo.indexOf("resourcebookingpage");
										var staffKey = bookingPageInfo[staffIndex+1];
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/resourcebookingpage/'+staffKey+'"></iframe>');
									}
									else if(isServicePage){
										var serviceIndex = bookingPageInfo.indexOf("services");
										var serviceKey = bookingPageInfo[serviceIndex+1];
										if(serviceKey)
											jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/services/'+serviceKey+'"></iframe>');
										else
											jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe"  frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/services"></iframe>');
									}
									else if(isClassPage){
										var classIndex = bookingPageInfo.indexOf("class");
										var classKey = bookingPageInfo[classIndex+1];
										if(classKey)
											jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/class/'+classKey+'"></iframe>');
										else
											jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/class"></iframe>');
									}
									else if(isClassBooking){
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/bookclass"></iframe>');
									}
									else if(isServiceBooking){
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'/bookappointment"></iframe>');
									}
									else{
										jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="'+filePath+'bookingpage/'+k+'"></iframe>');
									}
									
								}
								document.getElementById("setmore-fancy-box-iframe").onload = function(){
									return initalFrameLoad();};
							};
		var bindEvents		=	function()
							{
								// var self	=	this;
								jQuery("#setmore-overlay , #setmore-fancy-box-close-icon").bind("click",function(){
									hidePopup();
								});
							};
		var positionPopup	=	function()
							{
								var windowHeight		=	jQuery(window).height();
								var windowScrollHeight	=	jQuery(document).height();
								var windowScrollTop		=	jQuery(document).scrollTop();
								var popupWidth			=	jQuery("#setmore-fancy-box").width();
								var popupHeight			=	windowHeight - 100;

								jQuery("#setmore-overlay").height( windowScrollHeight+"px" );
								jQuery("#setmore-fancy-box").css( { 'margin-left' : "-"+(popupWidth/2)+"px" , 'margin-top' : ( ( ( windowHeight - popupHeight ) / 2 ) + windowScrollTop ) +"px"  } );
								jQuery('html,body').css('overflow','hidden');
							};
		var	hidePopup	=	function()
							{
								jQuery("#setmore-overlay,#setmore-fancy-box").hide();
								jQuery('html,body').css('overflow','auto');
							};
		var	showPopup	=	function()
							{
								jQuery("#setmore-overlay,#setmore-fancy-box").show();
							}
			init(k);
	}

	// include required css file
	var loadCss	=	function()
	{
		var cssFilePath		=	'<link href="'+filePath+'css/setmorePopup.css" rel="stylesheet" type="text/css" />';

		var appendCssFiles	=	function()
	    {
	    	jQuery("head").append( cssFilePath );
	    	setTimeout( function(){
	    		loadSetmoreFancyBox();
	    	}, 600);

	    };

	    // Binding click event to the "a" tag. Added this to override the
        // FancyBox plugin
        
	    var loadSetmoreFancyBox	=	function()
	    {
	    	jQuery(".Setmore_button_iframe").on('click', function( e )
	    	{
	    		e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();

				var bookingPageLink	=	jQuery(this).attr("href");
				var companyKey		=	"";
				
				var bookingPageInfo = bookingPageLink.split("/");
				var isServicePage = bookingPageInfo.indexOf("services")!= -1;
				var isClassPage = bookingPageInfo.indexOf("class")!= -1;
				var isClassBooking = bookingPageInfo.indexOf("bookclass")!= -1;
				var isServiceBooking = bookingPageInfo.indexOf("bookappointment")!= -1;
				var isStaffPage = bookingPageInfo.indexOf("resourcebookingpage")!= -1;
				
				if(isStaffPage)
					companyKey = bookingPageInfo[bookingPageInfo.indexOf("resourcebookingpage")-1];
				else if(isServicePage)
					companyKey = bookingPageInfo[bookingPageInfo.indexOf("services")-1];
				else if(isClassPage)
					companyKey = bookingPageInfo[bookingPageInfo.indexOf("class")-1];
				else if(isClassBooking)
					companyKey = bookingPageInfo[bookingPageInfo.indexOf("bookclass")-1];
				else if(isServiceBooking)
					companyKey = bookingPageInfo[bookingPageInfo.indexOf("bookappointment")-1];
				else
					companyKey		=	bookingPageInfo[ bookingPageInfo.length - 1 ];
				
				
				if(companyKey.indexOf("?") != -1)
				{
					companyKey		=	companyKey.split("?")[0];
				}
				
				setmorePopup( companyKey ,false, false,e, bookingPageLink);
	    	});
	    };

		if( typeof jQuery !== "undefined" )
		{
			appendCssFiles();
		}
		else
		{
		    var script = document.createElement("SCRIPT");
		    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
		    script.type = 'text/javascript';
		    document.getElementsByTagName("head")[0].appendChild(script);

		    var checkReady = function(callback)
		    {
		        if (window.jQuery)
		        {
		            callback(jQuery);
		        }
		        else
		        {
		            window.setTimeout(function() { checkReady(callback); }, 100);
		        }
		    };

		    checkReady( function(jQuery)
		    {
		    	appendCssFiles();
		    	windowHeight = window.innerHeight;
		    });
		}
	}
	loadCss();