var kx = Object.defineProperty
var Cx = (t, e, r) =>
  e in t
    ? kx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (t[e] = r)
var ai = (t, e, r) => (Cx(t, typeof e != "symbol" ? e + "" : e, r), r)
;(function () {
  const e = document.createElement("link").relList
  if (e && e.supports && e.supports("modulepreload")) return
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a)
  new MutationObserver((a) => {
    for (const u of a)
      if (u.type === "childList")
        for (const f of u.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && o(f)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(a) {
    const u = {}
    return (
      a.integrity && (u.integrity = a.integrity),
      a.referrerPolicy && (u.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    )
  }
  function o(a) {
    if (a.ep) return
    a.ep = !0
    const u = r(a)
    fetch(a.href, u)
  }
})()
function Qf(t, e) {
  const r = Object.create(null),
    o = t.split(",")
  for (let a = 0; a < o.length; a++) r[o[a]] = !0
  return e ? (a) => !!r[a.toLowerCase()] : (a) => !!r[a]
}
const xe = {},
  qo = [],
  vr = () => {},
  Tx = () => !1,
  Ex = /^on[^a-z]/,
  pc = (t) => Ex.test(t),
  th = (t) => t.startsWith("onUpdate:"),
  Re = Object.assign,
  eh = (t, e) => {
    const r = t.indexOf(e)
    r > -1 && t.splice(r, 1)
  },
  Lx = Object.prototype.hasOwnProperty,
  se = (t, e) => Lx.call(t, e),
  Rt = Array.isArray,
  Ho = (t) => vc(t) === "[object Map]",
  am = (t) => vc(t) === "[object Set]",
  Wt = (t) => typeof t == "function",
  ze = (t) => typeof t == "string",
  gc = (t) => typeof t == "symbol",
  be = (t) => t !== null && typeof t == "object",
  cm = (t) => (be(t) || Wt(t)) && Wt(t.then) && Wt(t.catch),
  um = Object.prototype.toString,
  vc = (t) => um.call(t),
  Ax = (t) => vc(t).slice(8, -1),
  fm = (t) => vc(t) === "[object Object]",
  nh = (t) =>
    ze(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
  Pa = Qf(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  mc = (t) => {
    const e = Object.create(null)
    return (r) => e[r] || (e[r] = t(r))
  },
  Mx = /-(\w)/g,
  yr = mc((t) => t.replace(Mx, (e, r) => (r ? r.toUpperCase() : ""))),
  Nx = /\B([A-Z])/g,
  so = mc((t) => t.replace(Nx, "-$1").toLowerCase()),
  yc = mc((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  zu = mc((t) => (t ? `on${yc(t)}` : "")),
  to = (t, e) => !Object.is(t, e),
  Oa = (t, e) => {
    for (let r = 0; r < t.length; r++) t[r](e)
  },
  Ua = (t, e, r) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: r })
  },
  lf = (t) => {
    const e = parseFloat(t)
    return isNaN(e) ? t : e
  },
  hm = (t) => {
    const e = ze(t) ? Number(t) : NaN
    return isNaN(e) ? t : e
  }
let Qp
const af = () =>
  Qp ||
  (Qp =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {})
function Ln(t) {
  if (Rt(t)) {
    const e = {}
    for (let r = 0; r < t.length; r++) {
      const o = t[r],
        a = ze(o) ? $x(o) : Ln(o)
      if (a) for (const u in a) e[u] = a[u]
    }
    return e
  } else if (ze(t) || be(t)) return t
}
const Px = /;(?![^(]*\))/g,
  Ox = /:([^]+)/,
  Dx = /\/\*[^]*?\*\//g
function $x(t) {
  const e = {}
  return (
    t
      .replace(Dx, "")
      .split(Px)
      .forEach((r) => {
        if (r) {
          const o = r.split(Ox)
          o.length > 1 && (e[o[0].trim()] = o[1].trim())
        }
      }),
    e
  )
}
function ve(t) {
  let e = ""
  if (ze(t)) e = t
  else if (Rt(t))
    for (let r = 0; r < t.length; r++) {
      const o = ve(t[r])
      o && (e += o + " ")
    }
  else if (be(t)) for (const r in t) t[r] && (e += r + " ")
  return e.trim()
}
const Rx =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  zx = Qf(Rx)
function dm(t) {
  return !!t || t === ""
}
const ee = (t) =>
    ze(t)
      ? t
      : t == null
        ? ""
        : Rt(t) || (be(t) && (t.toString === um || !Wt(t.toString)))
          ? JSON.stringify(t, pm, 2)
          : String(t),
  pm = (t, e) =>
    e && e.__v_isRef
      ? pm(t, e.value)
      : Ho(e)
        ? {
            [`Map(${e.size})`]: [...e.entries()].reduce(
              (r, [o, a]) => ((r[`${o} =>`] = a), r),
              {},
            ),
          }
        : am(e)
          ? { [`Set(${e.size})`]: [...e.values()] }
          : be(e) && !Rt(e) && !fm(e)
            ? String(e)
            : e
let Dn
class Fx {
  constructor(e = !1) {
    ;(this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Dn),
      !e && Dn && (this.index = (Dn.scopes || (Dn.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(e) {
    if (this._active) {
      const r = Dn
      try {
        return (Dn = this), e()
      } finally {
        Dn = r
      }
    }
  }
  on() {
    Dn = this
  }
  off() {
    Dn = this.parent
  }
  stop(e) {
    if (this._active) {
      let r, o
      for (r = 0, o = this.effects.length; r < o; r++) this.effects[r].stop()
      for (r = 0, o = this.cleanups.length; r < o; r++) this.cleanups[r]()
      if (this.scopes)
        for (r = 0, o = this.scopes.length; r < o; r++) this.scopes[r].stop(!0)
      if (!this.detached && this.parent && !e) {
        const a = this.parent.scopes.pop()
        a &&
          a !== this &&
          ((this.parent.scopes[this.index] = a), (a.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function Ix(t, e = Dn) {
  e && e.active && e.effects.push(t)
}
function gm() {
  return Dn
}
function qx(t) {
  Dn && Dn.cleanups.push(t)
}
const rh = (t) => {
    const e = new Set(t)
    return (e.w = 0), (e.n = 0), e
  },
  vm = (t) => (t.w & ki) > 0,
  mm = (t) => (t.n & ki) > 0,
  Hx = ({ deps: t }) => {
    if (t.length) for (let e = 0; e < t.length; e++) t[e].w |= ki
  },
  Bx = (t) => {
    const { deps: e } = t
    if (e.length) {
      let r = 0
      for (let o = 0; o < e.length; o++) {
        const a = e[o]
        vm(a) && !mm(a) ? a.delete(t) : (e[r++] = a), (a.w &= ~ki), (a.n &= ~ki)
      }
      e.length = r
    }
  },
  ja = new WeakMap()
let Ys = 0,
  ki = 1
const cf = 30
let Jn
const Yi = Symbol(""),
  uf = Symbol("")
class ih {
  constructor(e, r = null, o) {
    ;(this.fn = e),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Ix(this, o)
  }
  run() {
    if (!this.active) return this.fn()
    let e = Jn,
      r = xi
    for (; e; ) {
      if (e === this) return
      e = e.parent
    }
    try {
      return (
        (this.parent = Jn),
        (Jn = this),
        (xi = !0),
        (ki = 1 << ++Ys),
        Ys <= cf ? Hx(this) : tg(this),
        this.fn()
      )
    } finally {
      Ys <= cf && Bx(this),
        (ki = 1 << --Ys),
        (Jn = this.parent),
        (xi = r),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    Jn === this
      ? (this.deferStop = !0)
      : this.active &&
        (tg(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function tg(t) {
  const { deps: e } = t
  if (e.length) {
    for (let r = 0; r < e.length; r++) e[r].delete(t)
    e.length = 0
  }
}
let xi = !0
const ym = []
function ls() {
  ym.push(xi), (xi = !1)
}
function as() {
  const t = ym.pop()
  xi = t === void 0 ? !0 : t
}
function Mn(t, e, r) {
  if (xi && Jn) {
    let o = ja.get(t)
    o || ja.set(t, (o = new Map()))
    let a = o.get(r)
    a || o.set(r, (a = rh())), bm(a)
  }
}
function bm(t, e) {
  let r = !1
  Ys <= cf ? mm(t) || ((t.n |= ki), (r = !vm(t))) : (r = !t.has(Jn)),
    r && (t.add(Jn), Jn.deps.push(t))
}
function Fr(t, e, r, o, a, u) {
  const f = ja.get(t)
  if (!f) return
  let h = []
  if (e === "clear") h = [...f.values()]
  else if (r === "length" && Rt(t)) {
    const p = Number(o)
    f.forEach((g, v) => {
      ;(v === "length" || (!gc(v) && v >= p)) && h.push(g)
    })
  } else
    switch ((r !== void 0 && h.push(f.get(r)), e)) {
      case "add":
        Rt(t)
          ? nh(r) && h.push(f.get("length"))
          : (h.push(f.get(Yi)), Ho(t) && h.push(f.get(uf)))
        break
      case "delete":
        Rt(t) || (h.push(f.get(Yi)), Ho(t) && h.push(f.get(uf)))
        break
      case "set":
        Ho(t) && h.push(f.get(Yi))
        break
    }
  if (h.length === 1) h[0] && ff(h[0])
  else {
    const p = []
    for (const g of h) g && p.push(...g)
    ff(rh(p))
  }
}
function ff(t, e) {
  const r = Rt(t) ? t : [...t]
  for (const o of r) o.computed && eg(o)
  for (const o of r) o.computed || eg(o)
}
function eg(t, e) {
  ;(t !== Jn || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run())
}
function Wx(t, e) {
  var r
  return (r = ja.get(t)) == null ? void 0 : r.get(e)
}
const Ux = Qf("__proto__,__v_isRef,__isVue"),
  wm = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((t) => t !== "arguments" && t !== "caller")
      .map((t) => Symbol[t])
      .filter(gc),
  ),
  ng = jx()
function jx() {
  const t = {}
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
      t[e] = function (...r) {
        const o = le(this)
        for (let u = 0, f = this.length; u < f; u++) Mn(o, "get", u + "")
        const a = o[e](...r)
        return a === -1 || a === !1 ? o[e](...r.map(le)) : a
      }
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      t[e] = function (...r) {
        ls()
        const o = le(this)[e].apply(this, r)
        return as(), o
      }
    }),
    t
  )
}
function Gx(t) {
  const e = le(this)
  return Mn(e, "has", t), e.hasOwnProperty(t)
}
class xm {
  constructor(e = !1, r = !1) {
    ;(this._isReadonly = e), (this._shallow = r)
  }
  get(e, r, o) {
    const a = this._isReadonly,
      u = this._shallow
    if (r === "__v_isReactive") return !a
    if (r === "__v_isReadonly") return a
    if (r === "__v_isShallow") return u
    if (r === "__v_raw" && o === (a ? (u ? o1 : Cm) : u ? km : Sm).get(e))
      return e
    const f = Rt(e)
    if (!a) {
      if (f && se(ng, r)) return Reflect.get(ng, r, o)
      if (r === "hasOwnProperty") return Gx
    }
    const h = Reflect.get(e, r, o)
    return (gc(r) ? wm.has(r) : Ux(r)) || (a || Mn(e, "get", r), u)
      ? h
      : Le(h)
        ? f && nh(r)
          ? h
          : h.value
        : be(h)
          ? a
            ? wc(h)
            : Bn(h)
          : h
  }
}
class _m extends xm {
  constructor(e = !1) {
    super(!1, e)
  }
  set(e, r, o, a) {
    let u = e[r]
    if (Yo(u) && Le(u) && !Le(o)) return !1
    if (
      !this._shallow &&
      (!Ga(o) && !Yo(o) && ((u = le(u)), (o = le(o))),
      !Rt(e) && Le(u) && !Le(o))
    )
      return (u.value = o), !0
    const f = Rt(e) && nh(r) ? Number(r) < e.length : se(e, r),
      h = Reflect.set(e, r, o, a)
    return (
      e === le(a) && (f ? to(o, u) && Fr(e, "set", r, o) : Fr(e, "add", r, o)),
      h
    )
  }
  deleteProperty(e, r) {
    const o = se(e, r)
    e[r]
    const a = Reflect.deleteProperty(e, r)
    return a && o && Fr(e, "delete", r, void 0), a
  }
  has(e, r) {
    const o = Reflect.has(e, r)
    return (!gc(r) || !wm.has(r)) && Mn(e, "has", r), o
  }
  ownKeys(e) {
    return Mn(e, "iterate", Rt(e) ? "length" : Yi), Reflect.ownKeys(e)
  }
}
class Vx extends xm {
  constructor(e = !1) {
    super(!0, e)
  }
  set(e, r) {
    return !0
  }
  deleteProperty(e, r) {
    return !0
  }
}
const Kx = new _m(),
  Xx = new Vx(),
  Yx = new _m(!0),
  oh = (t) => t,
  bc = (t) => Reflect.getPrototypeOf(t)
function va(t, e, r = !1, o = !1) {
  t = t.__v_raw
  const a = le(t),
    u = le(e)
  r || (to(e, u) && Mn(a, "get", e), Mn(a, "get", u))
  const { has: f } = bc(a),
    h = o ? oh : r ? ch : ll
  if (f.call(a, e)) return h(t.get(e))
  if (f.call(a, u)) return h(t.get(u))
  t !== a && t.get(e)
}
function ma(t, e = !1) {
  const r = this.__v_raw,
    o = le(r),
    a = le(t)
  return (
    e || (to(t, a) && Mn(o, "has", t), Mn(o, "has", a)),
    t === a ? r.has(t) : r.has(t) || r.has(a)
  )
}
function ya(t, e = !1) {
  return (
    (t = t.__v_raw), !e && Mn(le(t), "iterate", Yi), Reflect.get(t, "size", t)
  )
}
function rg(t) {
  t = le(t)
  const e = le(this)
  return bc(e).has.call(e, t) || (e.add(t), Fr(e, "add", t, t)), this
}
function ig(t, e) {
  e = le(e)
  const r = le(this),
    { has: o, get: a } = bc(r)
  let u = o.call(r, t)
  u || ((t = le(t)), (u = o.call(r, t)))
  const f = a.call(r, t)
  return (
    r.set(t, e), u ? to(e, f) && Fr(r, "set", t, e) : Fr(r, "add", t, e), this
  )
}
function og(t) {
  const e = le(this),
    { has: r, get: o } = bc(e)
  let a = r.call(e, t)
  a || ((t = le(t)), (a = r.call(e, t))), o && o.call(e, t)
  const u = e.delete(t)
  return a && Fr(e, "delete", t, void 0), u
}
function sg() {
  const t = le(this),
    e = t.size !== 0,
    r = t.clear()
  return e && Fr(t, "clear", void 0, void 0), r
}
function ba(t, e) {
  return function (o, a) {
    const u = this,
      f = u.__v_raw,
      h = le(f),
      p = e ? oh : t ? ch : ll
    return (
      !t && Mn(h, "iterate", Yi), f.forEach((g, v) => o.call(a, p(g), p(v), u))
    )
  }
}
function wa(t, e, r) {
  return function (...o) {
    const a = this.__v_raw,
      u = le(a),
      f = Ho(u),
      h = t === "entries" || (t === Symbol.iterator && f),
      p = t === "keys" && f,
      g = a[t](...o),
      v = r ? oh : e ? ch : ll
    return (
      !e && Mn(u, "iterate", p ? uf : Yi),
      {
        next() {
          const { value: b, done: w } = g.next()
          return w
            ? { value: b, done: w }
            : { value: h ? [v(b[0]), v(b[1])] : v(b), done: w }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function ci(t) {
  return function (...e) {
    return t === "delete" ? !1 : this
  }
}
function Zx() {
  const t = {
      get(u) {
        return va(this, u)
      },
      get size() {
        return ya(this)
      },
      has: ma,
      add: rg,
      set: ig,
      delete: og,
      clear: sg,
      forEach: ba(!1, !1),
    },
    e = {
      get(u) {
        return va(this, u, !1, !0)
      },
      get size() {
        return ya(this)
      },
      has: ma,
      add: rg,
      set: ig,
      delete: og,
      clear: sg,
      forEach: ba(!1, !0),
    },
    r = {
      get(u) {
        return va(this, u, !0)
      },
      get size() {
        return ya(this, !0)
      },
      has(u) {
        return ma.call(this, u, !0)
      },
      add: ci("add"),
      set: ci("set"),
      delete: ci("delete"),
      clear: ci("clear"),
      forEach: ba(!0, !1),
    },
    o = {
      get(u) {
        return va(this, u, !0, !0)
      },
      get size() {
        return ya(this, !0)
      },
      has(u) {
        return ma.call(this, u, !0)
      },
      add: ci("add"),
      set: ci("set"),
      delete: ci("delete"),
      clear: ci("clear"),
      forEach: ba(!0, !0),
    }
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((u) => {
      ;(t[u] = wa(u, !1, !1)),
        (r[u] = wa(u, !0, !1)),
        (e[u] = wa(u, !1, !0)),
        (o[u] = wa(u, !0, !0))
    }),
    [t, r, e, o]
  )
}
const [Jx, Qx, t1, e1] = Zx()
function sh(t, e) {
  const r = e ? (t ? e1 : t1) : t ? Qx : Jx
  return (o, a, u) =>
    a === "__v_isReactive"
      ? !t
      : a === "__v_isReadonly"
        ? t
        : a === "__v_raw"
          ? o
          : Reflect.get(se(r, a) && a in o ? r : o, a, u)
}
const n1 = { get: sh(!1, !1) },
  r1 = { get: sh(!1, !0) },
  i1 = { get: sh(!0, !1) },
  Sm = new WeakMap(),
  km = new WeakMap(),
  Cm = new WeakMap(),
  o1 = new WeakMap()
function s1(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2
    default:
      return 0
  }
}
function l1(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : s1(Ax(t))
}
function Bn(t) {
  return Yo(t) ? t : lh(t, !1, Kx, n1, Sm)
}
function Tm(t) {
  return lh(t, !1, Yx, r1, km)
}
function wc(t) {
  return lh(t, !0, Xx, i1, Cm)
}
function lh(t, e, r, o, a) {
  if (!be(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t
  const u = a.get(t)
  if (u) return u
  const f = l1(t)
  if (f === 0) return t
  const h = new Proxy(t, f === 2 ? o : r)
  return a.set(t, h), h
}
function Bo(t) {
  return Yo(t) ? Bo(t.__v_raw) : !!(t && t.__v_isReactive)
}
function Yo(t) {
  return !!(t && t.__v_isReadonly)
}
function Ga(t) {
  return !!(t && t.__v_isShallow)
}
function Em(t) {
  return Bo(t) || Yo(t)
}
function le(t) {
  const e = t && t.__v_raw
  return e ? le(e) : t
}
function ah(t) {
  return Ua(t, "__v_skip", !0), t
}
const ll = (t) => (be(t) ? Bn(t) : t),
  ch = (t) => (be(t) ? wc(t) : t)
function uh(t) {
  xi && Jn && ((t = le(t)), bm(t.dep || (t.dep = rh())))
}
function fh(t, e) {
  t = le(t)
  const r = t.dep
  r && ff(r)
}
function Le(t) {
  return !!(t && t.__v_isRef === !0)
}
function Vt(t) {
  return Lm(t, !1)
}
function cs(t) {
  return Lm(t, !0)
}
function Lm(t, e) {
  return Le(t) ? t : new a1(t, e)
}
class a1 {
  constructor(e, r) {
    ;(this.__v_isShallow = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = r ? e : le(e)),
      (this._value = r ? e : ll(e))
  }
  get value() {
    return uh(this), this._value
  }
  set value(e) {
    const r = this.__v_isShallow || Ga(e) || Yo(e)
    ;(e = r ? e : le(e)),
      to(e, this._rawValue) &&
        ((this._rawValue = e), (this._value = r ? e : ll(e)), fh(this))
  }
}
function G(t) {
  return Le(t) ? t.value : t
}
const c1 = {
  get: (t, e, r) => G(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const a = t[e]
    return Le(a) && !Le(r) ? ((a.value = r), !0) : Reflect.set(t, e, r, o)
  },
}
function Am(t) {
  return Bo(t) ? t : new Proxy(t, c1)
}
class u1 {
  constructor(e) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: r, set: o } = e(
      () => uh(this),
      () => fh(this),
    )
    ;(this._get = r), (this._set = o)
  }
  get value() {
    return this._get()
  }
  set value(e) {
    this._set(e)
  }
}
function f1(t) {
  return new u1(t)
}
function h1(t) {
  const e = Rt(t) ? new Array(t.length) : {}
  for (const r in t) e[r] = Mm(t, r)
  return e
}
class d1 {
  constructor(e, r, o) {
    ;(this._object = e),
      (this._key = r),
      (this._defaultValue = o),
      (this.__v_isRef = !0)
  }
  get value() {
    const e = this._object[this._key]
    return e === void 0 ? this._defaultValue : e
  }
  set value(e) {
    this._object[this._key] = e
  }
  get dep() {
    return Wx(le(this._object), this._key)
  }
}
class p1 {
  constructor(e) {
    ;(this._getter = e), (this.__v_isRef = !0), (this.__v_isReadonly = !0)
  }
  get value() {
    return this._getter()
  }
}
function hh(t, e, r) {
  return Le(t)
    ? t
    : Wt(t)
      ? new p1(t)
      : be(t) && arguments.length > 1
        ? Mm(t, e, r)
        : Vt(t)
}
function Mm(t, e, r) {
  const o = t[e]
  return Le(o) ? o : new d1(t, e, r)
}
class g1 {
  constructor(e, r, o, a) {
    ;(this._setter = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ih(e, () => {
        this._dirty || ((this._dirty = !0), fh(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !a),
      (this.__v_isReadonly = o)
  }
  get value() {
    const e = le(this)
    return (
      uh(e),
      (e._dirty || !e._cacheable) &&
        ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    )
  }
  set value(e) {
    this._setter(e)
  }
}
function v1(t, e, r = !1) {
  let o, a
  const u = Wt(t)
  return (
    u ? ((o = t), (a = vr)) : ((o = t.get), (a = t.set)),
    new g1(o, a, u || !a, r)
  )
}
function _i(t, e, r, o) {
  let a
  try {
    a = o ? t(...o) : t()
  } catch (u) {
    kl(u, e, r)
  }
  return a
}
function Wn(t, e, r, o) {
  if (Wt(t)) {
    const u = _i(t, e, r, o)
    return (
      u &&
        cm(u) &&
        u.catch((f) => {
          kl(f, e, r)
        }),
      u
    )
  }
  const a = []
  for (let u = 0; u < t.length; u++) a.push(Wn(t[u], e, r, o))
  return a
}
function kl(t, e, r, o = !0) {
  const a = e ? e.vnode : null
  if (e) {
    let u = e.parent
    const f = e.proxy,
      h = r
    for (; u; ) {
      const g = u.ec
      if (g) {
        for (let v = 0; v < g.length; v++) if (g[v](t, f, h) === !1) return
      }
      u = u.parent
    }
    const p = e.appContext.config.errorHandler
    if (p) {
      _i(p, null, 10, [t, f, h])
      return
    }
  }
  m1(t, r, a, o)
}
function m1(t, e, r, o = !0) {
  console.error(t)
}
let al = !1,
  hf = !1
const nn = []
let hr = 0
const Wo = []
let Dr = null,
  ji = 0
const Nm = Promise.resolve()
let dh = null
function Hr(t) {
  const e = dh || Nm
  return t ? e.then(this ? t.bind(this) : t) : e
}
function y1(t) {
  let e = hr + 1,
    r = nn.length
  for (; e < r; ) {
    const o = (e + r) >>> 1,
      a = nn[o],
      u = cl(a)
    u < t || (u === t && a.pre) ? (e = o + 1) : (r = o)
  }
  return e
}
function ph(t) {
  ;(!nn.length || !nn.includes(t, al && t.allowRecurse ? hr + 1 : hr)) &&
    (t.id == null ? nn.push(t) : nn.splice(y1(t.id), 0, t), Pm())
}
function Pm() {
  !al && !hf && ((hf = !0), (dh = Nm.then(Dm)))
}
function b1(t) {
  const e = nn.indexOf(t)
  e > hr && nn.splice(e, 1)
}
function df(t) {
  Rt(t)
    ? Wo.push(...t)
    : (!Dr || !Dr.includes(t, t.allowRecurse ? ji + 1 : ji)) && Wo.push(t),
    Pm()
}
function lg(t, e = al ? hr + 1 : 0) {
  for (; e < nn.length; e++) {
    const r = nn[e]
    r && r.pre && (nn.splice(e, 1), e--, r())
  }
}
function Om(t) {
  if (Wo.length) {
    const e = [...new Set(Wo)]
    if (((Wo.length = 0), Dr)) {
      Dr.push(...e)
      return
    }
    for (Dr = e, Dr.sort((r, o) => cl(r) - cl(o)), ji = 0; ji < Dr.length; ji++)
      Dr[ji]()
    ;(Dr = null), (ji = 0)
  }
}
const cl = (t) => (t.id == null ? 1 / 0 : t.id),
  w1 = (t, e) => {
    const r = cl(t) - cl(e)
    if (r === 0) {
      if (t.pre && !e.pre) return -1
      if (e.pre && !t.pre) return 1
    }
    return r
  }
function Dm(t) {
  ;(hf = !1), (al = !0), nn.sort(w1)
  try {
    for (hr = 0; hr < nn.length; hr++) {
      const e = nn[hr]
      e && e.active !== !1 && _i(e, null, 14)
    }
  } finally {
    ;(hr = 0),
      (nn.length = 0),
      Om(),
      (al = !1),
      (dh = null),
      (nn.length || Wo.length) && Dm()
  }
}
function x1(t, e, ...r) {
  if (t.isUnmounted) return
  const o = t.vnode.props || xe
  let a = r
  const u = e.startsWith("update:"),
    f = u && e.slice(7)
  if (f && f in o) {
    const v = `${f === "modelValue" ? "model" : f}Modifiers`,
      { number: b, trim: w } = o[v] || xe
    w && (a = r.map((S) => (ze(S) ? S.trim() : S))), b && (a = r.map(lf))
  }
  let h,
    p = o[(h = zu(e))] || o[(h = zu(yr(e)))]
  !p && u && (p = o[(h = zu(so(e)))]), p && Wn(p, t, 6, a)
  const g = o[h + "Once"]
  if (g) {
    if (!t.emitted) t.emitted = {}
    else if (t.emitted[h]) return
    ;(t.emitted[h] = !0), Wn(g, t, 6, a)
  }
}
function $m(t, e, r = !1) {
  const o = e.emitsCache,
    a = o.get(t)
  if (a !== void 0) return a
  const u = t.emits
  let f = {},
    h = !1
  if (!Wt(t)) {
    const p = (g) => {
      const v = $m(g, e, !0)
      v && ((h = !0), Re(f, v))
    }
    !r && e.mixins.length && e.mixins.forEach(p),
      t.extends && p(t.extends),
      t.mixins && t.mixins.forEach(p)
  }
  return !u && !h
    ? (be(t) && o.set(t, null), null)
    : (Rt(u) ? u.forEach((p) => (f[p] = null)) : Re(f, u),
      be(t) && o.set(t, f),
      f)
}
function xc(t, e) {
  return !t || !pc(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, "")),
      se(t, e[0].toLowerCase() + e.slice(1)) || se(t, so(e)) || se(t, e))
}
let Ze = null,
  _c = null
function Va(t) {
  const e = Ze
  return (Ze = t), (_c = (t && t.type.__scopeId) || null), e
}
function Rm(t) {
  _c = t
}
function zm() {
  _c = null
}
const _1 = (t) => Zt
function Zt(t, e = Ze, r) {
  if (!e || t._n) return t
  const o = (...a) => {
    o._d && bg(-1)
    const u = Va(e)
    let f
    try {
      f = t(...a)
    } finally {
      Va(u), o._d && bg(1)
    }
    return f
  }
  return (o._n = !0), (o._c = !0), (o._d = !0), o
}
function Fu(t) {
  const {
    type: e,
    vnode: r,
    proxy: o,
    withProxy: a,
    props: u,
    propsOptions: [f],
    slots: h,
    attrs: p,
    emit: g,
    render: v,
    renderCache: b,
    data: w,
    setupState: S,
    ctx: N,
    inheritAttrs: L,
  } = t
  let A, T
  const M = Va(t)
  try {
    if (r.shapeFlag & 4) {
      const E = a || o
      ;(A = Zn(v.call(E, E, b, u, S, w, N))), (T = p)
    } else {
      const E = e
      ;(A = Zn(
        E.length > 1 ? E(u, { attrs: p, slots: h, emit: g }) : E(u, null),
      )),
        (T = e.props ? p : k1(p))
    }
  } catch (E) {
    ;(nl.length = 0), kl(E, t, 1), (A = Ft(An))
  }
  let R = A
  if (T && L !== !1) {
    const E = Object.keys(T),
      { shapeFlag: W } = R
    E.length && W & 7 && (f && E.some(th) && (T = C1(T, f)), (R = Ci(R, T)))
  }
  return (
    r.dirs && ((R = Ci(R)), (R.dirs = R.dirs ? R.dirs.concat(r.dirs) : r.dirs)),
    r.transition && (R.transition = r.transition),
    (A = R),
    Va(M),
    A
  )
}
function S1(t) {
  let e
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    if (fl(o)) {
      if (o.type !== An || o.children === "v-if") {
        if (e) return
        e = o
      }
    } else return
  }
  return e
}
const k1 = (t) => {
    let e
    for (const r in t)
      (r === "class" || r === "style" || pc(r)) && ((e || (e = {}))[r] = t[r])
    return e
  },
  C1 = (t, e) => {
    const r = {}
    for (const o in t) (!th(o) || !(o.slice(9) in e)) && (r[o] = t[o])
    return r
  }
function T1(t, e, r) {
  const { props: o, children: a, component: u } = t,
    { props: f, children: h, patchFlag: p } = e,
    g = u.emitsOptions
  if (e.dirs || e.transition) return !0
  if (r && p >= 0) {
    if (p & 1024) return !0
    if (p & 16) return o ? ag(o, f, g) : !!f
    if (p & 8) {
      const v = e.dynamicProps
      for (let b = 0; b < v.length; b++) {
        const w = v[b]
        if (f[w] !== o[w] && !xc(g, w)) return !0
      }
    }
  } else
    return (a || h) && (!h || !h.$stable)
      ? !0
      : o === f
        ? !1
        : o
          ? f
            ? ag(o, f, g)
            : !0
          : !!f
  return !1
}
function ag(t, e, r) {
  const o = Object.keys(e)
  if (o.length !== Object.keys(t).length) return !0
  for (let a = 0; a < o.length; a++) {
    const u = o[a]
    if (e[u] !== t[u] && !xc(r, u)) return !0
  }
  return !1
}
function gh({ vnode: t, parent: e }, r) {
  for (; e && e.subTree === t; ) ((t = e.vnode).el = r), (e = e.parent)
}
const Fm = "components",
  E1 = "directives"
function eo(t, e) {
  return Im(Fm, t, !0, e) || t
}
const L1 = Symbol.for("v-ndc")
function lo(t) {
  return Im(E1, t)
}
function Im(t, e, r = !0, o = !1) {
  const a = Ze || je
  if (a) {
    const u = a.type
    if (t === Fm) {
      const h = T_(u, !1)
      if (h && (h === e || h === yr(e) || h === yc(yr(e)))) return u
    }
    const f = cg(a[t] || u[t], e) || cg(a.appContext[t], e)
    return !f && o ? u : f
  }
}
function cg(t, e) {
  return t && (t[e] || t[yr(e)] || t[yc(yr(e))])
}
const A1 = (t) => t.__isSuspense,
  M1 = {
    name: "Suspense",
    __isSuspense: !0,
    process(t, e, r, o, a, u, f, h, p, g) {
      t == null ? P1(e, r, o, a, u, f, h, p, g) : O1(t, e, r, o, a, f, h, p, g)
    },
    hydrate: D1,
    create: vh,
    normalize: $1,
  },
  N1 = M1
function ul(t, e) {
  const r = t.props && t.props[e]
  Wt(r) && r()
}
function P1(t, e, r, o, a, u, f, h, p) {
  const {
      p: g,
      o: { createElement: v },
    } = p,
    b = v("div"),
    w = (t.suspense = vh(t, a, o, e, b, r, u, f, h, p))
  g(null, (w.pendingBranch = t.ssContent), b, null, o, w, u, f),
    w.deps > 0
      ? (ul(t, "onPending"),
        ul(t, "onFallback"),
        g(null, t.ssFallback, e, r, o, null, u, f),
        Uo(w, t.ssFallback))
      : w.resolve(!1, !0)
}
function O1(t, e, r, o, a, u, f, h, { p, um: g, o: { createElement: v } }) {
  const b = (e.suspense = t.suspense)
  ;(b.vnode = e), (e.el = t.el)
  const w = e.ssContent,
    S = e.ssFallback,
    { activeBranch: N, pendingBranch: L, isInFallback: A, isHydrating: T } = b
  if (L)
    (b.pendingBranch = w),
      dr(w, L)
        ? (p(L, w, b.hiddenContainer, null, a, b, u, f, h),
          b.deps <= 0
            ? b.resolve()
            : A && (p(N, S, r, o, a, null, u, f, h), Uo(b, S)))
        : (b.pendingId++,
          T ? ((b.isHydrating = !1), (b.activeBranch = L)) : g(L, a, b),
          (b.deps = 0),
          (b.effects.length = 0),
          (b.hiddenContainer = v("div")),
          A
            ? (p(null, w, b.hiddenContainer, null, a, b, u, f, h),
              b.deps <= 0
                ? b.resolve()
                : (p(N, S, r, o, a, null, u, f, h), Uo(b, S)))
            : N && dr(w, N)
              ? (p(N, w, r, o, a, b, u, f, h), b.resolve(!0))
              : (p(null, w, b.hiddenContainer, null, a, b, u, f, h),
                b.deps <= 0 && b.resolve()))
  else if (N && dr(w, N)) p(N, w, r, o, a, b, u, f, h), Uo(b, w)
  else if (
    (ul(e, "onPending"),
    (b.pendingBranch = w),
    b.pendingId++,
    p(null, w, b.hiddenContainer, null, a, b, u, f, h),
    b.deps <= 0)
  )
    b.resolve()
  else {
    const { timeout: M, pendingId: R } = b
    M > 0
      ? setTimeout(() => {
          b.pendingId === R && b.fallback(S)
        }, M)
      : M === 0 && b.fallback(S)
  }
}
function vh(t, e, r, o, a, u, f, h, p, g, v = !1) {
  const {
    p: b,
    m: w,
    um: S,
    n: N,
    o: { parentNode: L, remove: A },
  } = g
  let T
  const M = z1(t)
  M && e != null && e.pendingBranch && ((T = e.pendingId), e.deps++)
  const R = t.props ? hm(t.props.timeout) : void 0,
    E = {
      vnode: t,
      parent: e,
      parentComponent: r,
      isSVG: f,
      container: o,
      hiddenContainer: a,
      anchor: u,
      deps: 0,
      pendingId: 0,
      timeout: typeof R == "number" ? R : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: v,
      isUnmounted: !1,
      effects: [],
      resolve(W = !1, X = !1) {
        const {
          vnode: ft,
          activeBranch: Y,
          pendingBranch: et,
          pendingId: st,
          effects: dt,
          parentComponent: pt,
          container: V,
        } = E
        let z = !1
        if (E.isHydrating) E.isHydrating = !1
        else if (!W) {
          ;(z = Y && et.transition && et.transition.mode === "out-in"),
            z &&
              (Y.transition.afterLeave = () => {
                st === E.pendingId && (w(et, V, B, 0), df(dt))
              })
          let { anchor: B } = E
          Y && ((B = N(Y)), S(Y, pt, E, !0)), z || w(et, V, B, 0)
        }
        Uo(E, et), (E.pendingBranch = null), (E.isInFallback = !1)
        let k = E.parent,
          q = !1
        for (; k; ) {
          if (k.pendingBranch) {
            k.effects.push(...dt), (q = !0)
            break
          }
          k = k.parent
        }
        !q && !z && df(dt),
          (E.effects = []),
          M &&
            e &&
            e.pendingBranch &&
            T === e.pendingId &&
            (e.deps--, e.deps === 0 && !X && e.resolve()),
          ul(ft, "onResolve")
      },
      fallback(W) {
        if (!E.pendingBranch) return
        const {
          vnode: X,
          activeBranch: ft,
          parentComponent: Y,
          container: et,
          isSVG: st,
        } = E
        ul(X, "onFallback")
        const dt = N(ft),
          pt = () => {
            E.isInFallback && (b(null, W, et, dt, Y, null, st, h, p), Uo(E, W))
          },
          V = W.transition && W.transition.mode === "out-in"
        V && (ft.transition.afterLeave = pt),
          (E.isInFallback = !0),
          S(ft, Y, null, !0),
          V || pt()
      },
      move(W, X, ft) {
        E.activeBranch && w(E.activeBranch, W, X, ft), (E.container = W)
      },
      next() {
        return E.activeBranch && N(E.activeBranch)
      },
      registerDep(W, X) {
        const ft = !!E.pendingBranch
        ft && E.deps++
        const Y = W.vnode.el
        W.asyncDep
          .catch((et) => {
            kl(et, W, 0)
          })
          .then((et) => {
            if (W.isUnmounted || E.isUnmounted || E.pendingId !== W.suspenseId)
              return
            W.asyncResolved = !0
            const { vnode: st } = W
            _f(W, et, !1), Y && (st.el = Y)
            const dt = !Y && W.subTree.el
            X(W, st, L(Y || W.subTree.el), Y ? null : N(W.subTree), E, f, p),
              dt && A(dt),
              gh(W, st.el),
              ft && --E.deps === 0 && E.resolve()
          })
      },
      unmount(W, X) {
        ;(E.isUnmounted = !0),
          E.activeBranch && S(E.activeBranch, r, W, X),
          E.pendingBranch && S(E.pendingBranch, r, W, X)
      },
    }
  return E
}
function D1(t, e, r, o, a, u, f, h, p) {
  const g = (e.suspense = vh(
      e,
      o,
      r,
      t.parentNode,
      document.createElement("div"),
      null,
      a,
      u,
      f,
      h,
      !0,
    )),
    v = p(t, (g.pendingBranch = e.ssContent), r, g, u, f)
  return g.deps === 0 && g.resolve(!1, !0), v
}
function $1(t) {
  const { shapeFlag: e, children: r } = t,
    o = e & 32
  ;(t.ssContent = ug(o ? r.default : r)),
    (t.ssFallback = o ? ug(r.fallback) : Ft(An))
}
function ug(t) {
  let e
  if (Wt(t)) {
    const r = Zo && t._c
    r && ((t._d = !1), lt()), (t = t()), r && ((t._d = !0), (e = Hn), n0())
  }
  return (
    Rt(t) && (t = S1(t)),
    (t = Zn(t)),
    e && !t.dynamicChildren && (t.dynamicChildren = e.filter((r) => r !== t)),
    t
  )
}
function R1(t, e) {
  e && e.pendingBranch
    ? Rt(t)
      ? e.effects.push(...t)
      : e.effects.push(t)
    : df(t)
}
function Uo(t, e) {
  t.activeBranch = e
  const { vnode: r, parentComponent: o } = t,
    a = (r.el = e.el)
  o && o.subTree === r && ((o.vnode.el = a), gh(o, a))
}
function z1(t) {
  var e
  return (
    ((e = t.props) == null ? void 0 : e.suspensible) != null &&
    t.props.suspensible !== !1
  )
}
function mh(t, e) {
  return yh(t, null, e)
}
const xa = {}
function $e(t, e, r) {
  return yh(t, e, r)
}
function yh(
  t,
  e,
  { immediate: r, deep: o, flush: a, onTrack: u, onTrigger: f } = xe,
) {
  var h
  const p = gm() === ((h = je) == null ? void 0 : h.scope) ? je : null
  let g,
    v = !1,
    b = !1
  if (
    (Le(t)
      ? ((g = () => t.value), (v = Ga(t)))
      : Bo(t)
        ? ((g = () => t), (o = !0))
        : Rt(t)
          ? ((b = !0),
            (v = t.some((E) => Bo(E) || Ga(E))),
            (g = () =>
              t.map((E) => {
                if (Le(E)) return E.value
                if (Bo(E)) return Vi(E)
                if (Wt(E)) return _i(E, p, 2)
              })))
          : Wt(t)
            ? e
              ? (g = () => _i(t, p, 2))
              : (g = () => {
                  if (!(p && p.isUnmounted)) return w && w(), Wn(t, p, 3, [S])
                })
            : (g = vr),
    e && o)
  ) {
    const E = g
    g = () => Vi(E())
  }
  let w,
    S = (E) => {
      w = M.onStop = () => {
        _i(E, p, 4)
      }
    },
    N
  if (hl)
    if (
      ((S = vr),
      e ? r && Wn(e, p, 3, [g(), b ? [] : void 0, S]) : g(),
      a === "sync")
    ) {
      const E = A_()
      N = E.__watcherHandles || (E.__watcherHandles = [])
    } else return vr
  let L = b ? new Array(t.length).fill(xa) : xa
  const A = () => {
    if (M.active)
      if (e) {
        const E = M.run()
        ;(o || v || (b ? E.some((W, X) => to(W, L[X])) : to(E, L))) &&
          (w && w(),
          Wn(e, p, 3, [E, L === xa ? void 0 : b && L[0] === xa ? [] : L, S]),
          (L = E))
      } else M.run()
  }
  A.allowRecurse = !!e
  let T
  a === "sync"
    ? (T = A)
    : a === "post"
      ? (T = () => kn(A, p && p.suspense))
      : ((A.pre = !0), p && (A.id = p.uid), (T = () => ph(A)))
  const M = new ih(g, T)
  e
    ? r
      ? A()
      : (L = M.run())
    : a === "post"
      ? kn(M.run.bind(M), p && p.suspense)
      : M.run()
  const R = () => {
    M.stop(), p && p.scope && eh(p.scope.effects, M)
  }
  return N && N.push(R), R
}
function F1(t, e, r) {
  const o = this.proxy,
    a = ze(t) ? (t.includes(".") ? qm(o, t) : () => o[t]) : t.bind(o, o)
  let u
  Wt(e) ? (u = e) : ((u = e.handler), (r = e))
  const f = je
  Jo(this)
  const h = yh(a, u.bind(o), r)
  return f ? Jo(f) : Zi(), h
}
function qm(t, e) {
  const r = e.split(".")
  return () => {
    let o = t
    for (let a = 0; a < r.length && o; a++) o = o[r[a]]
    return o
  }
}
function Vi(t, e) {
  if (!be(t) || t.__v_skip || ((e = e || new Set()), e.has(t))) return t
  if ((e.add(t), Le(t))) Vi(t.value, e)
  else if (Rt(t)) for (let r = 0; r < t.length; r++) Vi(t[r], e)
  else if (am(t) || Ho(t))
    t.forEach((r) => {
      Vi(r, e)
    })
  else if (fm(t)) for (const r in t) Vi(t[r], e)
  return t
}
function rn(t, e) {
  const r = Ze
  if (r === null) return t
  const o = Ec(r) || r.proxy,
    a = t.dirs || (t.dirs = [])
  for (let u = 0; u < e.length; u++) {
    let [f, h, p, g = xe] = e[u]
    f &&
      (Wt(f) && (f = { mounted: f, updated: f }),
      f.deep && Vi(h),
      a.push({
        dir: f,
        instance: o,
        value: h,
        oldValue: void 0,
        arg: p,
        modifiers: g,
      }))
  }
  return t
}
function qi(t, e, r, o) {
  const a = t.dirs,
    u = e && e.dirs
  for (let f = 0; f < a.length; f++) {
    const h = a[f]
    u && (h.oldValue = u[f].value)
    let p = h.dir[o]
    p && (ls(), Wn(p, r, 8, [t.el, h, t, e]), as())
  }
}
const pi = Symbol("_leaveCb"),
  _a = Symbol("_enterCb")
function I1() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  }
  return (
    us(() => {
      t.isMounted = !0
    }),
    jm(() => {
      t.isUnmounting = !0
    }),
    t
  )
}
const qn = [Function, Array],
  Hm = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: qn,
    onEnter: qn,
    onAfterEnter: qn,
    onEnterCancelled: qn,
    onBeforeLeave: qn,
    onLeave: qn,
    onAfterLeave: qn,
    onLeaveCancelled: qn,
    onBeforeAppear: qn,
    onAppear: qn,
    onAfterAppear: qn,
    onAppearCancelled: qn,
  },
  q1 = {
    name: "BaseTransition",
    props: Hm,
    setup(t, { slots: e }) {
      const r = Cl(),
        o = I1()
      let a
      return () => {
        const u = e.default && Wm(e.default(), !0)
        if (!u || !u.length) return
        let f = u[0]
        if (u.length > 1) {
          for (const L of u)
            if (L.type !== An) {
              f = L
              break
            }
        }
        const h = le(t),
          { mode: p } = h
        if (o.isLeaving) return Iu(f)
        const g = fg(f)
        if (!g) return Iu(f)
        const v = pf(g, h, o, r)
        gf(g, v)
        const b = r.subTree,
          w = b && fg(b)
        let S = !1
        const { getTransitionKey: N } = g.type
        if (N) {
          const L = N()
          a === void 0 ? (a = L) : L !== a && ((a = L), (S = !0))
        }
        if (w && w.type !== An && (!dr(g, w) || S)) {
          const L = pf(w, h, o, r)
          if ((gf(w, L), p === "out-in"))
            return (
              (o.isLeaving = !0),
              (L.afterLeave = () => {
                ;(o.isLeaving = !1), r.update.active !== !1 && r.update()
              }),
              Iu(f)
            )
          p === "in-out" &&
            g.type !== An &&
            (L.delayLeave = (A, T, M) => {
              const R = Bm(o, w)
              ;(R[String(w.key)] = w),
                (A[pi] = () => {
                  T(), (A[pi] = void 0), delete v.delayedLeave
                }),
                (v.delayedLeave = M)
            })
        }
        return f
      }
    },
  },
  H1 = q1
function Bm(t, e) {
  const { leavingVNodes: r } = t
  let o = r.get(e.type)
  return o || ((o = Object.create(null)), r.set(e.type, o)), o
}
function pf(t, e, r, o) {
  const {
      appear: a,
      mode: u,
      persisted: f = !1,
      onBeforeEnter: h,
      onEnter: p,
      onAfterEnter: g,
      onEnterCancelled: v,
      onBeforeLeave: b,
      onLeave: w,
      onAfterLeave: S,
      onLeaveCancelled: N,
      onBeforeAppear: L,
      onAppear: A,
      onAfterAppear: T,
      onAppearCancelled: M,
    } = e,
    R = String(t.key),
    E = Bm(r, t),
    W = (Y, et) => {
      Y && Wn(Y, o, 9, et)
    },
    X = (Y, et) => {
      const st = et[1]
      W(Y, et),
        Rt(Y) ? Y.every((dt) => dt.length <= 1) && st() : Y.length <= 1 && st()
    },
    ft = {
      mode: u,
      persisted: f,
      beforeEnter(Y) {
        let et = h
        if (!r.isMounted)
          if (a) et = L || h
          else return
        Y[pi] && Y[pi](!0)
        const st = E[R]
        st && dr(t, st) && st.el[pi] && st.el[pi](), W(et, [Y])
      },
      enter(Y) {
        let et = p,
          st = g,
          dt = v
        if (!r.isMounted)
          if (a) (et = A || p), (st = T || g), (dt = M || v)
          else return
        let pt = !1
        const V = (Y[_a] = (z) => {
          pt ||
            ((pt = !0),
            z ? W(dt, [Y]) : W(st, [Y]),
            ft.delayedLeave && ft.delayedLeave(),
            (Y[_a] = void 0))
        })
        et ? X(et, [Y, V]) : V()
      },
      leave(Y, et) {
        const st = String(t.key)
        if ((Y[_a] && Y[_a](!0), r.isUnmounting)) return et()
        W(b, [Y])
        let dt = !1
        const pt = (Y[pi] = (V) => {
          dt ||
            ((dt = !0),
            et(),
            V ? W(N, [Y]) : W(S, [Y]),
            (Y[pi] = void 0),
            E[st] === t && delete E[st])
        })
        ;(E[st] = t), w ? X(w, [Y, pt]) : pt()
      },
      clone(Y) {
        return pf(Y, e, r, o)
      },
    }
  return ft
}
function Iu(t) {
  if (Sc(t)) return (t = Ci(t)), (t.children = null), t
}
function fg(t) {
  return Sc(t) ? (t.children ? t.children[0] : void 0) : t
}
function gf(t, e) {
  t.shapeFlag & 6 && t.component
    ? gf(t.component.subTree, e)
    : t.shapeFlag & 128
      ? ((t.ssContent.transition = e.clone(t.ssContent)),
        (t.ssFallback.transition = e.clone(t.ssFallback)))
      : (t.transition = e)
}
function Wm(t, e = !1, r) {
  let o = [],
    a = 0
  for (let u = 0; u < t.length; u++) {
    let f = t[u]
    const h = r == null ? f.key : String(r) + String(f.key != null ? f.key : u)
    f.type === fe
      ? (f.patchFlag & 128 && a++, (o = o.concat(Wm(f.children, e, h))))
      : (e || f.type !== An) && o.push(h != null ? Ci(f, { key: h }) : f)
  }
  if (a > 1) for (let u = 0; u < o.length; u++) o[u].patchFlag = -2
  return o
}
/*! #__NO_SIDE_EFFECTS__ */ function re(t, e) {
  return Wt(t) ? (() => Re({ name: t.name }, e, { setup: t }))() : t
}
const tl = (t) => !!t.type.__asyncLoader,
  Sc = (t) => t.type.__isKeepAlive
function B1(t, e) {
  Um(t, "a", e)
}
function W1(t, e) {
  Um(t, "da", e)
}
function Um(t, e, r = je) {
  const o =
    t.__wdc ||
    (t.__wdc = () => {
      let a = r
      for (; a; ) {
        if (a.isDeactivated) return
        a = a.parent
      }
      return t()
    })
  if ((kc(e, o, r), r)) {
    let a = r.parent
    for (; a && a.parent; ) Sc(a.parent.vnode) && U1(o, e, r, a), (a = a.parent)
  }
}
function U1(t, e, r, o) {
  const a = kc(e, t, o, !0)
  bh(() => {
    eh(o[e], a)
  }, r)
}
function kc(t, e, r = je, o = !1) {
  if (r) {
    const a = r[t] || (r[t] = []),
      u =
        e.__weh ||
        (e.__weh = (...f) => {
          if (r.isUnmounted) return
          ls(), Jo(r)
          const h = Wn(e, r, t, f)
          return Zi(), as(), h
        })
    return o ? a.unshift(u) : a.push(u), u
  }
}
const Vr =
    (t) =>
    (e, r = je) =>
      (!hl || t === "sp") && kc(t, (...o) => e(...o), r),
  j1 = Vr("bm"),
  us = Vr("m"),
  G1 = Vr("bu"),
  V1 = Vr("u"),
  jm = Vr("bum"),
  bh = Vr("um"),
  K1 = Vr("sp"),
  X1 = Vr("rtg"),
  Y1 = Vr("rtc")
function Z1(t, e = je) {
  kc("ec", t, e)
}
function Qn(t, e, r, o) {
  let a
  const u = r && r[o]
  if (Rt(t) || ze(t)) {
    a = new Array(t.length)
    for (let f = 0, h = t.length; f < h; f++)
      a[f] = e(t[f], f, void 0, u && u[f])
  } else if (typeof t == "number") {
    a = new Array(t)
    for (let f = 0; f < t; f++) a[f] = e(f + 1, f, void 0, u && u[f])
  } else if (be(t))
    if (t[Symbol.iterator])
      a = Array.from(t, (f, h) => e(f, h, void 0, u && u[h]))
    else {
      const f = Object.keys(t)
      a = new Array(f.length)
      for (let h = 0, p = f.length; h < p; h++) {
        const g = f[h]
        a[h] = e(t[g], g, h, u && u[h])
      }
    }
  else a = []
  return r && (r[o] = a), a
}
function er(t, e, r = {}, o, a) {
  if (Ze.isCE || (Ze.parent && tl(Ze.parent) && Ze.parent.isCE))
    return e !== "default" && (r.name = e), Ft("slot", r, o && o())
  let u = t[e]
  u && u._c && (u._d = !1), lt()
  const f = u && Gm(u(r)),
    h = Jt(
      fe,
      { key: r.key || (f && f.key) || `_${e}` },
      f || (o ? o() : []),
      f && t._ === 1 ? 64 : -2,
    )
  return (
    !a && h.scopeId && (h.slotScopeIds = [h.scopeId + "-s"]),
    u && u._c && (u._d = !0),
    h
  )
}
function Gm(t) {
  return t.some((e) =>
    fl(e) ? !(e.type === An || (e.type === fe && !Gm(e.children))) : !0,
  )
    ? t
    : null
}
const vf = (t) => (t ? (o0(t) ? Ec(t) || t.proxy : vf(t.parent)) : null),
  el = Re(Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => vf(t.parent),
    $root: (t) => vf(t.root),
    $emit: (t) => t.emit,
    $options: (t) => wh(t),
    $forceUpdate: (t) => t.f || (t.f = () => ph(t.update)),
    $nextTick: (t) => t.n || (t.n = Hr.bind(t.proxy)),
    $watch: (t) => F1.bind(t),
  }),
  qu = (t, e) => t !== xe && !t.__isScriptSetup && se(t, e),
  J1 = {
    get({ _: t }, e) {
      const {
        ctx: r,
        setupState: o,
        data: a,
        props: u,
        accessCache: f,
        type: h,
        appContext: p,
      } = t
      let g
      if (e[0] !== "$") {
        const S = f[e]
        if (S !== void 0)
          switch (S) {
            case 1:
              return o[e]
            case 2:
              return a[e]
            case 4:
              return r[e]
            case 3:
              return u[e]
          }
        else {
          if (qu(o, e)) return (f[e] = 1), o[e]
          if (a !== xe && se(a, e)) return (f[e] = 2), a[e]
          if ((g = t.propsOptions[0]) && se(g, e)) return (f[e] = 3), u[e]
          if (r !== xe && se(r, e)) return (f[e] = 4), r[e]
          yf && (f[e] = 0)
        }
      }
      const v = el[e]
      let b, w
      if (v) return e === "$attrs" && Mn(t, "get", e), v(t)
      if ((b = h.__cssModules) && (b = b[e])) return b
      if (r !== xe && se(r, e)) return (f[e] = 4), r[e]
      if (((w = p.config.globalProperties), se(w, e))) return w[e]
    },
    set({ _: t }, e, r) {
      const { data: o, setupState: a, ctx: u } = t
      return qu(a, e)
        ? ((a[e] = r), !0)
        : o !== xe && se(o, e)
          ? ((o[e] = r), !0)
          : se(t.props, e) || (e[0] === "$" && e.slice(1) in t)
            ? !1
            : ((u[e] = r), !0)
    },
    has(
      {
        _: {
          data: t,
          setupState: e,
          accessCache: r,
          ctx: o,
          appContext: a,
          propsOptions: u,
        },
      },
      f,
    ) {
      let h
      return (
        !!r[f] ||
        (t !== xe && se(t, f)) ||
        qu(e, f) ||
        ((h = u[0]) && se(h, f)) ||
        se(o, f) ||
        se(el, f) ||
        se(a.config.globalProperties, f)
      )
    },
    defineProperty(t, e, r) {
      return (
        r.get != null
          ? (t._.accessCache[e] = 0)
          : se(r, "value") && this.set(t, e, r.value, null),
        Reflect.defineProperty(t, e, r)
      )
    },
  }
function Q1() {
  return t_().attrs
}
function Vm(t, e, r) {
  const o = Cl()
  if (r && r.local) {
    const a = Vt(t[e])
    return (
      $e(
        () => t[e],
        (u) => (a.value = u),
      ),
      $e(a, (u) => {
        u !== t[e] && o.emit(`update:${e}`, u)
      }),
      a
    )
  } else
    return {
      __v_isRef: !0,
      get value() {
        return t[e]
      },
      set value(a) {
        o.emit(`update:${e}`, a)
      },
    }
}
function t_() {
  const t = Cl()
  return t.setupContext || (t.setupContext = l0(t))
}
function Ka(t) {
  return Rt(t) ? t.reduce((e, r) => ((e[r] = null), e), {}) : t
}
function mf(t, e) {
  return !t || !e ? t || e : Rt(t) && Rt(e) ? t.concat(e) : Re({}, Ka(t), Ka(e))
}
let yf = !0
function e_(t) {
  const e = wh(t),
    r = t.proxy,
    o = t.ctx
  ;(yf = !1), e.beforeCreate && hg(e.beforeCreate, t, "bc")
  const {
    data: a,
    computed: u,
    methods: f,
    watch: h,
    provide: p,
    inject: g,
    created: v,
    beforeMount: b,
    mounted: w,
    beforeUpdate: S,
    updated: N,
    activated: L,
    deactivated: A,
    beforeDestroy: T,
    beforeUnmount: M,
    destroyed: R,
    unmounted: E,
    render: W,
    renderTracked: X,
    renderTriggered: ft,
    errorCaptured: Y,
    serverPrefetch: et,
    expose: st,
    inheritAttrs: dt,
    components: pt,
    directives: V,
    filters: z,
  } = e
  if ((g && n_(g, o, null), f))
    for (const B in f) {
      const Q = f[B]
      Wt(Q) && (o[B] = Q.bind(r))
    }
  if (a) {
    const B = a.call(r, r)
    be(B) && (t.data = Bn(B))
  }
  if (((yf = !0), u))
    for (const B in u) {
      const Q = u[B],
        mt = Wt(Q) ? Q.bind(r, r) : Wt(Q.get) ? Q.get.bind(r, r) : vr,
        Et = !Wt(Q) && Wt(Q.set) ? Q.set.bind(r) : vr,
        It = xt({ get: mt, set: Et })
      Object.defineProperty(o, B, {
        enumerable: !0,
        configurable: !0,
        get: () => It.value,
        set: (Bt) => (It.value = Bt),
      })
    }
  if (h) for (const B in h) Km(h[B], o, r, B)
  if (p) {
    const B = Wt(p) ? p.call(r) : p
    Reflect.ownKeys(B).forEach((Q) => {
      Da(Q, B[Q])
    })
  }
  v && hg(v, t, "c")
  function q(B, Q) {
    Rt(Q) ? Q.forEach((mt) => B(mt.bind(r))) : Q && B(Q.bind(r))
  }
  if (
    (q(j1, b),
    q(us, w),
    q(G1, S),
    q(V1, N),
    q(B1, L),
    q(W1, A),
    q(Z1, Y),
    q(Y1, X),
    q(X1, ft),
    q(jm, M),
    q(bh, E),
    q(K1, et),
    Rt(st))
  )
    if (st.length) {
      const B = t.exposed || (t.exposed = {})
      st.forEach((Q) => {
        Object.defineProperty(B, Q, {
          get: () => r[Q],
          set: (mt) => (r[Q] = mt),
        })
      })
    } else t.exposed || (t.exposed = {})
  W && t.render === vr && (t.render = W),
    dt != null && (t.inheritAttrs = dt),
    pt && (t.components = pt),
    V && (t.directives = V)
}
function n_(t, e, r = vr) {
  Rt(t) && (t = bf(t))
  for (const o in t) {
    const a = t[o]
    let u
    be(a)
      ? "default" in a
        ? (u = Ir(a.from || o, a.default, !0))
        : (u = Ir(a.from || o))
      : (u = Ir(a)),
      Le(u)
        ? Object.defineProperty(e, o, {
            enumerable: !0,
            configurable: !0,
            get: () => u.value,
            set: (f) => (u.value = f),
          })
        : (e[o] = u)
  }
}
function hg(t, e, r) {
  Wn(Rt(t) ? t.map((o) => o.bind(e.proxy)) : t.bind(e.proxy), e, r)
}
function Km(t, e, r, o) {
  const a = o.includes(".") ? qm(r, o) : () => r[o]
  if (ze(t)) {
    const u = e[t]
    Wt(u) && $e(a, u)
  } else if (Wt(t)) $e(a, t.bind(r))
  else if (be(t))
    if (Rt(t)) t.forEach((u) => Km(u, e, r, o))
    else {
      const u = Wt(t.handler) ? t.handler.bind(r) : e[t.handler]
      Wt(u) && $e(a, u, t)
    }
}
function wh(t) {
  const e = t.type,
    { mixins: r, extends: o } = e,
    {
      mixins: a,
      optionsCache: u,
      config: { optionMergeStrategies: f },
    } = t.appContext,
    h = u.get(e)
  let p
  return (
    h
      ? (p = h)
      : !a.length && !r && !o
        ? (p = e)
        : ((p = {}),
          a.length && a.forEach((g) => Xa(p, g, f, !0)),
          Xa(p, e, f)),
    be(e) && u.set(e, p),
    p
  )
}
function Xa(t, e, r, o = !1) {
  const { mixins: a, extends: u } = e
  u && Xa(t, u, r, !0), a && a.forEach((f) => Xa(t, f, r, !0))
  for (const f in e)
    if (!(o && f === "expose")) {
      const h = r_[f] || (r && r[f])
      t[f] = h ? h(t[f], e[f]) : e[f]
    }
  return t
}
const r_ = {
  data: dg,
  props: pg,
  emits: pg,
  methods: Zs,
  computed: Zs,
  beforeCreate: hn,
  created: hn,
  beforeMount: hn,
  mounted: hn,
  beforeUpdate: hn,
  updated: hn,
  beforeDestroy: hn,
  beforeUnmount: hn,
  destroyed: hn,
  unmounted: hn,
  activated: hn,
  deactivated: hn,
  errorCaptured: hn,
  serverPrefetch: hn,
  components: Zs,
  directives: Zs,
  watch: o_,
  provide: dg,
  inject: i_,
}
function dg(t, e) {
  return e
    ? t
      ? function () {
          return Re(
            Wt(t) ? t.call(this, this) : t,
            Wt(e) ? e.call(this, this) : e,
          )
        }
      : e
    : t
}
function i_(t, e) {
  return Zs(bf(t), bf(e))
}
function bf(t) {
  if (Rt(t)) {
    const e = {}
    for (let r = 0; r < t.length; r++) e[t[r]] = t[r]
    return e
  }
  return t
}
function hn(t, e) {
  return t ? [...new Set([].concat(t, e))] : e
}
function Zs(t, e) {
  return t ? Re(Object.create(null), t, e) : e
}
function pg(t, e) {
  return t
    ? Rt(t) && Rt(e)
      ? [...new Set([...t, ...e])]
      : Re(Object.create(null), Ka(t), Ka(e ?? {}))
    : e
}
function o_(t, e) {
  if (!t) return e
  if (!e) return t
  const r = Re(Object.create(null), t)
  for (const o in e) r[o] = hn(t[o], e[o])
  return r
}
function Xm() {
  return {
    app: null,
    config: {
      isNativeTag: Tx,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let s_ = 0
function l_(t, e) {
  return function (o, a = null) {
    Wt(o) || (o = Re({}, o)), a != null && !be(a) && (a = null)
    const u = Xm(),
      f = new WeakSet()
    let h = !1
    const p = (u.app = {
      _uid: s_++,
      _component: o,
      _props: a,
      _container: null,
      _context: u,
      _instance: null,
      version: M_,
      get config() {
        return u.config
      },
      set config(g) {},
      use(g, ...v) {
        return (
          f.has(g) ||
            (g && Wt(g.install)
              ? (f.add(g), g.install(p, ...v))
              : Wt(g) && (f.add(g), g(p, ...v))),
          p
        )
      },
      mixin(g) {
        return u.mixins.includes(g) || u.mixins.push(g), p
      },
      component(g, v) {
        return v ? ((u.components[g] = v), p) : u.components[g]
      },
      directive(g, v) {
        return v ? ((u.directives[g] = v), p) : u.directives[g]
      },
      mount(g, v, b) {
        if (!h) {
          const w = Ft(o, a)
          return (
            (w.appContext = u),
            v && e ? e(w, g) : t(w, g, b),
            (h = !0),
            (p._container = g),
            (g.__vue_app__ = p),
            Ec(w.component) || w.component.proxy
          )
        }
      },
      unmount() {
        h && (t(null, p._container), delete p._container.__vue_app__)
      },
      provide(g, v) {
        return (u.provides[g] = v), p
      },
      runWithContext(g) {
        Ya = p
        try {
          return g()
        } finally {
          Ya = null
        }
      },
    })
    return p
  }
}
let Ya = null
function Da(t, e) {
  if (je) {
    let r = je.provides
    const o = je.parent && je.parent.provides
    o === r && (r = je.provides = Object.create(o)), (r[t] = e)
  }
}
function Ir(t, e, r = !1) {
  const o = je || Ze
  if (o || Ya) {
    const a = o
      ? o.parent == null
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
      : Ya._context.provides
    if (a && t in a) return a[t]
    if (arguments.length > 1) return r && Wt(e) ? e.call(o && o.proxy) : e
  }
}
function a_(t, e, r, o = !1) {
  const a = {},
    u = {}
  Ua(u, Tc, 1), (t.propsDefaults = Object.create(null)), Ym(t, e, a, u)
  for (const f in t.propsOptions[0]) f in a || (a[f] = void 0)
  r ? (t.props = o ? a : Tm(a)) : t.type.props ? (t.props = a) : (t.props = u),
    (t.attrs = u)
}
function c_(t, e, r, o) {
  const {
      props: a,
      attrs: u,
      vnode: { patchFlag: f },
    } = t,
    h = le(a),
    [p] = t.propsOptions
  let g = !1
  if ((o || f > 0) && !(f & 16)) {
    if (f & 8) {
      const v = t.vnode.dynamicProps
      for (let b = 0; b < v.length; b++) {
        let w = v[b]
        if (xc(t.emitsOptions, w)) continue
        const S = e[w]
        if (p)
          if (se(u, w)) S !== u[w] && ((u[w] = S), (g = !0))
          else {
            const N = yr(w)
            a[N] = wf(p, h, N, S, t, !1)
          }
        else S !== u[w] && ((u[w] = S), (g = !0))
      }
    }
  } else {
    Ym(t, e, a, u) && (g = !0)
    let v
    for (const b in h)
      (!e || (!se(e, b) && ((v = so(b)) === b || !se(e, v)))) &&
        (p
          ? r &&
            (r[b] !== void 0 || r[v] !== void 0) &&
            (a[b] = wf(p, h, b, void 0, t, !0))
          : delete a[b])
    if (u !== h) for (const b in u) (!e || !se(e, b)) && (delete u[b], (g = !0))
  }
  g && Fr(t, "set", "$attrs")
}
function Ym(t, e, r, o) {
  const [a, u] = t.propsOptions
  let f = !1,
    h
  if (e)
    for (let p in e) {
      if (Pa(p)) continue
      const g = e[p]
      let v
      a && se(a, (v = yr(p)))
        ? !u || !u.includes(v)
          ? (r[v] = g)
          : ((h || (h = {}))[v] = g)
        : xc(t.emitsOptions, p) ||
          ((!(p in o) || g !== o[p]) && ((o[p] = g), (f = !0)))
    }
  if (u) {
    const p = le(r),
      g = h || xe
    for (let v = 0; v < u.length; v++) {
      const b = u[v]
      r[b] = wf(a, p, b, g[b], t, !se(g, b))
    }
  }
  return f
}
function wf(t, e, r, o, a, u) {
  const f = t[r]
  if (f != null) {
    const h = se(f, "default")
    if (h && o === void 0) {
      const p = f.default
      if (f.type !== Function && !f.skipFactory && Wt(p)) {
        const { propsDefaults: g } = a
        r in g ? (o = g[r]) : (Jo(a), (o = g[r] = p.call(null, e)), Zi())
      } else o = p
    }
    f[0] && (u && !h ? (o = !1) : f[1] && (o === "" || o === so(r)) && (o = !0))
  }
  return o
}
function Zm(t, e, r = !1) {
  const o = e.propsCache,
    a = o.get(t)
  if (a) return a
  const u = t.props,
    f = {},
    h = []
  let p = !1
  if (!Wt(t)) {
    const v = (b) => {
      p = !0
      const [w, S] = Zm(b, e, !0)
      Re(f, w), S && h.push(...S)
    }
    !r && e.mixins.length && e.mixins.forEach(v),
      t.extends && v(t.extends),
      t.mixins && t.mixins.forEach(v)
  }
  if (!u && !p) return be(t) && o.set(t, qo), qo
  if (Rt(u))
    for (let v = 0; v < u.length; v++) {
      const b = yr(u[v])
      gg(b) && (f[b] = xe)
    }
  else if (u)
    for (const v in u) {
      const b = yr(v)
      if (gg(b)) {
        const w = u[v],
          S = (f[b] = Rt(w) || Wt(w) ? { type: w } : Re({}, w))
        if (S) {
          const N = yg(Boolean, S.type),
            L = yg(String, S.type)
          ;(S[0] = N > -1),
            (S[1] = L < 0 || N < L),
            (N > -1 || se(S, "default")) && h.push(b)
        }
      }
    }
  const g = [f, h]
  return be(t) && o.set(t, g), g
}
function gg(t) {
  return t[0] !== "$"
}
function vg(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/)
  return e ? e[2] : t === null ? "null" : ""
}
function mg(t, e) {
  return vg(t) === vg(e)
}
function yg(t, e) {
  return Rt(e) ? e.findIndex((r) => mg(r, t)) : Wt(e) && mg(e, t) ? 0 : -1
}
const Jm = (t) => t[0] === "_" || t === "$stable",
  xh = (t) => (Rt(t) ? t.map(Zn) : [Zn(t)]),
  u_ = (t, e, r) => {
    if (e._n) return e
    const o = Zt((...a) => xh(e(...a)), r)
    return (o._c = !1), o
  },
  Qm = (t, e, r) => {
    const o = t._ctx
    for (const a in t) {
      if (Jm(a)) continue
      const u = t[a]
      if (Wt(u)) e[a] = u_(a, u, o)
      else if (u != null) {
        const f = xh(u)
        e[a] = () => f
      }
    }
  },
  t0 = (t, e) => {
    const r = xh(e)
    t.slots.default = () => r
  },
  f_ = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const r = e._
      r ? ((t.slots = le(e)), Ua(e, "_", r)) : Qm(e, (t.slots = {}))
    } else (t.slots = {}), e && t0(t, e)
    Ua(t.slots, Tc, 1)
  },
  h_ = (t, e, r) => {
    const { vnode: o, slots: a } = t
    let u = !0,
      f = xe
    if (o.shapeFlag & 32) {
      const h = e._
      h
        ? r && h === 1
          ? (u = !1)
          : (Re(a, e), !r && h === 1 && delete a._)
        : ((u = !e.$stable), Qm(e, a)),
        (f = e)
    } else e && (t0(t, e), (f = { default: 1 }))
    if (u) for (const h in a) !Jm(h) && f[h] == null && delete a[h]
  }
function xf(t, e, r, o, a = !1) {
  if (Rt(t)) {
    t.forEach((w, S) => xf(w, e && (Rt(e) ? e[S] : e), r, o, a))
    return
  }
  if (tl(o) && !a) return
  const u = o.shapeFlag & 4 ? Ec(o.component) || o.component.proxy : o.el,
    f = a ? null : u,
    { i: h, r: p } = t,
    g = e && e.r,
    v = h.refs === xe ? (h.refs = {}) : h.refs,
    b = h.setupState
  if (
    (g != null &&
      g !== p &&
      (ze(g)
        ? ((v[g] = null), se(b, g) && (b[g] = null))
        : Le(g) && (g.value = null)),
    Wt(p))
  )
    _i(p, h, 12, [f, v])
  else {
    const w = ze(p),
      S = Le(p)
    if (w || S) {
      const N = () => {
        if (t.f) {
          const L = w ? (se(b, p) ? b[p] : v[p]) : p.value
          a
            ? Rt(L) && eh(L, u)
            : Rt(L)
              ? L.includes(u) || L.push(u)
              : w
                ? ((v[p] = [u]), se(b, p) && (b[p] = v[p]))
                : ((p.value = [u]), t.k && (v[t.k] = p.value))
        } else
          w
            ? ((v[p] = f), se(b, p) && (b[p] = f))
            : S && ((p.value = f), t.k && (v[t.k] = f))
      }
      f ? ((N.id = -1), kn(N, r)) : N()
    }
  }
}
const kn = R1
function d_(t) {
  return p_(t)
}
function p_(t, e) {
  const r = af()
  r.__VUE__ = !0
  const {
      insert: o,
      remove: a,
      patchProp: u,
      createElement: f,
      createText: h,
      createComment: p,
      setText: g,
      setElementText: v,
      parentNode: b,
      nextSibling: w,
      setScopeId: S = vr,
      insertStaticContent: N,
    } = t,
    L = (
      O,
      I,
      K,
      tt = null,
      ot = null,
      at = null,
      ct = !1,
      vt = null,
      _t = !!I.dynamicChildren,
    ) => {
      if (O === I) return
      O && !dr(O, I) && ((tt = j(O)), Bt(O, ot, at, !0), (O = null)),
        I.patchFlag === -2 && ((_t = !1), (I.dynamicChildren = null))
      const { type: ht, ref: Dt, shapeFlag: At } = I
      switch (ht) {
        case Cc:
          A(O, I, K, tt)
          break
        case An:
          T(O, I, K, tt)
          break
        case Hu:
          O == null && M(I, K, tt, ct)
          break
        case fe:
          pt(O, I, K, tt, ot, at, ct, vt, _t)
          break
        default:
          At & 1
            ? W(O, I, K, tt, ot, at, ct, vt, _t)
            : At & 6
              ? V(O, I, K, tt, ot, at, ct, vt, _t)
              : (At & 64 || At & 128) &&
                ht.process(O, I, K, tt, ot, at, ct, vt, _t, rt)
      }
      Dt != null && ot && xf(Dt, O && O.ref, at, I || O, !I)
    },
    A = (O, I, K, tt) => {
      if (O == null) o((I.el = h(I.children)), K, tt)
      else {
        const ot = (I.el = O.el)
        I.children !== O.children && g(ot, I.children)
      }
    },
    T = (O, I, K, tt) => {
      O == null ? o((I.el = p(I.children || "")), K, tt) : (I.el = O.el)
    },
    M = (O, I, K, tt) => {
      ;[O.el, O.anchor] = N(O.children, I, K, tt, O.el, O.anchor)
    },
    R = ({ el: O, anchor: I }, K, tt) => {
      let ot
      for (; O && O !== I; ) (ot = w(O)), o(O, K, tt), (O = ot)
      o(I, K, tt)
    },
    E = ({ el: O, anchor: I }) => {
      let K
      for (; O && O !== I; ) (K = w(O)), a(O), (O = K)
      a(I)
    },
    W = (O, I, K, tt, ot, at, ct, vt, _t) => {
      ;(ct = ct || I.type === "svg"),
        O == null
          ? X(I, K, tt, ot, at, ct, vt, _t)
          : et(O, I, ot, at, ct, vt, _t)
    },
    X = (O, I, K, tt, ot, at, ct, vt) => {
      let _t, ht
      const { type: Dt, props: At, shapeFlag: Ot, transition: zt, dirs: Gt } = O
      if (
        ((_t = O.el = f(O.type, at, At && At.is, At)),
        Ot & 8
          ? v(_t, O.children)
          : Ot & 16 &&
            Y(
              O.children,
              _t,
              null,
              tt,
              ot,
              at && Dt !== "foreignObject",
              ct,
              vt,
            ),
        Gt && qi(O, null, tt, "created"),
        ft(_t, O, O.scopeId, ct, tt),
        At)
      ) {
        for (const ne in At)
          ne !== "value" &&
            !Pa(ne) &&
            u(_t, ne, null, At[ne], at, O.children, tt, ot, St)
        "value" in At && u(_t, "value", null, At.value),
          (ht = At.onVnodeBeforeMount) && fr(ht, tt, O)
      }
      Gt && qi(O, null, tt, "beforeMount")
      const ie = g_(ot, zt)
      ie && zt.beforeEnter(_t),
        o(_t, I, K),
        ((ht = At && At.onVnodeMounted) || ie || Gt) &&
          kn(() => {
            ht && fr(ht, tt, O),
              ie && zt.enter(_t),
              Gt && qi(O, null, tt, "mounted")
          }, ot)
    },
    ft = (O, I, K, tt, ot) => {
      if ((K && S(O, K), tt))
        for (let at = 0; at < tt.length; at++) S(O, tt[at])
      if (ot) {
        let at = ot.subTree
        if (I === at) {
          const ct = ot.vnode
          ft(O, ct, ct.scopeId, ct.slotScopeIds, ot.parent)
        }
      }
    },
    Y = (O, I, K, tt, ot, at, ct, vt, _t = 0) => {
      for (let ht = _t; ht < O.length; ht++) {
        const Dt = (O[ht] = vt ? gi(O[ht]) : Zn(O[ht]))
        L(null, Dt, I, K, tt, ot, at, ct, vt)
      }
    },
    et = (O, I, K, tt, ot, at, ct) => {
      const vt = (I.el = O.el)
      let { patchFlag: _t, dynamicChildren: ht, dirs: Dt } = I
      _t |= O.patchFlag & 16
      const At = O.props || xe,
        Ot = I.props || xe
      let zt
      K && Hi(K, !1),
        (zt = Ot.onVnodeBeforeUpdate) && fr(zt, K, I, O),
        Dt && qi(I, O, K, "beforeUpdate"),
        K && Hi(K, !0)
      const Gt = ot && I.type !== "foreignObject"
      if (
        (ht
          ? st(O.dynamicChildren, ht, vt, K, tt, Gt, at)
          : ct || Q(O, I, vt, null, K, tt, Gt, at, !1),
        _t > 0)
      ) {
        if (_t & 16) dt(vt, I, At, Ot, K, tt, ot)
        else if (
          (_t & 2 &&
            At.class !== Ot.class &&
            u(vt, "class", null, Ot.class, ot),
          _t & 4 && u(vt, "style", At.style, Ot.style, ot),
          _t & 8)
        ) {
          const ie = I.dynamicProps
          for (let ne = 0; ne < ie.length; ne++) {
            const ue = ie[ne],
              te = At[ue],
              bn = Ot[ue]
            ;(bn !== te || ue === "value") &&
              u(vt, ue, te, bn, ot, O.children, K, tt, St)
          }
        }
        _t & 1 && O.children !== I.children && v(vt, I.children)
      } else !ct && ht == null && dt(vt, I, At, Ot, K, tt, ot)
      ;((zt = Ot.onVnodeUpdated) || Dt) &&
        kn(() => {
          zt && fr(zt, K, I, O), Dt && qi(I, O, K, "updated")
        }, tt)
    },
    st = (O, I, K, tt, ot, at, ct) => {
      for (let vt = 0; vt < I.length; vt++) {
        const _t = O[vt],
          ht = I[vt],
          Dt =
            _t.el && (_t.type === fe || !dr(_t, ht) || _t.shapeFlag & 70)
              ? b(_t.el)
              : K
        L(_t, ht, Dt, null, tt, ot, at, ct, !0)
      }
    },
    dt = (O, I, K, tt, ot, at, ct) => {
      if (K !== tt) {
        if (K !== xe)
          for (const vt in K)
            !Pa(vt) &&
              !(vt in tt) &&
              u(O, vt, K[vt], null, ct, I.children, ot, at, St)
        for (const vt in tt) {
          if (Pa(vt)) continue
          const _t = tt[vt],
            ht = K[vt]
          _t !== ht &&
            vt !== "value" &&
            u(O, vt, ht, _t, ct, I.children, ot, at, St)
        }
        "value" in tt && u(O, "value", K.value, tt.value)
      }
    },
    pt = (O, I, K, tt, ot, at, ct, vt, _t) => {
      const ht = (I.el = O ? O.el : h("")),
        Dt = (I.anchor = O ? O.anchor : h(""))
      let { patchFlag: At, dynamicChildren: Ot, slotScopeIds: zt } = I
      zt && (vt = vt ? vt.concat(zt) : zt),
        O == null
          ? (o(ht, K, tt),
            o(Dt, K, tt),
            Y(I.children, K, Dt, ot, at, ct, vt, _t))
          : At > 0 && At & 64 && Ot && O.dynamicChildren
            ? (st(O.dynamicChildren, Ot, K, ot, at, ct, vt),
              (I.key != null || (ot && I === ot.subTree)) && e0(O, I, !0))
            : Q(O, I, K, Dt, ot, at, ct, vt, _t)
    },
    V = (O, I, K, tt, ot, at, ct, vt, _t) => {
      ;(I.slotScopeIds = vt),
        O == null
          ? I.shapeFlag & 512
            ? ot.ctx.activate(I, K, tt, ct, _t)
            : z(I, K, tt, ot, at, ct, _t)
          : k(O, I, _t)
    },
    z = (O, I, K, tt, ot, at, ct) => {
      const vt = (O.component = __(O, tt, ot))
      if ((Sc(O) && (vt.ctx.renderer = rt), S_(vt), vt.asyncDep)) {
        if ((ot && ot.registerDep(vt, q), !O.el)) {
          const _t = (vt.subTree = Ft(An))
          T(null, _t, I, K)
        }
        return
      }
      q(vt, O, I, K, ot, at, ct)
    },
    k = (O, I, K) => {
      const tt = (I.component = O.component)
      if (T1(O, I, K))
        if (tt.asyncDep && !tt.asyncResolved) {
          B(tt, I, K)
          return
        } else (tt.next = I), b1(tt.update), tt.update()
      else (I.el = O.el), (tt.vnode = I)
    },
    q = (O, I, K, tt, ot, at, ct) => {
      const vt = () => {
          if (O.isMounted) {
            let { next: Dt, bu: At, u: Ot, parent: zt, vnode: Gt } = O,
              ie = Dt,
              ne
            Hi(O, !1),
              Dt ? ((Dt.el = Gt.el), B(O, Dt, ct)) : (Dt = Gt),
              At && Oa(At),
              (ne = Dt.props && Dt.props.onVnodeBeforeUpdate) &&
                fr(ne, zt, Dt, Gt),
              Hi(O, !0)
            const ue = Fu(O),
              te = O.subTree
            ;(O.subTree = ue),
              L(te, ue, b(te.el), j(te), O, ot, at),
              (Dt.el = ue.el),
              ie === null && gh(O, ue.el),
              Ot && kn(Ot, ot),
              (ne = Dt.props && Dt.props.onVnodeUpdated) &&
                kn(() => fr(ne, zt, Dt, Gt), ot)
          } else {
            let Dt
            const { el: At, props: Ot } = I,
              { bm: zt, m: Gt, parent: ie } = O,
              ne = tl(I)
            if (
              (Hi(O, !1),
              zt && Oa(zt),
              !ne && (Dt = Ot && Ot.onVnodeBeforeMount) && fr(Dt, ie, I),
              Hi(O, !0),
              At && Mt)
            ) {
              const ue = () => {
                ;(O.subTree = Fu(O)), Mt(At, O.subTree, O, ot, null)
              }
              ne
                ? I.type.__asyncLoader().then(() => !O.isUnmounted && ue())
                : ue()
            } else {
              const ue = (O.subTree = Fu(O))
              L(null, ue, K, tt, O, ot, at), (I.el = ue.el)
            }
            if ((Gt && kn(Gt, ot), !ne && (Dt = Ot && Ot.onVnodeMounted))) {
              const ue = I
              kn(() => fr(Dt, ie, ue), ot)
            }
            ;(I.shapeFlag & 256 ||
              (ie && tl(ie.vnode) && ie.vnode.shapeFlag & 256)) &&
              O.a &&
              kn(O.a, ot),
              (O.isMounted = !0),
              (I = K = tt = null)
          }
        },
        _t = (O.effect = new ih(vt, () => ph(ht), O.scope)),
        ht = (O.update = () => _t.run())
      ;(ht.id = O.uid), Hi(O, !0), ht()
    },
    B = (O, I, K) => {
      I.component = O
      const tt = O.vnode.props
      ;(O.vnode = I),
        (O.next = null),
        c_(O, I.props, tt, K),
        h_(O, I.children, K),
        ls(),
        lg(),
        as()
    },
    Q = (O, I, K, tt, ot, at, ct, vt, _t = !1) => {
      const ht = O && O.children,
        Dt = O ? O.shapeFlag : 0,
        At = I.children,
        { patchFlag: Ot, shapeFlag: zt } = I
      if (Ot > 0) {
        if (Ot & 128) {
          Et(ht, At, K, tt, ot, at, ct, vt, _t)
          return
        } else if (Ot & 256) {
          mt(ht, At, K, tt, ot, at, ct, vt, _t)
          return
        }
      }
      zt & 8
        ? (Dt & 16 && St(ht, ot, at), At !== ht && v(K, At))
        : Dt & 16
          ? zt & 16
            ? Et(ht, At, K, tt, ot, at, ct, vt, _t)
            : St(ht, ot, at, !0)
          : (Dt & 8 && v(K, ""), zt & 16 && Y(At, K, tt, ot, at, ct, vt, _t))
    },
    mt = (O, I, K, tt, ot, at, ct, vt, _t) => {
      ;(O = O || qo), (I = I || qo)
      const ht = O.length,
        Dt = I.length,
        At = Math.min(ht, Dt)
      let Ot
      for (Ot = 0; Ot < At; Ot++) {
        const zt = (I[Ot] = _t ? gi(I[Ot]) : Zn(I[Ot]))
        L(O[Ot], zt, K, null, ot, at, ct, vt, _t)
      }
      ht > Dt ? St(O, ot, at, !0, !1, At) : Y(I, K, tt, ot, at, ct, vt, _t, At)
    },
    Et = (O, I, K, tt, ot, at, ct, vt, _t) => {
      let ht = 0
      const Dt = I.length
      let At = O.length - 1,
        Ot = Dt - 1
      for (; ht <= At && ht <= Ot; ) {
        const zt = O[ht],
          Gt = (I[ht] = _t ? gi(I[ht]) : Zn(I[ht]))
        if (dr(zt, Gt)) L(zt, Gt, K, null, ot, at, ct, vt, _t)
        else break
        ht++
      }
      for (; ht <= At && ht <= Ot; ) {
        const zt = O[At],
          Gt = (I[Ot] = _t ? gi(I[Ot]) : Zn(I[Ot]))
        if (dr(zt, Gt)) L(zt, Gt, K, null, ot, at, ct, vt, _t)
        else break
        At--, Ot--
      }
      if (ht > At) {
        if (ht <= Ot) {
          const zt = Ot + 1,
            Gt = zt < Dt ? I[zt].el : tt
          for (; ht <= Ot; )
            L(
              null,
              (I[ht] = _t ? gi(I[ht]) : Zn(I[ht])),
              K,
              Gt,
              ot,
              at,
              ct,
              vt,
              _t,
            ),
              ht++
        }
      } else if (ht > Ot) for (; ht <= At; ) Bt(O[ht], ot, at, !0), ht++
      else {
        const zt = ht,
          Gt = ht,
          ie = new Map()
        for (ht = Gt; ht <= Ot; ht++) {
          const ye = (I[ht] = _t ? gi(I[ht]) : Zn(I[ht]))
          ye.key != null && ie.set(ye.key, ht)
        }
        let ne,
          ue = 0
        const te = Ot - Gt + 1
        let bn = !1,
          Nn = 0
        const We = new Array(te)
        for (ht = 0; ht < te; ht++) We[ht] = 0
        for (ht = zt; ht <= At; ht++) {
          const ye = O[ht]
          if (ue >= te) {
            Bt(ye, ot, at, !0)
            continue
          }
          let on
          if (ye.key != null) on = ie.get(ye.key)
          else
            for (ne = Gt; ne <= Ot; ne++)
              if (We[ne - Gt] === 0 && dr(ye, I[ne])) {
                on = ne
                break
              }
          on === void 0
            ? Bt(ye, ot, at, !0)
            : ((We[on - Gt] = ht + 1),
              on >= Nn ? (Nn = on) : (bn = !0),
              L(ye, I[on], K, null, ot, at, ct, vt, _t),
              ue++)
        }
        const co = bn ? v_(We) : qo
        for (ne = co.length - 1, ht = te - 1; ht >= 0; ht--) {
          const ye = Gt + ht,
            on = I[ye],
            wt = ye + 1 < Dt ? I[ye + 1].el : tt
          We[ht] === 0
            ? L(null, on, K, wt, ot, at, ct, vt, _t)
            : bn && (ne < 0 || ht !== co[ne] ? It(on, K, wt, 2) : ne--)
        }
      }
    },
    It = (O, I, K, tt, ot = null) => {
      const {
        el: at,
        type: ct,
        transition: vt,
        children: _t,
        shapeFlag: ht,
      } = O
      if (ht & 6) {
        It(O.component.subTree, I, K, tt)
        return
      }
      if (ht & 128) {
        O.suspense.move(I, K, tt)
        return
      }
      if (ht & 64) {
        ct.move(O, I, K, rt)
        return
      }
      if (ct === fe) {
        o(at, I, K)
        for (let At = 0; At < _t.length; At++) It(_t[At], I, K, tt)
        o(O.anchor, I, K)
        return
      }
      if (ct === Hu) {
        R(O, I, K)
        return
      }
      if (tt !== 2 && ht & 1 && vt)
        if (tt === 0)
          vt.beforeEnter(at), o(at, I, K), kn(() => vt.enter(at), ot)
        else {
          const { leave: At, delayLeave: Ot, afterLeave: zt } = vt,
            Gt = () => o(at, I, K),
            ie = () => {
              At(at, () => {
                Gt(), zt && zt()
              })
            }
          Ot ? Ot(at, Gt, ie) : ie()
        }
      else o(at, I, K)
    },
    Bt = (O, I, K, tt = !1, ot = !1) => {
      const {
        type: at,
        props: ct,
        ref: vt,
        children: _t,
        dynamicChildren: ht,
        shapeFlag: Dt,
        patchFlag: At,
        dirs: Ot,
      } = O
      if ((vt != null && xf(vt, null, K, O, !0), Dt & 256)) {
        I.ctx.deactivate(O)
        return
      }
      const zt = Dt & 1 && Ot,
        Gt = !tl(O)
      let ie
      if ((Gt && (ie = ct && ct.onVnodeBeforeUnmount) && fr(ie, I, O), Dt & 6))
        Kt(O.component, K, tt)
      else {
        if (Dt & 128) {
          O.suspense.unmount(K, tt)
          return
        }
        zt && qi(O, null, I, "beforeUnmount"),
          Dt & 64
            ? O.type.remove(O, I, K, ot, rt, tt)
            : ht && (at !== fe || (At > 0 && At & 64))
              ? St(ht, I, K, !1, !0)
              : ((at === fe && At & 384) || (!ot && Dt & 16)) && St(_t, I, K),
          tt && Ut(O)
      }
      ;((Gt && (ie = ct && ct.onVnodeUnmounted)) || zt) &&
        kn(() => {
          ie && fr(ie, I, O), zt && qi(O, null, I, "unmounted")
        }, K)
    },
    Ut = (O) => {
      const { type: I, el: K, anchor: tt, transition: ot } = O
      if (I === fe) {
        Xt(K, tt)
        return
      }
      if (I === Hu) {
        E(O)
        return
      }
      const at = () => {
        a(K), ot && !ot.persisted && ot.afterLeave && ot.afterLeave()
      }
      if (O.shapeFlag & 1 && ot && !ot.persisted) {
        const { leave: ct, delayLeave: vt } = ot,
          _t = () => ct(K, at)
        vt ? vt(O.el, at, _t) : _t()
      } else at()
    },
    Xt = (O, I) => {
      let K
      for (; O !== I; ) (K = w(O)), a(O), (O = K)
      a(I)
    },
    Kt = (O, I, K) => {
      const { bum: tt, scope: ot, update: at, subTree: ct, um: vt } = O
      tt && Oa(tt),
        ot.stop(),
        at && ((at.active = !1), Bt(ct, O, I, K)),
        vt && kn(vt, I),
        kn(() => {
          O.isUnmounted = !0
        }, I),
        I &&
          I.pendingBranch &&
          !I.isUnmounted &&
          O.asyncDep &&
          !O.asyncResolved &&
          O.suspenseId === I.pendingId &&
          (I.deps--, I.deps === 0 && I.resolve())
    },
    St = (O, I, K, tt = !1, ot = !1, at = 0) => {
      for (let ct = at; ct < O.length; ct++) Bt(O[ct], I, K, tt, ot)
    },
    j = (O) =>
      O.shapeFlag & 6
        ? j(O.component.subTree)
        : O.shapeFlag & 128
          ? O.suspense.next()
          : w(O.anchor || O.el),
    nt = (O, I, K) => {
      O == null
        ? I._vnode && Bt(I._vnode, null, null, !0)
        : L(I._vnode || null, O, I, null, null, null, K),
        lg(),
        Om(),
        (I._vnode = O)
    },
    rt = {
      p: L,
      um: Bt,
      m: It,
      r: Ut,
      mt: z,
      mc: Y,
      pc: Q,
      pbc: st,
      n: j,
      o: t,
    }
  let Nt, Mt
  return (
    e && ([Nt, Mt] = e(rt)), { render: nt, hydrate: Nt, createApp: l_(nt, Nt) }
  )
}
function Hi({ effect: t, update: e }, r) {
  t.allowRecurse = e.allowRecurse = r
}
function g_(t, e) {
  return (!t || (t && !t.pendingBranch)) && e && !e.persisted
}
function e0(t, e, r = !1) {
  const o = t.children,
    a = e.children
  if (Rt(o) && Rt(a))
    for (let u = 0; u < o.length; u++) {
      const f = o[u]
      let h = a[u]
      h.shapeFlag & 1 &&
        !h.dynamicChildren &&
        ((h.patchFlag <= 0 || h.patchFlag === 32) &&
          ((h = a[u] = gi(a[u])), (h.el = f.el)),
        r || e0(f, h)),
        h.type === Cc && (h.el = f.el)
    }
}
function v_(t) {
  const e = t.slice(),
    r = [0]
  let o, a, u, f, h
  const p = t.length
  for (o = 0; o < p; o++) {
    const g = t[o]
    if (g !== 0) {
      if (((a = r[r.length - 1]), t[a] < g)) {
        ;(e[o] = a), r.push(o)
        continue
      }
      for (u = 0, f = r.length - 1; u < f; )
        (h = (u + f) >> 1), t[r[h]] < g ? (u = h + 1) : (f = h)
      g < t[r[u]] && (u > 0 && (e[o] = r[u - 1]), (r[u] = o))
    }
  }
  for (u = r.length, f = r[u - 1]; u-- > 0; ) (r[u] = f), (f = e[f])
  return r
}
const m_ = (t) => t.__isTeleport,
  fe = Symbol.for("v-fgt"),
  Cc = Symbol.for("v-txt"),
  An = Symbol.for("v-cmt"),
  Hu = Symbol.for("v-stc"),
  nl = []
let Hn = null
function lt(t = !1) {
  nl.push((Hn = t ? null : []))
}
function n0() {
  nl.pop(), (Hn = nl[nl.length - 1] || null)
}
let Zo = 1
function bg(t) {
  Zo += t
}
function r0(t) {
  return (
    (t.dynamicChildren = Zo > 0 ? Hn || qo : null),
    n0(),
    Zo > 0 && Hn && Hn.push(t),
    t
  )
}
function Tt(t, e, r, o, a, u) {
  return r0(ut(t, e, r, o, a, u, !0))
}
function Jt(t, e, r, o, a) {
  return r0(Ft(t, e, r, o, a, !0))
}
function fl(t) {
  return t ? t.__v_isVNode === !0 : !1
}
function dr(t, e) {
  return t.type === e.type && t.key === e.key
}
const Tc = "__vInternal",
  i0 = ({ key: t }) => t ?? null,
  $a = ({ ref: t, ref_key: e, ref_for: r }) => (
    typeof t == "number" && (t = "" + t),
    t != null
      ? ze(t) || Le(t) || Wt(t)
        ? { i: Ze, r: t, k: e, f: !!r }
        : t
      : null
  )
function ut(
  t,
  e = null,
  r = null,
  o = 0,
  a = null,
  u = t === fe ? 0 : 1,
  f = !1,
  h = !1,
) {
  const p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && i0(e),
    ref: e && $a(e),
    scopeId: _c,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: u,
    patchFlag: o,
    dynamicProps: a,
    dynamicChildren: null,
    appContext: null,
    ctx: Ze,
  }
  return (
    h
      ? (_h(p, r), u & 128 && t.normalize(p))
      : r && (p.shapeFlag |= ze(r) ? 8 : 16),
    Zo > 0 &&
      !f &&
      Hn &&
      (p.patchFlag > 0 || u & 6) &&
      p.patchFlag !== 32 &&
      Hn.push(p),
    p
  )
}
const Ft = y_
function y_(t, e = null, r = null, o = 0, a = null, u = !1) {
  if (((!t || t === L1) && (t = An), fl(t))) {
    const h = Ci(t, e, !0)
    return (
      r && _h(h, r),
      Zo > 0 &&
        !u &&
        Hn &&
        (h.shapeFlag & 6 ? (Hn[Hn.indexOf(t)] = h) : Hn.push(h)),
      (h.patchFlag |= -2),
      h
    )
  }
  if ((E_(t) && (t = t.__vccOpts), e)) {
    e = b_(e)
    let { class: h, style: p } = e
    h && !ze(h) && (e.class = ve(h)),
      be(p) && (Em(p) && !Rt(p) && (p = Re({}, p)), (e.style = Ln(p)))
  }
  const f = ze(t) ? 1 : A1(t) ? 128 : m_(t) ? 64 : be(t) ? 4 : Wt(t) ? 2 : 0
  return ut(t, e, r, o, a, f, u, !0)
}
function b_(t) {
  return t ? (Em(t) || Tc in t ? Re({}, t) : t) : null
}
function Ci(t, e, r = !1) {
  const { props: o, ref: a, patchFlag: u, children: f } = t,
    h = e ? Si(o || {}, e) : o
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: h,
    key: h && i0(h),
    ref:
      e && e.ref
        ? r && a
          ? Rt(a)
            ? a.concat($a(e))
            : [a, $a(e)]
          : $a(e)
        : a,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: f,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== fe ? (u === -1 ? 16 : u | 16) : u,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ci(t.ssContent),
    ssFallback: t.ssFallback && Ci(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
  }
}
function dn(t = " ", e = 0) {
  return Ft(Cc, null, t, e)
}
function Qt(t = "", e = !1) {
  return e ? (lt(), Jt(An, null, t)) : Ft(An, null, t)
}
function Zn(t) {
  return t == null || typeof t == "boolean"
    ? Ft(An)
    : Rt(t)
      ? Ft(fe, null, t.slice())
      : typeof t == "object"
        ? gi(t)
        : Ft(Cc, null, String(t))
}
function gi(t) {
  return (t.el === null && t.patchFlag !== -1) || t.memo ? t : Ci(t)
}
function _h(t, e) {
  let r = 0
  const { shapeFlag: o } = t
  if (e == null) e = null
  else if (Rt(e)) r = 16
  else if (typeof e == "object")
    if (o & 65) {
      const a = e.default
      a && (a._c && (a._d = !1), _h(t, a()), a._c && (a._d = !0))
      return
    } else {
      r = 32
      const a = e._
      !a && !(Tc in e)
        ? (e._ctx = Ze)
        : a === 3 &&
          Ze &&
          (Ze.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)))
    }
  else
    Wt(e)
      ? ((e = { default: e, _ctx: Ze }), (r = 32))
      : ((e = String(e)), o & 64 ? ((r = 16), (e = [dn(e)])) : (r = 8))
  ;(t.children = e), (t.shapeFlag |= r)
}
function Si(...t) {
  const e = {}
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    for (const a in o)
      if (a === "class")
        e.class !== o.class && (e.class = ve([e.class, o.class]))
      else if (a === "style") e.style = Ln([e.style, o.style])
      else if (pc(a)) {
        const u = e[a],
          f = o[a]
        f &&
          u !== f &&
          !(Rt(u) && u.includes(f)) &&
          (e[a] = u ? [].concat(u, f) : f)
      } else a !== "" && (e[a] = o[a])
  }
  return e
}
function fr(t, e, r, o = null) {
  Wn(t, e, 7, [r, o])
}
const w_ = Xm()
let x_ = 0
function __(t, e, r) {
  const o = t.type,
    a = (e ? e.appContext : t.appContext) || w_,
    u = {
      uid: x_++,
      vnode: t,
      type: o,
      parent: e,
      appContext: a,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Fx(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(a.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Zm(o, a),
      emitsOptions: $m(o, a),
      emit: null,
      emitted: null,
      propsDefaults: xe,
      inheritAttrs: o.inheritAttrs,
      ctx: xe,
      data: xe,
      props: xe,
      attrs: xe,
      slots: xe,
      refs: xe,
      setupState: xe,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (u.ctx = { _: u }),
    (u.root = e ? e.root : u),
    (u.emit = x1.bind(null, u)),
    t.ce && t.ce(u),
    u
  )
}
let je = null
const Cl = () => je || Ze
let Sh,
  Oo,
  wg = "__VUE_INSTANCE_SETTERS__"
;(Oo = af()[wg]) || (Oo = af()[wg] = []),
  Oo.push((t) => (je = t)),
  (Sh = (t) => {
    Oo.length > 1 ? Oo.forEach((e) => e(t)) : Oo[0](t)
  })
const Jo = (t) => {
    Sh(t), t.scope.on()
  },
  Zi = () => {
    je && je.scope.off(), Sh(null)
  }
function o0(t) {
  return t.vnode.shapeFlag & 4
}
let hl = !1
function S_(t, e = !1) {
  hl = e
  const { props: r, children: o } = t.vnode,
    a = o0(t)
  a_(t, r, a, e), f_(t, o)
  const u = a ? k_(t, e) : void 0
  return (hl = !1), u
}
function k_(t, e) {
  const r = t.type
  ;(t.accessCache = Object.create(null)), (t.proxy = ah(new Proxy(t.ctx, J1)))
  const { setup: o } = r
  if (o) {
    const a = (t.setupContext = o.length > 1 ? l0(t) : null)
    Jo(t), ls()
    const u = _i(o, t, 0, [t.props, a])
    if ((as(), Zi(), cm(u))) {
      if ((u.then(Zi, Zi), e))
        return u
          .then((f) => {
            _f(t, f, e)
          })
          .catch((f) => {
            kl(f, t, 0)
          })
      t.asyncDep = u
    } else _f(t, u, e)
  } else s0(t, e)
}
function _f(t, e, r) {
  Wt(e)
    ? t.type.__ssrInlineRender
      ? (t.ssrRender = e)
      : (t.render = e)
    : be(e) && (t.setupState = Am(e)),
    s0(t, r)
}
let xg
function s0(t, e, r) {
  const o = t.type
  if (!t.render) {
    if (!e && xg && !o.render) {
      const a = o.template || wh(t).template
      if (a) {
        const { isCustomElement: u, compilerOptions: f } = t.appContext.config,
          { delimiters: h, compilerOptions: p } = o,
          g = Re(Re({ isCustomElement: u, delimiters: h }, f), p)
        o.render = xg(a, g)
      }
    }
    t.render = o.render || vr
  }
  {
    Jo(t), ls()
    try {
      e_(t)
    } finally {
      as(), Zi()
    }
  }
}
function C_(t) {
  return (
    t.attrsProxy ||
    (t.attrsProxy = new Proxy(t.attrs, {
      get(e, r) {
        return Mn(t, "get", "$attrs"), e[r]
      },
    }))
  )
}
function l0(t) {
  const e = (r) => {
    t.exposed = r || {}
  }
  return {
    get attrs() {
      return C_(t)
    },
    slots: t.slots,
    emit: t.emit,
    expose: e,
  }
}
function Ec(t) {
  if (t.exposed)
    return (
      t.exposeProxy ||
      (t.exposeProxy = new Proxy(Am(ah(t.exposed)), {
        get(e, r) {
          if (r in e) return e[r]
          if (r in el) return el[r](t)
        },
        has(e, r) {
          return r in e || r in el
        },
      }))
    )
}
function T_(t, e = !0) {
  return Wt(t) ? t.displayName || t.name : t.name || (e && t.__name)
}
function E_(t) {
  return Wt(t) && "__vccOpts" in t
}
const xt = (t, e) => v1(t, e, hl)
function Tl(t, e, r) {
  const o = arguments.length
  return o === 2
    ? be(e) && !Rt(e)
      ? fl(e)
        ? Ft(t, null, [e])
        : Ft(t, e)
      : Ft(t, null, e)
    : (o > 3
        ? (r = Array.prototype.slice.call(arguments, 2))
        : o === 3 && fl(r) && (r = [r]),
      Ft(t, e, r))
}
const L_ = Symbol.for("v-scx"),
  A_ = () => Ir(L_),
  M_ = "3.3.8",
  N_ = "http://www.w3.org/2000/svg",
  Gi = typeof document < "u" ? document : null,
  _g = Gi && Gi.createElement("template"),
  P_ = {
    insert: (t, e, r) => {
      e.insertBefore(t, r || null)
    },
    remove: (t) => {
      const e = t.parentNode
      e && e.removeChild(t)
    },
    createElement: (t, e, r, o) => {
      const a = e
        ? Gi.createElementNS(N_, t)
        : Gi.createElement(t, r ? { is: r } : void 0)
      return (
        t === "select" &&
          o &&
          o.multiple != null &&
          a.setAttribute("multiple", o.multiple),
        a
      )
    },
    createText: (t) => Gi.createTextNode(t),
    createComment: (t) => Gi.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e
    },
    setElementText: (t, e) => {
      t.textContent = e
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => Gi.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "")
    },
    insertStaticContent(t, e, r, o, a, u) {
      const f = r ? r.previousSibling : e.lastChild
      if (a && (a === u || a.nextSibling))
        for (
          ;
          e.insertBefore(a.cloneNode(!0), r),
            !(a === u || !(a = a.nextSibling));

        );
      else {
        _g.innerHTML = o ? `<svg>${t}</svg>` : t
        const h = _g.content
        if (o) {
          const p = h.firstChild
          for (; p.firstChild; ) h.appendChild(p.firstChild)
          h.removeChild(p)
        }
        e.insertBefore(h, r)
      }
      return [
        f ? f.nextSibling : e.firstChild,
        r ? r.previousSibling : e.lastChild,
      ]
    },
  },
  ui = "transition",
  js = "animation",
  dl = Symbol("_vtc"),
  kh = (t, { slots: e }) => Tl(H1, O_(t), e)
kh.displayName = "Transition"
const a0 = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
kh.props = Re({}, Hm, a0)
const Bi = (t, e = []) => {
    Rt(t) ? t.forEach((r) => r(...e)) : t && t(...e)
  },
  Sg = (t) => (t ? (Rt(t) ? t.some((e) => e.length > 1) : t.length > 1) : !1)
function O_(t) {
  const e = {}
  for (const pt in t) pt in a0 || (e[pt] = t[pt])
  if (t.css === !1) return e
  const {
      name: r = "v",
      type: o,
      duration: a,
      enterFromClass: u = `${r}-enter-from`,
      enterActiveClass: f = `${r}-enter-active`,
      enterToClass: h = `${r}-enter-to`,
      appearFromClass: p = u,
      appearActiveClass: g = f,
      appearToClass: v = h,
      leaveFromClass: b = `${r}-leave-from`,
      leaveActiveClass: w = `${r}-leave-active`,
      leaveToClass: S = `${r}-leave-to`,
    } = t,
    N = D_(a),
    L = N && N[0],
    A = N && N[1],
    {
      onBeforeEnter: T,
      onEnter: M,
      onEnterCancelled: R,
      onLeave: E,
      onLeaveCancelled: W,
      onBeforeAppear: X = T,
      onAppear: ft = M,
      onAppearCancelled: Y = R,
    } = e,
    et = (pt, V, z) => {
      Wi(pt, V ? v : h), Wi(pt, V ? g : f), z && z()
    },
    st = (pt, V) => {
      ;(pt._isLeaving = !1), Wi(pt, b), Wi(pt, S), Wi(pt, w), V && V()
    },
    dt = (pt) => (V, z) => {
      const k = pt ? ft : M,
        q = () => et(V, pt, z)
      Bi(k, [V, q]),
        kg(() => {
          Wi(V, pt ? p : u), fi(V, pt ? v : h), Sg(k) || Cg(V, o, L, q)
        })
    }
  return Re(e, {
    onBeforeEnter(pt) {
      Bi(T, [pt]), fi(pt, u), fi(pt, f)
    },
    onBeforeAppear(pt) {
      Bi(X, [pt]), fi(pt, p), fi(pt, g)
    },
    onEnter: dt(!1),
    onAppear: dt(!0),
    onLeave(pt, V) {
      pt._isLeaving = !0
      const z = () => st(pt, V)
      fi(pt, b),
        z_(),
        fi(pt, w),
        kg(() => {
          pt._isLeaving && (Wi(pt, b), fi(pt, S), Sg(E) || Cg(pt, o, A, z))
        }),
        Bi(E, [pt, z])
    },
    onEnterCancelled(pt) {
      et(pt, !1), Bi(R, [pt])
    },
    onAppearCancelled(pt) {
      et(pt, !0), Bi(Y, [pt])
    },
    onLeaveCancelled(pt) {
      st(pt), Bi(W, [pt])
    },
  })
}
function D_(t) {
  if (t == null) return null
  if (be(t)) return [Bu(t.enter), Bu(t.leave)]
  {
    const e = Bu(t)
    return [e, e]
  }
}
function Bu(t) {
  return hm(t)
}
function fi(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.add(r)),
    (t[dl] || (t[dl] = new Set())).add(e)
}
function Wi(t, e) {
  e.split(/\s+/).forEach((o) => o && t.classList.remove(o))
  const r = t[dl]
  r && (r.delete(e), r.size || (t[dl] = void 0))
}
function kg(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t)
  })
}
let $_ = 0
function Cg(t, e, r, o) {
  const a = (t._endId = ++$_),
    u = () => {
      a === t._endId && o()
    }
  if (r) return setTimeout(u, r)
  const { type: f, timeout: h, propCount: p } = R_(t, e)
  if (!f) return o()
  const g = f + "end"
  let v = 0
  const b = () => {
      t.removeEventListener(g, w), u()
    },
    w = (S) => {
      S.target === t && ++v >= p && b()
    }
  setTimeout(() => {
    v < p && b()
  }, h + 1),
    t.addEventListener(g, w)
}
function R_(t, e) {
  const r = window.getComputedStyle(t),
    o = (N) => (r[N] || "").split(", "),
    a = o(`${ui}Delay`),
    u = o(`${ui}Duration`),
    f = Tg(a, u),
    h = o(`${js}Delay`),
    p = o(`${js}Duration`),
    g = Tg(h, p)
  let v = null,
    b = 0,
    w = 0
  e === ui
    ? f > 0 && ((v = ui), (b = f), (w = u.length))
    : e === js
      ? g > 0 && ((v = js), (b = g), (w = p.length))
      : ((b = Math.max(f, g)),
        (v = b > 0 ? (f > g ? ui : js) : null),
        (w = v ? (v === ui ? u.length : p.length) : 0))
  const S =
    v === ui && /\b(transform|all)(,|$)/.test(o(`${ui}Property`).toString())
  return { type: v, timeout: b, propCount: w, hasTransform: S }
}
function Tg(t, e) {
  for (; t.length < e.length; ) t = t.concat(t)
  return Math.max(...e.map((r, o) => Eg(r) + Eg(t[o])))
}
function Eg(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3
}
function z_() {
  return document.body.offsetHeight
}
function F_(t, e, r) {
  const o = t[dl]
  o && (e = (e ? [e, ...o] : [...o]).join(" ")),
    e == null
      ? t.removeAttribute("class")
      : r
        ? t.setAttribute("class", e)
        : (t.className = e)
}
const Ch = Symbol("_vod"),
  Sf = {
    beforeMount(t, { value: e }, { transition: r }) {
      ;(t[Ch] = t.style.display === "none" ? "" : t.style.display),
        r && e ? r.beforeEnter(t) : Gs(t, e)
    },
    mounted(t, { value: e }, { transition: r }) {
      r && e && r.enter(t)
    },
    updated(t, { value: e, oldValue: r }, { transition: o }) {
      !e != !r &&
        (o
          ? e
            ? (o.beforeEnter(t), Gs(t, !0), o.enter(t))
            : o.leave(t, () => {
                Gs(t, !1)
              })
          : Gs(t, e))
    },
    beforeUnmount(t, { value: e }) {
      Gs(t, e)
    },
  }
function Gs(t, e) {
  t.style.display = e ? t[Ch] : "none"
}
function I_(t, e, r) {
  const o = t.style,
    a = ze(r)
  if (r && !a) {
    if (e && !ze(e)) for (const u in e) r[u] == null && kf(o, u, "")
    for (const u in r) kf(o, u, r[u])
  } else {
    const u = o.display
    a ? e !== r && (o.cssText = r) : e && t.removeAttribute("style"),
      Ch in t && (o.display = u)
  }
}
const Lg = /\s*!important$/
function kf(t, e, r) {
  if (Rt(r)) r.forEach((o) => kf(t, e, o))
  else if ((r == null && (r = ""), e.startsWith("--"))) t.setProperty(e, r)
  else {
    const o = q_(t, e)
    Lg.test(r)
      ? t.setProperty(so(o), r.replace(Lg, ""), "important")
      : (t[o] = r)
  }
}
const Ag = ["Webkit", "Moz", "ms"],
  Wu = {}
function q_(t, e) {
  const r = Wu[e]
  if (r) return r
  let o = yr(e)
  if (o !== "filter" && o in t) return (Wu[e] = o)
  o = yc(o)
  for (let a = 0; a < Ag.length; a++) {
    const u = Ag[a] + o
    if (u in t) return (Wu[e] = u)
  }
  return e
}
const Mg = "http://www.w3.org/1999/xlink"
function H_(t, e, r, o, a) {
  if (o && e.startsWith("xlink:"))
    r == null
      ? t.removeAttributeNS(Mg, e.slice(6, e.length))
      : t.setAttributeNS(Mg, e, r)
  else {
    const u = zx(e)
    r == null || (u && !dm(r))
      ? t.removeAttribute(e)
      : t.setAttribute(e, u ? "" : r)
  }
}
function B_(t, e, r, o, a, u, f) {
  if (e === "innerHTML" || e === "textContent") {
    o && f(o, a, u), (t[e] = r ?? "")
    return
  }
  const h = t.tagName
  if (e === "value" && h !== "PROGRESS" && !h.includes("-")) {
    t._value = r
    const g = h === "OPTION" ? t.getAttribute("value") : t.value,
      v = r ?? ""
    g !== v && (t.value = v), r == null && t.removeAttribute(e)
    return
  }
  let p = !1
  if (r === "" || r == null) {
    const g = typeof t[e]
    g === "boolean"
      ? (r = dm(r))
      : r == null && g === "string"
        ? ((r = ""), (p = !0))
        : g === "number" && ((r = 0), (p = !0))
  }
  try {
    t[e] = r
  } catch {}
  p && t.removeAttribute(e)
}
function $o(t, e, r, o) {
  t.addEventListener(e, r, o)
}
function W_(t, e, r, o) {
  t.removeEventListener(e, r, o)
}
const Ng = Symbol("_vei")
function U_(t, e, r, o, a = null) {
  const u = t[Ng] || (t[Ng] = {}),
    f = u[e]
  if (o && f) f.value = o
  else {
    const [h, p] = j_(e)
    if (o) {
      const g = (u[e] = K_(o, a))
      $o(t, h, g, p)
    } else f && (W_(t, h, f, p), (u[e] = void 0))
  }
}
const Pg = /(?:Once|Passive|Capture)$/
function j_(t) {
  let e
  if (Pg.test(t)) {
    e = {}
    let o
    for (; (o = t.match(Pg)); )
      (t = t.slice(0, t.length - o[0].length)), (e[o[0].toLowerCase()] = !0)
  }
  return [t[2] === ":" ? t.slice(3) : so(t.slice(2)), e]
}
let Uu = 0
const G_ = Promise.resolve(),
  V_ = () => Uu || (G_.then(() => (Uu = 0)), (Uu = Date.now()))
function K_(t, e) {
  const r = (o) => {
    if (!o._vts) o._vts = Date.now()
    else if (o._vts <= r.attached) return
    Wn(X_(o, r.value), e, 5, [o])
  }
  return (r.value = t), (r.attached = V_()), r
}
function X_(t, e) {
  if (Rt(e)) {
    const r = t.stopImmediatePropagation
    return (
      (t.stopImmediatePropagation = () => {
        r.call(t), (t._stopped = !0)
      }),
      e.map((o) => (a) => !a._stopped && o && o(a))
    )
  } else return e
}
const Og = /^on[a-z]/,
  Y_ = (t, e, r, o, a = !1, u, f, h, p) => {
    e === "class"
      ? F_(t, o, a)
      : e === "style"
        ? I_(t, r, o)
        : pc(e)
          ? th(e) || U_(t, e, r, o, f)
          : (
                e[0] === "."
                  ? ((e = e.slice(1)), !0)
                  : e[0] === "^"
                    ? ((e = e.slice(1)), !1)
                    : Z_(t, e, o, a)
              )
            ? B_(t, e, o, u, f, h, p)
            : (e === "true-value"
                ? (t._trueValue = o)
                : e === "false-value" && (t._falseValue = o),
              H_(t, e, o, a))
  }
function Z_(t, e, r, o) {
  return o
    ? !!(
        e === "innerHTML" ||
        e === "textContent" ||
        (e in t && Og.test(e) && Wt(r))
      )
    : e === "spellcheck" ||
        e === "draggable" ||
        e === "translate" ||
        e === "form" ||
        (e === "list" && t.tagName === "INPUT") ||
        (e === "type" && t.tagName === "TEXTAREA") ||
        (Og.test(e) && ze(r))
      ? !1
      : e in t
}
const Dg = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1
  return Rt(e) ? (r) => Oa(e, r) : e
}
function J_(t) {
  t.target.composing = !0
}
function $g(t) {
  const e = t.target
  e.composing && ((e.composing = !1), e.dispatchEvent(new Event("input")))
}
const ju = Symbol("_assign"),
  Q_ = {
    created(t, { modifiers: { lazy: e, trim: r, number: o } }, a) {
      t[ju] = Dg(a)
      const u = o || (a.props && a.props.type === "number")
      $o(t, e ? "change" : "input", (f) => {
        if (f.target.composing) return
        let h = t.value
        r && (h = h.trim()), u && (h = lf(h)), t[ju](h)
      }),
        r &&
          $o(t, "change", () => {
            t.value = t.value.trim()
          }),
        e ||
          ($o(t, "compositionstart", J_),
          $o(t, "compositionend", $g),
          $o(t, "change", $g))
    },
    mounted(t, { value: e }) {
      t.value = e ?? ""
    },
    beforeUpdate(
      t,
      { value: e, modifiers: { lazy: r, trim: o, number: a } },
      u,
    ) {
      if (
        ((t[ju] = Dg(u)),
        t.composing ||
          (document.activeElement === t &&
            t.type !== "range" &&
            (r ||
              (o && t.value.trim() === e) ||
              ((a || t.type === "number") && lf(t.value) === e))))
      )
        return
      const f = e ?? ""
      t.value !== f && (t.value = f)
    },
  },
  tS = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Cf = (t, e) => (r) => {
    if (!("key" in r)) return
    const o = so(r.key)
    if (e.some((a) => a === o || tS[a] === o)) return t(r)
  },
  eS = Re({ patchProp: Y_ }, P_)
let Rg
function nS() {
  return Rg || (Rg = d_(eS))
}
const c0 = (...t) => {
  const e = nS().createApp(...t),
    { mount: r } = e
  return (
    (e.mount = (o) => {
      const a = rS(o)
      if (!a) return
      const u = e._component
      !Wt(u) && !u.render && !u.template && (u.template = a.innerHTML),
        (a.innerHTML = "")
      const f = r(a, !1, a instanceof SVGElement)
      return (
        a instanceof Element &&
          (a.removeAttribute("v-cloak"), a.setAttribute("data-v-app", "")),
        f
      )
    }),
    e
  )
}
function rS(t) {
  return ze(t) ? document.querySelector(t) : t
}
const ao = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, a] of e) r[o] = a
    return r
  },
  iS = {}
function oS(t, e) {
  const r = eo("RouterView")
  return lt(), Jt(r)
}
const sS = ao(iS, [["render", oS]])
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Ro = typeof window < "u"
function lS(t) {
  return t.__esModule || t[Symbol.toStringTag] === "Module"
}
const pe = Object.assign
function Gu(t, e) {
  const r = {}
  for (const o in e) {
    const a = e[o]
    r[o] = nr(a) ? a.map(t) : t(a)
  }
  return r
}
const rl = () => {},
  nr = Array.isArray,
  aS = /\/$/,
  cS = (t) => t.replace(aS, "")
function Vu(t, e, r = "/") {
  let o,
    a = {},
    u = "",
    f = ""
  const h = e.indexOf("#")
  let p = e.indexOf("?")
  return (
    h < p && h >= 0 && (p = -1),
    p > -1 &&
      ((o = e.slice(0, p)),
      (u = e.slice(p + 1, h > -1 ? h : e.length)),
      (a = t(u))),
    h > -1 && ((o = o || e.slice(0, h)), (f = e.slice(h, e.length))),
    (o = dS(o ?? e, r)),
    { fullPath: o + (u && "?") + u + f, path: o, query: a, hash: f }
  )
}
function uS(t, e) {
  const r = e.query ? t(e.query) : ""
  return e.path + (r && "?") + r + (e.hash || "")
}
function zg(t, e) {
  return !e || !t.toLowerCase().startsWith(e.toLowerCase())
    ? t
    : t.slice(e.length) || "/"
}
function fS(t, e, r) {
  const o = e.matched.length - 1,
    a = r.matched.length - 1
  return (
    o > -1 &&
    o === a &&
    Qo(e.matched[o], r.matched[a]) &&
    u0(e.params, r.params) &&
    t(e.query) === t(r.query) &&
    e.hash === r.hash
  )
}
function Qo(t, e) {
  return (t.aliasOf || t) === (e.aliasOf || e)
}
function u0(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1
  for (const r in t) if (!hS(t[r], e[r])) return !1
  return !0
}
function hS(t, e) {
  return nr(t) ? Fg(t, e) : nr(e) ? Fg(e, t) : t === e
}
function Fg(t, e) {
  return nr(e)
    ? t.length === e.length && t.every((r, o) => r === e[o])
    : t.length === 1 && t[0] === e
}
function dS(t, e) {
  if (t.startsWith("/")) return t
  if (!t) return e
  const r = e.split("/"),
    o = t.split("/"),
    a = o[o.length - 1]
  ;(a === ".." || a === ".") && o.push("")
  let u = r.length - 1,
    f,
    h
  for (f = 0; f < o.length; f++)
    if (((h = o[f]), h !== "."))
      if (h === "..") u > 1 && u--
      else break
  return (
    r.slice(0, u).join("/") +
    "/" +
    o.slice(f - (f === o.length ? 1 : 0)).join("/")
  )
}
var pl
;(function (t) {
  ;(t.pop = "pop"), (t.push = "push")
})(pl || (pl = {}))
var il
;(function (t) {
  ;(t.back = "back"), (t.forward = "forward"), (t.unknown = "")
})(il || (il = {}))
function pS(t) {
  if (!t)
    if (Ro) {
      const e = document.querySelector("base")
      ;(t = (e && e.getAttribute("href")) || "/"),
        (t = t.replace(/^\w+:\/\/[^\/]+/, ""))
    } else t = "/"
  return t[0] !== "/" && t[0] !== "#" && (t = "/" + t), cS(t)
}
const gS = /^[^#]+#/
function vS(t, e) {
  return t.replace(gS, "#") + e
}
function mS(t, e) {
  const r = document.documentElement.getBoundingClientRect(),
    o = t.getBoundingClientRect()
  return {
    behavior: e.behavior,
    left: o.left - r.left - (e.left || 0),
    top: o.top - r.top - (e.top || 0),
  }
}
const Lc = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function yS(t) {
  let e
  if ("el" in t) {
    const r = t.el,
      o = typeof r == "string" && r.startsWith("#"),
      a =
        typeof r == "string"
          ? o
            ? document.getElementById(r.slice(1))
            : document.querySelector(r)
          : r
    if (!a) return
    e = mS(a, t)
  } else e = t
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(e)
    : window.scrollTo(
        e.left != null ? e.left : window.pageXOffset,
        e.top != null ? e.top : window.pageYOffset,
      )
}
function Ig(t, e) {
  return (history.state ? history.state.position - e : -1) + t
}
const Tf = new Map()
function bS(t, e) {
  Tf.set(t, e)
}
function wS(t) {
  const e = Tf.get(t)
  return Tf.delete(t), e
}
let xS = () => location.protocol + "//" + location.host
function f0(t, e) {
  const { pathname: r, search: o, hash: a } = e,
    u = t.indexOf("#")
  if (u > -1) {
    let h = a.includes(t.slice(u)) ? t.slice(u).length : 1,
      p = a.slice(h)
    return p[0] !== "/" && (p = "/" + p), zg(p, "")
  }
  return zg(r, t) + o + a
}
function _S(t, e, r, o) {
  let a = [],
    u = [],
    f = null
  const h = ({ state: w }) => {
    const S = f0(t, location),
      N = r.value,
      L = e.value
    let A = 0
    if (w) {
      if (((r.value = S), (e.value = w), f && f === N)) {
        f = null
        return
      }
      A = L ? w.position - L.position : 0
    } else o(S)
    a.forEach((T) => {
      T(r.value, N, {
        delta: A,
        type: pl.pop,
        direction: A ? (A > 0 ? il.forward : il.back) : il.unknown,
      })
    })
  }
  function p() {
    f = r.value
  }
  function g(w) {
    a.push(w)
    const S = () => {
      const N = a.indexOf(w)
      N > -1 && a.splice(N, 1)
    }
    return u.push(S), S
  }
  function v() {
    const { history: w } = window
    w.state && w.replaceState(pe({}, w.state, { scroll: Lc() }), "")
  }
  function b() {
    for (const w of u) w()
    ;(u = []),
      window.removeEventListener("popstate", h),
      window.removeEventListener("beforeunload", v)
  }
  return (
    window.addEventListener("popstate", h),
    window.addEventListener("beforeunload", v, { passive: !0 }),
    { pauseListeners: p, listen: g, destroy: b }
  )
}
function qg(t, e, r, o = !1, a = !1) {
  return {
    back: t,
    current: e,
    forward: r,
    replaced: o,
    position: window.history.length,
    scroll: a ? Lc() : null,
  }
}
function SS(t) {
  const { history: e, location: r } = window,
    o = { value: f0(t, r) },
    a = { value: e.state }
  a.value ||
    u(
      o.value,
      {
        back: null,
        current: o.value,
        forward: null,
        position: e.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    )
  function u(p, g, v) {
    const b = t.indexOf("#"),
      w =
        b > -1
          ? (r.host && document.querySelector("base") ? t : t.slice(b)) + p
          : xS() + t + p
    try {
      e[v ? "replaceState" : "pushState"](g, "", w), (a.value = g)
    } catch (S) {
      console.error(S), r[v ? "replace" : "assign"](w)
    }
  }
  function f(p, g) {
    const v = pe({}, e.state, qg(a.value.back, p, a.value.forward, !0), g, {
      position: a.value.position,
    })
    u(p, v, !0), (o.value = p)
  }
  function h(p, g) {
    const v = pe({}, a.value, e.state, { forward: p, scroll: Lc() })
    u(v.current, v, !0)
    const b = pe({}, qg(o.value, p, null), { position: v.position + 1 }, g)
    u(p, b, !1), (o.value = p)
  }
  return { location: o, state: a, push: h, replace: f }
}
function kS(t) {
  t = pS(t)
  const e = SS(t),
    r = _S(t, e.state, e.location, e.replace)
  function o(u, f = !0) {
    f || r.pauseListeners(), history.go(u)
  }
  const a = pe(
    { location: "", base: t, go: o, createHref: vS.bind(null, t) },
    e,
    r,
  )
  return (
    Object.defineProperty(a, "location", {
      enumerable: !0,
      get: () => e.location.value,
    }),
    Object.defineProperty(a, "state", {
      enumerable: !0,
      get: () => e.state.value,
    }),
    a
  )
}
function CS(t) {
  return (
    (t = location.host ? t || location.pathname + location.search : ""),
    t.includes("#") || (t += "#"),
    kS(t)
  )
}
function TS(t) {
  return typeof t == "string" || (t && typeof t == "object")
}
function h0(t) {
  return typeof t == "string" || typeof t == "symbol"
}
const hi = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  d0 = Symbol("")
var Hg
;(function (t) {
  ;(t[(t.aborted = 4)] = "aborted"),
    (t[(t.cancelled = 8)] = "cancelled"),
    (t[(t.duplicated = 16)] = "duplicated")
})(Hg || (Hg = {}))
function ts(t, e) {
  return pe(new Error(), { type: t, [d0]: !0 }, e)
}
function Pr(t, e) {
  return t instanceof Error && d0 in t && (e == null || !!(t.type & e))
}
const Bg = "[^/]+?",
  ES = { sensitive: !1, strict: !1, start: !0, end: !0 },
  LS = /[.+*?^${}()[\]/\\]/g
function AS(t, e) {
  const r = pe({}, ES, e),
    o = []
  let a = r.start ? "^" : ""
  const u = []
  for (const g of t) {
    const v = g.length ? [] : [90]
    r.strict && !g.length && (a += "/")
    for (let b = 0; b < g.length; b++) {
      const w = g[b]
      let S = 40 + (r.sensitive ? 0.25 : 0)
      if (w.type === 0)
        b || (a += "/"), (a += w.value.replace(LS, "\\$&")), (S += 40)
      else if (w.type === 1) {
        const { value: N, repeatable: L, optional: A, regexp: T } = w
        u.push({ name: N, repeatable: L, optional: A })
        const M = T || Bg
        if (M !== Bg) {
          S += 10
          try {
            new RegExp(`(${M})`)
          } catch (E) {
            throw new Error(
              `Invalid custom RegExp for param "${N}" (${M}): ` + E.message,
            )
          }
        }
        let R = L ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`
        b || (R = A && g.length < 2 ? `(?:/${R})` : "/" + R),
          A && (R += "?"),
          (a += R),
          (S += 20),
          A && (S += -8),
          L && (S += -20),
          M === ".*" && (S += -50)
      }
      v.push(S)
    }
    o.push(v)
  }
  if (r.strict && r.end) {
    const g = o.length - 1
    o[g][o[g].length - 1] += 0.7000000000000001
  }
  r.strict || (a += "/?"), r.end ? (a += "$") : r.strict && (a += "(?:/|$)")
  const f = new RegExp(a, r.sensitive ? "" : "i")
  function h(g) {
    const v = g.match(f),
      b = {}
    if (!v) return null
    for (let w = 1; w < v.length; w++) {
      const S = v[w] || "",
        N = u[w - 1]
      b[N.name] = S && N.repeatable ? S.split("/") : S
    }
    return b
  }
  function p(g) {
    let v = "",
      b = !1
    for (const w of t) {
      ;(!b || !v.endsWith("/")) && (v += "/"), (b = !1)
      for (const S of w)
        if (S.type === 0) v += S.value
        else if (S.type === 1) {
          const { value: N, repeatable: L, optional: A } = S,
            T = N in g ? g[N] : ""
          if (nr(T) && !L)
            throw new Error(
              `Provided param "${N}" is an array but it is not repeatable (* or + modifiers)`,
            )
          const M = nr(T) ? T.join("/") : T
          if (!M)
            if (A)
              w.length < 2 &&
                (v.endsWith("/") ? (v = v.slice(0, -1)) : (b = !0))
            else throw new Error(`Missing required param "${N}"`)
          v += M
        }
    }
    return v || "/"
  }
  return { re: f, score: o, keys: u, parse: h, stringify: p }
}
function MS(t, e) {
  let r = 0
  for (; r < t.length && r < e.length; ) {
    const o = e[r] - t[r]
    if (o) return o
    r++
  }
  return t.length < e.length
    ? t.length === 1 && t[0] === 40 + 40
      ? -1
      : 1
    : t.length > e.length
      ? e.length === 1 && e[0] === 40 + 40
        ? 1
        : -1
      : 0
}
function NS(t, e) {
  let r = 0
  const o = t.score,
    a = e.score
  for (; r < o.length && r < a.length; ) {
    const u = MS(o[r], a[r])
    if (u) return u
    r++
  }
  if (Math.abs(a.length - o.length) === 1) {
    if (Wg(o)) return 1
    if (Wg(a)) return -1
  }
  return a.length - o.length
}
function Wg(t) {
  const e = t[t.length - 1]
  return t.length > 0 && e[e.length - 1] < 0
}
const PS = { type: 0, value: "" },
  OS = /[a-zA-Z0-9_]/
function DS(t) {
  if (!t) return [[]]
  if (t === "/") return [[PS]]
  if (!t.startsWith("/")) throw new Error(`Invalid path "${t}"`)
  function e(S) {
    throw new Error(`ERR (${r})/"${g}": ${S}`)
  }
  let r = 0,
    o = r
  const a = []
  let u
  function f() {
    u && a.push(u), (u = [])
  }
  let h = 0,
    p,
    g = "",
    v = ""
  function b() {
    g &&
      (r === 0
        ? u.push({ type: 0, value: g })
        : r === 1 || r === 2 || r === 3
          ? (u.length > 1 &&
              (p === "*" || p === "+") &&
              e(
                `A repeatable param (${g}) must be alone in its segment. eg: '/:ids+.`,
              ),
            u.push({
              type: 1,
              value: g,
              regexp: v,
              repeatable: p === "*" || p === "+",
              optional: p === "*" || p === "?",
            }))
          : e("Invalid state to consume buffer"),
      (g = ""))
  }
  function w() {
    g += p
  }
  for (; h < t.length; ) {
    if (((p = t[h++]), p === "\\" && r !== 2)) {
      ;(o = r), (r = 4)
      continue
    }
    switch (r) {
      case 0:
        p === "/" ? (g && b(), f()) : p === ":" ? (b(), (r = 1)) : w()
        break
      case 4:
        w(), (r = o)
        break
      case 1:
        p === "("
          ? (r = 2)
          : OS.test(p)
            ? w()
            : (b(), (r = 0), p !== "*" && p !== "?" && p !== "+" && h--)
        break
      case 2:
        p === ")"
          ? v[v.length - 1] == "\\"
            ? (v = v.slice(0, -1) + p)
            : (r = 3)
          : (v += p)
        break
      case 3:
        b(), (r = 0), p !== "*" && p !== "?" && p !== "+" && h--, (v = "")
        break
      default:
        e("Unknown state")
        break
    }
  }
  return r === 2 && e(`Unfinished custom RegExp for param "${g}"`), b(), f(), a
}
function $S(t, e, r) {
  const o = AS(DS(t.path), r),
    a = pe(o, { record: t, parent: e, children: [], alias: [] })
  return e && !a.record.aliasOf == !e.record.aliasOf && e.children.push(a), a
}
function RS(t, e) {
  const r = [],
    o = new Map()
  e = Gg({ strict: !1, end: !0, sensitive: !1 }, e)
  function a(v) {
    return o.get(v)
  }
  function u(v, b, w) {
    const S = !w,
      N = zS(v)
    N.aliasOf = w && w.record
    const L = Gg(e, v),
      A = [N]
    if ("alias" in v) {
      const R = typeof v.alias == "string" ? [v.alias] : v.alias
      for (const E of R)
        A.push(
          pe({}, N, {
            components: w ? w.record.components : N.components,
            path: E,
            aliasOf: w ? w.record : N,
          }),
        )
    }
    let T, M
    for (const R of A) {
      const { path: E } = R
      if (b && E[0] !== "/") {
        const W = b.record.path,
          X = W[W.length - 1] === "/" ? "" : "/"
        R.path = b.record.path + (E && X + E)
      }
      if (
        ((T = $S(R, b, L)),
        w
          ? w.alias.push(T)
          : ((M = M || T),
            M !== T && M.alias.push(T),
            S && v.name && !jg(T) && f(v.name)),
        N.children)
      ) {
        const W = N.children
        for (let X = 0; X < W.length; X++) u(W[X], T, w && w.children[X])
      }
      ;(w = w || T),
        ((T.record.components && Object.keys(T.record.components).length) ||
          T.record.name ||
          T.record.redirect) &&
          p(T)
    }
    return M
      ? () => {
          f(M)
        }
      : rl
  }
  function f(v) {
    if (h0(v)) {
      const b = o.get(v)
      b &&
        (o.delete(v),
        r.splice(r.indexOf(b), 1),
        b.children.forEach(f),
        b.alias.forEach(f))
    } else {
      const b = r.indexOf(v)
      b > -1 &&
        (r.splice(b, 1),
        v.record.name && o.delete(v.record.name),
        v.children.forEach(f),
        v.alias.forEach(f))
    }
  }
  function h() {
    return r
  }
  function p(v) {
    let b = 0
    for (
      ;
      b < r.length &&
      NS(v, r[b]) >= 0 &&
      (v.record.path !== r[b].record.path || !p0(v, r[b]));

    )
      b++
    r.splice(b, 0, v), v.record.name && !jg(v) && o.set(v.record.name, v)
  }
  function g(v, b) {
    let w,
      S = {},
      N,
      L
    if ("name" in v && v.name) {
      if (((w = o.get(v.name)), !w)) throw ts(1, { location: v })
      ;(L = w.record.name),
        (S = pe(
          Ug(
            b.params,
            w.keys.filter((M) => !M.optional).map((M) => M.name),
          ),
          v.params &&
            Ug(
              v.params,
              w.keys.map((M) => M.name),
            ),
        )),
        (N = w.stringify(S))
    } else if ("path" in v)
      (N = v.path),
        (w = r.find((M) => M.re.test(N))),
        w && ((S = w.parse(N)), (L = w.record.name))
    else {
      if (((w = b.name ? o.get(b.name) : r.find((M) => M.re.test(b.path))), !w))
        throw ts(1, { location: v, currentLocation: b })
      ;(L = w.record.name),
        (S = pe({}, b.params, v.params)),
        (N = w.stringify(S))
    }
    const A = []
    let T = w
    for (; T; ) A.unshift(T.record), (T = T.parent)
    return { name: L, path: N, params: S, matched: A, meta: IS(A) }
  }
  return (
    t.forEach((v) => u(v)),
    {
      addRoute: u,
      resolve: g,
      removeRoute: f,
      getRoutes: h,
      getRecordMatcher: a,
    }
  )
}
function Ug(t, e) {
  const r = {}
  for (const o of e) o in t && (r[o] = t[o])
  return r
}
function zS(t) {
  return {
    path: t.path,
    redirect: t.redirect,
    name: t.name,
    meta: t.meta || {},
    aliasOf: void 0,
    beforeEnter: t.beforeEnter,
    props: FS(t),
    children: t.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in t
        ? t.components || null
        : t.component && { default: t.component },
  }
}
function FS(t) {
  const e = {},
    r = t.props || !1
  if ("component" in t) e.default = r
  else for (const o in t.components) e[o] = typeof r == "object" ? r[o] : r
  return e
}
function jg(t) {
  for (; t; ) {
    if (t.record.aliasOf) return !0
    t = t.parent
  }
  return !1
}
function IS(t) {
  return t.reduce((e, r) => pe(e, r.meta), {})
}
function Gg(t, e) {
  const r = {}
  for (const o in t) r[o] = o in e ? e[o] : t[o]
  return r
}
function p0(t, e) {
  return e.children.some((r) => r === t || p0(t, r))
}
const g0 = /#/g,
  qS = /&/g,
  HS = /\//g,
  BS = /=/g,
  WS = /\?/g,
  v0 = /\+/g,
  US = /%5B/g,
  jS = /%5D/g,
  m0 = /%5E/g,
  GS = /%60/g,
  y0 = /%7B/g,
  VS = /%7C/g,
  b0 = /%7D/g,
  KS = /%20/g
function Th(t) {
  return encodeURI("" + t)
    .replace(VS, "|")
    .replace(US, "[")
    .replace(jS, "]")
}
function XS(t) {
  return Th(t).replace(y0, "{").replace(b0, "}").replace(m0, "^")
}
function Ef(t) {
  return Th(t)
    .replace(v0, "%2B")
    .replace(KS, "+")
    .replace(g0, "%23")
    .replace(qS, "%26")
    .replace(GS, "`")
    .replace(y0, "{")
    .replace(b0, "}")
    .replace(m0, "^")
}
function YS(t) {
  return Ef(t).replace(BS, "%3D")
}
function ZS(t) {
  return Th(t).replace(g0, "%23").replace(WS, "%3F")
}
function JS(t) {
  return t == null ? "" : ZS(t).replace(HS, "%2F")
}
function Za(t) {
  try {
    return decodeURIComponent("" + t)
  } catch {}
  return "" + t
}
function QS(t) {
  const e = {}
  if (t === "" || t === "?") return e
  const o = (t[0] === "?" ? t.slice(1) : t).split("&")
  for (let a = 0; a < o.length; ++a) {
    const u = o[a].replace(v0, " "),
      f = u.indexOf("="),
      h = Za(f < 0 ? u : u.slice(0, f)),
      p = f < 0 ? null : Za(u.slice(f + 1))
    if (h in e) {
      let g = e[h]
      nr(g) || (g = e[h] = [g]), g.push(p)
    } else e[h] = p
  }
  return e
}
function Vg(t) {
  let e = ""
  for (let r in t) {
    const o = t[r]
    if (((r = YS(r)), o == null)) {
      o !== void 0 && (e += (e.length ? "&" : "") + r)
      continue
    }
    ;(nr(o) ? o.map((u) => u && Ef(u)) : [o && Ef(o)]).forEach((u) => {
      u !== void 0 &&
        ((e += (e.length ? "&" : "") + r), u != null && (e += "=" + u))
    })
  }
  return e
}
function tk(t) {
  const e = {}
  for (const r in t) {
    const o = t[r]
    o !== void 0 &&
      (e[r] = nr(o)
        ? o.map((a) => (a == null ? null : "" + a))
        : o == null
          ? o
          : "" + o)
  }
  return e
}
const ek = Symbol(""),
  Kg = Symbol(""),
  Eh = Symbol(""),
  w0 = Symbol(""),
  Lf = Symbol("")
function Vs() {
  let t = []
  function e(o) {
    return (
      t.push(o),
      () => {
        const a = t.indexOf(o)
        a > -1 && t.splice(a, 1)
      }
    )
  }
  function r() {
    t = []
  }
  return { add: e, list: () => t.slice(), reset: r }
}
function vi(t, e, r, o, a) {
  const u = o && (o.enterCallbacks[a] = o.enterCallbacks[a] || [])
  return () =>
    new Promise((f, h) => {
      const p = (b) => {
          b === !1
            ? h(ts(4, { from: r, to: e }))
            : b instanceof Error
              ? h(b)
              : TS(b)
                ? h(ts(2, { from: e, to: b }))
                : (u &&
                    o.enterCallbacks[a] === u &&
                    typeof b == "function" &&
                    u.push(b),
                  f())
        },
        g = t.call(o && o.instances[a], e, r, p)
      let v = Promise.resolve(g)
      t.length < 3 && (v = v.then(p)), v.catch((b) => h(b))
    })
}
function Ku(t, e, r, o) {
  const a = []
  for (const u of t)
    for (const f in u.components) {
      let h = u.components[f]
      if (!(e !== "beforeRouteEnter" && !u.instances[f]))
        if (nk(h)) {
          const g = (h.__vccOpts || h)[e]
          g && a.push(vi(g, r, o, u, f))
        } else {
          let p = h()
          a.push(() =>
            p.then((g) => {
              if (!g)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${f}" at "${u.path}"`),
                )
              const v = lS(g) ? g.default : g
              u.components[f] = v
              const w = (v.__vccOpts || v)[e]
              return w && vi(w, r, o, u, f)()
            }),
          )
        }
    }
  return a
}
function nk(t) {
  return (
    typeof t == "object" ||
    "displayName" in t ||
    "props" in t ||
    "__vccOpts" in t
  )
}
function Xg(t) {
  const e = Ir(Eh),
    r = Ir(w0),
    o = xt(() => e.resolve(G(t.to))),
    a = xt(() => {
      const { matched: p } = o.value,
        { length: g } = p,
        v = p[g - 1],
        b = r.matched
      if (!v || !b.length) return -1
      const w = b.findIndex(Qo.bind(null, v))
      if (w > -1) return w
      const S = Yg(p[g - 2])
      return g > 1 && Yg(v) === S && b[b.length - 1].path !== S
        ? b.findIndex(Qo.bind(null, p[g - 2]))
        : w
    }),
    u = xt(() => a.value > -1 && sk(r.params, o.value.params)),
    f = xt(
      () =>
        a.value > -1 &&
        a.value === r.matched.length - 1 &&
        u0(r.params, o.value.params),
    )
  function h(p = {}) {
    return ok(p)
      ? e[G(t.replace) ? "replace" : "push"](G(t.to)).catch(rl)
      : Promise.resolve()
  }
  return {
    route: o,
    href: xt(() => o.value.href),
    isActive: u,
    isExactActive: f,
    navigate: h,
  }
}
const rk = re({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Xg,
    setup(t, { slots: e }) {
      const r = Bn(Xg(t)),
        { options: o } = Ir(Eh),
        a = xt(() => ({
          [Zg(t.activeClass, o.linkActiveClass, "router-link-active")]:
            r.isActive,
          [Zg(
            t.exactActiveClass,
            o.linkExactActiveClass,
            "router-link-exact-active",
          )]: r.isExactActive,
        }))
      return () => {
        const u = e.default && e.default(r)
        return t.custom
          ? u
          : Tl(
              "a",
              {
                "aria-current": r.isExactActive ? t.ariaCurrentValue : null,
                "href": r.href,
                "onClick": r.navigate,
                "class": a.value,
              },
              u,
            )
      }
    },
  }),
  ik = rk
function ok(t) {
  if (
    !(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey) &&
    !t.defaultPrevented &&
    !(t.button !== void 0 && t.button !== 0)
  ) {
    if (t.currentTarget && t.currentTarget.getAttribute) {
      const e = t.currentTarget.getAttribute("target")
      if (/\b_blank\b/i.test(e)) return
    }
    return t.preventDefault && t.preventDefault(), !0
  }
}
function sk(t, e) {
  for (const r in e) {
    const o = e[r],
      a = t[r]
    if (typeof o == "string") {
      if (o !== a) return !1
    } else if (!nr(a) || a.length !== o.length || o.some((u, f) => u !== a[f]))
      return !1
  }
  return !0
}
function Yg(t) {
  return t ? (t.aliasOf ? t.aliasOf.path : t.path) : ""
}
const Zg = (t, e, r) => t ?? e ?? r,
  lk = re({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(t, { attrs: e, slots: r }) {
      const o = Ir(Lf),
        a = xt(() => t.route || o.value),
        u = Ir(Kg, 0),
        f = xt(() => {
          let g = G(u)
          const { matched: v } = a.value
          let b
          for (; (b = v[g]) && !b.components; ) g++
          return g
        }),
        h = xt(() => a.value.matched[f.value])
      Da(
        Kg,
        xt(() => f.value + 1),
      ),
        Da(ek, h),
        Da(Lf, a)
      const p = Vt()
      return (
        $e(
          () => [p.value, h.value, t.name],
          ([g, v, b], [w, S, N]) => {
            v &&
              ((v.instances[b] = g),
              S &&
                S !== v &&
                g &&
                g === w &&
                (v.leaveGuards.size || (v.leaveGuards = S.leaveGuards),
                v.updateGuards.size || (v.updateGuards = S.updateGuards))),
              g &&
                v &&
                (!S || !Qo(v, S) || !w) &&
                (v.enterCallbacks[b] || []).forEach((L) => L(g))
          },
          { flush: "post" },
        ),
        () => {
          const g = a.value,
            v = t.name,
            b = h.value,
            w = b && b.components[v]
          if (!w) return Jg(r.default, { Component: w, route: g })
          const S = b.props[v],
            N = S
              ? S === !0
                ? g.params
                : typeof S == "function"
                  ? S(g)
                  : S
              : null,
            A = Tl(
              w,
              pe({}, N, e, {
                onVnodeUnmounted: (T) => {
                  T.component.isUnmounted && (b.instances[v] = null)
                },
                ref: p,
              }),
            )
          return Jg(r.default, { Component: A, route: g }) || A
        }
      )
    },
  })
function Jg(t, e) {
  if (!t) return null
  const r = t(e)
  return r.length === 1 ? r[0] : r
}
const ak = lk
function ck(t) {
  const e = RS(t.routes, t),
    r = t.parseQuery || QS,
    o = t.stringifyQuery || Vg,
    a = t.history,
    u = Vs(),
    f = Vs(),
    h = Vs(),
    p = cs(hi)
  let g = hi
  Ro &&
    t.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual")
  const v = Gu.bind(null, (j) => "" + j),
    b = Gu.bind(null, JS),
    w = Gu.bind(null, Za)
  function S(j, nt) {
    let rt, Nt
    return (
      h0(j) ? ((rt = e.getRecordMatcher(j)), (Nt = nt)) : (Nt = j),
      e.addRoute(Nt, rt)
    )
  }
  function N(j) {
    const nt = e.getRecordMatcher(j)
    nt && e.removeRoute(nt)
  }
  function L() {
    return e.getRoutes().map((j) => j.record)
  }
  function A(j) {
    return !!e.getRecordMatcher(j)
  }
  function T(j, nt) {
    if (((nt = pe({}, nt || p.value)), typeof j == "string")) {
      const K = Vu(r, j, nt.path),
        tt = e.resolve({ path: K.path }, nt),
        ot = a.createHref(K.fullPath)
      return pe(K, tt, {
        params: w(tt.params),
        hash: Za(K.hash),
        redirectedFrom: void 0,
        href: ot,
      })
    }
    let rt
    if ("path" in j) rt = pe({}, j, { path: Vu(r, j.path, nt.path).path })
    else {
      const K = pe({}, j.params)
      for (const tt in K) K[tt] == null && delete K[tt]
      ;(rt = pe({}, j, { params: b(K) })), (nt.params = b(nt.params))
    }
    const Nt = e.resolve(rt, nt),
      Mt = j.hash || ""
    Nt.params = v(w(Nt.params))
    const O = uS(o, pe({}, j, { hash: XS(Mt), path: Nt.path })),
      I = a.createHref(O)
    return pe(
      { fullPath: O, hash: Mt, query: o === Vg ? tk(j.query) : j.query || {} },
      Nt,
      { redirectedFrom: void 0, href: I },
    )
  }
  function M(j) {
    return typeof j == "string" ? Vu(r, j, p.value.path) : pe({}, j)
  }
  function R(j, nt) {
    if (g !== j) return ts(8, { from: nt, to: j })
  }
  function E(j) {
    return ft(j)
  }
  function W(j) {
    return E(pe(M(j), { replace: !0 }))
  }
  function X(j) {
    const nt = j.matched[j.matched.length - 1]
    if (nt && nt.redirect) {
      const { redirect: rt } = nt
      let Nt = typeof rt == "function" ? rt(j) : rt
      return (
        typeof Nt == "string" &&
          ((Nt =
            Nt.includes("?") || Nt.includes("#") ? (Nt = M(Nt)) : { path: Nt }),
          (Nt.params = {})),
        pe(
          {
            query: j.query,
            hash: j.hash,
            params: "path" in Nt ? {} : j.params,
          },
          Nt,
        )
      )
    }
  }
  function ft(j, nt) {
    const rt = (g = T(j)),
      Nt = p.value,
      Mt = j.state,
      O = j.force,
      I = j.replace === !0,
      K = X(rt)
    if (K)
      return ft(
        pe(M(K), {
          state: typeof K == "object" ? pe({}, Mt, K.state) : Mt,
          force: O,
          replace: I,
        }),
        nt || rt,
      )
    const tt = rt
    tt.redirectedFrom = nt
    let ot
    return (
      !O &&
        fS(o, Nt, rt) &&
        ((ot = ts(16, { to: tt, from: Nt })), It(Nt, Nt, !0, !1)),
      (ot ? Promise.resolve(ot) : st(tt, Nt))
        .catch((at) => (Pr(at) ? (Pr(at, 2) ? at : Et(at)) : Q(at, tt, Nt)))
        .then((at) => {
          if (at) {
            if (Pr(at, 2))
              return ft(
                pe({ replace: I }, M(at.to), {
                  state:
                    typeof at.to == "object" ? pe({}, Mt, at.to.state) : Mt,
                  force: O,
                }),
                nt || tt,
              )
          } else at = pt(tt, Nt, !0, I, Mt)
          return dt(tt, Nt, at), at
        })
    )
  }
  function Y(j, nt) {
    const rt = R(j, nt)
    return rt ? Promise.reject(rt) : Promise.resolve()
  }
  function et(j) {
    const nt = Xt.values().next().value
    return nt && typeof nt.runWithContext == "function"
      ? nt.runWithContext(j)
      : j()
  }
  function st(j, nt) {
    let rt
    const [Nt, Mt, O] = uk(j, nt)
    rt = Ku(Nt.reverse(), "beforeRouteLeave", j, nt)
    for (const K of Nt)
      K.leaveGuards.forEach((tt) => {
        rt.push(vi(tt, j, nt))
      })
    const I = Y.bind(null, j, nt)
    return (
      rt.push(I),
      St(rt)
        .then(() => {
          rt = []
          for (const K of u.list()) rt.push(vi(K, j, nt))
          return rt.push(I), St(rt)
        })
        .then(() => {
          rt = Ku(Mt, "beforeRouteUpdate", j, nt)
          for (const K of Mt)
            K.updateGuards.forEach((tt) => {
              rt.push(vi(tt, j, nt))
            })
          return rt.push(I), St(rt)
        })
        .then(() => {
          rt = []
          for (const K of O)
            if (K.beforeEnter)
              if (nr(K.beforeEnter))
                for (const tt of K.beforeEnter) rt.push(vi(tt, j, nt))
              else rt.push(vi(K.beforeEnter, j, nt))
          return rt.push(I), St(rt)
        })
        .then(
          () => (
            j.matched.forEach((K) => (K.enterCallbacks = {})),
            (rt = Ku(O, "beforeRouteEnter", j, nt)),
            rt.push(I),
            St(rt)
          ),
        )
        .then(() => {
          rt = []
          for (const K of f.list()) rt.push(vi(K, j, nt))
          return rt.push(I), St(rt)
        })
        .catch((K) => (Pr(K, 8) ? K : Promise.reject(K)))
    )
  }
  function dt(j, nt, rt) {
    h.list().forEach((Nt) => et(() => Nt(j, nt, rt)))
  }
  function pt(j, nt, rt, Nt, Mt) {
    const O = R(j, nt)
    if (O) return O
    const I = nt === hi,
      K = Ro ? history.state : {}
    rt &&
      (Nt || I
        ? a.replace(j.fullPath, pe({ scroll: I && K && K.scroll }, Mt))
        : a.push(j.fullPath, Mt)),
      (p.value = j),
      It(j, nt, rt, I),
      Et()
  }
  let V
  function z() {
    V ||
      (V = a.listen((j, nt, rt) => {
        if (!Kt.listening) return
        const Nt = T(j),
          Mt = X(Nt)
        if (Mt) {
          ft(pe(Mt, { replace: !0 }), Nt).catch(rl)
          return
        }
        g = Nt
        const O = p.value
        Ro && bS(Ig(O.fullPath, rt.delta), Lc()),
          st(Nt, O)
            .catch((I) =>
              Pr(I, 12)
                ? I
                : Pr(I, 2)
                  ? (ft(I.to, Nt)
                      .then((K) => {
                        Pr(K, 20) &&
                          !rt.delta &&
                          rt.type === pl.pop &&
                          a.go(-1, !1)
                      })
                      .catch(rl),
                    Promise.reject())
                  : (rt.delta && a.go(-rt.delta, !1), Q(I, Nt, O)),
            )
            .then((I) => {
              ;(I = I || pt(Nt, O, !1)),
                I &&
                  (rt.delta && !Pr(I, 8)
                    ? a.go(-rt.delta, !1)
                    : rt.type === pl.pop && Pr(I, 20) && a.go(-1, !1)),
                dt(Nt, O, I)
            })
            .catch(rl)
      }))
  }
  let k = Vs(),
    q = Vs(),
    B
  function Q(j, nt, rt) {
    Et(j)
    const Nt = q.list()
    return (
      Nt.length ? Nt.forEach((Mt) => Mt(j, nt, rt)) : console.error(j),
      Promise.reject(j)
    )
  }
  function mt() {
    return B && p.value !== hi
      ? Promise.resolve()
      : new Promise((j, nt) => {
          k.add([j, nt])
        })
  }
  function Et(j) {
    return (
      B ||
        ((B = !j),
        z(),
        k.list().forEach(([nt, rt]) => (j ? rt(j) : nt())),
        k.reset()),
      j
    )
  }
  function It(j, nt, rt, Nt) {
    const { scrollBehavior: Mt } = t
    if (!Ro || !Mt) return Promise.resolve()
    const O =
      (!rt && wS(Ig(j.fullPath, 0))) ||
      ((Nt || !rt) && history.state && history.state.scroll) ||
      null
    return Hr()
      .then(() => Mt(j, nt, O))
      .then((I) => I && yS(I))
      .catch((I) => Q(I, j, nt))
  }
  const Bt = (j) => a.go(j)
  let Ut
  const Xt = new Set(),
    Kt = {
      currentRoute: p,
      listening: !0,
      addRoute: S,
      removeRoute: N,
      hasRoute: A,
      getRoutes: L,
      resolve: T,
      options: t,
      push: E,
      replace: W,
      go: Bt,
      back: () => Bt(-1),
      forward: () => Bt(1),
      beforeEach: u.add,
      beforeResolve: f.add,
      afterEach: h.add,
      onError: q.add,
      isReady: mt,
      install(j) {
        const nt = this
        j.component("RouterLink", ik),
          j.component("RouterView", ak),
          (j.config.globalProperties.$router = nt),
          Object.defineProperty(j.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => G(p),
          }),
          Ro &&
            !Ut &&
            p.value === hi &&
            ((Ut = !0), E(a.location).catch((Mt) => {}))
        const rt = {}
        for (const Mt in hi)
          Object.defineProperty(rt, Mt, {
            get: () => p.value[Mt],
            enumerable: !0,
          })
        j.provide(Eh, nt), j.provide(w0, Tm(rt)), j.provide(Lf, p)
        const Nt = j.unmount
        Xt.add(j),
          (j.unmount = function () {
            Xt.delete(j),
              Xt.size < 1 &&
                ((g = hi),
                V && V(),
                (V = null),
                (p.value = hi),
                (Ut = !1),
                (B = !1)),
              Nt()
          })
      },
    }
  function St(j) {
    return j.reduce((nt, rt) => nt.then(() => et(rt)), Promise.resolve())
  }
  return Kt
}
function uk(t, e) {
  const r = [],
    o = [],
    a = [],
    u = Math.max(e.matched.length, t.matched.length)
  for (let f = 0; f < u; f++) {
    const h = e.matched[f]
    h && (t.matched.find((g) => Qo(g, h)) ? o.push(h) : r.push(h))
    const p = t.matched[f]
    p && (e.matched.find((g) => Qo(g, p)) || a.push(p))
  }
  return [r, o, a]
}
function Kr(t) {
  return t.split("-")[0]
}
function jo(t) {
  return t.split("-")[1]
}
function El(t) {
  return ["top", "bottom"].includes(Kr(t)) ? "x" : "y"
}
function Lh(t) {
  return t === "y" ? "height" : "width"
}
function Qg(t) {
  let { reference: e, floating: r, placement: o } = t
  const a = e.x + e.width / 2 - r.width / 2,
    u = e.y + e.height / 2 - r.height / 2
  let f
  switch (Kr(o)) {
    case "top":
      f = { x: a, y: e.y - r.height }
      break
    case "bottom":
      f = { x: a, y: e.y + e.height }
      break
    case "right":
      f = { x: e.x + e.width, y: u }
      break
    case "left":
      f = { x: e.x - r.width, y: u }
      break
    default:
      f = { x: e.x, y: e.y }
  }
  const h = El(o),
    p = Lh(h)
  switch (jo(o)) {
    case "start":
      f[h] = f[h] - (e[p] / 2 - r[p] / 2)
      break
    case "end":
      f[h] = f[h] + (e[p] / 2 - r[p] / 2)
      break
  }
  return f
}
const fk = async (t, e, r) => {
  const {
    placement: o = "bottom",
    strategy: a = "absolute",
    middleware: u = [],
    platform: f,
  } = r
  let h = await f.getElementRects({ reference: t, floating: e, strategy: a }),
    { x: p, y: g } = Qg({ ...h, placement: o }),
    v = o,
    b = {}
  for (let w = 0; w < u.length; w++) {
    const { name: S, fn: N } = u[w],
      {
        x: L,
        y: A,
        data: T,
        reset: M,
      } = await N({
        x: p,
        y: g,
        initialPlacement: o,
        placement: v,
        strategy: a,
        middlewareData: b,
        rects: h,
        platform: f,
        elements: { reference: t, floating: e },
      })
    if (((p = L ?? p), (g = A ?? g), (b = { ...b, [S]: T ?? {} }), M)) {
      typeof M == "object" &&
        (M.placement && (v = M.placement),
        M.rects &&
          (h =
            M.rects === !0
              ? await f.getElementRects({
                  reference: t,
                  floating: e,
                  strategy: a,
                })
              : M.rects),
        ({ x: p, y: g } = Qg({ ...h, placement: v }))),
        (w = -1)
      continue
    }
  }
  return { x: p, y: g, placement: v, strategy: a, middlewareData: b }
}
function hk(t) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...t }
}
function x0(t) {
  return typeof t != "number" ? hk(t) : { top: t, right: t, bottom: t, left: t }
}
function Af(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height,
  }
}
async function Ac(t, e) {
  e === void 0 && (e = {})
  const { x: r, y: o, platform: a, rects: u, elements: f, strategy: h } = t,
    {
      boundary: p = "clippingParents",
      rootBoundary: g = "viewport",
      elementContext: v = "floating",
      altBoundary: b = !1,
      padding: w = 0,
    } = e,
    S = x0(w),
    L = f[b ? (v === "floating" ? "reference" : "floating") : v],
    A = await a.getClippingClientRect({
      element: (await a.isElement(L))
        ? L
        : L.contextElement ||
          (await a.getDocumentElement({ element: f.floating })),
      boundary: p,
      rootBoundary: g,
    }),
    T = Af(
      await a.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: v === "floating" ? { ...u.floating, x: r, y: o } : u.reference,
        offsetParent: await a.getOffsetParent({ element: f.floating }),
        strategy: h,
      }),
    )
  return {
    top: A.top - T.top + S.top,
    bottom: T.bottom - A.bottom + S.bottom,
    left: A.left - T.left + S.left,
    right: T.right - A.right + S.right,
  }
}
const dk = Math.min,
  Ui = Math.max
function Mf(t, e, r) {
  return Ui(t, dk(e, r))
}
const pk = (t) => ({
    name: "arrow",
    options: t,
    async fn(e) {
      const { element: r, padding: o = 0 } = t ?? {},
        { x: a, y: u, placement: f, rects: h, platform: p } = e
      if (r == null) return {}
      const g = x0(o),
        v = { x: a, y: u },
        b = Kr(f),
        w = El(b),
        S = Lh(w),
        N = await p.getDimensions({ element: r }),
        L = w === "y" ? "top" : "left",
        A = w === "y" ? "bottom" : "right",
        T = h.reference[S] + h.reference[w] - v[w] - h.floating[S],
        M = v[w] - h.reference[w],
        R = await p.getOffsetParent({ element: r }),
        E = R ? (w === "y" ? R.clientHeight || 0 : R.clientWidth || 0) : 0,
        W = T / 2 - M / 2,
        X = g[L],
        ft = E - N[S] - g[A],
        Y = E / 2 - N[S] / 2 + W,
        et = Mf(X, Y, ft)
      return { data: { [w]: et, centerOffset: Y - et } }
    },
  }),
  gk = { left: "right", right: "left", bottom: "top", top: "bottom" }
function Ja(t) {
  return t.replace(/left|right|bottom|top/g, (e) => gk[e])
}
function _0(t, e) {
  const r = jo(t) === "start",
    o = El(t),
    a = Lh(o)
  let u = o === "x" ? (r ? "right" : "left") : r ? "bottom" : "top"
  return (
    e.reference[a] > e.floating[a] && (u = Ja(u)), { main: u, cross: Ja(u) }
  )
}
const vk = { start: "end", end: "start" }
function Nf(t) {
  return t.replace(/start|end/g, (e) => vk[e])
}
const mk = ["top", "right", "bottom", "left"],
  yk = mk.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), [])
function bk(t, e, r) {
  return (
    t
      ? [...r.filter((a) => jo(a) === t), ...r.filter((a) => jo(a) !== t)]
      : r.filter((a) => Kr(a) === a)
  ).filter((a) => (t ? jo(a) === t || (e ? Nf(a) !== a : !1) : !0))
}
const wk = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: "autoPlacement",
      options: t,
      async fn(e) {
        var r, o, a, u, f, h
        const { x: p, y: g, rects: v, middlewareData: b, placement: w } = e,
          {
            alignment: S = null,
            allowedPlacements: N = yk,
            autoAlignment: L = !0,
            ...A
          } = t
        if ((r = b.autoPlacement) != null && r.skip) return {}
        const T = bk(S, L, N),
          M = await Ac(e, A),
          R =
            (o = (a = b.autoPlacement) == null ? void 0 : a.index) != null
              ? o
              : 0,
          E = T[R],
          { main: W, cross: X } = _0(E, v)
        if (w !== E) return { x: p, y: g, reset: { placement: T[0] } }
        const ft = [M[Kr(E)], M[W], M[X]],
          Y = [
            ...((u = (f = b.autoPlacement) == null ? void 0 : f.overflows) !=
            null
              ? u
              : []),
            { placement: E, overflows: ft },
          ],
          et = T[R + 1]
        if (et)
          return {
            data: { index: R + 1, overflows: Y },
            reset: { placement: et },
          }
        const st = Y.slice().sort((pt, V) => pt.overflows[0] - V.overflows[0]),
          dt =
            (h = st.find((pt) => {
              let { overflows: V } = pt
              return V.every((z) => z <= 0)
            })) == null
              ? void 0
              : h.placement
        return {
          data: { skip: !0 },
          reset: { placement: dt ?? st[0].placement },
        }
      },
    }
  )
}
function xk(t) {
  const e = Ja(t)
  return [Nf(t), e, Nf(e)]
}
const _k = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: "flip",
      options: t,
      async fn(e) {
        var r, o
        const {
          placement: a,
          middlewareData: u,
          rects: f,
          initialPlacement: h,
        } = e
        if ((r = u.flip) != null && r.skip) return {}
        const {
            mainAxis: p = !0,
            crossAxis: g = !0,
            fallbackPlacements: v,
            fallbackStrategy: b = "bestFit",
            flipAlignment: w = !0,
            ...S
          } = t,
          N = Kr(a),
          A = v || (N === h || !w ? [Ja(h)] : xk(h)),
          T = [h, ...A],
          M = await Ac(e, S),
          R = []
        let E = ((o = u.flip) == null ? void 0 : o.overflows) || []
        if ((p && R.push(M[N]), g)) {
          const { main: Y, cross: et } = _0(a, f)
          R.push(M[Y], M[et])
        }
        if (
          ((E = [...E, { placement: a, overflows: R }]),
          !R.every((Y) => Y <= 0))
        ) {
          var W, X
          const Y =
              ((W = (X = u.flip) == null ? void 0 : X.index) != null ? W : 0) +
              1,
            et = T[Y]
          if (et)
            return {
              data: { index: Y, overflows: E },
              reset: { placement: et },
            }
          let st = "bottom"
          switch (b) {
            case "bestFit": {
              var ft
              const dt =
                (ft = E.slice().sort(
                  (pt, V) =>
                    pt.overflows
                      .filter((z) => z > 0)
                      .reduce((z, k) => z + k, 0) -
                    V.overflows.filter((z) => z > 0).reduce((z, k) => z + k, 0),
                )[0]) == null
                  ? void 0
                  : ft.placement
              dt && (st = dt)
              break
            }
            case "initialPlacement":
              st = h
              break
          }
          return { data: { skip: !0 }, reset: { placement: st } }
        }
        return {}
      },
    }
  )
}
function Sk(t) {
  let { placement: e, rects: r, value: o } = t
  const a = Kr(e),
    u = ["left", "top"].includes(a) ? -1 : 1,
    f = typeof o == "function" ? o({ ...r, placement: e }) : o,
    { mainAxis: h, crossAxis: p } =
      typeof f == "number"
        ? { mainAxis: f, crossAxis: 0 }
        : { mainAxis: 0, crossAxis: 0, ...f }
  return El(a) === "x" ? { x: p, y: h * u } : { x: h * u, y: p }
}
const kk = function (t) {
  return (
    t === void 0 && (t = 0),
    {
      name: "offset",
      options: t,
      fn(e) {
        const { x: r, y: o, placement: a, rects: u } = e,
          f = Sk({ placement: a, rects: u, value: t })
        return { x: r + f.x, y: o + f.y, data: f }
      },
    }
  )
}
function Ck(t) {
  return t === "x" ? "y" : "x"
}
const Tk = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "shift",
        options: t,
        async fn(e) {
          const { x: r, y: o, placement: a } = e,
            {
              mainAxis: u = !0,
              crossAxis: f = !1,
              limiter: h = {
                fn: (A) => {
                  let { x: T, y: M } = A
                  return { x: T, y: M }
                },
              },
              ...p
            } = t,
            g = { x: r, y: o },
            v = await Ac(e, p),
            b = El(Kr(a)),
            w = Ck(b)
          let S = g[b],
            N = g[w]
          if (u) {
            const A = b === "y" ? "top" : "left",
              T = b === "y" ? "bottom" : "right",
              M = S + v[A],
              R = S - v[T]
            S = Mf(M, S, R)
          }
          if (f) {
            const A = w === "y" ? "top" : "left",
              T = w === "y" ? "bottom" : "right",
              M = N + v[A],
              R = N - v[T]
            N = Mf(M, N, R)
          }
          const L = h.fn({ ...e, [b]: S, [w]: N })
          return { ...L, data: { x: L.x - r, y: L.y - o } }
        },
      }
    )
  },
  Ek = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "size",
        options: t,
        async fn(e) {
          var r
          const { placement: o, rects: a, middlewareData: u } = e,
            { apply: f, ...h } = t
          if ((r = u.size) != null && r.skip) return {}
          const p = await Ac(e, h),
            g = Kr(o),
            v = jo(o) === "end"
          let b, w
          g === "top" || g === "bottom"
            ? ((b = g), (w = v ? "left" : "right"))
            : ((w = g), (b = v ? "top" : "bottom"))
          const S = Ui(p.left, 0),
            N = Ui(p.right, 0),
            L = Ui(p.top, 0),
            A = Ui(p.bottom, 0),
            T = {
              height:
                a.floating.height -
                (["left", "right"].includes(o)
                  ? 2 * (L !== 0 || A !== 0 ? L + A : Ui(p.top, p.bottom))
                  : p[b]),
              width:
                a.floating.width -
                (["top", "bottom"].includes(o)
                  ? 2 * (S !== 0 || N !== 0 ? S + N : Ui(p.left, p.right))
                  : p[w]),
            }
          return (
            f == null || f({ ...T, ...a }),
            { data: { skip: !0 }, reset: { rects: !0 } }
          )
        },
      }
    )
  }
function Ah(t) {
  return (t == null ? void 0 : t.toString()) === "[object Window]"
}
function Ei(t) {
  if (t == null) return window
  if (!Ah(t)) {
    const e = t.ownerDocument
    return (e && e.defaultView) || window
  }
  return t
}
function Mc(t) {
  return Ei(t).getComputedStyle(t)
}
function Br(t) {
  return Ah(t) ? "" : t ? (t.nodeName || "").toLowerCase() : ""
}
function Wr(t) {
  return t instanceof Ei(t).HTMLElement
}
function Qa(t) {
  return t instanceof Ei(t).Element
}
function Lk(t) {
  return t instanceof Ei(t).Node
}
function S0(t) {
  const e = Ei(t).ShadowRoot
  return t instanceof e || t instanceof ShadowRoot
}
function Nc(t) {
  const { overflow: e, overflowX: r, overflowY: o } = Mc(t)
  return /auto|scroll|overlay|hidden/.test(e + o + r)
}
function Ak(t) {
  return ["table", "td", "th"].includes(Br(t))
}
function k0(t) {
  const e = navigator.userAgent.toLowerCase().includes("firefox"),
    r = Mc(t)
  return (
    r.transform !== "none" ||
    r.perspective !== "none" ||
    r.contain === "paint" ||
    ["transform", "perspective"].includes(r.willChange) ||
    (e && r.willChange === "filter") ||
    (e && (r.filter ? r.filter !== "none" : !1))
  )
}
const tv = Math.min,
  ol = Math.max,
  tc = Math.round
function es(t, e) {
  e === void 0 && (e = !1)
  const r = t.getBoundingClientRect()
  let o = 1,
    a = 1
  return (
    e &&
      Wr(t) &&
      ((o = (t.offsetWidth > 0 && tc(r.width) / t.offsetWidth) || 1),
      (a = (t.offsetHeight > 0 && tc(r.height) / t.offsetHeight) || 1)),
    {
      width: r.width / o,
      height: r.height / a,
      top: r.top / a,
      right: r.right / o,
      bottom: r.bottom / a,
      left: r.left / o,
      x: r.left / o,
      y: r.top / a,
    }
  )
}
function Li(t) {
  return ((Lk(t) ? t.ownerDocument : t.document) || window.document)
    .documentElement
}
function Pc(t) {
  return Ah(t)
    ? { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
    : { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
}
function C0(t) {
  return es(Li(t)).left + Pc(t).scrollLeft
}
function Mk(t) {
  const e = es(t)
  return tc(e.width) !== t.offsetWidth || tc(e.height) !== t.offsetHeight
}
function Nk(t, e, r) {
  const o = Wr(e),
    a = Li(e),
    u = es(t, o && Mk(e))
  let f = { scrollLeft: 0, scrollTop: 0 }
  const h = { x: 0, y: 0 }
  if (o || (!o && r !== "fixed"))
    if (((Br(e) !== "body" || Nc(a)) && (f = Pc(e)), Wr(e))) {
      const p = es(e, !0)
      ;(h.x = p.x + e.clientLeft), (h.y = p.y + e.clientTop)
    } else a && (h.x = C0(a))
  return {
    x: u.left + f.scrollLeft - h.x,
    y: u.top + f.scrollTop - h.y,
    width: u.width,
    height: u.height,
  }
}
function Oc(t) {
  return Br(t) === "html"
    ? t
    : t.assignedSlot || t.parentNode || (S0(t) ? t.host : null) || Li(t)
}
function ev(t) {
  return !Wr(t) || getComputedStyle(t).position === "fixed"
    ? null
    : t.offsetParent
}
function Pk(t) {
  let e = Oc(t)
  for (; Wr(e) && !["html", "body"].includes(Br(e)); ) {
    if (k0(e)) return e
    e = e.parentNode
  }
  return null
}
function Pf(t) {
  const e = Ei(t)
  let r = ev(t)
  for (; r && Ak(r) && getComputedStyle(r).position === "static"; ) r = ev(r)
  return r &&
    (Br(r) === "html" ||
      (Br(r) === "body" && getComputedStyle(r).position === "static" && !k0(r)))
    ? e
    : r || Pk(t) || e
}
function nv(t) {
  return { width: t.offsetWidth, height: t.offsetHeight }
}
function Ok(t) {
  let { rect: e, offsetParent: r, strategy: o } = t
  const a = Wr(r),
    u = Li(r)
  if (r === u) return e
  let f = { scrollLeft: 0, scrollTop: 0 }
  const h = { x: 0, y: 0 }
  if (
    (a || (!a && o !== "fixed")) &&
    ((Br(r) !== "body" || Nc(u)) && (f = Pc(r)), Wr(r))
  ) {
    const p = es(r, !0)
    ;(h.x = p.x + r.clientLeft), (h.y = p.y + r.clientTop)
  }
  return { ...e, x: e.x - f.scrollLeft + h.x, y: e.y - f.scrollTop + h.y }
}
function Dk(t) {
  const e = Ei(t),
    r = Li(t),
    o = e.visualViewport
  let a = r.clientWidth,
    u = r.clientHeight,
    f = 0,
    h = 0
  return (
    o &&
      ((a = o.width),
      (u = o.height),
      Math.abs(e.innerWidth / o.scale - o.width) < 0.01 &&
        ((f = o.offsetLeft), (h = o.offsetTop))),
    { width: a, height: u, x: f, y: h }
  )
}
function $k(t) {
  var e
  const r = Li(t),
    o = Pc(t),
    a = (e = t.ownerDocument) == null ? void 0 : e.body,
    u = ol(
      r.scrollWidth,
      r.clientWidth,
      a ? a.scrollWidth : 0,
      a ? a.clientWidth : 0,
    ),
    f = ol(
      r.scrollHeight,
      r.clientHeight,
      a ? a.scrollHeight : 0,
      a ? a.clientHeight : 0,
    )
  let h = -o.scrollLeft + C0(t)
  const p = -o.scrollTop
  return (
    Mc(a || r).direction === "rtl" &&
      (h += ol(r.clientWidth, a ? a.clientWidth : 0) - u),
    { width: u, height: f, x: h, y: p }
  )
}
function T0(t) {
  return ["html", "body", "#document"].includes(Br(t))
    ? t.ownerDocument.body
    : Wr(t) && Nc(t)
      ? t
      : T0(Oc(t))
}
function ec(t, e) {
  var r
  e === void 0 && (e = [])
  const o = T0(t),
    a = o === ((r = t.ownerDocument) == null ? void 0 : r.body),
    u = Ei(o),
    f = a ? [u].concat(u.visualViewport || [], Nc(o) ? o : []) : o,
    h = e.concat(f)
  return a ? h : h.concat(ec(Oc(f)))
}
function Rk(t, e) {
  const r = e.getRootNode == null ? void 0 : e.getRootNode()
  if (t.contains(e)) return !0
  if (r && S0(r)) {
    let o = e
    do {
      if (o && t === o) return !0
      o = o.parentNode || o.host
    } while (o)
  }
  return !1
}
function zk(t) {
  const e = es(t),
    r = e.top + t.clientTop,
    o = e.left + t.clientLeft
  return {
    top: r,
    left: o,
    x: o,
    y: r,
    right: o + t.clientWidth,
    bottom: r + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight,
  }
}
function rv(t, e) {
  return e === "viewport" ? Af(Dk(t)) : Qa(e) ? zk(e) : Af($k(Li(t)))
}
function Fk(t) {
  const e = ec(Oc(t)),
    o = ["absolute", "fixed"].includes(Mc(t).position) && Wr(t) ? Pf(t) : t
  return Qa(o) ? e.filter((a) => Qa(a) && Rk(a, o) && Br(a) !== "body") : []
}
function Ik(t) {
  let { element: e, boundary: r, rootBoundary: o } = t
  const u = [...(r === "clippingParents" ? Fk(e) : [].concat(r)), o],
    f = u[0],
    h = u.reduce(
      (p, g) => {
        const v = rv(e, g)
        return (
          (p.top = ol(v.top, p.top)),
          (p.right = tv(v.right, p.right)),
          (p.bottom = tv(v.bottom, p.bottom)),
          (p.left = ol(v.left, p.left)),
          p
        )
      },
      rv(e, f),
    )
  return (
    (h.width = h.right - h.left),
    (h.height = h.bottom - h.top),
    (h.x = h.left),
    (h.y = h.top),
    h
  )
}
const qk = {
    getElementRects: (t) => {
      let { reference: e, floating: r, strategy: o } = t
      return { reference: Nk(e, Pf(r), o), floating: { ...nv(r), x: 0, y: 0 } }
    },
    convertOffsetParentRelativeRectToViewportRelativeRect: (t) => Ok(t),
    getOffsetParent: (t) => {
      let { element: e } = t
      return Pf(e)
    },
    isElement: (t) => Qa(t),
    getDocumentElement: (t) => {
      let { element: e } = t
      return Li(e)
    },
    getClippingClientRect: (t) => Ik(t),
    getDimensions: (t) => {
      let { element: e } = t
      return nv(e)
    },
    getClientRects: (t) => {
      let { element: e } = t
      return e.getClientRects()
    },
  },
  Hk = (t, e, r) => fk(t, e, { platform: qk, ...r })
var Bk = Object.defineProperty,
  Wk = Object.defineProperties,
  Uk = Object.getOwnPropertyDescriptors,
  iv = Object.getOwnPropertySymbols,
  jk = Object.prototype.hasOwnProperty,
  Gk = Object.prototype.propertyIsEnumerable,
  ov = (t, e, r) =>
    e in t
      ? Bk(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[e] = r),
  Rr = (t, e) => {
    for (var r in e || (e = {})) jk.call(e, r) && ov(t, r, e[r])
    if (iv) for (var r of iv(e)) Gk.call(e, r) && ov(t, r, e[r])
    return t
  },
  Ll = (t, e) => Wk(t, Uk(e))
function E0(t, e) {
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      (typeof e[r] == "object" && t[r] ? E0(t[r], e[r]) : (t[r] = e[r]))
}
const Ji = {
  disabled: !1,
  distance: 5,
  skidding: 0,
  container: "body",
  boundary: void 0,
  instantMove: !1,
  disposeTimeout: 5e3,
  popperTriggers: [],
  strategy: "absolute",
  preventOverflow: !0,
  flip: !0,
  shift: !0,
  overflowPadding: 0,
  arrowPadding: 0,
  arrowOverflow: !0,
  themes: {
    tooltip: {
      placement: "top",
      triggers: ["hover", "focus", "touch"],
      hideTriggers: (t) => [...t, "click"],
      delay: { show: 200, hide: 0 },
      handleResize: !1,
      html: !1,
      loadingContent: "...",
    },
    dropdown: {
      placement: "bottom",
      triggers: ["click"],
      delay: 0,
      handleResize: !0,
      autoHide: !0,
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: { show: 0, hide: 400 },
    },
  },
}
function ns(t, e) {
  let r = Ji.themes[t] || {},
    o
  do
    (o = r[e]),
      typeof o > "u"
        ? r.$extend
          ? (r = Ji.themes[r.$extend] || {})
          : ((r = null), (o = Ji[e]))
        : (r = null)
  while (r)
  return o
}
function Vk(t) {
  const e = [t]
  let r = Ji.themes[t] || {}
  do
    r.$extend && !r.$resetCss
      ? (e.push(r.$extend), (r = Ji.themes[r.$extend] || {}))
      : (r = null)
  while (r)
  return e.map((o) => `v-popper--theme-${o}`)
}
let rs = !1
if (typeof window < "u") {
  rs = !1
  try {
    const t = Object.defineProperty({}, "passive", {
      get() {
        rs = !0
      },
    })
    window.addEventListener("test", null, t)
  } catch {}
}
let L0 = !1
typeof window < "u" &&
  typeof navigator < "u" &&
  (L0 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
const A0 = ["auto", "top", "bottom", "left", "right"].reduce(
    (t, e) => t.concat([e, `${e}-start`, `${e}-end`]),
    [],
  ),
  sv = {
    hover: "mouseenter",
    focus: "focus",
    click: "click",
    touch: "touchstart",
  },
  lv = { hover: "mouseleave", focus: "blur", click: "click", touch: "touchend" }
function Kk(t, e) {
  const r = t.indexOf(e)
  r !== -1 && t.splice(r, 1)
}
function Xu() {
  return new Promise((t) =>
    requestAnimationFrame(() => {
      requestAnimationFrame(t)
    }),
  )
}
const gr = []
let Do = null,
  Of = function () {}
typeof window < "u" && (Of = window.Element)
function de(t) {
  return function (e) {
    return ns(e.theme, t)
  }
}
var M0 = () =>
  re({
    name: "VPopper",
    props: {
      theme: { type: String, required: !0 },
      targetNodes: { type: Function, required: !0 },
      referenceNode: { type: Function, required: !0 },
      popperNode: { type: Function, required: !0 },
      shown: { type: Boolean, default: !1 },
      showGroup: { type: String, default: null },
      ariaId: { default: null },
      disabled: { type: Boolean, default: de("disabled") },
      placement: {
        type: String,
        default: de("placement"),
        validator: (t) => A0.includes(t),
      },
      delay: { type: [String, Number, Object], default: de("delay") },
      distance: { type: [Number, String], default: de("distance") },
      skidding: { type: [Number, String], default: de("skidding") },
      triggers: { type: Array, default: de("triggers") },
      showTriggers: { type: [Array, Function], default: de("showTriggers") },
      hideTriggers: { type: [Array, Function], default: de("hideTriggers") },
      popperTriggers: { type: Array, default: de("popperTriggers") },
      popperShowTriggers: {
        type: [Array, Function],
        default: de("popperShowTriggers"),
      },
      popperHideTriggers: {
        type: [Array, Function],
        default: de("popperHideTriggers"),
      },
      container: {
        type: [String, Object, Of, Boolean],
        default: de("container"),
      },
      boundary: { type: [String, Of], default: de("boundary") },
      strategy: {
        type: String,
        validator: (t) => ["absolute", "fixed"].includes(t),
        default: de("strategy"),
      },
      autoHide: { type: Boolean, default: de("autoHide") },
      handleResize: { type: Boolean, default: de("handleResize") },
      instantMove: { type: Boolean, default: de("instantMove") },
      eagerMount: { type: Boolean, default: de("eagerMount") },
      popperClass: {
        type: [String, Array, Object],
        default: de("popperClass"),
      },
      computeTransformOrigin: {
        type: Boolean,
        default: de("computeTransformOrigin"),
      },
      autoMinSize: { type: Boolean, default: de("autoMinSize") },
      autoMaxSize: { type: Boolean, default: de("autoMaxSize") },
      preventOverflow: { type: Boolean, default: de("preventOverflow") },
      overflowPadding: {
        type: [Number, String],
        default: de("overflowPadding"),
      },
      arrowPadding: { type: [Number, String], default: de("arrowPadding") },
      arrowOverflow: { type: Boolean, default: de("arrowOverflow") },
      flip: { type: Boolean, default: de("flip") },
      shift: { type: Boolean, default: de("shift") },
      shiftCrossAxis: { type: Boolean, default: de("shiftCrossAxis") },
    },
    emits: [
      "show",
      "hide",
      "update:shown",
      "apply-show",
      "apply-hide",
      "close-group",
      "close-directive",
      "auto-hide",
      "resize",
      "dispose",
    ],
    data() {
      return {
        isShown: !1,
        isMounted: !1,
        skipTransition: !1,
        classes: { showFrom: !1, showTo: !1, hideFrom: !1, hideTo: !0 },
        result: {
          x: 0,
          y: 0,
          placement: "",
          strategy: this.strategy,
          arrow: { x: 0, y: 0, centerOffset: 0 },
          transformOrigin: null,
        },
      }
    },
    computed: {
      popperId() {
        return this.ariaId != null ? this.ariaId : this.randomId
      },
      shouldMountContent() {
        return this.eagerMount || this.isMounted
      },
      slotData() {
        return {
          popperId: this.popperId,
          isShown: this.isShown,
          shouldMountContent: this.shouldMountContent,
          skipTransition: this.skipTransition,
          autoHide: this.autoHide,
          show: this.show,
          hide: this.hide,
          handleResize: this.handleResize,
          onResize: this.onResize,
          classes: Ll(Rr({}, this.classes), { popperClass: this.popperClass }),
          result: this.result,
        }
      },
    },
    watch: Rr(
      {
        shown: "$_autoShowHide",
        disabled(t) {
          t ? this.dispose() : this.init()
        },
        async container() {
          this.isShown &&
            (this.$_ensureTeleport(), await this.$_computePosition())
        },
        triggers() {
          this.$_isDisposed ||
            (this.$_removeEventListeners(), this.$_addEventListeners())
        },
      },
      [
        "placement",
        "distance",
        "skidding",
        "boundary",
        "strategy",
        "overflowPadding",
        "arrowPadding",
        "preventOverflow",
        "shift",
        "shiftCrossAxis",
        "flip",
      ].reduce((t, e) => ((t[e] = "$_computePosition"), t), {}),
    ),
    created() {
      ;(this.$_isDisposed = !0),
        (this.randomId = `popper_${[Math.random(), Date.now()].map((t) => t.toString(36).substring(2, 10)).join("_")}`)
    },
    mounted() {
      this.init(), this.$_detachPopperNode()
    },
    activated() {
      this.$_autoShowHide()
    },
    deactivated() {
      this.hide()
    },
    beforeUnmount() {
      this.dispose()
    },
    methods: {
      show({ event: t = null, skipDelay: e = !1, force: r = !1 } = {}) {
        ;(r || !this.disabled) &&
          (this.$_scheduleShow(t, e),
          this.$emit("show"),
          (this.$_showFrameLocked = !0),
          requestAnimationFrame(() => {
            this.$_showFrameLocked = !1
          })),
          this.$emit("update:shown", !0)
      },
      hide({ event: t = null, skipDelay: e = !1 } = {}) {
        this.$_scheduleHide(t, e),
          this.$emit("hide"),
          this.$emit("update:shown", !1)
      },
      init() {
        this.$_isDisposed &&
          ((this.$_isDisposed = !1),
          (this.isMounted = !1),
          (this.$_events = []),
          (this.$_preventShow = !1),
          (this.$_referenceNode = this.referenceNode()),
          (this.$_targetNodes = this.targetNodes().filter(
            (t) => t.nodeType === t.ELEMENT_NODE,
          )),
          (this.$_popperNode = this.popperNode()),
          (this.$_innerNode =
            this.$_popperNode.querySelector(".v-popper__inner")),
          (this.$_arrowNode = this.$_popperNode.querySelector(
            ".v-popper__arrow-container",
          )),
          this.$_swapTargetAttrs("title", "data-original-title"),
          this.$_detachPopperNode(),
          this.triggers.length && this.$_addEventListeners(),
          this.shown && this.show())
      },
      dispose() {
        this.$_isDisposed ||
          ((this.$_isDisposed = !0),
          this.$_removeEventListeners(),
          this.hide({ skipDelay: !0 }),
          this.$_detachPopperNode(),
          (this.isMounted = !1),
          (this.isShown = !1),
          this.$_swapTargetAttrs("data-original-title", "title"),
          this.$emit("dispose"))
      },
      async onResize() {
        this.isShown && (await this.$_computePosition(), this.$emit("resize"))
      },
      async $_computePosition() {
        var t
        if (this.$_isDisposed) return
        const e = { strategy: this.strategy, middleware: [] }
        ;(this.distance || this.skidding) &&
          e.middleware.push(
            kk({ mainAxis: this.distance, crossAxis: this.skidding }),
          )
        const r = this.placement.startsWith("auto")
        r
          ? e.middleware.push(
              wk({
                alignment: (t = this.placement.split("-")[1]) != null ? t : "",
              }),
            )
          : (e.placement = this.placement),
          this.preventOverflow &&
            (this.shift &&
              e.middleware.push(
                Tk({
                  padding: this.overflowPadding,
                  boundary: this.boundary,
                  crossAxis: this.shiftCrossAxis,
                }),
              ),
            !r &&
              this.flip &&
              e.middleware.push(
                _k({ padding: this.overflowPadding, boundary: this.boundary }),
              )),
          e.middleware.push(
            pk({ element: this.$_arrowNode, padding: this.arrowPadding }),
          ),
          this.arrowOverflow &&
            e.middleware.push({
              name: "arrowOverflow",
              fn: ({ placement: a, rects: u, middlewareData: f }) => {
                let h
                const { centerOffset: p } = f.arrow
                return (
                  a.startsWith("top") || a.startsWith("bottom")
                    ? (h = Math.abs(p) > u.reference.width / 2)
                    : (h = Math.abs(p) > u.reference.height / 2),
                  { data: { overflow: h } }
                )
              },
            }),
          this.autoMinSize &&
            e.middleware.push({
              name: "autoMinSize",
              fn: ({ rects: a, placement: u, middlewareData: f }) => {
                var h
                if ((h = f.autoMinSize) != null && h.skip) return {}
                let p, g
                return (
                  u.startsWith("top") || u.startsWith("bottom")
                    ? (p = a.reference.width)
                    : (g = a.reference.height),
                  (this.$_innerNode.style.minWidth =
                    p != null ? `${p}px` : null),
                  (this.$_innerNode.style.minHeight =
                    g != null ? `${g}px` : null),
                  { data: { skip: !0 }, reset: { rects: !0 } }
                )
              },
            }),
          this.autoMaxSize &&
            e.middleware.push(
              Ek({
                boundary: this.boundary,
                padding: this.overflowPadding,
                apply: ({ width: a, height: u }) => {
                  ;(this.$_innerNode.style.maxWidth =
                    a != null ? `${a}px` : null),
                    (this.$_innerNode.style.maxHeight =
                      u != null ? `${u}px` : null)
                },
              }),
            )
        const o = await Hk(this.$_referenceNode, this.$_popperNode, e)
        Object.assign(this.result, {
          x: o.x,
          y: o.y,
          placement: o.placement,
          strategy: o.strategy,
          arrow: Rr(
            Rr({}, o.middlewareData.arrow),
            o.middlewareData.arrowOverflow,
          ),
        })
      },
      $_scheduleShow(t = null, e = !1) {
        if (
          ((this.$_hideInProgress = !1),
          clearTimeout(this.$_scheduleTimer),
          Do && this.instantMove && Do.instantMove)
        ) {
          Do.$_applyHide(!0), this.$_applyShow(!0)
          return
        }
        e
          ? this.$_applyShow()
          : (this.$_scheduleTimer = setTimeout(
              this.$_applyShow.bind(this),
              this.$_computeDelay("show"),
            ))
      },
      $_scheduleHide(t = null, e = !1) {
        ;(this.$_hideInProgress = !0),
          clearTimeout(this.$_scheduleTimer),
          this.isShown && (Do = this),
          e
            ? this.$_applyHide()
            : (this.$_scheduleTimer = setTimeout(
                this.$_applyHide.bind(this),
                this.$_computeDelay("hide"),
              ))
      },
      $_computeDelay(t) {
        const e = this.delay
        return parseInt((e && e[t]) || e || 0)
      },
      async $_applyShow(t = !1) {
        clearTimeout(this.$_disposeTimer),
          clearTimeout(this.$_scheduleTimer),
          (this.skipTransition = t),
          !this.isShown &&
            (this.$_ensureTeleport(),
            await Xu(),
            await this.$_computePosition(),
            await this.$_applyShowEffect())
      },
      async $_applyShowEffect() {
        if (this.$_hideInProgress) return
        if (this.computeTransformOrigin) {
          const e = this.$_referenceNode.getBoundingClientRect(),
            r = this.$_popperNode.querySelector(".v-popper__wrapper"),
            o = r.parentNode.getBoundingClientRect(),
            a = e.x + e.width / 2 - (o.left + r.offsetLeft),
            u = e.y + e.height / 2 - (o.top + r.offsetTop)
          this.result.transformOrigin = `${a}px ${u}px`
        }
        ;(this.isShown = !0),
          this.$_applyAttrsToTarget({
            "aria-describedby": this.popperId,
            "data-popper-shown": "",
          })
        const t = this.showGroup
        if (t) {
          let e
          for (let r = 0; r < gr.length; r++)
            (e = gr[r]), e.showGroup !== t && (e.hide(), e.$emit("close-group"))
        }
        gr.push(this),
          this.$emit("apply-show"),
          (this.classes.showFrom = !0),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !1),
          await Xu(),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !0)
      },
      async $_applyHide(t = !1) {
        if ((clearTimeout(this.$_scheduleTimer), !this.isShown)) return
        ;(this.skipTransition = t),
          Kk(gr, this),
          Do === this && (Do = null),
          (this.isShown = !1),
          this.$_applyAttrsToTarget({
            "aria-describedby": void 0,
            "data-popper-shown": void 0,
          }),
          clearTimeout(this.$_disposeTimer)
        const e = ns(this.theme, "disposeTimeout")
        e !== null &&
          (this.$_disposeTimer = setTimeout(() => {
            this.$_popperNode &&
              (this.$_detachPopperNode(), (this.isMounted = !1))
          }, e)),
          this.$emit("apply-hide"),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !0),
          (this.classes.hideTo = !1),
          await Xu(),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !0)
      },
      $_autoShowHide() {
        this.shown ? this.show() : this.hide()
      },
      $_ensureTeleport() {
        if (this.$_isDisposed) return
        let t = this.container
        if (
          (typeof t == "string"
            ? (t = window.document.querySelector(t))
            : t === !1 && (t = this.$_targetNodes[0].parentNode),
          !t)
        )
          throw new Error("No container for popover: " + this.container)
        t.appendChild(this.$_popperNode), (this.isMounted = !0)
      },
      $_addEventListeners() {
        const t = (a, u, f) => {
            this.$_events.push({ targetNodes: a, eventType: u, handler: f }),
              a.forEach((h) =>
                h.addEventListener(u, f, rs ? { passive: !0 } : void 0),
              )
          },
          e = (a, u, f, h, p) => {
            let g = f
            h != null && (g = typeof h == "function" ? h(g) : h),
              g.forEach((v) => {
                const b = u[v]
                b && t(a, b, p)
              })
          },
          r = (a) => {
            ;(this.isShown && !this.$_hideInProgress) ||
              ((a.usedByTooltip = !0),
              !this.$_preventShow && this.show({ event: a }))
          }
        e(this.$_targetNodes, sv, this.triggers, this.showTriggers, r),
          e(
            [this.$_popperNode],
            sv,
            this.popperTriggers,
            this.popperShowTriggers,
            r,
          )
        const o = (a) => {
          a.usedByTooltip || this.hide({ event: a })
        }
        e(this.$_targetNodes, lv, this.triggers, this.hideTriggers, o),
          e(
            [this.$_popperNode],
            lv,
            this.popperTriggers,
            this.popperHideTriggers,
            o,
          ),
          t(
            [...ec(this.$_referenceNode), ...ec(this.$_popperNode)],
            "scroll",
            () => {
              this.$_computePosition()
            },
          )
      },
      $_removeEventListeners() {
        this.$_events.forEach(
          ({ targetNodes: t, eventType: e, handler: r }) => {
            t.forEach((o) => o.removeEventListener(e, r))
          },
        ),
          (this.$_events = [])
      },
      $_handleGlobalClose(t, e = !1) {
        this.$_showFrameLocked ||
          (this.hide({ event: t }),
          t.closePopover
            ? this.$emit("close-directive")
            : this.$emit("auto-hide"),
          e &&
            ((this.$_preventShow = !0),
            setTimeout(() => {
              this.$_preventShow = !1
            }, 300)))
      },
      $_detachPopperNode() {
        this.$_popperNode.parentNode &&
          this.$_popperNode.parentNode.removeChild(this.$_popperNode)
      },
      $_swapTargetAttrs(t, e) {
        for (const r of this.$_targetNodes) {
          const o = r.getAttribute(t)
          o && (r.removeAttribute(t), r.setAttribute(e, o))
        }
      },
      $_applyAttrsToTarget(t) {
        for (const e of this.$_targetNodes)
          for (const r in t) {
            const o = t[r]
            o == null ? e.removeAttribute(r) : e.setAttribute(r, o)
          }
      },
    },
    render() {
      return this.$slots.default(this.slotData)
    },
  })
typeof document < "u" &&
  typeof window < "u" &&
  (L0
    ? (document.addEventListener(
        "touchstart",
        av,
        rs ? { passive: !0, capture: !0 } : !0,
      ),
      document.addEventListener(
        "touchend",
        Yk,
        rs ? { passive: !0, capture: !0 } : !0,
      ))
    : (window.addEventListener("mousedown", av, !0),
      window.addEventListener("click", Xk, !0)),
  window.addEventListener("resize", Zk))
function av(t) {
  for (let e = 0; e < gr.length; e++) {
    const r = gr[e],
      o = r.popperNode()
    r.$_mouseDownContains = o.contains(t.target)
  }
}
function Xk(t) {
  N0(t)
}
function Yk(t) {
  N0(t, !0)
}
function N0(t, e = !1) {
  for (let r = 0; r < gr.length; r++) {
    const o = gr[r],
      a = o.popperNode(),
      u = o.$_mouseDownContains || a.contains(t.target)
    requestAnimationFrame(() => {
      ;(t.closeAllPopover || (t.closePopover && u) || (o.autoHide && !u)) &&
        o.$_handleGlobalClose(t, e)
    })
  }
}
function Zk(t) {
  for (let e = 0; e < gr.length; e++) gr[e].$_computePosition(t)
}
function Jk() {
  var t = window.navigator.userAgent,
    e = t.indexOf("MSIE ")
  if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10)
  var r = t.indexOf("Trident/")
  if (r > 0) {
    var o = t.indexOf("rv:")
    return parseInt(t.substring(o + 3, t.indexOf(".", o)), 10)
  }
  var a = t.indexOf("Edge/")
  return a > 0 ? parseInt(t.substring(a + 5, t.indexOf(".", a)), 10) : -1
}
let Ra
function Df() {
  Df.init || ((Df.init = !0), (Ra = Jk() !== -1))
}
var Dc = {
  name: "ResizeObserver",
  props: {
    emitOnMount: { type: Boolean, default: !1 },
    ignoreWidth: { type: Boolean, default: !1 },
    ignoreHeight: { type: Boolean, default: !1 },
  },
  emits: ["notify"],
  mounted() {
    Df(),
      Hr(() => {
        ;(this._w = this.$el.offsetWidth),
          (this._h = this.$el.offsetHeight),
          this.emitOnMount && this.emitSize()
      })
    const t = document.createElement("object")
    ;(this._resizeObject = t),
      t.setAttribute("aria-hidden", "true"),
      t.setAttribute("tabindex", -1),
      (t.onload = this.addResizeHandlers),
      (t.type = "text/html"),
      Ra && this.$el.appendChild(t),
      (t.data = "about:blank"),
      Ra || this.$el.appendChild(t)
  },
  beforeUnmount() {
    this.removeResizeHandlers()
  },
  methods: {
    compareAndNotify() {
      ;((!this.ignoreWidth && this._w !== this.$el.offsetWidth) ||
        (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
        ((this._w = this.$el.offsetWidth),
        (this._h = this.$el.offsetHeight),
        this.emitSize())
    },
    emitSize() {
      this.$emit("notify", { width: this._w, height: this._h })
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener(
        "resize",
        this.compareAndNotify,
      ),
        this.compareAndNotify()
    },
    removeResizeHandlers() {
      this._resizeObject &&
        this._resizeObject.onload &&
        (!Ra &&
          this._resizeObject.contentDocument &&
          this._resizeObject.contentDocument.defaultView.removeEventListener(
            "resize",
            this.compareAndNotify,
          ),
        this.$el.removeChild(this._resizeObject),
        (this._resizeObject.onload = null),
        (this._resizeObject = null))
    },
  },
}
const Qk = _1()
Rm("data-v-b329ee4c")
const tC = { class: "resize-observer", tabindex: "-1" }
zm()
const eC = Qk((t, e, r, o, a, u) => (lt(), Jt("div", tC)))
Dc.render = eC
Dc.__scopeId = "data-v-b329ee4c"
Dc.__file = "src/components/ResizeObserver.vue"
var P0 = {
    computed: {
      themeClass() {
        return Vk(this.theme)
      },
    },
  },
  Mh = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, a] of e) r[o] = a
    return r
  }
const nC = re({
    name: "VPopperContent",
    components: { ResizeObserver: Dc },
    mixins: [P0],
    props: {
      popperId: String,
      theme: String,
      shown: Boolean,
      mounted: Boolean,
      skipTransition: Boolean,
      autoHide: Boolean,
      handleResize: Boolean,
      classes: Object,
      result: Object,
    },
    emits: ["hide", "resize"],
    methods: {
      toPx(t) {
        return t != null && !isNaN(t) ? `${t}px` : null
      },
    },
  }),
  rC = ["id", "aria-hidden", "tabindex", "data-popper-placement"],
  iC = { ref: "inner", class: "v-popper__inner" },
  oC = ut("div", { class: "v-popper__arrow-outer" }, null, -1),
  sC = ut("div", { class: "v-popper__arrow-inner" }, null, -1),
  lC = [oC, sC]
function aC(t, e, r, o, a, u) {
  const f = eo("ResizeObserver")
  return (
    lt(),
    Tt(
      "div",
      {
        "id": t.popperId,
        "ref": "popover",
        "class": ve([
          "v-popper__popper",
          [
            t.themeClass,
            t.classes.popperClass,
            {
              "v-popper__popper--shown": t.shown,
              "v-popper__popper--hidden": !t.shown,
              "v-popper__popper--show-from": t.classes.showFrom,
              "v-popper__popper--show-to": t.classes.showTo,
              "v-popper__popper--hide-from": t.classes.hideFrom,
              "v-popper__popper--hide-to": t.classes.hideTo,
              "v-popper__popper--skip-transition": t.skipTransition,
              "v-popper__popper--arrow-overflow": t.result.arrow.overflow,
            },
          ],
        ]),
        "style": Ln({
          position: t.result.strategy,
          transform: `translate3d(${Math.round(t.result.x)}px,${Math.round(t.result.y)}px,0)`,
        }),
        "aria-hidden": t.shown ? "false" : "true",
        "tabindex": t.autoHide ? 0 : void 0,
        "data-popper-placement": t.result.placement,
        "onKeyup":
          e[1] || (e[1] = Cf((h) => t.autoHide && t.$emit("hide"), ["esc"])),
      },
      [
        ut(
          "div",
          {
            class: "v-popper__wrapper",
            style: Ln({ transformOrigin: t.result.transformOrigin }),
          },
          [
            ut(
              "div",
              iC,
              [
                t.mounted
                  ? (lt(),
                    Tt(
                      fe,
                      { key: 0 },
                      [
                        ut("div", null, [er(t.$slots, "default")]),
                        t.handleResize
                          ? (lt(),
                            Jt(f, {
                              key: 0,
                              onNotify:
                                e[0] || (e[0] = (h) => t.$emit("resize", h)),
                            }))
                          : Qt("", !0),
                      ],
                      64,
                    ))
                  : Qt("", !0),
              ],
              512,
            ),
            ut(
              "div",
              {
                ref: "arrow",
                class: "v-popper__arrow-container",
                style: Ln({
                  left: t.toPx(t.result.arrow.x),
                  top: t.toPx(t.result.arrow.y),
                }),
              },
              lC,
              4,
            ),
          ],
          4,
        ),
      ],
      46,
      rC,
    )
  )
}
var O0 = Mh(nC, [["render", aC]]),
  D0 = {
    methods: {
      show(...t) {
        return this.$refs.popper.show(...t)
      },
      hide(...t) {
        return this.$refs.popper.hide(...t)
      },
      dispose(...t) {
        return this.$refs.popper.dispose(...t)
      },
      onResize(...t) {
        return this.$refs.popper.onResize(...t)
      },
    },
  }
const cC = re({
  name: "VPopperWrapper",
  components: { Popper: M0(), PopperContent: O0 },
  mixins: [D0, P0],
  inheritAttrs: !1,
  props: { theme: { type: String, default: null } },
  computed: {
    finalTheme() {
      var t
      return (t = this.theme) != null ? t : this.$options.vPopperTheme
    },
    popperAttrs() {
      const t = Rr({}, this.$attrs)
      return delete t.class, delete t.style, t
    },
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$refs.reference.children).filter(
        (t) => t !== this.$refs.popperContent.$el,
      )
    },
  },
})
function uC(t, e, r, o, a, u) {
  const f = eo("PopperContent"),
    h = eo("Popper")
  return (
    lt(),
    Jt(
      h,
      Si({ ref: "popper" }, t.popperAttrs, {
        "theme": t.finalTheme,
        "target-nodes": t.getTargetNodes,
        "reference-node": () => t.$refs.reference,
        "popper-node": () => t.$refs.popperContent.$el,
      }),
      {
        default: Zt(
          ({
            popperId: p,
            isShown: g,
            shouldMountContent: v,
            skipTransition: b,
            autoHide: w,
            show: S,
            hide: N,
            handleResize: L,
            onResize: A,
            classes: T,
            result: M,
          }) => [
            ut(
              "div",
              {
                ref: "reference",
                class: ve([
                  "v-popper",
                  [t.$attrs.class, t.themeClass, { "v-popper--shown": g }],
                ]),
                style: Ln(t.$attrs.style),
              },
              [
                er(t.$slots, "default", { shown: g, show: S, hide: N }),
                Ft(
                  f,
                  {
                    "ref": "popperContent",
                    "popper-id": p,
                    "theme": t.finalTheme,
                    "shown": g,
                    "mounted": v,
                    "skip-transition": b,
                    "auto-hide": w,
                    "handle-resize": L,
                    "classes": T,
                    "result": M,
                    "onHide": N,
                    "onResize": A,
                  },
                  {
                    default: Zt(() => [
                      er(t.$slots, "popper", { shown: g, hide: N }),
                    ]),
                    _: 2,
                  },
                  1032,
                  [
                    "popper-id",
                    "theme",
                    "shown",
                    "mounted",
                    "skip-transition",
                    "auto-hide",
                    "handle-resize",
                    "classes",
                    "result",
                    "onHide",
                    "onResize",
                  ],
                ),
              ],
              6,
            ),
          ],
        ),
        _: 3,
      },
      16,
      ["theme", "target-nodes", "reference-node", "popper-node"],
    )
  )
}
var Nh = Mh(cC, [["render", uC]])
const cv = re(Ll(Rr({}, Nh), { name: "VDropdown", vPopperTheme: "dropdown" })),
  uv = re(Ll(Rr({}, Nh), { name: "VMenu", vPopperTheme: "menu" })),
  $f = re(Ll(Rr({}, Nh), { name: "VTooltip", vPopperTheme: "tooltip" })),
  fC = re({
    name: "VTooltipDirective",
    components: { Popper: M0(), PopperContent: O0 },
    mixins: [D0],
    inheritAttrs: !1,
    props: {
      theme: { type: String, default: "tooltip" },
      html: { type: Boolean, default: (t) => ns(t.theme, "html") },
      content: { type: [String, Number, Function], default: null },
      loadingContent: {
        type: String,
        default: (t) => ns(t.theme, "loadingContent"),
      },
    },
    data() {
      return { asyncContent: null }
    },
    computed: {
      isContentAsync() {
        return typeof this.content == "function"
      },
      loading() {
        return this.isContentAsync && this.asyncContent == null
      },
      finalContent() {
        return this.isContentAsync
          ? this.loading
            ? this.loadingContent
            : this.asyncContent
          : this.content
      },
    },
    watch: {
      content: {
        handler() {
          this.fetchContent(!0)
        },
        immediate: !0,
      },
      async finalContent() {
        await this.$nextTick(), this.$refs.popper.onResize()
      },
    },
    created() {
      this.$_fetchId = 0
    },
    methods: {
      fetchContent(t) {
        if (
          typeof this.content == "function" &&
          this.$_isShown &&
          (t || (!this.$_loading && this.asyncContent == null))
        ) {
          ;(this.asyncContent = null), (this.$_loading = !0)
          const e = ++this.$_fetchId,
            r = this.content(this)
          r.then ? r.then((o) => this.onResult(e, o)) : this.onResult(e, r)
        }
      },
      onResult(t, e) {
        t === this.$_fetchId && ((this.$_loading = !1), (this.asyncContent = e))
      },
      onShow() {
        ;(this.$_isShown = !0), this.fetchContent()
      },
      onHide() {
        this.$_isShown = !1
      },
    },
  }),
  hC = ["innerHTML"],
  dC = ["textContent"]
function pC(t, e, r, o, a, u) {
  const f = eo("PopperContent"),
    h = eo("Popper")
  return (
    lt(),
    Jt(
      h,
      Si({ ref: "popper" }, t.$attrs, {
        "theme": t.theme,
        "popper-node": () => t.$refs.popperContent.$el,
        "onApplyShow": t.onShow,
        "onApplyHide": t.onHide,
      }),
      {
        default: Zt(
          ({
            popperId: p,
            isShown: g,
            shouldMountContent: v,
            skipTransition: b,
            autoHide: w,
            hide: S,
            handleResize: N,
            onResize: L,
            classes: A,
            result: T,
          }) => [
            Ft(
              f,
              {
                "ref": "popperContent",
                "class": ve({ "v-popper--tooltip-loading": t.loading }),
                "popper-id": p,
                "theme": t.theme,
                "shown": g,
                "mounted": v,
                "skip-transition": b,
                "auto-hide": w,
                "handle-resize": N,
                "classes": A,
                "result": T,
                "onHide": S,
                "onResize": L,
              },
              {
                default: Zt(() => [
                  t.html
                    ? (lt(),
                      Tt(
                        "div",
                        { key: 0, innerHTML: t.finalContent },
                        null,
                        8,
                        hC,
                      ))
                    : (lt(),
                      Tt(
                        "div",
                        { key: 1, textContent: ee(t.finalContent) },
                        null,
                        8,
                        dC,
                      )),
                ]),
                _: 2,
              },
              1032,
              [
                "class",
                "popper-id",
                "theme",
                "shown",
                "mounted",
                "skip-transition",
                "auto-hide",
                "handle-resize",
                "classes",
                "result",
                "onHide",
                "onResize",
              ],
            ),
          ],
        ),
        _: 1,
      },
      16,
      ["theme", "popper-node", "onApplyShow", "onApplyHide"],
    )
  )
}
var gC = Mh(fC, [["render", pC]])
const $0 = "v-popper--has-tooltip"
function vC(t, e) {
  let r = t.placement
  if (!r && e) for (const o of A0) e[o] && (r = o)
  return r || (r = ns(t.theme || "tooltip", "placement")), r
}
function R0(t, e, r) {
  let o
  const a = typeof e
  return (
    a === "string"
      ? (o = { content: e })
      : e && a === "object"
        ? (o = e)
        : (o = { content: !1 }),
    (o.placement = vC(o, r)),
    (o.targetNodes = () => [t]),
    (o.referenceNode = () => t),
    o
  )
}
let Yu,
  gl,
  mC = 0
function yC() {
  if (Yu) return
  ;(gl = Vt([])),
    (Yu = c0({
      name: "VTooltipDirectiveApp",
      setup() {
        return { directives: gl }
      },
      render() {
        return this.directives.map((e) =>
          Tl(
            gC,
            Ll(Rr({}, e.options), {
              shown: e.shown.value || e.options.shown,
              key: e.id,
            }),
          ),
        )
      },
      devtools: { hide: !0 },
    }))
  const t = document.createElement("div")
  document.body.appendChild(t), Yu.mount(t)
}
function z0(t, e, r) {
  yC()
  const o = Vt(R0(t, e, r)),
    a = Vt(!1),
    u = { id: mC++, options: o, shown: a }
  return (
    gl.value.push(u),
    t.classList && t.classList.add($0),
    (t.$_popper = {
      options: o,
      item: u,
      show() {
        a.value = !0
      },
      hide() {
        a.value = !1
      },
    })
  )
}
function Ph(t) {
  if (t.$_popper) {
    const e = gl.value.indexOf(t.$_popper.item)
    e !== -1 && gl.value.splice(e, 1),
      delete t.$_popper,
      delete t.$_popperOldShown,
      delete t.$_popperMountTarget
  }
  t.classList && t.classList.remove($0)
}
function fv(t, { value: e, oldValue: r, modifiers: o }) {
  const a = R0(t, e, o)
  if (!a.content || ns(a.theme || "tooltip", "disabled")) Ph(t)
  else {
    let u
    t.$_popper ? ((u = t.$_popper), (u.options.value = a)) : (u = z0(t, e, o)),
      typeof e.shown < "u" &&
        e.shown !== t.$_popperOldShown &&
        ((t.$_popperOldShown = e.shown), e.shown ? u.show() : u.hide())
  }
}
var F0 = {
  beforeMount: fv,
  updated: fv,
  beforeUnmount(t) {
    Ph(t)
  },
}
function hv(t) {
  t.addEventListener("click", I0),
    t.addEventListener("touchstart", q0, rs ? { passive: !0 } : !1)
}
function dv(t) {
  t.removeEventListener("click", I0),
    t.removeEventListener("touchstart", q0),
    t.removeEventListener("touchend", H0),
    t.removeEventListener("touchcancel", B0)
}
function I0(t) {
  const e = t.currentTarget
  ;(t.closePopover = !e.$_vclosepopover_touch),
    (t.closeAllPopover =
      e.$_closePopoverModifiers && !!e.$_closePopoverModifiers.all)
}
function q0(t) {
  if (t.changedTouches.length === 1) {
    const e = t.currentTarget
    e.$_vclosepopover_touch = !0
    const r = t.changedTouches[0]
    ;(e.$_vclosepopover_touchPoint = r),
      e.addEventListener("touchend", H0),
      e.addEventListener("touchcancel", B0)
  }
}
function H0(t) {
  const e = t.currentTarget
  if (((e.$_vclosepopover_touch = !1), t.changedTouches.length === 1)) {
    const r = t.changedTouches[0],
      o = e.$_vclosepopover_touchPoint
    ;(t.closePopover =
      Math.abs(r.screenY - o.screenY) < 20 &&
      Math.abs(r.screenX - o.screenX) < 20),
      (t.closeAllPopover =
        e.$_closePopoverModifiers && !!e.$_closePopoverModifiers.all)
  }
}
function B0(t) {
  const e = t.currentTarget
  e.$_vclosepopover_touch = !1
}
var bC = {
  beforeMount(t, { value: e, modifiers: r }) {
    ;(t.$_closePopoverModifiers = r), (typeof e > "u" || e) && hv(t)
  },
  updated(t, { value: e, oldValue: r, modifiers: o }) {
    ;(t.$_closePopoverModifiers = o),
      e !== r && (typeof e > "u" || e ? hv(t) : dv(t))
  },
  beforeUnmount(t) {
    dv(t)
  },
}
const wC = F0,
  xC = $f
function _C(t, e = {}) {
  t.$_vTooltipInstalled ||
    ((t.$_vTooltipInstalled = !0),
    E0(Ji, e),
    t.directive("tooltip", F0),
    t.directive("close-popper", bC),
    t.component("v-tooltip", $f),
    t.component("VTooltip", $f),
    t.component("v-dropdown", cv),
    t.component("VDropdown", cv),
    t.component("v-menu", uv),
    t.component("VMenu", uv))
}
const W0 = { version: "2.0.0-y.0", install: _C, options: Ji },
  SC = 6e4
function U0(t) {
  return t
}
const kC = U0,
  { clearTimeout: CC, setTimeout: TC } = globalThis,
  EC = Math.random.bind(Math)
function LC(t, e) {
  const {
      post: r,
      on: o,
      eventNames: a = [],
      serialize: u = U0,
      deserialize: f = kC,
      resolver: h,
      timeout: p = SC,
    } = e,
    g = new Map()
  let v
  const b = new Proxy(
    {},
    {
      get(w, S) {
        if (S === "$functions") return t
        const N = (...A) => {
          r(u({ m: S, a: A, t: "q" }))
        }
        if (a.includes(S)) return (N.asEvent = N), N
        const L = async (...A) => (
          await v,
          new Promise((T, M) => {
            var W, X
            const R = MC()
            let E
            p >= 0 &&
              (E =
                (X = (W = TC(() => {
                  M(new Error(`[birpc] timeout on calling "${S}"`)), g.delete(R)
                }, p)).unref) == null
                  ? void 0
                  : X.call(W)),
              g.set(R, { resolve: T, reject: M, timeoutId: E }),
              r(u({ m: S, a: A, i: R, t: "q" }))
          })
        )
        return (L.asEvent = N), L
      },
    },
  )
  return (
    (v = o(async (w, ...S) => {
      const N = f(w)
      if (N.t === "q") {
        const { m: L, a: A } = N
        let T, M
        const R = h ? h(L, t[L]) : t[L]
        if (!R) M = new Error(`[birpc] function "${L}" not found`)
        else
          try {
            T = await R.apply(b, A)
          } catch (E) {
            M = E
          }
        N.i &&
          (M && e.onError && e.onError(M, L, A),
          r(u({ t: "s", i: N.i, r: T, e: M }), ...S))
      } else {
        const { i: L, r: A, e: T } = N,
          M = g.get(L)
        M && (CC(M.timeoutId), T ? M.reject(T) : M.resolve(A)), g.delete(L)
      }
    })),
    b
  )
}
const AC = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"
function MC(t = 21) {
  let e = "",
    r = t
  for (; r--; ) e += AC[(EC() * 64) | 0]
  return e
}
/*! (c) 2020 Andrea Giammarchi */ const { parse: NC, stringify: PC } = JSON,
  { keys: OC } = Object,
  vl = String,
  j0 = "string",
  pv = {},
  nc = "object",
  G0 = (t, e) => e,
  DC = (t) => (t instanceof vl ? vl(t) : t),
  $C = (t, e) => (typeof e === j0 ? new vl(e) : e),
  V0 = (t, e, r, o) => {
    const a = []
    for (let u = OC(r), { length: f } = u, h = 0; h < f; h++) {
      const p = u[h],
        g = r[p]
      if (g instanceof vl) {
        const v = t[g]
        typeof v === nc && !e.has(v)
          ? (e.add(v), (r[p] = pv), a.push({ k: p, a: [t, e, v, o] }))
          : (r[p] = o.call(r, p, v))
      } else r[p] !== pv && (r[p] = o.call(r, p, g))
    }
    for (let { length: u } = a, f = 0; f < u; f++) {
      const { k: h, a: p } = a[f]
      r[h] = o.call(r, h, V0.apply(null, p))
    }
    return r
  },
  gv = (t, e, r) => {
    const o = vl(e.push(r) - 1)
    return t.set(r, o), o
  },
  Rf = (t, e) => {
    const r = NC(t, $C).map(DC),
      o = r[0],
      a = e || G0,
      u = typeof o === nc && o ? V0(r, new Set(), o, a) : o
    return a.call({ "": u }, "", u)
  },
  RC = (t, e, r) => {
    const o =
        e && typeof e === nc
          ? (v, b) => (v === "" || -1 < e.indexOf(v) ? b : void 0)
          : e || G0,
      a = new Map(),
      u = [],
      f = []
    let h = +gv(a, u, o.call({ "": t }, "", t)),
      p = !h
    for (; h < u.length; ) (p = !0), (f[h] = PC(u[h++], g, r))
    return "[" + f.join(",") + "]"
    function g(v, b) {
      if (p) return (p = !p), b
      const w = o.call(this, v, b)
      switch (typeof w) {
        case nc:
          if (w === null) return w
        case j0:
          return a.get(w) || gv(a, u, w)
      }
      return w
    }
  }
function zC(t = "") {
  return !t || !t.includes("\\") ? t : t.replace(/\\/g, "/")
}
const FC = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/
function IC() {
  return typeof process < "u" ? process.cwd().replace(/\\/g, "/") : "/"
}
const vv = function (...t) {
  t = t.map((o) => zC(o))
  let e = "",
    r = !1
  for (let o = t.length - 1; o >= -1 && !r; o--) {
    const a = o >= 0 ? t[o] : IC()
    !a || a.length === 0 || ((e = `${a}/${e}`), (r = mv(a)))
  }
  return (e = qC(e, !r)), r && !mv(e) ? `/${e}` : e.length > 0 ? e : "."
}
function qC(t, e) {
  let r = "",
    o = 0,
    a = -1,
    u = 0,
    f = null
  for (let h = 0; h <= t.length; ++h) {
    if (h < t.length) f = t[h]
    else {
      if (f === "/") break
      f = "/"
    }
    if (f === "/") {
      if (!(a === h - 1 || u === 1))
        if (u === 2) {
          if (
            r.length < 2 ||
            o !== 2 ||
            r[r.length - 1] !== "." ||
            r[r.length - 2] !== "."
          ) {
            if (r.length > 2) {
              const p = r.lastIndexOf("/")
              p === -1
                ? ((r = ""), (o = 0))
                : ((r = r.slice(0, p)),
                  (o = r.length - 1 - r.lastIndexOf("/"))),
                (a = h),
                (u = 0)
              continue
            } else if (r.length > 0) {
              ;(r = ""), (o = 0), (a = h), (u = 0)
              continue
            }
          }
          e && ((r += r.length > 0 ? "/.." : ".."), (o = 2))
        } else
          r.length > 0
            ? (r += `/${t.slice(a + 1, h)}`)
            : (r = t.slice(a + 1, h)),
            (o = h - a - 1)
      ;(a = h), (u = 0)
    } else f === "." && u !== -1 ? ++u : (u = -1)
  }
  return r
}
const mv = function (t) {
    return FC.test(t)
  },
  HC = function (t, e) {
    const r = vv(t).split("/"),
      o = vv(e).split("/"),
      a = [...r]
    for (const u of a) {
      if (o[0] !== u) break
      r.shift(), o.shift()
    }
    return [...r.map(() => ".."), ...o].join("/")
  }
function BC(t) {
  return typeof AggregateError < "u" && t instanceof AggregateError
    ? !0
    : t instanceof Error && "errors" in t
}
class K0 {
  constructor() {
    ai(this, "filesMap", new Map())
    ai(this, "pathsSet", new Set())
    ai(this, "browserTestPromises", new Map())
    ai(this, "idMap", new Map())
    ai(this, "taskFileMap", new WeakMap())
    ai(this, "errorsSet", new Set())
    ai(this, "processTimeoutCauses", new Set())
  }
  catchError(e, r) {
    if (BC(e)) return e.errors.forEach((a) => this.catchError(a, r))
    e === Object(e) ? (e.type = r) : (e = { type: r, message: e })
    const o = e
    if (o && typeof o == "object" && o.code === "VITEST_PENDING") {
      const a = this.idMap.get(o.taskId)
      a &&
        ((a.mode = "skip"),
        a.result ?? (a.result = { state: "skip" }),
        (a.result.state = "skip"))
      return
    }
    this.errorsSet.add(e)
  }
  clearErrors() {
    this.errorsSet.clear()
  }
  getUnhandledErrors() {
    return Array.from(this.errorsSet.values())
  }
  addProcessTimeoutCause(e) {
    this.processTimeoutCauses.add(e)
  }
  getProcessTimeoutCauses() {
    return Array.from(this.processTimeoutCauses.values())
  }
  getPaths() {
    return Array.from(this.pathsSet)
  }
  getFiles(e) {
    return e
      ? e
          .map((r) => this.filesMap.get(r))
          .filter(Boolean)
          .flat()
      : Array.from(this.filesMap.values()).flat()
  }
  getFilepaths() {
    return Array.from(this.filesMap.keys())
  }
  getFailedFilepaths() {
    return this.getFiles()
      .filter((e) => {
        var r
        return ((r = e.result) == null ? void 0 : r.state) === "fail"
      })
      .map((e) => e.filepath)
  }
  collectPaths(e = []) {
    e.forEach((r) => {
      this.pathsSet.add(r)
    })
  }
  collectFiles(e = []) {
    e.forEach((r) => {
      const a = (this.filesMap.get(r.filepath) || []).filter(
        (u) => u.projectName !== r.projectName,
      )
      a.push(r), this.filesMap.set(r.filepath, a), this.updateId(r)
    })
  }
  clearFiles(e, r = []) {
    const o = e
    r.forEach((a) => {
      const u = this.filesMap.get(a)
      if (!u) return
      const f = u.filter((h) => h.projectName !== o.config.name)
      f.length ? this.filesMap.set(a, f) : this.filesMap.delete(a)
    })
  }
  updateId(e) {
    this.idMap.get(e.id) !== e &&
      (this.idMap.set(e.id, e),
      e.type === "suite" &&
        e.tasks.forEach((r) => {
          this.updateId(r)
        }))
  }
  updateTasks(e) {
    for (const [r, o, a] of e) {
      const u = this.idMap.get(r)
      u &&
        ((u.result = o),
        (u.meta = a),
        (o == null ? void 0 : o.state) === "skip" && (u.mode = "skip"))
    }
  }
  updateUserLog(e) {
    const r = e.taskId && this.idMap.get(e.taskId)
    r && (r.logs || (r.logs = []), r.logs.push(e))
  }
  getCountOfFailedTests() {
    return Array.from(this.idMap.values()).filter((e) => {
      var r
      return ((r = e.result) == null ? void 0 : r.state) === "fail"
    }).length
  }
  cancelFiles(e, r, o) {
    this.collectFiles(
      e.map((a) => ({
        filepath: a,
        name: HC(r, a),
        id: a,
        mode: "skip",
        type: "suite",
        result: { state: "skip" },
        meta: {},
        tasks: [],
        projectName: o,
      })),
    )
  }
}
var no =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {}
function X0(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t
}
function Y0(t) {
  return t == null && (t = []), Array.isArray(t) ? t : [t]
}
function zf(t) {
  return t.type === "test" || t.type === "custom"
}
function Z0(t) {
  const e = [],
    r = Y0(t)
  for (const o of r)
    if (zf(o)) e.push(o)
    else for (const a of o.tasks) zf(a) ? e.push(a) : e.push(...Z0(a))
  return e
}
function Oh(t = []) {
  return Y0(t).flatMap((e) => (zf(e) ? [e] : [e, ...Oh(e.tasks)]))
}
function WC(t) {
  const e = [t.name]
  let r = t
  for (; (r != null && r.suite) || (r != null && r.file); )
    (r = r.suite || r.file), r != null && r.name && e.unshift(r.name)
  return e
}
function $c(t) {
  return Z0(t).some((e) => {
    var r, o
    return (o = (r = e.result) == null ? void 0 : r.errors) == null
      ? void 0
      : o.some(
          (a) =>
            typeof (a == null ? void 0 : a.message) == "string" &&
            a.message.match(/Snapshot .* mismatched/),
        )
  })
}
function UC(t, e = {}) {
  const {
    handlers: r = {},
    autoReconnect: o = !0,
    reconnectInterval: a = 2e3,
    reconnectTries: u = 10,
    reactive: f = (T) => T,
    WebSocketConstructor: h = globalThis.WebSocket,
  } = e
  let p = u
  const g = f({
    ws: new h(t),
    state: new K0(),
    waitForConnection: A,
    reconnect: N,
  })
  ;(g.state.filesMap = f(g.state.filesMap)), (g.state.idMap = f(g.state.idMap))
  let v
  const b = {
      onPathsCollected(T) {
        var M
        g.state.collectPaths(T),
          (M = r.onPathsCollected) == null || M.call(r, T)
      },
      onCollected(T) {
        var M
        g.state.collectFiles(T), (M = r.onCollected) == null || M.call(r, T)
      },
      onTaskUpdate(T) {
        var M
        g.state.updateTasks(T), (M = r.onTaskUpdate) == null || M.call(r, T)
      },
      onUserConsoleLog(T) {
        g.state.updateUserLog(T)
      },
      onFinished(T) {
        var M
        ;(M = r.onFinished) == null || M.call(r, T)
      },
      onCancel(T) {
        var M
        ;(M = r.onCancel) == null || M.call(r, T)
      },
    },
    w = {
      post: (T) => g.ws.send(T),
      on: (T) => (v = T),
      serialize: RC,
      deserialize: Rf,
    }
  g.rpc = LC(b, w)
  let S
  function N(T = !1) {
    T && (p = u), (g.ws = new h(t)), L()
  }
  function L() {
    ;(S = new Promise((T) => {
      g.ws.addEventListener("open", () => {
        ;(p = u), T()
      })
    })),
      g.ws.addEventListener("message", (T) => {
        v(T.data)
      }),
      g.ws.addEventListener("close", () => {
        ;(p -= 1), o && p > 0 && setTimeout(N, a)
      })
  }
  L()
  function A() {
    return S
  }
  return g
}
const jC = location.port,
  GC = [location.hostname, jC].filter(Boolean).join(":"),
  VC = `${location.protocol === "https:" ? "wss:" : "ws:"}//${GC}/__vitest_api__`,
  Ur = !!window.METADATA_PATH
function Dh(t) {
  return gm() ? (qx(t), !0) : !1
}
function br(t) {
  return typeof t == "function" ? t() : G(t)
}
const KC = typeof window < "u" && typeof document < "u"
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope
const XC = Object.prototype.toString,
  YC = (t) => XC.call(t) === "[object Object]",
  ro = () => {}
function $h(t, e) {
  function r(...o) {
    return new Promise((a, u) => {
      Promise.resolve(
        t(() => e.apply(this, o), { fn: e, thisArg: this, args: o }),
      )
        .then(a)
        .catch(u)
    })
  }
  return r
}
const J0 = (t) => t()
function Q0(t, e = {}) {
  let r,
    o,
    a = ro
  const u = (h) => {
    clearTimeout(h), a(), (a = ro)
  }
  return (h) => {
    const p = br(t),
      g = br(e.maxWait)
    return (
      r && u(r),
      p <= 0 || (g !== void 0 && g <= 0)
        ? (o && (u(o), (o = null)), Promise.resolve(h()))
        : new Promise((v, b) => {
            ;(a = e.rejectOnCancel ? b : v),
              g &&
                !o &&
                (o = setTimeout(() => {
                  r && u(r), (o = null), v(h())
                }, g)),
              (r = setTimeout(() => {
                o && u(o), (o = null), v(h())
              }, p))
          })
    )
  }
}
function ZC(t, e = !0, r = !0, o = !1) {
  let a = 0,
    u,
    f = !0,
    h = ro,
    p
  const g = () => {
    u && (clearTimeout(u), (u = void 0), h(), (h = ro))
  }
  return (b) => {
    const w = br(t),
      S = Date.now() - a,
      N = () => (p = b())
    return (
      g(),
      w <= 0
        ? ((a = Date.now()), N())
        : (S > w && (r || !f)
            ? ((a = Date.now()), N())
            : e &&
              (p = new Promise((L, A) => {
                ;(h = o ? A : L),
                  (u = setTimeout(
                    () => {
                      ;(a = Date.now()), (f = !0), L(N()), g()
                    },
                    Math.max(0, w - S),
                  ))
              })),
          !r && !u && (u = setTimeout(() => (f = !0), w)),
          (f = !1),
          p)
    )
  }
}
function JC(t = J0) {
  const e = Vt(!0)
  function r() {
    e.value = !1
  }
  function o() {
    e.value = !0
  }
  const a = (...u) => {
    e.value && t(...u)
  }
  return { isActive: wc(e), pause: r, resume: o, eventFilter: a }
}
function QC(...t) {
  if (t.length !== 1) return hh(...t)
  const e = t[0]
  return typeof e == "function" ? wc(f1(() => ({ get: e, set: ro }))) : Vt(e)
}
function yv(t, e = 200, r = {}) {
  return $h(Q0(e, r), t)
}
function tT(t, e = 200, r = !1, o = !0, a = !1) {
  return $h(ZC(e, r, o, a), t)
}
function eT(t, e = 200, r = !0, o = !0) {
  if (e <= 0) return t
  const a = Vt(t.value),
    u = tT(
      () => {
        a.value = t.value
      },
      e,
      r,
      o,
    )
  return $e(t, () => u()), a
}
function ty(t, e, r = {}) {
  const { eventFilter: o = J0, ...a } = r
  return $e(t, $h(o, e), a)
}
function ey(t, e, r = {}) {
  const { eventFilter: o, ...a } = r,
    { eventFilter: u, pause: f, resume: h, isActive: p } = JC(o)
  return {
    stop: ty(t, e, { ...a, eventFilter: u }),
    pause: f,
    resume: h,
    isActive: p,
  }
}
function Rh(t, e = !0) {
  Cl() ? us(t) : e ? t() : Hr(t)
}
function nT(t = !1, e = {}) {
  const { truthyValue: r = !0, falsyValue: o = !1 } = e,
    a = Le(t),
    u = Vt(t)
  function f(h) {
    if (arguments.length) return (u.value = h), u.value
    {
      const p = br(r)
      return (u.value = u.value === p ? br(o) : p), u.value
    }
  }
  return a ? f : [u, f]
}
function rT(t, e, r = {}) {
  const { debounce: o = 0, maxWait: a = void 0, ...u } = r
  return ty(t, e, { ...u, eventFilter: Q0(o, { maxWait: a }) })
}
function iT(t, e, r) {
  const o = $e(t, (...a) => (Hr(() => o()), e(...a)), r)
  return o
}
function oT(t, e, r) {
  let o
  Le(r) ? (o = { evaluating: r }) : (o = r || {})
  const {
      lazy: a = !1,
      evaluating: u = void 0,
      shallow: f = !0,
      onError: h = ro,
    } = o,
    p = Vt(!a),
    g = f ? cs(e) : Vt(e)
  let v = 0
  return (
    mh(async (b) => {
      if (!p.value) return
      v++
      const w = v
      let S = !1
      u &&
        Promise.resolve().then(() => {
          u.value = !0
        })
      try {
        const N = await t((L) => {
          b(() => {
            u && (u.value = !1), S || L()
          })
        })
        w === v && (g.value = N)
      } catch (N) {
        h(N)
      } finally {
        u && w === v && (u.value = !1), (S = !0)
      }
    }),
    a ? xt(() => ((p.value = !0), g.value)) : g
  )
}
function rc(t) {
  var e
  const r = br(t)
  return (e = r == null ? void 0 : r.$el) != null ? e : r
}
const jr = KC ? window : void 0
function is(...t) {
  let e, r, o, a
  if (
    (typeof t[0] == "string" || Array.isArray(t[0])
      ? (([r, o, a] = t), (e = jr))
      : ([e, r, o, a] = t),
    !e)
  )
    return ro
  Array.isArray(r) || (r = [r]), Array.isArray(o) || (o = [o])
  const u = [],
    f = () => {
      u.forEach((v) => v()), (u.length = 0)
    },
    h = (v, b, w, S) => (
      v.addEventListener(b, w, S), () => v.removeEventListener(b, w, S)
    ),
    p = $e(
      () => [rc(e), br(a)],
      ([v, b]) => {
        if ((f(), !v)) return
        const w = YC(b) ? { ...b } : b
        u.push(...r.flatMap((S) => o.map((N) => h(v, S, N, w))))
      },
      { immediate: !0, flush: "post" },
    ),
    g = () => {
      p(), f()
    }
  return Dh(g), g
}
function sT(t) {
  return typeof t == "function"
    ? t
    : typeof t == "string"
      ? (e) => e.key === t
      : Array.isArray(t)
        ? (e) => t.includes(e.key)
        : () => !0
}
function lT(...t) {
  let e,
    r,
    o = {}
  t.length === 3
    ? ((e = t[0]), (r = t[1]), (o = t[2]))
    : t.length === 2
      ? typeof t[1] == "object"
        ? ((e = !0), (r = t[0]), (o = t[1]))
        : ((e = t[0]), (r = t[1]))
      : ((e = !0), (r = t[0]))
  const {
      target: a = jr,
      eventName: u = "keydown",
      passive: f = !1,
      dedupe: h = !1,
    } = o,
    p = sT(e)
  return is(
    a,
    u,
    (v) => {
      ;(v.repeat && br(h)) || (p(v) && r(v))
    },
    f,
  )
}
function aT() {
  const t = Vt(!1)
  return (
    Cl() &&
      us(() => {
        t.value = !0
      }),
    t
  )
}
function ny(t) {
  const e = aT()
  return xt(() => (e.value, !!t()))
}
function ry(t, e = {}) {
  const { window: r = jr } = e,
    o = ny(() => r && "matchMedia" in r && typeof r.matchMedia == "function")
  let a
  const u = Vt(!1),
    f = (g) => {
      u.value = g.matches
    },
    h = () => {
      a &&
        ("removeEventListener" in a
          ? a.removeEventListener("change", f)
          : a.removeListener(f))
    },
    p = mh(() => {
      o.value &&
        (h(),
        (a = r.matchMedia(br(t))),
        "addEventListener" in a
          ? a.addEventListener("change", f)
          : a.addListener(f),
        (u.value = a.matches))
    })
  return (
    Dh(() => {
      p(), h(), (a = void 0)
    }),
    u
  )
}
const Sa =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {},
  ka = "__vueuse_ssr_handlers__",
  cT = uT()
function uT() {
  return ka in Sa || (Sa[ka] = Sa[ka] || {}), Sa[ka]
}
function iy(t, e) {
  return cT[t] || e
}
function fT(t) {
  return t == null
    ? "any"
    : t instanceof Set
      ? "set"
      : t instanceof Map
        ? "map"
        : t instanceof Date
          ? "date"
          : typeof t == "boolean"
            ? "boolean"
            : typeof t == "string"
              ? "string"
              : typeof t == "object"
                ? "object"
                : Number.isNaN(t)
                  ? "any"
                  : "number"
}
const hT = {
    boolean: { read: (t) => t === "true", write: (t) => String(t) },
    object: { read: (t) => JSON.parse(t), write: (t) => JSON.stringify(t) },
    number: { read: (t) => Number.parseFloat(t), write: (t) => String(t) },
    any: { read: (t) => t, write: (t) => String(t) },
    string: { read: (t) => t, write: (t) => String(t) },
    map: {
      read: (t) => new Map(JSON.parse(t)),
      write: (t) => JSON.stringify(Array.from(t.entries())),
    },
    set: {
      read: (t) => new Set(JSON.parse(t)),
      write: (t) => JSON.stringify(Array.from(t)),
    },
    date: { read: (t) => new Date(t), write: (t) => t.toISOString() },
  },
  bv = "vueuse-storage"
function dT(t, e, r, o = {}) {
  var a
  const {
      flush: u = "pre",
      deep: f = !0,
      listenToStorageChanges: h = !0,
      writeDefaults: p = !0,
      mergeDefaults: g = !1,
      shallow: v,
      window: b = jr,
      eventFilter: w,
      onError: S = (et) => {
        console.error(et)
      },
      initOnMounted: N,
    } = o,
    L = (v ? cs : Vt)(typeof e == "function" ? e() : e)
  if (!r)
    try {
      r = iy("getDefaultStorage", () => {
        var et
        return (et = jr) == null ? void 0 : et.localStorage
      })()
    } catch (et) {
      S(et)
    }
  if (!r) return L
  const A = br(e),
    T = fT(A),
    M = (a = o.serializer) != null ? a : hT[T],
    { pause: R, resume: E } = ey(L, () => W(L.value), {
      flush: u,
      deep: f,
      eventFilter: w,
    })
  return (
    b &&
      h &&
      Rh(() => {
        is(b, "storage", Y), is(b, bv, ft), N && Y()
      }),
    N || Y(),
    L
  )
  function W(et) {
    try {
      if (et == null) r.removeItem(t)
      else {
        const st = M.write(et),
          dt = r.getItem(t)
        dt !== st &&
          (r.setItem(t, st),
          b &&
            b.dispatchEvent(
              new CustomEvent(bv, {
                detail: { key: t, oldValue: dt, newValue: st, storageArea: r },
              }),
            ))
      }
    } catch (st) {
      S(st)
    }
  }
  function X(et) {
    const st = et ? et.newValue : r.getItem(t)
    if (st == null) return p && A !== null && r.setItem(t, M.write(A)), A
    if (!et && g) {
      const dt = M.read(st)
      return typeof g == "function"
        ? g(dt, A)
        : T === "object" && !Array.isArray(dt)
          ? { ...A, ...dt }
          : dt
    } else return typeof st != "string" ? st : M.read(st)
  }
  function ft(et) {
    Y(et.detail)
  }
  function Y(et) {
    if (!(et && et.storageArea !== r)) {
      if (et && et.key == null) {
        L.value = A
        return
      }
      if (!(et && et.key !== t)) {
        R()
        try {
          ;(et == null ? void 0 : et.newValue) !== M.write(L.value) &&
            (L.value = X(et))
        } catch (st) {
          S(st)
        } finally {
          et ? Hr(E) : E()
        }
      }
    }
  }
}
function pT(t) {
  return ry("(prefers-color-scheme: dark)", t)
}
function gT(t = {}) {
  const {
      selector: e = "html",
      attribute: r = "class",
      initialValue: o = "auto",
      window: a = jr,
      storage: u,
      storageKey: f = "vueuse-color-scheme",
      listenToStorageChanges: h = !0,
      storageRef: p,
      emitAuto: g,
      disableTransition: v = !0,
    } = t,
    b = { auto: "", light: "light", dark: "dark", ...(t.modes || {}) },
    w = pT({ window: a }),
    S = xt(() => (w.value ? "dark" : "light")),
    N =
      p ||
      (f == null
        ? QC(o)
        : dT(f, o, u, { window: a, listenToStorageChanges: h })),
    L = xt(() => (N.value === "auto" ? S.value : N.value)),
    A = iy("updateHTMLAttrs", (E, W, X) => {
      const ft =
        typeof E == "string"
          ? a == null
            ? void 0
            : a.document.querySelector(E)
          : rc(E)
      if (!ft) return
      let Y
      if (v) {
        Y = a.document.createElement("style")
        const et =
          "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
        Y.appendChild(document.createTextNode(et)),
          a.document.head.appendChild(Y)
      }
      if (W === "class") {
        const et = X.split(/\s/g)
        Object.values(b)
          .flatMap((st) => (st || "").split(/\s/g))
          .filter(Boolean)
          .forEach((st) => {
            et.includes(st) ? ft.classList.add(st) : ft.classList.remove(st)
          })
      } else ft.setAttribute(W, X)
      v && (a.getComputedStyle(Y).opacity, document.head.removeChild(Y))
    })
  function T(E) {
    var W
    A(e, r, (W = b[E]) != null ? W : E)
  }
  function M(E) {
    t.onChanged ? t.onChanged(E, T) : T(E)
  }
  $e(L, M, { flush: "post", immediate: !0 }), Rh(() => M(L.value))
  const R = xt({
    get() {
      return g ? N.value : L.value
    },
    set(E) {
      N.value = E
    },
  })
  try {
    return Object.assign(R, { store: N, system: S, state: L })
  } catch {
    return R
  }
}
function vT(t = {}) {
  const { valueDark: e = "dark", valueLight: r = "" } = t,
    o = gT({
      ...t,
      onChanged: (u, f) => {
        var h
        t.onChanged
          ? (h = t.onChanged) == null || h.call(t, u === "dark", f, u)
          : f(u)
      },
      modes: { dark: e, light: r },
    })
  return xt({
    get() {
      return o.value === "dark"
    },
    set(u) {
      const f = u ? "dark" : "light"
      o.system.value === f ? (o.value = "auto") : (o.value = f)
    },
  })
}
function mT(t, e, r = {}) {
  const { window: o = jr, ...a } = r
  let u
  const f = ny(() => o && "ResizeObserver" in o),
    h = () => {
      u && (u.disconnect(), (u = void 0))
    },
    p = xt(() => (Array.isArray(t) ? t.map((b) => rc(b)) : [rc(t)])),
    g = $e(
      p,
      (b) => {
        if ((h(), f.value && o)) {
          u = new ResizeObserver(e)
          for (const w of b) w && u.observe(w, a)
        }
      },
      { immediate: !0, flush: "post", deep: !0 },
    ),
    v = () => {
      h(), g()
    }
  return Dh(v), { isSupported: f, stop: v }
}
function yT(t = "history", e = {}) {
  const {
    initialValue: r = {},
    removeNullishValues: o = !0,
    removeFalsyValues: a = !1,
    write: u = !0,
    window: f = jr,
  } = e
  if (!f) return Bn(r)
  const h = Bn({})
  function p() {
    if (t === "history") return f.location.search || ""
    if (t === "hash") {
      const T = f.location.hash || "",
        M = T.indexOf("?")
      return M > 0 ? T.slice(M) : ""
    } else return (f.location.hash || "").replace(/^#/, "")
  }
  function g(T) {
    const M = T.toString()
    if (t === "history") return `${M ? `?${M}` : ""}${f.location.hash || ""}`
    if (t === "hash-params")
      return `${f.location.search || ""}${M ? `#${M}` : ""}`
    const R = f.location.hash || "#",
      E = R.indexOf("?")
    return E > 0
      ? `${R.slice(0, E)}${M ? `?${M}` : ""}`
      : `${R}${M ? `?${M}` : ""}`
  }
  function v() {
    return new URLSearchParams(p())
  }
  function b(T) {
    const M = new Set(Object.keys(h))
    for (const R of T.keys()) {
      const E = T.getAll(R)
      ;(h[R] = E.length > 1 ? E : T.get(R) || ""), M.delete(R)
    }
    Array.from(M).forEach((R) => delete h[R])
  }
  const { pause: w, resume: S } = ey(
    h,
    () => {
      const T = new URLSearchParams("")
      Object.keys(h).forEach((M) => {
        const R = h[M]
        Array.isArray(R)
          ? R.forEach((E) => T.append(M, E))
          : (o && R == null) || (a && !R)
            ? T.delete(M)
            : T.set(M, R)
      }),
        N(T)
    },
    { deep: !0 },
  )
  function N(T, M) {
    w(),
      M && b(T),
      f.history.replaceState(
        f.history.state,
        f.document.title,
        f.location.pathname + g(T),
      ),
      S()
  }
  function L() {
    u && N(v(), !0)
  }
  is(f, "popstate", L, !1), t !== "history" && is(f, "hashchange", L, !1)
  const A = v()
  return A.keys().next().value ? b(A) : Object.assign(h, r), h
}
function bT(t = {}) {
  const {
      window: e = jr,
      initialWidth: r = Number.POSITIVE_INFINITY,
      initialHeight: o = Number.POSITIVE_INFINITY,
      listenOrientation: a = !0,
      includeScrollbar: u = !0,
    } = t,
    f = Vt(r),
    h = Vt(o),
    p = () => {
      e &&
        (u
          ? ((f.value = e.innerWidth), (h.value = e.innerHeight))
          : ((f.value = e.document.documentElement.clientWidth),
            (h.value = e.document.documentElement.clientHeight)))
    }
  if ((p(), Rh(p), is("resize", p, { passive: !0 }), a)) {
    const g = ry("(orientation: portrait)")
    $e(g, () => p())
  }
  return { width: f, height: h }
}
const oy = yT("hash", { initialValue: { file: "", view: null } }),
  pr = hh(oy, "file"),
  Xn = hh(oy, "view")
var $n = Uint8Array,
  zo = Uint16Array,
  wT = Int32Array,
  sy = new $n([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  ly = new $n([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  xT = new $n([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]),
  ay = function (t, e) {
    for (var r = new zo(31), o = 0; o < 31; ++o) r[o] = e += 1 << t[o - 1]
    for (var a = new wT(r[30]), o = 1; o < 30; ++o)
      for (var u = r[o]; u < r[o + 1]; ++u) a[u] = ((u - r[o]) << 5) | o
    return { b: r, r: a }
  },
  cy = ay(sy, 2),
  uy = cy.b,
  _T = cy.r
;(uy[28] = 258), (_T[258] = 28)
var ST = ay(ly, 0),
  kT = ST.b,
  Ff = new zo(32768)
for (var _e = 0; _e < 32768; ++_e) {
  var di = ((_e & 43690) >> 1) | ((_e & 21845) << 1)
  ;(di = ((di & 52428) >> 2) | ((di & 13107) << 2)),
    (di = ((di & 61680) >> 4) | ((di & 3855) << 4)),
    (Ff[_e] = (((di & 65280) >> 8) | ((di & 255) << 8)) >> 1)
}
var sl = function (t, e, r) {
    for (var o = t.length, a = 0, u = new zo(e); a < o; ++a)
      t[a] && ++u[t[a] - 1]
    var f = new zo(e)
    for (a = 1; a < e; ++a) f[a] = (f[a - 1] + u[a - 1]) << 1
    var h
    if (r) {
      h = new zo(1 << e)
      var p = 15 - e
      for (a = 0; a < o; ++a)
        if (t[a])
          for (
            var g = (a << 4) | t[a],
              v = e - t[a],
              b = f[t[a] - 1]++ << v,
              w = b | ((1 << v) - 1);
            b <= w;
            ++b
          )
            h[Ff[b] >> p] = g
    } else
      for (h = new zo(o), a = 0; a < o; ++a)
        t[a] && (h[a] = Ff[f[t[a] - 1]++] >> (15 - t[a]))
    return h
  },
  Al = new $n(288)
for (var _e = 0; _e < 144; ++_e) Al[_e] = 8
for (var _e = 144; _e < 256; ++_e) Al[_e] = 9
for (var _e = 256; _e < 280; ++_e) Al[_e] = 7
for (var _e = 280; _e < 288; ++_e) Al[_e] = 8
var fy = new $n(32)
for (var _e = 0; _e < 32; ++_e) fy[_e] = 5
var CT = sl(Al, 9, 1),
  TT = sl(fy, 5, 1),
  Zu = function (t) {
    for (var e = t[0], r = 1; r < t.length; ++r) t[r] > e && (e = t[r])
    return e
  },
  Yn = function (t, e, r) {
    var o = (e / 8) | 0
    return ((t[o] | (t[o + 1] << 8)) >> (e & 7)) & r
  },
  Ju = function (t, e) {
    var r = (e / 8) | 0
    return (t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)) >> (e & 7)
  },
  ET = function (t) {
    return ((t + 7) / 8) | 0
  },
  hy = function (t, e, r) {
    return (
      (e == null || e < 0) && (e = 0),
      (r == null || r > t.length) && (r = t.length),
      new $n(t.subarray(e, r))
    )
  },
  LT = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data",
  ],
  Cn = function (t, e, r) {
    var o = new Error(e || LT[t])
    if (
      ((o.code = t),
      Error.captureStackTrace && Error.captureStackTrace(o, Cn),
      !r)
    )
      throw o
    return o
  },
  zh = function (t, e, r, o) {
    var a = t.length,
      u = o ? o.length : 0
    if (!a || (e.f && !e.l)) return r || new $n(0)
    var f = !r,
      h = f || e.i != 2,
      p = e.i
    f && (r = new $n(a * 3))
    var g = function (Mt) {
        var O = r.length
        if (Mt > O) {
          var I = new $n(Math.max(O * 2, Mt))
          I.set(r), (r = I)
        }
      },
      v = e.f || 0,
      b = e.p || 0,
      w = e.b || 0,
      S = e.l,
      N = e.d,
      L = e.m,
      A = e.n,
      T = a * 8
    do {
      if (!S) {
        v = Yn(t, b, 1)
        var M = Yn(t, b + 1, 3)
        if (((b += 3), M))
          if (M == 1) (S = CT), (N = TT), (L = 9), (A = 5)
          else if (M == 2) {
            var X = Yn(t, b, 31) + 257,
              ft = Yn(t, b + 10, 15) + 4,
              Y = X + Yn(t, b + 5, 31) + 1
            b += 14
            for (var et = new $n(Y), st = new $n(19), dt = 0; dt < ft; ++dt)
              st[xT[dt]] = Yn(t, b + dt * 3, 7)
            b += ft * 3
            for (
              var pt = Zu(st), V = (1 << pt) - 1, z = sl(st, pt, 1), dt = 0;
              dt < Y;

            ) {
              var k = z[Yn(t, b, V)]
              b += k & 15
              var R = k >> 4
              if (R < 16) et[dt++] = R
              else {
                var q = 0,
                  B = 0
                for (
                  R == 16
                    ? ((B = 3 + Yn(t, b, 3)), (b += 2), (q = et[dt - 1]))
                    : R == 17
                      ? ((B = 3 + Yn(t, b, 7)), (b += 3))
                      : R == 18 && ((B = 11 + Yn(t, b, 127)), (b += 7));
                  B--;

                )
                  et[dt++] = q
              }
            }
            var Q = et.subarray(0, X),
              mt = et.subarray(X)
            ;(L = Zu(Q)), (A = Zu(mt)), (S = sl(Q, L, 1)), (N = sl(mt, A, 1))
          } else Cn(1)
        else {
          var R = ET(b) + 4,
            E = t[R - 4] | (t[R - 3] << 8),
            W = R + E
          if (W > a) {
            p && Cn(0)
            break
          }
          h && g(w + E),
            r.set(t.subarray(R, W), w),
            (e.b = w += E),
            (e.p = b = W * 8),
            (e.f = v)
          continue
        }
        if (b > T) {
          p && Cn(0)
          break
        }
      }
      h && g(w + 131072)
      for (var Et = (1 << L) - 1, It = (1 << A) - 1, Bt = b; ; Bt = b) {
        var q = S[Ju(t, b) & Et],
          Ut = q >> 4
        if (((b += q & 15), b > T)) {
          p && Cn(0)
          break
        }
        if ((q || Cn(2), Ut < 256)) r[w++] = Ut
        else if (Ut == 256) {
          ;(Bt = b), (S = null)
          break
        } else {
          var Xt = Ut - 254
          if (Ut > 264) {
            var dt = Ut - 257,
              Kt = sy[dt]
            ;(Xt = Yn(t, b, (1 << Kt) - 1) + uy[dt]), (b += Kt)
          }
          var St = N[Ju(t, b) & It],
            j = St >> 4
          St || Cn(3), (b += St & 15)
          var mt = kT[j]
          if (j > 3) {
            var Kt = ly[j]
            ;(mt += Ju(t, b) & ((1 << Kt) - 1)), (b += Kt)
          }
          if (b > T) {
            p && Cn(0)
            break
          }
          h && g(w + 131072)
          var nt = w + Xt
          if (w < mt) {
            var rt = u - mt,
              Nt = Math.min(mt, nt)
            for (rt + w < 0 && Cn(3); w < Nt; ++w) r[w] = o[rt + w]
          }
          for (; w < nt; ++w) r[w] = r[w - mt]
        }
      }
      ;(e.l = S),
        (e.p = Bt),
        (e.b = w),
        (e.f = v),
        S && ((v = 1), (e.m = L), (e.d = N), (e.n = A))
    } while (!v)
    return w != r.length && f ? hy(r, 0, w) : r.subarray(0, w)
  },
  AT = new $n(0),
  MT = function (t) {
    ;(t[0] != 31 || t[1] != 139 || t[2] != 8) && Cn(6, "invalid gzip data")
    var e = t[3],
      r = 10
    e & 4 && (r += (t[10] | (t[11] << 8)) + 2)
    for (var o = ((e >> 3) & 1) + ((e >> 4) & 1); o > 0; o -= !t[r++]);
    return r + (e & 2)
  },
  NT = function (t) {
    var e = t.length
    return (
      (t[e - 4] | (t[e - 3] << 8) | (t[e - 2] << 16) | (t[e - 1] << 24)) >>> 0
    )
  },
  PT = function (t, e) {
    return (
      ((t[0] & 15) != 8 || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31) &&
        Cn(6, "invalid zlib data"),
      ((t[1] >> 5) & 1) == +!e &&
        Cn(
          6,
          "invalid zlib data: " +
            (t[1] & 32 ? "need" : "unexpected") +
            " dictionary",
        ),
      ((t[1] >> 3) & 4) + 2
    )
  }
function OT(t, e) {
  return zh(t, { i: 2 }, e && e.out, e && e.dictionary)
}
function DT(t, e) {
  var r = MT(t)
  return (
    r + 8 > t.length && Cn(6, "invalid gzip data"),
    zh(
      t.subarray(r, -8),
      { i: 2 },
      (e && e.out) || new $n(NT(t)),
      e && e.dictionary,
    )
  )
}
function $T(t, e) {
  return zh(
    t.subarray(PT(t, e && e.dictionary), -4),
    { i: 2 },
    e && e.out,
    e && e.dictionary,
  )
}
function RT(t, e) {
  return t[0] == 31 && t[1] == 139 && t[2] == 8
    ? DT(t, e)
    : (t[0] & 15) != 8 || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
      ? OT(t, e)
      : $T(t, e)
}
var If = typeof TextDecoder < "u" && new TextDecoder(),
  zT = 0
try {
  If.decode(AT, { stream: !0 }), (zT = 1)
} catch {}
var FT = function (t) {
  for (var e = "", r = 0; ; ) {
    var o = t[r++],
      a = (o > 127) + (o > 223) + (o > 239)
    if (r + a > t.length) return { s: e, r: hy(t, r - 1) }
    a
      ? a == 3
        ? ((o =
            (((o & 15) << 18) |
              ((t[r++] & 63) << 12) |
              ((t[r++] & 63) << 6) |
              (t[r++] & 63)) -
            65536),
          (e += String.fromCharCode(55296 | (o >> 10), 56320 | (o & 1023))))
        : a & 1
          ? (e += String.fromCharCode(((o & 31) << 6) | (t[r++] & 63)))
          : (e += String.fromCharCode(
              ((o & 15) << 12) | ((t[r++] & 63) << 6) | (t[r++] & 63),
            ))
      : (e += String.fromCharCode(o))
  }
}
function IT(t, e) {
  if (e) {
    for (var r = "", o = 0; o < t.length; o += 16384)
      r += String.fromCharCode.apply(null, t.subarray(o, o + 16384))
    return r
  } else {
    if (If) return If.decode(t)
    var a = FT(t),
      u = a.s,
      r = a.r
    return r.length && Cn(8), u
  }
}
const wv = () => {},
  Sn = () => Promise.resolve()
function qT() {
  const t = Bn({
    state: new K0(),
    waitForConnection: f,
    reconnect: a,
    ws: new EventTarget(),
  })
  ;(t.state.filesMap = Bn(t.state.filesMap)),
    (t.state.idMap = Bn(t.state.idMap))
  let e
  const r = {
    getFiles: () => e.files,
    getPaths: () => e.paths,
    getConfig: () => e.config,
    getModuleGraph: async (h) => e.moduleGraph[h],
    getTransformResult: async (h) => ({ code: h, source: "", map: null }),
    onDone: wv,
    onCollected: Sn,
    onTaskUpdate: wv,
    writeFile: Sn,
    rerun: Sn,
    updateSnapshot: Sn,
    resolveSnapshotPath: Sn,
    snapshotSaved: Sn,
    onAfterSuiteRun: Sn,
    onCancel: Sn,
    getCountOfFailedTests: () => 0,
    sendLog: Sn,
    resolveSnapshotRawPath: Sn,
    readSnapshotFile: Sn,
    saveSnapshotFile: Sn,
    readTestFile: Sn,
    removeSnapshotFile: Sn,
  }
  t.rpc = r
  let o
  function a() {
    u()
  }
  async function u() {
    var v
    const h = await fetch(window.METADATA_PATH),
      p =
        ((v = h.headers.get("content-type")) == null
          ? void 0
          : v.toLowerCase()) || ""
    if (p.includes("application/gzip") || p.includes("application/x-gzip")) {
      const b = new Uint8Array(await h.arrayBuffer()),
        w = IT(RT(b))
      e = Rf(w)
    } else e = Rf(await h.text())
    const g = new Event("open")
    t.ws.dispatchEvent(g)
  }
  u()
  function f() {
    return o
  }
  return t
}
const ml = Vt("idle"),
  Ge = (function () {
    return Ur
      ? qT()
      : UC(VC, {
          reactive: Bn,
          handlers: {
            onTaskUpdate() {
              ml.value = "running"
            },
            onFinished() {
              ml.value = "idle"
            },
          },
        })
  })(),
  Ml = cs({}),
  Ki = Vt("CONNECTING"),
  mn = xt(() => Ge.state.getFiles()),
  ke = xt(() => mn.value.find((t) => t.id === pr.value)),
  dy = xt(
    () =>
      Oh(ke.value)
        .map((t) => (t == null ? void 0 : t.logs) || [])
        .flat() || [],
  )
function ic(t) {
  return mn.value.find((e) => e.id === t)
}
const HT = xt(() => Ki.value === "OPEN"),
  Qu = xt(() => Ki.value === "CONNECTING")
xt(() => Ki.value === "CLOSED")
function BT(t = Ge.state.getFiles()) {
  return py(t)
}
function py(t) {
  return (
    t.forEach((e) => {
      delete e.result, Oh(e).forEach((r) => delete r.result)
    }),
    Ge.rpc.rerun(t.map((e) => e.filepath))
  )
}
function WT() {
  if (ke.value) return py([ke.value])
}
$e(
  () => Ge.ws,
  (t) => {
    ;(Ki.value = Ur ? "OPEN" : "CONNECTING"),
      t.addEventListener("open", async () => {
        ;(Ki.value = "OPEN"), Ge.state.filesMap.clear()
        const [e, r] = await Promise.all([
          Ge.rpc.getFiles(),
          Ge.rpc.getConfig(),
        ])
        Ge.state.collectFiles(e), (Ml.value = r)
      }),
      t.addEventListener("close", () => {
        setTimeout(() => {
          Ki.value === "CONNECTING" && (Ki.value = "CLOSED")
        }, 1e3)
      })
  },
  { immediate: !0 },
)
const UT = { "text-2xl": "" },
  jT = ut(
    "div",
    { "text-lg": "", "op50": "" },
    " Check your terminal or start a new server with `vitest --ui` ",
    -1,
  ),
  GT = re({
    __name: "ConnectionOverlay",
    setup(t) {
      return (e, r) =>
        G(HT)
          ? Qt("", !0)
          : (lt(),
            Tt(
              "div",
              {
                "key": 0,
                "fixed": "",
                "inset-0": "",
                "p2": "",
                "z-10": "",
                "select-none": "",
                "text": "center sm",
                "bg": "overlay",
                "backdrop-blur-sm": "",
                "backdrop-saturate-0": "",
                "onClick":
                  r[0] ||
                  (r[0] = (...o) => G(Ge).reconnect && G(Ge).reconnect(...o)),
              },
              [
                ut(
                  "div",
                  {
                    "h-full": "",
                    "flex": "~ col gap-2",
                    "items-center": "",
                    "justify-center": "",
                    "class": ve(G(Qu) ? "animate-pulse" : ""),
                  },
                  [
                    ut(
                      "div",
                      {
                        text: "5xl",
                        class: ve(
                          G(Qu)
                            ? "i-carbon:renew animate-spin animate-reverse"
                            : "i-carbon-wifi-off",
                        ),
                      },
                      null,
                      2,
                    ),
                    ut(
                      "div",
                      UT,
                      ee(G(Qu) ? "Connecting..." : "Disconnected"),
                      1,
                    ),
                    jT,
                  ],
                  2,
                ),
              ],
            ))
    },
  })
var gy = {},
  qr = {}
const VT = "Á",
  KT = "á",
  XT = "Ă",
  YT = "ă",
  ZT = "∾",
  JT = "∿",
  QT = "∾̳",
  tE = "Â",
  eE = "â",
  nE = "´",
  rE = "А",
  iE = "а",
  oE = "Æ",
  sE = "æ",
  lE = "⁡",
  aE = "𝔄",
  cE = "𝔞",
  uE = "À",
  fE = "à",
  hE = "ℵ",
  dE = "ℵ",
  pE = "Α",
  gE = "α",
  vE = "Ā",
  mE = "ā",
  yE = "⨿",
  bE = "&",
  wE = "&",
  xE = "⩕",
  _E = "⩓",
  SE = "∧",
  kE = "⩜",
  CE = "⩘",
  TE = "⩚",
  EE = "∠",
  LE = "⦤",
  AE = "∠",
  ME = "⦨",
  NE = "⦩",
  PE = "⦪",
  OE = "⦫",
  DE = "⦬",
  $E = "⦭",
  RE = "⦮",
  zE = "⦯",
  FE = "∡",
  IE = "∟",
  qE = "⊾",
  HE = "⦝",
  BE = "∢",
  WE = "Å",
  UE = "⍼",
  jE = "Ą",
  GE = "ą",
  VE = "𝔸",
  KE = "𝕒",
  XE = "⩯",
  YE = "≈",
  ZE = "⩰",
  JE = "≊",
  QE = "≋",
  tL = "'",
  eL = "⁡",
  nL = "≈",
  rL = "≊",
  iL = "Å",
  oL = "å",
  sL = "𝒜",
  lL = "𝒶",
  aL = "≔",
  cL = "*",
  uL = "≈",
  fL = "≍",
  hL = "Ã",
  dL = "ã",
  pL = "Ä",
  gL = "ä",
  vL = "∳",
  mL = "⨑",
  yL = "≌",
  bL = "϶",
  wL = "‵",
  xL = "∽",
  _L = "⋍",
  SL = "∖",
  kL = "⫧",
  CL = "⊽",
  TL = "⌅",
  EL = "⌆",
  LL = "⌅",
  AL = "⎵",
  ML = "⎶",
  NL = "≌",
  PL = "Б",
  OL = "б",
  DL = "„",
  $L = "∵",
  RL = "∵",
  zL = "∵",
  FL = "⦰",
  IL = "϶",
  qL = "ℬ",
  HL = "ℬ",
  BL = "Β",
  WL = "β",
  UL = "ℶ",
  jL = "≬",
  GL = "𝔅",
  VL = "𝔟",
  KL = "⋂",
  XL = "◯",
  YL = "⋃",
  ZL = "⨀",
  JL = "⨁",
  QL = "⨂",
  tA = "⨆",
  eA = "★",
  nA = "▽",
  rA = "△",
  iA = "⨄",
  oA = "⋁",
  sA = "⋀",
  lA = "⤍",
  aA = "⧫",
  cA = "▪",
  uA = "▴",
  fA = "▾",
  hA = "◂",
  dA = "▸",
  pA = "␣",
  gA = "▒",
  vA = "░",
  mA = "▓",
  yA = "█",
  bA = "=⃥",
  wA = "≡⃥",
  xA = "⫭",
  _A = "⌐",
  SA = "𝔹",
  kA = "𝕓",
  CA = "⊥",
  TA = "⊥",
  EA = "⋈",
  LA = "⧉",
  AA = "┐",
  MA = "╕",
  NA = "╖",
  PA = "╗",
  OA = "┌",
  DA = "╒",
  $A = "╓",
  RA = "╔",
  zA = "─",
  FA = "═",
  IA = "┬",
  qA = "╤",
  HA = "╥",
  BA = "╦",
  WA = "┴",
  UA = "╧",
  jA = "╨",
  GA = "╩",
  VA = "⊟",
  KA = "⊞",
  XA = "⊠",
  YA = "┘",
  ZA = "╛",
  JA = "╜",
  QA = "╝",
  tM = "└",
  eM = "╘",
  nM = "╙",
  rM = "╚",
  iM = "│",
  oM = "║",
  sM = "┼",
  lM = "╪",
  aM = "╫",
  cM = "╬",
  uM = "┤",
  fM = "╡",
  hM = "╢",
  dM = "╣",
  pM = "├",
  gM = "╞",
  vM = "╟",
  mM = "╠",
  yM = "‵",
  bM = "˘",
  wM = "˘",
  xM = "¦",
  _M = "𝒷",
  SM = "ℬ",
  kM = "⁏",
  CM = "∽",
  TM = "⋍",
  EM = "⧅",
  LM = "\\",
  AM = "⟈",
  MM = "•",
  NM = "•",
  PM = "≎",
  OM = "⪮",
  DM = "≏",
  $M = "≎",
  RM = "≏",
  zM = "Ć",
  FM = "ć",
  IM = "⩄",
  qM = "⩉",
  HM = "⩋",
  BM = "∩",
  WM = "⋒",
  UM = "⩇",
  jM = "⩀",
  GM = "ⅅ",
  VM = "∩︀",
  KM = "⁁",
  XM = "ˇ",
  YM = "ℭ",
  ZM = "⩍",
  JM = "Č",
  QM = "č",
  tN = "Ç",
  eN = "ç",
  nN = "Ĉ",
  rN = "ĉ",
  iN = "∰",
  oN = "⩌",
  sN = "⩐",
  lN = "Ċ",
  aN = "ċ",
  cN = "¸",
  uN = "¸",
  fN = "⦲",
  hN = "¢",
  dN = "·",
  pN = "·",
  gN = "𝔠",
  vN = "ℭ",
  mN = "Ч",
  yN = "ч",
  bN = "✓",
  wN = "✓",
  xN = "Χ",
  _N = "χ",
  SN = "ˆ",
  kN = "≗",
  CN = "↺",
  TN = "↻",
  EN = "⊛",
  LN = "⊚",
  AN = "⊝",
  MN = "⊙",
  NN = "®",
  PN = "Ⓢ",
  ON = "⊖",
  DN = "⊕",
  $N = "⊗",
  RN = "○",
  zN = "⧃",
  FN = "≗",
  IN = "⨐",
  qN = "⫯",
  HN = "⧂",
  BN = "∲",
  WN = "”",
  UN = "’",
  jN = "♣",
  GN = "♣",
  VN = ":",
  KN = "∷",
  XN = "⩴",
  YN = "≔",
  ZN = "≔",
  JN = ",",
  QN = "@",
  tP = "∁",
  eP = "∘",
  nP = "∁",
  rP = "ℂ",
  iP = "≅",
  oP = "⩭",
  sP = "≡",
  lP = "∮",
  aP = "∯",
  cP = "∮",
  uP = "𝕔",
  fP = "ℂ",
  hP = "∐",
  dP = "∐",
  pP = "©",
  gP = "©",
  vP = "℗",
  mP = "∳",
  yP = "↵",
  bP = "✗",
  wP = "⨯",
  xP = "𝒞",
  _P = "𝒸",
  SP = "⫏",
  kP = "⫑",
  CP = "⫐",
  TP = "⫒",
  EP = "⋯",
  LP = "⤸",
  AP = "⤵",
  MP = "⋞",
  NP = "⋟",
  PP = "↶",
  OP = "⤽",
  DP = "⩈",
  $P = "⩆",
  RP = "≍",
  zP = "∪",
  FP = "⋓",
  IP = "⩊",
  qP = "⊍",
  HP = "⩅",
  BP = "∪︀",
  WP = "↷",
  UP = "⤼",
  jP = "⋞",
  GP = "⋟",
  VP = "⋎",
  KP = "⋏",
  XP = "¤",
  YP = "↶",
  ZP = "↷",
  JP = "⋎",
  QP = "⋏",
  tO = "∲",
  eO = "∱",
  nO = "⌭",
  rO = "†",
  iO = "‡",
  oO = "ℸ",
  sO = "↓",
  lO = "↡",
  aO = "⇓",
  cO = "‐",
  uO = "⫤",
  fO = "⊣",
  hO = "⤏",
  dO = "˝",
  pO = "Ď",
  gO = "ď",
  vO = "Д",
  mO = "д",
  yO = "‡",
  bO = "⇊",
  wO = "ⅅ",
  xO = "ⅆ",
  _O = "⤑",
  SO = "⩷",
  kO = "°",
  CO = "∇",
  TO = "Δ",
  EO = "δ",
  LO = "⦱",
  AO = "⥿",
  MO = "𝔇",
  NO = "𝔡",
  PO = "⥥",
  OO = "⇃",
  DO = "⇂",
  $O = "´",
  RO = "˙",
  zO = "˝",
  FO = "`",
  IO = "˜",
  qO = "⋄",
  HO = "⋄",
  BO = "⋄",
  WO = "♦",
  UO = "♦",
  jO = "¨",
  GO = "ⅆ",
  VO = "ϝ",
  KO = "⋲",
  XO = "÷",
  YO = "÷",
  ZO = "⋇",
  JO = "⋇",
  QO = "Ђ",
  tD = "ђ",
  eD = "⌞",
  nD = "⌍",
  rD = "$",
  iD = "𝔻",
  oD = "𝕕",
  sD = "¨",
  lD = "˙",
  aD = "⃜",
  cD = "≐",
  uD = "≑",
  fD = "≐",
  hD = "∸",
  dD = "∔",
  pD = "⊡",
  gD = "⌆",
  vD = "∯",
  mD = "¨",
  yD = "⇓",
  bD = "⇐",
  wD = "⇔",
  xD = "⫤",
  _D = "⟸",
  SD = "⟺",
  kD = "⟹",
  CD = "⇒",
  TD = "⊨",
  ED = "⇑",
  LD = "⇕",
  AD = "∥",
  MD = "⤓",
  ND = "↓",
  PD = "↓",
  OD = "⇓",
  DD = "⇵",
  $D = "̑",
  RD = "⇊",
  zD = "⇃",
  FD = "⇂",
  ID = "⥐",
  qD = "⥞",
  HD = "⥖",
  BD = "↽",
  WD = "⥟",
  UD = "⥗",
  jD = "⇁",
  GD = "↧",
  VD = "⊤",
  KD = "⤐",
  XD = "⌟",
  YD = "⌌",
  ZD = "𝒟",
  JD = "𝒹",
  QD = "Ѕ",
  t$ = "ѕ",
  e$ = "⧶",
  n$ = "Đ",
  r$ = "đ",
  i$ = "⋱",
  o$ = "▿",
  s$ = "▾",
  l$ = "⇵",
  a$ = "⥯",
  c$ = "⦦",
  u$ = "Џ",
  f$ = "џ",
  h$ = "⟿",
  d$ = "É",
  p$ = "é",
  g$ = "⩮",
  v$ = "Ě",
  m$ = "ě",
  y$ = "Ê",
  b$ = "ê",
  w$ = "≖",
  x$ = "≕",
  _$ = "Э",
  S$ = "э",
  k$ = "⩷",
  C$ = "Ė",
  T$ = "ė",
  E$ = "≑",
  L$ = "ⅇ",
  A$ = "≒",
  M$ = "𝔈",
  N$ = "𝔢",
  P$ = "⪚",
  O$ = "È",
  D$ = "è",
  $$ = "⪖",
  R$ = "⪘",
  z$ = "⪙",
  F$ = "∈",
  I$ = "⏧",
  q$ = "ℓ",
  H$ = "⪕",
  B$ = "⪗",
  W$ = "Ē",
  U$ = "ē",
  j$ = "∅",
  G$ = "∅",
  V$ = "◻",
  K$ = "∅",
  X$ = "▫",
  Y$ = " ",
  Z$ = " ",
  J$ = " ",
  Q$ = "Ŋ",
  tR = "ŋ",
  eR = " ",
  nR = "Ę",
  rR = "ę",
  iR = "𝔼",
  oR = "𝕖",
  sR = "⋕",
  lR = "⧣",
  aR = "⩱",
  cR = "ε",
  uR = "Ε",
  fR = "ε",
  hR = "ϵ",
  dR = "≖",
  pR = "≕",
  gR = "≂",
  vR = "⪖",
  mR = "⪕",
  yR = "⩵",
  bR = "=",
  wR = "≂",
  xR = "≟",
  _R = "⇌",
  SR = "≡",
  kR = "⩸",
  CR = "⧥",
  TR = "⥱",
  ER = "≓",
  LR = "ℯ",
  AR = "ℰ",
  MR = "≐",
  NR = "⩳",
  PR = "≂",
  OR = "Η",
  DR = "η",
  $R = "Ð",
  RR = "ð",
  zR = "Ë",
  FR = "ë",
  IR = "€",
  qR = "!",
  HR = "∃",
  BR = "∃",
  WR = "ℰ",
  UR = "ⅇ",
  jR = "ⅇ",
  GR = "≒",
  VR = "Ф",
  KR = "ф",
  XR = "♀",
  YR = "ﬃ",
  ZR = "ﬀ",
  JR = "ﬄ",
  QR = "𝔉",
  t2 = "𝔣",
  e2 = "ﬁ",
  n2 = "◼",
  r2 = "▪",
  i2 = "fj",
  o2 = "♭",
  s2 = "ﬂ",
  l2 = "▱",
  a2 = "ƒ",
  c2 = "𝔽",
  u2 = "𝕗",
  f2 = "∀",
  h2 = "∀",
  d2 = "⋔",
  p2 = "⫙",
  g2 = "ℱ",
  v2 = "⨍",
  m2 = "½",
  y2 = "⅓",
  b2 = "¼",
  w2 = "⅕",
  x2 = "⅙",
  _2 = "⅛",
  S2 = "⅔",
  k2 = "⅖",
  C2 = "¾",
  T2 = "⅗",
  E2 = "⅜",
  L2 = "⅘",
  A2 = "⅚",
  M2 = "⅝",
  N2 = "⅞",
  P2 = "⁄",
  O2 = "⌢",
  D2 = "𝒻",
  $2 = "ℱ",
  R2 = "ǵ",
  z2 = "Γ",
  F2 = "γ",
  I2 = "Ϝ",
  q2 = "ϝ",
  H2 = "⪆",
  B2 = "Ğ",
  W2 = "ğ",
  U2 = "Ģ",
  j2 = "Ĝ",
  G2 = "ĝ",
  V2 = "Г",
  K2 = "г",
  X2 = "Ġ",
  Y2 = "ġ",
  Z2 = "≥",
  J2 = "≧",
  Q2 = "⪌",
  tz = "⋛",
  ez = "≥",
  nz = "≧",
  rz = "⩾",
  iz = "⪩",
  oz = "⩾",
  sz = "⪀",
  lz = "⪂",
  az = "⪄",
  cz = "⋛︀",
  uz = "⪔",
  fz = "𝔊",
  hz = "𝔤",
  dz = "≫",
  pz = "⋙",
  gz = "⋙",
  vz = "ℷ",
  mz = "Ѓ",
  yz = "ѓ",
  bz = "⪥",
  wz = "≷",
  xz = "⪒",
  _z = "⪤",
  Sz = "⪊",
  kz = "⪊",
  Cz = "⪈",
  Tz = "≩",
  Ez = "⪈",
  Lz = "≩",
  Az = "⋧",
  Mz = "𝔾",
  Nz = "𝕘",
  Pz = "`",
  Oz = "≥",
  Dz = "⋛",
  $z = "≧",
  Rz = "⪢",
  zz = "≷",
  Fz = "⩾",
  Iz = "≳",
  qz = "𝒢",
  Hz = "ℊ",
  Bz = "≳",
  Wz = "⪎",
  Uz = "⪐",
  jz = "⪧",
  Gz = "⩺",
  Vz = ">",
  Kz = ">",
  Xz = "≫",
  Yz = "⋗",
  Zz = "⦕",
  Jz = "⩼",
  Qz = "⪆",
  tF = "⥸",
  eF = "⋗",
  nF = "⋛",
  rF = "⪌",
  iF = "≷",
  oF = "≳",
  sF = "≩︀",
  lF = "≩︀",
  aF = "ˇ",
  cF = " ",
  uF = "½",
  fF = "ℋ",
  hF = "Ъ",
  dF = "ъ",
  pF = "⥈",
  gF = "↔",
  vF = "⇔",
  mF = "↭",
  yF = "^",
  bF = "ℏ",
  wF = "Ĥ",
  xF = "ĥ",
  _F = "♥",
  SF = "♥",
  kF = "…",
  CF = "⊹",
  TF = "𝔥",
  EF = "ℌ",
  LF = "ℋ",
  AF = "⤥",
  MF = "⤦",
  NF = "⇿",
  PF = "∻",
  OF = "↩",
  DF = "↪",
  $F = "𝕙",
  RF = "ℍ",
  zF = "―",
  FF = "─",
  IF = "𝒽",
  qF = "ℋ",
  HF = "ℏ",
  BF = "Ħ",
  WF = "ħ",
  UF = "≎",
  jF = "≏",
  GF = "⁃",
  VF = "‐",
  KF = "Í",
  XF = "í",
  YF = "⁣",
  ZF = "Î",
  JF = "î",
  QF = "И",
  tI = "и",
  eI = "İ",
  nI = "Е",
  rI = "е",
  iI = "¡",
  oI = "⇔",
  sI = "𝔦",
  lI = "ℑ",
  aI = "Ì",
  cI = "ì",
  uI = "ⅈ",
  fI = "⨌",
  hI = "∭",
  dI = "⧜",
  pI = "℩",
  gI = "Ĳ",
  vI = "ĳ",
  mI = "Ī",
  yI = "ī",
  bI = "ℑ",
  wI = "ⅈ",
  xI = "ℐ",
  _I = "ℑ",
  SI = "ı",
  kI = "ℑ",
  CI = "⊷",
  TI = "Ƶ",
  EI = "⇒",
  LI = "℅",
  AI = "∞",
  MI = "⧝",
  NI = "ı",
  PI = "⊺",
  OI = "∫",
  DI = "∬",
  $I = "ℤ",
  RI = "∫",
  zI = "⊺",
  FI = "⋂",
  II = "⨗",
  qI = "⨼",
  HI = "⁣",
  BI = "⁢",
  WI = "Ё",
  UI = "ё",
  jI = "Į",
  GI = "į",
  VI = "𝕀",
  KI = "𝕚",
  XI = "Ι",
  YI = "ι",
  ZI = "⨼",
  JI = "¿",
  QI = "𝒾",
  tq = "ℐ",
  eq = "∈",
  nq = "⋵",
  rq = "⋹",
  iq = "⋴",
  oq = "⋳",
  sq = "∈",
  lq = "⁢",
  aq = "Ĩ",
  cq = "ĩ",
  uq = "І",
  fq = "і",
  hq = "Ï",
  dq = "ï",
  pq = "Ĵ",
  gq = "ĵ",
  vq = "Й",
  mq = "й",
  yq = "𝔍",
  bq = "𝔧",
  wq = "ȷ",
  xq = "𝕁",
  _q = "𝕛",
  Sq = "𝒥",
  kq = "𝒿",
  Cq = "Ј",
  Tq = "ј",
  Eq = "Є",
  Lq = "є",
  Aq = "Κ",
  Mq = "κ",
  Nq = "ϰ",
  Pq = "Ķ",
  Oq = "ķ",
  Dq = "К",
  $q = "к",
  Rq = "𝔎",
  zq = "𝔨",
  Fq = "ĸ",
  Iq = "Х",
  qq = "х",
  Hq = "Ќ",
  Bq = "ќ",
  Wq = "𝕂",
  Uq = "𝕜",
  jq = "𝒦",
  Gq = "𝓀",
  Vq = "⇚",
  Kq = "Ĺ",
  Xq = "ĺ",
  Yq = "⦴",
  Zq = "ℒ",
  Jq = "Λ",
  Qq = "λ",
  tH = "⟨",
  eH = "⟪",
  nH = "⦑",
  rH = "⟨",
  iH = "⪅",
  oH = "ℒ",
  sH = "«",
  lH = "⇤",
  aH = "⤟",
  cH = "←",
  uH = "↞",
  fH = "⇐",
  hH = "⤝",
  dH = "↩",
  pH = "↫",
  gH = "⤹",
  vH = "⥳",
  mH = "↢",
  yH = "⤙",
  bH = "⤛",
  wH = "⪫",
  xH = "⪭",
  _H = "⪭︀",
  SH = "⤌",
  kH = "⤎",
  CH = "❲",
  TH = "{",
  EH = "[",
  LH = "⦋",
  AH = "⦏",
  MH = "⦍",
  NH = "Ľ",
  PH = "ľ",
  OH = "Ļ",
  DH = "ļ",
  $H = "⌈",
  RH = "{",
  zH = "Л",
  FH = "л",
  IH = "⤶",
  qH = "“",
  HH = "„",
  BH = "⥧",
  WH = "⥋",
  UH = "↲",
  jH = "≤",
  GH = "≦",
  VH = "⟨",
  KH = "⇤",
  XH = "←",
  YH = "←",
  ZH = "⇐",
  JH = "⇆",
  QH = "↢",
  tB = "⌈",
  eB = "⟦",
  nB = "⥡",
  rB = "⥙",
  iB = "⇃",
  oB = "⌊",
  sB = "↽",
  lB = "↼",
  aB = "⇇",
  cB = "↔",
  uB = "↔",
  fB = "⇔",
  hB = "⇆",
  dB = "⇋",
  pB = "↭",
  gB = "⥎",
  vB = "↤",
  mB = "⊣",
  yB = "⥚",
  bB = "⋋",
  wB = "⧏",
  xB = "⊲",
  _B = "⊴",
  SB = "⥑",
  kB = "⥠",
  CB = "⥘",
  TB = "↿",
  EB = "⥒",
  LB = "↼",
  AB = "⪋",
  MB = "⋚",
  NB = "≤",
  PB = "≦",
  OB = "⩽",
  DB = "⪨",
  $B = "⩽",
  RB = "⩿",
  zB = "⪁",
  FB = "⪃",
  IB = "⋚︀",
  qB = "⪓",
  HB = "⪅",
  BB = "⋖",
  WB = "⋚",
  UB = "⪋",
  jB = "⋚",
  GB = "≦",
  VB = "≶",
  KB = "≶",
  XB = "⪡",
  YB = "≲",
  ZB = "⩽",
  JB = "≲",
  QB = "⥼",
  t3 = "⌊",
  e3 = "𝔏",
  n3 = "𝔩",
  r3 = "≶",
  i3 = "⪑",
  o3 = "⥢",
  s3 = "↽",
  l3 = "↼",
  a3 = "⥪",
  c3 = "▄",
  u3 = "Љ",
  f3 = "љ",
  h3 = "⇇",
  d3 = "≪",
  p3 = "⋘",
  g3 = "⌞",
  v3 = "⇚",
  m3 = "⥫",
  y3 = "◺",
  b3 = "Ŀ",
  w3 = "ŀ",
  x3 = "⎰",
  _3 = "⎰",
  S3 = "⪉",
  k3 = "⪉",
  C3 = "⪇",
  T3 = "≨",
  E3 = "⪇",
  L3 = "≨",
  A3 = "⋦",
  M3 = "⟬",
  N3 = "⇽",
  P3 = "⟦",
  O3 = "⟵",
  D3 = "⟵",
  $3 = "⟸",
  R3 = "⟷",
  z3 = "⟷",
  F3 = "⟺",
  I3 = "⟼",
  q3 = "⟶",
  H3 = "⟶",
  B3 = "⟹",
  W3 = "↫",
  U3 = "↬",
  j3 = "⦅",
  G3 = "𝕃",
  V3 = "𝕝",
  K3 = "⨭",
  X3 = "⨴",
  Y3 = "∗",
  Z3 = "_",
  J3 = "↙",
  Q3 = "↘",
  t5 = "◊",
  e5 = "◊",
  n5 = "⧫",
  r5 = "(",
  i5 = "⦓",
  o5 = "⇆",
  s5 = "⌟",
  l5 = "⇋",
  a5 = "⥭",
  c5 = "‎",
  u5 = "⊿",
  f5 = "‹",
  h5 = "𝓁",
  d5 = "ℒ",
  p5 = "↰",
  g5 = "↰",
  v5 = "≲",
  m5 = "⪍",
  y5 = "⪏",
  b5 = "[",
  w5 = "‘",
  x5 = "‚",
  _5 = "Ł",
  S5 = "ł",
  k5 = "⪦",
  C5 = "⩹",
  T5 = "<",
  E5 = "<",
  L5 = "≪",
  A5 = "⋖",
  M5 = "⋋",
  N5 = "⋉",
  P5 = "⥶",
  O5 = "⩻",
  D5 = "◃",
  $5 = "⊴",
  R5 = "◂",
  z5 = "⦖",
  F5 = "⥊",
  I5 = "⥦",
  q5 = "≨︀",
  H5 = "≨︀",
  B5 = "¯",
  W5 = "♂",
  U5 = "✠",
  j5 = "✠",
  G5 = "↦",
  V5 = "↦",
  K5 = "↧",
  X5 = "↤",
  Y5 = "↥",
  Z5 = "▮",
  J5 = "⨩",
  Q5 = "М",
  t8 = "м",
  e8 = "—",
  n8 = "∺",
  r8 = "∡",
  i8 = " ",
  o8 = "ℳ",
  s8 = "𝔐",
  l8 = "𝔪",
  a8 = "℧",
  c8 = "µ",
  u8 = "*",
  f8 = "⫰",
  h8 = "∣",
  d8 = "·",
  p8 = "⊟",
  g8 = "−",
  v8 = "∸",
  m8 = "⨪",
  y8 = "∓",
  b8 = "⫛",
  w8 = "…",
  x8 = "∓",
  _8 = "⊧",
  S8 = "𝕄",
  k8 = "𝕞",
  C8 = "∓",
  T8 = "𝓂",
  E8 = "ℳ",
  L8 = "∾",
  A8 = "Μ",
  M8 = "μ",
  N8 = "⊸",
  P8 = "⊸",
  O8 = "∇",
  D8 = "Ń",
  $8 = "ń",
  R8 = "∠⃒",
  z8 = "≉",
  F8 = "⩰̸",
  I8 = "≋̸",
  q8 = "ŉ",
  H8 = "≉",
  B8 = "♮",
  W8 = "ℕ",
  U8 = "♮",
  j8 = " ",
  G8 = "≎̸",
  V8 = "≏̸",
  K8 = "⩃",
  X8 = "Ň",
  Y8 = "ň",
  Z8 = "Ņ",
  J8 = "ņ",
  Q8 = "≇",
  tW = "⩭̸",
  eW = "⩂",
  nW = "Н",
  rW = "н",
  iW = "–",
  oW = "⤤",
  sW = "↗",
  lW = "⇗",
  aW = "↗",
  cW = "≠",
  uW = "≐̸",
  fW = "​",
  hW = "​",
  dW = "​",
  pW = "​",
  gW = "≢",
  vW = "⤨",
  mW = "≂̸",
  yW = "≫",
  bW = "≪",
  wW = `
`,
  xW = "∄",
  _W = "∄",
  SW = "𝔑",
  kW = "𝔫",
  CW = "≧̸",
  TW = "≱",
  EW = "≱",
  LW = "≧̸",
  AW = "⩾̸",
  MW = "⩾̸",
  NW = "⋙̸",
  PW = "≵",
  OW = "≫⃒",
  DW = "≯",
  $W = "≯",
  RW = "≫̸",
  zW = "↮",
  FW = "⇎",
  IW = "⫲",
  qW = "∋",
  HW = "⋼",
  BW = "⋺",
  WW = "∋",
  UW = "Њ",
  jW = "њ",
  GW = "↚",
  VW = "⇍",
  KW = "‥",
  XW = "≦̸",
  YW = "≰",
  ZW = "↚",
  JW = "⇍",
  QW = "↮",
  tU = "⇎",
  eU = "≰",
  nU = "≦̸",
  rU = "⩽̸",
  iU = "⩽̸",
  oU = "≮",
  sU = "⋘̸",
  lU = "≴",
  aU = "≪⃒",
  cU = "≮",
  uU = "⋪",
  fU = "⋬",
  hU = "≪̸",
  dU = "∤",
  pU = "⁠",
  gU = " ",
  vU = "𝕟",
  mU = "ℕ",
  yU = "⫬",
  bU = "¬",
  wU = "≢",
  xU = "≭",
  _U = "∦",
  SU = "∉",
  kU = "≠",
  CU = "≂̸",
  TU = "∄",
  EU = "≯",
  LU = "≱",
  AU = "≧̸",
  MU = "≫̸",
  NU = "≹",
  PU = "⩾̸",
  OU = "≵",
  DU = "≎̸",
  $U = "≏̸",
  RU = "∉",
  zU = "⋵̸",
  FU = "⋹̸",
  IU = "∉",
  qU = "⋷",
  HU = "⋶",
  BU = "⧏̸",
  WU = "⋪",
  UU = "⋬",
  jU = "≮",
  GU = "≰",
  VU = "≸",
  KU = "≪̸",
  XU = "⩽̸",
  YU = "≴",
  ZU = "⪢̸",
  JU = "⪡̸",
  QU = "∌",
  t4 = "∌",
  e4 = "⋾",
  n4 = "⋽",
  r4 = "⊀",
  i4 = "⪯̸",
  o4 = "⋠",
  s4 = "∌",
  l4 = "⧐̸",
  a4 = "⋫",
  c4 = "⋭",
  u4 = "⊏̸",
  f4 = "⋢",
  h4 = "⊐̸",
  d4 = "⋣",
  p4 = "⊂⃒",
  g4 = "⊈",
  v4 = "⊁",
  m4 = "⪰̸",
  y4 = "⋡",
  b4 = "≿̸",
  w4 = "⊃⃒",
  x4 = "⊉",
  _4 = "≁",
  S4 = "≄",
  k4 = "≇",
  C4 = "≉",
  T4 = "∤",
  E4 = "∦",
  L4 = "∦",
  A4 = "⫽⃥",
  M4 = "∂̸",
  N4 = "⨔",
  P4 = "⊀",
  O4 = "⋠",
  D4 = "⊀",
  $4 = "⪯̸",
  R4 = "⪯̸",
  z4 = "⤳̸",
  F4 = "↛",
  I4 = "⇏",
  q4 = "↝̸",
  H4 = "↛",
  B4 = "⇏",
  W4 = "⋫",
  U4 = "⋭",
  j4 = "⊁",
  G4 = "⋡",
  V4 = "⪰̸",
  K4 = "𝒩",
  X4 = "𝓃",
  Y4 = "∤",
  Z4 = "∦",
  J4 = "≁",
  Q4 = "≄",
  t6 = "≄",
  e6 = "∤",
  n6 = "∦",
  r6 = "⋢",
  i6 = "⋣",
  o6 = "⊄",
  s6 = "⫅̸",
  l6 = "⊈",
  a6 = "⊂⃒",
  c6 = "⊈",
  u6 = "⫅̸",
  f6 = "⊁",
  h6 = "⪰̸",
  d6 = "⊅",
  p6 = "⫆̸",
  g6 = "⊉",
  v6 = "⊃⃒",
  m6 = "⊉",
  y6 = "⫆̸",
  b6 = "≹",
  w6 = "Ñ",
  x6 = "ñ",
  _6 = "≸",
  S6 = "⋪",
  k6 = "⋬",
  C6 = "⋫",
  T6 = "⋭",
  E6 = "Ν",
  L6 = "ν",
  A6 = "#",
  M6 = "№",
  N6 = " ",
  P6 = "≍⃒",
  O6 = "⊬",
  D6 = "⊭",
  $6 = "⊮",
  R6 = "⊯",
  z6 = "≥⃒",
  F6 = ">⃒",
  I6 = "⤄",
  q6 = "⧞",
  H6 = "⤂",
  B6 = "≤⃒",
  W6 = "<⃒",
  U6 = "⊴⃒",
  j6 = "⤃",
  G6 = "⊵⃒",
  V6 = "∼⃒",
  K6 = "⤣",
  X6 = "↖",
  Y6 = "⇖",
  Z6 = "↖",
  J6 = "⤧",
  Q6 = "Ó",
  tj = "ó",
  ej = "⊛",
  nj = "Ô",
  rj = "ô",
  ij = "⊚",
  oj = "О",
  sj = "о",
  lj = "⊝",
  aj = "Ő",
  cj = "ő",
  uj = "⨸",
  fj = "⊙",
  hj = "⦼",
  dj = "Œ",
  pj = "œ",
  gj = "⦿",
  vj = "𝔒",
  mj = "𝔬",
  yj = "˛",
  bj = "Ò",
  wj = "ò",
  xj = "⧁",
  _j = "⦵",
  Sj = "Ω",
  kj = "∮",
  Cj = "↺",
  Tj = "⦾",
  Ej = "⦻",
  Lj = "‾",
  Aj = "⧀",
  Mj = "Ō",
  Nj = "ō",
  Pj = "Ω",
  Oj = "ω",
  Dj = "Ο",
  $j = "ο",
  Rj = "⦶",
  zj = "⊖",
  Fj = "𝕆",
  Ij = "𝕠",
  qj = "⦷",
  Hj = "“",
  Bj = "‘",
  Wj = "⦹",
  Uj = "⊕",
  jj = "↻",
  Gj = "⩔",
  Vj = "∨",
  Kj = "⩝",
  Xj = "ℴ",
  Yj = "ℴ",
  Zj = "ª",
  Jj = "º",
  Qj = "⊶",
  t9 = "⩖",
  e9 = "⩗",
  n9 = "⩛",
  r9 = "Ⓢ",
  i9 = "𝒪",
  o9 = "ℴ",
  s9 = "Ø",
  l9 = "ø",
  a9 = "⊘",
  c9 = "Õ",
  u9 = "õ",
  f9 = "⨶",
  h9 = "⨷",
  d9 = "⊗",
  p9 = "Ö",
  g9 = "ö",
  v9 = "⌽",
  m9 = "‾",
  y9 = "⏞",
  b9 = "⎴",
  w9 = "⏜",
  x9 = "¶",
  _9 = "∥",
  S9 = "∥",
  k9 = "⫳",
  C9 = "⫽",
  T9 = "∂",
  E9 = "∂",
  L9 = "П",
  A9 = "п",
  M9 = "%",
  N9 = ".",
  P9 = "‰",
  O9 = "⊥",
  D9 = "‱",
  $9 = "𝔓",
  R9 = "𝔭",
  z9 = "Φ",
  F9 = "φ",
  I9 = "ϕ",
  q9 = "ℳ",
  H9 = "☎",
  B9 = "Π",
  W9 = "π",
  U9 = "⋔",
  j9 = "ϖ",
  G9 = "ℏ",
  V9 = "ℎ",
  K9 = "ℏ",
  X9 = "⨣",
  Y9 = "⊞",
  Z9 = "⨢",
  J9 = "+",
  Q9 = "∔",
  tG = "⨥",
  eG = "⩲",
  nG = "±",
  rG = "±",
  iG = "⨦",
  oG = "⨧",
  sG = "±",
  lG = "ℌ",
  aG = "⨕",
  cG = "𝕡",
  uG = "ℙ",
  fG = "£",
  hG = "⪷",
  dG = "⪻",
  pG = "≺",
  gG = "≼",
  vG = "⪷",
  mG = "≺",
  yG = "≼",
  bG = "≺",
  wG = "⪯",
  xG = "≼",
  _G = "≾",
  SG = "⪯",
  kG = "⪹",
  CG = "⪵",
  TG = "⋨",
  EG = "⪯",
  LG = "⪳",
  AG = "≾",
  MG = "′",
  NG = "″",
  PG = "ℙ",
  OG = "⪹",
  DG = "⪵",
  $G = "⋨",
  RG = "∏",
  zG = "∏",
  FG = "⌮",
  IG = "⌒",
  qG = "⌓",
  HG = "∝",
  BG = "∝",
  WG = "∷",
  UG = "∝",
  jG = "≾",
  GG = "⊰",
  VG = "𝒫",
  KG = "𝓅",
  XG = "Ψ",
  YG = "ψ",
  ZG = " ",
  JG = "𝔔",
  QG = "𝔮",
  tV = "⨌",
  eV = "𝕢",
  nV = "ℚ",
  rV = "⁗",
  iV = "𝒬",
  oV = "𝓆",
  sV = "ℍ",
  lV = "⨖",
  aV = "?",
  cV = "≟",
  uV = '"',
  fV = '"',
  hV = "⇛",
  dV = "∽̱",
  pV = "Ŕ",
  gV = "ŕ",
  vV = "√",
  mV = "⦳",
  yV = "⟩",
  bV = "⟫",
  wV = "⦒",
  xV = "⦥",
  _V = "⟩",
  SV = "»",
  kV = "⥵",
  CV = "⇥",
  TV = "⤠",
  EV = "⤳",
  LV = "→",
  AV = "↠",
  MV = "⇒",
  NV = "⤞",
  PV = "↪",
  OV = "↬",
  DV = "⥅",
  $V = "⥴",
  RV = "⤖",
  zV = "↣",
  FV = "↝",
  IV = "⤚",
  qV = "⤜",
  HV = "∶",
  BV = "ℚ",
  WV = "⤍",
  UV = "⤏",
  jV = "⤐",
  GV = "❳",
  VV = "}",
  KV = "]",
  XV = "⦌",
  YV = "⦎",
  ZV = "⦐",
  JV = "Ř",
  QV = "ř",
  t7 = "Ŗ",
  e7 = "ŗ",
  n7 = "⌉",
  r7 = "}",
  i7 = "Р",
  o7 = "р",
  s7 = "⤷",
  l7 = "⥩",
  a7 = "”",
  c7 = "”",
  u7 = "↳",
  f7 = "ℜ",
  h7 = "ℛ",
  d7 = "ℜ",
  p7 = "ℝ",
  g7 = "ℜ",
  v7 = "▭",
  m7 = "®",
  y7 = "®",
  b7 = "∋",
  w7 = "⇋",
  x7 = "⥯",
  _7 = "⥽",
  S7 = "⌋",
  k7 = "𝔯",
  C7 = "ℜ",
  T7 = "⥤",
  E7 = "⇁",
  L7 = "⇀",
  A7 = "⥬",
  M7 = "Ρ",
  N7 = "ρ",
  P7 = "ϱ",
  O7 = "⟩",
  D7 = "⇥",
  $7 = "→",
  R7 = "→",
  z7 = "⇒",
  F7 = "⇄",
  I7 = "↣",
  q7 = "⌉",
  H7 = "⟧",
  B7 = "⥝",
  W7 = "⥕",
  U7 = "⇂",
  j7 = "⌋",
  G7 = "⇁",
  V7 = "⇀",
  K7 = "⇄",
  X7 = "⇌",
  Y7 = "⇉",
  Z7 = "↝",
  J7 = "↦",
  Q7 = "⊢",
  tK = "⥛",
  eK = "⋌",
  nK = "⧐",
  rK = "⊳",
  iK = "⊵",
  oK = "⥏",
  sK = "⥜",
  lK = "⥔",
  aK = "↾",
  cK = "⥓",
  uK = "⇀",
  fK = "˚",
  hK = "≓",
  dK = "⇄",
  pK = "⇌",
  gK = "‏",
  vK = "⎱",
  mK = "⎱",
  yK = "⫮",
  bK = "⟭",
  wK = "⇾",
  xK = "⟧",
  _K = "⦆",
  SK = "𝕣",
  kK = "ℝ",
  CK = "⨮",
  TK = "⨵",
  EK = "⥰",
  LK = ")",
  AK = "⦔",
  MK = "⨒",
  NK = "⇉",
  PK = "⇛",
  OK = "›",
  DK = "𝓇",
  $K = "ℛ",
  RK = "↱",
  zK = "↱",
  FK = "]",
  IK = "’",
  qK = "’",
  HK = "⋌",
  BK = "⋊",
  WK = "▹",
  UK = "⊵",
  jK = "▸",
  GK = "⧎",
  VK = "⧴",
  KK = "⥨",
  XK = "℞",
  YK = "Ś",
  ZK = "ś",
  JK = "‚",
  QK = "⪸",
  tX = "Š",
  eX = "š",
  nX = "⪼",
  rX = "≻",
  iX = "≽",
  oX = "⪰",
  sX = "⪴",
  lX = "Ş",
  aX = "ş",
  cX = "Ŝ",
  uX = "ŝ",
  fX = "⪺",
  hX = "⪶",
  dX = "⋩",
  pX = "⨓",
  gX = "≿",
  vX = "С",
  mX = "с",
  yX = "⊡",
  bX = "⋅",
  wX = "⩦",
  xX = "⤥",
  _X = "↘",
  SX = "⇘",
  kX = "↘",
  CX = "§",
  TX = ";",
  EX = "⤩",
  LX = "∖",
  AX = "∖",
  MX = "✶",
  NX = "𝔖",
  PX = "𝔰",
  OX = "⌢",
  DX = "♯",
  $X = "Щ",
  RX = "щ",
  zX = "Ш",
  FX = "ш",
  IX = "↓",
  qX = "←",
  HX = "∣",
  BX = "∥",
  WX = "→",
  UX = "↑",
  jX = "­",
  GX = "Σ",
  VX = "σ",
  KX = "ς",
  XX = "ς",
  YX = "∼",
  ZX = "⩪",
  JX = "≃",
  QX = "≃",
  tY = "⪞",
  eY = "⪠",
  nY = "⪝",
  rY = "⪟",
  iY = "≆",
  oY = "⨤",
  sY = "⥲",
  lY = "←",
  aY = "∘",
  cY = "∖",
  uY = "⨳",
  fY = "⧤",
  hY = "∣",
  dY = "⌣",
  pY = "⪪",
  gY = "⪬",
  vY = "⪬︀",
  mY = "Ь",
  yY = "ь",
  bY = "⌿",
  wY = "⧄",
  xY = "/",
  _Y = "𝕊",
  SY = "𝕤",
  kY = "♠",
  CY = "♠",
  TY = "∥",
  EY = "⊓",
  LY = "⊓︀",
  AY = "⊔",
  MY = "⊔︀",
  NY = "√",
  PY = "⊏",
  OY = "⊑",
  DY = "⊏",
  $Y = "⊑",
  RY = "⊐",
  zY = "⊒",
  FY = "⊐",
  IY = "⊒",
  qY = "□",
  HY = "□",
  BY = "⊓",
  WY = "⊏",
  UY = "⊑",
  jY = "⊐",
  GY = "⊒",
  VY = "⊔",
  KY = "▪",
  XY = "□",
  YY = "▪",
  ZY = "→",
  JY = "𝒮",
  QY = "𝓈",
  tZ = "∖",
  eZ = "⌣",
  nZ = "⋆",
  rZ = "⋆",
  iZ = "☆",
  oZ = "★",
  sZ = "ϵ",
  lZ = "ϕ",
  aZ = "¯",
  cZ = "⊂",
  uZ = "⋐",
  fZ = "⪽",
  hZ = "⫅",
  dZ = "⊆",
  pZ = "⫃",
  gZ = "⫁",
  vZ = "⫋",
  mZ = "⊊",
  yZ = "⪿",
  bZ = "⥹",
  wZ = "⊂",
  xZ = "⋐",
  _Z = "⊆",
  SZ = "⫅",
  kZ = "⊆",
  CZ = "⊊",
  TZ = "⫋",
  EZ = "⫇",
  LZ = "⫕",
  AZ = "⫓",
  MZ = "⪸",
  NZ = "≻",
  PZ = "≽",
  OZ = "≻",
  DZ = "⪰",
  $Z = "≽",
  RZ = "≿",
  zZ = "⪰",
  FZ = "⪺",
  IZ = "⪶",
  qZ = "⋩",
  HZ = "≿",
  BZ = "∋",
  WZ = "∑",
  UZ = "∑",
  jZ = "♪",
  GZ = "¹",
  VZ = "²",
  KZ = "³",
  XZ = "⊃",
  YZ = "⋑",
  ZZ = "⪾",
  JZ = "⫘",
  QZ = "⫆",
  tJ = "⊇",
  eJ = "⫄",
  nJ = "⊃",
  rJ = "⊇",
  iJ = "⟉",
  oJ = "⫗",
  sJ = "⥻",
  lJ = "⫂",
  aJ = "⫌",
  cJ = "⊋",
  uJ = "⫀",
  fJ = "⊃",
  hJ = "⋑",
  dJ = "⊇",
  pJ = "⫆",
  gJ = "⊋",
  vJ = "⫌",
  mJ = "⫈",
  yJ = "⫔",
  bJ = "⫖",
  wJ = "⤦",
  xJ = "↙",
  _J = "⇙",
  SJ = "↙",
  kJ = "⤪",
  CJ = "ß",
  TJ = "	",
  EJ = "⌖",
  LJ = "Τ",
  AJ = "τ",
  MJ = "⎴",
  NJ = "Ť",
  PJ = "ť",
  OJ = "Ţ",
  DJ = "ţ",
  $J = "Т",
  RJ = "т",
  zJ = "⃛",
  FJ = "⌕",
  IJ = "𝔗",
  qJ = "𝔱",
  HJ = "∴",
  BJ = "∴",
  WJ = "∴",
  UJ = "Θ",
  jJ = "θ",
  GJ = "ϑ",
  VJ = "ϑ",
  KJ = "≈",
  XJ = "∼",
  YJ = "  ",
  ZJ = " ",
  JJ = " ",
  QJ = "≈",
  tQ = "∼",
  eQ = "Þ",
  nQ = "þ",
  rQ = "˜",
  iQ = "∼",
  oQ = "≃",
  sQ = "≅",
  lQ = "≈",
  aQ = "⨱",
  cQ = "⊠",
  uQ = "×",
  fQ = "⨰",
  hQ = "∭",
  dQ = "⤨",
  pQ = "⌶",
  gQ = "⫱",
  vQ = "⊤",
  mQ = "𝕋",
  yQ = "𝕥",
  bQ = "⫚",
  wQ = "⤩",
  xQ = "‴",
  _Q = "™",
  SQ = "™",
  kQ = "▵",
  CQ = "▿",
  TQ = "◃",
  EQ = "⊴",
  LQ = "≜",
  AQ = "▹",
  MQ = "⊵",
  NQ = "◬",
  PQ = "≜",
  OQ = "⨺",
  DQ = "⃛",
  $Q = "⨹",
  RQ = "⧍",
  zQ = "⨻",
  FQ = "⏢",
  IQ = "𝒯",
  qQ = "𝓉",
  HQ = "Ц",
  BQ = "ц",
  WQ = "Ћ",
  UQ = "ћ",
  jQ = "Ŧ",
  GQ = "ŧ",
  VQ = "≬",
  KQ = "↞",
  XQ = "↠",
  YQ = "Ú",
  ZQ = "ú",
  JQ = "↑",
  QQ = "↟",
  ttt = "⇑",
  ett = "⥉",
  ntt = "Ў",
  rtt = "ў",
  itt = "Ŭ",
  ott = "ŭ",
  stt = "Û",
  ltt = "û",
  att = "У",
  ctt = "у",
  utt = "⇅",
  ftt = "Ű",
  htt = "ű",
  dtt = "⥮",
  ptt = "⥾",
  gtt = "𝔘",
  vtt = "𝔲",
  mtt = "Ù",
  ytt = "ù",
  btt = "⥣",
  wtt = "↿",
  xtt = "↾",
  _tt = "▀",
  Stt = "⌜",
  ktt = "⌜",
  Ctt = "⌏",
  Ttt = "◸",
  Ett = "Ū",
  Ltt = "ū",
  Att = "¨",
  Mtt = "_",
  Ntt = "⏟",
  Ptt = "⎵",
  Ott = "⏝",
  Dtt = "⋃",
  $tt = "⊎",
  Rtt = "Ų",
  ztt = "ų",
  Ftt = "𝕌",
  Itt = "𝕦",
  qtt = "⤒",
  Htt = "↑",
  Btt = "↑",
  Wtt = "⇑",
  Utt = "⇅",
  jtt = "↕",
  Gtt = "↕",
  Vtt = "⇕",
  Ktt = "⥮",
  Xtt = "↿",
  Ytt = "↾",
  Ztt = "⊎",
  Jtt = "↖",
  Qtt = "↗",
  tet = "υ",
  eet = "ϒ",
  net = "ϒ",
  ret = "Υ",
  iet = "υ",
  oet = "↥",
  set = "⊥",
  aet = "⇈",
  cet = "⌝",
  uet = "⌝",
  fet = "⌎",
  het = "Ů",
  det = "ů",
  pet = "◹",
  get = "𝒰",
  vet = "𝓊",
  met = "⋰",
  yet = "Ũ",
  bet = "ũ",
  wet = "▵",
  xet = "▴",
  _et = "⇈",
  ket = "Ü",
  Cet = "ü",
  Tet = "⦧",
  Eet = "⦜",
  Let = "ϵ",
  Aet = "ϰ",
  Met = "∅",
  Net = "ϕ",
  Pet = "ϖ",
  Oet = "∝",
  Det = "↕",
  $et = "⇕",
  Ret = "ϱ",
  zet = "ς",
  Fet = "⊊︀",
  Iet = "⫋︀",
  qet = "⊋︀",
  Het = "⫌︀",
  Bet = "ϑ",
  Wet = "⊲",
  Uet = "⊳",
  jet = "⫨",
  Get = "⫫",
  Vet = "⫩",
  Ket = "В",
  Xet = "в",
  Yet = "⊢",
  Zet = "⊨",
  Jet = "⊩",
  Qet = "⊫",
  tnt = "⫦",
  ent = "⊻",
  nnt = "∨",
  rnt = "⋁",
  int = "≚",
  ont = "⋮",
  snt = "|",
  lnt = "‖",
  ant = "|",
  cnt = "‖",
  unt = "∣",
  fnt = "|",
  hnt = "❘",
  dnt = "≀",
  pnt = " ",
  gnt = "𝔙",
  vnt = "𝔳",
  mnt = "⊲",
  ynt = "⊂⃒",
  bnt = "⊃⃒",
  wnt = "𝕍",
  xnt = "𝕧",
  _nt = "∝",
  Snt = "⊳",
  knt = "𝒱",
  Cnt = "𝓋",
  Tnt = "⫋︀",
  Ent = "⊊︀",
  Lnt = "⫌︀",
  Ant = "⊋︀",
  Mnt = "⊪",
  Nnt = "⦚",
  Pnt = "Ŵ",
  Ont = "ŵ",
  Dnt = "⩟",
  $nt = "∧",
  Rnt = "⋀",
  znt = "≙",
  Fnt = "℘",
  Int = "𝔚",
  qnt = "𝔴",
  Hnt = "𝕎",
  Bnt = "𝕨",
  Wnt = "℘",
  Unt = "≀",
  jnt = "≀",
  Gnt = "𝒲",
  Vnt = "𝓌",
  Knt = "⋂",
  Xnt = "◯",
  Ynt = "⋃",
  Znt = "▽",
  Jnt = "𝔛",
  Qnt = "𝔵",
  trt = "⟷",
  ert = "⟺",
  nrt = "Ξ",
  rrt = "ξ",
  irt = "⟵",
  ort = "⟸",
  srt = "⟼",
  lrt = "⋻",
  art = "⨀",
  crt = "𝕏",
  urt = "𝕩",
  frt = "⨁",
  hrt = "⨂",
  drt = "⟶",
  prt = "⟹",
  grt = "𝒳",
  vrt = "𝓍",
  mrt = "⨆",
  yrt = "⨄",
  brt = "△",
  wrt = "⋁",
  xrt = "⋀",
  _rt = "Ý",
  Srt = "ý",
  krt = "Я",
  Crt = "я",
  Trt = "Ŷ",
  Ert = "ŷ",
  Lrt = "Ы",
  Art = "ы",
  Mrt = "¥",
  Nrt = "𝔜",
  Prt = "𝔶",
  Ort = "Ї",
  Drt = "ї",
  $rt = "𝕐",
  Rrt = "𝕪",
  zrt = "𝒴",
  Frt = "𝓎",
  Irt = "Ю",
  qrt = "ю",
  Hrt = "ÿ",
  Brt = "Ÿ",
  Wrt = "Ź",
  Urt = "ź",
  jrt = "Ž",
  Grt = "ž",
  Vrt = "З",
  Krt = "з",
  Xrt = "Ż",
  Yrt = "ż",
  Zrt = "ℨ",
  Jrt = "​",
  Qrt = "Ζ",
  tit = "ζ",
  eit = "𝔷",
  nit = "ℨ",
  rit = "Ж",
  iit = "ж",
  oit = "⇝",
  sit = "𝕫",
  lit = "ℤ",
  ait = "𝒵",
  cit = "𝓏",
  uit = "‍",
  fit = "‌",
  vy = {
    Aacute: VT,
    aacute: KT,
    Abreve: XT,
    abreve: YT,
    ac: ZT,
    acd: JT,
    acE: QT,
    Acirc: tE,
    acirc: eE,
    acute: nE,
    Acy: rE,
    acy: iE,
    AElig: oE,
    aelig: sE,
    af: lE,
    Afr: aE,
    afr: cE,
    Agrave: uE,
    agrave: fE,
    alefsym: hE,
    aleph: dE,
    Alpha: pE,
    alpha: gE,
    Amacr: vE,
    amacr: mE,
    amalg: yE,
    amp: bE,
    AMP: wE,
    andand: xE,
    And: _E,
    and: SE,
    andd: kE,
    andslope: CE,
    andv: TE,
    ang: EE,
    ange: LE,
    angle: AE,
    angmsdaa: ME,
    angmsdab: NE,
    angmsdac: PE,
    angmsdad: OE,
    angmsdae: DE,
    angmsdaf: $E,
    angmsdag: RE,
    angmsdah: zE,
    angmsd: FE,
    angrt: IE,
    angrtvb: qE,
    angrtvbd: HE,
    angsph: BE,
    angst: WE,
    angzarr: UE,
    Aogon: jE,
    aogon: GE,
    Aopf: VE,
    aopf: KE,
    apacir: XE,
    ap: YE,
    apE: ZE,
    ape: JE,
    apid: QE,
    apos: tL,
    ApplyFunction: eL,
    approx: nL,
    approxeq: rL,
    Aring: iL,
    aring: oL,
    Ascr: sL,
    ascr: lL,
    Assign: aL,
    ast: cL,
    asymp: uL,
    asympeq: fL,
    Atilde: hL,
    atilde: dL,
    Auml: pL,
    auml: gL,
    awconint: vL,
    awint: mL,
    backcong: yL,
    backepsilon: bL,
    backprime: wL,
    backsim: xL,
    backsimeq: _L,
    Backslash: SL,
    Barv: kL,
    barvee: CL,
    barwed: TL,
    Barwed: EL,
    barwedge: LL,
    bbrk: AL,
    bbrktbrk: ML,
    bcong: NL,
    Bcy: PL,
    bcy: OL,
    bdquo: DL,
    becaus: $L,
    because: RL,
    Because: zL,
    bemptyv: FL,
    bepsi: IL,
    bernou: qL,
    Bernoullis: HL,
    Beta: BL,
    beta: WL,
    beth: UL,
    between: jL,
    Bfr: GL,
    bfr: VL,
    bigcap: KL,
    bigcirc: XL,
    bigcup: YL,
    bigodot: ZL,
    bigoplus: JL,
    bigotimes: QL,
    bigsqcup: tA,
    bigstar: eA,
    bigtriangledown: nA,
    bigtriangleup: rA,
    biguplus: iA,
    bigvee: oA,
    bigwedge: sA,
    bkarow: lA,
    blacklozenge: aA,
    blacksquare: cA,
    blacktriangle: uA,
    blacktriangledown: fA,
    blacktriangleleft: hA,
    blacktriangleright: dA,
    blank: pA,
    blk12: gA,
    blk14: vA,
    blk34: mA,
    block: yA,
    bne: bA,
    bnequiv: wA,
    bNot: xA,
    bnot: _A,
    Bopf: SA,
    bopf: kA,
    bot: CA,
    bottom: TA,
    bowtie: EA,
    boxbox: LA,
    boxdl: AA,
    boxdL: MA,
    boxDl: NA,
    boxDL: PA,
    boxdr: OA,
    boxdR: DA,
    boxDr: $A,
    boxDR: RA,
    boxh: zA,
    boxH: FA,
    boxhd: IA,
    boxHd: qA,
    boxhD: HA,
    boxHD: BA,
    boxhu: WA,
    boxHu: UA,
    boxhU: jA,
    boxHU: GA,
    boxminus: VA,
    boxplus: KA,
    boxtimes: XA,
    boxul: YA,
    boxuL: ZA,
    boxUl: JA,
    boxUL: QA,
    boxur: tM,
    boxuR: eM,
    boxUr: nM,
    boxUR: rM,
    boxv: iM,
    boxV: oM,
    boxvh: sM,
    boxvH: lM,
    boxVh: aM,
    boxVH: cM,
    boxvl: uM,
    boxvL: fM,
    boxVl: hM,
    boxVL: dM,
    boxvr: pM,
    boxvR: gM,
    boxVr: vM,
    boxVR: mM,
    bprime: yM,
    breve: bM,
    Breve: wM,
    brvbar: xM,
    bscr: _M,
    Bscr: SM,
    bsemi: kM,
    bsim: CM,
    bsime: TM,
    bsolb: EM,
    bsol: LM,
    bsolhsub: AM,
    bull: MM,
    bullet: NM,
    bump: PM,
    bumpE: OM,
    bumpe: DM,
    Bumpeq: $M,
    bumpeq: RM,
    Cacute: zM,
    cacute: FM,
    capand: IM,
    capbrcup: qM,
    capcap: HM,
    cap: BM,
    Cap: WM,
    capcup: UM,
    capdot: jM,
    CapitalDifferentialD: GM,
    caps: VM,
    caret: KM,
    caron: XM,
    Cayleys: YM,
    ccaps: ZM,
    Ccaron: JM,
    ccaron: QM,
    Ccedil: tN,
    ccedil: eN,
    Ccirc: nN,
    ccirc: rN,
    Cconint: iN,
    ccups: oN,
    ccupssm: sN,
    Cdot: lN,
    cdot: aN,
    cedil: cN,
    Cedilla: uN,
    cemptyv: fN,
    cent: hN,
    centerdot: dN,
    CenterDot: pN,
    cfr: gN,
    Cfr: vN,
    CHcy: mN,
    chcy: yN,
    check: bN,
    checkmark: wN,
    Chi: xN,
    chi: _N,
    circ: SN,
    circeq: kN,
    circlearrowleft: CN,
    circlearrowright: TN,
    circledast: EN,
    circledcirc: LN,
    circleddash: AN,
    CircleDot: MN,
    circledR: NN,
    circledS: PN,
    CircleMinus: ON,
    CirclePlus: DN,
    CircleTimes: $N,
    cir: RN,
    cirE: zN,
    cire: FN,
    cirfnint: IN,
    cirmid: qN,
    cirscir: HN,
    ClockwiseContourIntegral: BN,
    CloseCurlyDoubleQuote: WN,
    CloseCurlyQuote: UN,
    clubs: jN,
    clubsuit: GN,
    colon: VN,
    Colon: KN,
    Colone: XN,
    colone: YN,
    coloneq: ZN,
    comma: JN,
    commat: QN,
    comp: tP,
    compfn: eP,
    complement: nP,
    complexes: rP,
    cong: iP,
    congdot: oP,
    Congruent: sP,
    conint: lP,
    Conint: aP,
    ContourIntegral: cP,
    copf: uP,
    Copf: fP,
    coprod: hP,
    Coproduct: dP,
    copy: pP,
    COPY: gP,
    copysr: vP,
    CounterClockwiseContourIntegral: mP,
    crarr: yP,
    cross: bP,
    Cross: wP,
    Cscr: xP,
    cscr: _P,
    csub: SP,
    csube: kP,
    csup: CP,
    csupe: TP,
    ctdot: EP,
    cudarrl: LP,
    cudarrr: AP,
    cuepr: MP,
    cuesc: NP,
    cularr: PP,
    cularrp: OP,
    cupbrcap: DP,
    cupcap: $P,
    CupCap: RP,
    cup: zP,
    Cup: FP,
    cupcup: IP,
    cupdot: qP,
    cupor: HP,
    cups: BP,
    curarr: WP,
    curarrm: UP,
    curlyeqprec: jP,
    curlyeqsucc: GP,
    curlyvee: VP,
    curlywedge: KP,
    curren: XP,
    curvearrowleft: YP,
    curvearrowright: ZP,
    cuvee: JP,
    cuwed: QP,
    cwconint: tO,
    cwint: eO,
    cylcty: nO,
    dagger: rO,
    Dagger: iO,
    daleth: oO,
    darr: sO,
    Darr: lO,
    dArr: aO,
    dash: cO,
    Dashv: uO,
    dashv: fO,
    dbkarow: hO,
    dblac: dO,
    Dcaron: pO,
    dcaron: gO,
    Dcy: vO,
    dcy: mO,
    ddagger: yO,
    ddarr: bO,
    DD: wO,
    dd: xO,
    DDotrahd: _O,
    ddotseq: SO,
    deg: kO,
    Del: CO,
    Delta: TO,
    delta: EO,
    demptyv: LO,
    dfisht: AO,
    Dfr: MO,
    dfr: NO,
    dHar: PO,
    dharl: OO,
    dharr: DO,
    DiacriticalAcute: $O,
    DiacriticalDot: RO,
    DiacriticalDoubleAcute: zO,
    DiacriticalGrave: FO,
    DiacriticalTilde: IO,
    diam: qO,
    diamond: HO,
    Diamond: BO,
    diamondsuit: WO,
    diams: UO,
    die: jO,
    DifferentialD: GO,
    digamma: VO,
    disin: KO,
    div: XO,
    divide: YO,
    divideontimes: ZO,
    divonx: JO,
    DJcy: QO,
    djcy: tD,
    dlcorn: eD,
    dlcrop: nD,
    dollar: rD,
    Dopf: iD,
    dopf: oD,
    Dot: sD,
    dot: lD,
    DotDot: aD,
    doteq: cD,
    doteqdot: uD,
    DotEqual: fD,
    dotminus: hD,
    dotplus: dD,
    dotsquare: pD,
    doublebarwedge: gD,
    DoubleContourIntegral: vD,
    DoubleDot: mD,
    DoubleDownArrow: yD,
    DoubleLeftArrow: bD,
    DoubleLeftRightArrow: wD,
    DoubleLeftTee: xD,
    DoubleLongLeftArrow: _D,
    DoubleLongLeftRightArrow: SD,
    DoubleLongRightArrow: kD,
    DoubleRightArrow: CD,
    DoubleRightTee: TD,
    DoubleUpArrow: ED,
    DoubleUpDownArrow: LD,
    DoubleVerticalBar: AD,
    DownArrowBar: MD,
    downarrow: ND,
    DownArrow: PD,
    Downarrow: OD,
    DownArrowUpArrow: DD,
    DownBreve: $D,
    downdownarrows: RD,
    downharpoonleft: zD,
    downharpoonright: FD,
    DownLeftRightVector: ID,
    DownLeftTeeVector: qD,
    DownLeftVectorBar: HD,
    DownLeftVector: BD,
    DownRightTeeVector: WD,
    DownRightVectorBar: UD,
    DownRightVector: jD,
    DownTeeArrow: GD,
    DownTee: VD,
    drbkarow: KD,
    drcorn: XD,
    drcrop: YD,
    Dscr: ZD,
    dscr: JD,
    DScy: QD,
    dscy: t$,
    dsol: e$,
    Dstrok: n$,
    dstrok: r$,
    dtdot: i$,
    dtri: o$,
    dtrif: s$,
    duarr: l$,
    duhar: a$,
    dwangle: c$,
    DZcy: u$,
    dzcy: f$,
    dzigrarr: h$,
    Eacute: d$,
    eacute: p$,
    easter: g$,
    Ecaron: v$,
    ecaron: m$,
    Ecirc: y$,
    ecirc: b$,
    ecir: w$,
    ecolon: x$,
    Ecy: _$,
    ecy: S$,
    eDDot: k$,
    Edot: C$,
    edot: T$,
    eDot: E$,
    ee: L$,
    efDot: A$,
    Efr: M$,
    efr: N$,
    eg: P$,
    Egrave: O$,
    egrave: D$,
    egs: $$,
    egsdot: R$,
    el: z$,
    Element: F$,
    elinters: I$,
    ell: q$,
    els: H$,
    elsdot: B$,
    Emacr: W$,
    emacr: U$,
    empty: j$,
    emptyset: G$,
    EmptySmallSquare: V$,
    emptyv: K$,
    EmptyVerySmallSquare: X$,
    emsp13: Y$,
    emsp14: Z$,
    emsp: J$,
    ENG: Q$,
    eng: tR,
    ensp: eR,
    Eogon: nR,
    eogon: rR,
    Eopf: iR,
    eopf: oR,
    epar: sR,
    eparsl: lR,
    eplus: aR,
    epsi: cR,
    Epsilon: uR,
    epsilon: fR,
    epsiv: hR,
    eqcirc: dR,
    eqcolon: pR,
    eqsim: gR,
    eqslantgtr: vR,
    eqslantless: mR,
    Equal: yR,
    equals: bR,
    EqualTilde: wR,
    equest: xR,
    Equilibrium: _R,
    equiv: SR,
    equivDD: kR,
    eqvparsl: CR,
    erarr: TR,
    erDot: ER,
    escr: LR,
    Escr: AR,
    esdot: MR,
    Esim: NR,
    esim: PR,
    Eta: OR,
    eta: DR,
    ETH: $R,
    eth: RR,
    Euml: zR,
    euml: FR,
    euro: IR,
    excl: qR,
    exist: HR,
    Exists: BR,
    expectation: WR,
    exponentiale: UR,
    ExponentialE: jR,
    fallingdotseq: GR,
    Fcy: VR,
    fcy: KR,
    female: XR,
    ffilig: YR,
    fflig: ZR,
    ffllig: JR,
    Ffr: QR,
    ffr: t2,
    filig: e2,
    FilledSmallSquare: n2,
    FilledVerySmallSquare: r2,
    fjlig: i2,
    flat: o2,
    fllig: s2,
    fltns: l2,
    fnof: a2,
    Fopf: c2,
    fopf: u2,
    forall: f2,
    ForAll: h2,
    fork: d2,
    forkv: p2,
    Fouriertrf: g2,
    fpartint: v2,
    frac12: m2,
    frac13: y2,
    frac14: b2,
    frac15: w2,
    frac16: x2,
    frac18: _2,
    frac23: S2,
    frac25: k2,
    frac34: C2,
    frac35: T2,
    frac38: E2,
    frac45: L2,
    frac56: A2,
    frac58: M2,
    frac78: N2,
    frasl: P2,
    frown: O2,
    fscr: D2,
    Fscr: $2,
    gacute: R2,
    Gamma: z2,
    gamma: F2,
    Gammad: I2,
    gammad: q2,
    gap: H2,
    Gbreve: B2,
    gbreve: W2,
    Gcedil: U2,
    Gcirc: j2,
    gcirc: G2,
    Gcy: V2,
    gcy: K2,
    Gdot: X2,
    gdot: Y2,
    ge: Z2,
    gE: J2,
    gEl: Q2,
    gel: tz,
    geq: ez,
    geqq: nz,
    geqslant: rz,
    gescc: iz,
    ges: oz,
    gesdot: sz,
    gesdoto: lz,
    gesdotol: az,
    gesl: cz,
    gesles: uz,
    Gfr: fz,
    gfr: hz,
    gg: dz,
    Gg: pz,
    ggg: gz,
    gimel: vz,
    GJcy: mz,
    gjcy: yz,
    gla: bz,
    gl: wz,
    glE: xz,
    glj: _z,
    gnap: Sz,
    gnapprox: kz,
    gne: Cz,
    gnE: Tz,
    gneq: Ez,
    gneqq: Lz,
    gnsim: Az,
    Gopf: Mz,
    gopf: Nz,
    grave: Pz,
    GreaterEqual: Oz,
    GreaterEqualLess: Dz,
    GreaterFullEqual: $z,
    GreaterGreater: Rz,
    GreaterLess: zz,
    GreaterSlantEqual: Fz,
    GreaterTilde: Iz,
    Gscr: qz,
    gscr: Hz,
    gsim: Bz,
    gsime: Wz,
    gsiml: Uz,
    gtcc: jz,
    gtcir: Gz,
    gt: Vz,
    GT: Kz,
    Gt: Xz,
    gtdot: Yz,
    gtlPar: Zz,
    gtquest: Jz,
    gtrapprox: Qz,
    gtrarr: tF,
    gtrdot: eF,
    gtreqless: nF,
    gtreqqless: rF,
    gtrless: iF,
    gtrsim: oF,
    gvertneqq: sF,
    gvnE: lF,
    Hacek: aF,
    hairsp: cF,
    half: uF,
    hamilt: fF,
    HARDcy: hF,
    hardcy: dF,
    harrcir: pF,
    harr: gF,
    hArr: vF,
    harrw: mF,
    Hat: yF,
    hbar: bF,
    Hcirc: wF,
    hcirc: xF,
    hearts: _F,
    heartsuit: SF,
    hellip: kF,
    hercon: CF,
    hfr: TF,
    Hfr: EF,
    HilbertSpace: LF,
    hksearow: AF,
    hkswarow: MF,
    hoarr: NF,
    homtht: PF,
    hookleftarrow: OF,
    hookrightarrow: DF,
    hopf: $F,
    Hopf: RF,
    horbar: zF,
    HorizontalLine: FF,
    hscr: IF,
    Hscr: qF,
    hslash: HF,
    Hstrok: BF,
    hstrok: WF,
    HumpDownHump: UF,
    HumpEqual: jF,
    hybull: GF,
    hyphen: VF,
    Iacute: KF,
    iacute: XF,
    ic: YF,
    Icirc: ZF,
    icirc: JF,
    Icy: QF,
    icy: tI,
    Idot: eI,
    IEcy: nI,
    iecy: rI,
    iexcl: iI,
    iff: oI,
    ifr: sI,
    Ifr: lI,
    Igrave: aI,
    igrave: cI,
    ii: uI,
    iiiint: fI,
    iiint: hI,
    iinfin: dI,
    iiota: pI,
    IJlig: gI,
    ijlig: vI,
    Imacr: mI,
    imacr: yI,
    image: bI,
    ImaginaryI: wI,
    imagline: xI,
    imagpart: _I,
    imath: SI,
    Im: kI,
    imof: CI,
    imped: TI,
    Implies: EI,
    incare: LI,
    in: "∈",
    infin: AI,
    infintie: MI,
    inodot: NI,
    intcal: PI,
    int: OI,
    Int: DI,
    integers: $I,
    Integral: RI,
    intercal: zI,
    Intersection: FI,
    intlarhk: II,
    intprod: qI,
    InvisibleComma: HI,
    InvisibleTimes: BI,
    IOcy: WI,
    iocy: UI,
    Iogon: jI,
    iogon: GI,
    Iopf: VI,
    iopf: KI,
    Iota: XI,
    iota: YI,
    iprod: ZI,
    iquest: JI,
    iscr: QI,
    Iscr: tq,
    isin: eq,
    isindot: nq,
    isinE: rq,
    isins: iq,
    isinsv: oq,
    isinv: sq,
    it: lq,
    Itilde: aq,
    itilde: cq,
    Iukcy: uq,
    iukcy: fq,
    Iuml: hq,
    iuml: dq,
    Jcirc: pq,
    jcirc: gq,
    Jcy: vq,
    jcy: mq,
    Jfr: yq,
    jfr: bq,
    jmath: wq,
    Jopf: xq,
    jopf: _q,
    Jscr: Sq,
    jscr: kq,
    Jsercy: Cq,
    jsercy: Tq,
    Jukcy: Eq,
    jukcy: Lq,
    Kappa: Aq,
    kappa: Mq,
    kappav: Nq,
    Kcedil: Pq,
    kcedil: Oq,
    Kcy: Dq,
    kcy: $q,
    Kfr: Rq,
    kfr: zq,
    kgreen: Fq,
    KHcy: Iq,
    khcy: qq,
    KJcy: Hq,
    kjcy: Bq,
    Kopf: Wq,
    kopf: Uq,
    Kscr: jq,
    kscr: Gq,
    lAarr: Vq,
    Lacute: Kq,
    lacute: Xq,
    laemptyv: Yq,
    lagran: Zq,
    Lambda: Jq,
    lambda: Qq,
    lang: tH,
    Lang: eH,
    langd: nH,
    langle: rH,
    lap: iH,
    Laplacetrf: oH,
    laquo: sH,
    larrb: lH,
    larrbfs: aH,
    larr: cH,
    Larr: uH,
    lArr: fH,
    larrfs: hH,
    larrhk: dH,
    larrlp: pH,
    larrpl: gH,
    larrsim: vH,
    larrtl: mH,
    latail: yH,
    lAtail: bH,
    lat: wH,
    late: xH,
    lates: _H,
    lbarr: SH,
    lBarr: kH,
    lbbrk: CH,
    lbrace: TH,
    lbrack: EH,
    lbrke: LH,
    lbrksld: AH,
    lbrkslu: MH,
    Lcaron: NH,
    lcaron: PH,
    Lcedil: OH,
    lcedil: DH,
    lceil: $H,
    lcub: RH,
    Lcy: zH,
    lcy: FH,
    ldca: IH,
    ldquo: qH,
    ldquor: HH,
    ldrdhar: BH,
    ldrushar: WH,
    ldsh: UH,
    le: jH,
    lE: GH,
    LeftAngleBracket: VH,
    LeftArrowBar: KH,
    leftarrow: XH,
    LeftArrow: YH,
    Leftarrow: ZH,
    LeftArrowRightArrow: JH,
    leftarrowtail: QH,
    LeftCeiling: tB,
    LeftDoubleBracket: eB,
    LeftDownTeeVector: nB,
    LeftDownVectorBar: rB,
    LeftDownVector: iB,
    LeftFloor: oB,
    leftharpoondown: sB,
    leftharpoonup: lB,
    leftleftarrows: aB,
    leftrightarrow: cB,
    LeftRightArrow: uB,
    Leftrightarrow: fB,
    leftrightarrows: hB,
    leftrightharpoons: dB,
    leftrightsquigarrow: pB,
    LeftRightVector: gB,
    LeftTeeArrow: vB,
    LeftTee: mB,
    LeftTeeVector: yB,
    leftthreetimes: bB,
    LeftTriangleBar: wB,
    LeftTriangle: xB,
    LeftTriangleEqual: _B,
    LeftUpDownVector: SB,
    LeftUpTeeVector: kB,
    LeftUpVectorBar: CB,
    LeftUpVector: TB,
    LeftVectorBar: EB,
    LeftVector: LB,
    lEg: AB,
    leg: MB,
    leq: NB,
    leqq: PB,
    leqslant: OB,
    lescc: DB,
    les: $B,
    lesdot: RB,
    lesdoto: zB,
    lesdotor: FB,
    lesg: IB,
    lesges: qB,
    lessapprox: HB,
    lessdot: BB,
    lesseqgtr: WB,
    lesseqqgtr: UB,
    LessEqualGreater: jB,
    LessFullEqual: GB,
    LessGreater: VB,
    lessgtr: KB,
    LessLess: XB,
    lesssim: YB,
    LessSlantEqual: ZB,
    LessTilde: JB,
    lfisht: QB,
    lfloor: t3,
    Lfr: e3,
    lfr: n3,
    lg: r3,
    lgE: i3,
    lHar: o3,
    lhard: s3,
    lharu: l3,
    lharul: a3,
    lhblk: c3,
    LJcy: u3,
    ljcy: f3,
    llarr: h3,
    ll: d3,
    Ll: p3,
    llcorner: g3,
    Lleftarrow: v3,
    llhard: m3,
    lltri: y3,
    Lmidot: b3,
    lmidot: w3,
    lmoustache: x3,
    lmoust: _3,
    lnap: S3,
    lnapprox: k3,
    lne: C3,
    lnE: T3,
    lneq: E3,
    lneqq: L3,
    lnsim: A3,
    loang: M3,
    loarr: N3,
    lobrk: P3,
    longleftarrow: O3,
    LongLeftArrow: D3,
    Longleftarrow: $3,
    longleftrightarrow: R3,
    LongLeftRightArrow: z3,
    Longleftrightarrow: F3,
    longmapsto: I3,
    longrightarrow: q3,
    LongRightArrow: H3,
    Longrightarrow: B3,
    looparrowleft: W3,
    looparrowright: U3,
    lopar: j3,
    Lopf: G3,
    lopf: V3,
    loplus: K3,
    lotimes: X3,
    lowast: Y3,
    lowbar: Z3,
    LowerLeftArrow: J3,
    LowerRightArrow: Q3,
    loz: t5,
    lozenge: e5,
    lozf: n5,
    lpar: r5,
    lparlt: i5,
    lrarr: o5,
    lrcorner: s5,
    lrhar: l5,
    lrhard: a5,
    lrm: c5,
    lrtri: u5,
    lsaquo: f5,
    lscr: h5,
    Lscr: d5,
    lsh: p5,
    Lsh: g5,
    lsim: v5,
    lsime: m5,
    lsimg: y5,
    lsqb: b5,
    lsquo: w5,
    lsquor: x5,
    Lstrok: _5,
    lstrok: S5,
    ltcc: k5,
    ltcir: C5,
    lt: T5,
    LT: E5,
    Lt: L5,
    ltdot: A5,
    lthree: M5,
    ltimes: N5,
    ltlarr: P5,
    ltquest: O5,
    ltri: D5,
    ltrie: $5,
    ltrif: R5,
    ltrPar: z5,
    lurdshar: F5,
    luruhar: I5,
    lvertneqq: q5,
    lvnE: H5,
    macr: B5,
    male: W5,
    malt: U5,
    maltese: j5,
    Map: "⤅",
    map: G5,
    mapsto: V5,
    mapstodown: K5,
    mapstoleft: X5,
    mapstoup: Y5,
    marker: Z5,
    mcomma: J5,
    Mcy: Q5,
    mcy: t8,
    mdash: e8,
    mDDot: n8,
    measuredangle: r8,
    MediumSpace: i8,
    Mellintrf: o8,
    Mfr: s8,
    mfr: l8,
    mho: a8,
    micro: c8,
    midast: u8,
    midcir: f8,
    mid: h8,
    middot: d8,
    minusb: p8,
    minus: g8,
    minusd: v8,
    minusdu: m8,
    MinusPlus: y8,
    mlcp: b8,
    mldr: w8,
    mnplus: x8,
    models: _8,
    Mopf: S8,
    mopf: k8,
    mp: C8,
    mscr: T8,
    Mscr: E8,
    mstpos: L8,
    Mu: A8,
    mu: M8,
    multimap: N8,
    mumap: P8,
    nabla: O8,
    Nacute: D8,
    nacute: $8,
    nang: R8,
    nap: z8,
    napE: F8,
    napid: I8,
    napos: q8,
    napprox: H8,
    natural: B8,
    naturals: W8,
    natur: U8,
    nbsp: j8,
    nbump: G8,
    nbumpe: V8,
    ncap: K8,
    Ncaron: X8,
    ncaron: Y8,
    Ncedil: Z8,
    ncedil: J8,
    ncong: Q8,
    ncongdot: tW,
    ncup: eW,
    Ncy: nW,
    ncy: rW,
    ndash: iW,
    nearhk: oW,
    nearr: sW,
    neArr: lW,
    nearrow: aW,
    ne: cW,
    nedot: uW,
    NegativeMediumSpace: fW,
    NegativeThickSpace: hW,
    NegativeThinSpace: dW,
    NegativeVeryThinSpace: pW,
    nequiv: gW,
    nesear: vW,
    nesim: mW,
    NestedGreaterGreater: yW,
    NestedLessLess: bW,
    NewLine: wW,
    nexist: xW,
    nexists: _W,
    Nfr: SW,
    nfr: kW,
    ngE: CW,
    nge: TW,
    ngeq: EW,
    ngeqq: LW,
    ngeqslant: AW,
    nges: MW,
    nGg: NW,
    ngsim: PW,
    nGt: OW,
    ngt: DW,
    ngtr: $W,
    nGtv: RW,
    nharr: zW,
    nhArr: FW,
    nhpar: IW,
    ni: qW,
    nis: HW,
    nisd: BW,
    niv: WW,
    NJcy: UW,
    njcy: jW,
    nlarr: GW,
    nlArr: VW,
    nldr: KW,
    nlE: XW,
    nle: YW,
    nleftarrow: ZW,
    nLeftarrow: JW,
    nleftrightarrow: QW,
    nLeftrightarrow: tU,
    nleq: eU,
    nleqq: nU,
    nleqslant: rU,
    nles: iU,
    nless: oU,
    nLl: sU,
    nlsim: lU,
    nLt: aU,
    nlt: cU,
    nltri: uU,
    nltrie: fU,
    nLtv: hU,
    nmid: dU,
    NoBreak: pU,
    NonBreakingSpace: gU,
    nopf: vU,
    Nopf: mU,
    Not: yU,
    not: bU,
    NotCongruent: wU,
    NotCupCap: xU,
    NotDoubleVerticalBar: _U,
    NotElement: SU,
    NotEqual: kU,
    NotEqualTilde: CU,
    NotExists: TU,
    NotGreater: EU,
    NotGreaterEqual: LU,
    NotGreaterFullEqual: AU,
    NotGreaterGreater: MU,
    NotGreaterLess: NU,
    NotGreaterSlantEqual: PU,
    NotGreaterTilde: OU,
    NotHumpDownHump: DU,
    NotHumpEqual: $U,
    notin: RU,
    notindot: zU,
    notinE: FU,
    notinva: IU,
    notinvb: qU,
    notinvc: HU,
    NotLeftTriangleBar: BU,
    NotLeftTriangle: WU,
    NotLeftTriangleEqual: UU,
    NotLess: jU,
    NotLessEqual: GU,
    NotLessGreater: VU,
    NotLessLess: KU,
    NotLessSlantEqual: XU,
    NotLessTilde: YU,
    NotNestedGreaterGreater: ZU,
    NotNestedLessLess: JU,
    notni: QU,
    notniva: t4,
    notnivb: e4,
    notnivc: n4,
    NotPrecedes: r4,
    NotPrecedesEqual: i4,
    NotPrecedesSlantEqual: o4,
    NotReverseElement: s4,
    NotRightTriangleBar: l4,
    NotRightTriangle: a4,
    NotRightTriangleEqual: c4,
    NotSquareSubset: u4,
    NotSquareSubsetEqual: f4,
    NotSquareSuperset: h4,
    NotSquareSupersetEqual: d4,
    NotSubset: p4,
    NotSubsetEqual: g4,
    NotSucceeds: v4,
    NotSucceedsEqual: m4,
    NotSucceedsSlantEqual: y4,
    NotSucceedsTilde: b4,
    NotSuperset: w4,
    NotSupersetEqual: x4,
    NotTilde: _4,
    NotTildeEqual: S4,
    NotTildeFullEqual: k4,
    NotTildeTilde: C4,
    NotVerticalBar: T4,
    nparallel: E4,
    npar: L4,
    nparsl: A4,
    npart: M4,
    npolint: N4,
    npr: P4,
    nprcue: O4,
    nprec: D4,
    npreceq: $4,
    npre: R4,
    nrarrc: z4,
    nrarr: F4,
    nrArr: I4,
    nrarrw: q4,
    nrightarrow: H4,
    nRightarrow: B4,
    nrtri: W4,
    nrtrie: U4,
    nsc: j4,
    nsccue: G4,
    nsce: V4,
    Nscr: K4,
    nscr: X4,
    nshortmid: Y4,
    nshortparallel: Z4,
    nsim: J4,
    nsime: Q4,
    nsimeq: t6,
    nsmid: e6,
    nspar: n6,
    nsqsube: r6,
    nsqsupe: i6,
    nsub: o6,
    nsubE: s6,
    nsube: l6,
    nsubset: a6,
    nsubseteq: c6,
    nsubseteqq: u6,
    nsucc: f6,
    nsucceq: h6,
    nsup: d6,
    nsupE: p6,
    nsupe: g6,
    nsupset: v6,
    nsupseteq: m6,
    nsupseteqq: y6,
    ntgl: b6,
    Ntilde: w6,
    ntilde: x6,
    ntlg: _6,
    ntriangleleft: S6,
    ntrianglelefteq: k6,
    ntriangleright: C6,
    ntrianglerighteq: T6,
    Nu: E6,
    nu: L6,
    num: A6,
    numero: M6,
    numsp: N6,
    nvap: P6,
    nvdash: O6,
    nvDash: D6,
    nVdash: $6,
    nVDash: R6,
    nvge: z6,
    nvgt: F6,
    nvHarr: I6,
    nvinfin: q6,
    nvlArr: H6,
    nvle: B6,
    nvlt: W6,
    nvltrie: U6,
    nvrArr: j6,
    nvrtrie: G6,
    nvsim: V6,
    nwarhk: K6,
    nwarr: X6,
    nwArr: Y6,
    nwarrow: Z6,
    nwnear: J6,
    Oacute: Q6,
    oacute: tj,
    oast: ej,
    Ocirc: nj,
    ocirc: rj,
    ocir: ij,
    Ocy: oj,
    ocy: sj,
    odash: lj,
    Odblac: aj,
    odblac: cj,
    odiv: uj,
    odot: fj,
    odsold: hj,
    OElig: dj,
    oelig: pj,
    ofcir: gj,
    Ofr: vj,
    ofr: mj,
    ogon: yj,
    Ograve: bj,
    ograve: wj,
    ogt: xj,
    ohbar: _j,
    ohm: Sj,
    oint: kj,
    olarr: Cj,
    olcir: Tj,
    olcross: Ej,
    oline: Lj,
    olt: Aj,
    Omacr: Mj,
    omacr: Nj,
    Omega: Pj,
    omega: Oj,
    Omicron: Dj,
    omicron: $j,
    omid: Rj,
    ominus: zj,
    Oopf: Fj,
    oopf: Ij,
    opar: qj,
    OpenCurlyDoubleQuote: Hj,
    OpenCurlyQuote: Bj,
    operp: Wj,
    oplus: Uj,
    orarr: jj,
    Or: Gj,
    or: Vj,
    ord: Kj,
    order: Xj,
    orderof: Yj,
    ordf: Zj,
    ordm: Jj,
    origof: Qj,
    oror: t9,
    orslope: e9,
    orv: n9,
    oS: r9,
    Oscr: i9,
    oscr: o9,
    Oslash: s9,
    oslash: l9,
    osol: a9,
    Otilde: c9,
    otilde: u9,
    otimesas: f9,
    Otimes: h9,
    otimes: d9,
    Ouml: p9,
    ouml: g9,
    ovbar: v9,
    OverBar: m9,
    OverBrace: y9,
    OverBracket: b9,
    OverParenthesis: w9,
    para: x9,
    parallel: _9,
    par: S9,
    parsim: k9,
    parsl: C9,
    part: T9,
    PartialD: E9,
    Pcy: L9,
    pcy: A9,
    percnt: M9,
    period: N9,
    permil: P9,
    perp: O9,
    pertenk: D9,
    Pfr: $9,
    pfr: R9,
    Phi: z9,
    phi: F9,
    phiv: I9,
    phmmat: q9,
    phone: H9,
    Pi: B9,
    pi: W9,
    pitchfork: U9,
    piv: j9,
    planck: G9,
    planckh: V9,
    plankv: K9,
    plusacir: X9,
    plusb: Y9,
    pluscir: Z9,
    plus: J9,
    plusdo: Q9,
    plusdu: tG,
    pluse: eG,
    PlusMinus: nG,
    plusmn: rG,
    plussim: iG,
    plustwo: oG,
    pm: sG,
    Poincareplane: lG,
    pointint: aG,
    popf: cG,
    Popf: uG,
    pound: fG,
    prap: hG,
    Pr: dG,
    pr: pG,
    prcue: gG,
    precapprox: vG,
    prec: mG,
    preccurlyeq: yG,
    Precedes: bG,
    PrecedesEqual: wG,
    PrecedesSlantEqual: xG,
    PrecedesTilde: _G,
    preceq: SG,
    precnapprox: kG,
    precneqq: CG,
    precnsim: TG,
    pre: EG,
    prE: LG,
    precsim: AG,
    prime: MG,
    Prime: NG,
    primes: PG,
    prnap: OG,
    prnE: DG,
    prnsim: $G,
    prod: RG,
    Product: zG,
    profalar: FG,
    profline: IG,
    profsurf: qG,
    prop: HG,
    Proportional: BG,
    Proportion: WG,
    propto: UG,
    prsim: jG,
    prurel: GG,
    Pscr: VG,
    pscr: KG,
    Psi: XG,
    psi: YG,
    puncsp: ZG,
    Qfr: JG,
    qfr: QG,
    qint: tV,
    qopf: eV,
    Qopf: nV,
    qprime: rV,
    Qscr: iV,
    qscr: oV,
    quaternions: sV,
    quatint: lV,
    quest: aV,
    questeq: cV,
    quot: uV,
    QUOT: fV,
    rAarr: hV,
    race: dV,
    Racute: pV,
    racute: gV,
    radic: vV,
    raemptyv: mV,
    rang: yV,
    Rang: bV,
    rangd: wV,
    range: xV,
    rangle: _V,
    raquo: SV,
    rarrap: kV,
    rarrb: CV,
    rarrbfs: TV,
    rarrc: EV,
    rarr: LV,
    Rarr: AV,
    rArr: MV,
    rarrfs: NV,
    rarrhk: PV,
    rarrlp: OV,
    rarrpl: DV,
    rarrsim: $V,
    Rarrtl: RV,
    rarrtl: zV,
    rarrw: FV,
    ratail: IV,
    rAtail: qV,
    ratio: HV,
    rationals: BV,
    rbarr: WV,
    rBarr: UV,
    RBarr: jV,
    rbbrk: GV,
    rbrace: VV,
    rbrack: KV,
    rbrke: XV,
    rbrksld: YV,
    rbrkslu: ZV,
    Rcaron: JV,
    rcaron: QV,
    Rcedil: t7,
    rcedil: e7,
    rceil: n7,
    rcub: r7,
    Rcy: i7,
    rcy: o7,
    rdca: s7,
    rdldhar: l7,
    rdquo: a7,
    rdquor: c7,
    rdsh: u7,
    real: f7,
    realine: h7,
    realpart: d7,
    reals: p7,
    Re: g7,
    rect: v7,
    reg: m7,
    REG: y7,
    ReverseElement: b7,
    ReverseEquilibrium: w7,
    ReverseUpEquilibrium: x7,
    rfisht: _7,
    rfloor: S7,
    rfr: k7,
    Rfr: C7,
    rHar: T7,
    rhard: E7,
    rharu: L7,
    rharul: A7,
    Rho: M7,
    rho: N7,
    rhov: P7,
    RightAngleBracket: O7,
    RightArrowBar: D7,
    rightarrow: $7,
    RightArrow: R7,
    Rightarrow: z7,
    RightArrowLeftArrow: F7,
    rightarrowtail: I7,
    RightCeiling: q7,
    RightDoubleBracket: H7,
    RightDownTeeVector: B7,
    RightDownVectorBar: W7,
    RightDownVector: U7,
    RightFloor: j7,
    rightharpoondown: G7,
    rightharpoonup: V7,
    rightleftarrows: K7,
    rightleftharpoons: X7,
    rightrightarrows: Y7,
    rightsquigarrow: Z7,
    RightTeeArrow: J7,
    RightTee: Q7,
    RightTeeVector: tK,
    rightthreetimes: eK,
    RightTriangleBar: nK,
    RightTriangle: rK,
    RightTriangleEqual: iK,
    RightUpDownVector: oK,
    RightUpTeeVector: sK,
    RightUpVectorBar: lK,
    RightUpVector: aK,
    RightVectorBar: cK,
    RightVector: uK,
    ring: fK,
    risingdotseq: hK,
    rlarr: dK,
    rlhar: pK,
    rlm: gK,
    rmoustache: vK,
    rmoust: mK,
    rnmid: yK,
    roang: bK,
    roarr: wK,
    robrk: xK,
    ropar: _K,
    ropf: SK,
    Ropf: kK,
    roplus: CK,
    rotimes: TK,
    RoundImplies: EK,
    rpar: LK,
    rpargt: AK,
    rppolint: MK,
    rrarr: NK,
    Rrightarrow: PK,
    rsaquo: OK,
    rscr: DK,
    Rscr: $K,
    rsh: RK,
    Rsh: zK,
    rsqb: FK,
    rsquo: IK,
    rsquor: qK,
    rthree: HK,
    rtimes: BK,
    rtri: WK,
    rtrie: UK,
    rtrif: jK,
    rtriltri: GK,
    RuleDelayed: VK,
    ruluhar: KK,
    rx: XK,
    Sacute: YK,
    sacute: ZK,
    sbquo: JK,
    scap: QK,
    Scaron: tX,
    scaron: eX,
    Sc: nX,
    sc: rX,
    sccue: iX,
    sce: oX,
    scE: sX,
    Scedil: lX,
    scedil: aX,
    Scirc: cX,
    scirc: uX,
    scnap: fX,
    scnE: hX,
    scnsim: dX,
    scpolint: pX,
    scsim: gX,
    Scy: vX,
    scy: mX,
    sdotb: yX,
    sdot: bX,
    sdote: wX,
    searhk: xX,
    searr: _X,
    seArr: SX,
    searrow: kX,
    sect: CX,
    semi: TX,
    seswar: EX,
    setminus: LX,
    setmn: AX,
    sext: MX,
    Sfr: NX,
    sfr: PX,
    sfrown: OX,
    sharp: DX,
    SHCHcy: $X,
    shchcy: RX,
    SHcy: zX,
    shcy: FX,
    ShortDownArrow: IX,
    ShortLeftArrow: qX,
    shortmid: HX,
    shortparallel: BX,
    ShortRightArrow: WX,
    ShortUpArrow: UX,
    shy: jX,
    Sigma: GX,
    sigma: VX,
    sigmaf: KX,
    sigmav: XX,
    sim: YX,
    simdot: ZX,
    sime: JX,
    simeq: QX,
    simg: tY,
    simgE: eY,
    siml: nY,
    simlE: rY,
    simne: iY,
    simplus: oY,
    simrarr: sY,
    slarr: lY,
    SmallCircle: aY,
    smallsetminus: cY,
    smashp: uY,
    smeparsl: fY,
    smid: hY,
    smile: dY,
    smt: pY,
    smte: gY,
    smtes: vY,
    SOFTcy: mY,
    softcy: yY,
    solbar: bY,
    solb: wY,
    sol: xY,
    Sopf: _Y,
    sopf: SY,
    spades: kY,
    spadesuit: CY,
    spar: TY,
    sqcap: EY,
    sqcaps: LY,
    sqcup: AY,
    sqcups: MY,
    Sqrt: NY,
    sqsub: PY,
    sqsube: OY,
    sqsubset: DY,
    sqsubseteq: $Y,
    sqsup: RY,
    sqsupe: zY,
    sqsupset: FY,
    sqsupseteq: IY,
    square: qY,
    Square: HY,
    SquareIntersection: BY,
    SquareSubset: WY,
    SquareSubsetEqual: UY,
    SquareSuperset: jY,
    SquareSupersetEqual: GY,
    SquareUnion: VY,
    squarf: KY,
    squ: XY,
    squf: YY,
    srarr: ZY,
    Sscr: JY,
    sscr: QY,
    ssetmn: tZ,
    ssmile: eZ,
    sstarf: nZ,
    Star: rZ,
    star: iZ,
    starf: oZ,
    straightepsilon: sZ,
    straightphi: lZ,
    strns: aZ,
    sub: cZ,
    Sub: uZ,
    subdot: fZ,
    subE: hZ,
    sube: dZ,
    subedot: pZ,
    submult: gZ,
    subnE: vZ,
    subne: mZ,
    subplus: yZ,
    subrarr: bZ,
    subset: wZ,
    Subset: xZ,
    subseteq: _Z,
    subseteqq: SZ,
    SubsetEqual: kZ,
    subsetneq: CZ,
    subsetneqq: TZ,
    subsim: EZ,
    subsub: LZ,
    subsup: AZ,
    succapprox: MZ,
    succ: NZ,
    succcurlyeq: PZ,
    Succeeds: OZ,
    SucceedsEqual: DZ,
    SucceedsSlantEqual: $Z,
    SucceedsTilde: RZ,
    succeq: zZ,
    succnapprox: FZ,
    succneqq: IZ,
    succnsim: qZ,
    succsim: HZ,
    SuchThat: BZ,
    sum: WZ,
    Sum: UZ,
    sung: jZ,
    sup1: GZ,
    sup2: VZ,
    sup3: KZ,
    sup: XZ,
    Sup: YZ,
    supdot: ZZ,
    supdsub: JZ,
    supE: QZ,
    supe: tJ,
    supedot: eJ,
    Superset: nJ,
    SupersetEqual: rJ,
    suphsol: iJ,
    suphsub: oJ,
    suplarr: sJ,
    supmult: lJ,
    supnE: aJ,
    supne: cJ,
    supplus: uJ,
    supset: fJ,
    Supset: hJ,
    supseteq: dJ,
    supseteqq: pJ,
    supsetneq: gJ,
    supsetneqq: vJ,
    supsim: mJ,
    supsub: yJ,
    supsup: bJ,
    swarhk: wJ,
    swarr: xJ,
    swArr: _J,
    swarrow: SJ,
    swnwar: kJ,
    szlig: CJ,
    Tab: TJ,
    target: EJ,
    Tau: LJ,
    tau: AJ,
    tbrk: MJ,
    Tcaron: NJ,
    tcaron: PJ,
    Tcedil: OJ,
    tcedil: DJ,
    Tcy: $J,
    tcy: RJ,
    tdot: zJ,
    telrec: FJ,
    Tfr: IJ,
    tfr: qJ,
    there4: HJ,
    therefore: BJ,
    Therefore: WJ,
    Theta: UJ,
    theta: jJ,
    thetasym: GJ,
    thetav: VJ,
    thickapprox: KJ,
    thicksim: XJ,
    ThickSpace: YJ,
    ThinSpace: ZJ,
    thinsp: JJ,
    thkap: QJ,
    thksim: tQ,
    THORN: eQ,
    thorn: nQ,
    tilde: rQ,
    Tilde: iQ,
    TildeEqual: oQ,
    TildeFullEqual: sQ,
    TildeTilde: lQ,
    timesbar: aQ,
    timesb: cQ,
    times: uQ,
    timesd: fQ,
    tint: hQ,
    toea: dQ,
    topbot: pQ,
    topcir: gQ,
    top: vQ,
    Topf: mQ,
    topf: yQ,
    topfork: bQ,
    tosa: wQ,
    tprime: xQ,
    trade: _Q,
    TRADE: SQ,
    triangle: kQ,
    triangledown: CQ,
    triangleleft: TQ,
    trianglelefteq: EQ,
    triangleq: LQ,
    triangleright: AQ,
    trianglerighteq: MQ,
    tridot: NQ,
    trie: PQ,
    triminus: OQ,
    TripleDot: DQ,
    triplus: $Q,
    trisb: RQ,
    tritime: zQ,
    trpezium: FQ,
    Tscr: IQ,
    tscr: qQ,
    TScy: HQ,
    tscy: BQ,
    TSHcy: WQ,
    tshcy: UQ,
    Tstrok: jQ,
    tstrok: GQ,
    twixt: VQ,
    twoheadleftarrow: KQ,
    twoheadrightarrow: XQ,
    Uacute: YQ,
    uacute: ZQ,
    uarr: JQ,
    Uarr: QQ,
    uArr: ttt,
    Uarrocir: ett,
    Ubrcy: ntt,
    ubrcy: rtt,
    Ubreve: itt,
    ubreve: ott,
    Ucirc: stt,
    ucirc: ltt,
    Ucy: att,
    ucy: ctt,
    udarr: utt,
    Udblac: ftt,
    udblac: htt,
    udhar: dtt,
    ufisht: ptt,
    Ufr: gtt,
    ufr: vtt,
    Ugrave: mtt,
    ugrave: ytt,
    uHar: btt,
    uharl: wtt,
    uharr: xtt,
    uhblk: _tt,
    ulcorn: Stt,
    ulcorner: ktt,
    ulcrop: Ctt,
    ultri: Ttt,
    Umacr: Ett,
    umacr: Ltt,
    uml: Att,
    UnderBar: Mtt,
    UnderBrace: Ntt,
    UnderBracket: Ptt,
    UnderParenthesis: Ott,
    Union: Dtt,
    UnionPlus: $tt,
    Uogon: Rtt,
    uogon: ztt,
    Uopf: Ftt,
    uopf: Itt,
    UpArrowBar: qtt,
    uparrow: Htt,
    UpArrow: Btt,
    Uparrow: Wtt,
    UpArrowDownArrow: Utt,
    updownarrow: jtt,
    UpDownArrow: Gtt,
    Updownarrow: Vtt,
    UpEquilibrium: Ktt,
    upharpoonleft: Xtt,
    upharpoonright: Ytt,
    uplus: Ztt,
    UpperLeftArrow: Jtt,
    UpperRightArrow: Qtt,
    upsi: tet,
    Upsi: eet,
    upsih: net,
    Upsilon: ret,
    upsilon: iet,
    UpTeeArrow: oet,
    UpTee: set,
    upuparrows: aet,
    urcorn: cet,
    urcorner: uet,
    urcrop: fet,
    Uring: het,
    uring: det,
    urtri: pet,
    Uscr: get,
    uscr: vet,
    utdot: met,
    Utilde: yet,
    utilde: bet,
    utri: wet,
    utrif: xet,
    uuarr: _et,
    Uuml: ket,
    uuml: Cet,
    uwangle: Tet,
    vangrt: Eet,
    varepsilon: Let,
    varkappa: Aet,
    varnothing: Met,
    varphi: Net,
    varpi: Pet,
    varpropto: Oet,
    varr: Det,
    vArr: $et,
    varrho: Ret,
    varsigma: zet,
    varsubsetneq: Fet,
    varsubsetneqq: Iet,
    varsupsetneq: qet,
    varsupsetneqq: Het,
    vartheta: Bet,
    vartriangleleft: Wet,
    vartriangleright: Uet,
    vBar: jet,
    Vbar: Get,
    vBarv: Vet,
    Vcy: Ket,
    vcy: Xet,
    vdash: Yet,
    vDash: Zet,
    Vdash: Jet,
    VDash: Qet,
    Vdashl: tnt,
    veebar: ent,
    vee: nnt,
    Vee: rnt,
    veeeq: int,
    vellip: ont,
    verbar: snt,
    Verbar: lnt,
    vert: ant,
    Vert: cnt,
    VerticalBar: unt,
    VerticalLine: fnt,
    VerticalSeparator: hnt,
    VerticalTilde: dnt,
    VeryThinSpace: pnt,
    Vfr: gnt,
    vfr: vnt,
    vltri: mnt,
    vnsub: ynt,
    vnsup: bnt,
    Vopf: wnt,
    vopf: xnt,
    vprop: _nt,
    vrtri: Snt,
    Vscr: knt,
    vscr: Cnt,
    vsubnE: Tnt,
    vsubne: Ent,
    vsupnE: Lnt,
    vsupne: Ant,
    Vvdash: Mnt,
    vzigzag: Nnt,
    Wcirc: Pnt,
    wcirc: Ont,
    wedbar: Dnt,
    wedge: $nt,
    Wedge: Rnt,
    wedgeq: znt,
    weierp: Fnt,
    Wfr: Int,
    wfr: qnt,
    Wopf: Hnt,
    wopf: Bnt,
    wp: Wnt,
    wr: Unt,
    wreath: jnt,
    Wscr: Gnt,
    wscr: Vnt,
    xcap: Knt,
    xcirc: Xnt,
    xcup: Ynt,
    xdtri: Znt,
    Xfr: Jnt,
    xfr: Qnt,
    xharr: trt,
    xhArr: ert,
    Xi: nrt,
    xi: rrt,
    xlarr: irt,
    xlArr: ort,
    xmap: srt,
    xnis: lrt,
    xodot: art,
    Xopf: crt,
    xopf: urt,
    xoplus: frt,
    xotime: hrt,
    xrarr: drt,
    xrArr: prt,
    Xscr: grt,
    xscr: vrt,
    xsqcup: mrt,
    xuplus: yrt,
    xutri: brt,
    xvee: wrt,
    xwedge: xrt,
    Yacute: _rt,
    yacute: Srt,
    YAcy: krt,
    yacy: Crt,
    Ycirc: Trt,
    ycirc: Ert,
    Ycy: Lrt,
    ycy: Art,
    yen: Mrt,
    Yfr: Nrt,
    yfr: Prt,
    YIcy: Ort,
    yicy: Drt,
    Yopf: $rt,
    yopf: Rrt,
    Yscr: zrt,
    yscr: Frt,
    YUcy: Irt,
    yucy: qrt,
    yuml: Hrt,
    Yuml: Brt,
    Zacute: Wrt,
    zacute: Urt,
    Zcaron: jrt,
    zcaron: Grt,
    Zcy: Vrt,
    zcy: Krt,
    Zdot: Xrt,
    zdot: Yrt,
    zeetrf: Zrt,
    ZeroWidthSpace: Jrt,
    Zeta: Qrt,
    zeta: tit,
    zfr: eit,
    Zfr: nit,
    ZHcy: rit,
    zhcy: iit,
    zigrarr: oit,
    zopf: sit,
    Zopf: lit,
    Zscr: ait,
    zscr: cit,
    zwj: uit,
    zwnj: fit,
  },
  hit = "Á",
  dit = "á",
  pit = "Â",
  git = "â",
  vit = "´",
  mit = "Æ",
  yit = "æ",
  bit = "À",
  wit = "à",
  xit = "&",
  _it = "&",
  Sit = "Å",
  kit = "å",
  Cit = "Ã",
  Tit = "ã",
  Eit = "Ä",
  Lit = "ä",
  Ait = "¦",
  Mit = "Ç",
  Nit = "ç",
  Pit = "¸",
  Oit = "¢",
  Dit = "©",
  $it = "©",
  Rit = "¤",
  zit = "°",
  Fit = "÷",
  Iit = "É",
  qit = "é",
  Hit = "Ê",
  Bit = "ê",
  Wit = "È",
  Uit = "è",
  jit = "Ð",
  Git = "ð",
  Vit = "Ë",
  Kit = "ë",
  Xit = "½",
  Yit = "¼",
  Zit = "¾",
  Jit = ">",
  Qit = ">",
  tot = "Í",
  eot = "í",
  not = "Î",
  rot = "î",
  iot = "¡",
  oot = "Ì",
  sot = "ì",
  lot = "¿",
  aot = "Ï",
  cot = "ï",
  uot = "«",
  fot = "<",
  hot = "<",
  dot = "¯",
  pot = "µ",
  got = "·",
  vot = " ",
  mot = "¬",
  yot = "Ñ",
  bot = "ñ",
  wot = "Ó",
  xot = "ó",
  _ot = "Ô",
  Sot = "ô",
  kot = "Ò",
  Cot = "ò",
  Tot = "ª",
  Eot = "º",
  Lot = "Ø",
  Aot = "ø",
  Mot = "Õ",
  Not = "õ",
  Pot = "Ö",
  Oot = "ö",
  Dot = "¶",
  $ot = "±",
  Rot = "£",
  zot = '"',
  Fot = '"',
  Iot = "»",
  qot = "®",
  Hot = "®",
  Bot = "§",
  Wot = "­",
  Uot = "¹",
  jot = "²",
  Got = "³",
  Vot = "ß",
  Kot = "Þ",
  Xot = "þ",
  Yot = "×",
  Zot = "Ú",
  Jot = "ú",
  Qot = "Û",
  tst = "û",
  est = "Ù",
  nst = "ù",
  rst = "¨",
  ist = "Ü",
  ost = "ü",
  sst = "Ý",
  lst = "ý",
  ast = "¥",
  cst = "ÿ",
  ust = {
    Aacute: hit,
    aacute: dit,
    Acirc: pit,
    acirc: git,
    acute: vit,
    AElig: mit,
    aelig: yit,
    Agrave: bit,
    agrave: wit,
    amp: xit,
    AMP: _it,
    Aring: Sit,
    aring: kit,
    Atilde: Cit,
    atilde: Tit,
    Auml: Eit,
    auml: Lit,
    brvbar: Ait,
    Ccedil: Mit,
    ccedil: Nit,
    cedil: Pit,
    cent: Oit,
    copy: Dit,
    COPY: $it,
    curren: Rit,
    deg: zit,
    divide: Fit,
    Eacute: Iit,
    eacute: qit,
    Ecirc: Hit,
    ecirc: Bit,
    Egrave: Wit,
    egrave: Uit,
    ETH: jit,
    eth: Git,
    Euml: Vit,
    euml: Kit,
    frac12: Xit,
    frac14: Yit,
    frac34: Zit,
    gt: Jit,
    GT: Qit,
    Iacute: tot,
    iacute: eot,
    Icirc: not,
    icirc: rot,
    iexcl: iot,
    Igrave: oot,
    igrave: sot,
    iquest: lot,
    Iuml: aot,
    iuml: cot,
    laquo: uot,
    lt: fot,
    LT: hot,
    macr: dot,
    micro: pot,
    middot: got,
    nbsp: vot,
    not: mot,
    Ntilde: yot,
    ntilde: bot,
    Oacute: wot,
    oacute: xot,
    Ocirc: _ot,
    ocirc: Sot,
    Ograve: kot,
    ograve: Cot,
    ordf: Tot,
    ordm: Eot,
    Oslash: Lot,
    oslash: Aot,
    Otilde: Mot,
    otilde: Not,
    Ouml: Pot,
    ouml: Oot,
    para: Dot,
    plusmn: $ot,
    pound: Rot,
    quot: zot,
    QUOT: Fot,
    raquo: Iot,
    reg: qot,
    REG: Hot,
    sect: Bot,
    shy: Wot,
    sup1: Uot,
    sup2: jot,
    sup3: Got,
    szlig: Vot,
    THORN: Kot,
    thorn: Xot,
    times: Yot,
    Uacute: Zot,
    uacute: Jot,
    Ucirc: Qot,
    ucirc: tst,
    Ugrave: est,
    ugrave: nst,
    uml: rst,
    Uuml: ist,
    uuml: ost,
    Yacute: sst,
    yacute: lst,
    yen: ast,
    yuml: cst,
  },
  fst = "&",
  hst = "'",
  dst = ">",
  pst = "<",
  gst = '"',
  my = { amp: fst, apos: hst, gt: dst, lt: pst, quot: gst }
var Fh = {}
const vst = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376,
}
var mst =
  (no && no.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t }
  }
Object.defineProperty(Fh, "__esModule", { value: !0 })
var xv = mst(vst),
  yst =
    String.fromCodePoint ||
    function (t) {
      var e = ""
      return (
        t > 65535 &&
          ((t -= 65536),
          (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)),
          (t = 56320 | (t & 1023))),
        (e += String.fromCharCode(t)),
        e
      )
    }
function bst(t) {
  return (t >= 55296 && t <= 57343) || t > 1114111
    ? "�"
    : (t in xv.default && (t = xv.default[t]), yst(t))
}
Fh.default = bst
var Rc =
  (no && no.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t }
  }
Object.defineProperty(qr, "__esModule", { value: !0 })
qr.decodeHTML = qr.decodeHTMLStrict = qr.decodeXML = void 0
var qf = Rc(vy),
  wst = Rc(ust),
  xst = Rc(my),
  _v = Rc(Fh),
  _st = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g
qr.decodeXML = yy(xst.default)
qr.decodeHTMLStrict = yy(qf.default)
function yy(t) {
  var e = by(t)
  return function (r) {
    return String(r).replace(_st, e)
  }
}
var Sv = function (t, e) {
  return t < e ? 1 : -1
}
qr.decodeHTML = (function () {
  for (
    var t = Object.keys(wst.default).sort(Sv),
      e = Object.keys(qf.default).sort(Sv),
      r = 0,
      o = 0;
    r < e.length;
    r++
  )
    t[o] === e[r] ? ((e[r] += ";?"), o++) : (e[r] += ";")
  var a = new RegExp(
      "&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)",
      "g",
    ),
    u = by(qf.default)
  function f(h) {
    return h.substr(-1) !== ";" && (h += ";"), u(h)
  }
  return function (h) {
    return String(h).replace(a, f)
  }
})()
function by(t) {
  return function (r) {
    if (r.charAt(1) === "#") {
      var o = r.charAt(2)
      return o === "X" || o === "x"
        ? _v.default(parseInt(r.substr(3), 16))
        : _v.default(parseInt(r.substr(2), 10))
    }
    return t[r.slice(1, -1)] || r
  }
}
var Rn = {},
  wy =
    (no && no.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t }
    }
Object.defineProperty(Rn, "__esModule", { value: !0 })
Rn.escapeUTF8 =
  Rn.escape =
  Rn.encodeNonAsciiHTML =
  Rn.encodeHTML =
  Rn.encodeXML =
    void 0
var Sst = wy(my),
  xy = Sy(Sst.default),
  _y = ky(xy)
Rn.encodeXML = Ey(xy)
var kst = wy(vy),
  Ih = Sy(kst.default),
  Cst = ky(Ih)
Rn.encodeHTML = Est(Ih, Cst)
Rn.encodeNonAsciiHTML = Ey(Ih)
function Sy(t) {
  return Object.keys(t)
    .sort()
    .reduce(function (e, r) {
      return (e[t[r]] = "&" + r + ";"), e
    }, {})
}
function ky(t) {
  for (var e = [], r = [], o = 0, a = Object.keys(t); o < a.length; o++) {
    var u = a[o]
    u.length === 1 ? e.push("\\" + u) : r.push(u)
  }
  e.sort()
  for (var f = 0; f < e.length - 1; f++) {
    for (
      var h = f;
      h < e.length - 1 && e[h].charCodeAt(1) + 1 === e[h + 1].charCodeAt(1);

    )
      h += 1
    var p = 1 + h - f
    p < 3 || e.splice(f, p, e[f] + "-" + e[h])
  }
  return r.unshift("[" + e.join("") + "]"), new RegExp(r.join("|"), "g")
}
var Cy =
    /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  Tst =
    String.prototype.codePointAt != null
      ? function (t) {
          return t.codePointAt(0)
        }
      : function (t) {
          return (
            (t.charCodeAt(0) - 55296) * 1024 + t.charCodeAt(1) - 56320 + 65536
          )
        }
function zc(t) {
  return (
    "&#x" +
    (t.length > 1 ? Tst(t) : t.charCodeAt(0)).toString(16).toUpperCase() +
    ";"
  )
}
function Est(t, e) {
  return function (r) {
    return r
      .replace(e, function (o) {
        return t[o]
      })
      .replace(Cy, zc)
  }
}
var Ty = new RegExp(_y.source + "|" + Cy.source, "g")
function Lst(t) {
  return t.replace(Ty, zc)
}
Rn.escape = Lst
function Ast(t) {
  return t.replace(_y, zc)
}
Rn.escapeUTF8 = Ast
function Ey(t) {
  return function (e) {
    return e.replace(Ty, function (r) {
      return t[r] || zc(r)
    })
  }
}
;(function (t) {
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.decodeXMLStrict =
      t.decodeHTML5Strict =
      t.decodeHTML4Strict =
      t.decodeHTML5 =
      t.decodeHTML4 =
      t.decodeHTMLStrict =
      t.decodeHTML =
      t.decodeXML =
      t.encodeHTML5 =
      t.encodeHTML4 =
      t.escapeUTF8 =
      t.escape =
      t.encodeNonAsciiHTML =
      t.encodeHTML =
      t.encodeXML =
      t.encode =
      t.decodeStrict =
      t.decode =
        void 0)
  var e = qr,
    r = Rn
  function o(p, g) {
    return (!g || g <= 0 ? e.decodeXML : e.decodeHTML)(p)
  }
  t.decode = o
  function a(p, g) {
    return (!g || g <= 0 ? e.decodeXML : e.decodeHTMLStrict)(p)
  }
  t.decodeStrict = a
  function u(p, g) {
    return (!g || g <= 0 ? r.encodeXML : r.encodeHTML)(p)
  }
  t.encode = u
  var f = Rn
  Object.defineProperty(t, "encodeXML", {
    enumerable: !0,
    get: function () {
      return f.encodeXML
    },
  }),
    Object.defineProperty(t, "encodeHTML", {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    }),
    Object.defineProperty(t, "encodeNonAsciiHTML", {
      enumerable: !0,
      get: function () {
        return f.encodeNonAsciiHTML
      },
    }),
    Object.defineProperty(t, "escape", {
      enumerable: !0,
      get: function () {
        return f.escape
      },
    }),
    Object.defineProperty(t, "escapeUTF8", {
      enumerable: !0,
      get: function () {
        return f.escapeUTF8
      },
    }),
    Object.defineProperty(t, "encodeHTML4", {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    }),
    Object.defineProperty(t, "encodeHTML5", {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    })
  var h = qr
  Object.defineProperty(t, "decodeXML", {
    enumerable: !0,
    get: function () {
      return h.decodeXML
    },
  }),
    Object.defineProperty(t, "decodeHTML", {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, "decodeHTMLStrict", {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, "decodeHTML4", {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, "decodeHTML5", {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, "decodeHTML4Strict", {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, "decodeHTML5Strict", {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, "decodeXMLStrict", {
      enumerable: !0,
      get: function () {
        return h.decodeXML
      },
    })
})(gy)
function Mst(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function")
}
function kv(t, e) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(t, o.key, o)
  }
}
function Nst(t, e, r) {
  return e && kv(t.prototype, e), r && kv(t, r), t
}
function Ly(t, e) {
  var r = (typeof Symbol < "u" && t[Symbol.iterator]) || t["@@iterator"]
  if (!r) {
    if (
      Array.isArray(t) ||
      (r = Pst(t)) ||
      (e && t && typeof t.length == "number")
    ) {
      r && (t = r)
      var o = 0,
        a = function () {}
      return {
        s: a,
        n: function () {
          return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] }
        },
        e: function (g) {
          throw g
        },
        f: a,
      }
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
  }
  var u = !0,
    f = !1,
    h
  return {
    s: function () {
      r = r.call(t)
    },
    n: function () {
      var g = r.next()
      return (u = g.done), g
    },
    e: function (g) {
      ;(f = !0), (h = g)
    },
    f: function () {
      try {
        !u && r.return != null && r.return()
      } finally {
        if (f) throw h
      }
    },
  }
}
function Pst(t, e) {
  if (t) {
    if (typeof t == "string") return Cv(t, e)
    var r = Object.prototype.toString.call(t).slice(8, -1)
    if (
      (r === "Object" && t.constructor && (r = t.constructor.name),
      r === "Map" || r === "Set")
    )
      return Array.from(t)
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Cv(t, e)
  }
}
function Cv(t, e) {
  ;(e == null || e > t.length) && (e = t.length)
  for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r]
  return o
}
var Ost = gy,
  Tv = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: Dst(),
  }
function Dst() {
  var t = {
    0: "#000",
    1: "#A00",
    2: "#0A0",
    3: "#A50",
    4: "#00A",
    5: "#A0A",
    6: "#0AA",
    7: "#AAA",
    8: "#555",
    9: "#F55",
    10: "#5F5",
    11: "#FF5",
    12: "#55F",
    13: "#F5F",
    14: "#5FF",
    15: "#FFF",
  }
  return (
    Ca(0, 5).forEach(function (e) {
      Ca(0, 5).forEach(function (r) {
        Ca(0, 5).forEach(function (o) {
          return $st(e, r, o, t)
        })
      })
    }),
    Ca(0, 23).forEach(function (e) {
      var r = e + 232,
        o = Ay(e * 10 + 8)
      t[r] = "#" + o + o + o
    }),
    t
  )
}
function $st(t, e, r, o) {
  var a = 16 + t * 36 + e * 6 + r,
    u = t > 0 ? t * 40 + 55 : 0,
    f = e > 0 ? e * 40 + 55 : 0,
    h = r > 0 ? r * 40 + 55 : 0
  o[a] = Rst([u, f, h])
}
function Ay(t) {
  for (var e = t.toString(16); e.length < 2; ) e = "0" + e
  return e
}
function Rst(t) {
  var e = [],
    r = Ly(t),
    o
  try {
    for (r.s(); !(o = r.n()).done; ) {
      var a = o.value
      e.push(Ay(a))
    }
  } catch (u) {
    r.e(u)
  } finally {
    r.f()
  }
  return "#" + e.join("")
}
function Ev(t, e, r, o) {
  var a
  return (
    e === "text"
      ? (a = qst(r, o))
      : e === "display"
        ? (a = Fst(t, r, o))
        : e === "xterm256Foreground"
          ? (a = Fa(t, o.colors[r]))
          : e === "xterm256Background"
            ? (a = Ia(t, o.colors[r]))
            : e === "rgb" && (a = zst(t, r)),
    a
  )
}
function zst(t, e) {
  e = e.substring(2).slice(0, -1)
  var r = +e.substr(0, 2),
    o = e.substring(5).split(";"),
    a = o
      .map(function (u) {
        return ("0" + Number(u).toString(16)).substr(-2)
      })
      .join("")
  return za(t, (r === 38 ? "color:#" : "background-color:#") + a)
}
function Fst(t, e, r) {
  e = parseInt(e, 10)
  var o = {
      "-1": function () {
        return "<br/>"
      },
      "0": function () {
        return t.length && My(t)
      },
      "1": function () {
        return yi(t, "b")
      },
      "3": function () {
        return yi(t, "i")
      },
      "4": function () {
        return yi(t, "u")
      },
      "8": function () {
        return za(t, "display:none")
      },
      "9": function () {
        return yi(t, "strike")
      },
      "22": function () {
        return za(
          t,
          "font-weight:normal;text-decoration:none;font-style:normal",
        )
      },
      "23": function () {
        return Av(t, "i")
      },
      "24": function () {
        return Av(t, "u")
      },
      "39": function () {
        return Fa(t, r.fg)
      },
      "49": function () {
        return Ia(t, r.bg)
      },
      "53": function () {
        return za(t, "text-decoration:overline")
      },
    },
    a
  return (
    o[e]
      ? (a = o[e]())
      : 4 < e && e < 7
        ? (a = yi(t, "blink"))
        : 29 < e && e < 38
          ? (a = Fa(t, r.colors[e - 30]))
          : 39 < e && e < 48
            ? (a = Ia(t, r.colors[e - 40]))
            : 89 < e && e < 98
              ? (a = Fa(t, r.colors[8 + (e - 90)]))
              : 99 < e && e < 108 && (a = Ia(t, r.colors[8 + (e - 100)])),
    a
  )
}
function My(t) {
  var e = t.slice(0)
  return (
    (t.length = 0),
    e
      .reverse()
      .map(function (r) {
        return "</" + r + ">"
      })
      .join("")
  )
}
function Ca(t, e) {
  for (var r = [], o = t; o <= e; o++) r.push(o)
  return r
}
function Ist(t) {
  return function (e) {
    return (t === null || e.category !== t) && t !== "all"
  }
}
function Lv(t) {
  t = parseInt(t, 10)
  var e = null
  return (
    t === 0
      ? (e = "all")
      : t === 1
        ? (e = "bold")
        : 2 < t && t < 5
          ? (e = "underline")
          : 4 < t && t < 7
            ? (e = "blink")
            : t === 8
              ? (e = "hide")
              : t === 9
                ? (e = "strike")
                : (29 < t && t < 38) || t === 39 || (89 < t && t < 98)
                  ? (e = "foreground-color")
                  : ((39 < t && t < 48) || t === 49 || (99 < t && t < 108)) &&
                    (e = "background-color"),
    e
  )
}
function qst(t, e) {
  return e.escapeXML ? Ost.encodeXML(t) : t
}
function yi(t, e, r) {
  return (
    r || (r = ""),
    t.push(e),
    "<".concat(e).concat(r ? ' style="'.concat(r, '"') : "", ">")
  )
}
function za(t, e) {
  return yi(t, "span", e)
}
function Fa(t, e) {
  return yi(t, "span", "color:" + e)
}
function Ia(t, e) {
  return yi(t, "span", "background-color:" + e)
}
function Av(t, e) {
  var r
  if ((t.slice(-1)[0] === e && (r = t.pop()), r)) return "</" + e + ">"
}
function Hst(t, e, r) {
  var o = !1,
    a = 3
  function u() {
    return ""
  }
  function f(W, X) {
    return r("xterm256Foreground", X), ""
  }
  function h(W, X) {
    return r("xterm256Background", X), ""
  }
  function p(W) {
    return e.newline ? r("display", -1) : r("text", W), ""
  }
  function g(W, X) {
    ;(o = !0),
      X.trim().length === 0 && (X = "0"),
      (X = X.trimRight(";").split(";"))
    var ft = Ly(X),
      Y
    try {
      for (ft.s(); !(Y = ft.n()).done; ) {
        var et = Y.value
        r("display", et)
      }
    } catch (st) {
      ft.e(st)
    } finally {
      ft.f()
    }
    return ""
  }
  function v(W) {
    return r("text", W), ""
  }
  function b(W) {
    return r("rgb", W), ""
  }
  var w = [
    { pattern: /^\x08+/, sub: u },
    { pattern: /^\x1b\[[012]?K/, sub: u },
    { pattern: /^\x1b\[\(B/, sub: u },
    { pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: b },
    { pattern: /^\x1b\[38;5;(\d+)m/, sub: f },
    { pattern: /^\x1b\[48;5;(\d+)m/, sub: h },
    { pattern: /^\n/, sub: p },
    { pattern: /^\r+\n/, sub: p },
    { pattern: /^\r/, sub: p },
    { pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: g },
    { pattern: /^\x1b\[\d?J/, sub: u },
    { pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: u },
    { pattern: /^\x1b\[?[\d;]{0,3}/, sub: u },
    { pattern: /^(([^\x1b\x08\r\n])+)/, sub: v },
  ]
  function S(W, X) {
    ;(X > a && o) || ((o = !1), (t = t.replace(W.pattern, W.sub)))
  }
  var N = [],
    L = t,
    A = L.length
  t: for (; A > 0; ) {
    for (var T = 0, M = 0, R = w.length; M < R; T = ++M) {
      var E = w[T]
      if ((S(E, T), t.length !== A)) {
        A = t.length
        continue t
      }
    }
    if (t.length === A) break
    N.push(0), (A = t.length)
  }
  return N
}
function Bst(t, e, r) {
  return (
    e !== "text" &&
      ((t = t.filter(Ist(Lv(r)))),
      t.push({ token: e, data: r, category: Lv(r) })),
    t
  )
}
var Wst = (function () {
    function t(e) {
      Mst(this, t),
        (e = e || {}),
        e.colors && (e.colors = Object.assign({}, Tv.colors, e.colors)),
        (this.options = Object.assign({}, Tv, e)),
        (this.stack = []),
        (this.stickyStack = [])
    }
    return (
      Nst(t, [
        {
          key: "toHtml",
          value: function (r) {
            var o = this
            r = typeof r == "string" ? [r] : r
            var a = this.stack,
              u = this.options,
              f = []
            return (
              this.stickyStack.forEach(function (h) {
                var p = Ev(a, h.token, h.data, u)
                p && f.push(p)
              }),
              Hst(r.join(""), u, function (h, p) {
                var g = Ev(a, h, p, u)
                g && f.push(g),
                  u.stream && (o.stickyStack = Bst(o.stickyStack, h, p))
              }),
              a.length && f.push(My(a)),
              f.join("")
            )
          },
        },
      ]),
      t
    )
  })(),
  Ust = Wst
const jst = X0(Ust)
function Gst(t, e) {
  return e && t.endsWith(e)
}
async function Ny(t, e, r) {
  const o = encodeURI(`${t}:${e}:${r}`)
  await fetch(`/__open-in-editor?file=${o}`)
}
function qh(t) {
  return new jst({ fg: t ? "#FFF" : "#000", bg: t ? "#000" : "#FFF" })
}
const Nl = vT(),
  Vst = nT(Nl),
  Kst = { class: "scrolls scrolls-rounded task-error" },
  Xst = ["onClickPassive"],
  Yst = ["innerHTML"],
  Zst = re({
    __name: "ViewReportError",
    props: { root: {}, filename: {}, error: {} },
    setup(t) {
      const e = t
      function r(f) {
        return f.startsWith(e.root) ? f.slice(e.root.length) : f
      }
      const o = xt(() => qh(Nl.value)),
        a = xt(() => {
          var f
          return !!((f = e.error) != null && f.diff)
        }),
        u = xt(() => (e.error.diff ? o.value.toHtml(e.error.diff) : void 0))
      return (f, h) => {
        const p = lo("tooltip")
        return (
          lt(),
          Tt("div", Kst, [
            ut("pre", null, [
              ut("b", null, ee(f.error.name || f.error.nameStr), 1),
              dn(": " + ee(f.error.message), 1),
            ]),
            (lt(!0),
            Tt(
              fe,
              null,
              Qn(
                f.error.stacks,
                (g, v) => (
                  lt(),
                  Tt(
                    "div",
                    {
                      "key": v,
                      "class": "op80 flex gap-x-2 items-center",
                      "data-testid": "stack",
                    },
                    [
                      ut(
                        "pre",
                        null,
                        " - " +
                          ee(r(g.file)) +
                          ":" +
                          ee(g.line) +
                          ":" +
                          ee(g.column),
                        1,
                      ),
                      G(Gst)(g.file, f.filename)
                        ? rn(
                            (lt(),
                            Tt(
                              "div",
                              {
                                "key": 0,
                                "class":
                                  "i-carbon-launch c-red-600 dark:c-red-400 hover:cursor-pointer min-w-1em min-h-1em",
                                "tabindex": "0",
                                "aria-label": "Open in Editor",
                                "onClickPassive": (b) =>
                                  G(Ny)(g.file, g.line, g.column),
                              },
                              null,
                              40,
                              Xst,
                            )),
                            [[p, "Open in Editor", void 0, { bottom: !0 }]],
                          )
                        : Qt("", !0),
                    ],
                  )
                ),
              ),
              128,
            )),
            G(a)
              ? (lt(),
                Tt(
                  "pre",
                  { "key": 0, "data-testid": "diff", "innerHTML": G(u) },
                  null,
                  8,
                  Yst,
                ))
              : Qt("", !0),
          ])
        )
      }
    },
  }),
  Jst = ao(Zst, [["__scopeId", "data-v-93ed29fc"]]),
  Qst = { "h-full": "", "class": "scrolls" },
  tlt = { key: 0, class: "scrolls scrolls-rounded task-error" },
  elt = ["innerHTML"],
  nlt = {
    "key": 1,
    "bg": "green-500/10",
    "text": "green-500 sm",
    "p": "x4 y2",
    "m-2": "",
    "rounded": "",
  },
  rlt = re({
    __name: "ViewReport",
    props: { file: {} },
    setup(t) {
      const e = t
      function r(h, p) {
        var g
        return ((g = h.result) == null ? void 0 : g.state) !== "fail"
          ? []
          : h.type === "test" || h.type === "custom"
            ? [{ ...h, level: p }]
            : [{ ...h, level: p }, ...h.tasks.flatMap((v) => r(v, p + 1))]
      }
      function o(h) {
        return h
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      }
      function a(h, p) {
        var b, w, S
        let g = ""
        ;(b = p.message) != null &&
          b.includes("\x1B") &&
          (g = `<b>${p.nameStr || p.name}</b>: ${h.toHtml(o(p.message))}`)
        const v = (w = p.stackStr) == null ? void 0 : w.includes("\x1B")
        return (
          (v || ((S = p.stack) != null && S.includes("\x1B"))) &&
            (g.length > 0
              ? (g += h.toHtml(o(v ? p.stackStr : p.stack)))
              : (g = `<b>${p.nameStr || p.name}</b>: ${p.message}${h.toHtml(o(v ? p.stackStr : p.stack))}`)),
          g.length > 0 ? g : null
        )
      }
      function u(h, p) {
        const g = qh(h)
        return p.map((v) => {
          var S
          const b = v.result
          if (!b) return v
          const w =
            (S = b.errors) == null
              ? void 0
              : S.map((N) => a(g, N))
                  .filter((N) => N != null)
                  .join("<br><br>")
          return w != null && w.length && (b.htmlError = w), v
        })
      }
      const f = xt(() => {
        var b, w
        const h = e.file,
          p =
            ((b = h == null ? void 0 : h.tasks) == null
              ? void 0
              : b.flatMap((S) => r(S, 0))) ?? [],
          g = h == null ? void 0 : h.result
        if ((w = g == null ? void 0 : g.errors) == null ? void 0 : w[0]) {
          const S = {
            id: h.id,
            name: h.name,
            level: 0,
            type: "suite",
            mode: "run",
            meta: {},
            tasks: [],
            result: g,
          }
          p.unshift(S)
        }
        return p.length > 0 ? u(Nl.value, p) : p
      })
      return (h, p) => (
        lt(),
        Tt("div", Qst, [
          G(f).length
            ? (lt(!0),
              Tt(
                fe,
                { key: 0 },
                Qn(G(f), (g) => {
                  var v, b, w
                  return (
                    lt(),
                    Tt("div", { key: g.id }, [
                      ut(
                        "div",
                        {
                          "bg": "red-500/10",
                          "text": "red-500 sm",
                          "p": "x3 y2",
                          "m-2": "",
                          "rounded": "",
                          "style": Ln({
                            "margin-left": `${(v = g.result) != null && v.htmlError ? 0.5 : 2 * g.level + 0.5}rem`,
                          }),
                        },
                        [
                          dn(ee(g.name) + " ", 1),
                          (b = g.result) != null && b.htmlError
                            ? (lt(),
                              Tt("div", tlt, [
                                ut(
                                  "pre",
                                  { innerHTML: g.result.htmlError },
                                  null,
                                  8,
                                  elt,
                                ),
                              ]))
                            : (w = g.result) != null && w.errors
                              ? (lt(!0),
                                Tt(
                                  fe,
                                  { key: 1 },
                                  Qn(g.result.errors, (S, N) => {
                                    var L
                                    return (
                                      lt(),
                                      Jt(
                                        Jst,
                                        {
                                          key: N,
                                          error: S,
                                          filename:
                                            (L = h.file) == null
                                              ? void 0
                                              : L.name,
                                          root: G(Ml).root,
                                        },
                                        null,
                                        8,
                                        ["error", "filename", "root"],
                                      )
                                    )
                                  }),
                                  128,
                                ))
                              : Qt("", !0),
                        ],
                        4,
                      ),
                    ])
                  )
                }),
                128,
              ))
            : (lt(), Tt("div", nlt, " All tests passed in this file ")),
        ])
      )
    },
  }),
  ilt = ao(rlt, [["__scopeId", "data-v-37cd141f"]]),
  olt = { "border": "b base", "p-4": "" },
  slt = ["innerHTML"],
  llt = ["textContent"],
  alt = re({
    __name: "ViewConsoleOutputEntry",
    props: {
      taskName: {},
      type: {},
      time: {},
      content: {},
      html: { type: Boolean },
    },
    setup(t) {
      function e(r) {
        return new Date(r).toLocaleTimeString()
      }
      return (r, o) => (
        lt(),
        Tt("div", olt, [
          ut(
            "div",
            {
              "text-xs": "",
              "mb-1": "",
              "class": ve(
                r.type === "stderr" ? "text-red-600 dark:text-red-300" : "op30",
              ),
            },
            ee(e(r.time)) + " | " + ee(r.taskName) + " | " + ee(r.type),
            3,
          ),
          r.html
            ? (lt(),
              Tt(
                "pre",
                { "key": 0, "data-type": "html", "innerHTML": r.content },
                null,
                8,
                slt,
              ))
            : (lt(),
              Tt(
                "pre",
                { "key": 1, "data-type": "text", "textContent": ee(r.content) },
                null,
                8,
                llt,
              )),
        ])
      )
    },
  }),
  oc = xt(() =>
    mn.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === "fail"
    }),
  ),
  sc = xt(() =>
    mn.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === "pass"
    }),
  ),
  Hh = xt(() => mn.value.filter((t) => t.mode === "skip" || t.mode === "todo"))
xt(() =>
  mn.value.filter(
    (t) =>
      !oc.value.includes(t) && !sc.value.includes(t) && !Hh.value.includes(t),
  ),
)
xt(() => Hh.value.filter((t) => t.mode === "skip"))
const Mv = xt(() => mn.value.filter($c))
xt(() => Hh.value.filter((t) => t.mode === "todo"))
const clt = xt(() => ml.value === "idle"),
  Fc = xt(() => $y(mn.value)),
  Py = xt(() =>
    Fc.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === "fail"
    }),
  ),
  Oy = xt(() =>
    Fc.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === "pass"
    }),
  ),
  Dy = xt(() => Fc.value.filter((t) => t.mode === "skip" || t.mode === "todo")),
  ult = xt(() => Dy.value.filter((t) => t.mode === "skip")),
  flt = xt(() => Dy.value.filter((t) => t.mode === "todo"))
xt(() => Py.value.length + Oy.value.length)
const hlt = xt(() => {
  const t = mn.value.reduce((e, r) => {
    var o
    return (
      (e += Math.max(0, r.collectDuration || 0)),
      (e += Math.max(0, r.setupDuration || 0)),
      (e += Math.max(0, ((o = r.result) == null ? void 0 : o.duration) || 0)),
      e
    )
  }, 0)
  return t > 1e3 ? `${(t / 1e3).toFixed(2)}s` : `${Math.round(t)}ms`
})
function dlt(t) {
  return (t = t || []), Array.isArray(t) ? t : [t]
}
function Nv(t) {
  return t.type === "test" || t.type === "custom"
}
function $y(t) {
  const e = [],
    r = dlt(t)
  for (const o of r)
    if (Nv(o)) e.push(o)
    else for (const a of o.tasks) Nv(a) ? e.push(a) : e.push(...$y(a))
  return e
}
const plt = {
    "key": 0,
    "h-full": "",
    "class": "scrolls",
    "flex": "",
    "flex-col": "",
    "data-testid": "logs",
  },
  glt = { key: 1, p6: "" },
  vlt = ut("pre", { inline: "" }, "console.log(foo)", -1),
  mlt = re({
    __name: "ViewConsoleOutput",
    setup(t) {
      const e = xt(() => {
        const o = dy.value
        if (o) {
          const a = qh(Nl.value)
          return o.map(({ taskId: u, type: f, time: h, content: p }) => {
            const g = p.trim(),
              v = a.toHtml(g)
            return v !== g
              ? { taskId: u, type: f, time: h, html: !0, content: v }
              : { taskId: u, type: f, time: h, html: !1, content: p }
          })
        }
      })
      function r(o) {
        const a = o && Ge.state.idMap.get(o)
        return (a ? WC(a).slice(1).join(" > ") : "-") || "-"
      }
      return (o, a) => {
        var f
        const u = alt
        return (f = G(e)) != null && f.length
          ? (lt(),
            Tt("div", plt, [
              (lt(!0),
              Tt(
                fe,
                null,
                Qn(
                  G(e),
                  ({ taskId: h, type: p, time: g, html: v, content: b }) => (
                    lt(),
                    Tt("div", { "key": h, "font-mono": "" }, [
                      Ft(
                        u,
                        {
                          "task-name": r(h),
                          "type": p,
                          "time": g,
                          "content": b,
                          "html": v,
                        },
                        null,
                        8,
                        ["task-name", "type", "time", "content", "html"],
                      ),
                    ])
                  ),
                ),
                128,
              )),
            ]))
          : (lt(),
            Tt("p", glt, [
              dn(" Log something in your test and it would print here. (e.g. "),
              vlt,
              dn(") "),
            ]))
      }
    },
  })
var tf = { exports: {} },
  Pv
function fs() {
  return (
    Pv ||
      ((Pv = 1),
      (function (t, e) {
        ;(function (r, o) {
          t.exports = o()
        })(no, function () {
          var r = navigator.userAgent,
            o = navigator.platform,
            a = /gecko\/\d/i.test(r),
            u = /MSIE \d/.test(r),
            f = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(r),
            h = /Edge\/(\d+)/.exec(r),
            p = u || f || h,
            g = p && (u ? document.documentMode || 6 : +(h || f)[1]),
            v = !h && /WebKit\//.test(r),
            b = v && /Qt\/\d+\.\d+/.test(r),
            w = !h && /Chrome\/(\d+)/.exec(r),
            S = w && +w[1],
            N = /Opera\//.test(r),
            L = /Apple Computer/.test(navigator.vendor),
            A = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(r),
            T = /PhantomJS/.test(r),
            M = L && (/Mobile\/\w+/.test(r) || navigator.maxTouchPoints > 2),
            R = /Android/.test(r),
            E =
              M ||
              R ||
              /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(r),
            W = M || /Mac/.test(o),
            X = /\bCrOS\b/.test(r),
            ft = /win/i.test(o),
            Y = N && r.match(/Version\/(\d*\.\d*)/)
          Y && (Y = Number(Y[1])), Y && Y >= 15 && ((N = !1), (v = !0))
          var et = W && (b || (N && (Y == null || Y < 12.11))),
            st = a || (p && g >= 9)
          function dt(n) {
            return new RegExp("(^|\\s)" + n + "(?:$|\\s)\\s*")
          }
          var pt = function (n, i) {
            var l = n.className,
              s = dt(i).exec(l)
            if (s) {
              var c = l.slice(s.index + s[0].length)
              n.className = l.slice(0, s.index) + (c ? s[1] + c : "")
            }
          }
          function V(n) {
            for (var i = n.childNodes.length; i > 0; --i)
              n.removeChild(n.firstChild)
            return n
          }
          function z(n, i) {
            return V(n).appendChild(i)
          }
          function k(n, i, l, s) {
            var c = document.createElement(n)
            if (
              (l && (c.className = l),
              s && (c.style.cssText = s),
              typeof i == "string")
            )
              c.appendChild(document.createTextNode(i))
            else if (i) for (var d = 0; d < i.length; ++d) c.appendChild(i[d])
            return c
          }
          function q(n, i, l, s) {
            var c = k(n, i, l, s)
            return c.setAttribute("role", "presentation"), c
          }
          var B
          document.createRange
            ? (B = function (n, i, l, s) {
                var c = document.createRange()
                return c.setEnd(s || n, l), c.setStart(n, i), c
              })
            : (B = function (n, i, l) {
                var s = document.body.createTextRange()
                try {
                  s.moveToElementText(n.parentNode)
                } catch {
                  return s
                }
                return (
                  s.collapse(!0),
                  s.moveEnd("character", l),
                  s.moveStart("character", i),
                  s
                )
              })
          function Q(n, i) {
            if ((i.nodeType == 3 && (i = i.parentNode), n.contains))
              return n.contains(i)
            do if ((i.nodeType == 11 && (i = i.host), i == n)) return !0
            while ((i = i.parentNode))
          }
          function mt(n) {
            var i
            try {
              i = n.activeElement
            } catch {
              i = n.body || null
            }
            for (; i && i.shadowRoot && i.shadowRoot.activeElement; )
              i = i.shadowRoot.activeElement
            return i
          }
          function Et(n, i) {
            var l = n.className
            dt(i).test(l) || (n.className += (l ? " " : "") + i)
          }
          function It(n, i) {
            for (var l = n.split(" "), s = 0; s < l.length; s++)
              l[s] && !dt(l[s]).test(i) && (i += " " + l[s])
            return i
          }
          var Bt = function (n) {
            n.select()
          }
          M
            ? (Bt = function (n) {
                ;(n.selectionStart = 0), (n.selectionEnd = n.value.length)
              })
            : p &&
              (Bt = function (n) {
                try {
                  n.select()
                } catch {}
              })
          function Ut(n) {
            return n.display.wrapper.ownerDocument
          }
          function Xt(n) {
            return Ut(n).defaultView
          }
          function Kt(n) {
            var i = Array.prototype.slice.call(arguments, 1)
            return function () {
              return n.apply(null, i)
            }
          }
          function St(n, i, l) {
            i || (i = {})
            for (var s in n)
              n.hasOwnProperty(s) &&
                (l !== !1 || !i.hasOwnProperty(s)) &&
                (i[s] = n[s])
            return i
          }
          function j(n, i, l, s, c) {
            i == null &&
              ((i = n.search(/[^\s\u00a0]/)), i == -1 && (i = n.length))
            for (var d = s || 0, m = c || 0; ; ) {
              var y = n.indexOf("	", d)
              if (y < 0 || y >= i) return m + (i - d)
              ;(m += y - d), (m += l - (m % l)), (d = y + 1)
            }
          }
          var nt = function () {
            ;(this.id = null),
              (this.f = null),
              (this.time = 0),
              (this.handler = Kt(this.onTimeout, this))
          }
          ;(nt.prototype.onTimeout = function (n) {
            ;(n.id = 0),
              n.time <= +new Date()
                ? n.f()
                : setTimeout(n.handler, n.time - +new Date())
          }),
            (nt.prototype.set = function (n, i) {
              this.f = i
              var l = +new Date() + n
              ;(!this.id || l < this.time) &&
                (clearTimeout(this.id),
                (this.id = setTimeout(this.handler, n)),
                (this.time = l))
            })
          function rt(n, i) {
            for (var l = 0; l < n.length; ++l) if (n[l] == i) return l
            return -1
          }
          var Nt = 50,
            Mt = {
              toString: function () {
                return "CodeMirror.Pass"
              },
            },
            O = { scroll: !1 },
            I = { origin: "*mouse" },
            K = { origin: "+move" }
          function tt(n, i, l) {
            for (var s = 0, c = 0; ; ) {
              var d = n.indexOf("	", s)
              d == -1 && (d = n.length)
              var m = d - s
              if (d == n.length || c + m >= i) return s + Math.min(m, i - c)
              if (((c += d - s), (c += l - (c % l)), (s = d + 1), c >= i))
                return s
            }
          }
          var ot = [""]
          function at(n) {
            for (; ot.length <= n; ) ot.push(ct(ot) + " ")
            return ot[n]
          }
          function ct(n) {
            return n[n.length - 1]
          }
          function vt(n, i) {
            for (var l = [], s = 0; s < n.length; s++) l[s] = i(n[s], s)
            return l
          }
          function _t(n, i, l) {
            for (var s = 0, c = l(i); s < n.length && l(n[s]) <= c; ) s++
            n.splice(s, 0, i)
          }
          function ht() {}
          function Dt(n, i) {
            var l
            return (
              Object.create
                ? (l = Object.create(n))
                : ((ht.prototype = n), (l = new ht())),
              i && St(i, l),
              l
            )
          }
          var At =
            /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/
          function Ot(n) {
            return (
              /\w/.test(n) ||
              (n > "" && (n.toUpperCase() != n.toLowerCase() || At.test(n)))
            )
          }
          function zt(n, i) {
            return i
              ? i.source.indexOf("\\w") > -1 && Ot(n)
                ? !0
                : i.test(n)
              : Ot(n)
          }
          function Gt(n) {
            for (var i in n) if (n.hasOwnProperty(i) && n[i]) return !1
            return !0
          }
          var ie =
            /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/
          function ne(n) {
            return n.charCodeAt(0) >= 768 && ie.test(n)
          }
          function ue(n, i, l) {
            for (; (l < 0 ? i > 0 : i < n.length) && ne(n.charAt(i)); ) i += l
            return i
          }
          function te(n, i, l) {
            for (var s = i > l ? -1 : 1; ; ) {
              if (i == l) return i
              var c = (i + l) / 2,
                d = s < 0 ? Math.ceil(c) : Math.floor(c)
              if (d == i) return n(d) ? i : l
              n(d) ? (l = d) : (i = d + s)
            }
          }
          function bn(n, i, l, s) {
            if (!n) return s(i, l, "ltr", 0)
            for (var c = !1, d = 0; d < n.length; ++d) {
              var m = n[d]
              ;((m.from < l && m.to > i) || (i == l && m.to == i)) &&
                (s(
                  Math.max(m.from, i),
                  Math.min(m.to, l),
                  m.level == 1 ? "rtl" : "ltr",
                  d,
                ),
                (c = !0))
            }
            c || s(i, l, "ltr")
          }
          var Nn = null
          function We(n, i, l) {
            var s
            Nn = null
            for (var c = 0; c < n.length; ++c) {
              var d = n[c]
              if (d.from < i && d.to > i) return c
              d.to == i &&
                (d.from != d.to && l == "before" ? (s = c) : (Nn = c)),
                d.from == i &&
                  (d.from != d.to && l != "before" ? (s = c) : (Nn = c))
            }
            return s ?? Nn
          }
          var co = (function () {
            var n =
                "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
              i =
                "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111"
            function l(_) {
              return _ <= 247
                ? n.charAt(_)
                : 1424 <= _ && _ <= 1524
                  ? "R"
                  : 1536 <= _ && _ <= 1785
                    ? i.charAt(_ - 1536)
                    : 1774 <= _ && _ <= 2220
                      ? "r"
                      : 8192 <= _ && _ <= 8203
                        ? "w"
                        : _ == 8204
                          ? "b"
                          : "L"
            }
            var s = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
              c = /[stwN]/,
              d = /[LRr]/,
              m = /[Lb1n]/,
              y = /[1n]/
            function x(_, P, D) {
              ;(this.level = _), (this.from = P), (this.to = D)
            }
            return function (_, P) {
              var D = P == "ltr" ? "L" : "R"
              if (_.length == 0 || (P == "ltr" && !s.test(_))) return !1
              for (var U = _.length, H = [], J = 0; J < U; ++J)
                H.push(l(_.charCodeAt(J)))
              for (var it = 0, gt = D; it < U; ++it) {
                var yt = H[it]
                yt == "m" ? (H[it] = gt) : (gt = yt)
              }
              for (var kt = 0, bt = D; kt < U; ++kt) {
                var Ct = H[kt]
                Ct == "1" && bt == "r"
                  ? (H[kt] = "n")
                  : d.test(Ct) && ((bt = Ct), Ct == "r" && (H[kt] = "R"))
              }
              for (var $t = 1, Pt = H[0]; $t < U - 1; ++$t) {
                var jt = H[$t]
                jt == "+" && Pt == "1" && H[$t + 1] == "1"
                  ? (H[$t] = "1")
                  : jt == "," &&
                    Pt == H[$t + 1] &&
                    (Pt == "1" || Pt == "n") &&
                    (H[$t] = Pt),
                  (Pt = jt)
              }
              for (var ge = 0; ge < U; ++ge) {
                var He = H[ge]
                if (He == ",") H[ge] = "N"
                else if (He == "%") {
                  var Se = void 0
                  for (Se = ge + 1; Se < U && H[Se] == "%"; ++Se);
                  for (
                    var _n =
                        (ge && H[ge - 1] == "!") || (Se < U && H[Se] == "1")
                          ? "1"
                          : "N",
                      cn = ge;
                    cn < Se;
                    ++cn
                  )
                    H[cn] = _n
                  ge = Se - 1
                }
              }
              for (var Me = 0, un = D; Me < U; ++Me) {
                var Ue = H[Me]
                un == "L" && Ue == "1" ? (H[Me] = "L") : d.test(Ue) && (un = Ue)
              }
              for (var De = 0; De < U; ++De)
                if (c.test(H[De])) {
                  var Ne = void 0
                  for (Ne = De + 1; Ne < U && c.test(H[Ne]); ++Ne);
                  for (
                    var Ee = (De ? H[De - 1] : D) == "L",
                      fn = (Ne < U ? H[Ne] : D) == "L",
                      No = Ee == fn ? (Ee ? "L" : "R") : D,
                      li = De;
                    li < Ne;
                    ++li
                  )
                    H[li] = No
                  De = Ne - 1
                }
              for (var Ye = [], ur, Be = 0; Be < U; )
                if (m.test(H[Be])) {
                  var $u = Be
                  for (++Be; Be < U && m.test(H[Be]); ++Be);
                  Ye.push(new x(0, $u, Be))
                } else {
                  var Nr = Be,
                    Fi = Ye.length,
                    Ii = P == "rtl" ? 1 : 0
                  for (++Be; Be < U && H[Be] != "L"; ++Be);
                  for (var en = Nr; en < Be; )
                    if (y.test(H[en])) {
                      Nr < en &&
                        (Ye.splice(Fi, 0, new x(1, Nr, en)), (Fi += Ii))
                      var Po = en
                      for (++en; en < Be && y.test(H[en]); ++en);
                      Ye.splice(Fi, 0, new x(2, Po, en)), (Fi += Ii), (Nr = en)
                    } else ++en
                  Nr < Be && Ye.splice(Fi, 0, new x(1, Nr, Be))
                }
              return (
                P == "ltr" &&
                  (Ye[0].level == 1 &&
                    (ur = _.match(/^\s+/)) &&
                    ((Ye[0].from = ur[0].length),
                    Ye.unshift(new x(0, 0, ur[0].length))),
                  ct(Ye).level == 1 &&
                    (ur = _.match(/\s+$/)) &&
                    ((ct(Ye).to -= ur[0].length),
                    Ye.push(new x(0, U - ur[0].length, U)))),
                P == "rtl" ? Ye.reverse() : Ye
              )
            }
          })()
          function ye(n, i) {
            var l = n.order
            return l == null && (l = n.order = co(n.text, i)), l
          }
          var on = [],
            wt = function (n, i, l) {
              if (n.addEventListener) n.addEventListener(i, l, !1)
              else if (n.attachEvent) n.attachEvent("on" + i, l)
              else {
                var s = n._handlers || (n._handlers = {})
                s[i] = (s[i] || on).concat(l)
              }
            }
          function ds(n, i) {
            return (n._handlers && n._handlers[i]) || on
          }
          function Ve(n, i, l) {
            if (n.removeEventListener) n.removeEventListener(i, l, !1)
            else if (n.detachEvent) n.detachEvent("on" + i, l)
            else {
              var s = n._handlers,
                c = s && s[i]
              if (c) {
                var d = rt(c, l)
                d > -1 && (s[i] = c.slice(0, d).concat(c.slice(d + 1)))
              }
            }
          }
          function me(n, i) {
            var l = ds(n, i)
            if (l.length)
              for (
                var s = Array.prototype.slice.call(arguments, 2), c = 0;
                c < l.length;
                ++c
              )
                l[c].apply(null, s)
          }
          function Ce(n, i, l) {
            return (
              typeof i == "string" &&
                (i = {
                  type: i,
                  preventDefault: function () {
                    this.defaultPrevented = !0
                  },
                }),
              me(n, l || i.type, n, i),
              ps(i) || i.codemirrorIgnore
            )
          }
          function $l(n) {
            var i = n._handlers && n._handlers.cursorActivity
            if (i)
              for (
                var l =
                    n.curOp.cursorActivityHandlers ||
                    (n.curOp.cursorActivityHandlers = []),
                  s = 0;
                s < i.length;
                ++s
              )
                rt(l, i[s]) == -1 && l.push(i[s])
          }
          function Je(n, i) {
            return ds(n, i).length > 0
          }
          function Qe(n) {
            ;(n.prototype.on = function (i, l) {
              wt(this, i, l)
            }),
              (n.prototype.off = function (i, l) {
                Ve(this, i, l)
              })
          }
          function Ke(n) {
            n.preventDefault ? n.preventDefault() : (n.returnValue = !1)
          }
          function Ai(n) {
            n.stopPropagation ? n.stopPropagation() : (n.cancelBubble = !0)
          }
          function ps(n) {
            return n.defaultPrevented != null
              ? n.defaultPrevented
              : n.returnValue == !1
          }
          function _r(n) {
            Ke(n), Ai(n)
          }
          function sn(n) {
            return n.target || n.srcElement
          }
          function gs(n) {
            var i = n.which
            return (
              i == null &&
                (n.button & 1
                  ? (i = 1)
                  : n.button & 2
                    ? (i = 3)
                    : n.button & 4 && (i = 2)),
              W && n.ctrlKey && i == 1 && (i = 3),
              i
            )
          }
          var Bc = (function () {
              if (p && g < 9) return !1
              var n = k("div")
              return "draggable" in n || "dragDrop" in n
            })(),
            Fn
          function Wc(n) {
            if (Fn == null) {
              var i = k("span", "​")
              z(n, k("span", [i, document.createTextNode("x")])),
                n.firstChild.offsetHeight != 0 &&
                  (Fn =
                    i.offsetWidth <= 1 && i.offsetHeight > 2 && !(p && g < 8))
            }
            var l = Fn
              ? k("span", "​")
              : k(
                  "span",
                  " ",
                  null,
                  "display: inline-block; width: 1px; margin-right: -1px",
                )
            return l.setAttribute("cm-text", ""), l
          }
          var uo
          function Rl(n) {
            if (uo != null) return uo
            var i = z(n, document.createTextNode("AخA")),
              l = B(i, 0, 1).getBoundingClientRect(),
              s = B(i, 1, 2).getBoundingClientRect()
            return (
              V(n), !l || l.left == l.right ? !1 : (uo = s.right - l.right < 3)
            )
          }
          var vs =
              `

b`.split(/\n/).length != 3
                ? function (n) {
                    for (var i = 0, l = [], s = n.length; i <= s; ) {
                      var c = n.indexOf(
                        `
`,
                        i,
                      )
                      c == -1 && (c = n.length)
                      var d = n.slice(i, n.charAt(c - 1) == "\r" ? c - 1 : c),
                        m = d.indexOf("\r")
                      m != -1
                        ? (l.push(d.slice(0, m)), (i += m + 1))
                        : (l.push(d), (i = c + 1))
                    }
                    return l
                  }
                : function (n) {
                    return n.split(/\r\n?|\n/)
                  },
            Xr = window.getSelection
              ? function (n) {
                  try {
                    return n.selectionStart != n.selectionEnd
                  } catch {
                    return !1
                  }
                }
              : function (n) {
                  var i
                  try {
                    i = n.ownerDocument.selection.createRange()
                  } catch {}
                  return !i || i.parentElement() != n
                    ? !1
                    : i.compareEndPoints("StartToEnd", i) != 0
                },
            ir = (function () {
              var n = k("div")
              return "oncopy" in n
                ? !0
                : (n.setAttribute("oncopy", "return;"),
                  typeof n.oncopy == "function")
            })(),
            or = null
          function zl(n) {
            if (or != null) return or
            var i = z(n, k("span", "x")),
              l = i.getBoundingClientRect(),
              s = B(i, 0, 1).getBoundingClientRect()
            return (or = Math.abs(l.left - s.left) > 1)
          }
          var Un = {},
            Yr = {}
          function Fl(n, i) {
            arguments.length > 2 &&
              (i.dependencies = Array.prototype.slice.call(arguments, 2)),
              (Un[n] = i)
          }
          function fo(n, i) {
            Yr[n] = i
          }
          function wn(n) {
            if (typeof n == "string" && Yr.hasOwnProperty(n)) n = Yr[n]
            else if (
              n &&
              typeof n.name == "string" &&
              Yr.hasOwnProperty(n.name)
            ) {
              var i = Yr[n.name]
              typeof i == "string" && (i = { name: i }),
                (n = Dt(i, n)),
                (n.name = i.name)
            } else {
              if (typeof n == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(n))
                return wn("application/xml")
              if (typeof n == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(n))
                return wn("application/json")
            }
            return typeof n == "string" ? { name: n } : n || { name: "null" }
          }
          function Sr(n, i) {
            i = wn(i)
            var l = Un[i.name]
            if (!l) return Sr(n, "text/plain")
            var s = l(n, i)
            if (Zr.hasOwnProperty(i.name)) {
              var c = Zr[i.name]
              for (var d in c)
                c.hasOwnProperty(d) &&
                  (s.hasOwnProperty(d) && (s["_" + d] = s[d]), (s[d] = c[d]))
            }
            if (
              ((s.name = i.name),
              i.helperType && (s.helperType = i.helperType),
              i.modeProps)
            )
              for (var m in i.modeProps) s[m] = i.modeProps[m]
            return s
          }
          var Zr = {}
          function Il(n, i) {
            var l = Zr.hasOwnProperty(n) ? Zr[n] : (Zr[n] = {})
            St(i, l)
          }
          function kr(n, i) {
            if (i === !0) return i
            if (n.copyState) return n.copyState(i)
            var l = {}
            for (var s in i) {
              var c = i[s]
              c instanceof Array && (c = c.concat([])), (l[s] = c)
            }
            return l
          }
          function Jr(n, i) {
            for (
              var l;
              n.innerMode && ((l = n.innerMode(i)), !(!l || l.mode == n));

            )
              (i = l.state), (n = l.mode)
            return l || { mode: n, state: i }
          }
          function ms(n, i, l) {
            return n.startState ? n.startState(i, l) : !0
          }
          var Te = function (n, i, l) {
            ;(this.pos = this.start = 0),
              (this.string = n),
              (this.tabSize = i || 8),
              (this.lastColumnPos = this.lastColumnValue = 0),
              (this.lineStart = 0),
              (this.lineOracle = l)
          }
          ;(Te.prototype.eol = function () {
            return this.pos >= this.string.length
          }),
            (Te.prototype.sol = function () {
              return this.pos == this.lineStart
            }),
            (Te.prototype.peek = function () {
              return this.string.charAt(this.pos) || void 0
            }),
            (Te.prototype.next = function () {
              if (this.pos < this.string.length)
                return this.string.charAt(this.pos++)
            }),
            (Te.prototype.eat = function (n) {
              var i = this.string.charAt(this.pos),
                l
              if (
                (typeof n == "string"
                  ? (l = i == n)
                  : (l = i && (n.test ? n.test(i) : n(i))),
                l)
              )
                return ++this.pos, i
            }),
            (Te.prototype.eatWhile = function (n) {
              for (var i = this.pos; this.eat(n); );
              return this.pos > i
            }),
            (Te.prototype.eatSpace = function () {
              for (
                var n = this.pos;
                /[\s\u00a0]/.test(this.string.charAt(this.pos));

              )
                ++this.pos
              return this.pos > n
            }),
            (Te.prototype.skipToEnd = function () {
              this.pos = this.string.length
            }),
            (Te.prototype.skipTo = function (n) {
              var i = this.string.indexOf(n, this.pos)
              if (i > -1) return (this.pos = i), !0
            }),
            (Te.prototype.backUp = function (n) {
              this.pos -= n
            }),
            (Te.prototype.column = function () {
              return (
                this.lastColumnPos < this.start &&
                  ((this.lastColumnValue = j(
                    this.string,
                    this.start,
                    this.tabSize,
                    this.lastColumnPos,
                    this.lastColumnValue,
                  )),
                  (this.lastColumnPos = this.start)),
                this.lastColumnValue -
                  (this.lineStart
                    ? j(this.string, this.lineStart, this.tabSize)
                    : 0)
              )
            }),
            (Te.prototype.indentation = function () {
              return (
                j(this.string, null, this.tabSize) -
                (this.lineStart
                  ? j(this.string, this.lineStart, this.tabSize)
                  : 0)
              )
            }),
            (Te.prototype.match = function (n, i, l) {
              if (typeof n == "string") {
                var s = function (m) {
                    return l ? m.toLowerCase() : m
                  },
                  c = this.string.substr(this.pos, n.length)
                if (s(c) == s(n)) return i !== !1 && (this.pos += n.length), !0
              } else {
                var d = this.string.slice(this.pos).match(n)
                return d && d.index > 0
                  ? null
                  : (d && i !== !1 && (this.pos += d[0].length), d)
              }
            }),
            (Te.prototype.current = function () {
              return this.string.slice(this.start, this.pos)
            }),
            (Te.prototype.hideFirstChars = function (n, i) {
              this.lineStart += n
              try {
                return i()
              } finally {
                this.lineStart -= n
              }
            }),
            (Te.prototype.lookAhead = function (n) {
              var i = this.lineOracle
              return i && i.lookAhead(n)
            }),
            (Te.prototype.baseToken = function () {
              var n = this.lineOracle
              return n && n.baseToken(this.pos)
            })
          function Lt(n, i) {
            if (((i -= n.first), i < 0 || i >= n.size))
              throw new Error(
                "There is no line " + (i + n.first) + " in the document.",
              )
            for (var l = n; !l.lines; )
              for (var s = 0; ; ++s) {
                var c = l.children[s],
                  d = c.chunkSize()
                if (i < d) {
                  l = c
                  break
                }
                i -= d
              }
            return l.lines[i]
          }
          function Cr(n, i, l) {
            var s = [],
              c = i.line
            return (
              n.iter(i.line, l.line + 1, function (d) {
                var m = d.text
                c == l.line && (m = m.slice(0, l.ch)),
                  c == i.line && (m = m.slice(i.ch)),
                  s.push(m),
                  ++c
              }),
              s
            )
          }
          function ho(n, i, l) {
            var s = []
            return (
              n.iter(i, l, function (c) {
                s.push(c.text)
              }),
              s
            )
          }
          function In(n, i) {
            var l = i - n.height
            if (l) for (var s = n; s; s = s.parent) s.height += l
          }
          function ae(n) {
            if (n.parent == null) return null
            for (
              var i = n.parent, l = rt(i.lines, n), s = i.parent;
              s;
              i = s, s = s.parent
            )
              for (var c = 0; s.children[c] != i; ++c)
                l += s.children[c].chunkSize()
            return l + i.first
          }
          function sr(n, i) {
            var l = n.first
            t: do {
              for (var s = 0; s < n.children.length; ++s) {
                var c = n.children[s],
                  d = c.height
                if (i < d) {
                  n = c
                  continue t
                }
                ;(i -= d), (l += c.chunkSize())
              }
              return l
            } while (!n.lines)
            for (var m = 0; m < n.lines.length; ++m) {
              var y = n.lines[m],
                x = y.height
              if (i < x) break
              i -= x
            }
            return l + m
          }
          function C(n, i) {
            return i >= n.first && i < n.first + n.size
          }
          function $(n, i) {
            return String(n.lineNumberFormatter(i + n.firstLineNumber))
          }
          function F(n, i, l) {
            if ((l === void 0 && (l = null), !(this instanceof F)))
              return new F(n, i, l)
            ;(this.line = n), (this.ch = i), (this.sticky = l)
          }
          function Z(n, i) {
            return n.line - i.line || n.ch - i.ch
          }
          function qt(n, i) {
            return n.sticky == i.sticky && Z(n, i) == 0
          }
          function Yt(n) {
            return F(n.line, n.ch)
          }
          function oe(n, i) {
            return Z(n, i) < 0 ? i : n
          }
          function Oe(n, i) {
            return Z(n, i) < 0 ? n : i
          }
          function Pn(n, i) {
            return Math.max(n.first, Math.min(i, n.first + n.size - 1))
          }
          function Ht(n, i) {
            if (i.line < n.first) return F(n.first, 0)
            var l = n.first + n.size - 1
            return i.line > l
              ? F(l, Lt(n, l).text.length)
              : Cb(i, Lt(n, i.line).text.length)
          }
          function Cb(n, i) {
            var l = n.ch
            return l == null || l > i ? F(n.line, i) : l < 0 ? F(n.line, 0) : n
          }
          function ed(n, i) {
            for (var l = [], s = 0; s < i.length; s++) l[s] = Ht(n, i[s])
            return l
          }
          var ql = function (n, i) {
              ;(this.state = n), (this.lookAhead = i)
            },
            lr = function (n, i, l, s) {
              ;(this.state = i),
                (this.doc = n),
                (this.line = l),
                (this.maxLookAhead = s || 0),
                (this.baseTokens = null),
                (this.baseTokenPos = 1)
            }
          ;(lr.prototype.lookAhead = function (n) {
            var i = this.doc.getLine(this.line + n)
            return (
              i != null && n > this.maxLookAhead && (this.maxLookAhead = n), i
            )
          }),
            (lr.prototype.baseToken = function (n) {
              if (!this.baseTokens) return null
              for (; this.baseTokens[this.baseTokenPos] <= n; )
                this.baseTokenPos += 2
              var i = this.baseTokens[this.baseTokenPos + 1]
              return {
                type: i && i.replace(/( |^)overlay .*/, ""),
                size: this.baseTokens[this.baseTokenPos] - n,
              }
            }),
            (lr.prototype.nextLine = function () {
              this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
            }),
            (lr.fromSaved = function (n, i, l) {
              return i instanceof ql
                ? new lr(n, kr(n.mode, i.state), l, i.lookAhead)
                : new lr(n, kr(n.mode, i), l)
            }),
            (lr.prototype.save = function (n) {
              var i = n !== !1 ? kr(this.doc.mode, this.state) : this.state
              return this.maxLookAhead > 0 ? new ql(i, this.maxLookAhead) : i
            })
          function nd(n, i, l, s) {
            var c = [n.state.modeGen],
              d = {}
            ad(
              n,
              i.text,
              n.doc.mode,
              l,
              function (_, P) {
                return c.push(_, P)
              },
              d,
              s,
            )
            for (
              var m = l.state,
                y = function (_) {
                  l.baseTokens = c
                  var P = n.state.overlays[_],
                    D = 1,
                    U = 0
                  ;(l.state = !0),
                    ad(
                      n,
                      i.text,
                      P.mode,
                      l,
                      function (H, J) {
                        for (var it = D; U < H; ) {
                          var gt = c[D]
                          gt > H && c.splice(D, 1, H, c[D + 1], gt),
                            (D += 2),
                            (U = Math.min(H, gt))
                        }
                        if (J)
                          if (P.opaque)
                            c.splice(it, D - it, H, "overlay " + J),
                              (D = it + 2)
                          else
                            for (; it < D; it += 2) {
                              var yt = c[it + 1]
                              c[it + 1] = (yt ? yt + " " : "") + "overlay " + J
                            }
                      },
                      d,
                    ),
                    (l.state = m),
                    (l.baseTokens = null),
                    (l.baseTokenPos = 1)
                },
                x = 0;
              x < n.state.overlays.length;
              ++x
            )
              y(x)
            return { styles: c, classes: d.bgClass || d.textClass ? d : null }
          }
          function rd(n, i, l) {
            if (!i.styles || i.styles[0] != n.state.modeGen) {
              var s = ys(n, ae(i)),
                c =
                  i.text.length > n.options.maxHighlightLength &&
                  kr(n.doc.mode, s.state),
                d = nd(n, i, s)
              c && (s.state = c),
                (i.stateAfter = s.save(!c)),
                (i.styles = d.styles),
                d.classes
                  ? (i.styleClasses = d.classes)
                  : i.styleClasses && (i.styleClasses = null),
                l === n.doc.highlightFrontier &&
                  (n.doc.modeFrontier = Math.max(
                    n.doc.modeFrontier,
                    ++n.doc.highlightFrontier,
                  ))
            }
            return i.styles
          }
          function ys(n, i, l) {
            var s = n.doc,
              c = n.display
            if (!s.mode.startState) return new lr(s, !0, i)
            var d = Tb(n, i, l),
              m = d > s.first && Lt(s, d - 1).stateAfter,
              y = m ? lr.fromSaved(s, m, d) : new lr(s, ms(s.mode), d)
            return (
              s.iter(d, i, function (x) {
                Uc(n, x.text, y)
                var _ = y.line
                ;(x.stateAfter =
                  _ == i - 1 || _ % 5 == 0 || (_ >= c.viewFrom && _ < c.viewTo)
                    ? y.save()
                    : null),
                  y.nextLine()
              }),
              l && (s.modeFrontier = y.line),
              y
            )
          }
          function Uc(n, i, l, s) {
            var c = n.doc.mode,
              d = new Te(i, n.options.tabSize, l)
            for (
              d.start = d.pos = s || 0, i == "" && id(c, l.state);
              !d.eol();

            )
              jc(c, d, l.state), (d.start = d.pos)
          }
          function id(n, i) {
            if (n.blankLine) return n.blankLine(i)
            if (n.innerMode) {
              var l = Jr(n, i)
              if (l.mode.blankLine) return l.mode.blankLine(l.state)
            }
          }
          function jc(n, i, l, s) {
            for (var c = 0; c < 10; c++) {
              s && (s[0] = Jr(n, l).mode)
              var d = n.token(i, l)
              if (i.pos > i.start) return d
            }
            throw new Error("Mode " + n.name + " failed to advance stream.")
          }
          var od = function (n, i, l) {
            ;(this.start = n.start),
              (this.end = n.pos),
              (this.string = n.current()),
              (this.type = i || null),
              (this.state = l)
          }
          function sd(n, i, l, s) {
            var c = n.doc,
              d = c.mode,
              m
            i = Ht(c, i)
            var y = Lt(c, i.line),
              x = ys(n, i.line, l),
              _ = new Te(y.text, n.options.tabSize, x),
              P
            for (s && (P = []); (s || _.pos < i.ch) && !_.eol(); )
              (_.start = _.pos),
                (m = jc(d, _, x.state)),
                s && P.push(new od(_, m, kr(c.mode, x.state)))
            return s ? P : new od(_, m, x.state)
          }
          function ld(n, i) {
            if (n)
              for (;;) {
                var l = n.match(/(?:^|\s+)line-(background-)?(\S+)/)
                if (!l) break
                n = n.slice(0, l.index) + n.slice(l.index + l[0].length)
                var s = l[1] ? "bgClass" : "textClass"
                i[s] == null
                  ? (i[s] = l[2])
                  : new RegExp("(?:^|\\s)" + l[2] + "(?:$|\\s)").test(i[s]) ||
                    (i[s] += " " + l[2])
              }
            return n
          }
          function ad(n, i, l, s, c, d, m) {
            var y = l.flattenSpans
            y == null && (y = n.options.flattenSpans)
            var x = 0,
              _ = null,
              P = new Te(i, n.options.tabSize, s),
              D,
              U = n.options.addModeClass && [null]
            for (i == "" && ld(id(l, s.state), d); !P.eol(); ) {
              if (
                (P.pos > n.options.maxHighlightLength
                  ? ((y = !1),
                    m && Uc(n, i, s, P.pos),
                    (P.pos = i.length),
                    (D = null))
                  : (D = ld(jc(l, P, s.state, U), d)),
                U)
              ) {
                var H = U[0].name
                H && (D = "m-" + (D ? H + " " + D : H))
              }
              if (!y || _ != D) {
                for (; x < P.start; ) (x = Math.min(P.start, x + 5e3)), c(x, _)
                _ = D
              }
              P.start = P.pos
            }
            for (; x < P.pos; ) {
              var J = Math.min(P.pos, x + 5e3)
              c(J, _), (x = J)
            }
          }
          function Tb(n, i, l) {
            for (
              var s,
                c,
                d = n.doc,
                m = l ? -1 : i - (n.doc.mode.innerMode ? 1e3 : 100),
                y = i;
              y > m;
              --y
            ) {
              if (y <= d.first) return d.first
              var x = Lt(d, y - 1),
                _ = x.stateAfter
              if (
                _ &&
                (!l ||
                  y + (_ instanceof ql ? _.lookAhead : 0) <= d.modeFrontier)
              )
                return y
              var P = j(x.text, null, n.options.tabSize)
              ;(c == null || s > P) && ((c = y - 1), (s = P))
            }
            return c
          }
          function Eb(n, i) {
            if (
              ((n.modeFrontier = Math.min(n.modeFrontier, i)),
              !(n.highlightFrontier < i - 10))
            ) {
              for (var l = n.first, s = i - 1; s > l; s--) {
                var c = Lt(n, s).stateAfter
                if (c && (!(c instanceof ql) || s + c.lookAhead < i)) {
                  l = s + 1
                  break
                }
              }
              n.highlightFrontier = Math.min(n.highlightFrontier, l)
            }
          }
          var cd = !1,
            Tr = !1
          function Lb() {
            cd = !0
          }
          function Ab() {
            Tr = !0
          }
          function Hl(n, i, l) {
            ;(this.marker = n), (this.from = i), (this.to = l)
          }
          function bs(n, i) {
            if (n)
              for (var l = 0; l < n.length; ++l) {
                var s = n[l]
                if (s.marker == i) return s
              }
          }
          function Mb(n, i) {
            for (var l, s = 0; s < n.length; ++s)
              n[s] != i && (l || (l = [])).push(n[s])
            return l
          }
          function Nb(n, i, l) {
            var s =
              l &&
              window.WeakSet &&
              (l.markedSpans || (l.markedSpans = new WeakSet()))
            s && n.markedSpans && s.has(n.markedSpans)
              ? n.markedSpans.push(i)
              : ((n.markedSpans = n.markedSpans
                  ? n.markedSpans.concat([i])
                  : [i]),
                s && s.add(n.markedSpans)),
              i.marker.attachLine(n)
          }
          function Pb(n, i, l) {
            var s
            if (n)
              for (var c = 0; c < n.length; ++c) {
                var d = n[c],
                  m = d.marker,
                  y =
                    d.from == null ||
                    (m.inclusiveLeft ? d.from <= i : d.from < i)
                if (
                  y ||
                  (d.from == i &&
                    m.type == "bookmark" &&
                    (!l || !d.marker.insertLeft))
                ) {
                  var x =
                    d.to == null || (m.inclusiveRight ? d.to >= i : d.to > i)
                  ;(s || (s = [])).push(new Hl(m, d.from, x ? null : d.to))
                }
              }
            return s
          }
          function Ob(n, i, l) {
            var s
            if (n)
              for (var c = 0; c < n.length; ++c) {
                var d = n[c],
                  m = d.marker,
                  y = d.to == null || (m.inclusiveRight ? d.to >= i : d.to > i)
                if (
                  y ||
                  (d.from == i &&
                    m.type == "bookmark" &&
                    (!l || d.marker.insertLeft))
                ) {
                  var x =
                    d.from == null ||
                    (m.inclusiveLeft ? d.from <= i : d.from < i)
                  ;(s || (s = [])).push(
                    new Hl(
                      m,
                      x ? null : d.from - i,
                      d.to == null ? null : d.to - i,
                    ),
                  )
                }
              }
            return s
          }
          function Gc(n, i) {
            if (i.full) return null
            var l = C(n, i.from.line) && Lt(n, i.from.line).markedSpans,
              s = C(n, i.to.line) && Lt(n, i.to.line).markedSpans
            if (!l && !s) return null
            var c = i.from.ch,
              d = i.to.ch,
              m = Z(i.from, i.to) == 0,
              y = Pb(l, c, m),
              x = Ob(s, d, m),
              _ = i.text.length == 1,
              P = ct(i.text).length + (_ ? c : 0)
            if (y)
              for (var D = 0; D < y.length; ++D) {
                var U = y[D]
                if (U.to == null) {
                  var H = bs(x, U.marker)
                  H ? _ && (U.to = H.to == null ? null : H.to + P) : (U.to = c)
                }
              }
            if (x)
              for (var J = 0; J < x.length; ++J) {
                var it = x[J]
                if ((it.to != null && (it.to += P), it.from == null)) {
                  var gt = bs(y, it.marker)
                  gt || ((it.from = P), _ && (y || (y = [])).push(it))
                } else (it.from += P), _ && (y || (y = [])).push(it)
              }
            y && (y = ud(y)), x && x != y && (x = ud(x))
            var yt = [y]
            if (!_) {
              var kt = i.text.length - 2,
                bt
              if (kt > 0 && y)
                for (var Ct = 0; Ct < y.length; ++Ct)
                  y[Ct].to == null &&
                    (bt || (bt = [])).push(new Hl(y[Ct].marker, null, null))
              for (var $t = 0; $t < kt; ++$t) yt.push(bt)
              yt.push(x)
            }
            return yt
          }
          function ud(n) {
            for (var i = 0; i < n.length; ++i) {
              var l = n[i]
              l.from != null &&
                l.from == l.to &&
                l.marker.clearWhenEmpty !== !1 &&
                n.splice(i--, 1)
            }
            return n.length ? n : null
          }
          function Db(n, i, l) {
            var s = null
            if (
              (n.iter(i.line, l.line + 1, function (H) {
                if (H.markedSpans)
                  for (var J = 0; J < H.markedSpans.length; ++J) {
                    var it = H.markedSpans[J].marker
                    it.readOnly &&
                      (!s || rt(s, it) == -1) &&
                      (s || (s = [])).push(it)
                  }
              }),
              !s)
            )
              return null
            for (var c = [{ from: i, to: l }], d = 0; d < s.length; ++d)
              for (var m = s[d], y = m.find(0), x = 0; x < c.length; ++x) {
                var _ = c[x]
                if (!(Z(_.to, y.from) < 0 || Z(_.from, y.to) > 0)) {
                  var P = [x, 1],
                    D = Z(_.from, y.from),
                    U = Z(_.to, y.to)
                  ;(D < 0 || (!m.inclusiveLeft && !D)) &&
                    P.push({ from: _.from, to: y.from }),
                    (U > 0 || (!m.inclusiveRight && !U)) &&
                      P.push({ from: y.to, to: _.to }),
                    c.splice.apply(c, P),
                    (x += P.length - 3)
                }
              }
            return c
          }
          function fd(n) {
            var i = n.markedSpans
            if (i) {
              for (var l = 0; l < i.length; ++l) i[l].marker.detachLine(n)
              n.markedSpans = null
            }
          }
          function hd(n, i) {
            if (i) {
              for (var l = 0; l < i.length; ++l) i[l].marker.attachLine(n)
              n.markedSpans = i
            }
          }
          function Bl(n) {
            return n.inclusiveLeft ? -1 : 0
          }
          function Wl(n) {
            return n.inclusiveRight ? 1 : 0
          }
          function Vc(n, i) {
            var l = n.lines.length - i.lines.length
            if (l != 0) return l
            var s = n.find(),
              c = i.find(),
              d = Z(s.from, c.from) || Bl(n) - Bl(i)
            if (d) return -d
            var m = Z(s.to, c.to) || Wl(n) - Wl(i)
            return m || i.id - n.id
          }
          function dd(n, i) {
            var l = Tr && n.markedSpans,
              s
            if (l)
              for (var c = void 0, d = 0; d < l.length; ++d)
                (c = l[d]),
                  c.marker.collapsed &&
                    (i ? c.from : c.to) == null &&
                    (!s || Vc(s, c.marker) < 0) &&
                    (s = c.marker)
            return s
          }
          function pd(n) {
            return dd(n, !0)
          }
          function Ul(n) {
            return dd(n, !1)
          }
          function $b(n, i) {
            var l = Tr && n.markedSpans,
              s
            if (l)
              for (var c = 0; c < l.length; ++c) {
                var d = l[c]
                d.marker.collapsed &&
                  (d.from == null || d.from < i) &&
                  (d.to == null || d.to > i) &&
                  (!s || Vc(s, d.marker) < 0) &&
                  (s = d.marker)
              }
            return s
          }
          function gd(n, i, l, s, c) {
            var d = Lt(n, i),
              m = Tr && d.markedSpans
            if (m)
              for (var y = 0; y < m.length; ++y) {
                var x = m[y]
                if (x.marker.collapsed) {
                  var _ = x.marker.find(0),
                    P = Z(_.from, l) || Bl(x.marker) - Bl(c),
                    D = Z(_.to, s) || Wl(x.marker) - Wl(c)
                  if (
                    !((P >= 0 && D <= 0) || (P <= 0 && D >= 0)) &&
                    ((P <= 0 &&
                      (x.marker.inclusiveRight && c.inclusiveLeft
                        ? Z(_.to, l) >= 0
                        : Z(_.to, l) > 0)) ||
                      (P >= 0 &&
                        (x.marker.inclusiveRight && c.inclusiveLeft
                          ? Z(_.from, s) <= 0
                          : Z(_.from, s) < 0)))
                  )
                    return !0
                }
              }
          }
          function jn(n) {
            for (var i; (i = pd(n)); ) n = i.find(-1, !0).line
            return n
          }
          function Rb(n) {
            for (var i; (i = Ul(n)); ) n = i.find(1, !0).line
            return n
          }
          function zb(n) {
            for (var i, l; (i = Ul(n)); )
              (n = i.find(1, !0).line), (l || (l = [])).push(n)
            return l
          }
          function Kc(n, i) {
            var l = Lt(n, i),
              s = jn(l)
            return l == s ? i : ae(s)
          }
          function vd(n, i) {
            if (i > n.lastLine()) return i
            var l = Lt(n, i),
              s
            if (!Qr(n, l)) return i
            for (; (s = Ul(l)); ) l = s.find(1, !0).line
            return ae(l) + 1
          }
          function Qr(n, i) {
            var l = Tr && i.markedSpans
            if (l) {
              for (var s = void 0, c = 0; c < l.length; ++c)
                if (((s = l[c]), !!s.marker.collapsed)) {
                  if (s.from == null) return !0
                  if (
                    !s.marker.widgetNode &&
                    s.from == 0 &&
                    s.marker.inclusiveLeft &&
                    Xc(n, i, s)
                  )
                    return !0
                }
            }
          }
          function Xc(n, i, l) {
            if (l.to == null) {
              var s = l.marker.find(1, !0)
              return Xc(n, s.line, bs(s.line.markedSpans, l.marker))
            }
            if (l.marker.inclusiveRight && l.to == i.text.length) return !0
            for (var c = void 0, d = 0; d < i.markedSpans.length; ++d)
              if (
                ((c = i.markedSpans[d]),
                c.marker.collapsed &&
                  !c.marker.widgetNode &&
                  c.from == l.to &&
                  (c.to == null || c.to != l.from) &&
                  (c.marker.inclusiveLeft || l.marker.inclusiveRight) &&
                  Xc(n, i, c))
              )
                return !0
          }
          function Er(n) {
            n = jn(n)
            for (var i = 0, l = n.parent, s = 0; s < l.lines.length; ++s) {
              var c = l.lines[s]
              if (c == n) break
              i += c.height
            }
            for (var d = l.parent; d; l = d, d = l.parent)
              for (var m = 0; m < d.children.length; ++m) {
                var y = d.children[m]
                if (y == l) break
                i += y.height
              }
            return i
          }
          function jl(n) {
            if (n.height == 0) return 0
            for (var i = n.text.length, l, s = n; (l = pd(s)); ) {
              var c = l.find(0, !0)
              ;(s = c.from.line), (i += c.from.ch - c.to.ch)
            }
            for (s = n; (l = Ul(s)); ) {
              var d = l.find(0, !0)
              ;(i -= s.text.length - d.from.ch),
                (s = d.to.line),
                (i += s.text.length - d.to.ch)
            }
            return i
          }
          function Yc(n) {
            var i = n.display,
              l = n.doc
            ;(i.maxLine = Lt(l, l.first)),
              (i.maxLineLength = jl(i.maxLine)),
              (i.maxLineChanged = !0),
              l.iter(function (s) {
                var c = jl(s)
                c > i.maxLineLength && ((i.maxLineLength = c), (i.maxLine = s))
              })
          }
          var po = function (n, i, l) {
            ;(this.text = n), hd(this, i), (this.height = l ? l(this) : 1)
          }
          ;(po.prototype.lineNo = function () {
            return ae(this)
          }),
            Qe(po)
          function Fb(n, i, l, s) {
            ;(n.text = i),
              n.stateAfter && (n.stateAfter = null),
              n.styles && (n.styles = null),
              n.order != null && (n.order = null),
              fd(n),
              hd(n, l)
            var c = s ? s(n) : 1
            c != n.height && In(n, c)
          }
          function Ib(n) {
            ;(n.parent = null), fd(n)
          }
          var qb = {},
            Hb = {}
          function md(n, i) {
            if (!n || /^\s*$/.test(n)) return null
            var l = i.addModeClass ? Hb : qb
            return l[n] || (l[n] = n.replace(/\S+/g, "cm-$&"))
          }
          function yd(n, i) {
            var l = q("span", null, null, v ? "padding-right: .1px" : null),
              s = {
                pre: q("pre", [l], "CodeMirror-line"),
                content: l,
                col: 0,
                pos: 0,
                cm: n,
                trailingSpace: !1,
                splitSpaces: n.getOption("lineWrapping"),
              }
            i.measure = {}
            for (var c = 0; c <= (i.rest ? i.rest.length : 0); c++) {
              var d = c ? i.rest[c - 1] : i.line,
                m = void 0
              ;(s.pos = 0),
                (s.addToken = Wb),
                Rl(n.display.measure) &&
                  (m = ye(d, n.doc.direction)) &&
                  (s.addToken = jb(s.addToken, m)),
                (s.map = [])
              var y = i != n.display.externalMeasured && ae(d)
              Gb(d, s, rd(n, d, y)),
                d.styleClasses &&
                  (d.styleClasses.bgClass &&
                    (s.bgClass = It(d.styleClasses.bgClass, s.bgClass || "")),
                  d.styleClasses.textClass &&
                    (s.textClass = It(
                      d.styleClasses.textClass,
                      s.textClass || "",
                    ))),
                s.map.length == 0 &&
                  s.map.push(
                    0,
                    0,
                    s.content.appendChild(Wc(n.display.measure)),
                  ),
                c == 0
                  ? ((i.measure.map = s.map), (i.measure.cache = {}))
                  : ((i.measure.maps || (i.measure.maps = [])).push(s.map),
                    (i.measure.caches || (i.measure.caches = [])).push({}))
            }
            if (v) {
              var x = s.content.lastChild
              ;(/\bcm-tab\b/.test(x.className) ||
                (x.querySelector && x.querySelector(".cm-tab"))) &&
                (s.content.className = "cm-tab-wrap-hack")
            }
            return (
              me(n, "renderLine", n, i.line, s.pre),
              s.pre.className &&
                (s.textClass = It(s.pre.className, s.textClass || "")),
              s
            )
          }
          function Bb(n) {
            var i = k("span", "•", "cm-invalidchar")
            return (
              (i.title = "\\u" + n.charCodeAt(0).toString(16)),
              i.setAttribute("aria-label", i.title),
              i
            )
          }
          function Wb(n, i, l, s, c, d, m) {
            if (i) {
              var y = n.splitSpaces ? Ub(i, n.trailingSpace) : i,
                x = n.cm.state.specialChars,
                _ = !1,
                P
              if (!x.test(i))
                (n.col += i.length),
                  (P = document.createTextNode(y)),
                  n.map.push(n.pos, n.pos + i.length, P),
                  p && g < 9 && (_ = !0),
                  (n.pos += i.length)
              else {
                P = document.createDocumentFragment()
                for (var D = 0; ; ) {
                  x.lastIndex = D
                  var U = x.exec(i),
                    H = U ? U.index - D : i.length - D
                  if (H) {
                    var J = document.createTextNode(y.slice(D, D + H))
                    p && g < 9
                      ? P.appendChild(k("span", [J]))
                      : P.appendChild(J),
                      n.map.push(n.pos, n.pos + H, J),
                      (n.col += H),
                      (n.pos += H)
                  }
                  if (!U) break
                  D += H + 1
                  var it = void 0
                  if (U[0] == "	") {
                    var gt = n.cm.options.tabSize,
                      yt = gt - (n.col % gt)
                    ;(it = P.appendChild(k("span", at(yt), "cm-tab"))),
                      it.setAttribute("role", "presentation"),
                      it.setAttribute("cm-text", "	"),
                      (n.col += yt)
                  } else
                    U[0] == "\r" ||
                    U[0] ==
                      `
`
                      ? ((it = P.appendChild(
                          k("span", U[0] == "\r" ? "␍" : "␤", "cm-invalidchar"),
                        )),
                        it.setAttribute("cm-text", U[0]),
                        (n.col += 1))
                      : ((it = n.cm.options.specialCharPlaceholder(U[0])),
                        it.setAttribute("cm-text", U[0]),
                        p && g < 9
                          ? P.appendChild(k("span", [it]))
                          : P.appendChild(it),
                        (n.col += 1))
                  n.map.push(n.pos, n.pos + 1, it), n.pos++
                }
              }
              if (
                ((n.trailingSpace = y.charCodeAt(i.length - 1) == 32),
                l || s || c || _ || d || m)
              ) {
                var kt = l || ""
                s && (kt += s), c && (kt += c)
                var bt = k("span", [P], kt, d)
                if (m)
                  for (var Ct in m)
                    m.hasOwnProperty(Ct) &&
                      Ct != "style" &&
                      Ct != "class" &&
                      bt.setAttribute(Ct, m[Ct])
                return n.content.appendChild(bt)
              }
              n.content.appendChild(P)
            }
          }
          function Ub(n, i) {
            if (n.length > 1 && !/  /.test(n)) return n
            for (var l = i, s = "", c = 0; c < n.length; c++) {
              var d = n.charAt(c)
              d == " " &&
                l &&
                (c == n.length - 1 || n.charCodeAt(c + 1) == 32) &&
                (d = " "),
                (s += d),
                (l = d == " ")
            }
            return s
          }
          function jb(n, i) {
            return function (l, s, c, d, m, y, x) {
              c = c ? c + " cm-force-border" : "cm-force-border"
              for (var _ = l.pos, P = _ + s.length; ; ) {
                for (
                  var D = void 0, U = 0;
                  U < i.length && ((D = i[U]), !(D.to > _ && D.from <= _));
                  U++
                );
                if (D.to >= P) return n(l, s, c, d, m, y, x)
                n(l, s.slice(0, D.to - _), c, d, null, y, x),
                  (d = null),
                  (s = s.slice(D.to - _)),
                  (_ = D.to)
              }
            }
          }
          function bd(n, i, l, s) {
            var c = !s && l.widgetNode
            c && n.map.push(n.pos, n.pos + i, c),
              !s &&
                n.cm.display.input.needsContentAttribute &&
                (c ||
                  (c = n.content.appendChild(document.createElement("span"))),
                c.setAttribute("cm-marker", l.id)),
              c &&
                (n.cm.display.input.setUneditable(c), n.content.appendChild(c)),
              (n.pos += i),
              (n.trailingSpace = !1)
          }
          function Gb(n, i, l) {
            var s = n.markedSpans,
              c = n.text,
              d = 0
            if (!s) {
              for (var m = 1; m < l.length; m += 2)
                i.addToken(
                  i,
                  c.slice(d, (d = l[m])),
                  md(l[m + 1], i.cm.options),
                )
              return
            }
            for (
              var y = c.length,
                x = 0,
                _ = 1,
                P = "",
                D,
                U,
                H = 0,
                J,
                it,
                gt,
                yt,
                kt;
              ;

            ) {
              if (H == x) {
                ;(J = it = gt = U = ""), (kt = null), (yt = null), (H = 1 / 0)
                for (var bt = [], Ct = void 0, $t = 0; $t < s.length; ++$t) {
                  var Pt = s[$t],
                    jt = Pt.marker
                  if (jt.type == "bookmark" && Pt.from == x && jt.widgetNode)
                    bt.push(jt)
                  else if (
                    Pt.from <= x &&
                    (Pt.to == null ||
                      Pt.to > x ||
                      (jt.collapsed && Pt.to == x && Pt.from == x))
                  ) {
                    if (
                      (Pt.to != null &&
                        Pt.to != x &&
                        H > Pt.to &&
                        ((H = Pt.to), (it = "")),
                      jt.className && (J += " " + jt.className),
                      jt.css && (U = (U ? U + ";" : "") + jt.css),
                      jt.startStyle &&
                        Pt.from == x &&
                        (gt += " " + jt.startStyle),
                      jt.endStyle &&
                        Pt.to == H &&
                        (Ct || (Ct = [])).push(jt.endStyle, Pt.to),
                      jt.title && ((kt || (kt = {})).title = jt.title),
                      jt.attributes)
                    )
                      for (var ge in jt.attributes)
                        (kt || (kt = {}))[ge] = jt.attributes[ge]
                    jt.collapsed && (!yt || Vc(yt.marker, jt) < 0) && (yt = Pt)
                  } else Pt.from > x && H > Pt.from && (H = Pt.from)
                }
                if (Ct)
                  for (var He = 0; He < Ct.length; He += 2)
                    Ct[He + 1] == H && (it += " " + Ct[He])
                if (!yt || yt.from == x)
                  for (var Se = 0; Se < bt.length; ++Se) bd(i, 0, bt[Se])
                if (yt && (yt.from || 0) == x) {
                  if (
                    (bd(
                      i,
                      (yt.to == null ? y + 1 : yt.to) - x,
                      yt.marker,
                      yt.from == null,
                    ),
                    yt.to == null)
                  )
                    return
                  yt.to == x && (yt = !1)
                }
              }
              if (x >= y) break
              for (var _n = Math.min(y, H); ; ) {
                if (P) {
                  var cn = x + P.length
                  if (!yt) {
                    var Me = cn > _n ? P.slice(0, _n - x) : P
                    i.addToken(
                      i,
                      Me,
                      D ? D + J : J,
                      gt,
                      x + Me.length == H ? it : "",
                      U,
                      kt,
                    )
                  }
                  if (cn >= _n) {
                    ;(P = P.slice(_n - x)), (x = _n)
                    break
                  }
                  ;(x = cn), (gt = "")
                }
                ;(P = c.slice(d, (d = l[_++]))), (D = md(l[_++], i.cm.options))
              }
            }
          }
          function wd(n, i, l) {
            ;(this.line = i),
              (this.rest = zb(i)),
              (this.size = this.rest ? ae(ct(this.rest)) - l + 1 : 1),
              (this.node = this.text = null),
              (this.hidden = Qr(n, i))
          }
          function Gl(n, i, l) {
            for (var s = [], c, d = i; d < l; d = c) {
              var m = new wd(n.doc, Lt(n.doc, d), d)
              ;(c = d + m.size), s.push(m)
            }
            return s
          }
          var go = null
          function Vb(n) {
            go
              ? go.ops.push(n)
              : (n.ownsGroup = go = { ops: [n], delayedCallbacks: [] })
          }
          function Kb(n) {
            var i = n.delayedCallbacks,
              l = 0
            do {
              for (; l < i.length; l++) i[l].call(null)
              for (var s = 0; s < n.ops.length; s++) {
                var c = n.ops[s]
                if (c.cursorActivityHandlers)
                  for (
                    ;
                    c.cursorActivityCalled < c.cursorActivityHandlers.length;

                  )
                    c.cursorActivityHandlers[c.cursorActivityCalled++].call(
                      null,
                      c.cm,
                    )
              }
            } while (l < i.length)
          }
          function Xb(n, i) {
            var l = n.ownsGroup
            if (l)
              try {
                Kb(l)
              } finally {
                ;(go = null), i(l)
              }
          }
          var ws = null
          function Fe(n, i) {
            var l = ds(n, i)
            if (l.length) {
              var s = Array.prototype.slice.call(arguments, 2),
                c
              go
                ? (c = go.delayedCallbacks)
                : ws
                  ? (c = ws)
                  : ((c = ws = []), setTimeout(Yb, 0))
              for (
                var d = function (y) {
                    c.push(function () {
                      return l[y].apply(null, s)
                    })
                  },
                  m = 0;
                m < l.length;
                ++m
              )
                d(m)
            }
          }
          function Yb() {
            var n = ws
            ws = null
            for (var i = 0; i < n.length; ++i) n[i]()
          }
          function xd(n, i, l, s) {
            for (var c = 0; c < i.changes.length; c++) {
              var d = i.changes[c]
              d == "text"
                ? Jb(n, i)
                : d == "gutter"
                  ? Sd(n, i, l, s)
                  : d == "class"
                    ? Zc(n, i)
                    : d == "widget" && Qb(n, i, s)
            }
            i.changes = null
          }
          function xs(n) {
            return (
              n.node == n.text &&
                ((n.node = k("div", null, null, "position: relative")),
                n.text.parentNode &&
                  n.text.parentNode.replaceChild(n.node, n.text),
                n.node.appendChild(n.text),
                p && g < 8 && (n.node.style.zIndex = 2)),
              n.node
            )
          }
          function Zb(n, i) {
            var l = i.bgClass
              ? i.bgClass + " " + (i.line.bgClass || "")
              : i.line.bgClass
            if ((l && (l += " CodeMirror-linebackground"), i.background))
              l
                ? (i.background.className = l)
                : (i.background.parentNode.removeChild(i.background),
                  (i.background = null))
            else if (l) {
              var s = xs(i)
              ;(i.background = s.insertBefore(k("div", null, l), s.firstChild)),
                n.display.input.setUneditable(i.background)
            }
          }
          function _d(n, i) {
            var l = n.display.externalMeasured
            return l && l.line == i.line
              ? ((n.display.externalMeasured = null),
                (i.measure = l.measure),
                l.built)
              : yd(n, i)
          }
          function Jb(n, i) {
            var l = i.text.className,
              s = _d(n, i)
            i.text == i.node && (i.node = s.pre),
              i.text.parentNode.replaceChild(s.pre, i.text),
              (i.text = s.pre),
              s.bgClass != i.bgClass || s.textClass != i.textClass
                ? ((i.bgClass = s.bgClass),
                  (i.textClass = s.textClass),
                  Zc(n, i))
                : l && (i.text.className = l)
          }
          function Zc(n, i) {
            Zb(n, i),
              i.line.wrapClass
                ? (xs(i).className = i.line.wrapClass)
                : i.node != i.text && (i.node.className = "")
            var l = i.textClass
              ? i.textClass + " " + (i.line.textClass || "")
              : i.line.textClass
            i.text.className = l || ""
          }
          function Sd(n, i, l, s) {
            if (
              (i.gutter && (i.node.removeChild(i.gutter), (i.gutter = null)),
              i.gutterBackground &&
                (i.node.removeChild(i.gutterBackground),
                (i.gutterBackground = null)),
              i.line.gutterClass)
            ) {
              var c = xs(i)
              ;(i.gutterBackground = k(
                "div",
                null,
                "CodeMirror-gutter-background " + i.line.gutterClass,
                "left: " +
                  (n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) +
                  "px; width: " +
                  s.gutterTotalWidth +
                  "px",
              )),
                n.display.input.setUneditable(i.gutterBackground),
                c.insertBefore(i.gutterBackground, i.text)
            }
            var d = i.line.gutterMarkers
            if (n.options.lineNumbers || d) {
              var m = xs(i),
                y = (i.gutter = k(
                  "div",
                  null,
                  "CodeMirror-gutter-wrapper",
                  "left: " +
                    (n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) +
                    "px",
                ))
              if (
                (y.setAttribute("aria-hidden", "true"),
                n.display.input.setUneditable(y),
                m.insertBefore(y, i.text),
                i.line.gutterClass && (y.className += " " + i.line.gutterClass),
                n.options.lineNumbers &&
                  (!d || !d["CodeMirror-linenumbers"]) &&
                  (i.lineNumber = y.appendChild(
                    k(
                      "div",
                      $(n.options, l),
                      "CodeMirror-linenumber CodeMirror-gutter-elt",
                      "left: " +
                        s.gutterLeft["CodeMirror-linenumbers"] +
                        "px; width: " +
                        n.display.lineNumInnerWidth +
                        "px",
                    ),
                  )),
                d)
              )
                for (var x = 0; x < n.display.gutterSpecs.length; ++x) {
                  var _ = n.display.gutterSpecs[x].className,
                    P = d.hasOwnProperty(_) && d[_]
                  P &&
                    y.appendChild(
                      k(
                        "div",
                        [P],
                        "CodeMirror-gutter-elt",
                        "left: " +
                          s.gutterLeft[_] +
                          "px; width: " +
                          s.gutterWidth[_] +
                          "px",
                      ),
                    )
                }
            }
          }
          function Qb(n, i, l) {
            i.alignable && (i.alignable = null)
            for (
              var s = dt("CodeMirror-linewidget"),
                c = i.node.firstChild,
                d = void 0;
              c;
              c = d
            )
              (d = c.nextSibling), s.test(c.className) && i.node.removeChild(c)
            kd(n, i, l)
          }
          function tw(n, i, l, s) {
            var c = _d(n, i)
            return (
              (i.text = i.node = c.pre),
              c.bgClass && (i.bgClass = c.bgClass),
              c.textClass && (i.textClass = c.textClass),
              Zc(n, i),
              Sd(n, i, l, s),
              kd(n, i, s),
              i.node
            )
          }
          function kd(n, i, l) {
            if ((Cd(n, i.line, i, l, !0), i.rest))
              for (var s = 0; s < i.rest.length; s++) Cd(n, i.rest[s], i, l, !1)
          }
          function Cd(n, i, l, s, c) {
            if (i.widgets)
              for (var d = xs(l), m = 0, y = i.widgets; m < y.length; ++m) {
                var x = y[m],
                  _ = k(
                    "div",
                    [x.node],
                    "CodeMirror-linewidget" +
                      (x.className ? " " + x.className : ""),
                  )
                x.handleMouseEvents ||
                  _.setAttribute("cm-ignore-events", "true"),
                  ew(x, _, l, s),
                  n.display.input.setUneditable(_),
                  c && x.above
                    ? d.insertBefore(_, l.gutter || l.text)
                    : d.appendChild(_),
                  Fe(x, "redraw")
              }
          }
          function ew(n, i, l, s) {
            if (n.noHScroll) {
              ;(l.alignable || (l.alignable = [])).push(i)
              var c = s.wrapperWidth
              ;(i.style.left = s.fixedPos + "px"),
                n.coverGutter ||
                  ((c -= s.gutterTotalWidth),
                  (i.style.paddingLeft = s.gutterTotalWidth + "px")),
                (i.style.width = c + "px")
            }
            n.coverGutter &&
              ((i.style.zIndex = 5),
              (i.style.position = "relative"),
              n.noHScroll || (i.style.marginLeft = -s.gutterTotalWidth + "px"))
          }
          function _s(n) {
            if (n.height != null) return n.height
            var i = n.doc.cm
            if (!i) return 0
            if (!Q(document.body, n.node)) {
              var l = "position: relative;"
              n.coverGutter &&
                (l += "margin-left: -" + i.display.gutters.offsetWidth + "px;"),
                n.noHScroll &&
                  (l += "width: " + i.display.wrapper.clientWidth + "px;"),
                z(i.display.measure, k("div", [n.node], null, l))
            }
            return (n.height = n.node.parentNode.offsetHeight)
          }
          function Lr(n, i) {
            for (var l = sn(i); l != n.wrapper; l = l.parentNode)
              if (
                !l ||
                (l.nodeType == 1 &&
                  l.getAttribute("cm-ignore-events") == "true") ||
                (l.parentNode == n.sizer && l != n.mover)
              )
                return !0
          }
          function Vl(n) {
            return n.lineSpace.offsetTop
          }
          function Jc(n) {
            return n.mover.offsetHeight - n.lineSpace.offsetHeight
          }
          function Td(n) {
            if (n.cachedPaddingH) return n.cachedPaddingH
            var i = z(n.measure, k("pre", "x", "CodeMirror-line-like")),
              l = window.getComputedStyle
                ? window.getComputedStyle(i)
                : i.currentStyle,
              s = {
                left: parseInt(l.paddingLeft),
                right: parseInt(l.paddingRight),
              }
            return (
              !isNaN(s.left) && !isNaN(s.right) && (n.cachedPaddingH = s), s
            )
          }
          function ar(n) {
            return Nt - n.display.nativeBarWidth
          }
          function Mi(n) {
            return n.display.scroller.clientWidth - ar(n) - n.display.barWidth
          }
          function Qc(n) {
            return n.display.scroller.clientHeight - ar(n) - n.display.barHeight
          }
          function nw(n, i, l) {
            var s = n.options.lineWrapping,
              c = s && Mi(n)
            if (!i.measure.heights || (s && i.measure.width != c)) {
              var d = (i.measure.heights = [])
              if (s) {
                i.measure.width = c
                for (
                  var m = i.text.firstChild.getClientRects(), y = 0;
                  y < m.length - 1;
                  y++
                ) {
                  var x = m[y],
                    _ = m[y + 1]
                  Math.abs(x.bottom - _.bottom) > 2 &&
                    d.push((x.bottom + _.top) / 2 - l.top)
                }
              }
              d.push(l.bottom - l.top)
            }
          }
          function Ed(n, i, l) {
            if (n.line == i)
              return { map: n.measure.map, cache: n.measure.cache }
            if (n.rest) {
              for (var s = 0; s < n.rest.length; s++)
                if (n.rest[s] == i)
                  return { map: n.measure.maps[s], cache: n.measure.caches[s] }
              for (var c = 0; c < n.rest.length; c++)
                if (ae(n.rest[c]) > l)
                  return {
                    map: n.measure.maps[c],
                    cache: n.measure.caches[c],
                    before: !0,
                  }
            }
          }
          function rw(n, i) {
            i = jn(i)
            var l = ae(i),
              s = (n.display.externalMeasured = new wd(n.doc, i, l))
            s.lineN = l
            var c = (s.built = yd(n, s))
            return (s.text = c.pre), z(n.display.lineMeasure, c.pre), s
          }
          function Ld(n, i, l, s) {
            return cr(n, vo(n, i), l, s)
          }
          function tu(n, i) {
            if (i >= n.display.viewFrom && i < n.display.viewTo)
              return n.display.view[Oi(n, i)]
            var l = n.display.externalMeasured
            if (l && i >= l.lineN && i < l.lineN + l.size) return l
          }
          function vo(n, i) {
            var l = ae(i),
              s = tu(n, l)
            s && !s.text
              ? (s = null)
              : s &&
                s.changes &&
                (xd(n, s, l, ou(n)), (n.curOp.forceUpdate = !0)),
              s || (s = rw(n, i))
            var c = Ed(s, i, l)
            return {
              line: i,
              view: s,
              rect: null,
              map: c.map,
              cache: c.cache,
              before: c.before,
              hasHeights: !1,
            }
          }
          function cr(n, i, l, s, c) {
            i.before && (l = -1)
            var d = l + (s || ""),
              m
            return (
              i.cache.hasOwnProperty(d)
                ? (m = i.cache[d])
                : (i.rect || (i.rect = i.view.text.getBoundingClientRect()),
                  i.hasHeights || (nw(n, i.view, i.rect), (i.hasHeights = !0)),
                  (m = ow(n, i, l, s)),
                  m.bogus || (i.cache[d] = m)),
              {
                left: m.left,
                right: m.right,
                top: c ? m.rtop : m.top,
                bottom: c ? m.rbottom : m.bottom,
              }
            )
          }
          var Ad = { left: 0, right: 0, top: 0, bottom: 0 }
          function Md(n, i, l) {
            for (var s, c, d, m, y, x, _ = 0; _ < n.length; _ += 3)
              if (
                ((y = n[_]),
                (x = n[_ + 1]),
                i < y
                  ? ((c = 0), (d = 1), (m = "left"))
                  : i < x
                    ? ((c = i - y), (d = c + 1))
                    : (_ == n.length - 3 || (i == x && n[_ + 3] > i)) &&
                      ((d = x - y), (c = d - 1), i >= x && (m = "right")),
                c != null)
              ) {
                if (
                  ((s = n[_ + 2]),
                  y == x && l == (s.insertLeft ? "left" : "right") && (m = l),
                  l == "left" && c == 0)
                )
                  for (; _ && n[_ - 2] == n[_ - 3] && n[_ - 1].insertLeft; )
                    (s = n[(_ -= 3) + 2]), (m = "left")
                if (l == "right" && c == x - y)
                  for (
                    ;
                    _ < n.length - 3 &&
                    n[_ + 3] == n[_ + 4] &&
                    !n[_ + 5].insertLeft;

                  )
                    (s = n[(_ += 3) + 2]), (m = "right")
                break
              }
            return {
              node: s,
              start: c,
              end: d,
              collapse: m,
              coverStart: y,
              coverEnd: x,
            }
          }
          function iw(n, i) {
            var l = Ad
            if (i == "left")
              for (var s = 0; s < n.length && (l = n[s]).left == l.right; s++);
            else
              for (
                var c = n.length - 1;
                c >= 0 && (l = n[c]).left == l.right;
                c--
              );
            return l
          }
          function ow(n, i, l, s) {
            var c = Md(i.map, l, s),
              d = c.node,
              m = c.start,
              y = c.end,
              x = c.collapse,
              _
            if (d.nodeType == 3) {
              for (var P = 0; P < 4; P++) {
                for (; m && ne(i.line.text.charAt(c.coverStart + m)); ) --m
                for (
                  ;
                  c.coverStart + y < c.coverEnd &&
                  ne(i.line.text.charAt(c.coverStart + y));

                )
                  ++y
                if (
                  (p && g < 9 && m == 0 && y == c.coverEnd - c.coverStart
                    ? (_ = d.parentNode.getBoundingClientRect())
                    : (_ = iw(B(d, m, y).getClientRects(), s)),
                  _.left || _.right || m == 0)
                )
                  break
                ;(y = m), (m = m - 1), (x = "right")
              }
              p && g < 11 && (_ = sw(n.display.measure, _))
            } else {
              m > 0 && (x = s = "right")
              var D
              n.options.lineWrapping && (D = d.getClientRects()).length > 1
                ? (_ = D[s == "right" ? D.length - 1 : 0])
                : (_ = d.getBoundingClientRect())
            }
            if (p && g < 9 && !m && (!_ || (!_.left && !_.right))) {
              var U = d.parentNode.getClientRects()[0]
              U
                ? (_ = {
                    left: U.left,
                    right: U.left + yo(n.display),
                    top: U.top,
                    bottom: U.bottom,
                  })
                : (_ = Ad)
            }
            for (
              var H = _.top - i.rect.top,
                J = _.bottom - i.rect.top,
                it = (H + J) / 2,
                gt = i.view.measure.heights,
                yt = 0;
              yt < gt.length - 1 && !(it < gt[yt]);
              yt++
            );
            var kt = yt ? gt[yt - 1] : 0,
              bt = gt[yt],
              Ct = {
                left: (x == "right" ? _.right : _.left) - i.rect.left,
                right: (x == "left" ? _.left : _.right) - i.rect.left,
                top: kt,
                bottom: bt,
              }
            return (
              !_.left && !_.right && (Ct.bogus = !0),
              n.options.singleCursorHeightPerLine ||
                ((Ct.rtop = H), (Ct.rbottom = J)),
              Ct
            )
          }
          function sw(n, i) {
            if (
              !window.screen ||
              screen.logicalXDPI == null ||
              screen.logicalXDPI == screen.deviceXDPI ||
              !zl(n)
            )
              return i
            var l = screen.logicalXDPI / screen.deviceXDPI,
              s = screen.logicalYDPI / screen.deviceYDPI
            return {
              left: i.left * l,
              right: i.right * l,
              top: i.top * s,
              bottom: i.bottom * s,
            }
          }
          function Nd(n) {
            if (
              n.measure &&
              ((n.measure.cache = {}), (n.measure.heights = null), n.rest)
            )
              for (var i = 0; i < n.rest.length; i++) n.measure.caches[i] = {}
          }
          function Pd(n) {
            ;(n.display.externalMeasure = null), V(n.display.lineMeasure)
            for (var i = 0; i < n.display.view.length; i++)
              Nd(n.display.view[i])
          }
          function Ss(n) {
            Pd(n),
              (n.display.cachedCharWidth =
                n.display.cachedTextHeight =
                n.display.cachedPaddingH =
                  null),
              n.options.lineWrapping || (n.display.maxLineChanged = !0),
              (n.display.lineNumChars = null)
          }
          function Od(n) {
            return w && R
              ? -(
                  n.body.getBoundingClientRect().left -
                  parseInt(getComputedStyle(n.body).marginLeft)
                )
              : n.defaultView.pageXOffset ||
                  (n.documentElement || n.body).scrollLeft
          }
          function Dd(n) {
            return w && R
              ? -(
                  n.body.getBoundingClientRect().top -
                  parseInt(getComputedStyle(n.body).marginTop)
                )
              : n.defaultView.pageYOffset ||
                  (n.documentElement || n.body).scrollTop
          }
          function eu(n) {
            var i = jn(n),
              l = i.widgets,
              s = 0
            if (l)
              for (var c = 0; c < l.length; ++c) l[c].above && (s += _s(l[c]))
            return s
          }
          function Kl(n, i, l, s, c) {
            if (!c) {
              var d = eu(i)
              ;(l.top += d), (l.bottom += d)
            }
            if (s == "line") return l
            s || (s = "local")
            var m = Er(i)
            if (
              (s == "local"
                ? (m += Vl(n.display))
                : (m -= n.display.viewOffset),
              s == "page" || s == "window")
            ) {
              var y = n.display.lineSpace.getBoundingClientRect()
              m += y.top + (s == "window" ? 0 : Dd(Ut(n)))
              var x = y.left + (s == "window" ? 0 : Od(Ut(n)))
              ;(l.left += x), (l.right += x)
            }
            return (l.top += m), (l.bottom += m), l
          }
          function $d(n, i, l) {
            if (l == "div") return i
            var s = i.left,
              c = i.top
            if (l == "page") (s -= Od(Ut(n))), (c -= Dd(Ut(n)))
            else if (l == "local" || !l) {
              var d = n.display.sizer.getBoundingClientRect()
              ;(s += d.left), (c += d.top)
            }
            var m = n.display.lineSpace.getBoundingClientRect()
            return { left: s - m.left, top: c - m.top }
          }
          function Xl(n, i, l, s, c) {
            return s || (s = Lt(n.doc, i.line)), Kl(n, s, Ld(n, s, i.ch, c), l)
          }
          function Gn(n, i, l, s, c, d) {
            ;(s = s || Lt(n.doc, i.line)), c || (c = vo(n, s))
            function m(J, it) {
              var gt = cr(n, c, J, it ? "right" : "left", d)
              return (
                it ? (gt.left = gt.right) : (gt.right = gt.left),
                Kl(n, s, gt, l)
              )
            }
            var y = ye(s, n.doc.direction),
              x = i.ch,
              _ = i.sticky
            if (
              (x >= s.text.length
                ? ((x = s.text.length), (_ = "before"))
                : x <= 0 && ((x = 0), (_ = "after")),
              !y)
            )
              return m(_ == "before" ? x - 1 : x, _ == "before")
            function P(J, it, gt) {
              var yt = y[it],
                kt = yt.level == 1
              return m(gt ? J - 1 : J, kt != gt)
            }
            var D = We(y, x, _),
              U = Nn,
              H = P(x, D, _ == "before")
            return U != null && (H.other = P(x, U, _ != "before")), H
          }
          function Rd(n, i) {
            var l = 0
            ;(i = Ht(n.doc, i)),
              n.options.lineWrapping || (l = yo(n.display) * i.ch)
            var s = Lt(n.doc, i.line),
              c = Er(s) + Vl(n.display)
            return { left: l, right: l, top: c, bottom: c + s.height }
          }
          function nu(n, i, l, s, c) {
            var d = F(n, i, l)
            return (d.xRel = c), s && (d.outside = s), d
          }
          function ru(n, i, l) {
            var s = n.doc
            if (((l += n.display.viewOffset), l < 0))
              return nu(s.first, 0, null, -1, -1)
            var c = sr(s, l),
              d = s.first + s.size - 1
            if (c > d)
              return nu(s.first + s.size - 1, Lt(s, d).text.length, null, 1, 1)
            i < 0 && (i = 0)
            for (var m = Lt(s, c); ; ) {
              var y = lw(n, m, c, i, l),
                x = $b(m, y.ch + (y.xRel > 0 || y.outside > 0 ? 1 : 0))
              if (!x) return y
              var _ = x.find(1)
              if (_.line == c) return _
              m = Lt(s, (c = _.line))
            }
          }
          function zd(n, i, l, s) {
            s -= eu(i)
            var c = i.text.length,
              d = te(
                function (m) {
                  return cr(n, l, m - 1).bottom <= s
                },
                c,
                0,
              )
            return (
              (c = te(
                function (m) {
                  return cr(n, l, m).top > s
                },
                d,
                c,
              )),
              { begin: d, end: c }
            )
          }
          function Fd(n, i, l, s) {
            l || (l = vo(n, i))
            var c = Kl(n, i, cr(n, l, s), "line").top
            return zd(n, i, l, c)
          }
          function iu(n, i, l, s) {
            return n.bottom <= l
              ? !1
              : n.top > l
                ? !0
                : (s ? n.left : n.right) > i
          }
          function lw(n, i, l, s, c) {
            c -= Er(i)
            var d = vo(n, i),
              m = eu(i),
              y = 0,
              x = i.text.length,
              _ = !0,
              P = ye(i, n.doc.direction)
            if (P) {
              var D = (n.options.lineWrapping ? cw : aw)(n, i, l, d, P, s, c)
              ;(_ = D.level != 1),
                (y = _ ? D.from : D.to - 1),
                (x = _ ? D.to : D.from - 1)
            }
            var U = null,
              H = null,
              J = te(
                function ($t) {
                  var Pt = cr(n, d, $t)
                  return (
                    (Pt.top += m),
                    (Pt.bottom += m),
                    iu(Pt, s, c, !1)
                      ? (Pt.top <= c && Pt.left <= s && ((U = $t), (H = Pt)),
                        !0)
                      : !1
                  )
                },
                y,
                x,
              ),
              it,
              gt,
              yt = !1
            if (H) {
              var kt = s - H.left < H.right - s,
                bt = kt == _
              ;(J = U + (bt ? 0 : 1)),
                (gt = bt ? "after" : "before"),
                (it = kt ? H.left : H.right)
            } else {
              !_ && (J == x || J == y) && J++,
                (gt =
                  J == 0
                    ? "after"
                    : J == i.text.length
                      ? "before"
                      : cr(n, d, J - (_ ? 1 : 0)).bottom + m <= c == _
                        ? "after"
                        : "before")
              var Ct = Gn(n, F(l, J, gt), "line", i, d)
              ;(it = Ct.left), (yt = c < Ct.top ? -1 : c >= Ct.bottom ? 1 : 0)
            }
            return (J = ue(i.text, J, 1)), nu(l, J, gt, yt, s - it)
          }
          function aw(n, i, l, s, c, d, m) {
            var y = te(
                function (D) {
                  var U = c[D],
                    H = U.level != 1
                  return iu(
                    Gn(
                      n,
                      F(l, H ? U.to : U.from, H ? "before" : "after"),
                      "line",
                      i,
                      s,
                    ),
                    d,
                    m,
                    !0,
                  )
                },
                0,
                c.length - 1,
              ),
              x = c[y]
            if (y > 0) {
              var _ = x.level != 1,
                P = Gn(
                  n,
                  F(l, _ ? x.from : x.to, _ ? "after" : "before"),
                  "line",
                  i,
                  s,
                )
              iu(P, d, m, !0) && P.top > m && (x = c[y - 1])
            }
            return x
          }
          function cw(n, i, l, s, c, d, m) {
            var y = zd(n, i, s, m),
              x = y.begin,
              _ = y.end
            ;/\s/.test(i.text.charAt(_ - 1)) && _--
            for (var P = null, D = null, U = 0; U < c.length; U++) {
              var H = c[U]
              if (!(H.from >= _ || H.to <= x)) {
                var J = H.level != 1,
                  it = cr(
                    n,
                    s,
                    J ? Math.min(_, H.to) - 1 : Math.max(x, H.from),
                  ).right,
                  gt = it < d ? d - it + 1e9 : it - d
                ;(!P || D > gt) && ((P = H), (D = gt))
              }
            }
            return (
              P || (P = c[c.length - 1]),
              P.from < x && (P = { from: x, to: P.to, level: P.level }),
              P.to > _ && (P = { from: P.from, to: _, level: P.level }),
              P
            )
          }
          var Ni
          function mo(n) {
            if (n.cachedTextHeight != null) return n.cachedTextHeight
            if (Ni == null) {
              Ni = k("pre", null, "CodeMirror-line-like")
              for (var i = 0; i < 49; ++i)
                Ni.appendChild(document.createTextNode("x")),
                  Ni.appendChild(k("br"))
              Ni.appendChild(document.createTextNode("x"))
            }
            z(n.measure, Ni)
            var l = Ni.offsetHeight / 50
            return l > 3 && (n.cachedTextHeight = l), V(n.measure), l || 1
          }
          function yo(n) {
            if (n.cachedCharWidth != null) return n.cachedCharWidth
            var i = k("span", "xxxxxxxxxx"),
              l = k("pre", [i], "CodeMirror-line-like")
            z(n.measure, l)
            var s = i.getBoundingClientRect(),
              c = (s.right - s.left) / 10
            return c > 2 && (n.cachedCharWidth = c), c || 10
          }
          function ou(n) {
            for (
              var i = n.display,
                l = {},
                s = {},
                c = i.gutters.clientLeft,
                d = i.gutters.firstChild,
                m = 0;
              d;
              d = d.nextSibling, ++m
            ) {
              var y = n.display.gutterSpecs[m].className
              ;(l[y] = d.offsetLeft + d.clientLeft + c), (s[y] = d.clientWidth)
            }
            return {
              fixedPos: su(i),
              gutterTotalWidth: i.gutters.offsetWidth,
              gutterLeft: l,
              gutterWidth: s,
              wrapperWidth: i.wrapper.clientWidth,
            }
          }
          function su(n) {
            return (
              n.scroller.getBoundingClientRect().left -
              n.sizer.getBoundingClientRect().left
            )
          }
          function Id(n) {
            var i = mo(n.display),
              l = n.options.lineWrapping,
              s =
                l &&
                Math.max(5, n.display.scroller.clientWidth / yo(n.display) - 3)
            return function (c) {
              if (Qr(n.doc, c)) return 0
              var d = 0
              if (c.widgets)
                for (var m = 0; m < c.widgets.length; m++)
                  c.widgets[m].height && (d += c.widgets[m].height)
              return l ? d + (Math.ceil(c.text.length / s) || 1) * i : d + i
            }
          }
          function lu(n) {
            var i = n.doc,
              l = Id(n)
            i.iter(function (s) {
              var c = l(s)
              c != s.height && In(s, c)
            })
          }
          function Pi(n, i, l, s) {
            var c = n.display
            if (!l && sn(i).getAttribute("cm-not-content") == "true")
              return null
            var d,
              m,
              y = c.lineSpace.getBoundingClientRect()
            try {
              ;(d = i.clientX - y.left), (m = i.clientY - y.top)
            } catch {
              return null
            }
            var x = ru(n, d, m),
              _
            if (
              s &&
              x.xRel > 0 &&
              (_ = Lt(n.doc, x.line).text).length == x.ch
            ) {
              var P = j(_, _.length, n.options.tabSize) - _.length
              x = F(
                x.line,
                Math.max(
                  0,
                  Math.round((d - Td(n.display).left) / yo(n.display)) - P,
                ),
              )
            }
            return x
          }
          function Oi(n, i) {
            if (i >= n.display.viewTo || ((i -= n.display.viewFrom), i < 0))
              return null
            for (var l = n.display.view, s = 0; s < l.length; s++)
              if (((i -= l[s].size), i < 0)) return s
          }
          function ln(n, i, l, s) {
            i == null && (i = n.doc.first),
              l == null && (l = n.doc.first + n.doc.size),
              s || (s = 0)
            var c = n.display
            if (
              (s &&
                l < c.viewTo &&
                (c.updateLineNumbers == null || c.updateLineNumbers > i) &&
                (c.updateLineNumbers = i),
              (n.curOp.viewChanged = !0),
              i >= c.viewTo)
            )
              Tr && Kc(n.doc, i) < c.viewTo && ei(n)
            else if (l <= c.viewFrom)
              Tr && vd(n.doc, l + s) > c.viewFrom
                ? ei(n)
                : ((c.viewFrom += s), (c.viewTo += s))
            else if (i <= c.viewFrom && l >= c.viewTo) ei(n)
            else if (i <= c.viewFrom) {
              var d = Yl(n, l, l + s, 1)
              d
                ? ((c.view = c.view.slice(d.index)),
                  (c.viewFrom = d.lineN),
                  (c.viewTo += s))
                : ei(n)
            } else if (l >= c.viewTo) {
              var m = Yl(n, i, i, -1)
              m
                ? ((c.view = c.view.slice(0, m.index)), (c.viewTo = m.lineN))
                : ei(n)
            } else {
              var y = Yl(n, i, i, -1),
                x = Yl(n, l, l + s, 1)
              y && x
                ? ((c.view = c.view
                    .slice(0, y.index)
                    .concat(Gl(n, y.lineN, x.lineN))
                    .concat(c.view.slice(x.index))),
                  (c.viewTo += s))
                : ei(n)
            }
            var _ = c.externalMeasured
            _ &&
              (l < _.lineN
                ? (_.lineN += s)
                : i < _.lineN + _.size && (c.externalMeasured = null))
          }
          function ti(n, i, l) {
            n.curOp.viewChanged = !0
            var s = n.display,
              c = n.display.externalMeasured
            if (
              (c &&
                i >= c.lineN &&
                i < c.lineN + c.size &&
                (s.externalMeasured = null),
              !(i < s.viewFrom || i >= s.viewTo))
            ) {
              var d = s.view[Oi(n, i)]
              if (d.node != null) {
                var m = d.changes || (d.changes = [])
                rt(m, l) == -1 && m.push(l)
              }
            }
          }
          function ei(n) {
            ;(n.display.viewFrom = n.display.viewTo = n.doc.first),
              (n.display.view = []),
              (n.display.viewOffset = 0)
          }
          function Yl(n, i, l, s) {
            var c = Oi(n, i),
              d,
              m = n.display.view
            if (!Tr || l == n.doc.first + n.doc.size)
              return { index: c, lineN: l }
            for (var y = n.display.viewFrom, x = 0; x < c; x++) y += m[x].size
            if (y != i) {
              if (s > 0) {
                if (c == m.length - 1) return null
                ;(d = y + m[c].size - i), c++
              } else d = y - i
              ;(i += d), (l += d)
            }
            for (; Kc(n.doc, l) != l; ) {
              if (c == (s < 0 ? 0 : m.length - 1)) return null
              ;(l += s * m[c - (s < 0 ? 1 : 0)].size), (c += s)
            }
            return { index: c, lineN: l }
          }
          function uw(n, i, l) {
            var s = n.display,
              c = s.view
            c.length == 0 || i >= s.viewTo || l <= s.viewFrom
              ? ((s.view = Gl(n, i, l)), (s.viewFrom = i))
              : (s.viewFrom > i
                  ? (s.view = Gl(n, i, s.viewFrom).concat(s.view))
                  : s.viewFrom < i && (s.view = s.view.slice(Oi(n, i))),
                (s.viewFrom = i),
                s.viewTo < l
                  ? (s.view = s.view.concat(Gl(n, s.viewTo, l)))
                  : s.viewTo > l && (s.view = s.view.slice(0, Oi(n, l)))),
              (s.viewTo = l)
          }
          function qd(n) {
            for (var i = n.display.view, l = 0, s = 0; s < i.length; s++) {
              var c = i[s]
              !c.hidden && (!c.node || c.changes) && ++l
            }
            return l
          }
          function ks(n) {
            n.display.input.showSelection(n.display.input.prepareSelection())
          }
          function Hd(n, i) {
            i === void 0 && (i = !0)
            var l = n.doc,
              s = {},
              c = (s.cursors = document.createDocumentFragment()),
              d = (s.selection = document.createDocumentFragment()),
              m = n.options.$customCursor
            m && (i = !0)
            for (var y = 0; y < l.sel.ranges.length; y++)
              if (!(!i && y == l.sel.primIndex)) {
                var x = l.sel.ranges[y]
                if (
                  !(
                    x.from().line >= n.display.viewTo ||
                    x.to().line < n.display.viewFrom
                  )
                ) {
                  var _ = x.empty()
                  if (m) {
                    var P = m(n, x)
                    P && au(n, P, c)
                  } else
                    (_ || n.options.showCursorWhenSelecting) && au(n, x.head, c)
                  _ || fw(n, x, d)
                }
              }
            return s
          }
          function au(n, i, l) {
            var s = Gn(
                n,
                i,
                "div",
                null,
                null,
                !n.options.singleCursorHeightPerLine,
              ),
              c = l.appendChild(k("div", " ", "CodeMirror-cursor"))
            if (
              ((c.style.left = s.left + "px"),
              (c.style.top = s.top + "px"),
              (c.style.height =
                Math.max(0, s.bottom - s.top) * n.options.cursorHeight + "px"),
              /\bcm-fat-cursor\b/.test(n.getWrapperElement().className))
            ) {
              var d = Xl(n, i, "div", null, null),
                m = d.right - d.left
              c.style.width = (m > 0 ? m : n.defaultCharWidth()) + "px"
            }
            if (s.other) {
              var y = l.appendChild(
                k("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"),
              )
              ;(y.style.display = ""),
                (y.style.left = s.other.left + "px"),
                (y.style.top = s.other.top + "px"),
                (y.style.height = (s.other.bottom - s.other.top) * 0.85 + "px")
            }
          }
          function Zl(n, i) {
            return n.top - i.top || n.left - i.left
          }
          function fw(n, i, l) {
            var s = n.display,
              c = n.doc,
              d = document.createDocumentFragment(),
              m = Td(n.display),
              y = m.left,
              x = Math.max(s.sizerWidth, Mi(n) - s.sizer.offsetLeft) - m.right,
              _ = c.direction == "ltr"
            function P(bt, Ct, $t, Pt) {
              Ct < 0 && (Ct = 0),
                (Ct = Math.round(Ct)),
                (Pt = Math.round(Pt)),
                d.appendChild(
                  k(
                    "div",
                    null,
                    "CodeMirror-selected",
                    "position: absolute; left: " +
                      bt +
                      `px;
                             top: ` +
                      Ct +
                      "px; width: " +
                      ($t ?? x - bt) +
                      `px;
                             height: ` +
                      (Pt - Ct) +
                      "px",
                  ),
                )
            }
            function D(bt, Ct, $t) {
              var Pt = Lt(c, bt),
                jt = Pt.text.length,
                ge,
                He
              function Se(Me, un) {
                return Xl(n, F(bt, Me), "div", Pt, un)
              }
              function _n(Me, un, Ue) {
                var De = Fd(n, Pt, null, Me),
                  Ne = (un == "ltr") == (Ue == "after") ? "left" : "right",
                  Ee =
                    Ue == "after"
                      ? De.begin
                      : De.end - (/\s/.test(Pt.text.charAt(De.end - 1)) ? 2 : 1)
                return Se(Ee, Ne)[Ne]
              }
              var cn = ye(Pt, c.direction)
              return (
                bn(cn, Ct || 0, $t ?? jt, function (Me, un, Ue, De) {
                  var Ne = Ue == "ltr",
                    Ee = Se(Me, Ne ? "left" : "right"),
                    fn = Se(un - 1, Ne ? "right" : "left"),
                    No = Ct == null && Me == 0,
                    li = $t == null && un == jt,
                    Ye = De == 0,
                    ur = !cn || De == cn.length - 1
                  if (fn.top - Ee.top <= 3) {
                    var Be = (_ ? No : li) && Ye,
                      $u = (_ ? li : No) && ur,
                      Nr = Be ? y : (Ne ? Ee : fn).left,
                      Fi = $u ? x : (Ne ? fn : Ee).right
                    P(Nr, Ee.top, Fi - Nr, Ee.bottom)
                  } else {
                    var Ii, en, Po, Ru
                    Ne
                      ? ((Ii = _ && No && Ye ? y : Ee.left),
                        (en = _ ? x : _n(Me, Ue, "before")),
                        (Po = _ ? y : _n(un, Ue, "after")),
                        (Ru = _ && li && ur ? x : fn.right))
                      : ((Ii = _ ? _n(Me, Ue, "before") : y),
                        (en = !_ && No && Ye ? x : Ee.right),
                        (Po = !_ && li && ur ? y : fn.left),
                        (Ru = _ ? _n(un, Ue, "after") : x)),
                      P(Ii, Ee.top, en - Ii, Ee.bottom),
                      Ee.bottom < fn.top && P(y, Ee.bottom, null, fn.top),
                      P(Po, fn.top, Ru - Po, fn.bottom)
                  }
                  ;(!ge || Zl(Ee, ge) < 0) && (ge = Ee),
                    Zl(fn, ge) < 0 && (ge = fn),
                    (!He || Zl(Ee, He) < 0) && (He = Ee),
                    Zl(fn, He) < 0 && (He = fn)
                }),
                { start: ge, end: He }
              )
            }
            var U = i.from(),
              H = i.to()
            if (U.line == H.line) D(U.line, U.ch, H.ch)
            else {
              var J = Lt(c, U.line),
                it = Lt(c, H.line),
                gt = jn(J) == jn(it),
                yt = D(U.line, U.ch, gt ? J.text.length + 1 : null).end,
                kt = D(H.line, gt ? 0 : null, H.ch).start
              gt &&
                (yt.top < kt.top - 2
                  ? (P(yt.right, yt.top, null, yt.bottom),
                    P(y, kt.top, kt.left, kt.bottom))
                  : P(yt.right, yt.top, kt.left - yt.right, yt.bottom)),
                yt.bottom < kt.top && P(y, yt.bottom, null, kt.top)
            }
            l.appendChild(d)
          }
          function cu(n) {
            if (n.state.focused) {
              var i = n.display
              clearInterval(i.blinker)
              var l = !0
              ;(i.cursorDiv.style.visibility = ""),
                n.options.cursorBlinkRate > 0
                  ? (i.blinker = setInterval(function () {
                      n.hasFocus() || bo(n),
                        (i.cursorDiv.style.visibility = (l = !l)
                          ? ""
                          : "hidden")
                    }, n.options.cursorBlinkRate))
                  : n.options.cursorBlinkRate < 0 &&
                    (i.cursorDiv.style.visibility = "hidden")
            }
          }
          function Bd(n) {
            n.hasFocus() || (n.display.input.focus(), n.state.focused || fu(n))
          }
          function uu(n) {
            ;(n.state.delayingBlurEvent = !0),
              setTimeout(function () {
                n.state.delayingBlurEvent &&
                  ((n.state.delayingBlurEvent = !1), n.state.focused && bo(n))
              }, 100)
          }
          function fu(n, i) {
            n.state.delayingBlurEvent &&
              !n.state.draggingText &&
              (n.state.delayingBlurEvent = !1),
              n.options.readOnly != "nocursor" &&
                (n.state.focused ||
                  (me(n, "focus", n, i),
                  (n.state.focused = !0),
                  Et(n.display.wrapper, "CodeMirror-focused"),
                  !n.curOp &&
                    n.display.selForContextMenu != n.doc.sel &&
                    (n.display.input.reset(),
                    v &&
                      setTimeout(function () {
                        return n.display.input.reset(!0)
                      }, 20)),
                  n.display.input.receivedFocus()),
                cu(n))
          }
          function bo(n, i) {
            n.state.delayingBlurEvent ||
              (n.state.focused &&
                (me(n, "blur", n, i),
                (n.state.focused = !1),
                pt(n.display.wrapper, "CodeMirror-focused")),
              clearInterval(n.display.blinker),
              setTimeout(function () {
                n.state.focused || (n.display.shift = !1)
              }, 150))
          }
          function Jl(n) {
            for (
              var i = n.display,
                l = i.lineDiv.offsetTop,
                s = Math.max(0, i.scroller.getBoundingClientRect().top),
                c = i.lineDiv.getBoundingClientRect().top,
                d = 0,
                m = 0;
              m < i.view.length;
              m++
            ) {
              var y = i.view[m],
                x = n.options.lineWrapping,
                _ = void 0,
                P = 0
              if (!y.hidden) {
                if (((c += y.line.height), p && g < 8)) {
                  var D = y.node.offsetTop + y.node.offsetHeight
                  ;(_ = D - l), (l = D)
                } else {
                  var U = y.node.getBoundingClientRect()
                  ;(_ = U.bottom - U.top),
                    !x &&
                      y.text.firstChild &&
                      (P =
                        y.text.firstChild.getBoundingClientRect().right -
                        U.left -
                        1)
                }
                var H = y.line.height - _
                if (
                  (H > 0.005 || H < -0.005) &&
                  (c < s && (d -= H), In(y.line, _), Wd(y.line), y.rest)
                )
                  for (var J = 0; J < y.rest.length; J++) Wd(y.rest[J])
                if (P > n.display.sizerWidth) {
                  var it = Math.ceil(P / yo(n.display))
                  it > n.display.maxLineLength &&
                    ((n.display.maxLineLength = it),
                    (n.display.maxLine = y.line),
                    (n.display.maxLineChanged = !0))
                }
              }
            }
            Math.abs(d) > 2 && (i.scroller.scrollTop += d)
          }
          function Wd(n) {
            if (n.widgets)
              for (var i = 0; i < n.widgets.length; ++i) {
                var l = n.widgets[i],
                  s = l.node.parentNode
                s && (l.height = s.offsetHeight)
              }
          }
          function Ql(n, i, l) {
            var s =
              l && l.top != null ? Math.max(0, l.top) : n.scroller.scrollTop
            s = Math.floor(s - Vl(n))
            var c =
                l && l.bottom != null ? l.bottom : s + n.wrapper.clientHeight,
              d = sr(i, s),
              m = sr(i, c)
            if (l && l.ensure) {
              var y = l.ensure.from.line,
                x = l.ensure.to.line
              y < d
                ? ((d = y), (m = sr(i, Er(Lt(i, y)) + n.wrapper.clientHeight)))
                : Math.min(x, i.lastLine()) >= m &&
                  ((d = sr(i, Er(Lt(i, x)) - n.wrapper.clientHeight)), (m = x))
            }
            return { from: d, to: Math.max(m, d + 1) }
          }
          function hw(n, i) {
            if (!Ce(n, "scrollCursorIntoView")) {
              var l = n.display,
                s = l.sizer.getBoundingClientRect(),
                c = null,
                d = l.wrapper.ownerDocument
              if (
                (i.top + s.top < 0
                  ? (c = !0)
                  : i.bottom + s.top >
                      (d.defaultView.innerHeight ||
                        d.documentElement.clientHeight) && (c = !1),
                c != null && !T)
              ) {
                var m = k(
                  "div",
                  "​",
                  null,
                  `position: absolute;
                         top: ` +
                    (i.top - l.viewOffset - Vl(n.display)) +
                    `px;
                         height: ` +
                    (i.bottom - i.top + ar(n) + l.barHeight) +
                    `px;
                         left: ` +
                    i.left +
                    "px; width: " +
                    Math.max(2, i.right - i.left) +
                    "px;",
                )
                n.display.lineSpace.appendChild(m),
                  m.scrollIntoView(c),
                  n.display.lineSpace.removeChild(m)
              }
            }
          }
          function dw(n, i, l, s) {
            s == null && (s = 0)
            var c
            !n.options.lineWrapping &&
              i == l &&
              ((l = i.sticky == "before" ? F(i.line, i.ch + 1, "before") : i),
              (i = i.ch
                ? F(i.line, i.sticky == "before" ? i.ch - 1 : i.ch, "after")
                : i))
            for (var d = 0; d < 5; d++) {
              var m = !1,
                y = Gn(n, i),
                x = !l || l == i ? y : Gn(n, l)
              c = {
                left: Math.min(y.left, x.left),
                top: Math.min(y.top, x.top) - s,
                right: Math.max(y.left, x.left),
                bottom: Math.max(y.bottom, x.bottom) + s,
              }
              var _ = hu(n, c),
                P = n.doc.scrollTop,
                D = n.doc.scrollLeft
              if (
                (_.scrollTop != null &&
                  (Ts(n, _.scrollTop),
                  Math.abs(n.doc.scrollTop - P) > 1 && (m = !0)),
                _.scrollLeft != null &&
                  (Di(n, _.scrollLeft),
                  Math.abs(n.doc.scrollLeft - D) > 1 && (m = !0)),
                !m)
              )
                break
            }
            return c
          }
          function pw(n, i) {
            var l = hu(n, i)
            l.scrollTop != null && Ts(n, l.scrollTop),
              l.scrollLeft != null && Di(n, l.scrollLeft)
          }
          function hu(n, i) {
            var l = n.display,
              s = mo(n.display)
            i.top < 0 && (i.top = 0)
            var c =
                n.curOp && n.curOp.scrollTop != null
                  ? n.curOp.scrollTop
                  : l.scroller.scrollTop,
              d = Qc(n),
              m = {}
            i.bottom - i.top > d && (i.bottom = i.top + d)
            var y = n.doc.height + Jc(l),
              x = i.top < s,
              _ = i.bottom > y - s
            if (i.top < c) m.scrollTop = x ? 0 : i.top
            else if (i.bottom > c + d) {
              var P = Math.min(i.top, (_ ? y : i.bottom) - d)
              P != c && (m.scrollTop = P)
            }
            var D = n.options.fixedGutter ? 0 : l.gutters.offsetWidth,
              U =
                n.curOp && n.curOp.scrollLeft != null
                  ? n.curOp.scrollLeft
                  : l.scroller.scrollLeft - D,
              H = Mi(n) - l.gutters.offsetWidth,
              J = i.right - i.left > H
            return (
              J && (i.right = i.left + H),
              i.left < 10
                ? (m.scrollLeft = 0)
                : i.left < U
                  ? (m.scrollLeft = Math.max(0, i.left + D - (J ? 0 : 10)))
                  : i.right > H + U - 3 &&
                    (m.scrollLeft = i.right + (J ? 0 : 10) - H),
              m
            )
          }
          function du(n, i) {
            i != null &&
              (ta(n),
              (n.curOp.scrollTop =
                (n.curOp.scrollTop == null
                  ? n.doc.scrollTop
                  : n.curOp.scrollTop) + i))
          }
          function wo(n) {
            ta(n)
            var i = n.getCursor()
            n.curOp.scrollToPos = {
              from: i,
              to: i,
              margin: n.options.cursorScrollMargin,
            }
          }
          function Cs(n, i, l) {
            ;(i != null || l != null) && ta(n),
              i != null && (n.curOp.scrollLeft = i),
              l != null && (n.curOp.scrollTop = l)
          }
          function gw(n, i) {
            ta(n), (n.curOp.scrollToPos = i)
          }
          function ta(n) {
            var i = n.curOp.scrollToPos
            if (i) {
              n.curOp.scrollToPos = null
              var l = Rd(n, i.from),
                s = Rd(n, i.to)
              Ud(n, l, s, i.margin)
            }
          }
          function Ud(n, i, l, s) {
            var c = hu(n, {
              left: Math.min(i.left, l.left),
              top: Math.min(i.top, l.top) - s,
              right: Math.max(i.right, l.right),
              bottom: Math.max(i.bottom, l.bottom) + s,
            })
            Cs(n, c.scrollLeft, c.scrollTop)
          }
          function Ts(n, i) {
            Math.abs(n.doc.scrollTop - i) < 2 ||
              (a || gu(n, { top: i }), jd(n, i, !0), a && gu(n), As(n, 100))
          }
          function jd(n, i, l) {
            ;(i = Math.max(
              0,
              Math.min(
                n.display.scroller.scrollHeight -
                  n.display.scroller.clientHeight,
                i,
              ),
            )),
              !(n.display.scroller.scrollTop == i && !l) &&
                ((n.doc.scrollTop = i),
                n.display.scrollbars.setScrollTop(i),
                n.display.scroller.scrollTop != i &&
                  (n.display.scroller.scrollTop = i))
          }
          function Di(n, i, l, s) {
            ;(i = Math.max(
              0,
              Math.min(
                i,
                n.display.scroller.scrollWidth - n.display.scroller.clientWidth,
              ),
            )),
              !(
                (l
                  ? i == n.doc.scrollLeft
                  : Math.abs(n.doc.scrollLeft - i) < 2) && !s
              ) &&
                ((n.doc.scrollLeft = i),
                Yd(n),
                n.display.scroller.scrollLeft != i &&
                  (n.display.scroller.scrollLeft = i),
                n.display.scrollbars.setScrollLeft(i))
          }
          function Es(n) {
            var i = n.display,
              l = i.gutters.offsetWidth,
              s = Math.round(n.doc.height + Jc(n.display))
            return {
              clientHeight: i.scroller.clientHeight,
              viewHeight: i.wrapper.clientHeight,
              scrollWidth: i.scroller.scrollWidth,
              clientWidth: i.scroller.clientWidth,
              viewWidth: i.wrapper.clientWidth,
              barLeft: n.options.fixedGutter ? l : 0,
              docHeight: s,
              scrollHeight: s + ar(n) + i.barHeight,
              nativeBarWidth: i.nativeBarWidth,
              gutterWidth: l,
            }
          }
          var $i = function (n, i, l) {
            this.cm = l
            var s = (this.vert = k(
                "div",
                [k("div", null, null, "min-width: 1px")],
                "CodeMirror-vscrollbar",
              )),
              c = (this.horiz = k(
                "div",
                [k("div", null, null, "height: 100%; min-height: 1px")],
                "CodeMirror-hscrollbar",
              ))
            ;(s.tabIndex = c.tabIndex = -1),
              n(s),
              n(c),
              wt(s, "scroll", function () {
                s.clientHeight && i(s.scrollTop, "vertical")
              }),
              wt(c, "scroll", function () {
                c.clientWidth && i(c.scrollLeft, "horizontal")
              }),
              (this.checkedZeroWidth = !1),
              p &&
                g < 8 &&
                (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
          }
          ;($i.prototype.update = function (n) {
            var i = n.scrollWidth > n.clientWidth + 1,
              l = n.scrollHeight > n.clientHeight + 1,
              s = n.nativeBarWidth
            if (l) {
              ;(this.vert.style.display = "block"),
                (this.vert.style.bottom = i ? s + "px" : "0")
              var c = n.viewHeight - (i ? s : 0)
              this.vert.firstChild.style.height =
                Math.max(0, n.scrollHeight - n.clientHeight + c) + "px"
            } else
              (this.vert.scrollTop = 0),
                (this.vert.style.display = ""),
                (this.vert.firstChild.style.height = "0")
            if (i) {
              ;(this.horiz.style.display = "block"),
                (this.horiz.style.right = l ? s + "px" : "0"),
                (this.horiz.style.left = n.barLeft + "px")
              var d = n.viewWidth - n.barLeft - (l ? s : 0)
              this.horiz.firstChild.style.width =
                Math.max(0, n.scrollWidth - n.clientWidth + d) + "px"
            } else
              (this.horiz.style.display = ""),
                (this.horiz.firstChild.style.width = "0")
            return (
              !this.checkedZeroWidth &&
                n.clientHeight > 0 &&
                (s == 0 && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
              { right: l ? s : 0, bottom: i ? s : 0 }
            )
          }),
            ($i.prototype.setScrollLeft = function (n) {
              this.horiz.scrollLeft != n && (this.horiz.scrollLeft = n),
                this.disableHoriz &&
                  this.enableZeroWidthBar(
                    this.horiz,
                    this.disableHoriz,
                    "horiz",
                  )
            }),
            ($i.prototype.setScrollTop = function (n) {
              this.vert.scrollTop != n && (this.vert.scrollTop = n),
                this.disableVert &&
                  this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
            }),
            ($i.prototype.zeroWidthHack = function () {
              var n = W && !A ? "12px" : "18px"
              ;(this.horiz.style.height = this.vert.style.width = n),
                (this.horiz.style.visibility = this.vert.style.visibility =
                  "hidden"),
                (this.disableHoriz = new nt()),
                (this.disableVert = new nt())
            }),
            ($i.prototype.enableZeroWidthBar = function (n, i, l) {
              n.style.visibility = ""
              function s() {
                var c = n.getBoundingClientRect(),
                  d =
                    l == "vert"
                      ? document.elementFromPoint(
                          c.right - 1,
                          (c.top + c.bottom) / 2,
                        )
                      : document.elementFromPoint(
                          (c.right + c.left) / 2,
                          c.bottom - 1,
                        )
                d != n ? (n.style.visibility = "hidden") : i.set(1e3, s)
              }
              i.set(1e3, s)
            }),
            ($i.prototype.clear = function () {
              var n = this.horiz.parentNode
              n.removeChild(this.horiz), n.removeChild(this.vert)
            })
          var Ls = function () {}
          ;(Ls.prototype.update = function () {
            return { bottom: 0, right: 0 }
          }),
            (Ls.prototype.setScrollLeft = function () {}),
            (Ls.prototype.setScrollTop = function () {}),
            (Ls.prototype.clear = function () {})
          function xo(n, i) {
            i || (i = Es(n))
            var l = n.display.barWidth,
              s = n.display.barHeight
            Gd(n, i)
            for (
              var c = 0;
              (c < 4 && l != n.display.barWidth) || s != n.display.barHeight;
              c++
            )
              l != n.display.barWidth && n.options.lineWrapping && Jl(n),
                Gd(n, Es(n)),
                (l = n.display.barWidth),
                (s = n.display.barHeight)
          }
          function Gd(n, i) {
            var l = n.display,
              s = l.scrollbars.update(i)
            ;(l.sizer.style.paddingRight = (l.barWidth = s.right) + "px"),
              (l.sizer.style.paddingBottom = (l.barHeight = s.bottom) + "px"),
              (l.heightForcer.style.borderBottom =
                s.bottom + "px solid transparent"),
              s.right && s.bottom
                ? ((l.scrollbarFiller.style.display = "block"),
                  (l.scrollbarFiller.style.height = s.bottom + "px"),
                  (l.scrollbarFiller.style.width = s.right + "px"))
                : (l.scrollbarFiller.style.display = ""),
              s.bottom &&
              n.options.coverGutterNextToScrollbar &&
              n.options.fixedGutter
                ? ((l.gutterFiller.style.display = "block"),
                  (l.gutterFiller.style.height = s.bottom + "px"),
                  (l.gutterFiller.style.width = i.gutterWidth + "px"))
                : (l.gutterFiller.style.display = "")
          }
          var Vd = { native: $i, null: Ls }
          function Kd(n) {
            n.display.scrollbars &&
              (n.display.scrollbars.clear(),
              n.display.scrollbars.addClass &&
                pt(n.display.wrapper, n.display.scrollbars.addClass)),
              (n.display.scrollbars = new Vd[n.options.scrollbarStyle](
                function (i) {
                  n.display.wrapper.insertBefore(i, n.display.scrollbarFiller),
                    wt(i, "mousedown", function () {
                      n.state.focused &&
                        setTimeout(function () {
                          return n.display.input.focus()
                        }, 0)
                    }),
                    i.setAttribute("cm-not-content", "true")
                },
                function (i, l) {
                  l == "horizontal" ? Di(n, i) : Ts(n, i)
                },
                n,
              )),
              n.display.scrollbars.addClass &&
                Et(n.display.wrapper, n.display.scrollbars.addClass)
          }
          var vw = 0
          function Ri(n) {
            ;(n.curOp = {
              cm: n,
              viewChanged: !1,
              startHeight: n.doc.height,
              forceUpdate: !1,
              updateInput: 0,
              typing: !1,
              changeObjs: null,
              cursorActivityHandlers: null,
              cursorActivityCalled: 0,
              selectionChanged: !1,
              updateMaxLine: !1,
              scrollLeft: null,
              scrollTop: null,
              scrollToPos: null,
              focus: !1,
              id: ++vw,
              markArrays: null,
            }),
              Vb(n.curOp)
          }
          function zi(n) {
            var i = n.curOp
            i &&
              Xb(i, function (l) {
                for (var s = 0; s < l.ops.length; s++) l.ops[s].cm.curOp = null
                mw(l)
              })
          }
          function mw(n) {
            for (var i = n.ops, l = 0; l < i.length; l++) yw(i[l])
            for (var s = 0; s < i.length; s++) bw(i[s])
            for (var c = 0; c < i.length; c++) ww(i[c])
            for (var d = 0; d < i.length; d++) xw(i[d])
            for (var m = 0; m < i.length; m++) _w(i[m])
          }
          function yw(n) {
            var i = n.cm,
              l = i.display
            kw(i),
              n.updateMaxLine && Yc(i),
              (n.mustUpdate =
                n.viewChanged ||
                n.forceUpdate ||
                n.scrollTop != null ||
                (n.scrollToPos &&
                  (n.scrollToPos.from.line < l.viewFrom ||
                    n.scrollToPos.to.line >= l.viewTo)) ||
                (l.maxLineChanged && i.options.lineWrapping)),
              (n.update =
                n.mustUpdate &&
                new ea(
                  i,
                  n.mustUpdate && { top: n.scrollTop, ensure: n.scrollToPos },
                  n.forceUpdate,
                ))
          }
          function bw(n) {
            n.updatedDisplay = n.mustUpdate && pu(n.cm, n.update)
          }
          function ww(n) {
            var i = n.cm,
              l = i.display
            n.updatedDisplay && Jl(i),
              (n.barMeasure = Es(i)),
              l.maxLineChanged &&
                !i.options.lineWrapping &&
                ((n.adjustWidthTo =
                  Ld(i, l.maxLine, l.maxLine.text.length).left + 3),
                (i.display.sizerWidth = n.adjustWidthTo),
                (n.barMeasure.scrollWidth = Math.max(
                  l.scroller.clientWidth,
                  l.sizer.offsetLeft +
                    n.adjustWidthTo +
                    ar(i) +
                    i.display.barWidth,
                )),
                (n.maxScrollLeft = Math.max(
                  0,
                  l.sizer.offsetLeft + n.adjustWidthTo - Mi(i),
                ))),
              (n.updatedDisplay || n.selectionChanged) &&
                (n.preparedSelection = l.input.prepareSelection())
          }
          function xw(n) {
            var i = n.cm
            n.adjustWidthTo != null &&
              ((i.display.sizer.style.minWidth = n.adjustWidthTo + "px"),
              n.maxScrollLeft < i.doc.scrollLeft &&
                Di(
                  i,
                  Math.min(i.display.scroller.scrollLeft, n.maxScrollLeft),
                  !0,
                ),
              (i.display.maxLineChanged = !1))
            var l = n.focus && n.focus == mt(Ut(i))
            n.preparedSelection &&
              i.display.input.showSelection(n.preparedSelection, l),
              (n.updatedDisplay || n.startHeight != i.doc.height) &&
                xo(i, n.barMeasure),
              n.updatedDisplay && mu(i, n.barMeasure),
              n.selectionChanged && cu(i),
              i.state.focused &&
                n.updateInput &&
                i.display.input.reset(n.typing),
              l && Bd(n.cm)
          }
          function _w(n) {
            var i = n.cm,
              l = i.display,
              s = i.doc
            if (
              (n.updatedDisplay && Xd(i, n.update),
              l.wheelStartX != null &&
                (n.scrollTop != null ||
                  n.scrollLeft != null ||
                  n.scrollToPos) &&
                (l.wheelStartX = l.wheelStartY = null),
              n.scrollTop != null && jd(i, n.scrollTop, n.forceScroll),
              n.scrollLeft != null && Di(i, n.scrollLeft, !0, !0),
              n.scrollToPos)
            ) {
              var c = dw(
                i,
                Ht(s, n.scrollToPos.from),
                Ht(s, n.scrollToPos.to),
                n.scrollToPos.margin,
              )
              hw(i, c)
            }
            var d = n.maybeHiddenMarkers,
              m = n.maybeUnhiddenMarkers
            if (d)
              for (var y = 0; y < d.length; ++y)
                d[y].lines.length || me(d[y], "hide")
            if (m)
              for (var x = 0; x < m.length; ++x)
                m[x].lines.length && me(m[x], "unhide")
            l.wrapper.offsetHeight &&
              (s.scrollTop = i.display.scroller.scrollTop),
              n.changeObjs && me(i, "changes", i, n.changeObjs),
              n.update && n.update.finish()
          }
          function xn(n, i) {
            if (n.curOp) return i()
            Ri(n)
            try {
              return i()
            } finally {
              zi(n)
            }
          }
          function Ie(n, i) {
            return function () {
              if (n.curOp) return i.apply(n, arguments)
              Ri(n)
              try {
                return i.apply(n, arguments)
              } finally {
                zi(n)
              }
            }
          }
          function tn(n) {
            return function () {
              if (this.curOp) return n.apply(this, arguments)
              Ri(this)
              try {
                return n.apply(this, arguments)
              } finally {
                zi(this)
              }
            }
          }
          function qe(n) {
            return function () {
              var i = this.cm
              if (!i || i.curOp) return n.apply(this, arguments)
              Ri(i)
              try {
                return n.apply(this, arguments)
              } finally {
                zi(i)
              }
            }
          }
          function As(n, i) {
            n.doc.highlightFrontier < n.display.viewTo &&
              n.state.highlight.set(i, Kt(Sw, n))
          }
          function Sw(n) {
            var i = n.doc
            if (!(i.highlightFrontier >= n.display.viewTo)) {
              var l = +new Date() + n.options.workTime,
                s = ys(n, i.highlightFrontier),
                c = []
              i.iter(
                s.line,
                Math.min(i.first + i.size, n.display.viewTo + 500),
                function (d) {
                  if (s.line >= n.display.viewFrom) {
                    var m = d.styles,
                      y =
                        d.text.length > n.options.maxHighlightLength
                          ? kr(i.mode, s.state)
                          : null,
                      x = nd(n, d, s, !0)
                    y && (s.state = y), (d.styles = x.styles)
                    var _ = d.styleClasses,
                      P = x.classes
                    P ? (d.styleClasses = P) : _ && (d.styleClasses = null)
                    for (
                      var D =
                          !m ||
                          m.length != d.styles.length ||
                          (_ != P &&
                            (!_ ||
                              !P ||
                              _.bgClass != P.bgClass ||
                              _.textClass != P.textClass)),
                        U = 0;
                      !D && U < m.length;
                      ++U
                    )
                      D = m[U] != d.styles[U]
                    D && c.push(s.line), (d.stateAfter = s.save()), s.nextLine()
                  } else
                    d.text.length <= n.options.maxHighlightLength &&
                      Uc(n, d.text, s),
                      (d.stateAfter = s.line % 5 == 0 ? s.save() : null),
                      s.nextLine()
                  if (+new Date() > l) return As(n, n.options.workDelay), !0
                },
              ),
                (i.highlightFrontier = s.line),
                (i.modeFrontier = Math.max(i.modeFrontier, s.line)),
                c.length &&
                  xn(n, function () {
                    for (var d = 0; d < c.length; d++) ti(n, c[d], "text")
                  })
            }
          }
          var ea = function (n, i, l) {
            var s = n.display
            ;(this.viewport = i),
              (this.visible = Ql(s, n.doc, i)),
              (this.editorIsHidden = !s.wrapper.offsetWidth),
              (this.wrapperHeight = s.wrapper.clientHeight),
              (this.wrapperWidth = s.wrapper.clientWidth),
              (this.oldDisplayWidth = Mi(n)),
              (this.force = l),
              (this.dims = ou(n)),
              (this.events = [])
          }
          ;(ea.prototype.signal = function (n, i) {
            Je(n, i) && this.events.push(arguments)
          }),
            (ea.prototype.finish = function () {
              for (var n = 0; n < this.events.length; n++)
                me.apply(null, this.events[n])
            })
          function kw(n) {
            var i = n.display
            !i.scrollbarsClipped &&
              i.scroller.offsetWidth &&
              ((i.nativeBarWidth =
                i.scroller.offsetWidth - i.scroller.clientWidth),
              (i.heightForcer.style.height = ar(n) + "px"),
              (i.sizer.style.marginBottom = -i.nativeBarWidth + "px"),
              (i.sizer.style.borderRightWidth = ar(n) + "px"),
              (i.scrollbarsClipped = !0))
          }
          function Cw(n) {
            if (n.hasFocus()) return null
            var i = mt(Ut(n))
            if (!i || !Q(n.display.lineDiv, i)) return null
            var l = { activeElt: i }
            if (window.getSelection) {
              var s = Xt(n).getSelection()
              s.anchorNode &&
                s.extend &&
                Q(n.display.lineDiv, s.anchorNode) &&
                ((l.anchorNode = s.anchorNode),
                (l.anchorOffset = s.anchorOffset),
                (l.focusNode = s.focusNode),
                (l.focusOffset = s.focusOffset))
            }
            return l
          }
          function Tw(n) {
            if (
              !(
                !n ||
                !n.activeElt ||
                n.activeElt == mt(n.activeElt.ownerDocument)
              ) &&
              (n.activeElt.focus(),
              !/^(INPUT|TEXTAREA)$/.test(n.activeElt.nodeName) &&
                n.anchorNode &&
                Q(document.body, n.anchorNode) &&
                Q(document.body, n.focusNode))
            ) {
              var i = n.activeElt.ownerDocument,
                l = i.defaultView.getSelection(),
                s = i.createRange()
              s.setEnd(n.anchorNode, n.anchorOffset),
                s.collapse(!1),
                l.removeAllRanges(),
                l.addRange(s),
                l.extend(n.focusNode, n.focusOffset)
            }
          }
          function pu(n, i) {
            var l = n.display,
              s = n.doc
            if (i.editorIsHidden) return ei(n), !1
            if (
              !i.force &&
              i.visible.from >= l.viewFrom &&
              i.visible.to <= l.viewTo &&
              (l.updateLineNumbers == null ||
                l.updateLineNumbers >= l.viewTo) &&
              l.renderedView == l.view &&
              qd(n) == 0
            )
              return !1
            Zd(n) && (ei(n), (i.dims = ou(n)))
            var c = s.first + s.size,
              d = Math.max(i.visible.from - n.options.viewportMargin, s.first),
              m = Math.min(c, i.visible.to + n.options.viewportMargin)
            l.viewFrom < d &&
              d - l.viewFrom < 20 &&
              (d = Math.max(s.first, l.viewFrom)),
              l.viewTo > m && l.viewTo - m < 20 && (m = Math.min(c, l.viewTo)),
              Tr && ((d = Kc(n.doc, d)), (m = vd(n.doc, m)))
            var y =
              d != l.viewFrom ||
              m != l.viewTo ||
              l.lastWrapHeight != i.wrapperHeight ||
              l.lastWrapWidth != i.wrapperWidth
            uw(n, d, m),
              (l.viewOffset = Er(Lt(n.doc, l.viewFrom))),
              (n.display.mover.style.top = l.viewOffset + "px")
            var x = qd(n)
            if (
              !y &&
              x == 0 &&
              !i.force &&
              l.renderedView == l.view &&
              (l.updateLineNumbers == null || l.updateLineNumbers >= l.viewTo)
            )
              return !1
            var _ = Cw(n)
            return (
              x > 4 && (l.lineDiv.style.display = "none"),
              Ew(n, l.updateLineNumbers, i.dims),
              x > 4 && (l.lineDiv.style.display = ""),
              (l.renderedView = l.view),
              Tw(_),
              V(l.cursorDiv),
              V(l.selectionDiv),
              (l.gutters.style.height = l.sizer.style.minHeight = 0),
              y &&
                ((l.lastWrapHeight = i.wrapperHeight),
                (l.lastWrapWidth = i.wrapperWidth),
                As(n, 400)),
              (l.updateLineNumbers = null),
              !0
            )
          }
          function Xd(n, i) {
            for (var l = i.viewport, s = !0; ; s = !1) {
              if (!s || !n.options.lineWrapping || i.oldDisplayWidth == Mi(n)) {
                if (
                  (l &&
                    l.top != null &&
                    (l = {
                      top: Math.min(
                        n.doc.height + Jc(n.display) - Qc(n),
                        l.top,
                      ),
                    }),
                  (i.visible = Ql(n.display, n.doc, l)),
                  i.visible.from >= n.display.viewFrom &&
                    i.visible.to <= n.display.viewTo)
                )
                  break
              } else s && (i.visible = Ql(n.display, n.doc, l))
              if (!pu(n, i)) break
              Jl(n)
              var c = Es(n)
              ks(n), xo(n, c), mu(n, c), (i.force = !1)
            }
            i.signal(n, "update", n),
              (n.display.viewFrom != n.display.reportedViewFrom ||
                n.display.viewTo != n.display.reportedViewTo) &&
                (i.signal(
                  n,
                  "viewportChange",
                  n,
                  n.display.viewFrom,
                  n.display.viewTo,
                ),
                (n.display.reportedViewFrom = n.display.viewFrom),
                (n.display.reportedViewTo = n.display.viewTo))
          }
          function gu(n, i) {
            var l = new ea(n, i)
            if (pu(n, l)) {
              Jl(n), Xd(n, l)
              var s = Es(n)
              ks(n), xo(n, s), mu(n, s), l.finish()
            }
          }
          function Ew(n, i, l) {
            var s = n.display,
              c = n.options.lineNumbers,
              d = s.lineDiv,
              m = d.firstChild
            function y(J) {
              var it = J.nextSibling
              return (
                v && W && n.display.currentWheelTarget == J
                  ? (J.style.display = "none")
                  : J.parentNode.removeChild(J),
                it
              )
            }
            for (var x = s.view, _ = s.viewFrom, P = 0; P < x.length; P++) {
              var D = x[P]
              if (!D.hidden)
                if (!D.node || D.node.parentNode != d) {
                  var U = tw(n, D, _, l)
                  d.insertBefore(U, m)
                } else {
                  for (; m != D.node; ) m = y(m)
                  var H = c && i != null && i <= _ && D.lineNumber
                  D.changes &&
                    (rt(D.changes, "gutter") > -1 && (H = !1), xd(n, D, _, l)),
                    H &&
                      (V(D.lineNumber),
                      D.lineNumber.appendChild(
                        document.createTextNode($(n.options, _)),
                      )),
                    (m = D.node.nextSibling)
                }
              _ += D.size
            }
            for (; m; ) m = y(m)
          }
          function vu(n) {
            var i = n.gutters.offsetWidth
            ;(n.sizer.style.marginLeft = i + "px"), Fe(n, "gutterChanged", n)
          }
          function mu(n, i) {
            ;(n.display.sizer.style.minHeight = i.docHeight + "px"),
              (n.display.heightForcer.style.top = i.docHeight + "px"),
              (n.display.gutters.style.height =
                i.docHeight + n.display.barHeight + ar(n) + "px")
          }
          function Yd(n) {
            var i = n.display,
              l = i.view
            if (
              !(
                !i.alignWidgets &&
                (!i.gutters.firstChild || !n.options.fixedGutter)
              )
            ) {
              for (
                var s = su(i) - i.scroller.scrollLeft + n.doc.scrollLeft,
                  c = i.gutters.offsetWidth,
                  d = s + "px",
                  m = 0;
                m < l.length;
                m++
              )
                if (!l[m].hidden) {
                  n.options.fixedGutter &&
                    (l[m].gutter && (l[m].gutter.style.left = d),
                    l[m].gutterBackground &&
                      (l[m].gutterBackground.style.left = d))
                  var y = l[m].alignable
                  if (y) for (var x = 0; x < y.length; x++) y[x].style.left = d
                }
              n.options.fixedGutter && (i.gutters.style.left = s + c + "px")
            }
          }
          function Zd(n) {
            if (!n.options.lineNumbers) return !1
            var i = n.doc,
              l = $(n.options, i.first + i.size - 1),
              s = n.display
            if (l.length != s.lineNumChars) {
              var c = s.measure.appendChild(
                  k(
                    "div",
                    [k("div", l)],
                    "CodeMirror-linenumber CodeMirror-gutter-elt",
                  ),
                ),
                d = c.firstChild.offsetWidth,
                m = c.offsetWidth - d
              return (
                (s.lineGutter.style.width = ""),
                (s.lineNumInnerWidth =
                  Math.max(d, s.lineGutter.offsetWidth - m) + 1),
                (s.lineNumWidth = s.lineNumInnerWidth + m),
                (s.lineNumChars = s.lineNumInnerWidth ? l.length : -1),
                (s.lineGutter.style.width = s.lineNumWidth + "px"),
                vu(n.display),
                !0
              )
            }
            return !1
          }
          function yu(n, i) {
            for (var l = [], s = !1, c = 0; c < n.length; c++) {
              var d = n[c],
                m = null
              if (
                (typeof d != "string" && ((m = d.style), (d = d.className)),
                d == "CodeMirror-linenumbers")
              )
                if (i) s = !0
                else continue
              l.push({ className: d, style: m })
            }
            return (
              i &&
                !s &&
                l.push({ className: "CodeMirror-linenumbers", style: null }),
              l
            )
          }
          function Jd(n) {
            var i = n.gutters,
              l = n.gutterSpecs
            V(i), (n.lineGutter = null)
            for (var s = 0; s < l.length; ++s) {
              var c = l[s],
                d = c.className,
                m = c.style,
                y = i.appendChild(k("div", null, "CodeMirror-gutter " + d))
              m && (y.style.cssText = m),
                d == "CodeMirror-linenumbers" &&
                  ((n.lineGutter = y),
                  (y.style.width = (n.lineNumWidth || 1) + "px"))
            }
            ;(i.style.display = l.length ? "" : "none"), vu(n)
          }
          function Ms(n) {
            Jd(n.display), ln(n), Yd(n)
          }
          function Lw(n, i, l, s) {
            var c = this
            ;(this.input = l),
              (c.scrollbarFiller = k(
                "div",
                null,
                "CodeMirror-scrollbar-filler",
              )),
              c.scrollbarFiller.setAttribute("cm-not-content", "true"),
              (c.gutterFiller = k("div", null, "CodeMirror-gutter-filler")),
              c.gutterFiller.setAttribute("cm-not-content", "true"),
              (c.lineDiv = q("div", null, "CodeMirror-code")),
              (c.selectionDiv = k(
                "div",
                null,
                null,
                "position: relative; z-index: 1",
              )),
              (c.cursorDiv = k("div", null, "CodeMirror-cursors")),
              (c.measure = k("div", null, "CodeMirror-measure")),
              (c.lineMeasure = k("div", null, "CodeMirror-measure")),
              (c.lineSpace = q(
                "div",
                [
                  c.measure,
                  c.lineMeasure,
                  c.selectionDiv,
                  c.cursorDiv,
                  c.lineDiv,
                ],
                null,
                "position: relative; outline: none",
              ))
            var d = q("div", [c.lineSpace], "CodeMirror-lines")
            ;(c.mover = k("div", [d], null, "position: relative")),
              (c.sizer = k("div", [c.mover], "CodeMirror-sizer")),
              (c.sizerWidth = null),
              (c.heightForcer = k(
                "div",
                null,
                null,
                "position: absolute; height: " + Nt + "px; width: 1px;",
              )),
              (c.gutters = k("div", null, "CodeMirror-gutters")),
              (c.lineGutter = null),
              (c.scroller = k(
                "div",
                [c.sizer, c.heightForcer, c.gutters],
                "CodeMirror-scroll",
              )),
              c.scroller.setAttribute("tabIndex", "-1"),
              (c.wrapper = k(
                "div",
                [c.scrollbarFiller, c.gutterFiller, c.scroller],
                "CodeMirror",
              )),
              w && S >= 105 && (c.wrapper.style.clipPath = "inset(0px)"),
              c.wrapper.setAttribute("translate", "no"),
              p &&
                g < 8 &&
                ((c.gutters.style.zIndex = -1),
                (c.scroller.style.paddingRight = 0)),
              !v && !(a && E) && (c.scroller.draggable = !0),
              n && (n.appendChild ? n.appendChild(c.wrapper) : n(c.wrapper)),
              (c.viewFrom = c.viewTo = i.first),
              (c.reportedViewFrom = c.reportedViewTo = i.first),
              (c.view = []),
              (c.renderedView = null),
              (c.externalMeasured = null),
              (c.viewOffset = 0),
              (c.lastWrapHeight = c.lastWrapWidth = 0),
              (c.updateLineNumbers = null),
              (c.nativeBarWidth = c.barHeight = c.barWidth = 0),
              (c.scrollbarsClipped = !1),
              (c.lineNumWidth = c.lineNumInnerWidth = c.lineNumChars = null),
              (c.alignWidgets = !1),
              (c.cachedCharWidth =
                c.cachedTextHeight =
                c.cachedPaddingH =
                  null),
              (c.maxLine = null),
              (c.maxLineLength = 0),
              (c.maxLineChanged = !1),
              (c.wheelDX = c.wheelDY = c.wheelStartX = c.wheelStartY = null),
              (c.shift = !1),
              (c.selForContextMenu = null),
              (c.activeTouch = null),
              (c.gutterSpecs = yu(s.gutters, s.lineNumbers)),
              Jd(c),
              l.init(c)
          }
          var na = 0,
            Ar = null
          p
            ? (Ar = -0.53)
            : a
              ? (Ar = 15)
              : w
                ? (Ar = -0.7)
                : L && (Ar = -1 / 3)
          function Qd(n) {
            var i = n.wheelDeltaX,
              l = n.wheelDeltaY
            return (
              i == null &&
                n.detail &&
                n.axis == n.HORIZONTAL_AXIS &&
                (i = n.detail),
              l == null && n.detail && n.axis == n.VERTICAL_AXIS
                ? (l = n.detail)
                : l == null && (l = n.wheelDelta),
              { x: i, y: l }
            )
          }
          function Aw(n) {
            var i = Qd(n)
            return (i.x *= Ar), (i.y *= Ar), i
          }
          function tp(n, i) {
            w &&
              S == 102 &&
              (n.display.chromeScrollHack == null
                ? (n.display.sizer.style.pointerEvents = "none")
                : clearTimeout(n.display.chromeScrollHack),
              (n.display.chromeScrollHack = setTimeout(function () {
                ;(n.display.chromeScrollHack = null),
                  (n.display.sizer.style.pointerEvents = "")
              }, 100)))
            var l = Qd(i),
              s = l.x,
              c = l.y,
              d = Ar
            i.deltaMode === 0 && ((s = i.deltaX), (c = i.deltaY), (d = 1))
            var m = n.display,
              y = m.scroller,
              x = y.scrollWidth > y.clientWidth,
              _ = y.scrollHeight > y.clientHeight
            if ((s && x) || (c && _)) {
              if (c && W && v) {
                t: for (var P = i.target, D = m.view; P != y; P = P.parentNode)
                  for (var U = 0; U < D.length; U++)
                    if (D[U].node == P) {
                      n.display.currentWheelTarget = P
                      break t
                    }
              }
              if (s && !a && !N && d != null) {
                c && _ && Ts(n, Math.max(0, y.scrollTop + c * d)),
                  Di(n, Math.max(0, y.scrollLeft + s * d)),
                  (!c || (c && _)) && Ke(i),
                  (m.wheelStartX = null)
                return
              }
              if (c && d != null) {
                var H = c * d,
                  J = n.doc.scrollTop,
                  it = J + m.wrapper.clientHeight
                H < 0
                  ? (J = Math.max(0, J + H - 50))
                  : (it = Math.min(n.doc.height, it + H + 50)),
                  gu(n, { top: J, bottom: it })
              }
              na < 20 &&
                i.deltaMode !== 0 &&
                (m.wheelStartX == null
                  ? ((m.wheelStartX = y.scrollLeft),
                    (m.wheelStartY = y.scrollTop),
                    (m.wheelDX = s),
                    (m.wheelDY = c),
                    setTimeout(function () {
                      if (m.wheelStartX != null) {
                        var gt = y.scrollLeft - m.wheelStartX,
                          yt = y.scrollTop - m.wheelStartY,
                          kt =
                            (yt && m.wheelDY && yt / m.wheelDY) ||
                            (gt && m.wheelDX && gt / m.wheelDX)
                        ;(m.wheelStartX = m.wheelStartY = null),
                          kt && ((Ar = (Ar * na + kt) / (na + 1)), ++na)
                      }
                    }, 200))
                  : ((m.wheelDX += s), (m.wheelDY += c)))
            }
          }
          var On = function (n, i) {
            ;(this.ranges = n), (this.primIndex = i)
          }
          ;(On.prototype.primary = function () {
            return this.ranges[this.primIndex]
          }),
            (On.prototype.equals = function (n) {
              if (n == this) return !0
              if (
                n.primIndex != this.primIndex ||
                n.ranges.length != this.ranges.length
              )
                return !1
              for (var i = 0; i < this.ranges.length; i++) {
                var l = this.ranges[i],
                  s = n.ranges[i]
                if (!qt(l.anchor, s.anchor) || !qt(l.head, s.head)) return !1
              }
              return !0
            }),
            (On.prototype.deepCopy = function () {
              for (var n = [], i = 0; i < this.ranges.length; i++)
                n[i] = new ce(
                  Yt(this.ranges[i].anchor),
                  Yt(this.ranges[i].head),
                )
              return new On(n, this.primIndex)
            }),
            (On.prototype.somethingSelected = function () {
              for (var n = 0; n < this.ranges.length; n++)
                if (!this.ranges[n].empty()) return !0
              return !1
            }),
            (On.prototype.contains = function (n, i) {
              i || (i = n)
              for (var l = 0; l < this.ranges.length; l++) {
                var s = this.ranges[l]
                if (Z(i, s.from()) >= 0 && Z(n, s.to()) <= 0) return l
              }
              return -1
            })
          var ce = function (n, i) {
            ;(this.anchor = n), (this.head = i)
          }
          ;(ce.prototype.from = function () {
            return Oe(this.anchor, this.head)
          }),
            (ce.prototype.to = function () {
              return oe(this.anchor, this.head)
            }),
            (ce.prototype.empty = function () {
              return (
                this.head.line == this.anchor.line &&
                this.head.ch == this.anchor.ch
              )
            })
          function Vn(n, i, l) {
            var s = n && n.options.selectionsMayTouch,
              c = i[l]
            i.sort(function (U, H) {
              return Z(U.from(), H.from())
            }),
              (l = rt(i, c))
            for (var d = 1; d < i.length; d++) {
              var m = i[d],
                y = i[d - 1],
                x = Z(y.to(), m.from())
              if (s && !m.empty() ? x > 0 : x >= 0) {
                var _ = Oe(y.from(), m.from()),
                  P = oe(y.to(), m.to()),
                  D = y.empty() ? m.from() == m.head : y.from() == y.head
                d <= l && --l, i.splice(--d, 2, new ce(D ? P : _, D ? _ : P))
              }
            }
            return new On(i, l)
          }
          function ni(n, i) {
            return new On([new ce(n, i || n)], 0)
          }
          function ri(n) {
            return n.text
              ? F(
                  n.from.line + n.text.length - 1,
                  ct(n.text).length + (n.text.length == 1 ? n.from.ch : 0),
                )
              : n.to
          }
          function ep(n, i) {
            if (Z(n, i.from) < 0) return n
            if (Z(n, i.to) <= 0) return ri(i)
            var l = n.line + i.text.length - (i.to.line - i.from.line) - 1,
              s = n.ch
            return n.line == i.to.line && (s += ri(i).ch - i.to.ch), F(l, s)
          }
          function bu(n, i) {
            for (var l = [], s = 0; s < n.sel.ranges.length; s++) {
              var c = n.sel.ranges[s]
              l.push(new ce(ep(c.anchor, i), ep(c.head, i)))
            }
            return Vn(n.cm, l, n.sel.primIndex)
          }
          function np(n, i, l) {
            return n.line == i.line
              ? F(l.line, n.ch - i.ch + l.ch)
              : F(l.line + (n.line - i.line), n.ch)
          }
          function Mw(n, i, l) {
            for (
              var s = [], c = F(n.first, 0), d = c, m = 0;
              m < i.length;
              m++
            ) {
              var y = i[m],
                x = np(y.from, c, d),
                _ = np(ri(y), c, d)
              if (((c = y.to), (d = _), l == "around")) {
                var P = n.sel.ranges[m],
                  D = Z(P.head, P.anchor) < 0
                s[m] = new ce(D ? _ : x, D ? x : _)
              } else s[m] = new ce(x, x)
            }
            return new On(s, n.sel.primIndex)
          }
          function wu(n) {
            ;(n.doc.mode = Sr(n.options, n.doc.modeOption)), Ns(n)
          }
          function Ns(n) {
            n.doc.iter(function (i) {
              i.stateAfter && (i.stateAfter = null),
                i.styles && (i.styles = null)
            }),
              (n.doc.modeFrontier = n.doc.highlightFrontier = n.doc.first),
              As(n, 100),
              n.state.modeGen++,
              n.curOp && ln(n)
          }
          function rp(n, i) {
            return (
              i.from.ch == 0 &&
              i.to.ch == 0 &&
              ct(i.text) == "" &&
              (!n.cm || n.cm.options.wholeLineUpdateBefore)
            )
          }
          function xu(n, i, l, s) {
            function c(kt) {
              return l ? l[kt] : null
            }
            function d(kt, bt, Ct) {
              Fb(kt, bt, Ct, s), Fe(kt, "change", kt, i)
            }
            function m(kt, bt) {
              for (var Ct = [], $t = kt; $t < bt; ++$t)
                Ct.push(new po(_[$t], c($t), s))
              return Ct
            }
            var y = i.from,
              x = i.to,
              _ = i.text,
              P = Lt(n, y.line),
              D = Lt(n, x.line),
              U = ct(_),
              H = c(_.length - 1),
              J = x.line - y.line
            if (i.full)
              n.insert(0, m(0, _.length)), n.remove(_.length, n.size - _.length)
            else if (rp(n, i)) {
              var it = m(0, _.length - 1)
              d(D, D.text, H),
                J && n.remove(y.line, J),
                it.length && n.insert(y.line, it)
            } else if (P == D)
              if (_.length == 1)
                d(P, P.text.slice(0, y.ch) + U + P.text.slice(x.ch), H)
              else {
                var gt = m(1, _.length - 1)
                gt.push(new po(U + P.text.slice(x.ch), H, s)),
                  d(P, P.text.slice(0, y.ch) + _[0], c(0)),
                  n.insert(y.line + 1, gt)
              }
            else if (_.length == 1)
              d(P, P.text.slice(0, y.ch) + _[0] + D.text.slice(x.ch), c(0)),
                n.remove(y.line + 1, J)
            else {
              d(P, P.text.slice(0, y.ch) + _[0], c(0)),
                d(D, U + D.text.slice(x.ch), H)
              var yt = m(1, _.length - 1)
              J > 1 && n.remove(y.line + 1, J - 1), n.insert(y.line + 1, yt)
            }
            Fe(n, "change", n, i)
          }
          function ii(n, i, l) {
            function s(c, d, m) {
              if (c.linked)
                for (var y = 0; y < c.linked.length; ++y) {
                  var x = c.linked[y]
                  if (x.doc != d) {
                    var _ = m && x.sharedHist
                    ;(l && !_) || (i(x.doc, _), s(x.doc, c, _))
                  }
                }
            }
            s(n, null, !0)
          }
          function ip(n, i) {
            if (i.cm) throw new Error("This document is already in use.")
            ;(n.doc = i),
              (i.cm = n),
              lu(n),
              wu(n),
              op(n),
              (n.options.direction = i.direction),
              n.options.lineWrapping || Yc(n),
              (n.options.mode = i.modeOption),
              ln(n)
          }
          function op(n) {
            ;(n.doc.direction == "rtl" ? Et : pt)(
              n.display.lineDiv,
              "CodeMirror-rtl",
            )
          }
          function Nw(n) {
            xn(n, function () {
              op(n), ln(n)
            })
          }
          function ra(n) {
            ;(this.done = []),
              (this.undone = []),
              (this.undoDepth = n ? n.undoDepth : 1 / 0),
              (this.lastModTime = this.lastSelTime = 0),
              (this.lastOp = this.lastSelOp = null),
              (this.lastOrigin = this.lastSelOrigin = null),
              (this.generation = this.maxGeneration = n ? n.maxGeneration : 1)
          }
          function _u(n, i) {
            var l = { from: Yt(i.from), to: ri(i), text: Cr(n, i.from, i.to) }
            return (
              ap(n, l, i.from.line, i.to.line + 1),
              ii(
                n,
                function (s) {
                  return ap(s, l, i.from.line, i.to.line + 1)
                },
                !0,
              ),
              l
            )
          }
          function sp(n) {
            for (; n.length; ) {
              var i = ct(n)
              if (i.ranges) n.pop()
              else break
            }
          }
          function Pw(n, i) {
            if (i) return sp(n.done), ct(n.done)
            if (n.done.length && !ct(n.done).ranges) return ct(n.done)
            if (n.done.length > 1 && !n.done[n.done.length - 2].ranges)
              return n.done.pop(), ct(n.done)
          }
          function lp(n, i, l, s) {
            var c = n.history
            c.undone.length = 0
            var d = +new Date(),
              m,
              y
            if (
              (c.lastOp == s ||
                (c.lastOrigin == i.origin &&
                  i.origin &&
                  ((i.origin.charAt(0) == "+" &&
                    c.lastModTime >
                      d - (n.cm ? n.cm.options.historyEventDelay : 500)) ||
                    i.origin.charAt(0) == "*"))) &&
              (m = Pw(c, c.lastOp == s))
            )
              (y = ct(m.changes)),
                Z(i.from, i.to) == 0 && Z(i.from, y.to) == 0
                  ? (y.to = ri(i))
                  : m.changes.push(_u(n, i))
            else {
              var x = ct(c.done)
              for (
                (!x || !x.ranges) && ia(n.sel, c.done),
                  m = { changes: [_u(n, i)], generation: c.generation },
                  c.done.push(m);
                c.done.length > c.undoDepth;

              )
                c.done.shift(), c.done[0].ranges || c.done.shift()
            }
            c.done.push(l),
              (c.generation = ++c.maxGeneration),
              (c.lastModTime = c.lastSelTime = d),
              (c.lastOp = c.lastSelOp = s),
              (c.lastOrigin = c.lastSelOrigin = i.origin),
              y || me(n, "historyAdded")
          }
          function Ow(n, i, l, s) {
            var c = i.charAt(0)
            return (
              c == "*" ||
              (c == "+" &&
                l.ranges.length == s.ranges.length &&
                l.somethingSelected() == s.somethingSelected() &&
                new Date() - n.history.lastSelTime <=
                  (n.cm ? n.cm.options.historyEventDelay : 500))
            )
          }
          function Dw(n, i, l, s) {
            var c = n.history,
              d = s && s.origin
            l == c.lastSelOp ||
            (d &&
              c.lastSelOrigin == d &&
              ((c.lastModTime == c.lastSelTime && c.lastOrigin == d) ||
                Ow(n, d, ct(c.done), i)))
              ? (c.done[c.done.length - 1] = i)
              : ia(i, c.done),
              (c.lastSelTime = +new Date()),
              (c.lastSelOrigin = d),
              (c.lastSelOp = l),
              s && s.clearRedo !== !1 && sp(c.undone)
          }
          function ia(n, i) {
            var l = ct(i)
            ;(l && l.ranges && l.equals(n)) || i.push(n)
          }
          function ap(n, i, l, s) {
            var c = i["spans_" + n.id],
              d = 0
            n.iter(
              Math.max(n.first, l),
              Math.min(n.first + n.size, s),
              function (m) {
                m.markedSpans &&
                  ((c || (c = i["spans_" + n.id] = {}))[d] = m.markedSpans),
                  ++d
              },
            )
          }
          function $w(n) {
            if (!n) return null
            for (var i, l = 0; l < n.length; ++l)
              n[l].marker.explicitlyCleared
                ? i || (i = n.slice(0, l))
                : i && i.push(n[l])
            return i ? (i.length ? i : null) : n
          }
          function Rw(n, i) {
            var l = i["spans_" + n.id]
            if (!l) return null
            for (var s = [], c = 0; c < i.text.length; ++c) s.push($w(l[c]))
            return s
          }
          function cp(n, i) {
            var l = Rw(n, i),
              s = Gc(n, i)
            if (!l) return s
            if (!s) return l
            for (var c = 0; c < l.length; ++c) {
              var d = l[c],
                m = s[c]
              if (d && m)
                t: for (var y = 0; y < m.length; ++y) {
                  for (var x = m[y], _ = 0; _ < d.length; ++_)
                    if (d[_].marker == x.marker) continue t
                  d.push(x)
                }
              else m && (l[c] = m)
            }
            return l
          }
          function _o(n, i, l) {
            for (var s = [], c = 0; c < n.length; ++c) {
              var d = n[c]
              if (d.ranges) {
                s.push(l ? On.prototype.deepCopy.call(d) : d)
                continue
              }
              var m = d.changes,
                y = []
              s.push({ changes: y })
              for (var x = 0; x < m.length; ++x) {
                var _ = m[x],
                  P = void 0
                if ((y.push({ from: _.from, to: _.to, text: _.text }), i))
                  for (var D in _)
                    (P = D.match(/^spans_(\d+)$/)) &&
                      rt(i, Number(P[1])) > -1 &&
                      ((ct(y)[D] = _[D]), delete _[D])
              }
            }
            return s
          }
          function Su(n, i, l, s) {
            if (s) {
              var c = n.anchor
              if (l) {
                var d = Z(i, c) < 0
                d != Z(l, c) < 0
                  ? ((c = i), (i = l))
                  : d != Z(i, l) < 0 && (i = l)
              }
              return new ce(c, i)
            } else return new ce(l || i, i)
          }
          function oa(n, i, l, s, c) {
            c == null && (c = n.cm && (n.cm.display.shift || n.extend)),
              Xe(n, new On([Su(n.sel.primary(), i, l, c)], 0), s)
          }
          function up(n, i, l) {
            for (
              var s = [], c = n.cm && (n.cm.display.shift || n.extend), d = 0;
              d < n.sel.ranges.length;
              d++
            )
              s[d] = Su(n.sel.ranges[d], i[d], null, c)
            var m = Vn(n.cm, s, n.sel.primIndex)
            Xe(n, m, l)
          }
          function ku(n, i, l, s) {
            var c = n.sel.ranges.slice(0)
            ;(c[i] = l), Xe(n, Vn(n.cm, c, n.sel.primIndex), s)
          }
          function fp(n, i, l, s) {
            Xe(n, ni(i, l), s)
          }
          function zw(n, i, l) {
            var s = {
              ranges: i.ranges,
              update: function (c) {
                this.ranges = []
                for (var d = 0; d < c.length; d++)
                  this.ranges[d] = new ce(Ht(n, c[d].anchor), Ht(n, c[d].head))
              },
              origin: l && l.origin,
            }
            return (
              me(n, "beforeSelectionChange", n, s),
              n.cm && me(n.cm, "beforeSelectionChange", n.cm, s),
              s.ranges != i.ranges ? Vn(n.cm, s.ranges, s.ranges.length - 1) : i
            )
          }
          function hp(n, i, l) {
            var s = n.history.done,
              c = ct(s)
            c && c.ranges ? ((s[s.length - 1] = i), sa(n, i, l)) : Xe(n, i, l)
          }
          function Xe(n, i, l) {
            sa(n, i, l), Dw(n, n.sel, n.cm ? n.cm.curOp.id : NaN, l)
          }
          function sa(n, i, l) {
            ;(Je(n, "beforeSelectionChange") ||
              (n.cm && Je(n.cm, "beforeSelectionChange"))) &&
              (i = zw(n, i, l))
            var s =
              (l && l.bias) ||
              (Z(i.primary().head, n.sel.primary().head) < 0 ? -1 : 1)
            dp(n, gp(n, i, s, !0)),
              !(l && l.scroll === !1) &&
                n.cm &&
                n.cm.getOption("readOnly") != "nocursor" &&
                wo(n.cm)
          }
          function dp(n, i) {
            i.equals(n.sel) ||
              ((n.sel = i),
              n.cm &&
                ((n.cm.curOp.updateInput = 1),
                (n.cm.curOp.selectionChanged = !0),
                $l(n.cm)),
              Fe(n, "cursorActivity", n))
          }
          function pp(n) {
            dp(n, gp(n, n.sel, null, !1))
          }
          function gp(n, i, l, s) {
            for (var c, d = 0; d < i.ranges.length; d++) {
              var m = i.ranges[d],
                y = i.ranges.length == n.sel.ranges.length && n.sel.ranges[d],
                x = la(n, m.anchor, y && y.anchor, l, s),
                _ = m.head == m.anchor ? x : la(n, m.head, y && y.head, l, s)
              ;(c || x != m.anchor || _ != m.head) &&
                (c || (c = i.ranges.slice(0, d)), (c[d] = new ce(x, _)))
            }
            return c ? Vn(n.cm, c, i.primIndex) : i
          }
          function So(n, i, l, s, c) {
            var d = Lt(n, i.line)
            if (d.markedSpans)
              for (var m = 0; m < d.markedSpans.length; ++m) {
                var y = d.markedSpans[m],
                  x = y.marker,
                  _ = "selectLeft" in x ? !x.selectLeft : x.inclusiveLeft,
                  P = "selectRight" in x ? !x.selectRight : x.inclusiveRight
                if (
                  (y.from == null || (_ ? y.from <= i.ch : y.from < i.ch)) &&
                  (y.to == null || (P ? y.to >= i.ch : y.to > i.ch))
                ) {
                  if (c && (me(x, "beforeCursorEnter"), x.explicitlyCleared))
                    if (d.markedSpans) {
                      --m
                      continue
                    } else break
                  if (!x.atomic) continue
                  if (l) {
                    var D = x.find(s < 0 ? 1 : -1),
                      U = void 0
                    if (
                      ((s < 0 ? P : _) &&
                        (D = vp(n, D, -s, D && D.line == i.line ? d : null)),
                      D &&
                        D.line == i.line &&
                        (U = Z(D, l)) &&
                        (s < 0 ? U < 0 : U > 0))
                    )
                      return So(n, D, i, s, c)
                  }
                  var H = x.find(s < 0 ? -1 : 1)
                  return (
                    (s < 0 ? _ : P) &&
                      (H = vp(n, H, s, H.line == i.line ? d : null)),
                    H ? So(n, H, i, s, c) : null
                  )
                }
              }
            return i
          }
          function la(n, i, l, s, c) {
            var d = s || 1,
              m =
                So(n, i, l, d, c) ||
                (!c && So(n, i, l, d, !0)) ||
                So(n, i, l, -d, c) ||
                (!c && So(n, i, l, -d, !0))
            return m || ((n.cantEdit = !0), F(n.first, 0))
          }
          function vp(n, i, l, s) {
            return l < 0 && i.ch == 0
              ? i.line > n.first
                ? Ht(n, F(i.line - 1))
                : null
              : l > 0 && i.ch == (s || Lt(n, i.line)).text.length
                ? i.line < n.first + n.size - 1
                  ? F(i.line + 1, 0)
                  : null
                : new F(i.line, i.ch + l)
          }
          function mp(n) {
            n.setSelection(F(n.firstLine(), 0), F(n.lastLine()), O)
          }
          function yp(n, i, l) {
            var s = {
              canceled: !1,
              from: i.from,
              to: i.to,
              text: i.text,
              origin: i.origin,
              cancel: function () {
                return (s.canceled = !0)
              },
            }
            return (
              l &&
                (s.update = function (c, d, m, y) {
                  c && (s.from = Ht(n, c)),
                    d && (s.to = Ht(n, d)),
                    m && (s.text = m),
                    y !== void 0 && (s.origin = y)
                }),
              me(n, "beforeChange", n, s),
              n.cm && me(n.cm, "beforeChange", n.cm, s),
              s.canceled
                ? (n.cm && (n.cm.curOp.updateInput = 2), null)
                : { from: s.from, to: s.to, text: s.text, origin: s.origin }
            )
          }
          function ko(n, i, l) {
            if (n.cm) {
              if (!n.cm.curOp) return Ie(n.cm, ko)(n, i, l)
              if (n.cm.state.suppressEdits) return
            }
            if (
              !(
                (Je(n, "beforeChange") || (n.cm && Je(n.cm, "beforeChange"))) &&
                ((i = yp(n, i, !0)), !i)
              )
            ) {
              var s = cd && !l && Db(n, i.from, i.to)
              if (s)
                for (var c = s.length - 1; c >= 0; --c)
                  bp(n, {
                    from: s[c].from,
                    to: s[c].to,
                    text: c ? [""] : i.text,
                    origin: i.origin,
                  })
              else bp(n, i)
            }
          }
          function bp(n, i) {
            if (
              !(i.text.length == 1 && i.text[0] == "" && Z(i.from, i.to) == 0)
            ) {
              var l = bu(n, i)
              lp(n, i, l, n.cm ? n.cm.curOp.id : NaN), Ps(n, i, l, Gc(n, i))
              var s = []
              ii(n, function (c, d) {
                !d &&
                  rt(s, c.history) == -1 &&
                  (Sp(c.history, i), s.push(c.history)),
                  Ps(c, i, null, Gc(c, i))
              })
            }
          }
          function aa(n, i, l) {
            var s = n.cm && n.cm.state.suppressEdits
            if (!(s && !l)) {
              for (
                var c = n.history,
                  d,
                  m = n.sel,
                  y = i == "undo" ? c.done : c.undone,
                  x = i == "undo" ? c.undone : c.done,
                  _ = 0;
                _ < y.length &&
                ((d = y[_]), !(l ? d.ranges && !d.equals(n.sel) : !d.ranges));
                _++
              );
              if (_ != y.length) {
                for (c.lastOrigin = c.lastSelOrigin = null; ; )
                  if (((d = y.pop()), d.ranges)) {
                    if ((ia(d, x), l && !d.equals(n.sel))) {
                      Xe(n, d, { clearRedo: !1 })
                      return
                    }
                    m = d
                  } else if (s) {
                    y.push(d)
                    return
                  } else break
                var P = []
                ia(m, x),
                  x.push({ changes: P, generation: c.generation }),
                  (c.generation = d.generation || ++c.maxGeneration)
                for (
                  var D =
                      Je(n, "beforeChange") ||
                      (n.cm && Je(n.cm, "beforeChange")),
                    U = function (it) {
                      var gt = d.changes[it]
                      if (((gt.origin = i), D && !yp(n, gt, !1)))
                        return (y.length = 0), {}
                      P.push(_u(n, gt))
                      var yt = it ? bu(n, gt) : ct(y)
                      Ps(n, gt, yt, cp(n, gt)),
                        !it &&
                          n.cm &&
                          n.cm.scrollIntoView({ from: gt.from, to: ri(gt) })
                      var kt = []
                      ii(n, function (bt, Ct) {
                        !Ct &&
                          rt(kt, bt.history) == -1 &&
                          (Sp(bt.history, gt), kt.push(bt.history)),
                          Ps(bt, gt, null, cp(bt, gt))
                      })
                    },
                    H = d.changes.length - 1;
                  H >= 0;
                  --H
                ) {
                  var J = U(H)
                  if (J) return J.v
                }
              }
            }
          }
          function wp(n, i) {
            if (
              i != 0 &&
              ((n.first += i),
              (n.sel = new On(
                vt(n.sel.ranges, function (c) {
                  return new ce(
                    F(c.anchor.line + i, c.anchor.ch),
                    F(c.head.line + i, c.head.ch),
                  )
                }),
                n.sel.primIndex,
              )),
              n.cm)
            ) {
              ln(n.cm, n.first, n.first - i, i)
              for (var l = n.cm.display, s = l.viewFrom; s < l.viewTo; s++)
                ti(n.cm, s, "gutter")
            }
          }
          function Ps(n, i, l, s) {
            if (n.cm && !n.cm.curOp) return Ie(n.cm, Ps)(n, i, l, s)
            if (i.to.line < n.first) {
              wp(n, i.text.length - 1 - (i.to.line - i.from.line))
              return
            }
            if (!(i.from.line > n.lastLine())) {
              if (i.from.line < n.first) {
                var c = i.text.length - 1 - (n.first - i.from.line)
                wp(n, c),
                  (i = {
                    from: F(n.first, 0),
                    to: F(i.to.line + c, i.to.ch),
                    text: [ct(i.text)],
                    origin: i.origin,
                  })
              }
              var d = n.lastLine()
              i.to.line > d &&
                (i = {
                  from: i.from,
                  to: F(d, Lt(n, d).text.length),
                  text: [i.text[0]],
                  origin: i.origin,
                }),
                (i.removed = Cr(n, i.from, i.to)),
                l || (l = bu(n, i)),
                n.cm ? Fw(n.cm, i, s) : xu(n, i, s),
                sa(n, l, O),
                n.cantEdit && la(n, F(n.firstLine(), 0)) && (n.cantEdit = !1)
            }
          }
          function Fw(n, i, l) {
            var s = n.doc,
              c = n.display,
              d = i.from,
              m = i.to,
              y = !1,
              x = d.line
            n.options.lineWrapping ||
              ((x = ae(jn(Lt(s, d.line)))),
              s.iter(x, m.line + 1, function (H) {
                if (H == c.maxLine) return (y = !0), !0
              })),
              s.sel.contains(i.from, i.to) > -1 && $l(n),
              xu(s, i, l, Id(n)),
              n.options.lineWrapping ||
                (s.iter(x, d.line + i.text.length, function (H) {
                  var J = jl(H)
                  J > c.maxLineLength &&
                    ((c.maxLine = H),
                    (c.maxLineLength = J),
                    (c.maxLineChanged = !0),
                    (y = !1))
                }),
                y && (n.curOp.updateMaxLine = !0)),
              Eb(s, d.line),
              As(n, 400)
            var _ = i.text.length - (m.line - d.line) - 1
            i.full
              ? ln(n)
              : d.line == m.line && i.text.length == 1 && !rp(n.doc, i)
                ? ti(n, d.line, "text")
                : ln(n, d.line, m.line + 1, _)
            var P = Je(n, "changes"),
              D = Je(n, "change")
            if (D || P) {
              var U = {
                from: d,
                to: m,
                text: i.text,
                removed: i.removed,
                origin: i.origin,
              }
              D && Fe(n, "change", n, U),
                P && (n.curOp.changeObjs || (n.curOp.changeObjs = [])).push(U)
            }
            n.display.selForContextMenu = null
          }
          function Co(n, i, l, s, c) {
            var d
            s || (s = l),
              Z(s, l) < 0 && ((d = [s, l]), (l = d[0]), (s = d[1])),
              typeof i == "string" && (i = n.splitLines(i)),
              ko(n, { from: l, to: s, text: i, origin: c })
          }
          function xp(n, i, l, s) {
            l < n.line
              ? (n.line += s)
              : i < n.line && ((n.line = i), (n.ch = 0))
          }
          function _p(n, i, l, s) {
            for (var c = 0; c < n.length; ++c) {
              var d = n[c],
                m = !0
              if (d.ranges) {
                d.copied || ((d = n[c] = d.deepCopy()), (d.copied = !0))
                for (var y = 0; y < d.ranges.length; y++)
                  xp(d.ranges[y].anchor, i, l, s), xp(d.ranges[y].head, i, l, s)
                continue
              }
              for (var x = 0; x < d.changes.length; ++x) {
                var _ = d.changes[x]
                if (l < _.from.line)
                  (_.from = F(_.from.line + s, _.from.ch)),
                    (_.to = F(_.to.line + s, _.to.ch))
                else if (i <= _.to.line) {
                  m = !1
                  break
                }
              }
              m || (n.splice(0, c + 1), (c = 0))
            }
          }
          function Sp(n, i) {
            var l = i.from.line,
              s = i.to.line,
              c = i.text.length - (s - l) - 1
            _p(n.done, l, s, c), _p(n.undone, l, s, c)
          }
          function Os(n, i, l, s) {
            var c = i,
              d = i
            return (
              typeof i == "number" ? (d = Lt(n, Pn(n, i))) : (c = ae(i)),
              c == null ? null : (s(d, c) && n.cm && ti(n.cm, c, l), d)
            )
          }
          function Ds(n) {
            ;(this.lines = n), (this.parent = null)
            for (var i = 0, l = 0; l < n.length; ++l)
              (n[l].parent = this), (i += n[l].height)
            this.height = i
          }
          Ds.prototype = {
            chunkSize: function () {
              return this.lines.length
            },
            removeInner: function (n, i) {
              for (var l = n, s = n + i; l < s; ++l) {
                var c = this.lines[l]
                ;(this.height -= c.height), Ib(c), Fe(c, "delete")
              }
              this.lines.splice(n, i)
            },
            collapse: function (n) {
              n.push.apply(n, this.lines)
            },
            insertInner: function (n, i, l) {
              ;(this.height += l),
                (this.lines = this.lines
                  .slice(0, n)
                  .concat(i)
                  .concat(this.lines.slice(n)))
              for (var s = 0; s < i.length; ++s) i[s].parent = this
            },
            iterN: function (n, i, l) {
              for (var s = n + i; n < s; ++n) if (l(this.lines[n])) return !0
            },
          }
          function $s(n) {
            this.children = n
            for (var i = 0, l = 0, s = 0; s < n.length; ++s) {
              var c = n[s]
              ;(i += c.chunkSize()), (l += c.height), (c.parent = this)
            }
            ;(this.size = i), (this.height = l), (this.parent = null)
          }
          $s.prototype = {
            chunkSize: function () {
              return this.size
            },
            removeInner: function (n, i) {
              this.size -= i
              for (var l = 0; l < this.children.length; ++l) {
                var s = this.children[l],
                  c = s.chunkSize()
                if (n < c) {
                  var d = Math.min(i, c - n),
                    m = s.height
                  if (
                    (s.removeInner(n, d),
                    (this.height -= m - s.height),
                    c == d && (this.children.splice(l--, 1), (s.parent = null)),
                    (i -= d) == 0)
                  )
                    break
                  n = 0
                } else n -= c
              }
              if (
                this.size - i < 25 &&
                (this.children.length > 1 || !(this.children[0] instanceof Ds))
              ) {
                var y = []
                this.collapse(y),
                  (this.children = [new Ds(y)]),
                  (this.children[0].parent = this)
              }
            },
            collapse: function (n) {
              for (var i = 0; i < this.children.length; ++i)
                this.children[i].collapse(n)
            },
            insertInner: function (n, i, l) {
              ;(this.size += i.length), (this.height += l)
              for (var s = 0; s < this.children.length; ++s) {
                var c = this.children[s],
                  d = c.chunkSize()
                if (n <= d) {
                  if (
                    (c.insertInner(n, i, l), c.lines && c.lines.length > 50)
                  ) {
                    for (
                      var m = (c.lines.length % 25) + 25, y = m;
                      y < c.lines.length;

                    ) {
                      var x = new Ds(c.lines.slice(y, (y += 25)))
                      ;(c.height -= x.height),
                        this.children.splice(++s, 0, x),
                        (x.parent = this)
                    }
                    ;(c.lines = c.lines.slice(0, m)), this.maybeSpill()
                  }
                  break
                }
                n -= d
              }
            },
            maybeSpill: function () {
              if (!(this.children.length <= 10)) {
                var n = this
                do {
                  var i = n.children.splice(n.children.length - 5, 5),
                    l = new $s(i)
                  if (n.parent) {
                    ;(n.size -= l.size), (n.height -= l.height)
                    var c = rt(n.parent.children, n)
                    n.parent.children.splice(c + 1, 0, l)
                  } else {
                    var s = new $s(n.children)
                    ;(s.parent = n), (n.children = [s, l]), (n = s)
                  }
                  l.parent = n.parent
                } while (n.children.length > 10)
                n.parent.maybeSpill()
              }
            },
            iterN: function (n, i, l) {
              for (var s = 0; s < this.children.length; ++s) {
                var c = this.children[s],
                  d = c.chunkSize()
                if (n < d) {
                  var m = Math.min(i, d - n)
                  if (c.iterN(n, m, l)) return !0
                  if ((i -= m) == 0) break
                  n = 0
                } else n -= d
              }
            },
          }
          var Rs = function (n, i, l) {
            if (l) for (var s in l) l.hasOwnProperty(s) && (this[s] = l[s])
            ;(this.doc = n), (this.node = i)
          }
          ;(Rs.prototype.clear = function () {
            var n = this.doc.cm,
              i = this.line.widgets,
              l = this.line,
              s = ae(l)
            if (!(s == null || !i)) {
              for (var c = 0; c < i.length; ++c)
                i[c] == this && i.splice(c--, 1)
              i.length || (l.widgets = null)
              var d = _s(this)
              In(l, Math.max(0, l.height - d)),
                n &&
                  (xn(n, function () {
                    kp(n, l, -d), ti(n, s, "widget")
                  }),
                  Fe(n, "lineWidgetCleared", n, this, s))
            }
          }),
            (Rs.prototype.changed = function () {
              var n = this,
                i = this.height,
                l = this.doc.cm,
                s = this.line
              this.height = null
              var c = _s(this) - i
              c &&
                (Qr(this.doc, s) || In(s, s.height + c),
                l &&
                  xn(l, function () {
                    ;(l.curOp.forceUpdate = !0),
                      kp(l, s, c),
                      Fe(l, "lineWidgetChanged", l, n, ae(s))
                  }))
            }),
            Qe(Rs)
          function kp(n, i, l) {
            Er(i) < ((n.curOp && n.curOp.scrollTop) || n.doc.scrollTop) &&
              du(n, l)
          }
          function Iw(n, i, l, s) {
            var c = new Rs(n, l, s),
              d = n.cm
            return (
              d && c.noHScroll && (d.display.alignWidgets = !0),
              Os(n, i, "widget", function (m) {
                var y = m.widgets || (m.widgets = [])
                if (
                  (c.insertAt == null
                    ? y.push(c)
                    : y.splice(
                        Math.min(y.length, Math.max(0, c.insertAt)),
                        0,
                        c,
                      ),
                  (c.line = m),
                  d && !Qr(n, m))
                ) {
                  var x = Er(m) < n.scrollTop
                  In(m, m.height + _s(c)),
                    x && du(d, c.height),
                    (d.curOp.forceUpdate = !0)
                }
                return !0
              }),
              d &&
                Fe(
                  d,
                  "lineWidgetAdded",
                  d,
                  c,
                  typeof i == "number" ? i : ae(i),
                ),
              c
            )
          }
          var Cp = 0,
            oi = function (n, i) {
              ;(this.lines = []),
                (this.type = i),
                (this.doc = n),
                (this.id = ++Cp)
            }
          ;(oi.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              var n = this.doc.cm,
                i = n && !n.curOp
              if ((i && Ri(n), Je(this, "clear"))) {
                var l = this.find()
                l && Fe(this, "clear", l.from, l.to)
              }
              for (var s = null, c = null, d = 0; d < this.lines.length; ++d) {
                var m = this.lines[d],
                  y = bs(m.markedSpans, this)
                n && !this.collapsed
                  ? ti(n, ae(m), "text")
                  : n &&
                    (y.to != null && (c = ae(m)),
                    y.from != null && (s = ae(m))),
                  (m.markedSpans = Mb(m.markedSpans, y)),
                  y.from == null &&
                    this.collapsed &&
                    !Qr(this.doc, m) &&
                    n &&
                    In(m, mo(n.display))
              }
              if (n && this.collapsed && !n.options.lineWrapping)
                for (var x = 0; x < this.lines.length; ++x) {
                  var _ = jn(this.lines[x]),
                    P = jl(_)
                  P > n.display.maxLineLength &&
                    ((n.display.maxLine = _),
                    (n.display.maxLineLength = P),
                    (n.display.maxLineChanged = !0))
                }
              s != null && n && this.collapsed && ln(n, s, c + 1),
                (this.lines.length = 0),
                (this.explicitlyCleared = !0),
                this.atomic &&
                  this.doc.cantEdit &&
                  ((this.doc.cantEdit = !1), n && pp(n.doc)),
                n && Fe(n, "markerCleared", n, this, s, c),
                i && zi(n),
                this.parent && this.parent.clear()
            }
          }),
            (oi.prototype.find = function (n, i) {
              n == null && this.type == "bookmark" && (n = 1)
              for (var l, s, c = 0; c < this.lines.length; ++c) {
                var d = this.lines[c],
                  m = bs(d.markedSpans, this)
                if (m.from != null && ((l = F(i ? d : ae(d), m.from)), n == -1))
                  return l
                if (m.to != null && ((s = F(i ? d : ae(d), m.to)), n == 1))
                  return s
              }
              return l && { from: l, to: s }
            }),
            (oi.prototype.changed = function () {
              var n = this,
                i = this.find(-1, !0),
                l = this,
                s = this.doc.cm
              !i ||
                !s ||
                xn(s, function () {
                  var c = i.line,
                    d = ae(i.line),
                    m = tu(s, d)
                  if (
                    (m &&
                      (Nd(m),
                      (s.curOp.selectionChanged = s.curOp.forceUpdate = !0)),
                    (s.curOp.updateMaxLine = !0),
                    !Qr(l.doc, c) && l.height != null)
                  ) {
                    var y = l.height
                    l.height = null
                    var x = _s(l) - y
                    x && In(c, c.height + x)
                  }
                  Fe(s, "markerChanged", s, n)
                })
            }),
            (oi.prototype.attachLine = function (n) {
              if (!this.lines.length && this.doc.cm) {
                var i = this.doc.cm.curOp
                ;(!i.maybeHiddenMarkers ||
                  rt(i.maybeHiddenMarkers, this) == -1) &&
                  (
                    i.maybeUnhiddenMarkers || (i.maybeUnhiddenMarkers = [])
                  ).push(this)
              }
              this.lines.push(n)
            }),
            (oi.prototype.detachLine = function (n) {
              if (
                (this.lines.splice(rt(this.lines, n), 1),
                !this.lines.length && this.doc.cm)
              ) {
                var i = this.doc.cm.curOp
                ;(i.maybeHiddenMarkers || (i.maybeHiddenMarkers = [])).push(
                  this,
                )
              }
            }),
            Qe(oi)
          function To(n, i, l, s, c) {
            if (s && s.shared) return qw(n, i, l, s, c)
            if (n.cm && !n.cm.curOp) return Ie(n.cm, To)(n, i, l, s, c)
            var d = new oi(n, c),
              m = Z(i, l)
            if (
              (s && St(s, d, !1), m > 0 || (m == 0 && d.clearWhenEmpty !== !1))
            )
              return d
            if (
              (d.replacedWith &&
                ((d.collapsed = !0),
                (d.widgetNode = q(
                  "span",
                  [d.replacedWith],
                  "CodeMirror-widget",
                )),
                s.handleMouseEvents ||
                  d.widgetNode.setAttribute("cm-ignore-events", "true"),
                s.insertLeft && (d.widgetNode.insertLeft = !0)),
              d.collapsed)
            ) {
              if (
                gd(n, i.line, i, l, d) ||
                (i.line != l.line && gd(n, l.line, i, l, d))
              )
                throw new Error(
                  "Inserting collapsed marker partially overlapping an existing one",
                )
              Ab()
            }
            d.addToHistory &&
              lp(n, { from: i, to: l, origin: "markText" }, n.sel, NaN)
            var y = i.line,
              x = n.cm,
              _
            if (
              (n.iter(y, l.line + 1, function (D) {
                x &&
                  d.collapsed &&
                  !x.options.lineWrapping &&
                  jn(D) == x.display.maxLine &&
                  (_ = !0),
                  d.collapsed && y != i.line && In(D, 0),
                  Nb(
                    D,
                    new Hl(
                      d,
                      y == i.line ? i.ch : null,
                      y == l.line ? l.ch : null,
                    ),
                    n.cm && n.cm.curOp,
                  ),
                  ++y
              }),
              d.collapsed &&
                n.iter(i.line, l.line + 1, function (D) {
                  Qr(n, D) && In(D, 0)
                }),
              d.clearOnEnter &&
                wt(d, "beforeCursorEnter", function () {
                  return d.clear()
                }),
              d.readOnly &&
                (Lb(),
                (n.history.done.length || n.history.undone.length) &&
                  n.clearHistory()),
              d.collapsed && ((d.id = ++Cp), (d.atomic = !0)),
              x)
            ) {
              if ((_ && (x.curOp.updateMaxLine = !0), d.collapsed))
                ln(x, i.line, l.line + 1)
              else if (
                d.className ||
                d.startStyle ||
                d.endStyle ||
                d.css ||
                d.attributes ||
                d.title
              )
                for (var P = i.line; P <= l.line; P++) ti(x, P, "text")
              d.atomic && pp(x.doc), Fe(x, "markerAdded", x, d)
            }
            return d
          }
          var zs = function (n, i) {
            ;(this.markers = n), (this.primary = i)
            for (var l = 0; l < n.length; ++l) n[l].parent = this
          }
          ;(zs.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              this.explicitlyCleared = !0
              for (var n = 0; n < this.markers.length; ++n)
                this.markers[n].clear()
              Fe(this, "clear")
            }
          }),
            (zs.prototype.find = function (n, i) {
              return this.primary.find(n, i)
            }),
            Qe(zs)
          function qw(n, i, l, s, c) {
            ;(s = St(s)), (s.shared = !1)
            var d = [To(n, i, l, s, c)],
              m = d[0],
              y = s.widgetNode
            return (
              ii(n, function (x) {
                y && (s.widgetNode = y.cloneNode(!0)),
                  d.push(To(x, Ht(x, i), Ht(x, l), s, c))
                for (var _ = 0; _ < x.linked.length; ++_)
                  if (x.linked[_].isParent) return
                m = ct(d)
              }),
              new zs(d, m)
            )
          }
          function Tp(n) {
            return n.findMarks(
              F(n.first, 0),
              n.clipPos(F(n.lastLine())),
              function (i) {
                return i.parent
              },
            )
          }
          function Hw(n, i) {
            for (var l = 0; l < i.length; l++) {
              var s = i[l],
                c = s.find(),
                d = n.clipPos(c.from),
                m = n.clipPos(c.to)
              if (Z(d, m)) {
                var y = To(n, d, m, s.primary, s.primary.type)
                s.markers.push(y), (y.parent = s)
              }
            }
          }
          function Bw(n) {
            for (
              var i = function (s) {
                  var c = n[s],
                    d = [c.primary.doc]
                  ii(c.primary.doc, function (x) {
                    return d.push(x)
                  })
                  for (var m = 0; m < c.markers.length; m++) {
                    var y = c.markers[m]
                    rt(d, y.doc) == -1 &&
                      ((y.parent = null), c.markers.splice(m--, 1))
                  }
                },
                l = 0;
              l < n.length;
              l++
            )
              i(l)
          }
          var Ww = 0,
            an = function (n, i, l, s, c) {
              if (!(this instanceof an)) return new an(n, i, l, s, c)
              l == null && (l = 0),
                $s.call(this, [new Ds([new po("", null)])]),
                (this.first = l),
                (this.scrollTop = this.scrollLeft = 0),
                (this.cantEdit = !1),
                (this.cleanGeneration = 1),
                (this.modeFrontier = this.highlightFrontier = l)
              var d = F(l, 0)
              ;(this.sel = ni(d)),
                (this.history = new ra(null)),
                (this.id = ++Ww),
                (this.modeOption = i),
                (this.lineSep = s),
                (this.direction = c == "rtl" ? "rtl" : "ltr"),
                (this.extend = !1),
                typeof n == "string" && (n = this.splitLines(n)),
                xu(this, { from: d, to: d, text: n }),
                Xe(this, ni(d), O)
            }
          ;(an.prototype = Dt($s.prototype, {
            constructor: an,
            iter: function (n, i, l) {
              l
                ? this.iterN(n - this.first, i - n, l)
                : this.iterN(this.first, this.first + this.size, n)
            },
            insert: function (n, i) {
              for (var l = 0, s = 0; s < i.length; ++s) l += i[s].height
              this.insertInner(n - this.first, i, l)
            },
            remove: function (n, i) {
              this.removeInner(n - this.first, i)
            },
            getValue: function (n) {
              var i = ho(this, this.first, this.first + this.size)
              return n === !1 ? i : i.join(n || this.lineSeparator())
            },
            setValue: qe(function (n) {
              var i = F(this.first, 0),
                l = this.first + this.size - 1
              ko(
                this,
                {
                  from: i,
                  to: F(l, Lt(this, l).text.length),
                  text: this.splitLines(n),
                  origin: "setValue",
                  full: !0,
                },
                !0,
              ),
                this.cm && Cs(this.cm, 0, 0),
                Xe(this, ni(i), O)
            }),
            replaceRange: function (n, i, l, s) {
              ;(i = Ht(this, i)),
                (l = l ? Ht(this, l) : i),
                Co(this, n, i, l, s)
            },
            getRange: function (n, i, l) {
              var s = Cr(this, Ht(this, n), Ht(this, i))
              return l === !1
                ? s
                : l === ""
                  ? s.join("")
                  : s.join(l || this.lineSeparator())
            },
            getLine: function (n) {
              var i = this.getLineHandle(n)
              return i && i.text
            },
            getLineHandle: function (n) {
              if (C(this, n)) return Lt(this, n)
            },
            getLineNumber: function (n) {
              return ae(n)
            },
            getLineHandleVisualStart: function (n) {
              return typeof n == "number" && (n = Lt(this, n)), jn(n)
            },
            lineCount: function () {
              return this.size
            },
            firstLine: function () {
              return this.first
            },
            lastLine: function () {
              return this.first + this.size - 1
            },
            clipPos: function (n) {
              return Ht(this, n)
            },
            getCursor: function (n) {
              var i = this.sel.primary(),
                l
              return (
                n == null || n == "head"
                  ? (l = i.head)
                  : n == "anchor"
                    ? (l = i.anchor)
                    : n == "end" || n == "to" || n === !1
                      ? (l = i.to())
                      : (l = i.from()),
                l
              )
            },
            listSelections: function () {
              return this.sel.ranges
            },
            somethingSelected: function () {
              return this.sel.somethingSelected()
            },
            setCursor: qe(function (n, i, l) {
              fp(
                this,
                Ht(this, typeof n == "number" ? F(n, i || 0) : n),
                null,
                l,
              )
            }),
            setSelection: qe(function (n, i, l) {
              fp(this, Ht(this, n), Ht(this, i || n), l)
            }),
            extendSelection: qe(function (n, i, l) {
              oa(this, Ht(this, n), i && Ht(this, i), l)
            }),
            extendSelections: qe(function (n, i) {
              up(this, ed(this, n), i)
            }),
            extendSelectionsBy: qe(function (n, i) {
              var l = vt(this.sel.ranges, n)
              up(this, ed(this, l), i)
            }),
            setSelections: qe(function (n, i, l) {
              if (n.length) {
                for (var s = [], c = 0; c < n.length; c++)
                  s[c] = new ce(
                    Ht(this, n[c].anchor),
                    Ht(this, n[c].head || n[c].anchor),
                  )
                i == null && (i = Math.min(n.length - 1, this.sel.primIndex)),
                  Xe(this, Vn(this.cm, s, i), l)
              }
            }),
            addSelection: qe(function (n, i, l) {
              var s = this.sel.ranges.slice(0)
              s.push(new ce(Ht(this, n), Ht(this, i || n))),
                Xe(this, Vn(this.cm, s, s.length - 1), l)
            }),
            getSelection: function (n) {
              for (var i = this.sel.ranges, l, s = 0; s < i.length; s++) {
                var c = Cr(this, i[s].from(), i[s].to())
                l = l ? l.concat(c) : c
              }
              return n === !1 ? l : l.join(n || this.lineSeparator())
            },
            getSelections: function (n) {
              for (var i = [], l = this.sel.ranges, s = 0; s < l.length; s++) {
                var c = Cr(this, l[s].from(), l[s].to())
                n !== !1 && (c = c.join(n || this.lineSeparator())), (i[s] = c)
              }
              return i
            },
            replaceSelection: function (n, i, l) {
              for (var s = [], c = 0; c < this.sel.ranges.length; c++) s[c] = n
              this.replaceSelections(s, i, l || "+input")
            },
            replaceSelections: qe(function (n, i, l) {
              for (var s = [], c = this.sel, d = 0; d < c.ranges.length; d++) {
                var m = c.ranges[d]
                s[d] = {
                  from: m.from(),
                  to: m.to(),
                  text: this.splitLines(n[d]),
                  origin: l,
                }
              }
              for (
                var y = i && i != "end" && Mw(this, s, i), x = s.length - 1;
                x >= 0;
                x--
              )
                ko(this, s[x])
              y ? hp(this, y) : this.cm && wo(this.cm)
            }),
            undo: qe(function () {
              aa(this, "undo")
            }),
            redo: qe(function () {
              aa(this, "redo")
            }),
            undoSelection: qe(function () {
              aa(this, "undo", !0)
            }),
            redoSelection: qe(function () {
              aa(this, "redo", !0)
            }),
            setExtending: function (n) {
              this.extend = n
            },
            getExtending: function () {
              return this.extend
            },
            historySize: function () {
              for (
                var n = this.history, i = 0, l = 0, s = 0;
                s < n.done.length;
                s++
              )
                n.done[s].ranges || ++i
              for (var c = 0; c < n.undone.length; c++)
                n.undone[c].ranges || ++l
              return { undo: i, redo: l }
            },
            clearHistory: function () {
              var n = this
              ;(this.history = new ra(this.history)),
                ii(
                  this,
                  function (i) {
                    return (i.history = n.history)
                  },
                  !0,
                )
            },
            markClean: function () {
              this.cleanGeneration = this.changeGeneration(!0)
            },
            changeGeneration: function (n) {
              return (
                n &&
                  (this.history.lastOp =
                    this.history.lastSelOp =
                    this.history.lastOrigin =
                      null),
                this.history.generation
              )
            },
            isClean: function (n) {
              return this.history.generation == (n || this.cleanGeneration)
            },
            getHistory: function () {
              return {
                done: _o(this.history.done),
                undone: _o(this.history.undone),
              }
            },
            setHistory: function (n) {
              var i = (this.history = new ra(this.history))
              ;(i.done = _o(n.done.slice(0), null, !0)),
                (i.undone = _o(n.undone.slice(0), null, !0))
            },
            setGutterMarker: qe(function (n, i, l) {
              return Os(this, n, "gutter", function (s) {
                var c = s.gutterMarkers || (s.gutterMarkers = {})
                return (c[i] = l), !l && Gt(c) && (s.gutterMarkers = null), !0
              })
            }),
            clearGutter: qe(function (n) {
              var i = this
              this.iter(function (l) {
                l.gutterMarkers &&
                  l.gutterMarkers[n] &&
                  Os(i, l, "gutter", function () {
                    return (
                      (l.gutterMarkers[n] = null),
                      Gt(l.gutterMarkers) && (l.gutterMarkers = null),
                      !0
                    )
                  })
              })
            }),
            lineInfo: function (n) {
              var i
              if (typeof n == "number") {
                if (!C(this, n) || ((i = n), (n = Lt(this, n)), !n)) return null
              } else if (((i = ae(n)), i == null)) return null
              return {
                line: i,
                handle: n,
                text: n.text,
                gutterMarkers: n.gutterMarkers,
                textClass: n.textClass,
                bgClass: n.bgClass,
                wrapClass: n.wrapClass,
                widgets: n.widgets,
              }
            },
            addLineClass: qe(function (n, i, l) {
              return Os(
                this,
                n,
                i == "gutter" ? "gutter" : "class",
                function (s) {
                  var c =
                    i == "text"
                      ? "textClass"
                      : i == "background"
                        ? "bgClass"
                        : i == "gutter"
                          ? "gutterClass"
                          : "wrapClass"
                  if (!s[c]) s[c] = l
                  else {
                    if (dt(l).test(s[c])) return !1
                    s[c] += " " + l
                  }
                  return !0
                },
              )
            }),
            removeLineClass: qe(function (n, i, l) {
              return Os(
                this,
                n,
                i == "gutter" ? "gutter" : "class",
                function (s) {
                  var c =
                      i == "text"
                        ? "textClass"
                        : i == "background"
                          ? "bgClass"
                          : i == "gutter"
                            ? "gutterClass"
                            : "wrapClass",
                    d = s[c]
                  if (d)
                    if (l == null) s[c] = null
                    else {
                      var m = d.match(dt(l))
                      if (!m) return !1
                      var y = m.index + m[0].length
                      s[c] =
                        d.slice(0, m.index) +
                          (!m.index || y == d.length ? "" : " ") +
                          d.slice(y) || null
                    }
                  else return !1
                  return !0
                },
              )
            }),
            addLineWidget: qe(function (n, i, l) {
              return Iw(this, n, i, l)
            }),
            removeLineWidget: function (n) {
              n.clear()
            },
            markText: function (n, i, l) {
              return To(
                this,
                Ht(this, n),
                Ht(this, i),
                l,
                (l && l.type) || "range",
              )
            },
            setBookmark: function (n, i) {
              var l = {
                replacedWith: i && (i.nodeType == null ? i.widget : i),
                insertLeft: i && i.insertLeft,
                clearWhenEmpty: !1,
                shared: i && i.shared,
                handleMouseEvents: i && i.handleMouseEvents,
              }
              return (n = Ht(this, n)), To(this, n, n, l, "bookmark")
            },
            findMarksAt: function (n) {
              n = Ht(this, n)
              var i = [],
                l = Lt(this, n.line).markedSpans
              if (l)
                for (var s = 0; s < l.length; ++s) {
                  var c = l[s]
                  ;(c.from == null || c.from <= n.ch) &&
                    (c.to == null || c.to >= n.ch) &&
                    i.push(c.marker.parent || c.marker)
                }
              return i
            },
            findMarks: function (n, i, l) {
              ;(n = Ht(this, n)), (i = Ht(this, i))
              var s = [],
                c = n.line
              return (
                this.iter(n.line, i.line + 1, function (d) {
                  var m = d.markedSpans
                  if (m)
                    for (var y = 0; y < m.length; y++) {
                      var x = m[y]
                      !(
                        (x.to != null && c == n.line && n.ch >= x.to) ||
                        (x.from == null && c != n.line) ||
                        (x.from != null && c == i.line && x.from >= i.ch)
                      ) &&
                        (!l || l(x.marker)) &&
                        s.push(x.marker.parent || x.marker)
                    }
                  ++c
                }),
                s
              )
            },
            getAllMarks: function () {
              var n = []
              return (
                this.iter(function (i) {
                  var l = i.markedSpans
                  if (l)
                    for (var s = 0; s < l.length; ++s)
                      l[s].from != null && n.push(l[s].marker)
                }),
                n
              )
            },
            posFromIndex: function (n) {
              var i,
                l = this.first,
                s = this.lineSeparator().length
              return (
                this.iter(function (c) {
                  var d = c.text.length + s
                  if (d > n) return (i = n), !0
                  ;(n -= d), ++l
                }),
                Ht(this, F(l, i))
              )
            },
            indexFromPos: function (n) {
              n = Ht(this, n)
              var i = n.ch
              if (n.line < this.first || n.ch < 0) return 0
              var l = this.lineSeparator().length
              return (
                this.iter(this.first, n.line, function (s) {
                  i += s.text.length + l
                }),
                i
              )
            },
            copy: function (n) {
              var i = new an(
                ho(this, this.first, this.first + this.size),
                this.modeOption,
                this.first,
                this.lineSep,
                this.direction,
              )
              return (
                (i.scrollTop = this.scrollTop),
                (i.scrollLeft = this.scrollLeft),
                (i.sel = this.sel),
                (i.extend = !1),
                n &&
                  ((i.history.undoDepth = this.history.undoDepth),
                  i.setHistory(this.getHistory())),
                i
              )
            },
            linkedDoc: function (n) {
              n || (n = {})
              var i = this.first,
                l = this.first + this.size
              n.from != null && n.from > i && (i = n.from),
                n.to != null && n.to < l && (l = n.to)
              var s = new an(
                ho(this, i, l),
                n.mode || this.modeOption,
                i,
                this.lineSep,
                this.direction,
              )
              return (
                n.sharedHist && (s.history = this.history),
                (this.linked || (this.linked = [])).push({
                  doc: s,
                  sharedHist: n.sharedHist,
                }),
                (s.linked = [
                  { doc: this, isParent: !0, sharedHist: n.sharedHist },
                ]),
                Hw(s, Tp(this)),
                s
              )
            },
            unlinkDoc: function (n) {
              if ((n instanceof we && (n = n.doc), this.linked))
                for (var i = 0; i < this.linked.length; ++i) {
                  var l = this.linked[i]
                  if (l.doc == n) {
                    this.linked.splice(i, 1), n.unlinkDoc(this), Bw(Tp(this))
                    break
                  }
                }
              if (n.history == this.history) {
                var s = [n.id]
                ii(
                  n,
                  function (c) {
                    return s.push(c.id)
                  },
                  !0,
                ),
                  (n.history = new ra(null)),
                  (n.history.done = _o(this.history.done, s)),
                  (n.history.undone = _o(this.history.undone, s))
              }
            },
            iterLinkedDocs: function (n) {
              ii(this, n)
            },
            getMode: function () {
              return this.mode
            },
            getEditor: function () {
              return this.cm
            },
            splitLines: function (n) {
              return this.lineSep ? n.split(this.lineSep) : vs(n)
            },
            lineSeparator: function () {
              return (
                this.lineSep ||
                `
`
              )
            },
            setDirection: qe(function (n) {
              n != "rtl" && (n = "ltr"),
                n != this.direction &&
                  ((this.direction = n),
                  this.iter(function (i) {
                    return (i.order = null)
                  }),
                  this.cm && Nw(this.cm))
            }),
          })),
            (an.prototype.eachLine = an.prototype.iter)
          var Ep = 0
          function Uw(n) {
            var i = this
            if ((Lp(i), !(Ce(i, n) || Lr(i.display, n)))) {
              Ke(n), p && (Ep = +new Date())
              var l = Pi(i, n, !0),
                s = n.dataTransfer.files
              if (!(!l || i.isReadOnly()))
                if (s && s.length && window.FileReader && window.File)
                  for (
                    var c = s.length,
                      d = Array(c),
                      m = 0,
                      y = function () {
                        ++m == c &&
                          Ie(i, function () {
                            l = Ht(i.doc, l)
                            var H = {
                              from: l,
                              to: l,
                              text: i.doc.splitLines(
                                d
                                  .filter(function (J) {
                                    return J != null
                                  })
                                  .join(i.doc.lineSeparator()),
                              ),
                              origin: "paste",
                            }
                            ko(i.doc, H),
                              hp(i.doc, ni(Ht(i.doc, l), Ht(i.doc, ri(H))))
                          })()
                      },
                      x = function (H, J) {
                        if (
                          i.options.allowDropFileTypes &&
                          rt(i.options.allowDropFileTypes, H.type) == -1
                        ) {
                          y()
                          return
                        }
                        var it = new FileReader()
                        ;(it.onerror = function () {
                          return y()
                        }),
                          (it.onload = function () {
                            var gt = it.result
                            if (/[\x00-\x08\x0e-\x1f]{2}/.test(gt)) {
                              y()
                              return
                            }
                            ;(d[J] = gt), y()
                          }),
                          it.readAsText(H)
                      },
                      _ = 0;
                    _ < s.length;
                    _++
                  )
                    x(s[_], _)
                else {
                  if (i.state.draggingText && i.doc.sel.contains(l) > -1) {
                    i.state.draggingText(n),
                      setTimeout(function () {
                        return i.display.input.focus()
                      }, 20)
                    return
                  }
                  try {
                    var P = n.dataTransfer.getData("Text")
                    if (P) {
                      var D
                      if (
                        (i.state.draggingText &&
                          !i.state.draggingText.copy &&
                          (D = i.listSelections()),
                        sa(i.doc, ni(l, l)),
                        D)
                      )
                        for (var U = 0; U < D.length; ++U)
                          Co(i.doc, "", D[U].anchor, D[U].head, "drag")
                      i.replaceSelection(P, "around", "paste"),
                        i.display.input.focus()
                    }
                  } catch {}
                }
            }
          }
          function jw(n, i) {
            if (p && (!n.state.draggingText || +new Date() - Ep < 100)) {
              _r(i)
              return
            }
            if (
              !(Ce(n, i) || Lr(n.display, i)) &&
              (i.dataTransfer.setData("Text", n.getSelection()),
              (i.dataTransfer.effectAllowed = "copyMove"),
              i.dataTransfer.setDragImage && !L)
            ) {
              var l = k("img", null, null, "position: fixed; left: 0; top: 0;")
              ;(l.src =
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                N &&
                  ((l.width = l.height = 1),
                  n.display.wrapper.appendChild(l),
                  (l._top = l.offsetTop)),
                i.dataTransfer.setDragImage(l, 0, 0),
                N && l.parentNode.removeChild(l)
            }
          }
          function Gw(n, i) {
            var l = Pi(n, i)
            if (l) {
              var s = document.createDocumentFragment()
              au(n, l, s),
                n.display.dragCursor ||
                  ((n.display.dragCursor = k(
                    "div",
                    null,
                    "CodeMirror-cursors CodeMirror-dragcursors",
                  )),
                  n.display.lineSpace.insertBefore(
                    n.display.dragCursor,
                    n.display.cursorDiv,
                  )),
                z(n.display.dragCursor, s)
            }
          }
          function Lp(n) {
            n.display.dragCursor &&
              (n.display.lineSpace.removeChild(n.display.dragCursor),
              (n.display.dragCursor = null))
          }
          function Ap(n) {
            if (document.getElementsByClassName) {
              for (
                var i = document.getElementsByClassName("CodeMirror"),
                  l = [],
                  s = 0;
                s < i.length;
                s++
              ) {
                var c = i[s].CodeMirror
                c && l.push(c)
              }
              l.length &&
                l[0].operation(function () {
                  for (var d = 0; d < l.length; d++) n(l[d])
                })
            }
          }
          var Mp = !1
          function Vw() {
            Mp || (Kw(), (Mp = !0))
          }
          function Kw() {
            var n
            wt(window, "resize", function () {
              n == null &&
                (n = setTimeout(function () {
                  ;(n = null), Ap(Xw)
                }, 100))
            }),
              wt(window, "blur", function () {
                return Ap(bo)
              })
          }
          function Xw(n) {
            var i = n.display
            ;(i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null),
              (i.scrollbarsClipped = !1),
              n.setSize()
          }
          for (
            var si = {
                3: "Pause",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                61: "=",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                106: "*",
                107: "=",
                109: "-",
                110: ".",
                111: "/",
                145: "ScrollLock",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                224: "Mod",
                63232: "Up",
                63233: "Down",
                63234: "Left",
                63235: "Right",
                63272: "Delete",
                63273: "Home",
                63275: "End",
                63276: "PageUp",
                63277: "PageDown",
                63302: "Insert",
              },
              Fs = 0;
            Fs < 10;
            Fs++
          )
            si[Fs + 48] = si[Fs + 96] = String(Fs)
          for (var ca = 65; ca <= 90; ca++) si[ca] = String.fromCharCode(ca)
          for (var Is = 1; Is <= 12; Is++)
            si[Is + 111] = si[Is + 63235] = "F" + Is
          var Mr = {}
          ;(Mr.basic = {
            "Left": "goCharLeft",
            "Right": "goCharRight",
            "Up": "goLineUp",
            "Down": "goLineDown",
            "End": "goLineEnd",
            "Home": "goLineStartSmart",
            "PageUp": "goPageUp",
            "PageDown": "goPageDown",
            "Delete": "delCharAfter",
            "Backspace": "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            "Tab": "defaultTab",
            "Shift-Tab": "indentAuto",
            "Enter": "newlineAndIndent",
            "Insert": "toggleOverwrite",
            "Esc": "singleSelection",
          }),
            (Mr.pcDefault = {
              "Ctrl-A": "selectAll",
              "Ctrl-D": "deleteLine",
              "Ctrl-Z": "undo",
              "Shift-Ctrl-Z": "redo",
              "Ctrl-Y": "redo",
              "Ctrl-Home": "goDocStart",
              "Ctrl-End": "goDocEnd",
              "Ctrl-Up": "goLineUp",
              "Ctrl-Down": "goLineDown",
              "Ctrl-Left": "goGroupLeft",
              "Ctrl-Right": "goGroupRight",
              "Alt-Left": "goLineStart",
              "Alt-Right": "goLineEnd",
              "Ctrl-Backspace": "delGroupBefore",
              "Ctrl-Delete": "delGroupAfter",
              "Ctrl-S": "save",
              "Ctrl-F": "find",
              "Ctrl-G": "findNext",
              "Shift-Ctrl-G": "findPrev",
              "Shift-Ctrl-F": "replace",
              "Shift-Ctrl-R": "replaceAll",
              "Ctrl-[": "indentLess",
              "Ctrl-]": "indentMore",
              "Ctrl-U": "undoSelection",
              "Shift-Ctrl-U": "redoSelection",
              "Alt-U": "redoSelection",
              "fallthrough": "basic",
            }),
            (Mr.emacsy = {
              "Ctrl-F": "goCharRight",
              "Ctrl-B": "goCharLeft",
              "Ctrl-P": "goLineUp",
              "Ctrl-N": "goLineDown",
              "Ctrl-A": "goLineStart",
              "Ctrl-E": "goLineEnd",
              "Ctrl-V": "goPageDown",
              "Shift-Ctrl-V": "goPageUp",
              "Ctrl-D": "delCharAfter",
              "Ctrl-H": "delCharBefore",
              "Alt-Backspace": "delWordBefore",
              "Ctrl-K": "killLine",
              "Ctrl-T": "transposeChars",
              "Ctrl-O": "openLine",
            }),
            (Mr.macDefault = {
              "Cmd-A": "selectAll",
              "Cmd-D": "deleteLine",
              "Cmd-Z": "undo",
              "Shift-Cmd-Z": "redo",
              "Cmd-Y": "redo",
              "Cmd-Home": "goDocStart",
              "Cmd-Up": "goDocStart",
              "Cmd-End": "goDocEnd",
              "Cmd-Down": "goDocEnd",
              "Alt-Left": "goGroupLeft",
              "Alt-Right": "goGroupRight",
              "Cmd-Left": "goLineLeft",
              "Cmd-Right": "goLineRight",
              "Alt-Backspace": "delGroupBefore",
              "Ctrl-Alt-Backspace": "delGroupAfter",
              "Alt-Delete": "delGroupAfter",
              "Cmd-S": "save",
              "Cmd-F": "find",
              "Cmd-G": "findNext",
              "Shift-Cmd-G": "findPrev",
              "Cmd-Alt-F": "replace",
              "Shift-Cmd-Alt-F": "replaceAll",
              "Cmd-[": "indentLess",
              "Cmd-]": "indentMore",
              "Cmd-Backspace": "delWrappedLineLeft",
              "Cmd-Delete": "delWrappedLineRight",
              "Cmd-U": "undoSelection",
              "Shift-Cmd-U": "redoSelection",
              "Ctrl-Up": "goDocStart",
              "Ctrl-Down": "goDocEnd",
              "fallthrough": ["basic", "emacsy"],
            }),
            (Mr.default = W ? Mr.macDefault : Mr.pcDefault)
          function Yw(n) {
            var i = n.split(/-(?!$)/)
            n = i[i.length - 1]
            for (var l, s, c, d, m = 0; m < i.length - 1; m++) {
              var y = i[m]
              if (/^(cmd|meta|m)$/i.test(y)) d = !0
              else if (/^a(lt)?$/i.test(y)) l = !0
              else if (/^(c|ctrl|control)$/i.test(y)) s = !0
              else if (/^s(hift)?$/i.test(y)) c = !0
              else throw new Error("Unrecognized modifier name: " + y)
            }
            return (
              l && (n = "Alt-" + n),
              s && (n = "Ctrl-" + n),
              d && (n = "Cmd-" + n),
              c && (n = "Shift-" + n),
              n
            )
          }
          function Zw(n) {
            var i = {}
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                var s = n[l]
                if (/^(name|fallthrough|(de|at)tach)$/.test(l)) continue
                if (s == "...") {
                  delete n[l]
                  continue
                }
                for (var c = vt(l.split(" "), Yw), d = 0; d < c.length; d++) {
                  var m = void 0,
                    y = void 0
                  d == c.length - 1
                    ? ((y = c.join(" ")), (m = s))
                    : ((y = c.slice(0, d + 1).join(" ")), (m = "..."))
                  var x = i[y]
                  if (!x) i[y] = m
                  else if (x != m)
                    throw new Error("Inconsistent bindings for " + y)
                }
                delete n[l]
              }
            for (var _ in i) n[_] = i[_]
            return n
          }
          function Eo(n, i, l, s) {
            i = ua(i)
            var c = i.call ? i.call(n, s) : i[n]
            if (c === !1) return "nothing"
            if (c === "...") return "multi"
            if (c != null && l(c)) return "handled"
            if (i.fallthrough) {
              if (
                Object.prototype.toString.call(i.fallthrough) !=
                "[object Array]"
              )
                return Eo(n, i.fallthrough, l, s)
              for (var d = 0; d < i.fallthrough.length; d++) {
                var m = Eo(n, i.fallthrough[d], l, s)
                if (m) return m
              }
            }
          }
          function Np(n) {
            var i = typeof n == "string" ? n : si[n.keyCode]
            return i == "Ctrl" || i == "Alt" || i == "Shift" || i == "Mod"
          }
          function Pp(n, i, l) {
            var s = n
            return (
              i.altKey && s != "Alt" && (n = "Alt-" + n),
              (et ? i.metaKey : i.ctrlKey) && s != "Ctrl" && (n = "Ctrl-" + n),
              (et ? i.ctrlKey : i.metaKey) && s != "Mod" && (n = "Cmd-" + n),
              !l && i.shiftKey && s != "Shift" && (n = "Shift-" + n),
              n
            )
          }
          function Op(n, i) {
            if (N && n.keyCode == 34 && n.char) return !1
            var l = si[n.keyCode]
            return l == null || n.altGraphKey
              ? !1
              : (n.keyCode == 3 && n.code && (l = n.code), Pp(l, n, i))
          }
          function ua(n) {
            return typeof n == "string" ? Mr[n] : n
          }
          function Lo(n, i) {
            for (var l = n.doc.sel.ranges, s = [], c = 0; c < l.length; c++) {
              for (var d = i(l[c]); s.length && Z(d.from, ct(s).to) <= 0; ) {
                var m = s.pop()
                if (Z(m.from, d.from) < 0) {
                  d.from = m.from
                  break
                }
              }
              s.push(d)
            }
            xn(n, function () {
              for (var y = s.length - 1; y >= 0; y--)
                Co(n.doc, "", s[y].from, s[y].to, "+delete")
              wo(n)
            })
          }
          function Cu(n, i, l) {
            var s = ue(n.text, i + l, l)
            return s < 0 || s > n.text.length ? null : s
          }
          function Tu(n, i, l) {
            var s = Cu(n, i.ch, l)
            return s == null
              ? null
              : new F(i.line, s, l < 0 ? "after" : "before")
          }
          function Eu(n, i, l, s, c) {
            if (n) {
              i.doc.direction == "rtl" && (c = -c)
              var d = ye(l, i.doc.direction)
              if (d) {
                var m = c < 0 ? ct(d) : d[0],
                  y = c < 0 == (m.level == 1),
                  x = y ? "after" : "before",
                  _
                if (m.level > 0 || i.doc.direction == "rtl") {
                  var P = vo(i, l)
                  _ = c < 0 ? l.text.length - 1 : 0
                  var D = cr(i, P, _).top
                  ;(_ = te(
                    function (U) {
                      return cr(i, P, U).top == D
                    },
                    c < 0 == (m.level == 1) ? m.from : m.to - 1,
                    _,
                  )),
                    x == "before" && (_ = Cu(l, _, 1))
                } else _ = c < 0 ? m.to : m.from
                return new F(s, _, x)
              }
            }
            return new F(
              s,
              c < 0 ? l.text.length : 0,
              c < 0 ? "before" : "after",
            )
          }
          function Jw(n, i, l, s) {
            var c = ye(i, n.doc.direction)
            if (!c) return Tu(i, l, s)
            l.ch >= i.text.length
              ? ((l.ch = i.text.length), (l.sticky = "before"))
              : l.ch <= 0 && ((l.ch = 0), (l.sticky = "after"))
            var d = We(c, l.ch, l.sticky),
              m = c[d]
            if (
              n.doc.direction == "ltr" &&
              m.level % 2 == 0 &&
              (s > 0 ? m.to > l.ch : m.from < l.ch)
            )
              return Tu(i, l, s)
            var y = function (yt, kt) {
                return Cu(i, yt instanceof F ? yt.ch : yt, kt)
              },
              x,
              _ = function (yt) {
                return n.options.lineWrapping
                  ? ((x = x || vo(n, i)), Fd(n, i, x, yt))
                  : { begin: 0, end: i.text.length }
              },
              P = _(l.sticky == "before" ? y(l, -1) : l.ch)
            if (n.doc.direction == "rtl" || m.level == 1) {
              var D = (m.level == 1) == s < 0,
                U = y(l, D ? 1 : -1)
              if (
                U != null &&
                (D ? U <= m.to && U <= P.end : U >= m.from && U >= P.begin)
              ) {
                var H = D ? "before" : "after"
                return new F(l.line, U, H)
              }
            }
            var J = function (yt, kt, bt) {
                for (
                  var Ct = function (ge, He) {
                    return He
                      ? new F(l.line, y(ge, 1), "before")
                      : new F(l.line, ge, "after")
                  };
                  yt >= 0 && yt < c.length;
                  yt += kt
                ) {
                  var $t = c[yt],
                    Pt = kt > 0 == ($t.level != 1),
                    jt = Pt ? bt.begin : y(bt.end, -1)
                  if (
                    ($t.from <= jt && jt < $t.to) ||
                    ((jt = Pt ? $t.from : y($t.to, -1)),
                    bt.begin <= jt && jt < bt.end)
                  )
                    return Ct(jt, Pt)
                }
              },
              it = J(d + s, s, P)
            if (it) return it
            var gt = s > 0 ? P.end : y(P.begin, -1)
            return gt != null &&
              !(s > 0 && gt == i.text.length) &&
              ((it = J(s > 0 ? 0 : c.length - 1, s, _(gt))), it)
              ? it
              : null
          }
          var qs = {
            selectAll: mp,
            singleSelection: function (n) {
              return n.setSelection(
                n.getCursor("anchor"),
                n.getCursor("head"),
                O,
              )
            },
            killLine: function (n) {
              return Lo(n, function (i) {
                if (i.empty()) {
                  var l = Lt(n.doc, i.head.line).text.length
                  return i.head.ch == l && i.head.line < n.lastLine()
                    ? { from: i.head, to: F(i.head.line + 1, 0) }
                    : { from: i.head, to: F(i.head.line, l) }
                } else return { from: i.from(), to: i.to() }
              })
            },
            deleteLine: function (n) {
              return Lo(n, function (i) {
                return {
                  from: F(i.from().line, 0),
                  to: Ht(n.doc, F(i.to().line + 1, 0)),
                }
              })
            },
            delLineLeft: function (n) {
              return Lo(n, function (i) {
                return { from: F(i.from().line, 0), to: i.from() }
              })
            },
            delWrappedLineLeft: function (n) {
              return Lo(n, function (i) {
                var l = n.charCoords(i.head, "div").top + 5,
                  s = n.coordsChar({ left: 0, top: l }, "div")
                return { from: s, to: i.from() }
              })
            },
            delWrappedLineRight: function (n) {
              return Lo(n, function (i) {
                var l = n.charCoords(i.head, "div").top + 5,
                  s = n.coordsChar(
                    { left: n.display.lineDiv.offsetWidth + 100, top: l },
                    "div",
                  )
                return { from: i.from(), to: s }
              })
            },
            undo: function (n) {
              return n.undo()
            },
            redo: function (n) {
              return n.redo()
            },
            undoSelection: function (n) {
              return n.undoSelection()
            },
            redoSelection: function (n) {
              return n.redoSelection()
            },
            goDocStart: function (n) {
              return n.extendSelection(F(n.firstLine(), 0))
            },
            goDocEnd: function (n) {
              return n.extendSelection(F(n.lastLine()))
            },
            goLineStart: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return Dp(n, i.head.line)
                },
                { origin: "+move", bias: 1 },
              )
            },
            goLineStartSmart: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return $p(n, i.head)
                },
                { origin: "+move", bias: 1 },
              )
            },
            goLineEnd: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return Qw(n, i.head.line)
                },
                { origin: "+move", bias: -1 },
              )
            },
            goLineRight: function (n) {
              return n.extendSelectionsBy(function (i) {
                var l = n.cursorCoords(i.head, "div").top + 5
                return n.coordsChar(
                  { left: n.display.lineDiv.offsetWidth + 100, top: l },
                  "div",
                )
              }, K)
            },
            goLineLeft: function (n) {
              return n.extendSelectionsBy(function (i) {
                var l = n.cursorCoords(i.head, "div").top + 5
                return n.coordsChar({ left: 0, top: l }, "div")
              }, K)
            },
            goLineLeftSmart: function (n) {
              return n.extendSelectionsBy(function (i) {
                var l = n.cursorCoords(i.head, "div").top + 5,
                  s = n.coordsChar({ left: 0, top: l }, "div")
                return s.ch < n.getLine(s.line).search(/\S/) ? $p(n, i.head) : s
              }, K)
            },
            goLineUp: function (n) {
              return n.moveV(-1, "line")
            },
            goLineDown: function (n) {
              return n.moveV(1, "line")
            },
            goPageUp: function (n) {
              return n.moveV(-1, "page")
            },
            goPageDown: function (n) {
              return n.moveV(1, "page")
            },
            goCharLeft: function (n) {
              return n.moveH(-1, "char")
            },
            goCharRight: function (n) {
              return n.moveH(1, "char")
            },
            goColumnLeft: function (n) {
              return n.moveH(-1, "column")
            },
            goColumnRight: function (n) {
              return n.moveH(1, "column")
            },
            goWordLeft: function (n) {
              return n.moveH(-1, "word")
            },
            goGroupRight: function (n) {
              return n.moveH(1, "group")
            },
            goGroupLeft: function (n) {
              return n.moveH(-1, "group")
            },
            goWordRight: function (n) {
              return n.moveH(1, "word")
            },
            delCharBefore: function (n) {
              return n.deleteH(-1, "codepoint")
            },
            delCharAfter: function (n) {
              return n.deleteH(1, "char")
            },
            delWordBefore: function (n) {
              return n.deleteH(-1, "word")
            },
            delWordAfter: function (n) {
              return n.deleteH(1, "word")
            },
            delGroupBefore: function (n) {
              return n.deleteH(-1, "group")
            },
            delGroupAfter: function (n) {
              return n.deleteH(1, "group")
            },
            indentAuto: function (n) {
              return n.indentSelection("smart")
            },
            indentMore: function (n) {
              return n.indentSelection("add")
            },
            indentLess: function (n) {
              return n.indentSelection("subtract")
            },
            insertTab: function (n) {
              return n.replaceSelection("	")
            },
            insertSoftTab: function (n) {
              for (
                var i = [],
                  l = n.listSelections(),
                  s = n.options.tabSize,
                  c = 0;
                c < l.length;
                c++
              ) {
                var d = l[c].from(),
                  m = j(n.getLine(d.line), d.ch, s)
                i.push(at(s - (m % s)))
              }
              n.replaceSelections(i)
            },
            defaultTab: function (n) {
              n.somethingSelected()
                ? n.indentSelection("add")
                : n.execCommand("insertTab")
            },
            transposeChars: function (n) {
              return xn(n, function () {
                for (
                  var i = n.listSelections(), l = [], s = 0;
                  s < i.length;
                  s++
                )
                  if (i[s].empty()) {
                    var c = i[s].head,
                      d = Lt(n.doc, c.line).text
                    if (d) {
                      if (
                        (c.ch == d.length && (c = new F(c.line, c.ch - 1)),
                        c.ch > 0)
                      )
                        (c = new F(c.line, c.ch + 1)),
                          n.replaceRange(
                            d.charAt(c.ch - 1) + d.charAt(c.ch - 2),
                            F(c.line, c.ch - 2),
                            c,
                            "+transpose",
                          )
                      else if (c.line > n.doc.first) {
                        var m = Lt(n.doc, c.line - 1).text
                        m &&
                          ((c = new F(c.line, 1)),
                          n.replaceRange(
                            d.charAt(0) +
                              n.doc.lineSeparator() +
                              m.charAt(m.length - 1),
                            F(c.line - 1, m.length - 1),
                            c,
                            "+transpose",
                          ))
                      }
                    }
                    l.push(new ce(c, c))
                  }
                n.setSelections(l)
              })
            },
            newlineAndIndent: function (n) {
              return xn(n, function () {
                for (var i = n.listSelections(), l = i.length - 1; l >= 0; l--)
                  n.replaceRange(
                    n.doc.lineSeparator(),
                    i[l].anchor,
                    i[l].head,
                    "+input",
                  )
                i = n.listSelections()
                for (var s = 0; s < i.length; s++)
                  n.indentLine(i[s].from().line, null, !0)
                wo(n)
              })
            },
            openLine: function (n) {
              return n.replaceSelection(
                `
`,
                "start",
              )
            },
            toggleOverwrite: function (n) {
              return n.toggleOverwrite()
            },
          }
          function Dp(n, i) {
            var l = Lt(n.doc, i),
              s = jn(l)
            return s != l && (i = ae(s)), Eu(!0, n, s, i, 1)
          }
          function Qw(n, i) {
            var l = Lt(n.doc, i),
              s = Rb(l)
            return s != l && (i = ae(s)), Eu(!0, n, l, i, -1)
          }
          function $p(n, i) {
            var l = Dp(n, i.line),
              s = Lt(n.doc, l.line),
              c = ye(s, n.doc.direction)
            if (!c || c[0].level == 0) {
              var d = Math.max(l.ch, s.text.search(/\S/)),
                m = i.line == l.line && i.ch <= d && i.ch
              return F(l.line, m ? 0 : d, l.sticky)
            }
            return l
          }
          function fa(n, i, l) {
            if (typeof i == "string" && ((i = qs[i]), !i)) return !1
            n.display.input.ensurePolled()
            var s = n.display.shift,
              c = !1
            try {
              n.isReadOnly() && (n.state.suppressEdits = !0),
                l && (n.display.shift = !1),
                (c = i(n) != Mt)
            } finally {
              ;(n.display.shift = s), (n.state.suppressEdits = !1)
            }
            return c
          }
          function tx(n, i, l) {
            for (var s = 0; s < n.state.keyMaps.length; s++) {
              var c = Eo(i, n.state.keyMaps[s], l, n)
              if (c) return c
            }
            return (
              (n.options.extraKeys && Eo(i, n.options.extraKeys, l, n)) ||
              Eo(i, n.options.keyMap, l, n)
            )
          }
          var ex = new nt()
          function Hs(n, i, l, s) {
            var c = n.state.keySeq
            if (c) {
              if (Np(i)) return "handled"
              if (
                (/\'$/.test(i)
                  ? (n.state.keySeq = null)
                  : ex.set(50, function () {
                      n.state.keySeq == c &&
                        ((n.state.keySeq = null), n.display.input.reset())
                    }),
                Rp(n, c + " " + i, l, s))
              )
                return !0
            }
            return Rp(n, i, l, s)
          }
          function Rp(n, i, l, s) {
            var c = tx(n, i, s)
            return (
              c == "multi" && (n.state.keySeq = i),
              c == "handled" && Fe(n, "keyHandled", n, i, l),
              (c == "handled" || c == "multi") && (Ke(l), cu(n)),
              !!c
            )
          }
          function zp(n, i) {
            var l = Op(i, !0)
            return l
              ? i.shiftKey && !n.state.keySeq
                ? Hs(n, "Shift-" + l, i, function (s) {
                    return fa(n, s, !0)
                  }) ||
                  Hs(n, l, i, function (s) {
                    if (typeof s == "string" ? /^go[A-Z]/.test(s) : s.motion)
                      return fa(n, s)
                  })
                : Hs(n, l, i, function (s) {
                    return fa(n, s)
                  })
              : !1
          }
          function nx(n, i, l) {
            return Hs(n, "'" + l + "'", i, function (s) {
              return fa(n, s, !0)
            })
          }
          var Lu = null
          function Fp(n) {
            var i = this
            if (
              !(n.target && n.target != i.display.input.getField()) &&
              ((i.curOp.focus = mt(Ut(i))), !Ce(i, n))
            ) {
              p && g < 11 && n.keyCode == 27 && (n.returnValue = !1)
              var l = n.keyCode
              i.display.shift = l == 16 || n.shiftKey
              var s = zp(i, n)
              N &&
                ((Lu = s ? l : null),
                !s &&
                  l == 88 &&
                  !ir &&
                  (W ? n.metaKey : n.ctrlKey) &&
                  i.replaceSelection("", null, "cut")),
                a &&
                  !W &&
                  !s &&
                  l == 46 &&
                  n.shiftKey &&
                  !n.ctrlKey &&
                  document.execCommand &&
                  document.execCommand("cut"),
                l == 18 &&
                  !/\bCodeMirror-crosshair\b/.test(
                    i.display.lineDiv.className,
                  ) &&
                  rx(i)
            }
          }
          function rx(n) {
            var i = n.display.lineDiv
            Et(i, "CodeMirror-crosshair")
            function l(s) {
              ;(s.keyCode == 18 || !s.altKey) &&
                (pt(i, "CodeMirror-crosshair"),
                Ve(document, "keyup", l),
                Ve(document, "mouseover", l))
            }
            wt(document, "keyup", l), wt(document, "mouseover", l)
          }
          function Ip(n) {
            n.keyCode == 16 && (this.doc.sel.shift = !1), Ce(this, n)
          }
          function qp(n) {
            var i = this
            if (
              !(n.target && n.target != i.display.input.getField()) &&
              !(
                Lr(i.display, n) ||
                Ce(i, n) ||
                (n.ctrlKey && !n.altKey) ||
                (W && n.metaKey)
              )
            ) {
              var l = n.keyCode,
                s = n.charCode
              if (N && l == Lu) {
                ;(Lu = null), Ke(n)
                return
              }
              if (!(N && (!n.which || n.which < 10) && zp(i, n))) {
                var c = String.fromCharCode(s ?? l)
                c != "\b" && (nx(i, n, c) || i.display.input.onKeyPress(n))
              }
            }
          }
          var ix = 400,
            Au = function (n, i, l) {
              ;(this.time = n), (this.pos = i), (this.button = l)
            }
          Au.prototype.compare = function (n, i, l) {
            return this.time + ix > n && Z(i, this.pos) == 0 && l == this.button
          }
          var Bs, Ws
          function ox(n, i) {
            var l = +new Date()
            return Ws && Ws.compare(l, n, i)
              ? ((Bs = Ws = null), "triple")
              : Bs && Bs.compare(l, n, i)
                ? ((Ws = new Au(l, n, i)), (Bs = null), "double")
                : ((Bs = new Au(l, n, i)), (Ws = null), "single")
          }
          function Hp(n) {
            var i = this,
              l = i.display
            if (!(Ce(i, n) || (l.activeTouch && l.input.supportsTouch()))) {
              if ((l.input.ensurePolled(), (l.shift = n.shiftKey), Lr(l, n))) {
                v ||
                  ((l.scroller.draggable = !1),
                  setTimeout(function () {
                    return (l.scroller.draggable = !0)
                  }, 100))
                return
              }
              if (!Mu(i, n)) {
                var s = Pi(i, n),
                  c = gs(n),
                  d = s ? ox(s, c) : "single"
                Xt(i).focus(),
                  c == 1 && i.state.selectingText && i.state.selectingText(n),
                  !(s && sx(i, c, s, d, n)) &&
                    (c == 1
                      ? s
                        ? ax(i, s, d, n)
                        : sn(n) == l.scroller && Ke(n)
                      : c == 2
                        ? (s && oa(i.doc, s),
                          setTimeout(function () {
                            return l.input.focus()
                          }, 20))
                        : c == 3 &&
                          (st ? i.display.input.onContextMenu(n) : uu(i)))
              }
            }
          }
          function sx(n, i, l, s, c) {
            var d = "Click"
            return (
              s == "double"
                ? (d = "Double" + d)
                : s == "triple" && (d = "Triple" + d),
              (d = (i == 1 ? "Left" : i == 2 ? "Middle" : "Right") + d),
              Hs(n, Pp(d, c), c, function (m) {
                if ((typeof m == "string" && (m = qs[m]), !m)) return !1
                var y = !1
                try {
                  n.isReadOnly() && (n.state.suppressEdits = !0),
                    (y = m(n, l) != Mt)
                } finally {
                  n.state.suppressEdits = !1
                }
                return y
              })
            )
          }
          function lx(n, i, l) {
            var s = n.getOption("configureMouse"),
              c = s ? s(n, i, l) : {}
            if (c.unit == null) {
              var d = X ? l.shiftKey && l.metaKey : l.altKey
              c.unit = d
                ? "rectangle"
                : i == "single"
                  ? "char"
                  : i == "double"
                    ? "word"
                    : "line"
            }
            return (
              (c.extend == null || n.doc.extend) &&
                (c.extend = n.doc.extend || l.shiftKey),
              c.addNew == null && (c.addNew = W ? l.metaKey : l.ctrlKey),
              c.moveOnDrag == null &&
                (c.moveOnDrag = !(W ? l.altKey : l.ctrlKey)),
              c
            )
          }
          function ax(n, i, l, s) {
            p ? setTimeout(Kt(Bd, n), 0) : (n.curOp.focus = mt(Ut(n)))
            var c = lx(n, l, s),
              d = n.doc.sel,
              m
            n.options.dragDrop &&
            Bc &&
            !n.isReadOnly() &&
            l == "single" &&
            (m = d.contains(i)) > -1 &&
            (Z((m = d.ranges[m]).from(), i) < 0 || i.xRel > 0) &&
            (Z(m.to(), i) > 0 || i.xRel < 0)
              ? cx(n, s, i, c)
              : ux(n, s, i, c)
          }
          function cx(n, i, l, s) {
            var c = n.display,
              d = !1,
              m = Ie(n, function (_) {
                v && (c.scroller.draggable = !1),
                  (n.state.draggingText = !1),
                  n.state.delayingBlurEvent &&
                    (n.hasFocus() ? (n.state.delayingBlurEvent = !1) : uu(n)),
                  Ve(c.wrapper.ownerDocument, "mouseup", m),
                  Ve(c.wrapper.ownerDocument, "mousemove", y),
                  Ve(c.scroller, "dragstart", x),
                  Ve(c.scroller, "drop", m),
                  d ||
                    (Ke(_),
                    s.addNew || oa(n.doc, l, null, null, s.extend),
                    (v && !L) || (p && g == 9)
                      ? setTimeout(function () {
                          c.wrapper.ownerDocument.body.focus({
                            preventScroll: !0,
                          }),
                            c.input.focus()
                        }, 20)
                      : c.input.focus())
              }),
              y = function (_) {
                d =
                  d ||
                  Math.abs(i.clientX - _.clientX) +
                    Math.abs(i.clientY - _.clientY) >=
                    10
              },
              x = function () {
                return (d = !0)
              }
            v && (c.scroller.draggable = !0),
              (n.state.draggingText = m),
              (m.copy = !s.moveOnDrag),
              wt(c.wrapper.ownerDocument, "mouseup", m),
              wt(c.wrapper.ownerDocument, "mousemove", y),
              wt(c.scroller, "dragstart", x),
              wt(c.scroller, "drop", m),
              (n.state.delayingBlurEvent = !0),
              setTimeout(function () {
                return c.input.focus()
              }, 20),
              c.scroller.dragDrop && c.scroller.dragDrop()
          }
          function Bp(n, i, l) {
            if (l == "char") return new ce(i, i)
            if (l == "word") return n.findWordAt(i)
            if (l == "line")
              return new ce(F(i.line, 0), Ht(n.doc, F(i.line + 1, 0)))
            var s = l(n, i)
            return new ce(s.from, s.to)
          }
          function ux(n, i, l, s) {
            p && uu(n)
            var c = n.display,
              d = n.doc
            Ke(i)
            var m,
              y,
              x = d.sel,
              _ = x.ranges
            if (
              (s.addNew && !s.extend
                ? ((y = d.sel.contains(l)),
                  y > -1 ? (m = _[y]) : (m = new ce(l, l)))
                : ((m = d.sel.primary()), (y = d.sel.primIndex)),
              s.unit == "rectangle")
            )
              s.addNew || (m = new ce(l, l)), (l = Pi(n, i, !0, !0)), (y = -1)
            else {
              var P = Bp(n, l, s.unit)
              s.extend ? (m = Su(m, P.anchor, P.head, s.extend)) : (m = P)
            }
            s.addNew
              ? y == -1
                ? ((y = _.length),
                  Xe(d, Vn(n, _.concat([m]), y), {
                    scroll: !1,
                    origin: "*mouse",
                  }))
                : _.length > 1 && _[y].empty() && s.unit == "char" && !s.extend
                  ? (Xe(d, Vn(n, _.slice(0, y).concat(_.slice(y + 1)), 0), {
                      scroll: !1,
                      origin: "*mouse",
                    }),
                    (x = d.sel))
                  : ku(d, y, m, I)
              : ((y = 0), Xe(d, new On([m], 0), I), (x = d.sel))
            var D = l
            function U(bt) {
              if (Z(D, bt) != 0)
                if (((D = bt), s.unit == "rectangle")) {
                  for (
                    var Ct = [],
                      $t = n.options.tabSize,
                      Pt = j(Lt(d, l.line).text, l.ch, $t),
                      jt = j(Lt(d, bt.line).text, bt.ch, $t),
                      ge = Math.min(Pt, jt),
                      He = Math.max(Pt, jt),
                      Se = Math.min(l.line, bt.line),
                      _n = Math.min(n.lastLine(), Math.max(l.line, bt.line));
                    Se <= _n;
                    Se++
                  ) {
                    var cn = Lt(d, Se).text,
                      Me = tt(cn, ge, $t)
                    ge == He
                      ? Ct.push(new ce(F(Se, Me), F(Se, Me)))
                      : cn.length > Me &&
                        Ct.push(new ce(F(Se, Me), F(Se, tt(cn, He, $t))))
                  }
                  Ct.length || Ct.push(new ce(l, l)),
                    Xe(d, Vn(n, x.ranges.slice(0, y).concat(Ct), y), {
                      origin: "*mouse",
                      scroll: !1,
                    }),
                    n.scrollIntoView(bt)
                } else {
                  var un = m,
                    Ue = Bp(n, bt, s.unit),
                    De = un.anchor,
                    Ne
                  Z(Ue.anchor, De) > 0
                    ? ((Ne = Ue.head), (De = Oe(un.from(), Ue.anchor)))
                    : ((Ne = Ue.anchor), (De = oe(un.to(), Ue.head)))
                  var Ee = x.ranges.slice(0)
                  ;(Ee[y] = fx(n, new ce(Ht(d, De), Ne))),
                    Xe(d, Vn(n, Ee, y), I)
                }
            }
            var H = c.wrapper.getBoundingClientRect(),
              J = 0
            function it(bt) {
              var Ct = ++J,
                $t = Pi(n, bt, !0, s.unit == "rectangle")
              if ($t)
                if (Z($t, D) != 0) {
                  ;(n.curOp.focus = mt(Ut(n))), U($t)
                  var Pt = Ql(c, d)
                  ;($t.line >= Pt.to || $t.line < Pt.from) &&
                    setTimeout(
                      Ie(n, function () {
                        J == Ct && it(bt)
                      }),
                      150,
                    )
                } else {
                  var jt =
                    bt.clientY < H.top ? -20 : bt.clientY > H.bottom ? 20 : 0
                  jt &&
                    setTimeout(
                      Ie(n, function () {
                        J == Ct && ((c.scroller.scrollTop += jt), it(bt))
                      }),
                      50,
                    )
                }
            }
            function gt(bt) {
              ;(n.state.selectingText = !1),
                (J = 1 / 0),
                bt && (Ke(bt), c.input.focus()),
                Ve(c.wrapper.ownerDocument, "mousemove", yt),
                Ve(c.wrapper.ownerDocument, "mouseup", kt),
                (d.history.lastSelOrigin = null)
            }
            var yt = Ie(n, function (bt) {
                bt.buttons === 0 || !gs(bt) ? gt(bt) : it(bt)
              }),
              kt = Ie(n, gt)
            ;(n.state.selectingText = kt),
              wt(c.wrapper.ownerDocument, "mousemove", yt),
              wt(c.wrapper.ownerDocument, "mouseup", kt)
          }
          function fx(n, i) {
            var l = i.anchor,
              s = i.head,
              c = Lt(n.doc, l.line)
            if (Z(l, s) == 0 && l.sticky == s.sticky) return i
            var d = ye(c)
            if (!d) return i
            var m = We(d, l.ch, l.sticky),
              y = d[m]
            if (y.from != l.ch && y.to != l.ch) return i
            var x = m + ((y.from == l.ch) == (y.level != 1) ? 0 : 1)
            if (x == 0 || x == d.length) return i
            var _
            if (s.line != l.line)
              _ = (s.line - l.line) * (n.doc.direction == "ltr" ? 1 : -1) > 0
            else {
              var P = We(d, s.ch, s.sticky),
                D = P - m || (s.ch - l.ch) * (y.level == 1 ? -1 : 1)
              P == x - 1 || P == x ? (_ = D < 0) : (_ = D > 0)
            }
            var U = d[x + (_ ? -1 : 0)],
              H = _ == (U.level == 1),
              J = H ? U.from : U.to,
              it = H ? "after" : "before"
            return l.ch == J && l.sticky == it
              ? i
              : new ce(new F(l.line, J, it), s)
          }
          function Wp(n, i, l, s) {
            var c, d
            if (i.touches)
              (c = i.touches[0].clientX), (d = i.touches[0].clientY)
            else
              try {
                ;(c = i.clientX), (d = i.clientY)
              } catch {
                return !1
              }
            if (
              c >= Math.floor(n.display.gutters.getBoundingClientRect().right)
            )
              return !1
            s && Ke(i)
            var m = n.display,
              y = m.lineDiv.getBoundingClientRect()
            if (d > y.bottom || !Je(n, l)) return ps(i)
            d -= y.top - m.viewOffset
            for (var x = 0; x < n.display.gutterSpecs.length; ++x) {
              var _ = m.gutters.childNodes[x]
              if (_ && _.getBoundingClientRect().right >= c) {
                var P = sr(n.doc, d),
                  D = n.display.gutterSpecs[x]
                return me(n, l, n, P, D.className, i), ps(i)
              }
            }
          }
          function Mu(n, i) {
            return Wp(n, i, "gutterClick", !0)
          }
          function Up(n, i) {
            Lr(n.display, i) ||
              hx(n, i) ||
              Ce(n, i, "contextmenu") ||
              st ||
              n.display.input.onContextMenu(i)
          }
          function hx(n, i) {
            return Je(n, "gutterContextMenu")
              ? Wp(n, i, "gutterContextMenu", !1)
              : !1
          }
          function jp(n) {
            ;(n.display.wrapper.className =
              n.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
              n.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
              Ss(n)
          }
          var Ao = {
              toString: function () {
                return "CodeMirror.Init"
              },
            },
            Gp = {},
            ha = {}
          function dx(n) {
            var i = n.optionHandlers
            function l(s, c, d, m) {
              ;(n.defaults[s] = c),
                d &&
                  (i[s] = m
                    ? function (y, x, _) {
                        _ != Ao && d(y, x, _)
                      }
                    : d)
            }
            ;(n.defineOption = l),
              (n.Init = Ao),
              l(
                "value",
                "",
                function (s, c) {
                  return s.setValue(c)
                },
                !0,
              ),
              l(
                "mode",
                null,
                function (s, c) {
                  ;(s.doc.modeOption = c), wu(s)
                },
                !0,
              ),
              l("indentUnit", 2, wu, !0),
              l("indentWithTabs", !1),
              l("smartIndent", !0),
              l(
                "tabSize",
                4,
                function (s) {
                  Ns(s), Ss(s), ln(s)
                },
                !0,
              ),
              l("lineSeparator", null, function (s, c) {
                if (((s.doc.lineSep = c), !!c)) {
                  var d = [],
                    m = s.doc.first
                  s.doc.iter(function (x) {
                    for (var _ = 0; ; ) {
                      var P = x.text.indexOf(c, _)
                      if (P == -1) break
                      ;(_ = P + c.length), d.push(F(m, P))
                    }
                    m++
                  })
                  for (var y = d.length - 1; y >= 0; y--)
                    Co(s.doc, c, d[y], F(d[y].line, d[y].ch + c.length))
                }
              }),
              l(
                "specialChars",
                /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,
                function (s, c, d) {
                  ;(s.state.specialChars = new RegExp(
                    c.source + (c.test("	") ? "" : "|	"),
                    "g",
                  )),
                    d != Ao && s.refresh()
                },
              ),
              l(
                "specialCharPlaceholder",
                Bb,
                function (s) {
                  return s.refresh()
                },
                !0,
              ),
              l("electricChars", !0),
              l(
                "inputStyle",
                E ? "contenteditable" : "textarea",
                function () {
                  throw new Error(
                    "inputStyle can not (yet) be changed in a running editor",
                  )
                },
                !0,
              ),
              l(
                "spellcheck",
                !1,
                function (s, c) {
                  return (s.getInputField().spellcheck = c)
                },
                !0,
              ),
              l(
                "autocorrect",
                !1,
                function (s, c) {
                  return (s.getInputField().autocorrect = c)
                },
                !0,
              ),
              l(
                "autocapitalize",
                !1,
                function (s, c) {
                  return (s.getInputField().autocapitalize = c)
                },
                !0,
              ),
              l("rtlMoveVisually", !ft),
              l("wholeLineUpdateBefore", !0),
              l(
                "theme",
                "default",
                function (s) {
                  jp(s), Ms(s)
                },
                !0,
              ),
              l("keyMap", "default", function (s, c, d) {
                var m = ua(c),
                  y = d != Ao && ua(d)
                y && y.detach && y.detach(s, m),
                  m.attach && m.attach(s, y || null)
              }),
              l("extraKeys", null),
              l("configureMouse", null),
              l("lineWrapping", !1, gx, !0),
              l(
                "gutters",
                [],
                function (s, c) {
                  ;(s.display.gutterSpecs = yu(c, s.options.lineNumbers)), Ms(s)
                },
                !0,
              ),
              l(
                "fixedGutter",
                !0,
                function (s, c) {
                  ;(s.display.gutters.style.left = c
                    ? su(s.display) + "px"
                    : "0"),
                    s.refresh()
                },
                !0,
              ),
              l(
                "coverGutterNextToScrollbar",
                !1,
                function (s) {
                  return xo(s)
                },
                !0,
              ),
              l(
                "scrollbarStyle",
                "native",
                function (s) {
                  Kd(s),
                    xo(s),
                    s.display.scrollbars.setScrollTop(s.doc.scrollTop),
                    s.display.scrollbars.setScrollLeft(s.doc.scrollLeft)
                },
                !0,
              ),
              l(
                "lineNumbers",
                !1,
                function (s, c) {
                  ;(s.display.gutterSpecs = yu(s.options.gutters, c)), Ms(s)
                },
                !0,
              ),
              l("firstLineNumber", 1, Ms, !0),
              l(
                "lineNumberFormatter",
                function (s) {
                  return s
                },
                Ms,
                !0,
              ),
              l("showCursorWhenSelecting", !1, ks, !0),
              l("resetSelectionOnContextMenu", !0),
              l("lineWiseCopyCut", !0),
              l("pasteLinesPerSelection", !0),
              l("selectionsMayTouch", !1),
              l("readOnly", !1, function (s, c) {
                c == "nocursor" && (bo(s), s.display.input.blur()),
                  s.display.input.readOnlyChanged(c)
              }),
              l("screenReaderLabel", null, function (s, c) {
                ;(c = c === "" ? null : c),
                  s.display.input.screenReaderLabelChanged(c)
              }),
              l(
                "disableInput",
                !1,
                function (s, c) {
                  c || s.display.input.reset()
                },
                !0,
              ),
              l("dragDrop", !0, px),
              l("allowDropFileTypes", null),
              l("cursorBlinkRate", 530),
              l("cursorScrollMargin", 0),
              l("cursorHeight", 1, ks, !0),
              l("singleCursorHeightPerLine", !0, ks, !0),
              l("workTime", 100),
              l("workDelay", 100),
              l("flattenSpans", !0, Ns, !0),
              l("addModeClass", !1, Ns, !0),
              l("pollInterval", 100),
              l("undoDepth", 200, function (s, c) {
                return (s.doc.history.undoDepth = c)
              }),
              l("historyEventDelay", 1250),
              l(
                "viewportMargin",
                10,
                function (s) {
                  return s.refresh()
                },
                !0,
              ),
              l("maxHighlightLength", 1e4, Ns, !0),
              l("moveInputWithCursor", !0, function (s, c) {
                c || s.display.input.resetPosition()
              }),
              l("tabindex", null, function (s, c) {
                return (s.display.input.getField().tabIndex = c || "")
              }),
              l("autofocus", null),
              l(
                "direction",
                "ltr",
                function (s, c) {
                  return s.doc.setDirection(c)
                },
                !0,
              ),
              l("phrases", null)
          }
          function px(n, i, l) {
            var s = l && l != Ao
            if (!i != !s) {
              var c = n.display.dragFunctions,
                d = i ? wt : Ve
              d(n.display.scroller, "dragstart", c.start),
                d(n.display.scroller, "dragenter", c.enter),
                d(n.display.scroller, "dragover", c.over),
                d(n.display.scroller, "dragleave", c.leave),
                d(n.display.scroller, "drop", c.drop)
            }
          }
          function gx(n) {
            n.options.lineWrapping
              ? (Et(n.display.wrapper, "CodeMirror-wrap"),
                (n.display.sizer.style.minWidth = ""),
                (n.display.sizerWidth = null))
              : (pt(n.display.wrapper, "CodeMirror-wrap"), Yc(n)),
              lu(n),
              ln(n),
              Ss(n),
              setTimeout(function () {
                return xo(n)
              }, 100)
          }
          function we(n, i) {
            var l = this
            if (!(this instanceof we)) return new we(n, i)
            ;(this.options = i = i ? St(i) : {}), St(Gp, i, !1)
            var s = i.value
            typeof s == "string"
              ? (s = new an(s, i.mode, null, i.lineSeparator, i.direction))
              : i.mode && (s.modeOption = i.mode),
              (this.doc = s)
            var c = new we.inputStyles[i.inputStyle](this),
              d = (this.display = new Lw(n, s, c, i))
            ;(d.wrapper.CodeMirror = this),
              jp(this),
              i.lineWrapping &&
                (this.display.wrapper.className += " CodeMirror-wrap"),
              Kd(this),
              (this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: -1,
                cutIncoming: -1,
                selectingText: !1,
                draggingText: !1,
                highlight: new nt(),
                keySeq: null,
                specialChars: null,
              }),
              i.autofocus && !E && d.input.focus(),
              p &&
                g < 11 &&
                setTimeout(function () {
                  return l.display.input.reset(!0)
                }, 20),
              vx(this),
              Vw(),
              Ri(this),
              (this.curOp.forceUpdate = !0),
              ip(this, s),
              (i.autofocus && !E) || this.hasFocus()
                ? setTimeout(function () {
                    l.hasFocus() && !l.state.focused && fu(l)
                  }, 20)
                : bo(this)
            for (var m in ha) ha.hasOwnProperty(m) && ha[m](this, i[m], Ao)
            Zd(this), i.finishInit && i.finishInit(this)
            for (var y = 0; y < Nu.length; ++y) Nu[y](this)
            zi(this),
              v &&
                i.lineWrapping &&
                getComputedStyle(d.lineDiv).textRendering ==
                  "optimizelegibility" &&
                (d.lineDiv.style.textRendering = "auto")
          }
          ;(we.defaults = Gp), (we.optionHandlers = ha)
          function vx(n) {
            var i = n.display
            wt(i.scroller, "mousedown", Ie(n, Hp)),
              p && g < 11
                ? wt(
                    i.scroller,
                    "dblclick",
                    Ie(n, function (x) {
                      if (!Ce(n, x)) {
                        var _ = Pi(n, x)
                        if (!(!_ || Mu(n, x) || Lr(n.display, x))) {
                          Ke(x)
                          var P = n.findWordAt(_)
                          oa(n.doc, P.anchor, P.head)
                        }
                      }
                    }),
                  )
                : wt(i.scroller, "dblclick", function (x) {
                    return Ce(n, x) || Ke(x)
                  }),
              wt(i.scroller, "contextmenu", function (x) {
                return Up(n, x)
              }),
              wt(i.input.getField(), "contextmenu", function (x) {
                i.scroller.contains(x.target) || Up(n, x)
              })
            var l,
              s = { end: 0 }
            function c() {
              i.activeTouch &&
                ((l = setTimeout(function () {
                  return (i.activeTouch = null)
                }, 1e3)),
                (s = i.activeTouch),
                (s.end = +new Date()))
            }
            function d(x) {
              if (x.touches.length != 1) return !1
              var _ = x.touches[0]
              return _.radiusX <= 1 && _.radiusY <= 1
            }
            function m(x, _) {
              if (_.left == null) return !0
              var P = _.left - x.left,
                D = _.top - x.top
              return P * P + D * D > 20 * 20
            }
            wt(i.scroller, "touchstart", function (x) {
              if (!Ce(n, x) && !d(x) && !Mu(n, x)) {
                i.input.ensurePolled(), clearTimeout(l)
                var _ = +new Date()
                ;(i.activeTouch = {
                  start: _,
                  moved: !1,
                  prev: _ - s.end <= 300 ? s : null,
                }),
                  x.touches.length == 1 &&
                    ((i.activeTouch.left = x.touches[0].pageX),
                    (i.activeTouch.top = x.touches[0].pageY))
              }
            }),
              wt(i.scroller, "touchmove", function () {
                i.activeTouch && (i.activeTouch.moved = !0)
              }),
              wt(i.scroller, "touchend", function (x) {
                var _ = i.activeTouch
                if (
                  _ &&
                  !Lr(i, x) &&
                  _.left != null &&
                  !_.moved &&
                  new Date() - _.start < 300
                ) {
                  var P = n.coordsChar(i.activeTouch, "page"),
                    D
                  !_.prev || m(_, _.prev)
                    ? (D = new ce(P, P))
                    : !_.prev.prev || m(_, _.prev.prev)
                      ? (D = n.findWordAt(P))
                      : (D = new ce(F(P.line, 0), Ht(n.doc, F(P.line + 1, 0)))),
                    n.setSelection(D.anchor, D.head),
                    n.focus(),
                    Ke(x)
                }
                c()
              }),
              wt(i.scroller, "touchcancel", c),
              wt(i.scroller, "scroll", function () {
                i.scroller.clientHeight &&
                  (Ts(n, i.scroller.scrollTop),
                  Di(n, i.scroller.scrollLeft, !0),
                  me(n, "scroll", n))
              }),
              wt(i.scroller, "mousewheel", function (x) {
                return tp(n, x)
              }),
              wt(i.scroller, "DOMMouseScroll", function (x) {
                return tp(n, x)
              }),
              wt(i.wrapper, "scroll", function () {
                return (i.wrapper.scrollTop = i.wrapper.scrollLeft = 0)
              }),
              (i.dragFunctions = {
                enter: function (x) {
                  Ce(n, x) || _r(x)
                },
                over: function (x) {
                  Ce(n, x) || (Gw(n, x), _r(x))
                },
                start: function (x) {
                  return jw(n, x)
                },
                drop: Ie(n, Uw),
                leave: function (x) {
                  Ce(n, x) || Lp(n)
                },
              })
            var y = i.input.getField()
            wt(y, "keyup", function (x) {
              return Ip.call(n, x)
            }),
              wt(y, "keydown", Ie(n, Fp)),
              wt(y, "keypress", Ie(n, qp)),
              wt(y, "focus", function (x) {
                return fu(n, x)
              }),
              wt(y, "blur", function (x) {
                return bo(n, x)
              })
          }
          var Nu = []
          we.defineInitHook = function (n) {
            return Nu.push(n)
          }
          function Us(n, i, l, s) {
            var c = n.doc,
              d
            l == null && (l = "add"),
              l == "smart" &&
                (c.mode.indent ? (d = ys(n, i).state) : (l = "prev"))
            var m = n.options.tabSize,
              y = Lt(c, i),
              x = j(y.text, null, m)
            y.stateAfter && (y.stateAfter = null)
            var _ = y.text.match(/^\s*/)[0],
              P
            if (!s && !/\S/.test(y.text)) (P = 0), (l = "not")
            else if (
              l == "smart" &&
              ((P = c.mode.indent(d, y.text.slice(_.length), y.text)),
              P == Mt || P > 150)
            ) {
              if (!s) return
              l = "prev"
            }
            l == "prev"
              ? i > c.first
                ? (P = j(Lt(c, i - 1).text, null, m))
                : (P = 0)
              : l == "add"
                ? (P = x + n.options.indentUnit)
                : l == "subtract"
                  ? (P = x - n.options.indentUnit)
                  : typeof l == "number" && (P = x + l),
              (P = Math.max(0, P))
            var D = "",
              U = 0
            if (n.options.indentWithTabs)
              for (var H = Math.floor(P / m); H; --H) (U += m), (D += "	")
            if ((U < P && (D += at(P - U)), D != _))
              return (
                Co(c, D, F(i, 0), F(i, _.length), "+input"),
                (y.stateAfter = null),
                !0
              )
            for (var J = 0; J < c.sel.ranges.length; J++) {
              var it = c.sel.ranges[J]
              if (it.head.line == i && it.head.ch < _.length) {
                var gt = F(i, _.length)
                ku(c, J, new ce(gt, gt))
                break
              }
            }
          }
          var Kn = null
          function da(n) {
            Kn = n
          }
          function Pu(n, i, l, s, c) {
            var d = n.doc
            ;(n.display.shift = !1), s || (s = d.sel)
            var m = +new Date() - 200,
              y = c == "paste" || n.state.pasteIncoming > m,
              x = vs(i),
              _ = null
            if (y && s.ranges.length > 1)
              if (
                Kn &&
                Kn.text.join(`
`) == i
              ) {
                if (s.ranges.length % Kn.text.length == 0) {
                  _ = []
                  for (var P = 0; P < Kn.text.length; P++)
                    _.push(d.splitLines(Kn.text[P]))
                }
              } else
                x.length == s.ranges.length &&
                  n.options.pasteLinesPerSelection &&
                  (_ = vt(x, function (yt) {
                    return [yt]
                  }))
            for (
              var D = n.curOp.updateInput, U = s.ranges.length - 1;
              U >= 0;
              U--
            ) {
              var H = s.ranges[U],
                J = H.from(),
                it = H.to()
              H.empty() &&
                (l && l > 0
                  ? (J = F(J.line, J.ch - l))
                  : n.state.overwrite && !y
                    ? (it = F(
                        it.line,
                        Math.min(
                          Lt(d, it.line).text.length,
                          it.ch + ct(x).length,
                        ),
                      ))
                    : y &&
                      Kn &&
                      Kn.lineWise &&
                      Kn.text.join(`
`) ==
                        x.join(`
`) &&
                      (J = it = F(J.line, 0)))
              var gt = {
                from: J,
                to: it,
                text: _ ? _[U % _.length] : x,
                origin:
                  c ||
                  (y ? "paste" : n.state.cutIncoming > m ? "cut" : "+input"),
              }
              ko(n.doc, gt), Fe(n, "inputRead", n, gt)
            }
            i && !y && Kp(n, i),
              wo(n),
              n.curOp.updateInput < 2 && (n.curOp.updateInput = D),
              (n.curOp.typing = !0),
              (n.state.pasteIncoming = n.state.cutIncoming = -1)
          }
          function Vp(n, i) {
            var l = n.clipboardData && n.clipboardData.getData("Text")
            if (l)
              return (
                n.preventDefault(),
                !i.isReadOnly() &&
                  !i.options.disableInput &&
                  i.hasFocus() &&
                  xn(i, function () {
                    return Pu(i, l, 0, null, "paste")
                  }),
                !0
              )
          }
          function Kp(n, i) {
            if (!(!n.options.electricChars || !n.options.smartIndent))
              for (var l = n.doc.sel, s = l.ranges.length - 1; s >= 0; s--) {
                var c = l.ranges[s]
                if (
                  !(
                    c.head.ch > 100 ||
                    (s && l.ranges[s - 1].head.line == c.head.line)
                  )
                ) {
                  var d = n.getModeAt(c.head),
                    m = !1
                  if (d.electricChars) {
                    for (var y = 0; y < d.electricChars.length; y++)
                      if (i.indexOf(d.electricChars.charAt(y)) > -1) {
                        m = Us(n, c.head.line, "smart")
                        break
                      }
                  } else
                    d.electricInput &&
                      d.electricInput.test(
                        Lt(n.doc, c.head.line).text.slice(0, c.head.ch),
                      ) &&
                      (m = Us(n, c.head.line, "smart"))
                  m && Fe(n, "electricInput", n, c.head.line)
                }
              }
          }
          function Xp(n) {
            for (var i = [], l = [], s = 0; s < n.doc.sel.ranges.length; s++) {
              var c = n.doc.sel.ranges[s].head.line,
                d = { anchor: F(c, 0), head: F(c + 1, 0) }
              l.push(d), i.push(n.getRange(d.anchor, d.head))
            }
            return { text: i, ranges: l }
          }
          function Ou(n, i, l, s) {
            n.setAttribute("autocorrect", l ? "on" : "off"),
              n.setAttribute("autocapitalize", s ? "on" : "off"),
              n.setAttribute("spellcheck", !!i)
          }
          function Yp() {
            var n = k(
                "textarea",
                null,
                null,
                "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none",
              ),
              i = k(
                "div",
                [n],
                null,
                "overflow: hidden; position: relative; width: 3px; height: 0px;",
              )
            return (
              v ? (n.style.width = "1000px") : n.setAttribute("wrap", "off"),
              M && (n.style.border = "1px solid black"),
              i
            )
          }
          function mx(n) {
            var i = n.optionHandlers,
              l = (n.helpers = {})
            ;(n.prototype = {
              constructor: n,
              focus: function () {
                Xt(this).focus(), this.display.input.focus()
              },
              setOption: function (s, c) {
                var d = this.options,
                  m = d[s]
                ;(d[s] == c && s != "mode") ||
                  ((d[s] = c),
                  i.hasOwnProperty(s) && Ie(this, i[s])(this, c, m),
                  me(this, "optionChange", this, s))
              },
              getOption: function (s) {
                return this.options[s]
              },
              getDoc: function () {
                return this.doc
              },
              addKeyMap: function (s, c) {
                this.state.keyMaps[c ? "push" : "unshift"](ua(s))
              },
              removeKeyMap: function (s) {
                for (var c = this.state.keyMaps, d = 0; d < c.length; ++d)
                  if (c[d] == s || c[d].name == s) return c.splice(d, 1), !0
              },
              addOverlay: tn(function (s, c) {
                var d = s.token ? s : n.getMode(this.options, s)
                if (d.startState)
                  throw new Error("Overlays may not be stateful.")
                _t(
                  this.state.overlays,
                  {
                    mode: d,
                    modeSpec: s,
                    opaque: c && c.opaque,
                    priority: (c && c.priority) || 0,
                  },
                  function (m) {
                    return m.priority
                  },
                ),
                  this.state.modeGen++,
                  ln(this)
              }),
              removeOverlay: tn(function (s) {
                for (var c = this.state.overlays, d = 0; d < c.length; ++d) {
                  var m = c[d].modeSpec
                  if (m == s || (typeof s == "string" && m.name == s)) {
                    c.splice(d, 1), this.state.modeGen++, ln(this)
                    return
                  }
                }
              }),
              indentLine: tn(function (s, c, d) {
                typeof c != "string" &&
                  typeof c != "number" &&
                  (c == null
                    ? (c = this.options.smartIndent ? "smart" : "prev")
                    : (c = c ? "add" : "subtract")),
                  C(this.doc, s) && Us(this, s, c, d)
              }),
              indentSelection: tn(function (s) {
                for (
                  var c = this.doc.sel.ranges, d = -1, m = 0;
                  m < c.length;
                  m++
                ) {
                  var y = c[m]
                  if (y.empty())
                    y.head.line > d &&
                      (Us(this, y.head.line, s, !0),
                      (d = y.head.line),
                      m == this.doc.sel.primIndex && wo(this))
                  else {
                    var x = y.from(),
                      _ = y.to(),
                      P = Math.max(d, x.line)
                    d = Math.min(this.lastLine(), _.line - (_.ch ? 0 : 1)) + 1
                    for (var D = P; D < d; ++D) Us(this, D, s)
                    var U = this.doc.sel.ranges
                    x.ch == 0 &&
                      c.length == U.length &&
                      U[m].from().ch > 0 &&
                      ku(this.doc, m, new ce(x, U[m].to()), O)
                  }
                }
              }),
              getTokenAt: function (s, c) {
                return sd(this, s, c)
              },
              getLineTokens: function (s, c) {
                return sd(this, F(s), c, !0)
              },
              getTokenTypeAt: function (s) {
                s = Ht(this.doc, s)
                var c = rd(this, Lt(this.doc, s.line)),
                  d = 0,
                  m = (c.length - 1) / 2,
                  y = s.ch,
                  x
                if (y == 0) x = c[2]
                else
                  for (;;) {
                    var _ = (d + m) >> 1
                    if ((_ ? c[_ * 2 - 1] : 0) >= y) m = _
                    else if (c[_ * 2 + 1] < y) d = _ + 1
                    else {
                      x = c[_ * 2 + 2]
                      break
                    }
                  }
                var P = x ? x.indexOf("overlay ") : -1
                return P < 0 ? x : P == 0 ? null : x.slice(0, P - 1)
              },
              getModeAt: function (s) {
                var c = this.doc.mode
                return c.innerMode
                  ? n.innerMode(c, this.getTokenAt(s).state).mode
                  : c
              },
              getHelper: function (s, c) {
                return this.getHelpers(s, c)[0]
              },
              getHelpers: function (s, c) {
                var d = []
                if (!l.hasOwnProperty(c)) return d
                var m = l[c],
                  y = this.getModeAt(s)
                if (typeof y[c] == "string") m[y[c]] && d.push(m[y[c]])
                else if (y[c])
                  for (var x = 0; x < y[c].length; x++) {
                    var _ = m[y[c][x]]
                    _ && d.push(_)
                  }
                else
                  y.helperType && m[y.helperType]
                    ? d.push(m[y.helperType])
                    : m[y.name] && d.push(m[y.name])
                for (var P = 0; P < m._global.length; P++) {
                  var D = m._global[P]
                  D.pred(y, this) && rt(d, D.val) == -1 && d.push(D.val)
                }
                return d
              },
              getStateAfter: function (s, c) {
                var d = this.doc
                return (
                  (s = Pn(d, s ?? d.first + d.size - 1)),
                  ys(this, s + 1, c).state
                )
              },
              cursorCoords: function (s, c) {
                var d,
                  m = this.doc.sel.primary()
                return (
                  s == null
                    ? (d = m.head)
                    : typeof s == "object"
                      ? (d = Ht(this.doc, s))
                      : (d = s ? m.from() : m.to()),
                  Gn(this, d, c || "page")
                )
              },
              charCoords: function (s, c) {
                return Xl(this, Ht(this.doc, s), c || "page")
              },
              coordsChar: function (s, c) {
                return (s = $d(this, s, c || "page")), ru(this, s.left, s.top)
              },
              lineAtHeight: function (s, c) {
                return (
                  (s = $d(this, { top: s, left: 0 }, c || "page").top),
                  sr(this.doc, s + this.display.viewOffset)
                )
              },
              heightAtLine: function (s, c, d) {
                var m = !1,
                  y
                if (typeof s == "number") {
                  var x = this.doc.first + this.doc.size - 1
                  s < this.doc.first
                    ? (s = this.doc.first)
                    : s > x && ((s = x), (m = !0)),
                    (y = Lt(this.doc, s))
                } else y = s
                return (
                  Kl(this, y, { top: 0, left: 0 }, c || "page", d || m).top +
                  (m ? this.doc.height - Er(y) : 0)
                )
              },
              defaultTextHeight: function () {
                return mo(this.display)
              },
              defaultCharWidth: function () {
                return yo(this.display)
              },
              getViewport: function () {
                return { from: this.display.viewFrom, to: this.display.viewTo }
              },
              addWidget: function (s, c, d, m, y) {
                var x = this.display
                s = Gn(this, Ht(this.doc, s))
                var _ = s.bottom,
                  P = s.left
                if (
                  ((c.style.position = "absolute"),
                  c.setAttribute("cm-ignore-events", "true"),
                  this.display.input.setUneditable(c),
                  x.sizer.appendChild(c),
                  m == "over")
                )
                  _ = s.top
                else if (m == "above" || m == "near") {
                  var D = Math.max(x.wrapper.clientHeight, this.doc.height),
                    U = Math.max(x.sizer.clientWidth, x.lineSpace.clientWidth)
                  ;(m == "above" || s.bottom + c.offsetHeight > D) &&
                  s.top > c.offsetHeight
                    ? (_ = s.top - c.offsetHeight)
                    : s.bottom + c.offsetHeight <= D && (_ = s.bottom),
                    P + c.offsetWidth > U && (P = U - c.offsetWidth)
                }
                ;(c.style.top = _ + "px"),
                  (c.style.left = c.style.right = ""),
                  y == "right"
                    ? ((P = x.sizer.clientWidth - c.offsetWidth),
                      (c.style.right = "0px"))
                    : (y == "left"
                        ? (P = 0)
                        : y == "middle" &&
                          (P = (x.sizer.clientWidth - c.offsetWidth) / 2),
                      (c.style.left = P + "px")),
                  d &&
                    pw(this, {
                      left: P,
                      top: _,
                      right: P + c.offsetWidth,
                      bottom: _ + c.offsetHeight,
                    })
              },
              triggerOnKeyDown: tn(Fp),
              triggerOnKeyPress: tn(qp),
              triggerOnKeyUp: Ip,
              triggerOnMouseDown: tn(Hp),
              execCommand: function (s) {
                if (qs.hasOwnProperty(s)) return qs[s].call(null, this)
              },
              triggerElectric: tn(function (s) {
                Kp(this, s)
              }),
              findPosH: function (s, c, d, m) {
                var y = 1
                c < 0 && ((y = -1), (c = -c))
                for (
                  var x = Ht(this.doc, s), _ = 0;
                  _ < c && ((x = Du(this.doc, x, y, d, m)), !x.hitSide);
                  ++_
                );
                return x
              },
              moveH: tn(function (s, c) {
                var d = this
                this.extendSelectionsBy(function (m) {
                  return d.display.shift || d.doc.extend || m.empty()
                    ? Du(d.doc, m.head, s, c, d.options.rtlMoveVisually)
                    : s < 0
                      ? m.from()
                      : m.to()
                }, K)
              }),
              deleteH: tn(function (s, c) {
                var d = this.doc.sel,
                  m = this.doc
                d.somethingSelected()
                  ? m.replaceSelection("", null, "+delete")
                  : Lo(this, function (y) {
                      var x = Du(m, y.head, s, c, !1)
                      return s < 0
                        ? { from: x, to: y.head }
                        : { from: y.head, to: x }
                    })
              }),
              findPosV: function (s, c, d, m) {
                var y = 1,
                  x = m
                c < 0 && ((y = -1), (c = -c))
                for (var _ = Ht(this.doc, s), P = 0; P < c; ++P) {
                  var D = Gn(this, _, "div")
                  if (
                    (x == null ? (x = D.left) : (D.left = x),
                    (_ = Zp(this, D, y, d)),
                    _.hitSide)
                  )
                    break
                }
                return _
              },
              moveV: tn(function (s, c) {
                var d = this,
                  m = this.doc,
                  y = [],
                  x =
                    !this.display.shift &&
                    !m.extend &&
                    m.sel.somethingSelected()
                if (
                  (m.extendSelectionsBy(function (P) {
                    if (x) return s < 0 ? P.from() : P.to()
                    var D = Gn(d, P.head, "div")
                    P.goalColumn != null && (D.left = P.goalColumn),
                      y.push(D.left)
                    var U = Zp(d, D, s, c)
                    return (
                      c == "page" &&
                        P == m.sel.primary() &&
                        du(d, Xl(d, U, "div").top - D.top),
                      U
                    )
                  }, K),
                  y.length)
                )
                  for (var _ = 0; _ < m.sel.ranges.length; _++)
                    m.sel.ranges[_].goalColumn = y[_]
              }),
              findWordAt: function (s) {
                var c = this.doc,
                  d = Lt(c, s.line).text,
                  m = s.ch,
                  y = s.ch
                if (d) {
                  var x = this.getHelper(s, "wordChars")
                  ;(s.sticky == "before" || y == d.length) && m ? --m : ++y
                  for (
                    var _ = d.charAt(m),
                      P = zt(_, x)
                        ? function (D) {
                            return zt(D, x)
                          }
                        : /\s/.test(_)
                          ? function (D) {
                              return /\s/.test(D)
                            }
                          : function (D) {
                              return !/\s/.test(D) && !zt(D)
                            };
                    m > 0 && P(d.charAt(m - 1));

                  )
                    --m
                  for (; y < d.length && P(d.charAt(y)); ) ++y
                }
                return new ce(F(s.line, m), F(s.line, y))
              },
              toggleOverwrite: function (s) {
                ;(s != null && s == this.state.overwrite) ||
                  ((this.state.overwrite = !this.state.overwrite)
                    ? Et(this.display.cursorDiv, "CodeMirror-overwrite")
                    : pt(this.display.cursorDiv, "CodeMirror-overwrite"),
                  me(this, "overwriteToggle", this, this.state.overwrite))
              },
              hasFocus: function () {
                return this.display.input.getField() == mt(Ut(this))
              },
              isReadOnly: function () {
                return !!(this.options.readOnly || this.doc.cantEdit)
              },
              scrollTo: tn(function (s, c) {
                Cs(this, s, c)
              }),
              getScrollInfo: function () {
                var s = this.display.scroller
                return {
                  left: s.scrollLeft,
                  top: s.scrollTop,
                  height: s.scrollHeight - ar(this) - this.display.barHeight,
                  width: s.scrollWidth - ar(this) - this.display.barWidth,
                  clientHeight: Qc(this),
                  clientWidth: Mi(this),
                }
              },
              scrollIntoView: tn(function (s, c) {
                s == null
                  ? ((s = { from: this.doc.sel.primary().head, to: null }),
                    c == null && (c = this.options.cursorScrollMargin))
                  : typeof s == "number"
                    ? (s = { from: F(s, 0), to: null })
                    : s.from == null && (s = { from: s, to: null }),
                  s.to || (s.to = s.from),
                  (s.margin = c || 0),
                  s.from.line != null
                    ? gw(this, s)
                    : Ud(this, s.from, s.to, s.margin)
              }),
              setSize: tn(function (s, c) {
                var d = this,
                  m = function (x) {
                    return typeof x == "number" || /^\d+$/.test(String(x))
                      ? x + "px"
                      : x
                  }
                s != null && (this.display.wrapper.style.width = m(s)),
                  c != null && (this.display.wrapper.style.height = m(c)),
                  this.options.lineWrapping && Pd(this)
                var y = this.display.viewFrom
                this.doc.iter(y, this.display.viewTo, function (x) {
                  if (x.widgets) {
                    for (var _ = 0; _ < x.widgets.length; _++)
                      if (x.widgets[_].noHScroll) {
                        ti(d, y, "widget")
                        break
                      }
                  }
                  ++y
                }),
                  (this.curOp.forceUpdate = !0),
                  me(this, "refresh", this)
              }),
              operation: function (s) {
                return xn(this, s)
              },
              startOperation: function () {
                return Ri(this)
              },
              endOperation: function () {
                return zi(this)
              },
              refresh: tn(function () {
                var s = this.display.cachedTextHeight
                ln(this),
                  (this.curOp.forceUpdate = !0),
                  Ss(this),
                  Cs(this, this.doc.scrollLeft, this.doc.scrollTop),
                  vu(this.display),
                  (s == null ||
                    Math.abs(s - mo(this.display)) > 0.5 ||
                    this.options.lineWrapping) &&
                    lu(this),
                  me(this, "refresh", this)
              }),
              swapDoc: tn(function (s) {
                var c = this.doc
                return (
                  (c.cm = null),
                  this.state.selectingText && this.state.selectingText(),
                  ip(this, s),
                  Ss(this),
                  this.display.input.reset(),
                  Cs(this, s.scrollLeft, s.scrollTop),
                  (this.curOp.forceScroll = !0),
                  Fe(this, "swapDoc", this, c),
                  c
                )
              }),
              phrase: function (s) {
                var c = this.options.phrases
                return c && Object.prototype.hasOwnProperty.call(c, s)
                  ? c[s]
                  : s
              },
              getInputField: function () {
                return this.display.input.getField()
              },
              getWrapperElement: function () {
                return this.display.wrapper
              },
              getScrollerElement: function () {
                return this.display.scroller
              },
              getGutterElement: function () {
                return this.display.gutters
              },
            }),
              Qe(n),
              (n.registerHelper = function (s, c, d) {
                l.hasOwnProperty(s) || (l[s] = n[s] = { _global: [] }),
                  (l[s][c] = d)
              }),
              (n.registerGlobalHelper = function (s, c, d, m) {
                n.registerHelper(s, c, m),
                  l[s]._global.push({ pred: d, val: m })
              })
          }
          function Du(n, i, l, s, c) {
            var d = i,
              m = l,
              y = Lt(n, i.line),
              x = c && n.direction == "rtl" ? -l : l
            function _() {
              var kt = i.line + x
              return kt < n.first || kt >= n.first + n.size
                ? !1
                : ((i = new F(kt, i.ch, i.sticky)), (y = Lt(n, kt)))
            }
            function P(kt) {
              var bt
              if (s == "codepoint") {
                var Ct = y.text.charCodeAt(i.ch + (l > 0 ? 0 : -1))
                if (isNaN(Ct)) bt = null
                else {
                  var $t =
                    l > 0
                      ? Ct >= 55296 && Ct < 56320
                      : Ct >= 56320 && Ct < 57343
                  bt = new F(
                    i.line,
                    Math.max(
                      0,
                      Math.min(y.text.length, i.ch + l * ($t ? 2 : 1)),
                    ),
                    -l,
                  )
                }
              } else c ? (bt = Jw(n.cm, y, i, l)) : (bt = Tu(y, i, l))
              if (bt == null)
                if (!kt && _()) i = Eu(c, n.cm, y, i.line, x)
                else return !1
              else i = bt
              return !0
            }
            if (s == "char" || s == "codepoint") P()
            else if (s == "column") P(!0)
            else if (s == "word" || s == "group")
              for (
                var D = null,
                  U = s == "group",
                  H = n.cm && n.cm.getHelper(i, "wordChars"),
                  J = !0;
                !(l < 0 && !P(!J));
                J = !1
              ) {
                var it =
                    y.text.charAt(i.ch) ||
                    `
`,
                  gt = zt(it, H)
                    ? "w"
                    : U &&
                        it ==
                          `
`
                      ? "n"
                      : !U || /\s/.test(it)
                        ? null
                        : "p"
                if ((U && !J && !gt && (gt = "s"), D && D != gt)) {
                  l < 0 && ((l = 1), P(), (i.sticky = "after"))
                  break
                }
                if ((gt && (D = gt), l > 0 && !P(!J))) break
              }
            var yt = la(n, i, d, m, !0)
            return qt(d, yt) && (yt.hitSide = !0), yt
          }
          function Zp(n, i, l, s) {
            var c = n.doc,
              d = i.left,
              m
            if (s == "page") {
              var y = Math.min(
                  n.display.wrapper.clientHeight,
                  Xt(n).innerHeight || c(n).documentElement.clientHeight,
                ),
                x = Math.max(y - 0.5 * mo(n.display), 3)
              m = (l > 0 ? i.bottom : i.top) + l * x
            } else s == "line" && (m = l > 0 ? i.bottom + 3 : i.top - 3)
            for (var _; (_ = ru(n, d, m)), !!_.outside; ) {
              if (l < 0 ? m <= 0 : m >= c.height) {
                _.hitSide = !0
                break
              }
              m += l * 5
            }
            return _
          }
          var he = function (n) {
            ;(this.cm = n),
              (this.lastAnchorNode =
                this.lastAnchorOffset =
                this.lastFocusNode =
                this.lastFocusOffset =
                  null),
              (this.polling = new nt()),
              (this.composing = null),
              (this.gracePeriod = !1),
              (this.readDOMTimeout = null)
          }
          ;(he.prototype.init = function (n) {
            var i = this,
              l = this,
              s = l.cm,
              c = (l.div = n.lineDiv)
            ;(c.contentEditable = !0),
              Ou(
                c,
                s.options.spellcheck,
                s.options.autocorrect,
                s.options.autocapitalize,
              )
            function d(y) {
              for (var x = y.target; x; x = x.parentNode) {
                if (x == c) return !0
                if (/\bCodeMirror-(?:line)?widget\b/.test(x.className)) break
              }
              return !1
            }
            wt(c, "paste", function (y) {
              !d(y) ||
                Ce(s, y) ||
                Vp(y, s) ||
                (g <= 11 &&
                  setTimeout(
                    Ie(s, function () {
                      return i.updateFromDOM()
                    }),
                    20,
                  ))
            }),
              wt(c, "compositionstart", function (y) {
                i.composing = { data: y.data, done: !1 }
              }),
              wt(c, "compositionupdate", function (y) {
                i.composing || (i.composing = { data: y.data, done: !1 })
              }),
              wt(c, "compositionend", function (y) {
                i.composing &&
                  (y.data != i.composing.data && i.readFromDOMSoon(),
                  (i.composing.done = !0))
              }),
              wt(c, "touchstart", function () {
                return l.forceCompositionEnd()
              }),
              wt(c, "input", function () {
                i.composing || i.readFromDOMSoon()
              })
            function m(y) {
              if (!(!d(y) || Ce(s, y))) {
                if (s.somethingSelected())
                  da({ lineWise: !1, text: s.getSelections() }),
                    y.type == "cut" && s.replaceSelection("", null, "cut")
                else if (s.options.lineWiseCopyCut) {
                  var x = Xp(s)
                  da({ lineWise: !0, text: x.text }),
                    y.type == "cut" &&
                      s.operation(function () {
                        s.setSelections(x.ranges, 0, O),
                          s.replaceSelection("", null, "cut")
                      })
                } else return
                if (y.clipboardData) {
                  y.clipboardData.clearData()
                  var _ = Kn.text.join(`
`)
                  if (
                    (y.clipboardData.setData("Text", _),
                    y.clipboardData.getData("Text") == _)
                  ) {
                    y.preventDefault()
                    return
                  }
                }
                var P = Yp(),
                  D = P.firstChild
                Ou(D),
                  s.display.lineSpace.insertBefore(
                    P,
                    s.display.lineSpace.firstChild,
                  ),
                  (D.value = Kn.text.join(`
`))
                var U = mt(c.ownerDocument)
                Bt(D),
                  setTimeout(function () {
                    s.display.lineSpace.removeChild(P),
                      U.focus(),
                      U == c && l.showPrimarySelection()
                  }, 50)
              }
            }
            wt(c, "copy", m), wt(c, "cut", m)
          }),
            (he.prototype.screenReaderLabelChanged = function (n) {
              n
                ? this.div.setAttribute("aria-label", n)
                : this.div.removeAttribute("aria-label")
            }),
            (he.prototype.prepareSelection = function () {
              var n = Hd(this.cm, !1)
              return (n.focus = mt(this.div.ownerDocument) == this.div), n
            }),
            (he.prototype.showSelection = function (n, i) {
              !n ||
                !this.cm.display.view.length ||
                ((n.focus || i) && this.showPrimarySelection(),
                this.showMultipleSelections(n))
            }),
            (he.prototype.getSelection = function () {
              return this.cm.display.wrapper.ownerDocument.getSelection()
            }),
            (he.prototype.showPrimarySelection = function () {
              var n = this.getSelection(),
                i = this.cm,
                l = i.doc.sel.primary(),
                s = l.from(),
                c = l.to()
              if (
                i.display.viewTo == i.display.viewFrom ||
                s.line >= i.display.viewTo ||
                c.line < i.display.viewFrom
              ) {
                n.removeAllRanges()
                return
              }
              var d = pa(i, n.anchorNode, n.anchorOffset),
                m = pa(i, n.focusNode, n.focusOffset)
              if (
                !(
                  d &&
                  !d.bad &&
                  m &&
                  !m.bad &&
                  Z(Oe(d, m), s) == 0 &&
                  Z(oe(d, m), c) == 0
                )
              ) {
                var y = i.display.view,
                  x = (s.line >= i.display.viewFrom && Jp(i, s)) || {
                    node: y[0].measure.map[2],
                    offset: 0,
                  },
                  _ = c.line < i.display.viewTo && Jp(i, c)
                if (!_) {
                  var P = y[y.length - 1].measure,
                    D = P.maps ? P.maps[P.maps.length - 1] : P.map
                  _ = {
                    node: D[D.length - 1],
                    offset: D[D.length - 2] - D[D.length - 3],
                  }
                }
                if (!x || !_) {
                  n.removeAllRanges()
                  return
                }
                var U = n.rangeCount && n.getRangeAt(0),
                  H
                try {
                  H = B(x.node, x.offset, _.offset, _.node)
                } catch {}
                H &&
                  (!a && i.state.focused
                    ? (n.collapse(x.node, x.offset),
                      H.collapsed || (n.removeAllRanges(), n.addRange(H)))
                    : (n.removeAllRanges(), n.addRange(H)),
                  U && n.anchorNode == null
                    ? n.addRange(U)
                    : a && this.startGracePeriod()),
                  this.rememberSelection()
              }
            }),
            (he.prototype.startGracePeriod = function () {
              var n = this
              clearTimeout(this.gracePeriod),
                (this.gracePeriod = setTimeout(function () {
                  ;(n.gracePeriod = !1),
                    n.selectionChanged() &&
                      n.cm.operation(function () {
                        return (n.cm.curOp.selectionChanged = !0)
                      })
                }, 20))
            }),
            (he.prototype.showMultipleSelections = function (n) {
              z(this.cm.display.cursorDiv, n.cursors),
                z(this.cm.display.selectionDiv, n.selection)
            }),
            (he.prototype.rememberSelection = function () {
              var n = this.getSelection()
              ;(this.lastAnchorNode = n.anchorNode),
                (this.lastAnchorOffset = n.anchorOffset),
                (this.lastFocusNode = n.focusNode),
                (this.lastFocusOffset = n.focusOffset)
            }),
            (he.prototype.selectionInEditor = function () {
              var n = this.getSelection()
              if (!n.rangeCount) return !1
              var i = n.getRangeAt(0).commonAncestorContainer
              return Q(this.div, i)
            }),
            (he.prototype.focus = function () {
              this.cm.options.readOnly != "nocursor" &&
                ((!this.selectionInEditor() ||
                  mt(this.div.ownerDocument) != this.div) &&
                  this.showSelection(this.prepareSelection(), !0),
                this.div.focus())
            }),
            (he.prototype.blur = function () {
              this.div.blur()
            }),
            (he.prototype.getField = function () {
              return this.div
            }),
            (he.prototype.supportsTouch = function () {
              return !0
            }),
            (he.prototype.receivedFocus = function () {
              var n = this,
                i = this
              this.selectionInEditor()
                ? setTimeout(function () {
                    return n.pollSelection()
                  }, 20)
                : xn(this.cm, function () {
                    return (i.cm.curOp.selectionChanged = !0)
                  })
              function l() {
                i.cm.state.focused &&
                  (i.pollSelection(),
                  i.polling.set(i.cm.options.pollInterval, l))
              }
              this.polling.set(this.cm.options.pollInterval, l)
            }),
            (he.prototype.selectionChanged = function () {
              var n = this.getSelection()
              return (
                n.anchorNode != this.lastAnchorNode ||
                n.anchorOffset != this.lastAnchorOffset ||
                n.focusNode != this.lastFocusNode ||
                n.focusOffset != this.lastFocusOffset
              )
            }),
            (he.prototype.pollSelection = function () {
              if (
                !(
                  this.readDOMTimeout != null ||
                  this.gracePeriod ||
                  !this.selectionChanged()
                )
              ) {
                var n = this.getSelection(),
                  i = this.cm
                if (
                  R &&
                  w &&
                  this.cm.display.gutterSpecs.length &&
                  yx(n.anchorNode)
                ) {
                  this.cm.triggerOnKeyDown({
                    type: "keydown",
                    keyCode: 8,
                    preventDefault: Math.abs,
                  }),
                    this.blur(),
                    this.focus()
                  return
                }
                if (!this.composing) {
                  this.rememberSelection()
                  var l = pa(i, n.anchorNode, n.anchorOffset),
                    s = pa(i, n.focusNode, n.focusOffset)
                  l &&
                    s &&
                    xn(i, function () {
                      Xe(i.doc, ni(l, s), O),
                        (l.bad || s.bad) && (i.curOp.selectionChanged = !0)
                    })
                }
              }
            }),
            (he.prototype.pollContent = function () {
              this.readDOMTimeout != null &&
                (clearTimeout(this.readDOMTimeout),
                (this.readDOMTimeout = null))
              var n = this.cm,
                i = n.display,
                l = n.doc.sel.primary(),
                s = l.from(),
                c = l.to()
              if (
                (s.ch == 0 &&
                  s.line > n.firstLine() &&
                  (s = F(s.line - 1, Lt(n.doc, s.line - 1).length)),
                c.ch == Lt(n.doc, c.line).text.length &&
                  c.line < n.lastLine() &&
                  (c = F(c.line + 1, 0)),
                s.line < i.viewFrom || c.line > i.viewTo - 1)
              )
                return !1
              var d, m, y
              s.line == i.viewFrom || (d = Oi(n, s.line)) == 0
                ? ((m = ae(i.view[0].line)), (y = i.view[0].node))
                : ((m = ae(i.view[d].line)),
                  (y = i.view[d - 1].node.nextSibling))
              var x = Oi(n, c.line),
                _,
                P
              if (
                (x == i.view.length - 1
                  ? ((_ = i.viewTo - 1), (P = i.lineDiv.lastChild))
                  : ((_ = ae(i.view[x + 1].line) - 1),
                    (P = i.view[x + 1].node.previousSibling)),
                !y)
              )
                return !1
              for (
                var D = n.doc.splitLines(bx(n, y, P, m, _)),
                  U = Cr(n.doc, F(m, 0), F(_, Lt(n.doc, _).text.length));
                D.length > 1 && U.length > 1;

              )
                if (ct(D) == ct(U)) D.pop(), U.pop(), _--
                else if (D[0] == U[0]) D.shift(), U.shift(), m++
                else break
              for (
                var H = 0,
                  J = 0,
                  it = D[0],
                  gt = U[0],
                  yt = Math.min(it.length, gt.length);
                H < yt && it.charCodeAt(H) == gt.charCodeAt(H);

              )
                ++H
              for (
                var kt = ct(D),
                  bt = ct(U),
                  Ct = Math.min(
                    kt.length - (D.length == 1 ? H : 0),
                    bt.length - (U.length == 1 ? H : 0),
                  );
                J < Ct &&
                kt.charCodeAt(kt.length - J - 1) ==
                  bt.charCodeAt(bt.length - J - 1);

              )
                ++J
              if (D.length == 1 && U.length == 1 && m == s.line)
                for (
                  ;
                  H &&
                  H > s.ch &&
                  kt.charCodeAt(kt.length - J - 1) ==
                    bt.charCodeAt(bt.length - J - 1);

                )
                  H--, J++
              ;(D[D.length - 1] = kt
                .slice(0, kt.length - J)
                .replace(/^\u200b+/, "")),
                (D[0] = D[0].slice(H).replace(/\u200b+$/, ""))
              var $t = F(m, H),
                Pt = F(_, U.length ? ct(U).length - J : 0)
              if (D.length > 1 || D[0] || Z($t, Pt))
                return Co(n.doc, D, $t, Pt, "+input"), !0
            }),
            (he.prototype.ensurePolled = function () {
              this.forceCompositionEnd()
            }),
            (he.prototype.reset = function () {
              this.forceCompositionEnd()
            }),
            (he.prototype.forceCompositionEnd = function () {
              this.composing &&
                (clearTimeout(this.readDOMTimeout),
                (this.composing = null),
                this.updateFromDOM(),
                this.div.blur(),
                this.div.focus())
            }),
            (he.prototype.readFromDOMSoon = function () {
              var n = this
              this.readDOMTimeout == null &&
                (this.readDOMTimeout = setTimeout(function () {
                  if (((n.readDOMTimeout = null), n.composing))
                    if (n.composing.done) n.composing = null
                    else return
                  n.updateFromDOM()
                }, 80))
            }),
            (he.prototype.updateFromDOM = function () {
              var n = this
              ;(this.cm.isReadOnly() || !this.pollContent()) &&
                xn(this.cm, function () {
                  return ln(n.cm)
                })
            }),
            (he.prototype.setUneditable = function (n) {
              n.contentEditable = "false"
            }),
            (he.prototype.onKeyPress = function (n) {
              n.charCode == 0 ||
                this.composing ||
                (n.preventDefault(),
                this.cm.isReadOnly() ||
                  Ie(this.cm, Pu)(
                    this.cm,
                    String.fromCharCode(
                      n.charCode == null ? n.keyCode : n.charCode,
                    ),
                    0,
                  ))
            }),
            (he.prototype.readOnlyChanged = function (n) {
              this.div.contentEditable = String(n != "nocursor")
            }),
            (he.prototype.onContextMenu = function () {}),
            (he.prototype.resetPosition = function () {}),
            (he.prototype.needsContentAttribute = !0)
          function Jp(n, i) {
            var l = tu(n, i.line)
            if (!l || l.hidden) return null
            var s = Lt(n.doc, i.line),
              c = Ed(l, s, i.line),
              d = ye(s, n.doc.direction),
              m = "left"
            if (d) {
              var y = We(d, i.ch)
              m = y % 2 ? "right" : "left"
            }
            var x = Md(c.map, i.ch, m)
            return (x.offset = x.collapse == "right" ? x.end : x.start), x
          }
          function yx(n) {
            for (var i = n; i; i = i.parentNode)
              if (/CodeMirror-gutter-wrapper/.test(i.className)) return !0
            return !1
          }
          function Mo(n, i) {
            return i && (n.bad = !0), n
          }
          function bx(n, i, l, s, c) {
            var d = "",
              m = !1,
              y = n.doc.lineSeparator(),
              x = !1
            function _(H) {
              return function (J) {
                return J.id == H
              }
            }
            function P() {
              m && ((d += y), x && (d += y), (m = x = !1))
            }
            function D(H) {
              H && (P(), (d += H))
            }
            function U(H) {
              if (H.nodeType == 1) {
                var J = H.getAttribute("cm-text")
                if (J) {
                  D(J)
                  return
                }
                var it = H.getAttribute("cm-marker"),
                  gt
                if (it) {
                  var yt = n.findMarks(F(s, 0), F(c + 1, 0), _(+it))
                  yt.length &&
                    (gt = yt[0].find(0)) &&
                    D(Cr(n.doc, gt.from, gt.to).join(y))
                  return
                }
                if (H.getAttribute("contenteditable") == "false") return
                var kt = /^(pre|div|p|li|table|br)$/i.test(H.nodeName)
                if (!/^br$/i.test(H.nodeName) && H.textContent.length == 0)
                  return
                kt && P()
                for (var bt = 0; bt < H.childNodes.length; bt++)
                  U(H.childNodes[bt])
                ;/^(pre|p)$/i.test(H.nodeName) && (x = !0), kt && (m = !0)
              } else
                H.nodeType == 3 &&
                  D(H.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "))
            }
            for (; U(i), i != l; ) (i = i.nextSibling), (x = !1)
            return d
          }
          function pa(n, i, l) {
            var s
            if (i == n.display.lineDiv) {
              if (((s = n.display.lineDiv.childNodes[l]), !s))
                return Mo(n.clipPos(F(n.display.viewTo - 1)), !0)
              ;(i = null), (l = 0)
            } else
              for (s = i; ; s = s.parentNode) {
                if (!s || s == n.display.lineDiv) return null
                if (s.parentNode && s.parentNode == n.display.lineDiv) break
              }
            for (var c = 0; c < n.display.view.length; c++) {
              var d = n.display.view[c]
              if (d.node == s) return wx(d, i, l)
            }
          }
          function wx(n, i, l) {
            var s = n.text.firstChild,
              c = !1
            if (!i || !Q(s, i)) return Mo(F(ae(n.line), 0), !0)
            if (i == s && ((c = !0), (i = s.childNodes[l]), (l = 0), !i)) {
              var d = n.rest ? ct(n.rest) : n.line
              return Mo(F(ae(d), d.text.length), c)
            }
            var m = i.nodeType == 3 ? i : null,
              y = i
            for (
              !m &&
              i.childNodes.length == 1 &&
              i.firstChild.nodeType == 3 &&
              ((m = i.firstChild), l && (l = m.nodeValue.length));
              y.parentNode != s;

            )
              y = y.parentNode
            var x = n.measure,
              _ = x.maps
            function P(gt, yt, kt) {
              for (var bt = -1; bt < (_ ? _.length : 0); bt++)
                for (
                  var Ct = bt < 0 ? x.map : _[bt], $t = 0;
                  $t < Ct.length;
                  $t += 3
                ) {
                  var Pt = Ct[$t + 2]
                  if (Pt == gt || Pt == yt) {
                    var jt = ae(bt < 0 ? n.line : n.rest[bt]),
                      ge = Ct[$t] + kt
                    return (
                      (kt < 0 || Pt != gt) && (ge = Ct[$t + (kt ? 1 : 0)]),
                      F(jt, ge)
                    )
                  }
                }
            }
            var D = P(m, y, l)
            if (D) return Mo(D, c)
            for (
              var U = y.nextSibling, H = m ? m.nodeValue.length - l : 0;
              U;
              U = U.nextSibling
            ) {
              if (((D = P(U, U.firstChild, 0)), D))
                return Mo(F(D.line, D.ch - H), c)
              H += U.textContent.length
            }
            for (var J = y.previousSibling, it = l; J; J = J.previousSibling) {
              if (((D = P(J, J.firstChild, -1)), D))
                return Mo(F(D.line, D.ch + it), c)
              it += J.textContent.length
            }
          }
          var Ae = function (n) {
            ;(this.cm = n),
              (this.prevInput = ""),
              (this.pollingFast = !1),
              (this.polling = new nt()),
              (this.hasSelection = !1),
              (this.composing = null),
              (this.resetting = !1)
          }
          ;(Ae.prototype.init = function (n) {
            var i = this,
              l = this,
              s = this.cm
            this.createField(n)
            var c = this.textarea
            n.wrapper.insertBefore(this.wrapper, n.wrapper.firstChild),
              M && (c.style.width = "0px"),
              wt(c, "input", function () {
                p && g >= 9 && i.hasSelection && (i.hasSelection = null),
                  l.poll()
              }),
              wt(c, "paste", function (m) {
                Ce(s, m) ||
                  Vp(m, s) ||
                  ((s.state.pasteIncoming = +new Date()), l.fastPoll())
              })
            function d(m) {
              if (!Ce(s, m)) {
                if (s.somethingSelected())
                  da({ lineWise: !1, text: s.getSelections() })
                else if (s.options.lineWiseCopyCut) {
                  var y = Xp(s)
                  da({ lineWise: !0, text: y.text }),
                    m.type == "cut"
                      ? s.setSelections(y.ranges, null, O)
                      : ((l.prevInput = ""),
                        (c.value = y.text.join(`
`)),
                        Bt(c))
                } else return
                m.type == "cut" && (s.state.cutIncoming = +new Date())
              }
            }
            wt(c, "cut", d),
              wt(c, "copy", d),
              wt(n.scroller, "paste", function (m) {
                if (!(Lr(n, m) || Ce(s, m))) {
                  if (!c.dispatchEvent) {
                    ;(s.state.pasteIncoming = +new Date()), l.focus()
                    return
                  }
                  var y = new Event("paste")
                  ;(y.clipboardData = m.clipboardData), c.dispatchEvent(y)
                }
              }),
              wt(n.lineSpace, "selectstart", function (m) {
                Lr(n, m) || Ke(m)
              }),
              wt(c, "compositionstart", function () {
                var m = s.getCursor("from")
                l.composing && l.composing.range.clear(),
                  (l.composing = {
                    start: m,
                    range: s.markText(m, s.getCursor("to"), {
                      className: "CodeMirror-composing",
                    }),
                  })
              }),
              wt(c, "compositionend", function () {
                l.composing &&
                  (l.poll(), l.composing.range.clear(), (l.composing = null))
              })
          }),
            (Ae.prototype.createField = function (n) {
              ;(this.wrapper = Yp()), (this.textarea = this.wrapper.firstChild)
              var i = this.cm.options
              Ou(this.textarea, i.spellcheck, i.autocorrect, i.autocapitalize)
            }),
            (Ae.prototype.screenReaderLabelChanged = function (n) {
              n
                ? this.textarea.setAttribute("aria-label", n)
                : this.textarea.removeAttribute("aria-label")
            }),
            (Ae.prototype.prepareSelection = function () {
              var n = this.cm,
                i = n.display,
                l = n.doc,
                s = Hd(n)
              if (n.options.moveInputWithCursor) {
                var c = Gn(n, l.sel.primary().head, "div"),
                  d = i.wrapper.getBoundingClientRect(),
                  m = i.lineDiv.getBoundingClientRect()
                ;(s.teTop = Math.max(
                  0,
                  Math.min(i.wrapper.clientHeight - 10, c.top + m.top - d.top),
                )),
                  (s.teLeft = Math.max(
                    0,
                    Math.min(
                      i.wrapper.clientWidth - 10,
                      c.left + m.left - d.left,
                    ),
                  ))
              }
              return s
            }),
            (Ae.prototype.showSelection = function (n) {
              var i = this.cm,
                l = i.display
              z(l.cursorDiv, n.cursors),
                z(l.selectionDiv, n.selection),
                n.teTop != null &&
                  ((this.wrapper.style.top = n.teTop + "px"),
                  (this.wrapper.style.left = n.teLeft + "px"))
            }),
            (Ae.prototype.reset = function (n) {
              if (!(this.contextMenuPending || (this.composing && n))) {
                var i = this.cm
                if (((this.resetting = !0), i.somethingSelected())) {
                  this.prevInput = ""
                  var l = i.getSelection()
                  ;(this.textarea.value = l),
                    i.state.focused && Bt(this.textarea),
                    p && g >= 9 && (this.hasSelection = l)
                } else
                  n ||
                    ((this.prevInput = this.textarea.value = ""),
                    p && g >= 9 && (this.hasSelection = null))
                this.resetting = !1
              }
            }),
            (Ae.prototype.getField = function () {
              return this.textarea
            }),
            (Ae.prototype.supportsTouch = function () {
              return !1
            }),
            (Ae.prototype.focus = function () {
              if (
                this.cm.options.readOnly != "nocursor" &&
                (!E || mt(this.textarea.ownerDocument) != this.textarea)
              )
                try {
                  this.textarea.focus()
                } catch {}
            }),
            (Ae.prototype.blur = function () {
              this.textarea.blur()
            }),
            (Ae.prototype.resetPosition = function () {
              this.wrapper.style.top = this.wrapper.style.left = 0
            }),
            (Ae.prototype.receivedFocus = function () {
              this.slowPoll()
            }),
            (Ae.prototype.slowPoll = function () {
              var n = this
              this.pollingFast ||
                this.polling.set(this.cm.options.pollInterval, function () {
                  n.poll(), n.cm.state.focused && n.slowPoll()
                })
            }),
            (Ae.prototype.fastPoll = function () {
              var n = !1,
                i = this
              i.pollingFast = !0
              function l() {
                var s = i.poll()
                !s && !n
                  ? ((n = !0), i.polling.set(60, l))
                  : ((i.pollingFast = !1), i.slowPoll())
              }
              i.polling.set(20, l)
            }),
            (Ae.prototype.poll = function () {
              var n = this,
                i = this.cm,
                l = this.textarea,
                s = this.prevInput
              if (
                this.contextMenuPending ||
                this.resetting ||
                !i.state.focused ||
                (Xr(l) && !s && !this.composing) ||
                i.isReadOnly() ||
                i.options.disableInput ||
                i.state.keySeq
              )
                return !1
              var c = l.value
              if (c == s && !i.somethingSelected()) return !1
              if (
                (p && g >= 9 && this.hasSelection === c) ||
                (W && /[\uf700-\uf7ff]/.test(c))
              )
                return i.display.input.reset(), !1
              if (i.doc.sel == i.display.selForContextMenu) {
                var d = c.charCodeAt(0)
                if ((d == 8203 && !s && (s = "​"), d == 8666))
                  return this.reset(), this.cm.execCommand("undo")
              }
              for (
                var m = 0, y = Math.min(s.length, c.length);
                m < y && s.charCodeAt(m) == c.charCodeAt(m);

              )
                ++m
              return (
                xn(i, function () {
                  Pu(
                    i,
                    c.slice(m),
                    s.length - m,
                    null,
                    n.composing ? "*compose" : null,
                  ),
                    c.length > 1e3 ||
                    c.indexOf(`
`) > -1
                      ? (l.value = n.prevInput = "")
                      : (n.prevInput = c),
                    n.composing &&
                      (n.composing.range.clear(),
                      (n.composing.range = i.markText(
                        n.composing.start,
                        i.getCursor("to"),
                        { className: "CodeMirror-composing" },
                      )))
                }),
                !0
              )
            }),
            (Ae.prototype.ensurePolled = function () {
              this.pollingFast && this.poll() && (this.pollingFast = !1)
            }),
            (Ae.prototype.onKeyPress = function () {
              p && g >= 9 && (this.hasSelection = null), this.fastPoll()
            }),
            (Ae.prototype.onContextMenu = function (n) {
              var i = this,
                l = i.cm,
                s = l.display,
                c = i.textarea
              i.contextMenuPending && i.contextMenuPending()
              var d = Pi(l, n),
                m = s.scroller.scrollTop
              if (!d || N) return
              var y = l.options.resetSelectionOnContextMenu
              y && l.doc.sel.contains(d) == -1 && Ie(l, Xe)(l.doc, ni(d), O)
              var x = c.style.cssText,
                _ = i.wrapper.style.cssText,
                P = i.wrapper.offsetParent.getBoundingClientRect()
              ;(i.wrapper.style.cssText = "position: static"),
                (c.style.cssText =
                  `position: absolute; width: 30px; height: 30px;
      top: ` +
                  (n.clientY - P.top - 5) +
                  "px; left: " +
                  (n.clientX - P.left - 5) +
                  `px;
      z-index: 1000; background: ` +
                  (p ? "rgba(255, 255, 255, .05)" : "transparent") +
                  `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`)
              var D
              v && (D = c.ownerDocument.defaultView.scrollY),
                s.input.focus(),
                v && c.ownerDocument.defaultView.scrollTo(null, D),
                s.input.reset(),
                l.somethingSelected() || (c.value = i.prevInput = " "),
                (i.contextMenuPending = H),
                (s.selForContextMenu = l.doc.sel),
                clearTimeout(s.detectingSelectAll)
              function U() {
                if (c.selectionStart != null) {
                  var it = l.somethingSelected(),
                    gt = "​" + (it ? c.value : "")
                  ;(c.value = "⇚"),
                    (c.value = gt),
                    (i.prevInput = it ? "" : "​"),
                    (c.selectionStart = 1),
                    (c.selectionEnd = gt.length),
                    (s.selForContextMenu = l.doc.sel)
                }
              }
              function H() {
                if (
                  i.contextMenuPending == H &&
                  ((i.contextMenuPending = !1),
                  (i.wrapper.style.cssText = _),
                  (c.style.cssText = x),
                  p &&
                    g < 9 &&
                    s.scrollbars.setScrollTop((s.scroller.scrollTop = m)),
                  c.selectionStart != null)
                ) {
                  ;(!p || (p && g < 9)) && U()
                  var it = 0,
                    gt = function () {
                      s.selForContextMenu == l.doc.sel &&
                      c.selectionStart == 0 &&
                      c.selectionEnd > 0 &&
                      i.prevInput == "​"
                        ? Ie(l, mp)(l)
                        : it++ < 10
                          ? (s.detectingSelectAll = setTimeout(gt, 500))
                          : ((s.selForContextMenu = null), s.input.reset())
                    }
                  s.detectingSelectAll = setTimeout(gt, 200)
                }
              }
              if ((p && g >= 9 && U(), st)) {
                _r(n)
                var J = function () {
                  Ve(window, "mouseup", J), setTimeout(H, 20)
                }
                wt(window, "mouseup", J)
              } else setTimeout(H, 50)
            }),
            (Ae.prototype.readOnlyChanged = function (n) {
              n || this.reset(),
                (this.textarea.disabled = n == "nocursor"),
                (this.textarea.readOnly = !!n)
            }),
            (Ae.prototype.setUneditable = function () {}),
            (Ae.prototype.needsContentAttribute = !1)
          function xx(n, i) {
            if (
              ((i = i ? St(i) : {}),
              (i.value = n.value),
              !i.tabindex && n.tabIndex && (i.tabindex = n.tabIndex),
              !i.placeholder &&
                n.placeholder &&
                (i.placeholder = n.placeholder),
              i.autofocus == null)
            ) {
              var l = mt(n.ownerDocument)
              i.autofocus =
                l == n ||
                (n.getAttribute("autofocus") != null && l == document.body)
            }
            function s() {
              n.value = y.getValue()
            }
            var c
            if (
              n.form &&
              (wt(n.form, "submit", s), !i.leaveSubmitMethodAlone)
            ) {
              var d = n.form
              c = d.submit
              try {
                var m = (d.submit = function () {
                  s(), (d.submit = c), d.submit(), (d.submit = m)
                })
              } catch {}
            }
            ;(i.finishInit = function (x) {
              ;(x.save = s),
                (x.getTextArea = function () {
                  return n
                }),
                (x.toTextArea = function () {
                  ;(x.toTextArea = isNaN),
                    s(),
                    n.parentNode.removeChild(x.getWrapperElement()),
                    (n.style.display = ""),
                    n.form &&
                      (Ve(n.form, "submit", s),
                      !i.leaveSubmitMethodAlone &&
                        typeof n.form.submit == "function" &&
                        (n.form.submit = c))
                })
            }),
              (n.style.display = "none")
            var y = we(function (x) {
              return n.parentNode.insertBefore(x, n.nextSibling)
            }, i)
            return y
          }
          function _x(n) {
            ;(n.off = Ve),
              (n.on = wt),
              (n.wheelEventPixels = Aw),
              (n.Doc = an),
              (n.splitLines = vs),
              (n.countColumn = j),
              (n.findColumn = tt),
              (n.isWordChar = Ot),
              (n.Pass = Mt),
              (n.signal = me),
              (n.Line = po),
              (n.changeEnd = ri),
              (n.scrollbarModel = Vd),
              (n.Pos = F),
              (n.cmpPos = Z),
              (n.modes = Un),
              (n.mimeModes = Yr),
              (n.resolveMode = wn),
              (n.getMode = Sr),
              (n.modeExtensions = Zr),
              (n.extendMode = Il),
              (n.copyState = kr),
              (n.startState = ms),
              (n.innerMode = Jr),
              (n.commands = qs),
              (n.keyMap = Mr),
              (n.keyName = Op),
              (n.isModifierKey = Np),
              (n.lookupKey = Eo),
              (n.normalizeKeyMap = Zw),
              (n.StringStream = Te),
              (n.SharedTextMarker = zs),
              (n.TextMarker = oi),
              (n.LineWidget = Rs),
              (n.e_preventDefault = Ke),
              (n.e_stopPropagation = Ai),
              (n.e_stop = _r),
              (n.addClass = Et),
              (n.contains = Q),
              (n.rmClass = pt),
              (n.keyNames = si)
          }
          dx(we), mx(we)
          var Sx = "iter insert remove copy getEditor constructor".split(" ")
          for (var ga in an.prototype)
            an.prototype.hasOwnProperty(ga) &&
              rt(Sx, ga) < 0 &&
              (we.prototype[ga] = (function (n) {
                return function () {
                  return n.apply(this.doc, arguments)
                }
              })(an.prototype[ga]))
          return (
            Qe(an),
            (we.inputStyles = { textarea: Ae, contenteditable: he }),
            (we.defineMode = function (n) {
              !we.defaults.mode && n != "null" && (we.defaults.mode = n),
                Fl.apply(this, arguments)
            }),
            (we.defineMIME = fo),
            we.defineMode("null", function () {
              return {
                token: function (n) {
                  return n.skipToEnd()
                },
              }
            }),
            we.defineMIME("text/plain", "null"),
            (we.defineExtension = function (n, i) {
              we.prototype[n] = i
            }),
            (we.defineDocExtension = function (n, i) {
              an.prototype[n] = i
            }),
            (we.fromTextArea = xx),
            _x(we),
            (we.version = "5.65.15"),
            we
          )
        })
      })(tf)),
    tf.exports
  )
}
var ylt = fs()
const blt = X0(ylt)
var Ov = { exports: {} },
  Dv
function Ry() {
  return (
    Dv ||
      ((Dv = 1),
      (function (t, e) {
        ;(function (r) {
          r(fs())
        })(function (r) {
          r.defineMode("javascript", function (o, a) {
            var u = o.indentUnit,
              f = a.statementIndent,
              h = a.jsonld,
              p = a.json || h,
              g = a.trackScope !== !1,
              v = a.typescript,
              b = a.wordCharacters || /[\w$\xa1-\uffff]/,
              w = (function () {
                function C(Oe) {
                  return { type: Oe, style: "keyword" }
                }
                var $ = C("keyword a"),
                  F = C("keyword b"),
                  Z = C("keyword c"),
                  qt = C("keyword d"),
                  Yt = C("operator"),
                  oe = { type: "atom", style: "atom" }
                return {
                  if: C("if"),
                  while: $,
                  with: $,
                  else: F,
                  do: F,
                  try: F,
                  finally: F,
                  return: qt,
                  break: qt,
                  continue: qt,
                  new: C("new"),
                  delete: Z,
                  void: Z,
                  throw: Z,
                  debugger: C("debugger"),
                  var: C("var"),
                  const: C("var"),
                  let: C("var"),
                  function: C("function"),
                  catch: C("catch"),
                  for: C("for"),
                  switch: C("switch"),
                  case: C("case"),
                  default: C("default"),
                  in: Yt,
                  typeof: Yt,
                  instanceof: Yt,
                  true: oe,
                  false: oe,
                  null: oe,
                  undefined: oe,
                  NaN: oe,
                  Infinity: oe,
                  this: C("this"),
                  class: C("class"),
                  super: C("atom"),
                  yield: Z,
                  export: C("export"),
                  import: C("import"),
                  extends: Z,
                  await: Z,
                }
              })(),
              S = /[+\-*&%=<>!?|~^@]/,
              N =
                /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/
            function L(C) {
              for (var $ = !1, F, Z = !1; (F = C.next()) != null; ) {
                if (!$) {
                  if (F == "/" && !Z) return
                  F == "[" ? (Z = !0) : Z && F == "]" && (Z = !1)
                }
                $ = !$ && F == "\\"
              }
            }
            var A, T
            function M(C, $, F) {
              return (A = C), (T = F), $
            }
            function R(C, $) {
              var F = C.next()
              if (F == '"' || F == "'")
                return ($.tokenize = E(F)), $.tokenize(C, $)
              if (F == "." && C.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
                return M("number", "number")
              if (F == "." && C.match("..")) return M("spread", "meta")
              if (/[\[\]{}\(\),;\:\.]/.test(F)) return M(F)
              if (F == "=" && C.eat(">")) return M("=>", "operator")
              if (F == "0" && C.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
                return M("number", "number")
              if (/\d/.test(F))
                return (
                  C.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),
                  M("number", "number")
                )
              if (F == "/")
                return C.eat("*")
                  ? (($.tokenize = W), W(C, $))
                  : C.eat("/")
                    ? (C.skipToEnd(), M("comment", "comment"))
                    : sr(C, $, 1)
                      ? (L(C),
                        C.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),
                        M("regexp", "string-2"))
                      : (C.eat("="), M("operator", "operator", C.current()))
              if (F == "`") return ($.tokenize = X), X(C, $)
              if (F == "#" && C.peek() == "!")
                return C.skipToEnd(), M("meta", "meta")
              if (F == "#" && C.eatWhile(b)) return M("variable", "property")
              if (
                (F == "<" && C.match("!--")) ||
                (F == "-" &&
                  C.match("->") &&
                  !/\S/.test(C.string.slice(0, C.start)))
              )
                return C.skipToEnd(), M("comment", "comment")
              if (S.test(F))
                return (
                  (F != ">" || !$.lexical || $.lexical.type != ">") &&
                    (C.eat("=")
                      ? (F == "!" || F == "=") && C.eat("=")
                      : /[<>*+\-|&?]/.test(F) &&
                        (C.eat(F), F == ">" && C.eat(F))),
                  F == "?" && C.eat(".")
                    ? M(".")
                    : M("operator", "operator", C.current())
                )
              if (b.test(F)) {
                C.eatWhile(b)
                var Z = C.current()
                if ($.lastType != ".") {
                  if (w.propertyIsEnumerable(Z)) {
                    var qt = w[Z]
                    return M(qt.type, qt.style, Z)
                  }
                  if (
                    Z == "async" &&
                    C.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1)
                  )
                    return M("async", "keyword", Z)
                }
                return M("variable", "variable", Z)
              }
            }
            function E(C) {
              return function ($, F) {
                var Z = !1,
                  qt
                if (h && $.peek() == "@" && $.match(N))
                  return (F.tokenize = R), M("jsonld-keyword", "meta")
                for (; (qt = $.next()) != null && !(qt == C && !Z); )
                  Z = !Z && qt == "\\"
                return Z || (F.tokenize = R), M("string", "string")
              }
            }
            function W(C, $) {
              for (var F = !1, Z; (Z = C.next()); ) {
                if (Z == "/" && F) {
                  $.tokenize = R
                  break
                }
                F = Z == "*"
              }
              return M("comment", "comment")
            }
            function X(C, $) {
              for (var F = !1, Z; (Z = C.next()) != null; ) {
                if (!F && (Z == "`" || (Z == "$" && C.eat("{")))) {
                  $.tokenize = R
                  break
                }
                F = !F && Z == "\\"
              }
              return M("quasi", "string-2", C.current())
            }
            var ft = "([{}])"
            function Y(C, $) {
              $.fatArrowAt && ($.fatArrowAt = null)
              var F = C.string.indexOf("=>", C.start)
              if (!(F < 0)) {
                if (v) {
                  var Z = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(
                    C.string.slice(C.start, F),
                  )
                  Z && (F = Z.index)
                }
                for (var qt = 0, Yt = !1, oe = F - 1; oe >= 0; --oe) {
                  var Oe = C.string.charAt(oe),
                    Pn = ft.indexOf(Oe)
                  if (Pn >= 0 && Pn < 3) {
                    if (!qt) {
                      ++oe
                      break
                    }
                    if (--qt == 0) {
                      Oe == "(" && (Yt = !0)
                      break
                    }
                  } else if (Pn >= 3 && Pn < 6) ++qt
                  else if (b.test(Oe)) Yt = !0
                  else if (/["'\/`]/.test(Oe))
                    for (; ; --oe) {
                      if (oe == 0) return
                      var Ht = C.string.charAt(oe - 1)
                      if (Ht == Oe && C.string.charAt(oe - 2) != "\\") {
                        oe--
                        break
                      }
                    }
                  else if (Yt && !qt) {
                    ++oe
                    break
                  }
                }
                Yt && !qt && ($.fatArrowAt = oe)
              }
            }
            var et = {
              "atom": !0,
              "number": !0,
              "variable": !0,
              "string": !0,
              "regexp": !0,
              "this": !0,
              "import": !0,
              "jsonld-keyword": !0,
            }
            function st(C, $, F, Z, qt, Yt) {
              ;(this.indented = C),
                (this.column = $),
                (this.type = F),
                (this.prev = qt),
                (this.info = Yt),
                Z != null && (this.align = Z)
            }
            function dt(C, $) {
              if (!g) return !1
              for (var F = C.localVars; F; F = F.next)
                if (F.name == $) return !0
              for (var Z = C.context; Z; Z = Z.prev)
                for (var F = Z.vars; F; F = F.next) if (F.name == $) return !0
            }
            function pt(C, $, F, Z, qt) {
              var Yt = C.cc
              for (
                V.state = C,
                  V.stream = qt,
                  V.marked = null,
                  V.cc = Yt,
                  V.style = $,
                  C.lexical.hasOwnProperty("align") || (C.lexical.align = !0);
                ;

              ) {
                var oe = Yt.length ? Yt.pop() : p ? Mt : rt
                if (oe(F, Z)) {
                  for (; Yt.length && Yt[Yt.length - 1].lex; ) Yt.pop()()
                  return V.marked
                    ? V.marked
                    : F == "variable" && dt(C, Z)
                      ? "variable-2"
                      : $
                }
              }
            }
            var V = { state: null, column: null, marked: null, cc: null }
            function z() {
              for (var C = arguments.length - 1; C >= 0; C--)
                V.cc.push(arguments[C])
            }
            function k() {
              return z.apply(null, arguments), !0
            }
            function q(C, $) {
              for (var F = $; F; F = F.next) if (F.name == C) return !0
              return !1
            }
            function B(C) {
              var $ = V.state
              if (((V.marked = "def"), !!g)) {
                if ($.context) {
                  if ($.lexical.info == "var" && $.context && $.context.block) {
                    var F = Q(C, $.context)
                    if (F != null) {
                      $.context = F
                      return
                    }
                  } else if (!q(C, $.localVars)) {
                    $.localVars = new It(C, $.localVars)
                    return
                  }
                }
                a.globalVars &&
                  !q(C, $.globalVars) &&
                  ($.globalVars = new It(C, $.globalVars))
              }
            }
            function Q(C, $) {
              if ($)
                if ($.block) {
                  var F = Q(C, $.prev)
                  return F ? (F == $.prev ? $ : new Et(F, $.vars, !0)) : null
                } else
                  return q(C, $.vars)
                    ? $
                    : new Et($.prev, new It(C, $.vars), !1)
              else return null
            }
            function mt(C) {
              return (
                C == "public" ||
                C == "private" ||
                C == "protected" ||
                C == "abstract" ||
                C == "readonly"
              )
            }
            function Et(C, $, F) {
              ;(this.prev = C), (this.vars = $), (this.block = F)
            }
            function It(C, $) {
              ;(this.name = C), (this.next = $)
            }
            var Bt = new It("this", new It("arguments", null))
            function Ut() {
              ;(V.state.context = new Et(
                V.state.context,
                V.state.localVars,
                !1,
              )),
                (V.state.localVars = Bt)
            }
            function Xt() {
              ;(V.state.context = new Et(
                V.state.context,
                V.state.localVars,
                !0,
              )),
                (V.state.localVars = null)
            }
            Ut.lex = Xt.lex = !0
            function Kt() {
              ;(V.state.localVars = V.state.context.vars),
                (V.state.context = V.state.context.prev)
            }
            Kt.lex = !0
            function St(C, $) {
              var F = function () {
                var Z = V.state,
                  qt = Z.indented
                if (Z.lexical.type == "stat") qt = Z.lexical.indented
                else
                  for (
                    var Yt = Z.lexical;
                    Yt && Yt.type == ")" && Yt.align;
                    Yt = Yt.prev
                  )
                    qt = Yt.indented
                Z.lexical = new st(qt, V.stream.column(), C, null, Z.lexical, $)
              }
              return (F.lex = !0), F
            }
            function j() {
              var C = V.state
              C.lexical.prev &&
                (C.lexical.type == ")" && (C.indented = C.lexical.indented),
                (C.lexical = C.lexical.prev))
            }
            j.lex = !0
            function nt(C) {
              function $(F) {
                return F == C
                  ? k()
                  : C == ";" || F == "}" || F == ")" || F == "]"
                    ? z()
                    : k($)
              }
              return $
            }
            function rt(C, $) {
              return C == "var"
                ? k(St("vardef", $), _r, nt(";"), j)
                : C == "keyword a"
                  ? k(St("form"), I, rt, j)
                  : C == "keyword b"
                    ? k(St("form"), rt, j)
                    : C == "keyword d"
                      ? V.stream.match(/^\s*$/, !1)
                        ? k()
                        : k(St("stat"), tt, nt(";"), j)
                      : C == "debugger"
                        ? k(nt(";"))
                        : C == "{"
                          ? k(St("}"), Xt, Nn, j, Kt)
                          : C == ";"
                            ? k()
                            : C == "if"
                              ? (V.state.lexical.info == "else" &&
                                  V.state.cc[V.state.cc.length - 1] == j &&
                                  V.state.cc.pop()(),
                                k(St("form"), I, rt, j, uo))
                              : C == "function"
                                ? k(ir)
                                : C == "for"
                                  ? k(St("form"), Xt, Rl, rt, Kt, j)
                                  : C == "class" || (v && $ == "interface")
                                    ? ((V.marked = "keyword"),
                                      k(
                                        St("form", C == "class" ? C : $),
                                        Fl,
                                        j,
                                      ))
                                    : C == "variable"
                                      ? v && $ == "declare"
                                        ? ((V.marked = "keyword"), k(rt))
                                        : v &&
                                            ($ == "module" ||
                                              $ == "enum" ||
                                              $ == "type") &&
                                            V.stream.match(/^\s*\w/, !1)
                                          ? ((V.marked = "keyword"),
                                            $ == "enum"
                                              ? k(ho)
                                              : $ == "type"
                                                ? k(
                                                    zl,
                                                    nt("operator"),
                                                    wt,
                                                    nt(";"),
                                                  )
                                                : k(
                                                    St("form"),
                                                    sn,
                                                    nt("{"),
                                                    St("}"),
                                                    Nn,
                                                    j,
                                                    j,
                                                  ))
                                          : v && $ == "namespace"
                                            ? ((V.marked = "keyword"),
                                              k(St("form"), Mt, rt, j))
                                            : v && $ == "abstract"
                                              ? ((V.marked = "keyword"), k(rt))
                                              : k(St("stat"), zt)
                                      : C == "switch"
                                        ? k(
                                            St("form"),
                                            I,
                                            nt("{"),
                                            St("}", "switch"),
                                            Xt,
                                            Nn,
                                            j,
                                            j,
                                            Kt,
                                          )
                                        : C == "case"
                                          ? k(Mt, nt(":"))
                                          : C == "default"
                                            ? k(nt(":"))
                                            : C == "catch"
                                              ? k(St("form"), Ut, Nt, rt, j, Kt)
                                              : C == "export"
                                                ? k(St("stat"), Zr, j)
                                                : C == "import"
                                                  ? k(St("stat"), kr, j)
                                                  : C == "async"
                                                    ? k(rt)
                                                    : $ == "@"
                                                      ? k(Mt, rt)
                                                      : z(
                                                          St("stat"),
                                                          Mt,
                                                          nt(";"),
                                                          j,
                                                        )
            }
            function Nt(C) {
              if (C == "(") return k(Un, nt(")"))
            }
            function Mt(C, $) {
              return K(C, $, !1)
            }
            function O(C, $) {
              return K(C, $, !0)
            }
            function I(C) {
              return C != "(" ? z() : k(St(")"), tt, nt(")"), j)
            }
            function K(C, $, F) {
              if (V.state.fatArrowAt == V.stream.start) {
                var Z = F ? ht : _t
                if (C == "(")
                  return k(Ut, St(")"), te(Un, ")"), j, nt("=>"), Z, Kt)
                if (C == "variable") return z(Ut, sn, nt("=>"), Z, Kt)
              }
              var qt = F ? at : ot
              return et.hasOwnProperty(C)
                ? k(qt)
                : C == "function"
                  ? k(ir, qt)
                  : C == "class" || (v && $ == "interface")
                    ? ((V.marked = "keyword"), k(St("form"), Yr, j))
                    : C == "keyword c" || C == "async"
                      ? k(F ? O : Mt)
                      : C == "("
                        ? k(St(")"), tt, nt(")"), j, qt)
                        : C == "operator" || C == "spread"
                          ? k(F ? O : Mt)
                          : C == "["
                            ? k(St("]"), Cr, j, qt)
                            : C == "{"
                              ? bn(ie, "}", null, qt)
                              : C == "quasi"
                                ? z(ct, qt)
                                : C == "new"
                                  ? k(Dt(F))
                                  : k()
            }
            function tt(C) {
              return C.match(/[;\}\)\],]/) ? z() : z(Mt)
            }
            function ot(C, $) {
              return C == "," ? k(tt) : at(C, $, !1)
            }
            function at(C, $, F) {
              var Z = F == !1 ? ot : at,
                qt = F == !1 ? Mt : O
              if (C == "=>") return k(Ut, F ? ht : _t, Kt)
              if (C == "operator")
                return /\+\+|--/.test($) || (v && $ == "!")
                  ? k(Z)
                  : v &&
                      $ == "<" &&
                      V.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1)
                    ? k(St(">"), te(wt, ">"), j, Z)
                    : $ == "?"
                      ? k(Mt, nt(":"), qt)
                      : k(qt)
              if (C == "quasi") return z(ct, Z)
              if (C != ";") {
                if (C == "(") return bn(O, ")", "call", Z)
                if (C == ".") return k(Gt, Z)
                if (C == "[") return k(St("]"), tt, nt("]"), j, Z)
                if (v && $ == "as") return (V.marked = "keyword"), k(wt, Z)
                if (C == "regexp")
                  return (
                    (V.state.lastType = V.marked = "operator"),
                    V.stream.backUp(V.stream.pos - V.stream.start - 1),
                    k(qt)
                  )
              }
            }
            function ct(C, $) {
              return C != "quasi"
                ? z()
                : $.slice($.length - 2) != "${"
                  ? k(ct)
                  : k(tt, vt)
            }
            function vt(C) {
              if (C == "}")
                return (V.marked = "string-2"), (V.state.tokenize = X), k(ct)
            }
            function _t(C) {
              return Y(V.stream, V.state), z(C == "{" ? rt : Mt)
            }
            function ht(C) {
              return Y(V.stream, V.state), z(C == "{" ? rt : O)
            }
            function Dt(C) {
              return function ($) {
                return $ == "."
                  ? k(C ? Ot : At)
                  : $ == "variable" && v
                    ? k(Ke, C ? at : ot)
                    : z(C ? O : Mt)
              }
            }
            function At(C, $) {
              if ($ == "target") return (V.marked = "keyword"), k(ot)
            }
            function Ot(C, $) {
              if ($ == "target") return (V.marked = "keyword"), k(at)
            }
            function zt(C) {
              return C == ":" ? k(j, rt) : z(ot, nt(";"), j)
            }
            function Gt(C) {
              if (C == "variable") return (V.marked = "property"), k()
            }
            function ie(C, $) {
              if (C == "async") return (V.marked = "property"), k(ie)
              if (C == "variable" || V.style == "keyword") {
                if (((V.marked = "property"), $ == "get" || $ == "set"))
                  return k(ne)
                var F
                return (
                  v &&
                    V.state.fatArrowAt == V.stream.start &&
                    (F = V.stream.match(/^\s*:\s*/, !1)) &&
                    (V.state.fatArrowAt = V.stream.pos + F[0].length),
                  k(ue)
                )
              } else {
                if (C == "number" || C == "string")
                  return (
                    (V.marked = h ? "property" : V.style + " property"), k(ue)
                  )
                if (C == "jsonld-keyword") return k(ue)
                if (v && mt($)) return (V.marked = "keyword"), k(ie)
                if (C == "[") return k(Mt, We, nt("]"), ue)
                if (C == "spread") return k(O, ue)
                if ($ == "*") return (V.marked = "keyword"), k(ie)
                if (C == ":") return z(ue)
              }
            }
            function ne(C) {
              return C != "variable" ? z(ue) : ((V.marked = "property"), k(ir))
            }
            function ue(C) {
              if (C == ":") return k(O)
              if (C == "(") return z(ir)
            }
            function te(C, $, F) {
              function Z(qt, Yt) {
                if (F ? F.indexOf(qt) > -1 : qt == ",") {
                  var oe = V.state.lexical
                  return (
                    oe.info == "call" && (oe.pos = (oe.pos || 0) + 1),
                    k(function (Oe, Pn) {
                      return Oe == $ || Pn == $ ? z() : z(C)
                    }, Z)
                  )
                }
                return qt == $ || Yt == $
                  ? k()
                  : F && F.indexOf(";") > -1
                    ? z(C)
                    : k(nt($))
              }
              return function (qt, Yt) {
                return qt == $ || Yt == $ ? k() : z(C, Z)
              }
            }
            function bn(C, $, F) {
              for (var Z = 3; Z < arguments.length; Z++) V.cc.push(arguments[Z])
              return k(St($, F), te(C, $), j)
            }
            function Nn(C) {
              return C == "}" ? k() : z(rt, Nn)
            }
            function We(C, $) {
              if (v) {
                if (C == ":") return k(wt)
                if ($ == "?") return k(We)
              }
            }
            function co(C, $) {
              if (v && (C == ":" || $ == "in")) return k(wt)
            }
            function ye(C) {
              if (v && C == ":")
                return V.stream.match(/^\s*\w+\s+is\b/, !1)
                  ? k(Mt, on, wt)
                  : k(wt)
            }
            function on(C, $) {
              if ($ == "is") return (V.marked = "keyword"), k()
            }
            function wt(C, $) {
              if (
                $ == "keyof" ||
                $ == "typeof" ||
                $ == "infer" ||
                $ == "readonly"
              )
                return (V.marked = "keyword"), k($ == "typeof" ? O : wt)
              if (C == "variable" || $ == "void")
                return (V.marked = "type"), k(Qe)
              if ($ == "|" || $ == "&") return k(wt)
              if (C == "string" || C == "number" || C == "atom") return k(Qe)
              if (C == "[") return k(St("]"), te(wt, "]", ","), j, Qe)
              if (C == "{") return k(St("}"), Ve, j, Qe)
              if (C == "(") return k(te(Je, ")"), ds, Qe)
              if (C == "<") return k(te(wt, ">"), wt)
              if (C == "quasi") return z(Ce, Qe)
            }
            function ds(C) {
              if (C == "=>") return k(wt)
            }
            function Ve(C) {
              return C.match(/[\}\)\]]/)
                ? k()
                : C == "," || C == ";"
                  ? k(Ve)
                  : z(me, Ve)
            }
            function me(C, $) {
              if (C == "variable" || V.style == "keyword")
                return (V.marked = "property"), k(me)
              if ($ == "?" || C == "number" || C == "string") return k(me)
              if (C == ":") return k(wt)
              if (C == "[") return k(nt("variable"), co, nt("]"), me)
              if (C == "(") return z(or, me)
              if (!C.match(/[;\}\)\],]/)) return k()
            }
            function Ce(C, $) {
              return C != "quasi"
                ? z()
                : $.slice($.length - 2) != "${"
                  ? k(Ce)
                  : k(wt, $l)
            }
            function $l(C) {
              if (C == "}")
                return (V.marked = "string-2"), (V.state.tokenize = X), k(Ce)
            }
            function Je(C, $) {
              return (C == "variable" && V.stream.match(/^\s*[?:]/, !1)) ||
                $ == "?"
                ? k(Je)
                : C == ":"
                  ? k(wt)
                  : C == "spread"
                    ? k(Je)
                    : z(wt)
            }
            function Qe(C, $) {
              if ($ == "<") return k(St(">"), te(wt, ">"), j, Qe)
              if ($ == "|" || C == "." || $ == "&") return k(wt)
              if (C == "[") return k(wt, nt("]"), Qe)
              if ($ == "extends" || $ == "implements")
                return (V.marked = "keyword"), k(wt)
              if ($ == "?") return k(wt, nt(":"), wt)
            }
            function Ke(C, $) {
              if ($ == "<") return k(St(">"), te(wt, ">"), j, Qe)
            }
            function Ai() {
              return z(wt, ps)
            }
            function ps(C, $) {
              if ($ == "=") return k(wt)
            }
            function _r(C, $) {
              return $ == "enum"
                ? ((V.marked = "keyword"), k(ho))
                : z(sn, We, Fn, Wc)
            }
            function sn(C, $) {
              if (v && mt($)) return (V.marked = "keyword"), k(sn)
              if (C == "variable") return B($), k()
              if (C == "spread") return k(sn)
              if (C == "[") return bn(Bc, "]")
              if (C == "{") return bn(gs, "}")
            }
            function gs(C, $) {
              return C == "variable" && !V.stream.match(/^\s*:/, !1)
                ? (B($), k(Fn))
                : (C == "variable" && (V.marked = "property"),
                  C == "spread"
                    ? k(sn)
                    : C == "}"
                      ? z()
                      : C == "["
                        ? k(Mt, nt("]"), nt(":"), gs)
                        : k(nt(":"), sn, Fn))
            }
            function Bc() {
              return z(sn, Fn)
            }
            function Fn(C, $) {
              if ($ == "=") return k(O)
            }
            function Wc(C) {
              if (C == ",") return k(_r)
            }
            function uo(C, $) {
              if (C == "keyword b" && $ == "else")
                return k(St("form", "else"), rt, j)
            }
            function Rl(C, $) {
              if ($ == "await") return k(Rl)
              if (C == "(") return k(St(")"), vs, j)
            }
            function vs(C) {
              return C == "var" ? k(_r, Xr) : C == "variable" ? k(Xr) : z(Xr)
            }
            function Xr(C, $) {
              return C == ")"
                ? k()
                : C == ";"
                  ? k(Xr)
                  : $ == "in" || $ == "of"
                    ? ((V.marked = "keyword"), k(Mt, Xr))
                    : z(Mt, Xr)
            }
            function ir(C, $) {
              if ($ == "*") return (V.marked = "keyword"), k(ir)
              if (C == "variable") return B($), k(ir)
              if (C == "(") return k(Ut, St(")"), te(Un, ")"), j, ye, rt, Kt)
              if (v && $ == "<") return k(St(">"), te(Ai, ">"), j, ir)
            }
            function or(C, $) {
              if ($ == "*") return (V.marked = "keyword"), k(or)
              if (C == "variable") return B($), k(or)
              if (C == "(") return k(Ut, St(")"), te(Un, ")"), j, ye, Kt)
              if (v && $ == "<") return k(St(">"), te(Ai, ">"), j, or)
            }
            function zl(C, $) {
              if (C == "keyword" || C == "variable")
                return (V.marked = "type"), k(zl)
              if ($ == "<") return k(St(">"), te(Ai, ">"), j)
            }
            function Un(C, $) {
              return (
                $ == "@" && k(Mt, Un),
                C == "spread"
                  ? k(Un)
                  : v && mt($)
                    ? ((V.marked = "keyword"), k(Un))
                    : v && C == "this"
                      ? k(We, Fn)
                      : z(sn, We, Fn)
              )
            }
            function Yr(C, $) {
              return C == "variable" ? Fl(C, $) : fo(C, $)
            }
            function Fl(C, $) {
              if (C == "variable") return B($), k(fo)
            }
            function fo(C, $) {
              if ($ == "<") return k(St(">"), te(Ai, ">"), j, fo)
              if ($ == "extends" || $ == "implements" || (v && C == ","))
                return (
                  $ == "implements" && (V.marked = "keyword"),
                  k(v ? wt : Mt, fo)
                )
              if (C == "{") return k(St("}"), wn, j)
            }
            function wn(C, $) {
              if (
                C == "async" ||
                (C == "variable" &&
                  ($ == "static" || $ == "get" || $ == "set" || (v && mt($))) &&
                  V.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
              )
                return (V.marked = "keyword"), k(wn)
              if (C == "variable" || V.style == "keyword")
                return (V.marked = "property"), k(Sr, wn)
              if (C == "number" || C == "string") return k(Sr, wn)
              if (C == "[") return k(Mt, We, nt("]"), Sr, wn)
              if ($ == "*") return (V.marked = "keyword"), k(wn)
              if (v && C == "(") return z(or, wn)
              if (C == ";" || C == ",") return k(wn)
              if (C == "}") return k()
              if ($ == "@") return k(Mt, wn)
            }
            function Sr(C, $) {
              if ($ == "!" || $ == "?") return k(Sr)
              if (C == ":") return k(wt, Fn)
              if ($ == "=") return k(O)
              var F = V.state.lexical.prev,
                Z = F && F.info == "interface"
              return z(Z ? or : ir)
            }
            function Zr(C, $) {
              return $ == "*"
                ? ((V.marked = "keyword"), k(Lt, nt(";")))
                : $ == "default"
                  ? ((V.marked = "keyword"), k(Mt, nt(";")))
                  : C == "{"
                    ? k(te(Il, "}"), Lt, nt(";"))
                    : z(rt)
            }
            function Il(C, $) {
              if ($ == "as") return (V.marked = "keyword"), k(nt("variable"))
              if (C == "variable") return z(O, Il)
            }
            function kr(C) {
              return C == "string"
                ? k()
                : C == "("
                  ? z(Mt)
                  : C == "."
                    ? z(ot)
                    : z(Jr, ms, Lt)
            }
            function Jr(C, $) {
              return C == "{"
                ? bn(Jr, "}")
                : (C == "variable" && B($),
                  $ == "*" && (V.marked = "keyword"),
                  k(Te))
            }
            function ms(C) {
              if (C == ",") return k(Jr, ms)
            }
            function Te(C, $) {
              if ($ == "as") return (V.marked = "keyword"), k(Jr)
            }
            function Lt(C, $) {
              if ($ == "from") return (V.marked = "keyword"), k(Mt)
            }
            function Cr(C) {
              return C == "]" ? k() : z(te(O, "]"))
            }
            function ho() {
              return z(St("form"), sn, nt("{"), St("}"), te(In, "}"), j, j)
            }
            function In() {
              return z(sn, Fn)
            }
            function ae(C, $) {
              return (
                C.lastType == "operator" ||
                C.lastType == "," ||
                S.test($.charAt(0)) ||
                /[,.]/.test($.charAt(0))
              )
            }
            function sr(C, $, F) {
              return (
                ($.tokenize == R &&
                  /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(
                    $.lastType,
                  )) ||
                ($.lastType == "quasi" &&
                  /\{\s*$/.test(C.string.slice(0, C.pos - (F || 0))))
              )
            }
            return {
              startState: function (C) {
                var $ = {
                  tokenize: R,
                  lastType: "sof",
                  cc: [],
                  lexical: new st((C || 0) - u, 0, "block", !1),
                  localVars: a.localVars,
                  context: a.localVars && new Et(null, null, !1),
                  indented: C || 0,
                }
                return (
                  a.globalVars &&
                    typeof a.globalVars == "object" &&
                    ($.globalVars = a.globalVars),
                  $
                )
              },
              token: function (C, $) {
                if (
                  (C.sol() &&
                    ($.lexical.hasOwnProperty("align") ||
                      ($.lexical.align = !1),
                    ($.indented = C.indentation()),
                    Y(C, $)),
                  $.tokenize != W && C.eatSpace())
                )
                  return null
                var F = $.tokenize(C, $)
                return A == "comment"
                  ? F
                  : (($.lastType =
                      A == "operator" && (T == "++" || T == "--")
                        ? "incdec"
                        : A),
                    pt($, F, A, T, C))
              },
              indent: function (C, $) {
                if (C.tokenize == W || C.tokenize == X) return r.Pass
                if (C.tokenize != R) return 0
                var F = $ && $.charAt(0),
                  Z = C.lexical,
                  qt
                if (!/^\s*else\b/.test($))
                  for (var Yt = C.cc.length - 1; Yt >= 0; --Yt) {
                    var oe = C.cc[Yt]
                    if (oe == j) Z = Z.prev
                    else if (oe != uo && oe != Kt) break
                  }
                for (
                  ;
                  (Z.type == "stat" || Z.type == "form") &&
                  (F == "}" ||
                    ((qt = C.cc[C.cc.length - 1]) &&
                      (qt == ot || qt == at) &&
                      !/^[,\.=+\-*:?[\(]/.test($)));

                )
                  Z = Z.prev
                f && Z.type == ")" && Z.prev.type == "stat" && (Z = Z.prev)
                var Oe = Z.type,
                  Pn = F == Oe
                return Oe == "vardef"
                  ? Z.indented +
                      (C.lastType == "operator" || C.lastType == ","
                        ? Z.info.length + 1
                        : 0)
                  : Oe == "form" && F == "{"
                    ? Z.indented
                    : Oe == "form"
                      ? Z.indented + u
                      : Oe == "stat"
                        ? Z.indented + (ae(C, $) ? f || u : 0)
                        : Z.info == "switch" &&
                            !Pn &&
                            a.doubleIndentSwitch != !1
                          ? Z.indented +
                            (/^(?:case|default)\b/.test($) ? u : 2 * u)
                          : Z.align
                            ? Z.column + (Pn ? 0 : 1)
                            : Z.indented + (Pn ? 0 : u)
              },
              electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
              blockCommentStart: p ? null : "/*",
              blockCommentEnd: p ? null : "*/",
              blockCommentContinue: p ? null : " * ",
              lineComment: p ? null : "//",
              fold: "brace",
              closeBrackets: "()[]{}''\"\"``",
              helperType: p ? "json" : "javascript",
              jsonldMode: h,
              jsonMode: p,
              expressionAllowed: sr,
              skipExpression: function (C) {
                pt(C, "atom", "atom", "true", new r.StringStream("", 2, null))
              },
            }
          }),
            r.registerHelper("wordChars", "javascript", /[\w$]/),
            r.defineMIME("text/javascript", "javascript"),
            r.defineMIME("text/ecmascript", "javascript"),
            r.defineMIME("application/javascript", "javascript"),
            r.defineMIME("application/x-javascript", "javascript"),
            r.defineMIME("application/ecmascript", "javascript"),
            r.defineMIME("application/json", { name: "javascript", json: !0 }),
            r.defineMIME("application/x-json", {
              name: "javascript",
              json: !0,
            }),
            r.defineMIME("application/manifest+json", {
              name: "javascript",
              json: !0,
            }),
            r.defineMIME("application/ld+json", {
              name: "javascript",
              jsonld: !0,
            }),
            r.defineMIME("text/typescript", {
              name: "javascript",
              typescript: !0,
            }),
            r.defineMIME("application/typescript", {
              name: "javascript",
              typescript: !0,
            })
        })
      })()),
    Ov.exports
  )
}
Ry()
var $v = { exports: {} },
  Rv
function zy() {
  return (
    Rv ||
      ((Rv = 1),
      (function (t, e) {
        ;(function (r) {
          r(fs())
        })(function (r) {
          var o = {
              autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0,
                menuitem: !0,
              },
              implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0,
              },
              contextGrabbers: {
                dd: { dd: !0, dt: !0 },
                dt: { dd: !0, dt: !0 },
                li: { li: !0 },
                option: { option: !0, optgroup: !0 },
                optgroup: { optgroup: !0 },
                p: {
                  address: !0,
                  article: !0,
                  aside: !0,
                  blockquote: !0,
                  dir: !0,
                  div: !0,
                  dl: !0,
                  fieldset: !0,
                  footer: !0,
                  form: !0,
                  h1: !0,
                  h2: !0,
                  h3: !0,
                  h4: !0,
                  h5: !0,
                  h6: !0,
                  header: !0,
                  hgroup: !0,
                  hr: !0,
                  menu: !0,
                  nav: !0,
                  ol: !0,
                  p: !0,
                  pre: !0,
                  section: !0,
                  table: !0,
                  ul: !0,
                },
                rp: { rp: !0, rt: !0 },
                rt: { rp: !0, rt: !0 },
                tbody: { tbody: !0, tfoot: !0 },
                td: { td: !0, th: !0 },
                tfoot: { tbody: !0 },
                th: { td: !0, th: !0 },
                thead: { tbody: !0, tfoot: !0 },
                tr: { tr: !0 },
              },
              doNotIndent: { pre: !0 },
              allowUnquoted: !0,
              allowMissing: !0,
              caseFold: !0,
            },
            a = {
              autoSelfClosers: {},
              implicitlyClosed: {},
              contextGrabbers: {},
              doNotIndent: {},
              allowUnquoted: !1,
              allowMissing: !1,
              allowMissingTagName: !1,
              caseFold: !1,
            }
          r.defineMode("xml", function (u, f) {
            var h = u.indentUnit,
              p = {},
              g = f.htmlMode ? o : a
            for (var v in g) p[v] = g[v]
            for (var v in f) p[v] = f[v]
            var b, w
            function S(k, q) {
              function B(Et) {
                return (q.tokenize = Et), Et(k, q)
              }
              var Q = k.next()
              if (Q == "<")
                return k.eat("!")
                  ? k.eat("[")
                    ? k.match("CDATA[")
                      ? B(A("atom", "]]>"))
                      : null
                    : k.match("--")
                      ? B(A("comment", "-->"))
                      : k.match("DOCTYPE", !0, !0)
                        ? (k.eatWhile(/[\w\._\-]/), B(T(1)))
                        : null
                  : k.eat("?")
                    ? (k.eatWhile(/[\w\._\-]/),
                      (q.tokenize = A("meta", "?>")),
                      "meta")
                    : ((b = k.eat("/") ? "closeTag" : "openTag"),
                      (q.tokenize = N),
                      "tag bracket")
              if (Q == "&") {
                var mt
                return (
                  k.eat("#")
                    ? k.eat("x")
                      ? (mt = k.eatWhile(/[a-fA-F\d]/) && k.eat(";"))
                      : (mt = k.eatWhile(/[\d]/) && k.eat(";"))
                    : (mt = k.eatWhile(/[\w\.\-:]/) && k.eat(";")),
                  mt ? "atom" : "error"
                )
              } else return k.eatWhile(/[^&<]/), null
            }
            S.isInText = !0
            function N(k, q) {
              var B = k.next()
              if (B == ">" || (B == "/" && k.eat(">")))
                return (
                  (q.tokenize = S),
                  (b = B == ">" ? "endTag" : "selfcloseTag"),
                  "tag bracket"
                )
              if (B == "=") return (b = "equals"), null
              if (B == "<") {
                ;(q.tokenize = S),
                  (q.state = X),
                  (q.tagName = q.tagStart = null)
                var Q = q.tokenize(k, q)
                return Q ? Q + " tag error" : "tag error"
              } else
                return /[\'\"]/.test(B)
                  ? ((q.tokenize = L(B)),
                    (q.stringStartCol = k.column()),
                    q.tokenize(k, q))
                  : (k.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
                    "word")
            }
            function L(k) {
              var q = function (B, Q) {
                for (; !B.eol(); )
                  if (B.next() == k) {
                    Q.tokenize = N
                    break
                  }
                return "string"
              }
              return (q.isInAttribute = !0), q
            }
            function A(k, q) {
              return function (B, Q) {
                for (; !B.eol(); ) {
                  if (B.match(q)) {
                    Q.tokenize = S
                    break
                  }
                  B.next()
                }
                return k
              }
            }
            function T(k) {
              return function (q, B) {
                for (var Q; (Q = q.next()) != null; ) {
                  if (Q == "<") return (B.tokenize = T(k + 1)), B.tokenize(q, B)
                  if (Q == ">")
                    if (k == 1) {
                      B.tokenize = S
                      break
                    } else return (B.tokenize = T(k - 1)), B.tokenize(q, B)
                }
                return "meta"
              }
            }
            function M(k) {
              return k && k.toLowerCase()
            }
            function R(k, q, B) {
              ;(this.prev = k.context),
                (this.tagName = q || ""),
                (this.indent = k.indented),
                (this.startOfLine = B),
                (p.doNotIndent.hasOwnProperty(q) ||
                  (k.context && k.context.noIndent)) &&
                  (this.noIndent = !0)
            }
            function E(k) {
              k.context && (k.context = k.context.prev)
            }
            function W(k, q) {
              for (var B; ; ) {
                if (
                  !k.context ||
                  ((B = k.context.tagName),
                  !p.contextGrabbers.hasOwnProperty(M(B)) ||
                    !p.contextGrabbers[M(B)].hasOwnProperty(M(q)))
                )
                  return
                E(k)
              }
            }
            function X(k, q, B) {
              return k == "openTag"
                ? ((B.tagStart = q.column()), ft)
                : k == "closeTag"
                  ? Y
                  : X
            }
            function ft(k, q, B) {
              return k == "word"
                ? ((B.tagName = q.current()), (w = "tag"), dt)
                : p.allowMissingTagName && k == "endTag"
                  ? ((w = "tag bracket"), dt(k, q, B))
                  : ((w = "error"), ft)
            }
            function Y(k, q, B) {
              if (k == "word") {
                var Q = q.current()
                return (
                  B.context &&
                    B.context.tagName != Q &&
                    p.implicitlyClosed.hasOwnProperty(M(B.context.tagName)) &&
                    E(B),
                  (B.context && B.context.tagName == Q) || p.matchClosing === !1
                    ? ((w = "tag"), et)
                    : ((w = "tag error"), st)
                )
              } else
                return p.allowMissingTagName && k == "endTag"
                  ? ((w = "tag bracket"), et(k, q, B))
                  : ((w = "error"), st)
            }
            function et(k, q, B) {
              return k != "endTag" ? ((w = "error"), et) : (E(B), X)
            }
            function st(k, q, B) {
              return (w = "error"), et(k, q, B)
            }
            function dt(k, q, B) {
              if (k == "word") return (w = "attribute"), pt
              if (k == "endTag" || k == "selfcloseTag") {
                var Q = B.tagName,
                  mt = B.tagStart
                return (
                  (B.tagName = B.tagStart = null),
                  k == "selfcloseTag" || p.autoSelfClosers.hasOwnProperty(M(Q))
                    ? W(B, Q)
                    : (W(B, Q), (B.context = new R(B, Q, mt == B.indented))),
                  X
                )
              }
              return (w = "error"), dt
            }
            function pt(k, q, B) {
              return k == "equals"
                ? V
                : (p.allowMissing || (w = "error"), dt(k, q, B))
            }
            function V(k, q, B) {
              return k == "string"
                ? z
                : k == "word" && p.allowUnquoted
                  ? ((w = "string"), dt)
                  : ((w = "error"), dt(k, q, B))
            }
            function z(k, q, B) {
              return k == "string" ? z : dt(k, q, B)
            }
            return {
              startState: function (k) {
                var q = {
                  tokenize: S,
                  state: X,
                  indented: k || 0,
                  tagName: null,
                  tagStart: null,
                  context: null,
                }
                return k != null && (q.baseIndent = k), q
              },
              token: function (k, q) {
                if (
                  (!q.tagName && k.sol() && (q.indented = k.indentation()),
                  k.eatSpace())
                )
                  return null
                b = null
                var B = q.tokenize(k, q)
                return (
                  (B || b) &&
                    B != "comment" &&
                    ((w = null),
                    (q.state = q.state(b || B, k, q)),
                    w && (B = w == "error" ? B + " error" : w)),
                  B
                )
              },
              indent: function (k, q, B) {
                var Q = k.context
                if (k.tokenize.isInAttribute)
                  return k.tagStart == k.indented
                    ? k.stringStartCol + 1
                    : k.indented + h
                if (Q && Q.noIndent) return r.Pass
                if (k.tokenize != N && k.tokenize != S)
                  return B ? B.match(/^(\s*)/)[0].length : 0
                if (k.tagName)
                  return p.multilineTagIndentPastTag !== !1
                    ? k.tagStart + k.tagName.length + 2
                    : k.tagStart + h * (p.multilineTagIndentFactor || 1)
                if (p.alignCDATA && /<!\[CDATA\[/.test(q)) return 0
                var mt = q && /^<(\/)?([\w_:\.-]*)/.exec(q)
                if (mt && mt[1])
                  for (; Q; )
                    if (Q.tagName == mt[2]) {
                      Q = Q.prev
                      break
                    } else if (p.implicitlyClosed.hasOwnProperty(M(Q.tagName)))
                      Q = Q.prev
                    else break
                else if (mt)
                  for (; Q; ) {
                    var Et = p.contextGrabbers[M(Q.tagName)]
                    if (Et && Et.hasOwnProperty(M(mt[2]))) Q = Q.prev
                    else break
                  }
                for (; Q && Q.prev && !Q.startOfLine; ) Q = Q.prev
                return Q ? Q.indent + h : k.baseIndent || 0
              },
              electricInput: /<\/[\s\w:]+>$/,
              blockCommentStart: "<!--",
              blockCommentEnd: "-->",
              configuration: p.htmlMode ? "html" : "xml",
              helperType: p.htmlMode ? "html" : "xml",
              skipAttribute: function (k) {
                k.state == V && (k.state = dt)
              },
              xmlCurrentTag: function (k) {
                return k.tagName
                  ? { name: k.tagName, close: k.type == "closeTag" }
                  : null
              },
              xmlCurrentContext: function (k) {
                for (var q = [], B = k.context; B; B = B.prev) q.push(B.tagName)
                return q.reverse()
              },
            }
          }),
            r.defineMIME("text/xml", "xml"),
            r.defineMIME("application/xml", "xml"),
            r.mimeModes.hasOwnProperty("text/html") ||
              r.defineMIME("text/html", { name: "xml", htmlMode: !0 })
        })
      })()),
    $v.exports
  )
}
zy()
;(function (t, e) {
  ;(function (r) {
    r(fs(), zy(), Ry())
  })(function (r) {
    function o(u, f, h, p) {
      ;(this.state = u), (this.mode = f), (this.depth = h), (this.prev = p)
    }
    function a(u) {
      return new o(
        r.copyState(u.mode, u.state),
        u.mode,
        u.depth,
        u.prev && a(u.prev),
      )
    }
    r.defineMode(
      "jsx",
      function (u, f) {
        var h = r.getMode(u, {
            name: "xml",
            allowMissing: !0,
            multilineTagIndentPastTag: !1,
            allowMissingTagName: !0,
          }),
          p = r.getMode(u, (f && f.base) || "javascript")
        function g(S) {
          var N = S.tagName
          S.tagName = null
          var L = h.indent(S, "", "")
          return (S.tagName = N), L
        }
        function v(S, N) {
          return N.context.mode == h ? b(S, N, N.context) : w(S, N, N.context)
        }
        function b(S, N, L) {
          if (L.depth == 2)
            return (
              S.match(/^.*?\*\//) ? (L.depth = 1) : S.skipToEnd(), "comment"
            )
          if (S.peek() == "{") {
            h.skipAttribute(L.state)
            var A = g(L.state),
              T = L.state.context
            if (T && S.match(/^[^>]*>\s*$/, !1)) {
              for (; T.prev && !T.startOfLine; ) T = T.prev
              T.startOfLine
                ? (A -= u.indentUnit)
                : L.prev.state.lexical && (A = L.prev.state.lexical.indented)
            } else L.depth == 1 && (A += u.indentUnit)
            return (
              (N.context = new o(r.startState(p, A), p, 0, N.context)), null
            )
          }
          if (L.depth == 1) {
            if (S.peek() == "<")
              return (
                h.skipAttribute(L.state),
                (N.context = new o(
                  r.startState(h, g(L.state)),
                  h,
                  0,
                  N.context,
                )),
                null
              )
            if (S.match("//")) return S.skipToEnd(), "comment"
            if (S.match("/*")) return (L.depth = 2), v(S, N)
          }
          var M = h.token(S, L.state),
            R = S.current(),
            E
          return (
            /\btag\b/.test(M)
              ? />$/.test(R)
                ? L.state.context
                  ? (L.depth = 0)
                  : (N.context = N.context.prev)
                : /^</.test(R) && (L.depth = 1)
              : !M && (E = R.indexOf("{")) > -1 && S.backUp(R.length - E),
            M
          )
        }
        function w(S, N, L) {
          if (S.peek() == "<" && p.expressionAllowed(S, L.state))
            return (
              (N.context = new o(
                r.startState(h, p.indent(L.state, "", "")),
                h,
                0,
                N.context,
              )),
              p.skipExpression(L.state),
              null
            )
          var A = p.token(S, L.state)
          if (!A && L.depth != null) {
            var T = S.current()
            T == "{"
              ? L.depth++
              : T == "}" && --L.depth == 0 && (N.context = N.context.prev)
          }
          return A
        }
        return {
          startState: function () {
            return { context: new o(r.startState(p), p) }
          },
          copyState: function (S) {
            return { context: a(S.context) }
          },
          token: v,
          indent: function (S, N, L) {
            return S.context.mode.indent(S.context.state, N, L)
          },
          innerMode: function (S) {
            return S.context
          },
        }
      },
      "xml",
      "javascript",
    ),
      r.defineMIME("text/jsx", "jsx"),
      r.defineMIME("text/typescript-jsx", {
        name: "jsx",
        base: { name: "javascript", typescript: !0 },
      })
  })
})()
;(function (t, e) {
  ;(function (r) {
    r(fs())
  })(function (r) {
    r.defineOption("placeholder", "", function (g, v, b) {
      var w = b && b != r.Init
      if (v && !w)
        g.on("blur", f),
          g.on("change", h),
          g.on("swapDoc", h),
          r.on(
            g.getInputField(),
            "compositionupdate",
            (g.state.placeholderCompose = function () {
              u(g)
            }),
          ),
          h(g)
      else if (!v && w) {
        g.off("blur", f),
          g.off("change", h),
          g.off("swapDoc", h),
          r.off(
            g.getInputField(),
            "compositionupdate",
            g.state.placeholderCompose,
          ),
          o(g)
        var S = g.getWrapperElement()
        S.className = S.className.replace(" CodeMirror-empty", "")
      }
      v && !g.hasFocus() && f(g)
    })
    function o(g) {
      g.state.placeholder &&
        (g.state.placeholder.parentNode.removeChild(g.state.placeholder),
        (g.state.placeholder = null))
    }
    function a(g) {
      o(g)
      var v = (g.state.placeholder = document.createElement("pre"))
      ;(v.style.cssText = "height: 0; overflow: visible"),
        (v.style.direction = g.getOption("direction")),
        (v.className = "CodeMirror-placeholder CodeMirror-line-like")
      var b = g.getOption("placeholder")
      typeof b == "string" && (b = document.createTextNode(b)),
        v.appendChild(b),
        g.display.lineSpace.insertBefore(v, g.display.lineSpace.firstChild)
    }
    function u(g) {
      setTimeout(function () {
        var v = !1
        if (g.lineCount() == 1) {
          var b = g.getInputField()
          v =
            b.nodeName == "TEXTAREA"
              ? !g.getLine(0).length
              : !/[^\u200b]/.test(
                  b.querySelector(".CodeMirror-line").textContent,
                )
        }
        v ? a(g) : o(g)
      }, 20)
    }
    function f(g) {
      p(g) && a(g)
    }
    function h(g) {
      var v = g.getWrapperElement(),
        b = p(g)
      ;(v.className =
        v.className.replace(" CodeMirror-empty", "") +
        (b ? " CodeMirror-empty" : "")),
        b ? a(g) : o(g)
    }
    function p(g) {
      return g.lineCount() === 1 && g.getLine(0) === ""
    }
  })
})()
;(function (t, e) {
  ;(function (r) {
    r(fs())
  })(function (r) {
    function o(f, h, p) {
      ;(this.orientation = h),
        (this.scroll = p),
        (this.screen = this.total = this.size = 1),
        (this.pos = 0),
        (this.node = document.createElement("div")),
        (this.node.className = f + "-" + h),
        (this.inner = this.node.appendChild(document.createElement("div")))
      var g = this
      r.on(this.inner, "mousedown", function (b) {
        if (b.which != 1) return
        r.e_preventDefault(b)
        var w = g.orientation == "horizontal" ? "pageX" : "pageY",
          S = b[w],
          N = g.pos
        function L() {
          r.off(document, "mousemove", A), r.off(document, "mouseup", L)
        }
        function A(T) {
          if (T.which != 1) return L()
          g.moveTo(N + (T[w] - S) * (g.total / g.size))
        }
        r.on(document, "mousemove", A), r.on(document, "mouseup", L)
      }),
        r.on(this.node, "click", function (b) {
          r.e_preventDefault(b)
          var w = g.inner.getBoundingClientRect(),
            S
          g.orientation == "horizontal"
            ? (S = b.clientX < w.left ? -1 : b.clientX > w.right ? 1 : 0)
            : (S = b.clientY < w.top ? -1 : b.clientY > w.bottom ? 1 : 0),
            g.moveTo(g.pos + S * g.screen)
        })
      function v(b) {
        var w =
            r.wheelEventPixels(b)[g.orientation == "horizontal" ? "x" : "y"],
          S = g.pos
        g.moveTo(g.pos + w), g.pos != S && r.e_preventDefault(b)
      }
      r.on(this.node, "mousewheel", v), r.on(this.node, "DOMMouseScroll", v)
    }
    ;(o.prototype.setPos = function (f, h) {
      return (
        f < 0 && (f = 0),
        f > this.total - this.screen && (f = this.total - this.screen),
        !h && f == this.pos
          ? !1
          : ((this.pos = f),
            (this.inner.style[
              this.orientation == "horizontal" ? "left" : "top"
            ] = f * (this.size / this.total) + "px"),
            !0)
      )
    }),
      (o.prototype.moveTo = function (f) {
        this.setPos(f) && this.scroll(f, this.orientation)
      })
    var a = 10
    o.prototype.update = function (f, h, p) {
      var g = this.screen != h || this.total != f || this.size != p
      g && ((this.screen = h), (this.total = f), (this.size = p))
      var v = this.screen * (this.size / this.total)
      v < a && ((this.size -= a - v), (v = a)),
        (this.inner.style[
          this.orientation == "horizontal" ? "width" : "height"
        ] = v + "px"),
        this.setPos(this.pos, g)
    }
    function u(f, h, p) {
      ;(this.addClass = f),
        (this.horiz = new o(f, "horizontal", p)),
        h(this.horiz.node),
        (this.vert = new o(f, "vertical", p)),
        h(this.vert.node),
        (this.width = null)
    }
    ;(u.prototype.update = function (f) {
      if (this.width == null) {
        var h = window.getComputedStyle
          ? window.getComputedStyle(this.horiz.node)
          : this.horiz.node.currentStyle
        h && (this.width = parseInt(h.height))
      }
      var p = this.width || 0,
        g = f.scrollWidth > f.clientWidth + 1,
        v = f.scrollHeight > f.clientHeight + 1
      return (
        (this.vert.node.style.display = v ? "block" : "none"),
        (this.horiz.node.style.display = g ? "block" : "none"),
        v &&
          (this.vert.update(
            f.scrollHeight,
            f.clientHeight,
            f.viewHeight - (g ? p : 0),
          ),
          (this.vert.node.style.bottom = g ? p + "px" : "0")),
        g &&
          (this.horiz.update(
            f.scrollWidth,
            f.clientWidth,
            f.viewWidth - (v ? p : 0) - f.barLeft,
          ),
          (this.horiz.node.style.right = v ? p + "px" : "0"),
          (this.horiz.node.style.left = f.barLeft + "px")),
        { right: v ? p : 0, bottom: g ? p : 0 }
      )
    }),
      (u.prototype.setScrollTop = function (f) {
        this.vert.setPos(f)
      }),
      (u.prototype.setScrollLeft = function (f) {
        this.horiz.setPos(f)
      }),
      (u.prototype.clear = function () {
        var f = this.horiz.node.parentNode
        f.removeChild(this.horiz.node), f.removeChild(this.vert.node)
      }),
      (r.scrollbarModel.simple = function (f, h) {
        return new u("CodeMirror-simplescroll", f, h)
      }),
      (r.scrollbarModel.overlay = function (f, h) {
        return new u("CodeMirror-overlayscroll", f, h)
      })
  })
})()
function wlt(t, e, r = {}) {
  const o = blt.fromTextArea(t.value, {
    theme: "vars",
    ...r,
    scrollbarStyle: "simple",
  })
  let a = !1
  return (
    o.on("change", () => {
      if (a) {
        a = !1
        return
      }
      e.value = o.getValue()
    }),
    $e(
      e,
      (u) => {
        if (u !== o.getValue()) {
          a = !0
          const f = o.listSelections()
          o.replaceRange(
            u,
            o.posFromIndex(0),
            o.posFromIndex(Number.POSITIVE_INFINITY),
          ),
            o.setSelections(f)
        }
      },
      { immediate: !0 },
    ),
    ah(o)
  )
}
const xlt = {
    "relative": "",
    "font-mono": "",
    "text-sm": "",
    "class": "codemirror-scrolls",
  },
  Fy = re({
    __name: "CodeMirror",
    props: mf({ mode: {}, readOnly: { type: Boolean } }, { modelValue: {} }),
    emits: mf(["save"], ["update:modelValue"]),
    setup(t, { expose: e, emit: r }) {
      const o = r,
        a = Vm(t, "modelValue"),
        u = Q1(),
        f = {
          js: "javascript",
          mjs: "javascript",
          cjs: "javascript",
          ts: { name: "javascript", typescript: !0 },
          mts: { name: "javascript", typescript: !0 },
          cts: { name: "javascript", typescript: !0 },
          jsx: { name: "javascript", jsx: !0 },
          tsx: { name: "javascript", typescript: !0, jsx: !0 },
        },
        h = Vt(),
        p = cs()
      return (
        e({ cm: p }),
        us(async () => {
          ;(p.value = wlt(h, a, {
            ...u,
            mode: f[t.mode || ""] || t.mode,
            readOnly: t.readOnly ? !0 : void 0,
            extraKeys: {
              "Cmd-S": function (g) {
                o("save", g.getValue())
              },
              "Ctrl-S": function (g) {
                o("save", g.getValue())
              },
            },
          })),
            p.value.setSize("100%", "100%"),
            p.value.clearHistory(),
            setTimeout(() => p.value.refresh(), 100)
        }),
        (g, v) => (
          lt(),
          Tt("div", xlt, [ut("textarea", { ref_key: "el", ref: h }, null, 512)])
        )
      )
    },
  }),
  _lt = re({
    __name: "ViewEditor",
    props: { file: {} },
    emits: ["draft"],
    setup(t, { emit: e }) {
      const r = t,
        o = e,
        a = Vt(""),
        u = cs(void 0),
        f = Vt(!1)
      $e(
        () => r.file,
        async () => {
          var R
          if (!r.file || !((R = r.file) != null && R.filepath)) {
            ;(a.value = ""), (u.value = a.value), (f.value = !1)
            return
          }
          ;(a.value = (await Ge.rpc.readTestFile(r.file.filepath)) || ""),
            (u.value = a.value),
            (f.value = !1)
        },
        { immediate: !0 },
      )
      const h = xt(() => {
          var R, E
          return (
            ((E = (R = r.file) == null ? void 0 : R.filepath) == null
              ? void 0
              : E.split(/\./g).pop()) || "js"
          )
        }),
        p = Vt(),
        g = xt(() => {
          var R
          return (R = p.value) == null ? void 0 : R.cm
        }),
        v = xt(() => {
          var R
          return (
            ((R = r.file) == null
              ? void 0
              : R.tasks.filter((E) => {
                  var W
                  return ((W = E.result) == null ? void 0 : W.state) === "fail"
                })) || []
          )
        }),
        b = [],
        w = [],
        S = [],
        N = Vt(!1)
      function L() {
        S.forEach(([R, E, W]) => {
          R.removeEventListener("click", E), W()
        }),
          (S.length = 0)
      }
      mT(p, () => {
        var R
        ;(R = g.value) == null || R.refresh()
      })
      function A() {
        f.value = u.value !== g.value.getValue()
      }
      $e(
        f,
        (R) => {
          o("draft", R)
        },
        { immediate: !0 },
      )
      function T(R) {
        const E = ((R == null ? void 0 : R.stacks) || []).filter((st) => {
            var dt
            return (
              st.file &&
              st.file === ((dt = r.file) == null ? void 0 : dt.filepath)
            )
          }),
          W = E == null ? void 0 : E[0]
        if (!W) return
        const X = document.createElement("div")
        X.className = "op80 flex gap-x-2 items-center"
        const ft = document.createElement("pre")
        ;(ft.className = "c-red-600 dark:c-red-400"),
          (ft.textContent = `${" ".repeat(W.column)}^ ${(R == null ? void 0 : R.nameStr) || R.name}: ${(R == null ? void 0 : R.message) || ""}`),
          X.appendChild(ft)
        const Y = document.createElement("span")
        ;(Y.className =
          "i-carbon-launch c-red-600 dark:c-red-400 hover:cursor-pointer min-w-1em min-h-1em"),
          (Y.tabIndex = 0),
          (Y.ariaLabel = "Open in Editor"),
          z0(Y, { content: "Open in Editor", placement: "bottom" }, !1)
        const et = async () => {
          await Ny(W.file, W.line, W.column)
        }
        X.appendChild(Y),
          S.push([Y, et, () => Ph(Y)]),
          w.push(g.value.addLineClass(W.line - 1, "wrap", "bg-red-500/10")),
          b.push(g.value.addLineWidget(W.line - 1, X))
      }
      $e(
        [g, v],
        ([R]) => {
          if (!R) {
            L()
            return
          }
          setTimeout(() => {
            L(),
              b.forEach((E) => E.clear()),
              w.forEach((E) => {
                var W
                return (W = g.value) == null
                  ? void 0
                  : W.removeLineClass(E, "wrap")
              }),
              (b.length = 0),
              (w.length = 0),
              R.on("changes", A),
              v.value.forEach((E) => {
                var W, X
                ;(X = (W = E.result) == null ? void 0 : W.errors) == null ||
                  X.forEach(T)
              }),
              N.value || R.clearHistory()
          }, 100)
        },
        { flush: "post" },
      )
      async function M(R) {
        ;(N.value = !0),
          await Ge.rpc.saveTestFile(r.file.filepath, R),
          (u.value = R),
          (f.value = !1)
      }
      return (R, E) => {
        const W = Fy
        return (
          lt(),
          Jt(
            W,
            Si(
              {
                "ref_key": "editor",
                "ref": p,
                "modelValue": G(a),
                "onUpdate:modelValue":
                  E[0] || (E[0] = (X) => (Le(a) ? (a.value = X) : null)),
                "h-full": "",
              },
              { lineNumbers: !0 },
              { "mode": G(h), "data-testid": "code-mirror", "onSave": M },
            ),
            null,
            16,
            ["modelValue", "mode"],
          )
        )
      }
    },
  }),
  Slt = re({
    __name: "Modal",
    props: mf(
      { direction: { default: "bottom" } },
      { modelValue: { type: Boolean, default: !1 } },
    ),
    emits: ["update:modelValue"],
    setup(t) {
      const e = Vm(t, "modelValue"),
        r = xt(() => {
          switch (t.direction) {
            case "bottom":
              return "bottom-0 left-0 right-0 border-t"
            case "top":
              return "top-0 left-0 right-0 border-b"
            case "left":
              return "bottom-0 left-0 top-0 border-r"
            case "right":
              return "bottom-0 top-0 right-0 border-l"
            default:
              return ""
          }
        }),
        o = xt(() => {
          switch (t.direction) {
            case "bottom":
              return "translateY(100%)"
            case "top":
              return "translateY(-100%)"
            case "left":
              return "translateX(-100%)"
            case "right":
              return "translateX(100%)"
            default:
              return ""
          }
        }),
        a = () => (e.value = !1)
      return (u, f) => (
        lt(),
        Tt(
          "div",
          {
            class: ve([
              "fixed inset-0 z-40",
              e.value ? "" : "pointer-events-none",
            ]),
          },
          [
            ut(
              "div",
              {
                class: ve([
                  "bg-base inset-0 absolute transition-opacity duration-500 ease-out",
                  e.value ? "opacity-50" : "opacity-0",
                ]),
                onClick: a,
              },
              null,
              2,
            ),
            ut(
              "div",
              {
                class: ve([
                  "bg-base border-base absolute transition-all duration-200 ease-out scrolls",
                  [G(r)],
                ]),
                style: Ln(e.value ? {} : { transform: G(o) }),
              },
              [er(u.$slots, "default")],
              6,
            ),
          ],
          2,
        )
      )
    },
  }),
  klt = ["aria-label", "opacity", "disabled", "hover"],
  hs = re({
    __name: "IconButton",
    props: { icon: {}, title: {}, disabled: { type: Boolean } },
    setup(t) {
      return (e, r) => (
        lt(),
        Tt(
          "button",
          {
            "aria-label": e.title,
            "role": "button",
            "opacity": e.disabled ? 10 : 70,
            "rounded": "",
            "disabled": e.disabled,
            "hover": e.disabled ? "" : "bg-active op100",
            "class": "w-1.4em h-1.4em flex",
          },
          [
            er(e.$slots, "default", {}, () => [
              ut("div", { class: ve(e.icon), ma: "" }, null, 2),
            ]),
          ],
          8,
          klt,
        )
      )
    },
  }),
  Clt = {
    "w-350": "",
    "max-w-screen": "",
    "h-full": "",
    "flex": "",
    "flex-col": "",
  },
  Tlt = { "p-4": "", "relative": "" },
  Elt = ut("p", null, "Module Info", -1),
  Llt = { "op50": "", "font-mono": "", "text-sm": "" },
  Alt = { "key": 0, "p-5": "" },
  Mlt = {
    "grid": "~ cols-2 rows-[min-content_auto]",
    "overflow-hidden": "",
    "flex-auto": "",
  },
  Nlt = ut(
    "div",
    { "p": "x3 y-1", "bg-overlay": "", "border": "base b t r" },
    " Source ",
    -1,
  ),
  Plt = ut(
    "div",
    { "p": "x3 y-1", "bg-overlay": "", "border": "base b t" },
    " Transformed ",
    -1,
  ),
  Olt = { key: 0 },
  Dlt = { "p": "x3 y-1", "bg-overlay": "", "border": "base b t" },
  $lt = re({
    __name: "ModuleTransformResultView",
    props: { id: {} },
    emits: ["close"],
    setup(t, { emit: e }) {
      const r = t,
        o = e,
        a = oT(() => Ge.rpc.getTransformResult(r.id)),
        u = xt(() => {
          var g
          return ((g = r.id) == null ? void 0 : g.split(/\./g).pop()) || "js"
        }),
        f = xt(() => {
          var g, v
          return (
            ((v = (g = a.value) == null ? void 0 : g.source) == null
              ? void 0
              : v.trim()) || ""
          )
        }),
        h = xt(() => {
          var g, v
          return (
            ((v = (g = a.value) == null ? void 0 : g.code) == null
              ? void 0
              : v.replace(/\/\/# sourceMappingURL=.*\n/, "").trim()) || ""
          )
        }),
        p = xt(() => {
          var g, v, b, w
          return {
            mappings:
              ((v = (g = a.value) == null ? void 0 : g.map) == null
                ? void 0
                : v.mappings) ?? "",
            version:
              (w = (b = a.value) == null ? void 0 : b.map) == null
                ? void 0
                : w.version,
          }
        })
      return (
        lT("Escape", () => {
          o("close")
        }),
        (g, v) => {
          const b = hs,
            w = Fy
          return (
            lt(),
            Tt("div", Clt, [
              ut("div", Tlt, [
                Elt,
                ut("p", Llt, ee(g.id), 1),
                Ft(b, {
                  "icon": "i-carbon-close",
                  "absolute": "",
                  "top-5px": "",
                  "right-5px": "",
                  "text-2xl": "",
                  "onClick": v[0] || (v[0] = (S) => o("close")),
                }),
              ]),
              G(a)
                ? (lt(),
                  Tt(
                    fe,
                    { key: 1 },
                    [
                      ut("div", Mlt, [
                        Nlt,
                        Plt,
                        Ft(
                          w,
                          Si(
                            {
                              "h-full": "",
                              "model-value": G(f),
                              "read-only": "",
                            },
                            { lineNumbers: !0 },
                            { mode: G(u) },
                          ),
                          null,
                          16,
                          ["model-value", "mode"],
                        ),
                        Ft(
                          w,
                          Si(
                            {
                              "h-full": "",
                              "model-value": G(h),
                              "read-only": "",
                            },
                            { lineNumbers: !0 },
                            { mode: G(u) },
                          ),
                          null,
                          16,
                          ["model-value", "mode"],
                        ),
                      ]),
                      G(p).mappings !== ""
                        ? (lt(),
                          Tt("div", Olt, [
                            ut(
                              "div",
                              Dlt,
                              " Source map (v" + ee(G(p).version) + ") ",
                              1,
                            ),
                            Ft(
                              w,
                              Si(
                                {
                                  "model-value": G(p).mappings,
                                  "read-only": "",
                                },
                                { lineNumbers: !0 },
                                { mode: G(u) },
                              ),
                              null,
                              16,
                              ["model-value", "mode"],
                            ),
                          ]))
                        : Qt("", !0),
                    ],
                    64,
                  ))
                : (lt(),
                  Tt(
                    "div",
                    Alt,
                    " No transform result found for this module. ",
                  )),
            ])
          )
        }
      )
    },
  })
function Rlt(t, e) {
  let r
  return (...o) => {
    r !== void 0 && clearTimeout(r), (r = setTimeout(() => t(...o), e))
  }
}
var Hf = "http://www.w3.org/1999/xhtml"
const zv = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Hf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
}
function Ic(t) {
  var e = (t += ""),
    r = e.indexOf(":")
  return (
    r >= 0 && (e = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)),
    zv.hasOwnProperty(e) ? { space: zv[e], local: t } : t
  )
}
function zlt(t) {
  return function () {
    var e = this.ownerDocument,
      r = this.namespaceURI
    return r === Hf && e.documentElement.namespaceURI === Hf
      ? e.createElement(t)
      : e.createElementNS(r, t)
  }
}
function Flt(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local)
  }
}
function Iy(t) {
  var e = Ic(t)
  return (e.local ? Flt : zlt)(e)
}
function Ilt() {}
function Bh(t) {
  return t == null
    ? Ilt
    : function () {
        return this.querySelector(t)
      }
}
function qlt(t) {
  typeof t != "function" && (t = Bh(t))
  for (var e = this._groups, r = e.length, o = new Array(r), a = 0; a < r; ++a)
    for (
      var u = e[a], f = u.length, h = (o[a] = new Array(f)), p, g, v = 0;
      v < f;
      ++v
    )
      (p = u[v]) &&
        (g = t.call(p, p.__data__, v, u)) &&
        ("__data__" in p && (g.__data__ = p.__data__), (h[v] = g))
  return new zn(o, this._parents)
}
function Hlt(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t)
}
function Blt() {
  return []
}
function qy(t) {
  return t == null
    ? Blt
    : function () {
        return this.querySelectorAll(t)
      }
}
function Wlt(t) {
  return function () {
    return Hlt(t.apply(this, arguments))
  }
}
function Ult(t) {
  typeof t == "function" ? (t = Wlt(t)) : (t = qy(t))
  for (var e = this._groups, r = e.length, o = [], a = [], u = 0; u < r; ++u)
    for (var f = e[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && (o.push(t.call(p, p.__data__, g, f)), a.push(p))
  return new zn(o, a)
}
function Hy(t) {
  return function () {
    return this.matches(t)
  }
}
function By(t) {
  return function (e) {
    return e.matches(t)
  }
}
var jlt = Array.prototype.find
function Glt(t) {
  return function () {
    return jlt.call(this.children, t)
  }
}
function Vlt() {
  return this.firstElementChild
}
function Klt(t) {
  return this.select(t == null ? Vlt : Glt(typeof t == "function" ? t : By(t)))
}
var Xlt = Array.prototype.filter
function Ylt() {
  return Array.from(this.children)
}
function Zlt(t) {
  return function () {
    return Xlt.call(this.children, t)
  }
}
function Jlt(t) {
  return this.selectAll(
    t == null ? Ylt : Zlt(typeof t == "function" ? t : By(t)),
  )
}
function Qlt(t) {
  typeof t != "function" && (t = Hy(t))
  for (var e = this._groups, r = e.length, o = new Array(r), a = 0; a < r; ++a)
    for (var u = e[a], f = u.length, h = (o[a] = []), p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p)
  return new zn(o, this._parents)
}
function Wy(t) {
  return new Array(t.length)
}
function tat() {
  return new zn(this._enter || this._groups.map(Wy), this._parents)
}
function lc(t, e) {
  ;(this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = e)
}
lc.prototype = {
  constructor: lc,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next)
  },
  insertBefore: function (t, e) {
    return this._parent.insertBefore(t, e)
  },
  querySelector: function (t) {
    return this._parent.querySelector(t)
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t)
  },
}
function eat(t) {
  return function () {
    return t
  }
}
function nat(t, e, r, o, a, u) {
  for (var f = 0, h, p = e.length, g = u.length; f < g; ++f)
    (h = e[f]) ? ((h.__data__ = u[f]), (o[f] = h)) : (r[f] = new lc(t, u[f]))
  for (; f < p; ++f) (h = e[f]) && (a[f] = h)
}
function rat(t, e, r, o, a, u, f) {
  var h,
    p,
    g = new Map(),
    v = e.length,
    b = u.length,
    w = new Array(v),
    S
  for (h = 0; h < v; ++h)
    (p = e[h]) &&
      ((w[h] = S = f.call(p, p.__data__, h, e) + ""),
      g.has(S) ? (a[h] = p) : g.set(S, p))
  for (h = 0; h < b; ++h)
    (S = f.call(t, u[h], h, u) + ""),
      (p = g.get(S))
        ? ((o[h] = p), (p.__data__ = u[h]), g.delete(S))
        : (r[h] = new lc(t, u[h]))
  for (h = 0; h < v; ++h) (p = e[h]) && g.get(w[h]) === p && (a[h] = p)
}
function iat(t) {
  return t.__data__
}
function oat(t, e) {
  if (!arguments.length) return Array.from(this, iat)
  var r = e ? rat : nat,
    o = this._parents,
    a = this._groups
  typeof t != "function" && (t = eat(t))
  for (
    var u = a.length,
      f = new Array(u),
      h = new Array(u),
      p = new Array(u),
      g = 0;
    g < u;
    ++g
  ) {
    var v = o[g],
      b = a[g],
      w = b.length,
      S = sat(t.call(v, v && v.__data__, g, o)),
      N = S.length,
      L = (h[g] = new Array(N)),
      A = (f[g] = new Array(N)),
      T = (p[g] = new Array(w))
    r(v, b, L, A, T, S, e)
    for (var M = 0, R = 0, E, W; M < N; ++M)
      if ((E = L[M])) {
        for (M >= R && (R = M + 1); !(W = A[R]) && ++R < N; );
        E._next = W || null
      }
  }
  return (f = new zn(f, o)), (f._enter = h), (f._exit = p), f
}
function sat(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t)
}
function lat() {
  return new zn(this._exit || this._groups.map(Wy), this._parents)
}
function aat(t, e, r) {
  var o = this.enter(),
    a = this,
    u = this.exit()
  return (
    typeof t == "function"
      ? ((o = t(o)), o && (o = o.selection()))
      : (o = o.append(t + "")),
    e != null && ((a = e(a)), a && (a = a.selection())),
    r == null ? u.remove() : r(u),
    o && a ? o.merge(a).order() : a
  )
}
function cat(t) {
  for (
    var e = t.selection ? t.selection() : t,
      r = this._groups,
      o = e._groups,
      a = r.length,
      u = o.length,
      f = Math.min(a, u),
      h = new Array(a),
      p = 0;
    p < f;
    ++p
  )
    for (
      var g = r[p], v = o[p], b = g.length, w = (h[p] = new Array(b)), S, N = 0;
      N < b;
      ++N
    )
      (S = g[N] || v[N]) && (w[N] = S)
  for (; p < a; ++p) h[p] = r[p]
  return new zn(h, this._parents)
}
function uat() {
  for (var t = this._groups, e = -1, r = t.length; ++e < r; )
    for (var o = t[e], a = o.length - 1, u = o[a], f; --a >= 0; )
      (f = o[a]) &&
        (u &&
          f.compareDocumentPosition(u) ^ 4 &&
          u.parentNode.insertBefore(f, u),
        (u = f))
  return this
}
function fat(t) {
  t || (t = hat)
  function e(b, w) {
    return b && w ? t(b.__data__, w.__data__) : !b - !w
  }
  for (
    var r = this._groups, o = r.length, a = new Array(o), u = 0;
    u < o;
    ++u
  ) {
    for (
      var f = r[u], h = f.length, p = (a[u] = new Array(h)), g, v = 0;
      v < h;
      ++v
    )
      (g = f[v]) && (p[v] = g)
    p.sort(e)
  }
  return new zn(a, this._parents).order()
}
function hat(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}
function dat() {
  var t = arguments[0]
  return (arguments[0] = this), t.apply(null, arguments), this
}
function pat() {
  return Array.from(this)
}
function gat() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var o = t[e], a = 0, u = o.length; a < u; ++a) {
      var f = o[a]
      if (f) return f
    }
  return null
}
function vat() {
  let t = 0
  for (const e of this) ++t
  return t
}
function mat() {
  return !this.node()
}
function yat(t) {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var a = e[r], u = 0, f = a.length, h; u < f; ++u)
      (h = a[u]) && t.call(h, h.__data__, u, a)
  return this
}
function bat(t) {
  return function () {
    this.removeAttribute(t)
  }
}
function wat(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local)
  }
}
function xat(t, e) {
  return function () {
    this.setAttribute(t, e)
  }
}
function _at(t, e) {
  return function () {
    this.setAttributeNS(t.space, t.local, e)
  }
}
function Sat(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r)
  }
}
function kat(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, r)
  }
}
function Cat(t, e) {
  var r = Ic(t)
  if (arguments.length < 2) {
    var o = this.node()
    return r.local ? o.getAttributeNS(r.space, r.local) : o.getAttribute(r)
  }
  return this.each(
    (e == null
      ? r.local
        ? wat
        : bat
      : typeof e == "function"
        ? r.local
          ? kat
          : Sat
        : r.local
          ? _at
          : xat)(r, e),
  )
}
function Uy(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  )
}
function Tat(t) {
  return function () {
    this.style.removeProperty(t)
  }
}
function Eat(t, e, r) {
  return function () {
    this.style.setProperty(t, e, r)
  }
}
function Lat(t, e, r) {
  return function () {
    var o = e.apply(this, arguments)
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, r)
  }
}
function Aat(t, e, r) {
  return arguments.length > 1
    ? this.each(
        (e == null ? Tat : typeof e == "function" ? Lat : Eat)(t, e, r ?? ""),
      )
    : os(this.node(), t)
}
function os(t, e) {
  return (
    t.style.getPropertyValue(e) ||
    Uy(t).getComputedStyle(t, null).getPropertyValue(e)
  )
}
function Mat(t) {
  return function () {
    delete this[t]
  }
}
function Nat(t, e) {
  return function () {
    this[t] = e
  }
}
function Pat(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null ? delete this[t] : (this[t] = r)
  }
}
function Oat(t, e) {
  return arguments.length > 1
    ? this.each((e == null ? Mat : typeof e == "function" ? Pat : Nat)(t, e))
    : this.node()[t]
}
function jy(t) {
  return t.trim().split(/^|\s+/)
}
function Wh(t) {
  return t.classList || new Gy(t)
}
function Gy(t) {
  ;(this._node = t), (this._names = jy(t.getAttribute("class") || ""))
}
Gy.prototype = {
  add: function (t) {
    var e = this._names.indexOf(t)
    e < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")))
  },
  remove: function (t) {
    var e = this._names.indexOf(t)
    e >= 0 &&
      (this._names.splice(e, 1),
      this._node.setAttribute("class", this._names.join(" ")))
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0
  },
}
function Vy(t, e) {
  for (var r = Wh(t), o = -1, a = e.length; ++o < a; ) r.add(e[o])
}
function Ky(t, e) {
  for (var r = Wh(t), o = -1, a = e.length; ++o < a; ) r.remove(e[o])
}
function Dat(t) {
  return function () {
    Vy(this, t)
  }
}
function $at(t) {
  return function () {
    Ky(this, t)
  }
}
function Rat(t, e) {
  return function () {
    ;(e.apply(this, arguments) ? Vy : Ky)(this, t)
  }
}
function zat(t, e) {
  var r = jy(t + "")
  if (arguments.length < 2) {
    for (var o = Wh(this.node()), a = -1, u = r.length; ++a < u; )
      if (!o.contains(r[a])) return !1
    return !0
  }
  return this.each((typeof e == "function" ? Rat : e ? Dat : $at)(r, e))
}
function Fat() {
  this.textContent = ""
}
function Iat(t) {
  return function () {
    this.textContent = t
  }
}
function qat(t) {
  return function () {
    var e = t.apply(this, arguments)
    this.textContent = e ?? ""
  }
}
function Hat(t) {
  return arguments.length
    ? this.each(t == null ? Fat : (typeof t == "function" ? qat : Iat)(t))
    : this.node().textContent
}
function Bat() {
  this.innerHTML = ""
}
function Wat(t) {
  return function () {
    this.innerHTML = t
  }
}
function Uat(t) {
  return function () {
    var e = t.apply(this, arguments)
    this.innerHTML = e ?? ""
  }
}
function jat(t) {
  return arguments.length
    ? this.each(t == null ? Bat : (typeof t == "function" ? Uat : Wat)(t))
    : this.node().innerHTML
}
function Gat() {
  this.nextSibling && this.parentNode.appendChild(this)
}
function Vat() {
  return this.each(Gat)
}
function Kat() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild)
}
function Xat() {
  return this.each(Kat)
}
function Yat(t) {
  var e = typeof t == "function" ? t : Iy(t)
  return this.select(function () {
    return this.appendChild(e.apply(this, arguments))
  })
}
function Zat() {
  return null
}
function Jat(t, e) {
  var r = typeof t == "function" ? t : Iy(t),
    o = e == null ? Zat : typeof e == "function" ? e : Bh(e)
  return this.select(function () {
    return this.insertBefore(
      r.apply(this, arguments),
      o.apply(this, arguments) || null,
    )
  })
}
function Qat() {
  var t = this.parentNode
  t && t.removeChild(this)
}
function tct() {
  return this.each(Qat)
}
function ect() {
  var t = this.cloneNode(!1),
    e = this.parentNode
  return e ? e.insertBefore(t, this.nextSibling) : t
}
function nct() {
  var t = this.cloneNode(!0),
    e = this.parentNode
  return e ? e.insertBefore(t, this.nextSibling) : t
}
function rct(t) {
  return this.select(t ? nct : ect)
}
function ict(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__
}
function oct(t) {
  return function (e) {
    t.call(this, e, this.__data__)
  }
}
function sct(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        o = e.indexOf(".")
      return (
        o >= 0 && ((r = e.slice(o + 1)), (e = e.slice(0, o))),
        { type: e, name: r }
      )
    })
}
function lct(t) {
  return function () {
    var e = this.__on
    if (e) {
      for (var r = 0, o = -1, a = e.length, u; r < a; ++r)
        (u = e[r]),
          (!t.type || u.type === t.type) && u.name === t.name
            ? this.removeEventListener(u.type, u.listener, u.options)
            : (e[++o] = u)
      ++o ? (e.length = o) : delete this.__on
    }
  }
}
function act(t, e, r) {
  return function () {
    var o = this.__on,
      a,
      u = oct(e)
    if (o) {
      for (var f = 0, h = o.length; f < h; ++f)
        if ((a = o[f]).type === t.type && a.name === t.name) {
          this.removeEventListener(a.type, a.listener, a.options),
            this.addEventListener(a.type, (a.listener = u), (a.options = r)),
            (a.value = e)
          return
        }
    }
    this.addEventListener(t.type, u, r),
      (a = { type: t.type, name: t.name, value: e, listener: u, options: r }),
      o ? o.push(a) : (this.__on = [a])
  }
}
function cct(t, e, r) {
  var o = sct(t + ""),
    a,
    u = o.length,
    f
  if (arguments.length < 2) {
    var h = this.node().__on
    if (h) {
      for (var p = 0, g = h.length, v; p < g; ++p)
        for (a = 0, v = h[p]; a < u; ++a)
          if ((f = o[a]).type === v.type && f.name === v.name) return v.value
    }
    return
  }
  for (h = e ? act : lct, a = 0; a < u; ++a) this.each(h(o[a], e, r))
  return this
}
function Xy(t, e, r) {
  var o = Uy(t),
    a = o.CustomEvent
  typeof a == "function"
    ? (a = new a(e, r))
    : ((a = o.document.createEvent("Event")),
      r
        ? (a.initEvent(e, r.bubbles, r.cancelable), (a.detail = r.detail))
        : a.initEvent(e, !1, !1)),
    t.dispatchEvent(a)
}
function uct(t, e) {
  return function () {
    return Xy(this, t, e)
  }
}
function fct(t, e) {
  return function () {
    return Xy(this, t, e.apply(this, arguments))
  }
}
function hct(t, e) {
  return this.each((typeof e == "function" ? fct : uct)(t, e))
}
function* dct() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var o = t[e], a = 0, u = o.length, f; a < u; ++a)
      (f = o[a]) && (yield f)
}
var Yy = [null]
function zn(t, e) {
  ;(this._groups = t), (this._parents = e)
}
function Pl() {
  return new zn([[document.documentElement]], Yy)
}
function pct() {
  return this
}
zn.prototype = Pl.prototype = {
  constructor: zn,
  select: qlt,
  selectAll: Ult,
  selectChild: Klt,
  selectChildren: Jlt,
  filter: Qlt,
  data: oat,
  enter: tat,
  exit: lat,
  join: aat,
  merge: cat,
  selection: pct,
  order: uat,
  sort: fat,
  call: dat,
  nodes: pat,
  node: gat,
  size: vat,
  empty: mat,
  each: yat,
  attr: Cat,
  style: Aat,
  property: Oat,
  classed: zat,
  text: Hat,
  html: jat,
  raise: Vat,
  lower: Xat,
  append: Yat,
  insert: Jat,
  remove: tct,
  clone: rct,
  datum: ict,
  on: cct,
  dispatch: hct,
  [Symbol.iterator]: dct,
}
function Tn(t) {
  return typeof t == "string"
    ? new zn([[document.querySelector(t)]], [document.documentElement])
    : new zn([[t]], Yy)
}
function gct(t) {
  let e
  for (; (e = t.sourceEvent); ) t = e
  return t
}
function $r(t, e) {
  if (((t = gct(t)), e === void 0 && (e = t.currentTarget), e)) {
    var r = e.ownerSVGElement || e
    if (r.createSVGPoint) {
      var o = r.createSVGPoint()
      return (
        (o.x = t.clientX),
        (o.y = t.clientY),
        (o = o.matrixTransform(e.getScreenCTM().inverse())),
        [o.x, o.y]
      )
    }
    if (e.getBoundingClientRect) {
      var a = e.getBoundingClientRect()
      return [
        t.clientX - a.left - e.clientLeft,
        t.clientY - a.top - e.clientTop,
      ]
    }
  }
  return [t.pageX, t.pageY]
}
class pn {
  constructor(e, r) {
    ;(this.x = e), (this.y = r)
  }
  static of([e, r]) {
    return new pn(e, r)
  }
  add(e) {
    return new pn(this.x + e.x, this.y + e.y)
  }
  subtract(e) {
    return new pn(this.x - e.x, this.y - e.y)
  }
  multiply(e) {
    return new pn(this.x * e, this.y * e)
  }
  divide(e) {
    return new pn(this.x / e, this.y / e)
  }
  dot(e) {
    return this.x * e.x + this.y * e.y
  }
  cross(e) {
    return this.x * e.y - e.x * this.y
  }
  hadamard(e) {
    return new pn(this.x * e.x, this.y * e.y)
  }
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  normalize() {
    const e = this.length()
    return new pn(this.x / e, this.y / e)
  }
  rotateByRadians(e) {
    const r = Math.cos(e),
      o = Math.sin(e)
    return new pn(this.x * r - this.y * o, this.x * o + this.y * r)
  }
  rotateByDegrees(e) {
    return this.rotateByRadians((e * Math.PI) / 180)
  }
}
var vct = { value: () => {} }
function Ol() {
  for (var t = 0, e = arguments.length, r = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in r || /[\s.]/.test(o))
      throw new Error("illegal type: " + o)
    r[o] = []
  }
  return new qa(r)
}
function qa(t) {
  this._ = t
}
function mct(t, e) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var o = "",
        a = r.indexOf(".")
      if (
        (a >= 0 && ((o = r.slice(a + 1)), (r = r.slice(0, a))),
        r && !e.hasOwnProperty(r))
      )
        throw new Error("unknown type: " + r)
      return { type: r, name: o }
    })
}
qa.prototype = Ol.prototype = {
  constructor: qa,
  on: function (t, e) {
    var r = this._,
      o = mct(t + "", r),
      a,
      u = -1,
      f = o.length
    if (arguments.length < 2) {
      for (; ++u < f; )
        if ((a = (t = o[u]).type) && (a = yct(r[a], t.name))) return a
      return
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e)
    for (; ++u < f; )
      if ((a = (t = o[u]).type)) r[a] = Fv(r[a], t.name, e)
      else if (e == null) for (a in r) r[a] = Fv(r[a], t.name, null)
    return this
  },
  copy: function () {
    var t = {},
      e = this._
    for (var r in e) t[r] = e[r].slice()
    return new qa(t)
  },
  call: function (t, e) {
    if ((a = arguments.length - 2) > 0)
      for (var r = new Array(a), o = 0, a, u; o < a; ++o)
        r[o] = arguments[o + 2]
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t)
    for (u = this._[t], o = 0, a = u.length; o < a; ++o) u[o].value.apply(e, r)
  },
  apply: function (t, e, r) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t)
    for (var o = this._[t], a = 0, u = o.length; a < u; ++a)
      o[a].value.apply(e, r)
  },
}
function yct(t, e) {
  for (var r = 0, o = t.length, a; r < o; ++r)
    if ((a = t[r]).name === e) return a.value
}
function Fv(t, e, r) {
  for (var o = 0, a = t.length; o < a; ++o)
    if (t[o].name === e) {
      ;(t[o] = vct), (t = t.slice(0, o).concat(t.slice(o + 1)))
      break
    }
  return r != null && t.push({ name: e, value: r }), t
}
const bct = { passive: !1 },
  yl = { capture: !0, passive: !1 }
function ef(t) {
  t.stopImmediatePropagation()
}
function Go(t) {
  t.preventDefault(), t.stopImmediatePropagation()
}
function Zy(t) {
  var e = t.document.documentElement,
    r = Tn(t).on("dragstart.drag", Go, yl)
  "onselectstart" in e
    ? r.on("selectstart.drag", Go, yl)
    : ((e.__noselect = e.style.MozUserSelect), (e.style.MozUserSelect = "none"))
}
function Jy(t, e) {
  var r = t.document.documentElement,
    o = Tn(t).on("dragstart.drag", null)
  e &&
    (o.on("click.drag", Go, yl),
    setTimeout(function () {
      o.on("click.drag", null)
    }, 0)),
    "onselectstart" in r
      ? o.on("selectstart.drag", null)
      : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect)
}
const Ta = (t) => () => t
function Bf(
  t,
  {
    sourceEvent: e,
    subject: r,
    target: o,
    identifier: a,
    active: u,
    x: f,
    y: h,
    dx: p,
    dy: g,
    dispatch: v,
  },
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: a, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: g, enumerable: !0, configurable: !0 },
    _: { value: v },
  })
}
Bf.prototype.on = function () {
  var t = this._.on.apply(this._, arguments)
  return t === this._ ? this : t
}
function wct(t) {
  return !t.ctrlKey && !t.button
}
function xct() {
  return this.parentNode
}
function _ct(t, e) {
  return e ?? { x: t.x, y: t.y }
}
function Sct() {
  return navigator.maxTouchPoints || "ontouchstart" in this
}
function kct() {
  var t = wct,
    e = xct,
    r = _ct,
    o = Sct,
    a = {},
    u = Ol("start", "drag", "end"),
    f = 0,
    h,
    p,
    g,
    v,
    b = 0
  function w(E) {
    E.on("mousedown.drag", S)
      .filter(o)
      .on("touchstart.drag", A)
      .on("touchmove.drag", T, bct)
      .on("touchend.drag touchcancel.drag", M)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
  }
  function S(E, W) {
    if (!(v || !t.call(this, E, W))) {
      var X = R(this, e.call(this, E, W), E, W, "mouse")
      X &&
        (Tn(E.view).on("mousemove.drag", N, yl).on("mouseup.drag", L, yl),
        Zy(E.view),
        ef(E),
        (g = !1),
        (h = E.clientX),
        (p = E.clientY),
        X("start", E))
    }
  }
  function N(E) {
    if ((Go(E), !g)) {
      var W = E.clientX - h,
        X = E.clientY - p
      g = W * W + X * X > b
    }
    a.mouse("drag", E)
  }
  function L(E) {
    Tn(E.view).on("mousemove.drag mouseup.drag", null),
      Jy(E.view, g),
      Go(E),
      a.mouse("end", E)
  }
  function A(E, W) {
    if (t.call(this, E, W)) {
      var X = E.changedTouches,
        ft = e.call(this, E, W),
        Y = X.length,
        et,
        st
      for (et = 0; et < Y; ++et)
        (st = R(this, ft, E, W, X[et].identifier, X[et])) &&
          (ef(E), st("start", E, X[et]))
    }
  }
  function T(E) {
    var W = E.changedTouches,
      X = W.length,
      ft,
      Y
    for (ft = 0; ft < X; ++ft)
      (Y = a[W[ft].identifier]) && (Go(E), Y("drag", E, W[ft]))
  }
  function M(E) {
    var W = E.changedTouches,
      X = W.length,
      ft,
      Y
    for (
      v && clearTimeout(v),
        v = setTimeout(function () {
          v = null
        }, 500),
        ft = 0;
      ft < X;
      ++ft
    )
      (Y = a[W[ft].identifier]) && (ef(E), Y("end", E, W[ft]))
  }
  function R(E, W, X, ft, Y, et) {
    var st = u.copy(),
      dt = $r(et || X, W),
      pt,
      V,
      z
    if (
      (z = r.call(
        E,
        new Bf("beforestart", {
          sourceEvent: X,
          target: w,
          identifier: Y,
          active: f,
          x: dt[0],
          y: dt[1],
          dx: 0,
          dy: 0,
          dispatch: st,
        }),
        ft,
      )) != null
    )
      return (
        (pt = z.x - dt[0] || 0),
        (V = z.y - dt[1] || 0),
        function k(q, B, Q) {
          var mt = dt,
            Et
          switch (q) {
            case "start":
              ;(a[Y] = k), (Et = f++)
              break
            case "end":
              delete a[Y], --f
            case "drag":
              ;(dt = $r(Q || B, W)), (Et = f)
              break
          }
          st.call(
            q,
            E,
            new Bf(q, {
              sourceEvent: B,
              subject: z,
              target: w,
              identifier: Y,
              active: Et,
              x: dt[0] + pt,
              y: dt[1] + V,
              dx: dt[0] - mt[0],
              dy: dt[1] - mt[1],
              dispatch: st,
            }),
            ft,
          )
        }
      )
  }
  return (
    (w.filter = function (E) {
      return arguments.length
        ? ((t = typeof E == "function" ? E : Ta(!!E)), w)
        : t
    }),
    (w.container = function (E) {
      return arguments.length
        ? ((e = typeof E == "function" ? E : Ta(E)), w)
        : e
    }),
    (w.subject = function (E) {
      return arguments.length
        ? ((r = typeof E == "function" ? E : Ta(E)), w)
        : r
    }),
    (w.touchable = function (E) {
      return arguments.length
        ? ((o = typeof E == "function" ? E : Ta(!!E)), w)
        : o
    }),
    (w.on = function () {
      var E = u.on.apply(u, arguments)
      return E === u ? w : E
    }),
    (w.clickDistance = function (E) {
      return arguments.length ? ((b = (E = +E) * E), w) : Math.sqrt(b)
    }),
    w
  )
}
function Uh(t, e, r) {
  ;(t.prototype = e.prototype = r), (r.constructor = t)
}
function Qy(t, e) {
  var r = Object.create(t.prototype)
  for (var o in e) r[o] = e[o]
  return r
}
function Dl() {}
var bl = 0.7,
  ac = 1 / bl,
  Vo = "\\s*([+-]?\\d+)\\s*",
  wl = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  mr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Cct = /^#([0-9a-f]{3,8})$/,
  Tct = new RegExp(`^rgb\\(${Vo},${Vo},${Vo}\\)$`),
  Ect = new RegExp(`^rgb\\(${mr},${mr},${mr}\\)$`),
  Lct = new RegExp(`^rgba\\(${Vo},${Vo},${Vo},${wl}\\)$`),
  Act = new RegExp(`^rgba\\(${mr},${mr},${mr},${wl}\\)$`),
  Mct = new RegExp(`^hsl\\(${wl},${mr},${mr}\\)$`),
  Nct = new RegExp(`^hsla\\(${wl},${mr},${mr},${wl}\\)$`),
  Iv = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  }
Uh(Dl, xl, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: qv,
  formatHex: qv,
  formatHex8: Pct,
  formatHsl: Oct,
  formatRgb: Hv,
  toString: Hv,
})
function qv() {
  return this.rgb().formatHex()
}
function Pct() {
  return this.rgb().formatHex8()
}
function Oct() {
  return tb(this).formatHsl()
}
function Hv() {
  return this.rgb().formatRgb()
}
function xl(t) {
  var e, r
  return (
    (t = (t + "").trim().toLowerCase()),
    (e = Cct.exec(t))
      ? ((r = e[1].length),
        (e = parseInt(e[1], 16)),
        r === 6
          ? Bv(e)
          : r === 3
            ? new En(
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (e & 240),
                ((e & 15) << 4) | (e & 15),
                1,
              )
            : r === 8
              ? Ea(
                  (e >> 24) & 255,
                  (e >> 16) & 255,
                  (e >> 8) & 255,
                  (e & 255) / 255,
                )
              : r === 4
                ? Ea(
                    ((e >> 12) & 15) | ((e >> 8) & 240),
                    ((e >> 8) & 15) | ((e >> 4) & 240),
                    ((e >> 4) & 15) | (e & 240),
                    (((e & 15) << 4) | (e & 15)) / 255,
                  )
                : null)
      : (e = Tct.exec(t))
        ? new En(e[1], e[2], e[3], 1)
        : (e = Ect.exec(t))
          ? new En(
              (e[1] * 255) / 100,
              (e[2] * 255) / 100,
              (e[3] * 255) / 100,
              1,
            )
          : (e = Lct.exec(t))
            ? Ea(e[1], e[2], e[3], e[4])
            : (e = Act.exec(t))
              ? Ea(
                  (e[1] * 255) / 100,
                  (e[2] * 255) / 100,
                  (e[3] * 255) / 100,
                  e[4],
                )
              : (e = Mct.exec(t))
                ? jv(e[1], e[2] / 100, e[3] / 100, 1)
                : (e = Nct.exec(t))
                  ? jv(e[1], e[2] / 100, e[3] / 100, e[4])
                  : Iv.hasOwnProperty(t)
                    ? Bv(Iv[t])
                    : t === "transparent"
                      ? new En(NaN, NaN, NaN, 0)
                      : null
  )
}
function Bv(t) {
  return new En((t >> 16) & 255, (t >> 8) & 255, t & 255, 1)
}
function Ea(t, e, r, o) {
  return o <= 0 && (t = e = r = NaN), new En(t, e, r, o)
}
function Dct(t) {
  return (
    t instanceof Dl || (t = xl(t)),
    t ? ((t = t.rgb()), new En(t.r, t.g, t.b, t.opacity)) : new En()
  )
}
function Wf(t, e, r, o) {
  return arguments.length === 1 ? Dct(t) : new En(t, e, r, o ?? 1)
}
function En(t, e, r, o) {
  ;(this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +o)
}
Uh(
  En,
  Wf,
  Qy(Dl, {
    brighter(t) {
      return (
        (t = t == null ? ac : Math.pow(ac, t)),
        new En(this.r * t, this.g * t, this.b * t, this.opacity)
      )
    },
    darker(t) {
      return (
        (t = t == null ? bl : Math.pow(bl, t)),
        new En(this.r * t, this.g * t, this.b * t, this.opacity)
      )
    },
    rgb() {
      return this
    },
    clamp() {
      return new En(Qi(this.r), Qi(this.g), Qi(this.b), cc(this.opacity))
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    hex: Wv,
    formatHex: Wv,
    formatHex8: $ct,
    formatRgb: Uv,
    toString: Uv,
  }),
)
function Wv() {
  return `#${Xi(this.r)}${Xi(this.g)}${Xi(this.b)}`
}
function $ct() {
  return `#${Xi(this.r)}${Xi(this.g)}${Xi(this.b)}${Xi((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
}
function Uv() {
  const t = cc(this.opacity)
  return `${t === 1 ? "rgb(" : "rgba("}${Qi(this.r)}, ${Qi(this.g)}, ${Qi(this.b)}${t === 1 ? ")" : `, ${t})`}`
}
function cc(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}
function Qi(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}
function Xi(t) {
  return (t = Qi(t)), (t < 16 ? "0" : "") + t.toString(16)
}
function jv(t, e, r, o) {
  return (
    o <= 0
      ? (t = e = r = NaN)
      : r <= 0 || r >= 1
        ? (t = e = NaN)
        : e <= 0 && (t = NaN),
    new tr(t, e, r, o)
  )
}
function tb(t) {
  if (t instanceof tr) return new tr(t.h, t.s, t.l, t.opacity)
  if ((t instanceof Dl || (t = xl(t)), !t)) return new tr()
  if (t instanceof tr) return t
  t = t.rgb()
  var e = t.r / 255,
    r = t.g / 255,
    o = t.b / 255,
    a = Math.min(e, r, o),
    u = Math.max(e, r, o),
    f = NaN,
    h = u - a,
    p = (u + a) / 2
  return (
    h
      ? (e === u
          ? (f = (r - o) / h + (r < o) * 6)
          : r === u
            ? (f = (o - e) / h + 2)
            : (f = (e - r) / h + 4),
        (h /= p < 0.5 ? u + a : 2 - u - a),
        (f *= 60))
      : (h = p > 0 && p < 1 ? 0 : f),
    new tr(f, h, p, t.opacity)
  )
}
function Rct(t, e, r, o) {
  return arguments.length === 1 ? tb(t) : new tr(t, e, r, o ?? 1)
}
function tr(t, e, r, o) {
  ;(this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +o)
}
Uh(
  tr,
  Rct,
  Qy(Dl, {
    brighter(t) {
      return (
        (t = t == null ? ac : Math.pow(ac, t)),
        new tr(this.h, this.s, this.l * t, this.opacity)
      )
    },
    darker(t) {
      return (
        (t = t == null ? bl : Math.pow(bl, t)),
        new tr(this.h, this.s, this.l * t, this.opacity)
      )
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        o = r + (r < 0.5 ? r : 1 - r) * e,
        a = 2 * r - o
      return new En(
        nf(t >= 240 ? t - 240 : t + 120, a, o),
        nf(t, a, o),
        nf(t < 120 ? t + 240 : t - 120, a, o),
        this.opacity,
      )
    },
    clamp() {
      return new tr(Gv(this.h), La(this.s), La(this.l), cc(this.opacity))
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    formatHsl() {
      const t = cc(this.opacity)
      return `${t === 1 ? "hsl(" : "hsla("}${Gv(this.h)}, ${La(this.s) * 100}%, ${La(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`
    },
  }),
)
function Gv(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t
}
function La(t) {
  return Math.max(0, Math.min(1, t || 0))
}
function nf(t, e, r) {
  return (
    (t < 60
      ? e + ((r - e) * t) / 60
      : t < 180
        ? r
        : t < 240
          ? e + ((r - e) * (240 - t)) / 60
          : e) * 255
  )
}
const eb = (t) => () => t
function zct(t, e) {
  return function (r) {
    return t + r * e
  }
}
function Fct(t, e, r) {
  return (
    (t = Math.pow(t, r)),
    (e = Math.pow(e, r) - t),
    (r = 1 / r),
    function (o) {
      return Math.pow(t + o * e, r)
    }
  )
}
function Ict(t) {
  return (t = +t) == 1
    ? nb
    : function (e, r) {
        return r - e ? Fct(e, r, t) : eb(isNaN(e) ? r : e)
      }
}
function nb(t, e) {
  var r = e - t
  return r ? zct(t, r) : eb(isNaN(t) ? e : t)
}
const Vv = (function t(e) {
  var r = Ict(e)
  function o(a, u) {
    var f = r((a = Wf(a)).r, (u = Wf(u)).r),
      h = r(a.g, u.g),
      p = r(a.b, u.b),
      g = nb(a.opacity, u.opacity)
    return function (v) {
      return (
        (a.r = f(v)), (a.g = h(v)), (a.b = p(v)), (a.opacity = g(v)), a + ""
      )
    }
  }
  return (o.gamma = t), o
})(1)
function mi(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (r) {
      return t * (1 - r) + e * r
    }
  )
}
var Uf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  rf = new RegExp(Uf.source, "g")
function qct(t) {
  return function () {
    return t
  }
}
function Hct(t) {
  return function (e) {
    return t(e) + ""
  }
}
function Bct(t, e) {
  var r = (Uf.lastIndex = rf.lastIndex = 0),
    o,
    a,
    u,
    f = -1,
    h = [],
    p = []
  for (t = t + "", e = e + ""; (o = Uf.exec(t)) && (a = rf.exec(e)); )
    (u = a.index) > r &&
      ((u = e.slice(r, u)), h[f] ? (h[f] += u) : (h[++f] = u)),
      (o = o[0]) === (a = a[0])
        ? h[f]
          ? (h[f] += a)
          : (h[++f] = a)
        : ((h[++f] = null), p.push({ i: f, x: mi(o, a) })),
      (r = rf.lastIndex)
  return (
    r < e.length && ((u = e.slice(r)), h[f] ? (h[f] += u) : (h[++f] = u)),
    h.length < 2
      ? p[0]
        ? Hct(p[0].x)
        : qct(e)
      : ((e = p.length),
        function (g) {
          for (var v = 0, b; v < e; ++v) h[(b = p[v]).i] = b.x(g)
          return h.join("")
        })
  )
}
var Kv = 180 / Math.PI,
  jf = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  }
function rb(t, e, r, o, a, u) {
  var f, h, p
  return (
    (f = Math.sqrt(t * t + e * e)) && ((t /= f), (e /= f)),
    (p = t * r + e * o) && ((r -= t * p), (o -= e * p)),
    (h = Math.sqrt(r * r + o * o)) && ((r /= h), (o /= h), (p /= h)),
    t * o < e * r && ((t = -t), (e = -e), (p = -p), (f = -f)),
    {
      translateX: a,
      translateY: u,
      rotate: Math.atan2(e, t) * Kv,
      skewX: Math.atan(p) * Kv,
      scaleX: f,
      scaleY: h,
    }
  )
}
var Aa
function Wct(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + "",
  )
  return e.isIdentity ? jf : rb(e.a, e.b, e.c, e.d, e.e, e.f)
}
function Uct(t) {
  return t == null ||
    (Aa || (Aa = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Aa.setAttribute("transform", t),
    !(t = Aa.transform.baseVal.consolidate()))
    ? jf
    : ((t = t.matrix), rb(t.a, t.b, t.c, t.d, t.e, t.f))
}
function ib(t, e, r, o) {
  function a(g) {
    return g.length ? g.pop() + " " : ""
  }
  function u(g, v, b, w, S, N) {
    if (g !== b || v !== w) {
      var L = S.push("translate(", null, e, null, r)
      N.push({ i: L - 4, x: mi(g, b) }, { i: L - 2, x: mi(v, w) })
    } else (b || w) && S.push("translate(" + b + e + w + r)
  }
  function f(g, v, b, w) {
    g !== v
      ? (g - v > 180 ? (v += 360) : v - g > 180 && (g += 360),
        w.push({ i: b.push(a(b) + "rotate(", null, o) - 2, x: mi(g, v) }))
      : v && b.push(a(b) + "rotate(" + v + o)
  }
  function h(g, v, b, w) {
    g !== v
      ? w.push({ i: b.push(a(b) + "skewX(", null, o) - 2, x: mi(g, v) })
      : v && b.push(a(b) + "skewX(" + v + o)
  }
  function p(g, v, b, w, S, N) {
    if (g !== b || v !== w) {
      var L = S.push(a(S) + "scale(", null, ",", null, ")")
      N.push({ i: L - 4, x: mi(g, b) }, { i: L - 2, x: mi(v, w) })
    } else (b !== 1 || w !== 1) && S.push(a(S) + "scale(" + b + "," + w + ")")
  }
  return function (g, v) {
    var b = [],
      w = []
    return (
      (g = t(g)),
      (v = t(v)),
      u(g.translateX, g.translateY, v.translateX, v.translateY, b, w),
      f(g.rotate, v.rotate, b, w),
      h(g.skewX, v.skewX, b, w),
      p(g.scaleX, g.scaleY, v.scaleX, v.scaleY, b, w),
      (g = v = null),
      function (S) {
        for (var N = -1, L = w.length, A; ++N < L; ) b[(A = w[N]).i] = A.x(S)
        return b.join("")
      }
    )
  }
}
var jct = ib(Wct, "px, ", "px)", "deg)"),
  Gct = ib(Uct, ", ", ")", ")"),
  Vct = 1e-12
function Xv(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2
}
function Kct(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2
}
function Xct(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1)
}
const Yct = (function t(e, r, o) {
  function a(u, f) {
    var h = u[0],
      p = u[1],
      g = u[2],
      v = f[0],
      b = f[1],
      w = f[2],
      S = v - h,
      N = b - p,
      L = S * S + N * N,
      A,
      T
    if (L < Vct)
      (T = Math.log(w / g) / e),
        (A = function (ft) {
          return [h + ft * S, p + ft * N, g * Math.exp(e * ft * T)]
        })
    else {
      var M = Math.sqrt(L),
        R = (w * w - g * g + o * L) / (2 * g * r * M),
        E = (w * w - g * g - o * L) / (2 * w * r * M),
        W = Math.log(Math.sqrt(R * R + 1) - R),
        X = Math.log(Math.sqrt(E * E + 1) - E)
      ;(T = (X - W) / e),
        (A = function (ft) {
          var Y = ft * T,
            et = Xv(W),
            st = (g / (r * M)) * (et * Xct(e * Y + W) - Kct(W))
          return [h + st * S, p + st * N, (g * et) / Xv(e * Y + W)]
        })
    }
    return (A.duration = (T * 1e3 * e) / Math.SQRT2), A
  }
  return (
    (a.rho = function (u) {
      var f = Math.max(0.001, +u),
        h = f * f,
        p = h * h
      return t(f, h, p)
    }),
    a
  )
})(Math.SQRT2, 2, 4)
var ss = 0,
  Js = 0,
  Ks = 0,
  ob = 1e3,
  uc,
  Qs,
  fc = 0,
  io = 0,
  qc = 0,
  _l = typeof performance == "object" && performance.now ? performance : Date,
  sb =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17)
        }
function jh() {
  return io || (sb(Zct), (io = _l.now() + qc))
}
function Zct() {
  io = 0
}
function hc() {
  this._call = this._time = this._next = null
}
hc.prototype = Gh.prototype = {
  constructor: hc,
  restart: function (t, e, r) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function")
    ;(r = (r == null ? jh() : +r) + (e == null ? 0 : +e)),
      !this._next &&
        Qs !== this &&
        (Qs ? (Qs._next = this) : (uc = this), (Qs = this)),
      (this._call = t),
      (this._time = r),
      Gf()
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Gf())
  },
}
function Gh(t, e, r) {
  var o = new hc()
  return o.restart(t, e, r), o
}
function Jct() {
  jh(), ++ss
  for (var t = uc, e; t; )
    (e = io - t._time) >= 0 && t._call.call(void 0, e), (t = t._next)
  --ss
}
function Yv() {
  ;(io = (fc = _l.now()) + qc), (ss = Js = 0)
  try {
    Jct()
  } finally {
    ;(ss = 0), tut(), (io = 0)
  }
}
function Qct() {
  var t = _l.now(),
    e = t - fc
  e > ob && ((qc -= e), (fc = t))
}
function tut() {
  for (var t, e = uc, r, o = 1 / 0; e; )
    e._call
      ? (o > e._time && (o = e._time), (t = e), (e = e._next))
      : ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (uc = r)))
  ;(Qs = t), Gf(o)
}
function Gf(t) {
  if (!ss) {
    Js && (Js = clearTimeout(Js))
    var e = t - io
    e > 24
      ? (t < 1 / 0 && (Js = setTimeout(Yv, t - _l.now() - qc)),
        Ks && (Ks = clearInterval(Ks)))
      : (Ks || ((fc = _l.now()), (Ks = setInterval(Qct, ob))), (ss = 1), sb(Yv))
  }
}
function Zv(t, e, r) {
  var o = new hc()
  return (
    (e = e == null ? 0 : +e),
    o.restart(
      (a) => {
        o.stop(), t(a + e)
      },
      e,
      r,
    ),
    o
  )
}
var eut = Ol("start", "end", "cancel", "interrupt"),
  nut = [],
  lb = 0,
  Jv = 1,
  Vf = 2,
  Ha = 3,
  Qv = 4,
  Kf = 5,
  Ba = 6
function Hc(t, e, r, o, a, u) {
  var f = t.__transition
  if (!f) t.__transition = {}
  else if (r in f) return
  rut(t, r, {
    name: e,
    index: o,
    group: a,
    on: eut,
    tween: nut,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: lb,
  })
}
function Vh(t, e) {
  var r = rr(t, e)
  if (r.state > lb) throw new Error("too late; already scheduled")
  return r
}
function wr(t, e) {
  var r = rr(t, e)
  if (r.state > Ha) throw new Error("too late; already running")
  return r
}
function rr(t, e) {
  var r = t.__transition
  if (!r || !(r = r[e])) throw new Error("transition not found")
  return r
}
function rut(t, e, r) {
  var o = t.__transition,
    a
  ;(o[e] = r), (r.timer = Gh(u, 0, r.time))
  function u(g) {
    ;(r.state = Jv),
      r.timer.restart(f, r.delay, r.time),
      r.delay <= g && f(g - r.delay)
  }
  function f(g) {
    var v, b, w, S
    if (r.state !== Jv) return p()
    for (v in o)
      if (((S = o[v]), S.name === r.name)) {
        if (S.state === Ha) return Zv(f)
        S.state === Qv
          ? ((S.state = Ba),
            S.timer.stop(),
            S.on.call("interrupt", t, t.__data__, S.index, S.group),
            delete o[v])
          : +v < e &&
            ((S.state = Ba),
            S.timer.stop(),
            S.on.call("cancel", t, t.__data__, S.index, S.group),
            delete o[v])
      }
    if (
      (Zv(function () {
        r.state === Ha &&
          ((r.state = Qv), r.timer.restart(h, r.delay, r.time), h(g))
      }),
      (r.state = Vf),
      r.on.call("start", t, t.__data__, r.index, r.group),
      r.state === Vf)
    ) {
      for (
        r.state = Ha, a = new Array((w = r.tween.length)), v = 0, b = -1;
        v < w;
        ++v
      )
        (S = r.tween[v].value.call(t, t.__data__, r.index, r.group)) &&
          (a[++b] = S)
      a.length = b + 1
    }
  }
  function h(g) {
    for (
      var v =
          g < r.duration
            ? r.ease.call(null, g / r.duration)
            : (r.timer.restart(p), (r.state = Kf), 1),
        b = -1,
        w = a.length;
      ++b < w;

    )
      a[b].call(t, v)
    r.state === Kf && (r.on.call("end", t, t.__data__, r.index, r.group), p())
  }
  function p() {
    ;(r.state = Ba), r.timer.stop(), delete o[e]
    for (var g in o) return
    delete t.__transition
  }
}
function Wa(t, e) {
  var r = t.__transition,
    o,
    a,
    u = !0,
    f
  if (r) {
    e = e == null ? null : e + ""
    for (f in r) {
      if ((o = r[f]).name !== e) {
        u = !1
        continue
      }
      ;(a = o.state > Vf && o.state < Kf),
        (o.state = Ba),
        o.timer.stop(),
        o.on.call(a ? "interrupt" : "cancel", t, t.__data__, o.index, o.group),
        delete r[f]
    }
    u && delete t.__transition
  }
}
function iut(t) {
  return this.each(function () {
    Wa(this, t)
  })
}
function out(t, e) {
  var r, o
  return function () {
    var a = wr(this, t),
      u = a.tween
    if (u !== r) {
      o = r = u
      for (var f = 0, h = o.length; f < h; ++f)
        if (o[f].name === e) {
          ;(o = o.slice()), o.splice(f, 1)
          break
        }
    }
    a.tween = o
  }
}
function sut(t, e, r) {
  var o, a
  if (typeof r != "function") throw new Error()
  return function () {
    var u = wr(this, t),
      f = u.tween
    if (f !== o) {
      a = (o = f).slice()
      for (var h = { name: e, value: r }, p = 0, g = a.length; p < g; ++p)
        if (a[p].name === e) {
          a[p] = h
          break
        }
      p === g && a.push(h)
    }
    u.tween = a
  }
}
function lut(t, e) {
  var r = this._id
  if (((t += ""), arguments.length < 2)) {
    for (var o = rr(this.node(), r).tween, a = 0, u = o.length, f; a < u; ++a)
      if ((f = o[a]).name === t) return f.value
    return null
  }
  return this.each((e == null ? out : sut)(r, t, e))
}
function Kh(t, e, r) {
  var o = t._id
  return (
    t.each(function () {
      var a = wr(this, o)
      ;(a.value || (a.value = {}))[e] = r.apply(this, arguments)
    }),
    function (a) {
      return rr(a, o).value[e]
    }
  )
}
function ab(t, e) {
  var r
  return (
    typeof e == "number"
      ? mi
      : e instanceof xl
        ? Vv
        : (r = xl(e))
          ? ((e = r), Vv)
          : Bct
  )(t, e)
}
function aut(t) {
  return function () {
    this.removeAttribute(t)
  }
}
function cut(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local)
  }
}
function uut(t, e, r) {
  var o,
    a = r + "",
    u
  return function () {
    var f = this.getAttribute(t)
    return f === a ? null : f === o ? u : (u = e((o = f), r))
  }
}
function fut(t, e, r) {
  var o,
    a = r + "",
    u
  return function () {
    var f = this.getAttributeNS(t.space, t.local)
    return f === a ? null : f === o ? u : (u = e((o = f), r))
  }
}
function hut(t, e, r) {
  var o, a, u
  return function () {
    var f,
      h = r(this),
      p
    return h == null
      ? void this.removeAttribute(t)
      : ((f = this.getAttribute(t)),
        (p = h + ""),
        f === p
          ? null
          : f === o && p === a
            ? u
            : ((a = p), (u = e((o = f), h))))
  }
}
function dut(t, e, r) {
  var o, a, u
  return function () {
    var f,
      h = r(this),
      p
    return h == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((f = this.getAttributeNS(t.space, t.local)),
        (p = h + ""),
        f === p
          ? null
          : f === o && p === a
            ? u
            : ((a = p), (u = e((o = f), h))))
  }
}
function put(t, e) {
  var r = Ic(t),
    o = r === "transform" ? Gct : ab
  return this.attrTween(
    t,
    typeof e == "function"
      ? (r.local ? dut : hut)(r, o, Kh(this, "attr." + t, e))
      : e == null
        ? (r.local ? cut : aut)(r)
        : (r.local ? fut : uut)(r, o, e),
  )
}
function gut(t, e) {
  return function (r) {
    this.setAttribute(t, e.call(this, r))
  }
}
function vut(t, e) {
  return function (r) {
    this.setAttributeNS(t.space, t.local, e.call(this, r))
  }
}
function mut(t, e) {
  var r, o
  function a() {
    var u = e.apply(this, arguments)
    return u !== o && (r = (o = u) && vut(t, u)), r
  }
  return (a._value = e), a
}
function yut(t, e) {
  var r, o
  function a() {
    var u = e.apply(this, arguments)
    return u !== o && (r = (o = u) && gut(t, u)), r
  }
  return (a._value = e), a
}
function but(t, e) {
  var r = "attr." + t
  if (arguments.length < 2) return (r = this.tween(r)) && r._value
  if (e == null) return this.tween(r, null)
  if (typeof e != "function") throw new Error()
  var o = Ic(t)
  return this.tween(r, (o.local ? mut : yut)(o, e))
}
function wut(t, e) {
  return function () {
    Vh(this, t).delay = +e.apply(this, arguments)
  }
}
function xut(t, e) {
  return (
    (e = +e),
    function () {
      Vh(this, t).delay = e
    }
  )
}
function _ut(t) {
  var e = this._id
  return arguments.length
    ? this.each((typeof t == "function" ? wut : xut)(e, t))
    : rr(this.node(), e).delay
}
function Sut(t, e) {
  return function () {
    wr(this, t).duration = +e.apply(this, arguments)
  }
}
function kut(t, e) {
  return (
    (e = +e),
    function () {
      wr(this, t).duration = e
    }
  )
}
function Cut(t) {
  var e = this._id
  return arguments.length
    ? this.each((typeof t == "function" ? Sut : kut)(e, t))
    : rr(this.node(), e).duration
}
function Tut(t, e) {
  if (typeof e != "function") throw new Error()
  return function () {
    wr(this, t).ease = e
  }
}
function Eut(t) {
  var e = this._id
  return arguments.length ? this.each(Tut(e, t)) : rr(this.node(), e).ease
}
function Lut(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    if (typeof r != "function") throw new Error()
    wr(this, t).ease = r
  }
}
function Aut(t) {
  if (typeof t != "function") throw new Error()
  return this.each(Lut(this._id, t))
}
function Mut(t) {
  typeof t != "function" && (t = Hy(t))
  for (var e = this._groups, r = e.length, o = new Array(r), a = 0; a < r; ++a)
    for (var u = e[a], f = u.length, h = (o[a] = []), p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p)
  return new Gr(o, this._parents, this._name, this._id)
}
function Nut(t) {
  if (t._id !== this._id) throw new Error()
  for (
    var e = this._groups,
      r = t._groups,
      o = e.length,
      a = r.length,
      u = Math.min(o, a),
      f = new Array(o),
      h = 0;
    h < u;
    ++h
  )
    for (
      var p = e[h], g = r[h], v = p.length, b = (f[h] = new Array(v)), w, S = 0;
      S < v;
      ++S
    )
      (w = p[S] || g[S]) && (b[S] = w)
  for (; h < o; ++h) f[h] = e[h]
  return new Gr(f, this._parents, this._name, this._id)
}
function Put(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (e) {
      var r = e.indexOf(".")
      return r >= 0 && (e = e.slice(0, r)), !e || e === "start"
    })
}
function Out(t, e, r) {
  var o,
    a,
    u = Put(e) ? Vh : wr
  return function () {
    var f = u(this, t),
      h = f.on
    h !== o && (a = (o = h).copy()).on(e, r), (f.on = a)
  }
}
function Dut(t, e) {
  var r = this._id
  return arguments.length < 2
    ? rr(this.node(), r).on.on(t)
    : this.each(Out(r, t, e))
}
function $ut(t) {
  return function () {
    var e = this.parentNode
    for (var r in this.__transition) if (+r !== t) return
    e && e.removeChild(this)
  }
}
function Rut() {
  return this.on("end.remove", $ut(this._id))
}
function zut(t) {
  var e = this._name,
    r = this._id
  typeof t != "function" && (t = Bh(t))
  for (var o = this._groups, a = o.length, u = new Array(a), f = 0; f < a; ++f)
    for (
      var h = o[f], p = h.length, g = (u[f] = new Array(p)), v, b, w = 0;
      w < p;
      ++w
    )
      (v = h[w]) &&
        (b = t.call(v, v.__data__, w, h)) &&
        ("__data__" in v && (b.__data__ = v.__data__),
        (g[w] = b),
        Hc(g[w], e, r, w, g, rr(v, r)))
  return new Gr(u, this._parents, e, r)
}
function Fut(t) {
  var e = this._name,
    r = this._id
  typeof t != "function" && (t = qy(t))
  for (var o = this._groups, a = o.length, u = [], f = [], h = 0; h < a; ++h)
    for (var p = o[h], g = p.length, v, b = 0; b < g; ++b)
      if ((v = p[b])) {
        for (
          var w = t.call(v, v.__data__, b, p),
            S,
            N = rr(v, r),
            L = 0,
            A = w.length;
          L < A;
          ++L
        )
          (S = w[L]) && Hc(S, e, r, L, w, N)
        u.push(w), f.push(v)
      }
  return new Gr(u, f, e, r)
}
var Iut = Pl.prototype.constructor
function qut() {
  return new Iut(this._groups, this._parents)
}
function Hut(t, e) {
  var r, o, a
  return function () {
    var u = os(this, t),
      f = (this.style.removeProperty(t), os(this, t))
    return u === f ? null : u === r && f === o ? a : (a = e((r = u), (o = f)))
  }
}
function cb(t) {
  return function () {
    this.style.removeProperty(t)
  }
}
function But(t, e, r) {
  var o,
    a = r + "",
    u
  return function () {
    var f = os(this, t)
    return f === a ? null : f === o ? u : (u = e((o = f), r))
  }
}
function Wut(t, e, r) {
  var o, a, u
  return function () {
    var f = os(this, t),
      h = r(this),
      p = h + ""
    return (
      h == null && (p = h = (this.style.removeProperty(t), os(this, t))),
      f === p ? null : f === o && p === a ? u : ((a = p), (u = e((o = f), h)))
    )
  }
}
function Uut(t, e) {
  var r,
    o,
    a,
    u = "style." + e,
    f = "end." + u,
    h
  return function () {
    var p = wr(this, t),
      g = p.on,
      v = p.value[u] == null ? h || (h = cb(e)) : void 0
    ;(g !== r || a !== v) && (o = (r = g).copy()).on(f, (a = v)), (p.on = o)
  }
}
function jut(t, e, r) {
  var o = (t += "") == "transform" ? jct : ab
  return e == null
    ? this.styleTween(t, Hut(t, o)).on("end.style." + t, cb(t))
    : typeof e == "function"
      ? this.styleTween(t, Wut(t, o, Kh(this, "style." + t, e))).each(
          Uut(this._id, t),
        )
      : this.styleTween(t, But(t, o, e), r).on("end.style." + t, null)
}
function Gut(t, e, r) {
  return function (o) {
    this.style.setProperty(t, e.call(this, o), r)
  }
}
function Vut(t, e, r) {
  var o, a
  function u() {
    var f = e.apply(this, arguments)
    return f !== a && (o = (a = f) && Gut(t, f, r)), o
  }
  return (u._value = e), u
}
function Kut(t, e, r) {
  var o = "style." + (t += "")
  if (arguments.length < 2) return (o = this.tween(o)) && o._value
  if (e == null) return this.tween(o, null)
  if (typeof e != "function") throw new Error()
  return this.tween(o, Vut(t, e, r ?? ""))
}
function Xut(t) {
  return function () {
    this.textContent = t
  }
}
function Yut(t) {
  return function () {
    var e = t(this)
    this.textContent = e ?? ""
  }
}
function Zut(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Yut(Kh(this, "text", t))
      : Xut(t == null ? "" : t + ""),
  )
}
function Jut(t) {
  return function (e) {
    this.textContent = t.call(this, e)
  }
}
function Qut(t) {
  var e, r
  function o() {
    var a = t.apply(this, arguments)
    return a !== r && (e = (r = a) && Jut(a)), e
  }
  return (o._value = t), o
}
function tft(t) {
  var e = "text"
  if (arguments.length < 1) return (e = this.tween(e)) && e._value
  if (t == null) return this.tween(e, null)
  if (typeof t != "function") throw new Error()
  return this.tween(e, Qut(t))
}
function eft() {
  for (
    var t = this._name,
      e = this._id,
      r = ub(),
      o = this._groups,
      a = o.length,
      u = 0;
    u < a;
    ++u
  )
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      if ((p = f[g])) {
        var v = rr(p, e)
        Hc(p, t, r, g, f, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease,
        })
      }
  return new Gr(o, this._parents, t, r)
}
function nft() {
  var t,
    e,
    r = this,
    o = r._id,
    a = r.size()
  return new Promise(function (u, f) {
    var h = { value: f },
      p = {
        value: function () {
          --a === 0 && u()
        },
      }
    r.each(function () {
      var g = wr(this, o),
        v = g.on
      v !== t &&
        ((e = (t = v).copy()),
        e._.cancel.push(h),
        e._.interrupt.push(h),
        e._.end.push(p)),
        (g.on = e)
    }),
      a === 0 && u()
  })
}
var rft = 0
function Gr(t, e, r, o) {
  ;(this._groups = t), (this._parents = e), (this._name = r), (this._id = o)
}
function ub() {
  return ++rft
}
var Or = Pl.prototype
Gr.prototype = {
  constructor: Gr,
  select: zut,
  selectAll: Fut,
  selectChild: Or.selectChild,
  selectChildren: Or.selectChildren,
  filter: Mut,
  merge: Nut,
  selection: qut,
  transition: eft,
  call: Or.call,
  nodes: Or.nodes,
  node: Or.node,
  size: Or.size,
  empty: Or.empty,
  each: Or.each,
  on: Dut,
  attr: put,
  attrTween: but,
  style: jut,
  styleTween: Kut,
  text: Zut,
  textTween: tft,
  remove: Rut,
  tween: lut,
  delay: _ut,
  duration: Cut,
  ease: Eut,
  easeVarying: Aut,
  end: nft,
  [Symbol.iterator]: Or[Symbol.iterator],
}
function ift(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}
var oft = { time: null, delay: 0, duration: 250, ease: ift }
function sft(t, e) {
  for (var r; !(r = t.__transition) || !(r = r[e]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`)
  return r
}
function lft(t) {
  var e, r
  t instanceof Gr
    ? ((e = t._id), (t = t._name))
    : ((e = ub()), ((r = oft).time = jh()), (t = t == null ? null : t + ""))
  for (var o = this._groups, a = o.length, u = 0; u < a; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && Hc(p, t, e, g, f, r || sft(p, e))
  return new Gr(o, this._parents, t, e)
}
Pl.prototype.interrupt = iut
Pl.prototype.transition = lft
const Ma = (t) => () => t
function aft(t, { sourceEvent: e, target: r, transform: o, dispatch: a }) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: a },
  })
}
function zr(t, e, r) {
  ;(this.k = t), (this.x = e), (this.y = r)
}
zr.prototype = {
  constructor: zr,
  scale: function (t) {
    return t === 1 ? this : new zr(this.k * t, this.x, this.y)
  },
  translate: function (t, e) {
    return (t === 0) & (e === 0)
      ? this
      : new zr(this.k, this.x + this.k * t, this.y + this.k * e)
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y]
  },
  applyX: function (t) {
    return t * this.k + this.x
  },
  applyY: function (t) {
    return t * this.k + this.y
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
  },
  invertX: function (t) {
    return (t - this.x) / this.k
  },
  invertY: function (t) {
    return (t - this.y) / this.k
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
  },
}
var Xh = new zr(1, 0, 0)
zr.prototype
function of(t) {
  t.stopImmediatePropagation()
}
function Xs(t) {
  t.preventDefault(), t.stopImmediatePropagation()
}
function cft(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button
}
function uft() {
  var t = this
  return t instanceof SVGElement
    ? ((t = t.ownerSVGElement || t),
      t.hasAttribute("viewBox")
        ? ((t = t.viewBox.baseVal),
          [
            [t.x, t.y],
            [t.x + t.width, t.y + t.height],
          ])
        : [
            [0, 0],
            [t.width.baseVal.value, t.height.baseVal.value],
          ])
    : [
        [0, 0],
        [t.clientWidth, t.clientHeight],
      ]
}
function tm() {
  return this.__zoom || Xh
}
function fft(t) {
  return (
    -t.deltaY *
    (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 0.002) *
    (t.ctrlKey ? 10 : 1)
  )
}
function hft() {
  return navigator.maxTouchPoints || "ontouchstart" in this
}
function dft(t, e, r) {
  var o = t.invertX(e[0][0]) - r[0][0],
    a = t.invertX(e[1][0]) - r[1][0],
    u = t.invertY(e[0][1]) - r[0][1],
    f = t.invertY(e[1][1]) - r[1][1]
  return t.translate(
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a),
    f > u ? (u + f) / 2 : Math.min(0, u) || Math.max(0, f),
  )
}
function pft() {
  var t = cft,
    e = uft,
    r = dft,
    o = fft,
    a = hft,
    u = [0, 1 / 0],
    f = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    h = 250,
    p = Yct,
    g = Ol("start", "zoom", "end"),
    v,
    b,
    w,
    S = 500,
    N = 150,
    L = 0,
    A = 10
  function T(z) {
    z.property("__zoom", tm)
      .on("wheel.zoom", Y, { passive: !1 })
      .on("mousedown.zoom", et)
      .on("dblclick.zoom", st)
      .filter(a)
      .on("touchstart.zoom", dt)
      .on("touchmove.zoom", pt)
      .on("touchend.zoom touchcancel.zoom", V)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
  }
  ;(T.transform = function (z, k, q, B) {
    var Q = z.selection ? z.selection() : z
    Q.property("__zoom", tm),
      z !== Q
        ? W(z, k, q, B)
        : Q.interrupt().each(function () {
            X(this, arguments)
              .event(B)
              .start()
              .zoom(null, typeof k == "function" ? k.apply(this, arguments) : k)
              .end()
          })
  }),
    (T.scaleBy = function (z, k, q, B) {
      T.scaleTo(
        z,
        function () {
          var Q = this.__zoom.k,
            mt = typeof k == "function" ? k.apply(this, arguments) : k
          return Q * mt
        },
        q,
        B,
      )
    }),
    (T.scaleTo = function (z, k, q, B) {
      T.transform(
        z,
        function () {
          var Q = e.apply(this, arguments),
            mt = this.__zoom,
            Et =
              q == null
                ? E(Q)
                : typeof q == "function"
                  ? q.apply(this, arguments)
                  : q,
            It = mt.invert(Et),
            Bt = typeof k == "function" ? k.apply(this, arguments) : k
          return r(R(M(mt, Bt), Et, It), Q, f)
        },
        q,
        B,
      )
    }),
    (T.translateBy = function (z, k, q, B) {
      T.transform(
        z,
        function () {
          return r(
            this.__zoom.translate(
              typeof k == "function" ? k.apply(this, arguments) : k,
              typeof q == "function" ? q.apply(this, arguments) : q,
            ),
            e.apply(this, arguments),
            f,
          )
        },
        null,
        B,
      )
    }),
    (T.translateTo = function (z, k, q, B, Q) {
      T.transform(
        z,
        function () {
          var mt = e.apply(this, arguments),
            Et = this.__zoom,
            It =
              B == null
                ? E(mt)
                : typeof B == "function"
                  ? B.apply(this, arguments)
                  : B
          return r(
            Xh.translate(It[0], It[1])
              .scale(Et.k)
              .translate(
                typeof k == "function" ? -k.apply(this, arguments) : -k,
                typeof q == "function" ? -q.apply(this, arguments) : -q,
              ),
            mt,
            f,
          )
        },
        B,
        Q,
      )
    })
  function M(z, k) {
    return (
      (k = Math.max(u[0], Math.min(u[1], k))),
      k === z.k ? z : new zr(k, z.x, z.y)
    )
  }
  function R(z, k, q) {
    var B = k[0] - q[0] * z.k,
      Q = k[1] - q[1] * z.k
    return B === z.x && Q === z.y ? z : new zr(z.k, B, Q)
  }
  function E(z) {
    return [(+z[0][0] + +z[1][0]) / 2, (+z[0][1] + +z[1][1]) / 2]
  }
  function W(z, k, q, B) {
    z.on("start.zoom", function () {
      X(this, arguments).event(B).start()
    })
      .on("interrupt.zoom end.zoom", function () {
        X(this, arguments).event(B).end()
      })
      .tween("zoom", function () {
        var Q = this,
          mt = arguments,
          Et = X(Q, mt).event(B),
          It = e.apply(Q, mt),
          Bt = q == null ? E(It) : typeof q == "function" ? q.apply(Q, mt) : q,
          Ut = Math.max(It[1][0] - It[0][0], It[1][1] - It[0][1]),
          Xt = Q.__zoom,
          Kt = typeof k == "function" ? k.apply(Q, mt) : k,
          St = p(
            Xt.invert(Bt).concat(Ut / Xt.k),
            Kt.invert(Bt).concat(Ut / Kt.k),
          )
        return function (j) {
          if (j === 1) j = Kt
          else {
            var nt = St(j),
              rt = Ut / nt[2]
            j = new zr(rt, Bt[0] - nt[0] * rt, Bt[1] - nt[1] * rt)
          }
          Et.zoom(null, j)
        }
      })
  }
  function X(z, k, q) {
    return (!q && z.__zooming) || new ft(z, k)
  }
  function ft(z, k) {
    ;(this.that = z),
      (this.args = k),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = e.apply(z, k)),
      (this.taps = 0)
  }
  ft.prototype = {
    event: function (z) {
      return z && (this.sourceEvent = z), this
    },
    start: function () {
      return (
        ++this.active === 1 &&
          ((this.that.__zooming = this), this.emit("start")),
        this
      )
    },
    zoom: function (z, k) {
      return (
        this.mouse &&
          z !== "mouse" &&
          (this.mouse[1] = k.invert(this.mouse[0])),
        this.touch0 &&
          z !== "touch" &&
          (this.touch0[1] = k.invert(this.touch0[0])),
        this.touch1 &&
          z !== "touch" &&
          (this.touch1[1] = k.invert(this.touch1[0])),
        (this.that.__zoom = k),
        this.emit("zoom"),
        this
      )
    },
    end: function () {
      return (
        --this.active === 0 && (delete this.that.__zooming, this.emit("end")),
        this
      )
    },
    emit: function (z) {
      var k = Tn(this.that).datum()
      g.call(
        z,
        this.that,
        new aft(z, {
          sourceEvent: this.sourceEvent,
          target: T,
          type: z,
          transform: this.that.__zoom,
          dispatch: g,
        }),
        k,
      )
    },
  }
  function Y(z, ...k) {
    if (!t.apply(this, arguments)) return
    var q = X(this, k).event(z),
      B = this.__zoom,
      Q = Math.max(
        u[0],
        Math.min(u[1], B.k * Math.pow(2, o.apply(this, arguments))),
      ),
      mt = $r(z)
    if (q.wheel)
      (q.mouse[0][0] !== mt[0] || q.mouse[0][1] !== mt[1]) &&
        (q.mouse[1] = B.invert((q.mouse[0] = mt))),
        clearTimeout(q.wheel)
    else {
      if (B.k === Q) return
      ;(q.mouse = [mt, B.invert(mt)]), Wa(this), q.start()
    }
    Xs(z),
      (q.wheel = setTimeout(Et, N)),
      q.zoom("mouse", r(R(M(B, Q), q.mouse[0], q.mouse[1]), q.extent, f))
    function Et() {
      ;(q.wheel = null), q.end()
    }
  }
  function et(z, ...k) {
    if (w || !t.apply(this, arguments)) return
    var q = z.currentTarget,
      B = X(this, k, !0).event(z),
      Q = Tn(z.view).on("mousemove.zoom", Bt, !0).on("mouseup.zoom", Ut, !0),
      mt = $r(z, q),
      Et = z.clientX,
      It = z.clientY
    Zy(z.view),
      of(z),
      (B.mouse = [mt, this.__zoom.invert(mt)]),
      Wa(this),
      B.start()
    function Bt(Xt) {
      if ((Xs(Xt), !B.moved)) {
        var Kt = Xt.clientX - Et,
          St = Xt.clientY - It
        B.moved = Kt * Kt + St * St > L
      }
      B.event(Xt).zoom(
        "mouse",
        r(R(B.that.__zoom, (B.mouse[0] = $r(Xt, q)), B.mouse[1]), B.extent, f),
      )
    }
    function Ut(Xt) {
      Q.on("mousemove.zoom mouseup.zoom", null),
        Jy(Xt.view, B.moved),
        Xs(Xt),
        B.event(Xt).end()
    }
  }
  function st(z, ...k) {
    if (t.apply(this, arguments)) {
      var q = this.__zoom,
        B = $r(z.changedTouches ? z.changedTouches[0] : z, this),
        Q = q.invert(B),
        mt = q.k * (z.shiftKey ? 0.5 : 2),
        Et = r(R(M(q, mt), B, Q), e.apply(this, k), f)
      Xs(z),
        h > 0
          ? Tn(this).transition().duration(h).call(W, Et, B, z)
          : Tn(this).call(T.transform, Et, B, z)
    }
  }
  function dt(z, ...k) {
    if (t.apply(this, arguments)) {
      var q = z.touches,
        B = q.length,
        Q = X(this, k, z.changedTouches.length === B).event(z),
        mt,
        Et,
        It,
        Bt
      for (of(z), Et = 0; Et < B; ++Et)
        (It = q[Et]),
          (Bt = $r(It, this)),
          (Bt = [Bt, this.__zoom.invert(Bt), It.identifier]),
          Q.touch0
            ? !Q.touch1 &&
              Q.touch0[2] !== Bt[2] &&
              ((Q.touch1 = Bt), (Q.taps = 0))
            : ((Q.touch0 = Bt), (mt = !0), (Q.taps = 1 + !!v))
      v && (v = clearTimeout(v)),
        mt &&
          (Q.taps < 2 &&
            ((b = Bt[0]),
            (v = setTimeout(function () {
              v = null
            }, S))),
          Wa(this),
          Q.start())
    }
  }
  function pt(z, ...k) {
    if (this.__zooming) {
      var q = X(this, k).event(z),
        B = z.changedTouches,
        Q = B.length,
        mt,
        Et,
        It,
        Bt
      for (Xs(z), mt = 0; mt < Q; ++mt)
        (Et = B[mt]),
          (It = $r(Et, this)),
          q.touch0 && q.touch0[2] === Et.identifier
            ? (q.touch0[0] = It)
            : q.touch1 && q.touch1[2] === Et.identifier && (q.touch1[0] = It)
      if (((Et = q.that.__zoom), q.touch1)) {
        var Ut = q.touch0[0],
          Xt = q.touch0[1],
          Kt = q.touch1[0],
          St = q.touch1[1],
          j = (j = Kt[0] - Ut[0]) * j + (j = Kt[1] - Ut[1]) * j,
          nt = (nt = St[0] - Xt[0]) * nt + (nt = St[1] - Xt[1]) * nt
        ;(Et = M(Et, Math.sqrt(j / nt))),
          (It = [(Ut[0] + Kt[0]) / 2, (Ut[1] + Kt[1]) / 2]),
          (Bt = [(Xt[0] + St[0]) / 2, (Xt[1] + St[1]) / 2])
      } else if (q.touch0) (It = q.touch0[0]), (Bt = q.touch0[1])
      else return
      q.zoom("touch", r(R(Et, It, Bt), q.extent, f))
    }
  }
  function V(z, ...k) {
    if (this.__zooming) {
      var q = X(this, k).event(z),
        B = z.changedTouches,
        Q = B.length,
        mt,
        Et
      for (
        of(z),
          w && clearTimeout(w),
          w = setTimeout(function () {
            w = null
          }, S),
          mt = 0;
        mt < Q;
        ++mt
      )
        (Et = B[mt]),
          q.touch0 && q.touch0[2] === Et.identifier
            ? delete q.touch0
            : q.touch1 && q.touch1[2] === Et.identifier && delete q.touch1
      if (
        (q.touch1 && !q.touch0 && ((q.touch0 = q.touch1), delete q.touch1),
        q.touch0)
      )
        q.touch0[1] = this.__zoom.invert(q.touch0[0])
      else if (
        (q.end(),
        q.taps === 2 &&
          ((Et = $r(Et, this)), Math.hypot(b[0] - Et[0], b[1] - Et[1]) < A))
      ) {
        var It = Tn(this).on("dblclick.zoom")
        It && It.apply(this, arguments)
      }
    }
  }
  return (
    (T.wheelDelta = function (z) {
      return arguments.length
        ? ((o = typeof z == "function" ? z : Ma(+z)), T)
        : o
    }),
    (T.filter = function (z) {
      return arguments.length
        ? ((t = typeof z == "function" ? z : Ma(!!z)), T)
        : t
    }),
    (T.touchable = function (z) {
      return arguments.length
        ? ((a = typeof z == "function" ? z : Ma(!!z)), T)
        : a
    }),
    (T.extent = function (z) {
      return arguments.length
        ? ((e =
            typeof z == "function"
              ? z
              : Ma([
                  [+z[0][0], +z[0][1]],
                  [+z[1][0], +z[1][1]],
                ])),
          T)
        : e
    }),
    (T.scaleExtent = function (z) {
      return arguments.length
        ? ((u[0] = +z[0]), (u[1] = +z[1]), T)
        : [u[0], u[1]]
    }),
    (T.translateExtent = function (z) {
      return arguments.length
        ? ((f[0][0] = +z[0][0]),
          (f[1][0] = +z[1][0]),
          (f[0][1] = +z[0][1]),
          (f[1][1] = +z[1][1]),
          T)
        : [
            [f[0][0], f[0][1]],
            [f[1][0], f[1][1]],
          ]
    }),
    (T.constrain = function (z) {
      return arguments.length ? ((r = z), T) : r
    }),
    (T.duration = function (z) {
      return arguments.length ? ((h = +z), T) : h
    }),
    (T.interpolate = function (z) {
      return arguments.length ? ((p = z), T) : p
    }),
    (T.on = function () {
      var z = g.on.apply(g, arguments)
      return z === g ? T : z
    }),
    (T.clickDistance = function (z) {
      return arguments.length ? ((L = (z = +z) * z), T) : Math.sqrt(L)
    }),
    (T.tapDistance = function (z) {
      return arguments.length ? ((A = +z), T) : A
    }),
    T
  )
}
function gft(t) {
  const e = +this._x.call(null, t),
    r = +this._y.call(null, t)
  return fb(this.cover(e, r), e, r, t)
}
function fb(t, e, r, o) {
  if (isNaN(e) || isNaN(r)) return t
  var a,
    u = t._root,
    f = { data: o },
    h = t._x0,
    p = t._y0,
    g = t._x1,
    v = t._y1,
    b,
    w,
    S,
    N,
    L,
    A,
    T,
    M
  if (!u) return (t._root = f), t
  for (; u.length; )
    if (
      ((L = e >= (b = (h + g) / 2)) ? (h = b) : (g = b),
      (A = r >= (w = (p + v) / 2)) ? (p = w) : (v = w),
      (a = u),
      !(u = u[(T = (A << 1) | L)]))
    )
      return (a[T] = f), t
  if (
    ((S = +t._x.call(null, u.data)),
    (N = +t._y.call(null, u.data)),
    e === S && r === N)
  )
    return (f.next = u), a ? (a[T] = f) : (t._root = f), t
  do
    (a = a ? (a[T] = new Array(4)) : (t._root = new Array(4))),
      (L = e >= (b = (h + g) / 2)) ? (h = b) : (g = b),
      (A = r >= (w = (p + v) / 2)) ? (p = w) : (v = w)
  while ((T = (A << 1) | L) === (M = ((N >= w) << 1) | (S >= b)))
  return (a[M] = u), (a[T] = f), t
}
function vft(t) {
  var e,
    r,
    o = t.length,
    a,
    u,
    f = new Array(o),
    h = new Array(o),
    p = 1 / 0,
    g = 1 / 0,
    v = -1 / 0,
    b = -1 / 0
  for (r = 0; r < o; ++r)
    isNaN((a = +this._x.call(null, (e = t[r])))) ||
      isNaN((u = +this._y.call(null, e))) ||
      ((f[r] = a),
      (h[r] = u),
      a < p && (p = a),
      a > v && (v = a),
      u < g && (g = u),
      u > b && (b = u))
  if (p > v || g > b) return this
  for (this.cover(p, g).cover(v, b), r = 0; r < o; ++r)
    fb(this, f[r], h[r], t[r])
  return this
}
function mft(t, e) {
  if (isNaN((t = +t)) || isNaN((e = +e))) return this
  var r = this._x0,
    o = this._y0,
    a = this._x1,
    u = this._y1
  if (isNaN(r)) (a = (r = Math.floor(t)) + 1), (u = (o = Math.floor(e)) + 1)
  else {
    for (
      var f = a - r || 1, h = this._root, p, g;
      r > t || t >= a || o > e || e >= u;

    )
      switch (
        ((g = ((e < o) << 1) | (t < r)),
        (p = new Array(4)),
        (p[g] = h),
        (h = p),
        (f *= 2),
        g)
      ) {
        case 0:
          ;(a = r + f), (u = o + f)
          break
        case 1:
          ;(r = a - f), (u = o + f)
          break
        case 2:
          ;(a = r + f), (o = u - f)
          break
        case 3:
          ;(r = a - f), (o = u - f)
          break
      }
    this._root && this._root.length && (this._root = h)
  }
  return (this._x0 = r), (this._y0 = o), (this._x1 = a), (this._y1 = u), this
}
function yft() {
  var t = []
  return (
    this.visit(function (e) {
      if (!e.length)
        do t.push(e.data)
        while ((e = e.next))
    }),
    t
  )
}
function bft(t) {
  return arguments.length
    ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
    : isNaN(this._x0)
      ? void 0
      : [
          [this._x0, this._y0],
          [this._x1, this._y1],
        ]
}
function gn(t, e, r, o, a) {
  ;(this.node = t), (this.x0 = e), (this.y0 = r), (this.x1 = o), (this.y1 = a)
}
function wft(t, e, r) {
  var o,
    a = this._x0,
    u = this._y0,
    f,
    h,
    p,
    g,
    v = this._x1,
    b = this._y1,
    w = [],
    S = this._root,
    N,
    L
  for (
    S && w.push(new gn(S, a, u, v, b)),
      r == null
        ? (r = 1 / 0)
        : ((a = t - r), (u = e - r), (v = t + r), (b = e + r), (r *= r));
    (N = w.pop());

  )
    if (
      !(
        !(S = N.node) ||
        (f = N.x0) > v ||
        (h = N.y0) > b ||
        (p = N.x1) < a ||
        (g = N.y1) < u
      )
    )
      if (S.length) {
        var A = (f + p) / 2,
          T = (h + g) / 2
        w.push(
          new gn(S[3], A, T, p, g),
          new gn(S[2], f, T, A, g),
          new gn(S[1], A, h, p, T),
          new gn(S[0], f, h, A, T),
        ),
          (L = ((e >= T) << 1) | (t >= A)) &&
            ((N = w[w.length - 1]),
            (w[w.length - 1] = w[w.length - 1 - L]),
            (w[w.length - 1 - L] = N))
      } else {
        var M = t - +this._x.call(null, S.data),
          R = e - +this._y.call(null, S.data),
          E = M * M + R * R
        if (E < r) {
          var W = Math.sqrt((r = E))
          ;(a = t - W), (u = e - W), (v = t + W), (b = e + W), (o = S.data)
        }
      }
  return o
}
function xft(t) {
  if (
    isNaN((v = +this._x.call(null, t))) ||
    isNaN((b = +this._y.call(null, t)))
  )
    return this
  var e,
    r = this._root,
    o,
    a,
    u,
    f = this._x0,
    h = this._y0,
    p = this._x1,
    g = this._y1,
    v,
    b,
    w,
    S,
    N,
    L,
    A,
    T
  if (!r) return this
  if (r.length)
    for (;;) {
      if (
        ((N = v >= (w = (f + p) / 2)) ? (f = w) : (p = w),
        (L = b >= (S = (h + g) / 2)) ? (h = S) : (g = S),
        (e = r),
        !(r = r[(A = (L << 1) | N)]))
      )
        return this
      if (!r.length) break
      ;(e[(A + 1) & 3] || e[(A + 2) & 3] || e[(A + 3) & 3]) &&
        ((o = e), (T = A))
    }
  for (; r.data !== t; ) if (((a = r), !(r = r.next))) return this
  return (
    (u = r.next) && delete r.next,
    a
      ? (u ? (a.next = u) : delete a.next, this)
      : e
        ? (u ? (e[A] = u) : delete e[A],
          (r = e[0] || e[1] || e[2] || e[3]) &&
            r === (e[3] || e[2] || e[1] || e[0]) &&
            !r.length &&
            (o ? (o[T] = r) : (this._root = r)),
          this)
        : ((this._root = u), this)
  )
}
function _ft(t) {
  for (var e = 0, r = t.length; e < r; ++e) this.remove(t[e])
  return this
}
function Sft() {
  return this._root
}
function kft() {
  var t = 0
  return (
    this.visit(function (e) {
      if (!e.length)
        do ++t
        while ((e = e.next))
    }),
    t
  )
}
function Cft(t) {
  var e = [],
    r,
    o = this._root,
    a,
    u,
    f,
    h,
    p
  for (
    o && e.push(new gn(o, this._x0, this._y0, this._x1, this._y1));
    (r = e.pop());

  )
    if (
      !t((o = r.node), (u = r.x0), (f = r.y0), (h = r.x1), (p = r.y1)) &&
      o.length
    ) {
      var g = (u + h) / 2,
        v = (f + p) / 2
      ;(a = o[3]) && e.push(new gn(a, g, v, h, p)),
        (a = o[2]) && e.push(new gn(a, u, v, g, p)),
        (a = o[1]) && e.push(new gn(a, g, f, h, v)),
        (a = o[0]) && e.push(new gn(a, u, f, g, v))
    }
  return this
}
function Tft(t) {
  var e = [],
    r = [],
    o
  for (
    this._root &&
    e.push(new gn(this._root, this._x0, this._y0, this._x1, this._y1));
    (o = e.pop());

  ) {
    var a = o.node
    if (a.length) {
      var u,
        f = o.x0,
        h = o.y0,
        p = o.x1,
        g = o.y1,
        v = (f + p) / 2,
        b = (h + g) / 2
      ;(u = a[0]) && e.push(new gn(u, f, h, v, b)),
        (u = a[1]) && e.push(new gn(u, v, h, p, b)),
        (u = a[2]) && e.push(new gn(u, f, b, v, g)),
        (u = a[3]) && e.push(new gn(u, v, b, p, g))
    }
    r.push(o)
  }
  for (; (o = r.pop()); ) t(o.node, o.x0, o.y0, o.x1, o.y1)
  return this
}
function Eft(t) {
  return t[0]
}
function Lft(t) {
  return arguments.length ? ((this._x = t), this) : this._x
}
function Aft(t) {
  return t[1]
}
function Mft(t) {
  return arguments.length ? ((this._y = t), this) : this._y
}
function Yh(t, e, r) {
  var o = new Zh(e ?? Eft, r ?? Aft, NaN, NaN, NaN, NaN)
  return t == null ? o : o.addAll(t)
}
function Zh(t, e, r, o, a, u) {
  ;(this._x = t),
    (this._y = e),
    (this._x0 = r),
    (this._y0 = o),
    (this._x1 = a),
    (this._y1 = u),
    (this._root = void 0)
}
function em(t) {
  for (var e = { data: t.data }, r = e; (t = t.next); )
    r = r.next = { data: t.data }
  return e
}
var yn = (Yh.prototype = Zh.prototype)
yn.copy = function () {
  var t = new Zh(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
    e = this._root,
    r,
    o
  if (!e) return t
  if (!e.length) return (t._root = em(e)), t
  for (r = [{ source: e, target: (t._root = new Array(4)) }]; (e = r.pop()); )
    for (var a = 0; a < 4; ++a)
      (o = e.source[a]) &&
        (o.length
          ? r.push({ source: o, target: (e.target[a] = new Array(4)) })
          : (e.target[a] = em(o)))
  return t
}
yn.add = gft
yn.addAll = vft
yn.cover = mft
yn.data = yft
yn.extent = bft
yn.find = wft
yn.remove = xft
yn.removeAll = _ft
yn.root = Sft
yn.size = kft
yn.visit = Cft
yn.visitAfter = Tft
yn.x = Lft
yn.y = Mft
function vn(t) {
  return function () {
    return t
  }
}
function bi(t) {
  return (t() - 0.5) * 1e-6
}
function Nft(t) {
  return t.x + t.vx
}
function Pft(t) {
  return t.y + t.vy
}
function Oft(t) {
  var e,
    r,
    o,
    a = 1,
    u = 1
  typeof t != "function" && (t = vn(t == null ? 1 : +t))
  function f() {
    for (var g, v = e.length, b, w, S, N, L, A, T = 0; T < u; ++T)
      for (b = Yh(e, Nft, Pft).visitAfter(h), g = 0; g < v; ++g)
        (w = e[g]),
          (L = r[w.index]),
          (A = L * L),
          (S = w.x + w.vx),
          (N = w.y + w.vy),
          b.visit(M)
    function M(R, E, W, X, ft) {
      var Y = R.data,
        et = R.r,
        st = L + et
      if (Y) {
        if (Y.index > w.index) {
          var dt = S - Y.x - Y.vx,
            pt = N - Y.y - Y.vy,
            V = dt * dt + pt * pt
          V < st * st &&
            (dt === 0 && ((dt = bi(o)), (V += dt * dt)),
            pt === 0 && ((pt = bi(o)), (V += pt * pt)),
            (V = ((st - (V = Math.sqrt(V))) / V) * a),
            (w.vx += (dt *= V) * (st = (et *= et) / (A + et))),
            (w.vy += (pt *= V) * st),
            (Y.vx -= dt * (st = 1 - st)),
            (Y.vy -= pt * st))
        }
        return
      }
      return E > S + st || X < S - st || W > N + st || ft < N - st
    }
  }
  function h(g) {
    if (g.data) return (g.r = r[g.data.index])
    for (var v = (g.r = 0); v < 4; ++v) g[v] && g[v].r > g.r && (g.r = g[v].r)
  }
  function p() {
    if (e) {
      var g,
        v = e.length,
        b
      for (r = new Array(v), g = 0; g < v; ++g)
        (b = e[g]), (r[b.index] = +t(b, g, e))
    }
  }
  return (
    (f.initialize = function (g, v) {
      ;(e = g), (o = v), p()
    }),
    (f.iterations = function (g) {
      return arguments.length ? ((u = +g), f) : u
    }),
    (f.strength = function (g) {
      return arguments.length ? ((a = +g), f) : a
    }),
    (f.radius = function (g) {
      return arguments.length
        ? ((t = typeof g == "function" ? g : vn(+g)), p(), f)
        : t
    }),
    f
  )
}
function Dft(t) {
  return t.index
}
function nm(t, e) {
  var r = t.get(e)
  if (!r) throw new Error("node not found: " + e)
  return r
}
function $ft(t) {
  var e = Dft,
    r = b,
    o,
    a = vn(30),
    u,
    f,
    h,
    p,
    g,
    v = 1
  t == null && (t = [])
  function b(A) {
    return 1 / Math.min(h[A.source.index], h[A.target.index])
  }
  function w(A) {
    for (var T = 0, M = t.length; T < v; ++T)
      for (var R = 0, E, W, X, ft, Y, et, st; R < M; ++R)
        (E = t[R]),
          (W = E.source),
          (X = E.target),
          (ft = X.x + X.vx - W.x - W.vx || bi(g)),
          (Y = X.y + X.vy - W.y - W.vy || bi(g)),
          (et = Math.sqrt(ft * ft + Y * Y)),
          (et = ((et - u[R]) / et) * A * o[R]),
          (ft *= et),
          (Y *= et),
          (X.vx -= ft * (st = p[R])),
          (X.vy -= Y * st),
          (W.vx += ft * (st = 1 - st)),
          (W.vy += Y * st)
  }
  function S() {
    if (f) {
      var A,
        T = f.length,
        M = t.length,
        R = new Map(f.map((W, X) => [e(W, X, f), W])),
        E
      for (A = 0, h = new Array(T); A < M; ++A)
        (E = t[A]),
          (E.index = A),
          typeof E.source != "object" && (E.source = nm(R, E.source)),
          typeof E.target != "object" && (E.target = nm(R, E.target)),
          (h[E.source.index] = (h[E.source.index] || 0) + 1),
          (h[E.target.index] = (h[E.target.index] || 0) + 1)
      for (A = 0, p = new Array(M); A < M; ++A)
        (E = t[A]),
          (p[A] = h[E.source.index] / (h[E.source.index] + h[E.target.index]))
      ;(o = new Array(M)), N(), (u = new Array(M)), L()
    }
  }
  function N() {
    if (f) for (var A = 0, T = t.length; A < T; ++A) o[A] = +r(t[A], A, t)
  }
  function L() {
    if (f) for (var A = 0, T = t.length; A < T; ++A) u[A] = +a(t[A], A, t)
  }
  return (
    (w.initialize = function (A, T) {
      ;(f = A), (g = T), S()
    }),
    (w.links = function (A) {
      return arguments.length ? ((t = A), S(), w) : t
    }),
    (w.id = function (A) {
      return arguments.length ? ((e = A), w) : e
    }),
    (w.iterations = function (A) {
      return arguments.length ? ((v = +A), w) : v
    }),
    (w.strength = function (A) {
      return arguments.length
        ? ((r = typeof A == "function" ? A : vn(+A)), N(), w)
        : r
    }),
    (w.distance = function (A) {
      return arguments.length
        ? ((a = typeof A == "function" ? A : vn(+A)), L(), w)
        : a
    }),
    w
  )
}
const Rft = 1664525,
  zft = 1013904223,
  rm = 4294967296
function Fft() {
  let t = 1
  return () => (t = (Rft * t + zft) % rm) / rm
}
function Ift(t) {
  return t.x
}
function qft(t) {
  return t.y
}
var Hft = 10,
  Bft = Math.PI * (3 - Math.sqrt(5))
function Wft(t) {
  var e,
    r = 1,
    o = 0.001,
    a = 1 - Math.pow(o, 1 / 300),
    u = 0,
    f = 0.6,
    h = new Map(),
    p = Gh(b),
    g = Ol("tick", "end"),
    v = Fft()
  t == null && (t = [])
  function b() {
    w(), g.call("tick", e), r < o && (p.stop(), g.call("end", e))
  }
  function w(L) {
    var A,
      T = t.length,
      M
    L === void 0 && (L = 1)
    for (var R = 0; R < L; ++R)
      for (
        r += (u - r) * a,
          h.forEach(function (E) {
            E(r)
          }),
          A = 0;
        A < T;
        ++A
      )
        (M = t[A]),
          M.fx == null ? (M.x += M.vx *= f) : ((M.x = M.fx), (M.vx = 0)),
          M.fy == null ? (M.y += M.vy *= f) : ((M.y = M.fy), (M.vy = 0))
    return e
  }
  function S() {
    for (var L = 0, A = t.length, T; L < A; ++L) {
      if (
        ((T = t[L]),
        (T.index = L),
        T.fx != null && (T.x = T.fx),
        T.fy != null && (T.y = T.fy),
        isNaN(T.x) || isNaN(T.y))
      ) {
        var M = Hft * Math.sqrt(0.5 + L),
          R = L * Bft
        ;(T.x = M * Math.cos(R)), (T.y = M * Math.sin(R))
      }
      ;(isNaN(T.vx) || isNaN(T.vy)) && (T.vx = T.vy = 0)
    }
  }
  function N(L) {
    return L.initialize && L.initialize(t, v), L
  }
  return (
    S(),
    (e = {
      tick: w,
      restart: function () {
        return p.restart(b), e
      },
      stop: function () {
        return p.stop(), e
      },
      nodes: function (L) {
        return arguments.length ? ((t = L), S(), h.forEach(N), e) : t
      },
      alpha: function (L) {
        return arguments.length ? ((r = +L), e) : r
      },
      alphaMin: function (L) {
        return arguments.length ? ((o = +L), e) : o
      },
      alphaDecay: function (L) {
        return arguments.length ? ((a = +L), e) : +a
      },
      alphaTarget: function (L) {
        return arguments.length ? ((u = +L), e) : u
      },
      velocityDecay: function (L) {
        return arguments.length ? ((f = 1 - L), e) : 1 - f
      },
      randomSource: function (L) {
        return arguments.length ? ((v = L), h.forEach(N), e) : v
      },
      force: function (L, A) {
        return arguments.length > 1
          ? (A == null ? h.delete(L) : h.set(L, N(A)), e)
          : h.get(L)
      },
      find: function (L, A, T) {
        var M = 0,
          R = t.length,
          E,
          W,
          X,
          ft,
          Y
        for (T == null ? (T = 1 / 0) : (T *= T), M = 0; M < R; ++M)
          (ft = t[M]),
            (E = L - ft.x),
            (W = A - ft.y),
            (X = E * E + W * W),
            X < T && ((Y = ft), (T = X))
        return Y
      },
      on: function (L, A) {
        return arguments.length > 1 ? (g.on(L, A), e) : g.on(L)
      },
    })
  )
}
function Uft() {
  var t,
    e,
    r,
    o,
    a = vn(-30),
    u,
    f = 1,
    h = 1 / 0,
    p = 0.81
  function g(S) {
    var N,
      L = t.length,
      A = Yh(t, Ift, qft).visitAfter(b)
    for (o = S, N = 0; N < L; ++N) (e = t[N]), A.visit(w)
  }
  function v() {
    if (t) {
      var S,
        N = t.length,
        L
      for (u = new Array(N), S = 0; S < N; ++S)
        (L = t[S]), (u[L.index] = +a(L, S, t))
    }
  }
  function b(S) {
    var N = 0,
      L,
      A,
      T = 0,
      M,
      R,
      E
    if (S.length) {
      for (M = R = E = 0; E < 4; ++E)
        (L = S[E]) &&
          (A = Math.abs(L.value)) &&
          ((N += L.value), (T += A), (M += A * L.x), (R += A * L.y))
      ;(S.x = M / T), (S.y = R / T)
    } else {
      ;(L = S), (L.x = L.data.x), (L.y = L.data.y)
      do N += u[L.data.index]
      while ((L = L.next))
    }
    S.value = N
  }
  function w(S, N, L, A) {
    if (!S.value) return !0
    var T = S.x - e.x,
      M = S.y - e.y,
      R = A - N,
      E = T * T + M * M
    if ((R * R) / p < E)
      return (
        E < h &&
          (T === 0 && ((T = bi(r)), (E += T * T)),
          M === 0 && ((M = bi(r)), (E += M * M)),
          E < f && (E = Math.sqrt(f * E)),
          (e.vx += (T * S.value * o) / E),
          (e.vy += (M * S.value * o) / E)),
        !0
      )
    if (S.length || E >= h) return
    ;(S.data !== e || S.next) &&
      (T === 0 && ((T = bi(r)), (E += T * T)),
      M === 0 && ((M = bi(r)), (E += M * M)),
      E < f && (E = Math.sqrt(f * E)))
    do
      S.data !== e &&
        ((R = (u[S.data.index] * o) / E), (e.vx += T * R), (e.vy += M * R))
    while ((S = S.next))
  }
  return (
    (g.initialize = function (S, N) {
      ;(t = S), (r = N), v()
    }),
    (g.strength = function (S) {
      return arguments.length
        ? ((a = typeof S == "function" ? S : vn(+S)), v(), g)
        : a
    }),
    (g.distanceMin = function (S) {
      return arguments.length ? ((f = S * S), g) : Math.sqrt(f)
    }),
    (g.distanceMax = function (S) {
      return arguments.length ? ((h = S * S), g) : Math.sqrt(h)
    }),
    (g.theta = function (S) {
      return arguments.length ? ((p = S * S), g) : Math.sqrt(p)
    }),
    g
  )
}
function jft(t) {
  var e = vn(0.1),
    r,
    o,
    a
  typeof t != "function" && (t = vn(t == null ? 0 : +t))
  function u(h) {
    for (var p = 0, g = r.length, v; p < g; ++p)
      (v = r[p]), (v.vx += (a[p] - v.x) * o[p] * h)
  }
  function f() {
    if (r) {
      var h,
        p = r.length
      for (o = new Array(p), a = new Array(p), h = 0; h < p; ++h)
        o[h] = isNaN((a[h] = +t(r[h], h, r))) ? 0 : +e(r[h], h, r)
    }
  }
  return (
    (u.initialize = function (h) {
      ;(r = h), f()
    }),
    (u.strength = function (h) {
      return arguments.length
        ? ((e = typeof h == "function" ? h : vn(+h)), f(), u)
        : e
    }),
    (u.x = function (h) {
      return arguments.length
        ? ((t = typeof h == "function" ? h : vn(+h)), f(), u)
        : t
    }),
    u
  )
}
function Gft(t) {
  var e = vn(0.1),
    r,
    o,
    a
  typeof t != "function" && (t = vn(t == null ? 0 : +t))
  function u(h) {
    for (var p = 0, g = r.length, v; p < g; ++p)
      (v = r[p]), (v.vy += (a[p] - v.y) * o[p] * h)
  }
  function f() {
    if (r) {
      var h,
        p = r.length
      for (o = new Array(p), a = new Array(p), h = 0; h < p; ++h)
        o[h] = isNaN((a[h] = +t(r[h], h, r))) ? 0 : +e(r[h], h, r)
    }
  }
  return (
    (u.initialize = function (h) {
      ;(r = h), f()
    }),
    (u.strength = function (h) {
      return arguments.length
        ? ((e = typeof h == "function" ? h : vn(+h)), f(), u)
        : e
    }),
    (u.y = function (h) {
      return arguments.length
        ? ((t = typeof h == "function" ? h : vn(+h)), f(), u)
        : t
    }),
    u
  )
}
var Vft = Object.defineProperty,
  Kft = (t, e, r) =>
    e in t
      ? Vft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[e] = r),
  Pe = (t, e, r) => (Kft(t, typeof e != "symbol" ? e + "" : e, r), r)
function Xft() {
  return {
    drag: { end: 0, start: 0.1 },
    filter: { link: 1, type: 0.1, unlinked: { include: 0.1, exclude: 0.1 } },
    focus: { acquire: () => 0.1, release: () => 0.1 },
    initialize: 1,
    labels: { links: { hide: 0, show: 0 }, nodes: { hide: 0, show: 0 } },
    resize: 0.5,
  }
}
function im(t) {
  if (typeof t == "object" && t !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const e = Object.getPrototypeOf(t)
      return e === Object.prototype || e === null
    }
    return Object.prototype.toString.call(t) === "[object Object]"
  }
  return !1
}
function wi(...t) {
  return t.reduce((e, r) => {
    if (Array.isArray(r))
      throw new TypeError(
        "Arguments provided to deepmerge must be objects, not arrays.",
      )
    return (
      Object.keys(r).forEach((o) => {
        ;["__proto__", "constructor", "prototype"].includes(o) ||
          (Array.isArray(e[o]) && Array.isArray(r[o])
            ? (e[o] = wi.options.mergeArrays
                ? Array.from(new Set(e[o].concat(r[o])))
                : r[o])
            : im(e[o]) && im(r[o])
              ? (e[o] = wi(e[o], r[o]))
              : (e[o] = r[o]))
      }),
      e
    )
  }, {})
}
const hb = { mergeArrays: !0 }
wi.options = hb
wi.withOptions = (t, ...e) => {
  wi.options = { mergeArrays: !0, ...t }
  const r = wi(...e)
  return (wi.options = hb), r
}
function Yft() {
  return {
    centering: { enabled: !0, strength: 0.1 },
    charge: { enabled: !0, strength: -1 },
    collision: { enabled: !0, strength: 1, radiusMultiplier: 2 },
    link: { enabled: !0, strength: 1, length: 128 },
  }
}
function Zft() {
  return {
    includeUnlinked: !0,
    linkFilter: () => !0,
    nodeTypeFilter: void 0,
    showLinkLabels: !0,
    showNodeLabels: !0,
  }
}
function db(t) {
  t.preventDefault(), t.stopPropagation()
}
function pb(t) {
  return typeof t == "number"
}
function Ti(t, e) {
  return pb(t.nodeRadius) ? t.nodeRadius : t.nodeRadius(e)
}
function Jft(t) {
  return `${t.source.id}-${t.target.id}`
}
function gb(t) {
  return `link-arrow-${t}`.replace(/[()]/g, "~")
}
function Qft(t) {
  return `url(#${gb(t.color)})`
}
function tht(t) {
  return {
    size: t,
    padding: (e, r) => Ti(r, e) + 2 * t,
    ref: [t / 2, t / 2],
    path: [
      [0, 0],
      [0, t],
      [t, t / 2],
    ],
    viewBox: [0, 0, t, t].join(","),
  }
}
const vb = { Arrow: (t) => tht(t) },
  eht = (t, e, r) => [e / 2, r / 2],
  mb = (t, e, r) => [om(0, e), om(0, r)]
function om(t, e) {
  return Math.random() * (e - t) + t
}
function nht(t) {
  const e = Object.fromEntries(t.nodes.map((r) => [r.id, [r.x, r.y]]))
  return (r, o, a) => {
    const [u, f] = e[r.id] ?? []
    return !u || !f ? mb(r, o, a) : [u, f]
  }
}
const Xf = { Centered: eht, Randomized: mb, Stable: nht }
function rht() {
  return {
    autoResize: !1,
    callbacks: {},
    hooks: {},
    initial: Zft(),
    nodeRadius: 16,
    marker: vb.Arrow(4),
    modifiers: {},
    positionInitializer: Xf.Centered,
    simulation: { alphas: Xft(), forces: Yft() },
    zoom: { initial: 1, min: 0.1, max: 2 },
  }
}
function iht(t = {}) {
  return wi.withOptions({ mergeArrays: !1 }, rht(), t)
}
function oht({
  applyZoom: t,
  container: e,
  onDoubleClick: r,
  onPointerMoved: o,
  onPointerUp: a,
  offset: [u, f],
  scale: h,
  zoom: p,
}) {
  const g = e
    .classed("graph", !0)
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .call(p)
    .on("contextmenu", (v) => db(v))
    .on("dblclick", (v) => (r == null ? void 0 : r(v)))
    .on("dblclick.zoom", null)
    .on("pointermove", (v) => (o == null ? void 0 : o(v)))
    .on("pointerup", (v) => (a == null ? void 0 : a(v)))
    .style("cursor", "grab")
  return t && g.call(p.transform, Xh.translate(u, f).scale(h)), g.append("g")
}
function sht({ canvas: t, scale: e, xOffset: r, yOffset: o }) {
  t == null || t.attr("transform", `translate(${r},${o})scale(${e})`)
}
function lht({ config: t, onDragStart: e, onDragEnd: r }) {
  var o, a
  const u = kct()
    .filter((f) =>
      f.type === "mousedown"
        ? f.button === 0
        : f.type === "touchstart"
          ? f.touches.length === 1
          : !1,
    )
    .on("start", (f, h) => {
      f.active === 0 && e(f, h),
        Tn(f.sourceEvent.target).classed("grabbed", !0),
        (h.fx = h.x),
        (h.fy = h.y)
    })
    .on("drag", (f, h) => {
      ;(h.fx = f.x), (h.fy = f.y)
    })
    .on("end", (f, h) => {
      f.active === 0 && r(f, h),
        Tn(f.sourceEvent.target).classed("grabbed", !1),
        (h.fx = void 0),
        (h.fy = void 0)
    })
  return (a = (o = t.modifiers).drag) == null || a.call(o, u), u
}
function aht({
  graph: t,
  filter: e,
  focusedNode: r,
  includeUnlinked: o,
  linkFilter: a,
}) {
  const u = t.links.filter(
      (p) => e.includes(p.source.type) && e.includes(p.target.type) && a(p),
    ),
    f = (p) =>
      u.find((g) => g.source.id === p.id || g.target.id === p.id) !== void 0,
    h = t.nodes.filter((p) => e.includes(p.type) && (o || f(p)))
  return r === void 0 || !e.includes(r.type)
    ? { nodes: h, links: u }
    : cht({ nodes: h, links: u }, r)
}
function cht(t, e) {
  const r = [...uht(t, e), ...fht(t, e)],
    o = r.flatMap((a) => [a.source, a.target])
  return { nodes: [...new Set([...o, e])], links: [...new Set(r)] }
}
function uht(t, e) {
  return yb(t, e, (r, o) => r.target.id === o.id)
}
function fht(t, e) {
  return yb(t, e, (r, o) => r.source.id === o.id)
}
function yb(t, e, r) {
  const o = new Set(t.links),
    a = new Set([e]),
    u = []
  for (; o.size > 0; ) {
    const f = [...o].filter((h) => [...a].some((p) => r(h, p)))
    if (f.length === 0) return u
    f.forEach((h) => {
      a.add(h.source), a.add(h.target), u.push(h), o.delete(h)
    })
  }
  return u
}
function Yf(t) {
  return t.x ?? 0
}
function Zf(t) {
  return t.y ?? 0
}
function Jh({ source: t, target: e }) {
  const r = new pn(Yf(t), Zf(t)),
    o = new pn(Yf(e), Zf(e)),
    a = o.subtract(r),
    u = a.length(),
    f = a.normalize(),
    h = f.multiply(-1)
  return { s: r, t: o, dist: u, norm: f, endNorm: h }
}
function bb({ center: t, node: e }) {
  const r = new pn(Yf(e), Zf(e))
  let o = t
  return r.x === o.x && r.y === o.y && (o = o.add(new pn(0, 1))), { n: r, c: o }
}
function wb({ config: t, source: e, target: r }) {
  const { s: o, t: a, norm: u } = Jh({ config: t, source: e, target: r }),
    f = o.add(u.multiply(Ti(t, e) - 1)),
    h = a.subtract(u.multiply(t.marker.padding(r, t)))
  return { start: f, end: h }
}
function hht(t) {
  const { start: e, end: r } = wb(t)
  return `M${e.x},${e.y}
          L${r.x},${r.y}`
}
function dht(t) {
  const { start: e, end: r } = wb(t),
    o = r.subtract(e).multiply(0.5),
    a = e.add(o)
  return `translate(${a.x - 8},${a.y - 4})`
}
function pht({ config: t, source: e, target: r }) {
  const {
      s: o,
      t: a,
      dist: u,
      norm: f,
      endNorm: h,
    } = Jh({ config: t, source: e, target: r }),
    p = 10,
    g = f
      .rotateByDegrees(-p)
      .multiply(Ti(t, e) - 1)
      .add(o),
    v = h
      .rotateByDegrees(p)
      .multiply(Ti(t, r))
      .add(a)
      .add(h.rotateByDegrees(p).multiply(2 * t.marker.size)),
    b = 1.2 * u
  return `M${g.x},${g.y}
          A${b},${b},0,0,1,${v.x},${v.y}`
}
function ght({ center: t, config: e, node: r }) {
  const { n: o, c: a } = bb({ center: t, config: e, node: r }),
    u = Ti(e, r),
    f = o.subtract(a),
    h = f.multiply(1 / f.length()),
    p = 40,
    g = h
      .rotateByDegrees(p)
      .multiply(u - 1)
      .add(o),
    v = h
      .rotateByDegrees(-p)
      .multiply(u)
      .add(o)
      .add(h.rotateByDegrees(-p).multiply(2 * e.marker.size))
  return `M${g.x},${g.y}
          A${u},${u},0,1,0,${v.x},${v.y}`
}
function vht({ config: t, source: e, target: r }) {
  const { t: o, dist: a, endNorm: u } = Jh({ config: t, source: e, target: r }),
    f = 10,
    h = u
      .rotateByDegrees(f)
      .multiply(0.5 * a)
      .add(o)
  return `translate(${h.x},${h.y})`
}
function mht({ center: t, config: e, node: r }) {
  const { n: o, c: a } = bb({ center: t, config: e, node: r }),
    u = o.subtract(a),
    f = u
      .multiply(1 / u.length())
      .multiply(3 * Ti(e, r) + 8)
      .add(o)
  return `translate(${f.x},${f.y})`
}
const Ko = {
  line: { labelTransform: dht, path: hht },
  arc: { labelTransform: vht, path: pht },
  reflexive: { labelTransform: mht, path: ght },
}
function yht(t) {
  return t.append("g").classed("links", !0).selectAll("path")
}
function bht({ config: t, graph: e, selection: r, showLabels: o }) {
  const a =
    r == null
      ? void 0
      : r
          .data(e.links, (u) => Jft(u))
          .join((u) => {
            var f, h, p, g
            const v = u.append("g"),
              b = v
                .append("path")
                .classed("link", !0)
                .style("marker-end", (S) => Qft(S))
                .style("stroke", (S) => S.color)
            ;(h = (f = t.modifiers).link) == null || h.call(f, b)
            const w = v
              .append("text")
              .classed("link__label", !0)
              .style("fill", (S) => (S.label ? S.label.color : null))
              .style("font-size", (S) => (S.label ? S.label.fontSize : null))
              .text((S) => (S.label ? S.label.text : null))
            return (g = (p = t.modifiers).linkLabel) == null || g.call(p, w), v
          })
  return (
    a == null ||
      a.select(".link__label").attr("opacity", (u) => (u.label && o ? 1 : 0)),
    a
  )
}
function wht(t) {
  xht(t), _ht(t)
}
function xht({ center: t, config: e, graph: r, selection: o }) {
  o == null ||
    o
      .selectAll("path")
      .attr("d", (a) =>
        a.source.x === void 0 ||
        a.source.y === void 0 ||
        a.target.x === void 0 ||
        a.target.y === void 0
          ? ""
          : a.source.id === a.target.id
            ? Ko.reflexive.path({ config: e, node: a.source, center: t })
            : xb(r, a.source, a.target)
              ? Ko.arc.path({ config: e, source: a.source, target: a.target })
              : Ko.line.path({ config: e, source: a.source, target: a.target }),
      )
}
function _ht({ config: t, center: e, graph: r, selection: o }) {
  o == null ||
    o.select(".link__label").attr("transform", (a) =>
      a.source.x === void 0 ||
      a.source.y === void 0 ||
      a.target.x === void 0 ||
      a.target.y === void 0
        ? "translate(0, 0)"
        : a.source.id === a.target.id
          ? Ko.reflexive.labelTransform({
              config: t,
              node: a.source,
              center: e,
            })
          : xb(r, a.source, a.target)
            ? Ko.arc.labelTransform({
                config: t,
                source: a.source,
                target: a.target,
              })
            : Ko.line.labelTransform({
                config: t,
                source: a.source,
                target: a.target,
              }),
    )
}
function xb(t, e, r) {
  return (
    e.id !== r.id &&
    t.links.some((o) => o.target.id === e.id && o.source.id === r.id) &&
    t.links.some((o) => o.target.id === r.id && o.source.id === e.id)
  )
}
function Sht(t) {
  return t.append("defs").selectAll("marker")
}
function kht({ config: t, graph: e, selection: r }) {
  return r == null
    ? void 0
    : r
        .data(Cht(e), (o) => o)
        .join((o) => {
          const a = o
            .append("marker")
            .attr("id", (u) => gb(u))
            .attr("markerHeight", 4 * t.marker.size)
            .attr("markerWidth", 4 * t.marker.size)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .attr("refX", t.marker.ref[0])
            .attr("refY", t.marker.ref[1])
            .attr("viewBox", t.marker.viewBox)
            .style("fill", (u) => u)
          return a.append("path").attr("d", Tht(t.marker.path)), a
        })
}
function Cht(t) {
  return [...new Set(t.links.map((e) => e.color))]
}
function Tht(t) {
  const [e, ...r] = t
  if (!e) return "M0,0"
  const [o, a] = e
  return r.reduce((u, [f, h]) => `${u}L${f},${h}`, `M${o},${a}`)
}
function Eht(t) {
  return t.append("g").classed("nodes", !0).selectAll("circle")
}
function Lht({
  config: t,
  drag: e,
  graph: r,
  onNodeContext: o,
  onNodeSelected: a,
  selection: u,
  showLabels: f,
}) {
  const h =
    u == null
      ? void 0
      : u
          .data(r.nodes, (p) => p.id)
          .join((p) => {
            var g, v, b, w
            const S = p.append("g")
            e !== void 0 && S.call(e)
            const N = S.append("circle")
              .classed("node", !0)
              .attr("r", (A) => Ti(t, A))
              .on("contextmenu", (A, T) => {
                db(A), o(T)
              })
              .on("pointerdown", (A, T) => Mht(A, T, a ?? o))
              .style("fill", (A) => A.color)
            ;(v = (g = t.modifiers).node) == null || v.call(g, N)
            const L = S.append("text")
              .classed("node__label", !0)
              .attr("dy", "0.33em")
              .style("fill", (A) => (A.label ? A.label.color : null))
              .style("font-size", (A) => (A.label ? A.label.fontSize : null))
              .style("stroke", "none")
              .text((A) => (A.label ? A.label.text : null))
            return (w = (b = t.modifiers).nodeLabel) == null || w.call(b, L), S
          })
  return (
    h == null || h.select(".node").classed("focused", (p) => p.isFocused),
    h == null || h.select(".node__label").attr("opacity", f ? 1 : 0),
    h
  )
}
const Aht = 500
function Mht(t, e, r) {
  if (t.button !== void 0 && t.button !== 0) return
  const o = e.lastInteractionTimestamp,
    a = Date.now()
  if (o === void 0 || a - o > Aht) {
    e.lastInteractionTimestamp = a
    return
  }
  ;(e.lastInteractionTimestamp = void 0), r(e)
}
function Nht(t) {
  t == null || t.attr("transform", (e) => `translate(${e.x ?? 0},${e.y ?? 0})`)
}
function Pht({ center: t, config: e, graph: r, onTick: o }) {
  var a, u
  const f = Wft(r.nodes),
    h = e.simulation.forces.centering
  if (h && h.enabled) {
    const b = h.strength
    f.force("x", jft(() => t().x).strength(b)).force(
      "y",
      Gft(() => t().y).strength(b),
    )
  }
  const p = e.simulation.forces.charge
  p && p.enabled && f.force("charge", Uft().strength(p.strength))
  const g = e.simulation.forces.collision
  g &&
    g.enabled &&
    f.force(
      "collision",
      Oft().radius((b) => g.radiusMultiplier * Ti(e, b)),
    )
  const v = e.simulation.forces.link
  return (
    v &&
      v.enabled &&
      f.force(
        "link",
        $ft(r.links)
          .id((b) => b.id)
          .distance(e.simulation.forces.link.length)
          .strength(v.strength),
      ),
    f.on("tick", () => o()),
    (u = (a = e.modifiers).simulation) == null || u.call(a, f),
    f
  )
}
function Oht({ canvasContainer: t, config: e, min: r, max: o, onZoom: a }) {
  var u, f
  const h = pft()
    .scaleExtent([r, o])
    .filter((p) => {
      var g
      return (
        p.button === 0 || ((g = p.touches) == null ? void 0 : g.length) >= 2
      )
    })
    .on("start", () => t().classed("grabbed", !0))
    .on("zoom", (p) => a(p))
    .on("end", () => t().classed("grabbed", !1))
  return (f = (u = e.modifiers).zoom) == null || f.call(u, h), h
}
class Dht {
  constructor(e, r, o) {
    if (
      (Pe(this, "nodeTypes"),
      Pe(this, "_nodeTypeFilter"),
      Pe(this, "_includeUnlinked", !0),
      Pe(this, "_linkFilter", () => !0),
      Pe(this, "_showLinkLabels", !0),
      Pe(this, "_showNodeLabels", !0),
      Pe(this, "filteredGraph"),
      Pe(this, "width", 0),
      Pe(this, "height", 0),
      Pe(this, "simulation"),
      Pe(this, "canvas"),
      Pe(this, "linkSelection"),
      Pe(this, "nodeSelection"),
      Pe(this, "markerSelection"),
      Pe(this, "zoom"),
      Pe(this, "drag"),
      Pe(this, "xOffset", 0),
      Pe(this, "yOffset", 0),
      Pe(this, "scale"),
      Pe(this, "focusedNode"),
      Pe(this, "resizeObserver"),
      (this.container = e),
      (this.graph = r),
      (this.config = o),
      (this.scale = o.zoom.initial),
      this.resetView(),
      this.graph.nodes.forEach((a) => {
        const [u, f] = o.positionInitializer(
          a,
          this.effectiveWidth,
          this.effectiveHeight,
        )
        ;(a.x = a.x ?? u), (a.y = a.y ?? f)
      }),
      (this.nodeTypes = [...new Set(r.nodes.map((a) => a.type))]),
      (this._nodeTypeFilter = [...this.nodeTypes]),
      o.initial)
    ) {
      const {
        includeUnlinked: a,
        nodeTypeFilter: u,
        linkFilter: f,
        showLinkLabels: h,
        showNodeLabels: p,
      } = o.initial
      ;(this._includeUnlinked = a ?? this._includeUnlinked),
        (this._showLinkLabels = h ?? this._showLinkLabels),
        (this._showNodeLabels = p ?? this._showNodeLabels),
        (this._nodeTypeFilter = u ?? this._nodeTypeFilter),
        (this._linkFilter = f ?? this._linkFilter)
    }
    this.filterGraph(void 0),
      this.initGraph(),
      this.restart(o.simulation.alphas.initialize),
      o.autoResize &&
        ((this.resizeObserver = new ResizeObserver(Rlt(() => this.resize()))),
        this.resizeObserver.observe(this.container))
  }
  get nodeTypeFilter() {
    return this._nodeTypeFilter
  }
  get includeUnlinked() {
    return this._includeUnlinked
  }
  set includeUnlinked(e) {
    ;(this._includeUnlinked = e), this.filterGraph(this.focusedNode)
    const { include: r, exclude: o } =
        this.config.simulation.alphas.filter.unlinked,
      a = e ? r : o
    this.restart(a)
  }
  set linkFilter(e) {
    ;(this._linkFilter = e),
      this.filterGraph(this.focusedNode),
      this.restart(this.config.simulation.alphas.filter.link)
  }
  get linkFilter() {
    return this._linkFilter
  }
  get showNodeLabels() {
    return this._showNodeLabels
  }
  set showNodeLabels(e) {
    this._showNodeLabels = e
    const { hide: r, show: o } = this.config.simulation.alphas.labels.nodes,
      a = e ? o : r
    this.restart(a)
  }
  get showLinkLabels() {
    return this._showLinkLabels
  }
  set showLinkLabels(e) {
    this._showLinkLabels = e
    const { hide: r, show: o } = this.config.simulation.alphas.labels.links,
      a = e ? o : r
    this.restart(a)
  }
  get effectiveWidth() {
    return this.width / this.scale
  }
  get effectiveHeight() {
    return this.height / this.scale
  }
  get effectiveCenter() {
    return pn
      .of([this.width, this.height])
      .divide(2)
      .subtract(pn.of([this.xOffset, this.yOffset]))
      .divide(this.scale)
  }
  resize() {
    const e = this.width,
      r = this.height,
      o = this.container.getBoundingClientRect().width,
      a = this.container.getBoundingClientRect().height,
      u = e.toFixed() !== o.toFixed(),
      f = r.toFixed() !== a.toFixed()
    if (!u && !f) return
    ;(this.width = this.container.getBoundingClientRect().width),
      (this.height = this.container.getBoundingClientRect().height)
    const h = this.config.simulation.alphas.resize
    this.restart(
      pb(h) ? h : h({ oldWidth: e, oldHeight: r, newWidth: o, newHeight: a }),
    )
  }
  restart(e) {
    var r
    ;(this.markerSelection = kht({
      config: this.config,
      graph: this.filteredGraph,
      selection: this.markerSelection,
    })),
      (this.linkSelection = bht({
        config: this.config,
        graph: this.filteredGraph,
        selection: this.linkSelection,
        showLabels: this._showLinkLabels,
      })),
      (this.nodeSelection = Lht({
        config: this.config,
        drag: this.drag,
        graph: this.filteredGraph,
        onNodeContext: (o) => this.toggleNodeFocus(o),
        onNodeSelected: this.config.callbacks.nodeClicked,
        selection: this.nodeSelection,
        showLabels: this._showNodeLabels,
      })),
      (r = this.simulation) == null || r.stop(),
      (this.simulation = Pht({
        center: () => this.effectiveCenter,
        config: this.config,
        graph: this.filteredGraph,
        onTick: () => this.onTick(),
      })
        .alpha(e)
        .restart())
  }
  filterNodesByType(e, r) {
    e
      ? this._nodeTypeFilter.push(r)
      : (this._nodeTypeFilter = this._nodeTypeFilter.filter((o) => o !== r)),
      this.filterGraph(this.focusedNode),
      this.restart(this.config.simulation.alphas.filter.type)
  }
  shutdown() {
    var e, r
    this.focusedNode !== void 0 &&
      ((this.focusedNode.isFocused = !1), (this.focusedNode = void 0)),
      (e = this.resizeObserver) == null || e.unobserve(this.container),
      (r = this.simulation) == null || r.stop()
  }
  initGraph() {
    ;(this.zoom = Oht({
      config: this.config,
      canvasContainer: () => Tn(this.container).select("svg"),
      min: this.config.zoom.min,
      max: this.config.zoom.max,
      onZoom: (e) => this.onZoom(e),
    })),
      (this.canvas = oht({
        applyZoom: this.scale !== 1,
        container: Tn(this.container),
        offset: [this.xOffset, this.yOffset],
        scale: this.scale,
        zoom: this.zoom,
      })),
      this.applyZoom(),
      (this.linkSelection = yht(this.canvas)),
      (this.nodeSelection = Eht(this.canvas)),
      (this.markerSelection = Sht(this.canvas)),
      (this.drag = lht({
        config: this.config,
        onDragStart: () => {
          var e
          return (e = this.simulation) == null
            ? void 0
            : e.alphaTarget(this.config.simulation.alphas.drag.start).restart()
        },
        onDragEnd: () => {
          var e
          return (e = this.simulation) == null
            ? void 0
            : e.alphaTarget(this.config.simulation.alphas.drag.end).restart()
        },
      }))
  }
  onTick() {
    Nht(this.nodeSelection),
      wht({
        config: this.config,
        center: this.effectiveCenter,
        graph: this.filteredGraph,
        selection: this.linkSelection,
      })
  }
  resetView() {
    var e
    ;(e = this.simulation) == null || e.stop(),
      Tn(this.container).selectChildren().remove(),
      (this.zoom = void 0),
      (this.canvas = void 0),
      (this.linkSelection = void 0),
      (this.nodeSelection = void 0),
      (this.markerSelection = void 0),
      (this.simulation = void 0),
      (this.width = this.container.getBoundingClientRect().width),
      (this.height = this.container.getBoundingClientRect().height)
  }
  onZoom(e) {
    var r, o, a
    ;(this.xOffset = e.transform.x),
      (this.yOffset = e.transform.y),
      (this.scale = e.transform.k),
      this.applyZoom(),
      (o = (r = this.config.hooks).afterZoom) == null ||
        o.call(r, this.scale, this.xOffset, this.yOffset),
      (a = this.simulation) == null || a.restart()
  }
  applyZoom() {
    sht({
      canvas: this.canvas,
      scale: this.scale,
      xOffset: this.xOffset,
      yOffset: this.yOffset,
    })
  }
  toggleNodeFocus(e) {
    e.isFocused
      ? (this.filterGraph(void 0),
        this.restart(this.config.simulation.alphas.focus.release(e)))
      : this.focusNode(e)
  }
  focusNode(e) {
    this.filterGraph(e),
      this.restart(this.config.simulation.alphas.focus.acquire(e))
  }
  filterGraph(e) {
    this.focusedNode !== void 0 &&
      ((this.focusedNode.isFocused = !1), (this.focusedNode = void 0)),
      e !== void 0 &&
        this._nodeTypeFilter.includes(e.type) &&
        ((e.isFocused = !0), (this.focusedNode = e)),
      (this.filteredGraph = aht({
        graph: this.graph,
        filter: this._nodeTypeFilter,
        focusedNode: this.focusedNode,
        includeUnlinked: this._includeUnlinked,
        linkFilter: this._linkFilter,
      }))
  }
}
function sm({ nodes: t, links: e }) {
  return { nodes: t ?? [], links: e ?? [] }
}
function $ht(t) {
  return { ...t }
}
function _b(t) {
  return { ...t, isFocused: !1, lastInteractionTimestamp: void 0 }
}
const Rht = {
    "h-full": "",
    "min-h-75": "",
    "flex-1": "",
    "overflow": "hidden",
  },
  zht = { "flex": "", "items-center": "", "gap-4": "", "px-3": "", "py-2": "" },
  Fht = ["id", "checked", "onChange"],
  Iht = ["for"],
  qht = ut("div", { "flex-auto": "" }, null, -1),
  Hht = re({
    __name: "ViewModuleGraph",
    props: { graph: {} },
    setup(t) {
      const e = t,
        { graph: r } = h1(e),
        o = Vt(),
        a = Vt(!1),
        u = Vt(),
        f = Vt()
      mh(
        () => {
          a.value === !1 && setTimeout(() => (u.value = void 0), 300)
        },
        { flush: "post" },
      ),
        us(() => {
          g()
        }),
        bh(() => {
          var b
          ;(b = f.value) == null || b.shutdown()
        }),
        $e(r, g)
      function h(b, w) {
        var S
        ;(S = f.value) == null || S.filterNodesByType(w, b)
      }
      function p(b) {
        ;(u.value = b), (a.value = !0)
      }
      function g() {
        var b
        ;(b = f.value) == null || b.shutdown(),
          !(!r.value || !o.value) &&
            (f.value = new Dht(
              o.value,
              r.value,
              iht({
                nodeRadius: 10,
                autoResize: !0,
                simulation: {
                  alphas: {
                    initialize: 1,
                    resize: ({ newHeight: w, newWidth: S }) =>
                      w === 0 && S === 0 ? 0 : 0.25,
                  },
                  forces: {
                    collision: { radiusMultiplier: 10 },
                    link: { length: 240 },
                  },
                },
                marker: vb.Arrow(2),
                modifiers: { node: v },
                positionInitializer:
                  r.value.nodes.length > 1 ? Xf.Randomized : Xf.Centered,
                zoom: { min: 0.5, max: 2 },
              }),
            ))
      }
      function v(b) {
        if (Ur) return
        const w = (A) => A.button === 0
        let S = 0,
          N = 0,
          L = 0
        b.on("pointerdown", (A, T) => {
          T.type !== "external" &&
            (!T.x || !T.y || !w(A) || ((S = T.x), (N = T.y), (L = Date.now())))
        }).on("pointerup", (A, T) => {
          if (
            T.type === "external" ||
            !T.x ||
            !T.y ||
            !w(A) ||
            Date.now() - L > 500
          )
            return
          const M = T.x - S,
            R = T.y - N
          M ** 2 + R ** 2 < 100 && p(T.id)
        })
      }
      return (b, w) => {
        var T
        const S = hs,
          N = $lt,
          L = Slt,
          A = lo("tooltip")
        return (
          lt(),
          Tt("div", Rht, [
            ut("div", null, [
              ut("div", zht, [
                (lt(!0),
                Tt(
                  fe,
                  null,
                  Qn((T = G(f)) == null ? void 0 : T.nodeTypes.sort(), (M) => {
                    var R
                    return (
                      lt(),
                      Tt(
                        "div",
                        {
                          "key": M,
                          "flex": "~ gap-1",
                          "items-center": "",
                          "select-none": "",
                        },
                        [
                          ut(
                            "input",
                            {
                              id: `type-${M}`,
                              type: "checkbox",
                              checked:
                                (R = G(f)) == null
                                  ? void 0
                                  : R.nodeTypeFilter.includes(M),
                              onChange: (E) => h(M, E.target.checked),
                            },
                            null,
                            40,
                            Fht,
                          ),
                          ut(
                            "label",
                            {
                              "font-light": "",
                              "text-sm": "",
                              "ws-nowrap": "",
                              "overflow-hidden": "",
                              "capitalize": "",
                              "truncate": "",
                              "for": `type-${M}`,
                              "border-b-2": "",
                              "style": Ln({
                                "border-color": `var(--color-node-${M})`,
                              }),
                            },
                            ee(M) + " Modules",
                            13,
                            Iht,
                          ),
                        ],
                      )
                    )
                  }),
                  128,
                )),
                qht,
                ut("div", null, [
                  rn(Ft(S, { icon: "i-carbon-reset", onClick: g }, null, 512), [
                    [A, "Reset", void 0, { bottom: !0 }],
                  ]),
                ]),
              ]),
            ]),
            ut("div", { ref_key: "el", ref: o }, null, 512),
            Ft(
              L,
              {
                "modelValue": G(a),
                "onUpdate:modelValue":
                  w[1] || (w[1] = (M) => (Le(a) ? (a.value = M) : null)),
                "direction": "right",
              },
              {
                default: Zt(() => [
                  G(u)
                    ? (lt(),
                      Jt(
                        N1,
                        { key: 0 },
                        {
                          default: Zt(() => [
                            Ft(
                              N,
                              {
                                id: G(u),
                                onClose: w[0] || (w[0] = (M) => (a.value = !1)),
                              },
                              null,
                              8,
                              ["id"],
                            ),
                          ]),
                          _: 1,
                        },
                      ))
                    : Qt("", !0),
                ]),
                _: 1,
              },
              8,
              ["modelValue"],
            ),
          ])
        )
      }
    },
  }),
  Bht = {
    "key": 0,
    "text-green-500": "",
    "flex-shrink-0": "",
    "i-carbon:checkmark": "",
  },
  Wht = {
    "key": 1,
    "text-red-500": "",
    "flex-shrink-0": "",
    "i-carbon:compare": "",
  },
  Uht = {
    "key": 2,
    "text-red-500": "",
    "flex-shrink-0": "",
    "i-carbon:close": "",
  },
  jht = {
    "key": 3,
    "text-gray-500": "",
    "flex-shrink-0": "",
    "i-carbon:document-blank": "",
  },
  Ght = {
    "key": 4,
    "text-gray-500": "",
    "flex-shrink-0": "",
    "i-carbon:redo": "",
    "rotate-90": "",
  },
  Vht = {
    "key": 5,
    "text-yellow-500": "",
    "flex-shrink-0": "",
    "i-carbon:circle-dash": "",
    "animate-spin": "",
  },
  Qh = re({
    __name: "StatusIcon",
    props: { task: {} },
    setup(t) {
      return (e, r) => {
        var a, u, f
        const o = lo("tooltip")
        return ((a = e.task.result) == null ? void 0 : a.state) === "pass"
          ? (lt(), Tt("div", Bht))
          : G($c)(e.task)
            ? rn((lt(), Tt("div", Wht, null, 512)), [
                [o, "Contains failed snapshot", void 0, { right: !0 }],
              ])
            : ((u = e.task.result) == null ? void 0 : u.state) === "fail"
              ? (lt(), Tt("div", Uht))
              : e.task.mode === "todo"
                ? rn((lt(), Tt("div", jht, null, 512)), [
                    [o, "Todo", void 0, { right: !0 }],
                  ])
                : e.task.mode === "skip" ||
                    ((f = e.task.result) == null ? void 0 : f.state) === "skip"
                  ? rn((lt(), Tt("div", Ght, null, 512)), [
                      [o, "Skipped", void 0, { right: !0 }],
                    ])
                  : (lt(), Tt("div", Vht))
      }
    },
  })
function Kht(t) {
  const e = new Map(),
    r = new Map(),
    o = []
  for (;;) {
    let a = 0
    if (
      (t.forEach((u, f) => {
        var v
        const { splits: h, finished: p } = u
        if (p) {
          a++
          const { raw: b, candidate: w } = u
          e.set(b, w)
          return
        }
        if (h.length === 0) {
          u.finished = !0
          return
        }
        const g = h[0]
        r.has(g)
          ? ((u.candidate += u.candidate === "" ? g : `/${g}`),
            (v = r.get(g)) == null || v.push(f),
            h.shift())
          : (r.set(g, [f]), o.push(f))
      }),
      o.forEach((u) => {
        const f = t[u],
          h = f.splits.shift()
        f.candidate += f.candidate === "" ? h : `/${h}`
      }),
      r.forEach((u) => {
        if (u.length === 1) {
          const f = u[0]
          t[f].finished = !0
        }
      }),
      r.clear(),
      (o.length = 0),
      a === t.length)
    )
      break
  }
  return e
}
function Xht(t) {
  let e = t
  e.includes("/node_modules/") && (e = t.split(/\/node_modules\//g).pop())
  const r = e.split(/\//g)
  return { raw: e, splits: r, candidate: "", finished: !1, id: t }
}
function Yht(t) {
  const e = t.map((o) => Xht(o)),
    r = Kht(e)
  return e.map(({ raw: o, id: a }) =>
    _b({
      color: "var(--color-node-external)",
      label: {
        color: "var(--color-node-external)",
        fontSize: "0.875rem",
        text: r.get(o) ?? "",
      },
      isFocused: !1,
      id: a,
      type: "external",
    }),
  )
}
function Zht(t, e) {
  return _b({
    color: e ? "var(--color-node-root)" : "var(--color-node-inline)",
    label: {
      color: e ? "var(--color-node-root)" : "var(--color-node-inline)",
      fontSize: "0.875rem",
      text: t.split(/\//g).pop(),
    },
    isFocused: !1,
    id: t,
    type: "inline",
  })
}
function Jht(t, e) {
  if (!t) return sm({})
  const r = Yht(t.externalized),
    o = t.inlined.map((h) => Zht(h, h === e)) ?? [],
    a = [...r, ...o],
    u = Object.fromEntries(a.map((h) => [h.id, h])),
    f = Object.entries(t.graph).flatMap(([h, p]) =>
      p
        .map((g) => {
          const v = u[h],
            b = u[g]
          if (!(v === void 0 || b === void 0))
            return $ht({
              source: v,
              target: b,
              color: "var(--color-link)",
              label: !1,
            })
        })
        .filter((g) => g !== void 0),
    )
  return sm({ nodes: a, links: f })
}
const Qht = {
    "key": 0,
    "flex": "",
    "flex-col": "",
    "h-full": "",
    "max-h-full": "",
    "overflow-hidden": "",
    "data-testid": "file-detail",
  },
  tdt = {
    "p": "2",
    "h-10": "",
    "flex": "~ gap-2",
    "items-center": "",
    "bg-header": "",
    "border": "b base",
  },
  edt = {
    "flex-1": "",
    "font-light": "",
    "op-50": "",
    "ws-nowrap": "",
    "truncate": "",
    "text-sm": "",
  },
  ndt = { class: "flex text-lg" },
  rdt = {
    "flex": "~",
    "items-center": "",
    "bg-header": "",
    "border": "b-2 base",
    "text-sm": "",
    "h-41px": "",
  },
  idt = { "flex": "", "flex-col": "", "flex-1": "", "overflow": "hidden" },
  odt = ["flex-1"],
  sdt = re({
    __name: "FileDetails",
    setup(t) {
      const e = Vt({ externalized: [], graph: {}, inlined: [] }),
        r = Vt({ nodes: [], links: [] }),
        o = Vt(!1),
        a = Vt(!1)
      rT(
        ke,
        async (g, v) => {
          g &&
            g.filepath !== (v == null ? void 0 : v.filepath) &&
            ((e.value = await Ge.rpc.getModuleGraph(g.filepath)),
            (r.value = Jht(e.value, g.filepath)))
        },
        { debounce: 100, immediate: !0 },
      )
      function u() {
        var v
        const g = (v = ke.value) == null ? void 0 : v.filepath
        g && fetch(`/__open-in-editor?file=${encodeURIComponent(g)}`)
      }
      function f(g) {
        g === "graph" && (a.value = !0), (Xn.value = g)
      }
      const h = xt(() => {
        var g
        return (
          ((g = dy.value) == null
            ? void 0
            : g.reduce((v, { size: b }) => v + b, 0)) ?? 0
        )
      })
      function p(g) {
        o.value = g
      }
      return (g, v) => {
        var M, R
        const b = Qh,
          w = hs,
          S = Hht,
          N = _lt,
          L = mlt,
          A = ilt,
          T = lo("tooltip")
        return G(ke)
          ? (lt(),
            Tt("div", Qht, [
              ut("div", null, [
                ut("div", tdt, [
                  Ft(b, { task: G(ke) }, null, 8, ["task"]),
                  ut(
                    "div",
                    edt,
                    ee((M = G(ke)) == null ? void 0 : M.filepath),
                    1,
                  ),
                  ut("div", ndt, [
                    G(Ur)
                      ? Qt("", !0)
                      : rn(
                          (lt(),
                          Jt(
                            w,
                            {
                              key: 0,
                              title: "Open in editor",
                              icon: "i-carbon-launch",
                              disabled: !((R = G(ke)) != null && R.filepath),
                              onClick: u,
                            },
                            null,
                            8,
                            ["disabled"],
                          )),
                          [[T, "Open in editor", void 0, { bottom: !0 }]],
                        ),
                  ]),
                ]),
                ut("div", rdt, [
                  ut(
                    "button",
                    {
                      "tab-button": "",
                      "class": ve({ "tab-button-active": G(Xn) == null }),
                      "data-testid": "btn-report",
                      "onClick": v[0] || (v[0] = (E) => f(null)),
                    },
                    " Report ",
                    2,
                  ),
                  ut(
                    "button",
                    {
                      "tab-button": "",
                      "data-testid": "btn-graph",
                      "class": ve({ "tab-button-active": G(Xn) === "graph" }),
                      "onClick": v[1] || (v[1] = (E) => f("graph")),
                    },
                    " Module Graph ",
                    2,
                  ),
                  G(Ur)
                    ? Qt("", !0)
                    : (lt(),
                      Tt(
                        "button",
                        {
                          "key": 0,
                          "tab-button": "",
                          "data-testid": "btn-code",
                          "class": ve({
                            "tab-button-active": G(Xn) === "editor",
                          }),
                          "onClick": v[2] || (v[2] = (E) => f("editor")),
                        },
                        ee(G(o) ? "* " : "") + "Code ",
                        3,
                      )),
                  ut(
                    "button",
                    {
                      "tab-button": "",
                      "data-testid": "btn-console",
                      "class": ve({
                        "tab-button-active": G(Xn) === "console",
                        "op20": G(Xn) !== "console" && G(h) === 0,
                      }),
                      "onClick": v[3] || (v[3] = (E) => f("console")),
                    },
                    " Console (" + ee(G(h)) + ") ",
                    3,
                  ),
                ]),
              ]),
              ut("div", idt, [
                G(a)
                  ? (lt(),
                    Tt(
                      "div",
                      { "key": 0, "flex-1": G(Xn) === "graph" && "" },
                      [
                        rn(
                          Ft(
                            S,
                            { "graph": G(r), "data-testid": "graph" },
                            null,
                            8,
                            ["graph"],
                          ),
                          [[Sf, G(Xn) === "graph"]],
                        ),
                      ],
                      8,
                      odt,
                    ))
                  : Qt("", !0),
                G(Xn) === "editor"
                  ? (lt(),
                    Jt(
                      N,
                      {
                        "key": G(ke).filepath,
                        "file": G(ke),
                        "data-testid": "editor",
                        "onDraft": p,
                      },
                      null,
                      8,
                      ["file"],
                    ))
                  : G(Xn) === "console"
                    ? (lt(),
                      Jt(
                        L,
                        { "key": 2, "file": G(ke), "data-testid": "console" },
                        null,
                        8,
                        ["file"],
                      ))
                    : G(Xn)
                      ? Qt("", !0)
                      : (lt(),
                        Jt(
                          A,
                          { "key": 3, "file": G(ke), "data-testid": "report" },
                          null,
                          8,
                          ["file"],
                        )),
              ]),
            ]))
          : Qt("", !0)
      }
    },
  }),
  ldt = ["open"],
  adt = ut(
    "div",
    { "flex-1": "", "h-1px": "", "border": "base b", "op80": "" },
    null,
    -1,
  ),
  cdt = ut(
    "div",
    { "flex-1": "", "h-1px": "", "border": "base b", "op80": "" },
    null,
    -1,
  ),
  udt = re({
    __name: "DetailsPanel",
    props: { color: {} },
    setup(t) {
      const e = Vt(!0)
      return (r, o) => (
        lt(),
        Tt(
          "div",
          {
            open: G(e),
            class: "details-panel",
            onToggle: o[0] || (o[0] = (a) => (e.value = a.target.open)),
          },
          [
            ut(
              "div",
              {
                "p": "y1",
                "text-sm": "",
                "bg-base": "",
                "items-center": "",
                "z-5": "",
                "gap-2": "",
                "class": ve(r.color),
                "w-full": "",
                "flex": "",
                "select-none": "",
                "sticky": "",
                "top": "-1",
              },
              [adt, er(r.$slots, "summary", { open: G(e) }), cdt],
              2,
            ),
            er(r.$slots, "default"),
          ],
          40,
          ldt,
        )
      )
    },
  }),
  fdt = {
    "key": 0,
    "flex": "~ row",
    "items-center": "",
    "p": "x-2 y-1",
    "border-rounded": "",
    "cursor-pointer": "",
    "hover": "bg-active",
  },
  hdt = {
    "key": 0,
    "i-logos:typescript-icon": "",
    "flex-shrink-0": "",
    "mr-2": "",
  },
  ddt = ["text"],
  pdt = { "text-sm": "", "truncate": "", "font-light": "" },
  gdt = { key: 0, text: "xs", op20: "", style: { "white-space": "nowrap" } },
  vdt = re({
    __name: "TaskItem",
    props: { task: {} },
    setup(t) {
      const e = t,
        r = xt(() => {
          const { result: o } = e.task
          return o && Math.round(o.duration || 0)
        })
      return (o, a) => {
        var f, h
        const u = Qh
        return o.task
          ? (lt(),
            Tt("div", fdt, [
              Ft(u, { "task": o.task, "mr-2": "" }, null, 8, ["task"]),
              o.task.type === "suite" && o.task.meta.typecheck
                ? (lt(), Tt("div", hdt))
                : Qt("", !0),
              ut(
                "div",
                {
                  "flex": "",
                  "items-end": "",
                  "gap-2": "",
                  "text":
                    ((h = (f = o.task) == null ? void 0 : f.result) == null
                      ? void 0
                      : h.state) === "fail"
                      ? "red-500"
                      : "",
                },
                [
                  ut("span", pdt, ee(o.task.name), 1),
                  typeof G(r) == "number"
                    ? (lt(),
                      Tt("span", gdt, ee(G(r) > 0 ? G(r) : "< 1") + "ms ", 1))
                    : Qt("", !0),
                ],
                8,
                ddt,
              ),
            ]))
          : Qt("", !0)
      }
    },
  })
function mdt(t) {
  return Object.hasOwnProperty.call(t, "tasks")
}
function Sb(t, e) {
  return typeof t != "string" || typeof e != "string"
    ? !1
    : t.toLowerCase().includes(e.toLowerCase())
}
const ydt = { key: 1 },
  bdt = re({
    inheritAttrs: !1,
    __name: "TaskTree",
    props: {
      task: {},
      indent: { default: 0 },
      nested: { type: Boolean, default: !1 },
      search: {},
      onItemClick: { type: Function },
    },
    setup(t) {
      return (e, r) => {
        const o = vdt,
          a = eo("TaskTree", !0)
        return (
          lt(),
          Tt(
            fe,
            null,
            [
              !e.search || G(Sb)(e.task.name, e.search)
                ? (lt(),
                  Jt(
                    o,
                    Si({ key: 0 }, e.$attrs, {
                      task: e.task,
                      style: { paddingLeft: `${e.indent * 0.75 + 1}rem` },
                      onClick:
                        r[0] ||
                        (r[0] = (u) => e.onItemClick && e.onItemClick(e.task)),
                    }),
                    null,
                    16,
                    ["task", "style"],
                  ))
                : Qt("", !0),
              e.nested && e.task.type === "suite" && e.task.tasks.length
                ? (lt(),
                  Tt("div", ydt, [
                    (lt(!0),
                    Tt(
                      fe,
                      null,
                      Qn(
                        e.task.tasks,
                        (u) => (
                          lt(),
                          Jt(
                            a,
                            {
                              "key": u.id,
                              "task": u,
                              "nested": e.nested,
                              "indent": e.indent + 1,
                              "search": e.search,
                              "on-item-click": e.onItemClick,
                            },
                            null,
                            8,
                            [
                              "task",
                              "nested",
                              "indent",
                              "search",
                              "on-item-click",
                            ],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : Qt("", !0),
            ],
            64,
          )
        )
      }
    },
  }),
  wdt = { h: "full", flex: "~ col" },
  xdt = {
    "p": "2",
    "h-10": "",
    "flex": "~ gap-2",
    "items-center": "",
    "bg-header": "",
    "border": "b base",
  },
  _dt = {
    "p": "l3 y2 r2",
    "flex": "~ gap-2",
    "items-center": "",
    "bg-header": "",
    "border": "b-2 base",
  },
  Sdt = ut(
    "div",
    { "class": "i-carbon:search", "flex-shrink-0": "" },
    null,
    -1,
  ),
  kdt = ["op"],
  Cdt = { "class": "scrolls", "flex-auto": "", "py-1": "" },
  Tdt = { "text-red5": "" },
  Edt = { "text-yellow5": "" },
  Ldt = { "text-green5": "" },
  Adt = { class: "text-purple5:50" },
  Mdt = {
    "key": 2,
    "flex": "~ col",
    "items-center": "",
    "p": "x4 y4",
    "font-light": "",
  },
  Ndt = ut("div", { op30: "" }, " No matched test ", -1),
  kb = re({
    inheritAttrs: !1,
    __name: "TasksList",
    props: {
      tasks: {},
      indent: { default: 0 },
      nested: { type: Boolean, default: !1 },
      groupByType: { type: Boolean, default: !1 },
      onItemClick: { type: Function },
    },
    emits: ["run"],
    setup(t, { emit: e }) {
      const r = e,
        o = Vt(""),
        a = Vt(),
        u = xt(() => o.value.trim() !== ""),
        f = xt(() =>
          o.value.trim() ? t.tasks.filter((A) => L([A], o.value)) : t.tasks,
        ),
        h = xt(() =>
          u.value ? f.value.map((A) => ic(A.id)).filter(Boolean) : [],
        ),
        p = xt(() =>
          f.value.filter((A) => {
            var T
            return ((T = A.result) == null ? void 0 : T.state) === "fail"
          }),
        ),
        g = xt(() =>
          f.value.filter((A) => {
            var T
            return ((T = A.result) == null ? void 0 : T.state) === "pass"
          }),
        ),
        v = xt(() =>
          f.value.filter((A) => A.mode === "skip" || A.mode === "todo"),
        ),
        b = xt(() =>
          f.value.filter(
            (A) =>
              !p.value.includes(A) &&
              !g.value.includes(A) &&
              !v.value.includes(A),
          ),
        ),
        w = xt(() => o.value === ""),
        S = eT(b, 250)
      function N(A) {
        var T
        ;(o.value = ""), A && ((T = a.value) == null || T.focus())
      }
      function L(A, T) {
        let M = !1
        for (let R = 0; R < A.length; R++) {
          const E = A[R]
          if (Sb(E.name, T)) {
            M = !0
            break
          }
          if (mdt(E) && E.tasks && ((M = L(E.tasks, T)), M)) break
        }
        return M
      }
      return (A, T) => {
        const M = hs,
          R = bdt,
          E = udt,
          W = lo("tooltip")
        return (
          lt(),
          Tt("div", wdt, [
            ut("div", null, [
              ut("div", xdt, [
                er(A.$slots, "header", { filteredTests: G(u) ? G(h) : void 0 }),
              ]),
              ut("div", _dt, [
                Sdt,
                rn(
                  ut(
                    "input",
                    {
                      "ref_key": "searchBox",
                      "ref": a,
                      "onUpdate:modelValue":
                        T[0] || (T[0] = (X) => (Le(o) ? (o.value = X) : null)),
                      "placeholder": "Search...",
                      "outline": "none",
                      "bg": "transparent",
                      "font": "light",
                      "text": "sm",
                      "flex-1": "",
                      "pl-1": "",
                      "op": G(o).length ? "100" : "50",
                      "onKeydown": [
                        T[1] || (T[1] = Cf((X) => N(!1), ["esc"])),
                        T[2] ||
                          (T[2] = Cf(
                            (X) => r("run", G(u) ? G(h) : void 0),
                            ["enter"],
                          )),
                      ],
                    },
                    null,
                    40,
                    kdt,
                  ),
                  [[Q_, G(o)]],
                ),
                rn(
                  Ft(
                    M,
                    {
                      disabled: G(w),
                      title: "Clear search",
                      icon: "i-carbon:filter-remove",
                      onClickPassive: T[3] || (T[3] = (X) => N(!0)),
                    },
                    null,
                    8,
                    ["disabled"],
                  ),
                  [[W, "Clear search", void 0, { bottom: !0 }]],
                ),
              ]),
            ]),
            ut("div", Cdt, [
              A.groupByType
                ? (lt(),
                  Tt(
                    fe,
                    { key: 0 },
                    [
                      G(p).length
                        ? (lt(),
                          Jt(
                            E,
                            { key: 0 },
                            {
                              summary: Zt(() => [
                                ut(
                                  "div",
                                  Tdt,
                                  " FAIL (" + ee(G(p).length) + ") ",
                                  1,
                                ),
                              ]),
                              default: Zt(() => [
                                (lt(!0),
                                Tt(
                                  fe,
                                  null,
                                  Qn(
                                    G(p),
                                    (X) => (
                                      lt(),
                                      Jt(
                                        R,
                                        {
                                          "key": X.id,
                                          "task": X,
                                          "nested": A.nested,
                                          "search": G(o),
                                          "class": ve(
                                            G(pr) === X.id ? "bg-active" : "",
                                          ),
                                          "on-item-click": A.onItemClick,
                                        },
                                        null,
                                        8,
                                        [
                                          "task",
                                          "nested",
                                          "search",
                                          "class",
                                          "on-item-click",
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : Qt("", !0),
                      G(b).length || G(ml) === "running"
                        ? (lt(),
                          Jt(
                            E,
                            { key: 1 },
                            {
                              summary: Zt(() => [
                                ut(
                                  "div",
                                  Edt,
                                  " RUNNING (" + ee(G(S).length) + ") ",
                                  1,
                                ),
                              ]),
                              default: Zt(() => [
                                (lt(!0),
                                Tt(
                                  fe,
                                  null,
                                  Qn(
                                    G(S),
                                    (X) => (
                                      lt(),
                                      Jt(
                                        R,
                                        {
                                          "key": X.id,
                                          "task": X,
                                          "nested": A.nested,
                                          "search": G(o),
                                          "class": ve(
                                            G(pr) === X.id ? "bg-active" : "",
                                          ),
                                          "on-item-click": A.onItemClick,
                                        },
                                        null,
                                        8,
                                        [
                                          "task",
                                          "nested",
                                          "search",
                                          "class",
                                          "on-item-click",
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : Qt("", !0),
                      G(g).length
                        ? (lt(),
                          Jt(
                            E,
                            { key: 2 },
                            {
                              summary: Zt(() => [
                                ut(
                                  "div",
                                  Ldt,
                                  " PASS (" + ee(G(g).length) + ") ",
                                  1,
                                ),
                              ]),
                              default: Zt(() => [
                                (lt(!0),
                                Tt(
                                  fe,
                                  null,
                                  Qn(
                                    G(g),
                                    (X) => (
                                      lt(),
                                      Jt(
                                        R,
                                        {
                                          "key": X.id,
                                          "task": X,
                                          "nested": A.nested,
                                          "search": G(o),
                                          "class": ve(
                                            G(pr) === X.id ? "bg-active" : "",
                                          ),
                                          "on-item-click": A.onItemClick,
                                        },
                                        null,
                                        8,
                                        [
                                          "task",
                                          "nested",
                                          "search",
                                          "class",
                                          "on-item-click",
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : Qt("", !0),
                      G(v).length
                        ? (lt(),
                          Jt(
                            E,
                            { key: 3 },
                            {
                              summary: Zt(() => [
                                ut(
                                  "div",
                                  Adt,
                                  " SKIP (" + ee(G(v).length) + ") ",
                                  1,
                                ),
                              ]),
                              default: Zt(() => [
                                (lt(!0),
                                Tt(
                                  fe,
                                  null,
                                  Qn(
                                    G(v),
                                    (X) => (
                                      lt(),
                                      Jt(
                                        R,
                                        {
                                          "key": X.id,
                                          "task": X,
                                          "nested": A.nested,
                                          "search": G(o),
                                          "class": ve(
                                            G(pr) === X.id ? "bg-active" : "",
                                          ),
                                          "on-item-click": A.onItemClick,
                                        },
                                        null,
                                        8,
                                        [
                                          "task",
                                          "nested",
                                          "search",
                                          "class",
                                          "on-item-click",
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : Qt("", !0),
                    ],
                    64,
                  ))
                : (lt(!0),
                  Tt(
                    fe,
                    { key: 1 },
                    Qn(
                      G(f),
                      (X) => (
                        lt(),
                        Jt(
                          R,
                          {
                            "key": X.id,
                            "task": X,
                            "nested": A.nested,
                            "search": G(o),
                            "class": ve(G(pr) === X.id ? "bg-active" : ""),
                            "on-item-click": A.onItemClick,
                          },
                          null,
                          8,
                          [
                            "task",
                            "nested",
                            "search",
                            "class",
                            "on-item-click",
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
              G(u) && G(f).length === 0
                ? (lt(),
                  Tt("div", Mdt, [
                    Ndt,
                    ut(
                      "button",
                      {
                        "font-light": "",
                        "op": "50 hover:100",
                        "text-sm": "",
                        "border": "~ gray-400/50 rounded",
                        "p": "x2 y0.5",
                        "m": "t2",
                        "onClickPassive": T[4] || (T[4] = (X) => N(!0)),
                      },
                      " Clear ",
                      32,
                    ),
                  ]))
                : Qt("", !0),
            ]),
          ])
        )
      }
    },
  }),
  Sl = Vt(),
  Xo = Vt(!0),
  oo = Vt(!1),
  dc = Vt(!0),
  Fo = xt(() => {
    var t
    return (t = Ml.value) == null ? void 0 : t.coverage
  }),
  Jf = xt(() => {
    var t, e, r
    return (e = (t = Ml.value) == null ? void 0 : t.api) != null && e.port
      ? (r = Fo.value) == null
        ? void 0
        : r.enabled
      : !1
  }),
  Io = xt(() => Jf.value && Fo.value.reporter.map(([t]) => t).includes("html")),
  Pdt = xt(() => {
    if (Io.value) {
      const t = `${window.location.protocol}//${window.location.hostname}:${Ml.value.api.port}`,
        e = Fo.value.reportsDirectory.lastIndexOf("/"),
        r = Fo.value.reporter.find((o) => {
          if (o[0] === "html") return o
        })
      return r && "subdir" in r[1]
        ? `${t}/${Fo.value.reportsDirectory.slice(e + 1)}/${r[1].subdir}/index.html`
        : `${t}/${Fo.value.reportsDirectory.slice(e + 1)}/index.html`
    }
  })
$e(
  ml,
  (t) => {
    dc.value = t === "running"
  },
  { immediate: !0 },
)
function Odt() {
  const t = pr.value
  if (t && t.length > 0) {
    const e = ic(t)
    e
      ? ((Sl.value = e), (Xo.value = !1), (oo.value = !1))
      : iT(
          () => Ge.state.getFiles(),
          () => {
            ;(Sl.value = ic(t)), (Xo.value = !1), (oo.value = !1)
          },
        )
  }
  return Xo
}
function sf(t) {
  ;(Xo.value = t), (oo.value = !1), t && ((Sl.value = void 0), (pr.value = ""))
}
function Ddt() {
  ;(oo.value = !0), (Xo.value = !1), (Sl.value = void 0), (pr.value = "")
}
const $dt = { "key": 0, "h-full": "" },
  Rdt = {
    "key": 0,
    "i-logos:typescript-icon": "",
    "flex-shrink-0": "",
    "mr-1": "",
  },
  zdt = {
    "data-testid": "filenames",
    "font-bold": "",
    "text-sm": "",
    "flex-auto": "",
    "ws-nowrap": "",
    "overflow-hidden": "",
    "truncate": "",
  },
  Fdt = { class: "flex text-lg" },
  Idt = re({
    __name: "Suites",
    setup(t) {
      const e = xt(() => {
          var u
          return (u = ke.value) == null ? void 0 : u.name.split(/\//g).pop()
        }),
        r = xt(() => {
          var u, f
          return (
            ((u = ke.value) == null ? void 0 : u.tasks) &&
            $c((f = ke.value) == null ? void 0 : f.tasks)
          )
        })
      function o() {
        return ke.value && Ge.rpc.updateSnapshot(ke.value)
      }
      async function a() {
        Io.value && ((dc.value = !0), await Hr()), await WT()
      }
      return (u, f) => {
        const h = Qh,
          p = hs,
          g = kb,
          v = lo("tooltip")
        return G(ke)
          ? (lt(),
            Tt("div", $dt, [
              Ft(
                g,
                { tasks: G(ke).tasks, nested: !0 },
                {
                  header: Zt(() => [
                    Ft(h, { "mx-1": "", "task": G(ke) }, null, 8, ["task"]),
                    G(ke).type === "suite" && G(ke).meta.typecheck
                      ? (lt(), Tt("div", Rdt))
                      : Qt("", !0),
                    ut("span", zdt, ee(G(e)), 1),
                    ut("div", Fdt, [
                      G(r) && !G(Ur)
                        ? rn(
                            (lt(),
                            Jt(
                              p,
                              {
                                key: 0,
                                icon: "i-carbon-result-old",
                                onClick: f[0] || (f[0] = (b) => o()),
                              },
                              null,
                              512,
                            )),
                            [
                              [
                                v,
                                `Update failed snapshot(s) of ${G(ke).name}`,
                                void 0,
                                { bottom: !0 },
                              ],
                            ],
                          )
                        : Qt("", !0),
                      G(Ur)
                        ? Qt("", !0)
                        : rn(
                            (lt(),
                            Jt(
                              p,
                              {
                                key: 1,
                                icon: "i-carbon-play",
                                onClick: f[1] || (f[1] = (b) => a()),
                              },
                              null,
                              512,
                            )),
                            [[v, "Rerun file", void 0, { bottom: !0 }]],
                          ),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["tasks"],
              ),
            ]))
          : Qt("", !0)
      }
    },
  }),
  qdt = { h: "full", flex: "~ col" },
  Hdt = ut(
    "div",
    {
      "p": "3",
      "h-10": "",
      "flex": "~ gap-2",
      "items-center": "",
      "bg-header": "",
      "border": "b base",
    },
    [
      ut("div", { class: "i-carbon:folder-details-reference" }),
      ut(
        "span",
        {
          "pl-1": "",
          "font-bold": "",
          "text-sm": "",
          "flex-auto": "",
          "ws-nowrap": "",
          "overflow-hidden": "",
          "truncate": "",
        },
        "Coverage",
      ),
    ],
    -1,
  ),
  Bdt = { "flex-auto": "", "py-1": "", "bg-white": "" },
  Wdt = ["src"],
  Udt = re({
    __name: "Coverage",
    props: { src: {} },
    setup(t) {
      return (e, r) => (
        lt(),
        Tt("div", qdt, [
          Hdt,
          ut("div", Bdt, [
            ut(
              "iframe",
              { id: "vitest-ui-coverage", src: e.src },
              null,
              8,
              Wdt,
            ),
          ]),
        ])
      )
    },
  }),
  xr = (t) => (Rm("data-v-6679a536"), (t = t()), zm(), t),
  jdt = {
    "data-testid": "test-files-entry",
    "grid": "~ cols-[min-content_1fr_min-content]",
    "items-center": "",
    "gap": "x-2 y-3",
    "p": "x4",
    "relative": "",
    "font-light": "",
    "w-80": "",
    "op80": "",
  },
  Gdt = xr(() => ut("div", { "i-carbon-document": "" }, null, -1)),
  Vdt = xr(() => ut("div", null, "Files", -1)),
  Kdt = { "class": "number", "data-testid": "num-files" },
  Xdt = xr(() => ut("div", { "i-carbon-checkmark": "" }, null, -1)),
  Ydt = xr(() => ut("div", null, "Pass", -1)),
  Zdt = { class: "number" },
  Jdt = xr(() => ut("div", { "i-carbon-close": "" }, null, -1)),
  Qdt = xr(() => ut("div", null, " Fail ", -1)),
  tpt = { "class": "number", "text-red5": "" },
  ept = xr(() => ut("div", { "i-carbon-compare": "" }, null, -1)),
  npt = xr(() => ut("div", null, " Snapshot Fail ", -1)),
  rpt = { "class": "number", "text-red5": "" },
  ipt = xr(() => ut("div", { "i-carbon-timer": "" }, null, -1)),
  opt = xr(() => ut("div", null, "Time", -1)),
  spt = { "class": "number", "data-testid": "run-time" },
  lpt = re({
    __name: "TestFilesEntry",
    setup(t) {
      return (e, r) => (
        lt(),
        Tt("div", jdt, [
          Gdt,
          Vdt,
          ut("div", Kdt, ee(G(mn).length), 1),
          G(sc).length
            ? (lt(),
              Tt(
                fe,
                { key: 0 },
                [Xdt, Ydt, ut("div", Zdt, ee(G(sc).length), 1)],
                64,
              ))
            : Qt("", !0),
          G(oc).length
            ? (lt(),
              Tt(
                fe,
                { key: 1 },
                [Jdt, Qdt, ut("div", tpt, ee(G(oc).length), 1)],
                64,
              ))
            : Qt("", !0),
          G(Mv).length
            ? (lt(),
              Tt(
                fe,
                { key: 2 },
                [ept, npt, ut("div", rpt, ee(G(Mv).length), 1)],
                64,
              ))
            : Qt("", !0),
          ipt,
          opt,
          ut("div", spt, ee(G(hlt)), 1),
        ])
      )
    },
  }),
  apt = ao(lpt, [["__scopeId", "data-v-6679a536"]]),
  cpt = { "p-2": "", "text-center": "", "flex": "" },
  upt = { "text-4xl": "", "min-w-2em": "" },
  fpt = { "text-md": "" },
  hpt = re({
    __name: "DashboardEntry",
    props: { tail: { type: Boolean, default: !1 } },
    setup(t) {
      return (e, r) => (
        lt(),
        Tt("div", cpt, [
          ut("div", null, [
            ut("div", upt, [er(e.$slots, "body")]),
            ut("div", fpt, [er(e.$slots, "header")]),
          ]),
        ])
      )
    },
  }),
  dpt = {
    "flex": "~ wrap",
    "justify-evenly": "",
    "gap-2": "",
    "p": "x-4",
    "relative": "",
  },
  ppt = re({
    __name: "TestsEntry",
    setup(t) {
      const e = xt(() => Fc.value.length),
        r = xt(() => Oy.value.length),
        o = xt(() => Py.value.length),
        a = xt(() => ult.value.length),
        u = xt(() => flt.value.length)
      return (f, h) => {
        const p = hpt
        return (
          lt(),
          Tt("div", dpt, [
            Ft(
              p,
              { "text-green5": "", "data-testid": "pass-entry" },
              {
                header: Zt(() => [dn(" Pass ")]),
                body: Zt(() => [dn(ee(G(r)), 1)]),
                _: 1,
              },
            ),
            Ft(
              p,
              {
                "class": ve({ "text-red5": G(o), "op50": !G(o) }),
                "data-testid": "fail-entry",
              },
              {
                header: Zt(() => [dn(" Fail ")]),
                body: Zt(() => [dn(ee(G(o)), 1)]),
                _: 1,
              },
              8,
              ["class"],
            ),
            G(a)
              ? (lt(),
                Jt(
                  p,
                  { "key": 0, "op50": "", "data-testid": "skipped-entry" },
                  {
                    header: Zt(() => [dn(" Skip ")]),
                    body: Zt(() => [dn(ee(G(a)), 1)]),
                    _: 1,
                  },
                ))
              : Qt("", !0),
            G(u)
              ? (lt(),
                Jt(
                  p,
                  { "key": 1, "op50": "", "data-testid": "todo-entry" },
                  {
                    header: Zt(() => [dn(" Todo ")]),
                    body: Zt(() => [dn(ee(G(u)), 1)]),
                    _: 1,
                  },
                ))
              : Qt("", !0),
            Ft(
              p,
              { "tail": !0, "data-testid": "total-entry" },
              {
                header: Zt(() => [dn(" Total ")]),
                body: Zt(() => [dn(ee(G(e)), 1)]),
                _: 1,
              },
            ),
          ])
        )
      }
    },
  }),
  gpt = {},
  vpt = {
    "gap-0": "",
    "flex": "~ col gap-4",
    "h-full": "",
    "justify-center": "",
    "items-center": "",
  },
  mpt = { "aria-labelledby": "tests", "m": "y-4 x-2" }
function ypt(t, e) {
  const r = ppt,
    o = apt
  return lt(), Tt("div", vpt, [ut("section", mpt, [Ft(r)]), Ft(o)])
}
const bpt = ao(gpt, [["render", ypt]]),
  wpt = {},
  xpt = { h: "full", flex: "~ col" },
  _pt = ut(
    "div",
    {
      "p": "3",
      "h-10": "",
      "flex": "~ gap-2",
      "items-center": "",
      "bg-header": "",
      "border": "b base",
    },
    [
      ut("div", { class: "i-carbon-dashboard" }),
      ut(
        "span",
        {
          "pl-1": "",
          "font-bold": "",
          "text-sm": "",
          "flex-auto": "",
          "ws-nowrap": "",
          "overflow-hidden": "",
          "truncate": "",
        },
        "Dashboard",
      ),
    ],
    -1,
  ),
  Spt = { "class": "scrolls", "flex-auto": "", "py-1": "" }
function kpt(t, e) {
  const r = bpt
  return lt(), Tt("div", xpt, [_pt, ut("div", Spt, [Ft(r)])])
}
const Cpt = ao(wpt, [["render", kpt]]),
  Tpt = "" + new URL("../favicon.svg", import.meta.url).href,
  Ept = ut(
    "img",
    { "w-6": "", "h-6": "", "src": Tpt, "alt": "Vitest logo" },
    null,
    -1,
  ),
  Lpt = ut(
    "span",
    { "font-light": "", "text-sm": "", "flex-1": "" },
    "Vitest",
    -1,
  ),
  Apt = { class: "flex text-lg" },
  Mpt = ut("div", { class: "i-carbon:folder-off ma" }, null, -1),
  Npt = ut(
    "div",
    { class: "op100 gap-1 p-y-1", grid: "~ items-center cols-[1.5em_1fr]" },
    [
      ut("div", { class: "i-carbon:information-square w-1.5em h-1.5em" }),
      ut("div", null, "Coverage enabled but missing html reporter."),
      ut(
        "div",
        { style: { "grid-column": "2" } },
        " Add html reporter to your configuration to see coverage here. ",
      ),
    ],
    -1,
  ),
  Ppt = re({
    __name: "Navigation",
    setup(t) {
      const e = xt(() => mn.value && $c(mn.value))
      function r() {
        return Ge.rpc.updateSnapshot()
      }
      const o = xt(() => (Nl.value ? "light" : "dark"))
      function a(f) {
        ;(pr.value = f.id), (Sl.value = ic(f.id)), sf(!1)
      }
      async function u(f) {
        Io.value &&
          ((dc.value = !0), await Hr(), oo.value && (sf(!0), await Hr())),
          await BT(f)
      }
      return (f, h) => {
        const p = hs,
          g = kb,
          v = lo("tooltip")
        return (
          lt(),
          Jt(
            g,
            {
              "border": "r base",
              "tasks": G(mn),
              "on-item-click": a,
              "group-by-type": !0,
              "onRun": u,
            },
            {
              header: Zt(({ filteredTests: b }) => [
                Ept,
                Lpt,
                ut("div", Apt, [
                  rn(
                    Ft(
                      p,
                      {
                        "title": "Show dashboard",
                        "class": "!animate-100ms",
                        "animate-count-1": "",
                        "icon": "i-carbon:dashboard",
                        "onClick": h[0] || (h[0] = (w) => G(sf)(!0)),
                      },
                      null,
                      512,
                    ),
                    [
                      [Sf, (G(Jf) && !G(Io)) || !G(Xo)],
                      [v, "Dashboard", void 0, { bottom: !0 }],
                    ],
                  ),
                  G(Jf) && !G(Io)
                    ? (lt(),
                      Jt(
                        G(xC),
                        {
                          key: 0,
                          title: "Coverage enabled but missing html reporter",
                          class:
                            "w-1.4em h-1.4em op100 rounded flex color-red5 dark:color-#f43f5e cursor-help",
                        },
                        {
                          popper: Zt(() => [Npt]),
                          default: Zt(() => [Mpt]),
                          _: 1,
                        },
                      ))
                    : Qt("", !0),
                  G(Io)
                    ? rn(
                        (lt(),
                        Jt(
                          p,
                          {
                            "key": 1,
                            "disabled": G(dc),
                            "title": "Show coverage",
                            "class": "!animate-100ms",
                            "animate-count-1": "",
                            "icon": "i-carbon:folder-details-reference",
                            "onClick": h[1] || (h[1] = (w) => G(Ddt)()),
                          },
                          null,
                          8,
                          ["disabled"],
                        )),
                        [
                          [Sf, !G(oo)],
                          [v, "Coverage", void 0, { bottom: !0 }],
                        ],
                      )
                    : Qt("", !0),
                  G(e) && !G(Ur)
                    ? rn(
                        (lt(),
                        Jt(
                          p,
                          {
                            key: 2,
                            icon: "i-carbon:result-old",
                            onClick: h[2] || (h[2] = (w) => r()),
                          },
                          null,
                          512,
                        )),
                        [
                          [
                            v,
                            "Update all failed snapshot(s)",
                            void 0,
                            { bottom: !0 },
                          ],
                        ],
                      )
                    : Qt("", !0),
                  G(Ur)
                    ? Qt("", !0)
                    : rn(
                        (lt(),
                        Jt(
                          p,
                          {
                            key: 3,
                            disabled: (b == null ? void 0 : b.length) === 0,
                            icon: "i-carbon:play",
                            onClick: (w) => u(b),
                          },
                          null,
                          8,
                          ["disabled", "onClick"],
                        )),
                        [
                          [
                            v,
                            b
                              ? b.length === 0
                                ? "No test to run (clear filter)"
                                : "Rerun filtered"
                              : "Rerun all",
                            void 0,
                            { bottom: !0 },
                          ],
                        ],
                      ),
                  rn(
                    Ft(
                      p,
                      {
                        icon: "dark:i-carbon-moon i-carbon:sun",
                        onClick: h[3] || (h[3] = (w) => G(Vst)()),
                      },
                      null,
                      512,
                    ),
                    [[v, `Toggle to ${G(o)} mode`, void 0, { bottom: !0 }]],
                  ),
                ]),
              ]),
              _: 1,
            },
            8,
            ["tasks"],
          )
        )
      }
    },
  }),
  Opt = {
    "h-3px": "",
    "relative": "",
    "overflow-hidden": "",
    "class": "px-0",
    "w-screen": "",
  },
  Dpt = re({
    __name: "ProgressBar",
    setup(t) {
      const { width: e } = bT(),
        r = xt(() =>
          mn.value.length === 0
            ? "!bg-gray-4 !dark:bg-gray-7 in-progress"
            : clt.value
              ? null
              : "in-progress",
        ),
        o = xt(() => mn.value.length),
        a = xt(() => sc.value.length),
        u = xt(() => oc.value.length),
        f = xt(() => {
          const v = G(o)
          return v > 0 ? (e.value * a.value) / v : 0
        }),
        h = xt(() => {
          const v = G(o)
          return v > 0 ? (e.value * u.value) / v : 0
        }),
        p = xt(() => G(o) - u.value - a.value),
        g = xt(() => {
          const v = G(o)
          return v > 0 ? (e.value * p.value) / v : 0
        })
      return (v, b) => (
        lt(),
        Tt(
          "div",
          {
            "absolute": "",
            "t-0": "",
            "l-0": "",
            "r-0": "",
            "z-index-1031": "",
            "pointer-events-none": "",
            "p-0": "",
            "h-3px": "",
            "grid": "~ auto-cols-max",
            "justify-items-center": "",
            "w-screen": "",
            "class": ve(G(r)),
          },
          [
            ut("div", Opt, [
              ut(
                "div",
                {
                  "absolute": "",
                  "l-0": "",
                  "t-0": "",
                  "bg-red5": "",
                  "h-3px": "",
                  "class": ve(G(r)),
                  "style": Ln(`width: ${G(h)}px;`),
                },
                "   ",
                6,
              ),
              ut(
                "div",
                {
                  "absolute": "",
                  "l-0": "",
                  "t-0": "",
                  "bg-green5": "",
                  "h-3px": "",
                  "class": ve(G(r)),
                  "style": Ln(`left: ${G(h)}px; width: ${G(f)}px;`),
                },
                "   ",
                6,
              ),
              ut(
                "div",
                {
                  "absolute": "",
                  "l-0": "",
                  "t-0": "",
                  "bg-yellow5": "",
                  "h-3px": "",
                  "class": ve(G(r)),
                  "style": Ln(`left: ${G(f) + G(h)}px; width: ${G(g)}px;`),
                },
                "   ",
                6,
              ),
            ]),
          ],
          2,
        )
      )
    },
  }),
  $pt = ao(Dpt, [["__scopeId", "data-v-f967c1fe"]]),
  lm = {
    name: "splitpanes",
    emits: [
      "ready",
      "resize",
      "resized",
      "pane-click",
      "pane-maximize",
      "pane-add",
      "pane-remove",
      "splitter-click",
    ],
    props: {
      horizontal: { type: Boolean },
      pushOtherPanes: { type: Boolean, default: !0 },
      dblClickSplitter: { type: Boolean, default: !0 },
      rtl: { type: Boolean, default: !1 },
      firstSplitter: { type: Boolean },
    },
    provide() {
      return {
        requestUpdate: this.requestUpdate,
        onPaneAdd: this.onPaneAdd,
        onPaneRemove: this.onPaneRemove,
        onPaneClick: this.onPaneClick,
      }
    },
    data: () => ({
      container: null,
      ready: !1,
      panes: [],
      touch: { mouseDown: !1, dragging: !1, activeSplitter: null },
      splitterTaps: { splitter: null, timeoutId: null },
    }),
    computed: {
      panesCount() {
        return this.panes.length
      },
      indexedPanes() {
        return this.panes.reduce((t, e) => (t[e.id] = e) && t, {})
      },
    },
    methods: {
      updatePaneComponents() {
        this.panes.forEach((t) => {
          t.update &&
            t.update({
              [this.horizontal ? "height" : "width"]:
                `${this.indexedPanes[t.id].size}%`,
            })
        })
      },
      bindEvents() {
        document.addEventListener("mousemove", this.onMouseMove, {
          passive: !1,
        }),
          document.addEventListener("mouseup", this.onMouseUp),
          "ontouchstart" in window &&
            (document.addEventListener("touchmove", this.onMouseMove, {
              passive: !1,
            }),
            document.addEventListener("touchend", this.onMouseUp))
      },
      unbindEvents() {
        document.removeEventListener("mousemove", this.onMouseMove, {
          passive: !1,
        }),
          document.removeEventListener("mouseup", this.onMouseUp),
          "ontouchstart" in window &&
            (document.removeEventListener("touchmove", this.onMouseMove, {
              passive: !1,
            }),
            document.removeEventListener("touchend", this.onMouseUp))
      },
      onMouseDown(t, e) {
        this.bindEvents(),
          (this.touch.mouseDown = !0),
          (this.touch.activeSplitter = e)
      },
      onMouseMove(t) {
        this.touch.mouseDown &&
          (t.preventDefault(),
          (this.touch.dragging = !0),
          this.calculatePanesSize(this.getCurrentMouseDrag(t)),
          this.$emit(
            "resize",
            this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size })),
          ))
      },
      onMouseUp() {
        this.touch.dragging &&
          this.$emit(
            "resized",
            this.panes.map((t) => ({ min: t.min, max: t.max, size: t.size })),
          ),
          (this.touch.mouseDown = !1),
          setTimeout(() => {
            ;(this.touch.dragging = !1), this.unbindEvents()
          }, 100)
      },
      onSplitterClick(t, e) {
        "ontouchstart" in window &&
          (t.preventDefault(),
          this.dblClickSplitter &&
            (this.splitterTaps.splitter === e
              ? (clearTimeout(this.splitterTaps.timeoutId),
                (this.splitterTaps.timeoutId = null),
                this.onSplitterDblClick(t, e),
                (this.splitterTaps.splitter = null))
              : ((this.splitterTaps.splitter = e),
                (this.splitterTaps.timeoutId = setTimeout(() => {
                  this.splitterTaps.splitter = null
                }, 500))))),
          this.touch.dragging || this.$emit("splitter-click", this.panes[e])
      },
      onSplitterDblClick(t, e) {
        let r = 0
        ;(this.panes = this.panes.map(
          (o, a) => (
            (o.size = a === e ? o.max : o.min), a !== e && (r += o.min), o
          ),
        )),
          (this.panes[e].size -= r),
          this.$emit("pane-maximize", this.panes[e]),
          this.$emit(
            "resized",
            this.panes.map((o) => ({ min: o.min, max: o.max, size: o.size })),
          )
      },
      onPaneClick(t, e) {
        this.$emit("pane-click", this.indexedPanes[e])
      },
      getCurrentMouseDrag(t) {
        const e = this.container.getBoundingClientRect(),
          { clientX: r, clientY: o } =
            "ontouchstart" in window && t.touches ? t.touches[0] : t
        return { x: r - e.left, y: o - e.top }
      },
      getCurrentDragPercentage(t) {
        t = t[this.horizontal ? "y" : "x"]
        const e =
          this.container[this.horizontal ? "clientHeight" : "clientWidth"]
        return this.rtl && !this.horizontal && (t = e - t), (t * 100) / e
      },
      calculatePanesSize(t) {
        const e = this.touch.activeSplitter
        let r = {
          prevPanesSize: this.sumPrevPanesSize(e),
          nextPanesSize: this.sumNextPanesSize(e),
          prevReachedMinPanes: 0,
          nextReachedMinPanes: 0,
        }
        const o = 0 + (this.pushOtherPanes ? 0 : r.prevPanesSize),
          a = 100 - (this.pushOtherPanes ? 0 : r.nextPanesSize),
          u = Math.max(Math.min(this.getCurrentDragPercentage(t), a), o)
        let f = [e, e + 1],
          h = this.panes[f[0]] || null,
          p = this.panes[f[1]] || null
        const g = h.max < 100 && u >= h.max + r.prevPanesSize,
          v = p.max < 100 && u <= 100 - (p.max + this.sumNextPanesSize(e + 1))
        if (g || v) {
          g
            ? ((h.size = h.max),
              (p.size = Math.max(
                100 - h.max - r.prevPanesSize - r.nextPanesSize,
                0,
              )))
            : ((h.size = Math.max(
                100 - p.max - r.prevPanesSize - this.sumNextPanesSize(e + 1),
                0,
              )),
              (p.size = p.max))
          return
        }
        if (this.pushOtherPanes) {
          const b = this.doPushOtherPanes(r, u)
          if (!b) return
          ;({ sums: r, panesToResize: f } = b),
            (h = this.panes[f[0]] || null),
            (p = this.panes[f[1]] || null)
        }
        h !== null &&
          (h.size = Math.min(
            Math.max(u - r.prevPanesSize - r.prevReachedMinPanes, h.min),
            h.max,
          )),
          p !== null &&
            (p.size = Math.min(
              Math.max(
                100 - u - r.nextPanesSize - r.nextReachedMinPanes,
                p.min,
              ),
              p.max,
            ))
      },
      doPushOtherPanes(t, e) {
        const r = this.touch.activeSplitter,
          o = [r, r + 1]
        return e < t.prevPanesSize + this.panes[o[0]].min &&
          ((o[0] = this.findPrevExpandedPane(r).index),
          (t.prevReachedMinPanes = 0),
          o[0] < r &&
            this.panes.forEach((a, u) => {
              u > o[0] &&
                u <= r &&
                ((a.size = a.min), (t.prevReachedMinPanes += a.min))
            }),
          (t.prevPanesSize = this.sumPrevPanesSize(o[0])),
          o[0] === void 0)
          ? ((t.prevReachedMinPanes = 0),
            (this.panes[0].size = this.panes[0].min),
            this.panes.forEach((a, u) => {
              u > 0 &&
                u <= r &&
                ((a.size = a.min), (t.prevReachedMinPanes += a.min))
            }),
            (this.panes[o[1]].size =
              100 -
              t.prevReachedMinPanes -
              this.panes[0].min -
              t.prevPanesSize -
              t.nextPanesSize),
            null)
          : e > 100 - t.nextPanesSize - this.panes[o[1]].min &&
              ((o[1] = this.findNextExpandedPane(r).index),
              (t.nextReachedMinPanes = 0),
              o[1] > r + 1 &&
                this.panes.forEach((a, u) => {
                  u > r &&
                    u < o[1] &&
                    ((a.size = a.min), (t.nextReachedMinPanes += a.min))
                }),
              (t.nextPanesSize = this.sumNextPanesSize(o[1] - 1)),
              o[1] === void 0)
            ? ((t.nextReachedMinPanes = 0),
              (this.panes[this.panesCount - 1].size =
                this.panes[this.panesCount - 1].min),
              this.panes.forEach((a, u) => {
                u < this.panesCount - 1 &&
                  u >= r + 1 &&
                  ((a.size = a.min), (t.nextReachedMinPanes += a.min))
              }),
              (this.panes[o[0]].size =
                100 -
                t.prevPanesSize -
                t.nextReachedMinPanes -
                this.panes[this.panesCount - 1].min -
                t.nextPanesSize),
              null)
            : { sums: t, panesToResize: o }
      },
      sumPrevPanesSize(t) {
        return this.panes.reduce((e, r, o) => e + (o < t ? r.size : 0), 0)
      },
      sumNextPanesSize(t) {
        return this.panes.reduce((e, r, o) => e + (o > t + 1 ? r.size : 0), 0)
      },
      findPrevExpandedPane(t) {
        return (
          [...this.panes]
            .reverse()
            .find((e) => e.index < t && e.size > e.min) || {}
        )
      },
      findNextExpandedPane(t) {
        return this.panes.find((e) => e.index > t + 1 && e.size > e.min) || {}
      },
      checkSplitpanesNodes() {
        Array.from(this.container.children).forEach((t) => {
          const e = t.classList.contains("splitpanes__pane"),
            r = t.classList.contains("splitpanes__splitter")
          !e &&
            !r &&
            (t.parentNode.removeChild(t),
            console.warn(
              "Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.",
            ))
        })
      },
      addSplitter(t, e, r = !1) {
        const o = t - 1,
          a = document.createElement("div")
        a.classList.add("splitpanes__splitter"),
          r ||
            ((a.onmousedown = (u) => this.onMouseDown(u, o)),
            typeof window < "u" &&
              "ontouchstart" in window &&
              (a.ontouchstart = (u) => this.onMouseDown(u, o)),
            (a.onclick = (u) => this.onSplitterClick(u, o + 1))),
          this.dblClickSplitter &&
            (a.ondblclick = (u) => this.onSplitterDblClick(u, o + 1)),
          e.parentNode.insertBefore(a, e)
      },
      removeSplitter(t) {
        ;(t.onmousedown = void 0),
          (t.onclick = void 0),
          (t.ondblclick = void 0),
          t.parentNode.removeChild(t)
      },
      redoSplitters() {
        const t = Array.from(this.container.children)
        t.forEach((r) => {
          r.className.includes("splitpanes__splitter") && this.removeSplitter(r)
        })
        let e = 0
        t.forEach((r) => {
          r.className.includes("splitpanes__pane") &&
            (!e && this.firstSplitter
              ? this.addSplitter(e, r, !0)
              : e && this.addSplitter(e, r),
            e++)
        })
      },
      requestUpdate({ target: t, ...e }) {
        const r = this.indexedPanes[t._.uid]
        Object.entries(e).forEach(([o, a]) => (r[o] = a))
      },
      onPaneAdd(t) {
        let e = -1
        Array.from(t.$el.parentNode.children).some(
          (a) => (a.className.includes("splitpanes__pane") && e++, a === t.$el),
        )
        const r = parseFloat(t.minSize),
          o = parseFloat(t.maxSize)
        this.panes.splice(e, 0, {
          id: t._.uid,
          index: e,
          min: isNaN(r) ? 0 : r,
          max: isNaN(o) ? 100 : o,
          size: t.size === null ? null : parseFloat(t.size),
          givenSize: t.size,
          update: t.update,
        }),
          this.panes.forEach((a, u) => (a.index = u)),
          this.ready &&
            this.$nextTick(() => {
              this.redoSplitters(),
                this.resetPaneSizes({ addedPane: this.panes[e] }),
                this.$emit("pane-add", {
                  index: e,
                  panes: this.panes.map((a) => ({
                    min: a.min,
                    max: a.max,
                    size: a.size,
                  })),
                })
            })
      },
      onPaneRemove(t) {
        const e = this.panes.findIndex((o) => o.id === t._.uid),
          r = this.panes.splice(e, 1)[0]
        this.panes.forEach((o, a) => (o.index = a)),
          this.$nextTick(() => {
            this.redoSplitters(),
              this.resetPaneSizes({ removedPane: { ...r, index: e } }),
              this.$emit("pane-remove", {
                removed: r,
                panes: this.panes.map((o) => ({
                  min: o.min,
                  max: o.max,
                  size: o.size,
                })),
              })
          })
      },
      resetPaneSizes(t = {}) {
        !t.addedPane && !t.removedPane
          ? this.initialPanesSizing()
          : this.panes.some((e) => e.givenSize !== null || e.min || e.max < 100)
            ? this.equalizeAfterAddOrRemove(t)
            : this.equalize(),
          this.ready &&
            this.$emit(
              "resized",
              this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size })),
            )
      },
      equalize() {
        const t = 100 / this.panesCount
        let e = 0
        const r = [],
          o = []
        this.panes.forEach((a) => {
          ;(a.size = Math.max(Math.min(t, a.max), a.min)),
            (e -= a.size),
            a.size >= a.max && r.push(a.id),
            a.size <= a.min && o.push(a.id)
        }),
          e > 0.1 && this.readjustSizes(e, r, o)
      },
      initialPanesSizing() {
        let t = 100
        const e = [],
          r = []
        let o = 0
        this.panes.forEach((u) => {
          ;(t -= u.size),
            u.size !== null && o++,
            u.size >= u.max && e.push(u.id),
            u.size <= u.min && r.push(u.id)
        })
        let a = 100
        t > 0.1 &&
          (this.panes.forEach((u) => {
            u.size === null &&
              (u.size = Math.max(
                Math.min(t / (this.panesCount - o), u.max),
                u.min,
              )),
              (a -= u.size)
          }),
          a > 0.1 && this.readjustSizes(t, e, r))
      },
      equalizeAfterAddOrRemove({ addedPane: t, removedPane: e } = {}) {
        let r = 100 / this.panesCount,
          o = 0
        const a = [],
          u = []
        t &&
          t.givenSize !== null &&
          (r = (100 - t.givenSize) / (this.panesCount - 1)),
          this.panes.forEach((f) => {
            ;(o -= f.size),
              f.size >= f.max && a.push(f.id),
              f.size <= f.min && u.push(f.id)
          }),
          !(Math.abs(o) < 0.1) &&
            (this.panes.forEach((f) => {
              ;(t && t.givenSize !== null && t.id === f.id) ||
                (f.size = Math.max(Math.min(r, f.max), f.min)),
                (o -= f.size),
                f.size >= f.max && a.push(f.id),
                f.size <= f.min && u.push(f.id)
            }),
            o > 0.1 && this.readjustSizes(o, a, u))
      },
      readjustSizes(t, e, r) {
        let o
        t > 0
          ? (o = t / (this.panesCount - e.length))
          : (o = t / (this.panesCount - r.length)),
          this.panes.forEach((a, u) => {
            if (t > 0 && !e.includes(a.id)) {
              const f = Math.max(Math.min(a.size + o, a.max), a.min),
                h = f - a.size
              ;(t -= h), (a.size = f)
            } else if (!r.includes(a.id)) {
              const f = Math.max(Math.min(a.size + o, a.max), a.min),
                h = f - a.size
              ;(t -= h), (a.size = f)
            }
            a.update({
              [this.horizontal ? "height" : "width"]:
                `${this.indexedPanes[a.id].size}%`,
            })
          }),
          Math.abs(t) > 0.1 &&
            this.$nextTick(() => {
              this.ready &&
                console.warn(
                  "Splitpanes: Could not resize panes correctly due to their constraints.",
                )
            })
      },
    },
    watch: {
      panes: {
        deep: !0,
        immediate: !1,
        handler() {
          this.updatePaneComponents()
        },
      },
      horizontal() {
        this.updatePaneComponents()
      },
      firstSplitter() {
        this.redoSplitters()
      },
      dblClickSplitter(t) {
        ;[...this.container.querySelectorAll(".splitpanes__splitter")].forEach(
          (e, r) => {
            e.ondblclick = t ? (o) => this.onSplitterDblClick(o, r) : void 0
          },
        )
      },
    },
    beforeUnmount() {
      this.ready = !1
    },
    mounted() {
      ;(this.container = this.$refs.container),
        this.checkSplitpanesNodes(),
        this.redoSplitters(),
        this.resetPaneSizes(),
        this.$emit("ready"),
        (this.ready = !0)
    },
    render() {
      return Tl(
        "div",
        {
          ref: "container",
          class: [
            "splitpanes",
            `splitpanes--${this.horizontal ? "horizontal" : "vertical"}`,
            { "splitpanes--dragging": this.touch.dragging },
          ],
        },
        this.$slots.default(),
      )
    },
  },
  Rpt = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, a] of e) r[o] = a
    return r
  },
  zpt = {
    name: "pane",
    inject: ["requestUpdate", "onPaneAdd", "onPaneRemove", "onPaneClick"],
    props: {
      size: { type: [Number, String], default: null },
      minSize: { type: [Number, String], default: 0 },
      maxSize: { type: [Number, String], default: 100 },
    },
    data: () => ({ style: {} }),
    mounted() {
      this.onPaneAdd(this)
    },
    beforeUnmount() {
      this.onPaneRemove(this)
    },
    methods: {
      update(t) {
        this.style = t
      },
    },
    computed: {
      sizeNumber() {
        return this.size || this.size === 0 ? parseFloat(this.size) : null
      },
      minSizeNumber() {
        return parseFloat(this.minSize)
      },
      maxSizeNumber() {
        return parseFloat(this.maxSize)
      },
    },
    watch: {
      sizeNumber(t) {
        this.requestUpdate({ target: this, size: t })
      },
      minSizeNumber(t) {
        this.requestUpdate({ target: this, min: t })
      },
      maxSizeNumber(t) {
        this.requestUpdate({ target: this, max: t })
      },
    },
  }
function Fpt(t, e, r, o, a, u) {
  return (
    lt(),
    Tt(
      "div",
      {
        class: "splitpanes__pane",
        onClick: e[0] || (e[0] = (f) => u.onPaneClick(f, t._.uid)),
        style: Ln(t.style),
      },
      [er(t.$slots, "default")],
      4,
    )
  )
}
const Na = Rpt(zpt, [["render", Fpt]]),
  Ipt = { "h-screen": "", "w-screen": "", "overflow": "hidden" },
  qpt = re({
    __name: "index",
    setup(t) {
      const e = Odt(),
        r = Bn([33, 67]),
        o = Bn([33, 67]),
        a = yv((h) => {
          h.forEach((p, g) => {
            r[g] = p.size
          })
        }, 0),
        u = yv((h) => {
          h.forEach((p, g) => {
            o[g] = p.size
          })
        }, 0)
      function f() {
        const h = window.innerWidth,
          p = Math.min(h / 3, 300)
        ;(r[0] = (100 * p) / h),
          (r[1] = 100 - r[0]),
          (o[0] = (100 * p) / (h - p)),
          (o[1] = 100 - o[0])
      }
      return (h, p) => {
        const g = $pt,
          v = Ppt,
          b = Cpt,
          w = Udt,
          S = Idt,
          N = sdt,
          L = GT
        return (
          lt(),
          Tt(
            fe,
            null,
            [
              Ft(g),
              ut("div", Ipt, [
                Ft(
                  G(lm),
                  { class: "pt-4px", onResized: G(a), onReady: f },
                  {
                    default: Zt(() => [
                      Ft(
                        G(Na),
                        { size: G(r)[0] },
                        { default: Zt(() => [Ft(v)]), _: 1 },
                        8,
                        ["size"],
                      ),
                      Ft(
                        G(Na),
                        { size: G(r)[1] },
                        {
                          default: Zt(() => [
                            Ft(kh, null, {
                              default: Zt(() => [
                                G(e)
                                  ? (lt(), Jt(b, { key: "summary" }))
                                  : G(oo)
                                    ? (lt(),
                                      Jt(
                                        w,
                                        { key: "coverage", src: G(Pdt) },
                                        null,
                                        8,
                                        ["src"],
                                      ))
                                    : (lt(),
                                      Jt(
                                        G(lm),
                                        { key: "detail", onResized: G(u) },
                                        {
                                          default: Zt(() => [
                                            Ft(
                                              G(Na),
                                              { size: G(o)[0] },
                                              {
                                                default: Zt(() => [Ft(S)]),
                                                _: 1,
                                              },
                                              8,
                                              ["size"],
                                            ),
                                            Ft(
                                              G(Na),
                                              { size: G(o)[1] },
                                              {
                                                default: Zt(() => [Ft(N)]),
                                                _: 1,
                                              },
                                              8,
                                              ["size"],
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["onResized"],
                                      )),
                              ]),
                              _: 1,
                            }),
                          ]),
                          _: 1,
                        },
                        8,
                        ["size"],
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["onResized"],
                ),
              ]),
              Ft(L),
            ],
            64,
          )
        )
      }
    },
  }),
  Hpt = [{ name: "index", path: "/", component: qpt, props: !0 }],
  Bpt = { tooltip: wC }
W0.options.instantMove = !0
W0.options.distance = 10
function Wpt() {
  return ck({ history: CS(), routes: Hpt })
}
const Upt = [Wpt],
  td = c0(sS)
Upt.forEach((t) => {
  td.use(t())
})
Object.entries(Bpt).forEach(([t, e]) => {
  td.directive(t, e)
})
td.mount("#app")
