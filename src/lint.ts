import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { Text } from "@codemirror/state";
import jsonata from "jsonata";

export const jsonataParseLinter =
  () =>
  (view: EditorView): Diagnostic[] => {
    try {
      jsonata(view.state.doc.toString());
    } catch (error: any) {
      if ("position" in error) {
        const pos = getErrorPosition(error, view.state.doc);
        return [
          {
            from: pos,
            message: error.message,
            severity: "error",
            to: pos,
          },
        ];
      } else {
        throw error;
      }
    }
    return [];
  };

function getErrorPosition(error: any, doc: Text): number {
  return Math.min(error.position, doc.length);
}
