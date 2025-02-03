# 📌 MyFlix Angular Client

The **MyFlix Angular Client** is a single-page, responsive movie web application built with Angular. It allows users to browse movies, view detailed information about directors and genres, manage their favorite movies, and update their user profile.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## 🚀 Features

- User Registration and Login (with authentication)
- Display of Movies with Details (title, description, genre, director)
- Add/Remove Movies from Favorites
- View Genre and Director Information via Dialogs
- Profile Management: Update User Info & Delete Account
- Responsive Design with Angular Material
- API Integration using HTTP requests

## 📦 Technologies Used

- **Angular 18** (Client-side framework)
- **Angular Material** (UI Components)
- **TypeDoc** (Documentation)
- **TypeScript** (Strongly typed JavaScript)
- **RxJS** (Reactive programming)
- **HTML & SCSS** (Styling)

## ⚙️ Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/myFlix-Angular.git
   cd myFlix-Angular
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The app will auto-reload if you make changes.

## 🗂️ API Integration

This client interacts with the [MyFlix API](https://strobeapp-583fefccfb94.herokuapp.com), which provides RESTful endpoints for:

- **Movies:** Get all movies or fetch details by title
- **Directors & Genres:** Retrieve specific information
- **Users:** Registration, login, update, delete, and manage favorites

## 📄 Documentation

- **TypeDoc Documentation:**  
  The project uses TypeDoc for code documentation.  
  Run the following command to generate the docs:
  ```bash
  npx typedoc
  ```  
  Documentation will be available in the `docs/` folder.

## 🧪 Running Unit Tests

Run unit tests with:
```bash
ng test
```
Uses [Karma](https://karma-runner.github.io) as the test runner.

## 🌐 Deployment

To build the project for production:
```bash
ng build --prod
```
The build artifacts will be stored in the `dist/` directory.

## 🪽 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📬 Contact

For any questions, feel free to reach out via GitHub Issues or create a pull request with improvements!
