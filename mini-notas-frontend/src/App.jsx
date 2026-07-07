import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const loadNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes`);
      const data = await response.json();
      setNotes(data);
      setMessage('Notas cargadas correctamente');
    } catch (error) {
      setMessage('No se pudo conectar con el backend');
    }
  };

  const createNote = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      if (!response.ok) {
        throw new Error('Error al crear nota');
      }

      setTitle('');
      setContent('');
      await loadNotes();
      setMessage('Nota creada correctamente');
    } catch (error) {
      setMessage('Error al guardar la nota');
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <p className="tag">Vercel + Render + MongoDB Atlas</p>
        <h1>Mini Notas Cloud</h1>
        <p>
          Proyecto para practicar despliegue de frontend,
          backend y base de datos en la nube con tu querido profesor.
        </p>
      </section>

      <section className="card">
        <h2>Nueva nota</h2>
        <form onSubmit={createNote}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Titulo de la nota"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Contenido de la nota"
          />
          <button type="submit">Guardar nota</button>
        </form>
        <p className="message">{message}</p>
      </section>

      <section className="card">
        <h2>Notas guardadas</h2>
        <div className="list">
          {notes.map((note) => (
            <article className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}