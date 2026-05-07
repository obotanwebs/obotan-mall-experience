export function GoogleMap({ className = "" }: { className?: string }) {
  const query = encodeURIComponent("Ashongman Estate Last Stop, Greater Accra, Ghana");
  const src = `https://www.google.com/maps?q=${query}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-3xl border border-glass-border ${className}`}>
      <iframe
        title="OBOTANMALL location — Ashongman Estate, Last Stop, Greater Accra, Ghana"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full h-[280px] sm:h-[340px] md:h-[400px] block border-0"
      />
    </div>
  );
}
