import { useState } from 'react';
import styles from './articleList.module.css';
import { Link } from 'react-router-dom';
import ArticleBlock from './ArticleBlock/ArticleBlock';
import { useGetArticlesQuery } from '../../api/articleApi';
import { useGetAuthorsQuery } from '../../api/authorApi';
import { useGetTopicsQuery } from '../../api/topicApi';
import Select from '../ui/Select/Select';
import { useGetCommentsQuery } from '../../api/commentApi';

const ArticleList: React.FC = () => {
  const { data: articles, isLoading: isLoadingArticles } = useGetArticlesQuery();
  const { data: comments } = useGetCommentsQuery();
  const { data: authors } = useGetAuthorsQuery();
  const { data: topics } = useGetTopicsQuery();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<[string | null, string | null]>([null, null]);
  const [searchFilter, setSearchFilter] = useState('');

  if (isLoadingArticles) return <h3>...Загрузка</h3>;

  const handleResetFilters = () => {
    setSelectedAuthor('');
    setSelectedTopic('');
    setSelectedDateRange([null, null]);
  };

  const articlesWithCommentsCount = articles?.map((article) => ({
    ...article,
    commentsCount: comments?.filter((comment) => comment.articleId === article.id).length || 0,
  }));

  const filteredArticles = articlesWithCommentsCount?.filter((article) => {
    const topicMatch = selectedTopic ? article.topic === selectedTopic : true;
    const authorMatch = selectedAuthor ? article.author === selectedAuthor : true;

    const startDate = selectedDateRange[0] ? new Date(selectedDateRange[0]) : null;
    const endDate = selectedDateRange[1] ? new Date(selectedDateRange[1]) : null;
    const articleDate = new Date(article.date.split('.').reverse().join('-'));

    const dateMatch = (!startDate || articleDate >= startDate) && (!endDate || articleDate <= endDate);

    const filterMatch =
      searchFilter.trim() === '' ||
      article.topic.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.title.toLowerCase().includes(searchFilter.toLowerCase());

    return topicMatch && authorMatch && dateMatch && filterMatch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <input
          className={styles.articleListInput}
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter articles"
        />
        <Link to="/article/add">
          <div className={styles.addArticle}>Добавить статью</div>
        </Link>
      </div>

      <div className={styles.articleListContainer}>
        <div className={styles.articleListFilters}>
          <Select
            value={selectedTopic}
            onChange={setSelectedTopic}
            valueKey="text"
            data={topics || []}
            allOptionText="Все темы"
          />
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            valueKey="name"
            data={authors || []}
            allOptionText="Все авторы"
          />
          <div>
            <div className={styles.inputDate}>
              <input
                className={styles.articleListInput}
                type="date"
                value={selectedDateRange[0] ? selectedDateRange[0] : ''}
                onChange={(e) => setSelectedDateRange([e.target.value, selectedDateRange[1]])}
              />
              <span>от</span>
            </div>
            <div className={styles.inputDate}>
              <input
                className={styles.articleListInput}
                type="date"
                value={selectedDateRange[1] ? selectedDateRange[1] : ''}
                onChange={(e) => setSelectedDateRange([selectedDateRange[0], e.target.value])}
              />
              <span>до</span>
            </div>
          </div>

          <div onClick={handleResetFilters} className={styles.articleResetFilters}>
            Сбросить
          </div>
        </div>
        <div className={styles.articleContainer}>
          {!filteredArticles?.length
            ? 'Нет статей'
            : filteredArticles?.map((article) => <ArticleBlock key={article.id} article={article} />)}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
