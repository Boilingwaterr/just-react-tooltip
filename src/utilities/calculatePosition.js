import { createSpanStyle } from "./styler";

export const calculatePosition = (event, dimensions) => {
    if (event.clientY + dimensions.height >= window.innerHeight) {
        return {
            left: `${Math.floor(event.clientX + 10)}px`,
            top: `${Math.floor(window.innerHeight - dimensions.height - 1 + window.scrollY)}px`
        }
    } else {
        return {
            left: `${Math.floor(event.clientX + 10)}px`,
            top: `${Math.floor(event.clientY + window.scrollY + 10)}px`
        }
    }
}

export const positioning = (type = 'inline', position = 'bindToBlock', coordinates,
    ref, backgroundColor, customize) => {
    let spanStyle;
    if (ref)
        switch (position) {
            case 'follower':
                spanStyle = createSpanStyle(null, 'none');

                return {
                    spanStyle,
                    coordinates
                };

            case 'bindToBlock':
                type === 'custom'
                    ? spanStyle = createSpanStyle(null, 'none')
                    : spanStyle = createSpanStyle(backgroundColor);
                const { top, left, width } = ref.getBoundingClientRect();
                coordinates = {
                    bottom: window.innerHeight - top + 8 - window.scrollY,
                    left: left + width / 2 + window.scrollX
                }

                return {
                    spanStyle,
                    coordinates
                }

            case 'fixed':
                spanStyle = createSpanStyle(null, 'none');
                coordinates = { ...customize.customPosition }
                return {
                    spanStyle,
                    coordinates
                }
            default:
                return
        }
}
