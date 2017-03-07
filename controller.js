angular.module("Quizable")
  .controller("TriviaController", triviaCtrl)

triviaCtrl.$inject = ["TriviaCenter"];

  function triviaCtrl (TriviaCenter) {
    var main = this;
    main.game = {
      players : [],
    }

    main.start = function() {
      var num = prompt("How many people will play this time? (1-5)");
      var numPlayers = Number(num);
      for (var i = 0; i < numPlayers; i++) {

        var name = prompt("What is player " + [i + 1] + "'s name?")

        function Name(person) {
          this.name = person;
          this.points = 0;
        }

          var player = new Name(name);
          main.game.players.push(player);
      }
      main.game.turn = main.game.players[0];
    }


    main.flip = function (event) {
      // console.log(event);
      event.target.classList.add("animated", "flip");
      // event.target.className -= " animated flip");
    }

    main.flipEnable = function (event){
      // console.log(event);
      event.target.classList.remove("animated", "flip");
    }

    TriviaCenter.getMath()
   .then(function(responseFromServer){
    //  console.log("Response!", responseFromServer);


    main.mathquestion = responseFromServer.data.results;
      for (var i = 0; i < responseFromServer.data.results.length; i++){

      // console.log(responseFromServer.data.results[i].correct_answer);

      var incor = responseFromServer.data.results[i].incorrect_answers;
      var cor = responseFromServer.data.results[i].correct_answer;

      // console.log (incor + cor)

      var choices = _.shuffle(incor);
      choices.splice(Math.floor(Math.random() * 4),0,cor)

      responseFromServer.data.results[i].newChoices = choices

      var newChoices = responseFromServer.data.results[i].choices
      // console.log(newChoices);


    }
    })


    TriviaCenter.getScience()
   .then(function(responseFromServer){
    //  console.log("Response!", responseFromServer);

    main.sciencequestion = responseFromServer.data.results;
      for (var i = 0; i < responseFromServer.data.results.length; i++){

      // console.log(responseFromServer.data.results[i].correct_answer);

      var incor = responseFromServer.data.results[i].incorrect_answers;
      var cor = responseFromServer.data.results[i].correct_answer;

      // console.log (incor + cor)

      var choices = _.shuffle(incor);
      choices.splice(Math.floor(Math.random() * 4),0,cor)

      responseFromServer.data.results[i].newChoices = choices
    }
  })

    TriviaCenter.getHistory()
   .then(function(responseFromServer){
    //  console.log("Response!", responseFromServer);

    main.historyquestion = responseFromServer.data.results;
      for (var i = 0; i < responseFromServer.data.results.length; i++){

      // console.log(responseFromServer.data.results[i].correct_answer);

      var incor = responseFromServer.data.results[i].incorrect_answers;
      var cor = responseFromServer.data.results[i].correct_answer;

      // console.log (incor + cor)

      var choices = _.shuffle(incor);
      choices.splice(Math.floor(Math.random() * 4),0,cor)

      responseFromServer.data.results[i].newChoices = choices

    }
    })

    main.setQuestion = function(questions) {
      main.chosenQuestion = questions;
      $('#myModal').modal('show')

    }

    main.answer = function(answers, questions, player){
      // console.log(answers, questions);
      if (answers == questions.correct_answer){
        alert("BOOOOM, " + player.name + " gets " + questions.score);
        player.points += questions.score;
        //$('#correctAnswer').modal('show')
      } else {
        alert("You are not going to Harvard!" + player.name + " loses " + questions.score)
        player.points -= questions.score;
      }

    }

}
