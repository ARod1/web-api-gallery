//Get user input elems
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");

//Gallery and overlay elems
var gallery = document.getElementById("gallery");
var overlay = document.getElementById("overlay");
var overlayImg = document.getElementById("overlayImg");
var albumTitle = document.getElementById("albumTitle");
var albumLink = document.getElementById("openAlbum");

//Store album data and the id of the artist
var data, artistId;

//Get albums based on artist id
searchBtn.addEventListener("click",function() {
  
  
  var value = searchInput.value;
  var dataArtist;//only artist no albums yet
  
 
  var reqArtist = new XMLHttpRequest();

  //action for artist request
  reqArtist.onreadystatechange = function() {
    
    if (reqArtist.readyState === 4) {
      
      dataArtist = JSON.parse(reqArtist.responseText);
      artistId = dataArtist.artists.items[0].id; //Get the id from the data
      
   
      var reqId = new XMLHttpRequest();

      //action for albums based on id
      reqId.onreadystatechange = function() {
        
        if (reqId.readyState === 4) {
          
          data = JSON.parse(reqId.responseText); //global var holding album data
          var artistArr = data.items; //individual album array
         
          
          for (var i = 0; i < artistArr.length; i++) {
            console.log(artistArr[i].images[0].url);
            
            //Create div and img elements to hold data
            let div = document.createElement("div");
            let img = document.createElement("img");
            
            //Overlay info
            let title = artistArr[i].name;
            let link = artistArr[i].external_urls.spotify;
            
            img.src = artistArr[i].images[0].url ;
            div.appendChild(img);
            gallery.appendChild(div);
            
            
            //attach event to all divs to trigger overlay            
            div.addEventListener("click", function() {
              overlayImg.src = img.src;
              albumTitle.innerText = title;
              albumLink.href = link;
              overlay.style.display = "flex";
            });
            
            
            
          }//end for-loop
   
        }//end if statement for album data
        
      };//end reqId state change
      
      //getting albums based on artist id
      reqId.open('GET', "https://api.spotify.com/v1/artists/"+ artistId + "/albums");
      reqId.send();  
      
    
    }//end 1st if statement
    
  };//end of reqArtist state change
    
  
  //getting artist based on user input value
  reqArtist.open('GET', "https://api.spotify.com/v1/search?q="+ value +"&type=artist"); 
  reqArtist.send();
    
  
  }); //end of searchBtn event lister


//close overlay
  overlay.addEventListener("click", function() { 
    overlay.style.display = "none";
  });





