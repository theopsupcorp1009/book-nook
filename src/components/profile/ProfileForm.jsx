"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Save, UserRound, Pencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiExit } from "react-icons/bi";

const ProfileForm = ({ user }) => {
  const router = useRouter();

  const [showImageInput, setShowImageInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = Object.fromEntries(new FormData(e.target));
      const { data, error } = await authClient.updateUser({
        ...updatedData,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-white px-6 py-10 text-center">
        <div className="mx-auto mb-4 w-40 h-40">
          <div className="size-full overflow-hidden rounded-full border-4 border-white bg-orange-100 shadow-lg">
            <img
              src={user.image || "/assets/profile/avatar.webp"}
              alt="Profile"
              className="fill object-fit"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          {user.name || "Your Name"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">{user.email}</p>

        <p className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          BookNook Account
        </p>
      </div>

      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900">
              Personal Information
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name || ""}
                  placeholder="Enter your full name"
                  required
                  className="h-11 rounded-xl border-gray-200 focus-visible:ring-orange-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <Input
                  value={user.email}
                  readOnly
                  className="h-11 cursor-not-allowed rounded-xl border-gray-200 bg-gray-50 text-gray-500"
                />

                <p className="text-xs text-gray-400">
                  Your email address cannot be changed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <Button
              type="submit"
              disabled={loading}
              className="h-11 flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:from-amber-600 hover:to-orange-700"
            >
              <Save className="mr-2 size-4" />
              {loading ? "Updating..." : "Update Profile"}
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={loggingOut}
              onClick={handleLogout}
              className="h-11 flex-1 cursor-pointer rounded-xl border-red-200 font-bold text-red-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <BiExit className="text-xl" />
              {loggingOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
