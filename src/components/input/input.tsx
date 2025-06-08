export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-xs font-semibold font-sans mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-zinc-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  );
}
