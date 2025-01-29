// import EditIcon from "@mui/icons-material/Edit";
import { Avatar, /*Button,*/ Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { UserType } from "../../types/user";
import { getErrorMessage } from "../../utils/helpers";
import { getUserInfo } from "../../utils/user";

const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const theme = useTheme();
  const color = theme.palette.primary[theme.palette.mode];

  const boxSx = {
    my: 8,
    mx: "auto",
    p: 4,
    width: 400,
    maxWidth: "100%",
    textAlign: "center",
    position: "relative",
  };

  const avatarSx = {
    width: 150,
    height: "auto",
    maxWidth: "100%",
    aspectRatio: 1,
    mx: "auto",
    mb: 2,
    border: `2px solid ${color}`,
  };

  // const editBtnSx = {
  //   position: "absolute",
  //   top: 2,
  //   right: 2,
  //   p: 1,
  //   minWidth: "1em",
  // };

  // fetch user's info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUser(userInfo);
        }
      } catch (err) {
        console.log(getErrorMessage(err));
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Paper sx={boxSx}>
      <Avatar alt={user?.name} src={user?.image} sx={avatarSx} />
      <Typography variant="h5" component="h1" gutterBottom sx={{ color }}>
        {user?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user?.email}
      </Typography>
      {/* <Button sx={editBtnSx} aria-label="Edit profile">
        <EditIcon />
      </Button> */}
    </Paper>
  );
};

export default ProfilePage;
