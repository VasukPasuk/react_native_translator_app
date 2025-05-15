import axios from "axios";

function translate({outputLang, text}: {outputLang: string; text: string }) {
  return axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${outputLang}&dt=t&q=${text}`)
}

export default translate;