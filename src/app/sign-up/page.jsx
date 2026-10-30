"use client";

import Link from "next/link";
import { Form } from "@base-ui/react/form";
import { Field } from "@base-ui/react/field";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Shared control styling (matches the shadcn Input base classes)
const controlClass =
  "h-12 w-full rounded-xl border border-input bg-gray-50 px-4 text-[12px] transition-colors outline-none placeholder:text-gray-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const passwordRules = [
  "Contains an uppercase letter",
  "Contains a lowercase letter",
  "At least 6 characters long",
];

const SignUpPage = () => {

    const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Registration successful!");
      router.push("/sign-in")
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white px-8 py-12 shadow-xl shadow-gray-200/60 sm:px-12">
        <div className="text-center -space-y-3">
          <h1 className="text-[30px] font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="mt-3 text-[14px] text-gray-500">
            Join the BookNook reading community
          </p>
        </div>

        <Form className="mt-10 flex flex-col gap-5" onSubmit={handleSignUp}>
          <Field.Root name="name" className="flex flex-col gap-2">
            <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Full Name
            </Field.Label>
            <Field.Control
              type="text"
              required
              placeholder="Sarah Jenkins"
              className={controlClass}
            />
            <Field.Error className="text-[12px] text-destructive" />
          </Field.Root>

          <Field.Root name="email" className="flex flex-col gap-2">
            <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Email Address
            </Field.Label>
            <Field.Control
              type="email"
              required
              placeholder="you@example.com"
              className={controlClass}
            />
            <Field.Error className="text-[12px] text-destructive" />
          </Field.Root>

          <Field.Root name="image" className="flex flex-col gap-2">
            <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Photo URL
            </Field.Label>
            <Field.Control
              type="url"
              placeholder="https://images.unsplash.com/..."
              className={controlClass}
            />
            <Field.Error className="text-[12px] text-destructive" />
          </Field.Root>

          <Field.Root name="password" className="flex flex-col gap-2">
            <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Password
            </Field.Label>
            <Field.Control
              type="password"
              required
              placeholder="••••••••"
              className={controlClass}
            />
            <Field.Error className="text-[12px] text-destructive" />

            <div className="mt-1 space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
              {passwordRules.map((rule) => (
                <p
                  key={rule}
                  className="flex items-center gap-2 text-[12px] text-gray-600"
                >
                  <X className="size-4 shrink-0 text-red-400" />
                  {rule}
                </p>
              ))}
            </div>
          </Field.Root>

          <Button
            type="submit"
            className="cursor-pointer h-14 w-full rounded-xl bg-orange-500 text-[14px] font-bold text-white shadow-md shadow-orange-500/30 hover:bg-orange-600"
          >
            Register Account
          </Button>
        </Form>

        <div className="relative my-8">
          <div className="absolute inset-0 top-1/2 border-t border-gray-200" />
          <span className="relative mx-auto block w-fit bg-white px-4 text-[12px] font-bold tracking-wider text-gray-400 uppercase">
            Or Continue With
          </span>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleSignIn}
          className="h-14 w-full rounded-xl border-gray-200 bg-gray-50 text-[14px] font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
        >
          <img src="/assets/icons/google-logo.svg" alt="" className="size-5" />
          Sign in with Google
        </Button>

        {/* Login link */}
        <p className="mt-8 text-center text-[12px] text-gray-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-bold text-orange-500 hover:text-orange-600"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
