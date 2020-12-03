let myQuestions = ['Would you rather have telepathy or telekinesis?',
  'Would you rather it be hot all the time or cold all the time?',
  'Would you rather control space or time?',
  'Would you rather not be able to stop dancing or not stop singing?',
  'Would you rather not be able to read or not be able to speak?',
  'Would you rather be able to command water or the wind?',
  'Would you rather be an amazing dancer or an amazing singer?',
  'Would you rather be an amazing dancer or be great at math?',
  'Would you rather live in a place where it is always hot or always cold?',
  'Would you rather be poor with lots of good friends or rich with no friends?',
  'Would you rather know everything or be amazing at any activity you tried?',
  'Would you rather wear clown shoes every day or a clown wig every day?',
  'Would you rather be able to run incredibly fast or jump incredibly high?',
  'Would you rather live a short life and be rich or have a long life and be poor?',
  'Would you rather only be able to jump everywhere you go or only be able to walk on your hands?',
  'Would you rather never be able to eat warm food or never be able to eat cold food?',
  'Would you rather have a two-bedroom apartment in a big city of your choosing or a mansion in the country side in the state or country where you currently live?',
  'Would you rather have a very muscular lower body and a normal upper body or a muscular upper body but a very skinny lower body?',
  'Would you rather have a song of your choice play repeatedly 24 hours a day for a year or have songs that you have no control over play 24 hours a day for a year?',
  'Would you rather be completely alone for 5 years or constantly be surrounded by people and never be alone for 5 years?',
  'Would you rather eat your favorite meal for every meal for the rest of your life or never be able to eat your favorite meal again?',
  'Would you rather the aliens that make first contact be robotic or organic?',
  'Would you rather lose the ability to read or lose the ability to speak?',
  'Would you rather be covered in fur or covered in scales?',
  'Would you rather be in jail for a year or lose a year off your life?',
  'Would you rather always be 10 minutes late or always be 20 minutes early?',
  'Would you rather have one real get out of jail free card or a key that opens any door?',
  'Would you rather know the history of every object you touched or be able to talk to animals?',
  'Would you rather be married to a 10 with a bad personality or a 6 with an amazing personality?',
  'Would you rather have all traffic lights you approach be green or never have to stand in line again?',
  'Would you rather spend the rest of your life with a sailboat as your home or an RV as your home?',
  'Would you rather give up all drinks except for water or give up eating anything that was cooked in an oven?',
  'Would you rather be able to see 10 minutes into your own future or 10 minutes into the future of anyone but yourself?',
  'Would you rather have an easy job working for someone else or work for yourself but work incredibly hard?',
  'Would you rather be the first person to explore a planet or be the inventor of a drug that cures a deadly disease?',
  'Would you rather go back to age 5 with everything you know now or know now everything your future self will learn?',
  'Would you rather be able to control animals (but not humans) with your mind or control electronics with your mind?',
  'Would you rather have unlimited international first-class tickets or never have to pay for food at restaurants?',
  'Would you rather see what was behind every closed door or be able to guess the combination of every safe on the first try?',
  'Would you rather be an average person in the present or a king of a large country 2500 years ago?',
  'Would you rather be forced to dance every time you heard music or be forced to sing along to any song you heard?',
  'Would you rather 5% of the population have telepathy, or 5% of the population have telekinesis? You are not part of the 5% that has telepathy or telekinesis.',
  'Would you rather be completely insane and know that you are insane or completely insane and believe you are sane?'];

function getRandomQuestion() {
  let question =  myQuestions[Math.floor(Math.random() * myQuestions.length)]
  return question;
}

function genQuestion(id){
  document.getElementById("Question").innerHTML = getRandomQuestion();
}

// Updates the statistics of the question with a given ID and option selected
function updateOption(id, option) {
    const fs = require("fs")
    const xmlParser = require("xml2json")
    const formatXml = require("xml-formatter")
    
    fs.readFile("./statistics.xml", function(err, data) {
    const xmlObj = xmlParser.toJson(data, {reversible: true, object: true})
    const questionsArray = xmlObj["questions"]["question"]
    
    for (let i = 0; i < questionsArray.length; i++) {
        if (questionsArray[i].id === id.toString()) {
            if (option === 1) {
                xmlObj["questions"]["question"][i].option1.$t = Number(xmlObj["questions"]["question"][i].option1.$t) + 1
            } else if (option === 2) {
                xmlObj["questions"]["question"][i].option2.$t = Number(xmlObj["questions"]["question"][i].option2.$t) + 1
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

//console.log(getRandomQuestion());
//console.log(document.getElementById("Question").innerHTML = getRandomQuestion());
//doesn't work
