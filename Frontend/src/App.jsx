import { useState, useEffect } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import './App.css'
import Loader from '../Components/Loader'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`const a= 10
b=10
console.log(a+b)`)

  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleReview = async() =>{
    setLoading(true)
    const response = await axios.post('http://localhost:5000/ai/get-review', {code});
    setLoading(false)
    console.log(response.data)
    setReview(response.data)
  }

  return (
    <>
      <img src='https://i.postimg.cc/SKdfV1s1/Secondary-logo-Dark-Transparent.png' id='logo'></img>

      <main>
        <div className='input-container'>
          <div className='scroller'>
            <Editor
            className='editor'
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 13,
              backgroundColor: 'transparent',
              border: 'none',
              height: '100%',
              width: '100%',
              borderRadius: '10px',
              overflow: 'auto',
            }}
            />

          </div>
          <button id='review' onClick={()=>{handleReview()}}>Review Code</button>
        </div>
        <div className='output-container'>
          <div className='scroller'>
            <pre>
            {
              loading ? <Loader/> : <ReactMarkdown>{review}</ReactMarkdown>
            }
            </pre>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
