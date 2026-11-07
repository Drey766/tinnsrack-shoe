import { Minus, Plus } from "lucide-react";

// Used inside <details className="group accordion">: plus when closed, minus when open.
export default function AccordionIcon({ size = 16 }: { size?: number }) {
  return (
    <span className="shrink-0 text-stone" aria-hidden="true">
      <Plus size={size} strokeWidth={1.4} className="group-open:hidden" />
      <Minus size={size} strokeWidth={1.4} className="hidden group-open:block" />
    </span>
  );
}
