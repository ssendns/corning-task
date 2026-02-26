import type { SearchBarProps } from '../types/props'

function SearchBar({ search, onSearchChange, placeholder }: SearchBarProps) {
  return (
    <input
      type="text"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-app-border bg-white px-3 py-2 text-sm text-app-text outline-none placeholder:text-app-subtle focus:border-app-accent"
    />
  )
}

export default SearchBar
