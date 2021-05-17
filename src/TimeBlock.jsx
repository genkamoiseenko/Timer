import React, {Component} from 'react';

class TimeBlock extends Component {

    render() {
        const {timer}= this.props
        return (
            <div className="timeBlock">
                {timer}
            </div>
        );
    }
}

export default TimeBlock;