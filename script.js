
/* =========================================
   MOVA — Main JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const currentYear = document.getElementById("current-year");

    // Automatically update the copyright year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation.
    function closeMenu() {
        if (!menuToggle || !navLinks) {
            return;
        }

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu after selecting a section.
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when the Escape key is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Reset mobile navigation when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });
    }

    // Reveal selected elements when they enter the viewport.
    const revealElements = document.querySelectorAll(
        ".intro-content, .experience-card, .approach-step, .collab-card, .contact-left, .contact-right"
    );

    if ("IntersectionObserver" in window) {
        document.body.classList.add("js-ready");

        const observer = new IntersectionObserver(
            (entries, activeObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        activeObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    // Prevent temporary social links from jumping to the top of the page.
    // Replace these links with your actual profile URLs before publishing.
    document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });
});
