import { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../APIs/postsApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { fetchComments, addComment } from '../../../APIs/commentsApis';
import "../Home/styles.css"



const Post = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const post = useSelector((state) => state.postsData.posts.find((post) => post.id === Number(id)));
    const comments = useSelector((state) => state.commentsData.comments);
    const loadingComments = useSelector((state) => state.commentsData.setLoading);

    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        body: "",
    })

    useEffect(() => {
        if (!post) {
            dispatch(fetchPosts());
        }
    }, [dispatch, post]);

    useEffect(() => {
        if (post) {
            dispatch(fetchComments(post.id));
        }
    }, [dispatch, post]);




    const handleAddComment = () => {
        if (newComment.name && newComment.email && newComment.body) {
            dispatch(addComment({ postId: post.id, newComment }));
            console.log(newComment);
            setNewComment({
                name: "",
                email: "",
                body: "",
            });
        }
    }
    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <div className="post-details">
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-8">
                        <h1>{post.title}</h1>
                        <p>{post.body}</p></div>


                    <div className="col-lg-4">
                        <h2>Add Comment</h2>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Name"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={newComment.email}
                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        />
                        <div className="add-comment-form">
                            <textarea
                                className="form-control mb-2"
                                placeholder="Comment"
                                rows="5"
                                onResize={false}
                                value={newComment.body}
                                onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                            />
                            <button className="btn btn-success" onClick={handleAddComment}>
                                <FontAwesomeIcon icon={faAdd} /> Add Comment
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="comments-section">
                        <h3 className='mb-5'>Comments</h3>
                        {loadingComments ?
                            (
                                <div className='loading-screen'>
                                    <div className='loader'></div>
                                </div>
                            ) : (
                                comments.filter(comment => comment.postId === post.id).map((comment, index) => (
                                    <div key={comment.id} className="comment">
                                        <h5>{`${index + 1}`}. {comment.name}</h5>
                                        <p>{comment.body}</p>
                                        <small>{comment.email}</small>
                                    </div>
                                ))
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post