import React from 'react';

interface BookingRowProps {
  id: string;
  roomId: string;
  startsAt: string;
  status: string;
}

export default function BookingRow({ roomId, startsAt, status }: BookingRowProps) {
  // Convert UTC to Europe/Oslo
  const osloTime = new Date(startsAt).toLocaleString('en-GB', { timeZone: 'Europe/Oslo' });

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
      <strong>{roomId}</strong> - {osloTime} - Status: <span style={{ color: status === 'active' ? 'green' : 'red' }}>{status}</span>
    </div>
  );
}