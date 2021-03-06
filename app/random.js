// Would You Rather? Website
// Team 21
// Fundamentals of Software Engineering

let m_questions = ['Would you rather Have telepathy or Have telekinesis',
  'Would you rather Be hot all the time or Be Cold all the time',
  'Would you rather Control space or Control time',
  'Would you rather Not be able to stop dancing or Not be able to stop singing',
  'Would you rather Not be able to read or Not be able to speak',
  'Would you rather Be able to command water or Be able to command the wind',
  'Would you rather Be an amazing dancer or Be an amazing singer',
  'Would you rather Be an amazing dancer or Be great at math',
  'Would you rather Live in a place where it is always hot or Live in a place that is always cold',
  'Would you rather Be poor with lots of good friends or Be rich with no friends',
  'Would you rather Know everything or Be amazing at any activity you tried',
  'Would you rather Wear clown shoes every day or Wear a clown wig every day',
  'Would you rather Be able to run incredibly fast or Jump incredibly high',
  'Would you rather Live a short life and be rich or Have a long life and be poor',
  'Would you rather Only be able to jump everywhere you go or Only be able to walk on your hands',
  'Would you rather Never be able to eat warm food or Never be able to eat cold food',
  'Would you rather Have a two-bedroom apartment in a big city of your choosing or Have a mansion in the country side in the state or country where you currently live',
  'Would you rather Have a very muscular lower body and a normal upper body or Have a muscular upper body but a very skinny lower body',
  'Would you rather Have a song of your choice play repeatedly 24 hours a day for a year or Have songs that you have no control over play 24 hours a day for a year',
  'Would you rather Be completely alone for 5 years or Constantly be surrounded by people and never be alone for 5 years',
  'Would you rather Eat your favorite meal for every meal for the rest of your life or Never be able to eat your favorite meal again',
  'Would you rather The aliens that make first contact be robotic or The aliens that make first contact be organic',
  'Would you rather Lose the ability to read or Lose the ability to speak',
  'Would you rather Be covered in fur or Be covered in scales',
  'Would you rather Be in jail for a year or Lose a year off your life',
  'Would you rather Always be 10 minutes late or Always be 20 minutes early',
  'Would you rather Have one real get out of jail free card or Have a key that opens any door',
  'Would you rather Know the history of every object you touched or Be able to talk to animals',
  'Would you rather Be married to a 10 with a bad personality or Be a 6 with an amazing personality',
  'Would you rather Have all traffic lights you approach be green or Never have to stand in line again',
  'Would you rather Spend the rest of your life with a sailboat as your home or Have an RV as your home',
  'Would you rather Give up all drinks except for water or Give up eating anything that was cooked in an oven',
  'Would you rather Be able to see 10 minutes into your own future or Be able to see 10 minutes into the future of anyone but yourself',
  'Would you rather Have an easy job working for someone else or Work for yourself but work incredibly hard',
  'Would you rather Be the first person to explore a planet or Be the inventor of a drug that cures a deadly disease',
  'Would you rather Go back to age 5 with everything you know now or Know now everything your future self will learn',
  'Would you rather Be able to control animals (but not humans) with your mind or Be able to control electronics with your mind',
  'Would you rather Have unlimited international first-class tickets or Never have to pay for food at restaurants',
  'Would you rather See what was behind every closed door or Be able to guess the combination of every safe on the first try',
  'Would you rather Be an average person in the present or Be a king of a large country 2500 years ago',
  'Would you rather Be forced to dance every time you heard music or Be forced to sing along to any song you heard',
  'Would you rather 5 percent of the population have telepathy, or 5 percent of the population have telekinesis',
  'Would you rather Be completely insane and know that you are insane or Be completely insane and believe you are sane'];

let m_displayedQuestionIndex = -1;
let m_statsAreCurrentlyDisplayed = false;

// Return a random question from the member array
function getRandomQuestion() {
  m_displayedQuestionIndex = Math.floor(Math.random() * m_questions.length);
  return m_questions[m_displayedQuestionIndex];
}

function genQuestion(id){
  // Split the would you rather question at the or
  // Don't forget to remove the "Would you rather " in the first part of the question
  // This is 17 chars
  let question = getRandomQuestion().split(" or ");
  document.getElementById("Option1").innerHTML = question[0].substring(17);
  document.getElementById("Option2").innerHTML = question[1];
}

// Updates the option buttons to display the percentage for a given stat
function displayOptionStats(option) {
  
  // Only update stats once
  if ( m_statsAreCurrentlyDisplayed
      || m_displayedQuestionIndex < 0
      || m_displayedQuestionIndex >= m_questions.length ) {
    location.reload();
    return;
  }
  m_statsAreCurrentlyDisplayed = true;

  let percents = getQuestionStatArray(m_displayedQuestionIndex, option);
  updateOption(m_displayedQuestionIndex+1, option);

  // Update percents with array
  let option1 = document.getElementById("Option1").innerHTML;
  let option2 = document.getElementById("Option2").innerHTML;
  document.getElementById("Option1").innerHTML = percents[0] + "%\ \ \ " + option1;
  document.getElementById("Option1").disabled = true;
  document.getElementById("Option2").innerHTML = percents[1] + "%\ \ \ " + option2;
  document.getElementById("Option2").disabled = true;

  if ( option === 1 ) {
    document.getElementById("Option1").style.background="c9c9c9";
    document.getElementById("Option1").style.border = "solid #FFFFFF";
  } else if ( option === 2 ) {
    document.getElementById("Option2").style.background="c9c9c9";
    document.getElementById("Option2").style.border = "solid #FFFFFF";
  }
}

// Returns an array with the percentage for each option in a question using the question index
// [Option 1 %, Option 2 %]
function getQuestionStatArray(questionIndex, option) {

  let index = questionIndex + 1;
  let option1;
  let option2;
  let percentOption1;
  let percentOption2;

  // Query database to retrieve question statistics
  // Store results in a local variable upon success
  $.ajax({
    async: false,
    url:"statistics.xml",    
    type: "GET",   
    success: function(xml){
      $xml = $( xml )
      question = $xml.find('question[id="' + index + '"] q').text();
      option1 = $xml.find('question[id="' + index + '"] option1').text();
      option2 = $xml.find('question[id="' + index + '"] option2').text();
    }
  });

  // Calculate the percentage using data collected from XML database
  // and update the relevant question
  if (Number(option) === 1) {
    percentOption1 = (Number(option1) + 1) / (Number(option1) + Number(option2) + 1) * 100;
    percentOption2 = Number(option2) / (Number(option1) + Number(option2) + 1) * 100;
  } else if (Number(option) === 2) {
    percentOption1 = Number(option1) / (Number(option1) + Number(option2) + 1) * 100;
    percentOption2 = (Number(option2) + 1) / (Number(option1) + Number(option2) + 1) * 100;
  }

  return [percentOption1.toFixed(2), percentOption2.toFixed(2)];
}


// Updates the statistics of the question with a given ID and option selected
function updateOption(id, option) {
  $.ajax({
    url:"/update",    
    type: "POST",   
    data: {id: id, option: option},
  });
}

  