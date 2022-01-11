(function($, Drupal, drupalSettings) {

    var themeUrl;

    if (drupalSettings && drupalSettings.path.themeUrl) {
        themeUrl = drupalSettings.path.baseUrl + drupalSettings.path.themeUrl;
    } else {
        themeUrl = "..";
    }

    $(document).ready(function() {

        layoutVersion.init();

    });

    var layoutVersion = {
        width: 991,
        layout: null,

        isMobile: function() {
            if ($(window).width() <= this.width) {
                return true;
            }
            return false;
        },

        isDesktop: function() {
            if ($(window).width() > this.width) {
                return true;
            }
            return false;
        },

        resetDom: function() {
            $(window).scrollTop(0);
            $('.backgrounds .background').removeClass('active').first().addClass('active');
            $('.sections .section .section-content:not(:eq(0))').removeClass('not-visible-1').addClass('not-visible no-fixed');
            $('.sections .section .section-content:eq(0)').removeClass('not-visible-1 not-visible no-fixed');
            this.changeBodyClass($('.sections .section .section-content:eq(0)'));
            iconAnimation.reset();
        },

        changeBodyClass: function(section) {
            var bodyColorClass = section.attr('data-color');
            if (bodyColorClass == 'dark') {
                $('body').addClass('color-dark').removeClass('color-light');
            } else {
                $('body').addClass('color-light').removeClass('color-dark');
            }
        },

        checkLayout: function() {
            if (this.isMobile()) {
                this.layout = 'mobile';
            } else {
                this.layout = 'desktop';
            }
        },

        switchLayout: function() {
            var _this = this;
            if (_this.layout == 'mobile') {
                oVFullpage.destroy();
                _this.resetDom();
                oVWaypoint.active();
            } else {
                oVWaypoint.destroy();
                _this.resetDom();
                oVFullpage.active();
            }
        },

        checkSwitchLayout: function() {
            var _this = this;
            var lastLayout = _this.layout;
            _this.checkLayout();
            if (lastLayout != _this.layout) {
                _this.switchLayout();
            }
        },

        init: function() {
            var _this = this;
            _this.checkSwitchLayout();
            $(window).on('resize', function(e) {
                _this.checkSwitchLayout();
            });
        }
    };

    var iconAnimation = {
        iconAnimations: {},

        reset: function() {
            this.destroy();
            this.init();
        },

        destroy: function() {
            this.iconAnimations = {};
            $('.sections .section .icon').empty();
        },

        init: function() {
            var _this = this;
            _this.iconAnimations = {
                icon1: lottie.loadAnimation({
                    container: document.getElementById('icon1'),
                    path: themeUrl + '/images/our-values/animations/innovazione.json',
                    renderer: 'svg',
                    autoplay: false,
                }),

                icon2: lottie.loadAnimation({
                    container: document.getElementById('icon2'),
                    path: themeUrl + '/images/our-values/animations/passion.json',
                    renderer: 'svg',
                    autoplay: false,
                }),

                icon3: lottie.loadAnimation({
                    container: document.getElementById('icon3'),
                    path: themeUrl + '/images/our-values/animations/sostenibilita.json',
                    renderer: 'svg',
                    autoplay: false,
                }),

                icon4: lottie.loadAnimation({
                    container: document.getElementById('icon4'),
                    path: themeUrl + '/images/our-values/animations/multiculturalita.json',
                    renderer: 'svg',
                    autoplay: false,
                }),

                icon5: lottie.loadAnimation({
                    container: document.getElementById('icon5'),
                    path: themeUrl + '/images/our-values/animations/integrita.json',
                    renderer: 'svg',
                    autoplay: false,
                })
            };

        },

        getIconAnimation: function(element) {
            //element è una section
            var _this = this;
            var iconId = element.attr('data-icon');
            if (iconId) {
                var iconAnimation = _this.iconAnimations[iconId];
                var start = Number($('#' + iconId).attr('data-from'));
                var end = Number($('#' + iconId).attr('data-to'));
                var mid = start + ((end - start) / 2);
                return {
                    anim: iconAnimation,
                    start: start,
                    end: end,
                    mid: mid
                };
            }
            return false;
        }
    };

    var oVFullpage = {
        isActive: false,

        destroy: function() {
            if (this.isActive) {
                fullpage_api.destroy('all');
                this.isActive = false;
                $('.layout-sidebar .header').after($("#fullpage .footer .sidebar"));
                $('main').after($("#fullpage .footer footer"));
            }
        },

        active: function() {
            var _this = this;
            if (!_this.isActive) {
                $("footer").appendTo("#fullpage .footer");
                $(".sidebar").appendTo("#fullpage .footer");

                $('#fullpage').fullpage({
                    licenseKey: 'E2DDF37A-AD9B4111-B9EBEDE8-579D4A5F',
                    autoScrolling: true,
                    scrollOverflow: true,
                    scrollOverflowOptions: {
                        scrollbars: false
                    },
                    scrollBar: true,
                    navigation: true,
                    navigationPosition: 'right',
                    scrollingSpeed: 1500, //questo tempo deve essere la somma di tutte le animazioni in entrata e in uscita
                    //touchSensitivity: 15,
                    afterLoad: function(origin, destination, direction) {
                        //console.log('afterLoad destination '+destination.item.className);

                        if (!origin || (!$(origin.item).hasClass('footer') && !$(destination.item).hasClass('footer'))) {
                            //le azioni su bg e body class ci sono in afterLoad affinchè vengano eseguite se si parte non dalla prima sezione, se in onLeave affinchè vengano eseguite subito
                            //_this.enterAnimation(destination);

                        } else if (origin && $(origin.item).hasClass('footer')) {
                            $(destination.item).find('.section-content').removeClass('no-fixed');
                            $('#fp-nav').show();
                            $('.sidebar').removeClass('sticky');
                        }
                    },
                    onLeave: function(origin, destination, direction) {
                        //console.log('onLeave origin '+origin.item.className);

                        if (!$(origin.item).hasClass('footer') && !$(destination.item).hasClass('footer')) {
                            var iA = iconAnimation.getIconAnimation($(origin.item));
                            if (iA) {
                                /*iA.anim.onEnterFrame = function(event){
                                  if(event.currentTime>iA.end){
                                    iA.anim.pause();
                                  }
                                }
                                iconAnimation.anim.goToAndPlay(iA.mid, 1);*/
                                iA.anim.playSegments([iA.mid, iA.end], 1);
                            }

                            setTimeout(function() {
                                if (direction == 'down') {
                                    $(origin.item).find('.section-content').addClass('not-visible-1');
                                } else {
                                    $(origin.item).find('.section-content').addClass('not-visible');
                                }
                                setTimeout(function() {
                                    $(origin.item).find('.section-content').addClass('no-fixed');
                                }, 600);

                                var originBg = $('.backgrounds .background')[origin.index];
                                $(originBg).removeClass('active');

                                _this.enterAnimation(destination);
                            }, 500);

                        } else if ($(destination.item).hasClass('footer')) {
                            $(origin.item).find('.section-content').addClass('no-fixed');
                            $('#fp-nav').hide();
                            $('.sidebar').addClass('sticky');
                        }
                    },
                });
                _this.isActive = true;
            }
        },

        enterAnimation: function(destination) {
            var _this = this;
            var destinationBg = $('.backgrounds .background')[destination.index];
            $(destinationBg).addClass('active');

            layoutVersion.changeBodyClass($(destination.item));

            if ($(destination.item).hasClass('first')) {
                $('#fp-nav').hide();
            } else {
                $('#fp-nav').show();
            }

            setTimeout(function() {
                $(destination.item).find('.section-content').removeClass('no-fixed').removeClass('not-visible').removeClass('not-visible-1');
                var iA = iconAnimation.getIconAnimation($(destination.item));
                if (iA) {
                    /*iA.anim.onEnterFrame = function(event){
                      //console.log(event); //event.type, currentTime, totalTime, direction
                      if(event.currentTime>iA.mid){
                        iA.anim.pause();
                      }
                    }
                    iA.anim.goToAndPlay(iA.start, 1);*/
                    iA.anim.playSegments([iA.start, iA.mid], 1);
                }
            }, 500);
        },
    };

    var oVWaypoint = {
        waypoints: [],

        destroy: function() {
            var _this = this;
            $.each(_this.waypoints, function(index, value) {
                value.destroy();
            });
        },

        active: function() {
            var _this = this;
            $('.sections .section .section-content-icon').each(function() {
                var elt = $(this);
                _this.waypoints.push(
                    new Waypoint.Inview({
                        element: elt,
                        entered: function(direction) {
                            if (direction == 'down') {
                                var index = $('.sections .section').index($(this.element).parents('.section'));
                                if (index >= 0) {
                                    var origin = $('.sections .section:eq(' + (index - 1) + ')');
                                    var destination = $('.sections .section:eq(' + index + ')');
                                    console.log('Inview enter ' + index + ' ' + direction);

                                    var iA = iconAnimation.getIconAnimation(origin);
                                    if (iA) {
                                        iA.anim.playSegments([iA.mid, iA.end], 1);
                                    }

                                    $('.backgrounds .background:eq(' + (index - 1) + ')').removeClass('active');
                                    $('.backgrounds .background:eq(' + index + ')').addClass('active');
                                    origin.find('.section-content').addClass('not-visible-1');

                                    layoutVersion.changeBodyClass(destination);

                                    destination.find('.section-content').removeClass('not-visible').removeClass('not-visible-1');
                                    var iA = iconAnimation.getIconAnimation(destination);
                                    if (iA) {
                                        iA.anim.playSegments([iA.start, iA.mid], 1);
                                    }

                                    if (index) {
                                        $('#fp-nav-mobile').addClass('visible');
                                    } else {
                                        $('#fp-nav-mobile').removeClass('visible');
                                    }
                                    $('#fp-nav-mobile li.active').removeClass('active');
                                    $('#fp-nav-mobile li:eq(' + (index - 1) + ')').addClass('active');
                                }
                            }
                        },
                        exit: function(direction) {
                            if (direction == 'up') {
                                var index = $('.sections .section').index($(this.element).parents('.section'));
                                if (index >= 0) {
                                    var origin = $('.sections .section:eq(' + index + ')');
                                    var destination = $('.sections .section:eq(' + (index - 1) + ')');
                                    console.log('Inview exited ' + index + ' ' + direction);

                                    var iA = iconAnimation.getIconAnimation(origin);
                                    if (iA) {
                                        iA.anim.playSegments([iA.mid, iA.end], 1);
                                    }

                                    $('.backgrounds .background:eq(' + (index - 1) + ')').addClass('active');
                                    $('.backgrounds .background:eq(' + index + ')').removeClass('active');
                                    origin.find('.section-content').addClass('not-visible');

                                    layoutVersion.changeBodyClass(destination);

                                    destination.find('.section-content').removeClass('not-visible').removeClass('not-visible-1');
                                    var iA = iconAnimation.getIconAnimation(destination);
                                    if (iA) {
                                        iA.anim.playSegments([iA.start, iA.mid], 1);
                                    }

                                    if (index - 1) {
                                        $('#fp-nav-mobile').addClass('visible');
                                    } else {
                                        $('#fp-nav-mobile').removeClass('visible');
                                    }
                                    $('#fp-nav-mobile li.active').removeClass('active');
                                    $('#fp-nav-mobile li:eq(' + (index - 2) + ')').addClass('active');
                                }
                            }
                        },
                    })
                )
            });
        },
    }

})(jQuery, window.Drupal, window.drupalSettings);