## Tech Stack

- **React** (v19)
- **Tailwind CSS** – styling
- **React Bootstrap** – UI components
- **React Router** – multi-page navigation
- **react-datepicker** – practice space booking date/time
- **react-tsparticles** – particle background
- **Formspree** – booking form submissions (no backend required)
- **react-google-recaptcha** – reCAPTCHA v2 checkbox on practice space booking form
- **Create React App** – build tooling

## Features

- **Multi-page layout** – Home, About, Projects, Music, Resume
- **Dark / light theme** – toggle with persisted preference
- **Practice space booking form** – first & last name, phone (digits only), band details, date/time request; validation on blur; submits via Formspree
- **Responsive design** – works on mobile and desktop
- **Carousels** – project and music galleries with fade transitions
- **Resume** – view or download PDF

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (and npm) installed

### Install and run

```bash
git clone <your-repo-url>
cd Portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Booking form (optional)

To receive practice space requests by email, add a `.env` file in the project root with your Formspree endpoint:

```
REACT_APP_FORMSPREE_URL=https://formspree.io/f/xxxxxxxx
```

Create a form at [Formspree](https://formspree.io/) and paste the form endpoint URL into `.env`.

To enable the reCAPTCHA v2 checkbox (recommended to reduce spam), create a v2 key in the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin), add the **secret key** in your Formspree form settings (Settings → reCAPTCHA), and add the **site key** to `.env`:

```
REACT_APP_RECAPTCHA_SITE_KEY=your_reCAPTCHA_v2_site_key
```

If `REACT_APP_RECAPTCHA_SITE_KEY` is not set, the form still works but submissions are not protected by reCAPTCHA.

## Project structure

- `src/components/` – main sections: Home, About, Projects (incl. booking form), Music, Resume, Navbar, Footer
- `src/Assets/` – images, PDFs, tech icons
- `src/context/` – theme (dark/light) context

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm start`     | Run development server |
| `npm run build` | Production build       |
