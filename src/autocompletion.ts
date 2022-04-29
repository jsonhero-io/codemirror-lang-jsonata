import {
  completeFromList,
  Completion,
  CompletionSource,
  snippet,
} from "@codemirror/autocomplete";

export function autoCompletionList(): CompletionSource {
  return completeFromList([...builtInFunctions()]);
}

function builtInFunctions(): Completion[] {
  // return builtInFunctionNames.map((name) => ({
  //   label: `$${name}()`,
  //   type: "function",
  // }));

  return [
    {
      label: "$sum(items[5m]))",
      type: "function",
      detail: "snippet",
      info: "Sum up all values",
      apply: snippet("$sum(${items}[5m]))"),
    },
  ];
}

const builtInFunctionNames = [
  "string",
  "length",
  "substring",
  "substringBefore",
  "substringAfter",
  "uppercase",
  "lowercase",
  "trim",
  "pad",
  "contains",
  "split",
  "join",
  "match",
  "replace",
  "now",
  "fromMillis",
  "formatNumber",
  "formatBase",
  "base64encode",
  "base64decode",
  "number",
  "abs",
  "floor",
  "ceil",
  "round",
  "power",
  "sqrt",
  "random",
  "millis",
  "toMillis",
  "sum",
  "max",
  "min",
  "average",
  "boolean",
  "not",
  "exists",
  "count",
  "append",
  "sort",
  "reverse",
  "shuffle",
  "zip",
  "keys",
  "lookup",
  "spread",
  "merge",
  "sift",
  "each",
  "map",
  "filter",
  "reduce",
  "sift",
];
