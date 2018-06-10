// Core
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";

// Components
import { withProfile } from "components/HOC/withProfile";
import Catcher from "components/Catcher/Catcher";
import StatusBar from "components/StatusBar/StatusBar";
import Composer from "components/Composer/Composer";
import Post from "components/Post/Post";
import Spinner from "components/Spinner/Spinner";
import Postman from "components/Postman/Postman";

// Instruments
import Styles from "./styles.m.css";
import { api, TOKEN, GROUP_ID } from "config/api";
import { socket } from "socket/init";

@withProfile
export default class Feed extends Component {
    state = {
        posts:      [],
        isSpinning: false,
        in:         true,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();
        socket.emit("join", GROUP_ID);

        socket.on("create", (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on("remove", (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on("like", (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post
                    ),
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener("create");
        socket.removeListener("remove");
        socket.removeListener("like");
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: "GET",
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
        });

        this._setPostsFetchingState(false);
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));

        this._setPostsFetchingState(false);
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id),
        }));

        this._setPostsFetchingState(false);
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  "PUT",
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post
            ),
        }));

        this._setPostsFetchingState(false);
    };

    _animateComposerEnter = (composer) => {
        fromTo(
            composer,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0 }
        );
    };

    _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { x: 300 }, { x: 0 });

        setTimeout(() => {
            this.setState({
                in: !this.state.in,
            });
        }, 4000);
    };

    _animatePostmanExit = (postman) => {
        fromTo(postman, 1, { x: 0 }, { x: 300 });
    };

    render () {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Transition
                    appear
                    in = { this.state.in }
                    timeout = { 1000 }
                    onEnter = { this._animatePostmanEnter }
                    onExit = { this._animatePostmanExit }>
                    <Postman />
                </Transition>
                {postsJSX}
            </section>
        );
    }
}
