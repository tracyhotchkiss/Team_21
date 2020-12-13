// Would You Rather? Website
// Team 21
// Fundamentals of Software Engineering

// Defines a node.js web server
const http = require("http");
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const host = 'localhost';
const port = 8080;
const express= require('express');
const app = express();

// Configure resources and run the web server
// to host the node application
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main.html');
})
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/update', function (req, res) {
  updateOption(Number(req.body["id"]), Number(req.body["option"]));
})
app.listen(port, () => console.log('The server running on Port '+port));

// Update the file in the database when a button is pressed
// Use the id (index in this case) and either option 1 or 2
function updateOption(id, option) {

  // Config resources
  const fs = require("fs")
  const xmlParser = require("xml2json")
  const formatXml = require("xml-formatter")

  // Read the XML file and update the relevant variables
  fs.readFile("./statistics.xml", function(err, data) {
    const xmlObj = xmlParser.toJson(data, {reversible: true, object: true})
    const questionsArray = xmlObj["questions"]["question"]
    for (let i = 0; i < questionsArray.length; i++) {
      if (questionsArray[i].id === id.toString()) {
        console.log(questionsArray[i].id);
        console.log(option);

        // Update both the percentages and the number of clicks for the passed question
        if (option === 1) {
          xmlObj["questions"]["question"][i].option1.$t = Number(xmlObj["questions"]["question"][i].option1.$t) + 1
          let percent1 = Number(xmlObj["questions"]["question"][i].option1.$t) / (Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
          let percent2 = Number(xmlObj["questions"]["question"][i].option2.$t) / (Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
          xmlObj["questions"]["question"][i].option1percent.$t = percent1.toFixed(1) + "%"
          xmlObj["questions"]["question"][i].option2percent.$t = percent2.toFixed(1) + "%"
        } else if (option === 2) {
          xmlObj["questions"]["question"][i].option2.$t = Number(xmlObj["questions"]["question"][i].option2.$t) + 1
          let percent1 = Number(xmlObj["questions"]["question"][i].option1.$t)/(Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
          let percent2 = Number(xmlObj["questions"]["question"][i].option2.$t)/(Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
          xmlObj["questions"]["question"][i].option1percent.$t = percent1.toFixed(1) + "%"
          xmlObj["questions"]["question"][i].option2percent.$t = percent2.toFixed(1) + "%"
        }
      }
    }

    // Prepare xml object
    const stringifiedXmlObj = JSON.stringify(xmlObj)
    const finalXml = xmlParser.toXml(stringifiedXmlObj)

    // Write the changes to file
    fs.writeFile("./statistics.xml", formatXml(finalXml, {collapseContent: true}), function(err, result) {
      if (err) {
        console.log("error")
      } else {
      }
    })
  })
}