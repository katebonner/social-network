const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// LOGS EXECUTED MONGO QUERIES 
mongoose.set('debug', true);

const conSuccess = mongoose.connection
conSuccess.once('open', () => {
  app.listen(PORT, () => console.log(`connected on localhost:${PORT}`));
})


