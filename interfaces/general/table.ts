export type TableData = {
  [key: string]: any;
};

export type TableColumn = {
  key: string;
  sortable?: boolean;
  sort?: (a: any, b: any, direction: "asc" | "desc") => number;
  direction?: "asc" | "desc";
  class?: string;
  rowClass?: string;
  [key: string]: any;
};
