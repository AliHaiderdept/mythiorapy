import { useState } from "react";
import { Activity, CalendarDays, Clock3, FileImage, FileText, Search, Settings, ShieldCheck, Sparkles } from "lucide-react";
import "./MentalHealth.css";

const sampleHistory = [
  { date: "Today, 10:30 AM", type: "Assessment", title: "Daily wellbeing check-in", detail: "Completed · Sample result 68/100" },
  { date: "Today, 09:15 AM", type: "Activity", title: "Meditation session", detail: "12 minutes · Breathing exercise" },
  { date: "Yesterday, 06:15 PM", type: "Assessment", title: "Stress questionnaire", detail: "Completed · Review recommended" },
  { date: "Yesterday, 04:20 PM", type: "Search", title: "Sleep hygiene resources", detail: "Searched in More resources" },
  { date: "Nov 20, 02:10 PM", type: "Import", title: "Psychiatrist report", detail: "File imported · Processing status: pending" },
  { date: "Nov 19, 11:00 AM", type: "Settings", title: "Notification preferences updated", detail: "Weekly reports turned off" },
];

export default function History() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = sampleHistory.filter(item =>
    (filter === "All" || item.type === filter) &&
    `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mh-page">
      <header className="mh-page-header">
        <div><span className="mh-eyebrow">YOUR ACTIVITY TIMELINE</span><h1>History</h1><p>Review assessments, daily activities, imports and account changes.</p></div>
        <div className="mh-date-chip"><CalendarDays size={16}/> Personal records</div>
      </header>

      <section className="mh-stat-grid">
        <Stat icon={<ClipboardMark/>} label="Assessments" value="12" note="Sample total"/>
        <Stat icon={<Activity/>} label="Activities" value="28" note="Sample total"/>
        <Stat icon={<FileText/>} label="Reports imported" value="3" note="Sample total"/>
        <Stat icon={<Clock3/>} label="Active days" value="9" note="This month · sample"/>
      </section>

      <section className="mh-panel">
        <div className="mh-panel-heading"><div><span className="mh-eyebrow">RECENT RECORDS</span><h2>Your activity timeline</h2></div><Clock3 className="mh-heading-icon"/></div>
        <div className="mh-history-tools">
          <div className="mh-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your history..."/></div>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            {["All", "Assessment", "Activity", "Search", "Import", "Settings"].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="mh-timeline">
          {filtered.map((item, i) => <div className="mh-timeline-item" key={`${item.title}-${i}`}>
            <div className="mh-timeline-dot">{item.type === "Assessment" ? <Activity size={16}/> : item.type === "Import" ? <FileImage size={16}/> : item.type === "Settings" ? <Settings size={16}/> : item.type === "Search" ? <Search size={16}/> : <Sparkles size={16}/>}</div>
            <div className="mh-timeline-content"><div className="mh-timeline-meta"><span>{item.type}</span><small>{item.date}</small></div><h3>{item.title}</h3><p>{item.detail}</p></div>
          </div>)}
          {filtered.length === 0 && <p className="mh-empty">No matching records found.</p>}
        </div>
      </section>

      <section className="mh-grid-two">
        <section className="mh-panel"><div className="mh-panel-heading"><div><span className="mh-eyebrow">DAILY CONTRIBUTION</span><h2>What you've done</h2></div><Activity className="mh-heading-icon"/></div><ul className="mh-clean-list"><li>Completed a wellbeing assessment</li><li>Recorded a meditation session</li><li>Reviewed educational resources</li><li>Updated notification preferences</li></ul><p className="mh-small-print">Sample activity only. Populate this list from authenticated user events.</p></section>
        <section className="mh-panel"><div className="mh-panel-heading"><div><span className="mh-eyebrow">ACCOUNT AUDIT</span><h2>Privacy & account activity</h2></div><ShieldCheck className="mh-heading-icon"/></div><ul className="mh-clean-list"><li>Recent searches and viewed resources</li><li>Settings changes and consent updates</li><li>Report uploads, exports and deletion requests</li><li>Login sessions and security events</li></ul><p className="mh-small-print">Avoid storing passwords, sensitive report contents or unnecessary raw camera data in history.</p></section>
      </section>
    </div>
  );
}

function Stat({ icon, label, value, note }) {
  return <article className="mh-panel mh-stat-card"><div className="mh-stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}
function ClipboardMark() { return <FileText/>; }
