import React, { Component, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Swal from 'sweetalert2'
import { Card, HandStyles, CardStyles, Hand } from 'react-casino'
import socket from 'socket.io-client/lib/socket'

const ENDPOINT = 'http://127.0.0.1:5000'

class Room extends Component {
    constructor(props) {
        super(props)
        const {
            match: { params },
        } = props

        this.state = {
            board: [],
            selected: {},
            deck: {}, // this one we need to link with backend and also react-casino
            collected: {},
            socket: socketIOClient(ENDPOINT),
            roomId: '',
            displayStart: true,
            hand: [], //represents hand of client
            currCall: '',
            stillCalling: true,
        }
    }

    // componentDidMount() {
    //     this.RoomConfigurator()
    // }

    clickCard = () => {
        this.state.socket.emit('click_card')
    }

    startGame = () => {
        const {
            match: { params },
        } = this.props
        this.state.socket.emit('startGame', params.roomId)
    }

    dealQuery = () => {
        this.state.socket.emit('dealQuery', this.state.roomId)
        this.state.socket.on('dealHand', (hand) => {
            this.setState({
                hand: hand,
            })
            console.log(
                `${this.state.socket.id} rec\'d hando of ${this.state.hand}`
            )
        })
        this.state.socket.on('playersNeeded', () => {
            Swal.fire({
                title: 'Not enough players yet',
            })
        })
    }

    //=======================================================================================
    callProcess = () => {
        //console.log('starting call process')
        this.state.socket.emit('callStart', this.state.roomId)
        this.state.socket.on('startCallSuccess', () => {
            Swal.fire({
                title: 'Start calling!',
                input: 'select',
                inputOptions: {
                    '0': 'Pass',
                    '1': '1 Diamond',
                    '2': '1 Clubs',
                    '3': '1 Heart',
                    '4': '1 Spade',
                    '5': '2 Diamond',
                    '6': '2 Clubs',
                    '7': '2 Heart',
                    '8': '2 Spade',
                    '9': '3 Diamond',
                    '10': '3 Clubs',
                    '11': '3 Heart',
                    '12': '3 Spade',
                    '13': '4 Diamond',
                    '14': '4 Clubs',
                    '15': '4 Heart',
                    '16': '4 Spade',
                    '17': '5 Diamond',
                    '18': '5 Clubs',
                    '19': '5 Heart',
                    '20': '5 Spade',
                },
            }).then((result) => {
                if (result.value.valueOf() == '0') {
                    this.state.socket.emit('callResult', 0, 0)
                } else {
                    const call = parseInt(result.value, 10)
                    console.log(call)
                    this.state.socket.emit(
                        'callResult',
                        this.state.roomId,
                        call
                    )
                }
                // this.state.currCall = this.state.socket.id + ' ' + result.value
            })
        })

        this.state.socket.on('startCallFail', () => {
            Swal.fire({
                title: 'Cannot start calling, not enough people',
                timer: 2000,
            })
        })
    }
    //=======================================================================================

    render() {
        const { board, selected, socket, roomId, hand } = this.state

        //========================================================================
        // this.state.socket.on('dealHand', (hand) => {
        //     console.log(`recd' hand of ${hand}`)
        // })
        //========================================================================

        const buttonStyle = {
            width: '350px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontFamily: 'Josephin Sans',
            background: 'black',
            borderRadius: '5px',
            color: 'white',
            margin: '10px 0px',
            padding: '10px 60px',
            cursor: 'pointer',
        }
        return (
            <div>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        Swal.fire({
                            title: 'You are making your own room',
                            text: 'Room code: ' + this.state.socket.id,
                            confirmButtonText: 'Join room',
                        }).then(() => {
                            this.setState({
                                roomId: this.state.socket.id,
                            })
                            this.state.socket.emit('new_room')
                        })
                    }}
                >
                    Create Room
                </button>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        Swal.fire({
                            title: 'Please enter the room code to join:',
                            input: 'text',
                            confirmButtonText: 'Join',
                            showCancelButton: true,
                            showLoaderOnConfirm: true,
                        }).then((result) => {
                            this.state.socket.emit('joinRoom', result)
                            this.state.socket.on('RoomFound', () => {
                                this.setState({
                                    roomId: result.value,
                                })
                            })
                            this.state.socket.on('NoRoom', (errmsg) => {
                                Swal.fire({
                                    title: errmsg,
                                    cancelButton: true,
                                }).then((window.location = './room'))
                            })
                        })
                    }}
                >
                    Join Room
                </button>
                <RoomHud
                    displayStart={true}
                    socket={this.state.socket}
                    roomId={this.state.roomId}
                />
                <React.Fragment>
                    <div style={{ position: 'relative' }}>
                        <Board
                            board={board}
                            selected={selected}
                            clickCard={this.clickCard}
                            socket={socket}
                            roomId={roomId}
                            hand={this.state.hand}
                        />
                    </div>
                    <button style={buttonStyle} onClick={this.dealQuery}>
                        Deal hands
                    </button>
                    <button style={buttonStyle} onClick={this.callProcess}>
                        Begin calling
                    </button>
                </React.Fragment>
            </div>
        )
    }
}

class RoomHud extends Component {
    constructor(props) {
        super(props)
        this.handleStartButton = this.handleStartButton.bind(this)
        this.handleWelcome = this.handleWelcome.bind(this)
        this.state = {
            displayStart: this.props.displayStart,
            socket: this.props.socket,
            roomId: this.props.roomId,
        }
    }

    handleStartButton() {
        this.setState({ displayStart: true })
    }

    handleWelcome() {
        this.setState({ displayStart: false })
    }

    render() {
        const displayStart = this.state.displayStart
        let rendered
        if (displayStart) {
            rendered = (
                <StartButton
                    socket={this.state.socket}
                    roomId={this.state.roomId}
                />
            )
        } else {
            rendered = <Welcome roomId={this.state.roomId} />
        }
        return <div>{rendered}</div>
    }
}

class StartButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomId: this.props.roomId,
            socket: this.props.socket,
        }
    }
    render() {
        const buttonStyle = {
            width: '700px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontFamily: 'Josephin Sans',
            background: 'black',
            borderRadius: '5px',
            color: 'white',
            margin: '10px 0px',
            padding: '10px 60px',
            cursor: 'pointer',
        }
        return (
            <button
                onClick={() =>
                    this.state.socket.emit('startGame', this.state.roomId)
                }
                style={buttonStyle}
            >
                Start
            </button>
        )
    }
}

const Welcome = (props) => {
    const Message = 'Welcome to room ' + this.props.roomId
    return (
        <h3>
            <Message />
        </h3>
    )
}

const Board = (props) => {
    let copyHand = props.hand
    const clickedCard = (card) => {
        Swal.fire({
            title: `You are playing ${JSON.stringify(card)}`,
        })
        let filtered = props.hand.filter((x) => x.valueOf() !== card.valueOf())
        copyHand = filtered
        props.socket.emit('clickedCard', card)
    }

    function showCards(hand, result) {
        hand.forEach((card) =>
            result.push(
                <Card
                    face={card.slice(0, 1)}
                    suit={card.slice(1)}
                    onClick={(e, card) => clickedCard(card)}
                />
            )
        )
    }

    let result = []
    showCards(copyHand, result)
    let PepeHands = () => result

    return (
        <div>
            <PepeHands />
        </div>
    )
}

export default Room
