// libs and hooks
import axios from "axios";
// utils
import { getAuthToken } from "../local-storage/auth-token";
// types
import { FetchedTaskSet } from "./fetch-constructors.types";
import { convertMathInput, MathInputFormat } from "../kotlin-lib-functions";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";

const API_URL: string = process.env.REACT_APP_SERVER_API as string;

export const getAllTaskSets = async (): Promise<FetchedTaskSet[]> => {
  return axios({
    method: "get",
    url: API_URL + "/taskset",
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  })
    .then((res) => {
      return res.data.tasksets;
    })
    .catch((e) => {
      console.error("Error fetching task-sets", e.message);
    });
};

export const getTaskSet = async (code: string): Promise<FetchedTaskSet> => {
  return axios({
    method: "get",
    url: API_URL + "/taskset/edit/" + code,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  })
    .then((res) => {
      return { ...res.data.taskset };
    })
    .catch((e) => {
      console.error("Error fetching task-set with code " + code, e.message);
    });
};

export const submitTaskSet = async (
  data: any,
  code: string,
  method: "post" | "patch"
) => {
  // format expression inputs
  if (data.tasks) {
    data.tasks.forEach((task: any) => {
      if (task.originalExpression.format === MathInputFormat.TEX) {
        task.originalExpressionTex = task.originalExpression.expression;
        task.originalExpressionPlainText = convertMathInput(
          MathInputFormat.TEX,
          MathInputFormat.PLAIN_TEXT,
          task.originalExpression.expression
        );
        task.originalExpressionStructureString = convertMathInput(
          MathInputFormat.TEX,
          MathInputFormat.STRUCTURE_STRING,
          task.originalExpression.expression
        );
      } else if (
        task.originalExpression.format === MathInputFormat.PLAIN_TEXT
      ) {
        task.originalExpressionPlainText = task.originalExpression.expression;
        task.originalExpressionTex = convertMathInput(
          MathInputFormat.PLAIN_TEXT,
          MathInputFormat.TEX,
          task.originalExpression.expression
        );
        task.originalExpressionStructureString = convertMathInput(
          MathInputFormat.PLAIN_TEXT,
          MathInputFormat.STRUCTURE_STRING,
          task.originalExpression.expression
        );
      } else if (
        task.originalExpression.format === MathInputFormat.STRUCTURE_STRING
      ) {
        task.originalExpressionStructureString =
          task.originalExpression.expression;
        task.originalExpressionPlainText = convertMathInput(
          MathInputFormat.STRUCTURE_STRING,
          MathInputFormat.PLAIN_TEXT,
          task.originalExpression.expression
        );
        task.originalExpressionTex = convertMathInput(
          MathInputFormat.STRUCTURE_STRING,
          MathInputFormat.TEX,
          task.originalExpression.expression
        );
      }
      if (task.goalExpression.format === MathInputFormat.TEX) {
        task.goalExpressionTex = task.goalExpression.expression;
        task.goalExpressionPlainText = convertMathInput(
          MathInputFormat.TEX,
          MathInputFormat.PLAIN_TEXT,
          task.goalExpression.expression
        );
        task.goalExpressionStructureString = convertMathInput(
          MathInputFormat.TEX,
          MathInputFormat.STRUCTURE_STRING,
          task.goalExpression.expression
        );
      } else if (task.goalExpression.format === MathInputFormat.PLAIN_TEXT) {
        task.goalExpressionPlainText = task.goalExpression.expression;
        task.goalExpressionTex = convertMathInput(
          MathInputFormat.PLAIN_TEXT,
          MathInputFormat.TEX,
          task.goalExpression.expression
        );
        task.goalExpressionStructureString = convertMathInput(
          MathInputFormat.PLAIN_TEXT,
          MathInputFormat.STRUCTURE_STRING,
          task.goalExpression.expression
        );
      } else if (
        task.goalExpression.format === MathInputFormat.STRUCTURE_STRING
      ) {
        task.goalExpressionStructureString = task.goalExpression.expression;
        task.goalExpressionPlainText = convertMathInput(
          MathInputFormat.STRUCTURE_STRING,
          MathInputFormat.PLAIN_TEXT,
          task.goalExpression.expression
        );
        task.goalExpressionTex = convertMathInput(
          MathInputFormat.STRUCTURE_STRING,
          MathInputFormat.TEX,
          task.goalExpression.expression
        );
      }
      if (task.solution.format !== MathInputFormat.STRUCTURE_STRING) {
        task.solution = convertMathInput(
          task.solution.format,
          MathInputFormat.STRUCTURE_STRING,
          task.solution.expression
        );
      } else {
        task.solution = task.solution.expression;
      }
      task.goalNumberProperty = parseInt(task.goalNumberProperty);
      task.stepsNumber = parseInt(task.stepsNumber);
      task.time = parseInt(task.time);
      task.difficulty = parseFloat(task.difficulty);
      task.stepsNumber = parseInt(task.stepsNumber);
      task.countOfAutoGeneratedTasks = parseInt(task.countOfAutoGeneratedTasks);
      task.maxNumberOfAutogeneratedTasks = parseInt(
        task.maxNumberOfAutogeneratedTasks
      );
      task.numberOfAutogeneratedTasksToSolve = parseInt(
        task.numberOfAutogeneratedTasksToSolve
      );
      delete task.originalExpression;
      delete task.goalExpression;
      ["subjectTypes", "rulePacks", "autoGeneratedRulePacks"].forEach(
        (key: string) => {
          if (task[key] === "") {
            task[key] = [];
          }
        }
      );
      [
        "otherGoalData",
        "otherCheckSolutionData",
        "otherAwardData",
        "otherAutogenerationData",
        "otherData",
      ].forEach((key: string) => {
        if (task[key] === "") {
          task[key] = null;
        }
      });
    });
  }
  if (data.subjectTypes === "") {
    data.subjectTypes = [];
  }
  if (data.otherData === "") {
    data.otherData = null;
  }

  // Object.keys(data).forEach((key: string) => {
  //   if (data[key] === "") {
  //     delete data[key];
  //   }
  // });
  console.log(data);
  return axios({
    method,
    url: API_URL + "/taskset",
    data,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  })
    .then((res) => {
      console.log("SUCCESS");
      return;
    })
    .catch((e) => {
      console.error(
        "Error submitting task-set with code " + code,
        e.message,
        e.response
      );
    });
};
