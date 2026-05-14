import { useState } from "react";
import { Settings, User, Bell, Shield, Lock, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui";
import {
  AccountSettings,
  PreferencesSettings,
  ThemeSettings,
  SecuritySettings,
  PrivacySettings,
} from "../components/settings";

type SettingsTab = "account" | "preferences" | "theme" | "security" | "privacy";

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: "account",
    label: "Account",
    icon: <User className="h-4 w-4" />,
    description: "Manage your account information",
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: <Bell className="h-4 w-4" />,
    description: "Customize your experience",
  },
  {
    id: "theme",
    label: "Theme",
    icon: <Settings className="h-4 w-4" />,
    description: "Choose your color scheme",
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield className="h-4 w-4" />,
    description: "Manage passwords and sessions",
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: <Eye className="h-4 w-4" />,
    description: "Control your data sharing",
  },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "preferences":
        return <PreferencesSettings />;
      case "theme":
        return <ThemeSettings />;
      case "security":
        return <SecuritySettings />;
      case "privacy":
        return <PrivacySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <span className="shrink-0 mt-0.5">{tab.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{tab.label}</p>
                    <p
                      className={`text-xs mt-0.5 ${
                        activeTab === tab.id
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-primary hover:underline py-1"
                  title="View documentation"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block text-sm text-primary hover:underline py-1"
                  title="Contact support"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="block text-sm text-primary hover:underline py-1"
                  title="Report an issue"
                >
                  Report Issue
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
