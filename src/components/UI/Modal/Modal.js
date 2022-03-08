import React from 'react';

class BootStrapModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

        
    render() { 

        return (
        <div >
        {/* <button type="button" className="btn btn-primary" onClick={this.props.showModal}>View Results</button> */}
        <div id='myModal' className="modal fade" ref={this.props.customRef} tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">{this.props?.title}</h5>
                    <button type="button" className="btn-close" onClick={this.props.hideModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {this.props?.content}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={this.props.hideModal}>Close</button>
                    {/* <button type="button" className="btn btn-primary">Understood</button> */}
                </div>
                </div>
            </div>
        </div>
    </div>);
    }
}

export default BootStrapModal;