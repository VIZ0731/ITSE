import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// GET: Room Catalogue
app.get('/api/rooms', async (req, res) => {
  const rooms = await prisma.room.findMany({ where: { isActive: true } });
  res.json(rooms);
});

// POST: Create Booking
app.post('/api/bookings', async (req, res) => {
  const { roomId, startsAt, endsAt } = req.body;
  
  if (new Date(startsAt) >= new Date(endsAt)) {
    return res.status(400).json({ code: 'invalid_interval' });
  }

  try {
    const booking = await prisma.$transaction(async (tx) => {
      // Concurrency Check: Find any overlapping active booking
      const overlap = await tx.booking.findFirst({
        where: {
          roomId,
          status: 'active',
          OR: [
            { startsAt: { lt: new Date(endsAt) }, endsAt: { gt: new Date(startsAt) } }
          ]
        }
      });
      
      if (overlap) throw new Error('CONFLICT');

      return await tx.booking.create({
        data: { roomId, studentId: 'mock-student-id', startsAt: new Date(startsAt), endsAt: new Date(endsAt) }
      });
    });
    res.status(201).json(booking);
  } catch (error: any) {
    if (error.message === 'CONFLICT') {
      return res.status(409).json({ code: 'booking_conflict', message: 'Room is no longer available.' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));