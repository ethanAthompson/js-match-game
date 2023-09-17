const activeCounters = {
    /* i put counters here to avoid hoisting; using variables before they are declared*/
    triesCounter: 30,
    winMessage: "____"
}

class elementMaker {
    constructor(place, element, attributes) {
        // initializing variables into the constructor
        this.place = place
        this.element = element
        this.attributes = attributes
    }

    makeElement() {
        // this function params are reversed at first 
        const attributeList = (value, key) => {
            // sets the attribute of the the given (value, key) -> (key, value) for correct attributes
            return ELEMENT_CONTAINER.setAttribute(key, value);
        }
        // creating a new element based of the initialized one (your element)
        const ELEMENT_CONTAINER = document.createElement(this.element)
        // converts the attribute obj into a map, so a foreach loop can be used
        const CONVERT_OBJECT_TO_ENTRIES_TO_MAP = new Map(Object.entries(this.attributes))
        // here: looping over the attributeList function as a callback function
        const ATTRIBUTE_MAP = CONVERT_OBJECT_TO_ENTRIES_TO_MAP.forEach(attributeList)
        // placing the created element and its attributes together by combining both objects.
        return this.place.appendChild(Object.assign(ELEMENT_CONTAINER, ATTRIBUTE_MAP));
    }

    findElement(id) {
        // returns the value of the id given w/ inherited properties and methods
        return document.getElementById(`${id}`)
    }
}

class matchStyle extends elementMaker {
    constructor() {
        // getting the initialized variables from elementMaker
        super(elementMaker);
    }

    matchBackground(type = { "image": image, "color": color }) {
        // assigning the length of the type object keys
        const TYPE_LENGTH = Object.keys(type).length
        // easier to read assignment of the document.body property
        let setBody = document.body
        //  if a color is found
        if (type.color) {
            document.body.className = `${type.color}`
        }
        // if there are more than 1 [key,value] in the type obj
        if (TYPE_LENGTH > 1) {
            // empty the object
            type = {}
            // throw a range error because to check the type_length in console
            throw new RangeError`cannot set ${TYPE_LENGTH} backgrounds`
        }
        // if an image is found
        if (type.image) {
            // style properties of the document.body property
            setBody.style.background = `url(${type.image})`
            setBody.style.backgroundRepeat = "no-repeat"
            setBody.style.backgroundPosition = "center"
            setBody.style.backgroundSize = `cover`
        }
    }

