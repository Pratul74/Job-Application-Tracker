import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import API from '../api/axios'
import { AuthContext } from '../context/auth'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password1: '',
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
      const response = await API.post('auth/register/', formData)
      const token = response.data?.user?.access_token

      if (!token) {
        throw new Error('Missing access token')
      }

      login(token)
      navigate('/')
    } catch (error) {
      setError('Could not create your account. Please check the form and try again.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Start tracking
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Create Account
          </h1>
        </div>

        {error && (
          <p className="mb-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            First Name
            <input
              required
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Last Name
            <input
              required
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        </div>

        <label className="mt-5 block text-sm font-medium text-slate-700">
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

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              required
              type="password"
              name="password"
              minLength="8"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Confirm Password
            <input
              required
              type="password"
              name="password1"
              minLength="8"
              value={formData.password1}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?
          <Link to="/login" className="ml-2 font-semibold text-emerald-700 hover:text-emerald-800">
            Login
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Register
