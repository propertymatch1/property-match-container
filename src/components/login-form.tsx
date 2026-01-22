"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  signIn,
  getSession,
  getRedirectPath,
  handleAuthError,
  type AuthError,
  type User,
} from "~/lib/auth-client";

// Validation schema for login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  userType: z.literal("TENANT"), // Landlord login disabled
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    userType: "TENANT",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear auth error when user makes changes
    if (authError) {
      setAuthError(null);
    }
  };

  const handleUserTypeChange = (value: string) => {
    const userType = value === "tenant" ? "TENANT" : "LANDLORD";
    handleInputChange("userType", userType);
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof LoginFormData;
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.data?.user) {
        // Get the full session to ensure we have complete user data including userType
        const sessionResult = await getSession();

        if (sessionResult.data?.user) {
          const user = sessionResult.data.user as User & {
            userType: "TENANT" | "LANDLORD";
          };

          // Verify user type matches selected type
          if (user.userType && user.userType !== formData.userType) {
            setAuthError({
              type: "AUTHENTICATION",
              message: `This account is registered as a ${user.userType.toLowerCase()}, but you selected ${formData.userType.toLowerCase()}. Please select the correct account type.`,
            });
            setIsLoading(false);
            return;
          }

          // Redirect to appropriate dashboard based on user type
          const redirectPath = getRedirectPath(user, false);
          router.push(redirectPath);
        } else {
          // Fallback: redirect to dashboard if session doesn't have user data yet
          const redirectPath =
            formData.userType === "TENANT"
              ? "/dashboard/tenent"
              : "/dashboard/landlord";
          router.push(redirectPath);
        }
      } else if (result.error) {
        const authErr = handleAuthError(result.error);
        setAuthError(authErr);

        // Set field-specific error if applicable
        if (authErr.field && authErr.field in formData) {
          setErrors((prev) => ({
            ...prev,
            [authErr.field as keyof LoginFormData]: authErr.message,
          }));
        }
      }
    } catch (error) {
      const authErr = handleAuthError(error);
      setAuthError(authErr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* General auth error display */}
              {authError && !authError.field && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {authError.message}
                </div>
              )}

              {/* Hidden field - Landlord login disabled */}
              <input type="hidden" name="userType" value="TENANT" />

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <FieldDescription className="text-red-600">
                    {errors.email}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <FieldDescription className="text-red-600">
                    {errors.password}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing In..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
