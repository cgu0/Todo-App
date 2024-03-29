"use client";
import axios from "axios";
import Todo from "../Components/Todo";
import { use, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]); //首先创建todoAppstate，用来储存todo数据

  const fetchTodos = async () => { //接着使用fetchTodos函数，用来获取数据库中的todo数据
    const response = await axios.get("/api");
    setTodoData(response.data.todos); //这段代码会将获取到的数据存储到todoData中
  };

  const deleteTodo = async (id: string) => {
    const response = await axios.delete(`/api?mongoId=${id}`)
    toast.success(response.data.msg);
    fetchTodos(); //这段代码会在删除todo成功后，重新获取todo数据
  
  } //接着创建deleteTodo函数，用来删除todo

  const updateTodo = async (id: string) => {
    const response = await axios.put(`/api?mongoId=${id}`)
    toast.success(response.data.msg);
    fetchTodos(); //这段代码会在更新todo成功后，重新获取todo数据
  }

  useEffect(() => { //接着使用useEffect函数，用来在页面加载时获取todo数据，但是这个函数只会在页面加载时执行一次，这样就不会重复获取数据
    fetchTodos();
  }, []);

  const onChangeHander = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      //api code
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos(); //这段代码会在添加todo成功后，重新获取todo数据
    } catch (errot) {
      toast.error("Error");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHander}
        />
        <textarea
          value={formData.description}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHander}
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item:any, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
