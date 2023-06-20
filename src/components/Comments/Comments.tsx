import React, { useState } from 'react';
import styles from './comments.module.css';
import { generateId } from '../../utils/idGenerator';
import { useParams } from 'react-router-dom';
import { CommentType } from '../../interfaces/commentsModel';
import { useAddCommentMutation } from '../../api/commentApi';

interface CommentsProps {
  comments?: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [addComment] = useAddCommentMutation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { id } = useParams();
  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCommentSubmit = async () => {
    const newCommentObj = {
      id: generateId(),
      author: author || 'Anonymous',
      content: comment,
      articleId: id,
    };

    addComment(newCommentObj);
    setAuthor('');
    setComment('');
    setIsFormVisible(false);
  };

  return (
    <div className={styles.comments}>
      <h3 className={styles.commentsHeader}>Комментарии {comments?.length}</h3>
      {!isFormVisible && (
        <button className={styles.addCommentButton} onClick={handleToggleForm}>
          Add a Comment
        </button>
      )}
      {isFormVisible && (
        <form
          className={styles.commentForm}
          onSubmit={(event) => {
            event.preventDefault();
            if (comment.trim()) {
              handleCommentSubmit();
            }
          }}
        >
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Your Name (optional)"
            className={styles.inputAuthor}
          />
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className={styles.inputComment}
          />
          <button className={styles.submitButton}>Добавить</button>
          <button onClick={handleToggleForm} className={styles.closeButton}>
            Закрыть
          </button>
        </form>
      )}
      {comments?.length ? (
        comments?.map((comment) => (
          <div className={styles.comment} key={comment.id}>
            <div className={styles.commentAuthor}>@{comment.author}</div>
            <div className={styles.commentContent}>{comment.content}</div>
          </div>
        ))
      ) : (
        <div>Нет комментариев</div>
      )}
    </div>
  );
};

export default Comments;
