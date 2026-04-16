# Wanderlust | Premium Travel Diary

Wanderlust is a beautifully crafted, highly interactive Travel Diary built with Next.js 16+, Framer Motion, and Tailwind CSS. It is entirely driven by **Contentstack CMS**, providing dynamic storytelling capabilities, traveler profiling, and rich multimedia layouts under the hood of a sleek, dark-themed UI.

## 🚀 Features

- **Dynamic Story Rendering:** Blogs are dynamically generated pulling in multi-modular sections (Day Plans, Highlights, Tips) via Contentstack's rich JSON RTE blocks.
- **Interactive Framer Motion UI:** State-of-the-art page transitions, `staggerChildren` layout revealing, sticky blurring navbars, and interactive hero sections.
- **Advanced Filtering Matrix:** Instantly search through trips by name, or slice them up precisely through interactive Destination and Theme filters cleanly placed beneath a prominent search bar.
- **Lightbox Gallery:** Integrated native lightbox modal on the Story detail pages that pops images up full-screen.
- **Traveler Profiles & Authorship:** Fully mapped many-to-many relationship. Story pages map perfectly back to their authors, and tapping an author yields a comprehensive aggregation of all their trips!
- **Destination Aggregation:** Tapping a destination yields a dedicated query showing stories matched to that destination, plus dynamically highlights key `places/palaces` in an engaging layout.

## 💻 Tech Stack

- **Framework:** Next.js (App Router, Server & Client Components)
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data/CMS:** Contentstack (TypeScript SDK)

## 📦 Local Setup

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set your environment variables (.env):**
   ```env
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=development
   ```
4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact with your local platform.

## 📖 Contentstack Schema Expectations

Currently deployed schema expectations include:
- `travel_story`: Core content type housing arrays of mixed blocks, relations to `destination` and `traveler`.
- `traveler`: Includes `full_name`, `profile_picture`, `bio`, and `social_link`.
- `destination`: Includes `name` and `places` reference texts.
