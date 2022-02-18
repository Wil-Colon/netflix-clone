const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());
//Define routes
app.use('/api/movies', require('./routes/api/movies'));

app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
