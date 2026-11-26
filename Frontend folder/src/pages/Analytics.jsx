import ResultCard from "../components/ResultCard";
import { Activity } from "lucide-react";

export default function Analysis() {
  return (
    <div className="mh-page">
      <header className="mh-page-header">
        <div>
          <span className="mh-eyebrow">ASSESSMENT SUMMARY</span>
          <h1>Analysis</h1>
          <p>Below is a summary of your latest assessment and suggestions to help improve your wellbeing.</p>
        </div>
        <div className="mh-date-chip"><Activity size={16}/> Personal analysis</div>
      </header>
      <section className="mh-panel">
        <ResultCard />
      </section>
    </div>
  );
}