require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stationeriesRoutes = require('./routes/stationeries');
const paperRoutes = require('./routes/papers');
const coresRoutes = require('./routes/cores');
const inksRoutes = require('./routes/inks');
const labelsRoutes = require('./routes/labels');
const boxsRoutes = require('./routes/boxs');
const cardboardsRoutes = require('./routes/cardboards');
const cuttingsRoutes = require('./routes/cuttings');
const dispatchRollsRoutes = require('./routes/dispatchRolles');
const dispatchZsRoutes = require('./routes/dispatchZs');
const packingsRoutes = require('./routes/packings');
const plainRollCutsRoutes = require('./routes/plainRollCuts');
const printingsRoutes = require('./routes/printings');
const salariesRoutes = require('./routes/salaries');
const zFoldsRoutes = require('./routes/zFolds');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Routes
app.use('/api/stationeries', stationeriesRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/cores', coresRoutes);
app.use('/api/inks', inksRoutes);
app.use('/api/labels', labelsRoutes);
app.use('/api/boxs', boxsRoutes);
app.use('/api/cardboards', cardboardsRoutes);
app.use('/api/cuttings', cuttingsRoutes);
app.use('/api/dispatchRolls', dispatchRollsRoutes);
app.use('/api/dispatchZs', dispatchZsRoutes);
app.use('/api/packings', packingsRoutes);
app.use('/api/plainRollCuts', plainRollCutsRoutes);
app.use('/api/printings', printingsRoutes);
app.use('/api/salaries', salariesRoutes);
app.use('/api/zFolds', zFoldsRoutes);


app.get('/', (req, res) => {
    res.send('Employee Form Submission API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// alpha_dex
// 017c61e97dcd0d0ab4e8cf62af4b8484