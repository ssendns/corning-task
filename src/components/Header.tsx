interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
}

function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="w-full border-b-2 border-app-border bg-white px-4 py-4 shadow-sm">
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name..."
        className="w-full rounded-xl border border-app-border bg-white px-3 py-2 text-sm text-app-text outline-none placeholder:text-app-subtle focus:border-app-accent"
      />
    </header>
  )
}

export default Header
