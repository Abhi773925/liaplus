const Blog = require("../models/blog");
const Userdetails = require("../models/user");
const createblog = async (req, res) => {
  try {
    const { title, content, author, image, email } = req.body;
    const timestamp=Date.now();
    const userrole = await Userdetails.findOne({ email });
    if (!userrole) {
      res.status(500).json({ message: "User Not Found" });
    } else {
      const unique = await Blog.findOne({ title });
      if (unique) {
        res.status(401).json({ message: "Enter unqiue title" });
      } else {
        if (userrole.role == "admin") {
          const newblog = new Blog({
            title,
            content,
            author,
            timestamp,
            image,
          });
          const response = await newblog.save();
          res.status(200).json(response);
        } else {
          res.status(401).json({ message: "Unauthorised Access" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create the blog" });
  }
};
const fetchblog = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await Userdetails.findOne({ email });
    if (!user) {
      res.status(500).json({ message: "User Not Found" });
    } else {
      const blog = await Blog.find();
      res.status(200).json(blog);
    }
  } catch (error) {
    res.status(500).json({ Message: "An Error Occured" });
  }
};
const getblogbyid = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Blog.findById(id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get the blog by id name" });
  }
};
const deleteblog = async (req, res) => {
  try {
    const { id, email } = req.query;
    const user = await Userdetails.findOne({ email });
    if (user) {
      if (user.role == "admin") {
        const blog = await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog Deleted Successfully" });
      } else {
        res.status(401).json({ message: "User is not admin" });
      }
    } else {
      res.status(500).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the blog" });
  }
};
const updateblog = async (req, res) => {
  try {
    const { title, content, author, timestamp, image} = req.body;
    const { email, id }=req.query;
    const user = await Userdetails.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User Not Found" });
    }

    if (user.role === "admin") {
      const fetcheddata = await Blog.findById(id);
      if (!fetcheddata) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const updatedTitle = title || fetcheddata.title;
      const updatedContent = content || fetcheddata.content;
      const updatedAuthor = author || fetcheddata.author;
      const updatedTimestamp = Date.now() || fetcheddata.timestamp;
      const updatedImage = image || fetcheddata.image;

      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          title: updatedTitle,
          content: updatedContent,
          author: updatedAuthor,
          timestamp: updatedTimestamp,
          image: updatedImage,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Blog Updated Successfully", blog });
    } else {
      return res.status(401).json({ message: "User is not admin" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error Occurred", error: error.message });
  }
};
const checkuserrole = async (req, res) => {
  const { email } = req.query;
  const user = await Userdetails.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });
  return res.status(200).json({ role: user.role });
};

module.exports = { createblog, fetchblog, deleteblog, updateblog, getblogbyid,checkuserrole};
