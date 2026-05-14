import { useState } from "react";
import { Lock, ShieldAlert, LogOut, Eye, EyeOff, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "../ui";

interface SecuritySession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sessions] = useState<SecuritySession[]>([
    {
      id: "1",
      device: "Chrome on MacOS",
      location: "San Francisco, CA",
      lastActive: "Just now",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Firefox on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ]);

  const validatePassword = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSuccess(true);
    setIsLoading(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleToggle2FA = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setFormData((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Password Change Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Current Password
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    });
                    if (errors.currentPassword)
                      setErrors({ ...errors, currentPassword: undefined });
                  }}
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.currentPassword
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  aria-label="Current password"
                />
                {errors.currentPassword && (
                  <span className="text-sm text-destructive">
                    {errors.currentPassword}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                New Password
              </label>
              <div className="relative flex flex-col gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, newPassword: e.target.value });
                    if (errors.newPassword)
                      setErrors({ ...errors, newPassword: undefined });
                  }}
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pr-10 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.newPassword ? "border-destructive" : "border-input"
                  }`}
                  aria-label="New password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {errors.newPassword && (
                  <span className="text-sm text-destructive">
                    {errors.newPassword}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Must be at least 8 characters with uppercase and numbers
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Confirm Password
              </label>
              <div className="relative flex flex-col gap-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pr-10 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.confirmPassword
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <span className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            {success && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md text-sm">
                ✓ Password changed successfully
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Update Password
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Two Factor Authentication Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Require a second verification method when signing in
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle2FA}
                disabled={isLoading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.twoFactorEnabled ? "bg-primary" : "bg-border"
                }`}
                role="switch"
                aria-checked={formData.twoFactorEnabled}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.twoFactorEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {formData.twoFactorEnabled && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  2FA Enabled
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                  Your account is now protected with two-factor authentication.
                  A verification code will be required when signing in from a
                  new device.
                </p>
                <Button type="button" variant="outline" size="sm">
                  Configure Authenticator
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage your login sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active:{" "}
                    <span className="font-medium">{session.lastActive}</span>
                  </p>
                </div>
                {!session.current && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
