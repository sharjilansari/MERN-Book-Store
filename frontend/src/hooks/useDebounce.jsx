import {useEffect, useState} from 'react'

const useDebounce = (value, delay = 500) => {
    const [searchTerm, setSearchTerm] = useState(value);

      useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            setSearchTerm(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        }
      },[value, delay])

  return searchTerm
}

export default useDebounce