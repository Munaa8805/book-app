# 📚 Book App

A React Native mobile application built with Expo for sharing and discovering books. Users can browse a curated feed of books, view ratings, and manage their profile.

## ✨ Features

- 🔐 **Authentication System**
  - User registration and login
  - Secure token-based authentication
  - Persistent session management

- 📖 **Book Feed**
  - Browse a collection of books
  - View book details including:
    - Book cover images
    - Star ratings (1-5 stars)
    - Descriptions/captions
    - Publication dates

- 👤 **User Profile**
  - View user information
  - Display member since date
  - Logout functionality

- 🎨 **Modern UI/UX**
  - Bottom tab navigation with icons
  - Responsive design
  - Safe area handling
  - Custom color themes

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.81.5) - Cross-platform mobile framework
- **React** (19.1.0) - UI library
- **Expo** (~54.0.31) - Development platform and toolchain

### Navigation
- **@react-navigation/native** - Navigation library
- **@react-navigation/bottom-tabs** - Bottom tab navigator
- **@react-navigation/native-stack** - Stack navigator

### State Management
- **React Context API** - Global state management
  - `AppContext` - User authentication and app state
  - `ProductContext` - Book/product data

### UI Components & Styling
- **expo-image** - Optimized image component
- **@expo/vector-icons** (Ionicons) - Icon library
- **react-native-safe-area-context** - Safe area handling
- Custom style sheets with theme support

### Data & Storage
- **@react-native-async-storage/async-storage** - Local data persistence
- **axios** - HTTP client for API requests

## 📁 Project Structure

```
book-app/
├── api/                    # API integration
│   └── auth.js            # Authentication API calls
├── assets/                # Static assets
│   ├── fonts/             # Custom fonts
│   ├── images/            # Image assets
│   └── styles/            # Style definitions
├── bottomTab/             # Bottom tab navigation
│   └── bottomTabNavigator.js
├── components/            # Reusable UI components
│   ├── BookCard.js        # Book card component
│   ├── Button.js          # Button component
│   └── SafeScreen.js      # Safe area wrapper
├── constants/             # App constants
│   ├── api.js            # API endpoints
│   └── colors.js         # Color theme
├── context/              # React Context providers
│   ├── AppContext.js     # App-wide state
│   └── ProductContext.js # Product/book state
├── hooks/                # Custom React hooks
│   └── useDebounce.js
├── screens/              # Screen components
│   ├── HomeScreen.js     # Main feed screen
│   ├── LoginScreen.js    # Login screen
│   ├── ProfileScreen.js  # User profile
│   └── RegisterScreen.js # Registration screen
├── utility/              # Utility functions
│   ├── authToken.js      # Token management
│   ├── axios.js          # Axios configuration
│   └── constants.js      # General constants
├── App.js                # Root component
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **Expo Go app** (for testing on physical devices)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   This will start the Expo development server and display a QR code.

### Running on Different Platforms

#### iOS Simulator (macOS only)
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```
*Note: Requires Android Studio and an emulator to be running*

#### Web Browser
```bash
npm run web
```

#### Physical Device
1. Install **Expo Go** app on your device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## 🏗 Building for Production

### Android Build

This project is configured with **EAS Build** (Expo Application Services) for creating production builds.

#### Cloud Build (Recommended)

1. **Set up Android credentials** (first time only)
   ```bash
   npx eas credentials
   ```
   - Select **Android**
   - Choose **Yes** when prompted to generate a new keystore

2. **Build the APK**
   ```bash
   npx eas build -p android --profile preview
   ```
   - This creates an APK file suitable for direct installation
   - Build time: ~10-20 minutes
   - You'll receive a download link when complete

3. **Production Build (AAB for Play Store)**
   ```bash
   npx eas build -p android --profile production
   ```

#### Local Build

If you have Android SDK installed:
```bash
npx eas build -p android --profile preview --local
```

### iOS Build

For iOS builds, you'll need an Apple Developer account:

```bash
npx eas build -p ios --profile production
```

## ⚙️ Configuration

### Environment Variables

The app connects to a backend API. Update the API endpoints in:
- `constants/api.js` - API base URL
- `context/AppContext.js` - Authentication endpoints

### App Configuration

Edit `app.json` to customize:
- App name and slug
- Package identifier (Android: `com.munaa.bookapp`)
- Icons and splash screens
- Orientation settings

### EAS Build Configuration

The `eas.json` file contains build profiles:
- **development** - Development builds with dev client
- **preview** - APK builds for testing
- **production** - Production builds for app stores

## 🎨 Theming

The app uses a centralized color system defined in `constants/colors.js`. Currently configured with a **FOREST** theme, with additional themes (RETRO, OCEAN, BLOSSOM) available as comments.

To change themes, uncomment your preferred theme in `constants/colors.js`.

## 📱 Features in Detail

### Authentication Flow
1. Users can register with name, email, and password
2. Login with email and password
3. Tokens are stored securely using AsyncStorage
4. Automatic session restoration on app launch

### Book Feed
- Displays books in a scrollable list
- Each book card shows:
  - Cover image (with fallback)
  - Title
  - Star rating visualization
  - Description/caption
  - Publication date

### Navigation
- Bottom tab navigation between:
  - **Home** - Book feed (home icon)
  - **Profile** - User profile (person icon)
- Stack navigation for:
  - Login/Register screens
  - Main app screens

## 🔒 Security

- Secure token storage using AsyncStorage
- API authentication headers
- CORS configuration
- Input validation on forms

## 📝 Code Architecture

This project follows strict architectural rules:

- **Frontend/Backend Separation**: No backend logic in frontend
- **Component Organization**: Clear separation of concerns
- **State Management**: React Context for global state
- **Documentation**: All components include purpose comments
- **Error Handling**: Centralized error handling
- **Validation**: Input validation on all forms

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Add comments for all components and complex logic
3. Ensure mobile-first responsive design
4. Test on both iOS and Android platforms
5. Follow the architectural rules defined in the project

## 📄 License

This project is private.

## 👤 Author

**munaa**

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

**Built with ❤️ using React Native and Expo**
