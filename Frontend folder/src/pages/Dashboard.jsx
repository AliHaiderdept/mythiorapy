import { useEffect, useRef, useState } from "react";
import {
  Activity, Brain, Camera, CheckCircle2, ChevronRight, ClipboardList, Clock3,
  FileImage, FileText, Heart, Moon, Play, Sparkles, Upload, Video
} from "lucide-react";
import "./MentalHealth.css";

const factors = [
  { name: "Stress", value: 72, color: "#e8a45b" },
  { name: "Anxiety", value: 54, color: "#a78bfa" },
  { name: "Sleep", value: 81, color: "#65b9b0" },
  { name: "Mood", value: 63, color: "#e58db0" },
  { name: "Focus", value: 68, color: "#7da8e8" },
];

const quizHistory = [
  { name: "Wellbeing check-in", date: "Today · 10:30 AM", score: "68/100", status: "Completed" },
  { name: "Stress questionnaire", date: "Yesterday · 06:15 PM", score: "Moderate range", status: "Completed" },
];

export default function Dashboard() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [reportText, setReportText] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [reportMode, setReportMode] = useState("text");
  const [notice, setNotice] = useState("");

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  }, []);

  async function startCamera() {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch {
      setCameraError("Camera access was blocked or is unavailable. Check browser permissions.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }

  function handleUpload(event, setter) {
    const file = event.target.files?.[0];
    if (file) setter(file);
  }

  function submitDemo(label) {
    setNotice(`${label} selected. Connect your backend/model API to process this input.`);
  }

  return (
    <div className="mh-page">
      <header className="mh-page-header">
        <div><span className="mh-eyebrow">YOUR WELLBEING OVERVIEW</span><h1>Dashboard</h1><p>Track your habits, review check-ins and explore your wellbeing data.</p></div>
        <div className="mh-date-chip"><Activity size={16}/> Personal dashboard</div>
      </header>

      <section className="mh-grid-two mh-top-grid">
        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">DAILY ROUTINE</span><h2>Meditation usage</h2></div><Moon className="mh-heading-icon"/></div>
          <div className="mh-meditation-total"><strong>24 <small>min</small></strong><span>Today's sample activity</span></div>
          <div className="mh-week-bars">
            {[18, 32, 24, 40, 28, 24, 12].map((v, i) => <div className="mh-week-day" key={i}><div className="mh-week-track"><span style={{height: `${v * 2}%`}}/></div><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}
          </div>
          <div className="mh-inline-note"><CheckCircle2 size={15}/> 4 meditation sessions this week</div>
        </article>

        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">WELLBEING SNAPSHOT</span><h2>Health factors</h2></div><Activity className="mh-heading-icon"/></div>
          <p className="mh-muted">Illustrative scores from a sample assessment. Replace with validated model output.</p>
          <div className="mh-factor-bars">
            {factors.map(item => <div className="mh-factor" key={item.name}><div><span>{item.name}</span><b>{item.value}%</b></div><div className="mh-bar-track"><span style={{width: `${item.value}%`, background: item.color}}/></div></div>)}
          </div>
        </article>
      </section>

      <section className="mh-grid-two">
        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">RECENT CHECK-INS</span><h2>Previous assessment results</h2></div><ClipboardIcon/></div>
          {quizHistory.map(item => <div className="mh-history-row" key={item.name}><div><b>{item.name}</b><small>{item.date}</small></div><span className="mh-result-pill">{item.score}</span></div>)}
          <button className="mh-text-button" onClick={() => submitDemo("Assessment history")}>View all results <ChevronRight size={15}/></button>
        </article>
        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">REFLECTION POINTS</span><h2>Recommendations</h2></div><Sparkles className="mh-heading-icon"/></div>
          <ul className="mh-recommendations">
            <li>Try a short guided breathing break between tasks.</li>
            <li>Keep a consistent sleep and wake-up schedule.</li>
            <li>Repeat check-ins over time and discuss concerns with a qualified professional.</li>
          </ul>
          <div className="mh-caution"><Heart size={16}/> Assessment scores are not a diagnosis.</div>
        </article>
      </section>

      <section className="mh-panel">
        <div className="mh-panel-heading"><div><span className="mh-eyebrow">OPTIONAL CAMERA TOOL</span><h2>Facial expression check-in</h2><p>Use a live camera preview or import an image/video for an expression-demo workflow.</p></div><Camera className="mh-heading-icon"/></div>
        <div className="mh-grid-two mh-media-grid">
          <div className="mh-camera-box">
            {cameraOn ? <video ref={videoRef} autoPlay playsInline muted /> : <div className="mh-camera-placeholder"><Camera size={32}/><span>Camera preview appears here</span></div>}
          </div>
          <div className="mh-upload-area">
            <h3>Choose an input</h3>
            <p className="mh-muted">Camera preview or a local image/video file. No identity recognition is performed by this UI.</p>
            <div className="mh-button-row">
              {!cameraOn ? <button className="mh-primary-button" onClick={startCamera}><Camera size={16}/> Start camera</button> : <button className="mh-secondary-button" onClick={stopCamera}>Stop camera</button>}
              <label className="mh-secondary-button mh-file-button"><Upload size={16}/> Import image/video<input type="file" accept="image/*,video/*" onChange={e => handleUpload(e, setMediaFile)}/></label>
            </div>
            {mediaFile && <p className="mh-file-name"><FileImage size={15}/>{mediaFile.name}</p>}
            {cameraError && <p className="mh-error">{cameraError}</p>}
            <button className="mh-primary-button" onClick={() => submitDemo("Expression input")}>Continue to analysis <ChevronRight size={16}/></button>
          </div>
        </div>
        <div className="mh-caution"><ShieldIcon/> Facial appearance cannot reliably reveal a person's mental health, personality or behaviour. Treat this only as an optional visible-expression research/demo feature, not a diagnosis.</div>
      </section>

      <section className="mh-grid-two">
        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">COGNITIVE ACTIVITIES</span><h2>Cognitive response check</h2></div><Brain className="mh-heading-icon"/></div>
          <p className="mh-muted">Use short, validated attention, memory and reaction-time tasks to summarize task performance over time.</p>
          <div className="mh-metric-grid"><div><b>Attention</b><strong>Not assessed</strong></div><div><b>Working memory</b><strong>Not assessed</strong></div><div><b>Reaction time</b><strong>Not assessed</strong></div></div>
          <button className="mh-primary-button" onClick={() => submitDemo("Cognitive task")}>Start cognitive tasks <ChevronRight size={16}/></button>
          <p className="mh-small-print">This feature should report task-specific performance, not estimate IQ or diagnose cognitive conditions.</p>
        </article>

        <article className="mh-panel">
          <div className="mh-panel-heading"><div><span className="mh-eyebrow">PROFESSIONAL DOCUMENTS</span><h2>Psychiatrist report analysis</h2></div><FileText className="mh-heading-icon"/></div>
          <div className="mh-tabs"><button className={reportMode === "text" ? "active" : ""} onClick={() => setReportMode("text")}>Enter text</button><button className={reportMode === "file" ? "active" : ""} onClick={() => setReportMode("file")}>Upload image/PDF</button></div>
          {reportMode === "text" ? <textarea className="mh-textarea" value={reportText} onChange={e => setReportText(e.target.value)} placeholder="Paste report text here. Remove personal identifiers before uploading..."/> : <label className="mh-dropzone"><Upload size={24}/><span>Choose report image or PDF</span><input type="file" accept="image/*,.pdf" onChange={e => handleUpload(e, setReportFile)}/>{reportFile && <small>{reportFile.name}</small>}</label>}
          <button className="mh-primary-button" onClick={() => submitDemo("Psychiatrist report")}>Submit report for review <ChevronRight size={16}/></button>
          <p className="mh-small-print">Only upload documents you have permission to share. Use secure backend storage and explicit consent.</p>
        </article>
      </section>

      {notice && <div className="mh-toast" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}
    </div>
  );
}

function ClipboardIcon() { return <ClipboardList className="mh-heading-icon mh-clipboard-icon"/>; }
function ShieldIcon() { return <Heart size={16}/>; }
