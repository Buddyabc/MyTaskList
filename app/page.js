import React, { Suspense } from "react";
import ToDoFrom from "./ToDoFrom";
import Todos from "./todos";


const Page = async () => {
  return (
    <div className="container">
      <ToDoFrom/>

      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
};

export default Page;