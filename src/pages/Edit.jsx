import {useState} from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'
function Edit() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Tour ngoại quốc')

  
  return (
    <div>
      <h1>Cập nhật</h1>
    </div>
  )
}

export default Edit