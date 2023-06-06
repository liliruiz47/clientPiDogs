import React from "react";
import { useState } from "react";  
import { useDispatch } from "react-redux";
//import '../SearchBar/SearchBar.css'
import { getDogsByName} from "../../Redux/actions";

export default function SearchBar() {
    const [dogState, setDogState] = useState("");
    const dispatch = useDispatch();
  
    function handleClick(e) {
      e.preventDefault();
      
      if (dogState.length === 0) {
        return alert("Please input a name to start the search");
      } else {
        dispatch(getDogsByName(dogState));
        setDogState("");
      }
    }
  
    return (
      <div>
        <input
          type="text"
          placeholder=""
          value={dogState}
          onChange={(e) => setDogState(e.target.value)}
          className="inputText"
          required
        />
        <button type="submit" onClick={handleClick} >
          <span>Search Dog</span>
        </button>
      </div>
    );
  }