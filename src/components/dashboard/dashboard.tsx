import React, { useState } from "react";
import { Drawer as MUIDrawer,
ListItem, List, ListItemIcon, ListItemText,
Theme, useTheme, makeStyles, createStyles,
AppBar, Toolbar, IconButton, Typography,
Divider, Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { RouteComponentProps, withRouter, Switch, Route } from "react-router-dom"
import {DataTable, CarForm} from "../../components";

const drawerWidth = 500;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            display: "flex",
            backgroundColor: "black"
        },
        appBar: {
            transition: theme.transitions.create(["margin","width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(["margin","width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
            backgroundColor: "black"
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: "#33aa33"
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
          },
          content: {
            backgroundColor: "#33ff33",
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
          },
          contentShift: {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          },
          toolbar:{
            display: 'flex',
            backgroundColor: "#339933",
          },
          toolbar_button: {
            marginLeft: 'auto',
            backgroundColor: "white",
          }
    }),
);

interface DashProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
}
export const Dashboard = withRouter(( props:DashProps ) => {
    console.log(props)
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleDialogClickOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClickClose = () => {
      setDialogOpen(false);
    };
  
    const itemsList = [
      {
        text: 'Home',
        onClick: () => history.push('/')
      },
      {
        text: 'Sign In',
        onClick: () => history.push('/signin')
      }
    ]
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <Button className={classes.toolbar_button} onClick={handleDialogClickOpen}>Create New Vroom Vroom</Button>
            <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add New Car</DialogTitle>
              <DialogContent>
                <DialogContentText>Add a New Car</DialogContentText>
                  <CarForm />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClickClose} color="primary">Cancel</Button>
                <Button onClick={handleDialogClickClose} color="primary">Done</Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
        <MUIDrawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
          {itemsList.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
          </List>
        </MUIDrawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
  
          <h1>Hello World Until Data Shows Up</h1>
          <DataTable />
        </main>
      </div>
      )
  });