"use client";

import Link from "next/link";
import { Form } from "@base-ui/react/form";
import { Field } from "@base-ui/react/field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

// Shared control styling (matches the shadcn Input base classes)
const controlClass =
  "h-12 w-full rounded-xl border border-input bg-gray-50 px-4 text-[12px] transition-colors outline-none placeholder:text-gray-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const SignInPage = () => {
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
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
      <div className="w-full max-w-md rounded-3xl bg-white py-8 px-10 shadow-xl">
        <div className="text-center -space-y-3">
          <h1 className="text-[30px] font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-[14px] text-gray-500">
            Sign in to your BookNook account
          </p>
        </div>

        <Form className="mt-10 flex flex-col gap-5" onSubmit={handleSignIn}>
          <Field.Root name="email" className="flex flex-col gap-2">
            <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Email Address
            </Field.Label>
            <Field.Control
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className={controlClass}
            />
            <Field.Error className="text-[12px] text-destructive" />
          </Field.Root>

          <Field.Root name="password" className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Field.Label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
                Password
              </Field.Label>
              <Link
                href="/forgot-password"
                className="text-[12px] font-semibold text-orange-500 hover:text-orange-600"
              >
                Forgot Password?
              </Link>
            </div>
            <Field.Control
              type="password"
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className={controlClass}
            />
            <Field.Error className="text-sm text-destructive" />
          </Field.Root>

          <Button
            type="submit"
            className="cursor-pointer h-14 w-full rounded-xl bg-orange-500 text-[base] font-bold text-white shadow-md shadow-orange-500/30 hover:bg-orange-600"
          >
            Sign In
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
          className="h-14 w-full rounded-xl border-gray-200 bg-gray-50 text-[12px] font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
        >
          <img src="/assets/icons/google-logo.svg" alt="" className="size-5" />
          Sign in with Google
        </Button>

        <p className="mt-8 text-center text-[14px] text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-orange-500 hover:text-orange-600"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
