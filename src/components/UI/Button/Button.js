import React, { Component } from "react";
class Button extends Component {
    

    render() {

        return (
            <React.Fragment>
            <button style={this.props.style} 
                className="btn btn-primary btn-lg"
                onClick={this.props.onClick}
                >
                {this.props.btnLabel}
            </button>
            </React.Fragment>
        );
    }
}

export default Button;