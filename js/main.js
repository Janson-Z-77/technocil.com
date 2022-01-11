(function($, Drupal, drupalSettings) {

    $(document).ready(function() {

        /*var instagramSwiper = new Swiper('.box-instagram .swiper-container', {
          loop: true,
          pagination: {
            el: '.box-instagram .swiper-pagination',
          }
        });*/
        petrocil.initMenu();
        petrocil.listenerToggleMenu();
        petrocil.listenerToggleMenuEntry();
        petrocil.listenerToggleMenuEntryHover();
        petrocil.listenerTogglePrimarySecondMobile();
        petrocil.listenerToggleMenuEntryNoSecondLevel();
        petrocil.listenerTogglePageUnload();
        petrocil.closeModalListener();
        // petrocil.togglePageLoad();

        mainWaypoint.setAnimations();
        stickyAnchors.init();

        $('.open-fake-modal').click(function(e) {
            var targetHref = e.currentTarget.href;

            var currentLocation = window.location.pathname;
            var modalId = $(this).attr('id');
            var noClose = $(this).hasClass('no-close');

            if (window.location.search !== '' && !$(this).hasClass('no-parent-referral')) {
                var queryStringParams = petrocil.getParamsFromQueryString();

                if (queryStringParams.referral !== undefined) {
                    currentLocation = decodeURIComponent(queryStringParams.referral);
                }

                if (queryStringParams.modalId !== undefined) {
                    modalId = decodeURIComponent(queryStringParams.modalId);
                }
            }

            //      console.log(currentLocation);

            var queryParams = [];

            queryParams.push({
                param: 'referral',
                value: currentLocation
            });
            if (modalId) {
                queryParams.push({
                    param: 'modalId',
                    value: modalId
                });
            }

            var queryParamsString = queryParams.map(function(el) {
                return encodeURIComponent(el.param) + '=' + encodeURIComponent(el.value);
            }).join('&');

            if (targetHref.indexOf('?') == -1) {
                targetHref += '?' + queryParamsString;
            } else {
                targetHref += '&' + queryParamsString;
            }

            //      console.log(targetHref);
            e.preventDefault();

            if ($(this).hasClass('no-animation')) {
                window.location.href = targetHref;
            } else if ($(this).hasClass('custom-animation')) {
                setTimeout(function() {
                    window.location.href = targetHref;
                }, 350);
            } else {
                setTimeout(function() {
                    $('body').delay(500).addClass('fake-modal-open');
                }, 300);
                $('#fake-modal').addClass('open');
                if (noClose) {
                    $('#fake-modal').addClass('no-close');
                }
                setTimeout(function() {
                    window.location.href = targetHref;
                }, 500);
            }
        });

        if ($("#fake-modal").hasClass('open')) {
            $('#fake-modal').delay(200).fadeOut(500, function() {
                $('#fake-modal').removeClass('open');
            });
            setTimeout(function() {
                $('.curtains').removeClass('fake-modal-open');
                $('#fake-modal').show();
            }, 1000);
        }

        if ($(".layout-sidebar .header").length) {
            var headroom = new Headroom($(".layout-sidebar .header")[0]);
            headroom.init();
        }

        $('.bs-breadcrumbs .dots .dots-text').click(function() {
            $('.bs-breadcrumbs .dots').addClass('hover');
        })


        if (/[?&]open_menu=/.test(location.search)) {
            window.setTimeout(function() {
                petrocil.toggleMenu();
                var newLocation = location.origin + location.pathname;
                var params = location.search.slice(1).split('&');
                var newParams = [];
                for (var i = 0; i < params.length; i++) {
                    param = params[i].split('=');
                    if (param[0] != 'open_menu') {
                        newParams.push(params[i]);
                    } else {
                        if (param[1] != '1') {
                            setTimeout(function() {
                                var elt = $('.menu-entry[data-menu-first=' + param[1] + '] a');
                                if (elt.fireEvent) {
                                    elt.fireEvent('onmouseenter');
                                } else {
                                    var evObj = document.createEvent('Events');
                                    evObj.initEvent('mouseenter', true, false);
                                    elt[0].dispatchEvent(evObj);
                                }
                            }, 600);
                        }
                    }
                }
                if (newParams.length) {
                    newLocation += '?' + newParams.join('&');
                }
                newLocation += location.hash;
                window.history.replaceState(null, null, newLocation);
            }, 1000);
        }


        backToTop.init();

        headerSearch.init();

    });
    window.onunload = function() {};
    window.addEventListener("load", function(event) {
        setTimeout(function() {
            // petrocil.togglePageLoad();
        }, 400);
    });

    var headerSearch = {
        elt: $('.search'),
        eltA: $('.search .lens-m'),
        eltInput: $('.search input'),
        eltForm: $('.search form'),

        goTosearch: function() {
            var _this = this;
            var q = _this.eltInput.val().trim();
            if (q.length >= 3) {
                _this.eltA.attr('href', _this.eltA.attr('data-href') + '?search=' + q);
                _this.eltA.click();
            }
        },

        init: function() {
            var _this = this;

            _this.eltForm.mouseover(function() {
                _this.eltInput.focus();
            });

            _this.eltForm.submit(function(e) {
                e.preventDefault();
                _this.goTosearch();
                return false;
            });
        }
    };

    var backToTop = {
        container: $('.back-to-top'),
        elt: $('.back-to-top a'),

        init: function() {
            var _this = this;
            $(window).scroll(function() {
                if ($(window).scrollTop() > $(window).height()) {
                    _this.container.addClass('show');
                } else {
                    _this.container.removeClass('show');
                }
            });

            _this.elt.click(function() {
                //$(window).scrollTop(0);
                $('html,body').animate({
                    scrollTop: 0
                }, 'slow');
            });
        }
    };

    var mainWaypoint = {
        waypoints: [],

        animationOnStart: function() {
            this.waypoints.push(
                $('.layout-content').waypoint({
                    handler: function(direction) {
                        //console.log(this);
                        if (direction == 'down') {
                            $('.scroll-down').hide();
                            $('.search').addClass('not-visible');
                        } else {
                            $('.scroll-down').show();
                            $('.search').removeClass('not-visible');
                        }
                    },
                    offset: -20
                })
            );
        },

        animationSidebar: function() {
            if ($('.layout-container > footer').is(':visible')) {
                this.waypoints.push(
                    new Waypoint.Inview({
                        element: $('.layout-container > footer')[0],
                        enter: function(direction) {
                            //console.log('footer enter');
                            $('.layout-sidebar .sidebar').addClass('sticky');
                            $('.back-to-top').addClass('over-footer');
                        },
                        exited: function(direction) {
                            //console.log('footer exited');
                            $('.layout-sidebar .sidebar').removeClass('sticky');
                            $('.back-to-top').removeClass('over-footer');
                        }
                    })
                );
            }
        },

        setAnimations: function() {
            this.animationOnStart();
            this.animationSidebar();
        }
    };

    var stickyAnchors = {
        menu: $('#sticky-anchors'),
        menuItems: $('#sticky-anchors .anchor'),

        scrollSpy: function() {
            var _this = this;

            var scrollItems = _this.menuItems.map(function() {
                var item = $($('a[name="' + $(this).data('scrollspy') + '"]'));
                if (item.length) {
                    return item;
                }
            });

            $(window).scroll(function() {
                if (scrollItems.length) {
                    // Get container scroll position
                    var fromTop = $(this).scrollTop();

                    // Get id of current scroll item
                    var cur = scrollItems.map(function() {
                        if (($(this).offset().top - $(window).height() / 2) < fromTop) {
                            return this;
                        }
                    });

                    cur = cur[cur.length - 1];
                    if (typeof cur !== 'undefined') {
                        _this.menu.addClass('visible');
                        _this.menuItems.not("[data-scrollspy='" + cur[0].name + "']").removeClass("active");
                        _this.menu.find("[data-scrollspy='" + cur[0].name + "']").addClass("active");
                    } else {
                        _this.menu.removeClass('visible');
                    }

                    if (_this.menu.offset().top + _this.menu.height() > $('a[name="sticky-anchors-end"]').offset().top) {
                        _this.menu.removeClass('visible');
                    }
                }
            });

        },

        scrollToAnchor: function(aid) {
            var _this = this;
            var aTag = $("a[name='" + aid + "']");

            $('html,body').animate({
                scrollTop: aTag.offset().top - 40
            }, 'slow', function() {
                _this.menuItems.not("[data-scrollspy='" + aid + "']").removeClass("active");
                _this.menu.find("[data-scrollspy='" + aid + "']").addClass("active");
            });
        },

        init: function() {
            var _this = this;
            if (_this.menu.length) {
                _this.menuItems.click(function() {
                    _this.scrollToAnchor($(this).attr('data-scrollspy'));
                });
                _this.menuItems.mouseover(function() {
                    $('.back-to-top').addClass('over-sticky-anchor');
                });
                _this.menuItems.mouseout(function() {
                    $('.back-to-top').removeClass('over-sticky-anchor');
                });
                _this.scrollSpy();
            }
        }
    };

})(jQuery, window.Drupal, window.drupalSettings);