    matchReference(defaultValue) {
        /* total layout reference of the MatchJs webpage */
        const divs = {
            headerDiv: this.makeElement(this.place = document.body, this.element = "div", this.attributes = { "id": "headerDiv", "class": `row text-center ` }),
            header: this.makeElement(this.place = this.findElement("headerDiv"), this.element = "div", this.attributes = { "id": "header", "class": `col text-center text-white  display-1` }),
            mainDiv: this.makeElement(this.place = this.findElement("headerDiv"), this.element = "div", this.attributes = { "id": "mainDiv", "class": "row mt-2 input-group mx-auto d-flex justify-content-center" }),
            spanDiv: this.makeElement(this.place = this.findElement("mainDiv"), this.element = "div", this.attributes = { "id": "spanDiv", "class": "mb-3" }),
            InputDiv: this.makeElement(this.place = this.findElement("mainDiv"), this.element = "div", this.attributes = { "id": "InputDiv", "class": "row w-100 mb-1 12 d-flex justify-content-center", "style": "min-width:300px;" }),
            InputDivCenter: this.makeElement(this.place = this.findElement("InputDiv"), this.element = "div", this.attributes = { "id": "InputDivCenter", "class": "row me-4  ms-2 w-100", "type": "button", "style": "max-width:400px;" }),
            btnDiv: this.makeElement(this.place = document.body, this.element = "div", this.attributes = { "id": "btnDiv", "class": " row mt-5 w-100 input-group  mb-5  mx-auto d-flex justify-content-center" }),
            boardDiv: this.makeElement(this.place = document.body, this.element = "div", this.attributes = { "id": "boardDiv", "class": `d-flex justify-content-center ` }),
            boardImages: this.makeElement(this.place = this.findElement("boardDiv"), this.element = "div", this.attributes = { "id": "boardImages", "class": `rounded-5 img-fluid ` })
        }
        const header = {
            header: this.makeElement(this.place = this.findElement("headerDiv"), this.element = "h1", this.attributes = { "id": "header", "class": `col text-center text-white  display-1` }),
            headerText: this.findElement("header").innerHTML = "MatchGame",
            header2: this.makeElement(this.place = this.findElement("header"), this.element = "h2", this.attributes = { "id": "header2", "class": `col text-center text-white  mt-5` }),
            headerText2: this.findElement("header2").innerHTML = "{{ Create the matchBoard }}"
        }
        const buttons = {
            inputBtn: this.makeElement(this.place = this.findElement("InputDivCenter"), this.element = "button", this.attributes = { "id": "inputBtn", "class": "col rounded-5  btn btn-primary form-control   text-center", "type": "submit" }),
            startBtn: this.makeElement(this.place = this.findElement("btnDiv"), this.element = "button", this.attributes = { "id": "startBtn", "class": "col mx-2 mb-2 btn btn-lg rounded  bg-success text-white d-flex justify-content-center", "type": "sumbit", "style": "max-width:120px;" }),
            triesBtn: this.makeElement(this.place = this.findElement("btnDiv"), this.element = "button", this.attributes = { "id": "triesBtn", "class": "col mx-3 mb-2 btn btn-lg rounded  bg-secondary text-white d-flex justify-content-center", "type": "sumbit", "style": "max-width:120px;" }),
            msgBtn: this.makeElement(this.place = this.findElement("btnDiv"), this.element = "button", this.attributes = { "id": "msgBtn", "class": "col mx-2  mb-2 btn btn-lg rounded bg-danger text-white d-flex justify-content-center", "style": "max-width:120px;" })
        }
        const inputs = {
            rowsInput: this.makeElement(this.place = this.findElement("InputDivCenter"), this.element = "input", this.attributes = { "id": "rowsInput", "maxlength": "1", "value": `${defaultValue}`, "placeholder": "Rows", "min": "1", "max": "2", "minlength": "1", "class": "col rounded-5 form-control ms-3 text-center", "type": "text", "style": "max-width:200px;min-width:70px; " }),
            colsInput: this.makeElement(this.place = this.findElement("InputDivCenter"), this.element = "input", this.attributes = { "id": "colsInput", "maxlength": "1", "value": `${defaultValue}`, "placeholder": "Cols", "min": "1", "max": "2", "minlength": "1", "class": "col rounded-5 form-control ms-3 text-center ", "type": "text", "style": "max-width:200px; min-width:70px;" }),
            RowsCols2Total: this.makeElement(this.place = this.findElement("InputDivCenter"), this.element = "input", this.attributes = { "id": "RowsCols2Total", "placeholder": "Cards", "minlength": "1", "maxlength": "2", "class": "col rounded form-control ms-3 text-center ", "style": "max-width:120px; min-width:110px;" })
        }
        const texts = {
            t1: this.findElement("inputBtn").innerHTML = "Enter",
            t2: this.findElement("startBtn").innerHTML = "Start Game",
            t3: this.findElement("triesBtn").innerHTML = `Tries:`,
            t4: this.findElement("msgBtn").innerHTML = `${activeCounters.winMessage}`,
            t2: this.findElement("startBtn").disabled = false,
            t5: this.findElement("RowsCols2Total").disabled = true
        }
    }

    matchGameBoard(rows, cols) {
        // creates rows from the number entered in
        for (let i = 1; i <= rows; i++) {
            this.makeElement(this.place = this.findElement("boardImages"), this.element = "div", this.attributes = { "id": `div${i}`, "class": "row" })
            // for every row that's created; create a column
            for (let i2 = 1; i2 <= cols; i2++) {
                this.makeElement(this.place = this.findElement(`div${i}`), this.element = "img", this.attributes = { "id": `${0}`, "class": "col img-fluid rounded-5 mt-2 mb-3 ", "src": 'cards/cover.png', "style": "width:128px;height:128px; " })
            }
        }
        // creates an id for each row and column created
        for (let i3 = 0; i3 <= rows * cols; i3++) this.findElement(`${0}`).id = i3
    }
}

