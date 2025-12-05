import { render } from 'preact';
import { useState,useEffect } from "preact/hooks";

import { NumberInput, TextInput } from './TextInput';
import './style.css';
import { Item } from './Item';
import { useTransition } from 'preact/compat';

export function App() {

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Tej', price: 350, quantity: 2, category: 'Élelmiszer', purchased: false, edited: false },
    { id: 2, name: 'Alma', price: 500, quantity: 1, category: 'Élelmiszer', purchased: false, edited: false },
    { id: 3, name: 'Méz', price: 3500, quantity: 3, category: 'Élelmiszer', purchased: false, edited: false }
  ]);

  const [categoryTypes, setCategoryTypes] = useState(["kategoria1", "kategoria2"]);
  const [newCategoryType, setNewCategoryType] = useState("")

   useEffect(() => {
    console.log("A kategóriák listája megváltozott:", categoryTypes);
  }, [categoryTypes]); // <--- A függőségi tömb miatt csak változáskor fut le

  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState(0)
  const [newQuantity, setNewQuantity] = useState(0)
  const [newCategory, setNewCategory] = useState("")

  const [updatedName, setupdatedName] = useState("")
  const [updatedPrice, setupdatedPrice] = useState(0)
  const [updatedQuantity, setupdatedQuantity] = useState(0)
  const [updatedCategory, setupdatedCategory] = useState("")




  function addItem(e) {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newItem: Item = {
      name: newName, price: newPrice, quantity: newQuantity, category: newCategory, id: Date.now(), purchased: false, edited: false
    }
    setItems([...items, newItem])
  }
  function addCategory(e)
  {
    e.preventDefault();
    if(!newCategoryType) return;
    setCategoryTypes([...categoryTypes,newCategoryType])
    
  }

  function deleteItem(id: number) {

    setItems(items.filter((item) => item.id !== id))
  }
  function editItem(id: number) {
    const newlist = items.map(item => {
      if (item.id === id)
        return { ...item, edited: !item.edited }
      return item
    })
    setItems(newlist)
  }
  function togglePurchased(id: number) {
    const newlist = items.map(item => {
      if (item.id === id)
        return { ...item, purchased: !item.purchased }
      return item
    })
    setItems(newlist)
  }
  function totalAmount(): number {
    let sum: number = 0
    items.forEach(item => {
      sum += item.price * item.quantity
    });
    return sum
  }

  function updateItem(id: number) {
    const newlist = items.map(item => {
      if (item.id === id)
        return { ...item, name: updatedName, price: updatedPrice, quantity: updatedQuantity, category: updatedCategory, edited: false }
      return item
    })
    setItems(newlist)
  }

  function startEditing(item: Item) {
    setupdatedName(item.name);
    setupdatedPrice(item.price);
    setupdatedQuantity(item.quantity);
    setupdatedCategory(item.category);
    editItem(item.id)

  }

  function showItemEdit(item: Item) {



    return (
      <div class="card form-card">
        <form onSubmit={(e) => { e.preventDefault(); updateItem(item.id) }}>
          <div class="row">
            <TextInput value={updatedName} onChange={setupdatedName} placeholder='Termék neve' ></TextInput>
            <NumberInput value={updatedPrice} onChange={(val) => setupdatedPrice(Number(val))} placeholder='Termék ára' ></NumberInput>
            <NumberInput value={updatedQuantity} onChange={(val) => setupdatedQuantity(Number(val))} placeholder='Vásárlandó mennyiség' ></NumberInput>
            <TextInput value={updatedCategory} onChange={setupdatedCategory} placeholder='Termék kategóriája' ></TextInput>
            <button type="submit" class="btn-primary">Kész</button>
          </div>

        </form>
      </div>

    )
  }

  function showItemData(item: Item) {
    return (
      <div key={item.id} class={`item-card ${item.purchased ? 'purchased' : ''}`}>
        <input
          type="checkbox"
          checked={item.purchased}
          onInput={() => togglePurchased(item.id)}
          class="checkbox"
        />

        <div class="item-details">
          <span class="item-name">{item.name}</span>
          <span class="item-info">
            {item.quantity} db x {item.price} Ft
          </span>

        </div>
        <div class="item-details">
          <span class="item-name">{item.category}</span>
        </div>
        <div class="item-price">
          {item.quantity * item.price} Ft
        </div>

        <div class="actions">
          <button onClick={() => startEditing(item)} class="btn-edit" title="Szerkesztés">✏️</button>
          <button onClick={() => deleteItem(item.id)} class="btn-delete" title="Törlés">🗑️</button>
        </div>
      </div>
    )
  }

  return (
    <div class="container">
      <h1>🛒 Bevásárlólista</h1>
      <div class="card form-card">
        <h2>Új elem hozzáadása</h2>
        <form onSubmit={addItem} class="add-form">
          <div class="row">
            <TextInput value={newName} onChange={setNewName} placeholder='Termék neve' ></TextInput>
            <NumberInput value={newPrice} onChange={(val) => setNewPrice(Number(val))} placeholder='Termék ára' ></NumberInput>
            <NumberInput value={newQuantity} onChange={(val) => setNewQuantity(Number(val))} placeholder='Vásárlandó mennyiség' ></NumberInput>
            <TextInput value={newCategory} onChange={setNewCategory} placeholder='Termék kategóriája' ></TextInput>
            
            <select name="category" value={newCategory} onChange={(e)=> setNewCategory(e.currentTarget.value)} >
              {categoryTypes.map(cat=>{
               return <option value={cat}>{cat}</option>
              })}
          
          </select>
            <button type="submit" class="btn-primary">Hozzáadás (+)</button>
          </div>

        </form>
        <h2>Új kategória hozzáadása</h2>
        <form onSubmit={addCategory} class="add-form">
          <div class="row">
            <TextInput value={newCategoryType} onChange={setNewCategoryType} placeholder='Kategória neve' ></TextInput>

            <button type="submit" class="btn-primary">Hozzáadás (+)</button>
          </div>

        </form>

      </div>





      <div class="list-container">
        {items.length === 0 ? <p class="empty-msg">A lista üres.</p> : null}

        {items.map((item) => { return item.edited ? showItemEdit(item) : showItemData(item) }
        )}
      </div>


      <div class="total-bar">
        <span>Végösszeg:</span>
        <span class="total-price">{totalAmount()} Ft</span>
      </div>
    </div>
  );
}




render(<App />, document.getElementById('app'));
