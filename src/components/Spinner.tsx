import { cn } from "@/lib/utils"

export const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("mx-2 h-5 w-5 animate-spin ", className)}
    viewBox="0 0 24 24"
  >
    <circle
      className="fill-transparent opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)
