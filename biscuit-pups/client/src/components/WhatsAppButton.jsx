/** Looks like a WhatsApp button but is deliberately inert: it opens nothing. */
export default function WhatsAppButton({ className = '', children }) {
  return (
    <button type="button" className={`btn btn-whatsapp ${className}`} onClick={(e) => e.preventDefault()}>
      {children}
    </button>
  );
}
