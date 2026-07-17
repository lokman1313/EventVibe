# EventVibe 🎉

# live link :https://event-vibe-nine.vercel.app/

**EventVibe** is a modern event management and discovery platform built with Next.js and TypeScript. It lets organizers create and publish events while giving attendees a clean interface to browse, discover, and book events. The platform includes a role-based admin panel for approving, publishing, and managing events.

---

## ✨ Features

- **User Authentication** — Email/password sign-up & sign-in, plus Google OAuth, powered by [Better Auth](https://www.better-auth.com/)
- **Role-Based Access Control** — Separate experiences for `admin` and `client` users, with protected admin routes
- **Event Creation** — Organizers can create events with title, category, price, location, date, description, and a banner image
- **Image Uploads** — Event banners and profile pictures are uploaded via the ImgBB API
- **Admin Dashboard** — Approve, publish/unpublish, and delete events from a centralized table view
- **Dynamic Navigation** — Navbar adapts based on the logged-in user's role
- **Responsive UI** — Built with [HeroUI](https://heroui.com/) components and Tailwind CSS, with light/dark theme support
- **Toast Notifications** — Real-time feedback via `react-toastify`

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, [HeroUI](https://heroui.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) (Email/Password + Google) |
| Database | MongoDB |
| Image Hosting | ImgBB API |
| Notifications | react-toastify |
| Icons | react-icons |

---

## 📁 Project Structure

```
event-vibe/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   └── admin/
│   │       ├── create-event/
│   │       └── ...
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AllEventTable.tsx
│   │   │   └── EventDeleteAlart.tsx
│   │   ├── NavbarSection.tsx
│   │   └── ThemeSwitch.tsx
│   └── lib/
│       ├── action/
│       │   └── event.ts
│       ├── core/
│       │   ├── server.ts
│       │   └── session.ts
│       ├── auth.ts
│       └── auth-client.ts
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google OAuth](https://console.cloud.google.com/) client ID & secret
- An [ImgBB API key](https://api.imgbb.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lokman1313/EventVibe.git
   cd EventVibe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=your_database_name

   # Better Auth
   BETTER_AUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # ImgBB Image Upload
   NEXT_PUBLIC_IMAGE_BB_UPLOAD_API=your_imgbb_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Authentication & Roles

EventVibe uses **Better Auth** for authentication, extended with a custom `role` field (`admin` / `client`) on the user model. Roles determine which navigation items and pages a user can access:

- **Admin** — Can create events, manage/approve/publish events, and view all users
- **Client** — Can browse events and manage their own bookings

New users are assigned a default role server-side, so role escalation cannot be done from the client.

---

## 📸 Image Uploads

Banner images and profile pictures are uploaded client-side to **ImgBB**, and the resulting hosted URL is stored with the event/user record — no image files are stored on the server itself.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is available under the MIT License.

---

## 📬 Contact

For questions or feedback, feel free to open an issue on the [GitHub repository](https://github.com/lokman1313/EventVibe).
