# HelpDesk Web Application

**Live Demo:** [https://help-desk-4i4dufulo-mshrihanshu-1507s-projects.vercel.app/](https://help-desk-4i4dufulo-mshrihanshu-1507s-projects.vercel.app/)

A modern, full-featured HelpDesk web application built with React, Vite, and Tailwind CSS.

## Features
- User, Admin, Technical Support, and Operation Team dashboards
- Ticket creation, management, and feedback system
- Animated, responsive UI with framer-motion
- Sidebar navigation with role-based views
- User profile management and settings
- Performance tracking for support staff
- Notification system and language toggle
- Modals for ticket details, editing, team creation, and feedback
- Pagination, search, and dropdowns for tables
- Deployable to Vercel or Netlify

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/shrihanshu/HelpDesk.git
   cd HelpDesk/helpdesk
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running Locally
```sh
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```sh
npm run build
# or
yarn build
```

### Deployment
- **Vercel:** Set the project root to `helpdesk` in Vercel settings. Build command: `npm run build`. Output directory: `dist`.
- **Netlify:** Set the build command to `npm run build` and publish directory to `helpdesk/dist`.

> If using custom routes (SPA), you may need a `vercel.json` or `_redirects` file. See deployment docs for details.

## Project Structure
```
HelpDesk/
  helpdesk/
    src/
      components/
      ...
    package.json
    ...
```

## Contact
For questions or support, contact [shrihanshu](mailto:shrihanshumishra@gmail.com).

---
MIT License 