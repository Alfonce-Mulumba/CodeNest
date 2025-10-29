## CodeNest Developers Overview

## 🧭 About

**CodeNest Developers** is a full-stack web application for offering **remote professional services** such as **web development**, **academic writing**, and **digital solutions**.
The platform provides a central place where clients can view services, explore a developer portfolio, and directly book or request services online.

### 🎨 Frontend Overview

**Tech Stack:** React.js, TailwindCSS, JavaScript, HTML, CSS
**Hosting:** Render (Static Site)
**Service Name:** `CodeNest Developers`

#### 💡 Intended Functionality

* `Home Page:` Overview of offered services, mission, and featured projects.
* `Portfolio Page:` Displays recent projects with GitHub links, live site previews, and screenshots.
* `Services Page:` Lists all available services with pricing and booking options.
* `Booking Page / Form:` Allows clients to request a specific service.
* `About Page:` Highlights background, experience, and value proposition.
* `Contact Page:` Form and social media links for direct communication.
* `Admin Dashboard (secured):` For managing users, bookings, services, and projects.

### ⚙️ Backend Overview

**Tech Stack:** Node.js (Express), Prisma ORM, PostgreSQL, JavaScript
**Hosting:** Render (Web Service) ---TBC
**Service Name:** `CodeNest`

#### 🔐 High-Level Logic

* **Authentication & Authorization:**
  Secure JWT-based login system for clients and admins.
  Role-based access ensures admins can manage data while clients only access their own records.

* **Core APIs:**

  * **Auth API:** Registration, login, password reset, email verification.
  * **Services API:** CRUD operations for offered services.
  * **Projects API:** Portfolio management (public for clients, editable by admin).
  * **Bookings API:** Clients can create and view their bookings; admins can view and manage all bookings.
  * **Admin API:** Manage users, delete services, and update portfolio entries.

* **Database Layer (Prisma):**
  Models include `User`, `Service`, `Project`, and `Booking`, each with clear relationships and data validation.


### 🧩 Collaboration Notes

* `.env` file contains environment-specific URLs (Render + localhost) for smooth CORS handling.
* Use **Prisma Migrate** for schema changes and **Seed.js** for populating initial data.
* Codebase is modular: controllers handle logic, routes handle endpoints, and middleware enforces security.
* The structure supports scalability — easy to extend for blog, testimonials, or payment integration.

---

### 🚀 Summary

`CodeNest Developers is designed as a multiservice freelancing and portfolio platform that:`
* Will demonstrate live/upcoming professional web projects (portfolio).
* Will enable clients to book services online.