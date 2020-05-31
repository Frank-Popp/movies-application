const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}
//-----add movies---------
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}

//-----------edit movies-----------------

const editOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
}

//------------delete movies---------------------
const delOptions = {
  method: 'DELETE',
}

module.exports = {
  getMovies: () => {
    return fetch('/api/movies', getOptions)
      .then(response => response.json());
      //   .then(response => console.log(response.json()))
  },
  addMovie: (newMovie) => {
    options.body = JSON.stringify(newMovie);
    return fetch('/api/movies', options)
        // let newMovie = {};
        .then(response => response.json())

  },

  editMovie: (title, rating, Id) => {
    editOptions.body = JSON.stringify({title, rating});
      return fetch('/api/movies/' + Id, editOptions)
          .then(response => response.json());
      //   .then(response => console.log(response.json()))
    },

  delMovie: (Id) => {
    return fetch('/api/movies/' + Id, delOptions)
        .then(response => response.json())
  }


};
