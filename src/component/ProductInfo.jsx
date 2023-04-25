import { Button, Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import {
  Grid,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import ImgShow from "./ImgShow";
import MuliSelectDropdownField, {
  MuliSelectDropdownFieldQualityFeedback,
} from "./MuliSelectDropdownField";
import { useStyles } from "../Style/ProductInfo";

const ProductInfo = (props) => {
  const classes = useStyles();
  const [switchData, setSwitchData] = useState(true);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [multiSelectQtyFeed, setMultiSelectQtyFeedback] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setSwitchData(true);
    if (!props.showinfo) {
      setMultiSelectDrop([]);
      setMultiSelectQtyFeedback([]);
      setValue(0);
    }
  }, [props]);
  const handleChange = (event) => {
    setSwitchData(!switchData);
  };
  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };

  const onMultiSelectQtyFeedback = (multiSelectQlty) => {
    setMultiSelectQtyFeedback(multiSelectQlty);
  };

  const onClickSubmitBtnHandler = (event) => {
    props.getResponseFormChild({
      switchData: switchData,
      multiSelectDrop: multiSelectDrop,
      multiSelectQtyFeed: multiSelectQtyFeed,
      qualityRating: value,
    });
  };

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Grid container>
          <div className="col-md-5">
            <ImgShow
              itemCode={props.productInfo.itemCode}
              imgLink="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
              videoLink=""
            />
          </div>
          <Divider />
          <div className="col-md-7">
            <Typography className={classes.headingColor} align="center">
              {props.productInfo.itemCode}
            </Typography>
            <div className="row my-3">
              <div className="col-md-6">
                <div className="pro_info">
                  <h5 className="text-center my-1">
                    <b>PRODUCT DETAILS</b>
                  </h5>
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <th>COLLECTION</th>
                        <td>- &nbsp;&nbsp;</td>
                        <td>{props.productInfo.collection}</td>
                      </tr>
                      <tr>
                        <th>NEED STATE</th>
                        <td>-</td>
                        <td>{props.productInfo.consumerBase}</td>
                      </tr>
                      <tr>
                        <th>GROUP</th>
                        <td>-</td>
                        <td>{props.productInfo.itGroup}</td>
                      </tr>
                      <tr>
                        <th>CATEGORY</th>
                        <td>-</td>
                        <td>{props.productInfo.category}</td>
                      </tr>
                      <tr>
                        <th>GENDER</th>
                        <td>-</td>
                        <td>{props.productInfo.gender}</td>
                      </tr>
                      <tr>
                        <th>COMPLEXITY</th>
                        <td>-</td>
                        <td>{props.productInfo.complexity}</td>
                      </tr>
                      <tr>
                        <th>STD WT</th>
                        <td>-</td>
                        <td>{props.productInfo.stdWt}</td>
                      </tr>
                      <tr>
                        <th>STD UCP</th>
                        <td>-</td>
                        <td>{props.productInfo.stdUCP}</td>
                      </tr>
                      <tr>
                        <th>METAL COLOR</th>
                        <td>-</td>
                        <td>{props.productInfo.colourWt}</td>
                      </tr>
                      <tr>
                        <th>FINDING</th>
                        <td>-</td>
                        <td>{props.productInfo.findings}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feed_info">
                  <h5 className="text-center my-1">
                    <b>FEEDBACK</b>
                  </h5>
                  <FormGroup row className={classes.feedbackSwitch}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={switchData}
                          onChange={handleChange}
                          name="feedbackSwitch"
                          color="primary"
                        />
                      }
                      label={
                        switchData ? (
                          <Typography color="primary">YES</Typography>
                        ) : (
                          <Typography color="secondary">NO</Typography>
                        )
                      }
                    />
                  </FormGroup>
                  <br />
                  {!switchData ? (
                    <div className="mutli_select_drop">
                      <MuliSelectDropdownField
                        onMultiSelect={onMultiSelect}
                        value={multiSelectDrop}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    {value > 0 && value <= 3 && (
                      <div className="mutli_select_drop">
                        <MuliSelectDropdownFieldQualityFeedback
                          onMultiSelectQlty={onMultiSelectQtyFeedback}
                          value={multiSelectQtyFeed}
                        />
                      </div>
                    )}
                    <Typography component="legend" align="left">
                      Quality Feedback
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      emptyIcon={<StarIcon />}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-cols-1 btn_feed_show">
              <Button
                onClick={onClickSubmitBtnHandler}
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.buttonStyle}
              >
                Submit
              </Button>
            </div>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default ProductInfo;
