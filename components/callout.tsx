import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  Alert02Icon,
  Idea01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const typeMap = {
  info: {
    icon: InformationCircleIcon,
    className:
      "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300",
  },
  warning: {
    icon: Alert02Icon,
    className:
      "border-yellow-500/20 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300",
  },
  caution: {
    icon: Alert02Icon,
    className: "border-red-500/20 bg-red-500/5 text-red-700 dark:text-red-300",
  },
  tip: {
    icon: Idea01Icon,
    className:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  },
};

export default function Callout({
  type = "info",
  title,
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Alert> & {
  type?: keyof typeof typeMap;
  icon?: React.ReactNode;
}) {
  const activeType = typeMap[type] || typeMap.info;
  const IconComponent = activeType.icon;

  return (
    <Alert
      className={cn(
        "not-prose mt-8 mb-6 flex flex-col items-start gap-4 rounded-xl border p-4",
        activeType.className,
        className
      )}
      {...props}
    >
      <div className="mt-1 flex shrink-0 items-center gap-2">
        {icon || (
          <HugeiconsIcon
            icon={IconComponent}
            strokeWidth={2}
            className="size-4"
          />
        )}
        {title && <AlertTitle className="font-semibold">{title}</AlertTitle>}
      </div>
      <AlertDescription className="text-sm transition-opacity [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-100">
        {children}
      </AlertDescription>
    </Alert>
  );
}
