 WANG-11: List Current Student Bookings Implementation Plan
Status: Proposed Design
Responsible Person: Wang Yajie
Last Update: 2026-10-08

 1. Requirements
- Return only bookings owned by the authenticated student.
- Order upcoming bookings by start time.
- Display the campus timezone and cancellation status.
- Link to Knowledge Base: 03 Booking API contract.

 2. Acceptance Criteria
- Provide an empty state when no bookings exist.
- Correctly display campus timezone (Europe/Oslo).
- Define the listing endpoint in the contract.

 3. UI Structure
- `MyBookings.tsx`: List view with empty state.
- `BookingRow.tsx`: Display single booking details and cancellation button.