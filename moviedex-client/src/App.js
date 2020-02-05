import React from 'react';
import './App.css';
import Pelicula from './Pelicula.js'

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
        peliculas: []
    }
  }

  componentDidMount(){
      let settings = {
          method: "GET"
      };
      fetch('/api/moviedex', settings)
          .then(response => {
              if(response.ok)
                return response.json()
          })
          .then(responseJSON => {
              console.log(responseJSON);
          });
  }

    agregarPelicula(title, year, rate) {
      let data = {
            film_title: title,
            year: year,
            rating: rate
        };
      let settings = {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(data)
      };
      fetch('/api/moviedex', settings)
          .then(response => {
              if(response.ok)
                return response.json()
          })
          .then(responseJSON => {
              console.log(responseJSON);
          });
    }

  render(){
    return (
      <div>
            <div>
                   {state.peliculas.map((pelicula, index) =>
                        <Pelicula film_ID={pelicula.film_ID}
                            film_title={pelicula.film_title}
                            year={pelicula.year}
                            rating={pelicula.rating}
                        />)
                    }
            </div>
            <form onSubmit={console.log('click')}>
                <label>
                    Movie title:  <input type="text" id="title"/>
                </label>
                <label>
                    Year: <input type="text" id="year" />
                </label>
                <label>
                    Rating: <input type="text" id="rating" />
                </label>
                <input type='submit' id="submit" />
            </form>
      </div>
    );
  }
}

export default App;
