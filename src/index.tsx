import { render } from 'preact';
import { useState, useEffect } from "preact/hooks";

import { NumberInput, TextInput } from './TextInput';
import './style.css';
import { Item } from './Item';
import { Sort } from './SortedEnum';
import { ItemRow } from './ItemRow';
import { useTransition } from 'preact/compat';
import { EditItemRow } from './EditItemRow';
import { TotalBar } from './TotalBar';
import { useSorting } from './useSorting';

export function App() {

  const [categoryTypes, setCategoryTypes] = useState(["kategoria1", "kategoria2"]);
  const [newCategoryType, setNewCategoryType] = useState("")

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Tej', price: 350, quantity: 2, category: categoryTypes[0], purchased: false, edited: false, hidden: false },
    { id: 2, name: 'Alma', price: 500, quantity: 1, category: categoryTypes[1], purchased: false, edited: false, hidden: false },
    { id: 3, name: 'Méz', price: 3500, quantity: 3, category: categoryTypes[0], purchased: false, edited: false, hidden: false }
  ]);

  const {
    sortedState,
    sortByPurchased,
    sortByName,
    sortByPrice,
    sortByCategory,
    sortBySumPrice
  } = useSorting(items, setItems);


  useEffect(() => {
    console.log("A kategóriák listája megváltozott:", categoryTypes);
  }, [categoryTypes]); // <--- A függőségi tömb miatt csak változáskor fut le

  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState(0)
  const [newQuantity, setNewQuantity] = useState(0)
  const [newCategory, setNewCategory] = useState(categoryTypes[0])

  const [updatedName, setupdatedName] = useState("")
  const [updatedPrice, setupdatedPrice] = useState(0)
  const [updatedQuantity, setupdatedQuantity] = useState(0)
  const [updatedCategory, setupdatedCategory] = useState(categoryTypes[0])



  const [searchedAttribute, setSearchedAttribute] = useState("")
  const [searchedText, setSearchedText] = useState("")
  const [searchOperator, setSearchOperator] = useState("=");

  const [isFiltered, setIsFiltered] = useState(false)

  function search(attribute: string, input: string) {

    if (!input) setIsFiltered(false)
    else setIsFiltered(true)
    const foundItems: Item[] = []
    switch (attribute) {
      case "Név":
        {
          const newList = items.map(item => {
            let isMatch = false;
            isMatch = item.name.toLowerCase().includes(input.toLowerCase())
            return { ...item, hidden: !isMatch };
          });
          setItems(newList)

        }

        break;

      case "Egységár":
        {
          const inputNumber = Number(input);
          const newList = items.map(item => {
            let isMatch = false;

            switch (searchOperator) {
              case "<":
                isMatch = item.price < inputNumber;
                break;
              case "=":
                isMatch = item.price === inputNumber;
                break;
              case ">":
                isMatch = item.price > inputNumber;
                break;

            }

            return { ...item, hidden: !isMatch };
          });
          setItems(newList)
        }

        break;

      case "Kategória":
        {
          const newList = items.map(item => {
            let isMatch = false;
            isMatch = item.category.toLowerCase().includes(input.toLowerCase())
            return { ...item, hidden: !isMatch };
          });
          setItems(newList)

        }
        break;

      case "Ár":
        {
          const inputNumber = Number(input);
          const newList = items.map(item => {
            let isMatch = false;

            switch (searchOperator) {
              case "<":
                isMatch = item.price * item.quantity < inputNumber;
                break;
              case "=":
                isMatch = item.price * item.quantity === inputNumber;
                break;
              case ">":
                isMatch = item.price * item.quantity > inputNumber;
                break;

            }

            return { ...item, hidden: !isMatch };
          });
          setItems(newList)
        }

        break;


      default: throw new Error("error");

    }
  }


  function addItem(e) {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newItem: Item = {
      name: newName, price: newPrice, quantity: newQuantity, category: newCategory, id: Date.now(), purchased: false, edited: false, hidden: false
    }
    setItems([...items, newItem])
  }
  function addCategory(e) {
    e.preventDefault();
    if (!newCategoryType || categoryTypes.includes(newCategoryType)) return;
    setCategoryTypes([...categoryTypes, newCategoryType])

  }

  function deleteItem(id: number) {

    setItems(items.filter((item) => item.id !== id))
  }
  function editItem(id: number) {
    const newlist = items.map(item => {

      if (item.id === id)
        return { ...item, edited: true }
      return { ...item, edited: false }
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


  function totalAmount(onlyVisibleItems: boolean): number {
    let sum: number = 0
    items.forEach(item => {

      if (onlyVisibleItems) {
        if (!item.hidden) {
          sum += item.price * item.quantity
        }
      }
      else sum += item.price * item.quantity

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
            <select name="category" value={newCategory} onChange={(e) => setNewCategory(e.currentTarget.value)} >
              {categoryTypes.map(cat => {
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

        <h2>Keresés</h2>
        <div class="row">
          <TextInput value={searchedText} onChange={setSearchedText} placeholder='Keresés...' ></TextInput>
          <select value={searchedAttribute} onChange={(e) => setSearchedAttribute(e.currentTarget.value)} >
            <option value="Név">Név</option>
            <option value="Egységár">Egységár</option>
            <option value="Kategória">Kategória</option>
            <option value="Ár">Ár</option>
          </select>

          {searchedAttribute === "Egységár" || searchedAttribute === "Ár" ?
            <select value={searchOperator} onChange={(e) => setSearchOperator(e.currentTarget.value)}>
              <option value="<">&lt;</option>
              <option value="=">=</option>
              <option value=">">&gt;</option>

            </select>
            : null
          }
          <button onClick={() => search(searchedAttribute, searchedText)} class="btn-primary">Keresés</button>
        </div>


      </div>





      <div class="list-container">
        {items.length === 0 ? <h1 class="empty-msg">A lista üres.</h1> : null}

        <div class="header-row">


          <button onClick={sortByPurchased}>
            Megvásárolt-e  {sortedState[0] === Sort.ASC ? <span>▲</span> : sortedState[0] === Sort.DESC ? <span>▼</span> : null}
          </button >
          <button onClick={sortByName}>
            Név {sortedState[1] === Sort.ASC ? <span>▲</span> : sortedState[1] === Sort.DESC ? <span>▼</span> : null}
          </button>
          <button onClick={sortByPrice}>
            Egységár {sortedState[2] === Sort.ASC ? <span>▲</span> : sortedState[2] === Sort.DESC ? <span>▼</span> : null}
          </button>

          <button onClick={sortByCategory}>
            Kategória {sortedState[3] === Sort.ASC ? <span>▲</span> : sortedState[3] === Sort.DESC ? <span>▼</span> : null}
          </button>
          <button onClick={sortBySumPrice}>
            Ár {sortedState[4] === Sort.ASC ? <span>▲</span> : sortedState[4] === Sort.DESC ? <span>▼</span> : null}
          </button>

        </div>

        {items.map((item) => {
          return item.edited ?
            <EditItemRow item={item} updatedName={updatedName} setUpdatedName={setupdatedName}
              updatedPrice={updatedPrice} setUpdatedPrice={setupdatedPrice}
              updatedQuantity={updatedQuantity} setUpdatedQuantity={setupdatedQuantity}
              updatedCategory={updatedCategory} setUpdatedCategory={setupdatedCategory}
              categoryTypes={categoryTypes} onSave={updateItem} />
            :
            <ItemRow key={item.id} item={item} onTogglePurchased={togglePurchased} onStartEditing={startEditing} onDelete={deleteItem} />
        }
        )}
      </div>

      <TotalBar isFiltered={isFiltered} filteredTotal={totalAmount(false)} grandTotal={totalAmount(true)} />

    </div>
  );
}




render(<App />, document.getElementById('app'));
