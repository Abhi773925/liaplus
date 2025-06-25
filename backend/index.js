const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017/liaplus';
const userroute=require('./routes/userroute');
const blogroute=require("./routes/blogroute");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB database: liaplus');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.get('/', (req, res) => {
  res.send('Server is up and running with liaplus DB connected 🎉');
});

app.use('/api/users',userroute);
app.use("/api/users",blogroute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
