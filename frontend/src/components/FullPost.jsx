import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const email = localStorage.getItem("email");
  const [admin, setAdmin] = useState(false);

  const getById = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/get", {
        params: { id },
      });
      if (res.status === 200) setPost(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserRole = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/checkuserrole",
        { params: { email } }
      );
      if (res.status === 200) {
        setAdmin(res.data.role === "admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/deleteblog`, {
        params: { id, email },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = () => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    getById();
    getUserRole();
  }, []);

  return (
    <div className="flex justify-center p-6 min-h-screen">
      {post ? (
        <article className="bg-white w-[90vw] p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            {admin && (
              <div className="space-x-3">
                <button
                  onClick={updatePost}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-blue-600"
                >
                  Update Blog
                </button>
                <button
                  onClick={deletePost}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-500 hover:bg-red-600"
                >
                  Delete Blog
                </button>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium">{post.author}</span> •{" "}
            {new Date(post.timestamp).toLocaleDateString()}
          </p>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-contain rounded-lg mb-6"
          />

          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
            {post.content}
          </p>
        </article>
      ) : (
        <div className="text-center text-gray-500">Loading post...</div>
      )}
    </div>
  );
};

export default FullPost;
