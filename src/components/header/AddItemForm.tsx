import { useState } from "preact/hooks";
import { NumberInput } from "../ui/NumberInput";
import { TextInput } from "../ui/TextInput";

type AddItemFormProps = {
    categoryTypes: string[];
    onAdd: (name: string, price: number, quantity: number, category: string) => void;
};

/**
 * Új elem hozzáadásának a form-ja
 *
 * @param onAdd - függvény, ami a submit után hozzáadja a listához az új elemet
 * @param categoryTypes - Kategória tömb
 * @returns Elem hozzáadás form HTML kódja
 */
export function AddItemForm({ categoryTypes, onAdd }: AddItemFormProps) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState(categoryTypes[0]);

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!name || !price || !quantity) return;
        onAdd(name, price, quantity, category)
    }


    return (
        <div>
            <h2>Új elem hozzáadása</h2>
            <form onSubmit={(e) => handleSubmit(e)} class="add-form">
                <div class="row">


                    <div class="input-group">
                        <label>Termék neve</label>
                        <TextInput
                            value={name}
                            onChange={setName}
                            placeholder='Termék neve'
                        />
                    </div>

                    <div class="input-group">
                        <label>Termék ára</label>
                        <NumberInput
                            value={price}
                            minimum={1}
                            onChange={(val) => setPrice(Number(val))}
                            placeholder='Termék ára'
                        />
                    </div>

                    <div class="input-group">
                        <label>Vásárlandó mennyiség</label>
                        <NumberInput value={quantity} onChange={(val) => setQuantity(Number(val))} minimum={1} placeholder='Vásárlandó mennyiség' ></NumberInput>
                    </div>

                    <div class="input-group">
                        <label>Termék kategóriája</label>
                        <select name="category" value={category} onChange={(e) => setCategory(e.currentTarget.value)} >
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
        </div>
    )
}