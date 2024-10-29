import taskManager from "./taskManager.js";
import { format } from "date-fns";

export default function screenManager() {
  console.log("Screen Manager");

  const app = taskManager();
  app.initialLoad();

  //update screen function?
}
