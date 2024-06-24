import Main from "@/app/ui/assessment/Main";
import { Question } from "@/lib/definitions";
import { getTranslations } from "next-intl/server";

const quizz: Question[] = [
  {
    key: "gender",
    options: ["M", "F"]
  },
  {
    key: "birthdate",
    inputs: [
      {
        name: "birthdate",
        type: "date",
        placeholder: "yyyy-mm-dd",
        optional: false
      },
    ]
  },
  {
    key: "weight&height",
    inputs: [
      {
        name: "weight",
        type: "number",
        pattern: "[0-9]*",
        inputmode: "numeric",
        placeholder: "00",
        optional: true
      },
      {
        name: "height",
        type: "number",
        pattern: "[0-9]*",
        inputmode: "numeric",
        placeholder: "00",
        optional: true
      }
    ]
  },
  {
    key: "goal",
    options: ["GLSW", "GKPF", "GGMM"]
  },
  {
    key: "training",
    options: ["T00X", "T01X", "T23X", "T4+X"]
  },
  {
    key: "gym",
    options: ["GY1T", "GY2T", "GY3T", "GY4T"]
  },
  {
    key: "frequency",
    options: ["F01X", "F02X", "F3+X"]
  },
  {
    key: "health",
    multiple: [["DISY", false], ["INJY", false], ["DISS", false], ["PREG", false], ["HOTH", false], ["HNON", true]]
  }
]

export default async function AssessmentPage() {
  const t = await getTranslations("Assessment");
  const translations = t.raw("questions.options")
  const questions = quizz.map(({key, ...rest}) => ({
    key,
    title: t(`questions.${key}:title`),
    shortTitle: t(`questions.${key}:shortTitle`),
    description: t(`questions.${key}:description`),
    ...rest
  }))
  return (
    <Main quizz={questions} translations={translations} />
  )
}