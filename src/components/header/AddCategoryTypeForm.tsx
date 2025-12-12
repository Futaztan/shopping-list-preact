import { useState } from "preact/hooks";
import { TextInput } from "../ui/TextInput";

type AddCategoryFormProps = {

    onAdd: (name: string) => void;
};
/**
 * Új kategória típusnak a hozzáadásának a form-ja
 *
 * @param onAdd - függvény, ami a submit után hozzáadja a listához a kategóriát
 * @returns Kategória hozzáadás form HTML kódja
 */
export function AddCategoryTypeForm({ onAdd }: AddCategoryFormProps) {

    const [categoryType, setCategoryType] = useState("")

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onAdd(categoryType)
    }

    return (
        <div>
            <h2>Új kategória hozzáadása</h2>
            <form onSubmit={(e) => handleSubmit(e)} class="add-form">
                <div class="row">

                    <div class="input-group">
                        <label>Új kategória neve:</label>
                        <TextInput value={categoryType} onChange={setCategoryType} placeholder='Kategória neve' ></TextInput>
                    </div>

                    <div class="input-group">
                        <label>&nbsp;</label>
                        <button type="submit" class="btn-primary">Hozzáadás (+)</button>
                    </div>
                </div>



            </form >

        </div>
    )
}