import Button from "./Button";

export default function Empty({ icon, title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-app py-20 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full surface-2 text-3xl text-muted">{icon}</div>
      <h3 className="mt-5 font-serif text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-soft">{desc}</p>
      {action && (
        <Button to={action.to} className="mt-6">{action.label}</Button>
      )}
    </div>
  );
}
