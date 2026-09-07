export default function QueryState({ loading, error, empty, emptyText, needsAuth, onLogin, children }) {
  if (needsAuth) {
    return (
      <p className="query-state">
        Log in to load live listings from Soft-Ora CRM.{' '}
        {onLogin ? (
          <button type="button" className="text-link" onClick={onLogin}>
            Log in
          </button>
        ) : null}
      </p>
    )
  }
  if (loading) return <p className="query-state">Loading…</p>
  if (error) return <p className="query-state query-state--error">{error}</p>
  if (empty) return <p className="query-state">{emptyText || 'Nothing to show yet.'}</p>
  return children
}
