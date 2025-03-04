
---

# **LogoMaker** 🎨

LogoMaker is a powerful and user-friendly web application built with React that allows users to create custom logos. With a wide range of customization options, you can design logos tailored to your needs and export them in multiple formats (PNG, JPG, SVG).

---

## **Features** ✨

### **1. Text Customization**
- **Text Input**: Enter your logo text.
- **Font Family**: Choose from a variety of fonts (e.g., Arial, Roboto, Montserrat).
- **Font Size**: Adjust the size of the text.
- **Font Weight**: Set the font weight (normal, bold, bolder, lighter).
- **Font Style**: Choose between normal and italic styles.
- **Text Color**: Pick any color for your text.
- **Text Shadow**: Add a shadow effect to the text (e.g., `0 0 5px rgba(0,0,0,0.5)`).
- **Text Outline**: Add an outline to the text (e.g., `2px solid black`).

### **2. Background Customization**
- **Solid Background**: Choose a solid color for the background.
- **Gradient Background**: Create a gradient background with two customizable colors.
- **Border Radius**: Adjust the border radius of the logo container.

### **3. Advanced Features**
- **Custom Font Upload**: Upload your own `.ttf` or `.otf` font files to use in your logo.
- **Undo/Redo**: Revert or reapply changes with undo/redo functionality.
- **Fullscreen Preview**: View your logo in fullscreen mode for better visualization.
- **Auto-Save**: Your logo state is automatically saved to localStorage.

### **4. Export Options**
- **PNG**: Export your logo as a PNG image.
- **JPG**: Export your logo as a JPG image.
- **SVG**: Export your logo as an SVG vector image.

---

## **How to Run** 🚀

### **Prerequisites**
- **Node.js**: Make sure you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is included with Node.js.

### **Steps to Run**

1. **Clone the Repository** (if applicable):
   ```bash
   git clone https://github.com/your-username/logo-maker.git
   cd logo-maker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Access the App**:
   Open your browser and go to `http://localhost:3000`.

---

## **Folder Structure** 📂

```
logo-maker/
├── public/
├── src/
│   ├── components/
│   │   ├── LogoMaker/
│   │   │   ├── LogoMaker.js
│   │   │   ├── LogoMaker.css (optional)
│   │   │   └── index.js (optional)
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```

---

## **Dependencies** 📦

- **React**: JavaScript library for building user interfaces.
- **react-color**: Color picker component for React.
- **html-to-image**: Library to export HTML elements as images.
- **lucide-react**: Icon library for React.
- **Tailwind CSS**: Utility-first CSS framework (optional, for styling).

To install all dependencies, run:
```bash
npm install react-color html-to-image lucide-react
```

---

## **Customization** 🛠️

### **Adding More Fonts**
1. Add the font name to the `fonts` array in the `LogoMaker.js` file:
   ```js
   const fonts = ["Arial", "Poppins", "Roboto", "Montserrat", "Pacifico", "YourCustomFont"];
   ```

2. Ensure the font is available in your project (e.g., via Google Fonts or custom font files).

### **Adding More Features**
- You can extend the app by adding more customization options, such as:
  - **Image Upload**: Allow users to add images to the logo.
  - **Shapes**: Add shapes (circles, squares, etc.) to the logo.
  - **Templates**: Provide predefined logo templates.

---

## **Contributing** 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## **License** 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


---

Enjoy creating logos with **LogoMaker**! 🎉
