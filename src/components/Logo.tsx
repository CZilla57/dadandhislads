export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ember to-volt text-lg shadow-lg shadow-volt/20"
      >
        👨‍👦‍👦
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-cloud">
        Dad<span className="text-ember"> &amp; His </span>Lads
      </span>
    </span>
  )
}
