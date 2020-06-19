const styler = (tooltipsType, styles, customStyles = {}) => {

    switch (tooltipsType) {
        case "inline":
            return {
                ...styles,
                display: 'inline',
                padding: '5px',
                borderRadius: '4px',
                minHeight: '15px',
                position: 'absolute',
                textAlign: 'center'
            }
        case "custom":
            return {
                ...customStyles,
                minHeight: '15px',
                position: 'absolute',
            }

        default:
            break;
    }
}

//span triangle for tooltip
export const createSpanStyle = (backgroundColor, type) => {
    switch (type) {
        case 'none':
            return {
                display: 'none'
            };

        default:
            return {
                position: 'absolute',
                bottom: -10,
                left: 'calc(20% - 5px)',
                borderWidth: 5,
                borderStyle: 'solid',
                borderColor: `${backgroundColor} transparent transparent transparent`
            };
    }

}

export default styler;