type TotalBarProps = {
  isFiltered: boolean;
  filteredTotal: number;
  grandTotal: number;
};


export function TotalBar({isFiltered,filteredTotal,grandTotal} : TotalBarProps) {
    return (
      <div class="total-bar">
        {isFiltered ? <><span>Talált termékek végösszege:</span><span class="total-price">{filteredTotal} Ft</span></> : null}
        <span>Végösszeg:</span>
        <span class="total-price">{grandTotal} Ft</span>
      </div>
    )
  }