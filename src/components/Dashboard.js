import {Component, Fragment} from "react";
import Button from "./Button";
import ColorCard from './ColorCard';
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
        }
    }

    render() { 

        const {red, green, blue} = this.state.quizColor;
        return (
            <Fragment>
                
                <div className={classes.container}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    backgroundColor: '#d3d3d3'
                }}>

                    <p style={{fontSize:'24px'}}>Guess the color</p>
                    <p style={{fontSize:'48px'}}>{`RGB(${red}, ${green},${blue})`}</p>

                </div>
                
                <div className={classes.appcontainer}>
                    <div className={classes.outerContainer}>
                        <div className={classes.innerContainer} >
                            {
                                this.state.colorArray.map((elem, index)=>{
                                    return <ColorCard key={index} onClick={(event)=>this.matchColor(elem,index,event) } rgbColor={elem} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div style={{textAlign:"center"}}>
                    <Button 
                        onClick={this.changeColor.bind(this)} btnLabel={this.playBtnLabelGenerator()}
                    />

                    <h3>
                        { this.resultLabelGenerator() }
                    </h3>

                </div>
        
                </div>
                    
            </Fragment>
        );
    }

    playBtnLabelGenerator()
    {
        let label = "";
        const{firstClick, winStatus } =  this.state;
        if(firstClick && !winStatus)
        {
            label = "Reset";
        }
        if(!firstClick)
        {
            label = "Play";
        }
        if(winStatus)
        {
            label = "Play Again";
        }
        return label;
    }

    resultLabelGenerator()
    {
        let label = "";
        const{firstClick, winStatus } =  this.state;
        if(firstClick && !winStatus)
        {
            label = "No Luck!";
        }
        if(!firstClick)
        {
            label = "";
        }
        if(winStatus)
        {
            label = "You won!!!";
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
            firstClick: false
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
            this.setState({...this.state, colorArray: newColorArr, firstClick: true});
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