const $ = require('jquery');

const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
const {editMovie} = require('./api.js');
const {delMovie} = require('./api.js');


function renderMovies(movies){
      let loader = `<div id="loadingDiv"></div>`;
     $('#movieList').html(loader);

  var html = "";
  movies.forEach(({title, rating, id}) => {
    // $('#movieList').empty(); //#1
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    html += `<div class="d-flex">
                <div class="justify-content-start"> 
                    <h3 class="title" data-id="${id}" data-title=${title} data-rating=${rating}> ${title} </h3>
                </div>
                <div class="justify-content-end"> 
                    <p>  - rating: ${rating} </p>
                </div>
            </div>`;
        $('#movieList').html(html);
    // $('#movieList').append(html); #1

  })
}

getMovies().then((movies) => renderMovies(movies)).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

$('#submitAddMovie').click(() => {
    // load();

    // console.log('test')
    let title = $('#userAddMovie').val();
    let rating = $('#userRatingInput').val();
    // console.log(title, rating);
    // let createMovie = (userAddMovie, userRatingInput) => {
    //    if ($('#userAddMovie').val() === undefined) {
    //         alert('please enter a move title');
    //         // $('.msg').html("please a movie title.")
    //         //
    //         // setTimeout(function () {
    //         //     $('.msg').remove();
    //         // }, 3000);
    //     } else {
    //         return newMovie;
    //     }

        addMovie({title, rating})
            .then(getMovies)
            .then((movies) => renderMovies(movies))
    $('#addMovieForm').trigger("reset");
        // removeLoader();
})


//Global Id variable to pass our targetId from one code to the next
var Id;

//Target Id and values to be edited...
$('#movieList').on('click', 'h3', function(e) {
    e.stopImmediatePropagation();
    // console.log($(e.target));
    let editTitle = $(e.target).data('title');
    let editRating = $(e.target).data('rating');
    let targetId = $(e.target).data('id');
    console.log($(e.target).data('id'));

    //Populate Edit Form
  $('#userEditMovie').val(editTitle);
  $('#userEditRating').val(editRating);

  //Establishing our Specific Id
  Id = targetId;
})


//Submit Edited Movie
$('#editMovie').on('click', () => {
    // load();
    let title = $('#userEditMovie').val();
    let rating = $('#userEditRating').val();
  editMovie(title, rating, Id)
        .then(getMovies)
        .then((movies) => renderMovies(movies));
    $('#editMovieForm').trigger("reset");
    removeLoader();
})

$('#deleteMovie').on('click', () =>{
    delMovie(Id)
        .then(getMovies)
        .then((movies) => renderMovies(movies));
    $('#editMovieForm').trigger("reset");
})

//Loading Message
// function load() {
//     $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
//     $(window).on('load', function () {
//         setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
//     });
// }
//     function removeLoader() {
//         $("#loadingDiv").fadeOut(500, function () {
//             // fadeOut complete. Remove the loading div
//             $("#loadingDiv").remove(); //makes page more lightweight
//         });
//     }
//
// load();
// removeLoader();




// function input(editTitle, editRating){
//     // $('#userEditMovie').val()
// }





