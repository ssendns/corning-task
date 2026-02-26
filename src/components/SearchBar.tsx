import { Search } from 'lucide-react'
import type { SearchBarProps } from '../types/props'

function SearchBar({ search, onSearchChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-app-border bg-white py-2 pl-9 pr-3 text-sm text-app-text outline-none placeholder:text-app-subtle focus:border-app-accent"
      />
    </div>
  )
}

export default SearchBar
