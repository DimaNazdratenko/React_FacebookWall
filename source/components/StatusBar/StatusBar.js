// Core
import React, { Component } from "react";
import cx from "classnames";

// Components
import { withProfile } from "components/HOC/withProfile";

// Instruments
import StylesSimple from "./stylesSimple.m.css";
// import Styles from "./styles";

@withProfile
export default class StatusBar extends Component {
    render () {
        // const styles = cx(StylesSimple.statusBar, Styles);
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { StylesSimple.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}
