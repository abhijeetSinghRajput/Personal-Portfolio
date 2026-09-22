export type SkillCategory = "Fundamental" | "Intermediate" | "Advanced";

export const dsaSkillsData: Record<SkillCategory, Record<string, number>> = {
  Fundamental: {
    Array: 90,
    String: 85,
    Sorting: 70,
    "Two Pointers": 77,
    Matrix: 92,
    "Linked List": 95,
  },
  Intermediate: {
    DFS: 70,
    "Hash Table": 90,
    BFS: 60,
    Tree: 55,
    Math: 45,
    Greedy: 60,
  },
  Advanced: {
    "Divide and Conquer": 69,
    "Union Find": 30,
    DP: 79,
    Backtracking: 48,
    Trie: 21,
    "Game Theory": 90,
  },
};
