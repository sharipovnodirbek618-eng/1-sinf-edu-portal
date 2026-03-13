* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

:root {
  --primary: #0d47a1;
  --secondary: #1565c0;
  --accent: #43a047;
  --accent-dark: #2e7d32;
  --bg: #f4f7fc;
  --text: #1f2937;
  --muted: #6b7280;
  --white: #ffffff;
  --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  --radius: 16px;
  --danger-bg: #ffebee;
  --danger-text: #b71c1c;
  --success-bg: #e8f5e9;
  --success-text: #1b5e20;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.container {
  width: 92%;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--white);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  flex-wrap: wrap;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff, #dbeafe);
  color: #0d47a1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: bold;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.brand h1 {
  font-size: 30px;
  margin: 0;
}

.brand p {
  color: #dbeafe;
  font-size: 15px;
  margin-top: 4px;
}

.top-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  transition: 0.25s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--accent);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
}

.btn-light {
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-light:hover {
  background: rgba(255, 255, 255, 0.24);
}

.btn-secondary {
  background: #e8f0fe;
  color: var(--primary);
}

nav {
  background: #0b3d91;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  padding: 14px 0;
}

nav a {
  color: var(--white);
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
}

nav a:hover {
  color: #bfdbfe;
}

.hero {
  min-height: 620px;
  display: flex;
  align-items: center;
  background-image:
    linear-gradient(rgba(13, 71, 161, 0.55), rgba(13, 71, 161, 0.55)),
    url("https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--white);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 30px;
  align-items: center;
  width: 100%;
}

.hero-content h2 {
  font-size: 58px;
  line-height: 1.15;
  margin-bottom: 18px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.45);
}

.hero-content p {
  font-size: 22px;
  max-width: 680px;
  margin-bottom: 24px;
  color: #eef6ff;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.45);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  max-width: 760px;
}

.stat {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 14px;
  padding: 16px;
}

.stat h3 {
  font-size: 28px;
  margin-bottom: 6px;
}

.stat p {
  font-size: 14px;
  margin: 0;
  color: #eff6ff;
}

.hero-card,
.feature-card,
.step-card,
.info-card,
.form-card,
.lookup-box,
.contact-card,
.history-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 26px;
}

.hero-card h3,
.feature-card h3,
.step-card h3,
.info-card h3,
.form-card h3,
.contact-card h3,
.history-card h3 {
  color: var(--primary);
  margin-bottom: 12px;
  font-size: 22px;
}

.hero-card ul,
.info-card ul {
  padding-left: 20px;
  color: var(--muted);
}

.info-card ul li {
  margin-bottom: 8px;
}

section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-size: 38px;
  color: var(--primary);
  margin-bottom: 14px;
}

.section-subtitle {
  text-align: center;
  color: var(--muted);
  max-width: 760px;
  margin: 0 auto 40px;
  font-size: 17px;
}

.features,
.steps,
.footer-grid,
.history-grid {
  display: grid;
  gap: 22px;
}

.features {
  grid-template-columns: repeat(4, 1fr);
}

.steps {
  grid-template-columns: repeat(4, 1fr);
}

.step-card {
  position: relative;
  padding-top: 58px;
}

.step-card::before {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent);
}

.portal-layout,
.contact-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: start;
}

.form-card p {
  color: var(--muted);
  margin-bottom: 22px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label,
.lookup-box label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--primary);
}

.form-card input,
.form-card select,
.form-card textarea,
.lookup-box input,
.contact-card input,
.contact-card textarea {
  width: 100%;
  padding: 14px 15px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
}

.form-card input:focus,
.form-card select:focus,
.form-card textarea:focus,
.lookup-box input:focus,
.contact-card input:focus,
.contact-card textarea:focus {
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.12);
}

.form-note {
  font-size: 14px;
  color: var(--muted);
  margin-top: 12px;
}

.result-box,
.lookup-result {
  margin-top: 18px;
  display: none;
  border-radius: 12px;
  padding: 18px;
  font-weight: 700;
  line-height: 1.7;
}

.info-stack {
  display: grid;
  gap: 20px;
}

.lookup-actions {
  display: flex;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.contact-card p {
  margin-bottom: 12px;
}

.contact-card input,
.contact-card textarea {
  margin-bottom: 14px;
}

.history-grid {
  grid-template-columns: repeat(3, 1fr);
}

.history-card small {
  color: var(--muted);
  display: block;
  margin-top: 8px;
}

.feature-card:hover,
.step-card:hover,
.info-card:hover,
.history-card:hover {
  transform: translateY(-4px);
  transition: 0.3s;
}

footer {
  background: #0a2d6d;
  color: #eaf2ff;
  padding: 60px 0 24px;
  margin-top: 20px;
}

.footer-grid {
  grid-template-columns: 1.1fr 0.9fr 0.8fr;
  margin-bottom: 26px;
}

footer h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #ffffff;
}

footer p,
footer a {
  color: #d9e7ff;
  text-decoration: none;
  margin-bottom: 8px;
}

footer strong {
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding-top: 20px;
  text-align: center;
  color: #cfe0ff;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .features,
  .steps,
  .history-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-grid,
  .portal-layout,
  .contact-layout,
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .brand h1 {
    font-size: 24px;
  }

  .hero {
    min-height: 540px;
  }

  .hero-content h2 {
    font-size: 38px;
  }

  .hero-content p {
    font-size: 18px;
  }

  .hero-stats,
  .features,
  .steps,
  .history-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 30px;
  }

  nav ul {
    gap: 14px;
  }
}