class matchingGame extends matchStyle {
    constructor() {
        super(matchStyle)
    }

    configBoard() {
        // assigning variables  (easier to read)
        let rowInputBoxValue = document.getElementById("rowsInput").value;
        let colInputBoxValue = classes.match.findElement("colsInput").value;
        // Boolean Looping; undefined before being declared inside the if clause
        if (this.isOn == false) {
            // gets the value of both input boxes
            classes.match.matchGameBoard(this.rows = rowInputBoxValue, this.cols = colInputBoxValue)
            // multiple the value from row * cols into another input box, showing user amount of cards
            classes.match.findElement("RowsCols2Total").value = `${rowInputBoxValue * colInputBoxValue} Cards`
            // activates the game when board is re created
            new matchingGame().startBoard()
            // next run, isOn will be true
            this.isOn = true
        } else {
            // removes each row on the field (removes the divs)
            for (let i = 1; i <= rowInputBoxValue; i++) {
                // removes the divs twice; avoids glitch of div not existing before deletion
                try { classes.match.findElement(`div${i}`).remove() } catch (error) { "couldnt remove.." }
            }
            classes.match.findElement("msgBtn").innerHTML = `${activeCounters.winMessage = "Offline!"}`
            // on next run, isOn will be false
            this.isOn = false
        }
    }

