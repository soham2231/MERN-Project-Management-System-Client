import { useEffect, useRef, useState } from "react";
import { FaCamera, FaEnvelope, FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../../redux/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // password states=================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);

      if (user.profileImage) {
        setPreview(`${import.meta.env.VITE_API_URL}/${user.profileImage}`);
      }
    }
  }, [user]);

  // ====================================================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", fullName);

    if (image) {
      formData.append("profileImage", image);
    }

    const result = await dispatch(updateProfile(formData));

    if (!result.error) {
      toast.success(result.payload.message);
    } else {
      toast.error(result.payload);
    }
  };
  // ====================================================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    );

    if (!result.error) {
      toast.success(result.payload.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <div className="page-container">
      <h2 className="section-title mb-4">Account Settings</h2>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="dark-card text-center">
            <div className="profile-avatar">
              <img
                src={preview || "https://placehold.co/150x150?text=User"}
                alt=""
              />

              <button
                className="avatar-btn"
                onClick={() => fileRef.current.click()}
                type="button"
              >
                <FaCamera />
              </button>

              <input hidden ref={fileRef} type="file" onChange={handleImage} />
            </div>

            <h4 className="mt-3">{user?.fullName}</h4>

            <span className="status-badge completed">{user?.role}</span>

            <hr />

            <div className="profile-info">
              <p>
                <FaEnvelope />

                {user?.email}
              </p>

              <p>
                <FaUserShield />
                Joined
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="dark-card">
            <h4 className="mb-4">Personal Information</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>

                <input
                  className="form-control dark-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  className="form-control dark-input"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Role</label>

                <input
                  className="form-control dark-input"
                  value={user?.role || ""}
                  disabled
                />
              </div>

              <button className="primary-btn">Save Changes</button>
            </form>
          </div>

          <div className="dark-card mt-4">
            <h4 className="mb-4">Change Password</h4>

            <form onSubmit={handlePasswordChange}>
              <div className="password-box mb-3">
                <input
                  type={showCurrent ? "text" : "password"}
                  className="form-control dark-input"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="password-box mb-3">
                <input
                  type={showNew ? "text" : "password"}
                  className="form-control dark-input"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="password-box mb-4">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-control dark-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="primary-btn">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
