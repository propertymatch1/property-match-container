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
  signUp,
  getSession,
  getRedirectPath,
  handleAuthError,
  type AuthError,
  type SignUpData,
  type User,
} from "~/lib/auth-client";

// Validation schema for signup form
const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    userType: z.enum(["TENANT", "LANDLORD"], {
      required_error: "Please select whether you are a tenant or landlord",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "TENANT",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
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
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof SignupFormData;
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
      const signUpData: SignUpData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: formData.userType,
      };

      const result = await signUp.email(
        signUpData as Parameters<typeof signUp.email>[0],
      );

      if (result.data?.user) {
        // Get the full session to ensure we have complete user data including userType
        const sessionResult = await getSession();

        if (sessionResult.data?.user) {
          const user = sessionResult.data.user as User & {
            userType: "TENANT" | "LANDLORD";
          };

          // Use getRedirectPath method for consistency
          const redirectPath = getRedirectPath(user, true);
          router.push(redirectPath);
        } else {
          // Fallback: use form data if session doesn't have user data yet
          const redirectPath =
            formData.userType === "TENANT"
              ? "/onboarding/tenent"
              : "/onboarding/landlord";
          router.push(redirectPath);
        }
      } else if (result.error) {
        const authErr = handleAuthError(result.error);
        setAuthError(authErr);

        // Set field-specific error if applicable
        if (authErr.field && authErr.field in formData) {
          setErrors((prev) => ({
            ...prev,
            [authErr.field as keyof SignupFormData]: authErr.message,
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
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

              <Field>
                <FieldLabel>I am a</FieldLabel>
                <Tabs
                  value={formData.userType === "TENANT" ? "tenant" : "landlord"}
                  onValueChange={handleUserTypeChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tenant">Tenant</TabsTrigger>
                    <TabsTrigger value="landlord">Landlord</TabsTrigger>
                  </TabsList>
                </Tabs>
                {errors.userType && (
                  <FieldDescription className="text-red-600">
                    {errors.userType}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.name && (
                  <FieldDescription className="text-red-600">
                    {errors.name}
                  </FieldDescription>
                )}
              </Field>

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
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <FieldDescription className="text-red-600">
                        {errors.confirmPassword}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/signin" className="text-blue-600 hover:underline">
                    Sign in
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
