import { Fragment, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, RotateCcw } from "lucide-react";
import "./MentalHealth.css";

const frequencyOptions = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];

const categories = [
  {
    title: "Personal & Demographic Details",
    description: "Basic profile: age range, education, occupation and lifestyle context.",
    questions: [
      {
        question: "What is your age group?",
        options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65 or older", "Prefer not to say"],
      },
      {
        question: "What is your current education level?",
        options: ["No formal education", "Primary", "Secondary", "High school", "Undergraduate", "Postgraduate", "Other", "Prefer not to say"],
      },
      {
        question: "What is your employment status?",
        options: ["Employed full time", "Employed part time", "Self-employed", "Unemployed", "Student", "Retired", "Unable to work", "Other", "Prefer not to say"],
      },
      {
        question: "What is your current living arrangement?",
        options: ["Living alone", "With family", "With a partner", "With roommates", "Supported accommodation", "Other", "Prefer not to say"],
      },
      {
        question: "Have you previously received mental-health support?",
        options: ["Yes, currently", "Yes, in the past", "No", "Prefer not to say"],
      },
    ],
  },
  {
    title: "Cognitive Assessment",
    description: "Thinking, memory, concentration and decision-making.",
    questions: [
      { question: "Do you struggle to concentrate on tasks?", options: frequencyOptions },
      { question: "Do you frequently forget recently learned information?", options: frequencyOptions },
      { question: "Do you overthink simple decisions?", options: frequencyOptions },
      { question: "Do you find it difficult to organize your thoughts?", options: frequencyOptions },
      { question: "Do unwanted thoughts repeatedly interrupt your activities?", options: frequencyOptions },
    ],
  },
  {
    title: "Emotional & Mood Assessment",
    description: "Emotional regulation, sadness, anxiety and mood changes.",
    questions: [
      { question: "How frequently do you feel sad or emotionally low?", options: frequencyOptions },
      { question: "Do you experience excessive worry?", options: frequencyOptions },
      { question: "Do you lose interest in activities you previously enjoyed?", options: frequencyOptions },
      { question: "Do your emotions change suddenly?", options: frequencyOptions },
      { question: "Do you find it difficult to control anger or frustration?", options: frequencyOptions },
    ],
  },
  {
    title: "Behavioral Assessment",
    description: "Habits, motivation, avoidance and daily behavior.",
    questions: [
      { question: "Do you frequently avoid responsibilities?", options: frequencyOptions },
      { question: "Have you lost motivation to complete daily tasks?", options: frequencyOptions },
      { question: "Do you isolate yourself from others?", options: frequencyOptions },
      { question: "Do you experience difficulty controlling impulsive actions?", options: frequencyOptions },
      { question: "Have your daily habits changed recently?", options: frequencyOptions },
    ],
  },
  {
    title: "Sleep & Physical Health Assessment",
    description: "Sleep quality, energy, appetite and physical symptoms.",
    questions: [
      { question: "Do you have difficulty falling asleep?", options: frequencyOptions },
      { question: "Do you wake up frequently during the night?", options: frequencyOptions },
      { question: "Do you feel tired even after sleeping?", options: frequencyOptions },
      { question: "Have you experienced appetite changes?", options: frequencyOptions },
      { question: "Do you frequently experience unexplained physical discomfort?", options: frequencyOptions },
    ],
  },
  {
    title: "Stress & Life Experiences",
    description: "Stressors, coping mechanisms and difficult life experiences.",
    questions: [
      { question: "How frequently do you feel overwhelmed by responsibilities?", options: frequencyOptions },
      { question: "How difficult is it for you to cope with unexpected changes?", options: ["Not difficult", "A little difficult", "Moderately difficult", "Very difficult", "Extremely difficult"] },
      { question: "Does academic or professional pressure affect your mental well-being?", options: ["Not at all", "A little", "Somewhat", "A lot", "Prefer not to say"] },
      { question: "Do past difficult experiences still affect your daily life?", options: frequencyOptions },
      {
        question: "What do you usually do when experiencing emotional stress?",
        options: ["Talk to someone I trust", "Take a break or rest", "Exercise or move around", "Use a calming practice", "Try to solve the issue", "I do not have a usual strategy", "Prefer not to say"],
      },
    ],
  },
  {
    title: "Social & Relationship Assessment",
    description: "Social interaction, loneliness, support and relationships.",
    questions: [
      { question: "Do you frequently feel lonely?", options: frequencyOptions },
      { question: "Is it difficult for you to communicate your emotions?", options: frequencyOptions },
      { question: "Do you feel supported by people around you?", options: ["Almost always", "Often", "Sometimes", "Rarely", "Never", "Prefer not to say"] },
      { question: "Do relationship conflicts affect your emotional well-being?", options: frequencyOptions },
      { question: "Do you avoid social situations?", options: frequencyOptions },
    ],
  },
  {
    title: "Daily Functioning Assessment",
    description: "Work, studies, responsibilities and everyday functioning.",
    questions: [
      { question: "Has your mental well-being affected your academic or professional performance?", options: ["Not at all", "A little", "Somewhat", "A lot", "Extremely"] },
      { question: "Do you struggle to complete basic daily responsibilities?", options: frequencyOptions },
      { question: "Has your productivity decreased recently?", options: frequencyOptions },
      { question: "Do you find it difficult to maintain a consistent routine?", options: frequencyOptions },
      { question: "How much does your emotional state interfere with everyday life?", options: ["Not at all", "A little", "Somewhat", "A lot", "Extremely"] },
    ],
  },
];

