// Core
import React, { Component } from "react";
import cx from "classnames";

// Components
import { Consumer } from "components/HOC/withProfile";

// Instruments
import StylesSimple from "./stylesSimple.m.css";
import Styles from "./styles";

export default class StatusBar extends Component {
    render () {
        const styles = cx(StylesSimple.statusBar, Styles);

        return (
            <Consumer>
                {(context) => (
                    <section className = { styles }>
                        <button>
                            <img src = { context.avatar } />
                            <span>{context.currentUserFirstName}</span>
                            &nbsp;
                            <span>{context.currentUserLastName}</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}
