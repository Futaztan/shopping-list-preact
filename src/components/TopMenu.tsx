import { Item } from "../types/Item";
import { NumberInput } from "./ui/NumberInput";
import {  TextInput } from "./ui/TextInput";

type TopMenuProps = {

  toggleMute: () => void;
  isMuted: boolean;
  newName: string; setNewName: (val: string) => void
  newPrice: number; setNewPrice: (val: number) => void
  newQuantity: number; setNewQuantity: (val: number) => void
  newCategory: string; setNewCategory: (val: string) => void
  addItem: (newName: string, newPrice: number, newQuantity: number, newCategory: string, val: SubmitEvent) => void
  addCategory: (val: SubmitEvent) => void
  categoryTypes: string[]
  newCategoryType: string; setNewCategoryType: (val: string) => void
  searchedText: string; setSearchedText: (val: string) => void
  searchedAttribute: string; setSearchedAttribute: (val: string) => void
  searchOperator: string; setSearchOperator: (val: string) => void
  search: (attribute: string, input: string) => void


};

export function TopMenu({ toggleMute, isMuted, newName, newPrice, newQuantity, newCategory, setNewName, setNewPrice, setNewCategory, setNewQuantity,
  addItem, addCategory, categoryTypes, newCategoryType, setNewCategoryType, searchedText, setSearchedText, searchedAttribute, setSearchedAttribute,
  searchOperator, setSearchOperator, search
}: TopMenuProps) {
  return (
    <div class="card form-card">
      <img onClick={toggleMute} src={isMuted ? "/icons/mute.png" : "icons/volume.png"} width="30px" height="30px" />

      <h2>Új elem hozzáadása</h2>
      <form onSubmit={(e) => addItem(newName, newPrice, newQuantity, newCategory, e)} class="add-form">
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
  )
}