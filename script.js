/* ================================
   MOBILE NAVIGATION
================================ */

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

/* ================================
   PROPERTY FILTERS & SEARCH
================================ */

const propertyCards = [...document.querySelectorAll(".property-card")];

const filterButtons = [...document.querySelectorAll(".filter-btn")];

const searchForm = document.querySelector("#search-form");
const typeSelect = document.querySelector("#property-type");
const locationInput = document.querySelector("#property-location");
const purposeSelect = document.querySelector("#property-purpose");
const resultsMessage = document.querySelector("#results-message");

let activeFilter = "all";

function filterProperties() {
  const selectedType = typeSelect.value;
  const selectedPurpose = purposeSelect.value;
  const locationQuery = locationInput.value.trim().toLowerCase();

  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const purpose = card.dataset.purpose;
    const type = card.dataset.type;
    const location = card.dataset.location;

    const matchesFilter = activeFilter === "all" || purpose === activeFilter;

    const matchesPurpose =
      selectedPurpose === "all" || purpose === selectedPurpose;

    const matchesType = selectedType === "all" || type === selectedType;

    const matchesLocation = !locationQuery || location.includes(locationQuery);

    const isVisible =
      matchesFilter && matchesPurpose && matchesType && matchesLocation;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount++;
    }
  });

  resultsMessage.textContent = `${visibleCount} propert${visibleCount === 1 ? "y" : "ies"} found.`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    purposeSelect.value = activeFilter;
    filterProperties();
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProperties();

  document.querySelector("#properties").scrollIntoView({
    behavior: "smooth",
  });
});

/* ================================
   CONTACT FORM DEMO
================================ */

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();

  contactStatus.textContent = `Thank you, ${name}! Your message is ready.`;

  contactForm.reset();
});

/* ================================
   FOOTER YEAR
================================ */

document.querySelector("#year").textContent = new Date().getFullYear();

/* Initial listing count */
filterProperties();
