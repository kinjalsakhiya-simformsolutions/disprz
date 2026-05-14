import { Sun, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { useTheme } from "../../hooks/useTheme";

export function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  const themeOptions: Array<{
    value: "light" | "dark";
    label: string;
    icon: React.ReactNode;
  }> = [
    { value: "light", label: "Light", icon: <Sun className="h-5 w-5" /> },
    { value: "dark", label: "Dark", icon: <Moon className="h-5 w-5" /> },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Choose your preferred color scheme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Theme Display */}
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-2">Current Theme</p>
            <div className="flex items-center gap-2">
              {theme === "light" && <Sun className="h-5 w-5 text-primary" />}
              {theme === "dark" && <Moon className="h-5 w-5 text-primary" />}
              <span className="font-medium capitalize">{theme}</span>
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Select Theme
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (theme !== option.value) {
                      toggleTheme();
                    }
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    theme === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/30"
                  }`}
                  aria-label={`Select ${option.label} theme`}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={`${
                      theme === option.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Preview */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-3">Preview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Light Theme Preview */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  LIGHT THEME
                </p>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 bg-[#33106c] rounded w-12"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>

              {/* Dark Theme Preview */}
              <div className="p-4 bg-slate-900 dark:bg-slate-800 rounded-lg border border-slate-700 dark:border-slate-600">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                  DARK THEME
                </p>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-700 dark:bg-slate-600 rounded w-full"></div>
                  <div className="h-2 bg-slate-700 dark:bg-slate-600 rounded w-4/5"></div>
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 bg-[#351461] rounded w-12"></div>
                    <div className="h-6 bg-slate-700 dark:bg-slate-600 rounded w-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Information */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Theme Preference
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-200">
              Your theme preference is saved to your browser and will be applied
              automatically on your next visit.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
