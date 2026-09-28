&#x20;DEMO-6: Room Booking Form Implementation Plan

Status: Proposed Design

Responsible Person: Wang Yajie

Last Update: 2026-09-26

&#x20;1. UI Components

Based on the API contract and user stories, the form will include:

\- Room Selector: Dropdown showing active rooms (with capacity).

\- Time Interval: Start and end datetime pickers (displayed in campus timezone Europe/Oslo).

\- Submit Button: Disabled while the request is pending.

&#x20;2. Interaction Flow

1\. User selects a room and time interval.

2\. Client validates `endsAt > startsAt` and the start time is in the future.

3\. Form submits JSON payload to `POST /api/bookings`.

4\. Success (201): Show a clear confirmation message with booking details.

5\. Conflict (409): Preserve user input, highlight the time interval, and show a message: "This room is no longer available for the selected time."

&#x20;3. API Integration Strategy

\- Develop the form using a contract-compatible Mock API until DEMO-5 is fully available.

\- Use the exact JSON schema defined in `docs/api-contract.md`.

\- Implement accessible labels and keyboard navigation for all inputs.

Out of scope: Real browser testing and deployment.

