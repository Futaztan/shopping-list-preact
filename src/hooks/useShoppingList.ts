import { useState, useEffect } from 'preact/hooks';
import { Item } from '../types/Item';
import { SoundType, useSounds } from './useSounds';


export function useShoppingList() {

     const [categoryTypes, setCategoryTypes] = useState(() =>
     {
        const saved = localStorage.getItem("shopping-list-category")
        if(saved)
        {
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
   


    const { playSound } = useSounds();


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

    return {
        items,
        setItems,
        addItem,
        deleteItem,
        togglePurchased,
        toggleEditMode,
        updateItem,
        categoryTypes,
        setCategoryTypes
    };
}