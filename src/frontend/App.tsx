import React, { useState, useEffect } from 'react';

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetch('/api/rooms').then(res => res.json()).then(data => setRooms(data));
  }, []);

  const handleBook = async (roomId: string) => {
    setIsPending(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, startsAt: '2026-11-10T10:00:00Z', endsAt: '2026-11-10T11:00:00Z' })
      });
      if (res.status === 409) {
        setError('This room is no longer available.');
      } else if (res.status === 201) {
        alert('Booking confirmed!');
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <h1>Campus Rooms</h1>
      {error && <div style={{ color: 'red', border: '1px solid red' }} role="alert">{error}</div>}
      <ul>
        {rooms.map((r: any) => (
          <li key={r.id}>
            {r.name} (Capacity: {r.capacity})
            <button disabled={isPending} onClick={() => handleBook(r.id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}