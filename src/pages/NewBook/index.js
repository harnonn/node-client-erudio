import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import './styles.css';
import logoImage from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api' ;

export default function NewBook() {

    
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const {bookId} = useParams();
    const navigate = useNavigate(); 

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    useEffect(() => {
        if (bookId == 0) {
            return;
        } else {
            loadBook();
        }
    }, [bookId]);

    async function loadBook() {
        try {
            const response = await api.get(`api/book/v1/${bookId}`, {headers: headers});
            let adjustedDate = response.data.launchDate.split('T', 10)[0];
            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setLaunchDate(adjustedDate);
        } catch (error) {
            alert('Error while recovering the book! Try again');
            navigate('/books');
        }
    }
        
    async function saveOrUpdate(e){
        e.preventDefault();

        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        
        const data = {
            title,
            author,
            price,
            launchDate
        };

        try {
            if (bookId == 0) {
                const response = await api.post('api/book/v1', data, {headers: headers});
                navigate('/books');
            } else {
                data.id = id;
                const response = await api.put('api/book/v1', data, {headers: headers});
                navigate('/books');
            }          
        } catch (error) {
            console.log(error);
            alert('Error while recording book! Try again');
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt='Erudio Logo'/>
                    <h1>{bookId === '0' ? 'Add New':'Update'} Book</h1>
                    <p>Enter the book information and click on {bookId === '0' ? 'Add':'Update'}!</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251fc5"/>
                        Back to Books
                    </Link>
                    </section>
                <form onSubmit={saveOrUpdate}>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
                    <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author"/>
                    <input value={launchDate} onChange={e => setLaunchDate(e.target.value)} type="date"/>
                    <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
                    <button className="button"  type="submit">{bookId === '0' ? 'Add':'Update'}</button>
                </form>
            </div>
        </div>
    ); 
}