// User post creation

import { useState } from "react";
import { object, string } from "zod";
// ?
import Trpc from "../pages/api/trpc/[trpc]";
import { api } from "../utils/api";

const postSchema = object({
  text: string(),
});

export function createPost() {
  // Form  Validated manually
  // If using multiple forms, use https://react-hook-form.com/

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // /api gives access to post.create:protectedProcedure
  const { mutateAsync, mutate } = api.post.create.useMutation();
  // Optional properties: const mutation = api.post.create.useMutation().mutateAsync;

  function handleSubmit(event) {
    event.preventDefault();
    if (text.length < 10) {
      setError("Post must be minimum 10 characters long");
      return;
    }
    mutateAsync({ text });
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={(event) => {
          setText(event.target.value);
        }}
      ></textarea>

      <div>
        <button type="submit">Make Post</button>
      </div>
    </form>
  );
}
