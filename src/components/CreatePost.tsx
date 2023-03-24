// User post creation

import { useState } from "react";
import { object, string } from "zod";

import { api } from "../utils/api";

export const postSchema = object({
  // Set acceptable text size
  text: string({
    required_error: "Error: Post text is required",
  })
    .min(10)
    .max(280),
});

export function CreatePost() {
  // Form  Validated manually
  // If using multiple forms, use https://react-hook-form.com/

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Using for cache invalidation
  const utils = api.useContext();

  // /api gives access to post.create:protectedProcedure
  const { mutateAsync, mutate } = api.post.create.useMutation({
    onSuccess: () => {
      // Invalidating the query when new post created, forces cache to update (New post displayed immediately)
      setText("");
      utils.post.timeline.invalidate();
    },
  });
  // Optional properties: const mutation = api.post.create.useMutation().mutateAsync;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("error", error);

    // Test passing string. Update error
    try {
      await postSchema.parse({ text });
    } catch (event: any) {
      const parsedError = JSON.parse(event.message);
      setError(parsedError[0].message);

      return;
    }

    // zod String min, max checks this
    // if (text.length < 10) {
    //   setError("Post must be minimum 10  long");
    //   return;
    // }
    // else
    mutateAsync({ text });
  };

  return (
    <>
      {error && JSON.stringify(error)}

      {/* full width,  */}
      <form
        className={"flex-col, mb-4 w-full rounded-md  p-4 shadow-md"}
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="What's on your mind?"
          onChange={(event) => {
            setText(event.target.value);
          }}
          className={" w-full rounded-sm p-1 shadow-sm"}
        ></textarea>

        <div className={" mt-4 flex justify-center"}>
          {/* Set bg-primary in tailwind config*/}
          <button
            className={
              " rounded-sm bg-primaryblue px-4 py-2 text-white shadow-md hover:bg-navyblue "
            }
            type="submit"
          >
            Make a Post
          </button>
        </div>
      </form>
    </>
  );
}
