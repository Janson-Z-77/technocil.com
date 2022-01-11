/**
 * Customized version of iScroll.js 0.1.0
 * It fixes bugs affecting its integration with fullpage.js
 * @license
 */
! function(t, i, s) {
    var e = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
            t.setTimeout(i, 1e3 / 60)
        },
        o = function() {
            var e = {},
                o = i.createElement("div").style,
                n = function() {
                    for (var t = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, s = t.length; i < s; i++)
                        if (t[i] + "ransform" in o) return t[i].substr(0, t[i].length - 1);
                    return !1
                }();

            function r(t) {
                return !1 !== n && ("" === n ? t : n + t.charAt(0).toUpperCase() + t.substr(1))
            }
            e.getTime = Date.now || function() {
                return (new Date).getTime()
            }, e.extend = function(t, i) {
                for (var s in i) t[s] = i[s]
            }, e.addEvent = function(t, i, s, e) {
                t.addEventListener(i, s, !!e)
            }, e.removeEvent = function(t, i, s, e) {
                t.removeEventListener(i, s, !!e)
            }, e.prefixPointerEvent = function(i) {
                return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
            }, e.momentum = function(t, i, e, o, n, r) {
                var h, a, l = t - i,
                    c = s.abs(l) / e;
                return a = c / (r = void 0 === r ? 6e-4 : r), (h = t + c * c / (2 * r) * (l < 0 ? -1 : 1)) < o ? (h = n ? o - n / 2.5 * (c / 8) : o, a = (l = s.abs(h - t)) / c) : h > 0 && (h = n ? n / 2.5 * (c / 8) : 0, a = (l = s.abs(t) + h) / c), {
                    destination: s.round(h),
                    duration: a
                }
            };
            var h = r("transform");
            return e.extend(e, {
                hasTransform: !1 !== h,
                hasPerspective: r("perspective") in o,
                hasTouch: "ontouchstart" in t,
                hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                hasTransition: r("transition") in o
            }), e.isBadAndroid = function() {
                var i = t.navigator.appVersion;
                if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
                    var s = i.match(/Safari\/(\d+.\d)/);
                    return !(s && "object" == typeof s && s.length >= 2) || parseFloat(s[1]) < 535.19
                }
                return !1
            }(), e.extend(e.style = {}, {
                transform: h,
                transitionTimingFunction: r("transitionTimingFunction"),
                transitionDuration: r("transitionDuration"),
                transitionDelay: r("transitionDelay"),
                transformOrigin: r("transformOrigin")
            }), e.hasClass = function(t, i) {
                return new RegExp("(^|\\s)" + i + "(\\s|$)").test(t.className)
            }, e.addClass = function(t, i) {
                if (!e.hasClass(t, i)) {
                    var s = t.className.split(" ");
                    s.push(i), t.className = s.join(" ")
                }
            }, e.removeClass = function(t, i) {
                if (e.hasClass(t, i)) {
                    var s = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                    t.className = t.className.replace(s, " ")
                }
            }, e.offset = function(t) {
                for (var i = -t.offsetLeft, s = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, s -= t.offsetTop;
                return {
                    left: i,
                    top: s
                }
            }, e.preventDefaultException = function(t, i) {
                for (var s in i)
                    if (i[s].test(t[s])) return !0;
                return !1
            }, e.extend(e.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }), e.extend(e.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(t) {
                        return t * (2 - t)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(t) {
                        return s.sqrt(1 - --t * t)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(t) {
                        return (t -= 1) * t * (5 * t + 4) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(t) {
                        return 0 === t ? 0 : 1 == t ? 1 : .4 * s.pow(2, -10 * t) * s.sin((t - .055) * (2 * s.PI) / .22) + 1
                    }
                }
            }), e.tap = function(t, s) {
                var e = i.createEvent("Event");
                e.initEvent(s, !0, !0), e.pageX = t.pageX, e.pageY = t.pageY, t.target.dispatchEvent(e)
            }, e.click = function(s) {
                var e, o = s.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || ((e = i.createEvent(t.MouseEvent ? "MouseEvents" : "Event")).initEvent("click", !0, !0), e.view = s.view || t, e.detail = 1, e.screenX = o.screenX || 0, e.screenY = o.screenY || 0, e.clientX = o.clientX || 0, e.clientY = o.clientY || 0, e.ctrlKey = !!s.ctrlKey, e.altKey = !!s.altKey, e.shiftKey = !!s.shiftKey, e.metaKey = !!s.metaKey, e.button = 0, e.relatedTarget = null, e._constructed = !0, o.dispatchEvent(e))
            }, e
        }();

    function n(s, e) {
        for (var n in this.wrapper = "string" == typeof s ? i.querySelector(s) : s, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                disablePointer: !o.hasPointer,
                disableTouch: o.hasPointer || !o.hasTouch,
                disableMouse: o.hasPointer || o.hasTouch,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                bindToWrapper: void 0 === t.onmousedown
            }, e) this.options[n] = e[n];
        this.translateZ = this.options.HWCompositing && o.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = o.hasTransition && this.options.useTransition, this.options.useTransform = o.hasTransform && this.options.useTransform, this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? o.ease[this.options.bounceEasing] || o.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, !0 === this.options.tap && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
    }

    function r(t, s, e) {
        var o = i.createElement("div"),
            n = i.createElement("div");
        return !0 === e && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (!0 === e && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (!0 === e && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", s || (o.style.pointerEvents = "none"), o.appendChild(n), o
    }

    function h(s, n) {
        for (var r in this.wrapper = "string" == typeof n.el ? i.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = s, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            }, n) this.options[r] = n[r];
        if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (o.addEvent(this.indicator, "touchstart", this), o.addEvent(t, "touchend", this)), this.options.disablePointer || (o.addEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.addEvent(t, o.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (o.addEvent(this.indicator, "mousedown", this), o.addEvent(t, "mouseup", this))), this.options.fade) {
            this.wrapperStyle[o.style.transform] = this.scroller.translateZ;
            var h = o.style.transitionDuration;
            if (!h) return;
            this.wrapperStyle[h] = o.isBadAndroid ? "0.0001ms" : "0ms";
            var a = this;
            o.isBadAndroid && e(function() {
                "0.0001ms" === a.wrapperStyle[h] && (a.wrapperStyle[h] = "0s")
            }), this.wrapperStyle.opacity = "0"
        }
    }
    n.prototype = {
        version: "5.2.0",
        _init: function() {
            this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
        },
        _transitionEnd: function(t) {
            t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(t) {
            if (1 != o.eventType[t.type] && 0 !== (t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2)) return;
            if (this.enabled && (!this.initiated || o.eventType[t.type] === this.initiated)) {
                !this.options.preventDefault || o.isBadAndroid || o.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                var i, e = t.touches ? t.touches[0] : t;
                this.initiated = o.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = o.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this._execEvent("beforeScrollStart")
            }
        },
        _move: function(t) {
            if (this.enabled && o.eventType[t.type] === this.initiated) {
                this.options.preventDefault && t.preventDefault();
                var i, e, n, r, h = t.touches ? t.touches[0] : t,
                    a = h.pageX - this.pointX,
                    l = h.pageY - this.pointY,
                    c = o.getTime();
                if (this.pointX = h.pageX, this.pointY = h.pageY, this.distX += a, this.distY += l, n = s.abs(this.distX), r = s.abs(this.distY), !(c - this.endTime > 300 && n < 10 && r < 10)) {
                    if (this.directionLocked || this.options.freeScroll || (n > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                        l = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                        a = 0
                    }
                    a = this.hasHorizontalScroll ? a : 0, l = this.hasVerticalScroll ? l : 0, i = this.x + a, e = this.y + l, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX), (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + l / 3 : e > 0 ? 0 : this.maxScrollY), this.directionX = a > 0 ? -1 : a < 0 ? 1 : 0, this.directionY = l > 0 ? -1 : l < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, e), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(t) {
            if (this.enabled && o.eventType[t.type] === this.initiated) {
                this.options.preventDefault && !o.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                t.changedTouches && t.changedTouches[0];
                var i, e, n = o.getTime() - this.startTime,
                    r = s.round(this.x),
                    h = s.round(this.y),
                    a = s.abs(r - this.startX),
                    l = s.abs(h - this.startY),
                    c = 0,
                    p = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = o.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(r, h), !this.moved) return this.options.tap && o.tap(t, this.options.tap), this.options.click && o.click(t), void this._execEvent("scrollCancel");
                    if (this._events.flick && n < 200 && a < 100 && l < 100) this._execEvent("flick");
                    else {
                        if (this.options.momentum && n < 300 && (i = this.hasHorizontalScroll ? o.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, e = this.hasVerticalScroll ? o.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: h,
                                duration: 0
                            }, r = i.destination, h = e.destination, c = s.max(i.duration, e.duration), this.isInTransition = 1), this.options.snap) {
                            var d = this._nearestSnap(r, h);
                            this.currentPage = d, c = this.options.snapSpeed || s.max(s.max(s.min(s.abs(r - d.x), 1e3), s.min(s.abs(h - d.y), 1e3)), 300), r = d.x, h = d.y, this.directionX = 0, this.directionY = 0, p = this.options.bounceEasing
                        }
                        if (r != this.x || h != this.y) return (r > 0 || r < this.maxScrollX || h > 0 || h < this.maxScrollY) && (p = o.ease.quadratic), void this.scrollTo(r, h, c, p);
                        this._execEvent("scrollEnd")
                    }
                }
            }
        },
        _resize: function() {
            var t = this;
            clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                t.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(t) {
            var i = this.x,
                s = this.y;
            return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? s = 0 : this.y < this.maxScrollY && (s = this.maxScrollY), (i != this.x || s != this.y) && (this.scrollTo(i, s, t, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = o.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
        },
        on: function(t, i) {
            this._events[t] || (this._events[t] = []), this._events[t].push(i)
        },
        off: function(t, i) {
            if (this._events[t]) {
                var s = this._events[t].indexOf(i);
                s > -1 && this._events[t].splice(s, 1)
            }
        },
        _execEvent: function(t) {
            if (this._events[t]) {
                var i = 0,
                    s = this._events[t].length;
                if (s)
                    for (; i < s; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(t, i, s, e) {
            t = this.x + t, i = this.y + i, s = s || 0, this.scrollTo(t, i, s, e)
        },
        scrollTo: function(t, i, s, e) {
            e = e || o.ease.circular, this.isInTransition = this.options.useTransition && s > 0;
            var n = this.options.useTransition && e.style;
            !s || n ? (n && (this._transitionTimingFunction(e.style), this._transitionTime(s)), this._translate(t, i)) : this._animate(t, i, s, e.fn)
        },
        scrollToElement: function(t, i, e, n, r) {
            if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                var h = o.offset(t);
                h.left -= this.wrapperOffset.left, h.top -= this.wrapperOffset.top, !0 === e && (e = s.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === n && (n = s.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), h.left -= e || 0, h.top -= n || 0, h.left = h.left > 0 ? 0 : h.left < this.maxScrollX ? this.maxScrollX : h.left, h.top = h.top > 0 ? 0 : h.top < this.maxScrollY ? this.maxScrollY : h.top, i = null == i || "auto" === i ? s.max(s.abs(this.x - h.left), s.abs(this.y - h.top)) : i, this.scrollTo(h.left, h.top, i, r)
            }
        },
        _transitionTime: function(t) {
            if (this.options.useTransition) {
                t = t || 0;
                var i = o.style.transitionDuration;
                if (i) {
                    if (this.scrollerStyle[i] = t + "ms", !t && o.isBadAndroid) {
                        this.scrollerStyle[i] = "0.0001ms";
                        var s = this;
                        e(function() {
                            "0.0001ms" === s.scrollerStyle[i] && (s.scrollerStyle[i] = "0s")
                        })
                    }
                    if (this.indicators)
                        for (var n = this.indicators.length; n--;) this.indicators[n].transitionTime(t)
                }
            }
        },
        _transitionTimingFunction: function(t) {
            if (this.scrollerStyle[o.style.transitionTimingFunction] = t, this.indicators)
                for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
        },
        _translate: function(t, i) {
            if (this.options.useTransform ? this.scrollerStyle[o.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = s.round(t), i = s.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                for (var e = this.indicators.length; e--;) this.indicators[e].updatePosition()
        },
        _initEvents: function(i) {
            var s = i ? o.removeEvent : o.addEvent,
                e = this.options.bindToWrapper ? this.wrapper : t;
            s(t, "orientationchange", this), s(t, "resize", this), this.options.click && s(this.wrapper, "click", this, !0), this.options.disableMouse || (s(this.wrapper, "mousedown", this), s(e, "mousemove", this), s(e, "mousecancel", this), s(e, "mouseup", this)), o.hasPointer && !this.options.disablePointer && (s(this.wrapper, o.prefixPointerEvent("pointerdown"), this), s(e, o.prefixPointerEvent("pointermove"), this), s(e, o.prefixPointerEvent("pointercancel"), this), s(e, o.prefixPointerEvent("pointerup"), this)), o.hasTouch && !this.options.disableTouch && (s(this.wrapper, "touchstart", this), s(e, "touchmove", this), s(e, "touchcancel", this), s(e, "touchend", this)), s(this.scroller, "transitionend", this), s(this.scroller, "webkitTransitionEnd", this), s(this.scroller, "oTransitionEnd", this), s(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var i, s, e = t.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (i = +((e = e[o.style.transform].split(")")[0].split(", "))[12] || e[4]), s = +(e[13] || e[5])) : (i = +e.left.replace(/[^-\d.]/g, ""), s = +e.top.replace(/[^-\d.]/g, "")), {
                x: i,
                y: s
            }
        },
        _initIndicators: function() {
            var t, i = this.options.interactiveScrollbars,
                s = "string" != typeof this.options.scrollbars,
                e = [],
                o = this;
            this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
                el: r("v", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: s,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            }, this.wrapper.appendChild(t.el), e.push(t)), this.options.scrollX && (t = {
                el: r("h", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: s,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            }, this.wrapper.appendChild(t.el), e.push(t))), this.options.indicators && (e = e.concat(this.options.indicators));
            for (var n = e.length; n--;) this.indicators.push(new h(this, e[n]));

            function a(t) {
                if (o.indicators)
                    for (var i = o.indicators.length; i--;) t.call(o.indicators[i])
            }
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                a(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                a(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                a(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                a(function() {
                    this.fade(1, !0)
                })
            })), this.on("refresh", function() {
                a(function() {
                    this.refresh()
                })
            }), this.on("destroy", function() {
                a(function() {
                    this.destroy()
                }), delete this.indicators
            })
        },
        _initWheel: function() {
            o.addEvent(this.wrapper, "wheel", this), o.addEvent(this.wrapper, "mousewheel", this), o.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                clearTimeout(this.wheelTimeout), this.wheelTimeout = null, o.removeEvent(this.wrapper, "wheel", this), o.removeEvent(this.wrapper, "mousewheel", this), o.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(t) {
            if (this.enabled) {
                var i, e, o, n, r = this;
                if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                        r.options.snap || r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                    }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, e = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, e = -t.deltaY);
                else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, e = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in t) i = e = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in t)) return;
                    i = e = -t.detail / 3 * this.options.mouseWheelSpeed
                }
                if (i *= this.options.invertWheelDirection, e *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = e, e = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, e > 0 ? n-- : e < 0 && n++, void this.goToPage(o, n);
                o = this.x + s.round(this.hasHorizontalScroll ? i : 0), n = this.y + s.round(this.hasVerticalScroll ? e : 0), this.directionX = i > 0 ? -1 : i < 0 ? 1 : 0, this.directionY = e > 0 ? -1 : e < 0 ? 1 : 0, o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
            }
        },
        _initSnap: function() {
            this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                var t, i, e, o, n, r, h = 0,
                    a = 0,
                    l = 0,
                    c = this.options.snapStepX || this.wrapperWidth,
                    p = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (!0 === this.options.snap)
                        for (e = s.round(c / 2), o = s.round(p / 2); l > -this.scrollerWidth;) {
                            for (this.pages[h] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[h][t] = {
                                x: s.max(l, this.maxScrollX),
                                y: s.max(n, this.maxScrollY),
                                width: c,
                                height: p,
                                cx: l - e,
                                cy: n - o
                            }, n -= p, t++;
                            l -= c, h++
                        } else
                            for (t = (r = this.options.snap).length, i = -1; h < t; h++)(0 === h || r[h].offsetLeft <= r[h - 1].offsetLeft) && (a = 0, i++), this.pages[a] || (this.pages[a] = []), l = s.max(-r[h].offsetLeft, this.maxScrollX), n = s.max(-r[h].offsetTop, this.maxScrollY), e = l - s.round(r[h].offsetWidth / 2), o = n - s.round(r[h].offsetHeight / 2), this.pages[a][i] = {
                                x: l,
                                y: n,
                                width: r[h].offsetWidth,
                                height: r[h].offsetHeight,
                                cx: e,
                                cy: o
                            }, l > this.maxScrollX && a++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 == 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }), this.on("flick", function() {
                var t = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.x - this.startX), 1e3), s.min(s.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
            })
        },
        _nearestSnap: function(t, i) {
            if (!this.pages.length) return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
            var e = 0,
                o = this.pages.length,
                n = 0;
            if (s.abs(t - this.absStartX) < this.snapThresholdX && s.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
            for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); e < o; e++)
                if (t >= this.pages[e][0].cx) {
                    t = this.pages[e][0].x;
                    break
                }
            for (o = this.pages[e].length; n < o; n++)
                if (i >= this.pages[0][n].cy) {
                    i = this.pages[0][n].y;
                    break
                }
            return e == this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), n == this.currentPage.pageY && ((n += this.directionY) < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                x: t,
                y: i,
                pageX: e,
                pageY: n
            }
        },
        goToPage: function(t, i, e, o) {
            o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
            var n = this.pages[t][i].x,
                r = this.pages[t][i].y;
            e = void 0 === e ? this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - this.x), 1e3), s.min(s.abs(r - this.y), 1e3)), 300) : e, this.currentPage = {
                x: n,
                y: r,
                pageX: t,
                pageY: i
            }, this.scrollTo(n, r, e, o)
        },
        next: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            ++s >= this.pages.length && this.hasVerticalScroll && (s = 0, e++), this.goToPage(s, e, t, i)
        },
        prev: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            --s < 0 && this.hasVerticalScroll && (s = 0, e--), this.goToPage(s, e, t, i)
        },
        _initKeys: function(i) {
            var s, e = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            if ("object" == typeof this.options.keyBindings)
                for (s in this.options.keyBindings) "string" == typeof this.options.keyBindings[s] && (this.options.keyBindings[s] = this.options.keyBindings[s].toUpperCase().charCodeAt(0));
            else this.options.keyBindings = {};
            for (s in e) this.options.keyBindings[s] = this.options.keyBindings[s] || e[s];
            o.addEvent(t, "keydown", this), this.on("destroy", function() {
                o.removeEvent(t, "keydown", this)
            })
        },
        _key: function(t) {
            if (this.enabled) {
                var i, e = this.options.snap,
                    n = e ? this.currentPage.pageX : this.x,
                    r = e ? this.currentPage.pageY : this.y,
                    h = o.getTime(),
                    a = this.keyTime || 0;
                switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this.isInTransition = !1), this.keyAcceleration = h - a < 200 ? s.min(this.keyAcceleration + .25, 50) : 0, t.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? n += e ? 1 : this.wrapperWidth : r += e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= e ? 1 : this.wrapperWidth : r -= e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        n = e ? this.pages.length - 1 : this.maxScrollX, r = e ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        n = 0, r = 0;
                        break;
                    case this.options.keyBindings.left:
                        n += e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        r += e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        n -= e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        r -= e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                e ? this.goToPage(n, r) : (n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX, this.keyAcceleration = 0), r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollY && (r = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(n, r, 0), this.keyTime = h)
            }
        },
        _animate: function(t, i, s, n) {
            var r = this,
                h = this.x,
                a = this.y,
                l = o.getTime(),
                c = l + s;
            this.isAnimating = !0,
                function p() {
                    var d, u, f, m = o.getTime();
                    if (m >= c) return r.isAnimating = !1, r._translate(t, i), void(r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"));
                    f = n(m = (m - l) / s), d = (t - h) * f + h, u = (i - a) * f + a, r._translate(d, u), r.isAnimating && e(p)
                }()
        },
        handleEvent: function(t) {
            switch (t.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(t);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(t);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(t);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(t);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(t);
                    break;
                case "keydown":
                    this._key(t);
                    break;
                case "click":
                    this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
            }
        }
    }, h.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(t);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(t);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(t)
            }
        },
        destroy: function() {
            this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (o.removeEvent(this.indicator, "touchstart", this), o.removeEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.removeEvent(this.indicator, "mousedown", this), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), o.removeEvent(t, "touchend", this), o.removeEvent(t, o.prefixPointerEvent("pointerup"), this), o.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(i) {
            var s = i.touches ? i.touches[0] : i;
            i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = s.pageX, this.lastPointY = s.pageY, this.startTime = o.getTime(), this.options.disableTouch || o.addEvent(t, "touchmove", this), this.options.disablePointer || o.addEvent(t, o.prefixPointerEvent("pointermove"), this), this.options.disableMouse || o.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(t) {
            var i, s, e, n, r = t.touches ? t.touches[0] : t;
            o.getTime();
            this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = r.pageX - this.lastPointX, this.lastPointX = r.pageX, s = r.pageY - this.lastPointY, this.lastPointY = r.pageY, e = this.x + i, n = this.y + s, this._pos(e, n), t.preventDefault(), t.stopPropagation()
        },
        _end: function(i) {
            if (this.initiated) {
                if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                    var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        n = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.scroller.x - e.x), 1e3), s.min(s.abs(this.scroller.y - e.y), 1e3)), 300);
                    this.scroller.x == e.x && this.scroller.y == e.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, n, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(t) {
            t = t || 0;
            var i = o.style.transitionDuration;
            if (i && (this.indicatorStyle[i] = t + "ms", !t && o.isBadAndroid)) {
                this.indicatorStyle[i] = "0.0001ms";
                var s = this;
                e(function() {
                    "0.0001ms" === s.indicatorStyle[i] && (s.indicatorStyle[i] = "0s")
                })
            }
        },
        transitionTimingFunction: function(t) {
            this.indicatorStyle[o.style.transitionTimingFunction] = t
        },
        refresh: function() {
            this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (o.addClass(this.wrapper, "iScrollBothScrollbars"), o.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (o.removeClass(this.wrapper, "iScrollBothScrollbars"), o.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = s.max(s.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = 8 - this.indicatorWidth, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = s.max(s.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = 8 - this.indicatorHeight, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        },
        updatePosition: function() {
            var t = this.options.listenX && s.round(this.sizeRatioX * this.scroller.x) || 0,
                i = this.options.listenY && s.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = s.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = s.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = s.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = s.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[o.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
        },
        _pos: function(t, i) {
            t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? s.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? s.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
        },
        fade: function(t, i) {
            if (!i || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var s = t ? 250 : 500,
                    e = t ? 0 : 300;
                t = t ? "1" : "0", this.wrapperStyle[o.style.transitionDuration] = s + "ms", this.fadeTimeout = setTimeout(function(t) {
                    this.wrapperStyle.opacity = t, this.visible = +t
                }.bind(this, t), e)
            }
        }
    }, n.utils = o, "undefined" != typeof module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? (define(function() {
        return n
    }), void 0 !== t && (t.IScroll = n)) : t.IScroll = n
}(window, document, Math),
/*!
 * Scrolloverflow 2.0.1 module for fullPage.js >= 3
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
function(t, i) {
    t.fp_scrolloverflow = function() {
        t.IScroll || (IScroll = module.exports);
        var s = "fp-scrollable",
            e = "." + s,
            o = ".active",
            n = ".fp-section",
            r = n + o,
            h = ".fp-slide",
            a = h + o,
            l = ".fp-tableCell",
            c = "fp-responsive",
            p = "fp-auto-height-responsive";

        function d(t) {
            var i = fp_utils.closest(t, n);
            return null != i ? parseInt(getComputedStyle(i)["padding-bottom"]) + parseInt(getComputedStyle(i)["padding-top"]) : 0
        }

        function u() {
            var s = this;

            function e() {
                var t;
                fp_utils.hasClass(i.body, c) ? (t = s.options.scrollOverflowHandler, r(function(i) {
                    fp_utils.hasClass(fp_utils.closest(i, n), p) && t.remove(i)
                })) : r(o)
            }

            function o(t) {
                if (!fp_utils.hasClass(t, "fp-noscroll")) {
                    fp_utils.css(t, {
                        overflow: "hidden"
                    });
                    var i, e = s.options.scrollOverflowHandler,
                        o = e.wrapContent(),
                        r = fp_utils.closest(t, n),
                        h = e.scrollable(t),
                        a = d(r);
                    null != h ? i = e.scrollHeight(t) : (i = t.scrollHeight - a, s.options.verticalCentered && (i = f(l, t)[0].scrollHeight - a));
                    var c = fp_utils.getWindowHeight() - a;
                    i > c ? null != h ? e.update(t, c) : (s.options.verticalCentered ? (fp_utils.wrapInner(f(l, t)[0], o.scroller), fp_utils.wrapInner(f(l, t)[0], o.scrollable)) : (fp_utils.wrapInner(t, o.scroller), fp_utils.wrapInner(t, o.scrollable)), e.create(t, c, s.iscrollOptions)) : e.remove(t), fp_utils.css(t, {
                        overflow: ""
                    })
                }
            }

            function r(t) {
                f(n).forEach(function(i) {
                    var s = f(h, i);
                    s.length ? s.forEach(function(i) {
                        t(i)
                    }) : t(i)
                })
            }
            s.options = null, s.init = function(o, n) {
                return s.options = o, s.iscrollOptions = n, "complete" === i.readyState && (e(), fullpage_api.shared.afterRenderActions()), t.addEventListener("load", function() {
                    e(), fullpage_api.shared.afterRenderActions()
                }), s
            }, s.createScrollBarForAll = e
        }
        IScroll.prototype.wheelOn = function() {
            this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
        }, IScroll.prototype.wheelOff = function() {
            this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
        };
        var f = null,
            m = {
                refreshId: null,
                iScrollInstances: [],
                fullpageOptions: null,
                iscrollOptions: {
                    scrollbars: !0,
                    mouseWheel: !0,
                    hideScrollbars: !1,
                    fadeScrollbars: !1,
                    disableMouse: !0,
                    interactiveScrollbars: !0
                },
                init: function(i) {
                    f = fp_utils.$, m.fullpageOptions = i;
                    var s = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
                    return m.iscrollOptions.click = s, m.iscrollOptions = fp_utils.deepExtend(m.iscrollOptions, i.scrollOverflowOptions), (new u).init(i, m.iscrollOptions)
                },
                toggleWheel: function(t) {
                    f(e, f(r)[0]).forEach(function(i) {
                        var s = i.fp_iscrollInstance;
                        null != s && (t ? s.wheelOn() : s.wheelOff())
                    })
                },
                onLeave: function() {
                    m.toggleWheel(!1)
                },
                beforeLeave: function() {
                    m.onLeave()
                },
                afterLoad: function() {
                    m.toggleWheel(!0)
                },
                create: function(t, i, s) {
                    f(e, t).forEach(function(e) {
                        fp_utils.css(e, {
                            height: i + "px"
                        });
                        var o = e.fp_iscrollInstance;
                        null != o && m.iScrollInstances.forEach(function(t) {
                            t.destroy()
                        }), o = new IScroll(e, s), m.iScrollInstances.push(o), fp_utils.hasClass(fp_utils.closest(t, n), "active") || o.wheelOff(), e.fp_iscrollInstance = o
                    })
                },
                isScrolled: function(t, i) {
                    var s = i.fp_iscrollInstance;
                    return !s || ("top" === t ? s.y >= 0 && !fp_utils.getScrollTop(i) : "bottom" === t ? 0 - s.y + fp_utils.getScrollTop(i) + 1 + i.offsetHeight >= i.scrollHeight : void 0)
                },
                scrollable: function(t) {
                    return f(".fp-slides", t).length ? f(e, f(a, t)[0])[0] : f(e, t)[0]
                },
                scrollHeight: function(t) {
                    return f(".fp-scroller", f(e, t)[0])[0].scrollHeight
                },
                remove: function(t) {
                    if (null != t) {
                        var i = f(e, t)[0];
                        if (null != i) {
                            var s = i.fp_iscrollInstance;
                            null != s && s.destroy(), i.fp_iscrollInstance = null, f(".fp-scroller", t)[0].outerHTML = f(".fp-scroller", t)[0].innerHTML, f(e, t)[0].outerHTML = f(e, t)[0].innerHTML
                        }
                    }
                },
                update: function(t, i) {
                    clearTimeout(m.refreshId), m.refreshId = setTimeout(function() {
                        m.iScrollInstances.forEach(function(t) {
                            t.refresh(), fullpage_api.silentMoveTo(fp_utils.index(f(r)[0]) + 1)
                        })
                    }, 150), fp_utils.css(f(e, t)[0], {
                        height: i + "px"
                    });
                    var s = m.fullpageOptions.verticalCentered ? i + d(t) : i;
                    fp_utils.css(f(e, t)[0].parentNode, {
                        height: s + "px"
                    })
                },
                wrapContent: function() {
                    var t = i.createElement("div");
                    t.className = s;
                    var e = i.createElement("div");
                    return e.className = "fp-scroller", {
                        scrollable: t,
                        scroller: e
                    }
                }
            };
        return {
            iscrollHandler: m
        }
    }()
}(window, document);
//# sourceMappingURL=scrolloverflow.min.js.map