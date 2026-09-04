export type Severity = "red" | "amber" | "green";

export interface Finding {
  file: string;
  line: number;
  severity: Severity;
  rule: string;
  explanation: string;
}

export interface ChangedFile {
  path: string;
  changedLines: number[];
}

export interface Rule {
  id: string;
  check(file: ChangedFile, contents: string): Finding[];
}

export interface Framework {
  id: string;
  rules: Rule[];
}
