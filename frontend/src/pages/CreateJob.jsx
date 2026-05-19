import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'

import API from '../api/axios'

const statuses = ['Applied', 'Assessment', 'Interview', 'Not Selected', 'Selected']

const CreateJob = () => {
  const navigate = useNavigate()

  const [skills, setSkills] = useState([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    salary: '',
    location: '',
    link: '',
    status: 'Applied',
    skills_required: [],
  })

  useEffect(() => {
    let ignore = false

    API.get('jobs/skills/')
      .then((response) => {
        if (!ignore) {
          setSkills(response.data)
        }
      })
      .catch((error) => {
        if (!ignore) {
          console.error(error)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSkillChange = (id) => {
    setFormData((current) => ({
      ...current,
      skills_required: current.skills_required.includes(id)
        ? current.skills_required.filter((skill) => skill !== id)
        : [...current.skills_required, id],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await API.post('jobs/create/', formData)
      navigate('/')
    } catch (error) {
      setError('Could not create this job. Please check the fields and try again.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              New application
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Create Job
            </h1>
          </div>

          {error && (
            <p className="mb-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Company
                <input
                  required
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Role
                <input
                  required
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Salary
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Location
                <input
                  required
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Job Link
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            {skills.length > 0 && (
              <fieldset>
                <legend className="text-sm font-medium text-slate-700">
                  Skills Required
                </legend>

                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const selected = formData.skills_required.includes(skill.id)

                    return (
                      <label
                        key={skill.id}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                          selected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selected}
                          onChange={() => handleSkillChange(skill.id)}
                        />
                        {selected && <FiCheck aria-hidden="true" />}
                        {skill.name}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Creating...' : 'Create Job'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default CreateJob
