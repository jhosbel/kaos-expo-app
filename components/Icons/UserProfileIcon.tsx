import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UserProfileIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    {...props}
  >
    <Path
      id="User_Circle_1_"
      d="M12.5,0A12.5,12.5,0,0,0,3.84,21.52a12.365,12.365,0,0,0,8.06,3.45c.15.01.31.03.46.03h.14a12.5,12.5,0,0,0,0-25Zm8.41,20.33c-.46-1.63-2.64-2.51-4.28-3.16l-.56-.23C15,16.5,15,16.09,15,15.5a2.079,2.079,0,0,1,.59-1.38,4.356,4.356,0,0,0,1.48-3.38A4.5,4.5,0,0,0,12.5,6a4.415,4.415,0,0,0-4.48,4.74,4.3,4.3,0,0,0,1.41,3.38,1.977,1.977,0,0,1,.56,1.38c0,.42,0,.94-1.3,1.47-1.6.66-3.72,1.56-4.69,3.26A11.5,11.5,0,1,1,24,12.5,11.415,11.415,0,0,1,20.91,20.33Z"
      fill="#0e1d25"
    />
  </Svg>
);
export default UserProfileIcon;
