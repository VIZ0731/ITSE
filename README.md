# Campus Rooms Booking System

**Project Status**: MVP Complete - Ready for Final Evaluation
**Course**: Introduction to Software Engineering

## Overview
The Campus Rooms Booking System is a web application that allows students to reserve campus rooms for group study without double booking. It includes a room catalogue, a booking form with overlap prevention, and a dashboard to manage and cancel personal bookings.

##  Technology Stack
- **Frontend**: React (TypeScript), accessible HTML/CSS
- **Backend**: Node.js, Express.js (TypeScript)
- **Database**: PostgreSQL 15.4
- **Testing**: Jest, Supertest

##  Repository Structure
- `docs/`: API contracts, architectural decisions, and setup guides.
- `src/backend/`: TypeScript server and API endpoint implementations.
- `src/frontend/`: React components for the UI (Booking Form, Catalogue, My Bookings).

##  Local Setup & Running
Detailed instructions are available in the Knowledge Base (Article 04). 

To quickly run the project locally:
```bash
git clone https://github.com/VIZ0731/ITSE.git
cd ITSE
npm ci
# Configure your .env file (see docs/setup-guide.md)
npm run db:migrate
npm run db:seed
npm run dev
Documentation & Project Management
Knowledge Base: https://pm.kreosoft.ru/kb?doc=01a0f7f2-4e6d-71a1-9d55-73c8fd548360
Project Board (Tasks & Time Tracking):https://pm.kreosoft.ru/project/01a0aedc-77b5-7e1f-acf6-bbf686119d5a

Note: The Knowledge Base contains the full API contract, Data Model (ER diagrams), and the Verification Checklist (V1-V8 scenarios).
 Testing
The application includes focused tests for the core booking flow. To run the test suites:

bash
npm test
npm run test:integration