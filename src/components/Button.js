import React, { Component } from "react";
import classes from './Button.module.css';
class Button extends Component {
    
    state = {
        clicked:false
    }

    render() {

        let btnState;
        if(this.state.clicked)
        {
            btnState = classes.btnPressed;
        }
        else
        {
            btnState = classes.btnNormal;
        }

        return (
            <React.Fragment>
            <button style={this.props.style} 
                
                className={classes.btn +' '+  btnState} 
                onMouseDown={()=>{this.setState({clicked:true})}} 
                onMouseUp={()=>{this.setState({clicked:false})}}
                onClick={this.props.onClick}
                >
                {this.props.btnLabel}
            </button>
            </React.Fragment>
        );
    }
}

export default Button;