import React, { useState, useEffect } from 'react';
import BookingRow from './BookingRow';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    // Mock API fetch and sort
    setTimeout(() => {
      const mockData = [
        { id: 'b-2', roomId: 'Room B202', startsAt: '2026-11-02T14:00:00Z', status: 'active' },
        { id: 'b-1', roomId: 'Room A101', startsAt: '2026-11-01T10:00:00Z', status: 'active' },
      ];
      // Sort by startsAt
      const sorted = mockData.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
      setBookings(sorted);
    }, 500);
  }, []);

  if (bookings.length === 0) return <p>You have no bookings.</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <BookingRow key={b.id} {...b} />
      ))}
    </div>
  );
}