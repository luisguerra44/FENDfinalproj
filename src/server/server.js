const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Endpoint for all routes
let projectData = {};

//test for jest
const newObj = () => {
  let newObj = {};
  return newObj;
};

module.exports = {newObj}; 


// BodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));

//Get route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Post Route
app.post('/add', addInfo);

function addInfo(req, response) {
  projectData['depCity'] = req.body.depCity;
  projectData['arrCity'] = req.body.arrCity;
  projectData['depDate'] = req.body.depDate;
  projectData['weather'] = req.body.weather;
  projectData['summary'] = req.body.summary;
  projectData['daysLeft'] = req.body.daysLeft;
  response.send(projectData);
}

// Setup Server

const port = 8800;
const server = app.listen(port, listening);
function listening() {
  console.log(`Server running on localhost: ${port}`);
}
