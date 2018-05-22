// Core
import React, { Component } from "react";

// Components
import StatusBar from "components/StatusBar/StatusBar";
import Composer from "components/Composer/Composer";
import Post from "components/Post/Post";

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    render () {

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
