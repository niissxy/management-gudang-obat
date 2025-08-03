interface ConfirmDialogProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmDialog({ show, onCancel, onConfirm, message }: ConfirmDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
