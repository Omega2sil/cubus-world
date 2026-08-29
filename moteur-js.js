// ============================================================
// CUBUS WORLD — ANIMATION ENGINE
// ============================================================
// High-performance canvas animation engine.
//
// API COMPATIBLE :
//
// CubusFX.confetti({
//     count: 25,
//     colors: ["#ff4f81", "#62d9ff"],
//     duration: 4500
// });
//
// CubusFX.sparks({
//     count: 12,
//     color: "#7cff9b"
// });
//
// CubusFX.firework({
//     x: 50,
//     y: 30,
//     color: "#ff4f81"
// });
//
// CubusFX.fireworks({
//     count: 3,
//     colors: ["#ff4f81", "#62d9ff"]
// });
//
// CubusFX.burst({
//     count: 16
// });
//
// ============================================================

(() => {

    "use strict";


    // ========================================================
    // CONFIGURATION
    // ========================================================

    const CONFIG = {

        maxParticles: 120,

        defaultDuration: 4000,

        cleanupDelay: 500,

        zIndex: 9999,

        // Limite le DPR pour éviter de rendre un canvas
        // gigantesque sur les écrans Retina.
        maxDPR: 2,

        // Nombre maximal absolu de particules simultanées.
        // Toutes les animations partagent cette limite.
        globalParticleLimit: 400

    };


    // ========================================================
    // ÉTAT DU MOTEUR
    // ========================================================

    const state = {

        canvas: null,

        ctx: null,

        width: 0,

        height: 0,

        dpr: 1,

        particles: [],

        running: false,

        raf: 0,

        reducedMotion: false,

        resizeObserver: null,

        motionMedia: null

    };


    // ========================================================
    // UTILITAIRES
    // ========================================================

    const random = (min, max) =>
        Math.random() * (max - min) + min;


    const randomItem = array =>
        array[
            (Math.random() * array.length) | 0
        ];


    const clamp = (value, min, max) =>
        Math.min(
            Math.max(value, min),
            max
        );


    // ========================================================
    // MOTION REDUCTION
    // ========================================================

    function updateReducedMotion() {

        state.reducedMotion =
            state.motionMedia?.matches === true;

    }


    function reducedMotion() {

        return state.reducedMotion;

    }


    // ========================================================
    // CANVAS
    // ========================================================

    function createCanvas() {

        if (state.canvas) {
            return;
        }

        const canvas =
            document.createElement("canvas");

        canvas.id =
            "cubus-animation-canvas";

        canvas.setAttribute(
            "aria-hidden",
            "true"
        );

        Object.assign(
            canvas.style,
            {
                position: "fixed",
                inset: "0",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: CONFIG.zIndex
            }
        );

        document.body.appendChild(canvas);

        state.canvas = canvas;
        state.ctx = canvas.getContext(
            "2d",
            {
                alpha: true,
                desynchronized: true
            }
        );

        resizeCanvas();

        if ("ResizeObserver" in window) {

            state.resizeObserver =
                new ResizeObserver(
                    resizeCanvas
                );

            state.resizeObserver.observe(
                document.documentElement
            );

        } else {

            window.addEventListener(
                "resize",
                resizeCanvas,
                {
                    passive: true
                }
            );

        }

        state.motionMedia =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        updateReducedMotion();

        if (
            state.motionMedia.addEventListener
        ) {

            state.motionMedia.addEventListener(
                "change",
                updateReducedMotion
            );

        } else {

            state.motionMedia.addListener(
                updateReducedMotion
            );

        }

    }


    function resizeCanvas() {

        if (!state.canvas) {
            return;
        }

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                CONFIG.maxDPR
            );

        state.width = width;
        state.height = height;
        state.dpr = dpr;

        const realWidth =
            Math.round(width * dpr);

        const realHeight =
            Math.round(height * dpr);

        if (
            state.canvas.width !== realWidth ||
            state.canvas.height !== realHeight
        ) {

            state.canvas.width =
                realWidth;

            state.canvas.height =
                realHeight;

            state.canvas.style.width =
                `${width}px`;

            state.canvas.style.height =
                `${height}px`;

            state.ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

        }

    }


    // ========================================================
    // PARTICLE MANAGEMENT
    // ========================================================

    function addParticle(particle) {

        if (
            state.particles.length >=
            CONFIG.globalParticleLimit
        ) {

            return false;

        }

        state.particles.push(
            particle
        );

        startLoop();

        return true;

    }


    function addParticles(particles) {

        const available =
            CONFIG.globalParticleLimit -
            state.particles.length;

        if (available <= 0) {
            return;
        }

        const amount =
            Math.min(
                particles.length,
                available
            );

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            state.particles.push(
                particles[i]
            );

        }

        if (amount > 0) {
            startLoop();
        }

    }


    // ========================================================
    // ANIMATION LOOP
    // ========================================================

    function startLoop() {

        if (state.running) {
            return;
        }

        state.running = true;

        state.raf =
            requestAnimationFrame(
                tick
            );

    }


    function stopLoop() {

        if (!state.running) {
            return;
        }

        state.running = false;

        cancelAnimationFrame(
            state.raf
        );

        state.raf = 0;

    }


    function tick(timestamp) {

        if (!state.running) {
            return;
        }

        const ctx =
            state.ctx;

        const particles =
            state.particles;

        const width =
            state.width;

        const height =
            state.height;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        let writeIndex = 0;

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const particle =
                particles[i];

            const alive =
                updateParticle(
                    particle,
                    timestamp
                );

            if (!alive) {
                continue;
            }

            drawParticle(
                ctx,
                particle
            );

            particles[
                writeIndex++
            ] = particle;

        }

        particles.length =
            writeIndex;


        if (writeIndex === 0) {

            stopLoop();

            return;

        }


        state.raf =
            requestAnimationFrame(
                tick
            );

    }


    // ========================================================
    // PARTICLE UPDATE
    // ========================================================

    function updateParticle(
        p,
        now
    ) {

        const elapsed =
            now - p.start;

        if (elapsed < p.delay) {
            return true;
        }

        const time =
            elapsed - p.delay;

        if (time >= p.duration) {
            return false;
        }

        const progress =
            time / p.duration;


        // ----------------------------------------------------
        // CONFETTI
        // ----------------------------------------------------

        if (p.type === 0) {

            const t =
                easeOutCubic(
                    progress
                );

            p.x =
                p.startX +
                p.targetX * t;

            p.y =
                p.startY +
                p.targetY * t;

            p.rotation =
                p.rotationSpeed *
                t;

            // Petite oscillation naturelle.
            p.wave =
                Math.sin(
                    progress *
                    Math.PI *
                    4 +
                    p.phase
                ) *
                p.waveAmount;


            // Opacité.
            if (progress < .12) {

                p.alpha =
                    progress / .12 * .95;

            } else if (progress < .70) {

                p.alpha =
                    .95 -
                    (
                        (progress - .12) /
                        .58
                    ) * .20;

            } else {

                p.alpha =
                    .75 *
                    (
                        1 -
                        (progress - .70) /
                        .30
                    );

            }

            return true;

        }


        // ----------------------------------------------------
        // SPARK
        // ----------------------------------------------------

        if (p.type === 1) {

            const t =
                easeOutCubic(
                    progress
                );

            p.x =
                p.startX +
                p.targetX * t;

            p.y =
                p.startY +
                p.targetY * t;

            if (progress < .25) {

                p.scale =
                    .2 +
                    (
                        progress / .25
                    ) * .8;

                p.alpha =
                    progress / .25;

            } else {

                p.scale =
                    1 -
                    (
                        (progress - .25) /
                        .75
                    );

                p.alpha =
                    1 -
                    (
                        (progress - .25) /
                        .75
                    );

            }

            return true;

        }


        // ----------------------------------------------------
        // FIREWORK PARTICLE
        // ----------------------------------------------------

        if (p.type === 2) {

            const t =
                easeOutCubic(
                    progress
                );

            p.x =
                p.startX +
                p.targetX * t;

            p.y =
                p.startY +
                (
                    p.targetY * t
                ) +
                (
                    70 *
                    t *
                    t
                );

            if (progress < .08) {

                const intro =
                    progress / .08;

                p.scale =
                    .2 +
                    intro * .8;

                p.alpha =
                    intro;

            } else if (progress < .65) {

                p.scale = 1;

                p.alpha =
                    .8 +
                    (
                        (progress - .08) /
                        .57
                    ) * .2;

            } else {

                p.scale =
                    1 -
                    (
                        (progress - .65) /
                        .35
                    ) * .9;

                p.alpha =
                    .8 *
                    (
                        1 -
                        (
                            (progress - .65) /
                            .35
                        )
                    );

            }

            return true;

        }


        // ----------------------------------------------------
        // FIREWORK CORE
        // ----------------------------------------------------

        if (p.type === 3) {

            if (progress < .25) {

                const t =
                    progress / .25;

                p.scale =
                    .1 +
                    t * 1.2;

                p.alpha =
                    t;

            } else {

                const t =
                    (
                        progress - .25
                    ) / .75;

                p.scale =
                    1.3 +
                    t * 2.2;

                p.alpha =
                    1 - t;

            }

            return true;

        }


        return false;

    }


    // ========================================================
    // EASING
    // ========================================================

    function easeOutCubic(t) {

        const inverse =
            1 - t;

        return 1 -
            inverse *
            inverse *
            inverse;

    }


    // ========================================================
    // COLOR CACHE
    // ========================================================

    const glowCache =
        new Map();


    function getGlow(color) {

        let glow =
            glowCache.get(color);

        if (glow) {
            return glow;
        }

        glow = {

            small:
                createGlow(
                    color,
                    6
                ),

            medium:
                createGlow(
                    color,
                    14
                ),

            large:
                createGlow(
                    color,
                    30
                )

        };

        glowCache.set(
            color,
            glow
        );

        return glow;

    }


    function createGlow(
        color,
        radius
    ) {

        const size =
            radius * 2;

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width =
            size;

        canvas.height =
            size;

        const ctx =
            canvas.getContext(
                "2d"
            );

        const gradient =
            ctx.createRadialGradient(
                radius,
                radius,
                0,
                radius,
                radius,
                radius
            );

        gradient.addColorStop(
            0,
            color
        );

        gradient.addColorStop(
            .25,
            color
        );

        gradient.addColorStop(
            1,
            "transparent"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            size,
            size
        );

        return canvas;

    }


    // ========================================================
    // DRAW
    // ========================================================

    function drawParticle(
        ctx,
        p
    ) {

        if (p.alpha <= 0) {
            return;
        }


        // ----------------------------------------------------
        // CONFETTI
        // ----------------------------------------------------

        if (p.type === 0) {

            ctx.save();

            ctx.globalAlpha =
                p.alpha;

            ctx.translate(
                p.x + p.wave,
                p.y
            );

            ctx.rotate(
                p.rotation *
                Math.PI /
                180
            );

            ctx.fillStyle =
                p.color;

            ctx.fillRect(
                -p.width / 2,
                -p.height / 2,
                p.width,
                p.height
            );

            ctx.restore();

            return;

        }


        // ----------------------------------------------------
        // SPARK
        // ----------------------------------------------------

        if (p.type === 1) {

            drawGlowParticle(
                ctx,
                p,
                18
            );

            return;

        }


        // ----------------------------------------------------
        // FIREWORK PARTICLE
        // ----------------------------------------------------

        if (p.type === 2) {

            drawGlowParticle(
                ctx,
                p,
                14
            );

            return;

        }


        // ----------------------------------------------------
        // FIREWORK CORE
        // ----------------------------------------------------

        if (p.type === 3) {

            drawCore(
                ctx,
                p
            );

        }

    }


    function drawGlowParticle(
        ctx,
        p,
        glowRadius
    ) {

        const glow =
            getGlow(
                p.color
            ).medium;

        const size =
            glow.width;

        ctx.save();

        ctx.globalAlpha =
            p.alpha;

        ctx.globalCompositeOperation =
            "lighter";

        ctx.drawImage(
            glow,
            p.x - size / 2,
            p.y - size / 2,
            size,
            size
        );

        ctx.globalCompositeOperation =
            "source-over";

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            Math.max(
                .8,
                2.2 * p.scale
            ),
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }


    function drawCore(
        ctx,
        p
    ) {

        const glow =
            getGlow(
                p.color
            ).large;

        const size =
            glow.width *
            p.scale;

        ctx.save();

        ctx.globalAlpha =
            p.alpha;

        ctx.globalCompositeOperation =
            "lighter";

        ctx.drawImage(
            glow,
            p.x - size / 2,
            p.y - size / 2,
            size,
            size
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            3.5 * p.scale,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }


    // ========================================================
    // ENGINE INITIALIZATION
    // ========================================================

    function init() {

        createCanvas();

    }


    // ========================================================
    // CONFETTI
    // ========================================================

    function confetti(options = {}) {

        if (reducedMotion()) {
            return;
        }

        init();


        const {

            count = 24,

            colors = [
                "#ff4f81",
                "#ffd166",
                "#7cff9b",
                "#62d9ff",
                "#c77dff",
                "#ffffff"
            ],

            duration = 4000,

            spread = 380,

            fall = 300,

            startX = 50,

            startY = 10

        } = options;


        const safeCount =
            clamp(
                count | 0,
                1,
                CONFIG.maxParticles
            );


        const startXpx =
            state.width *
            (
                startX / 100
            );

        const startYpx =
            state.height *
            (
                startY / 100
            );


        const now =
            performance.now();


        const particles =
            new Array(
                safeCount
            );


        for (
            let i = 0;
            i < safeCount;
            i++
        ) {

            particles[i] = {

                type: 0,

                start: now,

                delay:
                    random(0, 900),

                duration:
                    random(
                        duration * .55,
                        duration * .85
                    ),

                startX: startXpx,

                startY: startYpx,

                x: startXpx,

                y: startYpx,

                targetX:
                    random(
                        -spread / 2,
                        spread / 2
                    ),

                targetY:
                    random(
                        fall * .6,
                        fall
                    ),

                rotationSpeed:
                    random(
                        -900,
                        900
                    ),

                rotation: 0,

                waveAmount:
                    random(
                        2,
                        12
                    ),

                phase:
                    random(
                        0,
                        Math.PI * 2
                    ),

                wave: 0,

                width:
                    random(
                        3,
                        7
                    ),

                height:
                    random(
                        5,
                        11
                    ),

                color:
                    randomItem(colors),

                alpha: 0

            };

        }


        addParticles(
            particles
        );

    }


    // ========================================================
    // SPARKS
    // ========================================================

    function sparks(options = {}) {

        if (reducedMotion()) {
            return;
        }

        init();


        const {

            count = 12,

            color = "#ffffff",

            colors = null,

            duration = 1800,

            spread = 260,

            x = 50,

            y = 35

        } = options;


        const safeCount =
            clamp(
                count | 0,
                1,
                CONFIG.maxParticles
            );


        const startX =
            state.width *
            (
                x / 100
            );

        const startY =
            state.height *
            (
                y / 100
            );


        const now =
            performance.now();


        const particles =
            new Array(
                safeCount
            );


        for (
            let i = 0;
            i < safeCount;
            i++
        ) {

            const angle =
                random(
                    0,
                    Math.PI * 2
                );

            const distance =
                random(
                    spread * .3,
                    spread
                );


            particles[i] = {

                type: 1,

                start: now,

                delay:
                    random(0, 800),

                duration:
                    random(
                        duration * .7,
                        duration
                    ),

                startX,

                startY,

                x: startX,

                y: startY,

                targetX:
                    Math.cos(angle) *
                    distance,

                targetY:
                    Math.sin(angle) *
                    distance,

                scale: .2,

                alpha: 0,

                color:
                    colors
                        ? randomItem(colors)
                        : color

            };

        }


        addParticles(
            particles
        );

    }


    // ========================================================
    // FIREWORK
    // ========================================================

    function firework(options = {}) {

        if (reducedMotion()) {
            return;
        }

        init();


        const {

            x = 50,

            y = 30,

            color = "#ffffff",

            particleCount = 28,

            radius = 130,

            delay = 0,

            duration = 2200

        } = options;


        const safeCount =
            clamp(
                particleCount | 0,
                4,
                50
            );


        const startX =
            state.width *
            (
                x / 100
            );

        const startY =
            state.height *
            (
                y / 100
            );


        const now =
            performance.now();


        // ----------------------------------------------------
        // CORE
        // ----------------------------------------------------

        const particles =
            new Array(
                safeCount + 1
            );


        particles[0] = {

            type: 3,

            start: now,

            delay,

            duration: 900,

            startX,

            startY,

            x: startX,

            y: startY,

            scale: .1,

            alpha: 0,

            color

        };


        // ----------------------------------------------------
        // PARTICLES
        // ----------------------------------------------------

        for (
            let i = 0;
            i < safeCount;
            i++
        ) {

            const angle =
                (
                    Math.PI * 2 /
                    safeCount
                ) * i +
                random(
                    -.08,
                    .08
                );


            const distance =
                random(
                    radius * .65,
                    radius
                );


            particles[
                i + 1
            ] = {

                type: 2,

                start: now,

                delay:
                    delay +
                    random(
                        0,
                        100
                    ),

                duration:
                    duration +
                    random(
                        -200,
                        400
                    ),

                startX,

                startY,

                x: startX,

                y: startY,

                targetX:
                    Math.cos(angle) *
                    distance,

                targetY:
                    Math.sin(angle) *
                    distance,

                scale: .2,

                alpha: 0,

                color

            };

        }


        addParticles(
            particles
        );

    }


    // ========================================================
    // MULTI FIREWORKS
    // ========================================================

    function fireworks(options = {}) {

        if (reducedMotion()) {
            return;
        }


        const {

            count = 3,

            colors = [
                "#ff4f81",
                "#7cff9b",
                "#62d9ff",
                "#ffd166",
                "#c77dff"
            ],

            duration = 2200,

            particleCount = 28,

            radius = 130

        } = options;


        const safeCount =
            clamp(
                count | 0,
                1,
                6
            );


        let accumulatedDelay = 0;


        for (
            let i = 0;
            i < safeCount;
            i++
        ) {

            // On garde exactement le comportement
            // général de l'ancienne API.
            accumulatedDelay +=
                i === 0
                    ? 0
                    : random(
                        350,
                        650
                    );


            firework({

                x:
                    random(
                        20,
                        80
                    ),

                y:
                    random(
                        20,
                        45
                    ),

                color:
                    randomItem(
                        colors
                    ),

                particleCount,

                radius,

                delay:
                    accumulatedDelay,

                duration

            });

        }

    }


    // ========================================================
    // BURST
    // ========================================================

    function burst(options = {}) {

        if (reducedMotion()) {
            return;
        }

        sparks({

            count:
                options.count ||
                16,

            colors:
                options.colors ||
                [
                    "#ffffff"
                ],

            duration:
                options.duration ||
                1600,

            spread:
                options.spread ||
                220,

            x:
                options.x ||
                50,

            y:
                options.y ||
                40

        });

    }


    // ========================================================
    // API PUBLIQUE
    // ========================================================

    window.CubusFX = {

        confetti,

        sparks,

        firework,

        fireworks,

        burst

    };


    // ========================================================
    // INITIALISATION
    // ========================================================

    init();


    console.log(
        "CubusFX — high-performance animation engine loaded."
    );


})();
