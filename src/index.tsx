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
import { SoundType, useSounds } from './Sounds';
import { TopMenu } from './TopMenu';
import { SortingMenu } from './SortingMenu';

export function App() {

  const [categoryTypes, setCategoryTypes] = useState(["kategoria1", "kategoria2"]);
  const [newCategoryType, setNewCategoryType] = useState("")


  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("shopping-list-data");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Hiba a betöltéskor:", e);
        return [];
      }
    }
    return [
      { id: 1, name: 'Tej', price: 350, quantity: 2, category: categoryTypes[0], purchased: false, edited: false, hidden: false },
      { id: 2, name: 'Alma', price: 500, quantity: 1, category: categoryTypes[1], purchased: false, edited: false, hidden: false },
      { id: 3, name: 'Méz', price: 3500, quantity: 3, category: categoryTypes[0], purchased: false, edited: false, hidden: false }
    ];
  });

  const {
    sortedState,
    sortByPurchased,
    sortByName,
    sortByPrice,
    sortByCategory,
    sortBySumPrice
  } = useSorting(items, setItems);

  const { playSound, toggleMute, isMuted } = useSounds();


  useEffect(() => {
    localStorage.setItem("shopping-list-data", JSON.stringify(items));
  }, [items]);

  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState(0)
  const [newQuantity, setNewQuantity] = useState(0)
  const [newCategory, setNewCategory] = useState(categoryTypes[0])

  const [updatedName, setupdatedName] = useState("")
  const [updatedPrice, setupdatedPrice] = useState(0)
  const [updatedQuantity, setupdatedQuantity] = useState(0)
  const [updatedCategory, setupdatedCategory] = useState(categoryTypes[0])



  const [searchedAttribute, setSearchedAttribute] = useState("Név")
  const [searchedText, setSearchedText] = useState("")
  const [searchOperator, setSearchOperator] = useState("=");

  const [isFiltered, setIsFiltered] = useState(false)

  function search(attribute: string, input: string) {

    if (!input) setIsFiltered(false)
    else setIsFiltered(true)
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


  function addItem(e: SubmitEvent) {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newItem: Item = {
      name: newName, price: newPrice, quantity: newQuantity, category: newCategory, id: Date.now(), purchased: false, edited: false, hidden: false
    }
    setItems([...items, newItem])
    playSound(SoundType.ADD);
  }
  function addCategory(e) {
    e.preventDefault();
    if (!newCategoryType || categoryTypes.includes(newCategoryType)) return;
    setCategoryTypes([...categoryTypes, newCategoryType])

  }

  function deleteItem(id: number) {

    setItems(items.filter((item) => item.id !== id))
    playSound(SoundType.DELETE);
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

      <TopMenu
        // Audio
        isMuted={isMuted}
        toggleMute={toggleMute}

        // Add Item
        newName={newName} setNewName={setNewName}
        newPrice={newPrice} setNewPrice={setNewPrice}
        newQuantity={newQuantity} setNewQuantity={setNewQuantity}
        newCategory={newCategory} setNewCategory={setNewCategory}
        categoryTypes={categoryTypes}
        addItem={addItem}

        // Add Category
        newCategoryType={newCategoryType} setNewCategoryType={setNewCategoryType}
        addCategory={addCategory}

        // Search
        searchedText={searchedText} setSearchedText={setSearchedText}
        searchedAttribute={searchedAttribute} setSearchedAttribute={setSearchedAttribute}
        searchOperator={searchOperator} setSearchOperator={setSearchOperator}
        search={search}
      />



      <div class="list-container">
        {items.length === 0 ? <h1 class="empty-msg">A lista üres.</h1> : 
        <SortingMenu
          onSortByPurchased={sortByPurchased}
          onSortByName={sortByName}
          onSortByCategory={sortByCategory}
          onSortByPrice={sortByPrice}
          onSortBySumPrice={sortBySumPrice}
          sortedState={sortedState}
        />
        }



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
