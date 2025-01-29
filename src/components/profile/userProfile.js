// // UserProfile.js
// import React, { useState } from "react";
// import { Avatar, Typography, IconButton } from "@mui/material";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";

// const UserProfile = ({ username, appBarColor }) => {
//   const [profilePic, setProfilePic] = useState("/broken-image.jpg");

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setProfilePic(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Typography
//       variant="body2"
//       sx={{
//         height: "10px",
//         marginLeft: 2,
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <label htmlFor="upload-profile-pic">
//         <Avatar
//           src={profilePic}
//           sx={{
//             width: "30px",
//             height: "30px",
//             border: "2px solid white",
//             backgroundColor: appBarColor,
//             color: "white",
//             marginRight: 1,
//             cursor: "pointer",
//           }}
//         />
//       </label>
//       <input
//         accept="image/*"
//         id="upload-profile-pic"
//         type="file"
//         style={{ display: "none" }}
//         onChange={handleProfilePicChange}
//       />
//       <Typography>Hello, {username}</Typography>
//     </Typography>
//   );
// };

// export default UserProfile;

import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setProfilePic } from "../../features/Dashboard-Slice/userSlice";

const UserProfile = ({ appBarColor,username }) => {
  const dispatch = useDispatch();
  const profilePic = useSelector((state) => state.user.profilePic);
  // const username = useSelector((state) => state.user.username);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setProfilePic(reader.result)); // Save to Redux
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Typography
      variant="body2"
      sx={{
        height: "10px",
        marginLeft: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <label htmlFor="upload-profile-pic">
        <Avatar
          src={profilePic}
          sx={{
            width: "30px",
            height: "30px",
            border: "2px solid white",
            backgroundColor: appBarColor,
            color: "white",
            marginRight: 1,
            cursor: "pointer",
          }}
        />
      </label>
      <input
        accept="image/*"
        id="upload-profile-pic"
        type="file"
        style={{ display: "none" }}
        onChange={handleProfilePicChange}
      />
      <Typography>Hello, {username}</Typography>
    </Typography>
  );
};

export default UserProfile;
