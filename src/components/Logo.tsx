import { Hospital } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-md font-bold text-primary cursor-default">
      <Hospital size={32} />
      <span>
        Amor <span className="text-red-400">Saúde</span>
      </span>
    </div>
  );
}
