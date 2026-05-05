# 🧠 Ghosted.AI — Project Todo List

## Phase 1: Project Setup & Infrastructure
- [ ] Initialize Next.js 14 project (App Router)
- [ ] Configure Tailwind CSS & CSS variables (colors, borders, gradients)
- [ ] Install required dependencies (Recharts, Motion.dev, Font Awesome, etc.)
- [ ] Setup Express.js backend server structure
- [ ] Scaffold project file structure (`app/`, `components/`, `lib/`, `server/`)
- [ ] Configure environment variables (OpenAI API Key, ports)

## Phase 2: Frontend Foundation & Design System
- [ ] Import and configure Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- [ ] Build base UI Components:
  - [ ] Button variants (Primary, Secondary, Danger, Icon)
  - [ ] Cards (Glass Card, Metric Card, Insight Card)
  - [ ] Badge & Tag elements
  - [ ] Progress Bar
  - [ ] Score Ring / Circular Gauge
- [ ] Implement core animations & transitions tokens

## Phase 3: Core Pages Implementation
- [ ] **Landing Page**
  - [ ] Hero section with headline and CTA
  - [ ] "How It Works" 3-step section
  - [ ] Animated background effects
- [ ] **Upload Page**
  - [ ] Drag-and-drop file upload zone
  - [ ] Upload states (Default, Drag Over, Uploading, Complete, Error)
- [ ] **Results Dashboard (Shell)**
  - [ ] Dashboard layout with metric cards placeholders
  - [ ] Charts section placeholders
  - [ ] AI Insight card placeholder

## Phase 4: Core Logic & Backend Implementation
- [ ] **Backend (Express)**
  - [ ] Set up `multer` for file upload handling (in-memory processing)
  - [ ] Create `/analyze` API route
- [ ] **Parsing & Metrics**
  - [ ] Implement WhatsApp `.txt` parser (`[DD/MM/YYYY, HH:MM:SS] Sender: Message`)
  - [ ] Implement metrics computation (Response Time, Message Length, Initiation Ratio, Engagement Signals)
- [ ] **AI Integration**
  - [ ] Integrate OpenAI GPT-4o API
  - [ ] Construct AI prompt with computed metrics
  - [ ] Validate and enforce strict JSON output

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
