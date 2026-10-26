import React, { useState, useEffect } from 'react';
import BookingRow from './BookingRow';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        { id: 'b-2', roomId: 'Room B202', startsAt: '2026-11-02T14:00:00Z', status: 'active' },
        { id: 'b-1', roomId: 'Room A101', startsAt: '2026-11-01T10:00:00Z', status: 'active' },
      ];
      setBookings(mockData.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()));
    }, 500);
  }, []);

  const handleCancel = (id: string) => {
    // Safety check: ensure the booking ID is valid before proceeding
    if (!id) return; 
    const isConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (isConfirmed) {
      // Mock API call to PATCH /api/bookings/{id}/cancel
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }
  };

  if (bookings.length === 0) return <p>You have no bookings.</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <BookingRow key={b.id} {...b} onCancel={handleCancel} />
      ))}
    </div>
  );
}