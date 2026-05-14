import { useState } from "react";
import { Mail, User, Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "../ui";
import type { SettingsFormData } from "../../lib/types";

interface AccountSettingsProps {
  initialData?: SettingsFormData;
  onSave?: (data: SettingsFormData) => void;
  isLoading?: boolean;
}

export function AccountSettings({
  initialData,
  onSave,
  isLoading = false,
}: AccountSettingsProps) {
  const [formData, setFormData] = useState<SettingsFormData>({
    firstName: initialData?.firstName || "John",
    lastName: initialData?.lastName || "Doe",
    email:
      initialData?.email ||
      localStorage.getItem("userEmail") ||
      "john@example.com",
    avatar: initialData?.avatar || null,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setPreview(null);
    setFormData({ ...formData, avatar: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSave?.(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account information and profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="border-b pb-6">
            <label className="text-sm font-medium mb-3 block">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg bg-accent flex items-center justify-center overflow-hidden border-2 border-border">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer inline-block">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) =>
                      e.currentTarget.parentElement
                        ?.querySelector("input")
                        ?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Picture
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                </label>
                {preview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                First Name
              </label>
              <Input
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  if (errors.firstName)
                    setErrors({ ...errors, firstName: undefined });
                }}
                error={errors.firstName}
                aria-label="First name"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  if (errors.lastName)
                    setErrors({ ...errors, lastName: undefined });
                }}
                error={errors.lastName}
                aria-label="Last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1 block flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              aria-label="Email address"
            />
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md text-sm">
              ✓ Account settings updated successfully
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Save Changes
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
