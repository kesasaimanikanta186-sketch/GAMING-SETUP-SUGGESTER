# AI Gaming Setup Interior Design Suggester

A professional, premium web application built for **NETHI MALLIKARJUN GUPTA** (Hyderabad, India), a leading wholesale and retail distributor of gym equipment and gaming accessories (ergonomic chairs, monitor mounts, mechanical keyboards, gaming mice, and headsets).

## Project Overview

### Problem Statement
Customers seeking to build a gaming room or office space frequently supply their parameters (dimensions, hardware selections, themes, and aesthetic preferences) manually over messages or phone calls. Sales agents must review catalog options to suggest furniture layout and accessory specs, which leads to operational bottlenecks.

### Solution
This application streamlines client consultation. By inputting dimensions, budget, device category, lighting, and theme vibes, the system calculates precise desk arrangements, optimal display alignments, wire channels, safety layouts, and presents a customized accessory invoice drawn from **NETHI MALLIKARJUN GUPTA** stock.

---

## Key Features

1. **Preset Design Templates**: Prefill forms instantly with preset configurations (e.g. RGB Cyberpunk, Wood Minimalist).
2. **AI Layout Engine**: Translates inputs into structured suggestions utilizing the Gemini API.
3. **Glassmorphism Theme**: Dark mode theme accented with neon blue/purple shadows and micro-animations.
4. **Copy & Share Outputs**: Export calculations directly to the clipboard or generate quick sharing coordinates.
5. **Print as PDF**: Format and download calculations as a clean PDF document.
6. **Telemetry & Analytics Radar**: Review distributions of device formats and room styles.
7. **Feedback Ratings System**: Collect 1 to 5 star satisfaction metrics and comments.
8. **Admin Log Inspector**: Audit raw inputs, AI outputs, and response latencies.

---

## Technical Architecture

- **Frontend**: React.js (built on Vite), React Router DOM for SPA routing, Lucide React for vector iconography.
- **Styling**: Responsive Custom CSS using neon accents, glassmorphic flexbox columns, and print stylesheets.
- **Backend**: Node.js Express server, ES modules, dotenv, CORS.
- **Database**: Localized JSON file database service (`backend/src/db.js`) persisting to `backend/data/db.json`.
- **AI Integration**: Gemini 1.5 Flash API with custom mock fallback configurations.

---

## Local Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup Steps

1. **Clone or Open the Workspace**:
   Ensure you are in the directory containing `backend` and `frontend`.

2. **Configure Backend Settings**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Create a `.env` file based on `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - (Optional) Replace `YOUR_GEMINI_API_KEY` with a key from [Google AI Studio](https://aistudio.google.com/). If left as default, the backend operates in **Simulation/Mock mode**, providing realistic structured responses.

3. **Install Dependencies**:
   - In the `backend` directory, run:
     ```bash
     npm install
     ```
   - In the `frontend` directory, run:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Launch the Servers**:
   - **Start Backend** (runs on Port 5000):
     ```bash
     cd backend
     npm run dev
     ```
   - **Start Frontend** (runs on Port 5173 / Vite default):
     ```bash
     cd frontend
     npm run dev
     ```

5. **Open Web App**:
   Navigate to `http://localhost:5173` in your web browser.

---

## API Endpoints List

- `GET  /api/templates` - Retrieve pre-seeded setup templates.
- `POST /api/generate` - Validates inputs and returns AI suggestion plan.
- `GET  /api/history` - List all past user generations.
- `GET  /api/history/:id` - Fetch details for a specific generation.
- `POST /api/feedback` - Submit ratings and comments.
- `GET  /api/analytics` - Fetch telemetry statistics and recent review cards.

---

## Testing & Verification

Run the localized database and mock-engine integration check to verify backend capability:
```bash
cd backend
node src/test_run.js
```
This tests JSON CRUD cycles, analytics aggregations, mock calculations, and outputs a diagnostic log showing validation states.
