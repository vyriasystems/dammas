// Dados de contato da loja. Preencha o WhatsApp (somente números, com DDI e DDD, ex.: "5564999999999").
// Enquanto estiver vazio, os botões levam ao link oficial da bio (Beacons).
const CONFIG = {
  whatsapp: "",
  linkBio: "https://beacons.ai/dammasmarlaplussize",
  mensagens: {
    agendar: "Olá, Dammas! Vim pelo site e gostaria de agendar um horário para atendimento. 💃",
    comprar: "Olá, Dammas! Vim pelo site e gostaria de ver as novidades para comprar online. 🛍️",
    delivery: "Olá, Dammas! Vim pelo site e gostaria de solicitar o delivery condicional em Caldas Novas. 🚗",
  },
};

function ctaUrl(tipo) {
  if (!CONFIG.whatsapp) return CONFIG.linkBio;
  const texto = encodeURIComponent(CONFIG.mensagens[tipo] || CONFIG.mensagens.agendar);
  return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
}

document.querySelectorAll("[data-cta]").forEach((el) => {
  el.href = ctaUrl(el.dataset.cta);
  el.target = "_blank";
  el.rel = "noopener";
});

const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const nav = document.getElementById("nav");
const toggle = document.getElementById("menuToggle");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = open ? "hidden" : "";
};
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  if (!el.classList.contains("reveal--delay")) el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();
