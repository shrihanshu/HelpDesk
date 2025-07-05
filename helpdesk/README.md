# HelpDesk System

A modern, role-based helpdesk management system built with React, Vite, and Tailwind CSS. Features comprehensive authentication, role-based access control, and a beautiful, responsive UI.

## 🚀 Features

### Authentication & Authorization
- **Role-based Authentication**: Secure login system with predefined user roles
- **Session Management**: Persistent login sessions with localStorage
- **Protected Routes**: Role-based access control for different sections
- **User Profiles**: Personalized user information and avatars

### User Roles
- **User**: Create tickets, view personal tickets, submit feedback
- **Admin**: Full system access, user management, database administration
- **Technical Support**: Ticket management, performance analytics
- **Operation Team**: Ticket approval, performance monitoring

### Core Functionality
- **Ticket Management**: Create, view, and manage support tickets
- **Dashboard Analytics**: Role-specific dashboards with relevant metrics
- **User Management**: Admin tools for managing users and teams
- **Performance Tracking**: Analytics and performance monitoring
- **Feedback System**: User feedback collection and management
- **AI Assistant**: Built-in chatbot for user support

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Icons**: React Icons (FontAwesome)
- **State Management**: React Context API
- **Authentication**: Custom role-based auth system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd helpdesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication

### Demo Credentials

The system comes with predefined demo accounts for testing:

| Role | Username | Password |
|------|----------|----------|
| User | `user` | `user123` |
| Admin | `admin` | `admin123` |
| Technical Support | `techsupport` | `tech123` |
| Operation Team | `operation` | `operation123` |

### Login Process
1. Navigate to the login page
2. Enter username and password from the demo credentials
3. System automatically redirects to role-specific dashboard
4. Session persists across browser refreshes

## 🎯 Role-Based Features

### User Role
- Create new support tickets
- View personal ticket history
- Submit feedback and ratings
- Access user profile settings

### Admin Role
- Full system administration
- User management and database access
- System settings and configuration
- User log history monitoring

### Technical Support Role
- Manage assigned tickets
- View performance analytics
- Ticket resolution and updates
- Support team metrics

### Operation Team Role
- Ticket approval workflow
- Performance monitoring
- Team management
- Operational analytics

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── hooks/              # Custom hooks
│   └── useRoleAccess.js
├── App.jsx             # Main application component
├── Dashboard.jsx       # Main dashboard component
├── LoginPage.jsx       # Authentication page
├── SignupPage.jsx      # User registration
├── Header.jsx          # Application header
├── Sidebar.jsx         # Navigation sidebar
└── ...
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=HelpDesk System
VITE_API_URL=your-api-url
```

### Customization
- **Themes**: Modify Tailwind config for custom styling
- **Roles**: Update AuthContext for additional user roles
- **Permissions**: Extend useRoleAccess hook for custom permissions

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
