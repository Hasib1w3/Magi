/* CLASS 12 PHYSICS, CHAPTER 2: MOTION (1 axis, then 2 axes)
   sim() = animated lesson. Slider scrubs time, Pause stops it.
   cue = [time, spoken text, formula shown (stays on screen), code line to highlight] */

/* runs INSIDE the lesson iframe */
function rt(cfg, draw) {
  const st = getComputedStyle(document.documentElement), v = n => st.getPropertyValue(n).trim();
  const C = { b: v('--blue'), s: v('--blue-soft'), t: v('--text'), e: v('--edge'), g: v('--syn-com') };
  C.L = (x, a, b, c, d, col, w) => { x.strokeStyle = col; x.lineWidth = w; x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke() };
  C.D = (x, a, b, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() };
  C.T = (x, s, a, b, col, al = 'center') => { x.fillStyle = col; x.font = '16px system-ui'; x.textAlign = al; x.fillText(s, a, b) };
  addEventListener('DOMContentLoaded', () => {
    const $ = s => document.querySelector(s), cv = $('canvas'), x = cv.getContext('2d'), sl = $('input'), pb = $('#pp'),
      say = $('#say'), eq = $('#eq'), ln = [...document.querySelectorAll('.ln')];
    let t = 0, play = true, last = 0, W, H;
    function render() {
      x.clearRect(0, 0, W, H); draw(x, t, W, H, C);
      let cur = -1; cfg.cues.forEach((c, i) => { if (c[0] <= t) cur = i });
      say.textContent = cur < 0 ? '' : cfg.cues[cur][1];
      eq.innerHTML = cfg.cues.slice(0, cur + 1).filter(c => c[2]).map((c, i, a) => `<div class="note"><code>${i == a.length - 1 ? '<b>' + c[2] + '</b>' : c[2]}</code></div>`).join('');
      ln.forEach((l, i) => l.classList.toggle('mark', cur >= 0 && cfg.cues[cur][3] === i + 1));
      sl.value = t / cfg.T * 1000; pb.textContent = play ? 'Pause' : t >= cfg.T ? 'Replay' : 'Play';
    }
    function fit() { const r = devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * r; cv.height = H * r; x.setTransform(r, 0, 0, r, 0, 0); render() }
    function tick(n) {
      if (play) { t = Math.min(cfg.T, t + (n - last) / 1000); if (t >= cfg.T) play = false; render() }
      last = n; requestAnimationFrame(tick)
    }
    pb.onclick = () => { if (!play && t >= cfg.T) t = 0; play = !play; render() };
    sl.oninput = () => { play = false; t = sl.value / 1000 * cfg.T; render() };
    addEventListener('resize', fit); fit(); requestAnimationFrame(n => { last = n; tick(n) });
  });
}

const sim = (title, T, cues, code, draw) => [
  `<p class="q">${title}</p>`,
  `<canvas style="display:block;width:100%;height:calc(var(--u)*16);background:var(--bg);border-radius:var(--radius)"></canvas>`,
  `<div class="row"><button class="btn" id="pp" type="button" style="min-width:calc(var(--u)*8)">Pause</button><input type="range" min="0" max="1000" value="0" style="flex:1;accent-color:var(--blue)"></div>`,
  `<p class="note" id="say"></p>`, `<div id="eq"></div>`,
  `<pre class="code">\n${code}\n</pre>`,
  `<script>(${rt})(${JSON.stringify({ T, cues })},${draw})<\/script>`];

const learn = html => ({ state: 'learn', html });
const mcq = (html, options, answer, o = {}) => ({ state: 'mcq', html, options, answer, ...o });

