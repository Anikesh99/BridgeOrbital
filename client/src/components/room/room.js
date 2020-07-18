import React, { Component, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Swal from 'sweetalert2'
import { Card, HandStyles, CardStyles, Hand } from 'react-casino'
import socket from 'socket.io-client/lib/socket'

const ENDPOINT = ''

function resultInWords(x) {
    let num
    if (x % 5 === 0) {
        num = x / 5
    } else {
        num = Math.floor(x / 5) + 1
    }
    let suit
    if (x % 5 === 0) {
        suit = 'no trump'
    } else if (x % 5 === 1) {
        suit = 'Diamond'
    } else if (x % 5 === 2) {
        suit = 'Club'
    } else if (x % 5 === 3) {
        suit = 'Heart'
    } else if (x % 5 === 4) {
        suit = 'Spade'
    }
    return num + ' ' + suit
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
})

class Room extends Component {
    constructor(props) {
        super(props)
        const {
            match: { params },
        } = props

        this.state = {
            board: [],
            selected: new Set(),
            deck: {}, // this one we need to link with backend and also react-casino
            collected: new Set(),
            socket: socketIOClient(ENDPOINT),
            roomId: '',
            displayStart: true,
            hand: [], //represents hand of client
            //curr highest bid
            currHighest: '0',
            //id of socket that called the curr highest bid
            calledBy: '',
            //sockets that are ready (previously needed to click startGame)
            //current: just need to pass on the calling
            isReady: new Set(),
            needToWin: '7',
            partner: '',
            wonSets: '0',
            partnerCarder: false,
            callWinner: false,
            name: '',
            nameList: new Map(),
        }
    }

    //start componentdidmount=============================================================================================

    componentDidMount() {
        //this.RoomConfigurator()

        //copied, delays time in ms
        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        //previously in dealQuery
        this.state.socket.on('dealHand', (hand) => {
            this.setState({
                hand: hand,
            })
            console.log(
                `${this.state.socket.id} rec'd hando of ${this.state.hand}`
            )
        })


        this.state.socket.on('cardSelected', (userFS) => {
            console.log(userFS)
            //setState for the selected cards

            this.setState({
                selected: this.state.selected.add(userFS),
            })

            //if there are 4 cards in selected, evaluate and assign winner of set
            if (
                this.state.selected.size === 4 &&
                this.state.socket.id === this.state.roomId
            ) {
                //delays 3s for people to see the last card played
                sleep().then(() => {
                    this.state.socket.emit('checkSetWinner', {
                        rmid: this.state.roomId,
                        selected: Array.from(this.state.selected),
                        currHighest: this.state.currHighest,
                    })
                })
            }
        })

        this.state.socket.on('foundSetWinner', (winner) => {
            if (this.state.needToWin === 1) {
                this.whoTheWinner(winner)
            } else {
                if (this.state.socket.id === winner) {
                    this.setState({
                        wonSets: parseInt(this.state.wonSets, 10) + 1,
                    })
                }

                if (
                    this.state.socket.id === winner ||
                    this.state.partner === winner
                ) {
                    this.setState({
                        needToWin: this.state.needToWin - 1,
                    })
                } else {
                    //lost set but still nv lose game
                }
                this.clearBoard()
            }
        })

        this.state.socket.on('isReady', (user) => {
            const newReady = this.state.isReady.add(user)
            this.setState({ isReady: newReady })
            if (this.state.isReady.size === 4) {
                this.startGame(this.state.roomId, user)
            }
        })

        this.state.socket.on('updateHighest', (result) => {
            const calledBy = result.slice(0, 20)
            const newHighest = result.slice(21)

            this.setState({
                calledBy: calledBy,
                currHighest: newHighest,
            })
            console.log(`updateHighest rec'd: ${newHighest}`)
        })

        this.state.socket.on('startCallFail', () => {
            Swal.fire({
                title: 'Cannot start calling, not enough people',
                timer: 2000,
            })
        })

        this.state.socket.on('selectPartner', (lastuser) => {
            this.selectPartner(lastuser)
        })

        this.state.socket.on('assignPartner', ({ FS, newNTW, sentBy }) => {
            //console.log('assigning in progress')
            if (this.state.hand.includes(FS)) {
                this.updateNeedToWin(newNTW)
                this.setState({
                    partner: sentBy,
                    partnerCarder: true,
                })
                this.state.socket.emit('partnerPresent', {
                    partner: this.state.partner,
                    user: this.state.socket.id,
                    rmid: this.state.roomId,
                })
            } else {
                if (this.state.socket.id !== sentBy) {
                    this.state.socket.emit('otherTwo', {
                        user: this.state.socket.id,
                        rmid: this.state.roomId,
                    })
                }
            }
        })

        this.state.socket.on('fakeWinTesting', (user) => {
            this.whoTheWinner(user)
        })

        this.state.socket.on('otherTwoPartner', (otherUser) => {
            if (
                otherUser !== this.state.socket.id &&
                !this.state.partnerCarder &&
                this.state.partner === '' &&
                !this.state.callWinner
            ) {
                this.setState({
                    partner: otherUser,
                    needToWin:
                        14 -
                        (parseInt(this.state.needToWin, 10) +
                            parseInt(
                                Math.floor(this.state.currHighest / 5),
                                10
                            )),
                })
            }
        })

        this.state.socket.on('backwardsRecd', ({ partner, user }) => {
            if (
                partner === this.state.socket.id &&
                this.state.partner === '' &&
                !this.state.partnerCarder
            ) {
                this.setState({
                    partner: user,
                })
            }
        })

        this.state.socket.on('nameListUpdate', ({ name, id }) => {
            this.setState({
                nameList: this.state.nameList.set(id, name)
            })
            this.state.socket.emit('previouslyAdded', ({
                rmid: this.state.roomId,
                name: this.state.name,
                id: this.state.socket.id
            }))
        })

        this.state.socket.on('NLbackUpdate', ({ name, id }) => {
            this.setState({
                nameList: this.state.nameList.set(id, name)
            })
        })
    }

