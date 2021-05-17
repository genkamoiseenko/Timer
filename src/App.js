import React, {Component} from 'react';
import moment from "moment";
import ButtonsBlock from "./ButtonsBlock";
import TimeBlock from "./TimeBlock";

import './App.css';

class App extends Component {

    state = {
        startTime: null,
        timer: "00:00:00",
        buttonWaitClicked: false,
        waitMode: false,
        waitStarted: null
    }

    setStartTime = () => {
        const { startTime, waitMode, waitStarted } = this.state;

        if(waitMode) {
            this.setState({
                startTime: moment(moment(startTime).valueOf() + new Date().getTime() - waitStarted + 1000)
            })
            setTimeout(() => {
                this.timerTurnOn();
            }, 200)

        } else {
            this.setState({
                startTime: moment(new Date().getTime()),
                waitMode: false,
            }, () => {
                this.timerTurnOn();
            })
        }

    }

    timerTurnOn = () => {
        const {startTime} = this.state;

        this.timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const endTime = moment(currentTime);


            const duration = moment.duration(endTime.diff(startTime));
            const timer = [duration.hours(),duration.minutes(),duration.seconds()].map(item => {
                const zerostring = `00`+ item;
                const time = zerostring.substr(zerostring.length-2, zerostring.length);
                return time;
            }).join(':')
            this.setState({
                timer
            });
        }, 1000)
    }

    stopTimer  = () => {
        clearInterval(this.timer);
    }

    setStopTime = () => {
        this.stopTimer();
        this.setState({
            timer: "00:00:00",
            startTime: null,
            waitMode: false,
        })
    }

    waitTimer = () => {
        const {buttonWaitClicked} = this.state
        if (buttonWaitClicked) {
            this.stopTimer()
        } else {
            this.setState({
                buttonWaitClicked: true,
            })
            setTimeout(() => {
                this.setState({
                    buttonWaitClicked: false,
                    waitMode: true,
                    waitStarted: new Date().getTime(),
                })
            }, 300)
        }
    }

    render() {
        const {timer} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <TimeBlock
                         timer = {timer}
                    />
                    <ButtonsBlock
                        startTime= {this.setStartTime }
                        stopTime={this.setStopTime}
                        wait = {this.waitTimer}
                    />
                </header>
            </div>
        );
    }
}

export default App;