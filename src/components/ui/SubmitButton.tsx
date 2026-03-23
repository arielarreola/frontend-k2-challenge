interface SubmitButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({ disabled = false, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
    >
      {children}
    </button>
  );
}