const questions = categories.flatMap((category) =>
  category.questions.map((item) => ({ ...item, category: category.title, description: category.description }))
);

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const question = questions[step];
  const answeredCount = Object.keys(answers).length;
  const progress = finished ? 100 : (answeredCount / questions.length) * 100;

  function choose(value) {
    setAnswers((previous) => ({ ...previous, [step]: value }));
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setFinished(false);
  }

  function submit() {
    setFinished(true);
  }

  return (
    <div className="mh-page mh-assessment-page">
      <header className="mh-page-header">
        <div>
          <span className="mh-eyebrow">SELF-REFLECTION</span>
          <h1>Mental Health Assessment</h1>
          <p>Explore your well-being across eight areas. Choose the answers that feel right for you.</p>
        </div>
        <div className="mh-date-chip"><ClipboardList size={16} /> 40-question check-in</div>
      </header>

      <div className="mh-assessment-layout">
        <aside className="mh-panel mh-assessment-aside">
          <div className="mh-assessment-icon"><Activity size={25} /></div>
          <h3>Wellness check-in</h3>
          <p>Answer based on your experiences. There are no right or wrong answers.</p>
          <div className="mh-progress-label"><span>Progress</span><b>{Math.round(progress)}%</b></div>
          <div
            className="mh-bar-track"
            role="progressbar"
            aria-label="Assessment completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="mh-assessment-meta"><span>Answered</span><b>{answeredCount} of {questions.length}</b></div>
          <div className="mh-assessment-meta"><span>Categories</span><b>{categories.length}</b></div>
          <div className="mh-assessment-meta"><span>Estimated time</span><b>8 to 10 minutes</b></div>
          <div className="mh-caution">
            This self-reflection questionnaire is not clinically validated and cannot diagnose a condition. It does not ask for names, phone numbers or exact addresses.
          </div>
        </aside>

        <main className="mh-panel mh-question-panel">
          {!finished ? <>
            <div className="mh-question-top">
              <span>QUESTION {step + 1} OF {questions.length}</span>
              <span className="mh-tag">{question.category}</span>
            </div>
            <p className="mh-muted">{question.description}</p>
            <div
              className="mh-bar-track mh-question-progress"
              role="progressbar"
              aria-label="Assessment completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
            <h2>{question.question}</h2>
            <p className="mh-muted">Select the answer that best describes your experience.</p>
            <div className="mh-answer-list">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => choose(option)}
                  className={`mh-answer-option ${answers[step] === option ? "selected" : ""}`}
                  aria-pressed={answers[step] === option}
                >
                  <span>{option}</span>
                  {answers[step] === option && <CheckCircle2 size={18} />}
                </button>
              ))}
            </div>
            <div className="mh-question-actions">
              <button className="mh-secondary-button" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>
                <ArrowLeft size={16} /> Previous
              </button>
              {step < questions.length - 1
                ? <button className="mh-primary-button" disabled={!answers[step]} onClick={() => setStep((current) => current + 1)}>Next <ArrowRight size={16} /></button>
                : <button className="mh-primary-button" disabled={!answers[step]} onClick={submit}>Finish assessment <CheckCircle2 size={16} /></button>}
            </div>
          </> : <div className="mh-complete">
            <div className="mh-complete-icon"><CheckCircle2 size={34} /></div>
            <span className="mh-eyebrow">CHECK-IN COMPLETED</span>
            <h2>Thank you for checking in.</h2>
            <p>Your responses are shown here for reflection. This questionnaire does not provide a diagnosis.</p>
            <div className="mh-response-summary">
              {categories.map((category) => (
                <Fragment key={category.title}>
                  <div className="mh-response-category">{category.title}</div>
                  {category.questions.map((item) => {
                    const index = questions.findIndex((entry) => entry.question === item.question);
                    return <div key={item.question}><span>{item.question}</span><b>{answers[index]}</b></div>;
                  })}
                </Fragment>
              ))}
            </div>
            <button className="mh-primary-button" onClick={restart}><RotateCcw size={16} /> Retake questionnaire</button>
          </div>}
        </main>
      </div>
    </div>
  );
}
