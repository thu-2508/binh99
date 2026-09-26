export type GradeLevel = 6 | 7 | 8 | 9;

export type SkillCategory = 'Listening' | 'Language' | 'Reading' | 'Writing';

export type CognitiveLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'pronunciation'
  | 'stress'
  | 'reorder'
  | 'cloze'
  | 'reading_comprehension'
  | 'sign_notice'
  | 'sentence_transformation'
  | 'open_writing';

export interface QuestionOption {
  key: string; // 'A' | 'B' | 'C' | 'D' | 'T' | 'F'
  text: string;
}

export interface Question {
  id: string;
  taskNumber?: number;
  questionNumber: number;
  type: QuestionType;
  level: CognitiveLevel;
  prompt: string; // The question text / lead-in
  subPrompt?: string; // Additional context or sentences to arrange
  options?: QuestionOption[];
  correctAnswer: string; // e.g. 'A', 'B', 'T', 'F', or model answer for writing
  explanation?: string;
  points?: number;
  // Specific fields
  underlinedPart?: string; // For pronunciation / grammar error identification
  itemsToReorder?: string[]; // For sentence/dialogue arrangement
  writingRequirements?: {
    minWords: number;
    maxWords: number;
    guidingQuestions: string[];
    sampleAnswer?: string;
  };
  imageSignUrl?: string; // For signs & notices
  signText?: string;
}

export interface Task {
  id: string;
  taskNumber: number;
  name: string; // e.g. "Task 1. Listen and choose the correct answer..."
  skill: SkillCategory;
  questionType: QuestionType;
  audioScript?: string;
  audioUrl?: string;
  readingPassage?: {
    title?: string;
    text: string;
  };
  questions: Question[];
  estimatedSeconds: number;
  isVerified: boolean; // teacher verification status
  sourceLocation: string; // e.g. "Anh 7 - Unit 1 - Page 1"
  notes?: string;
}

export interface UnitData {
  id: string;
  grade: GradeLevel;
  unitNumber: number;
  title: string;
  theme: string;
  tasks: Task[];
  status: 'Đã kiểm tra' | 'Cần giáo viên kiểm tra';
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  school?: string;
  className?: string;
}

export interface AnswerRecord {
  questionId: string;
  userAnswer: string;
  isCorrect?: boolean;
  score?: number;
  writingWordCount?: number;
  feedback?: string;
  flaggedForReview?: boolean;
}

export interface ExamSession {
  id: string;
  student: StudentProfile;
  grade: GradeLevel;
  mode: 'standard_task' | 'flexible_practice';
  selectedUnits: number[];
  selectedSkills?: SkillCategory[];
  selectedLevels?: CognitiveLevel[];
  tasks: Task[];
  allQuestions: Question[];
  timeLimitSeconds: number;
  timeRemainingSeconds: number;
  isUnlimitedTime: boolean;
  extraTimeEnabled: boolean;
  startedAt: string;
  finishedAt?: string;
  answers: Record<string, AnswerRecord>;
  status: 'in_progress' | 'completed' | 'timeout';
}

export interface ExamResult {
  sessionId: string;
  student: StudentProfile;
  date: string;
  totalQuestions: number;
  autoGradedQuestions: number;
  correctCount: number;
  score10Scale: number;
  percentage: number;
  timeSpentSeconds: number;
  skillBreakdown: Record<
    SkillCategory,
    { total: number; correct: number; percentage: number }
  >;
  levelBreakdown: Record<
    CognitiveLevel,
    { total: number; correct: number; percentage: number }
  >;
  unitBreakdown: Record<
    number,
    { title: string; total: number; correct: number }
  >;
  pendingWritingCount: number;
  session: ExamSession;
}

export interface UnitInventoryItem {
  grade: GradeLevel;
  unitNumber: number;
  title: string;
  totalTasks: number;
  totalQuestions: number;
  hasListening: boolean;
  hasAudioScript: boolean;
  isVerified: boolean;
  sourceNote: string;
}
