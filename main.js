// Defines a node.js web server
const http = require("http");
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const host = 'localhost';
const port = 8080;

const express= require('express');
const app = express();
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main.html');
})

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/update', function (req, res) {
  updateOption(Number(req.body["id"]), Number(req.body["option"]));
})

app.listen(port, () => console.log('The server running on Port '+port));

function updateOption(id, option) {
  const fs = require("fs")
  const xmlParser = require("xml2json")
  const formatXml = require("xml-formatter")

  fs.readFile("./statistics.xml", function(err, data) {
    const xmlObj = xmlParser.toJson(data, {reversible: true, object: true})
    const questionsArray = xmlObj["questions"]["question"]
    for (let i = 0; i < questionsArray.length; i++) {
      if (questionsArray[i].id === id.toString()) {
        console.log(questionsArray[i].id);
        console.log(option);
        if (option === 1) {
          xmlObj["questions"]["question"][i].option1.$t = Number(xmlObj["questions"]["question"][i].option1.$t) + 1
          let percent1 = Number(xmlObj["questions"]["question"][i].option1.$t)/(Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
          let percent2 = Number(xmlObj["questions"]["question"][i].option2.$t)/(Number(xmlObj["questions"]["question"][i].option1.$t) + Number(xmlObj["questions"]["question"][i].option2.$t)) * 100
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

    const stringifiedXmlObj = JSON.stringify(xmlObj)
    const finalXml = xmlParser.toXml(stringifiedXmlObj)

    fs.writeFile("./statistics.xml", formatXml(finalXml, {collapseContent: true}), function(err, result) {
      if (err) {
        console.log("error")
      } else {
      }
    })
  })
}