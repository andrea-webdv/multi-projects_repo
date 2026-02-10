import ListFetcher from "../components/listFetcher";
import "./../styles/list.css";
import { ProgressConsumer } from "../components/ProgressContext";
import ProgressBar from "./ProgressBar"; 
import { useDeferredValue, useEffect } from "react";

const url = "/list.json";

function useContextUpdater(counter, list){
  let context = ProgressConsumer();
  useEffect(() => { 

    context.registerProgress("total", counter);
    context.registerProgress("done");
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[list])
}

function ListPage() {
  const list = ListFetcher({ url });

  //-- UPDATE THE CONTEXT 
  const lessonsCounter = [];
  
  for(const argument in list) {
      let lessons = list[argument]
      

      lessonsCounter.push(...lessons);
  }
  console.log(lessonsCounter.length);
  
  useContextUpdater(lessonsCounter.length, list);


  //-- RENDER THE LIST
  return (
    <dl key="lessons">
      {Object.keys(list).map((argument) => {
        let lessons = list[argument];
        return LessonItems(argument, lessons);
      })}
      <span id="progress">
        <ProgressBar></ProgressBar>
      </span>
    </dl>
  );
}


function LessonItems(title, lessons) {

  let context = ProgressConsumer();
  let blockKey = `chapt_${title}`;

  return (
    <div key={blockKey} className="chapter_block">
      <dt key={title} className="chapter">
        {title}
      </dt>
      {lessons.map((lesson, i) => {
        let key = `${title}_${i}`;

        // VERSIONE CON LOCALSTORAGE
        let backup = localStorage.getItem(key);
        let backupBoolean = backup === "true" ? true : false;

        return (
          <dd key={key}>
            <label className="lesson" htmlFor={key}>
              <input
                name={key}
                type="checkbox"
                className="progresschecker"
                checked={backupBoolean}
                onChange={(e) => {
                  // VERSIONE CON LOCALSTORAGE
                  localStorage.setItem(key, e.target.checked);
                  context.registerProgress("done");
                }}
              />
              {lesson}
            </label>
          </dd>
        );
      })}
    </div>
  );
}

export default ListPage;
