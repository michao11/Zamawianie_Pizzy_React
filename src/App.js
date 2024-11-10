import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState("")
  const [size, setSize] = useState("mala")
  const [totalPrice, setTotalPrice] = useState(27)
  const [ingredients, setIngredients] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    let price = 0

    if (size === "mala") {
      price += 27
    }
    else if (size === "srednia") {
      price += 34
    }
    else {
      price += 40
    }

    price += ingredients.length * 3
    setTotalPrice(price)

  }, [ingredients, size])

  const addIngredients = (e) => {
    let tempIngredients = [...ingredients]

    if (tempIngredients.includes(e.target.value)) {
      tempIngredients = tempIngredients.filter((ingredient) => ingredient !== e.target.value)
    }
    else {
      tempIngredients.push(e.target.value)
    }
    setIngredients(tempIngredients)
  }

  const handleAddOrder = () => {
    if (userName !== "") {
      const order = {
        name: userName,
        size: size,
        ingredients: ingredients,
        price: totalPrice
      }
      setOrders([...orders, order])
    }
  }

  return (
    <div className="App">
      <h1>Zamawianie Pizzy</h1>
      <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <br></br>
      <select onChange={(e) => setSize(e.target.value)}>
        <option value="mala">Mała</option>
        <option value="srednia">Średnia</option>
        <option value="duza">Duża</option>
      </select>
      <br></br>
      <label><input type="checkbox" onChange={addIngredients} value="pieczarki"></input>Pieczarki</label>
      <label><input type="checkbox" onChange={addIngredients} value="szynka"></input>Szynka</label>
      <label><input type="checkbox" onChange={addIngredients} value="cebula"></input>Cebula</label>
      <br></br>
      <h1>Cena: {totalPrice}</h1>
      <button onClick={handleAddOrder}>Zamów</button>
      <div>
        {orders.map((order, index) => 
            <li key={index}>Imie: {order.name}<br></br>Rozmiar: {order.size}<br></br>Cena: {order.price}<br></br>Składniki:
              <ul>
                {order.ingredients.map((ingredient, index) => 
                  <li key={index}>{ingredient}</li>
                )}
              </ul>
            </li>
          )}
      </div>
    </div>
  );
}

export default App;
