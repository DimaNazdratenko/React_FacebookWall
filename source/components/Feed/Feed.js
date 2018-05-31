// Core
import React, { Component } from "react";
import moment from "moment";

// Components
import StatusBar from "components/StatusBar/StatusBar";
import Composer from "components/Composer/Composer";
import Post from "components/Post/Post";
import Spinner from "components/Spinner/Spinner";

// Instruments
import Styles from "./styles.m.css";
import { getUniqueID } from "instruments";

export default class Feed extends Component {
    state = {
        posts: [
            { id: "123", comment: "Hi there!", created: 1526825076849 },
            { id: "456", comment: "Приветик!", created: 1526825076855 }
        ],
        isSpinning: false,
    };

    _createPost = (comment) => {
        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    };

    render () {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
