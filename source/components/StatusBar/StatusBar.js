// Core
import React, { Component } from "react";

// Components
import { withProfile } from "components/HOC/withProfile";

// Instruments
import StylesSimple from "./stylesSimple.m.css";

@withProfile
export default class StatusBar extends Component {
    render () {
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
