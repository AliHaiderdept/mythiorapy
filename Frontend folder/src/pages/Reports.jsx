export default function Reports() {
  return (
    <main className="mh-page">
      <header className="mh-page-header">
        <div>
          <span className="mh-eyebrow">WELLBEING SUMMARY</span>
          <h1>Reports</h1>
          <p>
                    Review a sample summary of your recent wellbeing activity.
          </p>
        </div>
        <div className="mh-date-chip">Weekly summary</div>
      </header>
      <section className="mh-panel">
        <div className="mh-panel-heading">
          <div><span className="mh-eyebrow">RECENT ACTIVITY</span><h2>Weekly summary</h2></div>
        </div>
        <div className="mh-stat-grid">
          <div className="mh-panel mh-stat-card"><span>Check-ins</span><strong>5</strong><small>Sample total</small></div>
          <div className="mh-panel mh-stat-card"><span>Average score</span><strong>86%</strong><small>Sample score</small></div>
          <div className="mh-panel mh-stat-card"><span>Reflections</span><strong>3</strong><small>Sample total</small></div>
        </div>
        <p className="mh-muted">
                    This sample report is for interface development only. Replace these values with API data later.
        </p>
      </section>
    </main>
  );
}