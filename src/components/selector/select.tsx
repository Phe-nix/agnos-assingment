export default function Select({
  label,
  options,
  value,
  onChange,
  name,
}: {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
}) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-xs font-semibold mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className="border border-zinc-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
