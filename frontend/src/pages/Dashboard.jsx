import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiRefreshCw } from 'react-icons/fi'

import API from '../api/axios'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchJobs = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await API.get('jobs/')
      setJobs(response.data)
    } catch (error) {
      setError('Unable to load jobs. Please check that the backend is running.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    API.get('jobs/')
      .then((response) => {
        if (!ignore) {
          setJobs(response.data)
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError('Unable to load jobs. Please check that the backend is running.')
          console.error(error)
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Job Dashboard
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Track applications, follow-up stages, compensation, and role details in one focused view.
            </p>
          </div>

          <Link
            to="/create-job"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <FiPlus aria-hidden="true" />
            Add Job
          </Link>
        </div>

        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchJobs}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 font-medium text-rose-700 ring-1 ring-rose-200"
            >
              <FiRefreshCw aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-lg border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-950">
              No applications yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Add your first role to start tracking status, skills, location, and compensation.
            </p>
            <Link
              to="/create-job"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <FiPlus aria-hidden="true" />
              Add Job
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}

export default Dashboard
