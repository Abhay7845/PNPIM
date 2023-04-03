import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactImageMagnify from "react-image-magnify";
import {
  makeStyles,
  Tabs,
  Tab,
  AppBar,
  Avatar,
  CardActionArea,
  Card,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "94.5%",
    backgroundColor: theme.palette.background.paper,
  },
  cardStyle: {
    maxWidth: "35rem",
    marginLeft: "1%",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "none",
  },
  list_img_show: {
    maxWidth: "35rem",
  },
}));

const ImgShowForFeedBack = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [imgLink, setImgLink] = React.useState();

  useEffect(() => {
    setImgLink(props.videoLink);
    if (props.videoLink) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (event.target.src) {
      setImgLink(event.target.src);
    } else {
      setImgLink(props.videoLink);
    }
  };

  const imageCode = props.itemCode.substring(2, 9);
  const combineImage = `${props.imgLink}${imageCode}`;

  return (
    <>
      <section className="image_data_show">
        <Card className={classes.cardStyle}>
          <CardActionArea>
            <h6 className="font-weight-bold text-center">{props.itemCode}</h6>
            {imgLink.search("preview") > 0 ? (
              <iframe
                src={props.videoLink}
                width="600"
                height="500"
                alt="Video is not available"
                title="myFrame"
              />
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    src:
                      imgLink && imgLink !== ""
                        ? imgLink
                        : `${combineImage}_1.jpg`,
                    width: 600,
                    height: 500,
                    alt: "Image is not available",
                  },
                  largeImage: {
                    src:
                      imgLink && imgLink !== ""
                        ? imgLink
                        : `${combineImage}_1.jpg`,
                    width: 1000,
                    height: 1000,
                    alt: "Image is not available",
                  },
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePosition: "over",
                }}
              />
            )}
          </CardActionArea>
        </Card>
        <div className="list_img_show ">
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={<PlayCircleOutlineIcon />}
                />
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={
                    <Avatar
                      variant="square"
                      src={combineImage.concat("_1.jpg")}
                    />
                  }
                />
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={
                    <Avatar
                      variant="square"
                      src={combineImage.concat("_2.jpg")}
                    />
                  }
                />
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={
                    <Avatar
                      variant="square"
                      src={combineImage.concat("_3.jpg")}
                    />
                  }
                />
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={
                    <Avatar
                      variant="square"
                      src={combineImage.concat("_4.jpg")}
                    />
                  }
                />
                <Tab
                  style={{ minWidth: "1%" }}
                  icon={
                    <Avatar
                      variant="square"
                      src={combineImage.concat("_5.jpg")}
                    />
                  }
                />
              </Tabs>
            </AppBar>
          </div>
        </div>

        <div className="model_show"></div>
      </section>
    </>
  );
};
export default ImgShowForFeedBack;
