import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    timestamp: "",
    image: "",
  });

  const getBlogById = async () => {
    try {
      const res = await axios.get("https://liaplus.onrender.com/api/users/get", {
        params: { id },
      });
      if (res.status === 200) {
        setFormData({
          title: res.data.title,
          content: res.data.content,
          author: res.data.author,
          timestamp: res.data.timestamp,
          image: res.data.image,
        });
      }
    } catch (error) {
      console.error("Failed to fetch blog data", error);
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
  "https://liaplus.onrender.com/api/users/createblog",
  { ...formData, email }
)
      if (response.status === 200) {
        alert("Blog created successfully");
        navigate(`/`);
      }
    } catch (error) {
      console.error("Failed to create the blog", error);
      alert("Error creating blog");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Create Blog
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Fill the details to create the Blog
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="Blog title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[150px]"
              required
              placeholder="Write your blog content..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timestamp (Epoch)
            </label>
            <input
              type="number"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="e.g. 1720000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={formData.image}
                alt="Blog Preview"
                className="h-48 w-full object-cover rounded-md border border-gray-200"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
          >
            💾 Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
