import { useEffect, useState } from 'react';
import styles from './addArticleForm.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generateId } from '../../utils/idGenerator';
import { useAddArticleMutation, useEditArticleMutation, useGetArticleByIdQuery } from '../../api/articleApi';
import Select from '../ui/Select/Select';
import { useGetAuthorsQuery } from '../../api/authorApi';
import { useGetTopicsQuery } from '../../api/topicApi';
import Alert from '../ui/Alert/Alert';

const AddArticleForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article } = useGetArticleByIdQuery(id ? id : '');
  const [addArticle, { isSuccess: isSuccessAddArticle, isLoading: isLoadingAddArticle }] = useAddArticleMutation();
  const [editArticle, { isSuccess: isSuccessEditArticle, isLoading: isLoadingEditArticle }] = useEditArticleMutation();
  const { data: authors } = useGetAuthorsQuery();
  const { data: topics } = useGetTopicsQuery();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setText(article.text);
      setDate(article.date);
      setSelectedAuthor(article.author);
      setSelectedTopic(article.topic);
    }
  }, [article]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && text && selectedTopic && selectedAuthor) {
      const newArticle = {
        id: id ? undefined : generateId(),
        title,
        text,
        topic: selectedTopic,
        author: selectedAuthor,
        date,
      };
      if (id) {
        await editArticle([newArticle, id]);
      } else {
        await addArticle(newArticle);
      }
    }
  };

  return (
    <div className={styles.addArticleContainer}>
      {(isSuccessAddArticle || isSuccessEditArticle) && (
        <Alert>{isSuccessAddArticle ? 'Статья добавлена' : 'Статья отредактирована'}</Alert>
      )}

      <div className={styles.addArticleForm}>
        <div className={styles.formHeader}>
          <div onClick={() => navigate(-1)} className={styles.backPageButton}>
            ⇐ Назад
          </div>
          <Link to="/">
            <div className={styles.backMainPageButton}>На главную</div>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <label className={styles.addArticleLabel}>
            Заголовок:
            <input
              type="text"
              className={styles.addArticleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.addArticleLabel}>
            Текст:
            <textarea className={styles.addArticleTextarea} value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <br />
          <label className={styles.addArticleLabel}>
            Тема:
            <Select
              value={selectedTopic}
              onChange={setSelectedTopic}
              valueKey="text"
              data={topics || []}
              allOptionText="Все темы"
            />
          </label>
          <br />
          <label className={styles.addArticleLabel}>
            Автор:
            <Select
              value={selectedAuthor}
              onChange={setSelectedAuthor}
              valueKey="name"
              data={authors || []}
              allOptionText="Все авторы"
            />
          </label>
          <br />
          <label className={styles.addArticleLabel}>
            Дата:
            <input disabled type="text" className={styles.addArticleInput} value={date} />
          </label>
          <br />
          <button
            disabled={isLoadingAddArticle || isLoadingEditArticle}
            type="submit"
            className={styles.addArticleButton}
          >
            {id ? 'Редактировать' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;
