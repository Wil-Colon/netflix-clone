const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

//Define routes
app.use('/api/movies', require('./routes/api/movies'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
