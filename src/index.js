import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            coordinates: null
        }

        const id = 'just-tooltip';

        this.domNode = document.querySelector(`#${id}`);

        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.setAttribute('id', id);
            document.body.appendChild(this.domNode);
        }
    }

    setCoordinates = event => {
        this.setState({
            coordinates: {
                top: `${event.clientY + 10}px`,
                left: `${event.clientX + 10}px`
            }
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
        const { render } = this.props;
        const { showTooltip } = this.state;

        const toolTipWrapperStyled = {
            ...this.state.coordinates,
            position: 'absolute',
            backgroundColor: '#424242',
            color: '#c1c1c1',
            padding: '5px',
            borderRadius: '4px',
        }

        if (!!showTooltip) {
            return ReactDOM.createPortal(
                <div style={toolTipWrapperStyled}>
                    <div>
                        {render}
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
                onMouseEnter={() => this.showTooltip()}
                onMouseLeave={() => this.hideTooltip()}
                onMouseMove={(e) => this.setCoordinates(e)}
                onFocus={() => this.showTooltip()}
                onBlur={() => this.hideTooltip()}
                key='tooltip'
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

Tooltip.propTypes = {
    children: PropTypes.node.isRequired
}

export default Tooltip;
