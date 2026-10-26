import React from 'react';

// Utility function to format capacity text
const formatCapacity = (cap: number) => `${cap} people max`;

interface RoomCardProps {
  id: string;
  name: string;
  capacity: number;
  onSelect: (id: string) => void;
}

export default function RoomCard({ id, name, capacity, onSelect }: RoomCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px 0' }}>
      <h3>{name}</h3>
      <p>Capacity: {formatCapacity(capacity)}</p>
      <button onClick={() => onSelect(id)}>Book this room</button>
    </div>
  );
}