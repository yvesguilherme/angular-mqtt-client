/**
 * otplib-browser
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 7.0.0
 * @license: MIT
 **/
! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.otplib = e() : t.otplib = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function(t) {
            return t
        }, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 41)
    }([function(t, e, n) {
        "use strict";
        (function(t) {
            function r() {
                return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function i(t, e) {
                if (r() < e) throw new RangeError("Invalid typed array length");
                return o.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = o.prototype) : (null === t && (t = new o(e)), t.length = e), t
            }

            function o(t, e, n) {
                if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(t, e, n);
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                    return f(this, t)
                }
                return s(this, t, e, n)
            }

            function s(t, e, n, r) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? l(t, e, n, r) : "string" == typeof e ? h(t, e, n) : d(t, e)
            }

            function u(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative')
            }

            function a(t, e, n, r) {
                return u(e), e <= 0 ? i(t, e) : void 0 !== n ? "string" == typeof r ? i(t, e).fill(n, r) : i(t, e).fill(n) : i(t, e)
            }

            function f(t, e) {
                if (u(e), t = i(t, e < 0 ? 0 : 0 | p(e)), !o.TYPED_ARRAY_SUPPORT)
                    for (var n = 0; n < e; ++n) t[n] = 0;
                return t
            }

            function h(t, e, n) {
                if ("string" == typeof n && "" !== n || (n = "utf8"), !o.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | _(e, n);
                t = i(t, r);
                var s = t.write(e, n);
                return s !== r && (t = t.slice(0, s)), t
            }

            function c(t, e) {
                var n = e.length < 0 ? 0 : 0 | p(e.length);
                t = i(t, n);
                for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                return t
            }

            function l(t, e, n, r) {
                if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), o.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = o.prototype) : t = c(t, e), t
            }

            function d(t, e) {
                if (o.isBuffer(e)) {
                    var n = 0 | p(e.length);
                    return t = i(t, n), 0 === t.length ? t : (e.copy(t, 0, 0, n), t)
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || J(e.length) ? i(t, 0) : c(t, e);
                    if ("Buffer" === e.type && G(e.data)) return c(t, e.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function p(t) {
                if (t >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                return 0 | t
            }

            function g(t) {
                return +t != t && (t = 0), o.alloc(+t)
            }

            function _(t, e) {
                if (o.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var n = t.length;
                if (0 === n) return 0;
                for (var r = !1;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return n;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return W(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * n;
                    case "hex":
                        return n >>> 1;
                    case "base64":
                        return V(t).length;
                    default:
                        if (r) return W(t).length;
                        e = ("" + e).toLowerCase(), r = !0
                }
            }

            function y(t, e, n) {
                var r = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if (n >>>= 0, e >>>= 0, n <= e) return "";
                for (t || (t = "utf8");;) switch (t) {
                    case "hex":
                        return x(this, e, n);
                    case "utf8":
                    case "utf-8":
                        return M(this, e, n);
                    case "ascii":
                        return O(this, e, n);
                    case "latin1":
                    case "binary":
                        return P(this, e, n);
                    case "base64":
                        return B(this, e, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return L(this, e, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), r = !0
                }
            }

            function v(t, e, n) {
                var r = t[e];
                t[e] = t[n], t[n] = r
            }

            function w(t, e, n, r, i) {
                if (0 === t.length) return -1;
                if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                    if (i) return -1;
                    n = t.length - 1
                } else if (n < 0) {
                    if (!i) return -1;
                    n = 0
                }
                if ("string" == typeof e && (e = o.from(e, r)), o.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, n, r, i);
                if ("number" == typeof e) return e &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : b(t, [e], n, r, i);
                throw new TypeError("val must be string, number or Buffer")
            }

            function b(t, e, n, r, i) {
                function o(t, e) {
                    return 1 === s ? t[e] : t.readUInt16BE(e * s)
                }
                var s = 1,
                    u = t.length,
                    a = e.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    s = 2, u /= 2, a /= 2, n /= 2
                }
                var f;
                if (i) {
                    var h = -1;
                    for (f = n; f < u; f++)
                        if (o(t, f) === o(e, -1 === h ? 0 : f - h)) {
                            if (-1 === h && (h = f), f - h + 1 === a) return h * s
                        } else -1 !== h && (f -= f - h), h = -1
                } else
                    for (n + a > u && (n = u - a), f = n; f >= 0; f--) {
                        for (var c = !0, l = 0; l < a; l++)
                            if (o(t, f + l) !== o(e, l)) {
                                c = !1;
                                break
                            }
                        if (c) return f
                    }
                return -1
            }

            function m(t, e, n, r) {
                n = Number(n) || 0;
                var i = t.length - n;
                r ? (r = Number(r)) > i && (r = i) : r = i;
                var o = e.length;
                if (o % 2 != 0) throw new TypeError("Invalid hex string");
                r > o / 2 && (r = o / 2);
                for (var s = 0; s < r; ++s) {
                    var u = parseInt(e.substr(2 * s, 2), 16);
                    if (isNaN(u)) return s;
                    t[n + s] = u
                }
                return s
            }

            function E(t, e, n, r) {
                return X(W(e, t.length - n), t, n, r)
            }

            function S(t, e, n, r) {
                return X(H(e), t, n, r)
            }

            function T(t, e, n, r) {
                return S(t, e, n, r)
            }

            function k(t, e, n, r) {
                return X(V(e), t, n, r)
            }

            function R(t, e, n, r) {
                return X(K(e, t.length - n), t, n, r)
            }

            function B(t, e, n) {
                return 0 === e && n === t.length ? Z.fromByteArray(t) : Z.fromByteArray(t.slice(e, n))
            }

            function M(t, e, n) {
                n = Math.min(t.length, n);
                for (var r = [], i = e; i < n;) {
                    var o = t[i],
                        s = null,
                        u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                    if (i + u <= n) {
                        var a, f, h, c;
                        switch (u) {
                            case 1:
                                o < 128 && (s = o);
                                break;
                            case 2:
                                a = t[i + 1], 128 == (192 & a) && (c = (31 & o) << 6 | 63 & a) > 127 && (s = c);
                                break;
                            case 3:
                                a = t[i + 1], f = t[i + 2], 128 == (192 & a) && 128 == (192 & f) && (c = (15 & o) << 12 | (63 & a) << 6 | 63 & f) > 2047 && (c < 55296 || c > 57343) && (s = c);
                                break;
                            case 4:
                                a = t[i + 1], f = t[i + 2], h = t[i + 3], 128 == (192 & a) && 128 == (192 & f) && 128 == (192 & h) && (c = (15 & o) << 18 | (63 & a) << 12 | (63 & f) << 6 | 63 & h) > 65535 && c < 1114112 && (s = c)
                        }
                    }
                    null === s ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), r.push(s), i += u
                }
                return A(r)
            }

            function A(t) {
                var e = t.length;
                if (e <= Q) return String.fromCharCode.apply(String, t);
                for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += Q));
                return n
            }

            function O(t, e, n) {
                var r = "";
                n = Math.min(t.length, n);
                for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                return r
            }

            function P(t, e, n) {
                var r = "";
                n = Math.min(t.length, n);
                for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                return r
            }

            function x(t, e, n) {
                var r = t.length;
                (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                for (var i = "", o = e; o < n; ++o) i += N(t[o]);
                return i
            }

            function L(t, e, n) {
                for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                return i
            }

            function j(t, e, n) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function I(t, e, n, r, i, s) {
                if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
                if (n + r > t.length) throw new RangeError("Index out of range")
            }

            function C(t, e, n, r) {
                e < 0 && (e = 65535 + e + 1);
                for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
            }

            function U(t, e, n, r) {
                e < 0 && (e = 4294967295 + e + 1);
                for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
            }

            function D(t, e, n, r, i, o) {
                if (n + r > t.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function Y(t, e, n, r, i) {
                return i || D(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), $.write(t, e, n, r, 23, 4), n + 4
            }

            function z(t, e, n, r, i) {
                return i || D(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), $.write(t, e, n, r, 52, 8), n + 8
            }

            function q(t) {
                if (t = F(t).replace(tt, ""), t.length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }

            function F(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            }

            function N(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }

            function W(t, e) {
                e = e || 1 / 0;
                for (var n, r = t.length, i = null, o = [], s = 0; s < r; ++s) {
                    if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                        if (!i) {
                            if (n > 56319) {
                                (e -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === r) {
                                (e -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            i = n;
                            continue
                        }
                        if (n < 56320) {
                            (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                            continue
                        }
                        n = 65536 + (i - 55296 << 10 | n - 56320)
                    } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                    if (i = null, n < 128) {
                        if ((e -= 1) < 0) break;
                        o.push(n)
                    } else if (n < 2048) {
                        if ((e -= 2) < 0) break;
                        o.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((e -= 3) < 0) break;
                        o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return o
            }

            function H(t) {
                for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                return e
            }

            function K(t, e) {
                for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = t.charCodeAt(s), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                return o
            }

            function V(t) {
                return Z.toByteArray(q(t))
            }

            function X(t, e, n, r) {
                for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                return i
            }

            function J(t) {
                return t !== t
            }
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */
            var Z = n(56),
                $ = n(62),
                G = n(28);
            e.Buffer = o, e.SlowBuffer = g, e.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }(), e.kMaxLength = r(), o.poolSize = 8192, o._augment = function(t) {
                return t.__proto__ = o.prototype, t
            }, o.from = function(t, e, n) {
                return s(null, t, e, n)
            }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
                value: null,
                configurable: !0
            })), o.alloc = function(t, e, n) {
                return a(null, t, e, n)
            }, o.allocUnsafe = function(t) {
                return f(null, t)
            }, o.allocUnsafeSlow = function(t) {
                return f(null, t)
            }, o.isBuffer = function(t) {
                return !(null == t || !t._isBuffer)
            }, o.compare = function(t, e) {
                if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var n = t.length, r = e.length, i = 0, s = Math.min(n, r); i < s; ++i)
                    if (t[i] !== e[i]) {
                        n = t[i], r = e[i];
                        break
                    }
                return n < r ? -1 : r < n ? 1 : 0
            }, o.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, o.concat = function(t, e) {
                if (!G(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return o.alloc(0);
                var n;
                if (void 0 === e)
                    for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                var r = o.allocUnsafe(e),
                    i = 0;
                for (n = 0; n < t.length; ++n) {
                    var s = t[n];
                    if (!o.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                    s.copy(r, i), i += s.length
                }
                return r
            }, o.byteLength = _, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2) v(this, e, e + 1);
                return this
            }, o.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2);
                return this
            }, o.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8) v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4);
                return this
            }, o.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? M(this, 0, t) : y.apply(this, arguments)
            }, o.prototype.equals = function(t) {
                if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === o.compare(this, t)
            }, o.prototype.inspect = function() {
                var t = "",
                    n = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
            }, o.prototype.compare = function(t, e, n, r, i) {
                if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                if (r >= i && e >= n) return 0;
                if (r >= i) return -1;
                if (e >= n) return 1;
                if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
                for (var s = i - r, u = n - e, a = Math.min(s, u), f = this.slice(r, i), h = t.slice(e, n), c = 0; c < a; ++c)
                    if (f[c] !== h[c]) {
                        s = f[c], u = h[c];
                        break
                    }
                return s < u ? -1 : u < s ? 1 : 0
            }, o.prototype.includes = function(t, e, n) {
                return -1 !== this.indexOf(t, e, n)
            }, o.prototype.indexOf = function(t, e, n) {
                return w(this, t, e, n, !0)
            }, o.prototype.lastIndexOf = function(t, e, n) {
                return w(this, t, e, n, !1)
            }, o.prototype.write = function(t, e, n, r) {
                if (void 0 === e) r = "utf8", n = this.length, e = 0;
                else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                }
                var i = this.length - e;
                if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var o = !1;;) switch (r) {
                    case "hex":
                        return m(this, t, e, n);
                    case "utf8":
                    case "utf-8":
                        return E(this, t, e, n);
                    case "ascii":
                        return S(this, t, e, n);
                    case "latin1":
                    case "binary":
                        return T(this, t, e, n);
                    case "base64":
                        return k(this, t, e, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return R(this, t, e, n);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), o = !0
                }
            }, o.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var Q = 4096;
            o.prototype.slice = function(t, e) {
                var n = this.length;
                t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                var r;
                if (o.TYPED_ARRAY_SUPPORT) r = this.subarray(t, e), r.__proto__ = o.prototype;
                else {
                    var i = e - t;
                    r = new o(i, void 0);
                    for (var s = 0; s < i; ++s) r[s] = this[s + t]
                }
                return r
            }, o.prototype.readUIntLE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                return r
            }, o.prototype.readUIntBE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                return r
            }, o.prototype.readUInt8 = function(t, e) {
                return e || j(t, 1, this.length), this[t]
            }, o.prototype.readUInt16LE = function(t, e) {
                return e || j(t, 2, this.length), this[t] | this[t + 1] << 8
            }, o.prototype.readUInt16BE = function(t, e) {
                return e || j(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, o.prototype.readUInt32LE = function(t, e) {
                return e || j(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, o.prototype.readUInt32BE = function(t, e) {
                return e || j(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, o.prototype.readIntLE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
            }, o.prototype.readIntBE = function(t, e, n) {
                t |= 0, e |= 0, n || j(t, e, this.length);
                for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
            }, o.prototype.readInt8 = function(t, e) {
                return e || j(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, o.prototype.readInt16LE = function(t, e) {
                e || j(t, 2, this.length);
                var n = this[t] | this[t + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, o.prototype.readInt16BE = function(t, e) {
                e || j(t, 2, this.length);
                var n = this[t + 1] | this[t] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, o.prototype.readInt32LE = function(t, e) {
                return e || j(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, o.prototype.readInt32BE = function(t, e) {
                return e || j(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, o.prototype.readFloatLE = function(t, e) {
                return e || j(t, 4, this.length), $.read(this, t, !0, 23, 4)
            }, o.prototype.readFloatBE = function(t, e) {
                return e || j(t, 4, this.length), $.read(this, t, !1, 23, 4)
            }, o.prototype.readDoubleLE = function(t, e) {
                return e || j(t, 8, this.length), $.read(this, t, !0, 52, 8)
            }, o.prototype.readDoubleBE = function(t, e) {
                return e || j(t, 8, this.length), $.read(this, t, !1, 52, 8)
            }, o.prototype.writeUIntLE = function(t, e, n, r) {
                if (t = +t, e |= 0, n |= 0, !r) {
                    I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                }
                var i = 1,
                    o = 0;
                for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                return e + n
            }, o.prototype.writeUIntBE = function(t, e, n, r) {
                if (t = +t, e |= 0, n |= 0, !r) {
                    I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
                }
                var i = n - 1,
                    o = 1;
                for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
                return e + n
            }, o.prototype.writeUInt8 = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
            }, o.prototype.writeUInt16LE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2
            }, o.prototype.writeUInt16BE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2
            }, o.prototype.writeUInt32LE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : U(this, t, e, !0), e + 4
            }, o.prototype.writeUInt32BE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : U(this, t, e, !1), e + 4
            }, o.prototype.writeIntLE = function(t, e, n, r) {
                if (t = +t, e |= 0, !r) {
                    var i = Math.pow(2, 8 * n - 1);
                    I(this, t, e, n, i - 1, -i)
                }
                var o = 0,
                    s = 1,
                    u = 0;
                for (this[e] = 255 & t; ++o < n && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o - 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
                return e + n
            }, o.prototype.writeIntBE = function(t, e, n, r) {
                if (t = +t, e |= 0, !r) {
                    var i = Math.pow(2, 8 * n - 1);
                    I(this, t, e, n, i - 1, -i)
                }
                var o = n - 1,
                    s = 1,
                    u = 0;
                for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === u && 0 !== this[e + o + 1] && (u = 1), this[e + o] = (t / s >> 0) - u & 255;
                return e + n
            }, o.prototype.writeInt8 = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, o.prototype.writeInt16LE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2
            }, o.prototype.writeInt16BE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2
            }, o.prototype.writeInt32LE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : U(this, t, e, !0), e + 4
            }, o.prototype.writeInt32BE = function(t, e, n) {
                return t = +t, e |= 0, n || I(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : U(this, t, e, !1), e + 4
            }, o.prototype.writeFloatLE = function(t, e, n) {
                return Y(this, t, e, !0, n)
            }, o.prototype.writeFloatBE = function(t, e, n) {
                return Y(this, t, e, !1, n)
            }, o.prototype.writeDoubleLE = function(t, e, n) {
                return z(this, t, e, !0, n)
            }, o.prototype.writeDoubleBE = function(t, e, n) {
                return z(this, t, e, !1, n)
            }, o.prototype.copy = function(t, e, n, r) {
                if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                if (r < 0) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                var i, s = r - n;
                if (this === t && n < e && e < r)
                    for (i = s - 1; i >= 0; --i) t[i + e] = this[i + n];
                else if (s < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                    for (i = 0; i < s; ++i) t[i + e] = this[i + n];
                else Uint8Array.prototype.set.call(t, this.subarray(n, n + s), e);
                return s
            }, o.prototype.fill = function(t, e, n, r) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                        var i = t.charCodeAt(0);
                        i < 256 && (t = i)
                    }
                    if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                if (n <= e) return this;
                e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0);
                var s;
                if ("number" == typeof t)
                    for (s = e; s < n; ++s) this[s] = t;
                else {
                    var u = o.isBuffer(t) ? t : W(new o(t, r).toString()),
                        a = u.length;
                    for (s = 0; s < n - e; ++s) this[s + e] = u[s % a]
                }
                return this
            };
            var tt = /[^+\/0-9A-Za-z-_]/g
        }).call(e, n(10))
    }, function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(t, e) {
            t.super_ = e;
            var n = function() {};
            n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
        }
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            if (!(this instanceof r)) return new r(t);
            f.call(this, t), h.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", i)
        }

        function i() {
            this.allowHalfOpen || this._writableState.ended || u(o, this)
        }

        function o(t) {
            t.end()
        }
        var s = Object.keys || function(t) {
            var e = [];
            for (var n in t) e.push(n);
            return e
        };
        t.exports = r;
        var u = n(16),
            a = n(5);
        a.inherits = n(1);
        var f = n(29),
            h = n(17);
        a.inherits(r, f);
        for (var c = s(h.prototype), l = 0; l < c.length; l++) {
            var d = c[l];
            r.prototype[d] || (r.prototype[d] = h.prototype[d])
        }
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.stringToHex = e.setsOf = e.secretKey = e.removeSpaces = e.padSecret = e.leftPad = e.isSameToken = e.intToHex = e.hexToInt = void 0;
        var i = n(47),
            o = r(i),
            s = n(48),
            u = r(s),
            a = n(49),
            f = r(a),
            h = n(50),
            c = r(h),
            l = n(51),
            d = r(l),
            p = n(52),
            g = r(p),
            _ = n(53),
            y = r(_),
            v = n(54),
            w = r(v),
            b = n(55),
            m = r(b);
        e.hexToInt = o.default, e.intToHex = u.default, e.isSameToken = f.default, e.leftPad = c.default, e.padSecret = d.default, e.removeSpaces = g.default, e.secretKey = y.default, e.setsOf = w.default, e.stringToHex = m.default
    }, function(t, e, n) {
        (function(e) {
            function n(t, n) {
                this._block = new e(t), this._finalSize = n, this._blockSize = t, this._len = 0, this._s = 0
            }
            n.prototype.update = function(t, n) {
                "string" == typeof t && (n = n || "utf8", t = new e(t, n));
                for (var r = this._len += t.length, i = this._s || 0, o = 0, s = this._block; i < r;) {
                    for (var u = Math.min(t.length, o + this._blockSize - i % this._blockSize), a = u - o, f = 0; f < a; f++) s[i % this._blockSize + f] = t[f + o];
                    i += a, o += a, i % this._blockSize == 0 && this._update(s)
                }
                return this._s = i, this
            }, n.prototype.digest = function(t) {
                var e = 8 * this._len;
                this._block[this._len % this._blockSize] = 128, this._block.fill(0, this._len % this._blockSize + 1), e % (8 * this._blockSize) >= 8 * this._finalSize && (this._update(this._block), this._block.fill(0)), this._block.writeInt32BE(e, this._blockSize - 4);
                var n = this._update(this._block) || this._hash();
                return t ? n.toString(t) : n
            }, n.prototype._update = function() {
                throw new Error("_update must be implemented by subclass")
            }, t.exports = n
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(t) {
            function n(t) {
                return Array.isArray ? Array.isArray(t) : "[object Array]" === _(t)
            }

            function r(t) {
                return "boolean" == typeof t
            }

            function i(t) {
                return null === t
            }

            function o(t) {
                return null == t
            }

            function s(t) {
                return "number" == typeof t
            }

            function u(t) {
                return "string" == typeof t
            }

            function a(t) {
                return "symbol" == typeof t
            }

            function f(t) {
                return void 0 === t
            }

            function h(t) {
                return "[object RegExp]" === _(t)
            }

            function c(t) {
                return "object" == typeof t && null !== t
            }

            function l(t) {
                return "[object Date]" === _(t)
            }

            function d(t) {
                return "[object Error]" === _(t) || t instanceof Error
            }

            function p(t) {
                return "function" == typeof t
            }

            function g(t) {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
            }

            function _(t) {
                return Object.prototype.toString.call(t)
            }
            e.isArray = n, e.isBoolean = r, e.isNull = i, e.isNullOrUndefined = o, e.isNumber = s, e.isString = u, e.isSymbol = a, e.isUndefined = f, e.isRegExp = h, e.isObject = c, e.isDate = l, e.isError = d, e.isFunction = p, e.isPrimitive = g, e.isBuffer = t.isBuffer
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.totpToken = e.totpSecret = e.totpOptions = e.totpCounter = e.totpCheck = e.hotpToken = e.hotpSecret = e.hotpOptions = e.hotpDigest = e.hotpCounter = e.hotpCheck = void 0;
        var i = n(43),
            o = r(i),
            s = n(22),
            u = r(s),
            a = n(23),
            f = r(a),
            h = n(12),
            c = r(h),
            l = n(13),
            d = r(l),
            p = n(14),
            g = r(p),
            _ = n(44),
            y = r(_),
            v = n(24),
            w = r(v),
            b = n(25),
            m = r(b),
            E = n(26),
            S = r(E),
            T = n(27),
            k = r(T);
        e.hotpCheck = o.default, e.hotpCounter = u.default, e.hotpDigest = f.default, e.hotpOptions = c.default, e.hotpSecret = d.default, e.hotpToken = g.default, e.totpCheck = y.default, e.totpCounter = w.default, e.totpOptions = m.default, e.totpSecret = S.default, e.totpToken = k.default
    }, function(t, e) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(t) {
            return "function" == typeof t
        }

        function i(t) {
            return "number" == typeof t
        }

        function o(t) {
            return "object" == typeof t && null !== t
        }

        function s(t) {
            return void 0 === t
        }
        t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(t) {
            if (!i(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, n.prototype.emit = function(t) {
            var e, n, i, u, a, f;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if ((e = arguments[1]) instanceof Error) throw e;
                var h = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                throw h.context = e, h
            }
            if (n = this._events[t], s(n)) return !1;
            if (r(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    u = Array.prototype.slice.call(arguments, 1), n.apply(this, u)
            } else if (o(n))
                for (u = Array.prototype.slice.call(arguments, 1), f = n.slice(), i = f.length, a = 0; a < i; a++) f[a].apply(this, u);
            return !0
        }, n.prototype.addListener = function(t, e) {
            var i;
            if (!r(e)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned && (i = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(t, e) {
            function n() {
                this.removeListener(t, n), i || (i = !0, e.apply(this, arguments))
            }
            if (!r(e)) throw TypeError("listener must be a function");
            var i = !1;
            return n.listener = e, this.on(t, n), this
        }, n.prototype.removeListener = function(t, e) {
            var n, i, s, u;
            if (!r(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (n = this._events[t], s = n.length, i = -1, n === e || r(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if (o(n)) {
                for (u = s; u-- > 0;)
                    if (n[u] === e || n[u].listener && n[u].listener === e) {
                        i = u;
                        break
                    }
                if (i < 0) return this;
                1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(i, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, n.prototype.removeAllListeners = function(t) {
            var e, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[t], r(n)) this.removeListener(t, n);
            else if (n)
                for (; n.length;) this.removeListener(t, n[n.length - 1]);
            return delete this._events[t], this
        }, n.prototype.listeners = function(t) {
            return this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, n.prototype.listenerCount = function(t) {
            if (this._events) {
                var e = this._events[t];
                if (r(e)) return 1;
                if (e) return e.length
            }
            return 0
        }, n.listenerCount = function(t, e) {
            return t.listenerCount(e)
        }
    }, function(t, e) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function i(t) {
            if (h === setTimeout) return setTimeout(t, 0);
            if ((h === n || !h) && setTimeout) return h = setTimeout, setTimeout(t, 0);
            try {
                return h(t, 0)
            } catch (e) {
                try {
                    return h.call(null, t, 0)
                } catch (e) {
                    return h.call(this, t, 0)
                }
            }
        }

        function o(t) {
            if (c === clearTimeout) return clearTimeout(t);
            if ((c === r || !c) && clearTimeout) return c = clearTimeout, clearTimeout(t);
            try {
                return c(t)
            } catch (e) {
                try {
                    return c.call(null, t)
                } catch (e) {
                    return c.call(this, t)
                }
            }
        }

        function s() {
            g && d && (g = !1, d.length ? p = d.concat(p) : _ = -1, p.length && u())
        }

        function u() {
            if (!g) {
                var t = i(s);
                g = !0;
                for (var e = p.length; e;) {
                    for (d = p, p = []; ++_ < e;) d && d[_].run();
                    _ = -1, e = p.length
                }
                d = null, g = !1, o(t)
            }
        }

        function a(t, e) {
            this.fun = t, this.array = e
        }

        function f() {}
        var h, c, l = t.exports = {};
        ! function() {
            try {
                h = "function" == typeof setTimeout ? setTimeout : n
            } catch (t) {
                h = n
            }
            try {
                c = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (t) {
                c = r
            }
        }();
        var d, p = [],
            g = !1,
            _ = -1;
        l.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            p.push(new a(t, e)), 1 !== p.length || g || i(u)
        }, a.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = f, l.addListener = f, l.once = f, l.off = f, l.removeListener = f, l.removeAllListeners = f, l.emit = f, l.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, l.cwd = function() {
            return "/"
        }, l.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, l.umask = function() {
            return 0
        }
    }, function(t, e, n) {
        function r() {
            i.call(this)
        }
        t.exports = r;
        var i = n(7).EventEmitter;
        n(1)(r, i), r.Readable = n(18), r.Writable = n(68), r.Duplex = n(63), r.Transform = n(67), r.PassThrough = n(66), r.Stream = r, r.prototype.pipe = function(t, e) {
            function n(e) {
                t.writable && !1 === t.write(e) && f.pause && f.pause()
            }

            function r() {
                f.readable && f.resume && f.resume()
            }

            function o() {
                h || (h = !0, t.end())
            }

            function s() {
                h || (h = !0, "function" == typeof t.destroy && t.destroy())
            }

            function u(t) {
                if (a(), 0 === i.listenerCount(this, "error")) throw t
            }

            function a() {
                f.removeListener("data", n), t.removeListener("drain", r), f.removeListener("end", o), f.removeListener("close", s), f.removeListener("error", u), t.removeListener("error", u), f.removeListener("end", a), f.removeListener("close", a), t.removeListener("close", a)
            }
            var f = this;
            f.on("data", n), t.on("drain", r), t._isStdio || e && !1 === e.end || (f.on("end", o), f.on("close", s));
            var h = !1;
            return f.on("error", u), t.on("error", u), f.on("end", a), f.on("close", a), t.on("close", a), t.emit("pipe", f), t
        }
    }, function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return o.default.decode(t).toString("hex")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(33),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return i({
                algorithm: "sha1",
                createHmacSecret: s.default,
                crypto: null,
                digits: 6,
                encoding: "ascii"
            }, t)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            o = n(13),
            s = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = r
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function n(e, n) {
                return new t(e, n.encoding)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = n
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (null == e) return "";
            var r = (0, f.default)(n),
                i = (0, u.default)(t, e, r),
                s = 15 & i[i.length - 1],
                a = (127 & i[s]) << 24 | (255 & i[s + 1]) << 16 | (255 & i[s + 2]) << 8 | 255 & i[s + 3],
                h = a % Math.pow(10, r.digits);
            return h = (0, o.leftPad)(h, r.digits)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(3),
            s = n(23),
            u = r(s),
            a = n(12),
            f = r(a);
        e.default = i
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            var r = n(0),
                i = r.Buffer,
                o = r.SlowBuffer,
                s = r.kMaxLength || 2147483647;
            e.alloc = function(t, e, n) {
                if ("function" == typeof i.alloc) return i.alloc(t, e, n);
                if ("number" == typeof n) throw new TypeError("encoding must not be number");
                if ("number" != typeof t) throw new TypeError("size must be a number");
                if (t > s) throw new RangeError("size is too large");
                var r = n,
                    o = e;
                void 0 === o && (r = void 0, o = 0);
                var u = new i(t);
                if ("string" == typeof o)
                    for (var a = new i(o, r), f = a.length, h = -1; ++h < t;) u[h] = a[h % f];
                else u.fill(o);
                return u
            }, e.allocUnsafe = function(t) {
                if ("function" == typeof i.allocUnsafe) return i.allocUnsafe(t);
                if ("number" != typeof t) throw new TypeError("size must be a number");
                if (t > s) throw new RangeError("size is too large");
                return new i(t)
            }, e.from = function(e, n, r) {
                if ("function" == typeof i.from && (!t.Uint8Array || Uint8Array.from !== i.from)) return i.from(e, n, r);
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                if ("string" == typeof e) return new i(e, n);
                if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer) {
                    var o = n;
                    if (1 === arguments.length) return new i(e);
                    void 0 === o && (o = 0);
                    var s = r;
                    if (void 0 === s && (s = e.byteLength - o), o >= e.byteLength) throw new RangeError("'offset' is out of bounds");
                    if (s > e.byteLength - o) throw new RangeError("'length' is out of bounds");
                    return new i(e.slice(o, o + s))
                }
                if (i.isBuffer(e)) {
                    var u = new i(e.length);
                    return e.copy(u, 0, 0, e.length), u
                }
                if (e) {
                    if (Array.isArray(e) || "undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return new i(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return new i(e.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }, e.allocUnsafeSlow = function(t) {
                if ("function" == typeof i.allocUnsafeSlow) return i.allocUnsafeSlow(t);
                if ("number" != typeof t) throw new TypeError("size must be a number");
                if (t >= s) throw new RangeError("size is too large");
                return new o(t)
            }
        }).call(e, n(10))
    }, function(t, e, n) {
        "use strict";
        (function(e) {
            function n(t, n, r, i) {
                if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                var o, s, u = arguments.length;
                switch (u) {
                    case 0:
                    case 1:
                        return e.nextTick(t);
                    case 2:
                        return e.nextTick(function() {
                            t.call(null, n)
                        });
                    case 3:
                        return e.nextTick(function() {
                            t.call(null, n, r)
                        });
                    case 4:
                        return e.nextTick(function() {
                            t.call(null, n, r, i)
                        });
                    default:
                        for (o = new Array(u - 1), s = 0; s < o.length;) o[s++] = arguments[s];
                        return e.nextTick(function() {
                            t.apply(null, o)
                        })
                }
            }!e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = n : t.exports = e.nextTick
        }).call(e, n(8))
    }, function(t, e, n) {
        "use strict";
        (function(e, r) {
            function i() {}

            function o(t, e, n) {
                this.chunk = t, this.encoding = e, this.callback = n, this.next = null
            }

            function s(t, e) {
                T = T || n(2), t = t || {}, this.objectMode = !!t.objectMode, e instanceof T && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                var r = t.highWaterMark,
                    i = this.objectMode ? 16 : 16384;
                this.highWaterMark = r || 0 === r ? r : i, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
                var o = !1 === t.decodeStrings;
                this.decodeStrings = !o, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                    g(e, t)
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new S(this)
            }

            function u(t) {
                if (T = T || n(2), !(x.call(u, this) || this instanceof T)) return new u(t);
                this._writableState = new s(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev)), M.call(this)
            }

            function a(t, e) {
                var n = new Error("write after end");
                t.emit("error", n), k(e, n)
            }

            function f(t, e, n, r) {
                var i = !0,
                    o = !1;
                return null === n ? o = new TypeError("May not write null values to stream") : "string" == typeof n || void 0 === n || e.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), k(r, o), i = !1), i
            }

            function h(t, e, n) {
                return t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = P.from(e, n)), e
            }

            function c(t, e, n, r, i, s) {
                n || (r = h(e, r, i), O.isBuffer(r) && (i = "buffer"));
                var u = e.objectMode ? 1 : r.length;
                e.length += u;
                var a = e.length < e.highWaterMark;
                if (a || (e.needDrain = !0), e.writing || e.corked) {
                    var f = e.lastBufferedRequest;
                    e.lastBufferedRequest = new o(r, i, s), f ? f.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
                } else l(t, e, !1, u, r, i, s);
                return a
            }

            function l(t, e, n, r, i, o, s) {
                e.writelen = r, e.writecb = s, e.writing = !0, e.sync = !0, n ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1
            }

            function d(t, e, n, r, i) {
                --e.pendingcb, n ? k(i, r) : i(r), t._writableState.errorEmitted = !0, t.emit("error", r)
            }

            function p(t) {
                t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
            }

            function g(t, e) {
                var n = t._writableState,
                    r = n.sync,
                    i = n.writecb;
                if (p(n), e) d(t, n, r, e, i);
                else {
                    var o = w(n);
                    o || n.corked || n.bufferProcessing || !n.bufferedRequest || v(t, n), r ? R(_, t, n, o, i) : _(t, n, o, i)
                }
            }

            function _(t, e, n, r) {
                n || y(t, e), e.pendingcb--, r(), m(t, e)
            }

            function y(t, e) {
                0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
            }

            function v(t, e) {
                e.bufferProcessing = !0;
                var n = e.bufferedRequest;
                if (t._writev && n && n.next) {
                    var r = e.bufferedRequestCount,
                        i = new Array(r),
                        o = e.corkedRequestsFree;
                    o.entry = n;
                    for (var s = 0; n;) i[s] = n, n = n.next, s += 1;
                    l(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new S(e)
                } else {
                    for (; n;) {
                        var u = n.chunk,
                            a = n.encoding,
                            f = n.callback;
                        if (l(t, e, !1, e.objectMode ? 1 : u.length, u, a, f), n = n.next, e.writing) break
                    }
                    null === n && (e.lastBufferedRequest = null)
                }
                e.bufferedRequestCount = 0, e.bufferedRequest = n, e.bufferProcessing = !1
            }

            function w(t) {
                return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing
            }

            function b(t, e) {
                e.prefinished || (e.prefinished = !0, t.emit("prefinish"))
            }

            function m(t, e) {
                var n = w(e);
                return n && (0 === e.pendingcb ? (b(t, e), e.finished = !0, t.emit("finish")) : b(t, e)), n
            }

            function E(t, e, n) {
                e.ending = !0, m(t, e), n && (e.finished ? k(n) : t.once("finish", n)), e.ended = !0, t.writable = !1
            }

            function S(t) {
                var e = this;
                this.next = null, this.entry = null, this.finish = function(n) {
                    var r = e.entry;
                    for (e.entry = null; r;) {
                        var i = r.callback;
                        t.pendingcb--, i(n), r = r.next
                    }
                    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                }
            }
            t.exports = u;
            var T, k = n(16),
                R = !e.browser && ["v0.10", "v0.9."].indexOf(e.version.slice(0, 5)) > -1 ? r : k;
            u.WritableState = s;
            var B = n(5);
            B.inherits = n(1);
            var M, A = {
                deprecate: n(78)
            };
            ! function() {
                try {
                    M = n(9)
                } catch (t) {} finally {
                    M || (M = n(7).EventEmitter)
                }
            }();
            var O = n(0).Buffer,
                P = n(15);
            B.inherits(u, M), s.prototype.getBuffer = function() {
                    for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next;
                    return e
                },
                function() {
                    try {
                        Object.defineProperty(s.prototype, "buffer", {
                            get: A.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
                        })
                    } catch (t) {}
                }();
            var x;
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (x = Function.prototype[Symbol.hasInstance], Object.defineProperty(u, Symbol.hasInstance, {
                value: function(t) {
                    return !!x.call(this, t) || t && t._writableState instanceof s
                }
            })) : x = function(t) {
                return t instanceof this
            }, u.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"))
            }, u.prototype.write = function(t, e, n) {
                var r = this._writableState,
                    o = !1,
                    s = O.isBuffer(t);
                return "function" == typeof e && (n = e, e = null), s ? e = "buffer" : e || (e = r.defaultEncoding), "function" != typeof n && (n = i), r.ended ? a(this, n) : (s || f(this, r, t, n)) && (r.pendingcb++, o = c(this, r, s, t, e, n)), o
            }, u.prototype.cork = function() {
                this._writableState.corked++
            }, u.prototype.uncork = function() {
                var t = this._writableState;
                t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || v(this, t))
            }, u.prototype.setDefaultEncoding = function(t) {
                if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
                return this._writableState.defaultEncoding = t, this
            }, u.prototype._write = function(t, e, n) {
                n(new Error("_write() is not implemented"))
            }, u.prototype._writev = null, u.prototype.end = function(t, e, n) {
                var r = this._writableState;
                "function" == typeof t ? (n = t, t = null, e = null) : "function" == typeof e && (n = e, e = null), null !== t && void 0 !== t && this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || E(this, r, n)
            }
        }).call(e, n(8), n(77).setImmediate)
    }, function(t, e, n) {
        e = t.exports = n(29), e.Stream = e, e.Readable = e, e.Writable = n(17), e.Duplex = n(2), e.Transform = n(30), e.PassThrough = n(64)
    }, function(t, e, n) {
        function r(t) {
            if (t && !a(t)) throw new Error("Unknown encoding: " + t)
        }

        function i(t) {
            return t.toString(this.encoding)
        }

        function o(t) {
            this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
        }

        function s(t) {
            this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
        }
        var u = n(0).Buffer,
            a = u.isEncoding || function(t) {
                switch (t && t.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return !0;
                    default:
                        return !1
                }
            },
            f = e.StringDecoder = function(t) {
                switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), r(t), this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2, this.detectIncompleteChar = o;
                        break;
                    case "base64":
                        this.surrogateSize = 3, this.detectIncompleteChar = s;
                        break;
                    default:
                        return void(this.write = i)
                }
                this.charBuffer = new u(6), this.charReceived = 0, this.charLength = 0
            };
        f.prototype.write = function(t) {
            for (var e = ""; this.charLength;) {
                var n = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
                if (t.copy(this.charBuffer, this.charReceived, 0, n), this.charReceived += n, this.charReceived < this.charLength) return "";
                t = t.slice(n, t.length), e = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                var r = e.charCodeAt(e.length - 1);
                if (!(r >= 55296 && r <= 56319)) {
                    if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
                    break
                }
                this.charLength += this.surrogateSize, e = ""
            }
            this.detectIncompleteChar(t);
            var i = t.length;
            this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, i), i -= this.charReceived), e += t.toString(this.encoding, 0, i);
            var i = e.length - 1,
                r = e.charCodeAt(i);
            if (r >= 55296 && r <= 56319) {
                var o = this.surrogateSize;
                return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), t.copy(this.charBuffer, 0, 0, o), e.substring(0, i)
            }
            return e
        }, f.prototype.detectIncompleteChar = function(t) {
            for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
                var n = t[t.length - e];
                if (1 == e && n >> 5 == 6) {
                    this.charLength = 2;
                    break
                }
                if (e <= 2 && n >> 4 == 14) {
                    this.charLength = 3;
                    break
                }
                if (e <= 3 && n >> 3 == 30) {
                    this.charLength = 4;
                    break
                }
            }
            this.charReceived = e
        }, f.prototype.end = function(t) {
            var e = "";
            if (t && t.length && (e = this.write(t)), this.charReceived) {
                var n = this.charReceived,
                    r = this.charBuffer,
                    i = this.encoding;
                e += r.slice(0, n).toString(i)
            }
            return e
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(45),
            i = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        e.default = new i.default
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(46),
            i = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        e.default = new i.default
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            var e = (0, i.intToHex)(t);
            return (0, i.leftPad)(e, 16)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(3);
        e.default = r
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function i(e, n, r) {
                if ("object" !== (void 0 === r ? "undefined" : o(r)) || null == r) throw new Error("Expecting options to be an object");
                if (!r.crypto || "function" != typeof r.crypto.createHmac) throw new Error("Expecting options.crypto to have a createHmac function");
                var i = r.createHmacSecret || f.default,
                    s = i(e, r),
                    a = (0, u.default)(n);
                return r.crypto.createHmac(r.algorithm, s).update(new t(a, "hex")).digest()
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                s = n(22),
                u = r(s),
                a = n(13),
                f = r(a);
            e.default = i
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            return Math.floor(t / e / 1e3)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = o((0, u.default)(), h, t);
            return e.epoch = "number" == typeof e.epoch ? 1e3 * e.epoch : Date.now(), e
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            s = n(12),
            u = r(s),
            a = n(26),
            f = r(a),
            h = {
                createHmacSecret: f.default,
                epoch: null,
                step: 30
            };
        e.default = i
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function r(e, n) {
                var r = new t(e, n.encoding),
                    o = n.algorithm.toLowerCase();
                switch (o) {
                    case "sha1":
                        return (0, i.padSecret)(r, 20, n.encoding);
                    case "sha256":
                        return (0, i.padSecret)(r, 32, n.encoding);
                    case "sha512":
                        return (0, i.padSecret)(r, 64, n.encoding);
                    default:
                        throw new Error("Unsupported algorithm " + o + ". Accepts: sha1, sha256, sha512")
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(3);
            e.default = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = (0, h.default)(e),
                r = (0, a.default)(n.epoch, n.step);
            return (0, s.default)(t, r, n)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(14),
            s = r(o),
            u = n(24),
            a = r(u),
            f = n(25),
            h = r(f);
        e.default = i
    }, function(t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == n.call(t)
        }
    }, function(t, e, n) {
        "use strict";
        (function(e) {
            function r(t, e, n) {
                if ("function" == typeof t.prependListener) return t.prependListener(e, n);
                t._events && t._events[e] ? O(t._events[e]) ? t._events[e].unshift(n) : t._events[e] = [n, t._events[e]] : t.on(e, n)
            }

            function i(t, e) {
                M = M || n(2), t = t || {}, this.objectMode = !!t.objectMode, e instanceof M && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                var r = t.highWaterMark,
                    i = this.objectMode ? 16 : 16384;
                this.highWaterMark = r || 0 === r ? r : i, this.highWaterMark = ~~this.highWaterMark, this.buffer = new Y, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (D || (D = n(19).StringDecoder), this.decoder = new D(t.encoding), this.encoding = t.encoding)
            }

            function o(t) {
                if (M = M || n(2), !(this instanceof o)) return new o(t);
                this._readableState = new i(t, this), this.readable = !0, t && "function" == typeof t.read && (this._read = t.read), P.call(this)
            }

            function s(t, e, n, r, i) {
                var o = h(e, n);
                if (o) t.emit("error", o);
                else if (null === n) e.reading = !1, c(t, e);
                else if (e.objectMode || n && n.length > 0)
                    if (e.ended && !i) {
                        var s = new Error("stream.push() after EOF");
                        t.emit("error", s)
                    } else if (e.endEmitted && i) {
                    var a = new Error("stream.unshift() after end event");
                    t.emit("error", a)
                } else {
                    var f;
                    !e.decoder || i || r || (n = e.decoder.write(n), f = !e.objectMode && 0 === n.length), i || (e.reading = !1), f || (e.flowing && 0 === e.length && !e.sync ? (t.emit("data", n), t.read(0)) : (e.length += e.objectMode ? 1 : n.length, i ? e.buffer.unshift(n) : e.buffer.push(n), e.needReadable && l(t))), p(t, e)
                } else i || (e.reading = !1);
                return u(e)
            }

            function u(t) {
                return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
            }

            function a(t) {
                return t >= q ? t = q : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
            }

            function f(t, e) {
                return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t !== t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = a(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
            }

            function h(t, e) {
                var n = null;
                return L.isBuffer(e) || "string" == typeof e || null === e || void 0 === e || t.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n
            }

            function c(t, e) {
                if (!e.ended) {
                    if (e.decoder) {
                        var n = e.decoder.end();
                        n && n.length && (e.buffer.push(n), e.length += e.objectMode ? 1 : n.length)
                    }
                    e.ended = !0, l(t)
                }
            }

            function l(t) {
                var e = t._readableState;
                e.needReadable = !1, e.emittedReadable || (U("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? A(d, t) : d(t))
            }

            function d(t) {
                U("emit readable"), t.emit("readable"), b(t)
            }

            function p(t, e) {
                e.readingMore || (e.readingMore = !0, A(g, t, e))
            }

            function g(t, e) {
                for (var n = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (U("maybeReadMore read 0"), t.read(0), n !== e.length);) n = e.length;
                e.readingMore = !1
            }

            function _(t) {
                return function() {
                    var e = t._readableState;
                    U("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && x(t, "data") && (e.flowing = !0, b(t))
                }
            }

            function y(t) {
                U("readable nexttick read 0"), t.read(0)
            }

            function v(t, e) {
                e.resumeScheduled || (e.resumeScheduled = !0, A(w, t, e))
            }

            function w(t, e) {
                e.reading || (U("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), b(t), e.flowing && !e.reading && t.read(0)
            }

            function b(t) {
                var e = t._readableState;
                for (U("flow", e.flowing); e.flowing && null !== t.read(););
            }

            function m(t, e) {
                if (0 === e.length) return null;
                var n;
                return e.objectMode ? n = e.buffer.shift() : !t || t >= e.length ? (n = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : n = E(t, e.buffer, e.decoder), n
            }

            function E(t, e, n) {
                var r;
                return t < e.head.data.length ? (r = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : r = t === e.head.data.length ? e.shift() : n ? S(t, e) : T(t, e), r
            }

            function S(t, e) {
                var n = e.head,
                    r = 1,
                    i = n.data;
                for (t -= i.length; n = n.next;) {
                    var o = n.data,
                        s = t > o.length ? o.length : t;
                    if (s === o.length ? i += o : i += o.slice(0, t), 0 === (t -= s)) {
                        s === o.length ? (++r, n.next ? e.head = n.next : e.head = e.tail = null) : (e.head = n, n.data = o.slice(s));
                        break
                    }++r
                }
                return e.length -= r, i
            }

            function T(t, e) {
                var n = j.allocUnsafe(t),
                    r = e.head,
                    i = 1;
                for (r.data.copy(n), t -= r.data.length; r = r.next;) {
                    var o = r.data,
                        s = t > o.length ? o.length : t;
                    if (o.copy(n, n.length - t, 0, s), 0 === (t -= s)) {
                        s === o.length ? (++i, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = o.slice(s));
                        break
                    }++i
                }
                return e.length -= i, n
            }

            function k(t) {
                var e = t._readableState;
                if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                e.endEmitted || (e.ended = !0, A(R, e, t))
            }

            function R(t, e) {
                t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
            }

            function B(t, e) {
                for (var n = 0, r = t.length; n < r; n++)
                    if (t[n] === e) return n;
                return -1
            }
            t.exports = o;
            var M, A = n(16),
                O = n(28);
            o.ReadableState = i;
            var P, x = (n(7).EventEmitter, function(t, e) {
                return t.listeners(e).length
            });
            ! function() {
                try {
                    P = n(9)
                } catch (t) {} finally {
                    P || (P = n(7).EventEmitter)
                }
            }();
            var L = n(0).Buffer,
                j = n(15),
                I = n(5);
            I.inherits = n(1);
            var C = n(79),
                U = void 0;
            U = C && C.debuglog ? C.debuglog("stream") : function() {};
            var D, Y = n(65);
            I.inherits(o, P);
            var z = ["error", "close", "destroy", "pause", "resume"];
            o.prototype.push = function(t, e) {
                var n = this._readableState;
                return n.objectMode || "string" != typeof t || (e = e || n.defaultEncoding) !== n.encoding && (t = j.from(t, e), e = ""), s(this, n, t, e, !1)
            }, o.prototype.unshift = function(t) {
                return s(this, this._readableState, t, "", !0)
            }, o.prototype.isPaused = function() {
                return !1 === this._readableState.flowing
            }, o.prototype.setEncoding = function(t) {
                return D || (D = n(19).StringDecoder), this._readableState.decoder = new D(t), this._readableState.encoding = t, this
            };
            var q = 8388608;
            o.prototype.read = function(t) {
                U("read", t), t = parseInt(t, 10);
                var e = this._readableState,
                    n = t;
                if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return U("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? k(this) : l(this), null;
                if (0 === (t = f(t, e)) && e.ended) return 0 === e.length && k(this), null;
                var r = e.needReadable;
                U("need readable", r), (0 === e.length || e.length - t < e.highWaterMark) && (r = !0, U("length less than watermark", r)), e.ended || e.reading ? (r = !1, U("reading or ended", r)) : r && (U("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = f(n, e)));
                var i;
                return i = t > 0 ? m(t, e) : null, null === i ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), n !== t && e.ended && k(this)), null !== i && this.emit("data", i), i
            }, o.prototype._read = function(t) {
                this.emit("error", new Error("_read() is not implemented"))
            }, o.prototype.pipe = function(t, n) {
                function i(t) {
                    U("onunpipe"), t === l && s()
                }

                function o() {
                    U("onend"), t.end()
                }

                function s() {
                    U("cleanup"), t.removeListener("close", f), t.removeListener("finish", h), t.removeListener("drain", y), t.removeListener("error", a), t.removeListener("unpipe", i), l.removeListener("end", o), l.removeListener("end", s), l.removeListener("data", u), v = !0, !d.awaitDrain || t._writableState && !t._writableState.needDrain || y()
                }

                function u(e) {
                    U("ondata"), w = !1, !1 !== t.write(e) || w || ((1 === d.pipesCount && d.pipes === t || d.pipesCount > 1 && -1 !== B(d.pipes, t)) && !v && (U("false write response, pause", l._readableState.awaitDrain), l._readableState.awaitDrain++, w = !0), l.pause())
                }

                function a(e) {
                    U("onerror", e), c(), t.removeListener("error", a), 0 === x(t, "error") && t.emit("error", e)
                }

                function f() {
                    t.removeListener("finish", h), c()
                }

                function h() {
                    U("onfinish"), t.removeListener("close", f), c()
                }

                function c() {
                    U("unpipe"), l.unpipe(t)
                }
                var l = this,
                    d = this._readableState;
                switch (d.pipesCount) {
                    case 0:
                        d.pipes = t;
                        break;
                    case 1:
                        d.pipes = [d.pipes, t];
                        break;
                    default:
                        d.pipes.push(t)
                }
                d.pipesCount += 1, U("pipe count=%d opts=%j", d.pipesCount, n);
                var p = (!n || !1 !== n.end) && t !== e.stdout && t !== e.stderr,
                    g = p ? o : s;
                d.endEmitted ? A(g) : l.once("end", g), t.on("unpipe", i);
                var y = _(l);
                t.on("drain", y);
                var v = !1,
                    w = !1;
                return l.on("data", u), r(t, "error", a), t.once("close", f), t.once("finish", h), t.emit("pipe", l), d.flowing || (U("pipe resume"), l.resume()), t
            }, o.prototype.unpipe = function(t) {
                var e = this._readableState;
                if (0 === e.pipesCount) return this;
                if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this), this);
                if (!t) {
                    var n = e.pipes,
                        r = e.pipesCount;
                    e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                    for (var i = 0; i < r; i++) n[i].emit("unpipe", this);
                    return this
                }
                var o = B(e.pipes, t);
                return -1 === o ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this)
            }, o.prototype.on = function(t, e) {
                var n = P.prototype.on.call(this, t, e);
                if ("data" === t) !1 !== this._readableState.flowing && this.resume();
                else if ("readable" === t) {
                    var r = this._readableState;
                    r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && l(this) : A(y, this))
                }
                return n
            }, o.prototype.addListener = o.prototype.on, o.prototype.resume = function() {
                var t = this._readableState;
                return t.flowing || (U("resume"), t.flowing = !0, v(this, t)), this
            }, o.prototype.pause = function() {
                return U("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (U("pause"), this._readableState.flowing = !1, this.emit("pause")), this
            }, o.prototype.wrap = function(t) {
                var e = this._readableState,
                    n = !1,
                    r = this;
                t.on("end", function() {
                    if (U("wrapped end"), e.decoder && !e.ended) {
                        var t = e.decoder.end();
                        t && t.length && r.push(t)
                    }
                    r.push(null)
                }), t.on("data", function(i) {
                    if (U("wrapped data"), e.decoder && (i = e.decoder.write(i)), (!e.objectMode || null !== i && void 0 !== i) && (e.objectMode || i && i.length)) {
                        r.push(i) || (n = !0, t.pause())
                    }
                });
                for (var i in t) void 0 === this[i] && "function" == typeof t[i] && (this[i] = function(e) {
                    return function() {
                        return t[e].apply(t, arguments)
                    }
                }(i));
                for (var o = 0; o < z.length; o++) t.on(z[o], r.emit.bind(r, z[o]));
                return r._read = function(e) {
                    U("wrapped _read", e), n && (n = !1, t.resume())
                }, r
            }, o._fromList = m
        }).call(e, n(8))
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            this.afterTransform = function(e, n) {
                return i(t, e, n)
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null
        }

        function i(t, e, n) {
            var r = t._transformState;
            r.transforming = !1;
            var i = r.writecb;
            if (!i) return t.emit("error", new Error("no writecb in Transform class"));
            r.writechunk = null, r.writecb = null, null !== n && void 0 !== n && t.push(n), i(e);
            var o = t._readableState;
            o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark)
        }

        function o(t) {
            if (!(this instanceof o)) return new o(t);
            u.call(this, t), this._transformState = new r(this);
            var e = this;
            this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.once("prefinish", function() {
                "function" == typeof this._flush ? this._flush(function(t, n) {
                    s(e, t, n)
                }) : s(e)
            })
        }

        function s(t, e, n) {
            if (e) return t.emit("error", e);
            null !== n && void 0 !== n && t.push(n);
            var r = t._writableState,
                i = t._transformState;
            if (r.length) throw new Error("Calling transform done when ws.length != 0");
            if (i.transforming) throw new Error("Calling transform done when still transforming");
            return t.push(null)
        }
        t.exports = o;
        var u = n(2),
            a = n(5);
        a.inherits = n(1), a.inherits(o, u), o.prototype.push = function(t, e) {
            return this._transformState.needTransform = !1, u.prototype.push.call(this, t, e)
        }, o.prototype._transform = function(t, e, n) {
            throw new Error("_transform() is not implemented")
        }, o.prototype._write = function(t, e, n) {
            var r = this._transformState;
            if (r.writecb = n, r.writechunk = t, r.writeencoding = e, !r.transforming) {
                var i = this._readableState;
                (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }
        }, o.prototype._read = function(t) {
            var e = this._transformState;
            null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
        }
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = d, c.call(this, 64, 56)
            }

            function i(t, e, n) {
                return n ^ t & (e ^ n)
            }

            function o(t, e, n) {
                return t & e | n & (t | e)
            }

            function s(t) {
                return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
            }

            function u(t) {
                return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
            }

            function a(t) {
                return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
            }

            function f(t) {
                return (t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10
            }
            var h = n(1),
                c = n(4),
                l = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                d = new Array(64);
            h(r, c), r.prototype.init = function() {
                return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
            }, r.prototype._update = function(t) {
                for (var e = this._w, n = 0 | this._a, r = 0 | this._b, h = 0 | this._c, c = 0 | this._d, d = 0 | this._e, p = 0 | this._f, g = 0 | this._g, _ = 0 | this._h, y = 0; y < 16; ++y) e[y] = t.readInt32BE(4 * y);
                for (; y < 64; ++y) e[y] = f(e[y - 2]) + e[y - 7] + a(e[y - 15]) + e[y - 16] | 0;
                for (var v = 0; v < 64; ++v) {
                    var w = _ + u(d) + i(d, p, g) + l[v] + e[v] | 0,
                        b = s(n) + o(n, r, h) | 0;
                    _ = g, g = p, p = d, d = c + w | 0, c = h, h = r, r = n, n = w + b | 0
                }
                this._a = n + this._a | 0, this._b = r + this._b | 0, this._c = h + this._c | 0, this._d = c + this._d | 0, this._e = d + this._e | 0, this._f = p + this._f | 0, this._g = g + this._g | 0, this._h = _ + this._h | 0
            }, r.prototype._hash = function() {
                var t = new e(32);
                return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = _, p.call(this, 128, 112)
            }

            function i(t, e, n) {
                return n ^ t & (e ^ n)
            }

            function o(t, e, n) {
                return t & e | n & (t | e)
            }

            function s(t, e) {
                return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25)
            }

            function u(t, e) {
                return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23)
            }

            function a(t, e) {
                return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7
            }

            function f(t, e) {
                return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25)
            }

            function h(t, e) {
                return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6
            }

            function c(t, e) {
                return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26)
            }

            function l(t, e) {
                return t >>> 0 < e >>> 0 ? 1 : 0
            }
            var d = n(1),
                p = n(4),
                g = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
                _ = new Array(160);
            d(r, p), r.prototype.init = function() {
                return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
            }, r.prototype._update = function(t) {
                for (var e = this._w, n = 0 | this._ah, r = 0 | this._bh, d = 0 | this._ch, p = 0 | this._dh, _ = 0 | this._eh, y = 0 | this._fh, v = 0 | this._gh, w = 0 | this._hh, b = 0 | this._al, m = 0 | this._bl, E = 0 | this._cl, S = 0 | this._dl, T = 0 | this._el, k = 0 | this._fl, R = 0 | this._gl, B = 0 | this._hl, M = 0; M < 32; M += 2) e[M] = t.readInt32BE(4 * M), e[M + 1] = t.readInt32BE(4 * M + 4);
                for (; M < 160; M += 2) {
                    var A = e[M - 30],
                        O = e[M - 30 + 1],
                        P = a(A, O),
                        x = f(O, A);
                    A = e[M - 4], O = e[M - 4 + 1];
                    var L = h(A, O),
                        j = c(O, A),
                        I = e[M - 14],
                        C = e[M - 14 + 1],
                        U = e[M - 32],
                        D = e[M - 32 + 1],
                        Y = x + C | 0,
                        z = P + I + l(Y, x) | 0;
                    Y = Y + j | 0, z = z + L + l(Y, j) | 0, Y = Y + D | 0, z = z + U + l(Y, D) | 0, e[M] = z, e[M + 1] = Y
                }
                for (var q = 0; q < 160; q += 2) {
                    z = e[q], Y = e[q + 1];
                    var F = o(n, r, d),
                        N = o(b, m, E),
                        W = s(n, b),
                        H = s(b, n),
                        K = u(_, T),
                        V = u(T, _),
                        X = g[q],
                        J = g[q + 1],
                        Z = i(_, y, v),
                        $ = i(T, k, R),
                        G = B + V | 0,
                        Q = w + K + l(G, B) | 0;
                    G = G + $ | 0, Q = Q + Z + l(G, $) | 0, G = G + J | 0, Q = Q + X + l(G, J) | 0, G = G + Y | 0, Q = Q + z + l(G, Y) | 0;
                    var tt = H + N | 0,
                        et = W + F + l(tt, H) | 0;
                    w = v, B = R, v = y, R = k, y = _, k = T, T = S + G | 0, _ = p + Q + l(T, S) | 0, p = d, S = E, d = r, E = m, r = n, m = b, b = G + tt | 0, n = Q + et + l(b, G) | 0
                }
                this._al = this._al + b | 0, this._bl = this._bl + m | 0, this._cl = this._cl + E | 0, this._dl = this._dl + S | 0, this._el = this._el + T | 0, this._fl = this._fl + k | 0, this._gl = this._gl + R | 0, this._hl = this._hl + B | 0, this._ah = this._ah + n + l(this._al, b) | 0, this._bh = this._bh + r + l(this._bl, m) | 0, this._ch = this._ch + d + l(this._cl, E) | 0, this._dh = this._dh + p + l(this._dl, S) | 0, this._eh = this._eh + _ + l(this._el, T) | 0, this._fh = this._fh + y + l(this._fl, k) | 0, this._gh = this._gh + v + l(this._gl, R) | 0, this._hh = this._hh + w + l(this._hl, B) | 0
            }, r.prototype._hash = function() {
                function t(t, e, r) {
                    n.writeInt32BE(t, r), n.writeInt32BE(e, r + 4)
                }
                var n = new e(64);
                return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), t(this._gh, this._gl, 48), t(this._hh, this._hl, 56), n
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        var r = n(76);
        e.encode = r.encode, e.decode = r.decode
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(36),
            i = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        e.default = new i.default
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(61),
            o = r(i),
            s = n(42),
            u = r(s);
        e.default = {
            createHmac: o.default,
            randomBytes: u.default
        }
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function o(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var u = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
            a = n(21),
            f = r(a),
            h = n(3),
            c = n(37),
            l = r(c),
            d = n(11),
            p = r(d),
            g = n(38),
            _ = r(g),
            y = n(39),
            v = r(y),
            w = n(40),
            b = r(w),
            m = f.default.TOTP,
            E = function(t) {
                function e() {
                    return i(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
                }
                return s(e, t), u(e, [{
                    key: "encode",
                    value: function() {
                        return _.default.apply(void 0, arguments)
                    }
                }, {
                    key: "decode",
                    value: function() {
                        return p.default.apply(void 0, arguments)
                    }
                }, {
                    key: "keyuri",
                    value: function() {
                        return v.default.apply(void 0, arguments)
                    }
                }, {
                    key: "generateSecret",
                    value: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 20;
                        if (!t) return "";
                        var e = (0, h.secretKey)(t, this.options);
                        return (0, _.default)(e)
                    }
                }, {
                    key: "generate",
                    value: function(t) {
                        return (0, b.default)(t || this.options.secret, this.options)
                    }
                }, {
                    key: "check",
                    value: function(t, e) {
                        return (0, l.default)(t, e || this.options.secret, this.options)
                    }
                }, {
                    key: "defaultOptions",
                    get: function() {
                        return {
                            encoding: "hex",
                            epoch: null,
                            step: 30
                        }
                    }
                }]), e
            }(m);
        E.prototype.Authenticator = E, E.prototype.utils = {
            check: l.default,
            decodeKey: p.default,
            encodeKey: _.default,
            keyuri: v.default,
            token: b.default
        }, e.default = E
    }, function(t, e, n) {
        "use strict";

        function r(t, e, n) {
            return (0, i.totpCheck)(t, (0, s.default)(e), n)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(6),
            o = n(11),
            s = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return o.default.encode(t).toString().replace(/=/g, "")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(33),
            o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "user",
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "service",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return "otpauth://totp/" + i.replace("{user}", t).replace("{secret}", n).replace(/{service}/g, e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = "{service}:{user}?secret={secret}&issuer={service}";
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            return (0, i.totpToken)((0, s.default)(t), e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(6),
            o = n(11),
            s = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i = n(20),
            o = r(i),
            s = n(21),
            u = r(s),
            a = n(34),
            f = r(a),
            h = n(35),
            c = r(h);
        f.default.options = {
            crypto: c.default
        }, o.default.options = {
            crypto: c.default
        }, u.default.options = {
            crypto: c.default
        }, t.exports = {
            Authenticator: f.default.Authenticator,
            HOTP: o.default.HOTP,
            TOTP: u.default.TOTP,
            authenticator: f.default,
            hotp: o.default,
            totp: u.default
        }
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function n(e) {
                var n = window.crypto || window.msCrypto;
                if (!n || "function" != typeof n.getRandomValues) throw new Error("Unable to load crypto module. You may be on an older browser");
                if (e > 65536) throw new Error("Requested size of random bytes is too large");
                if (e < 1) throw new Error("Requested size must be more than 0");
                var r = new Uint8Array(e);
                return n.getRandomValues(r), new t(r.buffer)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = n
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t, e, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                o = (0, s.default)(e, n, r);
            return !(o.length < 1) && (0, i.isSameToken)(t, o)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(3),
            o = n(14),
            s = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = (0, s.default)(e, n || {});
            return !(r.length < 1) && (0, i.isSameToken)(t, r)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(3),
            o = n(27),
            s = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(o);
        e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
            u = n(6),
            a = function() {
                function t() {
                    r(this, t), this._options = this.defaultOptions
                }
                return s(t, [{
                    key: "resetOptions",
                    value: function() {
                        return this._options = this.defaultOptions, this
                    }
                }, {
                    key: "generate",
                    value: function(t, e) {
                        return (0, u.hotpToken)(t || this.options.secret, e, this.options)
                    }
                }, {
                    key: "check",
                    value: function(t, e, n) {
                        return (0, u.hotpCheck)(t, e || this.options.secret, n, this.options)
                    }
                }, {
                    key: "verify",
                    value: function(t) {
                        return "object" === (void 0 === t ? "undefined" : o(t)) && null != t && this.check(t.token, t.secret, t.counter)
                    }
                }, {
                    key: "defaultOptions",
                    get: function() {
                        return {}
                    }
                }, {
                    key: "options",
                    set: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        t && (this._options = i({}, this._options, t))
                    },
                    get: function() {
                        return i({}, this._options)
                    }
                }]), t
            }();
        a.prototype.HOTP = a, e.default = a
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function o(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            u = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e
                }
            }(),
            a = n(6),
            f = n(20),
            h = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(f),
            c = h.default.HOTP,
            l = function(t) {
                function e() {
                    return r(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
                }
                return o(e, t), u(e, [{
                    key: "generate",
                    value: function(t) {
                        return (0, a.totpToken)(t || this.options.secret, this.options)
                    }
                }, {
                    key: "check",
                    value: function(t, e) {
                        return (0, a.totpCheck)(t, e || this.options.secret, this.options)
                    }
                }, {
                    key: "verify",
                    value: function(t) {
                        return "object" === (void 0 === t ? "undefined" : s(t)) && null != t && this.check(t.token, t.secret)
                    }
                }, {
                    key: "defaultOptions",
                    get: function() {
                        return {
                            epoch: null,
                            step: 30
                        }
                    }
                }]), e
            }(c);
        l.prototype.TOTP = l, e.default = l
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return parseInt(t, 16)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            return parseInt(t, 10).toString(16)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            return parseFloat(t) === parseFloat(e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            for (var n = e || 0, r = t + ""; r.length < n;) r = "0" + r;
            return r
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function n(e, n, r) {
                var i = e.toString(r),
                    o = i.length;
                if (n && o < n) {
                    var s = new Array(n - o + 1).join(e.toString("hex"));
                    return new t(s, "hex").slice(0, n)
                }
                return e
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = n
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return null == t ? "" : t.replace(/\s+/g, "")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!t || t < 1) return "";
            if (!e.crypto || "function" != typeof e.crypto.randomBytes) throw new Error("Expecting options.crypto to have a randomBytes function");
            return e.crypto.randomBytes(t).toString("base64").slice(0, t)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : " ",
                r = parseInt(e, 10);
            if (Number.isNaN(r) || "string" != typeof t) return "";
            var i = new RegExp(".{1," + e + "}", "g");
            return t.match(i).join(n)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            for (var e = null == t ? "" : t, n = "", r = "", i = 0; i < e.length; i++) r = ("0000" + e.charCodeAt(i).toString(16)).slice(-2), n += "" + r;
            return n
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = r
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
        }

        function i(t) {
            return 3 * t.length / 4 - r(t)
        }

        function o(t) {
            var e, n, i, o, s, u, a = t.length;
            s = r(t), u = new c(3 * a / 4 - s), i = s > 0 ? a - 4 : a;
            var f = 0;
            for (e = 0, n = 0; e < i; e += 4, n += 3) o = h[t.charCodeAt(e)] << 18 | h[t.charCodeAt(e + 1)] << 12 | h[t.charCodeAt(e + 2)] << 6 | h[t.charCodeAt(e + 3)], u[f++] = o >> 16 & 255, u[f++] = o >> 8 & 255, u[f++] = 255 & o;
            return 2 === s ? (o = h[t.charCodeAt(e)] << 2 | h[t.charCodeAt(e + 1)] >> 4, u[f++] = 255 & o) : 1 === s && (o = h[t.charCodeAt(e)] << 10 | h[t.charCodeAt(e + 1)] << 4 | h[t.charCodeAt(e + 2)] >> 2, u[f++] = o >> 8 & 255, u[f++] = 255 & o), u
        }

        function s(t) {
            return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
        }

        function u(t, e, n) {
            for (var r, i = [], o = e; o < n; o += 3) r = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(s(r));
            return i.join("")
        }

        function a(t) {
            for (var e, n = t.length, r = n % 3, i = "", o = [], s = 0, a = n - r; s < a; s += 16383) o.push(u(t, s, s + 16383 > a ? a : s + 16383));
            return 1 === r ? (e = t[n - 1], i += f[e >> 2], i += f[e << 4 & 63], i += "==") : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], i += f[e >> 10], i += f[e >> 4 & 63], i += f[e << 2 & 63], i += "="), o.push(i), o.join("")
        }
        e.byteLength = i, e.toByteArray = o, e.fromByteArray = a;
        for (var f = [], h = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, p = l.length; d < p; ++d) f[d] = l[d], h[l.charCodeAt(d)] = d;
        h["-".charCodeAt(0)] = 62, h["_".charCodeAt(0)] = 63
    }, function(t, e, n) {
        (function(e) {
            function r(t) {
                i.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._decoder = null, this._encoding = null
            }
            var i = n(9).Transform,
                o = n(1),
                s = n(19).StringDecoder;
            t.exports = r, o(r, i), r.prototype.update = function(t, n, r) {
                "string" == typeof t && (t = new e(t, n));
                var i = this._update(t);
                return this.hashMode ? this : (r && (i = this._toString(i, r)), i)
            }, r.prototype.setAutoPadding = function() {}, r.prototype.getAuthTag = function() {
                throw new Error("trying to get auth tag in unsupported state")
            }, r.prototype.setAuthTag = function() {
                throw new Error("trying to set auth tag in unsupported state")
            }, r.prototype.setAAD = function() {
                throw new Error("trying to set aad in unsupported state")
            }, r.prototype._transform = function(t, e, n) {
                var r;
                try {
                    this.hashMode ? this._update(t) : this.push(this._update(t))
                } catch (t) {
                    r = t
                } finally {
                    n(r)
                }
            }, r.prototype._flush = function(t) {
                var e;
                try {
                    this.push(this._final())
                } catch (t) {
                    e = t
                } finally {
                    t(e)
                }
            }, r.prototype._finalOrDigest = function(t) {
                var n = this._final() || new e("");
                return t && (n = this._toString(n, t, !0)), n
            }, r.prototype._toString = function(t, e, n) {
                if (this._decoder || (this._decoder = new s(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
                var r = this._decoder.write(t);
                return n && (r += this._decoder.end()), r
            }
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";
        (function(e) {
            function r(t) {
                f.call(this, "digest"), this._hash = t, this.buffers = []
            }

            function i(t) {
                f.call(this, "digest"), this._hash = t
            }
            var o = n(1),
                s = n(60),
                u = n(69),
                a = n(71),
                f = n(57);
            o(r, f), r.prototype._update = function(t) {
                this.buffers.push(t)
            }, r.prototype._final = function() {
                var t = e.concat(this.buffers),
                    n = this._hash(t);
                return this.buffers = null, n
            }, o(i, f), i.prototype._update = function(t) {
                this._hash.update(t)
            }, i.prototype._final = function() {
                return this._hash.digest()
            }, t.exports = function(t) {
                return t = t.toLowerCase(), "md5" === t ? new r(s) : "rmd160" === t || "ripemd160" === t ? new r(u) : new i(a(t))
            }
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function n(e, n) {
                if (e.length % o != 0) {
                    var r = e.length + (o - e.length % o);
                    e = t.concat([e, s], r)
                }
                for (var i = [], u = n ? e.readInt32BE : e.readInt32LE, a = 0; a < e.length; a += o) i.push(u.call(e, a));
                return i
            }

            function r(e, n, r) {
                for (var i = new t(n), o = r ? i.writeInt32BE : i.writeInt32LE, s = 0; s < e.length; s++) o.call(i, e[s], 4 * s, !0);
                return i
            }

            function i(e, i, o, s) {
                return t.isBuffer(e) || (e = new t(e)), r(i(n(e, s), e.length * u), o, s)
            }
            var o = 4,
                s = new t(o);
            s.fill(0);
            var u = 8;
            e.hash = i
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";

        function r(t, e) {
            t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
            for (var n = 1732584193, r = -271733879, i = -1732584194, h = 271733878, c = 0; c < t.length; c += 16) {
                var l = n,
                    d = r,
                    p = i,
                    g = h;
                n = o(n, r, i, h, t[c + 0], 7, -680876936), h = o(h, n, r, i, t[c + 1], 12, -389564586), i = o(i, h, n, r, t[c + 2], 17, 606105819), r = o(r, i, h, n, t[c + 3], 22, -1044525330), n = o(n, r, i, h, t[c + 4], 7, -176418897), h = o(h, n, r, i, t[c + 5], 12, 1200080426), i = o(i, h, n, r, t[c + 6], 17, -1473231341), r = o(r, i, h, n, t[c + 7], 22, -45705983), n = o(n, r, i, h, t[c + 8], 7, 1770035416), h = o(h, n, r, i, t[c + 9], 12, -1958414417), i = o(i, h, n, r, t[c + 10], 17, -42063), r = o(r, i, h, n, t[c + 11], 22, -1990404162), n = o(n, r, i, h, t[c + 12], 7, 1804603682), h = o(h, n, r, i, t[c + 13], 12, -40341101), i = o(i, h, n, r, t[c + 14], 17, -1502002290), r = o(r, i, h, n, t[c + 15], 22, 1236535329), n = s(n, r, i, h, t[c + 1], 5, -165796510), h = s(h, n, r, i, t[c + 6], 9, -1069501632), i = s(i, h, n, r, t[c + 11], 14, 643717713), r = s(r, i, h, n, t[c + 0], 20, -373897302), n = s(n, r, i, h, t[c + 5], 5, -701558691), h = s(h, n, r, i, t[c + 10], 9, 38016083), i = s(i, h, n, r, t[c + 15], 14, -660478335), r = s(r, i, h, n, t[c + 4], 20, -405537848), n = s(n, r, i, h, t[c + 9], 5, 568446438), h = s(h, n, r, i, t[c + 14], 9, -1019803690), i = s(i, h, n, r, t[c + 3], 14, -187363961), r = s(r, i, h, n, t[c + 8], 20, 1163531501), n = s(n, r, i, h, t[c + 13], 5, -1444681467), h = s(h, n, r, i, t[c + 2], 9, -51403784), i = s(i, h, n, r, t[c + 7], 14, 1735328473), r = s(r, i, h, n, t[c + 12], 20, -1926607734), n = u(n, r, i, h, t[c + 5], 4, -378558), h = u(h, n, r, i, t[c + 8], 11, -2022574463), i = u(i, h, n, r, t[c + 11], 16, 1839030562), r = u(r, i, h, n, t[c + 14], 23, -35309556), n = u(n, r, i, h, t[c + 1], 4, -1530992060), h = u(h, n, r, i, t[c + 4], 11, 1272893353), i = u(i, h, n, r, t[c + 7], 16, -155497632), r = u(r, i, h, n, t[c + 10], 23, -1094730640), n = u(n, r, i, h, t[c + 13], 4, 681279174), h = u(h, n, r, i, t[c + 0], 11, -358537222), i = u(i, h, n, r, t[c + 3], 16, -722521979), r = u(r, i, h, n, t[c + 6], 23, 76029189), n = u(n, r, i, h, t[c + 9], 4, -640364487), h = u(h, n, r, i, t[c + 12], 11, -421815835), i = u(i, h, n, r, t[c + 15], 16, 530742520), r = u(r, i, h, n, t[c + 2], 23, -995338651), n = a(n, r, i, h, t[c + 0], 6, -198630844), h = a(h, n, r, i, t[c + 7], 10, 1126891415), i = a(i, h, n, r, t[c + 14], 15, -1416354905), r = a(r, i, h, n, t[c + 5], 21, -57434055), n = a(n, r, i, h, t[c + 12], 6, 1700485571), h = a(h, n, r, i, t[c + 3], 10, -1894986606), i = a(i, h, n, r, t[c + 10], 15, -1051523), r = a(r, i, h, n, t[c + 1], 21, -2054922799), n = a(n, r, i, h, t[c + 8], 6, 1873313359), h = a(h, n, r, i, t[c + 15], 10, -30611744), i = a(i, h, n, r, t[c + 6], 15, -1560198380), r = a(r, i, h, n, t[c + 13], 21, 1309151649), n = a(n, r, i, h, t[c + 4], 6, -145523070), h = a(h, n, r, i, t[c + 11], 10, -1120210379), i = a(i, h, n, r, t[c + 2], 15, 718787259), r = a(r, i, h, n, t[c + 9], 21, -343485551), n = f(n, l), r = f(r, d), i = f(i, p), h = f(h, g)
            }
            return Array(n, r, i, h)
        }

        function i(t, e, n, r, i, o) {
            return f(h(f(f(e, t), f(r, o)), i), n)
        }

        function o(t, e, n, r, o, s, u) {
            return i(e & n | ~e & r, t, e, o, s, u)
        }

        function s(t, e, n, r, o, s, u) {
            return i(e & r | n & ~r, t, e, o, s, u)
        }

        function u(t, e, n, r, o, s, u) {
            return i(e ^ n ^ r, t, e, o, s, u)
        }

        function a(t, e, n, r, o, s, u) {
            return i(n ^ (e | ~r), t, e, o, s, u)
        }

        function f(t, e) {
            var n = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
        }

        function h(t, e) {
            return t << e | t >>> 32 - e
        }
        var c = n(59);
        t.exports = function(t) {
            return c.hash(t, r, 16)
        }
    }, function(t, e, n) {
        "use strict";
        (function(e) {
            function r(t, n) {
                s.call(this), t = t.toLowerCase(), "string" == typeof n && (n = new e(n));
                var r = "sha512" === t || "sha384" === t ? 128 : 64;
                this._alg = t, this._key = n, n.length > r ? n = i(t).update(n).digest() : n.length < r && (n = e.concat([n, u], r));
                for (var o = this._ipad = new e(r), a = this._opad = new e(r), f = 0; f < r; f++) o[f] = 54 ^ n[f], a[f] = 92 ^ n[f];
                this._hash = i(t).update(o)
            }
            var i = n(58),
                o = n(1),
                s = n(9).Transform,
                u = new e(128);
            u.fill(0), o(r, s), r.prototype.update = function(t, e) {
                return this._hash.update(t, e), this
            }, r.prototype._transform = function(t, e, n) {
                this._hash.update(t), n()
            }, r.prototype._flush = function(t) {
                this.push(this.digest()), t()
            }, r.prototype.digest = function(t) {
                var e = this._hash.digest();
                return i(this._alg).update(this._opad).update(e).digest(t)
            }, t.exports = function(t, e) {
                return new r(t, e)
            }
        }).call(e, n(0).Buffer)
    }, function(t, e) {
        e.read = function(t, e, n, r, i) {
            var o, s, u = 8 * i - r - 1,
                a = (1 << u) - 1,
                f = a >> 1,
                h = -7,
                c = n ? i - 1 : 0,
                l = n ? -1 : 1,
                d = t[e + c];
            for (c += l, o = d & (1 << -h) - 1, d >>= -h, h += u; h > 0; o = 256 * o + t[e + c], c += l, h -= 8);
            for (s = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; s = 256 * s + t[e + c], c += l, h -= 8);
            if (0 === o) o = 1 - f;
            else {
                if (o === a) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                s += Math.pow(2, r), o -= f
            }
            return (d ? -1 : 1) * s * Math.pow(2, o - r)
        }, e.write = function(t, e, n, r, i, o) {
            var s, u, a, f = 8 * o - i - 1,
                h = (1 << f) - 1,
                c = h >> 1,
                l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = r ? 0 : o - 1,
                p = r ? 1 : -1,
                g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), e += s + c >= 1 ? l / a : l * Math.pow(2, 1 - c), e * a >= 2 && (s++, a /= 2), s + c >= h ? (u = 0, s = h) : s + c >= 1 ? (u = (e * a - 1) * Math.pow(2, i), s += c) : (u = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + d] = 255 & u, d += p, u /= 256, i -= 8);
            for (s = s << i | u, f += i; f > 0; t[n + d] = 255 & s, d += p, s /= 256, f -= 8);
            t[n + d - p] |= 128 * g
        }
    }, function(t, e, n) {
        t.exports = n(2)
    }, function(t, e, n) {
        "use strict";

        function r(t) {
            if (!(this instanceof r)) return new r(t);
            i.call(this, t)
        }
        t.exports = r;
        var i = n(30),
            o = n(5);
        o.inherits = n(1), o.inherits(r, i), r.prototype._transform = function(t, e, n) {
            n(null, t)
        }
    }, function(t, e, n) {
        "use strict";

        function r() {
            this.head = null, this.tail = null, this.length = 0
        }
        var i = (n(0).Buffer, n(15));
        t.exports = r, r.prototype.push = function(t) {
            var e = {
                data: t,
                next: null
            };
            this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
        }, r.prototype.unshift = function(t) {
            var e = {
                data: t,
                next: this.head
            };
            0 === this.length && (this.tail = e), this.head = e, ++this.length
        }, r.prototype.shift = function() {
            if (0 !== this.length) {
                var t = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
            }
        }, r.prototype.clear = function() {
            this.head = this.tail = null, this.length = 0
        }, r.prototype.join = function(t) {
            if (0 === this.length) return "";
            for (var e = this.head, n = "" + e.data; e = e.next;) n += t + e.data;
            return n
        }, r.prototype.concat = function(t) {
            if (0 === this.length) return i.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var e = i.allocUnsafe(t >>> 0), n = this.head, r = 0; n;) n.data.copy(e, r), r += n.data.length, n = n.next;
            return e
        }
    }, function(t, e, n) {
        t.exports = n(18).PassThrough
    }, function(t, e, n) {
        t.exports = n(18).Transform
    }, function(t, e, n) {
        t.exports = n(17)
    }, function(t, e, n) {
        (function(e) {
            function n(t) {
                for (var e = [], n = 0, r = 0; n < t.length; n++, r += 8) e[r >>> 5] |= t[n] << 24 - r % 32;
                return e
            }

            function r(t) {
                for (var e = [], n = 0; n < 32 * t.length; n += 8) e.push(t[n >>> 5] >>> 24 - n % 32 & 255);
                return e
            }

            function i(t, e, n) {
                for (var r = 0; r < 16; r++) {
                    var i = n + r,
                        c = e[i];
                    e[i] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                }
                var v, w, b, m, E, S, T, k, R, B;
                S = v = t[0], T = w = t[1], k = b = t[2], R = m = t[3], B = E = t[4];
                var M;
                for (r = 0; r < 80; r += 1) M = v + e[n + l[r]] | 0, M += r < 16 ? o(w, b, m) + _[0] : r < 32 ? s(w, b, m) + _[1] : r < 48 ? u(w, b, m) + _[2] : r < 64 ? a(w, b, m) + _[3] : f(w, b, m) + _[4], M |= 0, M = h(M, p[r]), M = M + E | 0, v = E, E = m, m = h(b, 10), b = w, w = M, M = S + e[n + d[r]] | 0, M += r < 16 ? f(T, k, R) + y[0] : r < 32 ? a(T, k, R) + y[1] : r < 48 ? u(T, k, R) + y[2] : r < 64 ? s(T, k, R) + y[3] : o(T, k, R) + y[4], M |= 0, M = h(M, g[r]), M = M + B | 0, S = B, B = R, R = h(k, 10), k = T, T = M;
                M = t[1] + b + R | 0, t[1] = t[2] + m + B | 0, t[2] = t[3] + E + S | 0, t[3] = t[4] + v + T | 0, t[4] = t[0] + w + k | 0, t[0] = M
            }

            function o(t, e, n) {
                return t ^ e ^ n
            }

            function s(t, e, n) {
                return t & e | ~t & n
            }

            function u(t, e, n) {
                return (t | ~e) ^ n
            }

            function a(t, e, n) {
                return t & n | e & ~n
            }

            function f(t, e, n) {
                return t ^ (e | ~n)
            }

            function h(t, e) {
                return t << e | t >>> 32 - e
            }

            function c(t) {
                var o = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                "string" == typeof t && (t = new e(t, "utf8"));
                var s = n(t),
                    u = 8 * t.length,
                    a = 8 * t.length;
                s[u >>> 5] |= 128 << 24 - u % 32, s[14 + (u + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
                for (var f = 0; f < s.length; f += 16) i(o, s, f);
                for (f = 0; f < 5; f++) {
                    var h = o[f];
                    o[f] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8)
                }
                var c = r(o);
                return new e(c)
            }
            /** @preserve
            (c) 2012 by Cédric Mesnil. All rights reserved.

            Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

                - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
            */
            var l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
                d = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
                p = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
                g = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
                _ = [0, 1518500249, 1859775393, 2400959708, 2840853838],
                y = [1352829926, 1548603684, 1836072691, 2053994217, 0];
            t.exports = c
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(t, e) {
            ! function(t, n) {
                "use strict";

                function r(t) {
                    "function" != typeof t && (t = new Function("" + t));
                    for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                    var r = {
                        callback: t,
                        args: e
                    };
                    return f[a] = r, u(a), a++
                }

                function i(t) {
                    delete f[t]
                }

                function o(t) {
                    var e = t.callback,
                        r = t.args;
                    switch (r.length) {
                        case 0:
                            e();
                            break;
                        case 1:
                            e(r[0]);
                            break;
                        case 2:
                            e(r[0], r[1]);
                            break;
                        case 3:
                            e(r[0], r[1], r[2]);
                            break;
                        default:
                            e.apply(n, r)
                    }
                }

                function s(t) {
                    if (h) setTimeout(s, 0, t);
                    else {
                        var e = f[t];
                        if (e) {
                            h = !0;
                            try {
                                o(e)
                            } finally {
                                i(t), h = !1
                            }
                        }
                    }
                }
                if (!t.setImmediate) {
                    var u, a = 1,
                        f = {},
                        h = !1,
                        c = t.document,
                        l = Object.getPrototypeOf && Object.getPrototypeOf(t);
                    l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? function() {
                        u = function(t) {
                            e.nextTick(function() {
                                s(t)
                            })
                        }
                    }() : function() {
                        if (t.postMessage && !t.importScripts) {
                            var e = !0,
                                n = t.onmessage;
                            return t.onmessage = function() {
                                e = !1
                            }, t.postMessage("", "*"), t.onmessage = n, e
                        }
                    }() ? function() {
                        var e = "setImmediate$" + Math.random() + "$",
                            n = function(n) {
                                n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && s(+n.data.slice(e.length))
                            };
                        t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), u = function(n) {
                            t.postMessage(e + n, "*")
                        }
                    }() : t.MessageChannel ? function() {
                        var t = new MessageChannel;
                        t.port1.onmessage = function(t) {
                            s(t.data)
                        }, u = function(e) {
                            t.port2.postMessage(e)
                        }
                    }() : c && "onreadystatechange" in c.createElement("script") ? function() {
                        var t = c.documentElement;
                        u = function(e) {
                            var n = c.createElement("script");
                            n.onreadystatechange = function() {
                                s(e), n.onreadystatechange = null, t.removeChild(n), n = null
                            }, t.appendChild(n)
                        }
                    }() : function() {
                        u = function(t) {
                            setTimeout(s, 0, t)
                        }
                    }(), l.setImmediate = r, l.clearImmediate = i
                }
            }("undefined" == typeof self ? void 0 === t ? this : t : self)
        }).call(e, n(10), n(8))
    }, function(t, e, n) {
        var e = t.exports = function(t) {
            t = t.toLowerCase();
            var n = e[t];
            if (!n) throw new Error(t + " is not supported (we accept pull requests)");
            return new n
        };
        e.sha = n(72), e.sha1 = n(73), e.sha224 = n(74), e.sha256 = n(31), e.sha384 = n(75), e.sha512 = n(32)
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = h, a.call(this, 64, 56)
            }

            function i(t) {
                return t << 5 | t >>> 27
            }

            function o(t) {
                return t << 30 | t >>> 2
            }

            function s(t, e, n, r) {
                return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r
            }
            var u = n(1),
                a = n(4),
                f = [1518500249, 1859775393, -1894007588, -899497514],
                h = new Array(80);
            u(r, a), r.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, r.prototype._update = function(t) {
                for (var e = this._w, n = 0 | this._a, r = 0 | this._b, u = 0 | this._c, a = 0 | this._d, h = 0 | this._e, c = 0; c < 16; ++c) e[c] = t.readInt32BE(4 * c);
                for (; c < 80; ++c) e[c] = e[c - 3] ^ e[c - 8] ^ e[c - 14] ^ e[c - 16];
                for (var l = 0; l < 80; ++l) {
                    var d = ~~(l / 20),
                        p = i(n) + s(d, r, u, a) + h + e[l] + f[d] | 0;
                    h = a, a = u, u = o(r), r = n, n = p
                }
                this._a = n + this._a | 0, this._b = r + this._b | 0, this._c = u + this._c | 0, this._d = a + this._d | 0, this._e = h + this._e | 0
            }, r.prototype._hash = function() {
                var t = new e(20);
                return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = c, f.call(this, 64, 56)
            }

            function i(t) {
                return t << 1 | t >>> 31
            }

            function o(t) {
                return t << 5 | t >>> 27
            }

            function s(t) {
                return t << 30 | t >>> 2
            }

            function u(t, e, n, r) {
                return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r
            }
            var a = n(1),
                f = n(4),
                h = [1518500249, 1859775393, -1894007588, -899497514],
                c = new Array(80);
            a(r, f), r.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, r.prototype._update = function(t) {
                for (var e = this._w, n = 0 | this._a, r = 0 | this._b, a = 0 | this._c, f = 0 | this._d, c = 0 | this._e, l = 0; l < 16; ++l) e[l] = t.readInt32BE(4 * l);
                for (; l < 80; ++l) e[l] = i(e[l - 3] ^ e[l - 8] ^ e[l - 14] ^ e[l - 16]);
                for (var d = 0; d < 80; ++d) {
                    var p = ~~(d / 20),
                        g = o(n) + u(p, r, a, f) + c + e[d] + h[p] | 0;
                    c = f, f = a, a = s(r), r = n, n = g
                }
                this._a = n + this._a | 0, this._b = r + this._b | 0, this._c = a + this._c | 0, this._d = f + this._d | 0, this._e = c + this._e | 0
            }, r.prototype._hash = function() {
                var t = new e(20);
                return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = u, s.call(this, 64, 56)
            }
            var i = n(1),
                o = n(31),
                s = n(4),
                u = new Array(64);
            i(r, o), r.prototype.init = function() {
                return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
            }, r.prototype._hash = function() {
                var t = new e(28);
                return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        (function(e) {
            function r() {
                this.init(), this._w = u, s.call(this, 128, 112)
            }
            var i = n(1),
                o = n(32),
                s = n(4),
                u = new Array(160);
            i(r, o), r.prototype.init = function() {
                return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
            }, r.prototype._hash = function() {
                function t(t, e, r) {
                    n.writeInt32BE(t, r), n.writeInt32BE(e, r + 4)
                }
                var n = new e(48);
                return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), n
            }, t.exports = r
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        "use strict";
        (function(t) {
            function n(t) {
                var e = Math.floor(t.length / 5);
                return t.length % 5 == 0 ? e : e + 1
            }
            var r = [255, 255, 26, 27, 28, 29, 30, 31, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255];
            e.encode = function(e) {
                t.isBuffer(e) || (e = new t(e));
                for (var r = 0, i = 0, o = 0, s = 0, u = new t(8 * n(e)); r < e.length;) {
                    var a = e[r];
                    o > 3 ? (s = a & 255 >> o, o = (o + 5) % 8, s = s << o | (r + 1 < e.length ? e[r + 1] : 0) >> 8 - o, r++) : (s = a >> 8 - (o + 5) & 31, 0 == (o = (o + 5) % 8) && r++), u[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(s), i++
                }
                for (r = i; r < u.length; r++) u[r] = 61;
                return u
            }, e.decode = function(e) {
                var n, i = 0,
                    o = 0,
                    s = 0;
                t.isBuffer(e) || (e = new t(e));
                for (var u = new t(Math.ceil(5 * e.length / 8)), a = 0; a < e.length && 61 !== e[a]; a++) {
                    var f = e[a] - 48;
                    if (!(f < r.length)) throw new Error("Invalid input - it is not base32 encoded string");
                    o = r[f], i <= 3 ? (i = (i + 5) % 8, 0 === i ? (n |= o, u[s] = n, s++, n = 0) : n |= 255 & o << 8 - i) : (i = (i + 5) % 8, n |= 255 & o >>> i, u[s] = n, s++, n = 255 & o << 8 - i)
                }
                return u.slice(0, s)
            }
        }).call(e, n(0).Buffer)
    }, function(t, e, n) {
        function r(t, e) {
            this._id = t, this._clearFn = e
        }
        var i = Function.prototype.apply;
        e.setTimeout = function() {
            return new r(i.call(setTimeout, window, arguments), clearTimeout)
        }, e.setInterval = function() {
            return new r(i.call(setInterval, window, arguments), clearInterval)
        }, e.clearTimeout = e.clearInterval = function(t) {
            t && t.close()
        }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
            this._clearFn.call(window, this._id)
        }, e.enroll = function(t, e) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = e
        }, e.unenroll = function(t) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
        }, e._unrefActive = e.active = function(t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                t._onTimeout && t._onTimeout()
            }, e))
        }, n(70), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate
    }, function(t, e, n) {
        (function(e) {
            function n(t, e) {
                function n() {
                    if (!i) {
                        if (r("throwDeprecation")) throw new Error(e);
                        r("traceDeprecation") ? console.trace(e) : console.warn(e), i = !0
                    }
                    return t.apply(this, arguments)
                }
                if (r("noDeprecation")) return t;
                var i = !1;
                return n
            }

            function r(t) {
                try {
                    if (!e.localStorage) return !1
                } catch (t) {
                    return !1
                }
                var n = e.localStorage[t];
                return null != n && "true" === String(n).toLowerCase()
            }
            t.exports = n
        }).call(e, n(10))
    }, function(t, e) {}])
});