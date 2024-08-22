import React, { useState, useEffect } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from "axios";

const Single = () => {
  const [postData, setPostData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(postData.title);
    setEditedDesc(postData.desc);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
  
    const updatedData = {
      title: editedTitle,
      desc: editedDesc,
    };
  
    try {
      const response = await axios.put(`/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Post updated successfully:', response.data);
      setIsEditing(false);
      setPostData({ ...postData, title: editedTitle, desc: editedDesc });
    } catch (error) {
      alert("Invalid user")
      console.error('Error updating post:', error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className='Single'>
      <div className="content">
        <img src={`../upload/${postData.img}`} alt="" />
        <div className="user">
        <img src="/upload/girl.jpg" alt="Ice Cream" />
          <div className="info">
            <span>{postData.username}</span>
            <p>posted {postData.date}</p>
            <div className="edit">
              <img src={Edit} alt="Edit" onClick={handleEdit} />
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          </div>
        </div>
        <h1>{postData.title}</h1>
        <div>{postData.desc}</div>
      </div>

      <div className="blogs-container">
  <div className="blog-container">
  <div className="blog-image">
      <img src="/upload/openai.jpg" alt="ChatGPT" />
    </div>
    <div className="blog-content">
      <h2>Unveiling the Power of ChatGPT: A Small Blog</h2>
      <p>
        In today's digital age, artificial intelligence (AI) is revolutionizing various aspects of our lives. One such innovation is ChatGPT, a powerful language model developed by OpenAI. Let's delve into the world of ChatGPT and explore its capabilities.
      </p>
    </div>

  </div>

  <div className="blog-container">
  <div className="blog-image">
      <img src="/upload/cream.jpg" alt="Ice Cream" />
    </div>
    <div className="blog-content">
      <h2>The Sweet Journey of Ice Cream</h2>
      <p>
        Ice cream, a delightful treat loved by people of all ages, has a fascinating history and a wide array of flavors. Let's embark on a sweet journey to explore the world of ice cream. Whether enjoyed in a cone, cup, or sandwiched between cookies, ice cream brings joy to every bite.
      </p>
    </div>

  </div>
</div>




      <Menu />
      <Dialog open={isEditing} onClose={handleCancel}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Single;
