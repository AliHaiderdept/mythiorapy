const frequencyOptions = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

const configs = {
  depression: {
    title: 'Depression symptom screening', maxScore: 27,
    thresholds: [[5, 'Mild'], [10, 'Moderate'], [15, 'Moderately high'], [20, 'High']],
    questions: ['Little interest or pleasure in doing things', 'Feeling down, depressed, or hopeless', 'Trouble falling or staying asleep, or sleeping too much', 'Feeling tired or having little energy', 'Poor appetite or overeating', 'Feeling bad about yourself', 'Trouble concentrating', 'Moving or speaking slowly, or feeling restless', 'Thoughts that you would be better off dead or hurting yourself'].map((text, index) => ({ id: `d${index + 1}`, text, options: frequencyOptions })),
    recommendations: ['Keep a gentle daily routine with one manageable task.', 'Choose a supportive person to check in with.', 'Consider speaking with a qualified mental-health professional when symptoms persist.'],
  },
  anxiety: {
    title: 'Anxiety symptom screening', maxScore: 21,
    thresholds: [[5, 'Mild'], [10, 'Moderate'], [15, 'High']],
    questions: ['Feeling nervous, anxious, or on edge', 'Not being able to stop or control worrying', 'Worrying too much about different things', 'Trouble relaxing', 'Being so restless it is hard to sit still', 'Becoming easily annoyed or irritable', 'Feeling afraid as if something awful might happen'].map((text, index) => ({ id: `a${index + 1}`, text, options: frequencyOptions })),
    recommendations: ['Try slow breathing with a longer exhale for two minutes.', 'Break the next task into a small, time-limited step.', 'Seek professional support if worry is interfering with daily life.'],
  },
  stress: {
    title: 'Stress check-in', maxScore: 20,
    thresholds: [[6, 'Lower'], [14, 'Moderate'], [21, 'Higher']],
    questions: ['How often have you felt unable to control important things?', 'How often have you felt confident about handling personal problems?', 'How often have you felt that things were going your way?', 'How often have you felt difficulties were piling up too high?'].map((text, index) => ({ id: `s${index + 1}`, text, options: [{ label: 'Never', value: 0 }, { label: 'Sometimes', value: 1 }, { label: 'Often', value: 2 }, { label: 'Very often', value: 3 }, { label: 'Always', value: 4 }] })),
    recommendations: ['Identify one pressure you can reduce or delegate today.', 'Use a short movement or grounding break between tasks.', 'Protect a regular sleep and recovery window.'],
  },
  wellbeing: {
    title: 'Wellbeing check-in', maxScore: 25,
    thresholds: [[13, 'Needs attention'], [19, 'Fair'], [25, 'Positive']],
    questions: ['I have felt cheerful and in good spirits', 'I have felt calm and relaxed', 'I have felt active and vigorous', 'I woke feeling fresh and rested', 'My daily life has been filled with things that interest me'].map((text, index) => ({ id: `w${index + 1}`, text, options: [{ label: 'At no time', value: 0 }, { label: 'Some of the time', value: 1 }, { label: 'Less than half the time', value: 2 }, { label: 'More than half the time', value: 3 }, { label: 'Most of the time', value: 4 }, { label: 'All of the time', value: 5 }] })),
    recommendations: ['Schedule one meaningful or enjoyable activity this week.', 'Notice and support routines that already help you feel steady.', 'Reach out to someone trusted if low wellbeing persists.'],
  },
  sleep: {
    title: 'Sleep quality check-in', maxScore: 20,
    thresholds: [[6, 'Good'], [12, 'Mixed'], [20, 'Needs attention']],
    questions: ['Difficulty falling asleep', 'Waking during the night', 'Waking too early', 'Daytime tiredness or low alertness'].map((text, index) => ({ id: `sl${index + 1}`, text, options: [{ label: 'Never', value: 0 }, { label: 'Occasionally', value: 1 }, { label: 'Often', value: 2 }, { label: 'Almost always', value: 3 }, { label: 'Every day', value: 4 }] })),
    recommendations: ['Keep wake time consistent where practical.', 'Create a dim, quiet wind-down period before bed.', 'Discuss persistent sleep problems with a healthcare professional.'],
  },
};

function getConfig(type) { return configs[type] || null; }
function scoreAssessment(type, answers = {}) {
  const config = getConfig(type);
  if (!config) return null;
  const values = config.questions.map((question) => Number(answers[question.id] ?? 0));
  const score = values.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
  const threshold = config.thresholds.find(([limit]) => score <= limit) || config.thresholds.at(-1);
  const risk = type === 'depression' && Number(answers.d9) > 0;
  return { score, maxScore: config.maxScore, severity: threshold[1], risk, recommendations: config.recommendations, answers: Object.fromEntries(config.questions.map((question, index) => [question.id, values[index]])) };
}

module.exports = { configs, getConfig, scoreAssessment };
