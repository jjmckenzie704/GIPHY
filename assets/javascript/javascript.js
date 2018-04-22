
$(document).ready(function() {
        var animals = ["dog", "cat", "alligator", "rabbit", "squirrel", "monkey", "lion", "zebra", "eagle", "wolf", "shark", "tiger", "dolphin", "penguin", "giraffe"];

        

      function renderButtons() {
          $("#buttons-view").empty();

          for (var i = 0; i < animals.length; i++){
            var a = $("<button>");
            a.addClass("animal");
            a.attr("animal-name", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
          }
        }

      renderButtons();

      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        animals.push(newAnimal);
        renderButtons();
      });
    
      
              
        $('#buttons-view').on('click', 'button', function(){
          $("#animals-view").empty();
          var x = $(this).attr("animal-name");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=aDADOsgnANp1LHGUBJz2WCUTmPIEIlZk&limit=10";
          

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) { 
            console.log(x);
            for (var i=0;i<response.data.length;i++){
              var animalsDiv = $('<div>');
              var p =$('<p>Rating: ' + response.data[i].rating + '</p>');
              var animalsImage = $('<img>');
              animalsImage.attr('src', response.data[i].images.fixed_height_still.url);
              animalsImage.attr('class', 'gif');
              animalsImage.attr('data-state', 'still');
              animalsImage.attr('data-animate', response.data[i].images.fixed_height.url);
              animalsImage.attr('data-still', response.data[i].images.fixed_height_still.url);
              animalsDiv.prepend(animalsImage);
              animalsDiv.prepend(p);
              $('#animals-view').prepend(animalsDiv);

            }             
          });
        });
        
        //Pausing of gifs//
        $("body").on("click", ".gif", function() {     
          var state = $(this).attr("data-state");      
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      
        
    });        
        
  
        