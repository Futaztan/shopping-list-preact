
import { Item } from "./Item";
import { NumberInput, TextInput } from "./TextInput";

type EditItemRowProps = {
  item: Item;
  updatedName: string;
  setUpdatedName: (val: string) => void;
  updatedPrice: number;
  setUpdatedPrice: (val: number) => void;
  updatedQuantity: number;
  setUpdatedQuantity: (val: number) => void;
  updatedCategory: string;
  setUpdatedCategory: (val: string) => void;
  categoryTypes: string[];
  onSave: (id: number) => void;
};



export function EditItemRow({ item, updatedName, setUpdatedName, updatedPrice, setUpdatedPrice, updatedQuantity, setUpdatedQuantity, updatedCategory, setUpdatedCategory, categoryTypes, onSave }: EditItemRowProps) {
  return (
    <div class="card form-card">
      <form onSubmit={(e) => { e.preventDefault(); onSave(item.id) }}>
        <div class="row">
          <TextInput value={updatedName} onChange={setUpdatedName} placeholder='Termék neve' ></TextInput>
          <NumberInput value={updatedPrice} onChange={(val) => setUpdatedPrice(Number(val))} placeholder='Termék ára' ></NumberInput>
          <NumberInput value={updatedQuantity} onChange={(val) => setUpdatedQuantity(Number(val))} placeholder='Vásárlandó mennyiség' ></NumberInput>

          <select name="category" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.currentTarget.value)} >
            {categoryTypes.map(cat => {
              return <option value={cat}>{cat}</option>
            })}

          </select>
          <button type="submit" class="btn-primary">Kész</button>
        </div>

      </form>

    </div>
  )
}