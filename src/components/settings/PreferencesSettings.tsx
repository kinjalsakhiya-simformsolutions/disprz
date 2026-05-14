import { useState } from "react";
import { Bell, Globe, Eye, Type } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "../ui";
import type { UserPreferences } from "../../lib/types";

interface PreferencesSettingsProps {
  initialData?: UserPreferences;
  onSave?: (data: UserPreferences) => void;
  isLoading?: boolean;
}

export function PreferencesSettings({
  initialData,
  onSave,
  isLoading = false,
}: PreferencesSettingsProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    initialData || {
      language: "en",
      emailNotifications: true,
      pushNotifications: true,
      sidebarCollapse: false,
      compactView: false,
      autoLogout: 15,
    },
  );
  const [success, setSuccess] = useState(false);

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectChange = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save to localStorage
    localStorage.setItem("userPreferences", JSON.stringify(preferences));

    onSave?.(preferences);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const toggleOption = (
    icon: React.ReactNode,
    label: string,
    description: string,
    checked: boolean,
    onChange: () => void,
  ) => (
    <div className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex-1">
          <label className="text-sm font-medium cursor-pointer block">
            {label}
          </label>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? "bg-primary" : "bg-border"
          }`}
          role="switch"
          aria-checked={checked}
          aria-label={`Toggle ${label}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Customize your experience and notification settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notifications Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="space-y-2">
              {toggleOption(
                <Bell className="h-4 w-4" />,
                "Email Notifications",
                "Receive notifications via email",
                preferences.emailNotifications as boolean,
                () => handleToggle("emailNotifications"),
              )}
              {toggleOption(
                <Bell className="h-4 w-4" />,
                "Push Notifications",
                "Receive browser push notifications",
                preferences.pushNotifications as boolean,
                () => handleToggle("pushNotifications"),
              )}
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Accessibility</h3>
            </div>
            <div className="space-y-2">
              {toggleOption(
                <Eye className="h-4 w-4" />,
                "Compact View",
                "Use a condensed layout with smaller spacing",
                preferences.compactView as boolean,
                () => handleToggle("compactView"),
              )}
              {toggleOption(
                <Type className="h-4 w-4" />,
                "Collapse Sidebar by Default",
                "Start with the sidebar in collapsed state",
                preferences.sidebarCollapse as boolean,
                () => handleToggle("sidebarCollapse"),
              )}
            </div>
          </div>

          {/* Localization Section */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Localization</h3>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => handleSelectChange("language", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          {/* Security Section */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Security</h3>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Auto Logout (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={preferences.autoLogout}
                onChange={(e) =>
                  handleSelectChange("autoLogout", e.target.value)
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Auto logout time"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Automatically log out after this period of inactivity
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md text-sm">
              ✓ Preferences updated successfully
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Save Preferences
            </Button>
            <Button type="button" variant="outline">
              Reset to Default
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
