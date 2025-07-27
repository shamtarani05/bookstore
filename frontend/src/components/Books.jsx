import React, { useEffect, useState, useRef } from 'react';
import styles from './Books.module.css';

const Books = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', description: '', publishedYear: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const addRef = useRef(null);

  // fetch all books
  const fetchBooks = async () => {
    const res = await fetch('http://localhost:3000/api/books', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // edit and add book
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.publishedYear && Number(form.publishedYear) < 0) {
      setError('Year cannot be negative');
      return;
    }
    try {
      // checking is book is edited or created
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:3000/api/books/${editingId}` : 'http://localhost:3000/api/books';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to save book');
      setForm({ title: '', author: '', description: '', publishedYear: '' });
      setEditingId(null);
      fetchBooks();
      if (addRef.current) addRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = book => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      publishedYear: book.publishedYear
    });
    setEditingId(book._id);
    if (addRef.current) addRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBooks();
  };

  return (
    <div className={styles.container}>
      <a id="add" ref={addRef}></a>
      <h2 className={styles.sectionTitle}>Add Book</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="publishedYear" placeholder="Year" value={form.publishedYear} onChange={handleChange} type="number" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Book</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', author: '', description: '', publishedYear: '' }); }}>Cancel</button>}
        {error && <div className={styles.error}>{error}</div>}
      </form>
      <h2 className={styles.sectionTitle}>Books List</h2>
      <div className={styles.cardList}>
        {books.map(book => (
          <div key={book._id} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{book.title}</div>
              <div className={styles.cardAuthor}>by {book.author} {book.publishedYear && <span>({book.publishedYear})</span>}</div>
              {book.description && <div className={styles.cardDesc}>{book.description}</div>}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleEdit(book)} className={styles.edit}>Edit</button>
              <button onClick={() => handleDelete(book._id)} className={styles.delete}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books; 