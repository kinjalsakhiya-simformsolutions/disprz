import { Card, CardContent, CardHeader, CardTitle } from "../ui";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";
import type { AnalyticsCard as AnalyticsCardType } from "../../lib/types";

interface Props {
  card: AnalyticsCardType;
  variant?: "default" | "compact" | "detailed";
  onClick?: () => void;
  className?: string;
}

export function AnalyticsCard({
  card,
  variant = "default",
  onClick,
  className = "",
}: Props) {
  const isIncrease = card.changeType === "increase";
  const trendColor = isIncrease
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const bgColor = isIncrease
    ? "bg-green-20 dark:bg-green-950/20"
    : "bg-red-20 dark:bg-red-950/20";

  // Default variant - Standard card
  if (variant === "default") {
    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${className}`}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {card.title}
          </CardTitle>
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${bgColor}`}
          >
            <div className="text-primary">{card.icon}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {card.value}
          </div>
          <div
            className={`flex items-center gap-2 text-xs font-medium ${trendColor}`}
          >
            {isIncrease ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>
              {isIncrease ? "+" : ""}
              {card.change}%
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact variant - Smaller, minimal design
  if (variant === "compact") {
    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-md ${className}`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {card.title}
              </p>
              <p className="text-xl font-bold text-foreground truncate">
                {card.value}
              </p>
            </div>
            <div
              className={`h-8 w-8 rounded shrink-0 flex items-center justify-center ${bgColor}`}
            >
              <div className="text-primary text-lg">{card.icon}</div>
            </div>
          </div>
          <div
            className={`mt-2 flex items-center gap-1 text-xs font-medium ${trendColor}`}
          >
            {isIncrease ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isIncrease ? "+" : ""}
              {card.change}%
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Detailed variant - Expanded information
  if (variant === "detailed") {
    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${className}`}
        onClick={onClick}
      >
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-base text-foreground">
                {card.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Performance overview
              </p>
            </div>
            <div
              className={`h-12 w-12 rounded-lg flex items-center justify-center transition-colors ${bgColor}`}
            >
              <div className="text-primary text-xl">{card.icon}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Value</p>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Change</span>
              <div
                className={`flex items-center gap-1 font-semibold ${trendColor}`}
              >
                {isIncrease ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>
                  {isIncrease ? "+" : ""}
                  {card.change}%
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${bgColor}`}
                style={{ width: `${Math.min(card.change * 5, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
