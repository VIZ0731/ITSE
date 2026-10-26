import express, { Request, Response } from 'express';
// WANG-16 Optimization: Extract hardcoded port to a constant for easier configuration
const DEFAULT_PORT = 3000; 
const app = express();
const PORT = process.env.PORT || DEFAULT_PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock PostgreSQL Connection Setup
console.log('Connecting to PostgreSQL database...');
// In a real implementation, this would use a pool from 'pg' library
const mockDb = {
    query: async (text: string, params: any[]) => {
        // Mock logic for checking overlapping bookings
        if (text.includes('CHECK_OVERLAP')) {
            // Simulate no conflict for this mock
            return { rows: [] }; 
        }
        return { rows: [] };
    }
};

// POST /api/bookings Endpoint
app.post('/api/bookings', async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomId, startsAt, endsAt } = req.body;

        // 1. Validation (Mock 400 Bad Request)
        if (!roomId || !startsAt || !endsAt) {
            res.status(400).json({
                code: 'invalid_interval',
                message: 'Missing required fields: roomId, startsAt, endsAt.',
                requestId: 'req-mock-001'
            });
            return;
        }

        if (new Date(endsAt) <= new Date(startsAt)) {
            res.status(400).json({
                code: 'invalid_interval',
                message: 'endsAt must be strictly later than startsAt.',
                requestId: 'req-mock-002'
            });
            return;
        }

        // 2. Database Constraint Check (Mock 409 Conflict)
        // In a real DB, the exclusion constraint would throw an error here
        await mockDb.query('CHECK_OVERLAP', [roomId, startsAt, endsAt]);
        
        const isConflict = false; // Change to true to test 409 error
        if (isConflict) {
            res.status(409).json({
                code: 'booking_conflict',
                message: 'This room is no longer available for the selected time.',
                requestId: 'req-mock-003'
            });
            return;
        }

        // 3. Success Response (201 Created)
        res.status(201).json({
            id: `booking-${Date.now()}`,
            roomId,
            startsAt,
            endsAt,
            status: 'active'
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server starting... Listening on http://localhost:${PORT}`);
});