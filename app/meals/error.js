"use client";
export default function error({ error }) {
  return (
    <div className="error">
      <h1>An error ocurred!</h1>
      <p>{error.message}</p>
    </div>
  );
}
