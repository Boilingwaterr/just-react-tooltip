import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//utils
import styler from './utilities/styler';
import { generateUUID } from "./utilities/uuid";
import { calculatePosition, positioning } from "./utilities/calculatePosition";
import { getDefaultColors } from "./utilities/defaultColors";


class Tooltip extends React.Component {
    static get propTypes() {
        return {
            uuid: PropTypes.string,
            children: PropTypes.any,
            type: PropTypes.string,
            position: PropTypes.string,
            showTooltip: PropTypes.bool,
            coordinates: PropTypes.any,
            defaultStyle: PropTypes.string,
            customPosition: PropTypes.object,
            fontSize: PropTypes.string,
            render: PropTypes.string,
            component: PropTypes.object,
            opacity: PropTypes.number,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            uuid: this.props.uuid || generateUUID(),
            type: this.props.type || "inline",
            defaultStyle: this.props.defaultStyle || "dark",
            position: this.props.position || "follower",
            fontSize: this.props.fontSize || "16px",
            customPosition: this.props.customPosition || null,
            component: this.props.component || null,
            opacity: this.props.opacity || 0.8,
            render: this.props.render,
            showTooltip: false,
            coordinates: null,
        }

        const id = this.state.uuid;

        this.domNode = document.querySelector(`#${id}`);

        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.setAttribute('id', id);
            document.body.appendChild(this.domNode);
        }

        this.sourceRef = React.createRef();
    }

    setCoordinates = (event) => {
        calculatePosition(event, '15px')
        this.setState({
            coordinates: calculatePosition(event, '15px')
        })
    }

    showTooltip = () => {
        this.setState({
            showTooltip: true
        })
    };

    hideTooltip = () => {
        this.setState({
            showTooltip: false
        })
    };

    renderTooltip = () => {
        const {
            showTooltip, position, defaultStyle,
            type, coordinates, customPosition, fontSize,
            component, render, opacity
        } = this.state;

        let styles;

        //styling for tooltip
        const defaultColors = getDefaultColors(defaultStyle);
        if (render && typeof render === "string") {
            styles = styler(type, { ...defaultColors, opacity, fontSize });
        } else if (component && typeof component === "object") {
            styles = styler(type, { backgroundColor: 'none', opacity, fontSize });
        } else {
            throw new Error('Check type of component. field "render" should be a string, field "component" should be an object.')
        }


        //get tooltip position
        let toolTipWrapperStyled;
        let pos = positioning(type, position, coordinates, this.sourceRef.current,
            defaultColors.backgroundColor, { customPosition })
        if (pos) toolTipWrapperStyled = {
            ...styles,
            ...pos.coordinates
        }

        if (!!showTooltip) {
            return ReactDOM.createPortal(
                <div style={toolTipWrapperStyled}>
                    <div>
                        {component ? component : render}
                        <span
                            style={pos.spanStyle}
                        />
                    </div>
                </div>,
                this.domNode
            )
        }
        return null;
    };

    render() {
        const { children } = this.props;
        const elem = (
            <span
                tabIndex="0"
                onMouseEnter={this.showTooltip}
                onMouseLeave={this.hideTooltip}
                onMouseMove={e => this.setCoordinates(e)}
                onFocus={this.showTooltip}
                onBlur={this.hideTooltip}
                key={this.state.uuid}
                ref={this.sourceRef}
            >
                {children}
            </span>
        )

        return [
            elem,
            this.renderTooltip()
        ]
    }
}

export default Tooltip;
