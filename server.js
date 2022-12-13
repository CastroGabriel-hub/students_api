const express = require('express');
const app = express();
const port = 5000;
const studentRoutes = require('./src/student/routes');

app.use(express.json());
app.use('/students', studentRoutes);

app.listen(port, () => console.log(`App running on port ${port}`));