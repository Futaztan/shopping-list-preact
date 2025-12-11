import { useState, useEffect } from 'preact/hooks';
import { Item } from '../types/Item';
import { SoundType } from './useSounds';
import { ToastType } from '../types/Toast';


export function useShoppingList(playSound: (type: SoundType) => void, onSuccess: (msg: string, type: ToastType) => void) {

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
        onSuccess("Sikeres termék felvétel!", "success")
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
        onSuccess("Sikeres termék módosítás!", "success")
    }
    function downloadItems() {
        const cleanItem = items.map(({ edited, hidden, ...keep }) => keep);
        const jsonString = JSON.stringify(cleanItem, null, 2);

        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "bevasarlolista.json";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        onSuccess("Sikeres letöltés!", "success")

    }

    function uploadItems(e) {
        const fileReader = new FileReader();

        if (e.target.files?.[0]) {

            fileReader.readAsText(e.target.files[0], "UTF-8");

            fileReader.onload = (event) => {
                try {
                    if (!event.target?.result) return;


                    const parsedData = JSON.parse(event.target.result as string);


                    if (!Array.isArray(parsedData)) {
                        alert("Hibás fájlformátum! (Nem lista)");
                        return;
                    }


                    const restoredItems: Item[] = parsedData.map((item) => ({
                        ...item,
                        edited: false,
                        hidden: false
                    }));


                    setItems(restoredItems);
                    onSuccess("Sikeres betöltés!", "success")



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