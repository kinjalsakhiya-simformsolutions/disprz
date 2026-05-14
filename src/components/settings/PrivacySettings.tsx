import { useState } from "react";
import { Eye, Share2, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "../ui";

interface PrivacySetting {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
}

export function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "profile-visibility",
      icon: <Eye className="h-4 w-4" />,
      label: "Public Profile",
      description: "Allow others to view your profile information",
      enabled: false,
    },
    {
      id: "analytics-sharing",
      icon: <Share2 className="h-4 w-4" />,
      label: "Analytics Sharing",
      description: "Share analytics data to help improve the platform",
      enabled: true,
    },
    {
      id: "search-visibility",
      icon: <Lock className="h-4 w-4" />,
      label: "Search Visibility",
      description: "Allow search engines to index your profile",
      enabled: false,
    },
  ]);

  const [success, setSuccess] = useState(false);

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save to localStorage
    localStorage.setItem("privacySettings", JSON.stringify(settings));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy</CardTitle>
        <CardDescription>
          Control how your data is shared and used
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Privacy Settings */}
          <div className="space-y-3">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-primary mt-1">{setting.icon}</div>
                  <div className="flex-1">
                    <label className="text-sm font-medium cursor-pointer block">
                      {setting.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(setting.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? "bg-primary" : "bg-border"
                    }`}
                    role="switch"
                    aria-checked={setting.enabled}
                    aria-label={`Toggle ${setting.label}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Data Management */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Data Management</h3>
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                disabled
              >
                <Eye className="h-4 w-4 mr-2" />
                Download Your Data
              </Button>
              <p className="text-xs text-muted-foreground">
                Request a copy of all your personal data in a portable format
              </p>
            </div>
          </div>

          {/* Data Deletion */}
          <div className="border-t pt-6 bg-destructive/10 p-4 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-destructive mb-1">
                  Delete Account
                </h3>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
              <Button type="button" variant="destructive" size="sm" disabled>
                Delete Account
              </Button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="border-t pt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              Privacy Policy
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
              We take your privacy seriously. Please review our Privacy Policy
              to understand our practices.
            </p>
            <Button type="button" variant="outline" size="sm">
              Read Privacy Policy
            </Button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md text-sm">
              ✓ Privacy settings updated successfully
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
