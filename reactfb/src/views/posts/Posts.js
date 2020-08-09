import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Deposits from "./Deposits";
import { mainListItems } from "../../components/listItems";
import RoundImage from "react-rounded-image";
import Axios from "axios";
import Skeleton from 'react-loading-skeleton'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https:/bglobalcorp.com/">
        ThanhNT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const section = {
    height: "auto",
    paddingTop: 5,
    backgroundColor: "#fff",
    border: "1px solid #676E6D",
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [pageID, setPageID] = useState(null);
  const [feedData, setFeedData] = useState([]);
  // const [sharecount, setSharecount] = useState(null);
  const [postImpression, setPostImpression] = useState([]);
  const [checker, setchecker] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("listPostClicked");

    const index = localStorage.getItem("pageID");
    console.log("pageID ", index);
    setPageID(index);
  }, []);

  const getFeedPage = async () => {
    try {
      const userLongLiveToken = localStorage.getItem("userLongLiveToken");
      const pageAcessTokenRes =  await Axios.get(
        `https://graph.facebook.com/v7.0/${pageID}?fields=access_token&access_token=${userLongLiveToken}`
      )
      const pageAcessToken = pageAcessTokenRes.data.access_token;
      const res = await Axios.get(
        `https://graph.facebook.com/v7.0/${pageID}/posts?fields=id,message,created_time,shares,picture&pretty=0&limit=10&access_token=${userLongLiveToken}`
      );
      const result = res.data.data;
      for (var i = 0; i < result.length; i++) {
        try {
          const impress = await  Axios.get(
            `https://graph.facebook.com/v7.0/${result[i].id}/insights/post_impressions?access_token=${pageAcessToken}`
          );
          const numNegativeFeedback= await Axios.get(
            `https://graph.facebook.com/v7.0/${result[i].id}/insights/post_negative_feedback?access_token=${pageAcessToken}`
          );
          const numPeopleNegativeFeedback= await Axios.get(
            `https://graph.facebook.com/v7.0/${result[i].id}/insights/post_negative_feedback_unique?access_token=${pageAcessToken}`
          );
          const resultImpress = impress.data.data[0].values[0].value;
          const resultnumberNegativeFeedback= numNegativeFeedback.data.data[0].values[0].value;
          const resultnumberPeopleNegativeFeedback=numPeopleNegativeFeedback.data.data[0].values[0].value;
          // console.log("numPeopleNegativeFeedback",numPeopleNegativeFeedback)
          // var element={impression:result};
          result[i].impression=resultImpress;
          result[i].numberNegativeFeedback=resultnumberNegativeFeedback;
          result[i].numberPeopleNegativeFeedback=resultnumberPeopleNegativeFeedback;

        } catch (error) {
          console.log(error)
        }
      }
      setFeedData(result);
      // setSharecount(result.shares);
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  };




  const Onclicked = async () => {
    calculateTime();
    await getFeedPage();
    console.log("clicked");
    console.log("pageID", pageID);
    
    // await getPageImpression();
    // getPageAccessToken();
    console.log("post data with impression", feedData);
  }
  const calculateTime = () => {
    const date = new Date(feedData.map((dataItem) => dataItem.created_time));
    console.log("time convert: ", date);
  };

  useEffect(() => {
    const index = localStorage.getItem("listPostClicked");
    if (index == true) {
      document.getElementById("listPage").style.visibility = "hidden";
    }
  }, []);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar} style={{ background: "#4F4C53" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Posts
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Posts */}
            <Grid item xs={2} md={8} lg={9}>
              {/* <Posts /> */}
              <button id="buttonProductlist" onClick={Onclicked}>
                {" "}
                Show Post
              </button>
              <RoundImage
                image={pageID ? `https://graph.facebook.com/v7.0/${pageID}/picture` : null ||<Skeleton />}
                roundedColor="#321124"
                imageWidth="50"
                imageHeight="50"
                roundedSize="1"
              />
              
              <Paper>
              
              {feedData.map((feedItem) => (
                <Paper style={section} className={fixedHeightPaper}>
                  
                  <div>
                    <div rows="5" style={{ fontSize: 16 }}>
                      {feedItem.message}{" "}
                    </div>
                    <br />
                    <img src={feedItem.picture||<Skeleton height={100}/>}></img>
                    {/* Number of share: {feedItem.shares} */}
                    <br />
                    Date: {Date(feedItem.created_time)}
                  </div>
                  Number of impression:{feedItem.impression}
                  {postImpression.map((item) => item.result)}
                  <br />
                  Number of negative feedback: {feedItem.numberNegativeFeedback}
                  <br/>
                  Number of people had negative feedback:{feedItem.numberPeopleNegativeFeedback}
                </Paper>
              ))||<Skeleton />}
              </Paper>
              <br />
            </Grid>
            {/* Recent Deposits */}
            <Grid id="listPage" item xs={12} md={4} lg={3}>
              <Paper style={section} className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
