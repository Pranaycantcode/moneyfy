interface SummaryCardProps {
  title: string;
  value: string;
  helperText: string;
}

const SummaryCard = ({ title, value, helperText }: SummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-3 text-2xl font-semibold">{value}</h2>
      <p className="mt-2 text-sm text-slate-500">{helperText}</p>
    </div>
  );
};

export default SummaryCard;