export function Toggle({
  checked,
  onChange,
  size = "md",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
}) {
  const dims =
    size === "sm"
      ? { track: "h-5 w-9", knob: "h-4 w-4", tr: "translate-x-4" }
      : { track: "h-6 w-11", knob: "h-5 w-5", tr: "translate-x-5" };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative ${dims.track} rounded-full transition-colors duration-300 ${
        checked ? "bg-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 ${dims.knob} rounded-full bg-black shadow transition-transform duration-300 ${
          checked ? dims.tr : ""
        }`}
      />
    </button>
  );
}
