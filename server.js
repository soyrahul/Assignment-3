
/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: ___Rahul Subedi_____ Student ID: ____151355229____ Date: ___15-10-2024___
*
* Published URL: _________________________________________________________
*
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


legoData.initialize()
  .then(() => {

   
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'home.html'));
    });

    
    app.get('/views/about', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'about.html'));
    });

   
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme ? req.query.theme.toLowerCase() : null; 

  legoData.getAllSets()
      .then(sets => {
          if (theme) {
              const filteredSets = sets.filter(set =>
                  set.theme && set.theme.toLowerCase() === theme 
              );
              if (filteredSets.length > 0) {
                  res.json(filteredSets); 
              } else {
                  res.status(404).send(`No sets found for theme: ${theme}`); 
              }
          } else {
              res.json(sets);
          }
      })
      .catch(err => res.status(500).send(err)); 
});

    
    app.get('/lego/sets/:set_num', (req, res) => {
      const setNum = req.params.set_num;

      legoData.getAllSets()
        .then(sets => {
          const set = sets.find(s => s.set_num === setNum);
          if (set) {w
            res.json(set);
          } else {
            res.status(404).send(`No set found with set number: ${setNum}`);
          }
        })
        .catch(err => res.status(404).send(err));
    });
   
    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });

   
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.error('Failed to initialize LEGO sets data:', err);
  });
