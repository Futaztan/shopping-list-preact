import { AddItemForm } from "./AddItemForm";
import { TopMenuIcons } from "./TopMenuIcons";
import { AddCategoryTypeForm } from "./AddCategoryTypeForm";
import { SearchMenu } from "./SearchMenu";

type TopMenuProps = {

  toggleMute: () => void;
  downloadShoppingList: () => void;
  uploadShoppingList: (e: any) => void;
  isMuted: boolean;
  addItem: (newName: string, newPrice: number, newQuantity: number, newCategory: string) => void
  addCategory: (category: string) => void
  categoryTypes: string[]
  onSearch: (attribute: string, text: string, operator: string) => void

};
/**
 * Az oldal tetején található fő szekció
 *
 * @param toggleMute - muteolás on/off függvény
 * @param downloadShoppingList - bevásárló lista elemeinek letöltése jsonba
 * @param uploadShoppingList - bevásárló lista elemeinek feltöltése jsonból
 * @param isMuted - némítva van e az oldal
 * @param addItem - új elem hozzáadása
 * @param addCategory - új kategóra hozzáadása
 * @param categoryTypes - kategóra típusok
 * @param onSearch - szűrés függvénye
 * @returns Felső rész html kódja
 */
export function TopMenu({ toggleMute, downloadShoppingList, uploadShoppingList, isMuted, addItem, addCategory, categoryTypes, onSearch
}: TopMenuProps) {

  return (
    <div class="card form-card">

      <TopMenuIcons toggleMute={toggleMute} downloadShoppingList={downloadShoppingList} uploadShoppingList={uploadShoppingList}
        isMuted={isMuted} />
      <AddItemForm categoryTypes={categoryTypes} onAdd={addItem} />

      <AddCategoryTypeForm onAdd={addCategory} />

      <SearchMenu onSearch={onSearch} />

    </div >
  )
}