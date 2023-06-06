import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterDogsByTemperament, sortByName, sortByWeight, filterDogsByOrigin } from "../../Redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import DogCard from "../DogCard/DogCard";
import Paginado from "../Paginado/Paginado";
import s from './Home.css';
import React from "react";


export default function Home (){

    
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperament)

   const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, /*_setDogCurrentPerPage*/] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const [_orden, setOrden] = useState('')

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


useEffect(() => {
    dispatch(getDogs());
}, [dispatch])

useEffect(() => {
    dispatch(getTemperaments())
}, [dispatch])

function handleFilterTemperaments(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(filterDogsByTemperament(e.target.value))
}

function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSortByWeight(e) {
    e.preventDefault()
    dispatch(sortByWeight(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}

function handleFilterOrigin(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(filterDogsByOrigin(e.target.value))

}


function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
}

return (
    <div className="home">

        <div className='divNB'>
        <ul className='navbar'>
                
                    <li>
                        <Link to='/'><button className="welcome"><span>Back</span></button></Link>
                    </li>
                    <li>
                        <button className='welcome' onClick={e => { handleClick(e) }}><span>Reload Dogs</span></button>
                    </li>
                    <li>
                        <Link to='/dogs' ><button className='welcome'><span>Dog Create</span></button></Link>
                    </li>
                </ul>
                
                <ul className='navbar'>
                <li className='content-select'>
                        <select onChange={e => handleSortByName(e)}>
                            <option value="selected" hidden >Ordered by Name</option>
                            <option value="ABC">A - Z</option>
                            <option value="ZYX">Z - A</option>
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleSortByWeight(e)}>
                            <option value="selected" hidden className='elementNB'>Ordered by Weigth</option>
                            <option value="asc">Lighter</option>
                            <option value="desc">Heavier</option>
                        </select>
                    </li>


                <li className='content-select'>
                        <select onChange={e => handleFilterTemperaments(e)}>
                            <option key={0} value='all'>All Temperaments</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1
                                if (a.name > b.name) return 1
                                return 0
                            }).map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleFilterOrigin(e)}>
                            <option value="all">All Dogs</option>
                            <option value='api'>API</option>
                            <option value='created'>Dog Created</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                    
                    </ul>
                    </div>
               
                    <Paginado  dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                    <div className="containerAll">
                        <ul className="containerDogs">
                    {
                    currentDogs?.map( (el)=>{
                    return(
                    <div key={el.id} className='cardDog'>
                    <Link to={'/dogs/' + el.id} style={{ textDecoration: 'none' }}>  
                        <DogCard name={el.name} 
                                image={el.image} 
                                temperament={el.temperament? el.temperament : el.temperaments?.map((ele, index) => el.temperaments.length -1 === index? ele.name : ele.name + (', '))} 
                                weight_min={el.weight_min}
                                weight_max={el.weight_max}
                                key={el.id}/> 
                    </Link>
                    </div>
                    )
                    
                    })
                    
                    
                }
                </ul>
                </div>
                </div>
                
                
                    
                )}



                
            
                
            
                

        

        
