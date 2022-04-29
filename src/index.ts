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
        True: t.bool,
        False: t.bool,
        Null: t.null,
        Number: t.number,
        String: t.string,
        Operator: t.operator,
        Variable: t.variableName,
        Identifier: t.name,
        "[": t.bracket,
        "]": t.bracket,
        "{": t.bracket,
        "}": t.bracket,
        "(": t.paren,
        ")": t.paren,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

export function jsonata() {
  return new LanguageSupport(JSONataLanguage);
}
