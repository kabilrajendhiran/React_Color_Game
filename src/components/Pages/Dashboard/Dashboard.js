import {Component, Fragment, createRef} from "react";
import Button from "../../UI/Button/Button";
import ColorCard from '../../UI/ColorCard/ColorCard';
import BootStrapModal from "../../UI/Modal/Modal";
import classes from './Dashboard.module.css'
import {Modal} from 'bootstrap';

class Dashboard extends Component {
    
    constructor(props)
    {
        super(props);
        this.modalRef = createRef();
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
        const { btnLabel, btnColor, gameResult, modelTitle, modelContent } = this.dashboardDataGenerator();
        return (
            <Fragment>
                <div className={classes.container}>
                <div className={classes.dashboardHeaderContainer} >

                    <p style={{fontSize:'32px'}}>Guess the color</p>
                    
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
                        <BootStrapModal title={modelTitle} content={modelContent} customRef={this.modalRef} showModal={this.showModal} hideModal={this.hideModal} />
                    </h3>
                </div>
                </div>
                    
            </Fragment>
        );
    }

    componentDidMount()
    {
        if(!this.state.firstClick) {
            this.showModal();
        }
    }

    componentDidUpdate()
    {
        if(this.state.winStatus)
        {
            this.showModal();
        }
    }

    showModal = () => {
        const modalEle = this.modalRef.current;
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    
    hideModal = () => {
        const modalEle = this.modalRef.current;
        const bsModal= Modal.getInstance(modalEle)
        bsModal.hide()
    }

    dashboardDataGenerator()
    {
        let label = {
            btnLabel:"",
            btnColor:"",
            gameResult:"",
            modelTitle:"",
            modelContent:""
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
            label.modelTitle = "Instructions";
            label.modelContent = "Choose color according to the combination of colors from the top";
        }
        if(winStatus)
        {
            label.btnLabel = "Play Again";
            label.btnColor="btn-error";
            label.gameResult = "You won!!!";
            label.modelTitle= "Game result";
            label.modelContent = "You won";
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
        });
    }

    matchColor(elem, index)
    {
        if(this.state.winStatus)
        {
            return;
        }

        if(this.state.quizColor===elem)
        {
            let newColorArr = this.state.colorArray.map((clr, id)=>{
                if(index===id)
                {
                    return {...elem, flag:true , clicked: true}
                }
                return elem;
            });
            this.setState({colorArray: newColorArr, winStatus: true, firstClick: true});
            
        }
        else
        {
            let newColorArr = [...this.state.colorArray]
            newColorArr[index].clicked = true;
            this.setState({colorArray: newColorArr, firstClick: true, score:this.state.score-25});
        }
        
    }


    rgbQuizColorPicker()
    {
        let idx = this.randomInt(3);
        this.setState({quizColor:this.state.colorArray[idx]});
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