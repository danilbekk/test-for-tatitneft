import React from 'react';
import styles from './articleBlock.module.css';
import { ReactComponent as CommentIcon } from '../../../assets/commentIcon.svg';
import { Link, useParams } from 'react-router-dom';
import { ArticleType } from '../../../interfaces/articlesModel';

interface ArticleBlockProps {
  article: ArticleType;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({ article }) => {
  const { id } = useParams();
  const maxLength = 300;
  const finalText =
    article.text.length >= maxLength
      ? article.text
          .replace(/<\/?[^>]+>/g, '')
          .slice(0, maxLength)
          .replace(/\s\w*$/, '')
          .trim() + '...'
      : article.text;

  return (
    <div className={styles.articleContainer}>
      <h3 className={styles.articleTitle}>
        <Link to={!id ? `/article/${article.id}` : ''}>{article.title}</Link>
      </h3>
      <p className={styles.articleText}>{finalText}</p>
      <p className={styles.articleInfo}>
        <strong>Тема:</strong> {article.topic}
      </p>
      <p className={styles.articleInfo}>
        <strong>Автор:</strong> {article.author}
      </p>
      <p className={styles.articleInfo}>
        <strong>Дата:</strong> {article.date}
      </p>
      <div className={styles.articleIconsContainer}>
        <Link to={!id ? `/article/${article.id}` : ''}>
          {' '}
          <div className={styles.articleCommentsIcon}>
            <CommentIcon /> {article.commentsCount}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleBlock;
