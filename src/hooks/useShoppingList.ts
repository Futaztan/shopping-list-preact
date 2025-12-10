import { useState, useEffect } from 'preact/hooks';
import { Item } from '../types/Item';
import { SoundType } from './useSounds';


export function useShoppingList(playSound: (type: SoundType) => void) {

    const [categoryTypes, setCategoryTypes] = useState(() => {
        const saved = localStorage.getItem("shopping-list-category")
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Hiba a betöltéskor:", e);
                return [];
            }
        }
        return ["Élelmiszer", "Ital", "Bútor"]

    });
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






    useEffect(() => {
        localStorage.setItem("shopping-list-data", JSON.stringify(items));
    }, [items]);
    useEffect(() => {
        localStorage.setItem("shopping-list-category", JSON.stringify(categoryTypes));
    }, [categoryTypes]);


    function addItem(newName: string, newPrice: number, newQuantity: number, newCategory: string, e: SubmitEvent) {
        e.preventDefault();
        if (!newName || !newPrice) return;
        const newItem: Item = {
            name: newName, price: newPrice, quantity: newQuantity, category: newCategory, id: Date.now(), purchased: false, edited: false, hidden: false
        }
        setItems([...items, newItem])
        playSound(SoundType.ADD);
    }

    function deleteItem(id: number) {
        setItems(items.filter((item) => item.id !== id))
        playSound(SoundType.DELETE);
    }

    function togglePurchased(id: number) {
        const newlist = items.map(item => {
            if (item.id === id)
                return { ...item, purchased: !item.purchased }
            return item
        })
        setItems(newlist)
    }


    function toggleEditMode(id: number) {
        const newlist = items.map(item => {

            if (item.id === id)
                return { ...item, edited: true }
            return { ...item, edited: false }
        })
        setItems(newlist)
    }


    function updateItem(id: number, updatedData: Partial<Item>) {

        const newlist = items.map(item => {
            if (item.id === id)
                return { ...item, ...updatedData, edited: false }
            return item
        })
        setItems(newlist)
    }
    function downloadItems() {
        // 1. Átkonvertáljuk az items tömböt szöveggé (a null, 2 miatt szépen formázott lesz)
        const cleanItem = items.map(({ edited, hidden, ...keep }) => keep);
        const jsonString = JSON.stringify(cleanItem, null, 2);

        // 2. Létrehozunk egy Blob-ot (Binary Large Object)
        const blob = new Blob([jsonString], { type: "application/json" });

        // 3. Létrehozunk egy ideiglenes URL-t, ami erre a blobra mutat
        const url = URL.createObjectURL(blob);

        // 4. Létrehozunk egy láthatatlan link elemet
        const link = document.createElement('a');
        link.href = url;
        link.download = "bevasarlolista.json"; // Ez lesz a fájl neve

        // 5. Hozzáadjuk a dokumentumhoz, rákattintunk, majd töröljük
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 6. Takarítás: felszabadítjuk az URL-t
        URL.revokeObjectURL(url);
    }

    function uploadItems(e) {
        const fileReader = new FileReader();

        if (e.target.files?.[0]) {

            fileReader.readAsText(e.target.files[0], "UTF-8");

            fileReader.onload = (event) => {
                try {
                    if (!event.target?.result) return;

                    // 1. Szöveg átalakítása objektummá
                    const parsedData = JSON.parse(event.target.result as string);

                    // Ellenőrzés: biztos, hogy tömböt kaptunk?
                    if (!Array.isArray(parsedData)) {
                        alert("Hibás fájlformátum! (Nem lista)");
                        return;
                    }

                    // 2. ADATOK HELYREÁLLÍTÁSA (A hiányzó mezők visszapótlása)
                    const restoredItems: Item[] = parsedData.map((item) => ({
                        ...item,          // Megtartjuk a nevet, árat, id-t, stb.
                        edited: false,    // Visszatesszük az alapértelmezett értéket
                        hidden: false     // Visszatesszük ezt is
                    }));

                    // 3. Lista felülírása az új adatokkal
                    setItems(restoredItems);

                    // Opcionális: sikeres visszajelzés
                    // alert("Sikeres betöltés!");

                } catch (error) {
                    console.error(error);
                    alert("Hiba történt a fájl beolvasásakor!");
                }
            };
        }
    }

    return {
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
    };
}