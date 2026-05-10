# Falcon Limited - Health Informatics & Software Consultancy

A high-end, responsive static business landing page for Falcon Limited, specialized in healthcare digital transformation.

## 📌 Project Overview

Falcon Limited is a Health Informatics and Software Consultancy firm that helps NHS trusts modernize operations. This static site demonstrates a polished marketing page with sections for:

- Navigation (sticky, responsive)
- Hero statement with CTA
- About Us (mission + vision)
- Services (three core offers)
- Featured Project (NHS Weekly Capacity Planner)
- Team (7 professionals)
- Contact (form + local storage backup)
- Footer (links and copyright)

## 🎨 Design & Brand Guidelines

- Primary colors: NHS Blue `#005EB8`, White `#FFFFFF`, Slate Grey `#768692`
- Fonts: System sans-serif stack (Inter/Helvetica-like)
- Style: Minimalist, modern, corporate, medical-grade
- Layout: Single-page scroll landing (mobile/tablet/desktop)

## 🗂️ File Structure

```
Task B1/
├── index.html          # Main landing page
├── styles.css          # Design and responsive styles
├── script.js           # Interactive behavior and form storage
├── thank-you.html      # Post-submission confirmation page
├── logo.png            # Company logo
├── README.md           # Project documentation
├── SETUP-INSTRUCTIONS.txt # Setup details and running instructions
```

## 🛠️ Functionality

### Contact Form Behavior

- Client-side validation (required fields + email format)
- Local storage backup (key: `falconSubmissions`)
- Redirects to `thank-you.html` after submit
- Thank you page displays most recent submission details
- Admin can download all submissions via console:
  - `downloadSubmissions()`

### Mobile Menu

- Hamburger toggle appears on small screens
- Menu closes upon link click, outside click, Escape key
- Smooth transitions and accessible labels

## 🚀 How to Run Locally

1. Clone repository or copy project folder
2. Open `index.html` in browser
3. Navigate and test the form

### Verify features

- Submit form and ensure it redirects to `thank-you.html`
- Use DevTools Console:
  - `downloadSubmissions()`
  - `JSON.parse(localStorage.getItem('falconSubmissions'))`

## 🌐 GitHub Pages Deployment

1. Push to GitHub repository
2. Go to repository settings → Pages
3. Select `main` branch, `/` folder
4. Visit `https://yourusername.github.io/repo-name/`

## 🔁 Optional: Formspree Integration

1. Sign up at https://formspree.io
2. Create a new form and get ID
3. Update `<form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">` in `index.html`
4. Optional: add `_next` hidden field if redirecting to `thank-you.html`

## 🧾 Notes

- This static implementation works without server-side code.
- Local storage is user-specific and not shared across devices.
- For production data persistence, use Formspree, Netlify Forms, or a backend API.

## 📞 Contact

Falcon Limited © 2026 - Team 18 - Sunderland Industrial Project

---

Happy deployment! Your landing page is now rock-solid and ready for real-world use.