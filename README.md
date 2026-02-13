# High Performance Browser-Based Code Editor

## 📌 Project Overview
This project is a high-performance browser-based code editor developed using HTML, CSS, and JavaScript. The main objective of the project is to implement advanced keyboard event handling similar to modern editors like VS Code. The editor supports real-time event debugging, keyboard shortcuts, undo/redo functionality, indentation control, and performance optimization using debouncing techniques.

The application demonstrates deep understanding of DOM events, state management, and frontend performance optimization.

---

## 🚀 Features

### ✨ Editor Interface
- Text editor built using a `<textarea>` element
- Real-time event debugging dashboard
- Responsive split layout

### ⌨️ Advanced Keyboard Shortcuts
- **Ctrl/Cmd + S** → Save action (prevents browser default)
- **Tab / Shift + Tab** → Indent and outdent lines
- **Enter** → Preserves indentation level
- **Ctrl/Cmd + Z** → Undo
- **Ctrl/Cmd + Shift + Z** → Redo
- **Ctrl/Cmd + /** → Toggle comments
- **Ctrl/Cmd + K, Ctrl/Cmd + C** → Chord shortcut action

### 🧠 State Management
- Undo/Redo history stack implementation
- Content state tracking
- Exposed global verification functions

### ⚡ Performance Optimization
- Debounced syntax highlight simulation
- Efficient event delegation
- Keyboard-driven interactions

### 📊 Event Debugging Dashboard
Logs the following events in real time:
- keydown
- keyup
- input
- compositionstart
- compositionend

---

## 🛠️ Tech Stack
- HTML
- CSS
- JavaScript (Vanilla JS)
- Docker & Docker Compose

---

## 📂 Project Structure

code-editor/
│
├── src/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── package-lock.json
└── README.md


---

## ▶️ How to Run the Project

### 1️⃣ Clone Repository
git clone https://github.com/navya1129/code-editor.git
cd code-editor


### 2️⃣ Run Using Docker


docker-compose up --build


### 3️⃣ Open in Browser


http://localhost:3000


## 🧪 Verification Functions
The application exposes the following global functions for testing:

window.getEditorState()

Returns:
{ content: string, historySize: number }

window.getHighlightCallCount()

Returns the number of times the debounced highlight logic executed.

---

## 🎯 Key Learning Outcomes
- Handling complex keyboard events using JavaScript
- Managing application state without external libraries
- Implementing editor-like behavior in web applications
- Optimizing performance using debouncing
- Containerizing frontend applications using Docker

---

## 👩‍💻 Author
Rayi Navya
B.Tech Information Technology

