import { IMaterialTheme } from "..";
import { hexToRgba } from "../helpers";

export interface IComputedColors {
    "stateLayer": string;
    "disabled": string;
}


export function computeColors(colors: IMaterialTheme): IComputedColors&IMaterialTheme {
    return {
        "stateLayer": hexToRgba(colors.onSurfaceVariant, 0.08),
        "disabled": hexToRgba(colors.onSurface, 0.38),
        ...colors
    }
}