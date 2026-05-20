const CONTACT = {
  email: "staymatchinquiry@gmail.com",
  whatsappNumber: "254790535068",
};

const navbar = document.getElementById("navbar");
const backTop = document.getElementById("back-top");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const form = document.getElementById("inquiryForm");
const successMsg = document.getElementById("form-success");
const submitBtn = document.getElementById("submitBtn");
const whatsappBtn = document.getElementById("waBtn");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  backTop.classList.toggle("visible", window.scrollY > 400);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
}

function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((faqItem) => faqItem.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.closeMobile = closeMobile;
window.toggleFaq = toggleFaq;
window.scrollToTop = scrollToTop;
window.buildInquiryMessage = buildInquiryMessage;

function fieldValue(name, fallback = "-") {
  return form.querySelector(`[name="${name}"]`)?.value || fallback;
}

function buildInquiryMessage() {
  return `Hello StayMatch!

New BnB Inquiry

Name: ${fieldValue("name", "Guest")}
Phone: ${fieldValue("phone")}
Email: ${fieldValue("email", "Not provided")}
Location: ${fieldValue("location")}
Check-in: ${fieldValue("checkin")}
Check-out: ${fieldValue("checkout")}
Guests: ${fieldValue("guests")}
Budget/night: ${fieldValue("budget")}
Preferred response: ${fieldValue("response_via", "WhatsApp")}
Notes: ${fieldValue("notes", "None")}

Please send me matching options. Thank you!`;
}

function openWhatsAppInquiry() {
  const message = encodeURIComponent(buildInquiryMessage());
  window.location.href = `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`;
}

document.querySelectorAll(".stay-fav").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = btn.textContent === "\u2661" ? "\u2665" : "\u2661";
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  const action = form.getAttribute("action") || "";

  const data = new FormData(form);

  try {
    const response = await fetch(action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      successMsg.classList.add("show");
      form.reset();
      submitBtn.textContent = "Thank you. We will reply shortly.";
    } else {
      submitBtn.textContent = "Send Inquiry";
      submitBtn.disabled = false;
      alert("Something went wrong. Please try WhatsApp instead.");
    }
  } catch {
    submitBtn.textContent = "Send Inquiry";
    submitBtn.disabled = false;
    alert("Network error. Please try WhatsApp instead.");
  }
});

whatsappBtn.addEventListener("click", openWhatsAppInquiry);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".step, .stay-card, .blog-card, .faq-item, .value-item, .channel",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
