import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { autoCompletionList } from "./autocompletion";
import { Completion, CompletionContext } from "@codemirror/autocomplete";

export const JSONataLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        "True False": t.bool,
        Null: t.null,
        Number: t.number,
        String: t.string,
        ArithmeticOperator: t.arithmeticOperator,
        Operator: t.operator,
        Variable: t.variableName,
        Identifier: t.name,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

function autoCompletion(additionalCompletions?: Completion[]) {
  return JSONataLanguage.data.of({
    autocomplete: (context: CompletionContext) =>
      autoCompletionList(context, additionalCompletions),
  });
}

export function jsonata(additionalCompletions?: Completion[]) {
  return new LanguageSupport(JSONataLanguage, [
    autoCompletion(additionalCompletions),
  ]);
}

export { jsonataParseLinter } from "./lint";
