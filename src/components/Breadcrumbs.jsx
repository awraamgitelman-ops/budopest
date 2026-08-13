import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const { breadcrumbs, navigate } = useRouter();

  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Хлібні крихти" className="breadcrumbs-wrapper">
      <div className="container">
        <ol className="breadcrumbs-list">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <li key={idx} className="crumb-item">
                {idx > 0 && <ChevronRight size={13} className="crumb-separator" />}
                {isLast ? (
                  <span className="crumb-current" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <a
                    href={crumb.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(crumb.path);
                    }}
                    className="crumb-link"
                  >
                    <span>{crumb.label}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .breadcrumbs-wrapper {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 0;
          font-size: 0.84rem;
        }

        .breadcrumbs-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .crumb-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .crumb-separator {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .crumb-link {
          color: #475569;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
          transition: color 0.15s;
        }

        .crumb-link:hover {
          color: var(--c-green-dark);
        }

        .home-icon {
          color: var(--c-green);
        }

        .crumb-current {
          color: #0f172a;
          font-weight: 700;
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .crumb-current {
            max-width: 180px;
          }
        }
      `}</style>
    </nav>
  );
};
