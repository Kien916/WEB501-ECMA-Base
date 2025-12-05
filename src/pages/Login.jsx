import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        // Try common token fields, fall back to whole response
        const token = data?.token || data?.accessToken || data
        try {
          localStorage.setItem('token', typeof token === 'string' ? token : JSON.stringify(token))
        } catch (err) {
          console.warn('localStorage error', err)
        }

        toast.success('Đăng nhập thành công')
        navigate('/list')
      } else {
        toast.error(data?.message || 'Đăng nhập thất bại')
      }
    } catch (err) {
      toast.error('Không thể kết nối tới server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </div>
      </form>
    </div>
  )
}
