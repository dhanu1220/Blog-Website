import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="art" label="ART" component={Link} to="/?cat=art" />
            <Tab value="science" label="SCIENCE" component={Link} to="/?cat=science" />
            <Tab value="technology" label="TECHNOLOGY" component={Link} to="/?cat=technology" />
            <Tab value="cinema" label="CINEMA" component={Link} to="/?cat=cinema" />
            <Tab value="design" label="DESIGN" component={Link} to="/?cat=design" />
            <Tab value="food" label="FOOD" component={Link} to="/?cat=food" />
          </Tabs>
        </Box>
        <Divider/>

        <div className="links">
          {currentUser ? (
            <>
              <span>{currentUser.username}</span>
              <span onClick={logout}>Logout</span>
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          <span className="chatbot">
            <Link className="link" to="/chatbot">
              ChatBot
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