var petrocil = {
    self: this,

    primarySecondActive: false,

    topPositionMenu: 0,

    menuEntryHoverActive: false,

    isLogged: function() {
        return document.body.classList.contains('user-logged-in');
    },
    cookies: {
        cookieConsentName: "cookie_consent",
        cookieExpiryDays: 180,
        get: function(cookiename) {
            var name = cookiename + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return false; // cookie not present
        },
        set: function(cookiename, value, expiry) {
            var d = new Date();
            if (typeof expiry === "object") {
                // exact date
                d.setTime(expiry);
            } else {
                // days in the future
                var days = parseInt(expiry);
                days = (isNaN(days) ? 0 : days);
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            }
            var expires = "expires=" + d.toUTCString();
            document.cookie = cookiename + "=" + value + ";" + expires + ";path=/";
        },
        setConsent: function(cvalue) {
            this.set(this.cookieConsentName, cvalue, this.cookieExpiryDays);
            location.reload();
        },
        getConsent: function() {
            // "1" -> consent
            // "0" -> deny
            // false -> not set
            var value = this.get(this.cookieConsentName);
            if (value !== false) {
                // 1 -> consent
                // 0 -> deny
                // false -> not set
                value = parseInt(value);
            }
            return value;
        },
        isCookieCleared: function() {
            // deny or not set
            return !this.getConsent();
        },
        denyConsentAndClear: function() {
            var excluded = [];
            var cookies = document.cookie.split("; ");
            var ccount = cookies.length;
            for (var c = 0; c < ccount; c++) {
                var d = window.location.hostname.split(".");
                while (d.length > 0) {
                    var cookieName = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]);
                    if (excluded.indexOf(cookieName) < 0) {
                        var cookieBase = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                        var p = location.pathname.split('/');
                        document.cookie = cookieBase + '/';
                        while (p.length > 0) {
                            document.cookie = cookieBase + p.join('/');
                            p.pop();
                        }
                    }
                    d.shift();
                }
            }
            this.setConsent(0);
            location.reload();
        }

    },
    initMenu: function() {
        var $menuRoot = jQuery("aside.menu");
        var $subContainer = jQuery('.primary-second-container', $menuRoot);
        var $subs = jQuery('#block-mainmenuprimary ul ul.primary-second', $menuRoot);

        $subContainer.append($subs);
    },

    toggleMenu: function(event) {
        if (event !== undefined) {
            event.preventDefault();

        }

        var htmlEl = document.querySelector('html').classList;
        var bodyEl = document.querySelector('body').classList;
        var menuClassList = document.querySelector('.menu').classList;
        var curtainsManuClassList = document.querySelector('.menu .curtains').classList;

        if (menuClassList.contains('open')) {
            htmlEl.remove('open-menu');
            bodyEl.remove('open-menu');

            window.scroll(0, this.topPositionMenu);

            // bodyClassList.remove('open-menu');
            menuClassList.add('closed');
            menuClassList.remove('open');
            curtainsManuClassList.add('closed');
            curtainsManuClassList.remove('open');

            var menuEntryHover = document.querySelector('.menu-entry-hover');
            menuEntryHover.classList.remove('active');

            this.resetMenuEntry();
            this.resetPrimarySecond();
            this.togglePrimarySecondMobile();
        } else {
            this.topPositionMenu = -document.querySelector('body').getBoundingClientRect().top;

            // bodyClassList.add('open-menu');
            menuClassList.add('open');
            menuClassList.remove('closed');
            curtainsManuClassList.add('open');
            curtainsManuClassList.remove('closed');

            // il timeout è basato sul tempo che ci vuole a concludere l'animazine
            // della tendina
            setTimeout(function() {
                htmlEl.add('open-menu');
                bodyEl.add('open-menu');
            }, 1200);
        }
    },

    listenerToggleMenu: function() {
        var self = this;

        var toggleMenuEls = document.querySelectorAll('.toggle-menu');

        for (var index = 0; index < toggleMenuEls.length; index++) {
            toggleMenuEls[index].addEventListener('click', self.toggleMenu.bind(this));
        }
    },

    // Sarebbe meglio utlizzare la versione css (in _menu.scss) quando non ci
    // saranno più voci inattive
    toggleMenuEntryHoverEnter: function(event) {
        this.menuEntryHoverActive = true;
        var currentTarget = event.currentTarget.parentNode;
        var menuContainer = event.currentTarget.parentNode.parentNode;

        var menuEntriesSibling = menuContainer.querySelectorAll('.menu-entry:not(.inactive), .menu-entry-second:not(.inactive)');

        for (var index = 0; index < menuEntriesSibling.length; index++) {
            menuEntriesSibling[index].classList.add('light-color');
        }

        currentTarget.classList.remove('light-color');
    },

    toggleMenuEntryHoverLeave: function(event) {
        //if (!this.menuEntryHoverActive) { /* cleanup code */
        if (this.menuEntryHoverActive) {
            var menuContainer = event.currentTarget.parentNode.parentNode;

            var menuEntriesSibling = menuContainer.querySelectorAll('.menu-entry:not(.inactive), .menu-entry-second:not(.inactive)');

            for (var index = 0; index < menuEntriesSibling.length; index++) {
                menuEntriesSibling[index].classList.remove('light-color');
            }
        }
        this.menuEntryHoverActive = false;
    },

    listenerToggleMenuEntryHover: function() {
        var self = this;

        var toggleMenuEntryHoverEls = document.querySelectorAll('.menu-entry:not(.inactive) a, .menu-entry-second:not(.inactive) a');

        for (var index = 0; index < toggleMenuEntryHoverEls.length; index++) {
            toggleMenuEntryHoverEls[index].addEventListener('mouseenter', self.toggleMenuEntryHoverEnter.bind(this), true);

            toggleMenuEntryHoverEls[index].addEventListener('mouseleave', self.toggleMenuEntryHoverLeave.bind(this), true);
        }
    },

    toggleMenuEntryEnter: function(event) {
        this.primarySecondActive = true;

        event.preventDefault();

        var menuEntry = event.target.parentNode;
        if (menuEntry.classList.contains('menu-entry')) {

            this.resetMenuEntry();

            var menuEntryHover = document.querySelector('.menu-entry-hover');
            var firstLevelContainer = document.querySelector('.first-level-container');
            var primarySecondContainer = document.querySelector('.primary-second-container');
            var toggleMenuPrimarySecond = document.querySelector('.toggle-menu-primary-second');


            menuEntryHover.classList.add('active');
            menuEntry.classList.add('active');
            firstLevelContainer.classList.add('active');
            toggleMenuPrimarySecond.classList.add('active');
            // per il mobile
            primarySecondContainer.classList.add('open');

            this.togglePrimarySecond(menuEntry);
        }
    },

    toggleMenuEntryLeave: function(event) {
        if (!this.primarySecondActive) {
            event.preventDefault();

            var menuEntry = event.target.parentNode;
            if (menuEntry.classList.contains('menu-entry')) {
                this.resetMenuEntrySecond();
            }
        }
    },


    resetMenuEntry: function() {
        var toggleMenuEntryEls = document.querySelectorAll('.menu-entry');

        for (var indexMenuEntry = 0; indexMenuEntry < toggleMenuEntryEls.length; indexMenuEntry++) {
            toggleMenuEntryEls[indexMenuEntry].classList.remove('active');
        }
    },

    resetMenuEntrySecond: function(menuEntry) {
        this.resetMenuEntry();

        if (menuEntry !== undefined) {
            menuEntry.classList.remove('active');
        }

        var menuEntryHover = document.querySelector('.menu-entry-hover');
        var firstLevelContainer = document.querySelector('.first-level-container');
        var primarySecondContainer = document.querySelector('.primary-second-container');
        var toggleMenuPrimarySecond = document.querySelector('.toggle-menu-primary-second');
        var primarySeconds = document.querySelectorAll('.primary-second');

        menuEntryHover.classList.remove('active');
        firstLevelContainer.classList.remove('active');
        toggleMenuPrimarySecond.classList.remove('active');
        // per il mobile
        primarySecondContainer.classList.remove('open');

        for (var indexPrimarySeconds = 0; indexPrimarySeconds < primarySeconds.length; indexPrimarySeconds++) {
            primarySeconds[indexPrimarySeconds].classList.remove('active');
        }
    },

    togglePrimarySecond: function(menuEntry) {
        this.resetPrimarySecond();

        var primarySecond = document.querySelector('.primary-second[data-menu-second="' + menuEntry.dataset.menuFirst + '"]');

        if (primarySecond != null) {
            primarySecond.classList.add('active');
        }
    },

    togglePrimarySecondMobile: function(event) {
        if (typeof event != 'undefined') {
            event.preventDefault();
        }

        var firstLevelContainer = document.querySelector('.first-level-container');
        var primarySecondContainer = document.querySelector('.primary-second-container');
        var toggleMenuPrimarySecond = document.querySelector('.toggle-menu-primary-second');

        this.resetPrimarySecond();

        if (firstLevelContainer.classList.contains('active')) {
            firstLevelContainer.classList.remove('active');
        }

        if (primarySecondContainer.classList.contains('open')) {
            primarySecondContainer.classList.remove('open');
        }

        if (toggleMenuPrimarySecond.classList.contains('active')) {
            toggleMenuPrimarySecond.classList.remove('active');
        }
    },

    listenerTogglePrimarySecondMobile: function() {
        var self = this;

        var toggleMenuEls = document.querySelectorAll('.toggle-menu-primary-second');

        for (var index = 0; index < toggleMenuEls.length; index++) {
            toggleMenuEls[index].addEventListener('click', self.togglePrimarySecondMobile.bind(this));
        }
    },

    resetPrimarySecond: function() {
        var primarySecondEls = document.querySelectorAll('.primary-second');

        for (var indexPrimarySecond = 0; indexPrimarySecond < primarySecondEls.length; indexPrimarySecond++) {
            primarySecondEls[indexPrimarySecond].classList.remove('active');
        }
    },

    listenerToggleMenuEntry: function() {
        var self = this;

        var toggleMenuEntryEls = document.querySelectorAll('.menu-entry[data-menu-first] a');

        for (var index = 0; index < toggleMenuEntryEls.length; index++) {
            toggleMenuEntryEls[index].addEventListener('mouseenter', self.toggleMenuEntryEnter.bind(this), true);

            toggleMenuEntryEls[index].addEventListener('mouseleave', self.toggleMenuEntryLeave.bind(this), true);
        }
    },

    toggleMenuEntryNoSecondLevelEnter: function() {
        this.primarySecondActive = false;

        this.resetMenuEntrySecond();
    },

    listenerToggleMenuEntryNoSecondLevel: function() {
        var self = this;

        var toggleMenuEntryNoSecondLevelEls = document.querySelectorAll('.menu-entry:not([data-menu-first]) a');

        for (var index = 0; index < toggleMenuEntryNoSecondLevelEls.length; index++) {
            toggleMenuEntryNoSecondLevelEls[index].addEventListener('mouseenter', self.toggleMenuEntryNoSecondLevelEnter.bind(this), true);
        }
    },

    togglePageUnload: function(event) {
        var self = this;

        if (!event.currentTarget || !event.currentTarget.href) {
            return;
        }

        var targetHref = event.currentTarget.href;
        event.preventDefault();

        if (jQuery(event.currentTarget).parents('.menu-entries-container').length && !/[?&]open_menu=/.test(location.search)) {
            var open_menu = 1;
            if (jQuery(event.currentTarget).parents('.primary-second').length) {
                open_menu = jQuery(event.currentTarget).parents('.primary-second').attr('data-menu-second');
            }
            //history.pushState({ foo: "bar" }, "page 2", location.href+'?open_menu='+open_menu);
            var newLocation = location.origin + location.pathname + (location.search ? location.search + '&' : '?') + 'open_menu=' + open_menu + location.hash;
            window.history.replaceState(null, null, newLocation);
        }


        if (jQuery("#fake-modal").length > 0 && jQuery("#fake-modal").hasClass('open-on-entry')) {
            window.location.href = targetHref;
        }

        if (jQuery(".projects-page-modal").length > 0) {
            window.location.href = targetHref;
        }

        var pageUnload = document.querySelector('#page-unload');
        var lastCurtain = pageUnload.querySelector('.curtains-col:nth-child(6) .curtain');
        if (!this.isVisible(lastCurtain)) {
            lastCurtain = pageUnload.querySelector('.curtains-col:nth-child(5) .curtain');
        }

        if (pageUnload) {
            pageUnload.classList.remove('closed');
            pageUnload.classList.add('open');

            lastCurtain.addEventListener("transitionend", function(event) {
                var menuClassList = document.querySelector('.menu').classList;

                if (menuClassList.contains('open')) {
                    self.toggleMenu();
                }
                // aggiungo un timeout per lasciare un po' visibili le curtains chiuse. Il timeout deve essere lungo quanto il
                // tempo della transition di chiusura di tutte le tendine
                setTimeout(function() {
                    // console.log('preremove');
                    window.location.href = targetHref;

                    // Questo serve per il problema con la super cache di Safari/Firefox, l'unload va chiuso se non tornando si vede ancora
                    if ((navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) ||
                        (navigator.userAgent.indexOf('Firefox') > -1 && navigator.userAgent.indexOf('Seamonkey') === -1)) {
                        pageUnload.classList.remove('open');
                        pageUnload.classList.add('closed');
                        //console.log ('chiudi Safari');
                    }
                    // console.log('remove');
                }, 1200);
            }, true);
        }
    },


    listenerTogglePageUnload: function() {

        if (!this.isLogged()) {
            var self = this;

            var exclusions = ':not(.open-fake-modal):not(.close-fake-modal):not(.no-curtains-animation):not([target="_blank"])';
            var linkEls = document.querySelectorAll(
                'a[href^="' + window.location.origin + '"]' + exclusions + ', ' +
                'a[href^="/"]' + exclusions);

            for (var index = 0; index < linkEls.length; index++) {
                linkEls[index].addEventListener('click', self.togglePageUnload.bind(this));
            }
        }

    },

    togglePageLoad: function() {

        var pageUnload = document.querySelector('#page-unload');
        if (this.isLogged()) {
            pageUnload.remove();
        } else {
            pageUnload.classList.add('closed');
            pageUnload.classList.remove('open');
        }
    },

    isVisible: function(el) {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    },

    closeModalListener: function() {
        var closeModalEls = document.querySelectorAll('.close-fake-modal');

        for (var index = 0; index < closeModalEls.length; index++) {
            closeModalEls[index].addEventListener('click', this.closeModal.bind(this));
        }
    },

    closeModal: function(event) {
        event.preventDefault();

        var destinationLocation = '/';
        var queryStringParams = this.getParamsFromQueryString();

        if (queryStringParams && decodeURIComponent(queryStringParams.referral)) {
            destinationLocation = decodeURIComponent(queryStringParams.referral);
            if (queryStringParams.modalId) {
                destinationLocation += '#' + decodeURIComponent(queryStringParams.modalId);
            }
        } else if (typeof referralDefault != 'undefined') {
            destinationLocation = referralDefault;
        }

        window.location.href = destinationLocation;
    },

    getParamsFromQueryString: function() {
        if (!window.location.search) {
            return false;
        }

        var queryString = window.location.search.substring(1);

        var queryStringParams = queryString.split('&').reduce(function(acc, params) {
            var paramArr = params.split('=');

            acc[paramArr[0]] = paramArr[1];

            return acc;
        }, {});

        return queryStringParams;
    },

    scrollToFromModal: function() {
        if (window.location.hash !== '') {
            var leftPosition = document.querySelector(window.location.hash).parentElement.parentElement.parentElement.offsetLeft;

            //      console.log('leftPosition', leftPosition);
            window.scrollTo(0, leftPosition);
        }
    }
};