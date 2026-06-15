import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    gender: user?.gender || "",
    nationality: user?.nationality || "",
    country: user?.country || "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(
    user?.profileImage
      ? `http://localhost:5000/public/${user.profileImage}`
      : "/avatar.png",
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("gender", formData.gender);
      data.append("nationality", formData.nationality);
      data.append("country", formData.country);

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      console.log("Form Data:", data);
      const response = await fetch(
        "http://localhost:5000/api/auth/me-updated",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b">
          <h1 className="text-3xl font-bold text-[#0F172A]">My Profile</h1>

          <p className="text-slate-500 mt-2">
            Manage your personal information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-8">
          {/* Left */}
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt={user?.fullName}
              className="w-44 h-44 rounded-full object-cover border-4 border-[#10B981]"
            />

            <label className="mt-4 cursor-pointer bg-[#10B981] text-white px-5 py-2 rounded-xl hover:bg-emerald-600">
              Change Photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <h2 className="mt-5 text-xl font-bold text-[#0F172A]">
              {user?.fullName}
            </h2>

            <span className="mt-2 px-4 py-1 rounded-full bg-emerald-100 text-[#10B981] capitalize font-semibold">
              {user?.role}
            </span>

            <p className="mt-3 text-slate-500 text-center">{user?.email}</p>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                >
                  <option value="">Select Gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Nationality</label>

                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Country</label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full border border-slate-200 bg-slate-100 rounded-xl px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10B981] text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
