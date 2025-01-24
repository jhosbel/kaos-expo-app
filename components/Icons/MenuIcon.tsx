import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MenuIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    {...props}
  >
    <Path
      id="id_102"
      d="M.893,64.592H24.107A.963.963,0,0,0,25,63.571V61.02A.963.963,0,0,0,24.107,60H.893A.963.963,0,0,0,0,61.02v2.551A.963.963,0,0,0,.893,64.592Zm0,10.2H24.107A.963.963,0,0,0,25,73.776V71.224a.963.963,0,0,0-.893-1.02H.893A.963.963,0,0,0,0,71.224v2.551A.963.963,0,0,0,.893,74.8Zm0,10.2H24.107A.963.963,0,0,0,25,83.98V81.429a.963.963,0,0,0-.893-1.02H.893A.963.963,0,0,0,0,81.429V83.98A.963.963,0,0,0,.893,85Z"
      transform="translate(0 -60)"
      fill="#f26427"
    />
  </Svg>
);
export default MenuIcon;
