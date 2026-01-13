// Handle clickable cards (Experience and Skills)
document.querySelectorAll(".clickable-card").forEach(card => {
    card.addEventListener("click", () => {
        const content = card.querySelector(".card-content");

        // Toggle ONLY the clicked card
        content.classList.toggle("hidden");
    });
});

// Handle accordion for other content if needed
const accordionTitles = document.querySelectorAll(".accordion-title");

accordionTitles.forEach(title => {
    title.addEventListener("click", () => {
        const content = title.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
