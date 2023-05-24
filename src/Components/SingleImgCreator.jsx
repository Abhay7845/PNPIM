import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleImgCreator = (props) => {
  const { itemCode } = props;
  const [img, setImg] = useState([]);
  const imageCode = itemCode.substring(2, 9);
  let ImageURL = `https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName=${imageCode}.jpg`;
  const getImages = async () => {
    try {
      if (imageCode !== "") {
        const response = await axios.get(``);
        if (response.status === 200) {
          if (response.data.length > 0) {
            const byteCharacters = atob(response.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });
            var url = window.URL.createObjectURL(blob);
            setImg(url);
          } else {
            setImg("");
          }
        }
      }
    } catch (error) {
      console.log("error==>", error);
    }
  };
  useEffect(() => {
    getImages();
    return () => {
      setImg("");
    };
  }, [itemCode]);
  return (
    <>
      {ImageURL ? (
        <img src={ImageURL} alt="No_Image" width="100" height="80" />
      ) : (
        "No Image"
      )}
    </>
  );
};
export default SingleImgCreator;
