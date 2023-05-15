import styles from "@/styles/Home.module.css";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import styleToCss from "style-object-to-css-string";

export default function Home() {
  let [le, setLe] = useState('{\n\t"color": "white"\n}');
  let [r, setR] = useState(".selector {\n\tcolor: white;\n}");
  return (
    <>
      <div className={styles.container}>
        <Editor
          height="100vh"
          theme="vs-dark"
          language="json"
          value={le}
          onChange={(v) => {
            setLe(v || "");
            try {
              JSON.parse(v || "123123{}{}{}");
              let sty =
                ".selector { \n" +
                styleToCss(JSON.parse(v || "{}"))
                  .split("\n")
                  .map((x: string) => `\t${x}`)
                  .join("\n") +
                "\n}";
              setR(sty);
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <Editor height="100vh" theme="vs-dark" language="css" value={r} />
      </div>
    </>
  );
}
