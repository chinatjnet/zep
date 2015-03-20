Zepto = function() {
    var d = document;
    function $$(_, _node) {
        if (typeof _ == "function") {
            $.fun.ready(_);
            return;
        }
        var elm = (_node ? _node :d).querySelectorAll(_);
        elm._selector_ = _ ? _._selector_ || _ :undefined;
        return elm;
    }
    /*Standard Function*/
    $.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    $.fun = {
        ready:function(callback) {
            d.addEventListener("DOMContentLoaded", callback, false);
            return this;
        },
        show:function() {
            $.fun.each.call(this, function(i, elm) {
                $.fun.css.call([ elm ], "display", "");
                _disp = elm.style.display;
                if (_disp == "none" || _disp == "") {
                    elm.style.display = "block";
                }
            });
            return this;
        },
        hide:function() {
            $.fun.each.call(this, function(i, elm) {
                elm.style.display = "none";
            });
            return this;
        },
        html:function(str) {
            $.fun.each.call(this, function(i, elm) {
                elm.innerHTML = str;
            });
            return this;
        },
        text:function() {
            return this[0].innerText;
        },
        each:function(callback) {
            for (var i = 0; i < this.length; i++) {
                this[i]._selector_ = this._selector_;
                callback.call(this[i], i, this[i]);
            }
            return this;
        },
        add:function(nodes) {
            var Nodes = [];
            [].push.apply(Nodes, this);
            if (nodes.length) {
                [].push.apply(Nodes, nodes);
            }
            return $.extend(Nodes, $.fun);
        },
        eq:function(index) {
            var elm = this[index] || null, node = [];
            node[0] = elm;
            return $.extend(node, $.fun);
        },
        lt:function(index) {
            return $.extend([].splice.call(this, 0, index), $.fun);
        },
        gt:function(index) {
            return $.extend([].splice.call(this, parseInt(index) + 1, this.length), $.fun);
        },
        get:function(index) {
            return this[index];
        },
        siblings:function() {
            var Nodes = [];
            $.fun.each.call(this, function(i, elm) {
                var _nodes = [].slice.call(elm.parentNode.children).filter(function(child) {
                    return child !== elm && Nodes.indexOf(child) <= -1 && child.nodeName == elm.nodeName;
                });
                if (_nodes) [].push.apply(Nodes, _nodes);
            });
            return $.extend(Nodes, $.fun);
        },
        parent:function(name) {
            var Nodes = [];
            $.fun.each.call(this, function(i, elm) {
                var p = elm.parentNode;
                while (p) {
                    if (p.nodeType === 1) {
                        if (!name) {
                            Nodes.push(p);
                            break;
                        }
                        if (p.nodeName == name.toUpperCase()) {
                            if (Nodes.indexOf(p) < 0) Nodes.push(p);
                            break;
                        }
                    }
                    p = p.parentNode;
                }
            });
            return $.extend(Nodes, $.fun);
        },
        closest:function(name) {
            return $.fun.parent.call(this, name);
        },
        find:function(_) {
            var Nodes = [];
            $.fun.each.call(this, function(i, elm) {
                var _nodes = $$(_, elm);
                if (_nodes.length) {
                    [].push.apply(Nodes, _nodes);
                }
            });
            return $.extend(Nodes, $.fun);
        },
        index:function(elm) {
            return elm ? [].indexOf.call(this, elm) :[].indexOf.call(this[0].parentNode.children, this[0]);
        },
        css:function(name, value) {
            $.fun.each.call(this, function(i, elm) {
                if (value == "") {
                    var reg = new RegExp(name + "s*:.*?(;|$)", "ig"), style = (elm.getAttribute("style") || "").replace(reg, "");
                    elm.setAttribute("style", style);
                } else {
                    elm.style[name] = value;
                }
            });
            return this;
        },
        attr:function(name, value) {
            if (typeof value == "undefined") {
                return this[0].getAttribute(name);
            }
            this[0].setAttribute(name, value);
            return this;
        },
        width:function(value) {
            if (typeof value != "undefined") {
                $.fun.css.call([ this[0] ], "width", value + "px");
                return this;
            }
            return this[0].clientWidth;
        },
        height:function(value) {
            if (typeof value != "undefined") {
                $.fun.css.call([ this[0] ], "height", value + "px");
                return this;
            }
            return this[0].clientHeight;
        },
        scrollTop:function() {
            return this[0].scrollTop;
        },
        hasClass:function(name) {
            return (this[0] || this).className.match(new RegExp("(\\s|^)" + name + "(\\s|$)", "ig"));
        },
        toggleClass:function(name) {
            $.fun.each.call(this, function(i, elm) {
                $.fun.hasClass.call([ elm ], name) ? $.fun.removeClass.call([ elm ], name) :$.fun.addClass.call([ elm ], name);
            });
            return this;
        },
        addClass:function(name) {
            $.fun.each.call(this, function(i, elm) {
                if (!$.fun.hasClass.call(elm, name)) {
                    elm.className = $.trim(elm.className + " " + name);
                }
            });
            return this;
        },
        removeClass:function(name) {
            $.fun.each.call(this, function(i, elm) {
                var reg = new RegExp(name + "(\\s|$)", "ig");
                elm.className = $.trim(elm.className.replace(reg, ""));
            });
            return this;
        },
        remove:function() {
            $.fun.each.call(this, function(i, elm) {
                elm.parentNode.removeChild(elm);
            });
        },
        on:function(event, callback) {
            $.fun.each.call(this, function(i, elm) {
                event.split(/\s/).forEach(function(event) {
                    elm.addEventListener(event, callback, false);
                });
            });
            return this;
        },
        bind:function(event, callback) {
            $.fun.on.call(this, event, callback);
            return this;
        },
        unbind:function(event) {
            $.fun.each.call(this, function(i, elm) {
                event.split(/\s/).forEach(function(event) {
                    elm.removeEventListener(event, elm.event);
                });
            });
            return this;
        },
        trigger:function(event) {
            $.fun.each.call(this, function(i, elm) {
                var e;
                elm.dispatchEvent(e = d.createEvent("Events"), e.initEvent(event, true, false));
            });
            return this;
        },
        delegate:function(selector, event, callback) {
            $.fun.each.call(this, function(i, elm) {
                elm.addEventListener(event, function(event) {
                    var target = event.target, nodes = $$(selector);
                    while (target && [].indexOf.call(nodes, target) < 0) {
                        target = target.parentNode;
                    }
                    if (target && !(target === elm) && !(target === d)) callback.call(target, event);
                }, false);
            });
            return this;
        },
        live:function(event, callback) {
            $.fun.delegate.call($$("body"), this._selector_, event, callback);
            return this;
        }
    };
    /*AJAX Funcion*/
    function ajax(method, url, success, data, type) {
        data = data || null;
        var r = new XMLHttpRequest();
        if (success instanceof Function) {
            r.onreadystatechange = function() {
                if (r.readyState == 4 && (r.status == 200 || r.status == 0)) success(r.responseText);
            };
        }
        r.open(method, url, true);
        if (type) r.setRequestHeader("Accept", type);
        if (data instanceof Object) data = JSON.stringify(data), r.setRequestHeader("Content-Type", "application/json");
        r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        r.send(data);
    }
    $.get = function(url, success) {
        ajax("GET", url, success);
    };
    $.post = function(url, data, success, type) {
        if (data instanceof Function) type = type || success, success = data, data = null;
        ajax("POST", url, success, data, type);
    };
    $.getJSON = function(url, success) {
        $.get(url, function(json) {
            success(JSON.parse(json));
        });
    };
    $.extend = function(target, src) {
        if (!target) return target;
        for (k in src) target[k] = src[k];
        return target;
    };
    function $(_) {
        q = _.nodeType == 1 || _.nodeType == 9 || _ == window ? [ _ ] :new $$(_);
        $.extend(q, $.fun);
        return q;
    }
    return $;
}();

