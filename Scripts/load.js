// save the original function object
var _superScrollSpy = $.fn.scrollspy;

// add a array of id's that need to be excluded
$.extend(_superScrollSpy.defaults, {
    excluded_ids: ['#themer', '#contactemail']
});

// create a new constructor
var ScrollSpy = function (element, options) {
    _superScrollSpy.Constructor.apply(this, arguments)
}

// extend prototypes and add a super function
ScrollSpy.prototype = $.extend({}, _superScrollSpy.Constructor.prototype, {
    constructor: ScrollSpy
    , _super: function () {
        var args = $.makeArray(arguments)
        // call bootstrap core
        _superScrollSpy.Constructor.prototype[args.shift()].apply(this, args)
    }
    , activate: function (target) {
        //if target is on our exclusion list, prevent the scrollspy to activate
        if ($.inArray(target, this.options.excluded_ids) > -1) {
            return
        }
        this._super('activate', target)
    }
});

// override the old initialization with the new constructor
$.fn.scrollspy = $.extend(function (option) {
    var args = $.makeArray(arguments),
    option = args.shift()

    //this runs everytime element.scrollspy() is called
    return this.each(function () {
        var $this = $(this)
        var data = $this.data('scrollspy'),
            options = $.extend({}, _superScrollSpy.defaults, $this.data(), typeof option == 'object' && option)

        if (!data) {
            $this.data('scrollspy', (data = new ScrollSpy(this, options)))
        }
        if (typeof option == 'string') {
            data[option].apply(data, args)
        }
    });
}, $.fn.scrollspy);


function scrollTo(id) {
    if ($(id).length)
        $('html,body').animate({ scrollTop: $(id).offset().top }, 'slow');
}

$(function () {
    $("[data-spy='scroll']").scrollspy({
        excluded_ids: ['#themer', '#contactemail'],
        offset: 150
    });

    $('#menu a').not('[data-toggle]').click(function (e) {
       e.preventDefault();
       scrollTo($(this).attr('href'));
    });

    // main menu -> submenus
    $('#menu .collapse').on('show', function () {
        $(this).parents('.hasSubmenu:first').addClass('active');
    })
	.on('hidden', function () {
	    $(this).parents('.hasSubmenu:first').removeClass('active');
	});

    $('.navbar.main #menu > li').on('mouseleave', function () {
        $('#menu .menu').not('.hide').addClass('hide');
    });

    // main menu visibility toggle
    $('.btn-navbar.main').click(function () {
        $('.container:first').toggleClass('menu-hidden');
        $('#menu').toggleClass('hidden-phone');

        // if (typeof masonryGallery != 'undefined')
        //     masonryGallery();
    });

    // tooltips
    $('[data-toggle="tooltip"]').tooltip();

    $(window).resize(function () {
        if (!$('#menu').is(':visible') && !$('.container:first').is('menu-hidden'))
            $('.container:first').addClass('menu-hidden');
    });

    $(window).resize();

 



    if ($('.progress').length) {
        $.each($('.progress'), function (k, v) {
            var b = $(this).find('.bar');
            b.width(b.attr('data-width'));
        });
    }

    var encEmail = "cGF2b2xAZGVja3kuZXU=";
    const form = document.getElementById("contactemail");
    form.setAttribute("href", "mailto:".concat(atob(encEmail)));

});