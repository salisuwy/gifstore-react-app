import { useEffect } from 'react'

const useTitle = title => {
  useEffect(() => {
    document.title = `${title} - Gif Store`
  }, [title])
}

export default useTitle