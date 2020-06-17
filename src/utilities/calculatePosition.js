
export const calculatePosition = (event, dimensions) => {
    if (event.clientY + dimensions.height >= window.innerHeight) {
        return {
            left: event.clientX + 10,
            top: window.innerHeight - dimensions.height - 1 + window.scrollY
        }
    } else {
        return {
            left: event.clientX + 10,
            top: event.clientY + window.scrollY + 10
        }
    }
}