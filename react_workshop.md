# React Workshop

1. React Lifecycle
The lifecycle of a react component for the first initialization is:
constructor
componentWillMount
render
componentDidMount
After the component is instantiated and an update is triggered the following is executed in order:
shouldComponentUpdate (by default always returns true)
componentWillUpdate (here the state should be changed depending on props)
render
componentDidUpdate
A React Component is updated when the properties (props) change from an external source or when the internal state is changed. State is changed using a shallow assign using this.setState({}).
1.1 Update through state change
class A extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            a: "a"
        };
    }

    _function1() {
        this.setState({
            b: "b"
        });
        /*
        {
            a: "a",
            b: "b"
        }
        */
    }

    render() {
        return <div />;
    }
}
1.2 Update through props change
class B extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            a: "a"
        };
    }

    _function2() {
        this.setState({
            b: "b"
        });
    }

    render() {
        return <C a={this.state.a} b={this.state.b} />;
    }
}
2. ES6 modules import and export
In the new standard each js file is a module. Each module can import other modules and export functions or constants or anything else. Exports can be named or default. Named exports and default can be imported:
// module A.js
// named
export const c = 2;

// named
export function f() {
    return 2;
}

// default
export default function(param) {
    return param * 2;
}

// module B.js
// default, (re-)named, named
import multiplication, { c as constant, f } from "./A";

console.log(c); // error c is not defined
console.log(constant); // 2
console.log(f()); // 2
console.log(multiplication(5)); // 10
3. Insight plugin structure
Plugins are named insight-plugin-<NAME> where <NAME> needs to be unique and may not contain -.
The plugin needs to be added to insight-cores package.json file and either installed or linked. (we will use link)
Each plugin should either use the default export from the package entry file (default: src/index.js) and export an object with the following things: reducer, routes and optional: appMenuExtensions, startPageExtensions and/or create. Alternatively the plugin can use named exports. The named exports will be preferred if both exist.
Each plugin may access its global scope to export certain function for integration with other plugins (usually an object): global.<NAME> = {}.
In the same way insight exposes global.insight with helper function for navigation, closing views, showing and showing messages.
Each plugin by default gets a space on the global application state (redux) store.NAME and its own url prefix: URL/en/NAME.
// comes from the html 5 router with a callback that needs to get the components to show.
// The store is the global store and can be used to make decisions or dispatch actions.
// needs to always return a Promise
function getIdComponents(nextState, callback, store) {
    callback(null, { content: A, header: B });
    return Promise.resolve();
}

// while promises are resolving the loading animation will be shown
function getNewComponents(nextState, callback, store) {
    return fetch("http://google.de")
        .then(() => callback(null, { content: A, header: B }));
}

export default {
    reducers: reducer,
    routes: {
        ":id": getIdComponents, // URL/en/NAME/5
        "new": getNewComponents // URL/en/NAME/new
    }
};
4. Redux
Redux is a tool to easily manage global application state. It contains of a global store, actions and reducers. Actions are dispatched and passed through all reducers. A reducer is a function that takes the state n and with the action a may mutate state n to state n+1. Each action is an object and needs to have a type. Usually each actions type is unique. Each reducer needs to have an initial state.
// actions
export function action1() {
    return {
        type: "DO_STUFF"
    };
}

// reducer
export default function (state = {}, action) {
    switch(action.type) {
        case "DO_STUFF": return { didStuff: true };
        default: return state;
    }
}

// dispatching actions
import { action1 } from "./actions.js";

store = createStore();
/* state 1
{
    reducer: {}
}
*/
store.dispatch(action1());
/* state 2
{
    reducer: {
        didStuff: true
    }
}
*/
5. Workshop
install node and npm, git
install nodemon: npm install -g nodemon
creds for gitlab (standard): nemuteph@gmx.de/nemuteph@gmx.de
clone insight-core git clone https://gitlab.inoviagroup.se/insight-ui/insight-core.git
clone insight-plugin-example git clone https://gitlab.inoviagroup.se/insight-ui/insight-plugin-example.git
remove plugins from insight-core
in insight-core copy ./config/templates/*docker1*.json to ./properties.json
in insight-core run npm install
in insight-plugin-example rename package name to insight-plugin-workshop
in insight-plugin-example run npm install, npm link, npm run dev
in insight core add insight-plugin-workshop to package.json and run npm link insight-plugin-workshop, run npm start
see website and login using admin/admin
navigate to: localhost:3000/en/workshop/route
see line 59. fix error
exercise: add a parameter route
parameter route should be reachable from route with dialog and input for name (see material ui)
