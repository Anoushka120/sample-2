const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");

const personalitiesRouter = require('./routes/personalities');
const resourcesRouter = require('./routes/resources');
const userRoutes = require("./routes/Registerroute");
const login = require("./routes/Loginroute");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/personalities', personalitiesRouter);
app.use('/api/resources', resourcesRouter);
app.use("/users", userRoutes);
app.use("/", login);


// small helper route
app.get('/', (req, res) => res.send({ ok: true }));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
