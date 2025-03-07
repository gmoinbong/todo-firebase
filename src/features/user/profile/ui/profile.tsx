import { useUserData } from "../hooks/use-user-data";

export const Profile = () => {
  const { userData, loading, error } = useUserData();

  if (loading) {
    return <div className="text-center p-8">Loading profile data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {userData ? (
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Name:</label>
            <p className="text-lg">{userData.name}</p>
          </div>

          <div>
            <label className="text-gray-600">Email:</label>
            <p className="text-lg">{userData.email}</p>
          </div>

          <div>
            <label className="text-gray-600">Registration Date:</label>
            <p className="text-lg">
              {userData.createdAt?.toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">User data not found</p>
      )}
    </div>
  );
};