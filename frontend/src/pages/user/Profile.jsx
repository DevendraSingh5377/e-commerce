import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {initials}
          </div>

          <div>
            <div className="profile-name">
              {user?.name}
            </div>

            <div className="profile-email">
              {user?.email}
            </div>
          </div>
        </div>

        <div className="profile-info">

          <div className="info-box">
            <div className="info-title">
              Full Name
            </div>

            <div className="info-value">
              {user?.name}
            </div>
          </div>

          <div className="info-box">
            <div className="info-title">
              Email Address
            </div>

            <div className="info-value">
              {user?.email}
            </div>
          </div>

          <div className="info-box">
            <div className="info-title">
              Account Type
            </div>

            <div className="info-value">
              {user?.role || "User"}
            </div>
          </div>

        </div>

        <div className="profile-actions">

          <button
            className="profile-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            My Orders
          </button>

          <button
            className="profile-btn"
            onClick={() =>
              navigate("/add-address")
            }
          >
            Manage Address
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;