import { useSorting } from "../../hooks/useSorting"
import { Item } from "../../types/Item";
import { Sort } from "../../types/SortedEnum"

type SortingMenuProps = {

   items: Item[] ;
   setItems : (items: Item[]) => void

}
/**
 * Rendezés menu
 *
 * @param item - Kiírandó elem
 * @param items - Elemek lista hook
 * @param setItems - Elemek lista hook
 * @returns Rendezés menu
 */

export function SortingMenu({items, setItems} : SortingMenuProps) {

     const {
        sortedState,
        sortByPurchased,
        sortByName,
        sortByPrice,
        sortByCategory,
        sortBySumPrice
      } = useSorting(items, setItems);
    


    return (
        <div class="header-row">


            <button onClick={sortByPurchased}>
                Megvásárolt-e  {sortedState[0] === Sort.ASC ? <span>▲</span> : sortedState[0] === Sort.DESC ? <span>▼</span> : null}
            </button >
            <button onClick={sortByName}>
                Név {sortedState[1] === Sort.ASC ? <span>▲</span> : sortedState[1] === Sort.DESC ? <span>▼</span> : null}
            </button>
            <button onClick={sortByPrice}>
                Egységár {sortedState[2] === Sort.ASC ? <span>▲</span> : sortedState[2] === Sort.DESC ? <span>▼</span> : null}
            </button>

            <button onClick={sortByCategory}>
                Kategória {sortedState[3] === Sort.ASC ? <span>▲</span> : sortedState[3] === Sort.DESC ? <span>▼</span> : null}
            </button>
            <button onClick={sortBySumPrice}>
                Ár {sortedState[4] === Sort.ASC ? <span>▲</span> : sortedState[4] === Sort.DESC ? <span>▼</span> : null}
            </button>

        </div>
    )
}