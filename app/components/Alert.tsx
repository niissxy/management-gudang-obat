interface AlertProps {
  message: string;
  type: "success" | "error";
}

export default function Alert({ message, type }: AlertProps) {
  return (
    <div
      className={`p-4 rounded-md text-white mb-4 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}
