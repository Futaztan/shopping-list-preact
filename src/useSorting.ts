import { useState } from 'preact/hooks';

import { Item } from './Item';
import { Sort } from './SortedEnum';

export function useSorting(items: Item[], setItems: (items: Item[]) => void) {

    const [sortedState, setSortedState] = useState<Sort[]>([Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE]);

    function resetSort() {
        setSortedState([Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE]);
    }

    function sortByPurchased() {
        if (sortedState[0] === Sort.NONE) {
            setItems([...items].sort((a, b) => Number(a.purchased) - Number(b.purchased)));
            setSortedState([Sort.ASC, Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE]);
        } else if (sortedState[0] === Sort.ASC) {
            setItems([...items].sort((a, b) => Number(b.purchased) - Number(a.purchased)));
            setSortedState([Sort.DESC, Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE]);
        } else {
            sortById();
        }
    }

    function sortByName() {
        if (sortedState[1] === Sort.NONE) {
            setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
            setSortedState([Sort.NONE, Sort.ASC, Sort.NONE, Sort.NONE, Sort.NONE]);
        } else if (sortedState[1] === Sort.ASC) {
            setItems([...items].sort((a, b) => b.name.localeCompare(a.name)));
            setSortedState([Sort.NONE, Sort.DESC, Sort.NONE, Sort.NONE, Sort.NONE]);
        } else {
            sortById();
        }
    }

    function sortByPrice() {
        if (sortedState[2] === Sort.NONE) {
            setItems([...items].sort((a, b) => a.price - b.price));
            setSortedState([Sort.NONE, Sort.NONE, Sort.ASC, Sort.NONE, Sort.NONE]);
        } else if (sortedState[2] === Sort.ASC) {
            setItems([...items].sort((a, b) => b.price - a.price));
            setSortedState([Sort.NONE, Sort.NONE, Sort.DESC, Sort.NONE, Sort.NONE]);
        } else {
            sortById();
        }
    }

    function sortByCategory() {
        if (sortedState[3] === Sort.NONE) {
            setItems([...items].sort((a, b) => a.category.localeCompare(b.category)));
            setSortedState([Sort.NONE, Sort.NONE, Sort.NONE, Sort.ASC, Sort.NONE]);
        } else if (sortedState[3] === Sort.ASC) {
            setItems([...items].sort((a, b) => b.category.localeCompare(a.category)));
            setSortedState([Sort.NONE, Sort.NONE, Sort.NONE, Sort.DESC, Sort.NONE]);
        } else {
            sortById();
        }
    }

    function sortBySumPrice() {
        if (sortedState[4] === Sort.NONE) {
            setItems([...items].sort((a, b) => (a.price * a.quantity) - (b.price * b.quantity)));
            setSortedState([Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE, Sort.ASC]);
        } else if (sortedState[4] === Sort.ASC) {
            setItems([...items].sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity)));
            setSortedState([Sort.NONE, Sort.NONE, Sort.NONE, Sort.NONE, Sort.DESC]);
        } else {
            sortById();
        }
    }

    function sortById() {
        setItems([...items].sort((a, b) => a.id - b.id));
        resetSort();
    }

 
    return {
        sortedState,      
        sortByPurchased,
        sortByName,
        sortByPrice,
        sortByCategory,
        sortBySumPrice,
        sortById
    };
}