import React from 'react';

function Pelicula(props) {
    return (
        <div>
            <div>
                {props.film_ID}
            </div>
            <div>
                {props.film_title}
            </div>
            <div>
                {props.year}
            </div>
            <div>
                {props.rating}
            </div>
        </div>
    )
}

export default Pelicula;