// =========================
// LOVIXIEN — FIREWORK INTRO
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // CONTAINER
    // =========================

    const intro = document.createElement("div");

    intro.className = "lovixien-intro";

    document.body.appendChild(intro);


    // =========================
    // STYLE
    // =========================

    const style = document.createElement("style");

    style.textContent = `

        .lovixien-intro {
            position: fixed;
            inset: 0;

            z-index: 9999;

            pointer-events: none;

            overflow: hidden;

            animation:
                lovixienIntroFade 7s ease forwards;
        }


        /* =========================
           FIREWORK PARTICLE
        ========================= */

        .lovixien-firework-particle {

            position: absolute;

            width: 4px;
            height: 4px;

            border-radius: 50%;

            left: 0;
            top: 0;

            opacity: 0;

            box-shadow:
                0 0 6px currentColor,
                0 0 14px currentColor;

            animation:
                fireworkParticle
                var(--duration)
                cubic-bezier(.1,.65,.25,1)
                forwards;

            animation-delay:
                var(--delay);
        }


        /* =========================
           FIREWORK CORE
        ========================= */

        .lovixien-firework-core {

            position: absolute;

            width: 7px;
            height: 7px;

            border-radius: 50%;

            background: white;

            box-shadow:
                0 0 10px white,
                0 0 25px currentColor,
                0 0 50px currentColor;

            opacity: 0;

            animation:
                fireworkCore 1s ease forwards;
        }


        /* =========================
           PARTICLE ANIMATION
        ========================= */

        @keyframes fireworkParticle {

            0% {

                opacity: 0;

                transform:
                    translate(0, 0)
                    scale(.3);

            }

            8% {

                opacity: 1;

                transform:
                    translate(
                        calc(var(--x) * .15),
                        calc(var(--y) * .15)
                    )
                    scale(1);

            }

            65% {

                opacity: .85;

            }

            100% {

                opacity: 0;

                transform:
                    translate(
                        var(--x),
                        calc(var(--y) + 80px)
                    )
                    scale(.15);

            }

        }


        /* =========================
           CORE ANIMATION
        ========================= */

        @keyframes fireworkCore {

            0% {

                opacity: 0;

                transform: scale(.1);

            }

            25% {

                opacity: 1;

                transform: scale(1.4);

            }

            100% {

                opacity: 0;

                transform: scale(4);

            }

        }


        /* =========================
           INTRO FADE
        ========================= */

        @keyframes lovixienIntroFade {

            0% {
                opacity: 1;
            }

            75% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }

        }


        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {

            .lovixien-intro {
                display: none;
            }

        }

    `;

    document.head.appendChild(style);


    // =========================
    // FIREWORK CREATOR
    // =========================

    function createFirework(x, y, color, delay = 0) {

        // Core

        const core =
            document.createElement("div");

        core.className =
            "lovixien-firework-core";

        core.style.left =
            `${x}px`;

        core.style.top =
            `${y}px`;

        core.style.color =
            color;

        core.style.animationDelay =
            `${delay}s`;

        intro.appendChild(core);


        // Particles

        const particleCount = 42;

        for (let i = 0; i < particleCount; i++) {

            const particle =
                document.createElement("div");

            particle.className =
                "lovixien-firework-particle";


            const angle =
                (Math.PI * 2 / particleCount) * i
                + (Math.random() - .5) * .15;


            const distance =
                80 + Math.random() * 150;


            const px =
                Math.cos(angle) * distance;

            const py =
                Math.sin(angle) * distance;


            particle.style.left =
                `${x}px`;

            particle.style.top =
                `${y}px`;

            particle.style.color =
                color;


            particle.style.setProperty(
                "--x",
                `${px}px`
            );

            particle.style.setProperty(
                "--y",
                `${py}px`
            );


            particle.style.setProperty(
                "--delay",
                `${delay + Math.random() * .12}s`
            );


            particle.style.setProperty(
                "--duration",
                `${2.2 + Math.random() * .9}s`
            );


            // Variation de taille

            const size =
                2 + Math.random() * 3;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;


            intro.appendChild(particle);

        }

    }


    // =========================
    // FIREWORKS
    // =========================

    const fireworks = [

        {
            x: "20%",
            y: "30%",
            color: "#ff4f81",
            delay: .2
        },

        {
            x: "50%",
            y: "23%",
            color: "#7cff9b",
            delay: .7
        },

        {
            x: "80%",
            y: "31%",
            color: "#62d9ff",
            delay: 1.1
        },

        {
            x: "34%",
            y: "52%",
            color: "#c77dff",
            delay: 1.6
        },

        {
            x: "68%",
            y: "50%",
            color: "#ffd166",
            delay: 2.0
        },

        {
            x: "50%",
            y: "40%",
            color: "#ff6b35",
            delay: 2.5
        }

    ];


    fireworks.forEach(firework => {

        const x =
            window.innerWidth *
            parseFloat(firework.x) / 100;

        const y =
            window.innerHeight *
            parseFloat(firework.y) / 100;


        createFirework(
            x,
            y,
            firework.color,
            firework.delay
        );

    });


    // =========================
    // CLEANUP
    // =========================

    setTimeout(() => {

        intro.remove();
        style.remove();

    }, 7200);


    console.log(
        "Empire Lovixien — fireworks intro."
    );

});
