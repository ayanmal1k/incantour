import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  multiline?: boolean;
};

type FormFieldProps = BaseProps & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export function FormField({ id, label, error, multiline, className = "", ...props }: FormFieldProps) {
  const controlClass = `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-incan-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-incan-gold focus:ring-4 focus:ring-incan-gold/15 ${error ? "border-red-500" : "border-slate-200"} ${className}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-incan-teal">{label}</label>
      {multiline ? (
        <textarea id={id} className={controlClass} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className={controlClass} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
