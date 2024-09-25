import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import "./styles.css"
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { fetchPosts, addPost, updatePost, deletePost } from '../../../APIs/postsApis'
import UpdateModal from './UpdateModal'
import { Link } from 'react-router-dom';
const Home = () => {
    const allPosts = useSelector((state) => state.postsData.posts);
    const loading = useSelector((state) => state.postsData.setLoading);
    const dispatch = useDispatch();


    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
    })

    const [show, setShow] = useState(false);

    const [currentPost, setCurrentPost] = useState({
        title: "",
        body: "",
    })

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    const handleCloseModal = () => setShow(false);

    const handleAddPost = () => {
        if (newPost.title && newPost.body) {
            dispatch(addPost(newPost)).then(() => {
                setNewPost({
                    title: "",
                    body: ""
                });
                toast.success("Your Post Has Been Published");
            });
        }
    }



    const handleShowModal = (post) => {
        setShow(true);
        setCurrentPost(post);
    }


    const handleUpdatePost = () => {
        const updatePostData = { title: currentPost.title, body: currentPost.body };
        dispatch(updatePost({ id: currentPost.id, updatedData: updatePostData })).finally(() => {
            handleCloseModal();
            toast.success("Your Post Has Been Updated");
        })
    }

    const handleDeletePost = (postId) => {
        dispatch(deletePost(postId)).then(() => {
            toast.success("Your Post Has Been Deleted");
        });
    };

    return (
        <>
            <div className="posts-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {loading ? (<div className='loading-screen'>
                                <div className='loader'></div>

                            </div>) : (
                                allPosts.map((post) => (
                                    <div className="card post-item" key={post.id}>
                                        <div className="card-body">
                                            <h5>
                                                <Link to={`/post/${post.id}`}>
                                                    {post.id} - {post.title}
                                                </Link>
                                            </h5>
                                            <p className="card-text">{post.body}</p>
                                            <div className="postControlButtons">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        handleShowModal(post);
                                                    }}
                                                >
                                                    {" "}
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    Update
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="add-post-form">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Title"
                                    value={newPost.title}
                                    onChange={(e) => {
                                        setNewPost({ ...newPost, title: e.target.value });
                                    }}
                                />
                                <textarea
                                    className="form-control mb-2"
                                    placeholder="Body"
                                    rows="4"
                                    value={newPost.body}
                                    onChange={(e) => {
                                        setNewPost({ ...newPost, body: e.target.value });
                                    }}
                                />
                                <button className="btn btn-success" onClick={handleAddPost}>
                                    <FontAwesomeIcon icon={faAdd} /> Add Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateModal
                show={show}
                handleCloseModal={handleCloseModal}
                currentPost={currentPost}
                handleChangedData={setCurrentPost}
                handleUpdatePost={handleUpdatePost}
            />

            <ToastContainer />
        </>
    );
}

export default Home
