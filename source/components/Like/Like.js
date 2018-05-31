// Core
import React, { Component } from "react";
import { string, func, arrayOf, shape } from "prop-types";
import cx from "classnames";

// Instruments
import Styles from "./styles.m.css";

export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            })
        ).isRequired,
    };

    _likePost = () => {
        const { _likePost, id } = this.props;

        _likePost(id);
    };

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    };

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    };

    render () {
        const likeStyles = this._getLikeStyles();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
            </section>
        );
    }
}
