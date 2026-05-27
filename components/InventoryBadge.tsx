export default function InventoryBadge({ status }: { status: string }) {
  const lower = status.toLowerCase()
  let classes = 'bg-gray-100 text-gray-700'

  if (lower.includes('out')) {
    classes = 'bg-red-100 text-red-700'
  } else if (lower.includes('low')) {
    classes = 'bg-yellow-100 text-yellow-700'
  } else if (lower.includes('pre')) {
    classes = 'bg-blue-100 text-blue-700'
  } else if (lower.includes('in') || lower.includes('stock')) {
    classes = 'bg-green-100 text-green-700'
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${classes}`}>
      {status}
    </span>
  )
}