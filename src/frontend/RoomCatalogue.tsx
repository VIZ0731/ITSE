import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';

export default function RoomCatalogue() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API fetch
    setTimeout(() => {
      setRooms([
        { id: 'room-a101', name: 'Room A101', capacity: 10 },
        { id: 'room-b202', name: 'Room B202', capacity: 20 },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSelectRoom = (id: string) => {
    alert(`Selected room ${id}. Opening booking form...`);
  };

  if (isLoading) return <p>Loading rooms...</p>;
  if (rooms.length === 0) return <p>No rooms available.</p>;

  return (
    <div>
      <h2>Campus Room Catalogue</h2>
      {rooms.map((room) => (
        <RoomCard key={room.id} {...room} onSelect={handleSelectRoom} />
      ))}
    </div>
  );
}