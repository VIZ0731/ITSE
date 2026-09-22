\# Architecture and Data Model (DEMO-9)

\*\*Status\*\*: Proposed Design

\*\*Responsible Person\*\*: Wang Yajie

\*\*Last Update\*\*: 2026-09-23

\*\*Related Task\*\*: DEMO-9 Document the booking architecture

\---

\## 1. Purpose and Boundary

This document explains where a booking request is validated and how conflicting reservations are prevented.



\*\*Proposed Stack\*\*: TypeScript browser client, TypeScript HTTP API, and PostgreSQL.

\*(Note: These are design choices, not strict course requirements.)\*

\*\*Data Flow\*\*:

\- Student Browser -> HTTP API: Authenticate, authorize, validate.

\- HTTP API -> PostgreSQL: Persist booking and enforce overlap rule.

\- PostgreSQL -> HTTP API -> Browser: Return 201 confirmation or a documented error.

\- The browser \*\*never\*\* connects directly to the database.

\---

\## 2. Responsibilities

\- \*\*Browser\*\*: Handles user input, loading states, accessible validation, and campus-time display. Client checks improve usability but do \*\*not\*\* enforce access rights.

\- \*\*API\*\*: Infers the current student from the session, validates input and room existence, handles cancellation, and translates persistence conflicts into HTTP 409.

\- \*\*Database\*\*: Stores rooms and bookings, preserves ownership references, and atomically rejects conflicting active intervals.

\---

\## 3. Entities and Invariants

\- \*\*Room\*\*: `id`, `name`, `capacity`, `isActive`. Capacity is a positive integer. Inactive rooms cannot receive new bookings.

\- \*\*Booking\*\*: `id`, `roomId`, `studentId`, `startsAt`, `endsAt`, `status`, `createdAt`. `endsAt` must be later than `startsAt`. Status is `active` or `cancelled`.

\- \*\*Student\*\*: An authenticated identity reference. A student may read or cancel only their own bookings; room availability must not disclose another student’s identity.

\*\*Overlap Rule for the same room\*\*:

`existing.startsAt < proposed.endsAt AND proposed.startsAt < existing.endsAt` (Only considering active bookings).

\---

\## 4. Concurrency Decision

A simple "read-then-insert" availability check alone can let two requests pass at once. 

We must \*\*enforce the no-overlap invariant in the database\*\* and translate that constraint failure into a conflict response.

\- \*\*Proposed option\*\*: A PostgreSQL range exclusion constraint.

\- The implementation task (DEMO-5) must select and test the concrete database mechanism. See the Decision Record (ADR 001) before implementing it.

\---

\## 5. Failure Path

For a conflict:

1\. Roll back the attempted insertion.

2\. Return 409 with a stable code.

3\. Keep the user’s input in the form.

\*\*Logging\*\*: Log a request identifier, room identifier, and error code. 

\*\*Do not log\*\*: Session tokens or unnecessary personal details.

\---

\## 6. Traceability

\- \*\*DEMO-5\*\* Implement booking storage and validation

\- \*\*03 Booking API contract\*\*

\- \*\*06 Decision record and documentation template\*\*

\- \*\*05 Verification and release checklist\*\*

