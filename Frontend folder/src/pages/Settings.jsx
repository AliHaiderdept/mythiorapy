
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  User, Palette, Bell, Brain, Heart,
  ClipboardList, Shield, Database, Lock,
  ChevronRight, Download, Trash2, LogOut
} from "lucide-react";
import "./Settings.css";

const menu = [
  { id: "profile", title: "Profile", icon: User },
  { id: "appearance", title: "Appearance", icon: Palette },
  { id: "notifications", title: "Notifications", icon: Bell },
  { id: "ai", title: "AI Preferences", icon: Brain },
  { id: "mood", title: "Mood Tracking", icon: Heart },
  { id: "assessment", title: "Assessments", icon: ClipboardList },
  { id: "privacy", title: "Privacy & Security", icon: Shield },
  { id: "data", title: "Data Management", icon: Database },
];

const initialSettings = {
  emailAlerts: true,
  assessmentReminders: true,
  weeklyReports: false,
  moodReminders: true,
  aiInsights: true,
  personalizedSuggestions: true,
  moodTracking: true,
  saveAssessment: true,
  darkMode: false,
  shareReports: false,
  twoFactor: false,
  fontSize: "Medium",
  language: "English",
  reportLanguage: "English",
  assessmentLanguage: "English",
  reminderFrequency: "Daily",
};