    //end componentdidmount===============================================================================================
    changeName = () => {
        Swal.fire({
            title: "Enter new name",
            input: "text",
            confirmButtonText: "Set name",
        }).then((result) => {

            if (result.isDismissed || result.value === '') {
                this.setState({
                    name: this.state.socket.id,
                })
            } else {
                this.setState({
                    name: result.value,
                })
            }

            if (this.state.roomId !== '' && (this.state.name !== '')) {
                this.state.socket.emit('setName', {
                    name: this.state.name,
                    id: this.state.socket.id,
                    rmid: this.state.roomId,
                })
            }

        })
    }

    clearBoard = () => {
        let newCollected = this.state.collected
        //add all cards in selected to collected
        for (let card of this.state.selected.values()) {
            newCollected.add(card)
        }
        this.setState({
            collected: newCollected,
            selected: new Set(),
        })
    }

    whoTheWinner = (guy) => {
        if (this.state.socket.id === guy) {
            Swal.fire(
                `Congrats!\nYou beat your friends and they're bad at this game`
            )
        } else if (this.state.partner === guy) {
            Swal.fire(`Congrats!\nYou got carried you boosted animal`)
        } else {
            Swal.fire(`Whoops!\n${guy}'s team beat your ass teeheexd`)
        }
    }

    clickCard = (e, card) => {
        const cardString = JSON.stringify(card)
        console.log(cardString)
        const faes = cardString.slice(9, 10)
        const soot = cardString.slice(20, 21)
        this.state.socket.emit(
            'clickedCard',
            this.state.roomId + this.state.socket.id + faes + soot
        )

        //removes the clicked card from hand upon clicking
        const selectedRemoved = this.state.hand.filter(
            (thing) => thing !== faes + soot
        )
        this.setState({
            hand: selectedRemoved,
        })
    }

    startGame = (rmid, lastuser) => {
        const {
            match: { params },
        } = this.props
        this.state.socket.emit('startGame', { rmid: rmid, lastuser: lastuser })
    }

    dealQuery = () => {
        this.state.socket.emit('dealQuery', this.state.roomId)
        this.state.socket.on('playersNeeded', () => {
            Swal.fire({
                title: 'Not enough players yet',
            })
        })
    }

    updateNeedToWin = (newNTW) => {
        this.setState({
            needToWin: newNTW,
        })
    }

