(function($, Drupal, drupalSettings) {
    $(document).ready(function() {

        if ($('.sections').length) {
            initBackgrounds();
            homeWaypoint.setAnimations();
        }

        keyFactsFade.init();
        $(window).resize(function() {
            keyFactsFade.onResize();
        });

        $('.play-video, .play-video-mobile').click(function(e) {
            e.preventDefault();
            $('.section.hero').addClass('on-top');
            $('.video-player').removeClass('not-visible');
            $('.video-player video')[0].play();
        });
        $('.video-player-close').click(function(e) {
            e.preventDefault();
            $('.video-player').addClass('not-visible');
            $('.video-player video')[0].pause();
            $('.section.hero').removeClass('on-top');
        });

        setTopPlayVideoMobile.init();

        setTimeout(function() {
            $('.search').addClass('label-def');
        }, 4000);
    });

    var setTopPlayVideoMobile = {
        setTop: function() {
            $('.play-video-mobile').css('top', ($(window).outerHeight() - $('.play-video-mobile').outerHeight() - 10) + 'px');
        },

        init: function() {
            var _this = this;
            _this.setTop();
            $(window).resize(function() {
                _this.setTop();
            });
        }
    };


    var initBackgrounds = function() {
        $bkgContainer = $(".backgrounds");
        $bkgs = $(".sections .background");
        $bkgContainer.append($bkgs);

        $video = $bkgs.first(".background").find("video");
        if ($video.length) {
            $video.get(0).play();
        }
    };

    var homeWaypoint = {
        waypoints: [],

        animationOnStart: function() {
            this.waypoints.push(
                $('.sections').waypoint({
                    handler: function(direction) {
                        //console.log(this);
                        if (direction === 'down') {
                            //$('.search').addClass('not-visible'); sta in mainWaypoints
                            $('.euroland').addClass('not-visible');
                        } else {
                            //$('.search').removeClass('not-visible'); sta in mainWaypoints
                            $('.euroland').removeClass('not-visible');
                        }
                    },
                    offset: -20
                })
            );
        },

        changeBodyClass: function(destination) {
            var bodyColorClass = destination.attr('data-color');
            if (bodyColorClass === 'dark') {
                $('body').addClass('color-dark');
            } else {
                $('body').removeClass('color-dark');
            }
        },

        showOnEnter: function(obj) {
            var _thisWp = this;
            var index = $(obj.element).hasClass('section') ? $('.sections .section').index($(obj.element)) : $('.sections .section').index($(obj.element).parents('.section'));
            $('.backgrounds .background:eq(' + (index - 1) + ')').removeClass('active').addClass('exit');
            $('.backgrounds .background:eq(' + index + ')').addClass('active');
            var origin = $('.sections .section:eq(' + (index - 1) + ')');
            var destination = $('.sections .section:eq(' + index + ')');
            if (destination.hasClass('normal')) {
                destination.find('.section-content').removeClass('content-hidden');
            }
            _thisWp.changeBodyClass(destination);
        },

        showOnExit: function(obj) {
            var _thisWp = this;
            var index = $(obj.element).hasClass('section') ? $('.sections .section').index($(obj.element)) : $('.sections .section').index($(obj.element).parents('.section'));
            $('.backgrounds .background:eq(' + (index - 1) + ')').addClass('active').removeClass('exit');
            $('.backgrounds .background:eq(' + index + ')').removeClass('active');
            var origin = $('.sections .section:eq(' + index + ')');
            var destination = $('.sections .section:eq(' + (index - 1) + ')');
            if (origin.hasClass('normal')) {
                origin.find('.section-content').addClass('content-hidden');
            }
            _thisWp.changeBodyClass(destination);
        },

        animationBackgrounds: function() {
            var _thisWp = this;
            $('.sections .section.hero h1, .sections .section.full h1').each(function() {
                var elt = this;
                _thisWp.waypoints.push(
                    new Waypoint.Inview({
                        element: $(elt)[0],
                        enter: function(direction) {
                            if (direction === 'down') {
                                _thisWp.showOnEnter(this);
                            }
                        },
                        exited: function(direction) {
                            if (direction === 'up') {
                                _thisWp.showOnExit(this);
                            }
                        }
                    })
                );
            });
            _thisWp.waypoints.push(
                new Waypoint.Inview({
                    element: $('.sections .section .wp-trigger')[0],
                    entered: function(direction) {
                        if (direction === 'down') {
                            _thisWp.showOnEnter(this);
                        }
                    },
                    exit: function(direction) {
                        if (direction === 'up') {
                            _thisWp.showOnExit(this);
                        }
                    }
                })
            );
        },

        animationTexts: function() {
            var _thisWp = this;
            $('.sections .section.full h1, .sections .section.full .text, .sections .section.full .cta, .sections .section.full .key-facts').each(function() {
                var elt = this;
                _thisWp.waypoints.push(
                    new Waypoint.Inview({
                        element: $(elt)[0],
                        entered: function(direction) {
                            if ($(this.element).height()) {
                                $(this.element).removeClass('not-visible');
                            }
                            //console.log('Entered triggered with direction ' + direction)
                        },
                    })
                );
            });
        },

        highlights: function() {
            this.waypoints.push(
                $('footer').waypoint({
                    handler: function(direction) {
                        $(".highlights").toggleClass("unstuck", (direction === 'down'));
                    },
                    offset: '100%'
                })
            );
        },

        setAnimations: function() {
            this.animationOnStart();
            this.animationBackgrounds();
            this.animationTexts();
            this.highlights();
        }

    };

    var keyFactsFade = {
        elements: [],
        layoutDesktopW: 992,
        intervals: [],
        intervalTime: 2500,

        setElements: function() {
            var _thisWp = this;
            $(".sections .section .key-facts").each(function() {
                if ($(this).find('.key-fact').length > 1) {
                    _thisWp.elements.push(this);
                }
            });
        },

        init: function() {
            this.setElements();
            this.animate();
        },

        onResize: function() {
            this.animate();
        },

        animate: function() {
            var _thisWp = this;
            if (_thisWp.elements.length) {
                $.each(_thisWp.elements, function(index, value) {
                    var _this = $(value);
                    if ($(window).width() >= _thisWp.layoutDesktopW && _thisWp.intervals.length) {
                        $.each(_thisWp.intervals, function(index, value) {
                            clearInterval(value);
                        });
                        _thisWp.intervals = [];
                        _this.find(".key-fact").show();
                        setTimeout(function() { //se c'è un interval già in corso ripeto lo show col timeout
                            _this.find(".key-fact").show();
                        }, 1500);
                    } else if ($(window).width() < _thisWp.layoutDesktopW && !_thisWp.intervals.length) {
                        _this.find(".key-fact:not(.active)").hide();
                        _thisWp.fade(_this);
                    }
                })
            }
        },

        fade: function(_this) {
            var _thisWp = this;
            var next;
            var interval = setInterval(function() {
                if (!_this.hasClass('not-visible')) {
                    var elt = _this.find(".key-fact.active");
                    elt.delay(1250).fadeOut(250).removeClass('active');
                    if (elt.next().length) {
                        next = elt.next();
                    } else {
                        next = _this.find(".key-fact:first");
                    }
                    next.delay(2250).fadeIn(250).addClass('active');
                }
            }, _thisWp.intervalTime);
            this.intervals.push(interval);
        }
    }
})(jQuery, window.Drupal, window.drupalSettings);