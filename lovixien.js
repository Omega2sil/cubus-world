// ============================================================
// LOVIXIEN — WELCOME FIREWORKS INTRO
// ============================================================
//
// Une introduction festive à l'entrée de l'Empire Lovixien.
// Plusieurs vagues de feux d'artifice apparaissent pendant
// quelques secondes avant de laisser place à la page.
//
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // CONFIGURATION
    // ========================================================

    const CONFIG = {

        duration: 8500,

        particleQuality:
            window.innerWidth < 700 ? 0.65 : 1,

        fireworks: 14,

        confetti: 45,

        stars: 35

    };


    // ========================================================
    // CONTAINER
    // ========================================================

    const intro =
        document.createElement("div");

    intro.className =
        "lovixien-intro";

    document.body.appendChild(intro);


    // ========================================================
    // STYLE
    // ========================================================

    const style =
        document.createElement("style");

    style.textContent = `

        /* ====================================================
           MAIN CONTAINER
        ==================================================== */

        .lovixien-intro {

            position: fixed;

            inset: 0;

            width: 100%;
            height: 100%;

            z-index: 99999;

            pointer-events: none;

            overflow: hidden;

            isolation: isolate;

            background:
                radial-gradient(
                    circle at 50% 50%,
                    rgba(255,255,255,.025),
                    transparent 55%
                );

            animation:
                lovixienIntroFade
                8.5s
                ease
                forwards;

        }


        /* ====================================================
           ATMOSPHERIC GLOW
        ==================================================== */

        .lovixien-atmosphere {

            position: absolute;

            inset: -20%;

            background:

                radial-gradient(
                    circle at 20% 30%,
                    rgba(255,70,130,.08),
                    transparent 25%
                ),

                radial-gradient(
                    circle at 80% 25%,
                    rgba(80,200,255,.08),
                    transparent 25%
                ),

                radial-gradient(
                    circle at 50% 70%,
                    rgba(130,80,255,.06),
                    transparent 30%
                );

            animation:
                atmospherePulse
                5s
                ease-in-out
                infinite;

        }


        /* ====================================================
           FIREWORK WRAPPER
        ==================================================== */

        .lovixien-firework {

            position: absolute;

            width: 1px;
            height: 1px;

            pointer-events: none;

        }


        /* ====================================================
           FIREWORK CORE
        ==================================================== */

        .lovixien-core {

            position: absolute;

            width: 8px;
            height: 8px;

            left: -4px;
            top: -4px;

            border-radius: 50%;

            background: white;

            opacity: 0;

            box-shadow:

                0 0 5px white,
                0 0 15px var(--color),
                0 0 35px var(--color),
                0 0 70px var(--color);

            animation:

                coreFlash
                1.1s
                ease-out
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           FIREWORK PARTICLES
        ==================================================== */

        .lovixien-particle {

            position: absolute;

            width: var(--size);
            height: var(--size);

            left: 0;
            top: 0;

            border-radius: 50%;

            background: var(--color);

            opacity: 0;

            box-shadow:

                0 0 4px var(--color),
                0 0 10px var(--color),
                0 0 20px var(--color);

            animation:

                particleExplosion
                var(--duration)
                cubic-bezier(.12,.65,.25,1)
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           PARTICLE TRAIL
        ==================================================== */

        .lovixien-trail {

            position: absolute;

            width: 3px;

            height: 35px;

            left: -1.5px;

            top: -5px;

            border-radius: 100px;

            background:
                linear-gradient(
                    to bottom,
                    var(--color),
                    transparent
                );

            opacity: 0;

            transform-origin: top center;

            animation:

                trailExplosion
                var(--duration)
                cubic-bezier(.1,.7,.2,1)
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           SECONDARY PARTICLES
        ==================================================== */

        .lovixien-spark {

            position: absolute;

            width: 3px;
            height: 3px;

            left: 0;
            top: 0;

            border-radius: 50%;

            background: white;

            opacity: 0;

            box-shadow:

                0 0 5px white,
                0 0 12px var(--color);

            animation:

                sparkExplosion
                var(--duration)
                ease-out
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           RING
        ==================================================== */

        .lovixien-ring {

            position: absolute;

            left: 0;
            top: 0;

            width: 20px;
            height: 20px;

            margin-left: -10px;
            margin-top: -10px;

            border-radius: 50%;

            border:

                2px solid
                var(--color);

            opacity: 0;

            box-shadow:

                0 0 10px var(--color),
                0 0 25px var(--color);

            animation:

                ringExplosion
                1.4s
                cubic-bezier(.1,.7,.2,1)
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           STAR PARTICLES
        ==================================================== */

        .lovixien-star {

            position: absolute;

            width: 3px;
            height: 3px;

            border-radius: 50%;

            background: white;

            box-shadow:

                0 0 8px white,
                0 0 16px currentColor;

            opacity: 0;

            animation:

                starFloat
                var(--duration)
                ease-in-out
                forwards;

            animation-delay:
                var(--delay);

        }


        .lovixien-star::before,
        .lovixien-star::after {

            content: "";

            position: absolute;

            left: 50%;
            top: 50%;

            transform:
                translate(-50%, -50%);

            background: white;

            border-radius: 100px;

        }


        .lovixien-star::before {

            width: 18px;
            height: 2px;

        }


        .lovixien-star::after {

            width: 2px;
            height: 18px;

        }


        /* ====================================================
           FALLING SPARK
        ==================================================== */

        .lovixien-falling-spark {

            position: absolute;

            top: -20px;

            width: 3px;
            height: 3px;

            border-radius: 50%;

            background: var(--color);

            box-shadow:

                0 0 6px var(--color),
                0 0 15px var(--color);

            opacity: 0;

            animation:

                fallingSpark
                var(--duration)
                linear
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           LIGHT COLUMN
        ==================================================== */

        .lovixien-light {

            position: absolute;

            left: var(--x);

            bottom: -20%;

            width: 2px;

            height: 70%;

            background:

                linear-gradient(
                    to top,
                    transparent,
                    var(--color),
                    transparent
                );

            opacity: 0;

            filter:
                blur(1px);

            animation:

                lightRise
                1.8s
                ease-out
                forwards;

            animation-delay:
                var(--delay);

        }


        /* ====================================================
           ANIMATIONS
        ==================================================== */

        @keyframes particleExplosion {

            0% {

                opacity: 0;

                transform:
                    translate(0, 0)
                    scale(.15);

            }

            8% {

                opacity: 1;

            }

            55% {

                opacity: .9;

            }

            100% {

                opacity: 0;

                transform:

                    translate(
                        var(--x),
                        calc(
                            var(--y)
                            + var(--gravity)
                        )
                    )

                    scale(.05);

            }

        }


        @keyframes trailExplosion {

            0% {

                opacity: 0;

                transform:
                    translate(0,0)
                    rotate(var(--angle))
                    scaleY(.1);

            }

            10% {

                opacity: .9;

            }

            100% {

                opacity: 0;

                transform:

                    translate(
                        var(--x),
                        calc(
                            var(--y)
                            + var(--gravity)
                        )
                    )

                    rotate(var(--angle))
                    scaleY(.5);

            }

        }


        @keyframes sparkExplosion {

            0% {

                opacity: 0;

                transform:
                    translate(0,0)
                    scale(.2);

            }

            15% {

                opacity: 1;

            }

            60% {

                opacity: .8;

            }

            100% {

                opacity: 0;

                transform:

                    translate(
                        var(--x),
                        calc(
                            var(--y)
                            + var(--gravity)
                        )
                    )

                    scale(.1);

            }

        }


        @keyframes coreFlash {

            0% {

                opacity: 0;

                transform:
                    scale(.1);

            }

            15% {

                opacity: 1;

                transform:
                    scale(1.5);

            }

            35% {

                opacity: .9;

            }

            100% {

                opacity: 0;

                transform:
                    scale(5);

            }

        }


        @keyframes ringExplosion {

            0% {

                opacity: 0;

                transform:
                    scale(.1);

            }

            15% {

                opacity: .9;

            }

            100% {

                opacity: 0;

                transform:
                    scale(9);

            }

        }


        @keyframes starFloat {

            0% {

                opacity: 0;

                transform:
                    scale(.1)
                    rotate(0deg);

            }

            20% {

                opacity: 1;

            }

            50% {

                opacity: .8;

            }

            100% {

                opacity: 0;

                transform:
                    scale(.7)
                    rotate(180deg);

            }

        }


        @keyframes fallingSpark {

            0% {

                opacity: 0;

                transform:
                    translateY(0)
                    scale(.5);

            }

            10% {

                opacity: .9;

            }

            70% {

                opacity: .65;

            }

            100% {

                opacity: 0;

                transform:
                    translateY(115vh)
                    scale(.1);

            }

        }


        @keyframes lightRise {

            0% {

                opacity: 0;

                transform:
                    scaleY(.1);

            }

            35% {

                opacity: .15;

            }

            100% {

                opacity: 0;

                transform:
                    scaleY(1);

            }

        }


        @keyframes atmospherePulse {

            0% {
                opacity: .4;
            }

            50% {
                opacity: 1;
            }

            100% {
                opacity: .4;
            }

        }


        @keyframes lovixienIntroFade {

            0% {
                opacity: 1;
            }

            78% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }

        }


        /* ====================================================
           REDUCED MOTION
        ==================================================== */

        @media (prefers-reduced-motion: reduce) {

            .lovixien-intro {

                display: none;

            }

        }

    `;

    document.head.appendChild(style);


    // ========================================================
    // ATMOSPHERE
    // ========================================================

    const atmosphere =
        document.createElement("div");

    atmosphere.className =
        "lovixien-atmosphere";

    intro.appendChild(atmosphere);


    // ========================================================
    // COLOR PALETTE
    // ========================================================

    const colors = [

        "#ff3b81",
        "#ff5c35",
        "#ff9f43",
        "#ffd166",
        "#fff176",
        "#7cff9b",
        "#45e6a8",
        "#45d9ff",
        "#62a8ff",
        "#8b7cff",
        "#b56cff",
        "#e06cff",
        "#ff6cd9"

    ];


    // ========================================================
    // RANDOM COLOR
    // ========================================================

    function randomColor() {

        return colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    }


    // ========================================================
    // CREATE FIREWORK
    // ========================================================

    function createFirework(
        x,
        y,
        color,
        delay = 0,
        styleType = "burst"
    ) {

        const firework =
            document.createElement("div");

        firework.className =
            "lovixien-firework";

        firework.style.left =
            `${x}px`;

        firework.style.top =
            `${y}px`;

        firework.style.setProperty(
            "--color",
            color
        );

        intro.appendChild(firework);


        // ====================================================
        // CORE
        // ====================================================

        const core =
            document.createElement("div");

        core.className =
            "lovixien-core";

        core.style.setProperty(
            "--color",
            color
        );

        core.style.setProperty(
            "--delay",
            `${delay}s`
        );

        firework.appendChild(core);


        // ====================================================
        // RING
        // ====================================================

        const ring =
            document.createElement("div");

        ring.className =
            "lovixien-ring";

        ring.style.setProperty(
            "--color",
            color
        );

        ring.style.setProperty(
            "--delay",
            `${delay + .05}s`
        );

        firework.appendChild(ring);


        // ====================================================
        // PARTICLE COUNT
        // ====================================================

        let particleCount =
            styleType === "willow"
                ? 55
                : styleType === "double"
                    ? 75
                    : 60;

        particleCount =
            Math.floor(
                particleCount *
                CONFIG.particleQuality
            );


        // ====================================================
        // MAIN PARTICLES
        // ====================================================

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("div");

            particle.className =
                "lovixien-particle";


            // ------------------------------------------------
            // Angle
            // ------------------------------------------------

            let angle;

            if (styleType === "flower") {

                const petals = 10;

                angle =
                    (
                        Math.PI * 2 / petals
                    ) *
                    Math.floor(i / 6)
                    +
                    (Math.random() - .5) * .15;

            } else {

                angle =
                    Math.random() *
                    Math.PI *
                    2;

            }


            // ------------------------------------------------
            // Distance
            // ------------------------------------------------

            let distance =
                85 +
                Math.random() *
                145;


            if (styleType === "willow") {

                distance =
                    70 +
                    Math.random() *
                    125;

            }


            if (styleType === "flower") {

                distance =
                    95 +
                    Math.random() *
                    125;

            }


            // ------------------------------------------------
            // Position
            // ------------------------------------------------

            const px =
                Math.cos(angle) *
                distance;

            const py =
                Math.sin(angle) *
                distance;


            // ------------------------------------------------
            // Gravity
            // ------------------------------------------------

            const gravity =
                styleType === "willow"
                    ? 150 + Math.random() * 130
                    : 55 + Math.random() * 75;


            // ------------------------------------------------
            // Color variation
            // ------------------------------------------------

            const particleColor =
                Math.random() < .38
                    ? randomColor()
                    : color;


            particle.style.setProperty(
                "--x",
                `${px}px`
            );

            particle.style.setProperty(
                "--y",
                `${py}px`
            );

            particle.style.setProperty(
                "--gravity",
                `${gravity}px`
            );

            particle.style.setProperty(
                "--color",
                particleColor
            );


            particle.style.setProperty(
                "--size",
                `${2 + Math.random() * 3.5}px`
            );


            particle.style.setProperty(
                "--duration",
                `${
                    2.3 +
                    Math.random() * 1.5
                }s`
            );


            particle.style.setProperty(
                "--delay",
                `${
                    delay +
                    Math.random() * .12
                }s`
            );


            firework.appendChild(
                particle
            );


            // =================================================
            // TRAILS
            // =================================================

            if (
                Math.random() < .55
            ) {

                const trail =
                    document.createElement("div");

                trail.className =
                    "lovixien-trail";

                trail.style.setProperty(
                    "--x",
                    `${px}px`
                );

                trail.style.setProperty(
                    "--y",
                    `${py}px`
                );

                trail.style.setProperty(
                    "--gravity",
                    `${gravity}px`
                );

                trail.style.setProperty(
                    "--angle",
                    `${angle + Math.PI / 2}rad`
                );

                trail.style.setProperty(
                    "--color",
                    particleColor
                );

                trail.style.setProperty(
                    "--duration",
                    `${
                        2.1 +
                        Math.random() * 1.3
                    }s`
                );

                trail.style.setProperty(
                    "--delay",
                    `${
                        delay +
                        Math.random() * .08
                    }s`
                );

                firework.appendChild(
                    trail
                );

            }

        }


        // ====================================================
        // SECONDARY SPARKS
        // ====================================================

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const spark =
                document.createElement("div");

            spark.className =
                "lovixien-spark";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                110 +
                Math.random() *
                190;


            spark.style.setProperty(
                "--x",
                `${
                    Math.cos(angle) *
                    distance
                }px`
            );


            spark.style.setProperty(
                "--y",
                `${
                    Math.sin(angle) *
                    distance
                }px`
            );


            spark.style.setProperty(
                "--gravity",
                `${
                    40 +
                    Math.random() * 80
                }px`
            );


            spark.style.setProperty(
                "--color",
                randomColor()
            );


            spark.style.setProperty(
                "--duration",
                `${
                    2 +
                    Math.random() * 1.5
                }s`
            );


            spark.style.setProperty(
                "--delay",
                `${
                    delay +
                    .1 +
                    Math.random() * .2
                }s`
            );


            firework.appendChild(
                spark
            );

        }

    }


    // ========================================================
    // FIREWORK POSITIONS
    // ========================================================

    const fireworks = [

        {
            x: .14,
            y: .31,
            color: "#ff4f91",
            delay: .15,
            type: "burst"
        },

        {
            x: .34,
            y: .22,
            color: "#62d9ff",
            delay: .65,
            type: "flower"
        },

        {
            x: .66,
            y: .23,
            color: "#7cff9b",
            delay: .9,
            type: "burst"
        },

        {
            x: .86,
            y: .32,
            color: "#c77dff",
            delay: 1.25,
            type: "flower"
        },

        {
            x: .50,
            y: .19,
            color: "#ffd166",
            delay: 1.55,
            type: "double"
        },

        {
            x: .23,
            y: .48,
            color: "#ff6b35",
            delay: 2.0,
            type: "willow"
        },

        {
            x: .76,
            y: .48,
            color: "#45e6a8",
            delay: 2.2,
            type: "willow"
        },

        {
            x: .42,
            y: .37,
            color: "#e06cff",
            delay: 2.65,
            type: "double"
        },

        {
            x: .59,
            y: .35,
            color: "#45d9ff",
            delay: 3.0,
            type: "flower"
        },

        {
            x: .09,
            y: .60,
            color: "#ffd166",
            delay: 3.35,
            type: "burst"
        },

        {
            x: .91,
            y: .60,
            color: "#ff5c8a",
            delay: 3.55,
            type: "burst"
        },

        {
            x: .30,
            y: .66,
            color: "#8b7cff",
            delay: 4.0,
            type: "flower"
        },

        {
            x: .70,
            y: .65,
            color: "#7cff9b",
            delay: 4.25,
            type: "flower"
        },

        {
            x: .50,
            y: .47,
            color: "#ffffff",
            delay: 4.65,
            type: "double"
        }

    ];


    // ========================================================
    // CREATE FIREWORKS
    // ========================================================

    fireworks.forEach(
        firework => {

            createFirework(

                window.innerWidth *
                    firework.x,

                window.innerHeight *
                    firework.y,

                firework.color,

                firework.delay,

                firework.type

            );

        }
    );


    // ========================================================
    // FALLING SPARKS
    // ========================================================

    for (
        let i = 0;
        i < CONFIG.confetti;
        i++
    ) {

        const spark =
            document.createElement("div");

        spark.className =
            "lovixien-falling-spark";


        spark.style.left =
            `${
                Math.random() * 100
            }%`;


        spark.style.setProperty(
            "--color",
            randomColor()
        );


        spark.style.setProperty(
            "--duration",
            `${
                3 +
                Math.random() * 3
            }s`
        );


        spark.style.setProperty(
            "--delay",
            `${
                1 +
                Math.random() * 3.5
            }s`
        );


        intro.appendChild(
            spark
        );

    }


    // ========================================================
    // FLOATING STARS
    // ========================================================

    for (
        let i = 0;
        i < CONFIG.stars;
        i++
    ) {

        const star =
            document.createElement("div");

        star.className =
            "lovixien-star";


        star.style.left =
            `${
                Math.random() * 100
            }%`;


        star.style.top =
            `${
                10 +
                Math.random() * 75
            }%`;


        star.style.color =
            randomColor();


        star.style.setProperty(
            "--duration",
            `${
                2 +
                Math.random() * 3
            }s`
        );


        star.style.setProperty(
            "--delay",
            `${
                Math.random() * 4
            }s`
        );


        intro.appendChild(
            star
        );

    }


    // ========================================================
    // LIGHT RAYS
    // ========================================================

    const lightPositions = [

        { x: "18%", delay: 1.2 },
        { x: "38%", delay: 2.1 },
        { x: "62%", delay: 2.5 },
        { x: "82%", delay: 1.7 }

    ];


    lightPositions.forEach(
        lightData => {

            const light =
                document.createElement("div");

            light.className =
                "lovixien-light";


            light.style.setProperty(
                "--x",
                lightData.x
            );


            light.style.setProperty(
                "--color",
                randomColor()
            );


            light.style.setProperty(
                "--delay",
                `${lightData.delay}s`
            );


            intro.appendChild(
                light
            );

        }
    );


    // ========================================================
    // FINAL CENTRAL BURST
    // ========================================================

    setTimeout(() => {

        createFirework(

            window.innerWidth / 2,

            window.innerHeight * .34,

            "#ffffff",

            0,

            "double"

        );

    }, 5000);


    // ========================================================
    // CLEANUP
    // ========================================================

    setTimeout(() => {

        intro.remove();

        style.remove();

    }, CONFIG.duration);


    // ========================================================
    // CONSOLE
    // ========================================================

    console.log(
        "Empire Lovixien — welcome fireworks activated."
    );

});
