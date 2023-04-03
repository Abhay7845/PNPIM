import React from "react";

export default function TestData() {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,

    width: window.innerWidth,
  });

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,

        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      Rendered at {dimensions.width} x {dimensions.height}
      {/* <img src="https://previews.agefotostock.com/previewimage/medibigoff/c5dbe1c6d474ac1fe7aa59d35cd1b46c/ssj-153805.jpg"
            width={dimensions.width} height={dimensions.height} /> */}
    </>
  );
}
