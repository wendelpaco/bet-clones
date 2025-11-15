import { Badge } from "@/components/ui/badge";
import { statusConfig, type Status } from "@/lib/validations";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

export function StatusBadge({ status }: { status: Status }) {
  // Garantir que o status é válido, caso contrário usar "ok" como padrão
  const validStatus: Status = ["ok", "warning", "critical"].includes(status)
    ? status
    : "ok";

  const config = statusConfig[validStatus];

  const icons = {
    ok: CheckCircle,
    warning: AlertTriangle,
    critical: AlertCircle,
  };

  const Icon = icons[validStatus];

  return (
    <Badge variant={config.color} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
