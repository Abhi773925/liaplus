import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
const Post = () => {
    const navigate=useNavigate();
  const [posts, setPosts] = useState([]);
  const email = localStorage.getItem("email");

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://liaplus.onrender.com/api/users/getblog",
        { params: { email } }
      );
      if (response.status === 200) setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (email) getPosts();
  }, [email,posts]);

  const handleclick=async(post)=>{
    console.log("clicked");
    console.log(post.title);
    navigate(`/blog/${post._id}`);
  }
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div onClick={()=>handleclick(post)}
            key={post._id}
            className="relative overflow-hidden rounded-xl shadow-lg group bg-white"
          >
            <img
              src={post.image}
              alt={post.title} 
              className="w-full h-48 sm:h-56 lg:h-64 object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="bg-white text-black text-xs px-2 py-1 mb-2 rounded-full self-start font-medium shadow">
                {post.author}
              </span>

              <h2 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm opacity-90 line-clamp-3">
                {post.content}
              </p>
              
            </div>
            
          </div>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full text-center font-extrabold text-gray-500 mt-8">
            {email ? "No posts available" : "Please log in to see posts."}
            <Link to='/login' className="text-green-400  font-bold"><span>login here</span></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
