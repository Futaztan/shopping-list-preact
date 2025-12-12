import { useState } from "preact/hooks";
import { TextInput } from "../ui/TextInput";


type SearchMenuProps = {

    onSearch: (attribute: string, text: string, operator: string) => void;
};

/**
 * Elemek szűrésének a kódja
 *
 * @param onSearch -  ez végzi el a keresést
 * @returns Elem keresésének HTML kódja
 */
export function SearchMenu({ onSearch }: SearchMenuProps) {


    const [searchedText, setSearchedText] = useState("")
    const [searchedAttribute, setSearchedAttribute] = useState("Név")
    const [searchOperator, setSearchOperator] = useState("<")

    return (
        <div>
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
                <button onClick={() => onSearch(searchedAttribute, searchedText, searchOperator)} class="btn-primary">Keresés</button>
                <button onClick={() => {
                    setSearchedText("");
                    onSearch(searchedAttribute, "", searchOperator);
                }} class="btn-primary">Keresés törlése</button>
            </div>
        </div>
    )
}