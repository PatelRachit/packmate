# PackMate - Collaborative Travel Packing List Sharer

## Authors
- Rachit Patel
- Prajakta Avachat

## Class Link
[CS5610 Web Development - Northeastern University](https://canvas.northeastern.edu)

## Project Objective
Travelers waste hours researching what to pack, often forgetting essentials or over-packing for the wrong climate. PackMate lets travelers build and manage structured packing lists for their trips while the community contributes and upvotes real-world packing tips per trip type. Students save significant planning time by browsing proven community advice instead of starting from scratch — and after their trip, they contribute back, creating a self-improving feedback loop.

## Screenshot
<!-- Replace with actual screenshot after deployment -->
![PackMate App Screenshot](screenshot.png)

## Tech Stack
- **Frontend:** React with Hooks (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Native Driver, no Mongoose)

## Instructions to Build

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/PackMate--Collaborative-Travel-Packing-List-Sharer.git
cd PackMate--Collaborative-Travel-Packing-List-Sharer
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Open .env and fill in your MONGO_URI, DB_NAME, and PORT
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

## Features

### Rachit's Implementation (Trips & PackingItems)
- Create, view, update, and delete trips with destination, climate, type, and duration
- Browse master packing items by category (Clothing, Electronics, Toiletries, Documents, Activity Gear)
- Add custom items to your trip list
- Check off items as you pack with a live completion percentage
- Admin management of master packing items database

### Prajakta's Implementation (Users & CommunityTips)
- Create an account and log in/out securely
- Submit packing tips tagged to trip type and climate
- Browse and filter community tips by trip type (beach, hiking, city, winter, business)
- Upvote helpful tips and remove accidental upvotes
- View all your personally submitted tips in one place

## License
MIT