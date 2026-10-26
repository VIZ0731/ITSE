import React, { useState } from 'react';
interface BookingFormData {
  roomId: string;
  startsAt: string;
  endsAt: string;
}
const mockSubmitBooking = async (payload: any) => {
  console.log('Sending POST /api/bookings', payload);
  return new Promise((resolve) => setTimeout(() => resolve({ status: 201 }), 1000));
};

export default function BookingForm() {
  const [roomId, setRoomId] = useState('room-a101');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [isPending, setIsPending] = useState(false); // 新增

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    await mockSubmitBooking({ roomId, startsAt, endsAt });
    alert('Booking Confirmed!');
    setIsPending(false);
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Campus Room</h2>
      <form onSubmit={handleSubmit}>
        {}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}