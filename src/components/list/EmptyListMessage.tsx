/**
 * HA üres a lista ez jelenik meg
 *
 * @returns üres lista üzenet
 */
export function EmptyListMessage() {
  return (
    <div style={{ textAlign: "center", padding: "40px", opacity: 0.7 }}>
      <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
      <h3>A lista jelenleg üres.</h3>
      </div>
    
    </div>
  );
}