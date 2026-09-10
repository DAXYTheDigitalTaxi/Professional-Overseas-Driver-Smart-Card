# महाराष्ट्र शासन | व्यावसायिक प्रवासी वाहन चालक डिजिटल ओळखपत्र व पडताळणी प्रणाली
## Maharashtra Government Commercial Vehicle QR-Enabled Identification System
### Official Presentation Prototype

This repository contains the official frontend presentation prototype for the **Maharashtra Commercial Passenger Vehicle Driver Smart Card (व्यावसायिक प्रवासी वाहन चालक स्मार्ट कार्ड)** QR-enabled verification system.

When the QR code on the physical smart card is scanned using a smartphone during a live presentation, it immediately launches this single-page digital verification platform.

---

## 📱 Video Assets & Reel Placement Guide

You can replace the placeholder videos with your actual video files at any time:

| Video Content | Primary Source Path | Static Public Path | Notes |
| :--- | :--- | :--- | :--- |
| **Pratap Sarnaik Address** (16:9) | `src/assets/pratap-sarnaik.mp4` | `public/assets/pratap-sarnaik.mp4` | Main government message video |
| **Instagram Reel 1** (9:16 Vertical) | `src/assets/reel-1.mp4` | `public/assets/reel-1.mp4` | First awareness reel |
| **Instagram Reel 2** (9:16 Vertical) | `src/assets/reel-2.mp4` | `public/assets/reel-2.mp4` | Second welfare/safety reel |

> **Tip**: Paste your downloaded MP4 files directly into both `src/assets/` and `public/assets/` using the exact filenames above. The website will immediately play them with no code changes needed.

---

## 🚀 Live Presentation Flow

1. **Physical Card Showcase**: Present the physical smart card with QR code.
2. **QR Scan**: Scan the QR code using any smartphone camera or QR scanner.
3. **Verification Screen (~1.2s)**: An official Maharashtra Government verification screen appears with a scanning radar ring, state seal, Card ID `MHDPWB25000123`, then transitions smoothly into `✓ पडताळणी यशस्वी / VERIFIED`.
4. **Verified Driver Profile**:
   - Official badge: **✓ VERIFIED DRIVER**
   - High-resolution driver photo (**संजय तुकाराम पाटील / Sanjay Tukaram Patil**)
   - Commercial yellow plate badge (**COMMERCIAL • MH 12**)
   - Portrait of **धर्मवीर आनंद दिघे साहेब** and state quotes.
5. **Government Video Section**:
   - Automatically plays muted when scrolled into viewport using `IntersectionObserver`.
   - Pauses automatically when scrolled out of view.
   - Includes **Unmute Audio**, Play/Pause, and playlist tabs to switch between the Pratap Sarnaik address and the 2 Instagram Reels.
6. **Driver Details**:
   - Full name, DOB (15 June 1990), Driver ID (`MHDPWB001234`), Permit number (`MH12 20180001234`), RTO Pune (`MH12`), and masked Aadhaar (`**** **** 6789`).
7. **Vehicle Details**:
   - Auto-Rickshaw / Taxi, yellow number plate classification, smart card ID, issue & renewal dates.
8. **Digital Verification Record**:
   - 4-point official check: Driver identity, Vehicle record, Smart card ID, RTO permit validity.
9. **Physical Card Inspection**:
   - Click the **"स्मार्ट कार्ड"** button in the header or footer to open a high-resolution preview of both the front and back of the physical smart card.
10. **Re-Verification Feature**:
   - Presenters can tap **"पुन्हा पडताळा (Re-verify)"** in the header or mobile sticky bar to demonstrate the QR verification sequence repeatedly during questions.

---

## 🌐 Deploying to ANY GitHub Account (GitHub Pages)

This project uses `base: './'` in `vite.config.ts`, making it completely account-agnostic and repository-agnostic. It can be hosted on **any** GitHub account without changing any code or paths.

### Steps to Deploy:
1. Push this folder to your repository on GitHub (e.g. `https://github.com/ANOTHER_USER/repo-name`).
2. Go to repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The automated workflow `.github/workflows/deploy.yml` will automatically build and publish the site.
5. Your live URL will be:
   ```
   https://USERNAME.github.io/REPOSITORY-NAME/
   ```
6. Generate a QR code pointing to this URL and print it on your presentation card!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 Fictional Prototype Disclaimer
This is a presentation-only demonstration prototype built for academic and government exhibition purposes. All driver, permit, and Aadhaar numbers are fictional demo records.
