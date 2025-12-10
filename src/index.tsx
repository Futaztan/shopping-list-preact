import { render } from 'preact';
import { useState } from "preact/hooks";

import './css/style.css';
import { Item } from './types/Item';
import { ItemRow } from './components/ItemRow';
import { EditItemRow } from './components/EditItemRow';
import { TotalBar } from './components/TotalBar';
import { useSorting } from './hooks/useSorting';
import { useSounds } from './hooks/useSounds';
import { TopMenu } from './components/TopMenu';
import { SortingMenu } from './components/SortingMenu';
import { useShoppingList } from './hooks/useShoppingList';
import { useSearch } from './hooks/useSearch';
import { useTheme } from './hooks/useTheme';

//TODO: letöltés,feltöltés cisszajelzés, uj kategoira hozzáadásnál visszajelzés ha jó ha hibás, night mode

export function App() {


  const [newCategoryType, setNewCategoryType] = useState("")
    const { playSound, toggleMute, isMuted } = useSounds();

  const {
    items,
    setItems,
    addItem,
    deleteItem,
    togglePurchased,
    toggleEditMode,
    updateItem,
    categoryTypes,
    setCategoryTypes,
    downloadItems,
    uploadItems
  } = useShoppingList(playSound);


  const {
    sortedState,
    sortByPurchased,
    sortByName,
    sortByPrice,
    sortByCategory,
    sortBySumPrice
  } = useSorting(items, setItems);

  const {
    searchedAttribute,
    setSearchedAttribute,
    searchedText,
    setSearchedText,
    searchOperator,
    setSearchOperator,
    isFiltered,
    search


  } = useSearch(items, setItems)

  const {isDarkMode, toggleTheme} = useTheme()


  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState(1000)
  const [newQuantity, setNewQuantity] = useState(1)
  const [newCategory, setNewCategory] = useState(categoryTypes[0])

  const [updatedName, setupdatedName] = useState("")
  const [updatedPrice, setupdatedPrice] = useState(0)
  const [updatedQuantity, setupdatedQuantity] = useState(0)
  const [updatedCategory, setupdatedCategory] = useState(categoryTypes[0])


  function addCategory(e) {
    e.preventDefault();
    if (!newCategoryType || categoryTypes.includes(newCategoryType)) return;
    setCategoryTypes([...categoryTypes, newCategoryType])

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


  function startEditing(item: Item) {
    setupdatedName(item.name);
    setupdatedPrice(item.price);
    setupdatedQuantity(item.quantity);
    setupdatedCategory(item.category);
    toggleEditMode(item.id)

  }

  return (

    <div class="container">

      <h1>🛒 Bevásárlólista</h1>

      <TopMenu
        // Audio
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        downloadShoppingList={downloadItems}
        uploadShoppingList={uploadItems}
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

      <TotalBar isFiltered={isFiltered} filteredTotal={totalAmount(true)} grandTotal={totalAmount(false)} />

    </div>
  );
}

render(<App />, document.getElementById('app'));
