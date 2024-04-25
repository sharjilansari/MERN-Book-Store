import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import axios from 'axios';
import Spinner from './Spinner';

const SearchBox = () => {
    const [value, setValue] = useState("");
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);

    const debouncedSearchValue = useDebounce(value, 500);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://mern-book-store-r244.onrender.com/books?search=${debouncedSearchValue}`)
            .then((response) => {
                setBooks(response.data.data);
                // console.log(response.data.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [debouncedSearchValue])

    useEffect(() => {
        setSearchValue(value); // Update searchValue when value changes
    }, [value]);

    const results = books.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleChange = (e) => {
        setValue(e.target.value);
    }


    return (
        <>
            <div className="relative my-2">
                <input
                    type="text"
                    placeholder='Search for books...'
                    value={value}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Spinner />
                    </div>
                )}
            </div>

            {!loading && (
                <ul className="mt-2 divide-y divide-gray-200">
                    {results.map((book, idx) => (
                        <li key={idx} className="py-2">
                            {book.title}
                        </li>
                    ))}
                </ul>
            )}

        </>
    )
}

export default SearchBox