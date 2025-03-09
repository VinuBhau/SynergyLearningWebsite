import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"; // Import worker as URL

export default function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(0);
  const canvasRefs = useRef([]);



  useEffect(() => {

    
    const windowWidth = window.innerWidth;
    var scaleVal = 1.2;

    if(windowWidth>=490 && windowWidth <= 768)
      scaleVal = 0.8
    else
    if(windowWidth<=490)
        scaleVal = 0.45
        
    if (!pdfUrl) return; // ✅ Ensure pdfUrl exists before loading


    GlobalWorkerOptions.workerSrc = pdfWorker; // ✅ Correctly set worker path

    getDocument(pdfUrl)
      .promise.then((pdf) => {
        setNumPages(pdf.numPages); // ✅ Set total pages count

        // ✅ Load each page
        for (let i = 1; i <= pdf.numPages; i++) {
          pdf.getPage(i).then((page) => {
            if (!canvasRefs.current[i - 1]) return; // ✅ Ensure ref exists

            const canvas = canvasRefs.current[i - 1];
            const context = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: scaleVal });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            page.render({ canvasContext: context, viewport });
          });
        }
      })
      .catch((error) => console.error("Error loading PDF:", error));
  }, [pdfUrl]);

  return (
    <div className=" w-full h-screen overflow-auto p-4">
      {Array.from({ length: numPages }, (_, i) => (
        <canvas
          key={i}
          ref={(el) => (canvasRefs.current[i] = el)}
          className="border shadow-lg mb-4"
        />
      ))}
    </div>
  );
}
