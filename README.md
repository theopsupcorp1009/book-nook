# 📚 BookNook

A small online library built with **Next.js**, **React**, and **Tailwind CSS**. Add a book, borrow a book, return a book. Members can browse the full catalog, share their own books, borrow titles for 14 days, and track everything from a personal dashboard, all backed by a dedicated Express and MongoDB API.

- 🔗 **Live App:** [book-nook-indol.vercel.app](https://book-nook-indol.vercel.app/)
- 📦 **Repository:** [theopsupcorp1009/book-nook](https://github.com/theopsupcorp1009/book-nook)
- 🖥️ **Server API:** [book-nook-server-iota.vercel.app](https://book-nook-server-iota.vercel.app/)
- 📦 **Server Repository:** [theopsupcorp1009/book-nook-server](https://github.com/theopsupcorp1009/book-nook-server)

---

## ✨ Features

- **Home page** with a Swiper.js banner slider, a New Arrivals section showing the six latest books, a "How Borrowing Works" guide, and a Top Categories section with live book counts
- **All Books** page with live search by title or author and category filter chips
- **Book details page** showing cover, author, category, description, who added it, and copies currently available
- **Add Book** form with cover image upload, category selection, total copies, and read-only uploader details taken from the logged in user
- **My Books** dashboard to edit books through a pre-filled dialog or delete them after a confirmation dialog
- **Borrow system**: confirm a borrow in a modal, with a 14 day return date set automatically
- **My Borrows** table listing borrowed books with borrow and return dates and a one-click **Return Book** action
- **Available copies tracking**: the Borrow button is disabled with a "No copies available" message when stock runs out
- **Smart borrow rules**: no double borrowing of the same book, and users cannot borrow their own books
- **Authentication** with [better-auth](https://www.better-auth.com/) and the MongoDB adapter:
  - Email and password sign-up and sign-in
  - Google sign-in
  - Password rules: at least 6 characters, with an uppercase and a lowercase letter
  - Redirect back to the originally requested page after login
- **JWT protected API calls**: the client requests a token from better-auth and sends it to the server
- **Protected routes** (`/add-book`, `/my-books`, `/my-borrows`, `/profile`) enforced through middleware
- **User profile** page to update name and photo
- **Dark and light theme** toggle saved in the browser
- Toast notifications for every success and error, no browser alerts
- Dynamic page titles, loading states for each route, and a custom 404 page
- Fully responsive layout for mobile, tablet, and desktop

---

## 🖥️ Tech Stack

| Layer            | Technology                                              |
|------------------|----------------------------------------------------------|
| Framework        | [Next.js](https://nextjs.org/) 16 (App Router)           |
| UI Library       | React 19 with React Compiler                             |
| Styling          | Tailwind CSS v4, shadcn/ui, Base UI, tw-animate-css      |
| Authentication   | better-auth, `@better-auth/mongo-adapter`, JWT plugin   |
| Database         | MongoDB (users and sessions via better-auth)             |
| Slider           | Swiper.js                                                |
| Icons            | lucide-react, react-icons                                |
| Notifications    | react-toastify                                           |
| Forms            | react-hook-form                                          |
| Backend API      | [BookNook Server](https://github.com/theopsupcorp1009/book-nook-server) (Express + MongoDB) |
| Deployment       | Vercel                                                   |

---

## 📂 Project Structure

```
book-nook/
├── public/
│   └── assets/                          # Banners, icons, default avatar
├── src/
│   ├── app/
│   │   ├── page.js                      # Home page
│   │   ├── layout.js                    # Root layout
│   │   ├── loading.js / not-found.js
│   │   ├── all-books/
│   │   │   ├── page.jsx                 # All books with search and filter
│   │   │   └── [id]/page.jsx            # Book details
│   │   ├── add-book/page.jsx            # Add a book (private)
│   │   ├── my-books/page.jsx            # Manage own books (private)
│   │   ├── my-borrows/page.jsx          # Borrowed books (private)
│   │   ├── profile/page.jsx             # Profile (private)
│   │   ├── sign-in/page.jsx
│   │   ├── sign-up/page.jsx
│   │   └── api/auth/[...all]/route.js   # better-auth API route handler
│   ├── components/
│   │   ├── homepage/                    # Banner, NewArrival, HowItWorks, TopCategories
│   │   ├── books/                       # BookCard, AddBookForm, UpdateBookDialog,
│   │   │                                # DeleteBooksDialog, BorrowDialog, ReturnBorrows, ...
│   │   ├── profile/ProfileForm.jsx
│   │   ├── shared/                      # Navbar, Footer, PageTitle
│   │   └── ui/                          # shadcn/ui components
│   ├── lib/
│   │   ├── auth.js                      # better-auth server config
│   │   ├── auth-client.js               # better-auth client
│   │   ├── getTokenFromClient.jsx       # JWT for client components
│   │   └── getTokenFromServer.jsx       # JWT for server components
│   └── proxy.js                         # Auth-gated route middleware
├── .env                                 # Environment variables (never commit)
├── package.json
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm (or yarn / pnpm / bun)
- A MongoDB database
- Google OAuth credentials
- A running instance of the [BookNook Server](https://github.com/theopsupcorp1009/book-nook-server), local or hosted

### Installation

```bash
# Clone the repository
git clone https://github.com/theopsupcorp1009/book-nook.git
cd book-nook

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

`NEXT_PUBLIC_SERVER_URL` is the base URL of the BookNook Server. Use `https://book-nook-server-iota.vercel.app` to talk to the hosted API.

> Use the same MongoDB database name as the server (`bookNook-db`) and keep `.env` out of version control.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🎛️ How to Use

1. Browse the **Home** page, then open **All Books** to search or filter by category.
2. **Sign up** with email and password, or continue with **Google**.
3. Use **Add Book** to share a book with a cover image, category, and number of copies.
4. Open any book and press **Borrow This Book** to confirm a 14 day borrow.
5. Visit **My Borrows** to see your borrowed books and return them when you are done.
6. Use **My Books** to edit or delete the books you added.
7. Switch between **dark and light** mode from the navbar at any time.

---

## 🔗 Backend Integration

The client calls the BookNook Server with a JWT in the `Authorization: Bearer <token>` header for protected routes:

| Action                  | Request                          | Auth |
|-------------------------|----------------------------------|------|
| List all books          | `GET /all-books`                 | No   |
| Categories              | `GET /categories`, `GET /top-categories` | No |
| Book details            | `GET /all-books/:id`             | Yes  |
| Add book                | `POST /books`                    | Yes  |
| My books                | `GET /my-books/:email`           | Yes  |
| Update book             | `PATCH /my-books/:id`            | Yes  |
| Delete book             | `DELETE /my-books/:id`           | Yes  |
| Borrow a book           | `POST /borrows`                  | Yes  |
| My borrows              | `GET /borrows/:email`            | Yes  |
| Return a book           | `DELETE /borrows/:id`            | Yes  |

Full API documentation lives in the [server README](https://github.com/theopsupcorp1009/book-nook-server#readme).

---

## 🌐 Deployment

This app is deployed on **Vercel**. Any push to the connected branch triggers an automatic build and deployment.

To deploy your own copy:

1. Push this repository to your GitHub account.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add all the environment variables listed above in the Vercel project settings.
4. Set `BETTER_AUTH_URL` to your production domain and add the matching Google OAuth redirect URL.
5. Vercel auto-detects the Next.js framework, so no extra configuration is needed.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- Authentication powered by [better-auth](https://www.better-auth.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/) and sliders by [Swiper](https://swiperjs.com/)
- Hosted on [Vercel](https://vercel.com/)

---

## 📝 Project Summary

**BookNook** is a full-stack online library split into two projects: a Next.js frontend and an Express and MongoDB backend. Visitors can browse and search the catalog, while signed-in members can add books with cover uploads, borrow titles for 14 days, return them, and manage their own listings. The frontend uses the App Router with React 19 and the React Compiler, authenticates users with better-auth (email and password plus Google) and a MongoDB adapter, and sends JWTs to the API to protect private actions. Stock is tracked per book, so borrowing and returning update available copies automatically, with safeguards against double borrowing. Styled with Tailwind CSS and shadcn/ui, with dark mode, toast feedback, and full responsiveness, the project demonstrates practical experience with full-stack architecture, token-based authorization, CRUD workflows, file uploads, and deploying separate frontend and backend services on Vercel.