    startBoard() {
        classes.match.findElement("msgBtn").innerHTML = `${activeCounters.winMessage = "Online!"}`
        // assigning the png file 
        let cardCover = `cards/cover.png`;
        // declaring undefined cards
        let firstCard;
        let secondCard;
        let maxTries = 30
        // declaring boolean variables to detect if a card was flipped over
        let flipped1 = false;
        let flipped2 = false;
        // assigning variables  (easier to read)
        let rowInputBoxValue = document.getElementById("rowsInput").value;
        let colInputBoxValue = classes.match.findElement("colsInput").value;
        // multiplying the rows * cols to get a value stored in the memory here
        let cardsValue = rowInputBoxValue * colInputBoxValue
        // looks for game to finish by timer decrementing naturally
        const finishGame = () => {
            if (activeCounters.triesCounter == 0) {
                // resets game 
                classes.match.findElement("inputBtn").disabled = false
                classes.match.findElement("startBtn").disabled = false
                // initialize the counter by setting it to the max tries
                activeCounters.triesCounter = maxTries
                classes.match.findElement("msgBtn").innerHTML = "Game Over"
                // removes the board from being visible
                classes.match.findElement("boardImages").style.visibility = "hidden"
            } else {
                // the board is showing when the game is not over
                classes.match.findElement("boardImages").style.visibility = "visible"
            }
        }
        // function to hold the conditional clauses
        finishGame()
        // decrements counter everytime the startboard function is activated
        classes.match.findElement("triesBtn").innerHTML = `Tries: ${activeCounters.triesCounter}`
        // array of integers that represent the number of cards to be on the field
        let deck = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
        let randomOrder;
        // tracks when user matches
        let matchCounter = 0;
        // creates randomized images,looping from 1 to 16 (randomizes behind the scene)
        for (let i = 1; i <= cardsValue; i++) {
            // easy to read; looping over images 
            let images = classes.game.findElement(i)
            // generates rnd number in the background
            randomOrder = Math.floor(Math.random() * 4)
            // change order of each div by a random Number
            images.style.order = randomOrder
            // reversing deck to (performing a swap)
            deck.reverse()
            // creates the random card for each img
            const cardRandomizer = (event) => {
                // disables the buttons
                classes.game.findElement("startBtn").disabled = true
                // if first card is not flipped then flip it over
                if (!flipped1) {
                    // defining card here: becauce above would return cover.png
                    firstCard = event.target;
                    // assign imgs to img tag, -1 to get the 0 index
                    images.src = `cards/imgs/${deck[i - 1]}.png`
                    // cancels the pointer event
                    classes.match.findElement(firstCard.id).style.pointerEvents = "none"
                    // shows when card is flipped
                    console.log("%cfirstCard is flipped", "color:green; font-size:20px");
                    // sets the flipped card to true: card is flipped over
                    flipped1 = true
                } else {
                    // if not flipped; flip over this card
                    if (!flipped2) {
                        // gets the src property of the second card clicked with mouse
                        secondCard = event.target;
                        // assign imgs to img tag, -1 to get the 0 index
                        images.src = `cards/imgs/${deck[i - 1]}.png`
                        // decrease the tries timer
                        classes.match.findElement("triesBtn").innerHTML = `Tries: ${activeCounters.triesCounter--}`
                        // shows when card is flipped
                        console.log("%cSecondCard is flipped", "color:yellow; font-size:20px");
                        // when card flipped over src property matches the second it goes away
                        if (firstCard.src == secondCard.src) {
                            // increments counter every time you get a match
                            matchCounter++
                            const showWinMsg = () => {
                                // if match is greater than the columns * 2 to match every single pair
                                console.log(matchCounter);
                                if (matchCounter == 2) {
                                    classes.match.findElement("msgBtn").innerHTML = `${activeCounters.winMessage = "Won Game"}`
                                    classes.game.findElement("startBtn").disabled = false
                                }
                            }
                            // function to show cards before removing them
                            const showCard = () => {
                                // hide the cards w/ visibility and makes them unclickable
                                classes.match.findElement(firstCard.id).style.visibility = "hidden"
                                classes.match.findElement(secondCard.id).style.visibility = "hidden"
                                classes.match.findElement(i).setAttribute("alt", "Matched")
                                classes.match.findElement("msgBtn").innerHTML = `${activeCounters.winMessage = "Match!"}`
                            }
                            // prevents double clicks
                            classes.match.findElement(firstCard.id).style.pointerEvents = "none"
                            classes.match.findElement(secondCard.id).style.pointerEvents = "none"
                            // produces a callback to show call after 2000ms
                            const showCardTimer = setTimeout(showCard, 1500)
                            const showWinMsgTimer = setTimeout(showWinMsg, 1500)
                        } else {
                            // resets the two cards
                            const reset1 = setTimeout(() => firstCard.src = cardCover, 1500)
                            const reset2 = setTimeout(() => secondCard.src = cardCover, 1500)
                            // allow user to match them again; without clicking the same card twice 
                            classes.match.findElement("msgBtn").innerHTML = `${activeCounters.winMessage = "No Match!"}`
                        }
                        // does not allow another card to be generated when true
                        flipped2 = true
                    }
                    // sets both flip booleans to false
                    flipped1 = false
                    flipped2 = false
                    // resets pointerEvents to be able to click
                    classes.match.findElement(`${firstCard.id}`).style.pointerEvents = "auto"
                    classes.match.findElement(`${secondCard.id}`).style.pointerEvents = "auto"
                }
            }
            // adds event listener to every image on the board
            images.addEventListener("click", cardRandomizer)
        }
    }
}

// objects to contain organized code
const classes = {
    /* classes are stored as a property to be used globally */
    match: new matchStyle,
    game: new matchingGame
}
const classRoom = {
    /* calling the methods from the matchStyle class*/
    page: classes.match.matchReference(defaultValue = 4),
    colorBg: classes.match.matchBackground(type = { "color": "bg-dark" }),
    //imageBg:classes.match.matchBackground(type = { "image": "cards/bg/bg2.png" }),
}
const globalEvents = {
    /*  this is where window/global event listeners, etc are present.. */
    inputEvent: classes.match.findElement("inputBtn").addEventListener("click", classes.game.configBoard, { "once": false }),
    startEvent: classes.match.findElement("startBtn").addEventListener("click", classes.game.configBoard, { "once": false })
}
