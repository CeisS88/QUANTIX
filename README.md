# Mathematical Memory Matching Game 🧠🔢

A modern, interactive web-based memory matching game built with **Vanilla HTML, CSS, and JavaScript**. This game combines classic card-matching mechanics with mathematical operations to test and train both your memory and math skills!

---

## ✨ Features

* **Mathematical Challenges**: Match different expressions (addition, subtraction, multiplication, division, and parentheses) that result in the same numerical value.
* **Multiple Difficulty Levels**: Choose from **Easy**, **Medium**, **Hard**, **Expert**, or **Mixed** modes to suit your skill level.
* **Modern UI/UX**: Designed with sleek **Glassmorphism** aesthetics, smooth 3D card flip animations, and a fully responsive layout for both desktop and mobile devices.
* **Combo & Scoring System**: Earn extra points by scoring consecutive matches quickly.
* **Web Audio API**: Built-in retro sound effects for card flipping, matching, errors, and winning without relying on external audio files.
* **Zero Dependencies**: Pure vanilla JavaScript with no frameworks or external libraries required.

---

## 🎮 How to Play

1. Click **START GAME** from the main menu.
2. Flip a card to reveal a math expression (e.g., `8 ÷ 2` or `2 + 2`).
3. Flip a second card to find an expression that equals the **same value** (both equal `4`).
4. If they match, they stay open. If they don't, they flip back after a short delay.
5. Match all 12 pairs as fast as possible with the fewest moves to achieve the highest score!

---

## 🛠️ Tech Stack

* **HTML5**: Semantic document structure.
* **CSS3**: Custom properties (variables), Flexbox, CSS Grid, 3D Transforms, and Glassmorphism effects.
* **JavaScript (ES6+)**: Game state management, dynamic DOM generation, and Web Audio API synthesizer.

---

## project Structure

```text
math-memory-game/
│
├── index.html      # Main HTML structure and modals
├── style.css       # Styling, animations, and responsive design
├── script.js       # Game logic, difficulty pools, and audio synthesis
└── README.md       # Project documentation
