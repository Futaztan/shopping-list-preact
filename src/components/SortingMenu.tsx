import { Sort } from "../types/SortedEnum"

type SortingMenuProps = {

    onSortByPurchased: () => void
    onSortByName: () => void
    onSortByPrice: () => void
    onSortByCategory: () => void
    onSortBySumPrice: () => void
    sortedState: Sort[]

}

export function SortingMenu({ onSortByPurchased, onSortByName, onSortByPrice, onSortByCategory, onSortBySumPrice, sortedState }: SortingMenuProps) {

    return (
        <div class="header-row">


            <button onClick={onSortByPurchased}>
                Megvásárolt-e  {sortedState[0] === Sort.ASC ? <span>▲</span> : sortedState[0] === Sort.DESC ? <span>▼</span> : null}
            </button >
            <button onClick={onSortByName}>
                Név {sortedState[1] === Sort.ASC ? <span>▲</span> : sortedState[1] === Sort.DESC ? <span>▼</span> : null}
            </button>
            <button onClick={onSortByPrice}>
                Egységár {sortedState[2] === Sort.ASC ? <span>▲</span> : sortedState[2] === Sort.DESC ? <span>▼</span> : null}
            </button>

            <button onClick={onSortByCategory}>
                Kategória {sortedState[3] === Sort.ASC ? <span>▲</span> : sortedState[3] === Sort.DESC ? <span>▼</span> : null}
            </button>
            <button onClick={onSortBySumPrice}>
                Ár {sortedState[4] === Sort.ASC ? <span>▲</span> : sortedState[4] === Sort.DESC ? <span>▼</span> : null}
            </button>

        </div>
    )
}