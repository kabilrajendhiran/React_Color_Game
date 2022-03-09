import React, { Component } from "react";
import styles from './ColorCard.module.css';

class ColorCard extends Component{

    

    render()
    {
        const {red, green, blue} = this.props.rgbColor;
        let outerCardStyle = styles.outerCard + ' ';
        let innerCardStyle = styles.innerCard + ' ';
        let flag = false;
        let clicked = false;
        let winStatus = true;
        if(this.props.cardData!==undefined)
        {
            flag = this.props.cardData.flag;
            clicked = this.props.cardData.clicked;
            winStatus = this.props.cardData.winStatus;
        }
        

        if(clicked)
        {
            if(flag){
                outerCardStyle = outerCardStyle + styles.outerCardCorrectStatus;
                innerCardStyle = innerCardStyle + styles.innerCardCorrectStatus;
            }
            else
            {
                outerCardStyle = outerCardStyle + styles.outerCardWrongStatus;
                innerCardStyle = innerCardStyle + styles.innerCardWrongStatus;
            }
        }


        return(
        <React.Fragment>
            {/* <div className={outerCardStyle}>
                <div onClick={this.props.onClick} className={innerCardStyle} style={{
                    backgroundColor: `rgb(${red},${green},${blue})`,
                    opacity:  `${clicked && !flag ? '0': '1'}` 
                }}>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                    }} >

                    </div>
                </div>
            </div> */}

            <div  className={"card "+ outerCardStyle} style={{width:this.props.size, height:this.props.size}} >
                <div className={"card-body "+ styles.innercardholder }>
                    <div onClick={this.props.onClick} className={"card "+ innerCardStyle}  style={{ backgroundColor: `rgb(${red},${green},${blue})`, 
                    opacity:  `${clicked && !flag ? '0': '1'}`,
                    cursor:  `${winStatus ? 'default': 'pointer'}`,
                    }}>
                        <div className="card-body" >
                        </div>
                    </div>  
                </div>
            </div>

        </React.Fragment>
        );
    }

}

export default ColorCard;