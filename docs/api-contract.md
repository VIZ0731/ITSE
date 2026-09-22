\# Booking API Contract (DEMO-4)

\*\*Status\*\*: Proposed Design

\*\*Responsible Person\*\*: Wang Yajie

\*\*Last Update\*\*: 2026-09-23

\*\*Related Task\*\*: DEMO-4 Define the room booking API contract

\---

\## 1. Purpose and Preconditions

This contract aims to allow the front-end form (DEMO-6) and back-end storage (DEMO-5) to be developed in parallel based on a unified request and response template.

\- \*\*Endpoint\*\*: `POST /api/bookings`

\- \*\*Preconditions\*\*: A student account must be logged in, and the target room must be in an "active" state.

\- \*\*Request Header\*\*: `Content-Type: application/json`

\- \*\*Identification\*\*: Student identity is automatically determined by the session; `studentId` \*\*cannot\*\* be written to the client as a request body field.

\---

\## 2. Request Example

```json

{

"roomId": "room-a101",

"startsAt": "2026-09-09T10:00:00Z",

"endsAt": "2026-09-09T11:00:00Z"

}


