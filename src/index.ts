import theme from './theme/index';

export interface IMaterialTheme {
    "primary": string,
    "surfaceTint": string,
    "onPrimary": string,
    "primaryContainer": string,
    "onPrimaryContainer": string,
    "secondary": string,
    "onSecondary": string,
    "secondaryContainer": string,
    "onSecondaryContainer": string,
    "tertiary": string,
    "onTertiary": string,
    "tertiaryContainer": string,
    "onTertiaryContainer": string,
    "error": string,
    "onError": string,
    "errorContainer": string,
    "onErrorContainer": string,
    "background": string,
    "onBackground": string,
    "surface": string,
    "onSurface": string,
    "surfaceVariant": string,
    "onSurfaceVariant": string,
    "outline": string,
    "outlineVariant": string,
    "shadow": string,
    "scrim": string,
    "inverseSurface": string,
    "inverseOnSurface": string,
    "inversePrimary": string,
    "primaryFixed": string,
    "onPrimaryFixed": string,
    "primaryFixedDim": string,
    "onPrimaryFixedVariant": string,
    "secondaryFixed": string,
    "onSecondaryFixed": string,
    "secondaryFixedDim": string,
    "onSecondaryFixedVariant": string,
    "tertiaryFixed": string,
    "onTertiaryFixed": string,
    "tertiaryFixedDim": string,
    "onTertiaryFixedVariant": string,
    "surfaceDim": string,
    "surfaceBright": string,
    "surfaceContainerLowest": string,
    "surfaceContainerLow": string,
    "surfaceContainer": string,
    "surfaceContainerHigh": string,
    "surfaceContainerHighest": string
}

export interface IMaterialSchemes {
    "schemes": {
        "light": IMaterialTheme,
        "light-medium-contrast": IMaterialTheme,
        "light-high-contrast": IMaterialTheme,
        "dark": IMaterialTheme,
        "dark-medium-contrast": IMaterialTheme,
        "dark-high-contrast": IMaterialTheme,
    }
}


export const DarkMode = theme.DarkMode;
export const LightMode = theme.LightMode;
export const ContrastLow = theme.ContrastLow;
export const ContrastMid = theme.ContrastMid;
export const ContrastHigh = theme.ContrastHigh;
export const SetMaterialSchemes = theme.SetMaterialSchemes;
export const Theme = theme.theme;