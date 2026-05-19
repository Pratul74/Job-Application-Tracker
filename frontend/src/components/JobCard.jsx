import { FiBriefcase, FiExternalLink, FiMapPin } from 'react-icons/fi'

const statusStyles = {
  Applied: 'bg-sky-50 text-sky-700 ring-sky-200',
  Assessment: 'bg-amber-50 text-amber-700 ring-amber-200',
  Interview: 'bg-violet-50 text-violet-700 ring-violet-200',
  'Not Selected': 'bg-rose-50 text-rose-700 ring-rose-200',
  Selected: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

const JobCard = ({ job }) => {
  const formattedSalary = Number(job.salary).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {job.company_name}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
            <FiBriefcase aria-hidden="true" />
            {job.role}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[job.status] ?? 'bg-slate-50 text-slate-700 ring-slate-200'}`}
        >
          {job.status}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <FiMapPin aria-hidden="true" />
          {job.location}
        </p>
        <p className="text-base font-semibold text-slate-950">
          INR {formattedSalary}
        </p>
      </div>

      {job.skills_required?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills_required.map((skill) => (
            <span
              key={skill.id}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <FiExternalLink aria-hidden="true" />
          View Posting
        </a>
      )}
    </article>
  )
}

export default JobCard
