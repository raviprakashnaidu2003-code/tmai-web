type Currency = {
  code: string;
  label: string;
  flag: string;
};

type Props = {
  label: string;
  value: string;
  currencies: Currency[];
  onChange: (value: string) => void;
};

export default function CurrencySelect({
  label,
  value,
  currencies,
  onChange,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select Country</option>
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.label} ({c.code})
          </option>
        ))}
      </select>
    </div>
  );
}
