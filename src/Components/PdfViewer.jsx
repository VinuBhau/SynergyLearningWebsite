
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"; // Import worker as URL
import { useEffect, useRef, useState } from "react";

export default function PdfViewer({ pdfUrl , PreviewMode}) {
  const [numPages, setNumPages] = useState(0);
  const numPagesRef = useRef(0); // ✅ Avoid unnecessary re-renders
  const canvasRefs = useRef([]);

  useEffect(() => {
    if (!pdfUrl) return;

    GlobalWorkerOptions.workerSrc = pdfWorker;

    const windowWidth = window.innerWidth;
    var scaleVal = 1.4;
    
    if (windowWidth >= 490 && windowWidth <= 768) scaleVal = 0.8;
    else if (windowWidth <= 490) scaleVal = 0.5;

    

    let renderTasks = []; // ✅ Store active render tasks to cancel if needed

    getDocument(pdfUrl)
      .promise.then((pdf) => {
        if (numPagesRef.current === pdf.numPages) return; // ✅ Prevent redundant updates
        numPagesRef.current = pdf.numPages;
        setNumPages(pdf.numPages); // ✅ Update state only if necessary

        canvasRefs.current = new Array(pdf.numPages); // ✅ Reset canvasRefs to avoid stale data

        for (let i = 1; i <= pdf.numPages; i++) {
          pdf.getPage(i).then((page) => {
            const canvas = canvasRefs.current[i - 1];
            if (!canvas) return;

            const context = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: scaleVal });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderTask = page.render({ canvasContext: context, viewport });
            renderTasks.push(renderTask);
          });
        }
      })
      .catch((error) => console.error("Error loading PDF:", error));

    return () => {
      // ✅ Cancel all ongoing render tasks when pdfUrl changes
      renderTasks.forEach((task) => task.cancel && task.cancel());
    };
  }, [pdfUrl,PreviewMode]);

  return (
    <div className={`w-full    h-screen overflow-auto p-4 ${PreviewMode ? 'w-[1700px] h-[800px]':''} `}>
      {Array.from({ length: numPages }, (_, i) => (
        <canvas
          key={i}
          ref={(el) => (canvasRefs.current[i] = el)}
          className={`border shadow-lg mb-4 ${PreviewMode ? 'w-[1300px]':''} `}
        />
      ))}
    
    </div>
  );
}

