import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import {
  Grid,
  Container,
  Divider,
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
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <br />
            <div className="img_info_show ">
              <ImgShow
                className="img_show"
                itemCode={props.productInfo.itemCode}
                imgLink="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
                videoLink=""
              />
            </div>
          </Grid>
          <Divider />
          <Grid item xs={7}>
            <br />
            <div>
              <Typography className={classes.headingColor} align="center">
                {props.productInfo.itemCode}
              </Typography>
              <br />
              <h5 className={classes.proHeading}>PRODUCTS DESCRIPTION</h5>
              <table className="w-100">
                <tbody>
                  <tr>
                    <th>COLLECTION</th>
                    <td>-&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
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
                    <th>STD Wt</th>
                    <td>-</td>
                    <td>{props.productInfo.stdWt}</td>
                  </tr>
                  <tr>
                    <th>STD UCp</th>
                    <td>-</td>
                    <td>{props.productInfo.stdUCP}</td>
                  </tr>
                  <tr>
                    <th>SALEABLE</th>
                    <td>-</td>
                    <td>{props.productInfo.saleable}</td>
                  </tr>
                  <tr>
                    <th>REASONS</th>
                    <td>-</td>
                    <td>{props.productInfo.reasons}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.feedback}>
              <Typography color="primary">FEEDBACK</Typography>
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
                {value > 0 && value <= 4 && (
                  <div className="mutli_select_drop">
                    <MuliSelectDropdownFieldQualityFeedback
                      onMultiSelectQlty={onMultiSelectQtyFeedback}
                      value={multiSelectQtyFeed}
                    />
                  </div>
                )}
                <h6 className="text-center my-1">
                  <b>Quality Feedback</b>
                </h6>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  precision={1}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                />
                <br />
              </div>
              <br />
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ProductInfo;