    selectPartner = (lastuser) => {
        if (this.state.socket.id === lastuser) {
            //this.updateCallingAdd()
            //console.log('callingadd: ' + this.state.callingAddition)
            this.setState({
                needToWin:
                    parseFloat(this.state.needToWin, 10) +
                    parseFloat(Math.floor(this.state.currHighest / 5) / 4, 10),
            })
            Swal.fire({
                title: 'Select your partner, enter value in [face][suit]',
                input: 'text',
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (this.state.hand.includes(result.value)) {
                    Swal.fire({
                        title: `You cannot select yourself`,
                        timer: 2000,
                    })
                    //console.log('cannot select yourself as partner')
                    this.selectPartner()
                } else if (result.value === '') {
                    console.log('no partner selected')
                    Swal.fire({
                        title: 'no partner selected',
                        timer: '2000',
                    })
                    this.selectPartner()
                } else {
                    console.log('other partner selected')
                    this.setState({ callWinner: true })

                    this.state.socket.emit('partnerQuery', {
                        rmid: this.state.roomId,
                        FS: result.value,
                        newNTW: this.state.needToWin,
                        sentBy: this.state.socket.id,
                    })
                }
            })
        } else {
            Swal.fire(
                `${lastuser} won the bet, wait for the partner picking thing`
            )
        }
    }

    callProcess = () => {
        this.state.socket.emit(
            'callStart',
            this.state.roomId + ' ' + this.state.socket.id
        )
        this.state.socket.on('startCallSuccess', () => {
            Swal.fire({
                title: 'start calling!',
                input: 'select',
                inputOptions: {
                    '0': 'Pass',
                    '1': '1 Diamond',
                    '2': '1 Clubs',
                    '3': '1 Heart',
                    '4': '1 Spade',
                    '5': '1 No trump',
                    '6': '2 Diamond',
                    '7': '2 Clubs',
                    '8': '2 Heart',
                    '9': '2 Spade',
                    '10': '2 No trump',
                    '11': '3 Diamond',
                    '12': '3 Clubs',
                    '13': '3 Heart',
                    '14': '3 Spade',
                    '15': '3 No trump',
                    '16': '4 Diamond',
                    '17': '4 Clubs',
                    '18': '4 Heart',
                    '19': '4 Spade',
                    '20': '4 No trump',
                    '21': '5 Diamond',
                    '22': '5 Clubs',
                    '23': '5 Heart',
                    '24': '5 Spade',
                    '25': '5 No trump',
                },
            }).then((result) => {
                console.log(
                    'result ' +
                    JSON.stringify(result) +
                    ' currHighest: ' +
                    this.state.currHighest
                )
                if (result.isConfirmed) {
                    if (parseInt(result.value, 10) === 0) {
                        this.state.socket.emit(
                            'readyToStart',
                            this.state.socket.id +
                            ' ' +
                            this.state.roomId +
                            ' ' +
                            this.state.isReady.size
                        )
                    } else {
                        if (
                            parseInt(result.value, 10) <=
                            parseInt(this.state.currHighest, 10)
                        ) {
                            Swal.fire({
                                title: `Call something higher than 
                                \n${resultInWords(this.state.currHighest)}`,
                            })
                        } else {
                            this.state.socket.emit(
                                'callResult',
                                this.state.socket.id +
                                ' ' +
                                this.state.roomId +
                                ' ' +
                                result.value.valueOf()
                            )
                        }
                    }
                } else {
                    //need to call the swal again
                }
            })
        })
    }

    nameFromId = (id) => {
        if (!this.state.nameList.has(id)) {
            return (this.state.nameList.get(id))
        } else {
            return id
        }
    }

    //=======================================================================================

