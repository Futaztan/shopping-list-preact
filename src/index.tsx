import { render } from 'preact';
import { useMemo, useState } from "preact/hooks";

import './css/style.css';
import { Item } from './types/Item';
import { ItemRow } from './components/list/ItemRow';
import { EditItemRow } from './components/list/EditItemRow';
import { TotalBar } from './components/footer/TotalBar';
import { useSorting } from './hooks/useSorting';
import { useSounds } from './hooks/useSounds';
import { TopMenu } from './components/header/TopMenu';
import { Title } from './components/header/Title';
import { SortingMenu } from './components/list/SortingMenu';
import { useShoppingList } from './hooks/useShoppingList';
import { useToast } from './hooks/setToast';
import { PageFooter } from './components/footer/PageFooter';
import { EmptyListMessage } from './components/list/EmptyListMessage';


export function App() {


  const [searchParams, setSearchParams] = useState({
    text: "",
    attribute: "Név",
    operator: "="
  });
  const { showToast, ToastContainer } = useToast();
  const { playSound, toggleMute, isMuted } = useSounds();


  const {
    items,
    setItems,
    addItem,
    deleteItem,
    togglePurchased,
    toggleEditMode,
    updateItem,
    addCategory,
    categoryTypes,

    downloadItems,
    uploadItems
  } = useShoppingList(playSound, showToast);


  const filteredItems = useMemo(() => {

    if (!searchParams.text) return items;

    const inputNumber = Number(searchParams.text);
    const inputText = searchParams.text.toLowerCase();

    return items.filter(item => {
      switch (searchParams.attribute) {
        case "Név":
          return item.name.toLowerCase().includes(inputText);

        case "Kategória":
          return item.category.toLowerCase().includes(inputText);

        case "Egységár":
          switch (searchParams.operator) {
            case "<": return item.price < inputNumber;
            case ">": return item.price > inputNumber;
            default: return item.price === inputNumber;
          }

        case "Ár": // Összesített ár
          const total = item.price * item.quantity;
          switch (searchParams.operator) {
            case "<": return total < inputNumber;
            case ">": return total > inputNumber;
            default: return total === inputNumber;
          }

        default: return true;
      }
    });
  }, [items, searchParams]); 

  const handleSearch = (attribute: string, text: string, operator: string) => {
    setSearchParams({ attribute, text, operator });
  };

  const [updatedName, setupdatedName] = useState("")
  const [updatedPrice, setupdatedPrice] = useState(0)
  const [updatedQuantity, setupdatedQuantity] = useState(0)
  const [updatedCategory, setupdatedCategory] = useState(categoryTypes[0])


  function totalAmount(onlyVisibleItems: boolean): number {
    let sum: number = 0
    if (onlyVisibleItems) {
      filteredItems.forEach(item => {

        sum += item.price * item.quantity

      });
    }
    else {
      items.forEach(item => {

        sum += item.price * item.quantity
      });
    }
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

      <Title />

      <TopMenu

        isMuted={isMuted}
        downloadShoppingList={downloadItems}
        uploadShoppingList={uploadItems}
        toggleMute={toggleMute}
        categoryTypes={categoryTypes}
        addItem={addItem}
        addCategory={addCategory}
        onSearch={handleSearch}
      />



      <div class="list-container">
        {items.length === 0 ?<EmptyListMessage /> :
          <SortingMenu
            items={items}
            setItems={setItems}
          />
        }



        {filteredItems.map((item) => {
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
      <PageFooter />
      </div>
        
      <TotalBar isFiltered={filteredItems.length !== items.length} filteredTotal={totalAmount(true)} grandTotal={totalAmount(false)} />
      
      
      <ToastContainer />
    

    </div>
  );
}

render(<App />, document.getElementById('app'));
