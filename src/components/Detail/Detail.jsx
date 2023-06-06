import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../Redux/actions';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Detail.css';


export default function Detail(props) {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  const myDog = useSelector((state) => state.detail)

  console.log(myDog)
  
 

  return(
    
   
            
    <div className='styles.bodix'>    
    {
        myDog.length > 0 ?
        
    
            <div className= 'mainContainer'>
                <Link to="/home">
              <button className='button'>Back</button>
            </Link>
            <h1 className='mainTitle' > Soy {myDog[0].name}</h1>
            
            
            
                <li>
                    <div className='imageSection' >
                        <img src = {myDog[0].img? myDog[0].img : myDog[0].image} alt={myDog.name} className='image'/>
                    </div>
                </li>
            <div className='detailsContainer'>
            
            <div className='infoSection'>
            <h3 >Temperament: </h3>
            <p>
            {myDog[0].createdInDB? myDog[0].temperaments.map((el) => el.name).join(", ")
                : myDog[0].temperament}
            </p>
            </div>
            
            
            <div className='infoSection'>
                
            <h4> Height: </h4>
            <p> Min: {myDog[0].height_min} cm</p>
            <p> Max: {myDog[0].height_max} cm</p> 
            </div>
            
            <div className='infoSection'> 
            <h4 >Weight: </h4>
            <p>Min: {myDog[0].weight_min} kg</p>
            <p>Max: {myDog[0].weight_max} kg</p>
            </div >
            <div className='infoSection'>
            <h4 >Life_span: {myDog[0].life_span}</h4>
            </div>
            </div>
            <div>
     
     
    </div>
            
            
            
        </div>: <p>loading...</p>
    }
    
    </div>
    
    )
}

