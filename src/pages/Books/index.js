import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {FiPower, FiEdit, FiTrash2} from 'react-icons/fi'
import api from '../../services/api' ;
import './styles.css';
import logoImage from '../../assets/logo.svg';

export default function Books() {

    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    const params = {
        page: page,
        limit: 4,
        direction: 'asc'
    };

    async function logout() {
        localStorage.clear();
        navigate('/');
    }

    async function deleteBook(id) {
        try {
            await api.delete(`/api/book/v1/${id}`, {headers: headers});
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            alert('Delete failed! Try again.');
        }
    }

    async function editBook(id) {
        try {
            navigate(`/books/new/${id}`);
        } catch (error) {
            alert('Edit Book failed! Try again.');
        }
    }

    async function fetchMoreBooks() {
        const response = await api.get('api/book/v1', {params: params, headers: headers});
        setBooks([...books,...response.data._embedded.bookVOList]);
        setPage(page+1);
    }

    useEffect(() => {
        fetchMoreBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Erudio"/>
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>
                <Link className="button" to="/books/new/0">Add New Book</Link>
                <button type="button" onClick={logout}>
                    <FiPower size={18} color="#251fc5"></FiPower>
                </button>
            </header>
            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title: </strong>
                        <p>{book.title}</p>
                        <strong>Author: </strong>
                        <p>{book.author}</p>
                        <strong>Price: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Launch Date: </strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
                        <button type="buton" onClick={() => editBook(book.id)}>
                            <FiEdit size={20} color="#251fc5"/>
                        </button>
                        <button type="buton" onClick={() => deleteBook(book.id)}>
                            <FiTrash2 size={20} color="#251fc5" />
                        </button>
                    </li>
                ))}
            </ul>
            <button className="button" onClick={fetchMoreBooks} type="button">Load More</button>
        </div>
    );
}