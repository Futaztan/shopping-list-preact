import { NumberInput } from "./ui/NumberInput";
import { TextInput } from "./ui/TextInput";

type TopMenuProps = {

  toggleMute: () => void;
  downloadShoppingList: () => void;
  uploadShoppingList: (e: any) => void;
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
  isDarkMode: boolean;
  toggleTheme: () => void;


};

export function TopMenu({ toggleMute, downloadShoppingList, uploadShoppingList, isMuted, newName, newPrice, newQuantity, newCategory, setNewName, setNewPrice, setNewCategory, setNewQuantity,
  addItem, addCategory, categoryTypes, newCategoryType, setNewCategoryType, searchedText, setSearchedText, searchedAttribute, setSearchedAttribute,
  searchOperator, setSearchOperator, search, isDarkMode, toggleTheme
}: TopMenuProps) {
  
  return (
    <div class="card form-card">
      <input
        type="file"
        accept=".json"
        id="file-upload-input"
        style={{ display: "none" }}
        onChange={uploadShoppingList}
      />
      <img onClick={toggleTheme} src={isDarkMode ? "/icons/day-mode.png" : "/icons/dark-mode.png"} width="30px" height="30px"/>
      <img onClick={downloadShoppingList} src={isDarkMode? "/icons/download-white.png" : "/icons/download.png"} width="30px" height="30px" />
      <img onClick={() => document.getElementById('file-upload-input').click()} src={ isDarkMode? "/icons/upload-white.png" : "/icons/upload.png"} width="30px" height="30px" />
      <img onClick={toggleMute} src={isMuted ? "/icons/mute.png" : isDarkMode ? "icons/volume-white.png" : "icons/volume.png"} width="30px" height="30px" />

      <h2>Új elem hozzáadása</h2>
      <form onSubmit={(e) => addItem(newName, newPrice, newQuantity, newCategory, e)} class="add-form">
        <div class="row">


          <div class="input-group">
            <label>Termék neve</label>
            <TextInput
              value={newName}
              onChange={setNewName}
              placeholder='Termék neve'
            />
          </div>

          <div class="input-group">
            <label>Termék ára</label>
            <NumberInput
              value={newPrice}
              minimum={1}
              onChange={(val) => setNewPrice(Number(val))}
              placeholder='Termék ára'
            />
          </div>

          <div class="input-group">
            <label>Vásárlandó mennyiség</label>
            <NumberInput value={newQuantity} onChange={(val) => setNewQuantity(Number(val))} minimum={1} placeholder='Vásárlandó mennyiség' ></NumberInput>
          </div>

          <div class="input-group">
            <label>Termék kategóriája</label>
            <select name="category" value={newCategory} onChange={(e) => setNewCategory(e.currentTarget.value)} >
              {categoryTypes.map(cat => {
                return <option value={cat}>{cat}</option>
              })}

            </select>
          </div>


          <div class="input-group">
            <label>&nbsp;</label>
            <button type="submit" class="btn-primary">Hozzáadás (+)</button>
          </div>
        </div>

      </form>
      <h2>Új kategória hozzáadása</h2>
      <form onSubmit={addCategory} class="add-form">
        <div class="row">

          <div class="input-group">
            <label>Új kategória neve:</label>
            <TextInput value={newCategoryType} onChange={setNewCategoryType} placeholder='Kategória neve' ></TextInput>
          </div>

          <div class="input-group">
            <label>&nbsp;</label>
            <button type="submit" class="btn-primary">Hozzáadás (+)</button>
          </div>
        </div>



      </form >

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
        <button onClick={() => {
          setSearchedText("");
          search(searchedAttribute, "");
        }} class="btn-primary">Keresés törlése</button>
      </div>


    </div >
  )
}