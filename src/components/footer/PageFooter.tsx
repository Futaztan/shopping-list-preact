
/**
 * Ez található az oldal alján, a footerben
 *
 * @returns HTMl kód
 */

export function PageFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p style="text-align:center">&copy; {currentYear} - Minden jog fenntartva.</p>
      
    </footer>
  );
}