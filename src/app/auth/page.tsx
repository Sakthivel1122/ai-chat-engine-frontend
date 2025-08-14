'use client';
import React from "react";

const page = () => {
  return (
    <div>
      <button onClick={() => {
        window.location.href = 'http://localhost:8000/login';
      }}>Click</button>
    </div>
  );
};

export default page;
