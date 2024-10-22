import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type MaterialIconType = OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
};