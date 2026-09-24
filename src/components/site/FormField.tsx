/**
 * Champs de formulaire partagés par /contact et /aigms : même libellé, même
 * marque « (facultatif) », mêmes états de focus.
 */

export function Label({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children}
      {optional && <span className="ml-1 font-normal text-muted-foreground">(facultatif)</span>}
    </label>
  );
}

const control =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25";

export function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  placeholder,
  autoComplete,
  idPrefix = "contact",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  idPrefix?: string;
}) {
  const id = `${idPrefix}-${name}`;
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={control}
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  rows = 5,
  optional,
  placeholder,
  idPrefix = "contact",
}: {
  label: string;
  name: string;
  rows?: number;
  optional?: boolean;
  placeholder?: string;
  idPrefix?: string;
}) {
  const id = `${idPrefix}-${name}`;
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        maxLength={2000}
        placeholder={placeholder}
        className={control}
      />
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  required,
  idPrefix = "contact",
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  idPrefix?: string;
}) {
  const id = `${idPrefix}-${name}`;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={name} required={required} defaultValue={options[0]} className={control}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Champ leurre : invisible pour l'utilisateur, rempli par les robots. */
export function Honeypot({ idPrefix = "contact" }: { idPrefix?: string }) {
  const id = `${idPrefix}-website`;
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Ne pas remplir</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
