'use client';

import { Book } from '@/types/book';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  async function fetchBooks() {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();

      setBooks(data);
    } catch (error) {
      toast.error('Failed to fetch books');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadBooks = async () => {
      await fetchBooks();
    };

    loadBooks();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const bookData = {
        title,
        author,
        genre,
        year: Number(year),
      };

      if (editingBookId) {
        const response = await fetch(`/api/books/${editingBookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });

        if (!response.ok) {
          throw new Error('Failed to update book');
        }

        toast.success('Book updated successfully');

        setEditingBookId(null);
      } else {
        const response = await fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });

        if (!response.ok) {
          throw new Error('Failed to add book');
        }

        toast.success('Book added successfully');
      }

      setTitle('');
      setAuthor('');
      setGenre('');
      setYear('');

      fetchBooks();
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  }

  async function handleDeleteBook(id: string) {
    const confirmed = confirm('Are you sure you want to delete this book?');

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      toast.success('Book deleted successfully');

      fetchBooks();
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  }

  function handleEditBook(book: Book) {
    setEditingBookId(book.id);

    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setYear(book.year.toString());

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);

    const matchesGenre =
      selectedGenre === 'All' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const genres = ['All', ...new Set(books.map((book) => book.genre))];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium text-zinc-400"
        >
          Loading books...
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f1115] text-zinc-100">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-900 blur-3xl opacity-20" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-zinc-800 blur-3xl opacity-40" />

        <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] rounded-full bg-emerald-950 blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />

            <p className="uppercase tracking-[0.2em] text-sm text-zinc-500 font-medium">
              Personal Library
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Book Management
            <span className="block text-zinc-500">System</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Organize, manage, and update your personal collection with a clean
            and modern experience.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {editingBookId ? 'Edit Book' : 'Add New Book'}
            </h2>

            {editingBookId && (
              <span className="bg-amber-500/10 text-amber-300 text-sm px-3 py-1 rounded-full font-medium border border-amber-500/20">
                Editing Mode
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />

            <input
              type="number"
              placeholder="Publication Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-emerald-900/40"
          >
            {editingBookId ? 'Update Book' : 'Add Book'}
          </button>
        </motion.form>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white/[0.04] border border-white/10 text-white rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-[#18181b]">
                {genre}
              </option>
            ))}
          </select>
        </div>

        {filteredBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/[0.03] border border-dashed border-white/10 rounded-3xl p-16 text-center"
          >
            <h2 className="text-3xl font-semibold text-zinc-200">
              No books found
            </h2>

            <p className="text-zinc-500 mt-4 text-lg">
              Try adjusting your search or add a new book.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -6,
                }}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                      {book.title}
                    </h2>

                    <p className="text-zinc-500 mt-1">{book.author}</p>
                  </div>

                  <span className="bg-emerald-500/10 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/20">
                    {book.genre}
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <p className="text-sm text-zinc-500">
                    Published in{' '}
                    <span className="font-semibold text-zinc-300">
                      {book.year}
                    </span>
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
