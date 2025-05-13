class TrafficRobotLight extends HTMLElement {
}
customElements.define('traffic-robot-light', TrafficRobotLight);

class TrafficRobot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentLight = 'green';
        this.timerRef = {};
    }

    /**
     * This is triggered when the component is first connected to the DOM.
     * Here we call a render method to output the ShadowDOM markup and CSS.
     */
    connectedCallback() {
        this.render();
        this.startTimer();
    }

    changeLight() {
        this.currentLight = this.getNextLight( this.currentLight );
        this.render();
        this.startTimer();
    }


    getNextLight ( light ) {
        switch ( light ) {
            case 'red': return 'yellow';
            case 'yellow': return 'green';
            case 'green': return 'red';
            default: 'green';
        }
    }

    getLightTiming ( light ) {
        switch ( light ) {
            case 'green': return 2 * 60 * 1000; // 2 minutes
            case 'red': return 30 * 1000; // 30 seconds
            case 'yellow': return 10 * 1000; // 10 seconds
            default: return 0;
        }
    }

    startTimer () {
        // Clear any existing timers
        if ( this.timerRef.current ) {
            clearTimeout( this.timerRef.current );
        }

        // Start a new timer
        this.timerRef.current = setTimeout(() => {
            this.changeLight();
        }, this.getLightTiming( this.currentLight ) );

        // clean up any leftover timers
        return () => clearTimeout( this.timerRef.current );
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            .container {
                background-color: #333333;
                border-radius: 5px;
                padding: 20px;
                width: 100px;
            }
            .light {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color:#707070;
                margin: 20px 0;
            }
            .light.red.on {
                background-color: red;
            }
            .light.yellow.on {
                background-color: yellow;
            }
            .light.green.on {
                background-color: green;
            }
        </style>
        <div class="container">
            <div class="light red ${this.currentLight === 'red' ? 'on' : ''}"></div>
            <div class="light yellow ${this.currentLight === 'yellow' ? 'on' : ''}"></div>
            <div class="light green ${this.currentLight === 'green' ? 'on' : ''}"></div>
            <button id="changeButton">Change light</div>
        </div>
        `;

        this.shadowRoot.querySelector('#changeButton').onclick = () => this.changeLight();
    }
}
customElements.define( 'traffic-robot', TrafficRobot );
