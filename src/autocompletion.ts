import {
  completeFromList,
  Completion,
  CompletionContext,
  CompletionSource,
  snippet,
} from "@codemirror/autocomplete";

export function autoCompletionList(
  context: CompletionContext,
  additionalCompletions?: Completion[]
): CompletionSource {
  return completeFromList(functions(additionalCompletions));
}

function getExtraCompletions(fetchMoreCompletions?: () => Completion[]) {
  if (!fetchMoreCompletions) return [];
  const completions = fetchMoreCompletions();
  return completions;
}

function functions(additionalCompletions?: Completion[]): Completion[] {
  // return builtInFunctionNames.map((name) => ({
  //   label: `$${name}()`,
  //   type: "function",
  // }));

  const staticCompletions = [
    {
      label: "$sum()",
      type: "function",
      info: "Sum up all values",
      apply: snippet("$sum(${})"),
    },
    {
      label: "$string()",
      type: "function",
      info: "Casts to a string",
      apply: snippet("$string(${})"),
    },
  ];

  if (!additionalCompletions) return staticCompletions;

  return [...staticCompletions, ...additionalCompletions];
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