    render() {
        const {
            board,
            selected,
            socket,
            roomId,
            hand,
            currHighest,
            calledBy,
            isReady,
            needToWin,
            wonSets,
            partner,
            name,
            nameList
        } = this.state

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
        const longButton = {
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
            <div>
                <div>
                    <img
                        src="https://static.guides.co/a/uploads/1063%2F4suits.png"
                        alt="new"
                    />
                    <br />
                    {/*the statement at the bottom is for debugging */}
                    {/* Your partner is {this.state.partner} */}
                    <br />
                    {/* needToWin {needToWin} */}
                </div>

                <div
                    style={{
                        fontSize: 24,
                    }}
                >
                    {this.state.nameList}
                    Welcome, {this.state.name}
                    {' '}({this.state.socket.id})
                    to room {this.state.roomId}
                </div>

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
                            this.changeName()
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

                                //checkNumber checks if there are 4 people in the room
                                this.state.socket.emit(
                                    'checkNumber',
                                    this.state.roomId
                                )
                                //if exactly 4 people are in the room, then server.js calls dealHand
                            })
                            this.state.socket.on('NoRoom', (errmsg) => {
                                Swal.fire({
                                    title: errmsg,
                                    cancelButton: true,
                                }).then((window.location = './room'))
                            })
                        }).then(() => { this.changeName() })
                    }}
                >
                    Join Room
                </button>
                {/* <RoomHud
                    displayStart={true}
                    socket={this.state.socket}
                    roomId={this.state.roomId}
                /> */}
                <React.Fragment>
                    <div style={{ position: 'relative' }}>
                        <Board
                            board={board}
                            selected={selected}
                            clickCard={this.clickCard}
                            socket={socket}
                            roomId={roomId}
                            hand={hand}
                            currHighest={currHighest}
                            calledBy={calledBy}
                            isReady={isReady}
                            wonSets={wonSets}
                            partner={partner}
                            nameList={nameList}
                        />
                    </div>
                    {/* <button style={buttonStyle} onClick={this.dealQuery}>
                    </button> */}
                    <button style={longButton} onClick={this.callProcess}>
                        Begin calling
                    </button>

                    {/*to test the win triggers*/}
                    {/* <button
                        style={longButton}
                        onClick={() => this.state.socket.emit('testWinner', {
                            user: this.state.socket.id,
                            rmid: this.state.roomId
                        })
                        }>
                        Fake win trigger, testing
                    </button>
                     */}
                    {/* <button
                        style={longButton}
                        onClick={() => {
                            Swal.fire({
                                title: 'input partner',
                                input: 'text'
                            }).then((result) => {
                                this.setState({
                                    partner: result.value
                                })
                            })
                        }}>
                        Fake partner allaocation for testing
                    </button> */}
                    {/* <button
                        onClick={() =>
                            this.state.socket.emit('startGame', this.state.roomId)
                        }
                        style={longButton}
                    >
                        Start
                    </button> */}
                </React.Fragment>
            </div >
        )
    }
}

//used to render RoundBoard(below), and the player's hand
const Board = (props) => {
    function showCards(hand, result) {
        hand.forEach((card) =>
            result.push(
                <Card
                    face={card.slice(0, 1)}
                    suit={card.slice(1)}
                    onClick={(e, card) =>
                        //console.log(JSON.stringify(card))
                        props.clickCard(e, card)
                    }
                />
            )
        )
    }

    let result = []
    showCards(props.hand, result)
    let PepeHands = () => result

    function callingDisplay(input) {
        if (input === '') {
            return 'Current highest call '
        } else {
            return 'Call winner '
        }
    }

    function isReadyEmpty(set) {
        if (set.size === 0) {
            return 'Nobody'
        } else {
            let ids = new Array(...set)
            let ret = new Set()
            ids.forEach(id => ret.add(props.nameList.get(id)))
            return new Array(...ret).join(', ')
        }
    }

    return (
        <div>
            <RoundBoard selected={props.selected} />
            <PepeHands />
            <div style={{ fontSize: 20 }}>
                {/*should probably pick a better font for this*/}
                {callingDisplay(props.partner)} is:{' '}
                {resultInWords(props.currHighest)}, called by {props.nameList.get(props.calledBy)}
                <br />
                {isReadyEmpty(props.isReady)} is/are ready to start
                <br />
                You have won {props.wonSets} hand(s) so far
            </div>
        </div>
    )
}

//used to render the board in each round, (props.selected and props.collected)
const RoundBoard = (props) => {
    // each round => props.selected
    // after each round, add to props.collected

    function showSelected(selected, result) {
        for (let userFS of selected.keys()) {
            result.add(
                <Card face={userFS.slice(20, 21)} suit={userFS.slice(21)} />
            )
        }
    }

    let chosen = new Set()
    showSelected(props.selected, chosen.add(<CardStyles />))
    let DisplaySelected = () => [...chosen]
    return (
        <div>
            <DisplaySelected />
        </div>
    )
}

export default Room
