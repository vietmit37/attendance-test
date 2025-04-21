export default function SkeletonRow() {
  return (
    <tr className="snap-start border-t-2 border-amber-100">
      <td className="px-10 py-2">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-10 py-2">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-10 py-2">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="px-10 py-2">
        <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
      </td>
      {Array(31)
        .fill(0)
        .map((_, i) => (
          <td key={i} className="px-4 py-2">
            <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </td>
        ))}
    </tr>
  );
}
