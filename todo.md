# 🧠 Ghosted.AI — Project Todo List

## Phase 1: Project Setup & Infrastructure
- [x] Initialize Next.js 14 project (App Router)
- [x] Configure Tailwind CSS & CSS variables (colors, borders, gradients)
- [x] Install required dependencies (Recharts, Motion.dev, Font Awesome, etc.)
- [x] Setup Express.js backend server structure
- [x] Scaffold project file structure (`app/`, `components/`, `lib/`, `server/`)
- [x] Configure environment variables (OpenAI API Key, ports)

## Phase 2: Frontend Foundation & Design System
- [x] Import and configure Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- [x] Build base UI Components:
  - [x] Button variants (Primary, Secondary, Danger, Icon)
  - [x] Cards (Glass Card, Metric Card, Insight Card)
  - [x] Badge & Tag elements
  - [x] Progress Bar
  - [x] Score Ring / Circular Gauge
- [x] Implement core animations & transitions tokens

## Phase 3: Core Pages Implementation
- [x] **Landing Page**
  - [x] Hero section with headline and CTA
  - [x] "How It Works" 3-step section
  - [x] Animated background effects
- [x] **Upload Page**
  - [x] Drag-and-drop file upload zone
  - [x] Upload states (Default, Drag Over, Uploading, Complete, Error)
- [x] **Results Dashboard (Shell)**
  - [x] Dashboard layout with metric cards placeholders
  - [x] Charts section placeholders
  - [x] AI Insight card placeholder

## Phase 4: Core Logic & Backend Implementation
- [x] **Backend (Express)**
  - [x] Set up `multer` for file upload handling (in-memory processing)
  - [x] Create `/analyze` API route
- [x] **Parsing & Metrics**
  - [x] Implement WhatsApp `.txt` parser (`[DD/MM/YYYY, HH:MM:SS] Sender: Message`)
  - [x] Implement metrics computation (Response Time, Message Length, Initiation Ratio, Engagement Signals)
- [x] **AI Integration**
  - [x] Integrate OpenAI GPT-4o API
  - [x] Construct AI prompt with computed metrics
  - [x] Validate and enforce strict JSON output

## Phase 5: Data Visualization & Integration
- [ ] Build Recharts components:
  - [ ] Response Time Trend (Line chart)
  - [ ] Message Length Trend (Area chart)
  - [ ] Initiation Ratio (Donut chart / Bar)
- [ ] Integrate frontend Dashboard with `/analyze` backend response
- [ ] Wire up Metric Cards with actual data (Interest Score, More Invested, etc.)
- [ ] Populate AI Insight Card with OpenAI summary and Red Flag tags

## Phase 6: Polish, Animations & Edge Cases
- [ ] Implement Motion.dev animations (Page transitions, score counter, hover effects)
- [ ] Handle constraints and edge cases:
  - [ ] File size > 5MB validation
  - [ ] Insufficient messages (< 20) warning
  - [ ] Malformed chat lines fallback
  - [ ] API failure retries and fallbacks
- [ ] Mobile responsiveness review and adjustments
- [ ] Final UI polish and testing
