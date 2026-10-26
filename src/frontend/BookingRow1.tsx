import React from 'react';

interface BookingRowProps {
  id: string;
  roomId: string;
  startsAt: string;
  status: string;
  onCancel: (id: string) => void; 
}

export default function BookingRow({ id, roomId, startsAt, status, onCancel }: BookingRowProps) {
  const osloTime = new Date(startsAt).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' });

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <strong>{roomId}</strong> - {osloTime} - Status: <span style={{ color: status === 'active' ? 'green' : 'red' }}>{status}</span>
      </div>
      {status === 'active' && (
        <button onClick={() => onCancel(id)} style={{ color: 'red' }} title="Cancel this booking and free up the time slot" >Cancel</button>
      )}
    </div>
  );
}