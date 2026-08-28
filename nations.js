// =========================
// NATIONS PAGE
// =========================


// =========================
// NATION CARDS
// =========================

const nationCards = document.querySelectorAll(".nation-card");

nationCards.forEach((card) => {

    card.addEventListener("click", (event) => {

        // Ne pas déclencher si l'utilisateur clique directement
        // sur le bouton de la nation
        if (event.target.closest("a")) return;

        const link = card.querySelector("a");

        if (link) {
            link.click();
        }

    });

});


// =========================
// PAGE READY
// =========================

console.log("Cubus World — Nations loaded.");
