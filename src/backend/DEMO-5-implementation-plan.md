DEMO-5: Booking Storage and Validation Implementation Plan
Status: Proposed Design
Responsible Person: Wang Yajie
Last Update: 2026-09-25
 1. Database Schema (PostgreSQL)
Based on the architecture document, we will create the following tables:
Table: rooms
- `id` UUID PRIMARY KEY
- `name` VARCHAR(255) NOT NULL
- `capacity` INT CHECK (capacity > 0)
- `is_active` BOOLEAN DEFAULT TRUE
Table: bookings
- `id` UUID PRIMARY KEY
- `room_id` UUID REFERENCES rooms(id)
- `student_id` UUID NOT NULL
- `starts_at` TIMESTAMP WITH TIME ZONE NOT NULL
- `ends_at` TIMESTAMP WITH TIME ZONE NOT NULL
- `status` VARCHAR(50) DEFAULT 'active' -- 'active' or 'cancelled'
- `created_at` TIMESTAMP DEFAULT NOW()
- Constraint: `CHECK (ends_at > starts_at)`
 2. Overlap Prevention (The Core Logic)
A simple read-then-insert is unsafe. We will implement the overlap rule at the database level using a PostgreSQL Exclusion Constraint (as discussed in ADR 001).
Rule: For the same room, an active booking cannot overlap another active booking.
`(existing.starts_at < proposed.ends_at AND proposed.starts_at < existing.ends_at)`
Note: This ensures the invariant is enforced atomically under concurrent requests.
 3. API Implementation Plan (TypeScript HTTP API)
- POST /api/bookings:
  - Validate input using the DEMO-4 API contract.
  - Insert booking into PostgreSQL.
  - Catch the 409 conflict exception from the database and translate it into a stable `booking_conflict` error response.
  - Add focused tests for validation and concurrent submissions.
Out of scope: Actual deployed database migrations.