import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusConfig, type Status } from "@/lib/validations";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

const icons = {
  ok: CheckCircle,
  warning: AlertTriangle,
  critical: AlertCircle,
};

export function StatusSelect({
  value,
  onValueChange,
  label = "Status",
}: {
  value: Status;
  onValueChange: (value: Status) => void;
  label?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(statusConfig) as Status[]).map((status) => {
            const config = statusConfig[status];
            const Icon = icons[status];
            return (
              <SelectItem key={status} value={status}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{config.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {config.description}
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
