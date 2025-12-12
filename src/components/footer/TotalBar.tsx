type TotalBarProps = {
  isFiltered: boolean;
  filteredTotal: number;
  grandTotal: number;
};

/**
 * Itt található az végösszeg, ami az oldal alján van
 * Ha a felhasználó keresett, akkor külön látható a szúrt termékek összára
 *
 * @param isFiltered - szúrve van-e
 * @param filteredTotal - szűrt termékek összára
 * @param grandTotal - összes termék összára
 * @returns HTML kód, ami kiíratja ezeket
 */
export function TotalBar({ isFiltered, filteredTotal, grandTotal }: TotalBarProps) {
  return (
    <div class="total-bar">
      {isFiltered ? <><span>Talált termékek végösszege:</span><span class="total-price">{filteredTotal} Ft</span></> : null}
      <span>Végösszeg:</span>
      <span class="total-price">{grandTotal} Ft</span>
    </div>
  )
}