console.log('Connecting to PostgreSQL...');
app.post('/api/bookings', (req, res) => {
    console.log('Received booking request');
    res.status(201).json({ message: 'Booking created (mock)' });
});