// User post creation

import { useState } from "react";
import { object, string } from "zod";
// ?
import Trpc from "../pages/api/trpc/[trpc]";
import { api } from "../utils/api";

export const postSchema = object({
  // Set acceptable text size
  text: string({
    required_error: "Post text is required",
  })
    .min(10)
    .max(280),
});

export function CreatePost() {
  // Form  Validated manually
  // If using multiple forms, use https://react-hook-form.com/

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // /api gives access to post.create:protectedProcedure
  const { mutateAsync, mutate } = api.post.create.useMutation();
  // Optional properties: const mutation = api.post.create.useMutation().mutateAsync;

  async function handleSubmit(event) {
    event.preventDefault();

    // Test passing string. Update error
    try {
      await postSchema.parse({ text });
    } catch (event) {
      setError(event.message);
      return;
    }

    // if (text.length < 10) {
    //   setError("Post must be minimum 10 characters long");
    //   return;
    // }
    // else
    mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      {/* full width,  */}
      <form
        className={"flex-col, mb-4 w-full rounded-md border-2  p-4 shadow-md"}
        onSubmit={handleSubmit}
      >
        <textarea
          onChange={(event) => {
            setText(event.target.value);
          }}
          className={"w-full"}
        ></textarea>

        <div className={" mt-4 flex justify-center"}>
          {/* Set bg-primary */}
          <button
            className={" rounded-sm bg-primary px-4 py-2 text-white shadow-md "}
            type="submit"
          >
            Make a Post
          </button>
        </div>
      </form>
    </>
  );
}
