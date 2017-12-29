export default function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(
      cm.getOption("indentWithTabs")
        ? "\t"
        : Array(cm.getOption("indentUnit") + 1).join(" "),
      "end",
      "+input"
    );
  }
}
