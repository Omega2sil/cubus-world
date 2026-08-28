const copyButton = document.getElementById("copy-ip");
const serverIP = document.getElementById("server-ip");
const copyStatus = document.getElementById("copy-status");

if (copyButton && serverIP) {

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                serverIP.textContent.trim()
            );

            copyStatus.textContent = "Adresse copiée ✓";
            copyButton.textContent = "✓";

            setTimeout(() => {

                copyStatus.textContent =
                    "Cliquez pour copier l'adresse";

                copyButton.textContent = "⧉";

            }, 2000);

        } catch {

            copyStatus.textContent =
                "Copiez manuellement l'adresse";

        }

    });

}
