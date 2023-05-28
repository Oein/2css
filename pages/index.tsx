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
              let x = v?.replace(/\s*(['"])?([a-z0-9A-Z_\.]+)(['"])?\s*:([^,\}]+)(,)?/g, '"$2": $4$5').replace(/(.*?),\s*(\}|])/g, "$1$2") || "{}{}{}";
              x = x.trim();
              if(x == "") x = "{}{}{}";
              let xtmp = x.replace(/\n/gi, "").replace(/ /gi, "").replace(/\t/gi, "");
              if(xtmp.startsWith("style={{") && xtmp.endsWith("}}")) {
                x = x.replace("style={{", "{"); 
                x = x.substring(0, x.length - 1);
              }
              let sty =
                ".selector { \n" +
                styleToCss(JSON.parse(x))
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
