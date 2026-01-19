import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type AnalysisReport } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useAnalyzeChart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
  // 1️⃣ File → Base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // 2️⃣ ONLY base64 part
  const base64Image = base64.split(",")[1];

  // 3️⃣ Gemini backend call
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: base64Image,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to analyze chart");
  }

  const data = await res.json();

  return {
    id: Date.now(),
    imageUrl: "",
    result: data.analysis,
  };
},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.analysis.list.path] });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
