$(document).ready(function() {

  var displayGames = function(){
    var keys = Object.keys(localStorage)
    var $games = $('.games');
    $games.html('')

    for(var i = 0; i < keys.length; i++){

      var $box = $('<div class="box"></div>');
      var $game = $('<div class="game"></div>');
      var $statLine = $('<div class="statLine"></div>');

      var gameObj = JSON.parse(localStorage[keys[i]]) ;
      var points = gameObj.points ;
      var rebounds = gameObj.rebounds ;
      var assists = gameObj.assists ;
      var steals = gameObj.steals ;
      var turnovers = gameObj.turnovers

      $game.text(keys[i])
      $game.prependTo($box);
      $statLine.text('Points: ' + points + ' | Rebounds: ' + rebounds + ' | Assists: ' + assists + ' | Steals: ' + steals + ' | Turnovers: ' + turnovers);
      $statLine.appendTo($box);
      $box.appendTo($games);
    }
  }
  displayGames()
  //end of refresh page button

  var averages = function(){
    var $averageBox = $('.averageBox');
    var $game = $('<div class="game"></div>');
    var $statLine = $('<div class="statLine"></div>');

    var keys = Object.keys(localStorage);
    var $container = $('.container');

    var pointTotal = 0;
    var reboundTotal = 0;
    var assistTotal = 0;
    var stealTotal = 0;
    var turnoverTotal = 0;

    $averageBox.html('')

    for(var i = 0; i < keys.length; i++){
      var gameObj = JSON.parse(localStorage[keys[i]]);

      pointTotal += Number(gameObj.points) ;
      reboundTotal += Number(gameObj.rebounds) ;
      assistTotal += Number(gameObj.assists) ;
      stealTotal += Number(gameObj.steals) ;
      turnoverTotal += Number(gameObj.turnovers) ;
    }

    var ppg = pointTotal/keys.length ;
    var rpg = reboundTotal/keys.length ;
    var apg = assistTotal/keys.length ;
    var spg = stealTotal/keys.length ;
    var topg = turnoverTotal/keys.length ;

    $game.text("Game Averages")
    $game.prependTo($averageBox);
    $statLine.text('PPG: ' + ppg.toFixed(2) + ' | RPG: ' + rpg.toFixed(2) + ' | APG: ' + apg.toFixed(2) + ' | SPG: ' + spg.toFixed(2) + ' | TOPG: ' + topg.toFixed(2));
    $statLine.appendTo($averageBox);
  }
  averages()

  //end of points average placeholder


  $(".add-text-btn").on("click", function(){

    var gameObj = {}

    let opponent = $(".user-input-opponent").val();
    let points = $(".user-input-points").val();
    let rebounds = $(".user-input-rebounds").val();
    let assists = $(".user-input-assists").val();
    let steals = $(".user-input-steals").val();
    let turnovers = $(".user-input-turnovers").val();

    if(opponent === ''){
      alert("ADD OPPONENT NAME")
    } else {
      $(".user-input-opponent").val("");
      $(".user-input-points").val("");
      $(".user-input-rebounds").val("");
      $(".user-input-assists").val("");
      $(".user-input-steals").val("");
      $(".user-input-turnovers").val("");

      gameObj['points'] = points
      gameObj['rebounds'] = rebounds
      gameObj['assists'] = assists
      gameObj['steals'] = steals
      gameObj['turnovers'] = turnovers

      localStorage.setItem(opponent, JSON.stringify(gameObj));

      var $games = $('.games');
      $games.html('')

      displayGames()
      averages()
    }
  });
  //end of click 'add text button'

  $(".games").on("click", ".game", function(e){
    console.log(e)
    var gameObj = JSON.parse(localStorage.getItem(e.target.innerText))

    $(".user-input-opponent").val(e.target.innerText);
    $(".user-input-points").val(gameObj.points);
    $(".user-input-rebounds").val(gameObj.rebounds);
    $(".user-input-assists").val(gameObj.assists);
    $(".user-input-steals").val(gameObj.steals);
    $(".user-input-turnovers").val(gameObj.turnovers);

  });

  $(".del-text-btn").on("click", function() {
    alert('Game Deleted');
    localStorage.removeItem( $('.user-input-opponent').val() );

    $(".user-input-opponent").val("");
    $(".user-input-points").val("");
    $(".user-input-rebounds").val("");
    $(".user-input-assists").val("");
    $(".user-input-steals").val("");
    $(".user-input-turnovers").val("");

    displayGames()
    averages()
  });

});

//this is a test