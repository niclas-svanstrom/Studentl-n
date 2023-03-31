  var questions = [
    "Lön per månad:",
    "Antal studieår:",
    "Studentbidrag per månad:",
    "Studentlån per månad:",
    "Potentiell lön per månad efter studie:"
  ];
  
  var lon, studiear, studiebidrag, studielan, potentiell_lon; // variabler för svaren på frågorna
  var arligranta = 0

  var currentIndex = 0; // index för aktuell fråga
  
  function askQuestion() {
    var currentQuestion = questions[currentIndex];
    if (currentQuestion) {
      document.getElementById("question").innerHTML = currentQuestion;
      document.getElementById("answer").style.display = "block";
      document.getElementById("submit").style.display = "block";
      document.getElementById("result").style.display = "none";
      document.getElementById("question").style.display = "block";
    } else {
    var totaltStudielan = studielan * studiear * 12;
    var totaltMissadLon = lon * studiear * 12;
    var totalBidrag = studiebidrag * studiear * 12


    var manadermissade = checkmonths(totaltMissadLon, totalBidrag, potentiell_lon)
    var månaderstudentlån = calculateYearsToPayOff(totaltStudielan, arligranta, potentiell_lon)
    
    var resultat = ""

    // Skriv ut resultatet
    if (totaltMissadLon-totalBidrag > 0){
        resultat += "<br>" + `Total missad lön under studietid minus studiebidraget: ${totaltMissadLon-totalBidrag}:-`;
        if (lon > potentiell_lon) {
            resultat += "<br>" + `Din potentiella lön är mindre än din nuvarande, men pengar är inte allt.`;
        }
    }
    else {
        resultat += "<br>" + `Du får mer bidrag än vad du hade i lön tidigare`;
    }
    if (totaltStudielan > 0) {
        resultat += "<br>" + `Total studieskuld: ${totaltStudielan}:-`;
        resultat += "<br>" + `Det tar ${convertMånaderToÅrMånader(månaderstudentlån)} att betala av skulden.`;
    } else {
        resultat += "<br>" + `Grattis du kommer inte ha någon studieskuld!`;
    }
    document.getElementById("result").innerHTML = resultat;
    document.getElementById("answer").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("question").style.display = "none";
  }
  }

  
  function answerQuestion() {
    var answer = document.getElementById("answer").value;
    if (lon === undefined) {
      lon = answer;
    } else if (studiear === undefined) {
      studiear = answer;
    } else if (studiebidrag === undefined) {
      studiebidrag = answer;
    } else if (studielan === undefined) {
      studielan = answer;
    } else if (potentiell_lon === undefined) {
      potentiell_lon = answer;
    }
    currentIndex++; // öka index för aktuell fråga
    askQuestion();
    document.getElementById("answer").value = "";
  }

  function resetQuestions() {
    q1 = undefined;
    q2 = undefined;
    q3 = undefined;
    q4 = undefined;
    q5 = undefined;
    currentIndex = 0;
    askQuestion();
    document.getElementById("result").innerHTML = "";
  }

  function backToFirstQuestion() {
    q1 = undefined;
    q2 = undefined;
    q3 = undefined;
    q4 = undefined;
    q5 = undefined;
    currentIndex = 0;
    askQuestion();
    document.getElementById("result").innerHTML = "";
  }

  function convertMånaderToÅrMånader(månader) {
    const år = Math.floor(månader / 12);
    const månaderKvar = månader % 12;
    let resultat = '';
    
    if (år > 0) {
      resultat += `${år} år`;
      if (månaderKvar > 0) {
        resultat += ' och ';
      }
    }
    
    if (månaderKvar > 0) {
      resultat += `${månaderKvar} månader`;
    }
    
    return resultat;
  }
  
  
  function calculateYearsToPayOff(summa, årligRänta, lönPerMånad) {
    let återståendeSumma = summa;
    let månader = 0;
    
    while (återståendeSumma > 0) {
      var räntaPerMånad = årligRänta / 12;
      var ränta = återståendeSumma * räntaPerMånad;
      återståendeSumma -= lönPerMånad;
      månader++;
      återståendeSumma += ränta
    }
    
    return månader;
  }
  
  function checkmonths(lön, bidrag, potlön){
    let manader = Math.ceil((lön-bidrag) / potlön)
    if (manader > 0){
        return manader; 
    } else {
        return 0;
    }
  }
  
  askQuestion();

  function runFunctionOnEnter(event) {
    if (event.keyCode === 13 || event.which === 13) {
      // Skriv din JavaScript-funktion här
      answerQuestion();
    }
  }