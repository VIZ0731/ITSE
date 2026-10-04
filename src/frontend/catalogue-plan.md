 WANG-10: Campus Room Catalogue Implementation Plan
**Status**: Proposed Design
**Last Update**: 2026-10-04
 1. Requirements
- List active rooms with name and capacity.
- Allow students to open the booking form for a selected room.
- Link to Knowledge Base: 03 Booking API contract.
 2. Acceptance Criteria
- Show seeded active rooms.
- Show empty state and loading error.
- Check keyboard navigation for room selection.

3. Component Structure
- `RoomList.tsx`: Main container, handles fetch and loading states.
- `RoomCard.tsx`: Displays single room info and a "Book" button.