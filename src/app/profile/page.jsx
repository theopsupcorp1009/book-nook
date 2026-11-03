import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-[80vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        <ProfileForm user={session?.user} />
      </div>
    </main>
  );
};

export default ProfilePage;