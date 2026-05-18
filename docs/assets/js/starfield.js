/*
 * Parallax starfield — sits behind the centred paper column.
 *
 * One full-viewport <canvas> is appended to <body> with position: fixed.
 * On scroll, each star is redrawn at an offset proportional to its
 * individual "depth" coefficient, producing a quiet parallax sensation
 * without any continuous animation.
 *
 * Respects the user's prefers-reduced-motion setting: the field is drawn
 * once and stays static.
 */
(function () {
  if (typeof document === 'undefined') return;

  function init() {
    if (document.querySelector('canvas.cm-starfield')) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'cm-starfield';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var W = 0, H = 0;
    var stars = [];
    var rafScheduled = false;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      stars.length = 0;
      var area = W * H;
      var density = 0.00018;
      var N = Math.max(80, Math.min(260, Math.round(area * density)));
      for (var i = 0; i < N; i++) {
        var tint = Math.random();
        var color;
        if (tint > 0.92) color = '120, 150, 210';
        else if (tint > 0.78) color = '230, 220, 200';
        else color = '245, 240, 225';
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.35 + 0.35,
          op: Math.random() * 0.55 + 0.2,
          color: color,
          depth: Math.random() * 0.6 + 0.12
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var s = window.scrollY || window.pageYOffset || 0;
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        var y = (st.y * H - s * st.depth) % H;
        var yy = y < 0 ? y + H : y;
        var x = st.x * W;
        ctx.beginPath();
        ctx.arc(x, yy, st.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + st.color + ',' + st.op + ')';
        ctx.fill();
      }
      rafScheduled = false;
    }

    function onScroll() {
      if (!rafScheduled) {
        rafScheduled = true;
        window.requestAnimationFrame(draw);
      }
    }

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resize();
    seed();
    draw();

    window.addEventListener('resize', function () {
      resize();
      seed();
      draw();
    }, { passive: true });

    if (!reduced) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
