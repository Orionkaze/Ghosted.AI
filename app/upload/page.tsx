import { DropZone } from "@/components/upload/DropZone";
import Link from "next/link";

export default function UploadPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <Link href="/" className="inline-flex items-center text-text-secondary hover:text-teal transition-colors mb-12">
          <i className="fa-solid fa-arrow-left mr-2" /> Back
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Upload Your Chat
          </h1>
          <p className="text-lg text-text-secondary">
            Export your chat from WhatsApp, upload the <code className="text-teal font-mono bg-teal/10 px-1.5 py-0.5 rounded">.txt</code> file here, and we'll do the rest.
          </p>
        </div>

        <DropZone />

        <div className="mt-16 flex flex-col items-center">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
            Supported Formats
          </h3>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-border">
            <i className="fa-brands fa-whatsapp text-2xl text-[#25D366]" />
            <span className="text-text-primary font-medium">WhatsApp Export (Without Media)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
