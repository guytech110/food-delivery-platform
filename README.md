# 🍕 Food Delivery Platform

A complete food delivery platform inspired by Uber Eats, featuring home cooks and restaurants. Built with React, TypeScript, Vite, TailwindCSS, and Firebase.

## 🏗️ Project Structure

This is a monorepo containing three main applications:

```
food-delivery-platform/
├── customer-app/          # Customer-facing application (neon-lab)
├── cook-app/             # Cook/restaurant application (builder-cosmos-sanctuary-main)
├── admin-portal/         # Admin dashboard (gravy-goat-22650524.figma.site_gd5lp4)
└── README.md
```

## 🚀 Applications

### 1. Customer App (`customer-app/`)
- **Port**: 8081
- **URL**: http://localhost:8081/
- **Features**:
  - User authentication (login/signup)
  - Browse restaurants and dishes
  - Cart management
  - Order tracking
  - Profile management
  - Community features

### 2. Cook App (`cook-app/`)
- **Port**: 8080
- **URL**: http://localhost:8080/
- **Features**:
  - Cook onboarding and KYC verification
  - Menu management
  - Order management
  - Earnings tracking
  - Profile management

### 3. Admin Portal (`admin-portal/`)
- **Port**: 5174
- **URL**: http://localhost:5174/
- **Features**:
  - User management
  - Order management
  - Cook management
  - Analytics and reports
  - Real-time dashboard

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Radix UI + Lucide React icons
- **State Management**: React Context API
- **Real-time**: Firebase onSnapshot listeners
- **Authentication**: Firebase Auth with role-based access

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/guytech110/food-delivery-platform.git
   cd food-delivery-platform
   ```

2. **Install dependencies for all apps**
   ```bash
   # Customer App
   cd customer-app && npm install && cd ..
   
   # Cook App
   cd cook-app && npm install && cd ..
   
   # Admin Portal
   cd admin-portal && npm install && cd ..
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Add your Firebase config to each app's `lib/firebase.ts`

4. **Start the applications**
   ```bash
   # Terminal 1: Customer App
   cd customer-app && npm run dev
   
   # Terminal 2: Cook App
   cd cook-app && npm run dev
   
   # Terminal 3: Admin Portal
   cd admin-portal && npm run dev
   ```

## 📱 Access Points

- **Customer App**: http://localhost:8081/
- **Cook App**: http://localhost:8080/
- **Admin Portal**: http://localhost:5174/

## 🔐 Authentication

### Admin Portal Login
- **Email**: admin@hometaste.com
- **Password**: (your admin password)

### Test Users
- Customer accounts can be created through the signup flow
- Cook accounts require KYC verification through the cook app

## 🗄️ Database Structure

### Firebase Collections
- `users` - Customer accounts
- `cooks` - Cook/restaurant accounts
- `admins` - Admin accounts
- `orders` - Order data
- `menus` - Restaurant menus
- `analytics` - Platform analytics

## 🚀 Development

### Adding Features
Each app is independent and can be developed separately. Common patterns:

1. **New Page**: Add to `pages/` directory
2. **New Component**: Add to `components/` directory
3. **New Context**: Add to `contexts/` directory
4. **API Integration**: Use Firebase services

### Code Style
- TypeScript throughout
- TailwindCSS for styling
- React hooks for state management
- Firebase for backend services

## 📊 Roadmap

### ✅ Completed
- [x] Customer App MVP
- [x] Cook App MVP
- [x] Admin Portal
- [x] Firebase Integration
- [x] Real-time Features
- [x] Authentication System

### 🔄 Next Phase
- [ ] Payment Integration (Stripe)
- [ ] Push Notifications
- [ ] Advanced Analytics
- [ ] Mobile App Development
- [ ] Performance Optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all applications
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
