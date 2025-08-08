export default function KPI({label, value, sub}:{label:string, value:string|number, sub?:string}){
  return (
    <div className="rounded-2xl border border-neutral-800 p-4">
      <div className="text-neutral-400 text-sm">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-neutral-500 mt-1">{sub}</div>}
    </div>
  )
}
