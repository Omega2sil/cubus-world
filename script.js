const navbar = document.querySelector(".navbar");
const reveals = document.querySelectorAll(".reveal");
const menuButton = document.querySelector(".menu-button");


// =========================
// NAVBAR SCROLL
// =========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// =========================
// REVEAL ON SCROLL
// =========================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


reveals.forEach((element) => {
    observer.observe(element);
});


// =========================
// MOBILE MENU
// =========================

const mobileMenu = document.createElement("div");

mobileMenu.className = "mobile-menu";

mobileMenu.innerHTML = `
    <a href="#world">Le monde</a>
    <a href="#features">Fonctionnalités</a>
    <a href="#about">À propos</a>
    <a href="#play">Jouer</a>
`;

document.body.appendChild(mobileMenu);


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");
    menuButton.classList.toggle("active");

});


mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");

    });

});


// =========================
// MOUSE PARALLAX
// =========================

const cube = document.querySelector(".cube");

if (
    window.matchMedia(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)"
    ).matches
) {

    window.addEventListener("pointermove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 2;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 2;

        cube.style.transform = `
            rotateX(${-20 - y * 8}deg)
            rotateY(${35 + x * 12}deg)
        `;

    });

}


// =========================
// SMOOTH ANCHORS
// =========================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});
