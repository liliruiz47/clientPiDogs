import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperamentsList, getDogs } from "../../Redux/actions"
import styles from "./DogCreate.css";
import perritoCreacion from "../../image/perritoCreacion.avif"

function validateForm(input) {
  let errors = {};

  // NAME
  if (!input.name) {
    errors.name = "You must type a name";
  }else if(!/[A-Z]+$/i.test(input.name)) {
    errors.name = 'must only contain letters'
  } else if(parseInt(input.name.length) >= 25) {
    errors.name= 'must contain less than 25 characters'
  }

  if(!input.weight_max) {
    errors.weight_max = "maximum weight required"
  } else if(parseInt(input.weight_max) >=90) {
    errors.weight_max = 'must be less than 90kg'
  } else if(!/^[0-9]+$/.test(input.weight_max)) {
    errors.weight_max = 'must only contain numbers'
  }

  if(!input.weight_min) {
    errors.weight_min = 'minimum weight required'
  } else if(parseInt(input.weight_min) >= parseInt(input.weight_max) || parseInt(input.weight_min) <5) {
    errors.weight_min= 'must be over 5'
  }


  
 /* // WEIGHTS
  if (!input.weight_min) {
    // weight min
    errors.weight_min = "Type a valid minimal weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_min)) {
    errors.weight_min = "Weight must have min values. Example: '25'";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    // weight max
    errors.weight_max = "Type a valid maxim weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_max)) {
    errors.weight_max = "Weight must have max values. Example: '25'";
  } else {
    errors.weight_max = "";
  }*/
  
  // HEIGHTS
  /*if (!input.height_min) {
    // height min
    errors.height_min = "Type a valid minimal height number";
  } else if (!/\d{1,2}/gi.test(input.height_min)) {
    errors.height_min = "Height must have min values. Example: '25'";
  } else {
    errors.height_min = "";
  }*/
  

    //height
  if(!input.height_max) {
    errors.height_max = "maximum height required"
  } else if(parseInt(input.height_max) >= 85) {
    errors.height_max = 'must be less than 85 cm' 
  } else if(!/^[0-9]+$/.test(input.height_max)) {
    errors.height_max = 'can only contain numbers'
  }

  if(!input.height_min) {
    errors.height_min = 'minimum height required'
  } else if(parseInt(input.height_min) >= parseInt(input.height_max)|| parseInt(input.height_min)<= 20) {
    errors.height_min = 'must be over 20 cm'
  } else if(!/^[0-9]+$/.test(input.height_min)) {
    errors.height_min = 'can only contain numbers'
  }
    
  //life_span
  if (!input.life_span) {
    errors.life_span = 'life_span required'
  } else if(parseInt(input.life_span) > 20) {
    errors.life_span = 'must be less than 20 years old'
  } else if(!/^[0-9]+$/.test(input.life_span)) {
    errors.life_span = 'can only contain numbers'
  }else if (input.life_span <= 0) {
    errors.life_span = 'life expectancy cannot be less than or equal to 0'
}

if(!input.temperament) {
  errors.temperament = "you must select at least one temperament"}

  
  return errors;
}

/*function validar(input) {
  //name
  let errors = {};
  if(!input.name) {
    errors.name = 'debes ponerle un nombre'
  } else if(!/[A-Z]+$/i.test(input.name)) {
    errors.name = 'solo puede contener letras'
  } else if(parseInt(input.name.length) >= 25) {
    errors.name= 'debe contener menos de 25 caracteres'
  }
  // /^[A-Z]+$/i

  //height
  if(!input.height_max) {
    errors.height_max = "altura max requerida"
  } else if(parseInt(input.height_max) > 85) {
    errors.height_max = 'debe ser menor a 85 CM' 
  } else if(!/^[0-9]+$/.test(input.height_max)) {
    errors.height_max = 'solo puede contener numeros'
  }

  //agregar a los otros inputs

  if(!input.height_min) {
    errors.height_min = 'altura min requerida'
  } else if(parseInt(input.height_min) >= parseInt(input.height_max)) {
    errors.height_min = 'debe ser menor al max'
  } else if(!/^[0-9]+$/.test(input.height_min)) {
    errors.height_min = 'solo puede contener numeros'
  }


  //weight  
  if(!input.weight_max) {
    errors.weight_max = "peso max requerido"
  } else if(parseInt(input.weight_max) > 90) {
    errors.weight_max = 'debe ser menor a 90 KG'
  } else if(!/^[0-9]+$/.test(input.weight_max)) {
    errors.weight_max = 'solo puede contener numeros'
  }

  if(!input.weight_min) {
    errors.weight_min = 'peso min requerido'
  } else if(parseInt(input.weight_min) >= parseInt(input.weight_max)) {
    errors.weight_min= 'debe ser menor al max'
  }


  //life_span
  if(parseInt(input.life_span_max) > 20) {
    errors.life_span_max = 'debe ser menor a 20 Años'
  } else if(!/^[0-9]+$/.test(input.life_span_max)) {
    errors.life_span_max = 'solo puede contener numeros'
  }
  
  
  return errors;
}*/





export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperament).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );;

  const dogs = useSelector(state => state.allDogs)
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image:"",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    console.log(input)

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      }, dogs));
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperament.filter((temp) => temp !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.weight_min &&
      !errors.height_min &&
      !errors.weight_max &&
      !errors.height_max &&
      !errors.life_span
    ) {
      alert("Your dog has been created successfully");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
      });
    } else {
      return alert("Something went wrong. Please try again.");
    }
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);

  return (
   
      <div className="mainContainer">
      <div className={styles.mainContainerCreation}>
        <div>
          <h2>Create your Woof</h2>
        </div>
        <img src={perritoCreacion} alt=""  />
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.Section}>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Image URL:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://myimageontheweb.com"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Heights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="85"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Weights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="4"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="89"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            
            <div className={styles.Section}>
              <label>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="12 - 20 years"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.life_span}</p>
              </div>
            </div>
            <div>
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} >
                {temperament.map((temp) => {
                  return(
                  <option value={temp.name}>{temp.name}</option>
                  );
                  })}
              </select>
              <div>
                <h4>You have selected that:</h4>
                <ul><li>{input.temperament.map(el => el + " , ")}</li></ul>
              </div>
              <div>
                <p className={styles.error}>{errors.temperament}</p>
              </div>
              </div>
             
            
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className='button'>Cancel</button>
              </Link>
              <button className='button' type="submit">
                Creat 
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    
  );
}