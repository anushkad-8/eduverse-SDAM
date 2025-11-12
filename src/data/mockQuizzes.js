// src/data/mockQuizzes.js

export const mockQuizzes = [
  {
    id: "QZ101",
    title: "AI Fundamentals Quiz",
    description: "Test your basics of Artificial Intelligence and ML concepts.",
    time: "5 min",
    questions: [
      {
        id: 1,
        question: "Which of the following is an example of supervised learning?",
        options: ["K-Means", "Linear Regression", "Apriori", "PCA"],
        answer: "Linear Regression",
      },
      {
        id: 2,
        question: "Who is considered the father of AI?",
        options: ["Alan Turing", "Andrew Ng", "John McCarthy", "Geoffrey Hinton"],
        answer: "John McCarthy",
      },
    ],
  },
  {
    id: "QZ102",
    title: "Web Development Quiz",
    description: "Covers HTML, CSS, and JS fundamentals.",
    time: "4 min",
    questions: [
      {
        id: 1,
        question: "Which HTML tag is used to include JavaScript code?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: "<script>",
      },
      {
        id: 2,
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
      },
    ],
  },
  {
    id: "QZ103",
    title: "Database Management Quiz",
    description: "Questions on SQL, normalization, and transactions.",
    time: "6 min",
    questions: [
      {
        id: 1,
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Sequential Query Logic",
          "Standard Question Language",
        ],
        answer: "Structured Query Language",
      },
      {
        id: 2,
        question: "What is the highest normal form in database normalization?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: "BCNF",
      },
    ],
  },
];
