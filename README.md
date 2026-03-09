# PackMate--Collaborative-Travel-Packing-List-Sharer

## Authors
- Rachit Patel
- Prajakta Avachat

## Class Link
[CS Web Development - Northeastern University](https://canvas.northeastern.edu)

## Project Objective
PackMate is a collaborative travel packing list app. Travelers can build structured packing lists for their trips, and the community contributes and upvotes real-world packing tips per trip type and climate. Students save planning time by browsing proven advice instead of starting from scratch.

## Screenshot
<!-- Add screenshot after deployment -->

## Tech Stack
- **Frontend:** React (Hooks)
- **Backend:** Node.js + Express
- **Database:** MongoDB (no Mongoose)

## Instructions to Build

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Backend
```bash
cd backend
cp .env.example .env
# Fill in your MONGO_URI and PORT in .env
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- Create and manage trips with destination, climate, and trip type
- Browse categorized master packing items (Clothing, Electronics, Toiletries, etc.)
- Check off items as you pack with progress tracking
- Submit and browse community packing tips
- Upvote helpful tips so the best advice rises to the top
- Filter tips by trip type and climate