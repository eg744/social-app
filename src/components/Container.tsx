export function Container({
  children,
  givenClassNames = "",
}: {
  children: React.ReactNode;
  givenClassNames?: string;
}) {
  return (
    <div className={`m-auto max-w-2xl bg-slate-400 ${givenClassNames}`}>
      {/* max-w-xl */}
      {/* Getting comfortable with tailwind- margin: auto (container stays in center of page). Max width only for 3 column layout. Tailwind classes applied to container optional.*/}
      {children}
    </div>
  );
}
