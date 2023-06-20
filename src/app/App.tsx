import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList/ArticleList';
import AddArticleForm from '../components/AddArticleForm/AddArticleForm';
import Article from '../components/Article/Article';

function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/articleList" />} />
      <Route path="/articleList" element={<ArticleList />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/article/add" element={<AddArticleForm />} />
      <Route path="/article/edit/:id" element={<AddArticleForm />} />
    </Routes>
  );
}

export default App;
