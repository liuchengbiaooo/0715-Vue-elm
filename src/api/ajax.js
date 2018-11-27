/*
通过url，data，请求方式 进行ajax请求
*/
import axios from "axios"

export default function ajax(url, data = {}, method = "GET") {

  return new Promise((resolve, reject) => {
    let promise
    if (method === "GET") {
      //拼串
      let queryStr = ""
      /*keys方法是将object对象的属性名进行遍历放回一个真数组*/
      Object.keys(data).forEach(key => {
        const value = data[key] //通过属性名或者属性值
        queryStr += `${key}=${value}&`
      })
      if (queryStr !== "") {
        //username=tom&password=123&
        queryStr = queryStr.substring(0, queryStr.length - 1)//指定开始的下标和结束的下标（去掉一个多的&）
        url += "?" + queryStr //  url?username=tom&password=123&
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      //异步请求成功
      resolve(response.data)
    }).catch(errer => {
      reject(errer)
    })
  })
}
