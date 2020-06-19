const defaultColors = {
    "dark": { "color": "#c1c1c1", "backgroundColor": "#424242" },
    "light": { "color": "#424242", "backgroundColor": "#fff" },
    "success": { "color": "#fff", "backgroundColor": "#8DC572" },
    "darkGreen": { "color": "#c1c1c1", "backgroundColor": "#2D572C" },
    "warning": { "color": "#000", "backgroundColor": "#E4766C" },
    "error": { "color": "#fff", "backgroundColor": "#BE6464" },
    "info": { "color": "#c1c1c1", "backgroundColor": "#337AB7" },
    "lightBlue": { "color": "#713360", "backgroundColor": "#B2A5F3" },
    "pinkMilk": { "color": "#713360", "backgroundColor": "#F594B9" },
};

export const getDefaultColors = type => {
    return defaultColors[type] ? { ...defaultColors[type] } : undefined;
}