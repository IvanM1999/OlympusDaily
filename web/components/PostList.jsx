import React from "react";

export default function PostList({ posts }) {
  return (
    <div>
      <h2>Entradas recentes</h2>
      {posts.map((p) => (
        <div key={p.id} className="post">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <small>Autor: {p.author?.name || "Desconhecido"}</small>
        </div>
      ))}
    </div>
  );
}