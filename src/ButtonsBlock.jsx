import React, {Component} from 'react';

class ButtonsBlock extends Component {

    state = {
        clickBtn: false,
    }

    setClickBtn = () => {
        const {startTime} = this.props

        this.setState({
            clickBtn: true,
        })
        startTime();

    }

    resetTimer = () => {
        const { stopTime } = this.props;
        const {startTime} = this.props
        stopTime();
        startTime();

    }

    upDateClickBtn = () => {
        const { stopTime } = this.props;
        stopTime();
        this.setState({
            clickBtn: false,
        })

    }

    pauseOfTimer= () => {
        const {wait} = this.props
        wait();
        this.setState({
            clickBtn: false,
        })
    }

    render() {
        const {clickBtn} = this.state
        return (
            <div className="ButtonsBlock">
                {!clickBtn && <button onClick={() => this.setClickBtn()}>Start</button>}
                {clickBtn && <button onClick={() => this.upDateClickBtn()}>Stop</button> }
                <button onClick={() => this.pauseOfTimer()}>Wait</button>
                <button onClick={() => this.resetTimer()}>Reset</button>
            </div>
        );
    }
}

export default ButtonsBlock;
