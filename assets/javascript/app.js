
  var topics = ["rx7", "tiny homes", "crypto", "pitbulls"];
    console.log("initial array: " + topics)

  function displayGif(){
    $('#gifDiv').empty();     
    var newGif = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;
           for(var i=0; i < results.length; i++){
                console.log(response)
              var rating = results[i].rating;
              var p = $('<p>').text( "Rating: " + rating);
              var gifImage = $('<img>');
              gifImage.attr('src', results[i].images.fixed_height_still.url);
              gifImage.attr('data-still', results[i].images.fixed_height_still.url);
              gifImage.attr('data-animate', results[i].images.fixed_height.url);
              gifImage.attr('data-state', 'still');
              gifImage.addClass('gifImage');
               
              $('#gifDiv').append(p);
              $('#gifDiv').append(gifImage);
           }

      $('.gifImage').on('click', function(){
          var state = $(this).attr('data-state'); 
            console.log(state);
          if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
          }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
          }
      });
      });   
  }

  function renderButtons(){ 
    $('#buttonsView').empty();
    for (var i = 0; i < topics.length; i++){
      var gifBttn = $('<button>')
        gifBttn.addClass('gifButton');
        gifBttn.addClass("btn btn-success");
        gifBttn.addClass("btn btn-primary btn-lg");
        gifBttn.attr('data-name', topics[i]);
        gifBttn.text(topics[i]);
        $('#buttonsView').append(gifBttn);
    }
  }

  $('#addGifs').on('click', function(){
    var newGif = $('#gifInput').val().trim();
    topics.push(newGif);
    renderButtons();
    return false;
  })

  $(document).on('click', '.gifButton', displayGif);
  renderButtons();
