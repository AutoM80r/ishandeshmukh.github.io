export default function Footer() {
  return (
    <footer
      className="flex justify-between items-center px-[5vw] py-5"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono-var)', fontSize: '0.65rem', color: 'var(--muted)' }}
    >
      <span>&copy; 2026 · <em className="not-italic" style={{ color: 'var(--green)' }}>ishan-deshmukh</em></span>
      <span>built with <em className="not-italic" style={{ color: 'var(--green)' }}>obsession</em> &amp; embedded C</span>
    </footer>
  )
}
