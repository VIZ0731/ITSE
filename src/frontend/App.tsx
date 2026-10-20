import React, { useState } from 'react';
export default function BookingForm() {
  const [roomId, setRoomId] = useState('room-a101');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');

  return (
    <div className="booking-form-container">
      <h2>Book a Campus Room</h2>
      <form>
        <div>
          <label>Room ID:</label>
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="room-a101">Room A101 (Capacity 10)</option>
            <option value="room-b202">Room B202 (Capacity 20)</option>
          </select>
        </div>
        
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        </div>

        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}