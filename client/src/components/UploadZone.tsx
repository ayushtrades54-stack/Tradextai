import { useCallback, useState } from "react";
import { Upload, X, FileBarChart, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadZone({ onAnalyze, isAnalyzing }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isAnalyzing
  });

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleAnalyze = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file) {
      onAnalyze(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer
          rounded-2xl border-2 border-dashed
          transition-all duration-300 ease-out
          min-h-[300px] flex flex-col items-center justify-center p-8
          ${isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-white/10 hover:border-primary/50 hover:bg-white/5 bg-card/40"}
          ${preview ? "border-solid border-white/20" : ""}
          backdrop-blur-sm
        `}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Trading Chart</h3>
              <p className="text-muted-foreground mb-4">
                Drag & drop or click to browse
              </p>
              <div className="flex gap-3 justify-center text-xs text-muted-foreground/60 font-mono">
                <span className="bg-white/5 px-2 py-1 rounded">PNG</span>
                <span className="bg-white/5 px-2 py-1 rounded">JPG</span>
                <span className="bg-white/5 px-2 py-1 rounded">MAX 5MB</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full relative"
            >
              <img 
                src={preview!} 
                alt="Chart preview" 
                className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              
              {!isAnalyzing && (
                <button
                  onClick={handleClear}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-destructive text-white backdrop-blur-md transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="
                    relative overflow-hidden
                    px-8 py-4 rounded-xl font-bold text-lg
                    bg-gradient-to-r from-primary to-accent
                    text-white shadow-lg shadow-primary/25
                    hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-md
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                    transition-all duration-200 w-full md:w-auto min-w-[200px]
                    flex items-center justify-center gap-2
                  "
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Chart...
                    </>
                  ) : (
                    <>
                      <FileBarChart className="w-5 h-5" />
                      Analyze Chart
                    </>
                  )}
                  
                  {isAnalyzing && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-white/30"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
