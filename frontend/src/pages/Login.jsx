import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import API from '../api/axios'
import { AuthContext } from '../context/auth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await API.post('auth/login/', formData)
      const token = response.data?.user?.access_token

      if (!token) {
        throw new Error('Missing access token')
      }

      login(token)
      navigate('/')
    } catch (error) {
      setError('Invalid email or password.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_480px]">
      <section className="hidden bg-slate-950 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Job Tracker
          </p>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight">
            Keep every application moving.
          </h1>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-300">
          A compact workspace for roles, companies, statuses, skills, and compensation.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Login
            </h2>
          </div>

          {error && (
            <p className="mb-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {error}
            </p>
          )}

          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-slate-700">
            Password
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-5 text-center text-sm text-slate-600">
            Don&apos;t have an account?
            <Link to="/register" className="ml-2 font-semibold text-emerald-700 hover:text-emerald-800">
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Login
