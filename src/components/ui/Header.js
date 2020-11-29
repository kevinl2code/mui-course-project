import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


//import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        textTransform: "none",    //This fixes the text in the SVG.  Only using because of workaround.
        [theme.breakpoints.down("md")]: {
          height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
          height: "5.5em"
        }
      },
    logoContainer: {
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
    },
    menu: {
      backgroundColor: theme.palette.common.blue,
      color: "white",
      borderRadius: "0px"
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover": {
        opacity: 1
      }
    },
    drawerIcon: {
      height: "50px",
      width: "50px"
    },
    drawerIconContainer: {
      marginLeft: "auto",
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    drawer: {
      backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
      ...theme.typography.tab,
      color: "white",
      opacity: 0.7
    },
    drawerItemEstimate: {
      backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
      opacity: 1
    }
}))

const Header = () => {
    const classes = useStyles()
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const [openDrawer, setOpenDrawer] = useState(false)
    const [value, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleChange = (e, newValue) => {
      setValue(newValue)
    }

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget)
      setOpenMenu(true)
    }

    const handleMenuItemClick = (e, i) => {
      setAnchorEl(null)
      setOpenMenu(false)
      setSelectedIndex(i)
    }

    const handleClose = (e) => {
      setAnchorEl(null)
      setOpenMenu(false)
    }

    const menuOptions = [
      { name: "Services", link: "/services" },
      { name: "Custom Software Development", link: "/customsoftware" },
      { name: "Mobile App Development", link: "/mobileapps" },
      { name: "Website Development", link: "/websites" }
    ]

    useEffect(() => {

      switch (window.location.pathname) {
        case "/":
          if (value !== 0) {
            setValue(0)
          }
          break;
        case "/services":
          if (value !== 1) {
            setValue(1)
            setSelectedIndex(0)
          }
          break;
        case "/customsoftware":
          if (value !== 1) {
            setValue(1)
            setSelectedIndex(1)
          }
          break;
        case "/mobileapps":
          if (value !== 1) {
            setValue(1)
            setSelectedIndex(2)
          }
          break;
        case "/websites":
          if (value !== 1) {
            setValue(1)
            setSelectedIndex(3)
          }
          break;
        case "/revolution":
          if (value !== 2) {
            setValue(2)
          }
          break;
        case "/about":
          if (value !== 3) {
            setValue(3)
          }
          break;
        case "/contact":
          if (value !== 4) {
            setValue(4)
          }
          break;
        case "/estimate":
          if (value !== 5) {
            setValue(5)
          }
          break;
        default:
            break;
      }
    }, [value])

    const tabs = (
      <React.Fragment>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        className={classes.tabContainer}
        indicatorColor="primary"
      >
          <Tab className={classes.tab} component={Link} to="/" label="Home" />
          <Tab 
            aria-owns={anchorEl ? "simple-menu" : undefined } 
            aria-haspopup={anchorEl ? true : undefined } 
            className={classes.tab} 
            component={Link} 
            onMouseOver={e => handleClick(e)}
            to="/services" 
            label="Services" 
          />
          <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
          <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
          <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
          Free Estimate
      </Button>
      <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={openMenu} 
        onClose={handleClose} 
        classes={{paper: classes.menu}}
        MenuListProps={{onMouseLeave: handleClose}}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem 
            component={Link} 
            to={option.link} 
            classes={{ root: classes.menuItem}} 
            onClick={(e) => {handleMenuItemClick(e, i); setValue(1); handleClose()}}
            selected={i === selectedIndex && value === 1}
            key={option}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
      </React.Fragment>
    )

    const drawer = (
      <React.Fragment>
        <SwipeableDrawer 
          disableBackdropTransition={!iOS} 
          disableDiscovery={iOS} 
          open={openDrawer} 
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{paper: classes.drawer}}
        >
          <List disablePadding>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(0)}} divider button component={Link} to="/" selected={value === 0} >
              <ListItemText className={value === 0 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Home</ListItemText>
            </ListItem>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(1)}} divider button component={Link} to="/services" selected={value === 1} >
              <ListItemText className={value === 1 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Services</ListItemText>
            </ListItem>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(2)}} divider button component={Link} to="/revolution" selected={value === 2} >
              <ListItemText className={value === 2 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Revolution</ListItemText>
            </ListItem>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(3)}} divider button component={Link} to="/about" selected={value === 3} >
              <ListItemText className={value === 3 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>About</ListItemText>
            </ListItem>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(4)}} divider button component={Link} to="/contact" selected={value === 4} >
              <ListItemText className={value === 4 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Contact</ListItemText>
            </ListItem>
            <ListItem onClick={() => {setOpenDrawer(false); setValue(5)}} divider button component={Link} to="/estimate" className={classes.drawerItemEstimate} selected={value === 5} >
              <ListItemText className={value === 5 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Free Estimate</ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
        <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </React.Fragment>
    )

    return(
        <React.Fragment>
            <ElevationScroll>
                {/* The "position" and "color" props are set to default values and don't need
                    to be specified if left as such.  They are included here to demonstrate
                    that this is where they can be customized if needed*/}
                <AppBar position="fixed" color="primary" >
                    <Toolbar disableGutters>
                        {/*<img src={logo} className={classes.logo} alt="company logo"/>*/}
                        <Button 
                          component={Link} 
                          to="/" 
                          disableRipple
                          onClick={() => setValue(0)} 
                          className={classes.logoContainer} 
                        >
                          <svg
                            className={classes.logo}
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 480 139"
                          >
                          <style>{`.st0{fill:none}.st1{fill:#fff}.st2{font-family:Raleway; font-weight: 300}.st6{fill:none;stroke:#000; stroke-width:3; stroke-miterlimit:10}`}</style>
                          <path d="M448.07-1l-9.62 17.24-8.36 14.96L369.93 139H-1V-1z" />
                          <path className="st0" d="M-1 139h479.92v.01H-1z" />
                          <text
                            transform="translate(261.994 65.233)"
                            className="st1 st2"
                            fontSize="57"
                          >
                            Arc
                          </text>
                          <text
                            transform="translate(17.692 112.015)"
                            className="st1 st2"
                            fontSize="54"
                          >
                            Development
                          </text>
                          <path
                            className="st0"
                            d="M382.44 116.43l47.65-85.23 8.36-14.96M369.83 139l-.01.01L362 153"
                          />
                          <path
                            d="M438.76 15.76l-56.42 100.91c-12.52-10.83-20.45-26.82-20.45-44.67 0-32.58 26.42-59 59-59 6.23 0 12.24.97 17.87 2.76z"
                            fill="#0b72b9"
                          />
                          <path d="M479.89 72c0 32.58-26.42 59-59 59-14.73 0-28.21-5.4-38.55-14.33l56.42-100.91c23.85 7.57 41.13 29.89 41.13 56.24z" />
                          <g id="Group_186" transform="translate(30.153 11.413)">
                            <g id="Group_185">
                              <g id="Words">
                                <path
                                  id="Path_59"
                                  className="st1"
                                  d="M405.05 14.4l-.09 80.38-7.67-.01.06-52.25-29.4 52.21-7.94-.01 45.04-80.32z"
                                />
                              </g>
                            </g>
                          </g>
                          <path
                            className="st0"
                            d="M457-17l-8.93 16-9.62 17.24-8.36 14.96L369.93 139l-.01.01L361 155"
                          />
                        </svg>
                      </Button>
                      {matches ? drawer : tabs }
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default Header