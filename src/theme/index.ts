import { reactive } from "vue";
import { IMaterialSchemes } from "..";
import { IMaterialTheme } from '../index';
import { Elevation, IElevations } from "./elevation";
import { IComputedColors, computeColors } from "./computedColors";

enum Contrast {
    Low,
    Mid,
    High
}

interface ITheme {
    colors: IMaterialTheme & IComputedColors,
    elevations: IElevations
} 

const theme = reactive({
    theme: {} as ITheme,
    materialSchemes: {} as IMaterialSchemes,
    isDark: false,
    contrast: Contrast.Low,

    setTheme() {
        if (this.isDark) {
            if (this.contrast === Contrast.Low) this.theme.colors = computeColors(this.materialSchemes.schemes.dark);
            else if (this.contrast === Contrast.Mid) this.theme.colors = computeColors(this.materialSchemes.schemes["dark-medium-contrast"]);
            else this.theme.colors = computeColors(this.materialSchemes.schemes["dark-high-contrast"]);
        } else {
            if (this.contrast === Contrast.Low) this.theme.colors = computeColors(this.materialSchemes.schemes.light);
            else if (this.contrast === Contrast.Mid) this.theme.colors = computeColors(this.materialSchemes.schemes["light-medium-contrast"]);
            else this.theme.colors = computeColors(this.materialSchemes.schemes["light-high-contrast"]);
        }

        this.theme.elevations = Elevation(this.isDark);
    },

    SetMaterialSchemes(theme: IMaterialSchemes) {
        this.materialSchemes = theme;
        this.setTheme()
    },

    DarkMode() {
        this.isDark = true;
        this.setTheme();
    },

    LightMode() {
        this.isDark = false;
        this.setTheme();
    },

    ContrastLow() {
        this.contrast = Contrast.Low;
        this.setTheme();
    },

    ContrastMid() {
        this.contrast = Contrast.Mid;
        this.setTheme();
    },

    ContrastHigh() {
        this.contrast = Contrast.High;
        this.setTheme();
    }
})


export default theme;