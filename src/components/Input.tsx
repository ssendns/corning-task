import type { InputProps } from '../types/props'

function Input({ label, value, onChange, error, type = 'text', min, step, options }: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-app-text">{label}</span>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-full rounded-xl border border-app-border px-3 py-2 text-sm text-app-text outline-none focus:border-app-accent"
        />
      )}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </label>
  )
}

export default Input
