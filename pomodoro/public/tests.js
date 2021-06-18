{ for (; ;)switch (e.prev = e.next) { case 0: return this.timeout(1e5), m(), ae(Array(60).fill(t)), ae([a]), r = document.getElementById("timer-label").innerHTML, e.next = 7, f(); 
case 7: return e.next = 9, p(); case 9: n = +oe(document.getElementById("break-length")), s = +l(document.getElementById("time-left").innerText), o.assert.isAtMost(s, n, "Break time didn't
 start with the correct value."), i = document.getElementById("timer-label").innerHTML, o.assert.notStrictEqual(i, r, "Timer has reached zero but didn't switch to Break time"); case 14: 
 case "end": return e.stop() } }), e, this)})))), it('When a session countdown reaches zero (NOTE: timer MUST\n      reach 00:00), a new break countdown should begin, counting down from
  the\n      value currently displayed in the id="break-length" element.', K()(Y.a.mark((function e() { var r, n, s, i; return Y.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) 
    { case 0: return this.timeout(1e5), m(), ae(Array(60).fill(t)), ae([a]), r = document.getElementById("timer-label").innerHTML, e.next = 7, f(); case 7: return e.next = 9, p(); case 9: 
    n = document.getElementById("timer-label").innerHTML, o.assert.notStrictEqual(n, r, "Timer has reached zero but didn't switch to Break time"), s = +oe(document.getElementById
        ("break-length")), i = +l(document.getElementById("time-left").innerText), o.assert.strictEqual(i, s, "Timer has switched to Break time, but it didn't start with the correct value.");
         case 14: case "end": return e.stop() } }), e, this) })))), it('When a break countdown reaches zero (NOTE: timer MUST reach\n      00:00), and a new countdown begins, the element
          with the id of\n      "timer-label" should display a string indicating a session has begun.', K()(Y.a.mark((function r() { var n, s; return Y.a.wrap((function (r) { for (; ;)
            switch
             (r.prev = r.next) { case 0: return this.timeout(2e5), m(), ae(Array(60).fill(t)), ae(Array(60).fill(e)), ae([a]), r.next = 7, f(); case 7: return r.next = 9, p(); case 9: return n
                 = document.getElementById("timer-label").innerHTML, r.next = 12, f(); case 12: return r.next = 14, p(); case 14: s = document.getElementById("timer-label").innerHTML, 
                 o.assert.notStrictEqual(s, n, "Timer has reached zero but didn't switch back to Session time."); case 16: case "end": return r.stop() } }), r, this) })))),
                  it('When a break countdown reaches zero (NOTE: timer MUST\n      reach 00:00), a new session countdown should begin, counting down from\n     
                   the value currently displayed in the id="session-length" element.', K()(Y.a.mark((function r() { var n, s, i, u; return Y.a.wrap((function (r) { for (; ;)switch 
                    (r.prev = r.next) { case 0: return this.timeout(2e5), m(), ae(Array(60).fill(t)), ae(Array(60).fill(e)), ae([a]), r.next = 7, f(); case 7: return r.next = 9, p(); 
                        case 9: return n = document.getElementById("timer-label").innerHTML, r.next = 12, f(); case 12: return r.next = 14, p(); case 14: 
                        s = document.getElementById("timer-label").innerHTML, o.assert.notStrictEqual(s, n, "Timer has reached zero but didn't switch back to Session time."),
                         i = +oe(document.getElementById("session-length")), u = +l(document.getElementById("time-left").innerText), o.assert.strictEqual(u, i, "Timer has switched back to Session time, but it didn't start with the correct value."); 
                         case 19: case "end": return r.stop() } }), r, this) }))))})), describe("#Audio", (function () { it('When a countdown reaches zero (NOTE: timer MUST reach\n 
         00:00), a sound indicating that time is up should play. This should\n      utilize an HTML5 <audio> tag and have a corresponding id="beep".', K()(Y.a.mark((function e() { return Y.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) 
            { case 0: return this.timeout(1e5), o.assert.isNotNull(document.querySelector("audio#beep"), 'There is no audio tag with ID "beep" on the page.'),
         