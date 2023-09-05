// import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";


const Single = () => {
  // const [ setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];


  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

return(
  
  <div className='Single'>
    <div className="content">
    
     <img src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""  ></img>
     <div className="user">
      
     <img src= "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"alt=""  ></img>
    
    
    <div className="info">
      <span>john</span>
      <p>posted 2 days ago</p>
      <div className="edit">  
      <Link to={'/write?edit=2'}>
      <img src={Edit} alt="" />
       </Link>
      
       <img onClick={handleDelete} src={Delete} alt="" />
      </div>
      </div>
      </div>
      <h1>Revise or remove</h1>
      <p>French (français [fʁɑ̃sɛ] or langue française [lɑ̃ɡ fʁɑ̃sɛz]) is a Romance language of the Indo-European family. It descended from the Vulgar Latin of the Roman Empire, as did all Romance languages. French evolved from Gallo-Romance, the Latin spoken in Gaul, and more specifically in Northern Gaul.</p>
      </div>
    <Menu />
  </div>



)
};

export default Single;











// import React, { useEffect, useState } from "react";
// import Edit from "../img/edit.png";
// import Delete from "../img/delete.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Menu from "../components/Menu";
// import axios from "axios";
// import moment from "moment";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import DOMPurify from "dompurify";

// const Single = () => {
//   const [post, setPost] = useState({});

//   const location = useLocation();
//   const navigate = useNavigate();

//   const postId = location.pathname.split("/")[2];

//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`/posts/${postId}`);
//         setPost(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [postId]);

//   const handleDelete = async ()=>{
//     try {
//       await axios.delete(`/posts/${postId}`);
//       navigate("/")
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // const getText = (html) =>{
//   //   const doc = new DOMParser().parseFromString(html, "text/html")
//   //   return doc.body.textContent
//   // }
//   return (
//     <div className="single">
//       <div className="content">
//         <img src={`../upload/${post?.img}`} alt="" />
//         <div className="user">
//           {post.userImg && <img
//             src={post.userImg}
//             alt=""
//           />}
//           <div className="info">
            
//             <span>{post.username}</span>
//             <p>Posted {moment(post.date).fromNow()}</p>
//           </div>
//           {currentUser && currentUser.username === post.username && (
//             <div className="edit">
//               <Link to={`/write?edit=2`} state={post}>
//                 <img src={Edit} alt="" />
//               </Link>
//               <img onClick={handleDelete} src={Delete} alt="" />
//             </div>
//           )}
//         </div>
//         <h1>{post.title}</h1>
//         <p
//           dangerouslySetInnerHTML={{
//             __html: DOMPurify.sanitize(post.desc),
//           }}
//         ></p>      </div>
//       <Menu cat={post.cat}/>
//     </div>
//   );
// };

// export default Single;

