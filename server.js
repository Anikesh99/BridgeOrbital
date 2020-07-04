const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
// For sockets
const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000
// const index = require('./client')

//For the rooms
const { cardsInitialState, startNewGame } = require('./client/src/util')
const { default: Swal } = require('sweetalert2')
const { secretOrKey } = require('./config/keys')
const socket = require('socket.io-client/lib/socket')
// in the tut they use this to modify states and keep track
let clientIds = []
let rooms = []

//for game logic
//=================================================================================
let deck = [
    'AS',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    'TS',
    'JS',
    'QS',
    'KS',
    'AH',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    'TH',
    'JH',
    'QH',
    'KH',
    'AC',
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    'TC',
    'JC',
    'QC',
    'KC',
    'AD',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    'TD',
    'JD',
    'QD',
    'KD',
]

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}
//================================================================================

function newGame(roomId) {
    console.log(`newGame() called, game has started in ${roomId}`)
}

function printArray() {
    console.log('Active Rooms:\n---------------------------')
    for (var i in rooms) {
        console.log(
            `| ${rooms[i]}, ${JSON.stringify(
                io.sockets.adapter.rooms[rooms[i]]
            )} |`
        )
    }
    console.log('---------------------------')
}

function inside(roomId) {
    for (let room in rooms) {
        if (rooms[room] === roomId) {
            return true
        }
    }
    return false
}

function canJoin(rmid) {
    var room = io.sockets.adapter.rooms[rmid]
    return room.length < 4
}

function cardFaceRank(FS) {

    const F = FS.slice(0, 1)
    let faceValue

    if (F === '2') {
        faceValue = 0
    } else if (F === '3') {
        faceValue = 1
    } else if (F === '4') {
        faceValue = 2
    } else if (F === '5') {
        faceValue = 3
    } else if (F === '6') {
        faceValue = 4
    } else if (F === '7') {
        faceValue = 5
    } else if (F === '8') {
        faceValue = 6
    } else if (F === '9') {
        faceValue = 7
    } else if (F === 'T') {
        faceValue = 8
    } else if (F === 'J') {
        faceValue = 9
    } else if (F === 'Q') {
        faceValue = 10
    } else if (F === 'K') {
        faceValue = 11
    } else if (F === 'A') {
        faceValue = 12
    }

    return faceValue
}

function cardSuitRank(FS) {

    const S = FS.slice(1,)
    let suitValue

    if (S === 'S') {
        suitValue = 3
    } else if (S === 'H') {
        suitValue = 2
    } else if (S === 'C') {
        suitValue = 1
    } else if (S === 'D') {
        suitValue = 0
    }

    return suitValue
}

