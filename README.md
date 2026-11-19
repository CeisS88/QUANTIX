# QUANTIX — Cognitive Arithmetic Engine 🧠🔢

A modern, interactive web-based cognitive arithmetic memory game built with Vanilla HTML, CSS, and JavaScript. This game combines classic card-matching mechanics with dynamically generated mathematical operations to test and train both your working memory and mental math skills!

## ✨ Features
- **Dynamic Procedural Equations:** Every session generates fresh, unique pairs of mathematical expressions (addition, subtraction, multiplication, division, nested parentheses, and exponents) that resolve to the exact same numerical value.
- **Multiple Difficulty Levels:** Choose from **Easy**, **Medium**, **Hard**, **Expert**, or **Mixed** modes directly from the Difficulty Matrix to suit your skill level.
- **Modern Obsidian & Gold UI/UX:** Designed with sleek Glassmorphism aesthetics, an interactive `<canvas>` ambient harmonic field, smooth 3D card flip & tilt animations, and a fully responsive layout for both desktop and mobile devices.
- **Combo & Telemetry System:** Earn bonus points by scoring consecutive matches quickly while tracking moves, elapsed time, and final solve accuracy.
- **Web Audio API:** Built-in synthesized tactile sound effects for card flipping, matching, errors, and winning without relying on external audio files.
- **Zero Dependencies:** Pure vanilla JavaScript with no frameworks, external libraries, or `eval()` required.

## 🎮 How to Play
1. Select your preferred tier in the **Difficulty Matrix** and click **INITIALIZE SESSION** from the main menu.
2. Flip a card to reveal a mathematical expression (e.g., `18 × 4 − 24`).
3. Flip a second card to find a different expression that equals the exact same value (e.g., `132 ÷ 4 + 15`, where both equal `48`).
4. If they match, they stay open and award points. If they don't, they flip back after a short delay.
5. Match all **12 pairs** as fast as possible with the fewest moves to achieve the highest score and accuracy!

## 🛠️ Tech Stack
- **HTML5:** Semantic document structure, custom inline SVG emblem, and accessible modal dialogs.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, 3D Transforms, keyframe animations, and Glassmorphism effects.
- **JavaScript (ES6+):** Procedural arithmetic pair generator, HTML5 Canvas ambient particle & wave engine, game state management, and Web Audio API synthesizer.

## 📁 Project Structure
```text
quantix/
│
├── index.html      # Main HTML structure, SVG logo, and modals
├── style.css       # Obsidian & gold styling, 3D animations, and responsive design
├── script.js       # Dynamic math generator, canvas engine, and audio synthesis
└── README.md       # Project documentation
```
