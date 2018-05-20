// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import StylesSimple from './stylesSimple.m.css';
import Styles from './styles';

export default class StatusBar extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const styles = cx(StylesSimple.statusBar, Styles);

        return (
            <section className = { styles }>
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
