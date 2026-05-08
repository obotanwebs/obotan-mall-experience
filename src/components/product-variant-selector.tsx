import type { VariantGroup } from "@/lib/products";

export function ProductVariantSelector({
  groups,
  selected,
  onChange,
}: {
  groups: VariantGroup[];
  selected: Record<string, string>;
  onChange: (type: string, value: string) => void;
}) {
  if (!groups.length) return null;
  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <div key={g.type}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{g.label}</p>
            <p className="text-xs font-medium">{selected[g.type]}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {g.options.map((opt) => {
              const active = selected[g.type] === opt.value;
              if (g.type === "color") {
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(g.type, opt.value)}
                    title={opt.value}
                    aria-label={opt.value}
                    className={`h-9 w-9 rounded-full border-2 transition ${active ? "border-primary scale-110" : "border-glass-border hover:border-primary/40"}`}
                    style={{ background: opt.swatch ?? "#888" }}
                  />
                );
              }
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(g.type, opt.value)}
                  className={`min-w-[3rem] rounded-xl px-3 py-2 text-sm font-medium border-2 transition ${active ? "border-primary bg-primary/5" : "border-glass-border hover:border-primary/40"}`}
                >
                  {opt.label ?? opt.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
