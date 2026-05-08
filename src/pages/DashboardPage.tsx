import { AnalyticsCard } from "../components/dashboard";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  TrendingDown,
} from "lucide-react";
import type { AnalyticsCard as AnalyticsCardType } from "../lib/types";

export function DashboardPage() {
  // Primary KPI Cards
  const primaryCards: AnalyticsCardType[] = [
    {
      id: "1",
      title: "Total Users",
      value: "12,543",
      change: 12,
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Revenue",
      value: "$125,430",
      change: 23,
      changeType: "increase",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Active Sessions",
      value: "4,834",
      change: 8,
      changeType: "increase",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      id: "4",
      title: "Conversion Rate",
      value: "3.84%",
      change: 5,
      changeType: "decrease",
      icon: <Target className="h-5 w-5" />,
    },
  ];

  // Secondary analytics cards for additional metrics
  const secondaryCards: AnalyticsCardType[] = [
    {
      id: "5",
      title: "New Signups",
      value: "342",
      change: 18,
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "6",
      title: "Growth Rate",
      value: "23.5%",
      change: 4,
      changeType: "increase",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your key metrics and analytics.
        </p>
      </div>

      {/* Primary Analytics Cards - 4 columns */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Key Metrics
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {primaryCards.map((card) => (
            <AnalyticsCard
              key={card.id}
              card={card}
              variant="default"
              onClick={() => console.log(`Clicked: ${card.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Secondary Analytics Cards - 2 columns */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Additional Metrics
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {secondaryCards.map((card) => (
            <AnalyticsCard
              key={card.id}
              card={card}
              variant="detailed"
              onClick={() => console.log(`Clicked: ${card.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Analytics
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Revenue Trend</h3>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +23% vs last month
              </span>
            </div>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                📊 Revenue chart placeholder
              </p>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">User Growth</h3>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +12% vs last month
              </span>
            </div>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                📈 User growth chart placeholder
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Quick Stats
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              Total Revenue
            </p>
            <p className="text-2xl font-bold text-foreground">$485,230</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              ↑ 18% from last quarter
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              Active Users Today
            </p>
            <p className="text-2xl font-bold text-foreground">2,845</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              ↑ 8% from yesterday
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              Avg Session Duration
            </p>
            <p className="text-2xl font-bold text-foreground">4m 32s</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
              ↓ 2% from last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
