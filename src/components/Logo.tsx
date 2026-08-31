import logoImage from '../assets/logo.png'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={logoImage}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl shadow-lg shadow-volt/20"
      />
      <span className="font-display text-lg font-semibold tracking-tight text-cloud">
        Dad<span className="text-ember"> &amp; His </span>Lads
      </span>
    </span>
  )
}
