import {Component, Fragment} from "react";
import Button from "../../UI/Button/Button";
import ColorCard from '../../UI/ColorCard/ColorCard';
import classes from './Dashboard.module.css'

class Dashboard extends Component {
    
    constructor(props)
    {
        super(props);
        let colorArr =  this.rgbColorArrayGenerator();
        let qIdx = this.randomInt(3);
        this.state = { 
            colorArray: colorArr,
            quizColor: colorArr[qIdx],
            winStatus: false,
            firstClick: false,
            score:100
        }
    }


    render() { 

        const {red, green, blue} = this.state.quizColor;
        const { btnLabel, btnColor, gameResult } = this.playBtnLabelGenerator();

        return (
            <Fragment>
                
                <div className={classes.container}>
                <div style={{
                    marginTop:'3%',
                    display:'flex',
                    width:'100%',
                    flexDirection:'column',
                    alignItems:'center',
                }}>

                    <p style={{fontSize:'32px'}}>Guess the color</p>
                    {/* <p style={{fontSize:'20px'}}>{`RGB(${red}, ${green},${blue})`}</p> */}
                    <div style={{
                        display:'flex',
                        flexDirection: 'row',
                        alignItems:'center',
                        columnGap: '10px'
                    }}>
                        <ColorCard size="100px" rgbColor={{red, green:0, blue:0}} />
                        <ColorCard size="100px" rgbColor={{red:0, green, blue:0}} />
                        <ColorCard size="100px" rgbColor={{red:0, green:0, blue}} />
                    </div>

                </div>
                
                <div className={classes.appcontainer}>
                    <div className={classes.outerContainer}>
                        <div className={classes.innerContainer} >
                            {
                                this.state.colorArray.map((elem, index)=>{
                                    return <ColorCard size="220px" 
                                    key={index} 
                                    onClick={(event)=>this.matchColor(elem,index,event) } 
                                    rgbColor={elem} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div style={{textAlign:"center"}}>
                    <Button 
                        onClick={this.changeColor.bind(this)} btnLabel={btnLabel} btnColor={btnColor}
                    />

                    <h3>
                        { gameResult }
                    </h3>

                </div>
        
                </div>
                    
            </Fragment>
        );
    }

    playBtnLabelGenerator()
    {
        let label = {
            btnLabel:"",
            btnColor:"",
            gameResult:""
        };
        
        const{firstClick, winStatus } =  this.state;
        if(firstClick && !winStatus)
        {
            label.btnLabel = "Reset";
            label.btnColor ="btn-success";
            label.gameResult = "No Luck!";
        }
        if(!firstClick)
        {
            label.btnLabel = "Play";
            label.btnColor = "btn-primary";
            label.gameResult = "";
        }
        if(winStatus)
        {
            label.btnLabel = "Play Again";
            label.btnColor="btn-error";
            label.gameResult = "You won!!!";
        }
        return label;
    }

    changeColor()
    {
        let colorArr =  this.rgbColorArrayGenerator();
        let qIdx = this.randomInt(3);
        this.setState({
            colorArray: colorArr,
            quizColor: colorArr[qIdx],
            winStatus: false,
            firstClick: false,
            score:100
        });
    }

    matchColor(elem, index)
    {
        if(this.state.quizColor===elem)
        {
            let newColorArr = this.state.colorArray.map((clr, id)=>{
                if(index===id)
                {
                    return {...elem, flag:true , clicked: true}
                }
                return elem;
            });
            this.setState({...this.state, colorArray: newColorArr, winStatus: true, firstClick: true});
        }
        else
        {
            let newColorArr = [...this.state.colorArray]
            newColorArr[index].clicked = true;
            this.setState({...this.state, colorArray: newColorArr, firstClick: true, score:this.state.score-25});
        }
        
    }


    rgbQuizColorPicker()
    {
        let idx = this.randomInt(3);
        this.setState({...this.setState, quizColor:this.state.colorArray[idx]});
    }

    rgbColorArrayGenerator()
    {
        return [
            this.rgbColorGenerator(),
            this.rgbColorGenerator(),
            this.rgbColorGenerator(),
        ];
    }

    rgbColorGenerator()
    {
        return {
            red: this.randomInt(256),
            green: this.randomInt(256),
            blue: this.randomInt(256),
            flag:false,
            clicked :false
        };

    }

    randomInt(value)
    {
        return Math.floor(Math.random()*value);
    }

}

export default Dashboard;