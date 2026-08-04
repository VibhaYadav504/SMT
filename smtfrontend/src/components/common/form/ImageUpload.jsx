import { useRef, useState, useEffect } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const ImageUpload = ({
  label = "Profile Photo",
  value = null,
  onChange,
}) => {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const url = URL.createObjectURL(value);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, PNG and WEBP images are allowed.";
    }

    if (file.size > MAX_SIZE) {
      return "Maximum file size is 2 MB.";
    }

    return "";
  };

  const handleFile = (file) => {
    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowse = (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setError("");
    onChange(null);
  };

  return (
    <div className="space-y-3">

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-6 transition hover:border-orange-500 hover:bg-orange-100"
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleBrowse}
        />

        {!preview ? (
          <div className="flex flex-col items-center">

            <div className="mb-4 rounded-full bg-orange-100 p-4">
              <Upload className="text-orange-600" size={32} />
            </div>

            <h3 className="font-semibold text-gray-700">
              Drag & Drop Image
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              or click to browse
            </p>

            <p className="mt-3 text-xs text-gray-400">
              JPG • PNG • WEBP (Max 2MB)
            </p>

          </div>
        ) : (
          <div className="relative mx-auto w-fit">

            <img
              src={preview}
              alt="Preview"
              className="h-44 w-44 rounded-2xl border object-cover shadow"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white shadow hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>

          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {!preview && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ImageIcon size={14} />
          Recommended size: 500 × 500 px
        </div>
      )}
    </div>
  );
};

export default ImageUpload;