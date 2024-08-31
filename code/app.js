const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours(); 

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('The site is only available during working hours.');
  }
}

app.use(checkWorkingHours);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
