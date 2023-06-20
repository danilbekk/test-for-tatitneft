import { useEffect } from 'react';
import { useDeleteArticleMutation, useGetArticleByIdQuery } from '../../api/articleApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import Alert from '../ui/Alert/Alert';
import { useGetCommentsByArticleIdQuery } from '../../api/commentApi';
import styles from './article.module.css';

const Article: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: articleData, isLoading: isArticleLoading } = useGetArticleByIdQuery(id || '');
  const { data: commentsData } = useGetCommentsByArticleIdQuery(id || '');
  const [deleteArticle, { isSuccess: isDeleteArticleSuccess }] = useDeleteArticleMutation();

  useEffect(() => {
    if (isDeleteArticleSuccess) {
      const timeout = setTimeout(() => {
        navigate('/articleList');
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isDeleteArticleSuccess, navigate]);

  const handleDeleteArticle = async () => {
    await deleteArticle(id);
  };

  const handleNavigateToEditArticle = () => {
    navigate(`/article/edit/${id}`);
  };

  if (isArticleLoading) {
    return <h3>...Загрузка</h3>;
  }

  if (!articleData) {
    return <div>Такой статьи не существует</div>;
  }

  return (
    <>
      <Link to="/articleList" className={styles.backMainPage}>
        &#8656;
      </Link>
      {isDeleteArticleSuccess && <Alert>Статья удалена</Alert>}
      <div className={!isDeleteArticleSuccess ? styles.article : styles.articleDisabled}>
        <div className={styles.articleContent}>
          <div className={styles.articleInfo}>
            <span className={styles.articleAuthor}>
              <strong>Автор:</strong> {articleData.author}
            </span>
            <span className={styles.articleTopic}>
              <strong>Тема:</strong> {articleData.topic}
            </span>
            <span className={styles.articleDate}>
              <strong>Дата:</strong> {articleData.date}
            </span>
          </div>
          <div className={styles.articleHeader}>
            <div className={styles.articleActions}>
              <h1 className={styles.articleTitle}>{articleData.title}</h1>
              <div>
                <div onClick={handleDeleteArticle} className={styles.deleteArticle}>
                  Удалить
                </div>
                <div onClick={handleNavigateToEditArticle} className={styles.editArticle}>
                  Редактировать
                </div>
              </div>
            </div>
          </div>
          <div className={styles.articleText}>{articleData.text}</div>
        </div>
        <div></div>
        <Comments comments={commentsData} />
      </div>
    </>
  );
};

export default Article;
