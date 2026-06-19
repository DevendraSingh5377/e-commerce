import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Profile</h1>

      <p>
        Name: {user?.name || "No User"}
      </p>

      <p>
        Email:{" "}
        {user?.email || "No Email"}
      </p>
    </>
  );
};

export default Profile;