const L = [
  /* 0 */ learn(`<div class='center'><p class='q'>Motion</p>
    <p class='note'>A body is <b>in motion</b> when its position changes with time, measured from a <b>reference frame</b> (an origin and axes).</p>
    <p class='note'><b>1 axis:</b> motion along a straight line (x only).<br><b>2 axes:</b> motion in a plane (x and y together), like a thrown ball.</p></div>`),
  /* 1 */ mcq(`<div class='center'><p class='q'>You sit in a moving train. Relative to the train, you are:</p></div>`,
    ['At rest', 'In motion', 'Falling', 'Accelerating'], 0,
    { wrong: `<p class='q'>Not quite.</p><p class='note'>Your position relative to the train does not change. Motion depends on the reference frame.</p>` }),

  /* 2 */ learn(`<p class='q'>1 axis: distance vs displacement</p><p class='note'><b>Distance</b> = total path length (scalar, never negative).<br><b>Displacement</b> = final position minus start position (vector, has a sign).</p>`),
  /* 3 */ sim('Walk 8 m right, then 5 m back', 6.5, [
    [0, 'Start at x = 0 and walk right.', 'x0 = 0', 1],
    [4, 'After 4 s we reach x = 8 m and turn back.', 'x1 = 8', 2],
    [6, 'Walking back 5 m, we stop at x = 3 m.', 'x2 = 3', 3],
    [6.2, 'Distance adds every piece of the path.', 'd = 8 + 5 = 13 m', 4],
    [6.4, 'Displacement only compares end and start.', 'Δx = 3 − 0 = 3 m', 5]],
    'x0 = 0\nx1 = 8\nx2 = 3\ndistance = (x1 - x0) + (x1 - x2)\ndisplacement = x2 - x0',
    (x, t, W, H, C) => {
      const p = t < 4 ? 2 * t : t < 6 ? 8 - (t - 4) * 2.5 : 3, d = t < 4 ? 2 * t : t < 6 ? 8 + (t - 4) * 2.5 : 13, X = v => 20 + v * (W - 40) / 10, y = H * .6;
      C.L(x, X(0), y, X(10), y, C.g, 2); for (let i = 0; i <= 10; i += 2) { C.L(x, X(i), y - 5, X(i), y + 5, C.g, 2); C.T(x, i, X(i), y + 22, C.t) }
      C.D(x, X(p), y - 14, 9, C.b); C.T(x, 'distance = ' + d.toFixed(1) + ' m', 10, 24, C.t, 'left'); C.T(x, 'displacement = ' + p.toFixed(1) + ' m', 10, 46, C.b, 'left')
    }),
  /* 4 */ mcq(`<div class='center'><p class='q'>A runner goes 10 m east then 10 m west. Displacement?</p></div>`, ['20 m', '10 m', '0 m', '5 m'], 2, { is_column: true,
    wrong: `<p class='q'>Not quite.</p><p class='note'>Displacement = end − start. He is back at the start.</p>` }),

  /* 5 */ learn(`<p class='q'>Speed, velocity, acceleration</p>
    <p class='note'>Average speed = distance ÷ time (scalar)<br>Average velocity <code>v = Δx / Δt</code> (vector)<br>Acceleration <code>a = (v − u) / t</code>: how fast velocity changes.</p>
    <p class='note'>Uniform acceleration (constant <code>a</code>) gives three equations. Watch them being built.</p>`),
  /* 6 */ sim('Equation 1: v = u + at', 6, [
    [0, 'The car starts with initial velocity u = 2 m/s.', 'u = 2', 1],
    [1, 'Acceleration is change of velocity per second.', 'a = (v − u) / t', 2],
    [2.5, 'Multiply both sides by t.', 'at = v − u', 3],
    [4, 'Move u across: this is the first equation.', 'v = u + at', 4],
    [5.5, 'Check: 2 + 1.5 × 6 = 11 m/s.', 'v = 11 m/s', 5]],
    'u = 2\na = 1.5\nt = 6\nv = u + a*t\nprint(v)',
    (x, t, W, H, C) => {
      const k = Math.min(t, 6), X = q => 20 + q * (W - 90) / 39, y = H * .65, p = 2 * k + .75 * k * k, v = 2 + 1.5 * k;
      C.L(x, X(0), y, X(39), y, C.g, 2); C.D(x, X(p), y - 12, 10, C.b); C.L(x, X(p) - v * 5, y - 36, X(p), y - 36, C.b, 4);
      C.T(x, 'v = ' + v.toFixed(1) + ' m/s', 10, 24, C.t, 'left'); C.T(x, 't = ' + k.toFixed(1) + ' s', 10, 46, C.g, 'left')
    }),
  /* 7 */ mcq(`<div class='center'><p class='q'>A car starts from rest, a = 2 m/s². Speed after 5 s?</p></div>`, ['5', '7', '10', '20'], 2, { is_column: true,
    wrong: `<p class='q'>Not quite.</p><p class='note'>v = u + at = 0 + 2 × 5.</p>` }),

  /* 8 */ sim('Equation 2: s = ut + ½at²', 6, [
    [0, 'Displacement equals the area under the v–t graph.', 's = area under v–t', 1],
    [1, 'The rectangle has height u and width t.', 'rectangle = u·t', 4],
    [2.5, 'The triangle has base t and height v − u = at.', 'triangle = ½ · t · at', 5],
    [4, 'Add the two areas.', 's = ut + ½at²', 6]],
    'u = 2\na = 1.5\nt = 6\nrect = u*t\ntri = 0.5*t*(a*t)\ns = rect + tri',
    (x, t, W, H, C) => {
      const k = Math.min(t, 6), ox = 40, oy = H - 24, sx = (W - 70) / 6, sy = (H - 50) / 11, X = a => ox + a * sx, Y = v => oy - v * sy;
      x.fillStyle = C.s; x.beginPath(); x.moveTo(X(0), Y(0)); x.lineTo(X(0), Y(2)); x.lineTo(X(k), Y(2 + 1.5 * k)); x.lineTo(X(k), Y(0)); x.fill();
      C.L(x, X(0), oy, X(6), oy, C.g, 2); C.L(x, X(0), oy, X(0), Y(11), C.g, 2); C.L(x, X(0), Y(2), X(6), Y(2), C.g, 1); C.L(x, X(0), Y(2), X(6), Y(11), C.b, 3);
      C.D(x, X(k), Y(2 + 1.5 * k), 6, C.b); C.T(x, 's = ' + (2 * k + .75 * k * k).toFixed(1) + ' m', W - 10, 24, C.t, 'right'); C.T(x, 'v', ox - 16, 20, C.g); C.T(x, 't', W - 10, oy - 8, C.g, 'right')
    }),
  /* 9 */ sim('Equation 3: v² = u² + 2as', 6, [
    [0, 'We know u, a and s but not the time t.', '', 1],
    [1, 'Distance = average velocity × time.', 's = ((u + v)/2) · t', 3],
    [2, 'From equation 1, t = (v − u)/a. Substitute.', 's = (u + v)(v − u) / 2a', 3],
    [3.2, '(u + v)(v − u) = v² − u². Multiply by 2a.', '2as = v² − u²', 4],
    [4.3, 'Rearranged: the third equation, no t needed.', 'v² = u² + 2as', 4],
    [5.5, 'v = √(4 + 30) ≈ 5.83 m/s.', 'v ≈ 5.83 m/s', 5]],
    'u = 2\na = 1.5\ns = 10\nv2 = u**2 + 2*a*s\nv = v2 ** 0.5',
    (x, t, W, H, C) => {
      const k = Math.min(t / 6, 1) * 2.554, p = 2 * k + .75 * k * k, v = 2 + 1.5 * k, X = q => 20 + q * (W - 40) / 10, y = H * .6;
      C.L(x, X(0), y, X(10), y, C.g, 2); C.L(x, X(10), y - 16, X(10), y + 16, C.b, 3); C.D(x, X(p), y - 12, 10, C.b);
      C.T(x, 'v = ' + v.toFixed(2) + ' m/s', 10, 24, C.t, 'left'); C.T(x, 's = ' + p.toFixed(1) + ' m', 10, 46, C.g, 'left')
    }),
  /* 10 */ mcq(`<div class='center'><p class='q'>Start from rest, a = 2 m/s², s = 9 m. Final speed?</p></div>`, ['3', '6', '9', '18'], 1, { is_column: true,
    wrong: `<p class='q'>Not quite.</p><p class='note'>v² = 0 + 2 × 2 × 9 = 36, so v = 6.</p>` }),

  /* 11 */ sim('Free fall: a = g', 6, [
    [0, 'Released from rest: u = 0. Only gravity acts, so a = g.', 'a = g ≈ 10 m/s²', 1],
    [1.5, 'Put u = 0, a = g in v = u + at.', 'v = gt', 3],
    [3, 'Put u = 0, a = g in s = ut + ½at².', 'h = ½gt²', 4],
    [4.5, 'Put them in v² = u² + 2as. Mass never appears.', 'v² = 2gh', 4]],
    'g = 10\nt = 2\nv = g*t\nh = 0.5*g*t**2',
    (x, t, W, H, C) => {
      const k = Math.min(t / 6, 1) * 2, d = 5 * k * k, v = 10 * k, Y = q => 20 + q * (H - 50) / 20, cx = W / 2;
      C.L(x, 20, H - 20, W - 20, H - 20, C.g, 2); C.D(x, cx, Y(d), 10, C.b); C.L(x, cx + 24, Y(d), cx + 24, Y(d) + v * .8, C.b, 4);
      C.T(x, 'v = ' + v.toFixed(0) + ' m/s', 10, 24, C.t, 'left'); C.T(x, 'fallen = ' + d.toFixed(1) + ' m', 10, 46, C.g, 'left')
    }),

  /* 12 */ learn(`<p class='q'>2 axes: split into x and y</p>
    <p class='note'>In a plane, motion along x and y are <b>independent</b>. Split every vector into components: <code>ux = u cosθ</code>, <code>uy = u sinθ</code>.</p>
    <p class='note'>A projectile has <code>ax = 0</code> (constant horizontal velocity) and <code>ay = −g</code>. Use the 1-axis equations on each axis separately.</p>`),
  /* 13 */ sim('Projectile: u = 20 m/s at 45°', 6, [
    [0, 'Split the launch velocity into two independent parts.', 'ux = u cosθ , uy = u sinθ', 4],
    [1.2, 'Horizontal: no force, constant velocity (grey dot on ground).', 'x = ux · t', 4],
    [2.4, 'Vertical: gravity acts (grey dot on left wall).', 'y = uy·t − ½gt²', 5],
    [3.6, 'At the top vy = 0, and time up = time down.', 'T = 2uy / g', 6],
    [4.6, 'Put t = uy/g in y to get the peak.', 'H = uy² / 2g', 7],
    [5.3, 'Range = horizontal velocity × flight time.', 'R = ux · T = u² sin2θ / g', 8]],
    'import math\nu = 20\nth = math.radians(45)\nux = u*math.cos(th)\nuy = u*math.sin(th)\nT = 2*uy/10\nH = uy**2/(2*10)\nR = ux*T',
    (x, t, W, H, C) => {
      const k = Math.min(t / 6, 1) * 2.83, u = 14.14, s = Math.min((W - 40) / 40, (H - 50) / 10.5), X = a => 20 + a * s, Y = b => H - 24 - b * s, px = u * k, py = u * k - 5 * k * k;
      C.L(x, X(0), Y(0), X(40), Y(0), C.g, 2); x.strokeStyle = C.e; x.lineWidth = 2; x.beginPath();
      for (let i = 0; i <= 40; i++) { const q = i / u; x.lineTo(X(i), Y(u * q - 5 * q * q)) } x.stroke();
      C.L(x, X(px), Y(py), X(px), Y(0), C.e, 1); C.L(x, X(0), Y(py), X(px), Y(py), C.e, 1);
      C.D(x, X(px), Y(0), 5, C.g); C.D(x, X(0), Y(py), 5, C.g); C.D(x, X(px), Y(py), 9, C.b);
      C.T(x, 'x = ' + px.toFixed(1) + '  y = ' + py.toFixed(1), W - 10, 24, C.t, 'right')
    }),
  /* 14 */ mcq(`<div class='center'><p class='q'>At the highest point of a projectile, which is zero?</p></div>`,
    ['Horizontal velocity', 'Vertical velocity', 'Acceleration', 'Speed'], 1,
    { wrong: `<p class='q'>Not quite.</p><p class='note'>vx stays constant, and g always acts. Only vy = uy − gt reaches 0 at the top.</p>` }),
  /* 15 */ mcq(`<div class='center'><p class='q'>For the same speed, the range R = u² sin2θ / g is largest at:</p></div>`, ['30°', '45°', '60°', '90°'], 1, { is_column: true,
    wrong: `<p class='q'>Not quite.</p><p class='note'>sin2θ is biggest (=1) when 2θ = 90°.</p>` })
];

window.LESSONS = L.map((l, i) => ({ ...l, next: i < L.length - 1 ? i + 1 : null }));
