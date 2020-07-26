! function(t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, n.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 27)
}([function(t, e) {
    class n {
        constructor() {
            0 == arguments.length ? (this.x = 0, this.y = 0, this.z = 0) : 3 == arguments.length ? (this.x = arguments[0], this.y = arguments[1], this.z = arguments[2]) : 1 == arguments.length && (arguments[0] instanceof n && (this.x = arguments[0].x), this.y = arguments[0].y, this.z = arguments[0].z)
        }
        strval() {
            var t = "(";
            return t += this.x + ", ", t += this.y + ", ", t += this.z, t += ")"
        }
        static add() {
            for (var t = arguments.length, e = 0, i = 0, r = 0, s = 0; s < t; s++) e += arguments[s].x, i += arguments[s].y, r += arguments[s].z;
            return new n(e, i, r)
        }
        static sub() {
            var t = arguments[0].x - arguments[1].x,
                e = arguments[0].y - arguments[1].y,
                i = arguments[0].z - arguments[1].z;
            return new n(t, e, i)
        }
        static mul() {
            var t, e, i, r = arguments[0],
                s = arguments[1];
            return r instanceof n ? (t = r.x * s, e = r.y * s, i = r.z * s) : s instanceof n && (t = r * s.x, e = r * s.y, i = r * s.z), new n(t, e, i)
        }
        static div() {
            var t = arguments[0],
                e = arguments[1],
                i = t.x / e,
                r = t.y / e,
                s = t.z / e;
            return new n(i, r, s)
        }
        static dot() {
            var t = arguments[0],
                e = arguments[1];
            return t.x * e.x + t.y * e.y + t.z * e.z
        }
        static cross() {
            var t = arguments[0],
                e = arguments[1],
                i = t.y * e.z - t.z * e.y,
                r = t.z * e.x - t.x * e.z,
                s = t.x * e.y - t.y * e.x;
            return new n(i, r, s)
        }
        len() {
            return Math.sqrt(n.dot(this, this))
        }
        unit() {
            var t = this.len(),
                e = new n;
            return t > 0 && (e = n.div(this, t)), e
        }
        neg() {
            var t = -this.x,
                e = -this.y,
                i = -this.z;
            return new n(t, e, i)
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e, n) {
    var i = n(0)();

    function r() {
        13 == arguments.length ? (this.i = arguments[0], this.m = arguments[1], this.D = arguments[2], this.q = arguments[3], this.c = arguments[4], this.r = arguments[5], this.v = arguments[6], this.A = arguments[7], this.k = arguments[8], this.M = arguments[9], this.I = arguments[10], this.the = arguments[11], this.w = arguments[12]) : 1 == arguments.length ? (this.i = arguments[0].i, this.m = arguments[0].m, this.D = arguments[0].D, this.q = arguments[0].q, this.c = arguments[0].c, this.r = arguments[0].r, this.v = arguments[0].v, this.A = arguments[0].A, this.k = arguments[0].k, this.M = arguments[0].M, this.I = arguments[0].I, this.the = arguments[0].the, this.w = arguments[0].w) : (this.i = 0, this.m = 1, this.D = 1, this.q = 1, this.c = "#000", this.r = new i, this.v = new i, this.A = 0, this.k = new Array, this.M = 0, this.I = 10, this.the = 0, this.w = 0), this.strval = function() {
            var t = "(";
            return t += this.i + ", ", t += this.m + ", ", t += this.D + ", ", t += this.q + ", ", t += this.c + ", ", t += this.r.strval() + ", ", t += this.v.strval() + ", ", t += this.A + ", ", t += this.k + ", ", t += this.M + ", ", t += this.I + ", ", t += this.the + ", ", t += this.w + ")"
        }
    }
    t.exports = function() {
        return r
    }
}, function(t, e) {
    class n {
        constructor() {
            this.name = "Sequence", this.value = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], this.pos = 0, 1 == arguments.length && (this.value = arguments[0]), this.end = this.value.length
        }
        ping() {
            var t = this.value[this.pos];
            return this.pos++, this.pos == this.end && (this.pos = 0), t
        }
        static test() {
            for (var t = new n, e = 0; e < 16; e++) console.log(t.ping())
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    class n {
        constructor() {
            if (0 == arguments.length) {
                var t = "Bgroup requires id (and parentId) as arguments";
                throw new Error(t)
            }
            if (1 == arguments.length) {
                this.id = arguments[0], this.parentId = "document.body";
                t = "Bgroup " + this.id + " assumes that parent is document.body";
                console.warn(t)
            } else this.id = arguments[0], this.parentId = arguments[1];
            if (void 0 != document.getElementById(this.id)) {
                t = this.id + " exists";
                throw new Error(t)
            }
            this.createAllStyle(this.id), this.bgroupcs = "bgroup" + this.id, this.buttoncs = "button" + this.id;
            var e = document.createElement("div");
            (e.id = this.id, e.className = this.bgroupcs, this.bgroup = e, "document.body" == this.parentId) ? document.body.append(this.bgroup): document.getElementById(this.parentId).append(this.bgroup);
            this.buttons = [], this.funcs = []
        }
        setBackground(t) {
            Style.changeStyleAttribute("." + this.bgroupcs, "background", t)
        }
        setWidth(t) {
            Style.changeStyleAttribute("." + this.bgroupcs, "width", t)
        }
        setHeight(t) {
            Style.changeStyleAttribute("." + this.bgroupcs, "height", t)
        }
        addButton(t, e) {
            if (this.buttons.indexOf(t) < 0) this.buttons.push(t);
            else {
                var n = "Duplicate label " + t + " is igonered";
                console.warn(n)
            }
            for (var i = this.buttons.length, r = 0; r < i; r++) {
                var s, a = this.id + this.buttons[r];
                if (void 0 == (s = document.getElementById(a)))(s = document.createElement("button")).id = a, s.className = this.buttoncs, s.innerHTML = this.buttons[r], s.addEventListener("click", buttonClick), this.bgroup.append(s)
            }
        }
        removeButton(t) {
            var e = this.buttons.indexOf(t),
                n = this.buttons.splice(e, 1);
            if (e < 0) {
                var i = "Unexisting label " + t + " for removing is igonered";
                console.warn(i)
            }
            var r = this.id + n;
            document.getElementById(r).remove(), this.updateTabButtonsWidth()
        }
        disable(t) {
            var e = this.buttons.indexOf(t);
            if (e < 0) {
                var n = "Disable button " + t + " of unexisting is igonered";
                console.warn(n)
            } else {
                var i = this.id + this.buttons[e];
                document.getElementById(i).disabled = !0
            }
        }
        enable(t) {
            var e = this.buttons.indexOf(t);
            if (e < 0) {
                var n = "Enable button " + t + " of unexisting is igonered";
                console.warn(n)
            } else {
                var i = this.id + this.buttons[e];
                document.getElementById(i).disabled = !1
            }
        }
        setCaption(t) {
            var e = this.buttons.indexOf(t),
                n = this.id + this.buttons[e];
            if (!(e < 0)) return {
                to: function(t) {
                    document.getElementById(n).innerHTML = t
                }
            };
            var i = "Set button caption " + t + " of unexisting is igonered";
            console.warn(i)
        }
        createAllStyle(t) {
            Style.createStyle(".bgroup" + t + " {\n\t\t\toverflow: hidden;\n\t\t\twidth: 150px;\n\t\t\theight: 100px;\n\t\t\tbackground: #f1f1f1;\n\t\t\tborder: 1px solid #ccc;\n\t\t\tpadding: 4px 4px;\n\t\t\tfloat: left;\n\t\t}\n\t\t"), Style.createStyle(".button" + t + " {\n\t\t\tbackground: #ddd;\n\t\t\tfloat: left;\n\t\t\twidth: 60px;\n\t\t\twhite-space: nowrap;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t\t")
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    class n {
        constructor() {
            if (0 == arguments.length) {
                var t = "Tabs requires id (and parentId) as arguments";
                throw new Error(t)
            }
            if (1 == arguments.length) {
                this.id = arguments[0], this.parentId = "document.body";
                t = "Tabs " + this.id + " assumes that parent is document.body";
                console.warn(t)
            } else this.id = arguments[0], this.parentId = arguments[1];
            if (void 0 != document.getElementById(this.id)) {
                t = this.id + " exists";
                throw new Error(t)
            }
            this.createAllStyle(this.id), this.tabcs = "tab" + this.id, this.tabbtncs = "tab" + this.id + " button", this.tablinkscs = "tablinks" + this.id, this.divcontcs = "divcontent" + this.id, this.tabcontcs = "tabcontent" + this.id, localStorage.setItem(this.tablinkscs, this.tablinkscs), localStorage.setItem(this.tabcontcs, this.tabcontcs);
            var e = document.createElement("div");
            (e.id = this.id, e.className = this.tabcs, this.tab = e, "document.body" == this.parentId) ? document.body.append(this.tab): document.getElementById(this.parentId).append(this.tab);
            this.tabs = [], this.tabsType = []
        }
        setBackground(t) {
            Style.changeStyleAttribute("." + this.tabcs, "background", t)
        }
        setWidth(t) {
            Style.changeStyleAttribute("." + this.tabcs, "width", t)
        }
        setHeight(t) {
            Style.changeStyleAttribute("." + this.tabcs, "height", t)
        }
        addTab(t, e) {
            var n = this.id + "div";
            if (void 0 != (r = document.getElementById(n)) && r.remove(), this.tabs.indexOf(t) < 0) this.tabs.push(t), this.tabsType.push(e);
            else {
                var i = "Duplicate label " + t + " is igonered";
                console.warn(i)
            }
            for (var r, s = this.tabs.length, a = 0; a < s; a++) {
                var o, c = this.id + this.tabs[a];
                if (void 0 == (o = document.getElementById(c)))(o = document.createElement("button")).id = c, o.className = this.tablinkscs, o.innerHTML = this.tabs[a], o.addEventListener("click", this.toggleContent), this.tab.append(o)
            }
            void 0 == (r = document.getElementById(n)) && ((r = document.createElement("div")).id = n, r.className = this.divcontcs, this.tab.append(r));
            var h = parseInt(Style.getStyleAttribute("." + this.tabcs, "width")) - parseInt(Style.getStyleAttribute("." + this.divcontcs, "paddingLeft")) - parseInt(Style.getStyleAttribute("." + this.divcontcs, "paddingRight")) - 14 + "px";
            Style.changeStyleAttribute("." + this.tabcontcs, "width", h);
            var l = parseInt(Style.getStyleAttribute("." + this.tabcs, "height")) - parseInt(Style.getStyleAttribute("." + this.divcontcs, "paddingTop")) - parseInt(Style.getStyleAttribute("." + this.divcontcs, "paddingBottom")) - 38 + "px";
            Style.changeStyleAttribute("." + this.tabcontcs, "height", l);
            for (a = 0; a < s; a++) {
                var u;
                c = this.id + this.tabs[a] + "content";
                if (void 0 == (u = document.getElementById(c))) 0 == this.tabsType[a] ? ((u = document.createElement("textarea")).className = this.tabcontcs, u.innerHTML = this.tabs[a]) : 1 == this.tabsType[a] && ((u = document.createElement("canvas")).className = this.tabcontcs, u.width = parseInt(h), u.height = parseInt(l), u.getContext("2d").font = "12px Courier", u.getContext("2d").fillText(this.tabs[a], 2, 10), u.getContext("2d").beginPath(), u.getContext("2d").arc(45, 45, 20, 0, 2 * Math.PI), u.getContext("2d").stroke(), u.getContext("2d").beginPath(), u.getContext("2d").arc(55, 25, 10, 0, 2 * Math.PI), u.getContext("2d").stroke()), u.id = c, r.append(u)
            }
            this.updateTabButtonsWidth(), this.toggleContent(0)
        }
        removeTab(t) {
            var e = this.tabs.indexOf(t),
                n = this.tabs.splice(e, 1);
            if (this.tabsType.splice(e, 1), e < 0) {
                var i = "Unexisting label " + t + " for removing is igonered";
                console.warn(i)
            }
            var r = this.id + n;
            document.getElementById(r).remove(), this.updateTabButtonsWidth();
            var s = this.id + n + "content";
            document.getElementById(s).remove(), this.toggleContent(0)
        }
        updateTabButtonsWidth() {
            var t = this.tabs.length;
            if (document.getElementsByClassName(this.tablinkscs).length == t) {
                var e = Style.getStyleAttribute("." + this.tabcs, "width"),
                    n = parseInt(e) / t + "px";
                Style.changeStyleAttribute("." + this.tabbtncs, "width", n)
            }
        }
        getStyleClassName() {
            var t = [];
            return t.push(this.tabcs), t.push(this.tabbtncs), t.push(this.tablinkscs), t.push(this.tabcontcs), t
        }
        toggleContent() {
            if (void 0 != event) {
                for (var t = event.target.parentElement, e = localStorage.getItem("tablinks" + t.id), n = localStorage.getItem("tabcontent" + t.id), i = (c = document.getElementsByClassName(e)).length, r = 0; r < i; r++) {
                    var s = c[r].className.replace("active", "");
                    c[r].className = s
                }
                for (i = (h = document.getElementsByClassName(n)).length, r = 0; r < i; r++) h[r].style.display = "none";
                var a = event.target;
                a.className += " active";
                var o = a.id + "content";
                document.getElementById(o).style.display = "block"
            } else {
                r = arguments[0], o = this.id, e = localStorage.getItem("tablinks" + o), n = localStorage.getItem("tabcontent" + o);
                var c = document.getElementsByClassName(e),
                    h = document.getElementsByClassName(n);
                if (c.length > 0 && h.length > 0) {
                    s = c[r].className.replace("active", "");
                    c[r].className = s, c[r].className += " active", h[r].style.display = "block"
                }
            }
        }
        createAllStyle(t) {
            Style.createStyle(".tab" + t + " {\n\t\t\toverflow: hidden;\n\t\t\twidth: 240px;\n\t\t\theight: 200px;\n\t\t\tbackground: #f1f1f1;\n\t\t\tborder: 1px solid #ccc;\n\t\t\tfloat: left;\n\t\t}\n\t\t"), Style.createStyle(".tab" + t + " button {\n\t\t\tbackground: #ddd;\n\t\t\tfloat: left;\n\t\t\toutline: none;\n\t\t\tborder: none;\n\t\t\tpadding: 6px 6px;\n\t\t\twidth: 60px;\n\t\t\theight: 28px;\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t\t"), Style.createStyle(".tab" + t + " button:hover {\n\t\t\tbackground: #e7e7e7;\n\t\t\tcolor: #000;\n\t\t}\n\t\t"), Style.createStyle(".tab" + t + " button.active {\n\t\t\tbackground: #f1f1f1;\n\t\t\tcolor: #000;\n\t\t}\n\t\t"), Style.createStyle(".divcontent" + t + " {\n\t\t\tclear: both;\n\t\t\tpadding: 4px 4px;\n\t\t\tbackground: inherit;\n\t\t}\n\t\t"), Style.createStyle(".tabcontent" + t + " {\n\t\t\twidth: 182px;\n\t\t\tdisplay: none;\n\t\t\tpadding: 4px 6px;\n\t\t\toverflow-Y: scroll;\n\t\t\tborder: 1px solid #aaa;\n\t\t\tbackground: #fff;\n\t\t\tmargin: 0px;\n\t\t}\n\t\t")
        }
        textarea(t) {
            var e = this.tabs.indexOf(t),
                n = this.id + this.tabs[e] + "content",
                i = document.getElementById(n);
            if (!(i instanceof HTMLTextAreaElement)) {
                var r = "Tabs " + this.id + " " + t + " is not as a textarea";
                throw new Error(r)
            }
            return i
        }
        canvas(t) {
            var e = this.tabs.indexOf(t),
                n = this.id + this.tabs[e] + "content",
                i = document.getElementById(n);
            if (!(i instanceof HTMLCanvasElement)) {
                var r = "Tabs " + this.id + " " + t + " is not as a canvas";
                throw new Error(r)
            }
            return i
        }
        element(t) {
            var e = this.tabs.indexOf(t),
                n = this.id + this.tabs[e] + "content";
            return document.getElementById(n)
        }
        text(t) {
            var e = this.tabs.indexOf(t),
                n = this.id + this.tabs[e] + "content",
                i = document.getElementById(n);
            if (i instanceof HTMLTextAreaElement) {
                var r = i.value.split("\n");
                return {
                    push: function(t) {
                        1 == r.length && 0 == r[0].length ? r[0] = t : r.push(t);
                        var e = r.join("\n");
                        i.value = e
                    },
                    pop: function() {
                        var t = r.pop(),
                            e = r.join("\n");
                        return i.value = e, t
                    },
                    popAll: function() {
                        return i.value, r
                    },
                    clear: function() {
                        i.value = ""
                    }
                }
            }
            var s = this.id + " " + this.tabs[e] + " is not a textarea";
            throw new Error(s)
        }
        graphic(t) {
            var e = this.tabs.indexOf(t),
                n = this.id + this.tabs[e] + "content",
                i = document.getElementById(n),
                r = i instanceof HTMLCanvasElement,
                s = i.getContext("2d");
            if (r) return i.RANGE = [0, i.height, i.width, 0], {
                setCoord: function(t) {
                    i.range = t
                },
                getCoord: function() {
                    return i.range
                },
                getCOORD: function() {
                    return i.RANGE
                },
                setLineColor: function(t) {
                    s.strokeStyle = t
                },
                setFillColor: function(t) {
                    s.fillStyle = t
                },
                trect: function(t, e, n, r) {
                    var s = Transformation.linearTransform(t, [i.range[0], i.range[2]], [i.RANGE[0], i.RANGE[2]]),
                        a = Transformation.linearTransform(e, [i.range[1], i.range[3]], [i.RANGE[1], i.RANGE[3]]);
                    return [s, a, Transformation.linearTransform(t + n, [i.range[0], i.range[2]], [i.RANGE[0], i.RANGE[2]]) - s, Transformation.linearTransform(e + r, [i.range[1], i.range[3]], [i.RANGE[1], i.RANGE[3]]) - a]
                },
                rect: function(t, e, n, i) {
                    var r = this.trect(t, e, n, i);
                    s.rect(r[0], r[1], r[2], r[3])
                },
                strokeRect: function(t, e, n, i) {
                    var r = this.trect(t, e, n, i);
                    s.strokeRect(r[0], r[1], r[2], r[3])
                },
                fillRect: function(t, e, n, i) {
                    var r = this.trect(t, e, n, i);
                    s.fillRect(r[0], r[1], r[2], r[3])
                },
                arc: function(t, e, n, i, r) {
                    var a = this.trect(t, e, n, n);
                    s.beginPath(), s.arc(a[0], a[1], a[2], i, r), s.stroke()
                },
                strokeCircle: function(t, e, n) {
                    this.arc(t, e, n, 0, 2 * Math.PI)
                },
                fillCircle: function(t, e, n) {
                    this.arc(t, e, n, 0, 2 * Math.PI), s.fill()
                },
                setPointType: function(t) {
                    i.pointType = t
                },
                setPointSize: function(t) {
                    i.pointSize = t
                },
                point: function(t, e) {
                    var n = i.pointSize,
                        r = i.pointType;
                    if ("circle" == r) {
                        var a = this.trect(t, e, n, n);
                        s.beginPath(), s.arc(a[0], a[1], .5 * n, 0, 2 * Math.PI), s.stroke()
                    } else if ("box" == r) {
                        a = this.trect(t, e, n, n);
                        var o = .5 * n;
                        s.strokeRect(a[0] - o, a[1] - o, n, n)
                    }
                },
                points: function(t, e) {
                    for (var n = t.length, i = e.length, r = Math.min(n, i), s = 0; s < r; s++) this.point(t[s], e[s])
                },
                lines: function(t, e) {
                    var n = t.length,
                        i = e.length,
                        r = Math.min(n, i);
                    s.beginPath();
                    for (var a = 0; a < r; a++) {
                        var o = t[a],
                            c = e[a],
                            h = this.trect(o, c, 0, 0);
                        0 == a ? s.moveTo(h[0], h[1]) : s.lineTo(h[0], h[1])
                    }
                    s.stroke()
                },
                clear: function() {
                    s.clearRect(0, 0, i.width, i.height)
                }
            };
            var a = this.id + " " + this.tabs[e] + " is not a canvas";
            throw new Error(a)
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e, n) {
    var i = n(0)();
    t.exports = {
        getFrom: function(t) {
            return function(t) {
                return {
                    valueOf: function(e) {
                        for (var n, r = t.split("\n"), s = r.length, a = 0; a < s; a++)
                            if (-1 != r[a].indexOf(e)) {
                                var o = r[a].split(" "),
                                    c = o.length;
                                if (2 == c) n = parseFloat(o[1]);
                                else if (4 == c) {
                                    var h = parseFloat(o[1]),
                                        l = parseFloat(o[2]),
                                        u = parseFloat(o[3]);
                                    n = new i(h, l, u)
                                } else 5 == c && (n = [parseFloat(o[1]), parseFloat(o[2]), parseFloat(o[3]), parseFloat(o[4])])
                            } return n
                    },
                    column: function(e) {
                        for (var n = t.split("\n"), i = n.length, r = [], s = 0; s < i; s++) {
                            var a = n[s].split(" ");
                            r.push(parseFloat(a[e]))
                        }
                        return r
                    }
                }
            }(t)
        }
    }
}, function(t, e) {
    var n = [];

    function i(t) {
        for (var e = document.getElementsByClassName("tablinkscan"), n = e.length, i = 0; i < n; i++) {
            var r = e[i].className.replace("active", "");
            e[i].className = r
        }
        var s = document.getElementsByClassName("tabcontentcan");
        for (n = s.length, i = 0; i < n; i++) s[i].style.display = "none";
        var a = t.target;
        if (void 0 != a) {
            a.className += " active";
            var o = "can" + a.id.substring(3);
            document.getElementById(o).style.display = "block"
        } else {
            o = t;
            e[0].className += " active", s[0].style.display = "block"
        }
    }
    t.exports = {
        createTabCanvasIO: function(t, e, r) {
            return function(t, e, r) {
                Style.createStyle("\n\t.tabcan {\n\t\toverflow: hidden;\n\t\twidth: 200px;\n\t\theight: 300px;\n\t\tbackground: #f1f1f1;\n\t\tborder: 1px solid #ccc;\n\t\tfloat: left;\n\t}\n\t"), Style.createStyle("\n\t.tabcan button {\n\t\tbackground: #ddd;\n\t\tfloat: left;\n\t\toutline: none;\n\t\tborder: none;\n\t\tpadding: 6px 6px;\n\t\twidth: 60px;\n\t\theight: 28px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t"), Style.createStyle("\n\t.tabcan button:hover {\n\t\tbackground: #e7e7e7;\n\t\tcolor: #000;\n\t}\n\t"), Style.createStyle("\n\t.tabcan button.active {\n\t\tbackground: #f1f1f1;\n\t\tcolor: #000;\n\t}\n\t"), Style.createStyle("\n\t.divcontentcan {\n\t\tclear: both;\n\t\tpadding: 4px 4px;\n\t\tbackground: inherit;\n\t}\n\t"), Style.createStyle("\n\t.tabcontentcan {\n\t\twidth: 182px;\n\t\tdisplay: none;\n\t\tpadding: 4px 6px;\n\t\toverflow-Y: scroll;\n\t\tborder: 1px solid #aaa;\n\t}\n\t"), width = r.width, height = r.height;
                var s = t.length,
                    a = document.createElement("div");
                a.className = "tabcan", Style.changeStyleAttribute(".tabcan", "width", width), Style.changeStyleAttribute(".tabcan", "height", height), e.append(a);
                var o = Math.floor(parseInt(r.width) / s) + "px";
                Style.changeStyleAttribute(".tabcan button", "width", o);
                for (var c = 0; c < s; c++) {
                    var h = document.createElement("button");
                    h.id = "btc" + t[c], h.innerHTML = t[c], h.className = "tablinkscan", h.addEventListener("click", i), a.append(h)
                }
                var l = document.createElement("div");
                for (l.className = "divcontentcan", l.id = "divMenuCan", c = 0; c < s; c++) {
                    var u = document.createElement("textarea");
                    u.id = "can" + t[c], n.push(u.id), u.innerHTML = t[c], u.className = "tabcontentcan", l.append(u)
                }
                a.append(l);
                var d = Style.getStyleAttribute(".tabcan button", "paddingTop"),
                    f = Style.getStyleAttribute(".tabcan button", "paddingBottom"),
                    p = Style.getStyleAttribute(".tabcan button", "height"),
                    v = parseInt(height) - parseInt(p) - parseInt(d) - parseInt(f) + "px";
                Style.changeStyleAttribute(".divcontent", "height", v);
                var g = Style.getStyleAttribute(".divcontentcan", "paddingTop"),
                    b = Style.getStyleAttribute(".divcontentcan", "paddingBottom"),
                    m = Style.getStyleAttribute(".tabcontentcan", "borderWidth"),
                    y = parseInt(v) - parseInt(g) - parseInt(b) + 2 * parseInt(m) + "px";
                Style.changeStyleAttribute(".tabcontentcan", "height", y);
                var w = Style.getStyleAttribute(".tabcontentcan", "paddingLeft"),
                    x = Style.getStyleAttribute(".tabcontentcan", "paddingRight"),
                    S = parseInt(width) - parseInt(w) - parseInt(x) - 10 + "px";
                return Style.changeStyleAttribute(".tabcontentcan", "width", S), i(0), n
            }(t, e, r)
        },
        openTabCanvas: function(t) {
            return i(t)
        },
        setId: function(t) {
            return function(t) {
                n[t]
            }(t)
        },
        pop: function() {
            return t = document.getElementById(taId), e = t.value, n = e.split("\n"), i = n.pop(), e = n.join("\n"), t.value = e, i;
            var t, e, n, i
        },
        push: function(t) {
            return function(t) {
                var e = document.getElementById(taId),
                    n = e.value,
                    i = n.split("\n");
                i.push(t), n = i.join("\n"), e.value = n
            }(t)
        }
    }
}, function(t, e) {
    var n, i = [];

    function r(t) {
        for (var e = document.getElementsByClassName("tablinks"), n = e.length, i = 0; i < n; i++) {
            var r = e[i].className.replace("active", "");
            e[i].className = r
        }
        var s = document.getElementsByClassName("tabcontent");
        for (n = s.length, i = 0; i < n; i++) s[i].style.display = "none";
        var a = t.target;
        if (void 0 != a) {
            a.className += " active";
            var o = "ta" + a.id.substring(3);
            document.getElementById(o).style.display = "block"
        } else {
            o = t;
            e[0].className += " active", s[0].style.display = "block"
        }
    }
    t.exports = {
        createTabTextIO: function(t, e, n) {
            return function(t, e, n) {
                Style.createStyle("\n\t.tab {\n\t\toverflow: hidden;\n\t\twidth: 200px;\n\t\theight: 300px;\n\t\tbackground: #f1f1f1;\n\t\tborder: 1px solid #ccc;\n\t\tfloat: left;\n\t}\n\t"), Style.createStyle("\n\t.tab button {\n\t\tbackground: #ddd;\n\t\tfloat: left;\n\t\toutline: none;\n\t\tborder: none;\n\t\tpadding: 6px 6px;\n\t\twidth: 60px;\n\t\theight: 28px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t"), Style.createStyle("\n\t.tab button:hover {\n\t\tbackground: #e7e7e7;\n\t\tcolor: #000;\n\t}\n\t"), Style.createStyle("\n\t.tab button.active {\n\t\tbackground: #f1f1f1;\n\t\tcolor: #000;\n\t}\n\t"), Style.createStyle("\n\t.divcontent {\n\t\tclear: both;\n\t\tpadding: 4px 4px;\n\t\tbackground: inherit;\n\t}\n\t"), Style.createStyle("\n\t.tabcontent {\n\t\twidth: 182px;\n\t\tdisplay: none;\n\t\tpadding: 4px 6px;\n\t\toverflow-Y: scroll;\n\t\tborder: 1px solid #aaa;\n\t}\n\t"), width = n.width, height = n.height;
                var s = t.length,
                    a = document.createElement("div");
                a.className = "tab", Style.changeStyleAttribute(".tab", "width", width), Style.changeStyleAttribute(".tab", "height", height), e.append(a);
                var o = Math.floor(parseInt(n.width) / s) + "px";
                Style.changeStyleAttribute(".tab button", "width", o);
                for (var c = 0; c < s; c++) {
                    var h = document.createElement("button");
                    h.id = "btn" + t[c], h.innerHTML = t[c], h.className = "tablinks", h.addEventListener("click", r), a.append(h)
                }
                var l = document.createElement("div");
                for (l.className = "divcontent", l.id = "divMenu", c = 0; c < s; c++) {
                    var u = document.createElement("textarea");
                    u.id = "ta" + t[c], i.push(u.id), u.innerHTML = t[c], u.className = "tabcontent", l.append(u)
                }
                a.append(l);
                var d = Style.getStyleAttribute(".tab button", "paddingTop"),
                    f = Style.getStyleAttribute(".tab button", "paddingBottom"),
                    p = Style.getStyleAttribute(".tab button", "height"),
                    v = parseInt(height) - parseInt(p) - parseInt(d) - parseInt(f) + "px";
                Style.changeStyleAttribute(".divcontent", "height", v);
                var g = Style.getStyleAttribute(".divcontent", "paddingTop"),
                    b = Style.getStyleAttribute(".divcontent", "paddingBottom"),
                    m = Style.getStyleAttribute(".tabcontent", "borderWidth"),
                    y = parseInt(v) - parseInt(g) - parseInt(b) + 2 * parseInt(m) + "px";
                Style.changeStyleAttribute(".tabcontent", "height", y);
                var w = Style.getStyleAttribute(".tabcontent", "paddingLeft"),
                    x = Style.getStyleAttribute(".tabcontent", "paddingRight"),
                    S = parseInt(width) - parseInt(w) - parseInt(x) - 10 + "px";
                return Style.changeStyleAttribute(".tabcontent", "width", S), r(0), i
            }(t, e, n)
        },
        openTabText: function(t) {
            return r(t)
        },
        setId: function(t) {
            return function(t) {
                n = i[t]
            }(t)
        },
        pop: function() {
            return t = document.getElementById(n), e = t.value, i = e.split("\n"), r = i.pop(), e = i.join("\n"), t.value = e, r;
            var t, e, i, r
        },
        push: function(t) {
            return function(t) {
                var e = document.getElementById(n),
                    i = e.value,
                    r = i.split("\n");
                r.push(t), i = r.join("\n"), e.value = i
            }(t)
        }
    }
}, function(t, e) {
    t.exports = {
        linearTransform: function(t, e, n) {
            return function(t, e, n) {
                var i = e[0],
                    r = e[1],
                    s = n[0];
                return (t - i) * ((n[1] - s) / (r - i)) + s
            }(t, e, n)
        }
    }
}, function(t, e) {
    class n {
        constructor(t) {
            this.coefs = [0], this.order = 0, arguments.length > 0 && (this.coefs = t, this.calcOrder())
        }
        calcOrder() {
            var t = this.coefs.length;
            this.order = t
        }
        setCoefs(t) {
            this.coefs = t, this.calcOrder()
        }
        getCoefs() {
            return this.coefs
        }
        value(t) {
            for (var e = 1, n = 0, i = this.order, r = 0; r < i; r++) {
                n += this.coefs[r] * e, e *= t
            }
            return n
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    function n(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) {
            var c = 2 * t(a) - t(a + r / 2);
            c += 2 * t(a + r), s += c *= r / 3, a += r
        }
        return s
    }

    function i(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) {
            var c = 7 * t(a) + 32 * t(a + r / 4);
            c += 12 * t(a + 2 * r / 4), c += 32 * t(a + 3 * r / 4) + 7 * t(a + r), s += c *= r / 90, a += r
        }
        return s
    }

    function r(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) {
            var c = t(a) + 3 * t(a + r / 3);
            c += 3 * t(a + 2 * r / 3) + t(a + r), s += c *= r / 8, a += r
        }
        return s
    }

    function s(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) {
            var c = t(a) + 4 * t(a + r / 2) + t(a + r);
            s += c *= r / 6, a += r
        }
        return s
    }

    function a(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) {
            s += (t(a) + t(a + r)) * r / 2, a += r
        }
        return s
    }

    function o(t, e, n, i) {
        for (var r = (n - e) / i, s = 0, a = e + r / 2, o = 0; o < i; o++) {
            s += t(a) * r, a += r
        }
        return s
    }
    t.exports = {
        integMilneError: function(t, e, i, r) {
            return function(t, e, i, r) {
                for (var s = 1, a = n(t, e, i, s), o = 1; o > r;) {
                    var c = n(t, e, i, s *= 2);
                    o = Math.abs(c - a), a = c
                }
                return a
            }(t, e, i, r)
        },
        integMilneN: function(t, e, i, r) {
            return n(t, e, i, r)
        },
        integBooleError: function(t, e, n, r) {
            return function(t, e, n, r) {
                for (var s = 1, a = i(t, e, n, s), o = 1; o > r;) {
                    var c = i(t, e, n, s *= 2);
                    o = Math.abs(c - a), a = c
                }
                return a
            }(t, e, n, r)
        },
        integBooleN: function(t, e, n, r) {
            return i(t, e, n, r)
        },
        integSimps38Error: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var s = 1, a = r(t, e, n, s), o = 1; o > i;) {
                    var c = r(t, e, n, s *= 2);
                    o = Math.abs(c - a), a = c
                }
                return a
            }(t, e, n, i)
        },
        integSimps38N: function(t, e, n, i) {
            return r(t, e, n, i)
        },
        integSimpsError: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var r = 1, a = s(t, e, n, r), o = 1; o > i;) {
                    var c = s(t, e, n, r *= 2);
                    o = Math.abs(c - a), a = c
                }
                return a
            }(t, e, n, i)
        },
        integSimpsN: function(t, e, n, i) {
            return s(t, e, n, i)
        },
        integTrapezError: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var r = 1, s = a(t, e, n, r), c = 1; c > i;) {
                    var h = o(t, e, n, r *= 2);
                    c = Math.abs(h - s), s = h
                }
                return s
            }(t, e, n, i)
        },
        integTrapezN: function(t, e, n, i) {
            return a(t, e, n, i)
        },
        integRectError: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var r = 1, s = o(t, e, n, r), a = 1; a > i;) {
                    var c = o(t, e, n, r *= 2);
                    a = Math.abs(c - s), s = c
                }
                return s
            }(t, e, n, i)
        },
        integRectNBeg: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var r = (n - e) / i, s = 0, a = e, o = 0; o < i; o++) s += t(a) * r, a += r;
                return s
            }(t, e, n, i)
        },
        integRectNMid: function(t, e, n, i) {
            return o(t, e, n, i)
        },
        integRectNEnd: function(t, e, n, i) {
            return function(t, e, n, i) {
                for (var r = (n - e) / i, s = 0, a = e + r, o = 0; o < i; o++) s += t(a) * r, a += r;
                return s
            }(t, e, n, i)
        }
    }
}, function(t, e) {
    class n {
        constructor() {
            var t = arguments.length,
                e = [];
            if (0 == t) {
                throw new Error("Pile requires at least one dimension size")
            }
            if (1 == t) {
                this.Nx = arguments[0];
                for (var n = 0; n < this.Nx; n++) {
                    var i = 0;
                    e.push(i)
                }
            } else if (2 == t) {
                this.Nx = arguments[0], this.Ny = arguments[1];
                for (var r = 0; r < this.Ny; r++) {
                    var s = [];
                    for (n = 0; n < this.Nx; n++) {
                        i = 0;
                        s.push(i)
                    }
                    e.push(s)
                }
            } else if (3 == t) {
                this.Nx = arguments[0], this.Ny = arguments[1], this.Nz = arguments[2];
                for (var a = 0; a < this.Nz; a++) {
                    var o = [];
                    for (r = 0; r < this.Ny; r++) {
                        for (s = [], n = 0; n < this.Nx; n++) {
                            i = 0;
                            s.push(i)
                        }
                        o.push(s)
                    }
                    e.push(o)
                }
            }
            this.value = e, this.dimension = t
        }
        setFill(t) {
            this.fillType = t
        }
        fillGrid() {
            var t = arguments.length;
            if (0 == t) {
                var e = "Pile is empty";
                throw new Error(e)
            }
            if (t != this.dimension) {
                e = "Dimension mismatch";
                throw new Error(e)
            }
            if (1 == t)
                for (var n = arguments[0][0], i = arguments[0][1], r = n; r <= i; r++) void 0 == this.fillType ? this.value[r] = 1 : this.value[r] = this.fillType;
            else if (2 == t) {
                n = arguments[0][0], i = arguments[0][1];
                for (var s = arguments[1][0], a = arguments[1][1], o = s; o <= a; o++)
                    for (r = n; r <= i; r++) void 0 == this.fillType ? this.value[o][r] = 1 : this.value[o][r] = this.fillType
            } else if (3 == t) {
                n = arguments[0][0], i = arguments[0][1], s = arguments[1][0], a = arguments[1][1];
                for (var c = arguments[2][0], h = arguments[2][1], l = c; l <= h; l++)
                    for (o = s; o <= a; o++)
                        for (r = n; r <= i; r++) void 0 == this.fillType ? this.value[l][o][r] = 1 : this.value[l][o][r] = this.fillType
            }
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    function n(t) {
        for (var e = t.length, n = t[0].length, i = 0, r = 0; r < e; r++)
            for (var s = 0; s < n; s++) i = t[r][s] > i ? t[r][s] : i;
        return i
    }
    t.exports = {
        createBlockTablet: function(t, e, n) {
            return function(t, e, n) {
                for (var i = [], r = 0; r < n; r++) {
                    for (var s = [], a = 0; a < e; a++) {
                        for (var o = [], c = 0; c < t; c++) {
                            var h = 0 == c || c == t - 1 || 0 == a || a == e - 1 || 0 == r || r == n - 1 ? 0 : 1;
                            o.push(h)
                        }
                        s.push(o)
                    }
                    i.push(s)
                }
                return i
            }(t, e, n)
        },
        setMaxValue: function(t, e) {
            return function(t, e) {
                for (var n = t.length, i = t[0].length, r = t[0][0].length, s = 0; s < n; s++)
                    for (var a = 0; a < i; a++)
                        for (var o = 0; o < r; o++) t[s][a][o] *= e
            }(t, e)
        },
        stepDissolve: function(t) {
            return function(t) {
                for (var e = t.length, n = t[0].length, i = t[0][0].length, r = 0; r < e; r++)
                    for (var s = 0; s < n; s++)
                        for (var a = 0; a < i; a++)
                            if (0 < a && a < i - 1 && 0 < s && s < n - 1 && 0 < r && r < e - 1) {
                                var o = t[r][s][a],
                                    c = 0;
                                0 == t[r][s][a - 1] && c++, 0 == t[r][s][a + 1] && c++, 0 == t[r][s - 1][a] && c++, 0 == t[r][s + 1][a] && c++, 0 == t[r - 1][s][a] && c++, 0 == t[r + 1][s][a] && c++, (o -= c) < 0 && (o = 0), t[r][s][a] = o
                            }
            }(t)
        },
        createHollowCylinderTablet: function(t, e, n, i, r) {
            return function(t, e, n, i, r) {
                for (var s = [], a = t / 2, o = e / 2, c = i / 2, h = r / 2, l = .5 * (0 + t - 1), u = .5 * (0 + e - 1), d = 0; d < n; d++) {
                    for (var f = [], p = 0; p < e; p++) {
                        for (var v = [], g = 0; g < t; g++) {
                            var b = 1 < 1 * (g - l) * (g - l) / (c * c) + 1 * (p - u) * (p - u) / (h * h) && 1 * (g - l) * (g - l) / (a * a) + 1 * (p - u) * (p - u) / (o * o) < 1 ? 1 : 0;
                            b = 0 == g || g == t - 1 || 0 == p || p == e - 1 || 0 == d || d == n - 1 ? 0 : b, v.push(b)
                        }
                        f.push(v)
                    }
                    s.push(f)
                }
                return s
            }(t, e, n, i, r)
        },
        getRemains: function(t) {
            return function(t) {
                for (var e = t.length, n = t[0].length, i = t[0][0].length, r = 0, s = 0; s < e; s++)
                    for (var a = 0; a < n; a++)
                        for (var o = 0; o < i; o++) r += t[s][a][o];
                return r
            }(t)
        },
        createEllipsoidTablet: function(t, e, n) {
            return function(t, e, n) {
                for (var i = [], r = t / 2, s = e / 2, a = n / 2, o = .5 * (0 + t - 1), c = .5 * (0 + e - 1), h = .5 * (0 + n - 1), l = 0; l < n; l++) {
                    for (var u = [], d = 0; d < e; d++) {
                        for (var f = [], p = 0; p < t; p++) {
                            var v = 1 * (p - o) * (p - o) / (r * r) + 1 * (d - c) * (d - c) / (s * s) + 1 * (l - h) * (l - h) / (a * a) < 1 ? 1 : 0;
                            v = 0 == p || p == t - 1 || 0 == d || d == e - 1 || 0 == l || l == n - 1 ? 0 : v, f.push(v)
                        }
                        u.push(f)
                    }
                    i.push(u)
                }
                return i
            }(t, e, n)
        },
        createCylinderTablet: function(t, e, n) {
            return function(t, e, n) {
                for (var i = [], r = t / 2, s = e / 2, a = .5 * (0 + t - 1), o = .5 * (0 + e - 1), c = 0; c < n; c++) {
                    for (var h = [], l = 0; l < e; l++) {
                        for (var u = [], d = 0; d < t; d++) {
                            var f = 1 * (d - a) * (d - a) / (r * r) + 1 * (l - o) * (l - o) / (s * s) < 1 ? 1 : 0;
                            f = 0 == d || d == t - 1 || 0 == l || l == e - 1 || 0 == c || c == n - 1 ? 0 : f, u.push(f)
                        }
                        h.push(u)
                    }
                    i.push(h)
                }
                return i
            }(t, e, n)
        },
        getProjectionOf: function(t) {
            return function(t) {
                var e = t.length,
                    n = t[0].length,
                    i = t[0][0].length;
                return {
                    onPlane: function(r) {
                        var s;
                        if ("xy" == r) {
                            for (var a = [], o = 0; o < n; o++) {
                                for (var c = [], h = 0; h < i; h++) {
                                    for (var l = 0, u = 0; u < e; u++) l += t[u][o][h];
                                    c.push(l)
                                }
                                a.push(c)
                            }
                            s = a
                        } else if ("yz" == r) {
                            for (a = [], u = 0; u < e; u++) {
                                for (c = [], o = 0; o < n; o++) {
                                    for (l = 0, h = 0; h < i; h++) l += t[u][o][h];
                                    c.push(l)
                                }
                                a.push(c)
                            }
                            s = a
                        } else if ("xz" == r) {
                            for (a = [], u = 0; u < e; u++) {
                                for (c = [], h = 0; h < i; h++) {
                                    for (l = 0, o = 0; o < n; o++) l += t[u][o][h];
                                    c.push(l)
                                }
                                a.push(c)
                            }
                            s = a
                        }
                        return s
                    }
                }
            }(t)
        },
        getMaxProjection: function(t) {
            return n(t)
        },
        normalizeProjection: function(t) {
            return function(t) {
                for (var e = t.length, i = t[0].length, r = n(t), s = 0; s < e; s++)
                    for (var a = 0; a < i; a++) procj[s][a] /= r
            }(t)
        },
        normalizeProjectionInitial: function(t, e) {
            return function(t, e) {
                for (var n = t.length, i = t[0].length, r = 0; r < n; r++)
                    for (var s = 0; s < i; s++) t[r][s] /= e
            }(t, e)
        }
    }
}, function(t, e) {
    class n {
        constructor(t, e) {
            this.period = t, this.dt = e, this.maxCount = parseInt(t / e), this.count = this.maxCount
        }
        sampling() {
            var t = !1;
            return this.count >= this.maxCount && (this.count = 0, t = !0), this.count++, t
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    class n {
        constructor(t, e) {
            this.func = t, this.period = e, this.ticking = !1, this.uid = 0
        }
        start() {
            this.ticking || (this.ticking = !0, this.uid = setInterval(this.func, this.period))
        }
        stop() {
            this.ticking && (this.ticking = !1, clearInterval(this.uid))
        }
        static ts() {
            var t = new Date;
            return "" + ("00" + t.getHours()).slice(-2) + ("00" + t.getMinutes()).slice(-2) + ("00" + t.getSeconds()).slice(-2)
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    function n(t, e) {
        var n = Math.random() * (e - t) + t;
        return n = Math.round(n)
    }
    t.exports = {
        randInt: function(t, e) {
            return n(t, e)
        },
        randIntN: function(t, e, i) {
            return function(t, e, i) {
                for (var r = [], s = 0; s < i; s++) r.push(n(t, e));
                return r
            }(t, e, i)
        }
    }
}, function(t, e, n) {
    var i = n(2)();
    class r {
        constructor(t, e, n) {
            this.t = 0, this.dt = .001, this.sequence = [], this.amplitude = [], 3 == arguments.length && (this.dt = t, this.sequence = e, this.amplitude = n)
        }
        restart() {
            this.t = 0;
            for (var t = this.sequence.length, e = 0; e < t; e++) this.sequence[e].pos = 0
        }
        ping() {
            var t = [];
            t.push(this.t), this.t += this.dt;
            for (var e = this.sequence.length, n = 0; n < e; n++) {
                var i = this.sequence[n].ping();
                i *= this.amplitude[n], t.push(i)
            }
            return t
        }
        static test() {
            for (var t = new i([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]), e = new i([0, 0, 1, 1]), n = new r(.001, [t, e], [8, 10]), s = 0; s < 15; s++) {
                var a = n.ping();
                console.log(a)
            }
        }
    }
    t.exports = function() {
        return r
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.k = 1, this.l = 1, this.gamma = 1, this.o = new i
        }
        setConstant(t, e) {
            this.k = t, this.gamma = e
        }
        setUncompressedLength(t) {
            this.l = t
        }
        setOrigin(t) {
            this.o = t
        }
        force() {
            var t = new i;
            if (1 == arguments.length) {
                if (arguments[0] instanceof r) {
                    var e = arguments[0].r,
                        n = this.o,
                        s = (v = i.sub(e, n)).unit(),
                        a = v.len(),
                        o = this.l,
                        c = arguments[0].v,
                        h = new i,
                        l = i.sub(c, h),
                        u = this.k,
                        d = this.gamma,
                        f = a - o,
                        p = l.len();
                    t = i.mul(-u * f - d * p, s)
                }
            } else if (2 == arguments.length && arguments[0] instanceof r && arguments[1] instanceof r) {
                var v;
                e = arguments[0].r, n = arguments[1].r, s = (v = i.sub(e, n)).unit(), a = v.len(), o = this.l, c = arguments[0].v, h = arguments[1].v, l = i.sub(c, h), u = this.k, d = this.gamma, f = a - o, p = l.len();
                t = i.mul(-u * f - d * p, s)
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.k = 1e4, this.gamma = 10
        }
        setConstant(t, e) {
            this.k = t, this.gamma = e
        }
        force() {
            var t = new i;
            if (arguments[0] instanceof r && arguments[1] instanceof r) {
                var e = arguments[0].D,
                    n = arguments[1].D,
                    s = arguments[0].r,
                    a = arguments[1].r,
                    o = i.sub(s, a),
                    c = o.unit(),
                    h = o.len(),
                    l = arguments[0].v,
                    u = arguments[1].v,
                    d = i.sub(l, u),
                    f = this.k,
                    p = this.gamma,
                    v = .5 * (e + n),
                    g = Math.max(0, v - h),
                    b = d.len();
                t = i.mul(f * g - p * b, c)
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.k = 1e-7, this.B = new i(1, 0, 0)
        }
        setField(t) {
            this.B = t, delete this.k
        }
        setConstant(t) {
            this.k = t, delete this.B
        }
        force() {
            var t = new i;
            if (void 0 != this.B && arguments[0] instanceof r) {
                var e = arguments[0].q,
                    n = arguments[0].v,
                    s = this.B;
                t = i.mul(e, i.cross(n, s))
            }
            if (void 0 != this.k && arguments[0] instanceof r && arguments[1] instanceof r) {
                var a = arguments[0].q,
                    o = arguments[1].q,
                    c = arguments[0].r,
                    h = arguments[1].r,
                    l = i.sub(c, h),
                    u = l.len(),
                    d = arguments[0].v,
                    f = arguments[1].v,
                    p = this.k,
                    v = i.cross(d, i.cross(f, l));
                t = i.mul(p * a * o / (u * u), v)
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.G = 6.67408e-11, this.g = new i(0, 0, -9.80665)
        }
        setField(t) {
            this.g = t, delete this.G
        }
        setConstant(t) {
            this.G = t, delete this.g
        }
        force() {
            var t = new i;
            if (void 0 != this.g && arguments[0] instanceof r) {
                var e = arguments[0].m,
                    n = this.g;
                t = i.mul(e, n)
            }
            if (void 0 != this.G && arguments[0] instanceof r && arguments[1] instanceof r) {
                var s = arguments[0].m,
                    a = arguments[1].m,
                    o = arguments[0].r,
                    c = arguments[1].r,
                    h = i.sub(o, c),
                    l = h.unit(),
                    u = h.len(),
                    d = this.G;
                t = i.mul(-d * s * a / (u * u), l)
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.k = 8987551787, this.E = new i(1, 0, 0)
        }
        setField(t) {
            this.E = t, delete this.k
        }
        setConstant(t) {
            this.k = t, delete this.E
        }
        force() {
            var t = new i;
            if (void 0 != this.E && arguments[0] instanceof r) {
                var e = arguments[0].q,
                    n = this.E;
                t = i.mul(e, n)
            }
            if (void 0 != this.k && arguments[0] instanceof r && arguments[1] instanceof r) {
                var s = arguments[0].q,
                    a = arguments[1].q,
                    o = arguments[0].r,
                    c = arguments[1].r,
                    h = i.sub(o, c),
                    l = h.unit(),
                    u = h.len(),
                    d = this.k;
                t = i.mul(d * s * a / (u * u), l)
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)(),
        r = n(1)();
    class s {
        constructor() {
            this.c0 = 0, this.c1 = 0, this.c2 = 0, this.vf = new i
        }
        setConstant(t, e, n) {
            this.c0 = t, this.c1 = e, this.c2 = n
        }
        setField(t) {
            this.vf = t
        }
        force() {
            var t = new i;
            if (arguments[0] instanceof r) {
                var e = this.c0,
                    n = this.c1,
                    s = this.c2,
                    a = this.vf,
                    o = arguments[0].v,
                    c = i.sub(o, a),
                    h = c.unit(),
                    l = c.len(),
                    u = e + n * l + s * (l * l);
                t = i.mul(u, h.neg())
            }
            return t
        }
    }
    t.exports = function() {
        return s
    }
}, function(t, e, n) {
    var i = n(0)();
    class r {
        constructor() {
            this.rho = 1e3, this.g = new i(0, 0, -10)
        }
        setFluidDensity(t) {
            this.rho = t
        }
        setGravity(t) {
            this.g = t
        }
        force(t) {
            var e = this.rho,
                n = this.g;
            return i.mul(n.neg(), e * t)
        }
    }
    t.exports = function() {
        return r
    }
}, function(t, e) {
    class n {
        constructor() {
            this.value = 0, this.type = "", 1 == arguments.length ? (this.type = "constant", this.value = arguments[0]) : 2 == arguments.length ? (this.type = "variable", this.Rmax = arguments[0], this.pos = arguments[1], this.value = this.Rmax * this.pos) : 3 == arguments.length && (this.type = "time-dependent", this.Rmin = arguments[0], this.Rmax = arguments[1], this.tau = arguments[2], this.value = this.Rmin, this.V = 0)
        }
        ping() {
            if ("constant" == this.type) this.value = this.value;
            else if ("variable" == this.type) this.pos = arguments[0], this.value = this.Rmax * this.pos;
            else if ("time-dependent" == this.type) {
                var t = arguments[0],
                    e = arguments[1],
                    n = this.value;
                n += e > 0 ? (this.Rmax - n) * t / this.tau : (this.Rmin - n) * t / this.tau, this.value = n
            }
            return this.value
        }
    }
    t.exports = function() {
        return n
    }
}, function(t, e) {
    function n(t, e, n) {
        var i = n.toString(16),
            r = e.toString(16),
            s = t.toString(16);
        return i.length < 2 && (i = "0" + i), r.length < 2 && (r = "0" + r), s.length < 2 && (s = "0" + s), "#" + s + r + i
    }
    t.exports = {
        int2rgb: function(t, e, i) {
            return n(t, e, i)
        },
        double2rgb: function(t, e, i) {
            return function(t, e, i) {
                var r = Math.round(255 * i),
                    s = Math.round(255 * e);
                return n(Math.round(255 * t), s, r)
            }(t, e, i)
        }
    }
}, function(t, e) {
    t.exports = {
        createStyle: function(t) {
            return function(t) {
                var e = document.head || document.getElementsByTagName("head")[0],
                    n = document.createElement("style");
                if (n.type = "text/css", n.styleSheet) n.styleSheet.cssText = t;
                else {
                    var i = document.createTextNode(t);
                    n.append(i)
                }
                e.append(n)
            }(t)
        },
        changeStyleAttribute: function(t, e, n) {
            return function(t, e, n) {
                for (var i = document.styleSheets.length, r = document.styleSheets, s = 0; s < i; s++) r[s].rules[0].selectorText == t && (r[s].rules[0].style[e] = n)
            }(t, e, n)
        },
        getStyleAttribute: function(t, e) {
            return function(t, e) {
                for (var n, i = document.styleSheets.length, r = document.styleSheets, s = 0; s < i; s++) r[s].rules[0].selectorText == t && (n = r[s].rules[0].style[e]);
                return n
            }(t, e)
        }
    }
}, function(t, e, n) {
    var i = n(1)(),
        r = n(26),
        s = n(0)(),
        a = n(25),
        o = n(24)(),
        c = n(23)(),
        h = n(22)(),
        l = n(21)(),
        u = n(20)(),
        d = n(19)(),
        f = n(18)(),
        p = n(17)(),
        v = n(16)(),
        g = n(15),
        b = n(2)(),
        m = n(14)(),
        y = n(13)(),
        w = n(12),
        x = n(11)(),
        S = n(10),
        I = n(9)(),
        E = n(8),
        k = n(7),
        T = n(6),
        N = n(5),
        A = n(4)(),
        B = n(3)();
    "undefined" != typeof window && (window.Sequence = b, window.Polynomial = I, window.Random = g, window.Integration = S, window.RGB = a, window.Timer = m, window.Resistor = o, window.Generator = v, window.Vect3 = s, window.Grain = i, window.Buoyant = c, window.Gravitational = u, window.Electrostatic = l, window.Normal = f, window.Spring = p, window.Drag = h, window.Magnetic = d, window.Tablet = w, window.Style = r, window.TabText = k, window.TabCanvas = T, window.Transformation = E, window.Parse = N, window.Sample = y, window.Tabs = A, window.Bgroup = B, window.Pile = x)
}]);