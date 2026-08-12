import type { CourseworkItem } from "./types";

export const COURSEWORK: CourseworkItem[] = [
  {
    code: "CSIT402",
    title: "Distributed Systems",
    artifact:
      "Implemented Lamport logical clocks and vector clocks in Python and documented happened-before relations, causality, and event ordering.",
    link: "https://github.com/jeetsh4h/CSIT402",
  },
  {
    code: "CSIT372",
    title: "Advanced Database Systems",
    artifact:
      "Built JJDB, a C++ command-line database with schema files, CSV loading, record operations, and column indexes; also implemented hashing and binary-search-tree exercises.",
    link: "https://github.com/jeetsh4h/CSIT372",
  },
  {
    code: "CSIT301",
    title: "Design and Analysis of Algorithms",
    artifact:
      "Implemented brute-force, Held-Karp, and nearest-neighbor solutions to the traveling-salesperson problem and benchmarked their runtimes on test matrices.",
    link: "https://github.com/jeetsh4h/TravelingSalesmanProblem",
  },
  {
    code: "CSIT302",
    title: "Principles of Programming Languages",
    artifact:
      "Co-developed a simple 2D platformer in Unity and GDevelop designed to teach programming concepts; wrote the final technical report and completed part of the programming.",
    link: "https://github.com/jeetsh4h/Mario-SJ",
  },
];