"$" in window || (window.$ = Zepto);

(function($) {
    /*Browser features*/
    var vendor = /webkit/i.test(navigator.appVersion) ? "webkit" :/firefox/i.test(navigator.userAgent) ? "Moz" :"opera" in window ? "O" :"";
    $.browser = {
        vendor:vendor,
        has3d:"WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
        hasTouch:"ontouchstart" in window,
        hasTransform:vendor + "Transform" in document.documentElement.style
    };
    /*Touch Event*/
    var tPoint = {}, touchTimeout, longTapTimeout;
    Touch = function() {
        var touchEvent = {
            touchstart:function(e) {
                cancelAll();
                tPoint = {};
                tPoint.end = {};
                tPoint.start = e.touches[0];
                tPoint.start.timestamp = e.timeStamp;
                tPoint.touch = true;
                longTapTimeout = setTimeout(function() {
                    tPoint.end.timestamp = e.timeStamp + 750;
                    checkEvent();
                }, 750);
            },
            touchmove:function(e) {
                tPoint.end = e.touches[0];
                cancelAll();
            },
            touchend:function(e) {
                cancelAll();
                tPoint.end.timestamp = e.timeStamp;
                tPoint.touch = false;
                checkEvent();
            },
            touchcancel:function(e) {
                cancelAll();
            }
        };
        function cancelLongTap() {
            if (longTapTimeout) clearTimeout(longTapTimeout);
            longTapTimeout = null;
        }
        function cancelTouch() {
            if (touchTimeout) clearTimeout(touchTimeout);
            touchTimeout = null;
        }
        function cancelAll() {
            cancelLongTap();
            cancelTouch();
        }
        function swipeDirection(xL, yL) {
            return Math.abs(yL) < 30 && Math.abs(xL) > 30 ? xL < 0 ? "left" :"right" :false;
        }
        function checkEvent() {
            if (touchTimeout) {
                return;
            }
            var _p = tPoint, _end = _p.end, _st = _p.start, target = _st.target, inter = _end.timestamp - _st.timestamp, xL = _end.pageX - _st.pageX, yL = _end.pageY - _st.pageY;
            if (!(xL && yL) && (inter < 250 || inter >= 750)) {
                //Tap
                $.fun.trigger.call($(target), inter < 250 ? "tap" :"longTap");
                touchTimeout = setTimeout(function() {
                    cancelTouch();
                }, 250);
            } else {
                var _dir = swipeDirection(xL, yL);
                //Swipe
                if (_dir) {
                    $.fun.trigger.call($(target), _dir == "left" ? "swipeLeft" :"swipeRight");
                }
            }
        }
        var touchName = "touchstart touchmove touchend touchcancel", d = $(document);
        d.unbind("touchstart touchmove touchend");
        touchName.split(/\s/).forEach(function(event) {
            $.fun.on.call(d, event, touchEvent[event]);
        });
        [ "swipe", "swipeLeft", "swipeRight", "tap", "longTap" ].forEach(function(eventName) {
            $.fun[eventName] = function(callback) {
                return this.on(eventName, callback);
            };
        });
        $(window).on("scroll", cancelAll);
    };
    $(function() {
        Touch();
    });
})(Zepto);
