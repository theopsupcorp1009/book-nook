import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 px-4 py-5 md:py-12 lg:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-[26px] font-[1000] text-gray-900 dark:text-gray-100">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your personal information and account settings.
          </p>
        </div>

        <ProfileForm user={session?.user} />
      </div>
    </main>
  );
};

export default ProfilePage;