io.on('connection', (socket) => {
    clientIds.push(socket.id)
    // add to the list of sockets in game right now
    console.log(socket.id, ' connected')

    socket.on('new_room', () => {
        if (!inside(socket.id)) {
            rooms.push(socket.id)
        }
        // adds a roomID to the array of roomIDs
        console.log(`Created a new room ${socket.id}`)
        printArray()
    })

    socket.on('joinRoom', (roomId) => {
        if (inside(roomId.value) && canJoin(roomId.value)) {
            socket.join(roomId.value, () => {
                console.log(`Socket ${socket.id} joined room ${roomId.value}`)
            })
            socket.emit('RoomFound')
            //console.log(io.sockets.adapter.rooms[roomId.value])
        } else {
            let errmsg = ''
            if (!inside(roomId.value)) {
                errmsg = 'Room does not exist'
                console.log(
                    `Server emits: Oops room ${roomId.value} does not exist`
                )
            } else {
                errmsg = 'Room is full'
                console.log(
                    `Server emits: Oops room ${roomId.value} is filled to the brim`
                )
            }
            socket.emit('NoRoom', errmsg)
        }
    })

    //======================================================
    socket.on('dealQuery', (rmid) => {
        if (io.sockets.adapter.rooms[rmid].length == 4) {
            io.of('/').adapter.clients([rmid], (err, clients) => {
                shuffle(deck)
                const hand0 = deck.slice(0, 13)
                const hand1 = deck.slice(13, 26)
                const hand2 = deck.slice(26, 39)
                const hand3 = deck.slice(39, 52)

                io.to(clients[0]).emit('dealHand', hand0)
                io.to(clients[1]).emit('dealHand', hand1)
                io.to(clients[2]).emit('dealHand', hand2)
                io.to(clients[3]).emit('dealHand', hand3)

                console.log(clients[0] + ' => ' + hand0)
                console.log(clients[1] + ' => ' + hand1)
                console.log(clients[2] + ' => ' + hand2)
                console.log(clients[3] + ' => ' + hand3)
            })
        } else {
            io.sockets.in(rmid).emit('playersNeeded')
            //console.log('Not enough players yet')
        }
    })
    //======================================================

    //transmits ready status for one person to all
    socket.on('readyToStart', (result) => {
        const user = result.slice(0, 20)
        const rmid = result.slice(21, 41)
        const isReadySize = result.slice(42)
        // console.log('user:' + user)
        // console.log('rmid:' + rmid)
        //console.log('isReadySize:' + isReadySize)
        if (parseInt(isReadySize) === 3) {
            io.to(user).emit('updateNeedToWin')
        }
        io.in(rmid).emit('isReady', user)
    })

    socket.on('displayCard', (str) => {
        console.log(
            `displayCard() on server called, card is ${str.slice(0, 1)} of ${str.slice(1)}`
        )
    })

    socket.on('queryNumbers', (rmid) => {
        //console.log(io.sockets.adapter.rooms[rmid].length)
        socket.emit('getNumbers', io.sockets.adapter.rooms[rmid].length)
    })

    socket.on('clickedCard', (roomuserFS) => {
        //console.log(result + " clicked")
        const room = roomuserFS.slice(0, 20)
        const userFS = roomuserFS.slice(20,)
        //const fs = result.slice(20,)
        // console.log(rmid)
        // console.log(card)
        // io.of('/').adapter.clients([rmid], (err, clients) => {
        io.in(room).emit('cardSelected', userFS)
        //console.log(fs)
    })

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId)
        if (io.sockets.adapter.rooms[rmid].length === 0) {
            rooms.filter((room) => room != rmid)
        }
    })

    socket.on('disconnect', () => {
        console.log(socket.id, ' disconnected')
        // socket.leave(socket.roomId)
    })

    socket.on('partnerQuery', (rmidFS) => {
        const rmid = rmidFS.slice(0, 20)
        const FS = rmidFS.slice(21,)
        console.log('rmid:' + rmid + ' partner card:' + FS)
        io.to(rmid).emit('assignPartner', FS)
    })

    socket.on('callStart', (result) => {
        console.log(result)
        const rmid = result.slice(0, 20)
        const user = result.slice(21)

        console.log('roomid: ' + rmid + ' socketid: ' + user)

        //if everyone is in the room
        if (io.sockets.adapter.rooms[rmid].length === 4) {
            io.to(user).emit('startCallSuccess')
        } else {
            io.emit('startCallFail')
        }
    })

    socket.on('callResult', (result) => {
        const userid = result.slice(0, 21)
        const rmid = result.slice(21, 41)
        const called = result.slice(42)

        //console.log(result + " :" + rmid + ": " + called)

        // io.of('/').adapter.clients([rmid], (err, clients) => {
        //     clients.forEach(client => {
        //         socket.to(client).emit('updateHighest', called)
        //     })
        // })
        io.in(rmid).emit('updateHighest', userid + ' ' + called)
    })

    socket.on('startGame', (result) => {
        const rmid = result.slice(0, 21)
        const lastuser = result.slice(21)

        io.to(lastuser).emit('selectPartner')
    })

    socket.on('checkNumber', (rmid) => {
        if (io.sockets.adapter.rooms[rmid].length === 4) {
            dealHand(rmid)
        }
    })

    socket.on('winnerFound', (rmiduser) => {
        const rmid = rmiduser.slice(0, 20)
        const user = rmiduser.slice(20,)
        io.in(rmid).emit('winPrompt', user)
    })

    //====================================

    socket.on('checkSetWinner', ({ selected, currHighest }) => {

        console.log(selected)
        console.log(currHighest)

        const selectedSet = selected
        const winningSuit = currHighest % 5
        let isHighSuit
        let winner

        let highestInSet = 0

        for (let userFS of selectedSet) {
            console.log(userFS.slice(21,))
        }

        if (winningSuit === 0) {
            //no trump suit

            //iterates thru Set 'selectedSet', converts cards into the rank and updates winner and highestInSet
            //when there is a higher ranking card  
            for (let userFS of selectedSet) {
                const user = userFS.slice(0, 20)
                const FS = userFS.slice(20,)
                const FSrank = cardSuitRank(FS) * 13 + cardFaceRank(FS)
                if (FSrank > highestInSet) {
                    winner = user
                    highestInSet = FSrank
                }
            }


        } else if (winningSuit === 1) {
            //diamond trump
            isHighSuit = new Set([...selectedSet].filter(userFS => (userFS.slice(21,) === 'D')))
            console.log(isHighSuit)
            for (let userFS of isHighSuit) {
                const user = userFS.slice(0, 20)
                const FS = userFS.slice(20,)
                const FSrank = cardFaceRank(FS)
                if (FSrank > highestInSet) {
                    winner = user
                    highestInSet = FSrank
                }
            }

        } else if (winningSuit === 2) {
            //club trump
            isHighSuit = new Set([...selectedSet].filter(userFS => (userFS.slice(21,) === 'C')))
            console.log(isHighSuit)
            for (let userFS of isHighSuit) {
                const user = userFS.slice(0, 20)
                const FS = userFS.slice(20,)
                const FSrank = cardFaceRank(FS)
                if (FSrank > highestInSet) {
                    winner = user
                    highestInSet = FSrank
                }
            }

        } else if (winningSuit === 3) {
            //heart trump
            isHighSuit = new Set([...selectedSet].filter(userFS => (userFS.slice(21,) === 'H')))
            console.log(isHighSuit)
            for (let userFS of isHighSuit) {
                const user = userFS.slice(0, 20)
                const FS = userFS.slice(20,)
                const FSrank = cardFaceRank(FS)
                if (FSrank > highestInSet) {
                    winner = user
                    highestInSet = FSrank
                }
            }

        } else if (winningSuit === 4) {
            //spade trump
            isHighSuit = new Set([...selectedSet].filter(userFS => (userFS.slice(21,) === 'S')))
            console.log(isHighSuit)
            for (let userFS of isHighSuit) {
                const user = userFS.slice(0, 20)
                const FS = userFS.slice(20,)
                const FSrank = cardFaceRank(FS)
                if (FSrank > highestInSet) {
                    winner = user
                    highestInSet = FSrank
                }
            }
        }
        console.log(winner)
        io.to(winner).emit('decrementNTW')
    })

    socket.on('roundEnd', (rmid) => {
        //on receiving roundEnd, emits a call to clear all 'selected' Sets and update 'Collected' Sets
        //for all clients in rmid
        io.in(rmid).emit('resetBoard')
    })

})
//end socket listener dump

function dealHand(rmid) {
    io.of('/').adapter.clients([rmid], (err, clients) => {
        shuffle(deck)
        const hand0 = deck.slice(0, 13)
        const hand1 = deck.slice(13, 26)
        const hand2 = deck.slice(26, 39)
        const hand3 = deck.slice(39, 52)

        io.to(clients[0]).emit('dealHand', hand0)
        io.to(clients[1]).emit('dealHand', hand1)
        io.to(clients[2]).emit('dealHand', hand2)
        io.to(clients[3]).emit('dealHand', hand3)

        console.log(clients[0] + ' => ' + hand0)
        console.log(clients[1] + ' => ' + hand1)
        console.log(clients[2] + ' => ' + hand2)
        console.log(clients[3] + ' => ' + hand3)
    })
}

http.listen(PORT, () => console.log(`I am connected yayy`))

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(bodyParser.json())
const db = require('./config/keys').mongoURI

mongoose
    .connect(process.env.MONGODB_URI || db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err))

app.use(passport.initialize())

require('./config/passport')(passport)
app.use('/api/users', users)

app.use(express.static('client/build'))

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`))
