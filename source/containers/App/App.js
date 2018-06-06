// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

//Components
import Catcher from "components/Catcher/Catcher";
import Feed from "components/Feed/Feed";
import { Provider } from "components/HOC/withProfile";

// Instruments
import avatar from "theme/assets/lisa.png";

const options = {
    avatar,
    currentUserFirstName: "Дима",
    currentUserLastName:  "Наздратенко",
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
