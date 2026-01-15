# 🃏 Poker League Manager

A lightweight, extensible web app for managing home‑game poker leagues.  
Built with **React + TypeScript**, designed around a clean **domain‑driven model**, and structured for long‑term maintainability.

This project helps you track:

- Players  
- Games  
- Buy‑ins & rebuys  
- Side games (with costs)  
- Knockouts  
- Payments & change owed  
- League integration (coming soon)

---

## 🚀 Features

### 🎮 Game Management
- Create and manage individual poker games  
- Add players to a game  
- Track buy‑ins, rebuys, and total cost per player  
- Automatically calculate change owed  

### 🎯 Side Games
- Create custom side games (e.g., bounty, high hand)  
- Assign costs  
- Players can opt in/out per game  

### 💥 Knockout Tracking
- Record knockouts between players  
- Supports multiple knockouts per player  
- Integrates with side games like bounties  

### 🧱 Strong Domain Model
- `Game`, `GamePlayer`, `SideGame`, and `Player` classes  
- Clear separation between UI and business logic  
- Easy to extend and maintain  

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)  
- **TypeScript**  
- **Vite**  
- **Domain‑driven architecture**  
- **LocalStorage persistence** (planned)

---

## 📦 Installation

Clone the repo:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
  models/          # Domain classes (Game, GamePlayer, SideGame, etc.)
  components/      # UI components
    game/
  pages/           # Page-level components
  context/         # State management (planned)
  services/        # Storage, utilities (planned)
```

---

## 🧪 Development Notes

This project is actively evolving. Upcoming improvements include:

- League tracking  
- Persistent storage  
- Player stats  
- Game history  
- UI polish and styling  
- Exporting results  

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.

You are free to:

- Use  
- Modify  
- Distribute  

…but **any derivative work must also be released under GPLv3**, and **commercial use requires releasing your source code under the same license**.

See the full license text in the `LICENSE` file.

---

## 🤝 Contributing

Pull requests are welcome.  
If you have ideas, improvements, or bug reports, feel free to open an issue.

