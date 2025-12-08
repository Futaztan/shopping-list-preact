import { Item } from "../types/Item";

type ItemRowProps = {
  item: Item;
  onTogglePurchased: (id: number) => void;
  onStartEditing: (item: Item) => void;
  onDelete: (id: number) => void;
};


export function ItemRow({item,onTogglePurchased,onStartEditing,onDelete} : ItemRowProps) {
    return (
      <div key={item.id} class={`item-card ${item.purchased ? 'purchased' : ''} ${item.hidden ? 'hidden' : ''}`} >
        <input
          type="checkbox"
          checked={item.purchased}
          onInput={() => onTogglePurchased(item.id)}
          class="checkbox"
        />

        <div class="item-details">
          <span class="item-name">{item.name}</span>
          <span class="item-info">
            {item.quantity} db x {item.price} Ft
          </span>

        </div>
        <div class="item-details">
          <span class="item-name">{item.price} Ft</span>


        </div>
        <div class="item-details">
          <span class="item-name">{item.category}</span>
        </div>
        <div class="item-price">
          {item.quantity * item.price} Ft
        </div>

        <div class="actions">
          <button onClick={() => onStartEditing(item)} class="btn-edit" title="Szerkesztés">✏️</button>
          <button onClick={() => onDelete(item.id)} class="btn-delete" title="Törlés">🗑️</button>
        </div>
      </div>
    )
  }
