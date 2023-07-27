import React from "react";
import s from './DogCard.css';

export default function DogCard({name, image, temperament, weight_min, weight_max, height_min, height_max }){
    return (
        <div className="conteinerAll">
            <div >
                <div >
                
                    <div className="cardContImg">
                        
                        <img src={image} alt={`${name}`} className="cardImg" />
                    </div>

                    <div className="cardInfo" >
                       <h1 className="cardTitle">{name}</h1> 
                       <h2>Temperament:</h2>
                       <h3>
                        {temperament}
                    </h3>
                    <h2>Weight:</h2>
                        <h4>De {weight_min} Kg. a {weight_max} Kg.</h4>

                        </div>
                        </div>
                    </div>
                    </div>
                
    )
}

