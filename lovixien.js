// =========================
// LOVIXIEN — INTRO ANIMATION
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

            display: flex;
            align-items: center;
            justify-content: center;

            overflow: hidden;

            animation:
                lovixienIntroFade 6s ease forwards;
        }


        /* =========================
           SWORDS
        ========================= */

        .lovixien-sword {
            position: absolute;

            width: 230px;
            height: 8px;

            opacity: 0;

            transform-origin: center;

            filter:
                drop-shadow(
                    0 0 12px rgba(124,255,155,.45)
                );

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,255,255,.25),
                    white,
                    rgba(124,255,155,.8),
                    transparent
                );

            border-radius: 100px;
        }


        .lovixien-sword::before {
            content: "";

            position: absolute;

            left: 0;
            top: -4px;

            width: 22px;
            height: 16px;

            border-radius: 4px;

            background:
                linear-gradient(
                    90deg,
                    #15191d,
                    #69737a
                );

            box-shadow:
                0 0 10px rgba(255,255,255,.15);
        }


        .lovixien-sword::after {
            content: "";

            position: absolute;

            right: 0;
            top: 1px;

            width: 18px;
            height: 6px;

            background: #15191d;

            border-radius: 2px;
        }


        .sword-left {
            animation:
                swordLeft 1.8s
                cubic-bezier(.16,.8,.25,1)
                forwards;
        }


        .sword-right {
            animation:
                swordRight 1.8s
                cubic-bezier(.16,.8,.25,1)
                forwards;
        }


        /* =========================
           COINS
        ========================= */

        .lovixien-coin {
            position: absolute;

            top: -40px;

            width: 14px;
            height: 14px;

            border-radius: 50%;

            display: grid;
            place-items: center;

            font-size: 8px;
            font-weight: 700;

            color: rgba(255,255,255,.8);

            background:
                radial-gradient(
                    circle at 35% 30%,
                    white,
                    #7cff9b 20%,
                    #3a9d57 65%,
                    #16351f
                );

            border: 1px solid
                rgba(255,255,255,.35);

            box-shadow:
                0 0 10px
                rgba(124,255,155,.25);

            opacity: 0;

            animation:
                coinFall var(--fall-time)
                linear forwards;

            animation-delay: var(--delay);
        }


        /* =========================
           CENTER FLASH
        ========================= */

        .lovixien-flash {
            position: absolute;

            width: 20px;
            height: 20px;

            border-radius: 50%;

            background: white;

            box-shadow:
                0 0 20px white,
                0 0 60px var(--green),
                0 0 120px var(--green);

            opacity: 0;

            animation:
                lovixienFlash 1.8s ease forwards;
        }


        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes swordLeft {

            0% {
                opacity: 0;

                transform:
                    translateX(-420px)
                    translateY(-180px)
                    rotate(-48deg);
            }

            25% {
                opacity: .35;
            }

            70% {
                opacity: .16;
            }

            100% {
                opacity: 0;

                transform:
                    translateX(0)
                    translateY(0)
                    rotate(43deg);
            }

        }


        @keyframes swordRight {

            0% {
                opacity: 0;

                transform:
                    translateX(420px)
                    translateY(-180px)
                    rotate(48deg);
            }

            25% {
                opacity: .35;
            }

            70% {
                opacity: .16;
            }

            100% {
                opacity: 0;

                transform:
                    translateX(0)
                    translateY(0)
                    rotate(-43deg);
            }

        }


        @keyframes coinFall {

            0% {
                opacity: 0;

                transform:
                    translateY(0)
                    rotateY(0deg)
                    rotateZ(0deg);
            }

            12% {
                opacity: .75;
            }

            75% {
                opacity: .45;
            }

            100% {
                opacity: 0;

                transform:
                    translateY(100vh)
                    rotateY(720deg)
                    rotateZ(180deg);
            }

        }


        @keyframes lovixienFlash {

            0% {
                opacity: 0;

                transform: scale(.2);
            }

            45% {
                opacity: .65;

                transform: scale(1);
            }

            100% {
                opacity: 0;

                transform: scale(3);
            }

        }


        @keyframes lovixienIntroFade {

            0% {
                opacity: 1;
            }

            70% {
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
    // SWORDS
    // =========================

    const swordLeft = document.createElement("div");

    swordLeft.className =
        "lovixien-sword sword-left";


    const swordRight = document.createElement("div");

    swordRight.className =
        "lovixien-sword sword-right";


    intro.appendChild(swordLeft);
    intro.appendChild(swordRight);


    // =========================
    // FLASH
    // =========================

    const flash = document.createElement("div");

    flash.className =
        "lovixien-flash";

    intro.appendChild(flash);


    // =========================
    // COINS
    // =========================

    const coinCount = 24;

    for (let i = 0; i < coinCount; i++) {

        const coin = document.createElement("div");

        coin.className =
            "lovixien-coin";

        // Les pièces restent principalement
        // autour du centre, entre les épées.

        const x =
            (Math.random() - 0.5) * 260;

        const delay =
            1.0 + Math.random() * 1.7;

        const fallTime =
            2.2 + Math.random() * 2.2;


        coin.style.left =
            `calc(50% + ${x}px)`;

        coin.style.setProperty(
            "--delay",
            `${delay}s`
        );

        coin.style.setProperty(
            "--fall-time",
            `${fallTime}s`
        );


        // Légère variation de taille

        const scale =
            0.7 + Math.random() * 0.8;

        coin.style.transform =
            `scale(${scale})`;


        intro.appendChild(coin);

    }


    // =========================
    // CLEANUP
    // =========================

    setTimeout(() => {

        intro.remove();
        style.remove();

    }, 6500);


    console.log(
        "Empire Lovixien — page chargée."
    );

});
