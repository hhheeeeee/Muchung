/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NotificationsPopover from './notification';
import logo from 'assets/logo.png';
import { PC, Mobile } from 'components/common/Responsive';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import blankimg from 'assets/blankimg.jpg';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { BASE_URL } from 'api/config';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Header = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/main');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const withdraw = async () => {
    try {
      await axios.delete(`${BASE_URL}/member/withdraw`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div css={mobilecontainer}>
        <div className="content">
          <img className="logo" src={logo} alt="" onClick={handleLogo} />
          <div className="welcome">환영합니다 무청컴퍼니입니다.</div>
          <NotificationsPopover></NotificationsPopover>
          <Avatar
            alt="Remy Sharp"
            src={localStorage.getItem('profileImage')}
            sx={{ width: 26, height: 26 }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="로그아웃" onClick={withdraw} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="탈퇴하기" onClick={() => logout} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Header;

const mobilecontainer = css`
  display: flex;
  width: 100%;
  height: 6vh;
  background-color: rgb(252, 249, 249);
  align-self: start;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(244, 244, 244);

  .content {
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly; // 두 개의 요소를 양쪽으로 분산
  }

  .welcome {
    /* align-self: end; */
    font-weight: 600;
    font-size: 1.1rem;
    align-items: center;
  }

  .logo {
    width: 10%;
    object-fit: fill;
  }
`;

const mainContainer = css`
  display: flex;
  width: 100%;
  height: 10vh;
  background-color: rgb(249, 250, 251);
  align-self: start;
  align-items: center;
  justify-content: center;

  .content {
    width: 88%;
    height: 100%;
    display: flex;
    justify-content: space-between; // 두 개의 요소를 양쪽으로 분산
    align-items: flex-end; // 아래쪽으로 정렬
  }

  .welcome {
    /* align-self: end; */
    font-weight: 600;
    font-size: 1.3rem;
    align-items: center;
  }
`;
