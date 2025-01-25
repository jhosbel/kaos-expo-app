import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const AddImage = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <Path
      fill="#8CBCD6"
      d="M40 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4Z"
    />
    <Path fill="#B3DDF5" d="M35 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <Path fill="#9AC9E3" d="M20 16 9 32h22L20 16Z" />
    <Path fill="#B3DDF5" d="m31 22-8 10h16l-8-10Z" />
    <Path
      fill="#43A047"
      d="M38 48c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
    />
    <Path fill="#fff" d="M40 32h-4v12h4V32Z" />
    <Path fill="#fff" d="M44 36H32v4h12v-4Z" />
  </Svg>
);
export default AddImage;
