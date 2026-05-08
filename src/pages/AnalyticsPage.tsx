import { useState } from "react";
import { AnalyticsCard } from "../components/dashboard";
import {
  Button,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "../components/ui";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  Eye,
  MousePointerClick,
} from "lucide-react";
import type { AnalyticsCard as AnalyticsCardType } from "../lib/types";

export function AnalyticsPage() {
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);

  // KPI Cards for Analytics
  const kpiCards: AnalyticsCardType[] = [
    {
      id: "1",
      title: "Page Views",
      value: "45,823",
      change: 15,
      changeType: "increase",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Unique Visitors",
      value: "28,943",
      change: 12,
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Click Through Rate",
      value: "4.82%",
      change: 8,
      changeType: "increase",
      icon: <MousePointerClick className="h-5 w-5" />,
    },
    {
      id: "4",
      title: "Bounce Rate",
      value: "32.5%",
      change: 3,
      changeType: "decrease",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  // Detailed analytics metrics
  const detailedMetrics: AnalyticsCardType[] = [
    {
      id: "5",
      title: "Avg Session Duration",
      value: "5m 42s",
      change: 11,
      changeType: "increase",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      id: "6",
      title: "Revenue per Visitor",
      value: "$18.50",
      change: 22,
      changeType: "increase",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: "7",
      title: "Conversion Rate",
      value: "3.84%",
      change: 5,
      changeType: "increase",
      icon: <Target className="h-5 w-5" />,
    },
    {
      id: "8",
      title: "Customer Lifetime Value",
      value: "$2,450",
      change: 18,
      changeType: "increase",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Detailed analytics and performance metrics for your platform.
          </p>
        </div>

        <Modal open={isInsightModalOpen} onOpenChange={setIsInsightModalOpen}>
          <ModalTrigger asChild>
            <Button className="w-full sm:w-auto">View Monthly Insights</Button>
          </ModalTrigger>

          <ModalContent size="lg">
            <ModalHeader>
              <ModalTitle>Monthly Analytics Snapshot</ModalTitle>
              <ModalDescription>
                Performance highlights from the last 30 days with suggested
                focus areas for the next sprint.
              </ModalDescription>
            </ModalHeader>

            <div className="space-y-4 text-sm">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Page Views</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    45,823
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    +15% vs previous month
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Conversion</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    3.84%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    +0.42% uplift
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Bounce Rate</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    32.5%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    -3% improvement
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Recommended Actions
                </h3>
                <ul className="mt-2 list-disc list-inside space-y-1.5 text-muted-foreground">
                  <li>
                    Prioritize mobile landing page optimization to improve
                    session depth by at least 10%.
                  </li>
                  <li>
                    Expand organic content for top-performing product pages to
                    capture additional search traffic.
                  </li>
                  <li>
                    Run A/B tests on pricing CTAs to target a 4.2% conversion
                    milestone.
                  </li>
                </ul>
              </div>
            </div>

            <ModalFooter>
              <Button
                variant="outline"
                onClick={() => setIsInsightModalOpen(false)}
              >
                Close
              </Button>
              <Button onClick={() => setIsInsightModalOpen(false)}>
                Export Summary
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      {/* Time Period Selector */}
      <div className="flex flex-wrap gap-2">
        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"].map(
          (period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === "Last 30 Days"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {period}
            </button>
          ),
        )}
      </div>

      {/* Primary KPI Cards - 4 columns */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Key Performance Indicators
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((card) => (
            <AnalyticsCard
              key={card.id}
              card={card}
              variant="default"
              onClick={() => console.log(`Analyzing: ${card.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Traffic Sources Chart */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Traffic Overview
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Traffic Sources */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Traffic Sources
            </h3>
            <div className="space-y-3">
              {[
                { name: "Direct", value: 35, percentage: 35 },
                { name: "Organic Search", value: 45, percentage: 45 },
                { name: "Referral", value: 12, percentage: 12 },
                { name: "Social Media", value: 8, percentage: 8 },
              ].map((source) => (
                <div key={source.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      {source.name}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Top Pages</h3>
            <div className="space-y-2">
              {[
                { page: "Home Page", views: "12,543" },
                { page: "Product Page", views: "8,932" },
                { page: "Pricing Page", views: "6,234" },
                { page: "Blog Post", views: "4,521" },
                { page: "Contact Page", views: "2,103" },
              ].map((page) => (
                <div
                  key={page.page}
                  className="flex justify-between items-center p-2 hover:bg-muted rounded transition-colors"
                >
                  <span className="text-sm text-foreground">{page.page}</span>
                  <span className="text-sm font-semibold text-primary">
                    {page.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Cards - 2x2 grid */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Detailed Metrics
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {detailedMetrics.map((card) => (
            <AnalyticsCard
              key={card.id}
              card={card}
              variant="detailed"
              onClick={() => console.log(`Analyzing: ${card.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Device Analytics */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Device Analytics
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { device: "Desktop", users: "18,543", percentage: 64 },
            { device: "Mobile", users: "8,234", percentage: 28 },
            { device: "Tablet", users: "2,166", percentage: 8 },
          ].map((device) => (
            <div
              key={device.device}
              className="bg-card border border-border rounded-lg p-6"
            >
              <p className="text-sm text-muted-foreground font-medium mb-2">
                {device.device}
              </p>
              <p className="text-2xl font-bold text-foreground mb-2">
                {device.users}
              </p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${device.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {device.percentage}% of traffic
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Data */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Top Geographic Regions
        </h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Region
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                    Users
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                    Sessions
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    region: "United States",
                    users: "15,234",
                    sessions: "28,543",
                    conversion: "3.85%",
                  },
                  {
                    region: "United Kingdom",
                    users: "8,234",
                    sessions: "14,321",
                    conversion: "3.42%",
                  },
                  {
                    region: "Canada",
                    users: "4,123",
                    sessions: "7,654",
                    conversion: "2.98%",
                  },
                  {
                    region: "Australia",
                    users: "3,456",
                    sessions: "5,432",
                    conversion: "3.12%",
                  },
                  {
                    region: "Germany",
                    users: "2,876",
                    sessions: "4,321",
                    conversion: "2.76%",
                  },
                ].map((row) => (
                  <tr
                    key={row.region}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-foreground">{row.region}</td>
                    <td className="text-right py-3 px-4 text-foreground">
                      {row.users}
                    </td>
                    <td className="text-right py-3 px-4 text-foreground">
                      {row.sessions}
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-primary">
                      {row.conversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