export default function Settings() {
  const [active, setActive] = useState("profile");
  const [settings, setSettings] = useState(() => {
    try {
      return { ...initialSettings, ...JSON.parse(localStorage.getItem("mh-settings") || "{}") };
    } catch {
      return initialSettings;
    }
  });
  const [profile, setProfile] = useState(() => {
    try {
      return {
        fullName: "",
        email: "",
        username: "",
        
        ...JSON.parse(localStorage.getItem("mh-profile") || "{}"),
      };
    } catch {
      return { fullName: "", email: "", username: "", };
    }
  });
  const [status, setStatus] = useState("");
  const reportInputRef = useRef(null);
  const { openAuth, theme, setTheme, fontSize, setFontSize } = useAuth();

  const toggle = (key) => {
    if (key === "darkMode") {
      setTheme(theme === "dark" ? "light" : "dark");
    }
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    localStorage.setItem("mh-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: theme === "dark",
      fontSize,
    }));
  }, [theme, fontSize]);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), 3000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const updateSetting = (key, value) => {
    if (key === "fontSize") setFontSize(value);
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateProfile = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    localStorage.setItem("mh-profile", JSON.stringify(profile));
    setStatus("Profile changes saved.");
  };

  const downloadFile = (filename, content, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const exportAssessmentHistory = () => {
    const csv = "Date,Assessment,Status\n2026-11-23,Mood check-in,Completed\n2026-11-22,Stress snapshot,Completed";
    downloadFile("assessment-history.csv", csv, "text/csv");
    setStatus("Assessment history exported.");
  };

  const downloadReports = () => {
    downloadFile(
      "mental-health-weekly-report.txt",
      "Mental Health Analyzer - Weekly Report\n\nThis is a downloadable sample report."
    );
    setStatus("Report downloaded.");
  };

  const Switch = ({ title, desc, name }) => (
    <div className="mh-setting-row">
      <div className="mh-setting-info">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <button
        className={`mh-switch ${settings[name] ? "enabled" : ""}`}
        onClick={() => toggle(name)}
        aria-label={`Toggle ${title}`}
        aria-pressed={settings[name]}
      >
        <span />
      </button>
    </div>
  );

  const Heading = ({ title, desc }) => (
    <div className="mh-heading">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );

  const Card = ({ title, children }) => (
    <div className="mh-card">
      <h3>{title}</h3>
      {children}
    </div>
  );

  const renderSection = () => {
    switch (active) {

    case "profile":
      return <>
        <Heading title="Profile Settings" desc="Manage your personal information and account details." />
        <Card title="Personal Information">
          <form onSubmit={saveProfile}>
            <label>Full Name<input value={profile.fullName} onChange={(event) => updateProfile("fullName", event.target.value)} placeholder="Enter your name" /></label>
            <label>Email Address<input value={profile.email} onChange={(event) => updateProfile("email", event.target.value)} type="email" placeholder="Enter your email" /></label>
            <label>Username<input value={profile.username} onChange={(event) => updateProfile("username", event.target.value)} placeholder="Username" /></label>
            <button type="submit" className="mh-primary">Save Changes</button>
          </form>
        </Card>
      </>;

    case "appearance":
      return <>
        <Heading title="Appearance" desc="Customize your dashboard experience." />
        <Card title="Display Preferences">
          <Switch title="Dark Mode" desc="Use the dark interface throughout the application." name="darkMode" />
          <div className="mh-setting-row">
            <div className="mh-setting-info">
              <h4>Font Size</h4>
              <p>Adjust the application text size.</p>
            </div>
            <select value={settings.fontSize} onChange={(event) => updateSetting("fontSize", event.target.value)}>
              <option>Small</option><option>Medium</option><option>Large</option>
            </select>
          </div>
          <div className="mh-setting-row">
            <div className="mh-setting-info">
              <h4>Language</h4>
              <p>Choose your preferred language.</p>
            </div>
            <select value={settings.language} onChange={(event) => updateSetting("language", event.target.value)}>
              <option>English</option><option>Urdu</option>
            </select>
          </div>
        </Card>
      </>;

    case "notifications":
      return <>
        <Heading title="Notifications" desc="Control your reminders and important updates." />
        <Card title="Notification Preferences">
          <Switch title="Email Alerts" desc="Receive account updates through email." name="emailAlerts" />
          <Switch title="Assessment Reminders" desc="Reminders for pending mental health assessments." name="assessmentReminders" />
          <Switch title="Weekly Reports" desc="Receive a weekly progress summary." name="weeklyReports" />
          <Switch title="Mood Reminders" desc="Get reminders to record your daily mood." name="moodReminders" />
        </Card>
      </>;

    case "ai":
      return <>
        <Heading title="AI Preferences" desc="Customize how your AI analysis experience works." />
        <Card title="AI Analysis">
          <Switch title="AI Insights" desc="Enable AI-generated insights from your assessments." name="aiInsights" />
          <Switch title="Personalized Suggestions" desc="Receive recommendations based on your assessment history." name="personalizedSuggestions" />
          <div className="mh-setting-row">
            <div className="mh-setting-info">
              <h4>Report Language</h4>
              <p>Choose your preferred analysis language.</p>
            </div>
            <select value={settings.reportLanguage} onChange={(event) => updateSetting("reportLanguage", event.target.value)}>
              <option>English</option><option>Urdu</option>
            </select>
          </div>
        </Card>
        <div className="mh-info">
            AI-generated insights are informational and are not a substitute for professional mental health diagnosis or treatment.
        </div>
      </>;

    case "mood":
      return <>
        <Heading title="Mood Tracking" desc="Manage your daily mood monitoring preferences." />
        <Card title="Mood Preferences">
          <Switch title="Enable Mood Tracking" desc="Allow daily mood records in your dashboard." name="moodTracking" />
          <Switch title="Mood Reminders" desc="Receive daily mood recording reminders." name="moodReminders" />
          <div className="mh-setting-row">
            <div className="mh-setting-info">
              <h4>Reminder Frequency</h4>
              <p>Choose how often you want reminders.</p>
            </div>
            <select value={settings.reminderFrequency} onChange={(event) => updateSetting("reminderFrequency", event.target.value)}>
              <option>Daily</option><option>Weekly</option>
            </select>
          </div>
        </Card>
      </>;

    case "assessment":
      return <>
        <Heading title="Assessment Preferences" desc="Manage your mental health questionnaire experience." />
        <Card title="Assessment Options">
          <Switch title="Save Assessment Progress" desc="Automatically save incomplete assessments." name="saveAssessment" />
          <div className="mh-setting-row">
            <div className="mh-setting-info">
              <h4>Default Assessment Language</h4>
              <p>Choose your preferred questionnaire language.</p>
            </div>
            <select value={settings.assessmentLanguage} onChange={(event) => updateSetting("assessmentLanguage", event.target.value)}>
              <option>English</option><option>Urdu</option>
            </select>
          </div>
        </Card>
      </>;

    case "privacy":
      return <>
        <Heading title="Privacy & Security" desc="Protect your personal and mental health information." />
        <Card title="Security">
          <Switch title="Two-Factor Authentication" desc="Add another layer of login security." name="twoFactor" />
          <button className="mh-secondary" type="button" onClick={() => {
            const password = window.prompt("Enter a new password");
            if (password) setStatus(password.length >= 8 ? "Password updated." : "Password must be at least 8 characters.");
          }}>Change Password <ChevronRight size={16}/></button>
        </Card>
        <Card title="Data Privacy">
          <Switch title="Share Reports" desc="Allow sharing reports with authorized professionals." name="shareReports" />
          <p className="mh-muted">Your mental health records should remain private unless you explicitly authorize sharing.</p>
        </Card>
      </>;

    case "data":
      return <>
        <Heading title="Data Management" desc="Manage your saved assessments and medical reports." />
        <Card title="Your Data">
          <button type="button" className="mh-secondary" onClick={exportAssessmentHistory}><Download size={16}/> Export Assessment History</button>
          <button type="button" className="mh-secondary" onClick={downloadReports}><Download size={16}/> Download Reports</button>
          <input ref={reportInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setStatus(`${file.name} selected for upload.`);
          }} />
          <button type="button" className="mh-secondary" onClick={() => reportInputRef.current?.click()}><Database size={16}/> Manage Uploaded Reports</button>
        </Card>
        <Card title="Account Actions">
          <button type="button" className="mh-danger" onClick={() => {
            if (window.confirm("Delete this account and all locally saved settings?")) {
              localStorage.removeItem("mh-settings");
              localStorage.removeItem("mh-profile");
              setSettings(initialSettings);
              setProfile({ fullName: "", email: "", username: "", phone: "" });
              setTheme("light");
              setFontSize("Medium");
              setStatus("Account data deleted.");
            }
          }}><Trash2 size={16}/> Delete Account</button>
          <button type="button" className="mh-secondary" onClick={() => openAuth("login")}><LogOut size={16}/> Logout</button>
        </Card>
      </>;

    default:
      return null;
    }
  };

  return (
    <div className={`mh-settings ${settings.darkMode ? "mh-dark" : "mh-light"} mh-font-${settings.fontSize.toLowerCase()}`}>

      <aside className="mh-settings-sidebar">
        <div className="mh-settings-brand">
          <div className="mh-brand-icon"><Brain /></div>
          <div>
            <h2>Settings</h2>
            <p>Manage your preferences</p>
          </div>
        </div>

        <span className="mh-menu-label">PREFERENCES</span>

        {menu.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`mh-menu-item ${active === item.id ? "active" : ""}`}
            >
              <Icon size={19}/>
              <span>{item.title}</span>
              <ChevronRight size={15}/>
            </button>
          );
        })}

        <div className="mh-sidebar-footer">
          Mental Health Analyzer
          <span>Version 1.0.0</span>
        </div>
      </aside>

      <main className="mh-settings-content">
        <header className="mh-settings-header">
          <div>
            <span>Dashboard / Settings</span>
            <h1>Settings</h1>
          </div>
          
        </header>

        {renderSection()}
        {status && (
          <div className="mh-status" role="status" aria-live="polite">
            {status}
          </div>
        )}

        <footer className="mh-footer">
          <span>© 2026 Mental Health Analyzer</span>
          <span>Privacy Policy · Terms & Conditions</span>
        </footer>
      </main>
    </div>
  );
}
